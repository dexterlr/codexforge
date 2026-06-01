"use client";
import { buildAssistedCodingSafetyState } from "../index";
import { card, muted } from "./ComponentStyles";

export function AssistedCodingModeSafetyStrip() {
  const safety = buildAssistedCodingSafetyState();
  return <aside style={card}><strong>Safe guide</strong><p style={muted}>{safety.promises.join(" | ")}</p></aside>;
}
