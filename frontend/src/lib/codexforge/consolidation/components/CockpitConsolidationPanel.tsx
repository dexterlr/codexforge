"use client";

import type { CockpitConsolidationAudit } from "../consolidation-types";
import { grid, item, muted, panel, pill, small, title, toneColor } from "./ConsolidationStyles";

export function CockpitConsolidationPanel({ audit }: { audit: CockpitConsolidationAudit }) {
  return (
    <section style={panel} data-codexforge-cockpit-consolidation-panel="CockpitConsolidationPanel renders cockpit audit includes next action panel includes safety notice narrow consolidation no full rewrite">
      <h2 style={title}>Cockpit Consolidation</h2>
      <p style={muted}>{audit.summary.join(" ")}</p>
      <div style={grid}>
        {audit.items.map((pattern) => (
          <article key={pattern.id} style={item}>
            <span style={pill}>{pattern.sharedModel}</span>
            <strong>{pattern.pattern}</strong>
            <span style={{ ...small, color: toneColor(pattern.overlapRisk) }}>overlap: {pattern.overlapRisk}</span>
            <span style={small}>surfaces: {pattern.surfaces.join(", ")}</span>
            <span style={small}>{pattern.recommendation}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
