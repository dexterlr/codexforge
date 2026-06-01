"use client";
import { buildOnboardingCompletion } from "../index";
import { card, muted } from "./ComponentStyles";

export function OnboardingCompletionPanel() {
  const completion = buildOnboardingCompletion();
  return <section style={card}><strong>{completion.title}</strong>{completion.doneWhen.map((item) => <p key={item} style={muted}>{item}</p>)}</section>;
}
