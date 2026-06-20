import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  BACKEND_EXECUTION_ROUTER_INTEGRATION_BOUNDARY_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildBackendExecutionRouterIntegrationBoundaryStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { BACKEND_EXECUTION_ROUTER_INTEGRATION_BOUNDARY_LANGUAGE, buildBackendExecutionRouterIntegrationBoundaryStableKey };

const BACKEND_EXECUTION_ROUTER_INTEGRATION_BOUNDARY_SLUG = "backend-execution-router-integration-boundary";

export function buildBackendExecutionRouterIntegrationBoundary(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(BACKEND_EXECUTION_ROUTER_INTEGRATION_BOUNDARY_SLUG, input);
}

export function buildBackendExecutionRouterIntegrationBoundaryItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(BACKEND_EXECUTION_ROUTER_INTEGRATION_BOUNDARY_SLUG);
}

export function buildBackendExecutionRouterIntegrationBoundaryBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeBackendExecutionRouterIntegrationBoundary(model: { backendExecutionRouterIntegrationBoundaryItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(BACKEND_EXECUTION_ROUTER_INTEGRATION_BOUNDARY_SLUG, model.backendExecutionRouterIntegrationBoundaryItems);
}

export function buildBackendExecutionRouterIntegrationBoundaryModel() {
  const backendExecutionRouterIntegrationBoundaryItems = buildBackendExecutionRouterIntegrationBoundaryItems();
  const backendExecutionRouterIntegrationBoundaryModel = buildBackendDryRunModelRouterPreviewModelForSlug(BACKEND_EXECUTION_ROUTER_INTEGRATION_BOUNDARY_SLUG, backendExecutionRouterIntegrationBoundaryItems);
  return { ...backendExecutionRouterIntegrationBoundaryModel, backendExecutionRouterIntegrationBoundaryItems };
}
