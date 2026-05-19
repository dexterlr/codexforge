"use client";

import type { ProductReadinessNextActionPlan } from "../product-readiness-types";
import { button, grid, item, muted, panel, pill, small, title } from "./ProductReadinessStyles";

export function ReadinessNextActionsPanel({ plan, onCopyPrompt }: { plan: ProductReadinessNextActionPlan; onCopyPrompt?: (text: string) => void }) {
  return (
    <section style={panel} data-codexforge-readiness-next-actions-panel="ReadinessNextActionsPanel renders next action can recommend consolidate dashboards make Files real read-only workflow Phase 55 Consolidation Pass copy-only no apply buttons">
      <h2 style={title}>Next Actions</h2>
      <p style={muted}>{plan.summary.join(" ")}</p>
      <article style={item}>
        <span style={pill}>selected</span>
        <strong>{plan.selected.label}</strong>
        <span style={small}>{plan.selected.reason}</span>
        <button type="button" style={button} onClick={() => onCopyPrompt?.(plan.selected.copyPrompt)}>Copy selected prompt</button>
      </article>
      <div style={grid}>
        {plan.candidates.map((action) => (
          <article key={action.id} style={item}>
            <strong>{action.label}</strong>
            <span style={small}>{action.reason}</span>
            <span style={small}>{action.route ?? "/readiness"}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
