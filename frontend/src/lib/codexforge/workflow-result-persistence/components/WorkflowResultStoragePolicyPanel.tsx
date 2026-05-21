"use client";

import type { WorkflowResultStoragePolicy } from "../workflow-result-types";
import { summarizeWorkflowResultStoragePolicy } from "../workflow-result-storage-policy";
import { wrCopy, wrPanel, wrPill, wrTitle } from "./WorkflowResultStyles";

export function WorkflowResultStoragePolicyPanel({ policy }: { policy: WorkflowResultStoragePolicy }) {
  return (
    <section style={wrPanel} data-codexforge-workflow-result-storage-policy-panel="WorkflowResultStoragePolicyPanel renders storage policy blocks Brain auto-mutation blocks memory auto-promotion blocks raw secrets huge raw output blocked source code snippets require review validation output requires review">
      <h2 style={wrTitle}>Storage policy</h2>
      <span style={wrPill}>Auto persist allowed: {String(policy.autoPersistAllowed)}</span>
      {summarizeWorkflowResultStoragePolicy(policy).map((line) => <p key={`workflow-result-policy-${line.slice(0, 34)}`} style={wrCopy}>{line}</p>)}
    </section>
  );
}
