import React from "react";
import { X, RotateCcw } from "lucide-react";
import UploadZone from "./UploadZone";

export default function ImagePreviewPanel({ file, preview, loading, onFile, onReset }) {
  return (
    <div className="panel">
      {/* Panel header */}
      <div className="border-b border-[var(--border)] px-4 py-3 flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-widest" style={{ color: "var(--text-muted)" }}>
          INPUT · MRI SCAN
        </span>
        {file && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 transition-opacity hover:opacity-70"
          >
            <RotateCcw size={11} color="var(--text-muted)" />
            <span className="font-mono text-[10px]" style={{ color: "var(--text-muted)" }}>
              RESET
            </span>
          </button>
        )}
      </div>

      {/* Preview or upload zone */}
      {preview ? (
        <div className="relative scan-effect">
          <img
            src={preview}
            alt="Preview"
            className="w-full object-contain"
            style={{ maxHeight: 320 }}
          />
          {/* X button */}
          <button
            onClick={onReset}
            className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center border border-[var(--border)] transition-all hover:border-[var(--red)]"
            style={{ background: "var(--bg-panel)" }}
          >
            <X size={13} color="var(--text-muted)" />
          </button>
          {/* File info badge */}
          <div
            className="absolute bottom-3 left-3 font-mono text-[10px] px-2 py-1"
            style={{ background: "var(--bg-void)", color: "var(--cyan)", border: "1px solid var(--border)" }}
          >
            {file.name.length > 28 ? file.name.slice(0, 25) + "..." : file.name}
            {" · "}
            {(file.size / 1024).toFixed(0)} KB
          </div>
        </div>
      ) : (
        <UploadZone onFile={onFile} disabled={loading} />
      )}
    </div>
  );
}
