import type { CSSProperties } from "react";
import type { TaskActivationLedger } from "@/lib/codexforge/task-activation";

export function TaskActivationLedgerPanel({ ledger }: { ledger: TaskActivationLedger }) {
  return (
    <section style={panel} data-codexforge-task-activation-ledger-panel>
      <div style={eyebrow}>Activation ledger</div>
      <strong style={title}>{ledger.items.length} local review entries</strong>
      <div style={stack}>
        {ledger.items.map((item) => (
          <div key={item.id} style={entry}>
            <span style={pill}>{item.state}</span>
            <strong style={entryTitle}>{item.label}</strong>
            <span style={body}>{item.detail}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(2,6,23,0.48)", borderRadius: 8, padding: 14, display: "grid", gap: 10, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#67e8f9", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { color: "#f8fafc", overflowWrap: "anywhere" };
const stack: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const entry: CSSProperties = { borderTop: "1px solid rgba(148,163,184,0.12)", paddingTop: 8, display: "grid", gap: 5, minWidth: 0 };
const pill: CSSProperties = { color: "#99f6e4", fontSize: 10, fontWeight: 900, textTransform: "uppercase" };
const entryTitle: CSSProperties = { overflowWrap: "anywhere" };
const body: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.4, overflowWrap: "anywhere" };
