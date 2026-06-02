import type { CreativePromptMemorySummary } from "./creative-prompt-memory-types";
import { buildDefaultCreativePromptMemoryCandidates } from "./creative-prompt-memory-candidate";
import { buildCreativePromptMemoryHandoff } from "./creative-prompt-memory-handoff";
import { buildCreativePromptMemoryReuse } from "./creative-prompt-memory-reuse";
import { buildCreativePromptMemoryReview } from "./creative-prompt-memory-review";
import { buildCreativePromptMemorySource } from "./creative-prompt-memory-source";
import { buildCreativePromptMemoryTag } from "./creative-prompt-memory-tag";

export function buildCreativePromptMemorySummary(): CreativePromptMemorySummary {
  const candidates = buildDefaultCreativePromptMemoryCandidates();
  const sources = buildCreativePromptMemorySource(candidates);
  const review = buildCreativePromptMemoryReview(candidates);
  const tags = buildCreativePromptMemoryTag(candidates);
  const reuse = buildCreativePromptMemoryReuse(candidates);
  const handoff = buildCreativePromptMemoryHandoff(candidates);

  return {
    candidates,
    sources,
    review,
    tags,
    reuse,
    handoff,
    summary: summarizeCreativePromptMemory({ candidates, sources, review, tags, reuse, handoff, summary: "" }),
  };
}

export function summarizeCreativePromptMemory(summary: CreativePromptMemorySummary): string {
  return `${summary.candidates.length} reviewed memory candidates are visible for reuse planning; none are persisted or promoted automatically.`;
}
