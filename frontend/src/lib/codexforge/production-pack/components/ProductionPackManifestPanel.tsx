"use client";

import type { CSSProperties } from "react";
import { buildProductionPackReactKey, type ProductionPack } from "../production-pack-types";

export function ProductionPackManifestPanel({
  pack,
  onCopy,
}: {
  pack: ProductionPack;
  onCopy: (text: string) => void;
}) {
  return (
    <section style={panel} data-codexforge-production-pack-manifest-panel="ProductionPackManifestPanel renders">
      <div style={header}>
        <span style={eyebrow}>Manifest</span>
        <button type="button" style={button} onClick={() => onCopy(JSON.stringify(pack.manifest, null, 2))}>
          Copy manifest
        </button>
      </div>
      <ul style={list}>
        {pack.manifest.summary.map((line, index) => (
          <li key={buildProductionPackReactKey("manifest-summary", line, index)} style={lineItem}>{line}</li>
        ))}
      </ul>
      <div style={targets}>
        {pack.manifest.suggestedExportTargetPaths.map((target, index) => (
          <code key={buildProductionPackReactKey("manifest-target", target, index)} style={targetPill}>{target}</code>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.20)", background: "rgba(4,47,46,0.28)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", alignItems: "center" };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const button: CSSProperties = { border: "1px solid rgba(45,212,191,0.34)", background: "rgba(20,184,166,0.14)", color: "#ccfbf1", borderRadius: 8, padding: "8px 10px", fontSize: 12, fontWeight: 900, cursor: "pointer" };
const list: CSSProperties = { margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 8 };
const lineItem: CSSProperties = { color: "#ccfbf1", fontSize: 13, lineHeight: 1.45, overflowWrap: "anywhere" };
const targets: CSSProperties = { display: "grid", gap: 6, maxHeight: 180, overflow: "auto" };
const targetPill: CSSProperties = { border: "1px solid rgba(45,212,191,0.16)", background: "rgba(2,6,23,0.48)", borderRadius: 7, padding: 8, color: "#e0f2fe", fontSize: 12, overflowWrap: "anywhere", whiteSpace: "pre-wrap" };
