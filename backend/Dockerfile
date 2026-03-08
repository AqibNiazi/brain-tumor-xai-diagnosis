# ── Base image — slim Python 3.11 ─────────────────────────────────────────
FROM python:3.11-slim

# ── System deps for OpenCV ─────────────────────────────────────────────────
RUN apt-get update && apt-get install -y --no-install-recommends \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    libgl1 \
    && rm -rf /var/lib/apt/lists/*

# ── Working directory ──────────────────────────────────────────────────────
WORKDIR /app

# ── Install Python deps first (cached layer) ──────────────────────────────
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ── Copy app source ────────────────────────────────────────────────────────
COPY . .

# ── HF Spaces requires port 7860 ──────────────────────────────────────────
EXPOSE 7860

# ── Non-root user (HF Spaces requirement) ─────────────────────────────────
RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
USER appuser

# ── Start Flask on port 7860 ──────────────────────────────────────────────
CMD ["python", "app.py"]
