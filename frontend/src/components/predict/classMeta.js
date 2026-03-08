// Shared metadata for all 4 tumor classes.
// Centralised here so every predict component stays in sync.

export const CLASS_META = {
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
