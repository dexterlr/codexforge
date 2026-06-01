"use client";
import { buildRecoveryValidationGuidance } from "../index";
import { card, muted } from "./ComponentStyles";

export function RecoveryValidationGuidancePanel() {
  const validation = buildRecoveryValidationGuidance();
  return <section style={card}><strong>{validation.title}</strong><p style={muted}>{validation.guidance}</p></section>;
}
