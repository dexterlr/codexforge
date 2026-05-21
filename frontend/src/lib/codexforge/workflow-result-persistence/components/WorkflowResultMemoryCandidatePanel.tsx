"use client";

import Link from "next/link";
import type { WorkflowResultMemoryCandidate } from "../workflow-result-types";
import { summarizeWorkflowResultMemoryCandidate } from "../workflow-result-memory-candidate";
import { wrButton, wrCopy, wrLink, wrPanel, wrTitle } from "./WorkflowResultStyles";

export function WorkflowResultMemoryCandidatePanel({ candidate, onCopy }: { candidate: WorkflowResultMemoryCandidate; onCopy?: (label: string, value: string) => void }) {
  const payload = summarizeWorkflowResultMemoryCandidate(candidate).join("\n");
  return (
    <section style={wrPanel} data-codexforge-workflow-result-memory-candidate-panel="WorkflowResultMemoryCandidatePanel renders memory candidate says no-auto-promotion memory candidate excludes sensitive details Memory Review Operator Memory Inbox workflow result candidate no Brain mutation">
      <h2 style={wrTitle}>Memory candidate</h2>
      {summarizeWorkflowResultMemoryCandidate(candidate).map((line) => <p key={`workflow-result-memory-${line.slice(0, 34)}`} style={wrCopy}>{line}</p>)}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <button type="button" style={wrButton} onClick={() => onCopy?.("memory review candidate", payload)}>Copy memory candidate</button>
        <Link href="/memory" style={wrLink}>Open Memory Review</Link>
        <Link href="/memory-inbox" style={wrLink}>Open Memory Inbox</Link>
      </div>
    </section>
  );
}
