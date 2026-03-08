import axios from "axios";

// ── Base URL ──────────────────────────────────────────────────────────────
// Local development  → uncomment the localhost line
// Production         → replace with your deployed backend URL

const serverBaseURL = "http://127.0.0.1:5000"; // Local
// const serverBaseURL = "https://your-production-backend.com"; // Production

const clientBaseURL = axios.create({
  baseURL: serverBaseURL,
  timeout: 30000, // 30s — GradCAM inference can be slow on CPU
  headers: { "Content-Type": "application/json" },
});

// ── API Base Paths ────────────────────────────────────────────────────────
const apiBasePath = "/api";

// ── Endpoint Definitions ─────────────────────────────────────────────────
const clientEndPoints = {
  // Health
  health: `${apiBasePath}/health`,

  // Prediction
  predict: `${apiBasePath}/predict`,
};

export { clientBaseURL, clientEndPoints };
