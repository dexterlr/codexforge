"use client";

import type { TrialScreenReview } from "../coding-flow-trial-review-types";
import { copy, grid, itemBox, itemTitle, meta, panel, title } from "./TrialReviewPanelStyles";

export function TrialScreenReviewPanel({ review }: { review: TrialScreenReview }) {
  return (
    <section style={panel} data-codexforge-trial-screen-review-panel="TrialScreenReviewPanel renders /start /code-flow /files /apply-validation /validation /workflow-results /run-history">
      <h2 style={title}>{review.title}</h2>
      <div style={grid}>
        {review.items.map((item) => (
          <article key={`trial-screen-${item.itemId}`} style={itemBox}>
            <h3 style={itemTitle}>{item.screenLabel}</h3>
            <p style={copy}>{item.frictionNotes}</p>
            <span style={meta}>{item.route} | layout {item.layoutRating} | wording {item.wordingRating}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
