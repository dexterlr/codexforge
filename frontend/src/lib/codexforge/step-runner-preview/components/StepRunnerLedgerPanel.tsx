import type { CSSProperties } from "react";
import type { StepRunnerLedger } from "../step-runner-preview-types";

export function StepRunnerLedgerPanel({ ledger }: { ledger: StepRunnerLedger }) {
  return (
    <section
      style={panel}
      data-codexforge-step-runner-ledger-panel="StepRunnerLedgerPanel renders selected previewed policy-blocked approval-required dry-run-planned future-run-ready rejected reset"
    >
      <div style={eyebrow}>Ledger</div>
      <h2 style={heading}>Preview ledger only</h2>
      <div style={items}>
        {ledger.items.map((item) => (
          <article key={item.id} style={row}>
            <div style={rowTop}>
              <strong style={title}>{item.label}</strong>
              <span style={state}>{item.state}</span>
            </div>
            <p style={body}>{item.detail}</p>
          </article>
        ))}
      </div>
      <ul style={list}>
        {ledger.summary.map((line) => (
          <li key={line} style={body}>
            {line}
          </li>
        ))}
      </ul>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(15,23,42,0.62)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#facc15", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const heading: CSSProperties = { margin: 0, fontSize: 20, letterSpacing: 0, overflowWrap: "anywhere" };
const items: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const row: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.45)", borderRadius: 8, padding: 10, display: "grid", gap: 5, minWidth: 0 };
const rowTop: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap", alignItems: "flex-start" };
const title: CSSProperties = { color: "#f8fafc", fontSize: 13, overflowWrap: "anywhere" };
const state: CSSProperties = { color: "#bfdbfe", fontSize: 10, fontWeight: 900, textTransform: "uppercase" };
const body: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.4, overflowWrap: "anywhere" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, display: "grid", gap: 4 };
