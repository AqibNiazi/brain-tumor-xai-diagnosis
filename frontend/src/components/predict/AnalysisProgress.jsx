import React from "react";

const STAGE_LABEL = (progress) => {
  if (progress < 30) return "LOADING IMAGE...";
  if (progress < 60) return "RUNNING FORWARD PASS...";
  if (progress < 85) return "COMPUTING GRAD-CAM...";
  return "FINALISING...";
};

export default function AnalysisProgress({ progress }) {
  return (
    <div className="panel px-4 py-3">
      <div className="flex justify-between mb-2">
        <span className="font-mono text-[10px] tracking-widest" style={{ color: "var(--cyan)" }}>
          PROCESSING
        </span>
        <span className="font-mono text-[10px]" style={{ color: "var(--cyan)" }}>
          {Math.round(progress)}%
        </span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="mt-2 font-mono text-[10px]" style={{ color: "var(--text-muted)" }}>
        {STAGE_LABEL(progress)}
      </div>
    </div>
  );
}
