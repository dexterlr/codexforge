"use client";

import type { CSSProperties } from "react";
import type { GroundedFixCandidate } from "../grounded-fix-types";

export function FixCandidatePanel({ candidates }: { candidates: readonly GroundedFixCandidate[] }) {
  return (
    <section data-codexforge-grounded-fix-candidate-panel="FixCandidatePanel renders" style={card}>
      <h3 style={title}>Candidate recommendations</h3>
      {candidates.map((candidate) => (
        <div key={candidate.id} style={row}>
          <strong>{candidate.title}</strong>
          <span>{candidate.goal}</span>
          <small>{candidate.kind} - {candidate.reviewState} - Safe Patch Preview required</small>
        </div>
      ))}
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(15,23,42,0.72)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const title: CSSProperties = { margin: 0, fontSize: 14, letterSpacing: 0 };
const row: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, padding: 9, display: "grid", gap: 4, fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
