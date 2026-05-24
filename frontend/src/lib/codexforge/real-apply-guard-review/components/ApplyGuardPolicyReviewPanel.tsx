"use client";

import type { CSSProperties } from "react";
import type { ApplyGuardPolicyReview } from "../real-apply-guard-review-types";

export function ApplyGuardPolicyReviewPanel({ review }: { review: ApplyGuardPolicyReview }) {
  return <ReviewCard title="Policy review" marker="ApplyGuardPolicyReviewPanel renders preview diff required explicit approval required direct UI apply blocked validation required after apply rollback required before apply" summary={review.summary} status={review.overallStatus} />;
}

function ReviewCard({ title, marker, summary, status }: { title: string; marker: string; summary: string[]; status: string }) {
  return <section style={panel} data-codexforge-apply-guard-policy-review-panel={marker}><h2 style={heading}>{title}</h2><span style={badge}>{status}</span><ul style={list}>{summary.map((line) => <li key={`policy-${line}`} style={item}>{line}</li>)}</ul></section>;
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 10, minWidth: 0, padding: 14 };
const heading: CSSProperties = { fontSize: 16, lineHeight: 1.25, margin: 0, overflowWrap: "normal" };
const badge: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900 };
const list: CSSProperties = { display: "grid", gap: 6, margin: 0, paddingLeft: 18 };
const item: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.35 };
