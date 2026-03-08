import React from "react";

export default function SectionHeading({ icon: Icon, label, color = "var(--cyan)" }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <Icon size={16} color={color} />
      <span className="font-display text-xl font-600 tracking-wider">{label}</span>
      <div className="flex-1 h-[1px]" style={{ background: "var(--border)" }} />
    </div>
  );
}
