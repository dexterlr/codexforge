"use client";
import { buildAssistedCodingModeSummary } from "../index";
import { card, muted } from "./ComponentStyles";

export function AssistedCodingHandoffPanel() {
  const { handoff } = buildAssistedCodingModeSummary();
  return <section style={card}><strong>{handoff.title}</strong><p style={muted}>{handoff.copyText}</p></section>;
}
