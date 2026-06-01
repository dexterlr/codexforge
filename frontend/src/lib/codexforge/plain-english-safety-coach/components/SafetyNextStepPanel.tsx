"use client";
import { buildSafetyNextStep } from "../index";
import { card, buttonLike, muted } from "../../assisted-coding-mode/components/ComponentStyles";

export function SafetyNextStepPanel() {
  const step = buildSafetyNextStep();
  return <article style={card}><h2>Next safe step</h2><p>{step.why}</p><a href={step.href} style={buttonLike}>{step.label}</a><p style={muted}>Navigation only. No execution.</p></article>;
}
