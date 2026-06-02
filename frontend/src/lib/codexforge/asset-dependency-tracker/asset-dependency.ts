import type { AssetDependency, AssetDependencyKind } from "./asset-dependency-types";

const DEFAULT_DEPENDENCIES: readonly Omit<AssetDependency, "id">[] = [
  {
    kind: "prompt",
    title: "Structured video prompt",
    whyNeeded: "The draft needs a clear prompt before any future render request.",
    status: "supplied",
    linkedRoute: "/video-prompt",
    manualNote: "Review prompt text manually; no provider receives it from this tracker.",
  },
  {
    kind: "style preset",
    title: "Style preset",
    whyNeeded: "Style keeps keyframes, images, and drafts visually consistent.",
    status: "supplied",
    linkedRoute: "/style-presets",
    manualNote: "Preset is review-only here.",
  },
  {
    kind: "consistency subject",
    title: "Character or brand subject",
    whyNeeded: "Recurring subjects need identity and negative rules before drafts.",
    status: "needs-review",
    linkedRoute: "/consistency-kit",
    manualNote: "Approve consistency notes manually.",
  },
  {
    kind: "shot template",
    title: "Reusable shot template",
    whyNeeded: "Shot templates reduce storyboard confusion for beginners.",
    status: "ready",
    linkedRoute: "/shot-library",
    manualNote: "Template is local planning data.",
  },
  {
    kind: "storyboard shot",
    title: "Storyboard shot list",
    whyNeeded: "The draft needs shot order, timing, and continuity.",
    status: "needs-review",
    linkedRoute: "/storyboard",
    manualNote: "Review shot order before draft work.",
  },
  {
    kind: "keyframe prompt",
    title: "Keyframe prompt",
    whyNeeded: "Keyframe prompts explain what each future anchor image should show.",
    status: "ready",
    linkedRoute: "/keyframes",
    manualNote: "Prompt remains local and unsent.",
  },
  {
    kind: "local image",
    title: "Local image request",
    whyNeeded: "Optional local image requests can support storyboard or style review.",
    status: "optional",
    linkedRoute: "/local-image",
    manualNote: "No image generation starts here.",
  },
  {
    kind: "keyframe image",
    title: "Supplied keyframe image",
    whyNeeded: "Future draft requests need real supplied keyframe images or manual acceptance of text-only keyframes.",
    status: "missing",
    linkedRoute: "/local-keyframes",
    manualNote: "Supply or review keyframes manually.",
  },
  {
    kind: "workflow package",
    title: "Workflow package",
    whyNeeded: "A future local draft needs a reviewed package before any approved submit boundary.",
    status: "needs-review",
    linkedRoute: "/comfyui-jobs/package",
    manualNote: "No ComfyUI workflow is run from this tracker.",
  },
  {
    kind: "draft video",
    title: "Supplied draft video",
    whyNeeded: "Review, comparison, finishing, and export handoff depend on a supplied draft.",
    status: "missing",
    linkedRoute: "/local-video-draft",
    manualNote: "Capture supplied draft metadata only after it exists.",
  },
  {
    kind: "review note",
    title: "Review note",
    whyNeeded: "A beginner needs a plain decision about keep, retry, compare, or finish.",
    status: "missing",
    linkedRoute: "/video-review",
    manualNote: "Review notes are manual and copy-only.",
  },
  {
    kind: "export target",
    title: "Export target",
    whyNeeded: "Export handoff needs target, resolution, duration, audio, and license notes.",
    status: "unknown",
    linkedRoute: "/video-export",
    manualNote: "No export or upload is executed.",
  },
  {
    kind: "missing model note",
    title: "Missing model note",
    whyNeeded: "Missing models must be called out before any future workflow submit.",
    status: "needs-review",
    linkedRoute: "/video-recovery",
    manualNote: "This is a note only, not a hardware or model scan.",
  },
  {
    kind: "missing custom node note",
    title: "Missing custom node note",
    whyNeeded: "Missing custom nodes can block a future local workflow.",
    status: "blocked",
    linkedRoute: "/video-recovery",
    manualNote: "Resolve manually before future approved execution.",
  },
];

export function buildAssetDependency(input: Partial<AssetDependency> & { kind: AssetDependencyKind }): AssetDependency {
  const defaults = DEFAULT_DEPENDENCIES.find((dependency) => dependency.kind === input.kind);
  return {
    id: input.id ?? `asset-dependency-${input.kind.replaceAll(" ", "-")}`,
    kind: input.kind,
    title: input.title ?? defaults?.title ?? input.kind,
    whyNeeded: input.whyNeeded ?? defaults?.whyNeeded ?? "Required for project review.",
    status: input.status ?? defaults?.status ?? "unknown",
    linkedRoute: input.linkedRoute ?? defaults?.linkedRoute ?? "/video-assets",
    manualNote: input.manualNote ?? defaults?.manualNote ?? "Manual review only.",
  };
}

export function buildDefaultAssetDependencies(): AssetDependency[] {
  return DEFAULT_DEPENDENCIES.map((dependency) => buildAssetDependency(dependency));
}
