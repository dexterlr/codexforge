"use client";

import type { CSSProperties } from "react";
import { buildProductionPackReactKey, type ProductionPack } from "../production-pack-types";

export function ProductionPackLedgerPanel({ pack }: { pack: ProductionPack }) {
  return (
    <section style={panel} data-codexforge-production-pack-ledger-panel="ProductionPackLedgerPanel renders">
      <div style={header}>
        <span style={eyebrow}>Ledger</span>
        <strong style={badge}>{pack.ledger.state}</strong>
      </div>
      <div style={list}>
        {pack.ledger.items.map((item, index) => (
          <article key={buildProductionPackReactKey("ledger", item.id, index)} style={row}>
            <strong>{item.state}</strong>
            <code>{item.targetRelativePath}</code>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(129,140,248,0.22)", background: "rgba(30,27,75,0.26)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", alignItems: "center" };
const eyebrow: CSSProperties = { color: "#c4b5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const badge: CSSProperties = { border: "1px solid rgba(129,140,248,0.30)", color: "#ede9fe", borderRadius: 7, padding: "5px 8px", fontSize: 11, textTransform: "uppercase" };
const list: CSSProperties = { display: "grid", gap: 8, maxHeight: 260, overflow: "auto" };
const row: CSSProperties = { border: "1px solid rgba(129,140,248,0.14)", background: "rgba(2,6,23,0.42)", borderRadius: 8, padding: 10, display: "grid", gap: 5, color: "#ede9fe", fontSize: 12, overflowWrap: "anywhere" };
