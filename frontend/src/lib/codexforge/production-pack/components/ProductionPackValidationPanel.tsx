"use client";

import type { CSSProperties } from "react";
import { buildProductionPackReactKey, type ProductionPack } from "../production-pack-types";

export function ProductionPackValidationPanel({ pack }: { pack: ProductionPack }) {
  const lines = pack.validation.issues.length > 0 ? pack.validation.summary : pack.manifest.validationChecklist;
  return (
    <section style={panel} data-codexforge-production-pack-validation-panel="ProductionPackValidationPanel renders">
      <div style={header}>
        <span style={eyebrow}>Validation</span>
        <strong style={badge}>{pack.validation.state}</strong>
      </div>
      <ul style={list}>
        {lines.map((line, index) => (
          <li key={buildProductionPackReactKey("validation", line, index)} style={item}>{line}</li>
        ))}
      </ul>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(248,113,113,0.22)", background: "rgba(69,10,10,0.20)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", alignItems: "center" };
const eyebrow: CSSProperties = { color: "#fca5a5", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const badge: CSSProperties = { border: "1px solid rgba(248,113,113,0.30)", color: "#fee2e2", borderRadius: 7, padding: "5px 8px", fontSize: 11, textTransform: "uppercase" };
const list: CSSProperties = { margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 8 };
const item: CSSProperties = { color: "#fee2e2", border: "1px solid rgba(248,113,113,0.14)", background: "rgba(2,6,23,0.42)", borderRadius: 8, padding: 9, fontSize: 13, lineHeight: 1.45, overflowWrap: "anywhere" };
