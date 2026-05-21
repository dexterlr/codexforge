"use client";

import type { WorkflowResultReview } from "../workflow-result-types";
import { summarizeWorkflowResultReview } from "../workflow-result-review";
import { wrCopy, wrList, wrMeta, wrPanel, wrTitle } from "./WorkflowResultStyles";

export function WorkflowResultReviewPanel({ review }: { review: WorkflowResultReview }) {
  return (
    <section style={wrPanel} data-codexforge-workflow-result-review-panel="WorkflowResultReviewPanel renders review required review checks secrets checked output capped memory candidate reviewed next action selected">
      <h2 style={wrTitle}>Review</h2>
      {summarizeWorkflowResultReview(review).map((line) => <p key={`workflow-result-review-${line.slice(0, 34)}`} style={wrCopy}>{line}</p>)}
      <div style={wrList}>
        {review.checks.map((check) => <p key={`workflow-result-review-check-${check.checkId}`} style={wrMeta}>{check.label}: {check.status}</p>)}
      </div>
    </section>
  );
}
