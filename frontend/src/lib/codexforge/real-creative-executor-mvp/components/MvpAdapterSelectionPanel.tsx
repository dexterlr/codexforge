"use client";

import type { MvpAdapterSelection } from "../real-creative-mvp-types";
import { buildRealCreativeMvpReactKey } from "../real-creative-mvp-types";
import { MvpList, MvpMetric, MvpPanel, body, row, rowHeader, rowTitle, statusPill } from "./shared";

export function MvpAdapterSelectionPanel({ selection }: { selection: MvpAdapterSelection }) {
  return (
    <MvpPanel title="Adapter Selection" marker="MvpAdapterSelectionPanel renders adapter selection rejects mixed-pipeline as first MVP">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))", gap: 8 }}>
        <MvpMetric label="Recommended" value={selection.recommendedCandidateId} />
        <MvpMetric label="Criteria" value={String(selection.criteria.length)} />
        <MvpMetric label="Rejected" value={String(selection.rejectedFirstMvpCandidateIds.length)} />
      </div>
      <MvpList title="Selection summary" items={selection.summary} />
      <div style={{ display: "grid", gap: 8 }}>
        {selection.scores.map((score, index) => (
          <article key={buildRealCreativeMvpReactKey(score.candidateId, index)} style={row}>
            <div style={rowHeader}>
              <strong style={rowTitle}>{score.label}</strong>
              <span style={statusPill}>{score.score}</span>
            </div>
            <p style={body}>{score.rejectedAsFirstMvp ? "Rejected as first MVP." : "Eligible for MVP review."}</p>
            <MvpList title="Reasons" items={score.reasons} />
          </article>
        ))}
      </div>
    </MvpPanel>
  );
}
