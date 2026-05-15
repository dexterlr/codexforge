"use client";

import type { CSSProperties } from "react";
import type { BrainMergeLedger } from "../brain-merge-types";

export function BrainMergeLedgerPanel({ ledger }: { ledger: BrainMergeLedger }) {
  return (
    <section style={panel} data-codexforge-brain-merge-ledger-panel>
      <h3 style={title}>Merge Ledger</h3>
      <p style={copy}>Ledger states: queued, previewed, blocked, approved-for-future-merge, rejected, future-merged. No persistence writes.</p>
      {ledger.items.map((item) => (
        <article key={item.id} style={row}>
          <strong>{item.state}</strong>
          <span>{item.eventId}</span>
          <span>{item.note}</span>
        </article>
      ))}
    </section>
  );
}

const safe: CSSProperties = { overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(2,6,23,0.36)", borderRadius: 8, padding: 14, display: "grid", gap: 8, minWidth: 0 };
const title: CSSProperties = { margin: 0, fontSize: 16, ...safe };
const copy: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, ...safe };
const row: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, padding: 10, display: "grid", gap: 4, minWidth: 0, fontSize: 12, ...safe };
