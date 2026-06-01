"use client";
import { buildOnboardingHandoff } from "../index";
import { card, muted } from "./ComponentStyles";

export function OnboardingHandoffPanel() {
  const handoff = buildOnboardingHandoff();
  return <section style={card}><strong>{handoff.title}</strong><p style={muted}>{handoff.copyText}</p></section>;
}
