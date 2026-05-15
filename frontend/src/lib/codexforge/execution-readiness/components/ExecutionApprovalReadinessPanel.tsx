import type { CSSProperties } from "react";
import type { ExecutionApprovalReadiness } from "../execution-readiness-types";

export function ExecutionApprovalReadinessPanel({
  readiness,
}: {
  readiness: ExecutionApprovalReadiness;
}) {
  return (
    <section style={panel} data-codexforge-execution-approval-readiness-panel="ExecutionApprovalReadinessPanel renders ready-for-future-execution-approval">
      <div style={top}>
        <div>
          <div style={eyebrow}>Approval Readiness</div>
          <h2 style={heading}>State: {readiness.currentState}</h2>
        </div>
        <span style={pill}>not approved</span>
      </div>
      <div style={grid}>
        {readiness.gates.map((gate) => (
          <article key={gate.id} style={gate.active ? activeGate : gateRow}>
            <div style={rowTop}>
              <strong style={label}>{gate.label}</strong>
              <span style={state}>{gate.state}</span>
            </div>
            <p style={body}>{gate.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(15,23,42,0.62)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const top: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#fca5a5", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const heading: CSSProperties = { margin: "4px 0 0", fontSize: 20, letterSpacing: 0, overflowWrap: "anywhere" };
const pill: CSSProperties = { border: "1px solid rgba(248,113,113,0.30)", background: "rgba(127,29,29,0.18)", borderRadius: 8, padding: "7px 9px", color: "#fecaca", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 210px), 1fr))", gap: 9, minWidth: 0 };
const gateRow: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.45)", borderRadius: 8, padding: 11, display: "grid", gap: 7, minWidth: 0 };
const activeGate: CSSProperties = { ...gateRow, border: "1px solid rgba(45,212,191,0.26)", background: "rgba(20,184,166,0.08)" };
const rowTop: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "start", flexWrap: "wrap" };
const label: CSSProperties = { fontSize: 13, overflowWrap: "anywhere" };
const state: CSSProperties = { color: "#c7d2fe", fontSize: 10, fontWeight: 900, textTransform: "uppercase" };
const body: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.4, overflowWrap: "anywhere" };
