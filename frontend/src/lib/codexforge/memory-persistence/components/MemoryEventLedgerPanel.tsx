"use client";

import type { CSSProperties } from "react";
import { buildMemoryEventStableKey, type MemoryEventLedger } from "../memory-persistence-types";

export function MemoryEventLedgerPanel({ ledger }: { ledger: MemoryEventLedger }) {
  return (
    <section style={panel} data-codexforge-memory-event-ledger-panel="MemoryEventLedgerPanel renders requested blocked approved persisted failed graph-preview-ready future-merged">
      <span style={eyebrow}>Runtime event ledger</span>
      <h2 style={title}>Approved persistence events</h2>
      {ledger.summary.map((line, index) => (
        <p key={buildMemoryEventStableKey("ledger-summary", line, index)} style={summary}>{line}</p>
      ))}
      <div style={rows}>
        {ledger.items.map((item, index) => (
          <div key={buildMemoryEventStableKey("ledger-item", item.id, index)} style={row}>
            <strong style={safeText}>{item.state}</strong>
            <span style={safeText}>{item.eventId}</span>
            <span style={note}>{item.note}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

const safeText: CSSProperties = { minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(167,139,250,0.18)", background: "rgba(30,27,75,0.28)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#c4b5fd", fontSize: 12, fontWeight: 900, textTransform: "uppercase", ...safeText };
const title: CSSProperties = { margin: 0, fontSize: 19, ...safeText };
const summary: CSSProperties = { margin: 0, color: "#ddd6fe", fontSize: 13, lineHeight: 1.45, ...safeText };
const rows: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const row: CSSProperties = { border: "1px solid rgba(196,181,253,0.13)", background: "rgba(2,6,23,0.32)", borderRadius: 8, padding: 10, display: "grid", gap: 4, minWidth: 0 };
const note: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, ...safeText };
