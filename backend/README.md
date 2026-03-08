# Brain Tumor Detection — Backend Setup Guide

Complete step-by-step instructions for setting up and running the Flask backend.

---

## Project Structure

```
backend/
├── app.py                        # Flask app factory & entry point
├── requirements.txt              # Python dependencies
├── .env.example                  # Environment variable template
├── brain_tumor_model.pth         # ← Place your trained weights here
│
├── models/
│   └── model_loader.py           # ResNet50 builder + weight loader
│
├── routes/
│   └── predict.py                # POST /api/predict, GET /api/health
│
└── utils/
    ├── gradcam.py                # GradCAM + base64 overlay generator
    └── preprocessing.py          # Image transform pipeline
```

---

## Prerequisites

- Python 3.10 or 3.11 (recommended — PyTorch has best support here)
- pip
- Your trained `brain_tumor_model.pth` exported from the Kaggle notebook

---

## Step-by-Step Setup

### Step 1 — Open a terminal and navigate to the backend folder

```bash
cd brain_tumor_app/backend
```

---

### Step 2 — Create a virtual environment

A virtual environment keeps your project dependencies isolated from your global Python.

```bash
# Windows
python -m venv venv

# macOS / Linux
python3 -m venv venv
```

---

### Step 3 — Activate the virtual environment

You must activate it every time you open a new terminal.

```bash
# Windows (Command Prompt)
venv\Scripts\activate.bat

# Windows (PowerShell)
venv\Scripts\Activate.ps1

# macOS / Linux
source venv/bin/activate
```

After activation you will see `(venv)` at the start of your terminal prompt.

---

### Step 4 — Install dependencies

```bash
pip install -r requirements.txt
```

This installs Flask, PyTorch, torchvision, OpenCV, Pillow, and all other needed packages.
This may take 2–5 minutes depending on your internet speed.

---

### Step 5 — Place your model weights

Download `brain_tumor_model.pth` from your Kaggle notebook output and place it directly inside the `backend/` folder:

```
backend/
└── brain_tumor_model.pth    ← here
```

---

### Step 6 — Create your .env file

```bash
# Windows
copy .env.example .env

# macOS / Linux
cp .env.example .env
```

You can leave the defaults as-is for local development.

---

### Step 7 — Run the Flask server

```bash
python app.py
```

You should see output like:
```
[ModelLoader] Loaded weights from: brain_tumor_model.pth
[ModelLoader] Running on device  : cpu
 * Running on http://0.0.0.0:5000
```

---

## Testing the API

Once the server is running, test it using the examples below.

---

### Test 1 — Health check (browser or terminal)

Open in browser: http://localhost:5000/api/health

Or with curl:
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "device": "cpu",
  "classes": ["glioma", "meningioma", "notumor", "pituitary"]
}
```

---

### Test 2 — Predict on an image (curl)

```bash
curl -X POST http://localhost:5000/api/predict \
  -F "image=@/path/to/your/test_image.jpg" \
  -F "gradcam=true"
```

Expected response:
```json
{
  "predicted_class": "glioma",
  "class_index": 0,
  "confidence": 97.43,
  "probabilities": {
    "glioma": 97.43,
    "meningioma": 1.20,
    "notumor": 0.85,
    "pituitary": 0.52
  },
  "gradcam_overlay": "data:image/png;base64,iVBORw0KGgo..."
}
```

---

### Test 3 — Predict without GradCAM (faster)

```bash
curl -X POST http://localhost:5000/api/predict \
  -F "image=@/path/to/your/test_image.jpg" \
  -F "gradcam=false"
```

---

### Test 4 — Using Python requests

```python
import requests

url   = "http://localhost:5000/api/predict"
files = {"image": open("test_image.jpg", "rb")}
data  = {"gradcam": "true"}

response = requests.post(url, files=files, data=data)
print(response.json())
```

---

## API Reference

### GET /api/health

Returns server status and loaded class names.

| Field   | Type   | Description          |
|---------|--------|----------------------|
| status  | string | "ok" if running      |
| device  | string | "cpu" or "cuda:0"    |
| classes | array  | 4 class name strings |

---

### POST /api/predict

| Field   | Type   | Required | Description                        |
|---------|--------|----------|------------------------------------|
| image   | file   | Yes      | MRI image (JPG/PNG/WEBP/BMP)       |
| gradcam | string | No       | "true" or "false" (default "true") |

**Success Response (200)**

| Field           | Type   | Description                              |
|-----------------|--------|------------------------------------------|
| predicted_class | string | Top predicted class name                 |
| class_index     | int    | Index 0–3                                |
| confidence      | float  | Confidence % of top class                |
| probabilities   | object | Softmax % for all 4 classes              |
| gradcam_overlay | string | Base64 PNG overlay (if gradcam=true)     |

**Error Response (400 / 500)**

| Field | Type   | Description       |
|-------|--------|-------------------|
| error | string | Error description |

---

## Troubleshooting

**`FileNotFoundError: Model weights not found`**
→ Make sure `brain_tumor_model.pth` is in the `backend/` folder.

**`ModuleNotFoundError`**
→ Make sure your virtual environment is activated (`source venv/bin/activate`).

**`CUDA out of memory`**
→ The model runs on CPU by default if CUDA is unavailable. This is expected on most local machines.

**`Port 5000 already in use`**
→ Change the port in `app.py`: `flask_app.run(port=5001)`

**Slow first request**
→ First inference after startup is slower due to PyTorch JIT warmup. Subsequent requests are faster.
