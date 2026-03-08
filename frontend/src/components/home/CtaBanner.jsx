import React from "react";
import { useNavigate } from "react-router-dom";
import { Brain, Cpu } from "lucide-react";

export default function CtaBanner() {
  const navigate = useNavigate();

  return (
    <section>
      <div
        className="panel p-8 text-center relative overflow-hidden animate-fade-up opacity-0"
        style={{ animationFillMode: "forwards" }}
      >
        <div className="absolute inset-0 scan-effect pointer-events-none opacity-40" />
        <div
          className="absolute inset-0 opacity-5"
          style={{ background: "radial-gradient(ellipse at center, var(--cyan) 0%, transparent 70%)" }}
        />

        <Brain size={40} color="var(--cyan)" className="mx-auto mb-4 opacity-60" strokeWidth={1} />

        <h2
          className="font-display text-2xl font-700 tracking-wider mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          READY TO ANALYSE YOUR SCAN?
        </h2>

        <p className="font-body text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
          Upload an MRI image and get instant AI-powered classification with visual explanations.
        </p>

        <button
          onClick={() => navigate("/predict")}
          className="btn-cyber px-10 py-3 text-sm"
        >
          <span className="flex items-center gap-2">
            <Cpu size={14} /> Start Diagnosis
          </span>
        </button>
      </div>
    </section>
  );
}
