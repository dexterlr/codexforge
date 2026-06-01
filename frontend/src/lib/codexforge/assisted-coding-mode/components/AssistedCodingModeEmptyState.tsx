"use client";
import { card, muted } from "./ComponentStyles";

export function AssistedCodingModeEmptyState() {
  return <section style={card}><strong>Nothing runs here</strong><p style={muted}>Choose a goal to see a safe next step. No auto-apply, no auto-run, approval required.</p></section>;
}
