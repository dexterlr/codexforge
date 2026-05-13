import type { CSSProperties } from "react";
import type { CodexForgeTopologySignalKind } from "@/lib/codexforge/brain/runtime";

const SIGNALS: Array<{ kind: CodexForgeTopologySignalKind; label: string; color: string }> = [
  { kind: "memory", label: "Memory", color: "#38bdf8" },
  { kind: "concept", label: "Concept", color: "#a78bfa" },
  { kind: "task", label: "Task", color: "#22c55e" },
  { kind: "execution", label: "Execution", color: "#f59e0b" },
  { kind: "risk", label: "Risk", color: "#ef4444" },
  { kind: "file", label: "File", color: "#06b6d4" },
  { kind: "architecture", label: "Architecture", color: "#14b8a6" },
  { kind: "agent", label: "Agent", color: "#f97316" },
  { kind: "prediction", label: "Prediction", color: "#84cc16" },
  { kind: "contradiction", label: "Contradiction", color: "#fb7185" },
  { kind: "recovery", label: "Recovery", color: "#4ade80" },
];

export function topologySignalColor(kind: CodexForgeTopologySignalKind): string {
  return SIGNALS.find((signal) => signal.kind === kind)?.color ?? "#7dd3fc";
}

export function BrainTopologyLegend() {
  return (
    <aside data-codexforge-brain-topology-legend style={legendStyle}>
      <div style={eyebrowStyle}>Topology legend</div>
      <div style={gridStyle}>
        {SIGNALS.map((signal) => (
          <span key={signal.kind} style={itemStyle}>
            <span style={{ ...dotStyle, background: signal.color }} />
            {signal.label}
          </span>
        ))}
      </div>
      <div style={scaleStyle}>
        <span>Low intensity</span>
        <span style={barStyle} />
        <span>High intensity</span>
      </div>
    </aside>
  );
}

const legendStyle: CSSProperties = {
  display: "grid",
  gap: 10,
  padding: 12,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.045)",
};

const gridStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 7,
};

const itemStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "5px 7px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(15,23,42,0.74)",
  fontSize: 11,
  color: "rgba(226,232,240,0.88)",
};

const dotStyle: CSSProperties = {
  width: 8,
  height: 8,
  borderRadius: 999,
};

const scaleStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "auto minmax(80px, 1fr) auto",
  gap: 8,
  alignItems: "center",
  color: "rgba(226,232,240,0.68)",
  fontSize: 11,
};

const barStyle: CSSProperties = {
  height: 6,
  borderRadius: 999,
  background: "linear-gradient(90deg, rgba(56,189,248,0.18), rgba(251,113,133,0.86))",
};

const eyebrowStyle: CSSProperties = {
  fontSize: 10,
  fontWeight: 900,
  letterSpacing: 0,
  textTransform: "uppercase",
  color: "rgba(186,230,253,0.86)",
};
