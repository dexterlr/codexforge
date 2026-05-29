import type { CSSProperties } from "react";
import type { QualityAuditSmokeReview } from "../full-system-quality-audit-types";

type Props = { review: QualityAuditSmokeReview };

export function QualityAuditSmokeReviewPanel({ review }: Props) {
  return (
    <section style={panel} data-codexforge-quality-audit-smoke-review-panel="QualityAuditSmokeReviewPanel renders managed smoke suite includes Full System Quality Audit exactly once">
      <h2 style={title}>Smoke review</h2>
      <p style={body}>{review.summary}</p>
      <div style={list}>{review.requiredScripts.map((script) => <span key={script} style={scriptLine}>{script}</span>)}</div>
    </section>
  );
}

const panel: CSSProperties = { background: "rgba(15,23,42,0.72)", border: "1px solid rgba(125,211,252,0.16)", borderRadius: 8, display: "grid", gap: 10, minWidth: 0, padding: 14 };
const title: CSSProperties = { fontSize: 16, lineHeight: 1.25, margin: 0 };
const body: CSSProperties = { color: "#dbeafe", fontSize: 12, lineHeight: 1.5, margin: 0 };
const list: CSSProperties = { display: "grid", gap: 5 };
const scriptLine: CSSProperties = { color: "#94a3b8", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 11, overflowWrap: "break-word" };
