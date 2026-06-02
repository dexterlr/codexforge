import type { CreativePromptMemoryCandidate, CreativePromptMemorySource } from "./creative-prompt-memory-types";
import { buildDefaultCreativePromptMemoryCandidates } from "./creative-prompt-memory-candidate";

const SOURCE_LABELS: Record<CreativePromptMemorySource["sourceKind"], { label: string; route: string }> = {
  "video-prompt": { label: "Video prompt", route: "/video-prompt" },
  storyboard: { label: "Storyboard", route: "/storyboard" },
  "keyframe-plan": { label: "Keyframe plan", route: "/keyframes" },
  "local-image-request": { label: "Local image request", route: "/local-image" },
  "local-keyframe-request": { label: "Local keyframe request", route: "/local-keyframes" },
  "local-video-draft-request": { label: "Local video draft request", route: "/local-video-draft" },
  "artifact-review-note": { label: "Artifact review note", route: "/video-review" },
  "manual-note": { label: "Manual note", route: "/creative-memory" },
};

export function buildCreativePromptMemorySource(
  candidates: CreativePromptMemoryCandidate[] = buildDefaultCreativePromptMemoryCandidates()
): CreativePromptMemorySource[] {
  const kinds = [...new Set(candidates.map((candidate) => candidate.sourceKind))];
  return kinds.map((sourceKind) => {
    const source = SOURCE_LABELS[sourceKind];
    return {
      id: `creative-memory-source-${sourceKind}`,
      sourceKind,
      label: source.label,
      sourceRoute: source.route,
      beginnerExplanation: "A source is where the prompt idea came from before anyone decides whether to reuse it.",
      reviewBoundary: "The source creates a memory candidate only. It does not write memory automatically.",
    };
  });
}
