import React from "react";
import { Activity } from "lucide-react";

const CLASSES = [
  {
    name: "Glioma",
    code: "GL-01",
    desc: "Malignant tumor arising from glial cells in the brain or spine.",
    severity: "HIGH",
    color: "var(--red)",
    freq: 78,
  },
  {
    name: "Meningioma",
    code: "MN-02",
    desc: "Tumor originating in the meninges — membranes surrounding the brain.",
    severity: "MODERATE",
    color: "var(--amber)",
    freq: 62,
  },
  {
    name: "Pituitary",
    code: "PT-03",
    desc: "Tumor of the pituitary gland affecting hormonal regulation.",
    severity: "MODERATE",
    color: "var(--purple)",
    freq: 71,
  },
  {
    name: "No Tumor",
    code: "NT-00",
    desc: "Healthy brain scan — no tumor tissue detected.",
    severity: "CLEAR",
    color: "var(--green)",
    freq: 95,
  },
];

const ClassCard = ({ item, delay }) => (
  <div
    className="panel p-5 animate-fade-up opacity-0 hover:border-[var(--border-bright)] transition-all duration-300 group cursor-default"
    style={{ animationDelay: delay, animationFillMode: "forwards" }}
  >
    <div className="flex items-start justify-between mb-3">
      <div>
        <div className="font-mono text-[10px] tracking-widest mb-1" style={{ color: "var(--text-muted)" }}>
          {item.code}
        </div>
        <div className="font-display text-xl font-600" style={{ color: item.color }}>
          {item.name}
        </div>
      </div>
      <span
        className="font-mono text-[9px] tracking-widest px-2 py-1 border"
        style={{ color: item.color, borderColor: item.color, background: `${item.color}18` }}
      >
        {item.severity}
      </span>
    </div>

    <p className="font-body text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
      {item.desc}
    </p>

    <div>
      <div className="flex justify-between mb-1">
        <span className="font-mono text-[10px]" style={{ color: "var(--text-muted)" }}>DETECTION RATE</span>
        <span className="font-mono text-[10px]" style={{ color: item.color }}>{item.freq}%</span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill group-hover:shadow-lg transition-all duration-700"
          style={{
            width: `${item.freq}%`,
            background: `linear-gradient(90deg, ${item.color}80, ${item.color})`,
            boxShadow: `0 0 8px ${item.color}`,
          }}
        />
      </div>
    </div>
  </div>
);

export default function ClassesSection() {
  return (
    <section>
      <div className="flex items-center gap-4 mb-6">
        <Activity size={16} color="var(--cyan)" />
        <span className="font-display text-xl font-600 tracking-wider">CLASSIFICATION TARGETS</span>
        <div className="flex-1 h-[1px]" style={{ background: "var(--border)" }} />
        <span className="font-mono text-[10px] tracking-widest" style={{ color: "var(--text-muted)" }}>
          4 CLASSES
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CLASSES.map((c, i) => (
          <ClassCard key={c.name} item={c} delay={`${i * 0.1}s`} />
        ))}
      </div>
    </section>
  );
}
