"use client";

import type { CSSProperties } from "react";
import { buildProductionPackReactKey, type ProductionPack } from "../production-pack-types";
import { summarizeProductionPackItems } from "../production-pack-items";

export function ProductionPackItemsPanel({ pack }: { pack: ProductionPack }) {
  return (
    <section style={panel} data-codexforge-production-pack-items-panel="ProductionPackItemsPanel renders">
      <div style={header}>
        <span style={eyebrow}>Pack items</span>
        <strong style={badge}>source mutation blocked</strong>
      </div>
      <div style={summaryRow}>
        {summarizeProductionPackItems(pack.items).map((line, index) => (
          <span key={buildProductionPackReactKey("item-summary", line, index)} style={pill}>{line}</span>
        ))}
      </div>
      <div style={list}>
        {pack.items.map((item, index) => (
          <article key={buildProductionPackReactKey("item", item.id, index)} style={itemCard}>
            <div style={itemHeader}>
              <strong>{item.type}</strong>
              <span>{item.sourceSurface}</span>
            </div>
            <code style={path}>{item.targetRelativePath}</code>
            <p style={body}>{item.safetyNote}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(8,13,28,0.78)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", alignItems: "center" };
const eyebrow: CSSProperties = { color: "#c4b5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const badge: CSSProperties = { border: "1px solid rgba(196,181,253,0.28)", color: "#ede9fe", borderRadius: 7, padding: "5px 8px", fontSize: 11, textTransform: "uppercase" };
const summaryRow: CSSProperties = { display: "flex", gap: 8, flexWrap: "wrap" };
const pill: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.54)", borderRadius: 7, padding: "6px 8px", color: "#e2e8f0", fontSize: 12 };
const list: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", gap: 10 };
const itemCard: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(2,6,23,0.48)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const itemHeader: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, color: "#f8fafc", fontSize: 13, flexWrap: "wrap" };
const path: CSSProperties = { color: "#93c5fd", fontSize: 12, overflowWrap: "anywhere", whiteSpace: "pre-wrap" };
const body: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.45 };
