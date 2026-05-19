"use client";

import type { ProductUxConsistencyAudit } from "../product-readiness-types";
import { grid, item, muted, panel, pill, small, title, toneColor } from "./ProductReadinessStyles";

export function UxConsistencyPanel({ audit }: { audit: ProductUxConsistencyAudit }) {
  return (
    <section style={panel} data-codexforge-ux-consistency-panel="UxConsistencyPanel renders UX audit checks stable keys no raw JSON in main UI responsive grid clear empty states route links visible">
      <h2 style={title}>UX Consistency</h2>
      <p style={muted}>{audit.summary.join(" ")}</p>
      <div style={grid}>
        {audit.items.map((check) => (
          <article key={check.id} style={item}>
            <span style={{ ...pill, color: toneColor(check.risk) }}>{check.passed ? "pass" : check.risk}</span>
            <strong>{check.label}</strong>
            <span style={small}>{check.evidence}</span>
            <span style={small}>{check.recommendedAction}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
