"use client";
import { buildRecoveryRollbackGuidance } from "../index";
import { card, muted } from "./ComponentStyles";

export function RecoveryRollbackGuidancePanel() {
  const rollback = buildRecoveryRollbackGuidance();
  return <section style={card}><strong>{rollback.title}</strong><p style={muted}>{rollback.guidance}</p></section>;
}
