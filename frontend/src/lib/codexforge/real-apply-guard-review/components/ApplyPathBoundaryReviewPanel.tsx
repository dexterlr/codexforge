"use client";

import type { CSSProperties } from "react";
import type { ApplyPathBoundaryReview } from "../real-apply-guard-review-types";

export function ApplyPathBoundaryReviewPanel({ review }: { review: ApplyPathBoundaryReview }) {
  return (
    <section style={panel} data-codexforge-apply-path-boundary-review-panel="ApplyPathBoundaryReviewPanel renders no parent traversal no absolute unreviewed write path Windows path normalization considered output apply scope explicit">
      <h2 style={heading}>Path boundaries</h2>
      <span style={badge}>{review.overallStatus}</span>
      <ul style={list}>{review.summary.map((line) => <li key={`path-${line}`} style={item}>{line}</li>)}</ul>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 10, minWidth: 0, padding: 14 };
const heading: CSSProperties = { fontSize: 16, lineHeight: 1.25, margin: 0, overflowWrap: "normal" };
const badge: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900 };
const list: CSSProperties = { display: "grid", gap: 6, margin: 0, paddingLeft: 18 };
const item: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.35 };
