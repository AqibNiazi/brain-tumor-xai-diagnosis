import React from "react";

export default function GradCamToggle({ enabled, onToggle }) {
  return (
    <div className="panel px-4 py-3 flex items-center justify-between">
      <div>
        <p className="font-mono text-xs tracking-wider" style={{ color: "var(--text-secondary)" }}>
          GRAD-CAM OVERLAY
        </p>
        <p className="font-mono text-[10px]" style={{ color: "var(--text-muted)" }}>
          Generate visual explanation heatmap
        </p>
      </div>
      <button
        onClick={onToggle}
        className="w-12 h-6 relative transition-all duration-300"
        style={{
          background: enabled ? "var(--cyan)" : "var(--bg-hover)",
          border: `1px solid ${enabled ? "var(--cyan)" : "var(--border)"}`,
        }}
      >
        <span
          className="absolute top-0.5 w-5 h-5 transition-all duration-300"
          style={{
            background: enabled ? "var(--bg-void)" : "var(--text-muted)",
            left: enabled ? "calc(100% - 22px)" : "2px",
          }}
        />
      </button>
    </div>
  );
}
