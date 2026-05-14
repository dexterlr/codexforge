import {
  type MemoryReviewAction,
  type MemoryReviewActionType,
  type MemoryReviewItem,
  type MemoryReviewQueue,
  type MemoryReviewState,
  buildMemoryReviewStableKey,
} from "./memory-review-types";
import { selectMemoryReviewNextAction, summarizeMemoryReviewQueue } from "./memory-review-queue";

export function buildMemoryReviewAction(args: {
  type: MemoryReviewActionType;
  item: MemoryReviewItem;
  note?: string;
}): MemoryReviewAction {
  const reviewState = reviewStateFromAction(args.type, args.item.reviewState);
  const action: MemoryReviewAction = {
    id: buildMemoryReviewStableKey("memory-review-action", args.type, args.item.id),
    type: args.type,
    itemId: args.item.id,
    candidateId: args.item.candidateId,
    reviewState,
    note: args.note ?? defaultActionNote(args.type),
    summary: [],
  };

  return { ...action, summary: summarizeMemoryReviewAction(action) };
}

export function reduceMemoryReviewQueue(
  queue: MemoryReviewQueue,
  action: MemoryReviewAction
): MemoryReviewQueue {
  const items = queue.items.map((item) => {
    if (item.id !== action.itemId) return item;

    const nextItem = {
      ...item,
      reviewState: action.reviewState,
      nextAction: selectMemoryReviewNextAction({
        confidence: item.confidence,
        contradictionRisk: item.contradictionRisk,
        reviewState: action.reviewState,
        sourceRefsLength: item.sourceRefs.length,
      }),
    };

    return {
      ...nextItem,
      summary: [
        `${nextItem.title} is ${nextItem.reviewState}.`,
        `Next action: ${nextItem.nextAction}.`,
        "Reducer is pure and performs no persistence writes.",
      ],
    };
  });

  return {
    ...queue,
    items,
    summary: summarizeMemoryReviewQueue(items),
  };
}

export function summarizeMemoryReviewAction(action: MemoryReviewAction): string[] {
  return [
    `${action.type} set ${action.candidateId} to ${action.reviewState}.`,
    action.note,
    "Action is local review state only and does not persist memory.",
  ];
}

function reviewStateFromAction(
  action: MemoryReviewActionType,
  current: MemoryReviewState
): MemoryReviewState {
  switch (action) {
    case "approve":
      return current === "blocked" ? "blocked" : "approved-for-promotion";
    case "reject":
      return "rejected";
    case "defer":
    case "request-more-context":
      return "deferred";
    case "preview-promotion-event":
      return current;
  }
}

function defaultActionNote(action: MemoryReviewActionType): string {
  switch (action) {
    case "approve":
      return "Explicit approval captured for promotion event preview.";
    case "reject":
      return "Candidate rejected from promotion.";
    case "defer":
      return "Candidate deferred for later review.";
    case "request-more-context":
      return "More source context requested before promotion.";
    case "preview-promotion-event":
      return "Promotion event preview requested without runtime append.";
  }
}
