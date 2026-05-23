"use client";

import type { RunHistoryReview } from "../run-history-types";
import { summarizeRunHistoryReviewStatus } from "../run-history-review-status";
import { rhCopy, rhList, rhMeta, rhPanel, rhPill, rhTitle } from "./RunHistoryStyles";

export function RunHistoryReviewStatusPanel({ review }: { review: RunHistoryReview }) {
  return (
    <section style={rhPanel} data-codexforge-run-history-review-status-panel="RunHistoryReviewStatusPanel renders checks workflow result reviewed validation output reviewed secrets checked next action selected handoff reviewed memory candidate reviewed review required">
      <h2 style={rhTitle}>Review status</h2>
      {summarizeRunHistoryReviewStatus(review).map((line) => <p key={`run-history-review-summary-${line.slice(0, 30)}`} style={rhCopy}>{line}</p>)}
      <div style={rhList}>
        {review.checks.map((check) => (
          <article key={check.checkId} style={{ display: "grid", gap: 4 }}>
            <span style={rhPill}>{check.status}</span>
            <p style={rhMeta}>{check.label}</p>
            <p style={rhCopy}>{check.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
