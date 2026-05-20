"use client";

import type { MvpArtifactReviewLoop } from "../real-creative-mvp-types";
import { buildRealCreativeMvpReactKey } from "../real-creative-mvp-types";
import { MvpList, MvpMetric, MvpPanel, body, row, rowHeader, rowTitle, statusPill } from "./shared";

export function MvpArtifactReviewLoopPanel({ loop }: { loop: MvpArtifactReviewLoop }) {
  return (
    <MvpPanel title="Artifact Review Loop" marker="MvpArtifactReviewLoopPanel renders artifact review loop includes provenance and metadata no automatic promotion">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))", gap: 8 }}>
        <MvpMetric label="Review route" value={loop.reviewRoute} />
        <MvpMetric label="No file writes" value={String(loop.noFileWrites)} />
        <MvpMetric label="Promotion" value={String(!loop.noAutomaticPromotion)} />
      </div>
      <MvpList title="Loop summary" items={loop.summary} />
      <div style={{ display: "grid", gap: 8 }}>
        {loop.steps.map((step, index) => (
          <article key={buildRealCreativeMvpReactKey(step.stepId, index)} style={row}>
            <div style={rowHeader}>
              <strong style={rowTitle}>{step.label}</strong>
              <span style={statusPill}>manual</span>
            </div>
            <p style={body}>{step.operatorAction}</p>
            <p style={body}>{step.output}</p>
          </article>
        ))}
      </div>
    </MvpPanel>
  );
}
