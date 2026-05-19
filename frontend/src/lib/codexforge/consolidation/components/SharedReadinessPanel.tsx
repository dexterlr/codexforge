"use client";

import type { SharedReadinessModel } from "../consolidation-types";
import { grid, item, muted, panel, pill, small, title, toneColor } from "./ConsolidationStyles";

export function SharedReadinessPanel({ model }: { model: SharedReadinessModel }) {
  return (
    <section style={panel} data-codexforge-shared-readiness-panel="SharedReadinessPanel renders shared readiness model read-only validation commands copy-only no raw JSON">
      <h2 style={title}>Shared Readiness</h2>
      <p style={muted}>{model.summary.join(" ")}</p>
      <div style={grid}>
        {model.items.map((readiness) => (
          <a key={readiness.id} href={readiness.routeHref} style={{ ...item, color: "inherit", textDecoration: "none" }}>
            <span style={pill}>{readiness.sourceRoute}</span>
            <strong>{readiness.label}</strong>
            <span style={{ ...small, color: toneColor(readiness.readinessLevel) }}>readiness: {readiness.readinessLevel}</span>
            <span style={small}>blockers: {readiness.blockerCount} | warnings: {readiness.warningCount}</span>
            <span style={small}>review required: {readiness.reviewRequired ? "yes" : "no"}</span>
            <span style={small}>{readiness.nextAction}</span>
            <span style={small}>validation: {readiness.validationCommand}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
