"use client";

import type { ConsolidationPlan } from "../consolidation-types";
import { button, grid, item, muted, panel, pill, small, title } from "./ConsolidationStyles";

export function ConsolidationPlanPanel({ plan, onCopyPlan, onCopyPhase56 }: { plan: ConsolidationPlan; onCopyPlan: () => void; onCopyPhase56: () => void }) {
  return (
    <section style={panel} data-codexforge-consolidation-plan-panel="ConsolidationPlanPanel renders consolidation plan says prepare /files for real read-only workflow next copy consolidation plan allowed copy Phase 56 handoff allowed">
      <h2 style={title}>Consolidation Plan</h2>
      <p style={muted}>{plan.summary.join(" ")}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 }}>
        <button type="button" style={button} onClick={onCopyPlan}>Copy consolidation plan</button>
        <button type="button" style={button} onClick={onCopyPhase56}>Copy Phase 56 file reader prompt</button>
      </div>
      <div style={grid}>
        {plan.items.map((planItem) => (
          <a key={planItem.id} href={planItem.routeHref} style={{ ...item, color: "inherit", textDecoration: "none" }}>
            <span style={pill}>{planItem.status}</span>
            <strong>{planItem.title}</strong>
            <span style={small}>{planItem.detail}</span>
            <span style={small}>route: {planItem.routeHref} | priority {planItem.priority}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
