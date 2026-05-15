import type { CSSProperties } from "react";
import type { ReadOnlyEvidence } from "../read-only-execution-types";

export function ReadOnlyEvidencePanel({ evidence }: { evidence: ReadOnlyEvidence }) {
  return (
    <section
      style={panel}
      data-codexforge-read-only-evidence-panel="ReadOnlyEvidencePanel renders file path line match summary warning error"
    >
      <div style={eyebrow}>Read-Only Evidence</div>
      <h2 style={heading}>{evidence.items.length} evidence item(s)</h2>
      <div style={items}>
        {evidence.items.length > 0 ? (
          evidence.items.slice(0, 28).map((item) => (
            <article key={item.id} style={card}>
              <div style={rowTop}>
                <strong style={title}>{item.label}</strong>
                <span style={badge}>{item.type}</span>
              </div>
              <p style={body}>{item.value}</p>
              <p style={muted}>Source: {item.source}; confidence: {item.confidence}</p>
            </article>
          ))
        ) : (
          <p style={body}>No evidence captured yet.</p>
        )}
      </div>
      <ul style={list}>
        {evidence.summary.map((line) => (
          <li key={line} style={itemStyle}>{line}</li>
        ))}
      </ul>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(15,23,42,0.62)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const heading: CSSProperties = { margin: 0, fontSize: 20, letterSpacing: 0, overflowWrap: "anywhere" };
const items: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.45)", borderRadius: 8, padding: 10, display: "grid", gap: 5, minWidth: 0 };
const rowTop: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap", alignItems: "flex-start" };
const title: CSSProperties = { fontSize: 13, color: "#f8fafc", overflowWrap: "anywhere" };
const badge: CSSProperties = { color: "#bfdbfe", fontSize: 10, fontWeight: 900, textTransform: "uppercase" };
const body: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.4, overflowWrap: "anywhere" };
const muted: CSSProperties = { margin: 0, color: "#94a3b8", fontSize: 11, lineHeight: 1.35, overflowWrap: "anywhere" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, display: "grid", gap: 4 };
const itemStyle: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.4, overflowWrap: "anywhere" };
