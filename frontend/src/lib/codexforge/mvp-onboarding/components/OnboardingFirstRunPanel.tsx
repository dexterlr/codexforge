"use client";
import { buildOnboardingFirstRun } from "../index";
import { card, muted } from "./ComponentStyles";

export function OnboardingFirstRunPanel() {
  const firstRun = buildOnboardingFirstRun();
  return <section style={card}><strong>{firstRun.title}</strong>{firstRun.steps.map((step) => <p key={step} style={muted}>{step}</p>)}</section>;
}
