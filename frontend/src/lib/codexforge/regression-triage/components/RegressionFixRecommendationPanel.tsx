"use client";

import type { CSSProperties } from "react";
import type { RegressionFixRecommendation } from "../regression-triage-types";

export function RegressionFixRecommendationPanel({
  recommendation,
}: {
  recommendation: RegressionFixRecommendation;
}) {
  return (
    <section data-codexforge-regression-fix-recommendation-panel="RegressionFixRecommendationPanel renders Safe Patch Preview required" style={card}>
      <h3 style={title}>Fix recommendations</h3>
      {recommendation.candidates.map((candidate) => (
        <div key={candidate.candidateId} style={row}>
          <strong>{candidate.title}</strong>
          <span>{candidate.recommendedAction}</span>
          <small>{candidate.kind} - {candidate.reviewState} - Safe Patch Preview required</small>
          <small>{candidate.targetFiles.join(", ") || "Inspect before selecting target files"}</small>
        </div>
      ))}
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(45,212,191,0.18)", background: "rgba(20,184,166,0.08)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const title: CSSProperties = { margin: 0, fontSize: 14, letterSpacing: 0 };
const row: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, padding: 9, display: "grid", gap: 4, fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
