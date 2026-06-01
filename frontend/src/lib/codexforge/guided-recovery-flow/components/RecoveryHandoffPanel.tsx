"use client";
import { buildGuidedRecoveryFlowSummary } from "../index";
import { card, muted } from "./ComponentStyles";

export function RecoveryHandoffPanel() {
  const { handoff } = buildGuidedRecoveryFlowSummary();
  return <section style={card}><strong>{handoff.title}</strong><p style={muted}>{handoff.copyText}</p></section>;
}
