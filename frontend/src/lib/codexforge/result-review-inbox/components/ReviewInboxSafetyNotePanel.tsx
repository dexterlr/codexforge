"use client";
import { buildReviewInboxSafetyNote } from "../index";
import { card, muted } from "./ComponentStyles";

export function ReviewInboxSafetyNotePanel() {
  const note = buildReviewInboxSafetyNote();
  return <section style={card}><strong>{note.title}</strong><p style={muted}>{note.notes.join(", ")}</p></section>;
}
