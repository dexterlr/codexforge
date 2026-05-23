"use client";

import type { TrialRunRecord } from "../coding-flow-trial-review-types";
import { copy, grid, itemBox, itemTitle, meta, panel, title } from "./TrialReviewPanelStyles";

export function TrialRunRecordPanel({ record }: { record: TrialRunRecord }) {
  return (
    <section style={panel} data-codexforge-trial-run-record-panel="TrialRunRecordPanel renders trial run id selected file validation result no auto-apply no auto-run">
      <h2 style={title}>Trial run record</h2>
      <div style={grid}>
        <article style={itemBox}><h3 style={itemTitle}>Status</h3><p style={copy}>{record.finalTrialStatus}</p><span style={meta}>{record.trialRunId}</span></article>
        <article style={itemBox}><h3 style={itemTitle}>File choice</h3><p style={copy}>{record.selectedFileCategory}</p><span style={meta}>{record.selectedFilePath ?? "No path selected"}</span></article>
        <article style={itemBox}><h3 style={itemTitle}>Validation</h3><p style={copy}>{record.validationResultStatus}</p><span style={meta}>{record.validationCommandsReviewed.length} commands reviewed</span></article>
      </div>
    </section>
  );
}
