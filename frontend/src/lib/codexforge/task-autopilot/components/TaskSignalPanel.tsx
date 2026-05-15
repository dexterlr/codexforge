import type { CSSProperties } from "react";
import { buildTaskAutopilotStableKey, type TaskSignal, type TaskSignalSummary } from "@/lib/codexforge/task-autopilot";

export function TaskSignalPanel({ signals, summary }: { signals: TaskSignal[]; summary: TaskSignalSummary }) {
  return (
    <section style={panel} data-codexforge-task-signal-panel>
      <div style={header}>
        <div>
          <div style={eyebrow}>Task signals</div>
          <h2 style={heading}>Active context inputs</h2>
        </div>
        <strong style={count}>{summary.signalCount}</strong>
      </div>
      <div style={grid}>
        {signals.slice(0, 8).map((signal, index) => (
          <article key={buildTaskAutopilotStableKey("signal-card", signal.id, index)} style={card}>
            <span style={pill}>{signal.sourceType}</span>
            <strong style={title}>{signal.title}</strong>
            <p style={body}>{signal.summary}</p>
            <span style={meta}>{signal.filePaths.length} files - {Math.round(signal.confidence * 100)}% confidence</span>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(15,23,42,0.58)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 12, alignItems: "start", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#67e8f9", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const heading: CSSProperties = { margin: 0, fontSize: 20, letterSpacing: 0, overflowWrap: "anywhere" };
const count: CSSProperties = { color: "#ccfbf1", fontSize: 28 };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 10, minWidth: 0 };
const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.48)", borderRadius: 8, padding: 12, display: "grid", gap: 7, minWidth: 0 };
const pill: CSSProperties = { color: "#99f6e4", fontSize: 10, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { color: "#f8fafc", overflowWrap: "anywhere" };
const body: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
const meta: CSSProperties = { color: "#94a3b8", fontSize: 11 };
