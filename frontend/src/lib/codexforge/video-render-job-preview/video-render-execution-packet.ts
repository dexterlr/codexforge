import type { VideoRenderArtifactPlan, VideoRenderExecutionPacket, VideoRenderInput, VideoRenderPolicy, VideoRenderProviderPlan, VideoRenderQueuePreview, VideoRenderValidation } from "./video-render-job-types";

export function buildVideoRenderExecutionPacket(input: {
  renderInput: VideoRenderInput;
  providerPlan: VideoRenderProviderPlan;
  queuePreview: VideoRenderQueuePreview;
  artifactPlan: VideoRenderArtifactPlan;
  policy: VideoRenderPolicy;
}): VideoRenderExecutionPacket {
  const packet: VideoRenderExecutionPacket = {
    packetId: `video-render-execution-packet-${input.renderInput.renderInputId}`,
    renderInputId: input.renderInput.renderInputId,
    providerPlanId: input.providerPlan.providerPlanId,
    queuePreviewId: input.queuePreview.queuePreviewId,
    artifactPlanId: input.artifactPlan.artifactPlanId,
    approvalRequirement: "Explicit operator approval required before any future executor handoff; Phase 66 still blocks execution.",
    safetyPolicy: input.policy,
    futureExecutorBoundary: "Future executor boundary: a separate guarded creative executor must revalidate approval, policy, local app requirements, artifact path boundaries, and latest-message authority before any action.",
    validationRecommendations: [
      "Review provider plan.",
      "Review queue ordering.",
      "Review artifact expectations.",
      "Confirm no automatic execution.",
      "Confirm cancellation and rollback limits.",
    ],
    noExecutionGuarantee: "Execution packet is metadata only; it does not execute renders, launch apps, call providers, run ffmpeg, or write files.",
    summary: [],
  };
  return { ...packet, summary: summarizeVideoRenderExecutionPacket(packet) };
}

export function validateVideoRenderExecutionPacket(packet: VideoRenderExecutionPacket): VideoRenderValidation {
  const blockedReasons = packet.safetyPolicy.executionAllowed
    ? ["Execution unexpectedly allowed; Phase 66 must block execution."]
    : [];
  return {
    valid: blockedReasons.length === 0,
    blockedReasons,
    warnings: ["future executor boundary required", "no-execution guarantee required"],
  };
}

export function summarizeVideoRenderExecutionPacket(packet: VideoRenderExecutionPacket): string[] {
  return [
    `${packet.packetId} binds input, provider plan, queue preview, artifact plan, and policy.`,
    "future executor boundary required.",
    packet.noExecutionGuarantee,
  ];
}
