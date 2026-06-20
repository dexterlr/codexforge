import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  LOCAL_MODEL_BRIDGE_DRY_RUN_LANGUAGE,
  buildModelRouterProviderReadinessReview,
  buildModelRouterProviderReadinessReviewBoundary,
  buildModelRouterProviderReadinessReviewModelForSlug,
  buildModelRouterProviderReadinessReviewPackets,
  buildModelRouterProviderReadinessReviewStableKey as buildLocalModelBridgeDryRunStableKey,
  summarizeModelRouterProviderReadinessReviewForSlug,
  type ModelRouterProviderReadinessReviewPacketInput,
} from "../model-router-provider-readiness-review-kit";

export { LOCAL_MODEL_BRIDGE_DRY_RUN_LANGUAGE, buildLocalModelBridgeDryRunStableKey };

const LOCAL_MODEL_BRIDGE_DRY_RUN_SLUG = "local-model-bridge-dry-run";

export function buildLocalModelBridgeDryRun(input: ModelRouterProviderReadinessReviewPacketInput): UniversalExecutionReviewPacket {
  return buildModelRouterProviderReadinessReview(LOCAL_MODEL_BRIDGE_DRY_RUN_SLUG, input);
}

export function buildLocalModelBridgeDryRunItems(): UniversalExecutionReviewPacket[] {
  return buildModelRouterProviderReadinessReviewPackets(LOCAL_MODEL_BRIDGE_DRY_RUN_SLUG);
}

export function buildLocalModelBridgeDryRunBoundary() {
  return buildModelRouterProviderReadinessReviewBoundary();
}

export function summarizeLocalModelBridgeDryRun(model: { localModelBridgeDryRunItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeModelRouterProviderReadinessReviewForSlug(LOCAL_MODEL_BRIDGE_DRY_RUN_SLUG, model.localModelBridgeDryRunItems);
}

export function buildLocalModelBridgeDryRunModel() {
  const localModelBridgeDryRunItems = buildLocalModelBridgeDryRunItems();
  const localModelBridgeDryRunModel = buildModelRouterProviderReadinessReviewModelForSlug(LOCAL_MODEL_BRIDGE_DRY_RUN_SLUG, localModelBridgeDryRunItems);
  return { ...localModelBridgeDryRunModel, localModelBridgeDryRunItems };
}
