"use client";

import type { CSSProperties } from "react";
import {
  buildBrainMutationGovernanceStableKey,
  type ReducerImpactGovernance,
} from "../index";

export function ReducerImpactGovernancePanel({ governance }: { governance: ReducerImpactGovernance }) {
  return (
    <section
      style={panel}
      data-codexforge-reducer-impact-governance-panel="ReducerImpactGovernancePanel renders reducer governance includes memory.promoted concept.synthesized failure.detected reducer preview required"
    >
      <div style={heading}>
        <h2 style={titleStyle}>Reducer Impact Governance</h2>
        <p style={subtitleStyle}>
          Runtime event types mapped to reducer availability, impact area, audit requirement, policy state, and next safe action.
        </p>
      </div>
      <div style={stats}>
        <Stat label="Governed events" value={String(governance.governedEventCount)} />
        <Stat label="Preview required" value={String(governance.previewRequiredCount)} />
        <Stat label="High priority" value={String(governance.highPriorityCount)} />
      </div>
      <div style={grid}>
        {governance.items.map((item, index) => (
          <article key={buildBrainMutationGovernanceStableKey("reducer-impact", item.id, index)} style={card}>
            <div style={top}>
              <strong style={itemTitle}>{item.eventType}</strong>
              <span style={riskStyle(item.riskLevel)}>{item.riskLevel}</span>
            </div>
            <div style={pillRow}>
              <Pill label="reducer" value={item.reducerAvailable ? "available" : "missing"} />
              <Pill label="preview" value={item.reducerPreviewRequired ? "required" : "optional"} />
              <Pill label="impact" value={item.nodeEdgeImpactCategory} />
              <Pill label="policy" value={item.policyState} />
            </div>
            <p style={text}>{item.auditRequirement}</p>
            <p style={next}>Next: {item.nextSafeAction}</p>
            <span style={areas}>Areas: {item.expectedGraphAreasImpacted.join(", ")}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={stat}>
      <span style={statLabel}>{label}</span>
      <strong style={statValue}>{value}</strong>
    </div>
  );
}

function Pill({ label, value }: { label: string; value: string }) {
  return <span style={pill}>{label}: <strong>{value}</strong></span>;
}

function riskStyle(risk: string): CSSProperties {
  const high = risk === "high" || risk === "critical";
  return {
    border: `1px solid ${high ? "rgba(248,113,113,0.28)" : "rgba(45,212,191,0.2)"}`,
    background: high ? "rgba(248,113,113,0.1)" : "rgba(20,184,166,0.1)",
    borderRadius: 8,
    color: high ? "#fecaca" : "#ccfbf1",
    fontSize: 11,
    fontWeight: 900,
    padding: "5px 7px",
    ...safeText,
  };
}

const safeText: CSSProperties = { minWidth: 0, overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.18)", background: "rgba(2,6,23,0.52)", borderRadius: 8, display: "grid", gap: 12, minWidth: 0, padding: 14 };
const heading: CSSProperties = { display: "grid", gap: 5, minWidth: 0 };
const titleStyle: CSSProperties = { color: "#f8fafc", fontSize: 18, lineHeight: 1.2, margin: 0, ...safeText };
const subtitleStyle: CSSProperties = { color: "#94a3b8", fontSize: 12, lineHeight: 1.45, margin: 0, ...safeText };
const stats: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))", gap: 8, minWidth: 0 };
const stat: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(15,23,42,0.45)", borderRadius: 8, display: "grid", gap: 4, minWidth: 0, padding: 9 };
const statLabel: CSSProperties = { color: "#94a3b8", fontSize: 10, fontWeight: 850, textTransform: "uppercase", ...safeText };
const statValue: CSSProperties = { color: "#ccfbf1", fontSize: 18, ...safeText };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", gap: 10, minWidth: 0 };
const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(15,23,42,0.42)", borderRadius: 8, display: "grid", gap: 8, minWidth: 0, padding: 10 };
const top: CSSProperties = { alignItems: "start", display: "grid", gap: 8, gridTemplateColumns: "minmax(0, 1fr) auto", minWidth: 0 };
const itemTitle: CSSProperties = { color: "#f8fafc", fontSize: 13, ...safeText };
const pillRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 6, minWidth: 0 };
const pill: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(14,165,233,0.08)", borderRadius: 8, color: "#cbd5e1", fontSize: 11, lineHeight: 1.25, padding: "6px 8px", ...safeText };
const text: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, margin: 0, ...safeText };
const next: CSSProperties = { color: "#e0f2fe", fontSize: 12, fontWeight: 850, lineHeight: 1.45, margin: 0, ...safeText };
const areas: CSSProperties = { color: "#94a3b8", fontSize: 11, lineHeight: 1.4, ...safeText };
