"use client";

import type { ValidationRunPreflight } from "../index";
import { vrCard, vrCopy, vrList, vrPill, vrTitle } from "./ValidationRunnerStyles";

export function ValidationRunPreflightPanel({ preflight }: { preflight: ValidationRunPreflight }) {
  return (
    <section style={vrCard} data-codexforge-validation-run-preflight-panel="ValidationRunPreflightPanel renders preflight checks allowlisted commands preflight checks destructive command tokens">
      <strong style={vrTitle}>Preflight</strong>
      <span style={vrPill}>{preflight.overallStatus}</span>
      <ul style={vrList}>
        {preflight.checks.map((check) => (
          <li key={check.id} style={vrCopy}><strong>{check.status}</strong> {check.label}: {check.detail}</li>
        ))}
      </ul>
    </section>
  );
}
