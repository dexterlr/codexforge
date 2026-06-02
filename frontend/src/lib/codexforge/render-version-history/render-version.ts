import type { RenderVersion, RenderVersionKind } from "./render-version-history-types";

const DEFAULT_RENDER_VERSIONS: readonly Omit<RenderVersion, "playbackAllowed">[] = [
  {
    id: "render-version-image-v1",
    kind: "image",
    label: "Image concept v1",
    source: "/local-image",
    status: "supplied",
    isLatest: false,
  },
  {
    id: "render-version-keyframe-v2",
    kind: "keyframe",
    label: "Keyframe plan v2",
    source: "/local-keyframes",
    status: "reviewed",
    isLatest: false,
  },
  {
    id: "render-version-video-draft-v3",
    kind: "video draft",
    label: "Video draft v3",
    source: "/local-video-draft",
    status: "reviewed",
    isLatest: false,
  },
  {
    id: "render-version-upscaled-v4",
    kind: "upscaled video",
    label: "Upscale plan v4",
    source: "/video-final-render",
    status: "candidate",
    isLatest: false,
  },
  {
    id: "render-version-final-candidate-v5",
    kind: "final candidate",
    label: "Final candidate v5",
    source: "/video-artifacts",
    status: "candidate",
    isLatest: true,
  },
  {
    id: "render-version-export-handoff-v6",
    kind: "export handoff",
    label: "Export handoff packet v6",
    source: "/video-export",
    status: "handoff-only",
    isLatest: false,
  },
];

export function buildRenderVersion(input: Partial<RenderVersion> & { kind: RenderVersionKind }): RenderVersion {
  const defaults = DEFAULT_RENDER_VERSIONS.find((version) => version.kind === input.kind);
  return {
    id: input.id ?? defaults?.id ?? `render-version-${input.kind.replaceAll(" ", "-")}`,
    kind: input.kind,
    label: input.label ?? defaults?.label ?? input.kind,
    source: input.source ?? defaults?.source ?? "/render-history",
    status: input.status ?? defaults?.status ?? "missing",
    isLatest: input.isLatest ?? defaults?.isLatest ?? false,
    playbackAllowed: false,
  };
}

export function buildDefaultRenderVersions(): RenderVersion[] {
  return DEFAULT_RENDER_VERSIONS.map((version) => buildRenderVersion(version));
}
