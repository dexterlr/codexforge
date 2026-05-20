import type { VideoRenderApprovalPacket, VideoRenderInput, VideoRenderQueuePreview, VideoRenderValidation } from "./video-render-job-types";

export function buildVideoRenderApprovalPacket(input: {
  renderInput: VideoRenderInput;
  queuePreview: VideoRenderQueuePreview;
  approved?: boolean;
}): VideoRenderApprovalPacket {
  return {
    approvalId: `video-render-approval-${input.renderInput.renderInputId}`,
    renderInputId: input.renderInput.renderInputId,
    queueId: input.queuePreview.queuePreviewId,
    approved: input.approved ?? false,
    approvalNote: "Phase 66 approval packet defaults approved false; approval does not execute anything.",
    acknowledgedProviders: false,
    acknowledgedExpectedArtifacts: false,
    acknowledgedLocalAppRequirements: false,
    acknowledgedRenderTimeResourceRisk: false,
    acknowledgedFileOutputBoundary: false,
    acknowledgedNoAutomaticExecution: false,
    acknowledgedCancellationRollbackLimits: false,
    acknowledgedLatestMessageAuthority: false,
  };
}

export function validateVideoRenderApprovalPacket(packet: VideoRenderApprovalPacket): VideoRenderValidation {
  const acknowledgements = [
    packet.acknowledgedProviders,
    packet.acknowledgedExpectedArtifacts,
    packet.acknowledgedLocalAppRequirements,
    packet.acknowledgedRenderTimeResourceRisk,
    packet.acknowledgedFileOutputBoundary,
    packet.acknowledgedNoAutomaticExecution,
    packet.acknowledgedCancellationRollbackLimits,
    packet.acknowledgedLatestMessageAuthority,
  ];
  const blockedReasons = acknowledgements.every(Boolean)
    ? []
    : ["Missing acknowledgements block future execution readiness."];
  if (!packet.approved) blockedReasons.push("Approval packet is not approved by default.");
  return { valid: blockedReasons.length === 0, blockedReasons, warnings: ["Approval does not execute anything."] };
}

export function summarizeVideoRenderApprovalPacket(packet: VideoRenderApprovalPacket): string[] {
  return [
    `${packet.approvalId} approved=${String(packet.approved)}.`,
    "Missing acknowledgements block future execution readiness.",
    "Approval packet preserves latest-message authority and does not execute anything.",
  ];
}
