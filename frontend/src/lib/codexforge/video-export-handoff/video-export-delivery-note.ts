import type { VideoExportDeliveryNote, VideoExportTarget } from "./video-export-handoff-types";

export function buildVideoExportDeliveryNote(target: VideoExportTarget): VideoExportDeliveryNote {
  return {
    id: "video-export-delivery-note",
    audience: target.label,
    note: `Prepare a manual delivery note for ${target.kind}. Confirm resolution, duration, audio, license/source notes, and final candidate review before any real export.`,
    manualOnly: true,
  };
}
