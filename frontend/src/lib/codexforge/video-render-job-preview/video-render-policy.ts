import type { VideoRenderApprovalPacket, VideoRenderArtifactPlan, VideoRenderPolicy } from "./video-render-job-types";

export function buildVideoRenderPolicy(input: {
  approvalPacket?: VideoRenderApprovalPacket;
  artifactPlan?: VideoRenderArtifactPlan;
} = {}): VideoRenderPolicy {
  const approvalReady = input.approvalPacket?.approved === true;
  const artifactPlanReady = (input.artifactPlan?.items.length ?? 0) > 0;
  const blockedReasons = [
    "Render execution blocked in Phase 66.",
    "Blender execution blocked in Phase 66.",
    "ComfyUI execution blocked in Phase 66.",
    "Unreal execution blocked in Phase 66.",
    "ffmpeg execution blocked in Phase 66.",
    "Local command execution blocked from UI.",
    "Artifact file writes blocked from UI.",
    "Package/build blocked.",
    "External process launch blocked.",
  ];
  return {
    policyId: "video-render-policy-phase-66",
    previewAllowed: true,
    executionAllowed: false,
    requestReady: approvalReady && artifactPlanReady && false,
    blockedReasons,
    warnings: [
      "Local bridge future executor required.",
      "Explicit approval required.",
      "Artifact capture/review plan required.",
      "Operator review required.",
    ],
    nextSafeAction: "Review Video Render Job Preview v1, copy the future executor packet, and keep execution blocked until a Future Guarded Creative Executor exists.",
  };
}

export function isVideoRenderExecutionAllowed(policy: VideoRenderPolicy): boolean {
  return policy.previewAllowed === true && policy.executionAllowed === true;
}

export function summarizeVideoRenderPolicy(policy: VideoRenderPolicy): string[] {
  return [
    `previewAllowed=${String(policy.previewAllowed)} executionAllowed=${String(policy.executionAllowed)} requestReady=${String(policy.requestReady)}.`,
    `${policy.blockedReasons.length} blocked reason(s); render execution remains blocked in Phase 66.`,
    policy.nextSafeAction,
  ];
}
