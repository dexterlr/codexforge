"use client";
import { card, muted } from "./ComponentStyles";

export function MvpOnboardingEmptyState() {
  return <section style={card}><strong>Start small</strong><p style={muted}>Use onboarding when you are new or unsure which safe route comes next.</p></section>;
}
