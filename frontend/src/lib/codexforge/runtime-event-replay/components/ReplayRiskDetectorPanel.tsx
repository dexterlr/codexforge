import type { CSSProperties } from "react";
import type { RuntimeReplayRiskReport } from "../runtime-event-replay-types";

export function ReplayRiskDetectorPanel({ report }: { report: RuntimeReplayRiskReport }) {
  return (
    <section
      style={panel}
      data-codexforge-runtime-event-replay-risk-detector-panel="ReplayRiskDetectorPanel renders unknown-event-type duplicate-memory-risk contradiction-risk stale-snapshot-risk latest-message-authority-risk direct-mutation-risk"
    >
      <div style={heading}>
        <span style={eyebrow}>Risk Detector</span>
        <h2 style={title}>Replay blockers and warnings</h2>
        <p style={muted}>Unknown event types and missing reducer previews block replay trust.</p>
      </div>
      <div style={grid}>
        <Stat label="Blockers" value={String(report.blockerCount)} />
        <Stat label="Risks" value={String(report.riskCount)} />
        <Stat label="Warnings" value={String(report.warningCount)} />
        <Stat label="Review" value={String(report.reviewRequiredCount)} />
      </div>
      <div style={items}>
        {(report.items.length > 0 ? report.items : []).map((item) => (
          <article key={`${item.id}-${item.eventId ?? "global"}`} style={itemBox}>
            <div style={top}>
              <strong style={itemTitle}>{item.title}</strong>
              <span style={risk}>{item.riskLevel}</span>
            </div>
            <span style={mono}>{item.id}{item.eventId ? ` / ${item.eventId}` : ""}</span>
            <span style={line}>{item.detail}</span>
            <span style={line}>Mitigation: {item.mitigation}</span>
          </article>
        ))}
        {report.items.length === 0 ? <div style={clearBox}>No replay risks detected in the supplied preview.</div> : null}
      </div>
      <ul style={list}>
        {report.summary.map((item) => <li key={item} style={listItem}>{item}</li>)}
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
const panel: CSSProperties = { border: "1px solid rgba(248,113,113,0.18)", background: "rgba(2,6,23,0.5)", borderRadius: 8, display: "grid", gap: 12, minWidth: 0, padding: 14 };
const heading: CSSProperties = { display: "grid", gap: 5, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#fca5a5", fontSize: 11, fontWeight: 900, textTransform: "uppercase", ...safeText };
const title: CSSProperties = { color: "#f8fafc", fontSize: 20, lineHeight: 1.2, margin: 0, ...safeText };
const muted: CSSProperties = { color: "#94a3b8", fontSize: 12, lineHeight: 1.45, margin: 0, ...safeText };
const grid: CSSProperties = { display: "grid", gap: 8, gridTemplateColumns: "repeat(2, minmax(0, 1fr))", minWidth: 0 };
const stat: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(15,23,42,0.54)", borderRadius: 8, display: "grid", gap: 4, minWidth: 0, padding: 10 };
const statLabel: CSSProperties = { color: "#94a3b8", fontSize: 10, fontWeight: 850, textTransform: "uppercase", ...safeText };
const statValue: CSSProperties = { color: "#fecaca", fontSize: 16, lineHeight: 1.2, ...safeText };
const items: CSSProperties = { display: "grid", gap: 9, minWidth: 0 };
const itemBox: CSSProperties = { border: "1px solid rgba(248,113,113,0.16)", background: "rgba(127,29,29,0.14)", borderRadius: 8, display: "grid", gap: 7, minWidth: 0, padding: 10 };
const top: CSSProperties = { alignItems: "center", display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "space-between", minWidth: 0 };
const itemTitle: CSSProperties = { color: "#f8fafc", fontSize: 13, lineHeight: 1.25, ...safeText };
const risk: CSSProperties = { border: "1px solid rgba(248,113,113,0.22)", background: "rgba(248,113,113,0.08)", borderRadius: 8, color: "#fecaca", fontSize: 10, fontWeight: 900, padding: "5px 7px", ...safeText };
const mono: CSSProperties = { color: "#cbd5e1", fontFamily: "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace", fontSize: 11, ...safeText };
const line: CSSProperties = { color: "#dbeafe", fontSize: 12, lineHeight: 1.4, ...safeText };
const clearBox: CSSProperties = { border: "1px solid rgba(45,212,191,0.2)", background: "rgba(20,184,166,0.08)", borderRadius: 8, color: "#ccfbf1", fontSize: 12, lineHeight: 1.45, padding: 10, ...safeText };
const list: CSSProperties = { display: "grid", gap: 5, margin: 0, paddingLeft: 18, ...safeText };
const listItem: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, ...safeText };
