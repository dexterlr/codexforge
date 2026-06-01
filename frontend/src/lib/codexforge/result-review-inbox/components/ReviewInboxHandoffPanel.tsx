"use client";
import { buildResultReviewInboxSummary } from "../index";
import { card, muted } from "./ComponentStyles";

export function ReviewInboxHandoffPanel() {
  const { handoff } = buildResultReviewInboxSummary();
  return <section style={card}><strong>{handoff.title}</strong><p style={muted}>{handoff.copyText}</p></section>;
}
