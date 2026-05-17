import {
  buildApplyDiffExecutionGateStableKey,
  uniqueApplyDiffExecutionGateStrings,
  type ApplyExecutionGateInput,
  type ApplyExecutionGateInputSource,
  type ApplyExecutionGateValidation,
  type ApplyExecutionPatchSourceState,
  type ApplyExecutionRealPatchAvailabilityState,
  type ApplyExecutionToolInputPreview,
} from "./apply-execution-gate-types";

function inferPatchSourceState(
  state: ApplyExecutionPatchSourceState | undefined,
  availability: ApplyExecutionRealPatchAvailabilityState | undefined
): ApplyExecutionPatchSourceState {
  if (state) return state;
  if (availability === "reviewed") return "real-patch-reviewed";
  if (availability === "available-unreviewed") return "real-patch-available-unreviewed";
  if (availability === "missing") return "real-patch-missing";
  return "pseudo-diff-only";
}

function inferRealPatchAvailability(
  state: ApplyExecutionRealPatchAvailabilityState | undefined,
  patchSourceState: ApplyExecutionPatchSourceState
): ApplyExecutionRealPatchAvailabilityState {
  if (state) return state;
  if (patchSourceState === "real-patch-reviewed") return "reviewed";
  if (patchSourceState === "real-patch-available-unreviewed") return "available-unreviewed";
  return "missing";
}

function buildToolInputPreview(
  source: ApplyExecutionGateInputSource,
  targetFiles: readonly string[]
): ApplyExecutionToolInputPreview {
  const preview = source.toolInputPreview ?? {};
  const path = String(preview.path ?? targetFiles[0] ?? "").trim();
  const patch = typeof preview.patch === "string" ? preview.patch.replace(/\r\n/g, "\n") : "";

  return {
    path,
    patch,
    ...(typeof preview.originalContent === "string" ? { originalContent: preview.originalContent } : {}),
    createIfMissing: preview.createIfMissing === true,
    dryRun: false,
    createBackup: preview.createBackup !== false,
    ensureTrailingNewline: preview.ensureTrailingNewline === true,
    ...(typeof preview.maxPatchChars === "number" && Number.isFinite(preview.maxPatchChars)
      ? { maxPatchChars: preview.maxPatchChars }
      : {}),
    ...(typeof preview.maxFileChars === "number" && Number.isFinite(preview.maxFileChars)
      ? { maxFileChars: preview.maxFileChars }
      : {}),
  };
}

export function buildApplyExecutionGateInput(source: ApplyExecutionGateInputSource): ApplyExecutionGateInput {
  const dryRunId = String(source.dryRunId || "missing-dry-run").trim();
  const approvalPacketId = String(source.approvalPacketId || "missing-approval-packet").trim();
  const queueItemId = String(source.queueItemId || "missing-queue-item").trim();
  const applyGateId = String(source.applyGateId || "missing-apply-gate").trim();
  const previewDiffCompositionId = String(
    source.previewDiffCompositionId || "missing-preview-diff-composition"
  ).trim();
  const targetFiles = uniqueApplyDiffExecutionGateStrings(source.targetFiles);
  const patchSourceState = inferPatchSourceState(source.patchSourceState, source.realPatchAvailabilityState);
  const realPatchAvailabilityState = inferRealPatchAvailability(source.realPatchAvailabilityState, patchSourceState);
  const rollbackPlan = uniqueApplyDiffExecutionGateStrings(source.rollbackPlan ?? []);
  const verificationPlan = uniqueApplyDiffExecutionGateStrings(source.verificationPlan ?? []);

  return {
    id: `apply-diff-execution-gate:${buildApplyDiffExecutionGateStableKey(dryRunId, approvalPacketId, queueItemId)}`,
    dryRunId,
    applyGateId,
    approvalPacketId,
    previewDiffCompositionId,
    queueItemId,
    goal: String(source.goal || "Prepare guarded apply-diff execution request packet.").trim(),
    targetFiles,
    dryRunStatus: source.dryRunStatus ?? "blocked",
    dryRunResultSummary: uniqueApplyDiffExecutionGateStrings(source.dryRunResultSummary ?? []),
    patchSourceState,
    realPatchAvailabilityState,
    approvalPosture: source.approvalPosture ?? "missing",
    policyPosture: source.policyPosture ?? "approval-required",
    rollbackPosture: source.rollbackPosture ?? (rollbackPlan.length > 0 ? "present" : "missing"),
    verificationPosture: source.verificationPosture ?? (verificationPlan.length > 0 ? "present" : "missing"),
    operatorAcknowledgementState: source.operatorAcknowledgementState ?? "missing",
    riskLevel: source.riskLevel ?? "medium",
    approvedTargetFiles: uniqueApplyDiffExecutionGateStrings(source.approvedTargetFiles ?? source.targetFiles),
    patchSummary: uniqueApplyDiffExecutionGateStrings(source.patchSummary ?? source.dryRunResultSummary ?? []),
    rollbackPlan,
    verificationPlan,
    evidenceRefs: uniqueApplyDiffExecutionGateStrings(source.evidenceRefs ?? []),
    toolInputPreview: buildToolInputPreview(source, targetFiles),
    deterministicInputOnly: true,
  };
}

export function validateApplyExecutionGateInput(input: ApplyExecutionGateInput): ApplyExecutionGateValidation {
  const blockedReasons: string[] = [];
  const warnings: string[] = [];

  if (!input.dryRunId.trim()) blockedReasons.push("Dry run id is required.");
  if (!input.applyGateId.trim()) blockedReasons.push("Apply gate id is required.");
  if (!input.approvalPacketId.trim()) blockedReasons.push("Approval packet id is required.");
  if (!input.previewDiffCompositionId.trim()) blockedReasons.push("Preview diff composition id is required.");
  if (!input.queueItemId.trim()) blockedReasons.push("Queue item id is required.");
  if (input.targetFiles.length < 1) blockedReasons.push("At least one target file is required.");
  if (!input.toolInputPreview.path.trim()) blockedReasons.push("apply-diff tool input preview requires a path.");
  if (!input.dryRunResultSummary.length) warnings.push("Dry run result summary should be visible before execution review.");
  if (!input.patchSummary.length) warnings.push("Patch summary should be visible before execution review.");
  if (input.patchSourceState === "pseudo-diff-only") warnings.push("Pseudo-only patch source blocks real execution.");
  if (input.realPatchAvailabilityState === "missing") warnings.push("Missing real patch blocks real execution.");
  if (input.policyPosture === "unchecked") warnings.push("Tool policy still needs confirmation.");

  return {
    valid: blockedReasons.length === 0,
    blockedReasons,
    warnings,
    summary: [
      blockedReasons.length === 0 ? "Execution gate input is structurally valid." : "Execution gate input is blocked.",
      `Execution gate ${input.id} derives from dry run ${input.dryRunId}, approval packet ${input.approvalPacketId}, and queue item ${input.queueItemId}.`,
      "Input construction is deterministic: no clock reads, no random ids, no file reads, and no hidden mutation.",
    ],
  };
}

export function summarizeApplyExecutionGateInput(input: ApplyExecutionGateInput): string[] {
  return [
    `Execution gate ${input.id} targets ${input.targetFiles.length} file(s).`,
    `Dry run status ${input.dryRunStatus}; patch source ${input.patchSourceState}; real patch ${input.realPatchAvailabilityState}.`,
    `Approval posture ${input.approvalPosture}; policy posture ${input.policyPosture}.`,
    `Rollback posture ${input.rollbackPosture}; verification posture ${input.verificationPosture}.`,
    "This input only prepares a request packet and never executes on render.",
  ];
}
