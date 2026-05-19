"use client";

import type { ProductModuleConsolidationAudit } from "../product-readiness-types";
import { grid, item, muted, panel, pill, small, title, toneColor } from "./ProductReadinessStyles";

export function ModuleConsolidationPanel({ audit }: { audit: ProductModuleConsolidationAudit }) {
  return (
    <section style={panel} data-codexforge-module-consolidation-panel="ModuleConsolidationPanel renders module consolidation audit includes dashboard sprawl duplicate safety panels duplicate next-action panels duplicate route registry logic">
      <h2 style={title}>Module Consolidation</h2>
      <p style={muted}>{audit.summary.join(" ")}</p>
      <div style={grid}>
        {audit.items.map((candidate) => (
          <article key={candidate.id} style={item}>
            <span style={{ ...pill, color: toneColor(candidate.risk) }}>{candidate.consolidationGroup}</span>
            <strong>{candidate.label}</strong>
            <span style={small}>{candidate.evidence}</span>
            <span style={small}>{candidate.recommendedAction}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
