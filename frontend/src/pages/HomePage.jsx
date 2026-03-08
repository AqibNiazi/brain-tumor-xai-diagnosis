import React from "react";
import {
  HeroSection,
  StatsSection,
  ClassesSection,
  FeaturesSection,
  CtaBanner,
} from "@/components/home";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      <HeroSection />
      <StatsSection />
      <ClassesSection />
      <FeaturesSection />
      <CtaBanner />
    </div>
  );
}
