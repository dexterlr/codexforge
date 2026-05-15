import type { BrainEventQueue, BrainGraphDiffPreview, BrainMergePlan, BrainMergeValidation, BrainMergeValidationIssue } from "./brain-merge-types";

export function validateBrainMergePlan(
  queue: BrainEventQueue,
  plan: BrainMergePlan
): BrainMergeValidation {
  const issues: BrainMergeValidationIssue[] = [];
  if (queue.eventCount === 0) issues.push("empty-event-queue");
  if (queue.validEventCount === 0) issues.push("no-approved-events");
  if (queue.unknownEventCount > 0) issues.push("unknown-event-type");
  if (queue.events.some((event) => event.sourceRefs.length === 0)) issues.push("missing-source-refs");
  if (plan.targetGraphVersion === null) issues.push("missing-graph-version");

  return buildValidation(issues, []);
}

export function validateBrainGraphDiff(
  diff: BrainGraphDiffPreview
): BrainMergeValidation {
  const issues: BrainMergeValidationIssue[] = [];
  if (diff.duplicateRisks.length > 0) issues.push("duplicate-graph-node-target");
  if (diff.targetGraphVersion === null) issues.push("missing-graph-version");

  return buildValidation(issues, [
    "legacy graph import risk checked: do not import legacy brain graph modules",
    "unsafe direct graph mutation wording checked: preview does not mutate graph",
  ]);
}

function buildValidation(
  issues: BrainMergeValidationIssue[],
  warnings: string[]
): BrainMergeValidation {
  const uniqueIssues = Array.from(new Set(issues));
  const validation: BrainMergeValidation = {
    id: "brain-merge-validation",
    state: uniqueIssues.length > 0 ? "blocked" : warnings.length > 0 ? "review" : "valid",
    issues: uniqueIssues,
    warnings,
    summary: [],
  };

  return { ...validation, summary: summarizeBrainMergeValidation(validation) };
}

export function summarizeBrainMergeValidation(validation: BrainMergeValidation): string[] {
  return [
    `Validation state: ${validation.state}.`,
    validation.issues.length
      ? `Detected issues: ${validation.issues.join(", ")}.`
      : "No blocking merge validation issues detected.",
    "Validation detects duplicate/conflict risk, missing source refs, schema gaps, legacy graph import risk, and unsafe direct graph mutation wording.",
  ];
}
