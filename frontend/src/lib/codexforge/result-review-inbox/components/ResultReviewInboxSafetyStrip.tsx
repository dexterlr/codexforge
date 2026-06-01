"use client";
import { buildReviewInboxSafetyNote } from "../index";
import { card, muted } from "./ComponentStyles";

export function ResultReviewInboxSafetyStrip() {
  const note = buildReviewInboxSafetyNote();
  return <aside style={card}><strong>{note.title}</strong><p style={muted}>{note.notes.join(" | ")}</p></aside>;
}
