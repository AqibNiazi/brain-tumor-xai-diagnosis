import React from "react";
import { Award } from "lucide-react";
import SectionHeading from "./SectionHeading";

const METRICS = [
  { label: "Overall Accuracy", value: "96.4%", color: "var(--cyan)"   },
  { label: "Glioma F1",        value: "97.1%", color: "var(--red)"    },
  { label: "Meningioma F1",    value: "94.2%", color: "var(--amber)"  },
  { label: "Pituitary F1",     value: "98.3%", color: "var(--purple)" },
  { label: "No Tumor F1",      value: "96.8%", color: "var(--green)"  },
  { label: "Parameters",       value: "23.5M", color: "var(--cyan)"   },
];

const MetricCard = ({ label, value, color, delay }) => (
  <div
    className="panel p-5 animate-fade-up opacity-0"
    style={{ animationDelay: delay, animationFillMode: "forwards" }}
  >
    <div
      className="font-mono text-[10px] tracking-widest mb-2"
      style={{ color: "var(--text-muted)" }}
    >
      {label.toUpperCase()}
    </div>
    <div className="font-display text-3xl font-700" style={{ color }}>
      {value}
    </div>
    <div
      className="mt-2 h-[2px]"
      style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
    />
  </div>
);

export default function MetricsSection() {
  return (
    <section
      className="animate-fade-up opacity-0 delay-100"
      style={{ animationFillMode: "forwards" }}
    >
      <SectionHeading icon={Award} label="MODEL PERFORMANCE" color="var(--amber)" />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {METRICS.map((m, i) => (
          <MetricCard key={m.label} {...m} delay={`${i * 0.08}s`} />
        ))}
      </div>
    </section>
  );
}
