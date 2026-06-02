import type { VideoDraftRequest, VideoDraftResult } from "./local-video-draft-types";

export function buildVideoDraftResult(
  request: VideoDraftRequest,
  input: Partial<VideoDraftResult> = {}
): VideoDraftResult {
  return {
    id: input.id ?? `${request.id}-result`,
    status: input.status ?? "not-generated",
    suppliedDraftLabel: input.suppliedDraftLabel ?? "No draft video supplied yet",
    captureMode: input.captureMode ?? "blocked",
    reviewNote: input.reviewNote ?? "Capture supplied draft allowed only after a manual or approved-boundary result exists.",
  };
}
