"use client";

import type { ProductSmokeCoverageAudit } from "../product-readiness-types";
import { grid, item, muted, panel, pill, small, title, toneColor } from "./ProductReadinessStyles";

export function SmokeCoveragePanel({ audit }: { audit: ProductSmokeCoverageAudit }) {
  return (
    <section style={panel} data-codexforge-smoke-coverage-panel="SmokeCoveragePanel renders smoke audit checks managed suite inclusion duplicate suite entry risk safety assertions mojibake assertions forbidden dependency assertions">
      <h2 style={title}>Smoke Coverage</h2>
      <p style={muted}>{audit.summary.join(" ")}</p>
      <div style={grid}>
        {audit.items.map((smoke) => (
          <article key={smoke.id} style={item}>
            <span style={{ ...pill, color: toneColor(smoke.status) }}>{smoke.status}</span>
            <strong>{smoke.label}</strong>
            <span style={small}>{smoke.script}</span>
            <span style={small}>managed suite inclusion: {smoke.managedSuiteInclusion ? "yes" : "no"}</span>
            <span style={small}>duplicate suite entry risk: {smoke.duplicateSuiteEntryRisk ? "yes" : "no"}</span>
            <span style={small}>{smoke.targetedValidationCommand}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
