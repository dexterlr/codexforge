"use client";

import type { RunHistoryNextActionPlan } from "../run-history-types";
import { summarizeRunHistoryNextAction } from "../run-history-next-action";
import { rhCopy, rhLink, rhPanel, rhPill, rhTitle } from "./RunHistoryStyles";

export function RunHistoryNextActionPanel({ plan }: { plan: RunHistoryNextActionPlan }) {
  return (
    <section style={rhPanel} data-codexforge-run-history-next-action-panel="RunHistoryNextActionPanel renders next action routes validation failed to closed-loop next action routes needs review to workflow-results one primary action visible no command execution buttons">
      <h2 style={rhTitle}>Next action</h2>
      <span style={rhPill}>{plan.selected.requiresReview ? "Review required" : "Ready after review"}</span>
      {summarizeRunHistoryNextAction(plan).map((line) => <p key={`run-history-next-action-${line.slice(0, 30)}`} style={rhCopy}>{line}</p>)}
      <a href={plan.selected.route} style={rhLink}>{plan.selected.label}</a>
    </section>
  );
}
