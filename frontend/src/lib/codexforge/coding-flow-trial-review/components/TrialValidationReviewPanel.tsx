"use client";

import type { TrialValidationReview } from "../coding-flow-trial-review-types";
import { copy, grid, itemBox, itemTitle, meta, panel, title } from "./TrialReviewPanelStyles";

export function TrialValidationReviewPanel({ review }: { review: TrialValidationReview }) {
  return (
    <section style={panel} data-codexforge-trial-validation-review-panel="TrialValidationReviewPanel renders command list was clear no auto-run occurred manual run instructions clear">
      <h2 style={title}>{review.title}</h2>
      <div style={grid}>
        {review.items.map((item) => (
          <article key={`trial-validation-${item.itemId}`} style={itemBox}>
            <h3 style={itemTitle}>{item.label}</h3>
            <p style={copy}>{item.note}</p>
            <span style={meta}>{item.status}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
