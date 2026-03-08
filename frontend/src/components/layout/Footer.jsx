export default function Footer() {
  return (
    <footer
      className="relative z-10 border-t border-(--border) px-6 py-4"
      style={{ background: "rgba(6,13,24,0.95)" }}
    >
      <div className="flex items-center justify-between">
        <div
          className="font-mono text-[10px] tracking-widest"
          style={{ color: "var(--text-muted)" }}
        >
          © 2026 NEUROSCAN DIAGNOSTIC AI · FOR RESEARCH USE ONLY
        </div>
        <div className="flex items-center gap-6">
          <span
            className="font-mono text-[10px] tracking-widest"
            style={{ color: "var(--text-muted)" }}
          >
            ACCURACY: 96.4%
          </span>
          <span
            className="font-mono text-[10px]"
            style={{ color: "var(--text-muted)" }}
          >
            |
          </span>
          <span
            className="font-mono text-[10px] tracking-widest"
            style={{ color: "var(--text-muted)" }}
          >
            DATASET: 7,023 MRI SCANS
          </span>
        </div>
      </div>
    </footer>
  );
}
