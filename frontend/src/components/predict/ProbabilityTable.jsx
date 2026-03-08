import React from "react";
import { CLASS_META } from "./classMeta";

export default function ProbabilityTable({ probabilities }) {
  const rows = Object.entries(probabilities)
    .map(([key, val]) => ({
      name: CLASS_META[key]?.label || key,
      value: parseFloat(val.toFixed(2)),
      color: CLASS_META[key]?.color || "#fff",
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="panel overflow-hidden">
      <div
        className="border-b border-[var(--border)] px-4 py-2 font-mono text-[10px] tracking-widest"
        style={{ color: "var(--text-muted)" }}
      >
        DETAILED BREAKDOWN
      </div>
      <div className="divide-y divide-[var(--border)]">
        {rows.map((item) => (
          <div key={item.name} className="px-4 py-3 flex items-center gap-4">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: item.color, boxShadow: `0 0 6px ${item.color}` }}
            />
            <span className="font-mono text-xs flex-1" style={{ color: "var(--text-secondary)" }}>
              {item.name.toUpperCase()}
            </span>
            <div className="flex-1 progress-bar mx-4">
              <div
                className="progress-fill"
                style={{
                  width: `${item.value}%`,
                  background: `linear-gradient(90deg, ${item.color}60, ${item.color})`,
                  boxShadow: `0 0 6px ${item.color}80`,
                }}
              />
            </div>
            <span className="font-mono text-xs w-14 text-right" style={{ color: item.color }}>
              {item.value.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
