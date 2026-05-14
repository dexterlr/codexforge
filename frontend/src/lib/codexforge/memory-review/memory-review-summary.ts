import { buildMemoryPromotionEventPreview } from "./memory-promotion-events";
import { buildMemoryReviewLedger } from "./memory-review-ledger";
import { buildMemoryReviewQueue } from "./memory-review-queue";
import type {
  MemoryReviewBundle,
  MemoryReviewCandidateInput,
  MemoryReviewItem,
  MemoryReviewQueue,
} from "./memory-review-types";

export function buildMemoryReviewSummary(
  candidates: readonly MemoryReviewCandidateInput[]
): MemoryReviewBundle {
  const queue = buildMemoryReviewQueue(candidates);
  const selected = selectPreviewCandidate(queue);
  const eventPreview = selected
    ? buildMemoryPromotionEventPreview(selected, queue.policy)
    : {
        id: "memory-promotion-event-preview:empty",
        itemId: "empty",
        event: null,
        allowed: false,
        safetyNote: "No memory candidate selected for promotion event preview.",
        summary: ["No promotion event preview exists yet."],
      };
  const ledger = buildMemoryReviewLedger(queue);

  return {
    queue,
    ledger,
    eventPreview,
    summary: [
      ...queue.summary,
      ...ledger.summary,
      ...eventPreview.summary,
      "Memory review is deterministic, typed, local-first, and smoke-backed.",
    ],
  };
}

export function summarizeMemoryReviewBundle(bundle: MemoryReviewBundle): string[] {
  return [
    ...bundle.queue.summary,
    ...bundle.ledger.summary,
    ...bundle.eventPreview.summary,
    "Review queue requires explicit approval and never mutates persistent memory from UI.",
  ];
}

function selectPreviewCandidate(queue: MemoryReviewQueue): MemoryReviewItem | undefined {
  return (
    queue.items.find((item) => item.reviewState === "approved-for-promotion") ??
    queue.items.find((item) => item.reviewState === "needs-review") ??
    queue.items[0]
  );
}
