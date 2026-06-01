import type { VideoJobQueueSummary } from "./video-job-queue-types";
import { buildVideoJobArtifactPlan } from "./video-job-artifact-plan";
import { buildDefaultVideoJobRequests } from "./video-job-request";
import { buildVideoJobResourceEstimate } from "./video-job-resource-estimate";
import { buildVideoJobReview } from "./video-job-review";
import { buildVideoJobStatus } from "./video-job-status";

export function summarizeVideoJobQueue(summary: VideoJobQueueSummary): string {
  return `${summary.requests.length} video job previews, approval required, no-auto-run guarantee, no video generated.`;
}

export function buildVideoJobQueueSummary(): VideoJobQueueSummary {
  const requests = buildDefaultVideoJobRequests();
  const statusIds = ["draft", "needs-review", "approved-preview-only", "queued-planned", "blocked", "running-future", "complete-supplied", "failed-supplied"] as const;
  const summary: VideoJobQueueSummary = {
    requests,
    reviews: requests.map(buildVideoJobReview),
    statuses: statusIds.map(buildVideoJobStatus),
    estimates: requests.map(buildVideoJobResourceEstimate),
    artifactPlans: requests.map(buildVideoJobArtifactPlan),
    summary: "",
    nextAction: "Pick a workflow and review the job request before any future executor can render.",
  };
  return { ...summary, summary: summarizeVideoJobQueue(summary) };
}
