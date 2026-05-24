import {
  buildRealApplyGuardReviewStableId,
  normalizeApplyGuardPath,
  normalizeApplyGuardSummary,
  uniqueApplyGuardStrings,
  type ApplyGuardReviewInput,
  type ApplyGuardReviewInputSource,
  type ApplyGuardReviewValidation,
  type ApplyGuardTargetReadinessLevel,
} from "./real-apply-guard-review-types";

const READINESS_LEVELS: readonly ApplyGuardTargetReadinessLevel[] = [
  "review-only",
  "dry-run-ready",
  "guarded-apply-candidate",
  "blocked",
  "unknown",
];

function normalizeReadiness(value: ApplyGuardTargetReadinessLevel | null | undefined): ApplyGuardTargetReadinessLevel {
  return value && READINESS_LEVELS.includes(value) ? value : "review-only";
}

export function buildApplyGuardReviewInput(source: ApplyGuardReviewInputSource = {}): ApplyGuardReviewInput {
  const selectedFilePath = source.selectedFilePath ? normalizeApplyGuardPath(source.selectedFilePath) : null;
  const touchedFiles = uniqueApplyGuardStrings((source.touchedFiles ?? []).map((file) => normalizeApplyGuardPath(file)));
  const targetReadinessLevel = normalizeReadiness(source.targetReadinessLevel);
  const sourceApplyRequestId = source.sourceApplyRequestId?.trim() || null;
  const reviewId = buildRealApplyGuardReviewStableId(
    "real-apply-guard-review",
    sourceApplyRequestId ?? "missing-apply-request",
    selectedFilePath ?? "missing-selected-file",
    targetReadinessLevel
  );
  const input: ApplyGuardReviewInput = {
    id: reviewId,
    reviewId,
    sourcePreviewId: source.sourcePreviewId?.trim() || null,
    sourceApplyRequestId,
    selectedFilePath,
    touchedFiles,
    diffSummary: normalizeApplyGuardSummary(source.diffSummary),
    approvalSummary: normalizeApplyGuardSummary(source.approvalSummary),
    rollbackSummary: normalizeApplyGuardSummary(source.rollbackSummary),
    validationSummary: normalizeApplyGuardSummary(source.validationSummary),
    operatorIntent: source.operatorIntent?.trim() || "Review the guarded apply path before any execution expansion.",
    targetReadinessLevel,
    noAutoApplyGuarantee: true,
    noAutoRunGuarantee: true,
    latestMessageAuthorityReminder: "Preserve latest-message authority: the newest operator request controls review scope.",
    executionAllowed: false,
    source,
    validation: { valid: false, blockedReasons: [], warnings: [], summary: [] },
    summary: [],
  };

  const validation = validateApplyGuardReviewInput(input);
  return { ...input, validation, summary: summarizeApplyGuardReviewInput({ ...input, validation }) };
}

export function validateApplyGuardReviewInput(input: ApplyGuardReviewInput): ApplyGuardReviewValidation {
  const blockedReasons: string[] = [];
  const warnings: string[] = [];

  if (!input.sourceApplyRequestId) warnings.push("Source apply request id is recommended for approval packet traceability.");
  if (!input.selectedFilePath) warnings.push("Selected file path is missing; diff and path boundary review will stay conservative.");
  if (input.touchedFiles.length < 1) warnings.push("Touched files are not supplied; review cannot prove file scope.");
  if (input.diffSummary.length < 1 && !input.source.diffText) blockedReasons.push("Preview diff or diff summary is required before apply guard review can pass.");
  if (input.approvalSummary.length < 1 && input.source.approvalPacketExists !== true) blockedReasons.push("Approval summary or approval packet evidence is required.");
  if (input.rollbackSummary.length < 1 && input.source.rollbackAvailable !== true) blockedReasons.push("Rollback summary is required before a guarded apply candidate.");
  if (input.validationSummary.length < 1 && input.source.validationRouteAvailable !== true) blockedReasons.push("Validation summary or route evidence is required after apply.");

  return {
    valid: blockedReasons.length === 0,
    blockedReasons: Array.from(new Set(blockedReasons)).sort(),
    warnings: Array.from(new Set(warnings)).sort(),
    summary: [
      `Review input valid=${blockedReasons.length === 0}.`,
      "No execution, no file writes, no auto-apply, and no auto-run are allowed by this input model.",
      "Review id is deterministic from source apply request id, selected file path, and target readiness level.",
    ],
  };
}

export function summarizeApplyGuardReviewInput(input: ApplyGuardReviewInput): string[] {
  return [
    `Review ${input.reviewId} targets ${input.targetReadinessLevel}.`,
    `${input.touchedFiles.length} touched file(s) supplied.`,
    `Input blockers=${input.validation.blockedReasons.length}; warnings=${input.validation.warnings.length}.`,
    "executionAllowed false in Phase 82.",
    input.latestMessageAuthorityReminder,
  ];
}
