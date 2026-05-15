import type { CSSProperties } from "react";
import type { ExecutionToolReadiness } from "../execution-readiness-types";

export function ExecutionToolReadinessPanel({
  readiness,
}: {
  readiness: ExecutionToolReadiness;
}) {
  return (
    <section style={panel} data-codexforge-execution-tool-readiness-panel="ExecutionToolReadinessPanel renders read-file list-files search-project read-only write-file apply-diff run-command broker-execution blocked">
      <div style={eyebrow}>Tool Readiness</div>
      <h2 style={heading}>Tool policy posture only</h2>
      <div style={grid}>
        {readiness.tools.map((tool) => (
          <article key={tool.id} style={toolRow}>
            <div style={rowTop}>
              <strong style={toolName}>{tool.toolName}</strong>
              <span style={posture}>{tool.posture}</span>
            </div>
            <p style={body}>{tool.reason}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(15,23,42,0.62)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const heading: CSSProperties = { margin: 0, fontSize: 20, letterSpacing: 0, overflowWrap: "anywhere" };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 190px), 1fr))", gap: 9, minWidth: 0 };
const toolRow: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.45)", borderRadius: 8, padding: 11, display: "grid", gap: 7, minWidth: 0 };
const rowTop: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "start", flexWrap: "wrap" };
const toolName: CSSProperties = { fontSize: 13, color: "#f8fafc", overflowWrap: "anywhere" };
const posture: CSSProperties = { color: "#bfdbfe", fontSize: 10, fontWeight: 900, textTransform: "uppercase" };
const body: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.4, overflowWrap: "anywhere" };
