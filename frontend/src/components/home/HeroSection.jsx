import React from "react";
import { useNavigate } from "react-router-dom";
import { Brain, Cpu, ChevronRight } from "lucide-react";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative">
      {/* Decorative brain orb */}
      <div className="absolute right-0 top-0 w-64 h-64 opacity-10 pointer-events-none">
        <div className="w-full h-full rounded-full border border-[var(--cyan)] animate-rotate-slow" />
        <div className="absolute inset-4 rounded-full border border-[var(--cyan)]" />
        <div className="absolute inset-8 rounded-full border border-[var(--cyan)] opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Brain size={80} color="var(--cyan)" strokeWidth={0.5} />
        </div>
      </div>

      <div className="max-w-2xl">
        {/* Badge */}
        <div
          className="flex items-center gap-3 mb-6 animate-fade-up opacity-0"
          style={{ animationFillMode: "forwards" }}
        >
          <div className="w-8 h-[2px]" style={{ background: "var(--cyan)" }} />
          <span className="font-mono text-xs tracking-widest" style={{ color: "var(--cyan)" }}>
            NEURAL DIAGNOSTIC SYSTEM
          </span>
        </div>

        {/* Heading */}
        <h1
          className="font-display font-700 leading-none mb-4 animate-fade-up opacity-0 delay-100"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            color: "var(--text-primary)",
            animationFillMode: "forwards",
          }}
        >
          BRAIN TUMOR
          <br />
          <span style={{ color: "var(--cyan)" }} className="glow-text">
            DETECTION AI
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="font-body text-base leading-relaxed mb-8 animate-fade-up opacity-0 delay-200"
          style={{
            color: "var(--text-secondary)",
            maxWidth: "480px",
            animationFillMode: "forwards",
          }}
        >
          Upload an MRI scan and receive an instant AI-powered diagnosis with
          Grad-CAM visual explanations — powered by ResNet50 transfer learning.
        </p>

        {/* CTAs */}
        <div
          className="flex items-center gap-4 animate-fade-up opacity-0 delay-300"
          style={{ animationFillMode: "forwards" }}
        >
          <button
            onClick={() => navigate("/predict")}
            className="btn-cyber px-8 py-3 text-sm"
          >
            <span className="flex items-center gap-2">
              <Cpu size={14} />
              Run Diagnosis
              <ChevronRight size={14} />
            </span>
          </button>
          <button
            onClick={() => navigate("/about")}
            className="font-display text-sm font-600 tracking-widest uppercase flex items-center gap-2 transition-colors duration-300"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            Learn More <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
