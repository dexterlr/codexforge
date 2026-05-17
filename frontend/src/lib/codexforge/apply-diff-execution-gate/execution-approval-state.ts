import {
  buildApplyDiffExecutionGateStableKey,
  sameApplyDiffExecutionGateStringSet,
  uniqueApplyDiffExecutionGateStrings,
  type ApplyExecutionApprovalState,
  type ApplyExecutionApprovalStateSource,
  type ApplyExecutionGateValidation,
} from "./apply-execution-gate-types";

function buildMissingAcknowledgements(state: Omit<ApplyExecutionApprovalState, "missingAcknowledgements" | "satisfied">): string[] {
  const missing: string[] = [];

  if (!state.explicitOperatorApproval) missing.push("Explicit operator approval required.");
  if (!state.approvalId.trim()) missing.push("Approval id required.");
  if (!state.approvalLabel.trim()) missing.push("Approval label required.");
  if (!state.approvalNote.trim()) missing.push("Approval note required.");
  if (!state.acknowledgedRollbackPlan) missing.push("Rollback plan acknowledgement required.");
  if (!state.acknowledgedVerificationPlan) missing.push("Verification plan acknowledgement required.");
  if (!state.acknowledgedMutationRisk) missing.push("Mutation risk acknowledgement required.");
  if (!state.acknowledgedCurrentFileVerification) missing.push("Current file verification acknowledgement required.");
  if (!state.acknowledgedNoSilentExecution) missing.push("No silent execution acknowledgement required.");
  if (!state.acknowledgedPolicyBoundary) missing.push("Execute route policy boundary acknowledgement required.");
  if (!state.highRiskExtraAcknowledged) {
    missing.push("High/critical risk acknowledgement required.");
  }

  return missing;
}

export function buildApplyExecutionApprovalState(
  source: ApplyExecutionApprovalStateSource
): ApplyExecutionApprovalState {
  const input = source.input;
  const acknowledgedTargetFiles = uniqueApplyDiffExecutionGateStrings(source.acknowledgedTargetFiles ?? []);
  const highRiskRequired = input.riskLevel === "high" || input.riskLevel === "critical";
  const base = {
    id: `apply-diff-execution-approval:${buildApplyDiffExecutionGateStableKey(input.id, source.approvalId ?? input.approvalPacketId)}`,
    executionGateId: input.id,
    explicitOperatorApproval: source.explicitOperatorApproval === true,
    approvalId: String(source.approvalId ?? input.approvalPacketId).trim(),
    approvalLabel: String(source.approvalLabel ?? `apply-diff approval for ${input.id}`).trim(),
    approvalNote: String(source.approvalNote ?? "").trim(),
    acknowledgedTargetFiles,
    acknowledgedRollbackPlan: source.acknowledgedRollbackPlan === true,
    acknowledgedVerificationPlan: source.acknowledgedVerificationPlan === true,
    acknowledgedMutationRisk: source.acknowledgedMutationRisk === true,
    acknowledgedCurrentFileVerification: source.acknowledgedCurrentFileVerification === true,
    acknowledgedNoSilentExecution: source.acknowledgedNoSilentExecution === true,
    acknowledgedPolicyBoundary: source.acknowledgedPolicyBoundary === true,
    highRiskExtraAcknowledged: highRiskRequired ? source.highRiskExtraAcknowledged === true : true,
    approvedAtLabel: String(source.approvedAtLabel ?? "not-approved").trim(),
    approvalSource: String(source.approvalSource ?? "local-operator-review").trim(),
  };
  const missing = buildMissingAcknowledgements(base);
  const targetFilesMatch = sameApplyDiffExecutionGateStringSet(acknowledgedTargetFiles, input.targetFiles);
  if (!targetFilesMatch) missing.push("Acknowledged target files must match the execution gate target files.");

  return {
    ...base,
    missingAcknowledgements: uniqueApplyDiffExecutionGateStrings(missing),
    satisfied: missing.length === 0,
  };
}

export function validateApplyExecutionApprovalState(
  state: ApplyExecutionApprovalState
): ApplyExecutionGateValidation {
  const blockedReasons = [...state.missingAcknowledgements];

  return {
    valid: blockedReasons.length === 0,
    blockedReasons,
    warnings: state.explicitOperatorApproval ? [] : ["Approval state defaults false until the operator approves."],
    summary: [
      state.explicitOperatorApproval
        ? "Explicit operator approval is present."
        : "Explicit operator approval required; approval state defaults false.",
      `Approval id ${state.approvalId || "missing"}; approved at label/source, not timestamp: ${state.approvedAtLabel} from ${state.approvalSource}.`,
      "Missing acknowledgement blocks request packet readiness.",
    ],
  };
}

export function summarizeApplyExecutionApprovalState(state: ApplyExecutionApprovalState): string[] {
  return [
    `Approval state ${state.id}: explicit approval=${state.explicitOperatorApproval}.`,
    `${state.acknowledgedTargetFiles.length} acknowledged target file(s).`,
    `${state.missingAcknowledgements.length} missing acknowledgement(s).`,
    "No silent execution acknowledgement and current file verification acknowledgement are required.",
  ];
}
