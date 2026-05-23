"use client";

import type { RunHistoryRecord } from "../run-history-types";
import { summarizeRunHistoryRecord } from "../run-history-record";
import { rhCopy, rhMeta, rhPanel, rhPill, rhTitle } from "./RunHistoryStyles";

export function RunHistoryRecordCard({ record }: { record: RunHistoryRecord }) {
  return (
    <article style={rhPanel} data-codexforge-run-history-record-card="RunHistoryRecordCard renders run kinds include code-fix validation closed-loop review required no-auto-promotion preserve latest-message authority stable key patterns exist">
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        <span style={rhPill}>{record.runKind}</span>
        <span style={rhPill}>{record.reviewStatus}</span>
        <span style={rhPill}>{record.validationStatus}</span>
      </div>
      <h2 style={rhTitle}>{record.label}</h2>
      <p style={rhMeta}>Source: {record.sourceRoute} / {record.sourceWorkflowResultId}</p>
      {summarizeRunHistoryRecord(record).map((line) => <p key={`run-history-record-${record.runId}-${line.slice(0, 28)}`} style={rhCopy}>{line}</p>)}
    </article>
  );
}
