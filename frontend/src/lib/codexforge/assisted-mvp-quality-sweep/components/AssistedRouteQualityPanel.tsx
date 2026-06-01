"use client";
import { buildAssistedRouteQuality } from "../index";
import { card, muted } from "../../assisted-coding-mode/components/ComponentStyles";

export function AssistedRouteQualityPanel() {
  return <article style={card}><h2>Route quality</h2>{buildAssistedRouteQuality().map((route) => <p key={route.route}><strong>{route.route}</strong><br /><span style={muted}>{route.primaryAction}. Next: {route.nextStep}.</span></p>)}</article>;
}
