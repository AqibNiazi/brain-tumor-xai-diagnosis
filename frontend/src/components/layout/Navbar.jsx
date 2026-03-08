import React, { useState, useEffect } from "react";

import { NavLink } from "react-router-dom";
import { clientBaseURL, clientEndPoints } from "@/services/api";
import { Activity, Brain, Info, Cpu, Wifi, WifiOff } from "lucide-react";

const NavItem = ({ to, icon: Icon, label, end }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      `relative flex items-center gap-2 px-4 py-2 font-display text-sm font-semibold tracking-widest uppercase transition-all duration-300
       ${
         isActive
           ? "text-[var(--cyan)] glow-text"
           : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
       }`
    }
  >
    {({ isActive }) => (
      <>
        <Icon size={15} strokeWidth={isActive ? 2 : 1.5} />
        <span>{label}</span>
        {isActive && (
          <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--cyan)] shadow-[0_0_8px_var(--cyan)]" />
        )}
      </>
    )}
  </NavLink>
);

export default function Navbar() {
  const [apiStatus, setApiStatus] = useState("checking");
  const [time, setTime] = useState(new Date());

  // Live clock
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // API health check — retries every 15s, distinguishes network vs server errors
  useEffect(() => {
    let cancelled = false;
    const check = async () => {
      try {
        await clientBaseURL.get(clientEndPoints.health);
        if (!cancelled) setApiStatus("online");
      } catch (err) {
        if (!cancelled) {
          // err.response → server replied with non-2xx
          // err.request  → no response (network error / CORS / Flask offline)
          setApiStatus(err.response ? "error" : "offline");
        }
      }
    };
    check();
    const interval = setInterval(check, 15000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const statusColor = {
    online: "var(--green)",
    offline: "var(--red)",
    error: "var(--amber)",
    checking: "var(--text-muted)",
  };
  const statusLabel = {
    online: "API ONLINE",
    offline: "API OFFLINE",
    error: "API ERROR",
    checking: "CHECKING...",
  };

  return (
    <header
      className="relative z-50 border-b border-[var(--border)]"
      style={{
        background:
          "linear-gradient(180deg, rgba(6,13,24,0.98) 0%, rgba(6,13,24,0.92) 100%)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Top status bar */}
      <div className="border-b border-[var(--border)] px-6 py-1 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span
            className="font-mono text-[10px] tracking-widest"
            style={{ color: "var(--text-muted)" }}
          >
            NEURAL DIAGNOSTIC SYSTEM v2.4.1
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
            MODEL: RESNET-50 · CLASSES: 4
          </span>
        </div>
        <div className="flex items-center gap-4">
          {/* API Status */}
          <div className="flex items-center gap-2">
            {apiStatus === "online" ? (
              <Wifi size={11} color="var(--green)" />
            ) : (
              <WifiOff size={11} color="var(--red)" />
            )}
            <span
              className="font-mono text-[10px] tracking-widest"
              style={{ color: statusColor[apiStatus] }}
            >
              {statusLabel[apiStatus]}
            </span>
            <span
              className="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: statusColor[apiStatus] }}
            />
          </div>
          <span
            className="font-mono text-[10px] tracking-widest"
            style={{ color: "var(--text-muted)" }}
          >
            {time.toLocaleTimeString("en-US", { hour12: false })}
          </span>
        </div>
      </div>

      {/* Main nav */}
      <div className="px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <div
            className="relative w-9 h-9 flex items-center justify-center border border-[var(--cyan)] glow-cyan"
            style={{
              clipPath:
                "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            }}
          >
            <Brain size={18} color="var(--cyan)" />
          </div>
          <div>
            <div
              className="font-display text-lg font-700 tracking-wider leading-none"
              style={{ color: "var(--cyan)" }}
            >
              NEURO<span style={{ color: "var(--text-primary)" }}>SCAN</span>
            </div>
            <div
              className="font-mono text-[9px] tracking-widest"
              style={{ color: "var(--text-muted)" }}
            >
              AI DIAGNOSTIC PLATFORM
            </div>
          </div>
        </NavLink>

        {/* Nav links */}
        <nav className="flex items-center gap-1">
          <NavItem to="/" icon={Activity} label="Dashboard" end />
          <NavItem to="/predict" icon={Cpu} label="Diagnose" />
          <NavItem to="/about" icon={Info} label="About" />
        </nav>
      </div>
    </header>
  );
}
