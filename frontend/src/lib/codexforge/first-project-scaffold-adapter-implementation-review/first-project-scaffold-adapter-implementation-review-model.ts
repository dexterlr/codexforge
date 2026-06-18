import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_PROJECT_SCAFFOLD_ADAPTER_IMPLEMENTATION_REVIEW_LANGUAGE,
  buildAdapterImplementationReview,
  buildAdapterImplementationReviewBoundary,
  buildAdapterImplementationReviewModelForSlug,
  buildAdapterImplementationReviewPackets,
  buildAdapterImplementationReviewStableKey as buildFirstProjectScaffoldAdapterImplementationReviewStableKey,
  summarizeAdapterImplementationReviewForSlug,
  type AdapterImplementationReviewPacketInput,
} from "../adapter-implementation-review-kit";

export { FIRST_PROJECT_SCAFFOLD_ADAPTER_IMPLEMENTATION_REVIEW_LANGUAGE, buildFirstProjectScaffoldAdapterImplementationReviewStableKey };

const FIRST_PROJECT_SCAFFOLD_ADAPTER_IMPLEMENTATION_REVIEW_SLUG = "first-project-scaffold-adapter-implementation-review";

export function buildFirstProjectScaffoldAdapterImplementationReview(input: AdapterImplementationReviewPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterImplementationReview(FIRST_PROJECT_SCAFFOLD_ADAPTER_IMPLEMENTATION_REVIEW_SLUG, input);
}

export function buildFirstProjectScaffoldAdapterImplementationReviewItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterImplementationReviewPackets(FIRST_PROJECT_SCAFFOLD_ADAPTER_IMPLEMENTATION_REVIEW_SLUG);
}

export function buildFirstProjectScaffoldAdapterImplementationReviewBoundary() {
  return buildAdapterImplementationReviewBoundary();
}

export function summarizeFirstProjectScaffoldAdapterImplementationReview(model: { firstProjectScaffoldAdapterImplementationReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterImplementationReviewForSlug(FIRST_PROJECT_SCAFFOLD_ADAPTER_IMPLEMENTATION_REVIEW_SLUG, model.firstProjectScaffoldAdapterImplementationReviewItems);
}

export function buildFirstProjectScaffoldAdapterImplementationReviewModel() {
  const firstProjectScaffoldAdapterImplementationReviewItems = buildFirstProjectScaffoldAdapterImplementationReviewItems();
  const model = buildAdapterImplementationReviewModelForSlug(FIRST_PROJECT_SCAFFOLD_ADAPTER_IMPLEMENTATION_REVIEW_SLUG, firstProjectScaffoldAdapterImplementationReviewItems);
  return { ...model, firstProjectScaffoldAdapterImplementationReviewItems };
}
