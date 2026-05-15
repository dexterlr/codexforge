import type { CSSProperties } from "react";
import type { ExecutionStepPreflight } from "../execution-readiness-types";

export function ExecutionStepPreflightPanel({
  preflight,
}: {
  preflight: ExecutionStepPreflight;
}) {
  return (
    <section style={panel} data-codexforge-execution-step-preflight-panel="ExecutionStepPreflightPanel renders">
      <div style={top}>
        <div>
          <div style={eyebrow}>Step Preflight</div>
          <h2 style={heading}>Activated steps are review-gated</h2>
        </div>
        <span style={pill}>{preflight.readyCount} ready-for-review</span>
      </div>
      <div style={stack}>
        {preflight.items.map((item) => (
          <article key={item.id} style={row}>
            <div style={rowTop}>
              <strong style={label}>{item.label}</strong>
              <span style={status}>{item.readinessStatus}</span>
            </div>
            <p style={body}>{item.safeNextAction}</p>
            {item.blockedReason ? <p style={warning}>{item.blockedReason}</p> : null}
            <div style={miniGrid}>
              <List label="Context" values={item.requiredContext} />
              <List label="Approvals" values={item.requiredApprovals} />
              <List label="Checks" values={item.suggestedChecks} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function List({ label, values }: { label: string; values: string[] }) {
  return (
    <div style={miniList}>
      <span style={miniLabel}>{label}</span>
      <span style={miniValue}>{values.length > 0 ? values.join(", ") : "None required here."}</span>
    </div>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(15,23,42,0.62)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const top: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const heading: CSSProperties = { margin: "4px 0 0", fontSize: 20, letterSpacing: 0, overflowWrap: "anywhere" };
const pill: CSSProperties = { border: "1px solid rgba(45,212,191,0.28)", background: "rgba(20,184,166,0.1)", borderRadius: 8, padding: "7px 9px", color: "#ccfbf1", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const stack: CSSProperties = { display: "grid", gap: 9, minWidth: 0 };
const row: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.45)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const rowTop: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "start", flexWrap: "wrap" };
const label: CSSProperties = { fontSize: 13, overflowWrap: "anywhere" };
const status: CSSProperties = { color: "#c7d2fe", fontSize: 10, fontWeight: 900, textTransform: "uppercase" };
const body: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
const warning: CSSProperties = { margin: 0, color: "#fecaca", fontSize: 12, lineHeight: 1.4, overflowWrap: "anywhere" };
const miniGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))", gap: 8, minWidth: 0 };
const miniList: CSSProperties = { display: "grid", gap: 3, minWidth: 0 };
const miniLabel: CSSProperties = { color: "#94a3b8", fontSize: 10, fontWeight: 900, textTransform: "uppercase" };
const miniValue: CSSProperties = { color: "#e2e8f0", fontSize: 11, lineHeight: 1.35, overflowWrap: "anywhere" };
