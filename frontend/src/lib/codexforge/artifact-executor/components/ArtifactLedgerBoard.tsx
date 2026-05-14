"use client";

import type { CSSProperties } from "react";
import { buildArtifactReactKey, type ArtifactLedger } from "@/lib/codexforge/artifact-executor";

export function ArtifactLedgerBoard({ ledger }: { ledger: ArtifactLedger }) {
  return (
    <section style={panel} data-codexforge-artifact-ledger-board="ArtifactLedgerBoard renders">
      <span style={eyebrow}>Ledger board</span>
      <div style={grid}>
        {ledger.items.map((item, index) => (
          <article key={buildArtifactReactKey("ledger", item.artifactId, index)} style={card}>
            <span style={status}>{item.status}</span>
            <strong>{item.artifactId}</strong>
            <span style={muted}>{item.sourceSurface}</span>
            <span style={path}>{item.approvalState}</span>
            <p style={body}>{item.reviewAction}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(196,181,253,0.18)", background: "rgba(12,10,28,0.74)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#c4b5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 10 };
const card: CSSProperties = { border: "1px solid rgba(255,255,255,0.1)", background: "rgba(15,23,42,0.62)", borderRadius: 8, padding: 12, display: "grid", gap: 6, minWidth: 0, overflowWrap: "anywhere" };
const status: CSSProperties = { color: "#99f6e4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const muted: CSSProperties = { color: "#94a3b8", fontSize: 11 };
const path: CSSProperties = { color: "#bfdbfe", fontSize: 11, overflowWrap: "anywhere" };
const body: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.45 };
