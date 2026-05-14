import { buildMemoryPromotionPolicy } from "./memory-review-policy";
import { scoreMemoryReviewCandidate } from "./memory-review-scoring";
import {
  type MemoryReviewCandidateInput,
  type MemoryReviewItem,
  type MemoryReviewNextAction,
  type MemoryReviewQueue,
  type MemoryReviewSourceRef,
  type MemoryReviewState,
  buildMemoryReviewStableKey,
} from "./memory-review-types";

export function buildMemoryReviewQueue(
  candidates: readonly MemoryReviewCandidateInput[]
): MemoryReviewQueue {
  const policy = buildMemoryPromotionPolicy();
  const items = candidates.map(buildMemoryReviewItem);

  return {
    id: "memory-review-queue",
    items,
    policy,
    summary: summarizeMemoryReviewQueue(items),
  };
}

export function buildMemoryReviewItem(candidate: MemoryReviewCandidateInput): MemoryReviewItem {
  const score = scoreMemoryReviewCandidate(candidate);
  const sourceRefs = buildSourceRefs(candidate);
  const reviewState = selectInitialReviewState(candidate, sourceRefs.length, score.readiness);
  const nextAction = selectMemoryReviewNextAction({ ...candidate, reviewState, sourceRefsLength: sourceRefs.length });
  const item: MemoryReviewItem = {
    id: buildMemoryReviewStableKey("memory-review-item", candidate.id),
    candidateId: candidate.id,
    sourceType: candidate.sourceType,
    sourceSurface: candidate.sourceSurface,
    sourceArtifactId: candidate.sourceArtifactId,
    sourceRunId: candidate.sourceRunId,
    sourceFileId: candidate.sourceFileId,
    sourceMessageId: candidate.sourceMessageId,
    sourcePackId: candidate.sourcePackId,
    sourceRefs,
    title: candidate.title,
    content: candidate.content,
    tags: Array.from(new Set(candidate.tags)),
    importance: candidate.importance,
    confidence: score.confidence,
    contradictionRisk: score.contradictionRisk,
    promotionReadiness: score.readiness,
    reviewState,
    nextAction,
    score,
    summary: [],
  };

  return { ...item, summary: summarizeMemoryReviewItem(item) };
}

export function summarizeMemoryReviewQueue(
  queueOrItems: MemoryReviewQueue | readonly MemoryReviewItem[]
): string[] {
  const items = "items" in queueOrItems ? queueOrItems.items : queueOrItems;
  const approved = items.filter((item) => item.reviewState === "approved-for-promotion").length;
  const blocked = items.filter((item) => item.reviewState === "blocked").length;
  const review = items.filter((item) => item.reviewState === "needs-review").length;

  return [
    `${items.length} memory review candidate(s) queued.`,
    `${review} candidate(s) require confidence and contradiction risk review.`,
    `${approved} candidate(s) are explicitly approved for promotion event preview.`,
    blocked === 0 ? "No candidates are blocked." : `${blocked} candidate(s) are blocked by policy.`,
    "Queue is deterministic and does not auto-promote memory.",
  ];
}

export function selectMemoryReviewNextAction(args: {
  confidence: number;
  contradictionRisk?: number;
  validationQuality?: MemoryReviewCandidateInput["validationQuality"];
  reviewState?: MemoryReviewState;
  sourceRefsLength?: number;
}): MemoryReviewNextAction {
  if ((args.sourceRefsLength ?? 1) === 0 || args.validationQuality === "blocked") return "blocked-missing-source";
  if (args.reviewState === "approved-for-promotion") return "preview-promotion-event";
  if (args.reviewState === "rejected") return "reject";
  if (args.reviewState === "deferred") return "defer";
  if ((args.contradictionRisk ?? 0) >= 0.62 || args.confidence < 0.6) return "review-confidence-risk";
  if (args.confidence < 0.68) return "request-more-context";
  return "approve";
}

function buildSourceRefs(candidate: MemoryReviewCandidateInput): MemoryReviewSourceRef[] {
  const refs: Array<MemoryReviewSourceRef | null> = [
    candidate.sourceArtifactId
      ? { type: "artifact" as const, id: candidate.sourceArtifactId, surface: candidate.sourceSurface }
      : null,
    candidate.sourceRunId
      ? { type: "run" as const, id: candidate.sourceRunId, surface: candidate.sourceSurface }
      : null,
    candidate.sourceFileId
      ? { type: "file" as const, id: candidate.sourceFileId, surface: candidate.sourceSurface }
      : null,
    candidate.sourceMessageId
      ? { type: "message" as const, id: candidate.sourceMessageId, surface: candidate.sourceSurface }
      : null,
    candidate.sourcePackId
      ? { type: "production-pack" as const, id: candidate.sourcePackId, surface: candidate.sourceSurface }
      : null,
  ];

  return refs.filter((ref): ref is MemoryReviewSourceRef => ref !== null);
}

function selectInitialReviewState(
  candidate: MemoryReviewCandidateInput,
  sourceRefCount: number,
  readiness: MemoryReviewItem["promotionReadiness"]
): MemoryReviewState {
  if (sourceRefCount === 0 || candidate.validationQuality === "blocked" || readiness === "blocked") return "blocked";
  if (readiness === "ready-after-approval") return "needs-review";
  if (readiness === "needs-more-context") return "deferred";
  return "needs-review";
}

function summarizeMemoryReviewItem(item: MemoryReviewItem): string[] {
  return [
    `${item.title} is ${item.reviewState} with ${item.promotionReadiness} readiness.`,
    `Confidence ${(item.confidence * 100).toFixed(0)} and contradiction risk ${(item.contradictionRisk * 100).toFixed(0)}.`,
    `Next action: ${item.nextAction}.`,
  ];
}
