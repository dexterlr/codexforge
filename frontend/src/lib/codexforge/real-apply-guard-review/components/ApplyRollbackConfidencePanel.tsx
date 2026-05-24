"use client";

import type { CSSProperties } from "react";
import type { ApplyRollbackConfidence } from "../real-apply-guard-review-types";

export function ApplyRollbackConfidencePanel({ confidence }: { confidence: ApplyRollbackConfidence }) {
  return (
    <section style={panel} data-codexforge-apply-rollback-confidence-panel="ApplyRollbackConfidencePanel renders rollback confidence git restore git revert validation fail rollback guidance evidence capture before rollback">
      <h2 style={heading}>Rollback confidence</h2>
      <span style={badge}>{confidence.confidence}</span>
      <ul style={list}>{confidence.summary.map((line) => <li key={`rollback-${line}`} style={item}>{line}</li>)}</ul>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 10, minWidth: 0, padding: 14 };
const heading: CSSProperties = { fontSize: 16, lineHeight: 1.25, margin: 0, overflowWrap: "normal" };
const badge: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900 };
const list: CSSProperties = { display: "grid", gap: 6, margin: 0, paddingLeft: 18 };
const item: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.35 };
