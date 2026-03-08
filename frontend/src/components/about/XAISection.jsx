import React from "react";
import { Shield } from "lucide-react";
import SectionHeading from "./SectionHeading";

const XAI_METHODS = [
  {
    name: "Grad-CAM",
    desc: "Gradient-weighted Class Activation Mapping highlights image regions with the highest influence on the prediction by computing gradient flow through the final convolutional layer.",
    color: "var(--cyan)",
  },
  {
    name: "LIME",
    desc: "Local Interpretable Model-agnostic Explanations perturbs input segments and trains a local surrogate model to identify which superpixels drove the prediction.",
    color: "var(--amber)",
  },
  {
    name: "SHAP",
    desc: "SHapley Additive exPlanations uses GradientExplainer to compute pixel-level attribution values based on cooperative game theory — quantifying each feature's marginal contribution.",
    color: "var(--purple)",
  },
];

const XAICard = ({ name, desc, color }) => (
  <div className="panel p-5">
    <div className="font-display text-lg font-600 mb-2" style={{ color }}>
      {name}
    </div>
    <p className="font-body text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
      {desc}
    </p>
  </div>
);

export default function XAISection() {
  return (
    <section
      className="animate-fade-up opacity-0 delay-400"
      style={{ animationFillMode: "forwards" }}
    >
      <SectionHeading icon={Shield} label="EXPLAINABLE AI METHODS" color="var(--purple)" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {XAI_METHODS.map(item => (
          <XAICard key={item.name} {...item} />
        ))}
      </div>
    </section>
  );
}
