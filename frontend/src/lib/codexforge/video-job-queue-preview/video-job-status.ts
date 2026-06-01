import type { VideoJobStatus, VideoJobStatusId } from "./video-job-queue-types";

const STATUS_COPY: Record<VideoJobStatusId, Omit<VideoJobStatus, "id">> = {
  draft: { label: "draft", plainEnglish: "The job is only being described.", executionAllowed: false },
  "needs-review": { label: "needs review", plainEnglish: "A human must check the job before it can move forward.", executionAllowed: false },
  "approved-preview-only": { label: "approved preview only", plainEnglish: "Approval is for planning text only, not rendering.", executionAllowed: false },
  "queued-planned": { label: "queued planned", plainEnglish: "A future queue position is described but not started.", executionAllowed: false },
  blocked: { label: "blocked", plainEnglish: "Something prevents safe execution.", executionAllowed: false },
  "running-future": { label: "running future", plainEnglish: "Reserved for a later executor; not active now.", executionAllowed: false },
  "complete-supplied": { label: "complete supplied", plainEnglish: "Reserved for a later externally supplied result.", executionAllowed: false },
  "failed-supplied": { label: "failed supplied", plainEnglish: "Reserved for a later externally supplied failure.", executionAllowed: false },
};

export function buildVideoJobStatus(id: VideoJobStatusId): VideoJobStatus {
  return { id, ...STATUS_COPY[id] };
}
