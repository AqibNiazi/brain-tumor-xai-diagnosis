import React from "react";

const STATS = [
  { label: "Model Accuracy",   value: "96.4%",   sub: "on test dataset",      color: "var(--cyan)"   },
  { label: "Tumor Classes",    value: "4",        sub: "classification types", color: "var(--green)"  },
  { label: "Backbone",         value: "ResNet50", sub: "transfer learning",    color: "var(--amber)"  },
  { label: "Input Resolution", value: "224px",    sub: "normalised MRI",       color: "var(--purple)" },
];

const StatCard = ({ label, value, sub, color, delay }) => (
  <div
    className="panel corner-tl p-5 animate-fade-up opacity-0 relative"
    style={{ animationDelay: delay, animationFillMode: "forwards" }}
  >
    <div className="font-mono text-[10px] tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>
      {label.toUpperCase()}
    </div>
    <div className="font-display text-4xl font-700 leading-none mb-1" style={{ color }}>
      {value}
    </div>
    <div className="font-mono text-[11px]" style={{ color: "var(--text-muted)" }}>
      {sub}
    </div>
    <div
      className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full"
      style={{ background: color, boxShadow: `0 0 6px ${color}` }}
    />
  </div>
);

export default function StatsSection() {
  return (
    <section>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((s, i) => (
          <StatCard key={s.label} {...s} delay={`${i * 0.1}s`} />
        ))}
      </div>
    </section>
  );
}
