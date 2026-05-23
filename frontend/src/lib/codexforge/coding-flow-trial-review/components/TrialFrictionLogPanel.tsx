"use client";

import type { TrialFrictionLog } from "../coding-flow-trial-review-types";
import { copy, eyebrow, grid, itemBox, itemTitle, meta, panel, title } from "./TrialReviewPanelStyles";

export function TrialFrictionLogPanel({ log }: { log: TrialFrictionLog }) {
  return (
    <section style={panel} data-codexforge-trial-friction-log-panel="TrialFrictionLogPanel renders unclear primary action wording too technical route handoff confusing">
      <h2 style={title}>{log.title}</h2>
      <div style={grid}>
        {log.items.map((item) => (
          <article key={`trial-friction-${item.frictionId}`} style={itemBox}>
            <span style={eyebrow}>{item.type}</span>
            <h3 style={itemTitle}>{item.userFacingSymptom}</h3>
            <p style={copy}>{item.suggestedProductFix}</p>
            <span style={meta}>{item.route} | {item.priority}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
