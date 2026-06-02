import type { VideoDraftSummary } from "./local-video-draft-types";
import { buildDefaultVideoDraftRequest } from "./video-draft-request";
import { buildVideoDraftHandoff } from "./video-draft-handoff";
import { buildVideoDraftInputReview } from "./video-draft-input-review";
import { buildVideoDraftReadiness } from "./video-draft-readiness";
import { buildVideoDraftResult } from "./video-draft-result";
import { buildVideoDraftSafety } from "./video-draft-safety";

export function buildVideoDraftSummary(): VideoDraftSummary {
  const request = buildDefaultVideoDraftRequest();
  const inputReview = buildVideoDraftInputReview(request);
  const result = buildVideoDraftResult(request);
  const readiness = buildVideoDraftReadiness(request, result);
  const safety = buildVideoDraftSafety(request);
  const handoff = buildVideoDraftHandoff(request, readiness, result);

  return {
    request,
    inputReview,
    readiness,
    safety,
    result,
    handoff,
    summary: summarizeLocalVideoDraft({ request, inputReview, readiness, safety, result, handoff, summary: "" }),
  };
}

export function summarizeLocalVideoDraft(summary: VideoDraftSummary): string {
  return `Local video draft MVP is ${summary.readiness.status}: draft request prepared, final render later, no auto-generation, and supplied draft capture only.`;
}
