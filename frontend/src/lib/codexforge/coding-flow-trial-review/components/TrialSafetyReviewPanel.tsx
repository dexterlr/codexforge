"use client";

import type { TrialSafetyReview } from "../coding-flow-trial-review-types";
import { copy, grid, itemBox, itemTitle, meta, panel, title } from "./TrialReviewPanelStyles";

export function TrialSafetyReviewPanel({ review }: { review: TrialSafetyReview }) {
  return (
    <section style={panel} data-codexforge-trial-safety-review-panel="TrialSafetyReviewPanel renders no direct write-file UI no direct run-command UI latest-message authority preserved">
      <h2 style={title}>{review.title}</h2>
      <div style={grid}>
        {review.checks.map((check) => (
          <article key={`trial-safety-${check.checkId}`} style={itemBox}>
            <h3 style={itemTitle}>{check.label}</h3>
            <p style={copy}>{check.note}</p>
            <span style={meta}>{check.status}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
