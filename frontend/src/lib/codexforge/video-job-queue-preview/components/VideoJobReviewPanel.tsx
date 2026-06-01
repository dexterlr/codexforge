"use client";

import type { CSSProperties } from "react";
import type { VideoJobReview } from "../video-job-queue-types";

export function VideoJobReviewPanel({ reviews }: { reviews: VideoJobReview[] }) {
  return <section style={card}><h2 style={title}>Review checklist</h2>{reviews.map((review) => <ul key={review.id} style={list}>{review.checklist.map((item) => <li key={`${review.id}-${item}`}>{item}</li>)}</ul>)}</section>;
}

const card: CSSProperties = { background: "rgba(2,6,23,0.68)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 8, padding: 14 };
const title: CSSProperties = { fontSize: 18, letterSpacing: 0, margin: 0 };
const list: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0, paddingLeft: 18 };
