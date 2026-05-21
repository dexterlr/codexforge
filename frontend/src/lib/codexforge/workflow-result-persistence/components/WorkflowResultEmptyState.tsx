"use client";

import { wrCopy, wrPanel, wrTitle } from "./WorkflowResultStyles";

export function WorkflowResultEmptyState() {
  return (
    <section style={wrPanel} data-codexforge-workflow-result-empty-state="WorkflowResultEmptyState renders no giant raw JSON above fold advanced details are collapsed or visually secondary">
      <h2 style={wrTitle}>No persisted result yet</h2>
      <p style={wrCopy}>Use this page to review a workflow result, copy a clean handoff, and prepare an optional reviewed memory candidate. Nothing is auto-saved, auto-promoted, or written to Brain.</p>
    </section>
  );
}
