import type { CSSProperties } from "react";
import type { RuntimeEventReplaySummary } from "../runtime-event-replay-types";

export function ReplaySummaryPanel({ summary }: { summary: RuntimeEventReplaySummary }) {
  return (
    <section
      style={panel}
      data-codexforge-runtime-event-replay-summary-panel="ReplaySummaryPanel renders replay summary preview-only no graph mutation no appendEvent no event execution"
    >
      <div style={heading}>
        <span style={eyebrow}>Replay Summary</span>
        <h2 style={title}>Session result</h2>
        <p style={muted}>Summary can be copied as a handoff; it is not persisted automatically.</p>
      </div>
      <div style={grid}>
        <Stat label="Status" value={summary.replayStatus} />
        <Stat label="Simulated" value={`${summary.simulatedEventCount}/${summary.eventCount}`} />
        <Stat label="Blocked" value={String(summary.blockedEventCount)} />
        <Stat label="Risk" value={String(summary.riskCount)} />
        <Stat label="Node delta" value={String(summary.nodeDelta)} />
        <Stat label="Edge delta" value={String(summary.edgeDelta)} />
      </div>
      <div style={nextBox}>
        <span style={nextLabel}>Next safe action</span>
        <strong style={nextValue}>{summary.nextSafeAction}</strong>
        <span style={muted}>Top risk: {summary.topRisk}</span>
      </div>
      <ul style={list}>
        {summary.summary.map((item) => <li key={item} style={listItem}>{item}</li>)}
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
const nextBox: CSSProperties = { border: "1px solid rgba(45,212,191,0.2)", background: "rgba(20,184,166,0.08)", borderRadius: 8, display: "grid", gap: 5, minWidth: 0, padding: 10 };
const nextLabel: CSSProperties = { color: "#5eead4", fontSize: 10, fontWeight: 900, textTransform: "uppercase", ...safeText };
const nextValue: CSSProperties = { color: "#ccfbf1", fontSize: 16, lineHeight: 1.25, ...safeText };
const list: CSSProperties = { display: "grid", gap: 5, margin: 0, paddingLeft: 18, ...safeText };
const listItem: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, ...safeText };
