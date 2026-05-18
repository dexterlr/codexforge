"use client";

import type { CSSProperties } from "react";
import {
  buildBrainMutationGovernanceStableKey,
  type BrainMutationRiskBoard,
} from "../index";

export function MutationRiskBoardPanel({ board }: { board: BrainMutationRiskBoard }) {
  return (
    <section
      style={panel}
      data-codexforge-mutation-risk-board-panel="MutationRiskBoardPanel renders risk board includes direct-ui-graph-mutation silent-memory-promotion legacy-schema-import"
    >
      <div style={heading}>
        <h2 style={titleStyle}>Mutation Risk Board</h2>
        <p style={subtitleStyle}>
          Known mutation hazards, mitigation, required boundary, review requirement, and blocked posture.
        </p>
      </div>
      <div style={stats}>
        <Stat label="Risks" value={String(board.items.length)} />
        <Stat label="Blocked" value={String(board.blockedCount)} />
        <Stat label="Review" value={String(board.reviewRequiredCount)} />
        <Stat label="Top" value={board.topRisk?.id ?? "none"} />
      </div>
      <div style={list}>
        {board.items.map((item, index) => (
          <article key={buildBrainMutationGovernanceStableKey("risk", item.id, index)} style={card}>
            <div style={top}>
              <strong style={itemTitle}>{item.title}</strong>
              <span style={severityStyle(item.severity)}>{item.severity}</span>
            </div>
            <span style={source}>{item.id} / {item.source}</span>
            <p style={text}>{item.mitigation}</p>
            <div style={pillRow}>
              <span style={pill}>Boundary: <strong>{item.requiredBoundary}</strong></span>
              <span style={pill}>Review: <strong>{item.reviewRequired ? "required" : "not required"}</strong></span>
              <span style={pill}>Blocked: <strong>{item.blocked ? "yes" : "no"}</strong></span>
            </div>
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

function severityStyle(severity: string): CSSProperties {
  const high = severity === "blocker" || severity === "risk";
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
const stats: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 120px), 1fr))", gap: 8, minWidth: 0 };
const stat: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(15,23,42,0.45)", borderRadius: 8, display: "grid", gap: 4, minWidth: 0, padding: 9 };
const statLabel: CSSProperties = { color: "#94a3b8", fontSize: 10, fontWeight: 850, textTransform: "uppercase", ...safeText };
const statValue: CSSProperties = { color: "#ccfbf1", fontSize: 18, ...safeText };
const list: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(15,23,42,0.42)", borderRadius: 8, display: "grid", gap: 7, minWidth: 0, padding: 10 };
const top: CSSProperties = { alignItems: "start", display: "grid", gap: 8, gridTemplateColumns: "minmax(0, 1fr) auto", minWidth: 0 };
const itemTitle: CSSProperties = { color: "#f8fafc", fontSize: 13, ...safeText };
const source: CSSProperties = { color: "#94a3b8", fontSize: 11, lineHeight: 1.4, ...safeText };
const text: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, margin: 0, ...safeText };
const pillRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 6, minWidth: 0 };
const pill: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(14,165,233,0.08)", borderRadius: 8, color: "#cbd5e1", fontSize: 11, lineHeight: 1.25, padding: "6px 8px", ...safeText };
