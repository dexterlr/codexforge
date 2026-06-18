import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  ADAPTER_IMPLEMENTATION_SANDBOX_REVIEW_LANGUAGE,
  buildAdapterImplementationReview,
  buildAdapterImplementationReviewBoundary,
  buildAdapterImplementationReviewModelForSlug,
  buildAdapterImplementationReviewPackets,
  buildAdapterImplementationReviewStableKey as buildAdapterImplementationSandboxReviewStableKey,
  summarizeAdapterImplementationReviewForSlug,
  type AdapterImplementationReviewPacketInput,
} from "../adapter-implementation-review-kit";

export { ADAPTER_IMPLEMENTATION_SANDBOX_REVIEW_LANGUAGE, buildAdapterImplementationSandboxReviewStableKey };

const ADAPTER_IMPLEMENTATION_SANDBOX_REVIEW_SLUG = "adapter-implementation-sandbox-review";

export function buildAdapterImplementationSandboxReview(input: AdapterImplementationReviewPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterImplementationReview(ADAPTER_IMPLEMENTATION_SANDBOX_REVIEW_SLUG, input);
}

export function buildAdapterImplementationSandboxReviewItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterImplementationReviewPackets(ADAPTER_IMPLEMENTATION_SANDBOX_REVIEW_SLUG);
}

export function buildAdapterImplementationSandboxReviewBoundary() {
  return buildAdapterImplementationReviewBoundary();
}

export function summarizeAdapterImplementationSandboxReview(model: { adapterImplementationSandboxReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterImplementationReviewForSlug(ADAPTER_IMPLEMENTATION_SANDBOX_REVIEW_SLUG, model.adapterImplementationSandboxReviewItems);
}

export function buildAdapterImplementationSandboxReviewModel() {
  const adapterImplementationSandboxReviewItems = buildAdapterImplementationSandboxReviewItems();
  const model = buildAdapterImplementationReviewModelForSlug(ADAPTER_IMPLEMENTATION_SANDBOX_REVIEW_SLUG, adapterImplementationSandboxReviewItems);
  return { ...model, adapterImplementationSandboxReviewItems };
}
