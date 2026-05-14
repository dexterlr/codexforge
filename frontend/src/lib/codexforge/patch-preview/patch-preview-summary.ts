import type { CodexForgePatchPreviewPlan } from "./patch-preview-types";

export function summarizePatchPreviewPlan(plan: CodexForgePatchPreviewPlan): string {
  return `${plan.riskLevel} risk preview-only patch plan for ${plan.selectedFilePath}. ${plan.noMutationGuarantee}`;
}

export function buildPatchPreviewDiffPlaceholder(plan: {
  selectedFilePath: string;
  expectedTouchedFiles: string[];
  goal: string;
}): string {
  return [
    "Preview diff placeholder",
    "",
    `Target: ${plan.selectedFilePath}`,
    `Goal: ${plan.goal}`,
    "",
    "Expected touched files:",
    ...plan.expectedTouchedFiles.map((filePath) => `- ${filePath}`),
    "",
    "No patch has been generated or applied in Phase 6.",
    "A future approved phase may produce a real unified diff after inspection.",
  ].join("\n");
}

export function selectPatchPreviewNextAction(plan: CodexForgePatchPreviewPlan): string {
  if (plan.approvalBoundary.applyBlocked) {
    return "Prepare preview plan and keep apply blocked.";
  }

  const blocked = plan.previewSteps.find((step) => step.status === "blocked");
  return blocked?.detail ?? "Review preview diff before any guarded approval.";
}
