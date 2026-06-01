"use client";
import { buildAssistedCodingSafetyState } from "../index";
import { card, muted } from "./ComponentStyles";

export function AssistedCodingSafetyStatePanel() {
  const safety = buildAssistedCodingSafetyState();
  return <section style={card}><strong>Safety state</strong><p style={muted}>{safety.status}</p><p style={muted}>{safety.promises.join(", ")}</p></section>;
}
