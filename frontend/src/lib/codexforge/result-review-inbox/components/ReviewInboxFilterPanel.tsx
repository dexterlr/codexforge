"use client";
import { buildResultReviewInboxSummary } from "../index";
import { card, muted } from "./ComponentStyles";

export function ReviewInboxFilterPanel() {
  const { filter } = buildResultReviewInboxSummary();
  return <section style={card}><strong>Filter</strong><p style={muted}>{filter.label}</p></section>;
}
