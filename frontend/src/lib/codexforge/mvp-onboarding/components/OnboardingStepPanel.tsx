"use client";
import Link from "next/link";
import { buildDefaultOnboardingSteps } from "../index";
import { buttonLike, card, muted } from "./ComponentStyles";

export function OnboardingStepPanel() {
  const steps = buildDefaultOnboardingSteps();
  return <section style={card}><strong>Safe flow</strong>{steps.map((step) => <p key={step.id} style={muted}>{step.title}: {step.plainEnglish}</p>)}<Link href={steps[0]?.route ?? "/assist"} style={buttonLike}>Choose a safe task</Link></section>;
}
