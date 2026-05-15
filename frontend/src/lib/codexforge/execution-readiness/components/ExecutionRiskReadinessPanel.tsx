import type { CSSProperties } from "react";
import type { ExecutionRiskReadiness } from "../execution-readiness-types";

export function ExecutionRiskReadinessPanel({
  readiness,
}: {
  readiness: ExecutionRiskReadiness;
}) {
  return (
    <section style={panel} data-codexforge-execution-risk-readiness-panel="ExecutionRiskReadinessPanel renders">
      <div style={top}>
        <div>
          <div style={eyebrow}>Risk Readiness</div>
          <h2 style={heading}>Risk status: {readiness.status}</h2>
        </div>
        <span style={pill}>{readiness.factors.filter((factor) => factor.status !== "low").length} active factors</span>
      </div>
      <div style={grid}>
        {readiness.factors.map((factor) => (
          <article key={factor.id} style={factorRow}>
            <div style={rowTop}>
              <strong style={label}>{factor.label}</strong>
              <span style={status}>{factor.status}</span>
            </div>
            <p style={body}>{factor.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(15,23,42,0.62)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const top: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#fbbf24", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const heading: CSSProperties = { margin: "4px 0 0", fontSize: 20, letterSpacing: 0, overflowWrap: "anywhere" };
const pill: CSSProperties = { border: "1px solid rgba(251,191,36,0.28)", background: "rgba(251,191,36,0.1)", borderRadius: 8, padding: "7px 9px", color: "#fde68a", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 210px), 1fr))", gap: 9, minWidth: 0 };
const factorRow: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.45)", borderRadius: 8, padding: 11, display: "grid", gap: 7, minWidth: 0 };
const rowTop: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "start", flexWrap: "wrap" };
const label: CSSProperties = { fontSize: 13, overflowWrap: "anywhere" };
const status: CSSProperties = { color: "#fde68a", fontSize: 10, fontWeight: 900, textTransform: "uppercase" };
const body: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.4, overflowWrap: "anywhere" };
