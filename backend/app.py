"""
app.py
------
Flask application factory.
Run with:  python app.py
"""

import os
from flask import Flask
from flask_cors import CORS

from models.model_loader import load_model, DEVICE
from routes.predict import predict_bp


def create_app() -> Flask:
    app = Flask(__name__)

    # ── CORS — allow React dev server (port 5173 Vite / 3000 CRA) ──────────
    CORS(app, resources={r"/api/*": {"origins": [
        "http://localhost:3000",
        "http://localhost:5173",
    ]}})

    # ── Load model weights ──────────────────────────────────────────────────
    weights_path = os.environ.get(
        "MODEL_WEIGHTS_PATH",
        os.path.join(os.path.dirname(__file__), "brain_tumor_model.pth")
    )

    if not os.path.exists(weights_path):
        raise FileNotFoundError(
            f"\n\n[ERROR] Model weights not found at: {weights_path}\n"
            "Place brain_tumor_model.pth in the backend/ folder\n"
            "or set MODEL_WEIGHTS_PATH environment variable.\n"
        )

    model = load_model(weights_path)

    # Store model & device in app config so routes can access them
    app.config["MODEL"]  = model
    app.config["DEVICE"] = DEVICE

    # ── Register blueprints ─────────────────────────────────────────────────
    app.register_blueprint(predict_bp, url_prefix="/api")

    # ── Simple root route ───────────────────────────────────────────────────
    @app.route("/")
    def index():
        return {"message": "Brain Tumor Detection API is running."}, 200

    return app


if __name__ == "__main__":
    flask_app = create_app()
    flask_app.run(
        host="0.0.0.0",
        port=5000,
        debug=True,
        use_reloader=False   # reloader causes double model load — keep False
    )
