import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
} from "recharts";
import { CLASS_META } from "./classMeta";

const CyberTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="tooltip-cyber">
      {payload[0].payload.name}: {payload[0].value.toFixed(2)}%
    </div>
  );
};

export default function ProbabilityCharts({ probabilities, predictedClass }) {
  const meta = CLASS_META[predictedClass] || {};

  const barData = Object.entries(probabilities).map(([key, val]) => ({
    name: CLASS_META[key]?.label || key,
    value: parseFloat(val.toFixed(2)),
    color: CLASS_META[key]?.color || "#fff",
  }));

  const radarData = barData.map((d) => ({ subject: d.name, A: d.value }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Bar chart */}
      <div className="panel p-4">
        <div className="font-mono text-[10px] tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
          PROBABILITY DISTRIBUTION
        </div>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={barData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <XAxis
              dataKey="name"
              tick={{ fontFamily: "var(--font-mono)", fontSize: 9, fill: "var(--text-muted)" }}
            />
            <YAxis
              tick={{ fontFamily: "var(--font-mono)", fontSize: 9, fill: "var(--text-muted)" }}
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
        <div className="font-mono text-[10px] tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>
          CLASS PROBABILITY RADAR
        </div>
        <ResponsiveContainer width="100%" height={160}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="var(--border)" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fontFamily: "var(--font-mono)", fontSize: 9, fill: "var(--text-muted)" }}
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
  );
}
