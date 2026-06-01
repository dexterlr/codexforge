"use client";
import { buildDefaultAssistedCodingSteps } from "../index";
import { card, muted } from "./ComponentStyles";

export function AssistedCodingStepPanel() {
  return <section style={card}><strong>Safe path</strong>{buildDefaultAssistedCodingSteps().map((step) => <p key={step.id} style={muted}>{step.title} to {step.route}</p>)}</section>;
}
