import type { CSSProperties } from "react";
import { stableReadOnlyJsonStringify, type ReadOnlyToolRoute } from "../read-only-execution-types";

export function ReadOnlyToolRouterPanel({ route }: { route: ReadOnlyToolRoute }) {
  return (
    <section
      style={panel}
      data-codexforge-read-only-tool-router-panel="ReadOnlyToolRouterPanel renders router only prepares deterministic execution metadata no auto-run"
    >
      <div style={eyebrow}>Read-Only Tool Router</div>
      <h2 style={heading}>Route mode: {route.routeMode}</h2>
      <div style={grid}>
        <Metric label="Tool" value={route.toolName} />
        <Metric label="Class" value={route.toolClass} />
        <Metric label="Allowed" value={route.allowed ? "yes" : "no"} />
        <Metric label="Result" value={route.expectedResultKind} />
      </div>
      <p style={body}>{route.reason}</p>
      <p style={muted}>Safe fallback: {route.safeFallback}</p>
      <div style={block}>
        <strong style={blockTitle}>Normalized input</strong>
        <pre style={pre}>{stableReadOnlyJsonStringify(route.normalizedInput)}</pre>
      </div>
      <div style={tagRow}>
        {route.evidenceLabels.map((label) => (
          <span key={label} style={tag}>{label}</span>
        ))}
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div style={metric}>
      <span style={metricLabel}>{label}</span>
      <strong style={metricValue}>{value}</strong>
    </div>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(15,23,42,0.62)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const heading: CSSProperties = { margin: 0, fontSize: 20, letterSpacing: 0, overflowWrap: "anywhere" };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 8, minWidth: 0 };
const metric: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.45)", borderRadius: 8, padding: 10, display: "grid", gap: 4, minWidth: 0 };
const metricLabel: CSSProperties = { color: "#94a3b8", fontSize: 10, fontWeight: 900, textTransform: "uppercase" };
const metricValue: CSSProperties = { color: "#e0f2fe", fontSize: 13, overflowWrap: "anywhere" };
const body: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
const muted: CSSProperties = { margin: 0, color: "#94a3b8", fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
const block: CSSProperties = { display: "grid", gap: 6, minWidth: 0 };
const blockTitle: CSSProperties = { fontSize: 12, color: "#f8fafc", overflowWrap: "anywhere" };
const pre: CSSProperties = { margin: 0, color: "#ccfbf1", background: "rgba(2,6,23,0.68)", border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, padding: 10, fontSize: 11, overflow: "auto", whiteSpace: "pre-wrap" };
const tagRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 6, minWidth: 0 };
const tag: CSSProperties = { border: "1px solid rgba(45,212,191,0.20)", background: "rgba(20,184,166,0.10)", borderRadius: 999, padding: "5px 8px", color: "#ccfbf1", fontSize: 11, fontWeight: 800 };
