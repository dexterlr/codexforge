"use client";
import { buildRecoveryRetryPlan } from "../index";
import { card, muted } from "./ComponentStyles";

export function RecoveryRetryPlanPanel() {
  const plan = buildRecoveryRetryPlan();
  return <section style={card}><strong>{plan.title}</strong>{plan.steps.map((step) => <p key={step} style={muted}>{step}</p>)}</section>;
}
