"use client";

import type { MvpReadinessDecision } from "../real-creative-mvp-types";
import { buildRealCreativeMvpReactKey } from "../real-creative-mvp-types";
import { MvpList, MvpMetric, MvpPanel, body, row, rowHeader, rowTitle, statusPill } from "./shared";

export function MvpReadinessDecisionPanel({ decision }: { decision: MvpReadinessDecision }) {
  return (
    <MvpPanel title="Readiness Decision" marker="MvpReadinessDecisionPanel renders readiness decision says executionAllowed false in Phase 72 future MVP candidate">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))", gap: 8 }}>
        <MvpMetric label="Selected" value={decision.selectedCandidateId} />
        <MvpMetric label="Recommended" value={String(decision.mvpRecommended)} />
        <MvpMetric label="Execution" value={String(decision.executionAllowed)} />
      </div>
      <MvpList title="Decision summary" items={decision.summary} />
      <p style={body}>{decision.recommendedNextAction}</p>
      <div style={{ display: "grid", gap: 8 }}>
        {decision.reasons.map((reason, index) => (
          <article key={buildRealCreativeMvpReactKey(reason.reasonId, index)} style={row}>
            <div style={rowHeader}>
              <strong style={rowTitle}>{reason.label}</strong>
              <span style={statusPill}>{reason.status}</span>
            </div>
            <p style={body}>{reason.detail}</p>
          </article>
        ))}
      </div>
    </MvpPanel>
  );
}
