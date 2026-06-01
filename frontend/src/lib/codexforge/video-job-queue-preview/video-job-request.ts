import type { VideoJobRequest } from "./video-job-queue-types";

export function buildVideoJobRequest(input: VideoJobRequest): VideoJobRequest {
  return { ...input };
}

export function buildDefaultVideoJobRequests(): VideoJobRequest[] {
  return [
    buildVideoJobRequest({
      id: "local-keyframe-draft-job",
      prompt: "Private storyboard scene for local keyframe planning only.",
      workflowType: "prompt to keyframe",
      provider: "ComfyUI local planned",
      localCloudPosture: "local-draft-first",
      resolutionTarget: "low resolution draft first",
      durationTarget: "still keyframes before video",
      mode: "draft",
      estimatedGpuTimePosture: "short local GPU test after approval",
      artifactDestination: "manual review gallery later",
      approvalRequired: true,
      noAutoRunGuarantee: true,
    }),
    buildVideoJobRequest({
      id: "local-short-video-draft-job",
      prompt: "Approved keyframe motion test for a short local draft.",
      workflowType: "keyframe to short video draft",
      provider: "local video workflow planned",
      localCloudPosture: "local-draft-first",
      resolutionTarget: "low resolution video draft",
      durationTarget: "short clip",
      mode: "draft",
      estimatedGpuTimePosture: "moderate local GPU time after approval",
      artifactDestination: "video draft review folder later",
      approvalRequired: true,
      noAutoRunGuarantee: true,
    }),
  ];
}
