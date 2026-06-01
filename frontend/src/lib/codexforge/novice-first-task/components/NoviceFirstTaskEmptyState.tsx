"use client";
import { card, muted } from "../../assisted-coding-mode/components/ComponentStyles";

export function NoviceFirstTaskEmptyState() {
  return <article style={card} data-codexforge-empty-state="no goal selected no file selected no patch preview yet what is missing why it matters what to do next where to go what is safe"><h2>Nothing selected yet</h2><p>No goal, file, preview, approval, evidence, or validation output is selected yet.</p><p style={muted}>Start with the wording-only task, choose one safe file, preview first, then review the apply request.</p></article>;
}
