import React from "react";
import { Brain } from "lucide-react";

export default function AwaitingScan() {
  return (
    <div
      className="panel h-full flex flex-col items-center justify-center gap-4 py-20"
      style={{ minHeight: 400 }}
    >
      <div className="relative">
        <Brain size={60} color="var(--text-muted)" strokeWidth={0.8} />
        <div className="absolute inset-0 animate-rotate-slow border border-[var(--border)] rounded-full" />
      </div>
      <div className="text-center">
        <p
          className="font-display text-lg font-600 tracking-wider mb-1"
          style={{ color: "var(--text-muted)" }}
        >
          AWAITING SCAN
        </p>
        <p className="font-mono text-[11px] tracking-wider" style={{ color: "var(--text-muted)" }}>
          Upload an MRI image and run diagnosis to see results here
        </p>
      </div>
    </div>
  );
}
