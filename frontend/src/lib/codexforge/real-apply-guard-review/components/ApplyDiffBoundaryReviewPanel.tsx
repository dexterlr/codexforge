"use client";

import type { CSSProperties } from "react";
import type { ApplyDiffBoundaryReview } from "../real-apply-guard-review-types";

export function ApplyDiffBoundaryReviewPanel({ review }: { review: ApplyDiffBoundaryReview }) {
  return (
    <section style={panel} data-codexforge-apply-diff-boundary-review-panel="ApplyDiffBoundaryReviewPanel renders binary patch secrets tool execution policy edit no mojibake smoke-all edit targeted smoke warning">
      <h2 style={heading}>Diff boundaries</h2>
      <span style={badge}>{review.overallStatus}</span>
      <details style={details}>
        <summary style={summary}>Advanced diff checks</summary>
        <ul style={list}>{review.checks.map((check) => <li key={`diff-boundary-${check.id}`} style={item}>{check.label}: {check.status}</li>)}</ul>
      </details>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 10, minWidth: 0, padding: 14 };
const heading: CSSProperties = { fontSize: 16, lineHeight: 1.25, margin: 0, overflowWrap: "normal" };
const badge: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900 };
const details: CSSProperties = { color: "#cbd5e1", fontSize: 12 };
const summary: CSSProperties = { cursor: "pointer", fontWeight: 900 };
const list: CSSProperties = { display: "grid", gap: 6, margin: "8px 0 0", paddingLeft: 18 };
const item: CSSProperties = { lineHeight: 1.35 };
