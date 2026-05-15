import { buildDiffApprovalBoundary } from "./diff-approval-boundary";
import { buildDiffChangePlan } from "./diff-change-plan";
import { buildDiffCompositionInput, validateDiffCompositionInput } from "./diff-composition-input";
import { buildDiffIntentModel } from "./diff-intent-model";
import { buildDiffRollbackPlan } from "./diff-rollback-plan";
import { buildDiffVerificationPlan } from "./diff-verification-plan";
import { buildPseudoDiffPreview } from "./pseudo-diff-builder";
import type {
  DiffCompositionInput,
  DiffCompositionInputSource,
  PreviewDiffComposerSession,
  PreviewDiffComposerSummary,
  PseudoDiffPreview,
} from "./preview-diff-composer-types";

export function buildPreviewDiffComposerSummary(
  input: DiffCompositionInput,
  pseudoDiff: PseudoDiffPreview,
  verificationCount: number,
  blockedActions: readonly string[]
): PreviewDiffComposerSummary {
  const pseudoHunkCount = pseudoDiff.files.reduce((count, file) => count + file.pseudoHunks.length, 0);
  return {
    id: "preview-diff-composer-summary",
    targetFileCount: input.targetFiles.length,
    pseudoHunkCount,
    confidence: input.confidence,
    risk: input.riskLevel,
    verificationCount,
    blockedActions: [...blockedActions],
    nextSafeAction: "Compose preview diff, inspect current files, then route any real change through Safe Patch Preview.",
    summary: [
      `${input.targetFiles.length} target file(s), ${pseudoHunkCount} pseudo hunk(s), ${verificationCount} verification check(s).`,
      `Risk ${input.riskLevel}; confidence ${input.confidence}.`,
      "Next safe action: Compose preview diff for review only.",
    ],
  };
}

export function summarizePreviewDiffComposerSession(session: PreviewDiffComposerSession): string[] {
  return [
    ...session.summary.summary,
    `Apply blocked: ${session.approvalBoundary.applyBlocked}. Write blocked: ${session.approvalBoundary.writeBlocked}.`,
    "Implementation prompt is copyable but not auto-sent.",
  ];
}

export function buildPreviewDiffComposerPrompt(session: Omit<PreviewDiffComposerSession, "implementationPrompt">): string {
  return [
    "Preview Diff Composer implementation prompt",
    "",
    "Inspect current files first.",
    "Current file content is authority.",
    "Evidence is context, not proof.",
    "Use Safe Patch Preview before any real patch.",
    "No file writes without approval.",
    "No command execution without approval.",
    "Preserve latest-message authority.",
    "",
    `Goal: ${session.input.goal}`,
    `Queue item: ${session.input.queueItemId}`,
    `Source grounded fix: ${session.input.sourceGroundedFixId}`,
    `Primary file: ${session.input.primaryFile}`,
    `Target files: ${session.input.targetFiles.join(", ")}`,
    `Risk: ${session.input.riskLevel}`,
    `Confidence: ${session.input.confidence}`,
    `Recommended approach: ${session.input.recommendedApproach}`,
    `Pseudo diff summary: ${session.pseudoDiff.summary.join(" ")}`,
    `Change plan: ${session.changePlan.steps.map((step) => step.label).join(" -> ")}`,
    `Verification plan: ${session.verificationPlan.checks.join("; ")}`,
    `Rollback plan: ${session.rollbackPlan.notes.join(" ")}`,
    `Blocked actions: ${session.approvalBoundary.blockedActions.join(", ")}`,
  ].join("\n");
}

export function buildPreviewDiffComposerSession(source: DiffCompositionInputSource): PreviewDiffComposerSession {
  const input = buildDiffCompositionInput(source);
  const validation = validateDiffCompositionInput(input);
  const intent = buildDiffIntentModel(input);
  const pseudoDiff = buildPseudoDiffPreview(input, intent);
  const changePlan = buildDiffChangePlan(input);
  const verificationPlan = buildDiffVerificationPlan(input);
  const rollbackPlan = buildDiffRollbackPlan(input);
  const approvalBoundary = buildDiffApprovalBoundary();
  const summary = buildPreviewDiffComposerSummary(
    input,
    pseudoDiff,
    verificationPlan.checks.length,
    approvalBoundary.blockedActions
  );
  const partial = { input, validation, intent, pseudoDiff, changePlan, verificationPlan, rollbackPlan, approvalBoundary, summary };
  const implementationPrompt = buildPreviewDiffComposerPrompt(partial);
  return { ...partial, implementationPrompt };
}
