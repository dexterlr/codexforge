import type { CreativePromptMemoryCandidate, CreativePromptMemoryHandoff } from "./creative-prompt-memory-types";
import { buildDefaultCreativePromptMemoryCandidates } from "./creative-prompt-memory-candidate";

export function buildCreativePromptMemoryHandoff(
  candidates: CreativePromptMemoryCandidate[] = buildDefaultCreativePromptMemoryCandidates()
): CreativePromptMemoryHandoff {
  const candidateLines = candidates
    .map((candidate) => `${candidate.id}: ${candidate.promptExcerpt} Tags: ${candidate.reuseTags.join(", ")}.`)
    .join(" ");

  return {
    id: "creative-memory-handoff-001",
    copyLabel: "Copy prompt memory handoff allowed",
    handoffText: `Reviewed creative prompt memory candidates: ${candidateLines}`,
    reviewReminder:
      "Review before saving. This handoff is copy-only and does not silently persist creative memory.",
  };
}
