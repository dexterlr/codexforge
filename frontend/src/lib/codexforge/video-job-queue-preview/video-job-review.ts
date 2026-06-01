import type { VideoJobRequest, VideoJobReview } from "./video-job-queue-types";

export function buildVideoJobReview(request: VideoJobRequest): VideoJobReview {
  return {
    id: `${request.id}-review`,
    requestId: request.id,
    checklist: ["review prompt text before sending anywhere", "confirm local draft first", "confirm no cloud credits are spent", "confirm artifact destination is safe", "confirm approval is required before rendering"],
    approvalRequired: true,
  };
}
