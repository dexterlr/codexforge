import type { CSSProperties } from "react";
import type { QualityAuditSafetyReview } from "../full-system-quality-audit-types";

type Props = { review: QualityAuditSafetyReview };

export function QualityAuditSafetyReviewPanel({ review }: Props) {
  return (
    <section style={panel} data-codexforge-quality-audit-safety-review-panel="QualityAuditSafetyReviewPanel renders no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no direct apply-diff call from UI except approved guarded boundary text no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text preserve latest-message authority">
      <h2 style={title}>Safety review</h2>
      <p style={body}>{review.summary}</p>
      <div style={chips}>{review.boundaries.map((item) => <span key={item} style={chip}>{item}</span>)}</div>
    </section>
  );
}

const panel: CSSProperties = { background: "rgba(15,23,42,0.72)", border: "1px solid rgba(125,211,252,0.16)", borderRadius: 8, display: "grid", gap: 10, minWidth: 0, padding: 14 };
const title: CSSProperties = { fontSize: 16, lineHeight: 1.25, margin: 0 };
const body: CSSProperties = { color: "#dbeafe", fontSize: 12, lineHeight: 1.5, margin: 0 };
const chips: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8 };
const chip: CSSProperties = { border: "1px solid rgba(45,212,191,0.22)", borderRadius: 8, color: "#ccfbf1", fontSize: 11, fontWeight: 900, padding: "6px 8px" };
