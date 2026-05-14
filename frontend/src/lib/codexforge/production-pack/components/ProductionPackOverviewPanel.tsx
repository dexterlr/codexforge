"use client";

import type { CSSProperties } from "react";
import type { ProductionPack } from "../production-pack-types";

export function ProductionPackOverviewPanel({ pack }: { pack: ProductionPack }) {
  return (
    <section style={panel} data-codexforge-production-pack-overview-panel="ProductionPackOverviewPanel renders">
      <div style={header}>
        <span style={eyebrow}>Phase 12 builder</span>
        <strong style={badge}>{pack.mode}</strong>
      </div>
      <h2 style={title}>{pack.title}</h2>
      <div style={grid}>
        <Metric label="Items" value={String(pack.items.length)} />
        <Metric label="Source" value={pack.sourceSurface} />
        <Metric label="Run" value={pack.sourceRunId} />
        <Metric label="Validation" value={pack.validation.state} />
      </div>
      <p style={body}>{pack.nextAction}</p>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div style={metric}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(96,165,250,0.24)", background: "rgba(15,23,42,0.76)", borderRadius: 8, padding: 16, display: "grid", gap: 14, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", alignItems: "center" };
const eyebrow: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const badge: CSSProperties = { border: "1px solid rgba(96,165,250,0.30)", color: "#dbeafe", borderRadius: 7, padding: "5px 8px", fontSize: 11, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 24, lineHeight: 1.15, letterSpacing: 0 };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))", gap: 8 };
const metric: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(2,6,23,0.42)", borderRadius: 8, padding: 10, display: "grid", gap: 6, color: "#cbd5e1", fontSize: 12, overflowWrap: "anywhere" };
const body: CSSProperties = { margin: 0, color: "#dbeafe", fontSize: 13, lineHeight: 1.5 };
