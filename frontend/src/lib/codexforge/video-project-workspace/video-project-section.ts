import type { VideoProjectSection, VideoProjectSectionKind } from "./video-project-workspace-types";

const DEFAULT_SECTION_INPUTS: readonly Omit<VideoProjectSection, "id">[] = [
  {
    kind: "brief",
    title: "Project brief",
    summary: "The project goal and audience are supplied as a review note.",
    requiredForProject: true,
    status: "supplied",
    linkedRoute: "/video-projects",
  },
  {
    kind: "prompt",
    title: "Video prompt",
    summary: "The structured prompt belongs with this project and can be reviewed from the prompt builder.",
    requiredForProject: true,
    status: "supplied",
    linkedRoute: "/video-prompt",
  },
  {
    kind: "style",
    title: "Style preset",
    summary: "A reusable style preset is attached so drafts keep the same visual direction.",
    requiredForProject: true,
    status: "supplied",
    linkedRoute: "/style-presets",
  },
  {
    kind: "consistency kit",
    title: "Consistency kit",
    summary: "Character, brand, or subject rules are attached for review before future renders.",
    requiredForProject: true,
    status: "needs review",
    linkedRoute: "/consistency-kit",
  },
  {
    kind: "shot library",
    title: "Shot library",
    summary: "Reusable shot templates are attached so storyboard shots and drafts can stay organized.",
    requiredForProject: true,
    status: "supplied",
    linkedRoute: "/shot-library",
  },
  {
    kind: "storyboard",
    title: "Storyboard",
    summary: "Storyboard shots are grouped with timing notes for the future draft.",
    requiredForProject: true,
    status: "needs review",
    linkedRoute: "/storyboard",
  },
  {
    kind: "keyframes",
    title: "Keyframes",
    summary: "Keyframe plans are listed, but supplied keyframe images are still missing.",
    requiredForProject: true,
    status: "missing",
    linkedRoute: "/keyframes",
  },
  {
    kind: "local image requests",
    title: "Local image requests",
    summary: "Image request records can belong to the project once reviewed or supplied.",
    requiredForProject: false,
    status: "optional",
    linkedRoute: "/local-image",
  },
  {
    kind: "local video draft requests",
    title: "Local video draft request",
    summary: "Draft request details are prepared, but no draft is rendered from this workspace.",
    requiredForProject: true,
    status: "needs review",
    linkedRoute: "/local-video-draft",
  },
  {
    kind: "artifact capture",
    title: "Artifact capture",
    summary: "Supplied artifacts can be recorded later through the safe capture flow.",
    requiredForProject: true,
    status: "missing",
    linkedRoute: "/video-artifacts",
  },
  {
    kind: "review",
    title: "Review",
    summary: "Review notes are expected after a supplied draft or artifact exists.",
    requiredForProject: true,
    status: "missing",
    linkedRoute: "/video-review",
  },
  {
    kind: "comparison",
    title: "Comparison",
    summary: "Draft comparison becomes useful after two supplied versions exist.",
    requiredForProject: false,
    status: "optional",
    linkedRoute: "/video-compare",
  },
  {
    kind: "finishing",
    title: "Finishing",
    summary: "Finishing readiness depends on a reviewed draft and version history.",
    requiredForProject: true,
    status: "blocked",
    linkedRoute: "/video-final-render",
  },
  {
    kind: "export handoff",
    title: "Export handoff",
    summary: "Export notes can be copied later, but this workspace does not export video.",
    requiredForProject: true,
    status: "blocked",
    linkedRoute: "/video-export",
  },
];

export function buildVideoProjectSection(
  input: Partial<VideoProjectSection> & { kind: VideoProjectSectionKind }
): VideoProjectSection {
  const defaults = DEFAULT_SECTION_INPUTS.find((section) => section.kind === input.kind);
  return {
    id: input.id ?? `video-project-section-${input.kind.replaceAll(" ", "-")}`,
    kind: input.kind,
    title: input.title ?? defaults?.title ?? input.kind,
    summary: input.summary ?? defaults?.summary ?? "Review this section before future creative work.",
    requiredForProject: input.requiredForProject ?? defaults?.requiredForProject ?? true,
    status: input.status ?? defaults?.status ?? "needs review",
    linkedRoute: input.linkedRoute ?? defaults?.linkedRoute ?? "/video-projects",
  };
}

export function buildDefaultVideoProjectSections(): VideoProjectSection[] {
  return DEFAULT_SECTION_INPUTS.map((section) => buildVideoProjectSection(section));
}
