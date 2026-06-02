import type { RenderVersionHandoff, RenderVersionSelection } from "./render-version-history-types";

export function buildRenderVersionHandoff(selection: RenderVersionSelection): RenderVersionHandoff {
  return {
    id: "render-version-handoff",
    copyLabel: "Copy version handoff allowed",
    packet: [
      `Selected version: ${selection.selectedVersionId}`,
      `Latest version: ${selection.latestVersionId}`,
      "Review note: verify prompts, style, keyframes, workflow, parameters, artifact review, and recovery retry notes.",
      "Manual next step: prepare video export handoff only after review.",
    ],
    safetyNote:
      "This handoff does not play fake media, delete files, generate media, submit ComfyUI work, upload, or export.",
  };
}
