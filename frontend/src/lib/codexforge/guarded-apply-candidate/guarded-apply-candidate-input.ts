import {
  buildGuardedApplyCandidateStableId,
  normalizeGuardedApplyCandidatePath,
  normalizeGuardedApplyCandidateSummary,
  type GuardedApplyCandidateInput,
  type GuardedApplyCandidateInputSource,
  type GuardedApplyCandidateInputValidation,
  type GuardedApplyCandidateTargetMode,
} from "./guarded-apply-candidate-types";

const TARGET_MODES: readonly GuardedApplyCandidateTargetMode[] = [
  "design-only",
  "dry-run-candidate",
  "guarded-apply-candidate",
  "blocked",
  "unknown",
];

function normalizeTargetMode(value: GuardedApplyCandidateInputSource["targetMode"]): GuardedApplyCandidateTargetMode {
  return TARGET_MODES.includes(value as GuardedApplyCandidateTargetMode)
    ? (value as GuardedApplyCandidateTargetMode)
    : "design-only";
}

export function validateGuardedApplyCandidateInput(
  input: Pick<GuardedApplyCandidateInput, "selectedFilePath" | "sourcePreviewId" | "targetMode" | "operatorIntent">
): GuardedApplyCandidateInputValidation {
  const blockedReasons: string[] = [];
  const warnings: string[] = [];
  if (!input.selectedFilePath) warnings.push("Candidate input has no selected file yet.");
  if (!input.sourcePreviewId) blockedReasons.push("Candidate input requires one preview diff before implementation planning.");
  if (input.targetMode === "unknown") warnings.push("Candidate target mode is unknown.");
  if (input.targetMode === "guarded-apply-candidate") warnings.push("Guarded apply candidate is still design-only in Phase 83.");
  if (!input.operatorIntent) warnings.push("Operator intent should be stated before approval.");
  return {
    valid: blockedReasons.length === 0,
    blockedReasons,
    warnings,
    summary: [
      `${blockedReasons.length} input blocker(s), ${warnings.length} warning(s).`,
      "Input performs no execution, no file writes, no provider calls, and no UI mutation.",
    ],
  };
}

export function buildGuardedApplyCandidateInput(
  source: GuardedApplyCandidateInputSource = {}
): GuardedApplyCandidateInput {
  const selectedFilePath = source.selectedFilePath ? normalizeGuardedApplyCandidatePath(source.selectedFilePath) : "";
  const sourcePreviewId = source.sourcePreviewId?.trim() ?? "";
  const targetMode = normalizeTargetMode(source.targetMode);
  const candidateId = buildGuardedApplyCandidateStableId(
    "candidate",
    selectedFilePath || "no-file",
    sourcePreviewId || "no-preview",
    targetMode
  );
  const draft: Omit<GuardedApplyCandidateInput, "validation" | "summary"> = {
    id: candidateId,
    candidateId,
    sourceGuardReviewId: source.sourceGuardReviewId?.trim() ?? "",
    sourceApplyRequestId: source.sourceApplyRequestId?.trim() ?? "",
    sourcePreviewId,
    selectedFilePath,
    diffSummary: normalizeGuardedApplyCandidateSummary(source.diffSummary),
    approvalSummary: normalizeGuardedApplyCandidateSummary(source.approvalSummary),
    rollbackSummary: normalizeGuardedApplyCandidateSummary(source.rollbackSummary),
    validationSummary: normalizeGuardedApplyCandidateSummary(source.validationSummary),
    targetMode,
    operatorIntent: source.operatorIntent?.trim() ?? "Plan the smallest safe one-file guarded apply candidate.",
    noAutoApplyGuarantee: true,
    noAutoRunGuarantee: true,
    latestMessageAuthorityReminder:
      "Preserve latest-message authority: approval is invalid if the newest request, file, or exact diff changes.",
  };
  const validation = validateGuardedApplyCandidateInput(draft);
  const input = { ...draft, validation, summary: [] };
  return { ...input, summary: summarizeGuardedApplyCandidateInput(input) };
}

export function summarizeGuardedApplyCandidateInput(input: GuardedApplyCandidateInput): string[] {
  return [
    `Candidate ${input.candidateId} targets ${input.targetMode}.`,
    input.selectedFilePath ? `Selected one file candidate: ${input.selectedFilePath}.` : "No selected file yet.",
    "Guarantees: no auto-apply, no auto-run, no execution, no file writes.",
    input.latestMessageAuthorityReminder,
  ];
}
