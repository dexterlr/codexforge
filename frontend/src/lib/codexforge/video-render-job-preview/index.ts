export * from "./video-render-job-types";
export * from "./video-render-input";
export * from "./video-render-timeline";
export * from "./video-render-shot-plan";
export * from "./video-render-provider-plan";
export * from "./video-render-queue-preview";
export * from "./video-render-artifact-plan";
export * from "./video-render-approval";
export * from "./video-render-policy";
export * from "./video-render-execution-packet";
export * from "./video-render-summary";

export {
  buildVideoRenderInput,
  validateVideoRenderInput,
  summarizeVideoRenderInput,
} from "./video-render-input";
export {
  buildVideoRenderTimeline,
  buildVideoRenderTimelineSegment,
  summarizeVideoRenderTimeline,
} from "./video-render-timeline";
export {
  buildVideoRenderShotPlan,
  buildVideoRenderShot,
  summarizeVideoRenderShotPlan,
} from "./video-render-shot-plan";
export {
  buildVideoRenderProviderPlan,
  buildVideoRenderProviderItem,
  summarizeVideoRenderProviderPlan,
} from "./video-render-provider-plan";
export {
  buildVideoRenderQueuePreview,
  buildVideoRenderQueueItem,
  summarizeVideoRenderQueuePreview,
} from "./video-render-queue-preview";
export {
  buildVideoRenderArtifactPlan,
  buildVideoRenderArtifactItem,
  summarizeVideoRenderArtifactPlan,
} from "./video-render-artifact-plan";
export {
  buildVideoRenderApprovalPacket,
  validateVideoRenderApprovalPacket,
  summarizeVideoRenderApprovalPacket,
} from "./video-render-approval";
export {
  buildVideoRenderPolicy,
  isVideoRenderExecutionAllowed,
  summarizeVideoRenderPolicy,
} from "./video-render-policy";
export {
  buildVideoRenderExecutionPacket,
  validateVideoRenderExecutionPacket,
  summarizeVideoRenderExecutionPacket,
} from "./video-render-execution-packet";
export {
  buildVideoRenderSummary,
  summarizeVideoRenderSession,
} from "./video-render-summary";

import {
  buildVideoRenderArtifactPlan,
} from "./video-render-artifact-plan";
import {
  buildVideoRenderApprovalPacket,
  validateVideoRenderApprovalPacket,
} from "./video-render-approval";
import {
  buildVideoRenderExecutionPacket,
  validateVideoRenderExecutionPacket,
} from "./video-render-execution-packet";
import {
  buildVideoRenderInput,
  validateVideoRenderInput,
} from "./video-render-input";
import {
  buildVideoRenderPolicy,
} from "./video-render-policy";
import {
  buildVideoRenderProviderPlan,
} from "./video-render-provider-plan";
import {
  buildVideoRenderQueuePreview,
} from "./video-render-queue-preview";
import {
  buildVideoRenderShotPlan,
} from "./video-render-shot-plan";
import {
  buildVideoRenderSummary,
} from "./video-render-summary";
import {
  buildVideoRenderTimeline,
} from "./video-render-timeline";
import type { VideoRenderJobPreviewModel } from "./video-render-job-types";

export function buildVideoRenderJobPreviewModel(): VideoRenderJobPreviewModel {
  const input = buildVideoRenderInput();
  const inputValidation = validateVideoRenderInput(input);
  const timeline = buildVideoRenderTimeline(input);
  const shotPlan = buildVideoRenderShotPlan(timeline);
  const providerPlan = buildVideoRenderProviderPlan();
  const queuePreview = buildVideoRenderQueuePreview(shotPlan);
  const artifactPlan = buildVideoRenderArtifactPlan(queuePreview);
  const approvalPacket = buildVideoRenderApprovalPacket({ renderInput: input, queuePreview });
  const approvalValidation = validateVideoRenderApprovalPacket(approvalPacket);
  const policy = buildVideoRenderPolicy({ approvalPacket, artifactPlan });
  const executionPacket = buildVideoRenderExecutionPacket({
    renderInput: input,
    providerPlan,
    queuePreview,
    artifactPlan,
    policy,
  });
  const executionPacketValidation = validateVideoRenderExecutionPacket(executionPacket);
  const model = {
    input,
    inputValidation,
    timeline,
    shotPlan,
    providerPlan,
    queuePreview,
    artifactPlan,
    approvalPacket,
    approvalValidation,
    policy,
    executionPacket,
    executionPacketValidation,
  };
  return { ...model, summary: buildVideoRenderSummary(model) };
}
