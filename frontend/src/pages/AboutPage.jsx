import React from "react";
import {
  AboutHero,
  MetricsSection,
  MethodologyTimeline,
  TechStackSection,
  XAISection,
  ResearchDisclaimer,
} from "@/components/about";

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">
      <AboutHero />
      <MetricsSection />
      <MethodologyTimeline />
      <TechStackSection />
      <XAISection />
      <ResearchDisclaimer />
    </div>
  );
}