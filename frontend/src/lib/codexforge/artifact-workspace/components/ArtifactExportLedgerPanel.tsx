"use client";

import type { CSSProperties } from "react";
import {
  buildArtifactWorkspaceReactKey,
  type ArtifactExportLedger,
} from "@/lib/codexforge/artifact-workspace";

export function ArtifactExportLedgerPanel({ ledger }: { ledger: ArtifactExportLedger }) {
  return (
    <section style={panel} data-codexforge-artifact-export-ledger-panel="ArtifactExportLedgerPanel renders">
      <div style={header}>
        <span style={eyebrow}>Export ledger</span>
        <strong style={badge}>{ledger.workspaceRoot}</strong>
      </div>
      <ul style={list}>
        {ledger.items.map((item, index) => (
          <li key={buildArtifactWorkspaceReactKey("ledger", item.artifactId, item.targetPath, index)} style={itemStyle}>
            <strong>{item.status}</strong>
            <span>{item.targetPath}</span>
            <small>{item.safetyNote}</small>
          </li>
        ))}
      </ul>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(52,211,153,0.22)", background: "rgba(6,32,24,0.70)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", flexWrap: "wrap" };
const eyebrow: CSSProperties = { color: "#6ee7b7", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const badge: CSSProperties = { border: "1px solid rgba(52,211,153,0.30)", color: "#d1fae5", borderRadius: 7, padding: "5px 8px", fontSize: 11, textTransform: "uppercase" };
const list: CSSProperties = { margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 8 };
const itemStyle: CSSProperties = { border: "1px solid rgba(52,211,153,0.14)", background: "rgba(15,23,42,0.48)", borderRadius: 8, padding: 10, color: "#d1fae5", fontSize: 13, lineHeight: 1.45, overflowWrap: "anywhere", display: "grid", gap: 4 };
