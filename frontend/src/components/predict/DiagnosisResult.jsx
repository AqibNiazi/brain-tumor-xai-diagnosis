import React from "react";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { CLASS_META } from "./classMeta";

export default function DiagnosisResult({ result }) {
  const meta = CLASS_META[result.predicted_class] || {};
  const isHealthy = result.predicted_class === "notumor";

  return (
    <div className="panel p-6 relative overflow-hidden">
      <div className="absolute inset-0 scan-effect opacity-20 pointer-events-none" />
      <div
        className="absolute top-0 right-0 w-40 h-40 opacity-5"
        style={{ background: `radial-gradient(circle, ${meta.color}, transparent)` }}
      />

      {/* Class name + severity badge */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="font-mono text-[10px] tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>
            DIAGNOSIS RESULT · {meta.code}
          </div>
          <div
            className="font-display text-4xl font-700"
            style={{ color: meta.color, textShadow: `0 0 20px ${meta.color}60` }}
          >
            {meta.label?.toUpperCase() || result.predicted_class.toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span
            className="font-mono text-[10px] tracking-widest px-3 py-1 border"
            style={{ color: meta.color, borderColor: meta.color, background: `${meta.color}18` }}
          >
            {meta.severity}
          </span>
          {isHealthy
            ? <CheckCircle size={20} color="var(--green)" />
            : <AlertTriangle size={20} color={meta.color} />
          }
        </div>
      </div>

      {/* Confidence bar */}
      <div className="mb-1 flex justify-between">
        <span className="font-mono text-[10px] tracking-widest" style={{ color: "var(--text-muted)" }}>
          CONFIDENCE
        </span>
        <span className="font-mono text-sm font-500" style={{ color: meta.color }}>
          {result.confidence.toFixed(2)}%
        </span>
      </div>
      <div className="progress-bar mb-4">
        <div
          className="progress-fill"
          style={{
            width: `${result.confidence}%`,
            background: `linear-gradient(90deg, ${meta.color}80, ${meta.color})`,
            boxShadow: `0 0 8px ${meta.color}`,
          }}
        />
      </div>

      <p className="font-mono text-[10px] tracking-wide" style={{ color: "var(--text-muted)" }}>
        ⚠ THIS RESULT IS FOR RESEARCH PURPOSES ONLY. CONSULT A QUALIFIED RADIOLOGIST.
      </p>
    </div>
  );
}
