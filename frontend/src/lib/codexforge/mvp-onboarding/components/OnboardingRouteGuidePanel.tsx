"use client";
import { buildOnboardingRouteGuide } from "../index";
import { card, muted } from "./ComponentStyles";

export function OnboardingRouteGuidePanel() {
  const guide = buildOnboardingRouteGuide();
  return <section style={card}><strong>{guide.title}</strong><p style={muted}>{guide.routes.join(" to ")}</p></section>;
}
