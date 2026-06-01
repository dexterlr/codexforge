"use client";

import type { CSSProperties } from "react";
import type { ProviderAdapterSummary } from "../provider-adapter-types";

export function ProviderAdapterSummaryPanel({ summary }: { summary: ProviderAdapterSummary }) {
  return (
    <section style={grid} data-codexforge-provider-adapter-summary-panel="ProviderAdapterSummaryPanel plain-English copy exists safety copy exists">
      <div style={metric}><span>Adapters</span><strong>{summary.totalAdapters}</strong></div>
      <div style={metric}><span>Definition ready</span><strong>{summary.definitionReadyCount}</strong></div>
      <div style={metric}><span>Local/private</span><strong>{summary.localPrivateCount}</strong></div>
      <div style={metric}><span>Manual only</span><strong>{summary.manualOnlyCount}</strong></div>
    </section>
  );
}

const grid: CSSProperties = { display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))" };
const metric: CSSProperties = { background: "rgba(15,23,42,0.62)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, color: "#dbeafe", display: "grid", gap: 4, padding: 12 };
