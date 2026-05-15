"use client";

import type { CSSProperties } from "react";
import type { PatchPreviewQueueLedger } from "../patch-preview-queue-types";

export function PatchPreviewQueueLedgerPanel({ ledger }: { ledger: PatchPreviewQueueLedger }) {
  return (
    <section
      style={panel}
      data-codexforge-patch-preview-queue-ledger-panel="PatchPreviewQueueLedgerPanel renders local React state only no persistence writes"
    >
      <h3 style={title}>Queue ledger</h3>
      <div style={events}>
        {ledger.items.slice(0, 8).map((item) => (
          <div key={item.id} style={eventRow}>
            <strong>{item.label}</strong>
            <span>{item.detail}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(15,23,42,0.58)", borderRadius: 8, padding: 12, display: "grid", gap: 9, minWidth: 0 };
const title: CSSProperties = { margin: 0, fontSize: 15, letterSpacing: 0 };
const events: CSSProperties = { display: "grid", gap: 7 };
const eventRow: CSSProperties = { borderLeft: "2px solid rgba(94,234,212,0.34)", paddingLeft: 9, display: "grid", gap: 2, color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
