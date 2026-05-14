"use client";

import type { CSSProperties } from "react";
import type { MemoryReviewItem } from "../memory-review-types";
import { buildMemoryReviewStableKey } from "../memory-review-types";

export function MemoryReviewScorePanel({ item }: { item: MemoryReviewItem }) {
  const dimensions = [
    ["Confidence", item.score.confidence],
    ["Source traceability", item.score.sourceTraceabilityScore],
    ["Repeated signals", item.score.repeatedSignalsScore],
    ["Contradiction risk", item.score.contradictionRisk],
    ["Validation quality", item.score.validationQualityScore],
    ["Safety posture", item.score.safetyPostureScore],
  ] as const;

  return (
    <section style={panel} data-codexforge-memory-review-score-panel="MemoryReviewScorePanel renders contradiction risk low confidence review">
      <div style={header}>
        <span style={eyebrow}>Review scoring</span>
        <strong style={score}>{Math.round(item.score.score * 100)}</strong>
      </div>
      <p style={copy}>Review required posture: {item.promotionReadiness}. Low confidence review and contradiction risk review are deterministic policy inputs.</p>
      <div style={dimensionGrid}>
        {dimensions.map(([label, value], index) => (
          <div key={buildMemoryReviewStableKey("score-dimension", item.id, label, index)} style={dimension}>
            <span style={labelStyle}>{label}</span>
            <div style={track}><span style={{ ...bar, width: `${Math.round(value * 100)}%` }} /></div>
            <strong style={valueStyle}>{Math.round(value * 100)}%</strong>
          </div>
        ))}
      </div>
      <ul style={list}>
        {item.score.reasons.map((reason, index) => (
          <li key={buildMemoryReviewStableKey("score-reason", item.id, reason, index)}>{reason}</li>
        ))}
      </ul>
    </section>
  );
}

const safeText: CSSProperties = { minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", background: "rgba(15,23,42,0.68)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 };
const eyebrow: CSSProperties = { color: "#7dd3fc", fontSize: 12, fontWeight: 900, textTransform: "uppercase", ...safeText };
const score: CSSProperties = { fontSize: 34, color: "#ccfbf1" };
const copy: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 13, lineHeight: 1.55, ...safeText };
const dimensionGrid: CSSProperties = { display: "grid", gap: 10, minWidth: 0 };
const dimension: CSSProperties = { display: "grid", gridTemplateColumns: "minmax(0, 130px) minmax(80px, 1fr) 42px", gap: 8, alignItems: "center", minWidth: 0 };
const labelStyle: CSSProperties = { color: "#94a3b8", fontSize: 12, ...safeText };
const track: CSSProperties = { height: 8, borderRadius: 999, background: "rgba(148,163,184,0.14)", overflow: "hidden" };
const bar: CSSProperties = { display: "block", height: "100%", borderRadius: 999, background: "linear-gradient(90deg, #22d3ee, #2dd4bf)" };
const valueStyle: CSSProperties = { fontSize: 12, textAlign: "right" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#cbd5e1", fontSize: 12, lineHeight: 1.6, ...safeText };
