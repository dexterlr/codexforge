"use client";

import type { CSSProperties } from "react";
import type { ApprovedMergeLedger } from "../approved-brain-merge-types";

export function ApprovedMergeLedgerPanel({ ledger }: { ledger: ApprovedMergeLedger }) {
  return (
    <section style={panel} data-codexforge-approved-merge-ledger="merge ledger requested blocked approved applied failed rollback-available reviewed">
      <h3 style={title}>Approved Merge Ledger</h3>
      <ul style={list}>
        {ledger.summary.map((line) => <li key={line}>{line}</li>)}
      </ul>
      <div style={items}>
        {ledger.items.map((item) => (
          <article key={item.id} style={itemStyle}>
            <strong>{item.state}</strong>
            <span>{item.note}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

const safe: CSSProperties = { overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(2,6,23,0.36)", borderRadius: 8, padding: 14, display: "grid", gap: 10, minWidth: 0 };
const title: CSSProperties = { margin: 0, fontSize: 16, ...safe };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#cbd5e1", fontSize: 12, lineHeight: 1.55, ...safe };
const items: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const itemStyle: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, padding: 10, display: "grid", gap: 4, fontSize: 12, minWidth: 0, ...safe };
