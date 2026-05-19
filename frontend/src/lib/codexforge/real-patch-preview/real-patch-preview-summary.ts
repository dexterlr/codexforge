import {
  buildRealPatchPreviewStableId,
  type PatchChangeRequest,
  type PatchPreviewContext,
  type RealPatchPreviewHandoff,
  type RealPatchPreviewPlan,
  type RealPatchPreviewRiskReport,
  type RealPatchPreviewRollbackPlan,
  type RealPatchPreviewSummary,
  type RealPatchPreviewTestPlan,
  type UnifiedDiffPreview,
} from "./real-patch-preview-types";

export function buildRealPatchPreviewSummary(input: {
  request?: PatchChangeRequest | null;
  context?: PatchPreviewContext | null;
  plan?: RealPatchPreviewPlan | null;
  diffPreview?: UnifiedDiffPreview | null;
  riskReport?: RealPatchPreviewRiskReport | null;
  testPlan?: RealPatchPreviewTestPlan | null;
  rollbackPlan?: RealPatchPreviewRollbackPlan | null;
  handoff?: RealPatchPreviewHandoff | null;
}): RealPatchPreviewSummary {
  const requestReady = input.request?.validation.valid === true;
  const contextReady = Boolean(input.context?.sourceContentSupplied && input.context.contentExcerpt.length > 0);
  const planReady = Boolean(input.plan);
  const diffPreviewReady = Boolean(input.diffPreview?.previewOnlyLabel);
  const riskLevel = input.riskReport?.level ?? "blocked";
  const testCount = input.testPlan?.commands.length ?? 0;
  const rollbackReady = Boolean(input.rollbackPlan?.notes.length);
  const nextSafeAction =
    requestReady && contextReady && planReady && diffPreviewReady
      ? "Review the preview-only diff, then copy the patch review prompt or apply-gate handoff."
      : "Select and read a file, then enter a requested change before preparing preview.";
  const summary: RealPatchPreviewSummary = {
    id: buildRealPatchPreviewStableId(
      "real-patch-summary",
      input.request?.id ?? "no-request",
      input.context?.id ?? "no-context",
      input.diffPreview?.id ?? "no-diff"
    ),
    requestReady,
    contextReady,
    planReady,
    diffPreviewReady,
    riskLevel,
    testCount,
    rollbackReady,
    nextSafeAction,
    summary: "",
  };

  return {
    ...summary,
    summary: summarizeRealPatchPreviewSession(summary),
  };
}

export function summarizeRealPatchPreviewSession(summary: RealPatchPreviewSummary): string {
  return `Real Patch Preview: request ${summary.requestReady ? "ready" : "not ready"}, context ${summary.contextReady ? "ready" : "not ready"}, plan ${summary.planReady ? "ready" : "not ready"}, diff ${summary.diffPreviewReady ? "ready" : "not ready"}, risk ${summary.riskLevel}, ${summary.testCount} test command(s), rollback ${summary.rollbackReady ? "ready" : "not ready"}.`;
}
