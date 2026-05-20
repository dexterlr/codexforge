"use client";

import type { MvpExecutionPath } from "../real-creative-mvp-types";
import { buildRealCreativeMvpReactKey } from "../real-creative-mvp-types";
import { MvpList, MvpMetric, MvpPanel, body, row, rowHeader, rowTitle, statusPill } from "./shared";

export function MvpExecutionPathPanel({ path }: { path: MvpExecutionPath }) {
  return (
    <MvpPanel title="Execution Path Design" marker="MvpExecutionPathPanel renders execution path design-only future guarded execution boundary no render execution">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 170px), 1fr))", gap: 8 }}>
        <MvpMetric label="Start" value={path.startRoute} />
        <MvpMetric label="Candidate" value={path.selectedCandidateId} />
        <MvpMetric label="Review" value={path.reviewBoard} />
      </div>
      <MvpList title="Execution summary" items={path.summary} />
      <div style={{ display: "grid", gap: 8 }}>
        {path.steps.map((step, index) => (
          <article key={buildRealCreativeMvpReactKey(step.stepId, index)} style={row}>
            <div style={rowHeader}>
              <strong style={rowTitle}>{step.label}</strong>
              <span style={statusPill}>{step.phase72Status}</span>
            </div>
            <p style={body}>{step.primaryAction}</p>
            <p style={body}>{step.requirement}</p>
            <p style={body}>{step.boundary}</p>
          </article>
        ))}
      </div>
    </MvpPanel>
  );
}
