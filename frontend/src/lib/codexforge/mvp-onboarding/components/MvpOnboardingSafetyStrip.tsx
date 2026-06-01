"use client";
import { buildOnboardingSafetyPromise } from "../index";
import { card, muted } from "./ComponentStyles";

export function MvpOnboardingSafetyStrip() {
  const promise = buildOnboardingSafetyPromise();
  return <aside style={card}><strong>{promise.title}</strong><p style={muted}>{promise.promises.join(" | ")}</p></aside>;
}
