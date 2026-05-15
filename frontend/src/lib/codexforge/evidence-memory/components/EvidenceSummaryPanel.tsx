import type { CSSProperties } from "react";
import type { EvidenceMemorySummary } from "../evidence-memory-types";

export function EvidenceSummaryPanel({ summary }: { summary: EvidenceMemorySummary }) {
  return (
    <section
      style={panel}
      data-codexforge-evidence-summary-panel="EvidenceSummaryPanel renders evidence summary Review required before memory promotion"
    >
      <div style={header}>
        <div style={titleBlock}>
          <span style={eyebrow}>Evidence summary</span>
          <h2 style={title}>Read-only evidence learning</h2>
        </div>
        <span style={badge}>{summary.nextSafeAction}</span>
      </div>
      <div style={grid}>
        <Fact label="Evidence" value={String(summary.evidenceCount)} />
        <Fact label="Candidates" value={String(summary.candidateCount)} />
        <Fact label="High confidence" value={String(summary.confidenceDistribution.high)} />
        <Fact label="Blocked reasons" value={String(summary.blockedReasons.length)} />
      </div>
      {summary.topCandidate ? (
        <p style={copy}>Top candidate: {summary.topCandidate.title}</p>
      ) : (
        <p style={copy}>No evidence memory candidate is ready for review.</p>
      )}
      <ul style={list}>
        {summary.summary.map((line) => (
          <li key={line} style={item}>{line}</li>
        ))}
      </ul>
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div style={fact}>
      <span style={factLabel}>{label}</span>
      <strong style={factValue}>{value}</strong>
    </div>
  );
}

const safeText: CSSProperties = { minWidth: 0, overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", background: "rgba(15,23,42,0.68)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap", minWidth: 0 };
const titleBlock: CSSProperties = { display: "grid", gap: 4, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#7dd3fc", fontSize: 11, fontWeight: 900, textTransform: "uppercase", ...safeText };
const title: CSSProperties = { margin: 0, fontSize: 20, ...safeText };
const badge: CSSProperties = { border: "1px solid rgba(45,212,191,0.24)", background: "rgba(20,184,166,0.12)", borderRadius: 8, padding: "7px 9px", color: "#ccfbf1", fontSize: 12, fontWeight: 850, ...safeText };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))", gap: 8, minWidth: 0 };
const fact: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.34)", borderRadius: 8, padding: 10, display: "grid", gap: 5, minWidth: 0 };
const factLabel: CSSProperties = { color: "#94a3b8", fontSize: 10, textTransform: "uppercase", fontWeight: 850, ...safeText };
const factValue: CSSProperties = { color: "#f8fafc", fontSize: 18, lineHeight: 1.15, ...safeText };
const copy: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, ...safeText };
const list: CSSProperties = { margin: 0, paddingLeft: 18, display: "grid", gap: 4 };
const item: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.4, ...safeText };
