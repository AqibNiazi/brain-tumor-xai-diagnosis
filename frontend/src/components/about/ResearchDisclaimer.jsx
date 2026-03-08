import React from "react";
import { FlaskConical } from "lucide-react";

export default function ResearchDisclaimer() {
  return (
    <section>
      <div
        className="panel p-6"
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
              This system is developed for academic and research purposes only.
              It is not a certified medical device and must not be used as the
              sole basis for clinical decisions. All results should be reviewed
              and validated by qualified medical professionals. Brain tumor
              diagnosis requires comprehensive clinical evaluation including
              patient history, additional imaging modalities, and specialist
              assessment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
