"use client";

import type { ValidationRunPolicy } from "../index";
import { vrCard, vrCopy, vrList, vrPill, vrTitle } from "./ValidationRunnerStyles";

export function ValidationRunPolicyPanel({ policy }: { policy: ValidationRunPolicy }) {
  return (
    <section style={vrCard} data-codexforge-validation-run-policy-panel="ValidationRunPolicyPanel renders no arbitrary shell no command execution without approval no direct apply-diff no direct write-file no broker-execution no file writes">
      <strong style={vrTitle}>Policy</strong>
      <span style={vrPill}>allowed={String(policy.allowed)} requestReady={String(policy.requestReady)}</span>
      <ul style={vrList}>
        {policy.summary.map((item) => <li key={item} style={vrCopy}>{item}</li>)}
        {policy.blockedReasons.map((item) => <li key={item} style={{ ...vrCopy, color: "#fecaca" }}>{item}</li>)}
      </ul>
    </section>
  );
}
