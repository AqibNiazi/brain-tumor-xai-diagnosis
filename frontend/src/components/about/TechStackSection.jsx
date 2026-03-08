import React from "react";
import { Code2 } from "lucide-react";
import SectionHeading from "./SectionHeading";

const TECH_STACK = [
  {
    category: "Model",
    items: ["PyTorch 2.3", "ResNet50", "torchvision", "NumPy"],
    color: "var(--cyan)",
  },
  {
    category: "XAI",
    items: ["Grad-CAM", "LIME", "SHAP GradientExplainer", "OpenCV"],
    color: "var(--amber)",
  },
  {
    category: "Backend",
    items: ["Flask 3.0", "Flask-CORS", "Pillow", "Werkzeug"],
    color: "var(--green)",
  },
  {
    category: "Frontend",
    items: ["React 19", "Tailwind CSS 4", "Recharts", "Axios"],
    color: "var(--purple)",
  },
];

const TechCard = ({ category, items, color, delay }) => (
  <div
    className="panel p-5 animate-fade-up opacity-0"
    style={{ animationDelay: delay, animationFillMode: "forwards" }}
  >
    <div className="flex items-center gap-2 mb-3">
      <div className="w-2 h-2" style={{ background: color }} />
      <span
        className="font-mono text-[10px] tracking-widest"
        style={{ color }}
      >
        {category.toUpperCase()}
      </span>
    </div>
    <div className="flex flex-wrap gap-2">
      {items.map(item => (
        <span
          key={item}
          className="font-mono text-[11px] tracking-wide px-2 py-1"
          style={{
            color: "var(--text-secondary)",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
          }}
        >
          {item}
        </span>
      ))}
    </div>
  </div>
);

export default function TechStackSection() {
  return (
    <section
      className="animate-fade-up opacity-0 delay-300"
      style={{ animationFillMode: "forwards" }}
    >
      <SectionHeading icon={Code2} label="TECHNOLOGY STACK" color="var(--green)" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {TECH_STACK.map((group, i) => (
          <TechCard key={group.category} {...group} delay={`${i * 0.1}s`} />
        ))}
      </div>
    </section>
  );
}
