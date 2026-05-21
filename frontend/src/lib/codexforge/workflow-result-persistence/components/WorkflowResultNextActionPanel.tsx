"use client";

import Link from "next/link";
import type { WorkflowResultNextActionPlan } from "../workflow-result-types";
import { summarizeWorkflowResultNextAction } from "../workflow-result-next-action";
import { wrCopy, wrLink, wrPanel, wrTitle } from "./WorkflowResultStyles";

export function WorkflowResultNextActionPanel({ plan }: { plan: WorkflowResultNextActionPlan }) {
  return (
    <section style={wrPanel} data-codexforge-workflow-result-next-action-panel="WorkflowResultNextActionPanel renders next action routes validation failed to closed-loop next action routes validation passed to commit guidance apply pending approved patch apply preview pending real patch preview validation missing validation runner review missing workflow result review">
      <h2 style={wrTitle}>Next action</h2>
      {summarizeWorkflowResultNextAction(plan).map((line) => <p key={`workflow-result-next-action-${line.slice(0, 34)}`} style={wrCopy}>{line}</p>)}
      <Link href={plan.selected.route} style={wrLink}>Open {plan.selected.label}</Link>
    </section>
  );
}
