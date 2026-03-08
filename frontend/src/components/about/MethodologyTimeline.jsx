import React from "react";
import { Database, Layers, Brain, Shield, Code2, GitBranch } from "lucide-react";
import SectionHeading from "./SectionHeading";

const TIMELINE = [
  {
    step: "01",
    title: "Data Collection",
    desc: "7,023 brain MRI scans across 4 classes sourced from a curated clinical dataset.",
    icon: Database,
  },
  {
    step: "02",
    title: "Preprocessing",
    desc: "Images resized to 224×224, normalised with ImageNet statistics, augmented with flips and rotations.",
    icon: Layers,
  },
  {
    step: "03",
    title: "Transfer Learning",
    desc: "ResNet50 pre-trained on ImageNet fine-tuned with Adam optimiser (lr=0.0001) over 10 epochs.",
    icon: Brain,
  },
  {
    step: "04",
    title: "Explainability",
    desc: "Grad-CAM generates class-discriminative heatmaps; LIME & SHAP provide complementary explanations.",
    icon: Shield,
  },
  {
    step: "05",
    title: "Deployment",
    desc: "Flask REST API serves predictions; React + Tailwind frontend delivers results with visual overlays.",
    icon: Code2,
  },
];

const TimelineItem = ({ step, title, desc, icon: Icon, delay }) => (
  <div
    className="panel p-5 flex gap-5 items-start animate-fade-up opacity-0 hover:border-[var(--border-bright)] transition-all duration-300"
    style={{ animationDelay: delay, animationFillMode: "forwards" }}
  >
    {/* Step number */}
    <div
      className="flex-shrink-0 font-display text-3xl font-700 leading-none w-10"
      style={{ color: "var(--border-bright)" }}
    >
      {step}
    </div>

    {/* Icon */}
    <div
      className="flex-shrink-0 w-9 h-9 flex items-center justify-center border border-[var(--border)]"
      style={{ background: "var(--bg-card)" }}
    >
      <Icon size={16} color="var(--cyan)" strokeWidth={1.5} />
    </div>

    {/* Text */}
    <div>
      <div
        className="font-display text-base font-600 tracking-wider mb-1"
        style={{ color: "var(--text-primary)" }}
      >
        {title.toUpperCase()}
      </div>
      <p className="font-body text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        {desc}
      </p>
    </div>
  </div>
);

export default function MethodologyTimeline() {
  return (
    <section
      className="animate-fade-up opacity-0 delay-200"
      style={{ animationFillMode: "forwards" }}
    >
      <SectionHeading icon={GitBranch} label="METHODOLOGY" />
      <div className="space-y-4">
        {TIMELINE.map((item, i) => (
          <TimelineItem key={item.step} {...item} delay={`${i * 0.1}s`} />
        ))}
      </div>
    </section>
  );
}
