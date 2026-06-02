import type { VideoExportTarget, VideoExportTargetKind } from "./video-export-handoff-types";

export function buildVideoExportTarget(input: Partial<VideoExportTarget> & { kind?: VideoExportTargetKind } = {}): VideoExportTarget {
  return {
    id: input.id ?? "video-export-target-internal-review",
    kind: input.kind ?? "internal review",
    label: input.label ?? "Internal review handoff",
    resolution: input.resolution ?? "unknown until final export is approved",
    duration: input.duration ?? "unknown until final candidate is reviewed",
    audioStatus: input.audioStatus ?? "audio status known must be reviewed manually",
    manualNote:
      input.manualNote ??
      "Target can be local file, social clip, product demo, internal review, client review, archive package, cloud final later, or manual delivery. No upload starts here.",
  };
}
