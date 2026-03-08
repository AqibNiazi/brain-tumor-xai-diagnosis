import React, { useState, useRef, useCallback } from "react";
import { clientBaseURL, clientEndPoints } from "@/services/api";
import { toast } from "react-toastify";
import {
  Upload,
  X,
  Brain,
  Cpu,
  AlertTriangle,
  CheckCircle,
  RotateCcw,
  Eye,
  EyeOff,
  ChevronDown,
  Loader,
} from "lucide-react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

const CLASS_META = {
  glioma: {
    color: "#ff3860",
    label: "Glioma",
    code: "GL-01",
    severity: "HIGH",
  },
  meningioma: {
    color: "#ffaa00",
    label: "Meningioma",
    code: "MN-02",
    severity: "MODERATE",
  },
  pituitary: {
    color: "#7c3aed",
    label: "Pituitary",
    code: "PT-03",
    severity: "MODERATE",
  },
  notumor: {
    color: "#00ff88",
    label: "No Tumor",
    code: "NT-00",
    severity: "CLEAR",
  },
};

/* ── Custom Tooltip ─────────────────────────────────────────── */
const CyberTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="tooltip-cyber">
      {payload[0].payload.name}: {payload[0].value.toFixed(2)}%
    </div>
  );
};

/* ── Upload Zone ─────────────────────────────────────────────── */
const UploadZone = ({ onFile, disabled }) => {
  const [drag, setDrag] = useState(false);
  const inputRef = useRef();

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDrag(false);
      const file = e.dataTransfer.files?.[0];
      if (file) onFile(file);
    },
    [onFile],
  );

  return (
    <div
      className={`upload-zone rounded-none p-12 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 ${drag ? "drag-over" : ""}`}
      style={{ minHeight: 280 }}
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={handleDrop}
      onClick={() => !disabled && inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
        disabled={disabled}
      />

      {/* Animated upload icon */}
      <div className="relative">
        <div
          className="w-16 h-16 flex items-center justify-center border border-[var(--border-bright)]"
          style={{
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
        >
          <Upload size={24} color="var(--cyan)" strokeWidth={1.5} />
        </div>
        <div className="absolute -inset-2 border border-[var(--cyan)] opacity-20 animate-rotate-slow rounded-full" />
      </div>

      <div className="text-center">
        <p
          className="font-display text-lg font-600 tracking-wider"
          style={{ color: "var(--text-primary)" }}
        >
          DROP MRI SCAN HERE
        </p>
        <p
          className="font-mono text-xs tracking-widest mt-1"
          style={{ color: "var(--text-muted)" }}
        >
          PNG · JPG · WEBP · BMP — MAX 10MB
        </p>
      </div>

      <div
        className="font-mono text-[10px] tracking-widest px-4 py-1 border border-[var(--border)]"
        style={{ color: "var(--text-muted)" }}
      >
        OR CLICK TO BROWSE
      </div>
    </div>
  );
};

/* ── Result Panel ─────────────────────────────────────────────── */
const ResultPanel = ({
  result,
  gradcam,
  showGradCam,
  onToggleGradCam,
  imagePreview,
}) => {
  const meta = CLASS_META[result.predicted_class] || {};
  const isHealthy = result.predicted_class === "notumor";

  const barData = Object.entries(result.probabilities).map(([key, val]) => ({
    name: CLASS_META[key]?.label || key,
    value: parseFloat(val.toFixed(2)),
    color: CLASS_META[key]?.color || "#fff",
  }));

  const radarData = barData.map((d) => ({ subject: d.name, A: d.value }));

  return (
    <div
      className="space-y-4 animate-fade-up opacity-0"
      style={{ animationFillMode: "forwards" }}
    >
      {/* Primary result */}
      <div className="panel p-6 relative overflow-hidden">
        <div className="absolute inset-0 scan-effect opacity-20 pointer-events-none" />
        <div
          className="absolute top-0 right-0 w-40 h-40 opacity-5"
          style={{
            background: `radial-gradient(circle, ${meta.color}, transparent)`,
          }}
        />

        <div className="flex items-start justify-between mb-4">
          <div>
            <div
              className="font-mono text-[10px] tracking-widest mb-1"
              style={{ color: "var(--text-muted)" }}
            >
              DIAGNOSIS RESULT · {meta.code}
            </div>
            <div
              className="font-display text-4xl font-700"
              style={{
                color: meta.color,
                textShadow: `0 0 20px ${meta.color}60`,
              }}
            >
              {meta.label?.toUpperCase() ||
                result.predicted_class.toUpperCase()}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span
              className="font-mono text-[10px] tracking-widest px-3 py-1 border"
              style={{
                color: meta.color,
                borderColor: meta.color,
                background: `${meta.color}18`,
              }}
            >
              {meta.severity}
            </span>
            {isHealthy ? (
              <CheckCircle size={20} color="var(--green)" />
            ) : (
              <AlertTriangle size={20} color={meta.color} />
            )}
          </div>
        </div>

        {/* Confidence */}
        <div className="mb-1 flex justify-between">
          <span
            className="font-mono text-[10px] tracking-widest"
            style={{ color: "var(--text-muted)" }}
          >
            CONFIDENCE
          </span>
          <span
            className="font-mono text-sm font-500"
            style={{ color: meta.color }}
          >
            {result.confidence.toFixed(2)}%
          </span>
        </div>
        <div className="progress-bar mb-4">
          <div
            className="progress-fill"
            style={{
              width: `${result.confidence}%`,
              background: `linear-gradient(90deg, ${meta.color}80, ${meta.color})`,
              boxShadow: `0 0 8px ${meta.color}`,
            }}
          />
        </div>

        {/* Disclaimer */}
        <p
          className="font-mono text-[10px] tracking-wide"
          style={{ color: "var(--text-muted)" }}
        >
          ⚠ THIS RESULT IS FOR RESEARCH PURPOSES ONLY. CONSULT A QUALIFIED
          RADIOLOGIST.
        </p>
      </div>

      {/* Image + GradCAM */}
      <div className="grid grid-cols-2 gap-4">
        <div className="panel overflow-hidden">
          <div
            className="border-b border-[var(--border)] px-3 py-2 font-mono text-[10px] tracking-widest"
            style={{ color: "var(--text-muted)" }}
          >
            ORIGINAL SCAN
          </div>
          <img
            src={imagePreview}
            alt="MRI scan"
            className="w-full object-cover"
            style={{ maxHeight: 220 }}
          />
        </div>
        <div className="panel overflow-hidden relative">
          <div className="border-b border-[var(--border)] px-3 py-2 flex items-center justify-between">
            <span
              className="font-mono text-[10px] tracking-widest"
              style={{ color: "var(--text-muted)" }}
            >
              GRAD-CAM OVERLAY
            </span>
            <button
              onClick={onToggleGradCam}
              className="transition-opacity hover:opacity-70"
            >
              {showGradCam ? (
                <Eye size={12} color="var(--cyan)" />
              ) : (
                <EyeOff size={12} color="var(--text-muted)" />
              )}
            </button>
          </div>
          {gradcam && showGradCam ? (
            <img
              src={gradcam}
              alt="GradCAM"
              className="w-full object-cover"
              style={{ maxHeight: 220 }}
            />
          ) : (
            <div
              className="flex items-center justify-center h-40 font-mono text-[10px]"
              style={{ color: "var(--text-muted)" }}
            >
              {gradcam ? "HIDDEN" : "NOT AVAILABLE"}
            </div>
          )}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bar chart */}
        <div className="panel p-4">
          <div
            className="font-mono text-[10px] tracking-widest mb-4"
            style={{ color: "var(--text-muted)" }}
          >
            PROBABILITY DISTRIBUTION
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart
              data={barData}
              margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
            >
              <XAxis
                dataKey="name"
                tick={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  fill: "var(--text-muted)",
                }}
              />
              <YAxis
                tick={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  fill: "var(--text-muted)",
                }}
                domain={[0, 100]}
              />
              <Tooltip content={<CyberTooltip />} />
              <Bar dataKey="value" radius={0}>
                {barData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} opacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar chart */}
        <div className="panel p-4">
          <div
            className="font-mono text-[10px] tracking-widest mb-4"
            style={{ color: "var(--text-muted)" }}
          >
            CLASS PROBABILITY RADAR
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  fill: "var(--text-muted)",
                }}
              />
              <Radar
                name="Probability"
                dataKey="A"
                stroke={meta.color}
                fill={meta.color}
                fillOpacity={0.2}
                strokeWidth={1.5}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Probability table */}
      <div className="panel overflow-hidden">
        <div
          className="border-b border-[var(--border)] px-4 py-2 font-mono text-[10px] tracking-widest"
          style={{ color: "var(--text-muted)" }}
        >
          DETAILED BREAKDOWN
        </div>
        <div className="divide-y divide-[var(--border)]">
          {barData
            .sort((a, b) => b.value - a.value)
            .map((item) => (
              <div
                key={item.name}
                className="px-4 py-3 flex items-center gap-4"
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{
                    background: item.color,
                    boxShadow: `0 0 6px ${item.color}`,
                  }}
                />
                <span
                  className="font-mono text-xs flex-1"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item.name.toUpperCase()}
                </span>
                <div className="flex-1 progress-bar mx-4">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${item.value}%`,
                      background: `linear-gradient(90deg, ${item.color}60, ${item.color})`,
                      boxShadow: `0 0 6px ${item.color}80`,
                    }}
                  />
                </div>
                <span
                  className="font-mono text-xs w-14 text-right"
                  style={{ color: item.color }}
                >
                  {item.value.toFixed(2)}%
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

/* ── Main Page ───────────────────────────────────────────────── */
export default function PredictPage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [gradcam, setGradcam] = useState(null);
  const [showGradCam, setShowGradCam] = useState(true);
  const [wantGradCam, setWantGradCam] = useState(true);
  const [progress, setProgress] = useState(0);

  const handleFile = (file) => {
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File too large. Maximum size is 10MB.");
      return;
    }
    setFile(file);
    setPreview(URL.createObjectURL(file));
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

    // Fake progress for UX
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
        toast.success(
          `Diagnosis complete — ${CLASS_META[data.predicted_class]?.label || data.predicted_class}`,
        );
      }, 400);
    } catch (err) {
      clearInterval(timer);
      setLoading(false);
      setProgress(0);
      const msg =
        err.response?.data?.error ||
        "Server error. Is the Flask backend running?";
      toast.error(msg);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Page header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-[2px]" style={{ background: "var(--cyan)" }} />
          <Cpu size={16} color="var(--cyan)" />
          <span className="font-display text-2xl font-700 tracking-wider">
            DIAGNOSTIC TERMINAL
          </span>
        </div>
        <div
          className="flex-1 h-[1px]"
          style={{ background: "var(--border)" }}
        />
        <span
          className="font-mono text-[10px] tracking-widest"
          style={{ color: "var(--text-muted)" }}
        >
          RESNET-50 · TRANSFER LEARNING
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── LEFT: Upload Panel ── */}
        <div className="space-y-4">
          <div className="panel">
            <div className="border-b border-[var(--border)] px-4 py-3 flex items-center justify-between">
              <span
                className="font-mono text-[10px] tracking-widest"
                style={{ color: "var(--text-muted)" }}
              >
                INPUT · MRI SCAN
              </span>
              {file && (
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 transition-opacity hover:opacity-70"
                >
                  <RotateCcw size={11} color="var(--text-muted)" />
                  <span
                    className="font-mono text-[10px]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    RESET
                  </span>
                </button>
              )}
            </div>

            {preview ? (
              <div className="relative scan-effect">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full object-contain"
                  style={{ maxHeight: 320 }}
                />
                <button
                  onClick={handleReset}
                  className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center border border-[var(--border)] transition-all hover:border-[var(--red)]"
                  style={{ background: "var(--bg-panel)" }}
                >
                  <X size={13} color="var(--text-muted)" />
                </button>
                <div
                  className="absolute bottom-3 left-3 font-mono text-[10px] px-2 py-1"
                  style={{
                    background: "var(--bg-void)",
                    color: "var(--cyan)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {file.name.length > 28
                    ? file.name.slice(0, 25) + "..."
                    : file.name}
                  {" · "}
                  {(file.size / 1024).toFixed(0)} KB
                </div>
              </div>
            ) : (
              <UploadZone onFile={handleFile} disabled={loading} />
            )}
          </div>

          {/* Options */}
          <div className="panel px-4 py-3 flex items-center justify-between">
            <div>
              <p
                className="font-mono text-xs tracking-wider"
                style={{ color: "var(--text-secondary)" }}
              >
                GRAD-CAM OVERLAY
              </p>
              <p
                className="font-mono text-[10px]"
                style={{ color: "var(--text-muted)" }}
              >
                Generate visual explanation heatmap
              </p>
            </div>
            <button
              onClick={() => setWantGradCam((v) => !v)}
              className="w-12 h-6 relative transition-all duration-300"
              style={{
                background: wantGradCam ? "var(--cyan)" : "var(--bg-hover)",
                border: `1px solid ${wantGradCam ? "var(--cyan)" : "var(--border)"}`,
              }}
            >
              <span
                className="absolute top-0.5 w-5 h-5 transition-all duration-300"
                style={{
                  background: wantGradCam
                    ? "var(--bg-void)"
                    : "var(--text-muted)",
                  left: wantGradCam ? "calc(100% - 22px)" : "2px",
                }}
              />
            </button>
          </div>

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={!file || loading}
            className="w-full btn-cyber py-4 text-base disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <span className="flex items-center justify-center gap-3">
              {loading ? (
                <>
                  <Loader size={16} className="animate-spin" /> ANALYSING
                  SCAN...
                </>
              ) : (
                <>
                  <Brain size={16} /> RUN AI DIAGNOSIS
                </>
              )}
            </span>
          </button>

          {/* Progress */}
          {loading && (
            <div className="panel px-4 py-3">
              <div className="flex justify-between mb-2">
                <span
                  className="font-mono text-[10px] tracking-widest"
                  style={{ color: "var(--cyan)" }}
                >
                  PROCESSING
                </span>
                <span
                  className="font-mono text-[10px]"
                  style={{ color: "var(--cyan)" }}
                >
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div
                className="mt-2 font-mono text-[10px]"
                style={{ color: "var(--text-muted)" }}
              >
                {progress < 30
                  ? "LOADING IMAGE..."
                  : progress < 60
                    ? "RUNNING FORWARD PASS..."
                    : progress < 85
                      ? "COMPUTING GRAD-CAM..."
                      : "FINALISING..."}
              </div>
            </div>
          )}

          {/* Instructions */}
          {!file && !loading && (
            <div className="panel px-4 py-4 space-y-2">
              <p
                className="font-mono text-[10px] tracking-widest mb-3"
                style={{ color: "var(--text-muted)" }}
              >
                INSTRUCTIONS
              </p>
              {[
                "Upload a brain MRI scan (axial view recommended)",
                "Enable Grad-CAM to see which regions influenced the result",
                "Results show confidence scores for all 4 tumor classes",
                "Always verify results with a qualified medical professional",
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span
                    className="font-mono text-[10px] mt-0.5"
                    style={{ color: "var(--cyan)" }}
                  >
                    ›
                  </span>
                  <span
                    className="font-mono text-[10px]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {tip}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── RIGHT: Results Panel ── */}
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
            <div
              className="panel h-full flex flex-col items-center justify-center gap-4 py-20"
              style={{ minHeight: 400 }}
            >
              <div className="relative">
                <Brain size={60} color="var(--text-muted)" strokeWidth={0.8} />
                <div className="absolute inset-0 animate-rotate-slow border border-[var(--border)] rounded-full" />
              </div>
              <div className="text-center">
                <p
                  className="font-display text-lg font-600 tracking-wider mb-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  AWAITING SCAN
                </p>
                <p
                  className="font-mono text-[11px] tracking-wider"
                  style={{ color: "var(--text-muted)" }}
                >
                  Upload an MRI image and run diagnosis to see results here
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
