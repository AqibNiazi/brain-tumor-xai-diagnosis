import React, { useState, useRef, useCallback } from "react";
import { Upload } from "lucide-react";

export default function UploadZone({ onFile, disabled }) {
  const [drag, setDrag] = useState(false);
  const inputRef = useRef();

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDrag(false);
      const file = e.dataTransfer.files?.[0];
      if (file) onFile(file);
    },
    [onFile]
  );

  return (
    <div
      className={`upload-zone rounded-none p-12 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 ${drag ? "drag-over" : ""}`}
      style={{ minHeight: 280 }}
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
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
          style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
        >
          <Upload size={24} color="var(--cyan)" strokeWidth={1.5} />
        </div>
        <div className="absolute -inset-2 border border-[var(--cyan)] opacity-20 animate-rotate-slow rounded-full" />
      </div>

      <div className="text-center">
        <p className="font-display text-lg font-600 tracking-wider" style={{ color: "var(--text-primary)" }}>
          DROP MRI SCAN HERE
        </p>
        <p className="font-mono text-xs tracking-widest mt-1" style={{ color: "var(--text-muted)" }}>
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
}
