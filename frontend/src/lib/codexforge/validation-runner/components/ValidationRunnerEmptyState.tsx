"use client";

import { vrCard, vrCopy, vrTitle } from "./ValidationRunnerStyles";

export function ValidationRunnerEmptyState({ reason = "Select allowlisted commands and prepare an approval-gated validation request." }: { reason?: string }) {
  return (
    <section style={vrCard} data-codexforge-validation-runner-empty-state="ValidationRunnerEmptyState renders approval required no arbitrary shell">
      <strong style={vrTitle}>Validation Runner Empty State</strong>
      <p style={vrCopy}>{reason}</p>
    </section>
  );
}
