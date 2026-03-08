import React from "react";
import { Brain, Loader } from "lucide-react";

export default function SubmitButton({ onClick, disabled, loading }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full btn-cyber py-4 text-base disabled:opacity-30 disabled:cursor-not-allowed"
    >
      <span className="flex items-center justify-center gap-3">
        {loading ? (
          <>
            <Loader size={16} className="animate-spin" />
            ANALYSING SCAN...
          </>
        ) : (
          <>
            <Brain size={16} />
            RUN AI DIAGNOSIS
          </>
        )}
      </span>
    </button>
  );
}
