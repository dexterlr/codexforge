import type { CreativePromptMemoryCandidate, CreativePromptMemoryReuse } from "./creative-prompt-memory-types";
import { buildDefaultCreativePromptMemoryCandidates } from "./creative-prompt-memory-candidate";

export function buildCreativePromptMemoryReuse(
  candidates: CreativePromptMemoryCandidate[] = buildDefaultCreativePromptMemoryCandidates()
): CreativePromptMemoryReuse {
  const useful = candidates.filter((candidate) => candidate.reviewStatus === "useful");
  return {
    id: "creative-memory-reuse-001",
    allowedReuse: useful.map((candidate) => `Copy reviewed idea ${candidate.id} into a prompt handoff.`),
    suggestionsOnly: [
      "A prompt memory is a reusable idea, not a command.",
      "Reuse tags are suggestions only until a person reviews the final prompt.",
      "Nothing is secretly sent to an AI provider from this page.",
    ],
    blockedReuse: [
      "No auto-save button.",
      "No hidden persistent state.",
      "No automatic memory promotion.",
      "No Brain mutation.",
    ],
  };
}
