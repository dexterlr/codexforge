import {
  buildApplyEvidencePackStableKey,
  uniqueApplyEvidenceStrings,
  type ApplyEvidenceInput,
  type ApplyEvidenceInputSource,
  type ApplyEvidenceRef,
  type ApplyEvidenceRiskLevel,
} from "./apply-evidence-pack-types";

function normalizeRiskLevel(value: ApplyEvidenceInputSource["riskLevel"]): ApplyEvidenceRiskLevel {
  return value ?? "medium";
}

function normalizeEvidenceRefs(values: readonly ApplyEvidenceRef[] | undefined): ApplyEvidenceRef[] {
  const refs = values ?? [];
  return refs
    .map((ref) => ({
      id: buildApplyEvidencePackStableKey("evidence-ref", ref.id),
      label: ref.label.trim(),
      summary: ref.summary.trim(),
    }))
    .filter((ref) => ref.label.length > 0 && ref.summary.length > 0)
    .sort((a, b) => a.id.localeCompare(b.id));
}

export function buildApplyEvidenceInput(source: ApplyEvidenceInputSource): ApplyEvidenceInput {
  const targetFiles = uniqueApplyEvidenceStrings(source.targetFiles);
  const primaryFile =
    source.primaryFile && targetFiles.includes(source.primaryFile)
      ? source.primaryFile
      : targetFiles[0] ?? "unselected";
  const previewDiffPackageId = source.previewDiffPackageId.trim();
  const applyGateId = source.applyGateId.trim();
  const queueItemId = source.queueItemId.trim();

  return {
    id: buildApplyEvidencePackStableKey("apply-evidence-input", previewDiffPackageId, applyGateId, primaryFile),
    previewDiffPackageId,
    applyGateId,
    queueItemId,
    goal: source.goal.trim(),
    targetFiles,
    primaryFile,
    previewDiffSummary: uniqueApplyEvidenceStrings(source.previewDiffSummary),
    evidenceRefs: normalizeEvidenceRefs(source.evidenceRefs),
    riskLevel: normalizeRiskLevel(source.riskLevel),
    currentFileVerificationState: source.currentFileVerificationState ?? "review-missing",
    currentFileReviewNote: source.currentFileReviewNote?.trim() ?? "",
    rollbackPlan: uniqueApplyEvidenceStrings(source.rollbackPlan ?? []),
    testPlan: uniqueApplyEvidenceStrings(source.testPlan ?? []),
    smokeChecks: uniqueApplyEvidenceStrings(source.smokeChecks ?? []),
    operatorApprovalNote: source.operatorApprovalNote?.trim() ?? "",
    approvalState: source.approvalState ?? "not-reviewed",
    mutationFirewallAcknowledged: source.mutationFirewallAcknowledged === true,
    futureGuardedApplyAcknowledged: source.futureGuardedApplyAcknowledged === true,
    noMutationAcknowledged: source.noMutationAcknowledged === true,
    highRiskAcknowledged: source.highRiskAcknowledged === true,
    previewOnly: true,
  };
}

export function summarizeApplyEvidenceInput(input: ApplyEvidenceInput): string[] {
  return [
    `Preview diff package ${input.previewDiffPackageId}.`,
    `Apply gate ${input.applyGateId}.`,
    `${input.targetFiles.length} target file(s); primary file ${input.primaryFile}.`,
    "Generated object is a preview/review artifact only.",
  ];
}
