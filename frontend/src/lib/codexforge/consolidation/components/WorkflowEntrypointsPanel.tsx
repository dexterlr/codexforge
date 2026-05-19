"use client";

import type { WorkflowEntrypoints } from "../consolidation-types";
import { grid, item, muted, panel, pill, small, title, toneColor } from "./ConsolidationStyles";

export function WorkflowEntrypointsPanel({ workflows }: { workflows: WorkflowEntrypoints }) {
  return (
    <section style={panel} data-codexforge-workflow-entrypoints-panel="WorkflowEntrypointsPanel renders workflow entrypoints include File Reader v1 Patch Preview v1 Validation Runner v1 Phase 56 Real Local Project Reader">
      <h2 style={title}>Workflow Entrypoints</h2>
      <p style={muted}>{workflows.summary.join(" ")}</p>
      <div style={grid}>
        {workflows.items.map((workflow) => (
          <a key={workflow.id} href={workflow.route} style={{ ...item, color: "inherit", textDecoration: "none" }}>
            <span style={pill}>{workflow.nextImplementationPhase}</span>
            <strong>{workflow.label}</strong>
            <span style={small}>{workflow.route}</span>
            <span style={{ ...small, color: toneColor(workflow.readiness) }}>readiness: {workflow.readiness}</span>
            <span style={small}>missing: {workflow.missingPieces.join(", ")}</span>
            <span style={small}>boundary: {workflow.safetyBoundary}</span>
            <span style={small}>validation: {workflow.recommendedValidation}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
