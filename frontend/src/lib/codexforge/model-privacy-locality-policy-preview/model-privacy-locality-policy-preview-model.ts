import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  MODEL_PRIVACY_LOCALITY_POLICY_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildModelPrivacyLocalityPolicyPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { MODEL_PRIVACY_LOCALITY_POLICY_PREVIEW_LANGUAGE, buildModelPrivacyLocalityPolicyPreviewStableKey };

const MODEL_PRIVACY_LOCALITY_POLICY_PREVIEW_SLUG = "model-privacy-locality-policy-preview";

export function buildModelPrivacyLocalityPolicyPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(MODEL_PRIVACY_LOCALITY_POLICY_PREVIEW_SLUG, input);
}

export function buildModelPrivacyLocalityPolicyPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(MODEL_PRIVACY_LOCALITY_POLICY_PREVIEW_SLUG);
}

export function buildModelPrivacyLocalityPolicyPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeModelPrivacyLocalityPolicyPreview(model: { modelPrivacyLocalityPolicyPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(MODEL_PRIVACY_LOCALITY_POLICY_PREVIEW_SLUG, model.modelPrivacyLocalityPolicyPreviewItems);
}

export function buildModelPrivacyLocalityPolicyPreviewModel() {
  const modelPrivacyLocalityPolicyPreviewItems = buildModelPrivacyLocalityPolicyPreviewItems();
  const model = buildBackendDryRunModelRouterPreviewModelForSlug(MODEL_PRIVACY_LOCALITY_POLICY_PREVIEW_SLUG, modelPrivacyLocalityPolicyPreviewItems);
  return { ...model, modelPrivacyLocalityPolicyPreviewItems };
}
