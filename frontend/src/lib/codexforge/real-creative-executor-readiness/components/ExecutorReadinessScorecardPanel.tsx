"use client";

import type { ExecutorReadinessScorecard } from "../real-creative-readiness-types";
import { buildRealCreativeReadinessReactKey } from "../real-creative-readiness-types";
import { ReadinessList, ReadinessMetric, ReadinessPanel, body, row, rowHeader, rowTitle, statusPill } from "./shared";

export function ExecutorReadinessScorecardPanel({ scorecard }: { scorecard: ExecutorReadinessScorecard }) {
  return (
    <ReadinessPanel title="Executor Scorecard" marker="ExecutorReadinessScorecardPanel renders executionAllowed false in Phase 70 supports mvp-candidate future execution readiness">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))", gap: 8 }}>
        <ReadinessMetric label="Overall" value={scorecard.overallScore} />
        <ReadinessMetric label="Execution" value={String(scorecard.executionAllowed)} />
        <ReadinessMetric label="MVP candidate" value={String(scorecard.futureMvpCandidate)} />
        <ReadinessMetric label="Blocked reasons" value={String(scorecard.blockedReasons.length)} />
      </div>
      <ReadinessList title="Scorecard summary" items={scorecard.summary} />
      <div style={{ display: "grid", gap: 8, minWidth: 0 }}>
        {scorecard.scores.map((score, index) => (
          <article key={buildRealCreativeReadinessReactKey(score.scoreId, index)} style={row}>
            <div style={rowHeader}>
              <strong style={rowTitle}>{score.category}</strong>
              <span style={statusPill}>{score.score}</span>
            </div>
            <p style={body}>{score.detail}</p>
            {score.blockedReasons.length > 0 ? <ReadinessList title="Blocked reasons" items={score.blockedReasons} /> : null}
          </article>
        ))}
      </div>
    </ReadinessPanel>
  );
}
