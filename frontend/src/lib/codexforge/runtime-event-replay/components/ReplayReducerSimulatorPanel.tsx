import type { CSSProperties } from "react";
import type { RuntimeReplaySimulation } from "../runtime-event-replay-types";

export function ReplayReducerSimulatorPanel({ simulation }: { simulation: RuntimeReplaySimulation }) {
  return (
    <section
      style={panel}
      data-codexforge-runtime-event-replay-reducer-simulator-panel="ReplayReducerSimulatorPanel renders reduceGraph preview-only simulator no graph mutation no appendEvent no event execution"
    >
      <div style={heading}>
        <span style={eyebrow}>Reducer Simulator</span>
        <h2 style={title}>Preview-only graph reduction</h2>
        <p style={muted}>Reducer preview runs on cloned graph data and returns summaries only.</p>
      </div>
      <div style={grid}>
        <Stat label="Status" value={simulation.status} />
        <Stat label="Before" value={`${simulation.before.nodeCount} nodes / ${simulation.before.edgeCount} edges`} />
        <Stat label="After" value={`${simulation.after.nodeCount} nodes / ${simulation.after.edgeCount} edges`} />
        <Stat label="Blocked" value={String(simulation.blockedEventIds.length)} />
      </div>
      <div style={steps}>
        {simulation.steps.map((step) => (
          <article key={step.id} style={stepBox}>
            <div style={stepTop}>
              <strong style={stepTitle}>{step.replayOrder}. {step.eventType}</strong>
              <span style={status}>{step.status}</span>
            </div>
            <span style={mono}>{step.eventId}</span>
            <span style={muted}>{step.expectedReducerArea}</span>
            <div style={deltaGrid}>
              <Delta label="Node delta" value={String(step.nodeDelta)} />
              <Delta label="Edge delta" value={String(step.edgeDelta)} />
            </div>
            {step.errors.length > 0 ? <MessageList label="Errors" values={step.errors} tone="error" /> : null}
            {step.warnings.length > 0 ? <MessageList label="Warnings" values={step.warnings} tone="warning" /> : null}
          </article>
        ))}
      </div>
      <ul style={list}>
        {simulation.summary.map((item) => (
          <li key={item} style={listItem}>{item}</li>
        ))}
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

function Delta({ label, value }: { label: string; value: string }) {
  return (
    <div style={delta}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function MessageList({ label, values, tone }: { label: string; values: string[]; tone: "warning" | "error" }) {
  return (
    <div style={tone === "error" ? errorBox : warningBox}>
      <strong>{label}</strong>
      {values.map((value) => <span key={`${label}-${value}`}>{value}</span>)}
    </div>
  );
}

const safeText: CSSProperties = { minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(2,6,23,0.46)", borderRadius: 8, display: "grid", gap: 12, minWidth: 0, padding: 14 };
const heading: CSSProperties = { display: "grid", gap: 5, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#7dd3fc", fontSize: 11, fontWeight: 900, textTransform: "uppercase", ...safeText };
const title: CSSProperties = { color: "#f8fafc", fontSize: 20, lineHeight: 1.2, margin: 0, ...safeText };
const muted: CSSProperties = { color: "#94a3b8", fontSize: 12, lineHeight: 1.45, margin: 0, ...safeText };
const grid: CSSProperties = { display: "grid", gap: 8, gridTemplateColumns: "repeat(2, minmax(0, 1fr))", minWidth: 0 };
const stat: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(15,23,42,0.54)", borderRadius: 8, display: "grid", gap: 4, minWidth: 0, padding: 10 };
const statLabel: CSSProperties = { color: "#94a3b8", fontSize: 10, fontWeight: 850, textTransform: "uppercase", ...safeText };
const statValue: CSSProperties = { color: "#e0f2fe", fontSize: 16, lineHeight: 1.2, ...safeText };
const steps: CSSProperties = { display: "grid", gap: 9, minWidth: 0 };
const stepBox: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(15,23,42,0.42)", borderRadius: 8, display: "grid", gap: 7, minWidth: 0, padding: 10 };
const stepTop: CSSProperties = { alignItems: "center", display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "space-between", minWidth: 0 };
const stepTitle: CSSProperties = { color: "#f8fafc", fontSize: 13, lineHeight: 1.25, ...safeText };
const status: CSSProperties = { border: "1px solid rgba(125,211,252,0.2)", background: "rgba(14,165,233,0.08)", borderRadius: 8, color: "#e0f2fe", fontSize: 10, fontWeight: 900, padding: "5px 7px", ...safeText };
const mono: CSSProperties = { color: "#cbd5e1", fontFamily: "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace", fontSize: 11, ...safeText };
const deltaGrid: CSSProperties = { display: "grid", gap: 8, gridTemplateColumns: "repeat(2, minmax(0, 1fr))", minWidth: 0 };
const delta: CSSProperties = { border: "1px solid rgba(148,163,184,0.12)", borderRadius: 8, color: "#cbd5e1", display: "grid", fontSize: 11, gap: 4, padding: 8, ...safeText };
const warningBox: CSSProperties = { border: "1px solid rgba(251,191,36,0.2)", background: "rgba(251,191,36,0.08)", borderRadius: 8, color: "#fde68a", display: "grid", gap: 4, fontSize: 12, lineHeight: 1.4, padding: 8, ...safeText };
const errorBox: CSSProperties = { border: "1px solid rgba(248,113,113,0.22)", background: "rgba(248,113,113,0.08)", borderRadius: 8, color: "#fecaca", display: "grid", gap: 4, fontSize: 12, lineHeight: 1.4, padding: 8, ...safeText };
const list: CSSProperties = { display: "grid", gap: 5, margin: 0, paddingLeft: 18, ...safeText };
const listItem: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, ...safeText };
