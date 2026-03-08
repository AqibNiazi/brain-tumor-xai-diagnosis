"""
predict.py
----------
Blueprint: /api/predict
POST  /api/predict   — accepts an image file, returns prediction + GradCAM overlay
GET   /api/health    — health check
"""

import torch
from flask import Blueprint, request, jsonify, current_app
from PIL import Image

from utils.preprocessing import allowed_file, preprocess_image
from utils.gradcam import generate_gradcam_overlay
from models.model_loader import CLASS_NAMES

predict_bp = Blueprint("predict", __name__)


# ── Helpers ──────────────────────────────────────────────────────────────────

def _get_model_and_device():
    """Retrieve model and device from Flask app context."""
    return current_app.config["MODEL"], current_app.config["DEVICE"]


def _run_inference(tensor: torch.Tensor, model) -> dict:
    """
    Run forward pass and return prediction dict.

    Returns
    -------
    {
        "predicted_class" : str,
        "class_index"     : int,
        "confidence"      : float,           # 0–100 %
        "probabilities"   : {class: float}   # softmax for all 4 classes
    }
    """
    with torch.no_grad():
        outputs = model(tensor)
        probs   = torch.nn.functional.softmax(outputs, dim=1)[0]

    class_idx   = int(torch.argmax(probs).item())
    confidence  = float(probs[class_idx].item()) * 100

    probabilities = {
        CLASS_NAMES[i]: round(float(probs[i].item()) * 100, 2)
        for i in range(len(CLASS_NAMES))
    }

    return {
        "predicted_class": CLASS_NAMES[class_idx],
        "class_index"    : class_idx,
        "confidence"     : round(confidence, 2),
        "probabilities"  : probabilities,
    }


# ── Routes ───────────────────────────────────────────────────────────────────

@predict_bp.route("/health", methods=["GET"])
def health():
    """Simple health check endpoint."""
    model, device = _get_model_and_device()
    return jsonify({
        "status" : "ok",
        "device" : str(device),
        "classes": CLASS_NAMES,
    })


@predict_bp.route("/predict", methods=["POST"])
def predict():
    """
    POST /api/predict
    -----------------
    Form-data field:  image  (file)
    Optional field :  gradcam  ("true" / "false", default "true")

    Response (200)
    --------------
    {
        "predicted_class" : "glioma",
        "class_index"     : 0,
        "confidence"      : 97.43,
        "probabilities"   : {"glioma": 97.43, "meningioma": 1.2, ...},
        "gradcam_overlay" : "data:image/png;base64,..."   # if requested
    }

    Error (400 / 500)
    -----------------
    { "error": "..." }
    """
    # ── Validate file field ──
    if "image" not in request.files:
        return jsonify({"error": "No image field in request. Send file under key 'image'."}), 400

    file = request.files["image"]

    if file.filename == "":
        return jsonify({"error": "No file selected."}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "Unsupported file type. Use PNG, JPG, JPEG, WEBP, or BMP."}), 400

    # ── Load image ──
    try:
        pil_image = Image.open(file.stream).convert("RGB")
    except Exception as e:
        return jsonify({"error": f"Could not read image: {str(e)}"}), 400

    # ── Preprocess & infer ──
    try:
        model, device = _get_model_and_device()
        tensor        = preprocess_image(pil_image, device)
        result        = _run_inference(tensor, model)
    except Exception as e:
        current_app.logger.exception("Inference failed")
        return jsonify({"error": f"Inference error: {str(e)}"}), 500

    # ── Optional GradCAM overlay ──
    want_gradcam = request.form.get("gradcam", "true").lower() == "true"
    if want_gradcam:
        try:
            overlay = generate_gradcam_overlay(
                original_pil=pil_image,
                input_tensor=tensor,
                model=model,
                device=device,
                pred_class=result["class_index"],
            )
            result["gradcam_overlay"] = overlay
        except Exception as e:
            current_app.logger.warning(f"GradCAM failed (returning prediction without it): {e}")
            result["gradcam_overlay"] = None

    return jsonify(result), 200
