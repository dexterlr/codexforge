"use client";
import { card, muted } from "../../assisted-coding-mode/components/ComponentStyles";

export function SmartEmptyStateEmptyState() {
  return <article style={card} data-codexforge-empty-state="what is missing why it matters what to do next where to go what is safe"><h2>No empty-state issue selected</h2><p>Pick a route or panel that feels blank or generic.</p><p style={muted}>The fix should explain the next safe step without adding execution.</p></article>;
}
