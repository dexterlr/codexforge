import type { CreativePromptMemoryCandidate, CreativePromptMemoryReview } from "./creative-prompt-memory-types";
import { buildDefaultCreativePromptMemoryCandidates } from "./creative-prompt-memory-candidate";

export function buildCreativePromptMemoryReview(
  candidates: CreativePromptMemoryCandidate[] = buildDefaultCreativePromptMemoryCandidates()
): CreativePromptMemoryReview {
  return {
    id: "creative-memory-review-001",
    candidateCount: candidates.length,
    statuses: ["candidate", "useful", "needs-edit", "rejected", "approved-for-future-memory", "not-persisted"],
    reviewSteps: [
      "Read the prompt excerpt and decide whether it is reusable.",
      "Check that style notes, subject notes, and camera notes are clear.",
      "Mark anything vague as needs-edit before copying it into future work.",
      "Only a reviewed approval can prepare it for future memory.",
    ],
    approvalReminder: "Approved-for-future-memory is still a review label here. This page does not save to Brain memory.",
  };
}
