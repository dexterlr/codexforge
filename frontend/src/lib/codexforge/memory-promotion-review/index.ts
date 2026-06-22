import {
  buildEvidenceMemoryRouteModel,
  summarizeEvidenceMemoryRouteModel,
  type EvidenceMemoryRouteModel,
} from "../evidence-memory";

export const MEMORY_PROMOTION_REVIEW_LANGUAGE =
  "Memory promotion review | Memory promotion review does not promote memory automatically | Memory promotion review requires explicit operator approval | Memory promotion review shows proposed memory scope retention risk redaction evidence support operator approval and rollback implications | Denied memory promotion paths remain blocked | Memory promotion checklist | Go to Memory Promotion Review";

export function buildMemoryPromotionReviewModel(): EvidenceMemoryRouteModel {
  return buildEvidenceMemoryRouteModel("memory-promotion-review");
}

export function summarizeMemoryPromotionReview(model = buildMemoryPromotionReviewModel()): string {
  return summarizeEvidenceMemoryRouteModel(model);
}
