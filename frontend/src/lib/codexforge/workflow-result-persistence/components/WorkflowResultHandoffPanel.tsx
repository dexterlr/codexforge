"use client";

import type { WorkflowResultHandoff } from "../workflow-result-types";
import { summarizeWorkflowResultHandoff } from "../workflow-result-handoff";
import { wrButton, wrCopy, wrPanel, wrTitle } from "./WorkflowResultStyles";

export function WorkflowResultHandoffPanel({ handoff, onCopy }: { handoff: WorkflowResultHandoff; onCopy?: (label: string, value: string) => void }) {
  return (
    <section style={wrPanel} data-codexforge-workflow-result-handoff-panel="WorkflowResultHandoffPanel renders handoff includes validation status handoff includes next action copy handoff allowed reviewed by operator status no secret inclusion">
      <h2 style={wrTitle}>Handoff</h2>
      {summarizeWorkflowResultHandoff(handoff).map((line) => <p key={`workflow-result-handoff-${line.slice(0, 34)}`} style={wrCopy}>{line}</p>)}
      <button type="button" style={wrButton} onClick={() => onCopy?.("workflow handoff", handoff.compactMarkdownHandoff)}>Copy workflow handoff</button>
    </section>
  );
}
