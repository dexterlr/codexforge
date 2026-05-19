"use client";

import { vrCard, vrCopy, vrTitle } from "./ValidationRunnerStyles";

export function ValidationRunnerSafetyNotice() {
  return (
    <section style={{ ...vrCard, background: "rgba(30,41,59,0.72)" }} data-codexforge-validation-runner-safety-notice="ValidationRunnerSafetyNotice renders approval required no arbitrary shell no command execution without approval no file writes preserve latest-message authority">
      <strong style={vrTitle}>Safety Notice</strong>
      <p style={vrCopy}>
        Approval required. No arbitrary shell. No command execution without approval. No file writes. No apply-diff,
        write-file, broker execution, Brain graph mutation, auto-persistence, or auto-ingestion. Preserve
        latest-message authority.
      </p>
    </section>
  );
}
