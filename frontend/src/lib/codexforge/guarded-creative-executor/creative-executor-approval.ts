import type {
  CreativeExecutorApprovalPacket,
  CreativeExecutorRequest,
  CreativeExecutorValidation,
} from "./guarded-creative-executor-types";
import { buildCreativeExecutorStableId } from "./guarded-creative-executor-types";
import { buildCreativeExecutorRequest } from "./creative-executor-request";

export function buildCreativeExecutorApprovalPacket(
  request: CreativeExecutorRequest = buildCreativeExecutorRequest(),
  input: Partial<CreativeExecutorApprovalPacket> = {}
): CreativeExecutorApprovalPacket {
  return {
    approvalId:
      input.approvalId ??
      buildCreativeExecutorStableId("creative-executor-approval", [request.requestId]),
    executorRequestId: input.executorRequestId ?? request.requestId,
    approved: input.approved ?? false,
    approvalNote:
      input.approvalNote ??
      "Approval packet is review-only in Phase 67 and does not execute automatically.",
    acknowledgedAdapter: input.acknowledgedAdapter ?? false,
    acknowledgedExecutorKind: input.acknowledgedExecutorKind ?? false,
    acknowledgedLocalAppRequirement: input.acknowledgedLocalAppRequirement ?? false,
    acknowledgedSideEffects: input.acknowledgedSideEffects ?? false,
    acknowledgedArtifactOutputBoundary: input.acknowledgedArtifactOutputBoundary ?? false,
    acknowledgedResourceTimeRisk: input.acknowledgedResourceTimeRisk ?? false,
    acknowledgedCancellationLimits: input.acknowledgedCancellationLimits ?? false,
    acknowledgedRollbackLimitations: input.acknowledgedRollbackLimitations ?? false,
    acknowledgedDryRunFirst: input.acknowledgedDryRunFirst ?? false,
    acknowledgedLatestMessageAuthority: input.acknowledgedLatestMessageAuthority ?? false,
  };
}

export function validateCreativeExecutorApprovalPacket(
  approval: CreativeExecutorApprovalPacket
): CreativeExecutorValidation {
  const acknowledgements = [
    ["adapter acknowledgement required", approval.acknowledgedAdapter],
    ["executor kind acknowledgement required", approval.acknowledgedExecutorKind],
    ["local app requirement acknowledgement required", approval.acknowledgedLocalAppRequirement],
    ["side effects acknowledgement required", approval.acknowledgedSideEffects],
    ["artifact output boundary acknowledgement required", approval.acknowledgedArtifactOutputBoundary],
    ["resource/time risk acknowledgement required", approval.acknowledgedResourceTimeRisk],
    ["cancellation limits acknowledgement required", approval.acknowledgedCancellationLimits],
    ["rollback limitations acknowledgement required", approval.acknowledgedRollbackLimitations],
    ["dry-run first acknowledgement required", approval.acknowledgedDryRunFirst],
    ["latest-message authority acknowledgement required", approval.acknowledgedLatestMessageAuthority],
  ] as const;
  const blockedReasons = [
    approval.approvalId ? "" : "approval id required",
    approval.executorRequestId ? "" : "executor request id required",
    ...acknowledgements.map(([reason, ok]) => (ok ? "" : reason)),
  ].filter(Boolean);

  return {
    valid: approval.approved === true && blockedReasons.length === 0,
    blockedReasons,
    warnings: [
      "Approval does not execute automatically.",
      approval.approved ? "Approved flag still cannot unlock real execution in Phase 67." : "Approval defaults approved false.",
    ],
  };
}

export function summarizeCreativeExecutorApprovalPacket(
  approval: CreativeExecutorApprovalPacket
): string[] {
  return [
    `${approval.approvalId} targets ${approval.executorRequestId}.`,
    `Approved: ${String(approval.approved)}.`,
    "Missing acknowledgements block readiness.",
    "Approval packet is copy/review only and does not execute automatically.",
  ];
}
