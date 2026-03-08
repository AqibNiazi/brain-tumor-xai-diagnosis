"""
gradcam.py
----------
GradCAM implementation for ResNet50.
Identical logic to the training notebook with:
  - Hook cleanup in finally block (prevents SHAP conflicts)
  - Device-aware cam tensor
  - Returns base64-encoded overlay PNG ready for API response
"""

import io
import base64

import cv2
import numpy as np
import torch
from PIL import Image


class GradCAM:
    def __init__(self, model, target_layer, device):
        self.model        = model
        self.target_layer = target_layer
        self.device       = device
        self.gradients    = None
        self.activations  = None
        self._hooks       = []

    def _register_hooks(self):
        h1 = self.target_layer.register_forward_hook(self._save_activation)
        h2 = self.target_layer.register_full_backward_hook(self._save_gradient)
        self._hooks = [h1, h2]

    def _remove_hooks(self):
        for h in self._hooks:
            h.remove()
        self._hooks = []

    def _save_activation(self, module, input, output):
        self.activations = output

    def _save_gradient(self, module, grad_input, grad_output):
        self.gradients = grad_output[0]

    def generate_cam(self, input_tensor: torch.Tensor, target_class: int) -> np.ndarray:
        """
        Returns a normalised CAM heatmap as numpy array (H, W) float32 in [0, 1].
        Hooks are always removed even if an exception occurs.
        """
        self._register_hooks()
        try:
            self.model.eval()
            output = self.model(input_tensor)
            self.model.zero_grad()
            output[0, target_class].backward()

            gradients   = self.gradients[0]
            activations = self.activations[0]
            weights     = torch.mean(gradients, dim=(1, 2))

            # device-aware zeros (fixes cuda/cpu mismatch)
            cam = torch.zeros(activations.shape[1:], dtype=torch.float32).to(self.device)
            for i, w in enumerate(weights):
                cam += w * activations[i]

            cam = torch.relu(cam)
            cam = cam - cam.min()
            cam = cam / (cam.max() + 1e-8)
            return cam.detach().cpu().numpy()
        finally:
            self._remove_hooks()   # always clean up


def generate_gradcam_overlay(
    original_pil: Image.Image,
    input_tensor: torch.Tensor,
    model,
    device,
    pred_class: int,
) -> str:
    """
    Run GradCAM and return a base64-encoded PNG of the overlay.

    Parameters
    ----------
    original_pil  : PIL Image (original, before normalisation)
    input_tensor  : preprocessed tensor on device, shape (1,3,224,224)
    model         : loaded ResNet50 in eval mode
    device        : torch device
    pred_class    : predicted class index

    Returns
    -------
    str  — base64-encoded PNG string  (data:image/png;base64,...)
    """
    gradcam = GradCAM(model, model.layer4, device)
    cam     = gradcam.generate_cam(input_tensor, pred_class)

    # Resize original to 224×224 as RGB numpy array
    img_np  = np.array(original_pil.resize((224, 224)).convert("RGB"))

    # Build coloured heatmap and overlay
    heatmap = cv2.resize(cam, (224, 224))
    heatmap = np.uint8(255 * heatmap)
    heatmap = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)
    heatmap = cv2.cvtColor(heatmap, cv2.COLOR_BGR2RGB)

    overlay = (heatmap * 0.4 + img_np * 0.6).astype(np.uint8)

    # Encode overlay to base64 PNG
    overlay_pil = Image.fromarray(overlay)
    buffer      = io.BytesIO()
    overlay_pil.save(buffer, format="PNG")
    b64 = base64.b64encode(buffer.getvalue()).decode("utf-8")
    return f"data:image/png;base64,{b64}"
