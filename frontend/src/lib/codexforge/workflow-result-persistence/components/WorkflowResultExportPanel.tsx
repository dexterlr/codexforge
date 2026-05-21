"use client";

import type { WorkflowResultExport } from "../workflow-result-types";
import { summarizeWorkflowResultExport } from "../workflow-result-export";
import { wrButton, wrCopy, wrPanel, wrTitle } from "./WorkflowResultStyles";

export function WorkflowResultExportPanel({ resultExport, onCopy }: { resultExport: WorkflowResultExport; onCopy?: (label: string, value: string) => void }) {
  return (
    <section style={wrPanel} data-codexforge-workflow-result-export-panel="WorkflowResultExportPanel renders export supports markdown export supports issue-draft copy export allowed json-preview not huge raw by default">
      <h2 style={wrTitle}>Export</h2>
      {summarizeWorkflowResultExport(resultExport).map((line) => <p key={`workflow-result-export-${line.slice(0, 34)}`} style={wrCopy}>{line}</p>)}
      <button type="button" style={wrButton} onClick={() => onCopy?.(resultExport.copyLabel, resultExport.payload)}>{resultExport.copyLabel}</button>
    </section>
  );
}
