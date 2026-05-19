import type {
  CreativeJobApprovalPacket,
  CreativeJobRequest,
  CreativeJobValidation,
} from "./creative-local-bridge-types";
import { buildCreativeJobRequest } from "./creative-job-request";

export function buildCreativeJobApprovalPacket(
  request: CreativeJobRequest = buildCreativeJobRequest(),
  overrides: Partial<CreativeJobApprovalPacket> = {}
): CreativeJobApprovalPacket {
  return {
    approvalId: `approval-${request.requestId}`,
    jobRequestId: request.requestId,
    approved: false,
    approvalNote: "Approval packet preview only; approval does not execute anything.",
    acknowledgedAdapter: false,
    acknowledgedSideEffects: false,
    acknowledgedArtifactPath: false,
    acknowledgedLocalAppRequirement: false,
    acknowledgedNoAutomaticExecution: false,
    acknowledgedCancellationRollbackLimitations: false,
    acknowledgedLatestMessageAuthority: false,
    ...overrides,
  };
}

export function validateCreativeJobApprovalPacket(packet: CreativeJobApprovalPacket): CreativeJobValidation {
  const missing = [
    !packet.acknowledgedAdapter ? "adapter acknowledgement required" : "",
    !packet.acknowledgedSideEffects ? "side effects acknowledgement required" : "",
    !packet.acknowledgedArtifactPath ? "artifact path acknowledgement required" : "",
    !packet.acknowledgedLocalAppRequirement ? "local app requirement acknowledgement required" : "",
    !packet.acknowledgedNoAutomaticExecution ? "no automatic execution acknowledgement required" : "",
    !packet.acknowledgedCancellationRollbackLimitations ? "cancellation/rollback acknowledgement required" : "",
    !packet.acknowledgedLatestMessageAuthority ? "latest-message authority acknowledgement required" : "",
  ].filter(Boolean);

  return {
    valid: packet.approved && missing.length === 0,
    blockedReasons: packet.approved ? missing : ["approval defaults approved false", ...missing],
    warnings: ["Approval packet readiness never triggers execution in Phase 61."],
  };
}

export function summarizeCreativeJobApprovalPacket(packet: CreativeJobApprovalPacket): string[] {
  return [
    `${packet.approvalId} approved: ${String(packet.approved)}.`,
    "Missing acknowledgements block execution readiness.",
    "Approval does not execute anything.",
  ];
}
