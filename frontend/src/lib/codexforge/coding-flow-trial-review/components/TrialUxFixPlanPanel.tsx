"use client";

import type { TrialUxFixPlan } from "../coding-flow-trial-review-types";
import { copy, eyebrow, grid, itemBox, itemTitle, meta, panel, title } from "./TrialReviewPanelStyles";

export function TrialUxFixPlanPanel({ plan }: { plan: TrialUxFixPlan }) {
  return (
    <section style={panel} data-codexforge-trial-ux-fix-plan-panel="TrialUxFixPlanPanel renders primary-action category small user-facing fixes">
      <h2 style={title}>{plan.title}</h2>
      <div style={grid}>
        {plan.items.map((item) => (
          <article key={`trial-ux-fix-${item.fixId}`} style={itemBox}>
            <span style={eyebrow}>{item.category}</span>
            <h3 style={itemTitle}>{item.title}</h3>
            <p style={copy}>{item.proposedFix}</p>
            <span style={meta}>{item.route} | {item.priority} | {item.effort}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
