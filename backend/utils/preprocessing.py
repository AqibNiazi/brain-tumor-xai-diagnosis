"""
preprocessing.py
----------------
Image preprocessing pipeline — identical to test_transforms in training notebook.
"""

import torch
from torchvision import transforms
from PIL import Image


# Exact same transforms as test_transforms in training notebook
INFER_TRANSFORM = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

# Allowed upload extensions
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "webp", "bmp"}


def allowed_file(filename: str) -> bool:
    return (
        "." in filename
        and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS
    )


def preprocess_image(pil_image: Image.Image, device: torch.device) -> torch.Tensor:
    """
    Convert a PIL Image to a normalised tensor on `device`.

    Returns
    -------
    torch.Tensor  shape (1, 3, 224, 224) on device
    """
    rgb   = pil_image.convert("RGB")
    tensor = INFER_TRANSFORM(rgb).unsqueeze(0).to(device)
    return tensor
