import React from "react";

export default function AboutHero() {
  return (
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
  );
}
