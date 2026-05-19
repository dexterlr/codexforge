"use client";

import type { CSSProperties } from "react";
import type { AiUsageLedger } from "../ai-router-types";
import { summarizeAiUsageLedger } from "../ai-usage-ledger";

export function AiUsageLedgerPanel({ ledger }: { ledger: AiUsageLedger }) {
  return (
    <section style={panel}>
      <span style={eyebrow}>Usage ledger preview</span>
      <h2 style={title}>{summarizeAiUsageLedger(ledger)}</h2>
      <div style={rows}>
        {ledger.items.map((item) => (
          <article key={item.requestId} style={row}>
            <strong>{item.taskKind}</strong>
            <span style={body}>{item.providerId} / {item.modelId} / {item.tierId}</span>
            <span style={body}>{item.estimatedInputTokens + item.estimatedOutputTokens} approximate tokens / {item.status}</span>
            <span style={note}>{item.savingsNote}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { display: "grid", gap: 12 };
const rows: CSSProperties = { display: "grid", gap: 8 };
const row: CSSProperties = { display: "grid", gap: 4, border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.48)", borderRadius: 8, padding: 10, minWidth: 0 };
const body: CSSProperties = { color: "rgba(226,232,240,0.68)", fontSize: 12, overflowWrap: "anywhere" };
const note: CSSProperties = { color: "#ccfbf1", fontSize: 12, overflowWrap: "anywhere" };
const eyebrow: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 20, margin: 0, letterSpacing: 0, overflowWrap: "anywhere" };
