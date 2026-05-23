"use client";

import type { TrialObservation } from "../coding-flow-trial-review-types";
import { copy, eyebrow, grid, itemBox, itemTitle, meta, panel, title } from "./TrialReviewPanelStyles";

export function TrialObservationPanel({ observation }: { observation: TrialObservation }) {
  return (
    <section style={panel} data-codexforge-trial-observation-panel="TrialObservationPanel renders what worked what was confusing what should be simplified">
      <h2 style={title}>{observation.title}</h2>
      <div style={grid}>
        {observation.items.map((item) => (
          <article key={`trial-observation-${item.observationId}`} style={itemBox}>
            <span style={eyebrow}>{item.category}</span>
            <h3 style={itemTitle}>{item.label}</h3>
            <p style={copy}>{item.note}</p>
            <span style={meta}>{item.route} | {item.severity}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
