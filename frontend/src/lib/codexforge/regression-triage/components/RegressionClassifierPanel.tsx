"use client";

import type { CSSProperties } from "react";
import type { RegressionClassification } from "../regression-triage-types";

export function RegressionClassifierPanel({
  classifications,
}: {
  classifications: readonly RegressionClassification[];
}) {
  return (
    <section data-codexforge-regression-classifier-panel="RegressionClassifierPanel renders" style={card}>
      <h3 style={title}>Classifier</h3>
      {classifications.map((classification) => (
        <div key={classification.id} style={row}>
          <strong>{classification.regressionClass}</strong>
          <span>{classification.suspectedArea}</span>
          <small>
            {classification.severity} - {classification.likelyOwnerSurface} - rollback {classification.rollbackUrgency}
          </small>
        </div>
      ))}
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(15,23,42,0.72)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const title: CSSProperties = { margin: 0, fontSize: 14, letterSpacing: 0 };
const row: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, padding: 9, display: "grid", gap: 4, fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
