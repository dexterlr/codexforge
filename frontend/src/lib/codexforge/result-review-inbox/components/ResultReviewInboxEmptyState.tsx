"use client";
import { card, muted } from "./ComponentStyles";

export function ResultReviewInboxEmptyState() {
  return <section style={card}><strong>Nothing needs review yet.</strong><p style={muted}>The inbox uses deterministic preview items until a safe reviewed source is supplied.</p></section>;
}
