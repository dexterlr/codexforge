import type { VideoJobRequest, VideoJobResourceEstimate } from "./video-job-queue-types";

export function buildVideoJobResourceEstimate(request: VideoJobRequest): VideoJobResourceEstimate {
  return {
    id: `${request.id}-resource-estimate`,
    requestId: request.id,
    gpuPosture: request.estimatedGpuTimePosture,
    timePosture: "Use a short local draft first; longer work waits for review.",
    costPosture: "Local GPU and electricity cost only in this plan; no cloud credits are spent.",
  };
}
