import type { CSSProperties } from "react";
import {
  buildArtifactIngestionStableKey,
  type ArtifactIngestionLedger,
} from "@/lib/codexforge/artifact-ingestion";

export function ArtifactIngestionLedgerPanel({ ledger }: { ledger: ArtifactIngestionLedger }) {
  return (
    <section style={panel} data-codexforge-artifact-ingestion-ledger="ingestion ledger read-only">
      <div style={header}>
        <span style={eyebrow}>Ingestion ledger</span>
        <span style={count}>{ledger.items.length}</span>
      </div>
      {ledger.summary.map((line) => (
        <p key={buildArtifactIngestionStableKey("ledger-summary", line)} style={summary}>{line}</p>
      ))}
      <div style={items}>
        {ledger.items.map((item) => (
          <article key={item.id} style={row}>
            <div style={copy}>
              <strong style={itemTitle}>{item.title}</strong>
              <p style={meta}>{item.targetWorkspacePath || "pending workspace path"}</p>
            </div>
            <span style={state}>{item.state}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.22)", background: "rgba(2,6,23,0.72)", borderRadius: 8, padding: 14, display: "grid", gap: 10, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" };
const eyebrow: CSSProperties = { color: "#86efac", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const count: CSSProperties = { color: "#dcfce7", fontSize: 12, fontWeight: 900 };
const summary: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.45 };
const items: CSSProperties = { display: "grid", gap: 8 };
const row: CSSProperties = { display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: 8, alignItems: "center", border: "1px solid rgba(148,163,184,0.18)", borderRadius: 8, padding: 10, background: "rgba(15,23,42,0.68)" };
const copy: CSSProperties = { display: "grid", gap: 3, minWidth: 0 };
const itemTitle: CSSProperties = { color: "#f8fafc", fontSize: 12, overflowWrap: "anywhere" };
const meta: CSSProperties = { margin: 0, color: "#94a3b8", fontSize: 11, overflowWrap: "anywhere" };
const state: CSSProperties = { color: "#bbf7d0", fontSize: 11, fontWeight: 800 };
