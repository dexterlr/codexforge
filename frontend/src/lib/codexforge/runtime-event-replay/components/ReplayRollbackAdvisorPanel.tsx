import type { CSSProperties } from "react";
import type { RuntimeReplayRollbackAdvice } from "../runtime-event-replay-types";

export function ReplayRollbackAdvisorPanel({ advice }: { advice: RuntimeReplayRollbackAdvice }) {
  return (
    <section
      style={panel}
      data-codexforge-runtime-event-replay-rollback-advisor-panel="ReplayRollbackAdvisorPanel renders do not apply event review runtime event journal no rollback execution"
    >
      <div style={heading}>
        <span style={eyebrow}>Rollback Advisor</span>
        <h2 style={title}>Conceptual guidance only</h2>
        <p style={muted}>No rollback execution is available from this preview surface.</p>
      </div>
      <article style={selectedBox}>
        <span style={selectedLabel}>Selected</span>
        <strong style={selectedTitle}>{advice.selected.label}</strong>
        <span style={line}>{advice.selected.detail}</span>
      </article>
      <div style={items}>
        {advice.options.map((option) => (
          <article key={option.id} style={itemBox}>
            <div style={top}>
              <strong style={itemTitle}>{option.label}</strong>
              <span style={pill}>{option.priority}</span>
            </div>
            <span style={line}>{option.detail}</span>
          </article>
        ))}
      </div>
      <ul style={list}>
        {advice.summary.map((item) => <li key={item} style={listItem}>{item}</li>)}
      </ul>
    </section>
  );
}

const safeText: CSSProperties = { minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(251,191,36,0.18)", background: "rgba(2,6,23,0.5)", borderRadius: 8, display: "grid", gap: 12, minWidth: 0, padding: 14 };
const heading: CSSProperties = { display: "grid", gap: 5, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#fde68a", fontSize: 11, fontWeight: 900, textTransform: "uppercase", ...safeText };
const title: CSSProperties = { color: "#f8fafc", fontSize: 20, lineHeight: 1.2, margin: 0, ...safeText };
const muted: CSSProperties = { color: "#94a3b8", fontSize: 12, lineHeight: 1.45, margin: 0, ...safeText };
const selectedBox: CSSProperties = { border: "1px solid rgba(251,191,36,0.22)", background: "rgba(251,191,36,0.08)", borderRadius: 8, display: "grid", gap: 6, minWidth: 0, padding: 11 };
const selectedLabel: CSSProperties = { color: "#fde68a", fontSize: 10, fontWeight: 900, textTransform: "uppercase", ...safeText };
const selectedTitle: CSSProperties = { color: "#fef3c7", fontSize: 16, lineHeight: 1.2, ...safeText };
const items: CSSProperties = { display: "grid", gap: 9, minWidth: 0 };
const itemBox: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(15,23,42,0.42)", borderRadius: 8, display: "grid", gap: 7, minWidth: 0, padding: 10 };
const top: CSSProperties = { alignItems: "center", display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "space-between", minWidth: 0 };
const itemTitle: CSSProperties = { color: "#f8fafc", fontSize: 13, lineHeight: 1.25, ...safeText };
const pill: CSSProperties = { border: "1px solid rgba(251,191,36,0.2)", background: "rgba(251,191,36,0.08)", borderRadius: 8, color: "#fde68a", fontSize: 10, fontWeight: 900, padding: "5px 7px", ...safeText };
const line: CSSProperties = { color: "#dbeafe", fontSize: 12, lineHeight: 1.4, ...safeText };
const list: CSSProperties = { display: "grid", gap: 5, margin: 0, paddingLeft: 18, ...safeText };
const listItem: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, ...safeText };
