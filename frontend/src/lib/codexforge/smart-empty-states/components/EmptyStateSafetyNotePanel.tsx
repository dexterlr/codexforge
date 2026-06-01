"use client";
import { buildEmptyStateSafetyNote } from "../index";
import { card } from "../../assisted-coding-mode/components/ComponentStyles";

export function EmptyStateSafetyNotePanel() {
  const note = buildEmptyStateSafetyNote();
  return <article style={card}><h2>{note.title}</h2><p>{note.note}</p></article>;
}
