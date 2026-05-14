"use client";

import type { CSSProperties } from "react";
import type { MemoryReviewLedger } from "../memory-review-types";
import { buildMemoryReviewStableKey } from "../memory-review-types";

export function MemoryReviewLedgerPanel({ ledger }: { ledger: MemoryReviewLedger }) {
  return (
    <section style={panel} data-codexforge-memory-review-ledger-panel="MemoryReviewLedgerPanel renders queued reviewed approved rejected deferred promotion-event-previewed future-persisted">
      <span style={eyebrow}>Review ledger</span>
      <h2 style={title}>Local decision history</h2>
      <div style={items}>
        {ledger.items.map((item, index) => (
          <div key={buildMemoryReviewStableKey("ledger-row", item.id, index)} style={row}>
            <span style={state}>{item.state}</span>
            <div style={copyBlock}>
              <strong style={safeText}>{item.title}</strong>
              <span style={note}>{item.note}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const safeText: CSSProperties = { minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.64)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#c4b5fd", fontSize: 12, fontWeight: 900, textTransform: "uppercase", ...safeText };
const title: CSSProperties = { margin: 0, fontSize: 20, ...safeText };
const items: CSSProperties = { display: "grid", gap: 8, maxHeight: 360, overflow: "auto", minWidth: 0 };
const row: CSSProperties = { display: "grid", gridTemplateColumns: "minmax(0, 150px) minmax(0, 1fr)", gap: 10, border: "1px solid rgba(148,163,184,0.12)", background: "rgba(2,6,23,0.26)", borderRadius: 8, padding: 10, minWidth: 0 };
const state: CSSProperties = { color: "#ddd6fe", fontSize: 11, fontWeight: 900, textTransform: "uppercase", ...safeText };
const copyBlock: CSSProperties = { display: "grid", gap: 3, minWidth: 0 };
const note: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, ...safeText };
