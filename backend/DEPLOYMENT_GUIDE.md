# 🧠 Brain Tumor Detection API — HF Spaces Deployment Guide

## What You Need Before Starting

- [ ] Hugging Face account → https://huggingface.co/join
- [ ] `brain_tumor_model.pth` saved from your Kaggle notebook
- [ ] Git installed on your machine
- [ ] `git-lfs` installed (for uploading the `.pth` file)

---

## STEP 1 — Install git-lfs

Git LFS (Large File Storage) is required to upload your `.pth` model file.
HF Spaces uses it automatically for files over 10MB.

**Mac:**
```bash
brew install git-lfs
git lfs install
```

**Windows:**
Download from https://git-lfs.com and run the installer, then:
```bash
git lfs install
```

**Linux:**
```bash
sudo apt install git-lfs
git lfs install
```

---

## STEP 2 — Create a new HF Space

1. Go to https://huggingface.co/new-space
2. Fill in the form:
   - **Space name:** `brain-tumor-detection-api` (or any name you like)
   - **License:** MIT
   - **SDK:** Select **Docker**
   - **Visibility:** Public (free) or Private
3. Click **Create Space**

You will land on an empty Space page with a git repo URL like:
```
https://huggingface.co/spaces/YOUR_USERNAME/brain-tumor-detection-api
```

---

## STEP 3 — Clone the Space repo locally

```bash
git clone https://huggingface.co/spaces/YOUR_USERNAME/brain-tumor-detection-api
cd brain-tumor-detection-api
```

---

## STEP 4 — Copy your backend files into the cloned folder

Your final folder structure must look exactly like this:

```
brain-tumor-detection-api/
├── README.md                  ← provided (has HF config header)
├── Dockerfile                 ← provided
├── requirements.txt           ← provided (CPU-only torch)
├── app.py                     ← provided (port 7860)
├── brain_tumor_model.pth      ← YOUR trained weights from Kaggle
├── models/
│   ├── __init__.py
│   └── model_loader.py
├── routes/
│   ├── __init__.py
│   └── predict.py
└── utils/
    ├── __init__.py
    ├── gradcam.py
    └── preprocessing.py
```

Copy the files provided alongside this guide into the cloned folder.
Then copy your `brain_tumor_model.pth` from Kaggle into the root.

---

## STEP 5 — Download your model weights from Kaggle

In your Kaggle notebook, run this cell after training:
```python
from IPython.display import FileLink
FileLink('/kaggle/working/brain_tumor_model.pth')
```
Click the download link that appears. Save the `.pth` file to your computer.

Then copy it into the cloned repo folder:
```bash
cp ~/Downloads/brain_tumor_model.pth ./brain_tumor_model.pth
```

---

## STEP 6 — Track the .pth file with git-lfs

```bash
git lfs track "*.pth"
git add .gitattributes
```

This tells git to upload the large model file via LFS instead of regular git.

---

## STEP 7 — Commit and push everything

```bash
git add .
git commit -m "Initial deployment: Flask API + ResNet50 model"
git push
```

You will be prompted for your HF credentials:
- **Username:** your Hugging Face username
- **Password:** your HF **Access Token** (not your account password)

To get your access token: https://huggingface.co/settings/tokens
→ Click **New token** → Role: **Write** → Copy the token

---

## STEP 8 — Watch the build

1. Go to your Space URL:
   `https://huggingface.co/spaces/YOUR_USERNAME/brain-tumor-detection-api`
2. Click the **Logs** tab (top right of the Space page)
3. You will see Docker building — this takes **5–10 minutes** the first time
4. When it says `Running on http://0.0.0.0:7860`, your API is live ✅

---

## STEP 9 — Get your API URL

Your live API base URL will be:
```
https://YOUR_USERNAME-brain-tumor-detection-api.hf.space
```

Test it in your browser:
```
https://YOUR_USERNAME-brain-tumor-detection-api.hf.space/api/health
```

You should see:
```json
{"status": "ok", "device": "cpu", "classes": ["glioma", "meningioma", "notumor", "pituitary"]}
```

---

## STEP 10 — Update your React frontend

Open `frontend/src/services/api.js` and update the production URL:

```js
// const serverBaseURL = "http://127.0.0.1:5000";    // Local — comment this out
const serverBaseURL = "https://YOUR_USERNAME-brain-tumor-detection-api.hf.space"; // Production
```

---

## STEP 11 — Set ALLOWED_ORIGINS (after deploying frontend)

Once you deploy the React app to Vercel and get a URL like
`https://your-app.vercel.app`, lock down CORS so only your frontend can call the API.

In your HF Space → **Settings** → **Variables and secrets** → Add:

| Name | Value |
|---|---|
| `ALLOWED_ORIGINS` | `https://your-app.vercel.app` |

Then go to **Settings** → **Factory reboot** to restart the Space.

---

## Common Errors & Fixes

| Error | Cause | Fix |
|---|---|---|
| `FileNotFoundError: brain_tumor_model.pth` | `.pth` file not pushed | Check `git lfs track "*.pth"` was run before committing |
| Build stuck at `pip install torch` | Normal — torch is large | Wait, it takes 5–8 min |
| `Port 7860 not exposed` | Wrong port in app.py | Use the provided `app.py` — it reads `PORT` env var |
| Space shows "Building" forever | Docker error | Check Logs tab for the actual error |
| CORS error in browser | `ALLOWED_ORIGINS` not set | Set it in Space Settings to your Vercel URL |
| `git push` asks for password | Need HF token | Use Access Token, not account password |

---

## Free Tier Limits on HF Spaces

| Resource | Free Tier |
|---|---|
| CPU | 2 vCPU |
| RAM | 16 GB |
| Storage | 50 GB |
| Timeout | No limit on requests |
| Sleep | Space sleeps after 48h of inactivity (cold start ~30s) |
| Bandwidth | Unlimited |

> **Note on cold starts:** The free tier Space will go to sleep after 48 hours
> of no traffic. The first request after sleeping takes ~30 seconds while the
> model reloads. This is normal. Upgrade to a paid persistent Space ($0/hr CPU)
> to avoid this.
