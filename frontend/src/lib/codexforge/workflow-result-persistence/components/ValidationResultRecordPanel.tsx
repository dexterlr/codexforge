"use client";

import type { ValidationResultRecord } from "../workflow-result-types";
import { summarizeValidationResultRecord } from "../validation-result-record";
import { wrCopy, wrMeta, wrPanel, wrTitle } from "./WorkflowResultStyles";

export function ValidationResultRecordPanel({ record }: { record: ValidationResultRecord }) {
  return (
    <section style={wrPanel} data-codexforge-validation-result-record-panel="ValidationResultRecordPanel renders validation result record does not fabricate output caps excerpts handoff includes validation status">
      <h2 style={wrTitle}>Validation result</h2>
      <p style={wrMeta}>Status: {record.overallStatus}</p>
      {summarizeValidationResultRecord(record).map((line) => <p key={`workflow-result-validation-${line.slice(0, 34)}`} style={wrCopy}>{line}</p>)}
    </section>
  );
}
