"""
model_loader.py
---------------
Loads the trained ResNet50 brain tumor classifier.
Architecture must exactly match the training notebook:
  - ResNet50 backbone
  - fc replaced with Linear(2048, 4)
  - inplace ReLU disabled (required for GradCAM hook compatibility)
"""

import torch
import torch.nn as nn
from torchvision import models
import torchvision.models.resnet as resnet_module


# ── Class labels (must match ImageFolder alphabetical order from training) ──
CLASS_NAMES = ["glioma", "meningioma", "notumor", "pituitary"]

# ── Device ──────────────────────────────────────────────────────────────────
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")


# ── Patch ResNet inplace ops (same patches as training notebook Step 3) ─────
def _patched_bottleneck_forward(self, x):
    identity = x
    out = self.conv1(x)
    out = self.bn1(out)
    out = self.relu(out)
    out = self.conv2(out)
    out = self.bn2(out)
    out = self.relu(out)
    out = self.conv3(out)
    out = self.bn3(out)
    if self.downsample is not None:
        identity = self.downsample(x)
    out = out + identity          # out-of-place — required for GradCAM
    out = self.relu(out)
    return out


def _patched_basicblock_forward(self, x):
    identity = x
    out = self.conv1(x)
    out = self.bn1(out)
    out = self.relu(out)
    out = self.conv2(out)
    out = self.bn2(out)
    if self.downsample is not None:
        identity = self.downsample(x)
    out = out + identity          # out-of-place — required for GradCAM
    out = self.relu(out)
    return out


def _disable_inplace_relu(model):
    for module in model.modules():
        if isinstance(module, nn.ReLU):
            module.inplace = False


def _apply_patches():
    """Apply class-level patches once at import time."""
    resnet_module.Bottleneck.forward = _patched_bottleneck_forward
    resnet_module.BasicBlock.forward = _patched_basicblock_forward


# Apply patches immediately on import
_apply_patches()


# ── Model builder ────────────────────────────────────────────────────────────
def build_model() -> nn.Module:
    """Build ResNet50 with 4-class head. Matches training notebook exactly."""
    model = models.resnet50(weights=None)
    model.fc = nn.Linear(model.fc.in_features, 4)
    _disable_inplace_relu(model)
    return model


def load_model(weights_path: str) -> nn.Module:
    """
    Load trained weights into model and set to eval mode.

    Parameters
    ----------
    weights_path : str
        Path to brain_tumor_model.pth saved from training notebook.

    Returns
    -------
    nn.Module  (on DEVICE, in eval mode)
    """
    model = build_model()
    state_dict = torch.load(weights_path, map_location=DEVICE)
    model.load_state_dict(state_dict)
    model = model.to(DEVICE)
    model.eval()
    print(f"[ModelLoader] Loaded weights from: {weights_path}")
    print(f"[ModelLoader] Running on device  : {DEVICE}")
    return model
