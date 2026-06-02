import type { RenderVersionChange, RenderVersionChangeKind } from "./render-version-history-types";

export function buildRenderVersionChange(
  input: Partial<RenderVersionChange> & { versionId: string; kind: RenderVersionChangeKind }
): RenderVersionChange {
  return {
    id: input.id ?? `render-version-change-${input.versionId}-${input.kind.replaceAll(" ", "-")}`,
    versionId: input.versionId,
    kind: input.kind,
    plainEnglish: input.plainEnglish ?? `${input.kind} for ${input.versionId}.`,
  };
}

export function buildDefaultRenderVersionChanges(): RenderVersionChange[] {
  return [
    buildRenderVersionChange({
      versionId: "render-version-image-v1",
      kind: "prompt changed",
      plainEnglish: "The first image concept used a clearer product prompt.",
    }),
    buildRenderVersionChange({
      versionId: "render-version-keyframe-v2",
      kind: "keyframe changed",
      plainEnglish: "Keyframe timing was adjusted before the draft request.",
    }),
    buildRenderVersionChange({
      versionId: "render-version-video-draft-v3",
      kind: "workflow changed",
      plainEnglish: "The draft used a reviewed workflow package note.",
    }),
    buildRenderVersionChange({
      versionId: "render-version-upscaled-v4",
      kind: "upscale added",
      plainEnglish: "Upscale is noted as a plan, not executed from this page.",
    }),
    buildRenderVersionChange({
      versionId: "render-version-final-candidate-v5",
      kind: "artifact reviewed",
      plainEnglish: "The latest final candidate needs manual review before export handoff.",
    }),
    buildRenderVersionChange({
      versionId: "render-version-export-handoff-v6",
      kind: "parameter changed",
      plainEnglish: "Export target parameters were clarified for handoff only.",
    }),
    buildRenderVersionChange({
      versionId: "render-version-video-draft-v3",
      kind: "style changed",
      plainEnglish: "Style preset changed before the reviewed draft.",
    }),
    buildRenderVersionChange({
      versionId: "render-version-upscaled-v4",
      kind: "interpolation added",
      plainEnglish: "Interpolation is listed as future planning only.",
    }),
    buildRenderVersionChange({
      versionId: "render-version-video-draft-v3",
      kind: "recovery retry",
      plainEnglish: "A retry reason can be recorded after review, without starting a retry.",
    }),
  ];
}
