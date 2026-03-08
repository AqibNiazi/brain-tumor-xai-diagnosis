import React from "react";
import { Cpu } from "lucide-react";

export default function PageHeader() {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="flex items-center gap-3">
        <div className="w-8 h-[2px]" style={{ background: "var(--cyan)" }} />
        <Cpu size={16} color="var(--cyan)" />
        <span className="font-display text-2xl font-700 tracking-wider">
          DIAGNOSTIC TERMINAL
        </span>
      </div>
      <div className="flex-1 h-[1px]" style={{ background: "var(--border)" }} />
      <span
        className="font-mono text-[10px] tracking-widest"
        style={{ color: "var(--text-muted)" }}
      >
        RESNET-50 · TRANSFER LEARNING
      </span>
    </div>
  );
}
