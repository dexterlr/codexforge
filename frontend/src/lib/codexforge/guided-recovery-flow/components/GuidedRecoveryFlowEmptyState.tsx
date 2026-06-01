"use client";
import { card, muted } from "./ComponentStyles";

export function GuidedRecoveryFlowEmptyState() {
  return <section style={card}><strong>No failure selected</strong><p style={muted}>Start with the most common case, then route to the safest manual review step.</p></section>;
}
