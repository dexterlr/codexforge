"use client";

import { copy, panel, title } from "./TrialReviewPanelStyles";

export function TrialReviewEmptyState() {
  return (
    <section style={panel} data-codexforge-trial-review-empty-state="TrialReviewEmptyState renders no giant raw JSON above fold advanced details are collapsed or visually secondary">
      <h2 style={title}>Start with notes</h2>
      <p style={copy}>Run the coding trial manually, then use this review to capture screens visited, validation reviewed, friction, and the go/no-go decision.</p>
    </section>
  );
}
