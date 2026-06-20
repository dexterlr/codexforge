import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  PROJECT_SCAFFOLD_MODEL_ROUTED_EXECUTION_PREVIEW_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildProjectScaffoldModelRoutedExecutionPreviewStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { PROJECT_SCAFFOLD_MODEL_ROUTED_EXECUTION_PREVIEW_LANGUAGE, buildProjectScaffoldModelRoutedExecutionPreviewStableKey };

const PROJECT_SCAFFOLD_MODEL_ROUTED_EXECUTION_PREVIEW_SLUG = "project-scaffold-model-routed-execution-preview";

export function buildProjectScaffoldModelRoutedExecutionPreview(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(PROJECT_SCAFFOLD_MODEL_ROUTED_EXECUTION_PREVIEW_SLUG, input);
}

export function buildProjectScaffoldModelRoutedExecutionPreviewItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(PROJECT_SCAFFOLD_MODEL_ROUTED_EXECUTION_PREVIEW_SLUG);
}

export function buildProjectScaffoldModelRoutedExecutionPreviewBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeProjectScaffoldModelRoutedExecutionPreview(model: { projectScaffoldModelRoutedExecutionPreviewItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(PROJECT_SCAFFOLD_MODEL_ROUTED_EXECUTION_PREVIEW_SLUG, model.projectScaffoldModelRoutedExecutionPreviewItems);
}

export function buildProjectScaffoldModelRoutedExecutionPreviewModel() {
  const projectScaffoldModelRoutedExecutionPreviewItems = buildProjectScaffoldModelRoutedExecutionPreviewItems();
  const projectScaffoldModelRoutedExecutionPreviewModel = buildBackendDryRunModelRouterPreviewModelForSlug(PROJECT_SCAFFOLD_MODEL_ROUTED_EXECUTION_PREVIEW_SLUG, projectScaffoldModelRoutedExecutionPreviewItems);
  return { ...projectScaffoldModelRoutedExecutionPreviewModel, projectScaffoldModelRoutedExecutionPreviewItems };
}
