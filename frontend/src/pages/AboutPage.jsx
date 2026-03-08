import React from "react";
import {
  Brain,
  Layers,
  Database,
  FlaskConical,
  Code2,
  GitBranch,
  Shield,
  Award,
} from "lucide-react";

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

const METRICS = [
  { label: "Overall Accuracy", value: "96.4%", color: "var(--cyan)" },
  { label: "Glioma F1", value: "97.1%", color: "var(--red)" },
  { label: "Meningioma F1", value: "94.2%", color: "var(--amber)" },
  { label: "Pituitary F1", value: "98.3%", color: "var(--purple)" },
  { label: "No Tumor F1", value: "96.8%", color: "var(--green)" },
  { label: "Parameters", value: "23.5M", color: "var(--cyan)" },
];

const SectionHeading = ({ icon: Icon, label, color = "var(--cyan)" }) => (
  <div className="flex items-center gap-4 mb-6">
    <Icon size={16} color={color} />
    <span className="font-display text-xl font-600 tracking-wider">
      {label}
    </span>
    <div className="flex-1 h-[1px]" style={{ background: "var(--border)" }} />
  </div>
);

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">
      {/* ── Hero ── */}
      <section
        className="animate-fade-up opacity-0"
        style={{ animationFillMode: "forwards" }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-[2px]" style={{ background: "var(--cyan)" }} />
          <span
            className="font-mono text-xs tracking-widest"
            style={{ color: "var(--cyan)" }}
          >
            SYSTEM DOCUMENTATION
          </span>
        </div>
        <h1
          className="font-display text-5xl font-700 leading-none mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          ABOUT THE
          <br />
          <span style={{ color: "var(--cyan)" }} className="glow-text">
            PROJECT
          </span>
        </h1>
        <p
          className="font-body text-base leading-relaxed max-w-2xl"
          style={{ color: "var(--text-secondary)" }}
        >
          NeuraScan is an interpretable deep learning system for brain tumor
          classification. Built on ResNet50 transfer learning, it classifies MRI
          scans into four categories and uses Grad-CAM to provide visual
          explanations — making AI decisions transparent enough for clinical
          research contexts.
        </p>
      </section>

      {/* ── Performance Metrics ── */}
      <section
        className="animate-fade-up opacity-0 delay-100"
        style={{ animationFillMode: "forwards" }}
      >
        <SectionHeading
          icon={Award}
          label="MODEL PERFORMANCE"
          color="var(--amber)"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {METRICS.map((m, i) => (
            <div
              key={m.label}
              className="panel p-5 animate-fade-up opacity-0"
              style={{
                animationDelay: `${i * 0.08}s`,
                animationFillMode: "forwards",
              }}
            >
              <div
                className="font-mono text-[10px] tracking-widest mb-2"
                style={{ color: "var(--text-muted)" }}
              >
                {m.label.toUpperCase()}
              </div>
              <div
                className="font-display text-3xl font-700"
                style={{ color: m.color }}
              >
                {m.value}
              </div>
              <div
                className="mt-2 h-[2px]"
                style={{
                  background: `linear-gradient(90deg, ${m.color}, transparent)`,
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── Methodology Timeline ── */}
      <section
        className="animate-fade-up opacity-0 delay-200"
        style={{ animationFillMode: "forwards" }}
      >
        <SectionHeading icon={GitBranch} label="METHODOLOGY" />
        <div className="space-y-4">
          {TIMELINE.map((item, i) => (
            <div
              key={item.step}
              className="panel p-5 flex gap-5 items-start animate-fade-up opacity-0 hover:border-[var(--border-bright)] transition-all duration-300"
              style={{
                animationDelay: `${i * 0.1}s`,
                animationFillMode: "forwards",
              }}
            >
              {/* Step number */}
              <div
                className="flex-shrink-0 font-display text-3xl font-700 leading-none w-10"
                style={{ color: "var(--border-bright)" }}
              >
                {item.step}
              </div>
              {/* Icon */}
              <div
                className="flex-shrink-0 w-9 h-9 flex items-center justify-center border border-[var(--border)]"
                style={{ background: "var(--bg-card)" }}
              >
                <item.icon size={16} color="var(--cyan)" strokeWidth={1.5} />
              </div>
              {/* Text */}
              <div>
                <div
                  className="font-display text-base font-600 tracking-wider mb-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  {item.title.toUpperCase()}
                </div>
                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section
        className="animate-fade-up opacity-0 delay-300"
        style={{ animationFillMode: "forwards" }}
      >
        <SectionHeading
          icon={Code2}
          label="TECHNOLOGY STACK"
          color="var(--green)"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TECH_STACK.map((group, i) => (
            <div
              key={group.category}
              className="panel p-5 animate-fade-up opacity-0"
              style={{
                animationDelay: `${i * 0.1}s`,
                animationFillMode: "forwards",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2" style={{ background: group.color }} />
                <span
                  className="font-mono text-[10px] tracking-widest"
                  style={{ color: group.color }}
                >
                  {group.category.toUpperCase()}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
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
          ))}
        </div>
      </section>

      {/* ── XAI Explanation ── */}
      <section
        className="animate-fade-up opacity-0 delay-400"
        style={{ animationFillMode: "forwards" }}
      >
        <SectionHeading
          icon={Shield}
          label="EXPLAINABLE AI METHODS"
          color="var(--purple)"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
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
          ].map((item) => (
            <div key={item.name} className="panel p-5">
              <div
                className="font-display text-lg font-600 mb-2"
                style={{ color: item.color }}
              >
                {item.name}
              </div>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Disclaimer ── */}
      <section>
        <div
          className="panel p-6 border-[var(--red)] border-opacity-40"
          style={{ borderColor: "rgba(255,56,96,0.3)" }}
        >
          <div className="flex items-start gap-3">
            <FlaskConical
              size={20}
              color="var(--red)"
              className="flex-shrink-0 mt-0.5"
            />
            <div>
              <p
                className="font-display font-600 tracking-wider mb-1"
                style={{ color: "var(--red)" }}
              >
                RESEARCH DISCLAIMER
              </p>
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                This system is developed for academic and research purposes
                only. It is not a certified medical device and must not be used
                as the sole basis for clinical decisions. All results should be
                reviewed and validated by qualified medical professionals. Brain
                tumor diagnosis requires comprehensive clinical evaluation
                including patient history, additional imaging modalities, and
                specialist assessment.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
