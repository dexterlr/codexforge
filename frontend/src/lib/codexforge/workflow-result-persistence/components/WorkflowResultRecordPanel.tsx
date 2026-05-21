"use client";

import type { WorkflowResultRecord } from "../workflow-result-types";
import { summarizeWorkflowResultRecord } from "../workflow-result-record";
import { wrCopy, wrMeta, wrPanel, wrTitle } from "./WorkflowResultStyles";

export function WorkflowResultRecordPanel({ record }: { record: WorkflowResultRecord }) {
  return (
    <section style={wrPanel} data-codexforge-workflow-result-record-panel="WorkflowResultRecordPanel renders result record no-auto-promotion latest-message authority reminder">
      <h2 style={wrTitle}>Result record</h2>
      <p style={wrMeta}>{record.resultLabel}</p>
      {summarizeWorkflowResultRecord(record).map((line) => <p key={`workflow-result-record-${line.slice(0, 32)}`} style={wrCopy}>{line}</p>)}
    </section>
  );
}
