"use client";

import type { ProductFunctionalWorkflowAudit } from "../product-readiness-types";
import { grid, item, muted, panel, pill, small, title, toneColor } from "./ProductReadinessStyles";

export function FunctionalWorkflowPanel({ audit }: { audit: ProductFunctionalWorkflowAudit }) {
  return (
    <section style={panel} data-codexforge-functional-workflow-panel="FunctionalWorkflowPanel renders functional workflow audit includes project file read patch-preview-to-apply-gate validation-to-regression-triage memory-inbox-to-promotion-gate">
      <h2 style={title}>Functional Workflow</h2>
      <p style={muted}>{audit.summary.join(" ")}</p>
      <div style={grid}>
        {audit.items.map((workflow) => (
          <article key={workflow.id} style={item}>
            <span style={{ ...pill, color: toneColor(workflow.status) }}>{workflow.status}</span>
            <strong>{workflow.label}</strong>
            <span style={small}>entry: {workflow.routeEntryPoints.join(", ")}</span>
            <span style={small}>missing pieces: {workflow.missingPieces.join("; ") || "none"}</span>
            <span style={small}>safety blockers: {workflow.safetyBlockers.join("; ") || "none"}</span>
            <span style={small}>next phase: {workflow.nextFunctionalPhase}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
