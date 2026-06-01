"use client";
import { card, muted } from "../../assisted-coding-mode/components/ComponentStyles";

export function AssistedMvpQualityEmptyState() {
  return <article style={card} data-codexforge-empty-state="what is missing why it matters what to do next where to go what is safe"><h2>No quality issue selected</h2><p>The novice path has no selected issue right now.</p><p style={muted}>Use the sweep to check copy, safety, empty states, navigation, and manual handoffs.</p></article>;
}
