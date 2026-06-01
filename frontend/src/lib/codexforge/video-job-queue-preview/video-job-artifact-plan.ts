import type { VideoJobArtifactPlan, VideoJobRequest } from "./video-job-queue-types";

export function buildVideoJobArtifactPlan(request: VideoJobRequest): VideoJobArtifactPlan {
  return {
    id: `${request.id}-artifact-plan`,
    requestId: request.id,
    destination: request.artifactDestination,
    expectedArtifacts: ["job review note", "draft artifact reference later", "manual result summary later"],
    writeBoundary: "No files are written by this UI. Artifacts must be supplied by a later approved process.",
  };
}
