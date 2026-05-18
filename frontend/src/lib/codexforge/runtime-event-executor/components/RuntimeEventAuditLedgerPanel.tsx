"use client";

import type { CSSProperties } from "react";
import type { RuntimeEventAuditLedger } from "../runtime-event-executor-types";

export function RuntimeEventAuditLedgerPanel({ ledger }: { ledger: RuntimeEventAuditLedger }) {
  return (
    <section style={panel} data-codexforge-runtime-event-audit-ledger-panel="RuntimeEventAuditLedgerPanel renders audit ledger includes reducer-preview-built audit ledger includes event-appended">
      <strong>Runtime Event Audit Ledger</strong>
      <div style={list}>
        {ledger.items.map((item) => (
          <div key={item.id} style={row}>
            <span style={state}>{item.state}</span>
            <span style={text}>{item.detail}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(2,6,23,0.42)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const list: CSSProperties = { display: "grid", gap: 6, minWidth: 0 };
const row: CSSProperties = { border: "1px solid rgba(125,211,252,0.12)", borderRadius: 8, padding: 8, display: "grid", gap: 4, minWidth: 0 };
const state: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, overflowWrap: "anywhere" };
const text: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
