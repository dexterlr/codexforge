import {
  buildPreviewDiffComposerStableKey,
  type DiffChangePlan,
  type DiffChangePlanStep,
  type DiffCompositionInput,
} from "./preview-diff-composer-types";

export function buildDiffChangePlanStep(id: string, label: string, detail: string, reviewGate = true): DiffChangePlanStep {
  return { id, label, detail, reviewGate };
}

export function buildDiffChangePlan(input: DiffCompositionInput): DiffChangePlan {
  const steps = [
    buildDiffChangePlanStep("inspect-current-file", "Inspect current file", `Open and inspect ${input.primaryFile} before writing any real diff.`),
    buildDiffChangePlanStep("confirm-evidence", "Confirm evidence still applies", "Treat evidence as context, not proof, and discard stale assumptions."),
    buildDiffChangePlanStep("locate-symbols", "Locate affected symbols", "Find the exact component, function, route, or test surface in current content."),
    buildDiffChangePlanStep("minimal-edit", "Make minimal edit", "After approval, edit only the smallest area needed for the reviewed intent."),
    buildDiffChangePlanStep("run-suggested-checks", "Run suggested checks", "Use the verification plan only after explicit command approval."),
    buildDiffChangePlanStep("review-diff", "Review diff", "Review git diff and Safe Patch Preview output before any apply path."),
    buildDiffChangePlanStep("update-memory-after-review", "Update memory only after review", "Do not auto-promote memory or merge graph events from this composer."),
  ];

  return {
    id: `preview-diff-change-plan-${buildPreviewDiffComposerStableKey(input.id)}`,
    compositionInputId: input.id,
    steps,
    summary: summarizeDiffChangePlan({ id: "pending", compositionInputId: input.id, steps, summary: [] }),
  };
}

export function summarizeDiffChangePlan(plan: DiffChangePlan): string[] {
  return [
    `${plan.steps.length} review-gated change steps prepared.`,
    "Plan starts with inspection and ends with review; it does not auto-run or auto-write.",
  ];
}
