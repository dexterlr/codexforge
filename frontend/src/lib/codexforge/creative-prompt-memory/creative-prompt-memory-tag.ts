import type { CreativePromptMemoryCandidate, CreativePromptMemoryTag } from "./creative-prompt-memory-types";
import { buildDefaultCreativePromptMemoryCandidates } from "./creative-prompt-memory-candidate";

export function buildCreativePromptMemoryTag(
  candidates: CreativePromptMemoryCandidate[] = buildDefaultCreativePromptMemoryCandidates()
): CreativePromptMemoryTag[] {
  const tags = [...new Set(candidates.flatMap((candidate) => candidate.reuseTags))];
  return tags.map((tag) => ({
    id: `creative-memory-tag-${tag.replaceAll(" ", "-")}`,
    label: tag,
    explanation: "A reuse tag helps a beginner find similar prompt ideas later.",
    candidateIds: candidates.filter((candidate) => candidate.reuseTags.includes(tag)).map((candidate) => candidate.id),
  }));
}
