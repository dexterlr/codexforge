"use client";

import type { RunHistoryExport } from "../run-history-types";
import { summarizeRunHistoryExport } from "../run-history-export";
import { rhButton, rhCopy, rhPanel, rhTitle } from "./RunHistoryStyles";

export function RunHistoryExportPanel({ resultExport, onCopy }: { resultExport: RunHistoryExport; onCopy?: (label: string, value: string) => void }) {
  return (
    <section style={rhPanel} data-codexforge-run-history-export-panel="RunHistoryExportPanel renders export supports markdown plain-text json-preview issue-draft pr-summary-draft handoff-note copyable UI only no file writes no giant raw JSON above fold">
      <h2 style={rhTitle}>Export</h2>
      {summarizeRunHistoryExport(resultExport).map((line) => <p key={`run-history-export-${line.slice(0, 30)}`} style={rhCopy}>{line}</p>)}
      <button type="button" style={rhButton} onClick={() => onCopy?.("run export", resultExport.payload)}>{resultExport.copyLabel}</button>
      <details>
        <summary style={rhCopy}>Advanced export preview</summary>
        <p style={rhCopy}>{resultExport.redactionNotes.join("; ")}</p>
      </details>
    </section>
  );
}
