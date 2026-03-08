import React from "react";
import { Eye, EyeOff } from "lucide-react";

export default function ScanImageGrid({ imagePreview, gradcam, showGradCam, onToggleGradCam }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Original scan */}
      <div className="panel overflow-hidden">
        <div
          className="border-b border-[var(--border)] px-3 py-2 font-mono text-[10px] tracking-widest"
          style={{ color: "var(--text-muted)" }}
        >
          ORIGINAL SCAN
        </div>
        <img
          src={imagePreview}
          alt="MRI scan"
          className="w-full object-cover"
          style={{ maxHeight: 220 }}
        />
      </div>

      {/* GradCAM overlay */}
      <div className="panel overflow-hidden relative">
        <div className="border-b border-[var(--border)] px-3 py-2 flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-widest" style={{ color: "var(--text-muted)" }}>
            GRAD-CAM OVERLAY
          </span>
          <button onClick={onToggleGradCam} className="transition-opacity hover:opacity-70">
            {showGradCam
              ? <Eye size={12} color="var(--cyan)" />
              : <EyeOff size={12} color="var(--text-muted)" />
            }
          </button>
        </div>
        {gradcam && showGradCam ? (
          <img src={gradcam} alt="GradCAM" className="w-full object-cover" style={{ maxHeight: 220 }} />
        ) : (
          <div
            className="flex items-center justify-center h-40 font-mono text-[10px]"
            style={{ color: "var(--text-muted)" }}
          >
            {gradcam ? "HIDDEN" : "NOT AVAILABLE"}
          </div>
        )}
      </div>
    </div>
  );
}
