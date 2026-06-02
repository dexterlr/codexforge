"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { CreativePromptMemoryCandidate } from "../creative-prompt-memory-types";

export function CreativePromptMemoryCandidatePanel({ candidates }: { candidates: CreativePromptMemoryCandidate[] }) {
  return (
    <PreviewFoundationCard title="Memory candidates">
      <PreviewFoundationCopy>
        Each candidate keeps the candidate id, prompt excerpt, style notes, subject notes, camera notes, reuse tags, quality notes, safety notes, review status, and persistence posture together for review.
      </PreviewFoundationCopy>
      <PreviewFoundationPillList
        items={candidates.map(
          (candidate) =>
            `${candidate.id}: source kind ${candidate.sourceKind}; review status ${candidate.reviewStatus}; persistence posture ${candidate.persistencePosture}`
        )}
      />
    </PreviewFoundationCard>
  );
}
