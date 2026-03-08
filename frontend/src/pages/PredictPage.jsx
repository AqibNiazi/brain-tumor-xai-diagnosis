import React, { useState } from "react";
import { toast } from "react-toastify";
import { clientBaseURL, clientEndPoints } from "@/services/api";
import {
  PageHeader,
  ImagePreviewPanel,
  GradCamToggle,
  SubmitButton,
  AnalysisProgress,
  InstructionsPanel,
  ResultPanel,
  AwaitingScan,
} from "@/components/predict";

export default function PredictPage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [gradcam, setGradcam] = useState(null);
  const [showGradCam, setShowGradCam] = useState(true);
  const [wantGradCam, setWantGradCam] = useState(true);
  const [progress, setProgress] = useState(0);

  const handleFile = (incoming) => {
    if (incoming.size > 10 * 1024 * 1024) {
      toast.error("File too large. Maximum size is 10MB.");
      return;
    }
    setFile(incoming);
    setPreview(URL.createObjectURL(incoming));
    setResult(null);
    setGradcam(null);
    setProgress(0);
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setGradcam(null);
    setProgress(0);
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.warn("Please select an MRI image first.");
      return;
    }

    setLoading(true);
    setResult(null);
    setProgress(0);

    const timer = setInterval(() => {
      setProgress((p) => (p < 85 ? p + Math.random() * 15 : p));
    }, 300);

    try {
      const form = new FormData();
      form.append("image", file);
      form.append("gradcam", wantGradCam ? "true" : "false");

      const { data } = await clientBaseURL.post(clientEndPoints.predict, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      clearInterval(timer);
      setProgress(100);

      setTimeout(() => {
        setResult(data);
        setGradcam(data.gradcam_overlay || null);
        setLoading(false);
        toast.success(`Diagnosis complete — ${data.predicted_class}`);
      }, 400);
    } catch (err) {
      clearInterval(timer);
      setLoading(false);
      setProgress(0);
      toast.error(
        err.response?.data?.error ||
          "Server error. Is the Flask backend running?",
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <PageHeader />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── LEFT: Upload + Controls ── */}
        <div className="space-y-4">
          <ImagePreviewPanel
            file={file}
            preview={preview}
            loading={loading}
            onFile={handleFile}
            onReset={handleReset}
          />
          <GradCamToggle
            enabled={wantGradCam}
            onToggle={() => setWantGradCam((v) => !v)}
          />
          <SubmitButton
            onClick={handleSubmit}
            disabled={!file}
            loading={loading}
          />
          {loading && <AnalysisProgress progress={progress} />}
          {!file && !loading && <InstructionsPanel />}
        </div>

        {/* ── RIGHT: Results ── */}
        <div>
          {result ? (
            <ResultPanel
              result={result}
              gradcam={gradcam}
              showGradCam={showGradCam}
              onToggleGradCam={() => setShowGradCam((v) => !v)}
              imagePreview={preview}
            />
          ) : (
            <AwaitingScan />
          )}
        </div>
      </div>
    </div>
  );
}
