"use client";

import type { ProductSafetyPostureAudit } from "../product-readiness-types";
import { grid, item, muted, panel, pill, small, title, toneColor } from "./ProductReadinessStyles";

export function SafetyPostureAuditPanel({ audit }: { audit: ProductSafetyPostureAudit }) {
  return (
    <section style={panel} data-codexforge-safety-posture-audit-panel="SafetyPostureAuditPanel renders safety audit checks no auto-fix no appendEvent from UI snapshot restore blocked by default no graph mutation">
      <h2 style={title}>Safety Posture</h2>
      <p style={muted}>{audit.summary.join(" ")}</p>
      <div style={grid}>
        {audit.items.map((check) => (
          <article key={check.id} style={item}>
            <span style={{ ...pill, color: toneColor(check.severity) }}>{check.passed ? "pass" : check.severity}</span>
            <strong>{check.label}</strong>
            <span style={small}>{check.evidence}</span>
            <span style={small}>{check.recommendedAction}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
