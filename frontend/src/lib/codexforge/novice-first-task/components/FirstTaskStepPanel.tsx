"use client";
import { buildDefaultFirstTaskSteps } from "../index";
import { card, muted } from "../../assisted-coding-mode/components/ComponentStyles";

export function FirstTaskStepPanel() {
  return <article style={card}><h2>Plain-English steps</h2>{buildDefaultFirstTaskSteps().map((step) => <p key={step.id}><strong>{step.title}</strong><br /><span style={muted}>{step.plainEnglish} Next: {step.nextRoute}</span></p>)}</article>;
}
