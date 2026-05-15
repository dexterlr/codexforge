import {
  type StepRunnerInput,
  type StepRunnerResultPreview,
  type StepRunnerToolPlan,
} from "./step-runner-preview-types";

export function buildStepRunnerResultPreview(args: {
  input: StepRunnerInput;
  toolPlan: StepRunnerToolPlan;
}): StepRunnerResultPreview {
  const expectedArtifacts =
    args.input.relatedArtifacts.length > 0
      ? args.input.relatedArtifacts.map((artifact) => artifact.label)
      : ["Expected artifact list is preview-only and depends on a future approved run."];
  const draft: StepRunnerResultPreview = {
    id: "step-runner-result-preview",
    inputId: args.input.id,
    expectedSuccessfulOutput: `Expected successful output only: future approved run would report completion evidence for "${args.input.stepLabel}" and the proposed ${args.toolPlan.proposedTool.toolName} posture.`,
    expectedFailureModes: [
      "Policy blocks the proposed tool or readiness is missing.",
      "Required approval is absent, rejected, or mismatched to the selected step.",
      "Safe Patch Preview, Memory Review, or Brain Merge Review is missing for the declared mutation intent.",
      "Future tests fail after an explicitly approved run.",
    ],
    expectedArtifacts,
    expectedGraphMemoryNotes: [
      "Expected graph notes remain preview-only; no Brain graph mutation is performed.",
      "Expected memory notes remain preview-only; memory mutation requires Memory Review.",
    ],
    expectedTestEvidence: [
      "Expected test evidence should include future command output only after approval.",
      "npm run build, git diff --check, and Step Runner Preview smoke should be shown after a future approved implementation path.",
    ],
    postExecutionDisplay: [
      "Show actual tool policy decision.",
      "Show actual approval id and operator note.",
      "Show actual files inspected or changed by the future run.",
      "Show actual test evidence and rollback note.",
    ],
    previewOnlyNotice:
      "Result Preview is preview-only expected output; it does not fabricate an execution result.",
    summary: [],
  };

  return {
    ...draft,
    summary: summarizeStepRunnerResultPreview(draft),
  };
}

export function summarizeStepRunnerResultPreview(
  preview: StepRunnerResultPreview
): string[] {
  return [
    preview.expectedSuccessfulOutput,
    `${preview.expectedFailureModes.length} expected failure modes are visible.`,
    `${preview.expectedArtifacts.length} expected artifacts and ${preview.expectedTestEvidence.length} expected test evidence notes are previewed.`,
    preview.previewOnlyNotice,
  ];
}
