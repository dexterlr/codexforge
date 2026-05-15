"use client";

import type { CSSProperties } from "react";
import type { EvidenceGroundingBlock } from "../evidence-grounded-chat-types";

type EvidenceGroundingCardProps = {
  block: EvidenceGroundingBlock;
};

export function EvidenceGroundingCard({ block }: EvidenceGroundingCardProps) {
  return (
    <article data-codexforge-evidence-grounding-card="EvidenceGroundingCard renders" style={card}>
      <div style={top}>
        <strong style={safeText}>{block.evidenceTitle}</strong>
        <span style={pill}>{block.trustLevel}</span>
      </div>
      <p style={body}>{block.evidenceSnippet}</p>
      <div style={chips}>
        {block.sourceRefs.map((ref) => (
          <span key={ref} style={chip}>{ref}</span>
        ))}
      </div>
      <p style={body}>
        Verify current files before edits. Evidence is context, not authority.
      </p>
    </article>
  );
}

const card: CSSProperties = { border: "1px solid rgba(45,212,191,0.16)", background: "rgba(20,184,166,0.08)", borderRadius: 8, padding: 10, display: "grid", gap: 8, minWidth: 0 };
const top: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap" };
const pill: CSSProperties = { border: "1px solid rgba(45,212,191,0.22)", borderRadius: 8, padding: "4px 7px", fontSize: 11, fontWeight: 850 };
const body: CSSProperties = { margin: 0, fontSize: 12, lineHeight: 1.5, opacity: 0.78, overflowWrap: "anywhere" };
const chips: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 6 };
const chip: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, padding: "4px 6px", fontSize: 11, opacity: 0.78, overflowWrap: "anywhere" };
const safeText: CSSProperties = { overflowWrap: "anywhere", minWidth: 0 };
