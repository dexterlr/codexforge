"use client";

import type { CSSProperties } from "react";
import {
  buildBrainMutationGovernanceStableKey,
  type DirectMutationDetectorReport,
} from "../index";
import { BrainMutationGovernanceEmptyState } from "./BrainMutationGovernanceEmptyState";

export function DirectMutationDetectorPanel({ report }: { report: DirectMutationDetectorReport }) {
  return (
    <section
      style={panel}
      data-codexforge-direct-mutation-detector-panel="DirectMutationDetectorPanel renders direct mutation detector recognizes appendEvent in UI recognizes brain-graph import recognizes saveBrainGraph from UI no filesystem reads"
    >
      <div style={heading}>
        <h2 style={titleStyle}>Direct Mutation Detector</h2>
        <p style={subtitleStyle}>
          Supplied module, import, UI action, mutation hint, and route labels are reviewed without filesystem reads.
        </p>
      </div>
      <div style={stats}>
        <Stat label="Supplied labels" value={String(report.suppliedLabelCount)} />
        <Stat label="Blocked signals" value={String(report.blockedSignalCount)} />
        <Stat label="Blockers" value={String(report.blockerCount)} />
        <Stat label="Risks" value={String(report.riskCount)} />
      </div>
      {report.signals.length === 0 ? (
        <BrainMutationGovernanceEmptyState />
      ) : (
        <div style={list}>
          {report.signals.map((signal, index) => (
            <article key={buildBrainMutationGovernanceStableKey("direct-signal", signal.id, index)} style={card}>
              <div style={top}>
                <strong style={itemTitle}>{signal.title}</strong>
                <span style={severityStyle(signal.severity)}>{signal.severity}</span>
              </div>
              <span style={source}>{signal.source}</span>
              <p style={text}>{signal.reason}</p>
              <p style={next}>Recommended safe boundary: {signal.recommendedSafeBoundary}</p>
            </article>
          ))}
        </div>
      )}
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
  const blocked = severity === "blocker";
  const risk = severity === "risk";
  return {
    border: `1px solid ${blocked ? "rgba(248,113,113,0.28)" : risk ? "rgba(245,158,11,0.26)" : "rgba(45,212,191,0.2)"}`,
    background: blocked ? "rgba(248,113,113,0.1)" : risk ? "rgba(245,158,11,0.1)" : "rgba(20,184,166,0.1)",
    borderRadius: 8,
    color: blocked ? "#fecaca" : risk ? "#fde68a" : "#ccfbf1",
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
const stats: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))", gap: 8, minWidth: 0 };
const stat: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(15,23,42,0.45)", borderRadius: 8, display: "grid", gap: 4, minWidth: 0, padding: 9 };
const statLabel: CSSProperties = { color: "#94a3b8", fontSize: 10, fontWeight: 850, textTransform: "uppercase", ...safeText };
const statValue: CSSProperties = { color: "#ccfbf1", fontSize: 18, ...safeText };
const list: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(15,23,42,0.42)", borderRadius: 8, display: "grid", gap: 7, minWidth: 0, padding: 10 };
const top: CSSProperties = { alignItems: "start", display: "grid", gap: 8, gridTemplateColumns: "minmax(0, 1fr) auto", minWidth: 0 };
const itemTitle: CSSProperties = { color: "#f8fafc", fontSize: 13, ...safeText };
const source: CSSProperties = { color: "#94a3b8", fontSize: 11, lineHeight: 1.4, ...safeText };
const text: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, margin: 0, ...safeText };
const next: CSSProperties = { color: "#e0f2fe", fontSize: 12, fontWeight: 850, lineHeight: 1.45, margin: 0, ...safeText };
