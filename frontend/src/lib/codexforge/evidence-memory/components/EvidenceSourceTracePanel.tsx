import type { CSSProperties } from "react";
import type { EvidenceSourceTrace } from "../evidence-memory-types";

export function EvidenceSourceTracePanel({ trace }: { trace: EvidenceSourceTrace }) {
  return (
    <section
      style={panel}
      data-codexforge-evidence-source-trace-panel="EvidenceSourceTracePanel renders source trace connects task step execution evidence memory future Brain merge event ids"
    >
      <span style={eyebrow}>Source trace</span>
      <h2 style={title}>Task, step, execution, evidence, memory</h2>
      <div style={cards}>
        {trace.items.slice(0, 6).map((item) => (
          <article key={item.id} style={card}>
            <strong style={cardTitle}>{item.executionRequestId}</strong>
            <p style={copy}>Task {item.taskId ?? "unknown"}; step {item.stepId ?? "unknown"}; tool {item.toolName}</p>
            <p style={muted}>Evidence {item.evidenceIds.join(", ")}; memory {item.memoryCandidateIds.join(", ") || "pending"}</p>
            <p style={muted}>Future Brain merge events {item.futureBrainMergeEventIds.join(", ") || "preview pending"}</p>
          </article>
        ))}
      </div>
      <ul style={list}>
        {trace.summary.map((line) => (
          <li key={line} style={listItem}>{line}</li>
        ))}
      </ul>
    </section>
  );
}

const safeText: CSSProperties = { minWidth: 0, overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(15,23,42,0.58)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#7dd3fc", fontSize: 11, fontWeight: 900, textTransform: "uppercase", ...safeText };
const title: CSSProperties = { margin: 0, fontSize: 20, ...safeText };
const cards: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.12)", background: "rgba(2,6,23,0.32)", borderRadius: 8, padding: 10, display: "grid", gap: 5, minWidth: 0 };
const cardTitle: CSSProperties = { color: "#f8fafc", fontSize: 13, ...safeText };
const copy: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.4, ...safeText };
const muted: CSSProperties = { margin: 0, color: "#94a3b8", fontSize: 11, lineHeight: 1.35, ...safeText };
const list: CSSProperties = { margin: 0, paddingLeft: 18, display: "grid", gap: 4 };
const listItem: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.4, ...safeText };
