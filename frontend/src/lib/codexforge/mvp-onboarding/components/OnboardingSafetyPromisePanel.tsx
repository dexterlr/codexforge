"use client";
import { buildOnboardingSafetyPromise } from "../index";
import { card, muted } from "./ComponentStyles";

export function OnboardingSafetyPromisePanel() {
  const promise = buildOnboardingSafetyPromise();
  return <section style={card}><strong>{promise.title}</strong><p style={muted}>{promise.promises.join(", ")}</p></section>;
}
