"use client";
import { buildResultReviewInboxSummary, buildReviewInboxPriority } from "../index";
import { card, muted } from "./ComponentStyles";

export function ReviewInboxPriorityPanel() {
  const item = buildResultReviewInboxSummary().items[0];
  const priority = item ? buildReviewInboxPriority(item) : null;
  return <section style={card}><strong>Priority</strong><p style={muted}>{priority ? `${priority.priority}: ${priority.reason}` : "later: nothing is waiting"}</p></section>;
}
