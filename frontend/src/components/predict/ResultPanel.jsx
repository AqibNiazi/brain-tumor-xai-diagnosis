import React from "react";
import DiagnosisResult from "./DiagnosisResult";
import ScanImageGrid from "./ScanImageGrid";
import ProbabilityCharts from "./ProbabilityCharts";
import ProbabilityTable from "./ProbabilityTable";

export default function ResultPanel({ result, gradcam, showGradCam, onToggleGradCam, imagePreview }) {
  return (
    <div className="space-y-4 animate-fade-up opacity-0" style={{ animationFillMode: "forwards" }}>
      <DiagnosisResult result={result} />
      <ScanImageGrid
        imagePreview={imagePreview}
        gradcam={gradcam}
        showGradCam={showGradCam}
        onToggleGradCam={onToggleGradCam}
      />
      <ProbabilityCharts
        probabilities={result.probabilities}
        predictedClass={result.predicted_class}
      />
      <ProbabilityTable probabilities={result.probabilities} />
    </div>
  );
}
