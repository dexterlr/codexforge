import { buildPatchApprovalBoundary } from "./patch-approval";
import { buildPatchRiskBoard } from "./patch-risk";
import { buildPatchRollbackPlan } from "./patch-rollback";
import { buildPatchTestPlan } from "./patch-test-plan";
import {
  buildPatchPreviewDiffPlaceholder,
  selectPatchPreviewNextAction,
  summarizePatchPreviewPlan,
} from "./patch-preview-summary";
import type {
  CodexForgePatchPreviewPlan,
  CodexForgePatchPreviewPlanInput,
  CodexForgePatchPreviewStep,
  CodexForgePatchPreviewStepId,
  CodexForgePatchPreviewStepStatus,
} from "./patch-preview-types";

function normalizePath(path: string): string {
  return path.trim().replace(/\\/g, "/");
}

function stableId(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9._/-]+/g, "-")
    .replace(/[/-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values.filter((value) => value.trim().length > 0)));
}

function inferSafetyCritical(path: string, role: string): boolean {
  const text = `${path} ${role}`.toLowerCase();
  return ["policy", "guard", "approval", "broker", "camera", "pc", "trading", "runtime", "route.ts"].some((hint) =>
    text.includes(hint)
  );
}

export function buildPatchPreviewStep(
  id: CodexForgePatchPreviewStepId,
  status: CodexForgePatchPreviewStepStatus = "ready"
): CodexForgePatchPreviewStep {
  const labels: Record<CodexForgePatchPreviewStepId, string> = {
    inspect: "Inspect selected file",
    context: "Attach Brain context",
    plan: "Build safe edit plan",
    "preview-diff": "Preview diff only",
    "test-plan": "Suggest validations",
    "approval-boundary": "Hold approval boundary",
    rollback: "Prepare rollback notes",
  };
  const details: Record<CodexForgePatchPreviewStepId, string> = {
    inspect: "Read the selected file and related context before proposing edits.",
    context: "Summarize deterministic Brain memory and capability posture.",
    plan: "Describe expected touched files and ordered preview steps.",
    "preview-diff": "Show placeholder diff intent only; no file mutation is available.",
    "test-plan": "Select build, diff, and smoke checks by file path.",
    "approval-boundary": "Apply remains blocked in Phase 6 until a future guarded approval path exists.",
    rollback: "Record review, revert, and smoke-output preservation guidance.",
  };

  return {
    id,
    label: labels[id],
    status,
    detail: details[id],
  };
}

export function buildPatchPreviewPlan(
  input: CodexForgePatchPreviewPlanInput
): CodexForgePatchPreviewPlan {
  const selectedFilePath = normalizePath(input.selectedFilePath);
  const fileRole = input.fileRole?.trim() || "Selected project file";
  const goal =
    input.goal?.trim() ||
    `Prepare a preview-only patch plan for ${selectedFilePath}.`;
  const relatedBrainMemoryCount = input.relatedBrainMemoryCount ?? 0;
  const expectedTouchedFiles = unique([
    selectedFilePath,
    ...(input.expectedTouchedFiles ?? []),
  ]).slice(0, 6);
  const appearsSafetyCritical =
    input.appearsSafetyCritical ?? inferSafetyCritical(selectedFilePath, fileRole);
  const approvalBoundary = buildPatchApprovalBoundary();
  const testPlan = buildPatchTestPlan(selectedFilePath);
  const hasTestsOrSmokeScripts =
    input.hasTestsOrSmokeScripts ?? testPlan.smokeTests.length > 0;
  const riskBoard = buildPatchRiskBoard({
    filePath: selectedFilePath,
    fileRole,
    relatedBrainMemoryCount,
    hasTestsOrSmokeScripts,
    appearsSafetyCritical,
    requiresApproval: input.requiresApproval ?? true,
  });
  const rollbackPlan = buildPatchRollbackPlan(selectedFilePath);
  const previewSteps: CodexForgePatchPreviewStep[] = [
    buildPatchPreviewStep("inspect", "current"),
    buildPatchPreviewStep("context", relatedBrainMemoryCount > 0 ? "ready" : "blocked"),
    buildPatchPreviewStep("plan", "ready"),
    buildPatchPreviewStep("preview-diff", "ready"),
    buildPatchPreviewStep("test-plan", "ready"),
    buildPatchPreviewStep("approval-boundary", "blocked"),
    buildPatchPreviewStep("rollback", "ready"),
  ];
  const diffPreviewPlaceholder = buildPatchPreviewDiffPlaceholder({
    selectedFilePath,
    expectedTouchedFiles,
    goal,
  });
  const plan: CodexForgePatchPreviewPlan = {
    id: `patch-preview-${stableId(selectedFilePath) || "unselected"}`,
    selectedFilePath,
    goal,
    fileRole,
    relatedBrainContextSummary:
      input.relatedBrainContextSummary?.trim() ||
      `${relatedBrainMemoryCount} related Brain memories available for deterministic preview planning.`,
    capabilityPolicyPosture:
      input.capabilityPolicyPosture?.trim() ||
      "Preview allowed; apply, mutation, command execution, broker, PC, and camera actions blocked.",
    expectedTouchedFiles,
    previewSteps,
    riskLevel: riskBoard.level,
    riskBoard,
    approvalBoundary,
    suggestedTests: testPlan.suggestedTests,
    testPlan,
    rollbackNotes: rollbackPlan.notes,
    rollbackPlan,
    diffPreviewPlaceholder,
    noMutationGuarantee:
      "No file mutation, command execution, apply-diff, write-file, or Brain graph mutation is performed by this preview plan.",
    nextAction: "Prepare preview plan and keep apply blocked.",
  };

  return {
    ...plan,
    nextAction: selectPatchPreviewNextAction(plan),
  };
}

export {
  buildPatchPreviewDiffPlaceholder,
  selectPatchPreviewNextAction,
  summarizePatchPreviewPlan,
};
