import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  MODEL_ROUTED_EXECUTION_OPERATOR_TRIAL_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildModelRoutedExecutionOperatorTrialStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { MODEL_ROUTED_EXECUTION_OPERATOR_TRIAL_LANGUAGE, buildModelRoutedExecutionOperatorTrialStableKey };

const MODEL_ROUTED_EXECUTION_OPERATOR_TRIAL_SLUG = "model-routed-execution-operator-trial";

export function buildModelRoutedExecutionOperatorTrial(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(MODEL_ROUTED_EXECUTION_OPERATOR_TRIAL_SLUG, input);
}

export function buildModelRoutedExecutionOperatorTrialItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(MODEL_ROUTED_EXECUTION_OPERATOR_TRIAL_SLUG);
}

export function buildModelRoutedExecutionOperatorTrialBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeModelRoutedExecutionOperatorTrial(model: { modelRoutedExecutionOperatorTrialItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(MODEL_ROUTED_EXECUTION_OPERATOR_TRIAL_SLUG, model.modelRoutedExecutionOperatorTrialItems);
}

export function buildModelRoutedExecutionOperatorTrialModel() {
  const modelRoutedExecutionOperatorTrialItems = buildModelRoutedExecutionOperatorTrialItems();
  const modelRoutedExecutionOperatorTrialModel = buildBackendDryRunModelRouterPreviewModelForSlug(MODEL_ROUTED_EXECUTION_OPERATOR_TRIAL_SLUG, modelRoutedExecutionOperatorTrialItems);
  return { ...modelRoutedExecutionOperatorTrialModel, modelRoutedExecutionOperatorTrialItems };
}
