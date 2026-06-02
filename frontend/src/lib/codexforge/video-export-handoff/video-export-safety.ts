import type { VideoExportSafety } from "./video-export-handoff-types";

export function buildVideoExportSafety(): VideoExportSafety {
  return {
    id: "video-export-safety",
    rules: [
      "No export button",
      "No file write",
      "No upload",
      "No cloud provider API calls",
      "No ComfyUI workflow run",
      "No project state persistence",
      "Copy export packet allowed",
    ],
    plainEnglish:
      "Export is manual/future-approved. This handoff prepares instructions and metadata without writing, uploading, rendering, or exporting video.",
  };
}
