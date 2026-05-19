"use client";

import type { ProductReadinessScorecard } from "../product-readiness-types";
import { grid, item, muted, panel, pill, small, title, toneColor } from "./ProductReadinessStyles";

export function ReadinessScorecardPanel({ scorecard }: { scorecard: ProductReadinessScorecard }) {
  return (
    <section style={panel} data-codexforge-readiness-scorecard-panel="ReadinessScorecardPanel renders scorecard includes workflow functionality route readiness smoke coverage safety posture UX consistency">
      <h2 style={title}>Readiness Scorecard</h2>
      <p style={muted}>{scorecard.summary.join(" ")}</p>
      <div style={grid}>
        {scorecard.scores.map((score) => (
          <article key={score.id} style={item}>
            <span style={{ ...pill, color: toneColor(score.score) }}>{score.score}</span>
            <strong>{score.category}</strong>
            <span style={small}>{score.detail}</span>
            <span style={small}>{score.recommendedAction}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
