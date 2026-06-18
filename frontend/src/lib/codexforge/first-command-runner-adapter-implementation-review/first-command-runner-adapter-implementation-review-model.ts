import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FIRST_COMMAND_RUNNER_ADAPTER_IMPLEMENTATION_REVIEW_LANGUAGE,
  buildAdapterImplementationReview,
  buildAdapterImplementationReviewBoundary,
  buildAdapterImplementationReviewModelForSlug,
  buildAdapterImplementationReviewPackets,
  buildAdapterImplementationReviewStableKey as buildFirstCommandRunnerAdapterImplementationReviewStableKey,
  summarizeAdapterImplementationReviewForSlug,
  type AdapterImplementationReviewPacketInput,
} from "../adapter-implementation-review-kit";

export { FIRST_COMMAND_RUNNER_ADAPTER_IMPLEMENTATION_REVIEW_LANGUAGE, buildFirstCommandRunnerAdapterImplementationReviewStableKey };

const FIRST_COMMAND_RUNNER_ADAPTER_IMPLEMENTATION_REVIEW_SLUG = "first-command-runner-adapter-implementation-review";

export function buildFirstCommandRunnerAdapterImplementationReview(input: AdapterImplementationReviewPacketInput): UniversalExecutionReviewPacket {
  return buildAdapterImplementationReview(FIRST_COMMAND_RUNNER_ADAPTER_IMPLEMENTATION_REVIEW_SLUG, input);
}

export function buildFirstCommandRunnerAdapterImplementationReviewItems(): UniversalExecutionReviewPacket[] {
  return buildAdapterImplementationReviewPackets(FIRST_COMMAND_RUNNER_ADAPTER_IMPLEMENTATION_REVIEW_SLUG);
}

export function buildFirstCommandRunnerAdapterImplementationReviewBoundary() {
  return buildAdapterImplementationReviewBoundary();
}

export function summarizeFirstCommandRunnerAdapterImplementationReview(model: { firstCommandRunnerAdapterImplementationReviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeAdapterImplementationReviewForSlug(FIRST_COMMAND_RUNNER_ADAPTER_IMPLEMENTATION_REVIEW_SLUG, model.firstCommandRunnerAdapterImplementationReviewItems);
}

export function buildFirstCommandRunnerAdapterImplementationReviewModel() {
  const firstCommandRunnerAdapterImplementationReviewItems = buildFirstCommandRunnerAdapterImplementationReviewItems();
  const model = buildAdapterImplementationReviewModelForSlug(FIRST_COMMAND_RUNNER_ADAPTER_IMPLEMENTATION_REVIEW_SLUG, firstCommandRunnerAdapterImplementationReviewItems);
  return { ...model, firstCommandRunnerAdapterImplementationReviewItems };
}
