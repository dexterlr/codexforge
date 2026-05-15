"use client";

import type { CSSProperties } from "react";
import type { GroundedFixCandidate } from "../grounded-fix-types";

export function FixConfidencePanel({ candidate }: { candidate: GroundedFixCandidate }) {
  return (
    <section data-codexforge-grounded-fix-confidence-panel="FixConfidencePanel renders confidence model ranks deterministically" style={card}>
      <h3 style={title}>Confidence</h3>
      <strong>{candidate.confidence.toFixed(2)}</strong>
      {candidate.confidenceReasons.slice(0, 4).map((reason) => (
        <span key={reason}>{reason}</span>
      ))}
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(34,197,94,0.18)", background: "rgba(20,83,45,0.16)", borderRadius: 8, padding: 12, display: "grid", gap: 6, minWidth: 0, fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
const title: CSSProperties = { margin: 0, fontSize: 14, letterSpacing: 0 };
