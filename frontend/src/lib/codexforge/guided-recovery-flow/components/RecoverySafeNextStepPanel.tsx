"use client";
import Link from "next/link";
import { buildGuidedRecoveryFlowSummary } from "../index";
import { buttonLike, card, muted } from "./ComponentStyles";

export function RecoverySafeNextStepPanel() {
  const { safeNextStep } = buildGuidedRecoveryFlowSummary();
  return <section style={card}><strong>Safe next step</strong><p style={muted}>{safeNextStep.reason}</p><Link href={safeNextStep.href} style={buttonLike}>{safeNextStep.label}</Link></section>;
}
