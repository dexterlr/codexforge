import type { CSSProperties } from "react";
import type { RuntimeReplayImpactAnalysis } from "../runtime-event-replay-types";

export function ReplayImpactAnalysisPanel({ analysis }: { analysis: RuntimeReplayImpactAnalysis }) {
  return (
    <section
      style={panel}
      data-codexforge-runtime-event-replay-impact-analysis-panel="ReplayImpactAnalysisPanel renders memory-promoted concept-synthesized task-updated execution-linked impact analysis"
    >
      <div style={heading}>
        <span style={eyebrow}>Impact Analysis</span>
        <h2 style={title}>Graph and memory deltas</h2>
        <p style={muted}>Impact is derived from reducer preview summaries and remains read-only.</p>
      </div>
      <div style={grid}>
        <Stat label="Node delta" value={String(analysis.nodeDelta)} />
        <Stat label="Edge delta" value={String(analysis.edgeDelta)} />
        <Stat label="Memory" value={String(analysis.memoryPromotionCount)} />
        <Stat label="Review" value={String(analysis.reviewRequiredCount)} />
      </div>
      <div style={items}>
        {analysis.items.map((item) => (
          <article key={item.id} style={itemBox}>
            <div style={top}>
              <strong style={itemTitle}>{item.category}</strong>
              <span style={risk}>{item.riskLevel}</span>
            </div>
            <span style={mono}>{item.eventType} / {item.eventId}</span>
            <span style={muted}>{item.graphArea}</span>
            <span style={line}>{item.beforeSummary} to {item.afterSummary}</span>
            <span style={line}>Delta {item.delta}; review {item.reviewRequired ? "required" : "not required"}.</span>
          </article>
        ))}
      </div>
      <ul style={list}>
        {analysis.summary.map((item) => <li key={item} style={listItem}>{item}</li>)}
      </ul>
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

const safeText: CSSProperties = { minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.18)", background: "rgba(2,6,23,0.5)", borderRadius: 8, display: "grid", gap: 12, minWidth: 0, padding: 14 };
const heading: CSSProperties = { display: "grid", gap: 5, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase", ...safeText };
const title: CSSProperties = { color: "#f8fafc", fontSize: 20, lineHeight: 1.2, margin: 0, ...safeText };
const muted: CSSProperties = { color: "#94a3b8", fontSize: 12, lineHeight: 1.45, margin: 0, ...safeText };
const grid: CSSProperties = { display: "grid", gap: 8, gridTemplateColumns: "repeat(2, minmax(0, 1fr))", minWidth: 0 };
const stat: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(15,23,42,0.54)", borderRadius: 8, display: "grid", gap: 4, minWidth: 0, padding: 10 };
const statLabel: CSSProperties = { color: "#94a3b8", fontSize: 10, fontWeight: 850, textTransform: "uppercase", ...safeText };
const statValue: CSSProperties = { color: "#ccfbf1", fontSize: 16, lineHeight: 1.2, ...safeText };
const items: CSSProperties = { display: "grid", gap: 9, minWidth: 0 };
const itemBox: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(15,23,42,0.42)", borderRadius: 8, display: "grid", gap: 7, minWidth: 0, padding: 10 };
const top: CSSProperties = { alignItems: "center", display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "space-between", minWidth: 0 };
const itemTitle: CSSProperties = { color: "#f8fafc", fontSize: 13, lineHeight: 1.25, ...safeText };
const risk: CSSProperties = { border: "1px solid rgba(45,212,191,0.2)", background: "rgba(20,184,166,0.08)", borderRadius: 8, color: "#ccfbf1", fontSize: 10, fontWeight: 900, padding: "5px 7px", ...safeText };
const mono: CSSProperties = { color: "#cbd5e1", fontFamily: "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace", fontSize: 11, ...safeText };
const line: CSSProperties = { color: "#dbeafe", fontSize: 12, lineHeight: 1.4, ...safeText };
const list: CSSProperties = { display: "grid", gap: 5, margin: 0, paddingLeft: 18, ...safeText };
const listItem: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, ...safeText };
