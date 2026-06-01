"use client";
import { card, muted } from "../../assisted-coding-mode/components/ComponentStyles";

export function SafetyCoachEmptyState() {
  return <article style={card} data-codexforge-empty-state="what is missing why it matters what to do next where to go what is safe"><h2>No safety question selected</h2><p>Choose a term like Preview, Apply, Evidence, Validation, Recovery, or Rollback.</p><p style={muted}>Each answer is short and keeps one idea at a time.</p></article>;
}
