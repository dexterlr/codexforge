import type { VideoRenderJobPreviewModel, VideoRenderSummary } from "./video-render-job-types";

export function buildVideoRenderSummary(model: Omit<VideoRenderJobPreviewModel, "summary">): VideoRenderSummary {
  return {
    renderInputReady: model.inputValidation.valid,
    timelineSegmentCount: model.timeline.segments.length,
    shotCount: model.shotPlan.shots.length,
    providerCount: model.providerPlan.providers.length,
    queueItemCount: model.queuePreview.items.length,
    artifactCount: model.artifactPlan.items.length,
    approvalReady: model.approvalValidation.valid,
    policyPosture: model.policy.executionAllowed ? "execution-open" : "preview-only/request-ready blocked",
    executionBlockedCount: model.policy.blockedReasons.length,
    nextSafeAction: model.policy.nextSafeAction,
  };
}

export function summarizeVideoRenderSession(summary: VideoRenderSummary): string[] {
  return [
    `Input ready: ${String(summary.renderInputReady)}; approval ready: ${String(summary.approvalReady)}.`,
    `${summary.timelineSegmentCount} segments, ${summary.shotCount} shots, ${summary.providerCount} providers, ${summary.queueItemCount} queue items, ${summary.artifactCount} artifacts.`,
    `${summary.executionBlockedCount} execution blockers; posture: ${summary.policyPosture}.`,
    summary.nextSafeAction,
  ];
}
