"use client";

import type { TrialPassFailChecklist } from "../coding-flow-trial-review-types";
import { copy, grid, itemBox, itemTitle, meta, panel, title } from "./TrialReviewPanelStyles";

export function TrialPassFailChecklistPanel({ checklist }: { checklist: TrialPassFailChecklist }) {
  return (
    <section style={panel} data-codexforge-trial-pass-fail-checklist-panel="TrialPassFailChecklistPanel renders no auto-apply occurred no auto-run occurred next action was obvious">
      <h2 style={title}>{checklist.title}</h2>
      <div style={grid}>
        {checklist.items.map((item) => (
          <article key={`trial-checklist-${item.itemId}`} style={itemBox}>
            <h3 style={itemTitle}>{item.label}</h3>
            <p style={copy}>{item.evidencePrompt}</p>
            <span style={meta}>{item.route} | {item.status}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
