"use client";

import type { TrialGoNoGoDecision } from "../coding-flow-trial-review-types";
import { copy, grid, itemBox, itemTitle, meta, panel, title } from "./TrialReviewPanelStyles";

export function TrialGoNoGoDecisionPanel({ decision }: { decision: TrialGoNoGoDecision }) {
  return (
    <section style={panel} data-codexforge-trial-go-no-go-decision-panel="TrialGoNoGoDecisionPanel renders go go-with-fixes no-go blocked unknown">
      <h2 style={title}>Go/no-go decision</h2>
      <article style={itemBox}>
        <h3 style={itemTitle}>{decision.output}</h3>
        <p style={copy}>{decision.recommendation}</p>
      </article>
      <div style={grid}>
        {decision.reasons.map((reason) => (
          <article key={`trial-go-no-go-${reason.reasonId}`} style={itemBox}>
            <h3 style={itemTitle}>{reason.label}</h3>
            <p style={copy}>{reason.note}</p>
            <span style={meta}>{reason.passed ? "pass" : "needs review"}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
