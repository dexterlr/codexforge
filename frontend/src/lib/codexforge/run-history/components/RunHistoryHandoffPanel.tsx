"use client";

import type { RunHistoryHandoff } from "../run-history-types";
import { summarizeRunHistoryHandoff } from "../run-history-handoff";
import { rhButton, rhCopy, rhList, rhPanel, rhTitle } from "./RunHistoryStyles";

export function RunHistoryHandoffPanel({ handoff, onCopy }: { handoff: RunHistoryHandoff; onCopy?: (label: string, value: string) => void }) {
  return (
    <section style={rhPanel} data-codexforge-run-history-handoff-panel="RunHistoryHandoffPanel renders handoff includes validation result compact handoff markdown handoff issue/PR draft closed-loop input memory review candidate no raw huge output no secrets reviewed status visible">
      <h2 style={rhTitle}>Handoff</h2>
      {summarizeRunHistoryHandoff(handoff).map((line) => <p key={`run-history-handoff-summary-${line.slice(0, 30)}`} style={rhCopy}>{line}</p>)}
      <button type="button" style={rhButton} onClick={() => onCopy?.("run handoff", handoff.markdownHandoff)}>Copy handoff</button>
      <details style={{ display: "grid", gap: 8 }}>
        <summary style={rhCopy}>Advanced handoff sections</summary>
        <div style={rhList}>
          {handoff.sections.map((section) => <p key={section.sectionId} style={rhCopy}><strong>{section.title}:</strong> {section.body}</p>)}
        </div>
      </details>
    </section>
  );
}
