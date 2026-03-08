"""
app.py
------
Flask application factory.

Local:       python app.py  (port 5000)
HF Spaces:   Docker CMD runs this on port 7860
"""

import os
from flask import Flask
from flask_cors import CORS

from models.model_loader import load_model, DEVICE
from routes.predict import predict_bp


def create_app() -> Flask:
    app = Flask(__name__)

    # ── CORS ──────────────────────────────────────────────────────────────
    # In production, replace "*" with your exact Vercel frontend URL:
    # e.g. "https://your-app.vercel.app"
    allowed_origins = os.environ.get("ALLOWED_ORIGINS", "*")

    if allowed_origins == "*":
        CORS(app, resources={r"/api/*": {"origins": "*"}})
    else:
        origins_list = [o.strip() for o in allowed_origins.split(",")]
        CORS(app, resources={r"/api/*": {"origins": origins_list}})

    # ── Load model weights ─────────────────────────────────────────────────
    weights_path = os.environ.get(
        "MODEL_WEIGHTS_PATH",
        os.path.join(os.path.dirname(__file__), "brain_tumor_model.pth")
    )

    if not os.path.exists(weights_path):
        raise FileNotFoundError(
            f"\n\n[ERROR] Model weights not found at: {weights_path}\n"
            "Place brain_tumor_model.pth in the project root.\n"
        )

    model = load_model(weights_path)
    app.config["MODEL"]  = model
    app.config["DEVICE"] = DEVICE

    # ── Blueprints ─────────────────────────────────────────────────────────
    app.register_blueprint(predict_bp, url_prefix="/api")

    @app.route("/")
    def index():
        return {"message": "Brain Tumor Detection API is running."}, 200

    return app


if __name__ == "__main__":
    flask_app = create_app()

    # HF Spaces requires port 7860.
    # Locally, PORT defaults to 5000 so nothing breaks.
    port = int(os.environ.get("PORT", 7860))

    flask_app.run(
        host="0.0.0.0",
        port=port,
        debug=False,          # always False in production
        use_reloader=False,   # reloader causes double model load
    )