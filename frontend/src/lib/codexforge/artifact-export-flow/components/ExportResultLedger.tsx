"use client";

import type { CSSProperties } from "react";
import {
  buildArtifactExportFlowReactKey,
  summarizeExportResultLedger,
  type ExportResultLedger as Ledger,
} from "@/lib/codexforge/artifact-export-flow";

export function ExportResultLedger({ ledger }: { ledger: Ledger }) {
  return (
    <section style={panel} data-codexforge-export-result-ledger="ExportResultLedger renders">
      <div style={header}>
        <span style={eyebrow}>Result ledger</span>
        <strong style={badge}>{ledger.items.length} result(s)</strong>
      </div>
      <ul style={summaryList}>
        {summarizeExportResultLedger(ledger).map((line, index) => (
          <li key={buildArtifactExportFlowReactKey("ledger-summary", line, index)}>{line}</li>
        ))}
      </ul>
      <div style={items}>
        {ledger.items.length === 0 ? <p style={empty}>No guarded export results yet.</p> : null}
        {ledger.items.map((item) => (
          <article key={buildArtifactExportFlowReactKey("ledger-item", item.id)} style={resultCard}>
            <div style={row}>
              <strong>{item.artifactId}</strong>
              <span style={statusBadge}>{item.status}</span>
            </div>
            <code style={pathText}>{item.exportedPath || item.targetPath}</code>
            <span style={note}>{item.error || item.safetyNote}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(34,197,94,0.20)", background: "rgba(20,83,45,0.22)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" };
const eyebrow: CSSProperties = { color: "#86efac", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const badge: CSSProperties = { border: "1px solid rgba(34,197,94,0.28)", color: "#bbf7d0", borderRadius: 7, padding: "5px 8px", fontSize: 11, textTransform: "uppercase" };
const summaryList: CSSProperties = { margin: 0, padding: 0, listStyle: "none", color: "#dcfce7", fontSize: 12, lineHeight: 1.45, display: "grid", gap: 5 };
const items: CSSProperties = { display: "grid", gap: 8 };
const empty: CSSProperties = { margin: 0, color: "#bbf7d0", fontSize: 12 };
const resultCard: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.42)", borderRadius: 8, padding: 10, display: "grid", gap: 6, minWidth: 0 };
const row: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap", color: "#f8fafc", fontSize: 13 };
const statusBadge: CSSProperties = { border: "1px solid rgba(148,163,184,0.22)", borderRadius: 7, padding: "4px 7px", color: "#e2e8f0", fontSize: 11, textTransform: "uppercase" };
const pathText: CSSProperties = { color: "#bbf7d0", fontSize: 12, whiteSpace: "normal", overflowWrap: "anywhere" };
const note: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.4 };
