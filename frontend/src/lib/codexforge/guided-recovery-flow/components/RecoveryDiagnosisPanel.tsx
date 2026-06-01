"use client";
import { buildGuidedRecoveryFlowSummary } from "../index";
import { card, muted } from "./ComponentStyles";

export function RecoveryDiagnosisPanel() {
  const { diagnosis } = buildGuidedRecoveryFlowSummary();
  return <section style={card}><strong>{diagnosis.title}</strong><p style={muted}>{diagnosis.explanation}</p></section>;
}
