import React from "react";
import { Zap, Target, Shield, BarChart3 } from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "Instant Analysis",
    desc: "ResNet50 inference pipeline delivers results in under 2 seconds.",
    color: "var(--cyan)",
  },
  {
    icon: Target,
    title: "Grad-CAM Heatmaps",
    desc: "Visual explanations highlight exact regions driving the prediction.",
    color: "var(--amber)",
  },
  {
    icon: Shield,
    title: "Explainable AI",
    desc: "Confidence scores and probability breakdown for full transparency.",
    color: "var(--green)",
  },
  {
    icon: BarChart3,
    title: "Multi-class Output",
    desc: "Softmax probabilities across all 4 tumor categories simultaneously.",
    color: "var(--purple)",
  },
];

const FeatureCard = ({ item, delay }) => (
  <div
    className="flex gap-4 p-5 panel animate-fade-up opacity-0 hover:border-[var(--border-bright)] transition-all duration-300"
    style={{ animationDelay: delay, animationFillMode: "forwards" }}
  >
    <div
      className="flex-shrink-0 w-10 h-10 flex items-center justify-center"
      style={{ background: `${item.color}18`, border: `1px solid ${item.color}40` }}
    >
      <item.icon size={18} color={item.color} />
    </div>
    <div>
      <div className="font-display text-base font-600 mb-1" style={{ color: "var(--text-primary)" }}>
        {item.title}
      </div>
      <p className="font-body text-sm" style={{ color: "var(--text-secondary)" }}>
        {item.desc}
      </p>
    </div>
  </div>
);

export default function FeaturesSection() {
  return (
    <section>
      <div className="flex items-center gap-4 mb-6">
        <Zap size={16} color="var(--amber)" />
        <span className="font-display text-xl font-600 tracking-wider">SYSTEM CAPABILITIES</span>
        <div className="flex-1 h-[1px]" style={{ background: "var(--border)" }} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FEATURES.map((f, i) => (
          <FeatureCard key={f.title} item={f} delay={`${i * 0.1}s`} />
        ))}
      </div>
    </section>
  );
}
