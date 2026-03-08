import React from "react";

const TIPS = [
  "Upload a brain MRI scan (axial view recommended)",
  "Enable Grad-CAM to see which regions influenced the result",
  "Results show confidence scores for all 4 tumor classes",
  "Always verify results with a qualified medical professional",
];

export default function InstructionsPanel() {
  return (
    <div className="panel px-4 py-4 space-y-2">
      <p className="font-mono text-[10px] tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>
        INSTRUCTIONS
      </p>
      {TIPS.map((tip, i) => (
        <div key={i} className="flex items-start gap-2">
          <span className="font-mono text-[10px] mt-0.5" style={{ color: "var(--cyan)" }}>›</span>
          <span className="font-mono text-[10px]" style={{ color: "var(--text-muted)" }}>{tip}</span>
        </div>
      ))}
    </div>
  );
}
