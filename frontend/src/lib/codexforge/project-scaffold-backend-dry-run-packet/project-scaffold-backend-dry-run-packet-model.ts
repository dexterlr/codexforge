import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  PROJECT_SCAFFOLD_BACKEND_DRY_RUN_PACKET_LANGUAGE,
  buildBackendDryRunModelRouterPreview,
  buildBackendDryRunModelRouterPreviewBoundary,
  buildBackendDryRunModelRouterPreviewModelForSlug,
  buildBackendDryRunModelRouterPreviewPackets,
  buildBackendDryRunModelRouterPreviewStableKey as buildProjectScaffoldBackendDryRunPacketStableKey,
  summarizeBackendDryRunModelRouterPreviewForSlug,
  type BackendDryRunModelRouterPreviewPacketInput,
} from "../backend-dry-run-model-router-preview-kit";

export { PROJECT_SCAFFOLD_BACKEND_DRY_RUN_PACKET_LANGUAGE, buildProjectScaffoldBackendDryRunPacketStableKey };

const PROJECT_SCAFFOLD_BACKEND_DRY_RUN_PACKET_SLUG = "project-scaffold-backend-dry-run-packet";

export function buildProjectScaffoldBackendDryRunPacket(input: BackendDryRunModelRouterPreviewPacketInput): UniversalExecutionReviewPacket {
  return buildBackendDryRunModelRouterPreview(PROJECT_SCAFFOLD_BACKEND_DRY_RUN_PACKET_SLUG, input);
}

export function buildProjectScaffoldBackendDryRunPacketItems(): UniversalExecutionReviewPacket[] {
  return buildBackendDryRunModelRouterPreviewPackets(PROJECT_SCAFFOLD_BACKEND_DRY_RUN_PACKET_SLUG);
}

export function buildProjectScaffoldBackendDryRunPacketBoundary() {
  return buildBackendDryRunModelRouterPreviewBoundary();
}

export function summarizeProjectScaffoldBackendDryRunPacket(model: { projectScaffoldBackendDryRunPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBackendDryRunModelRouterPreviewForSlug(PROJECT_SCAFFOLD_BACKEND_DRY_RUN_PACKET_SLUG, model.projectScaffoldBackendDryRunPacketItems);
}

export function buildProjectScaffoldBackendDryRunPacketModel() {
  const projectScaffoldBackendDryRunPacketItems = buildProjectScaffoldBackendDryRunPacketItems();
  const model = buildBackendDryRunModelRouterPreviewModelForSlug(PROJECT_SCAFFOLD_BACKEND_DRY_RUN_PACKET_SLUG, projectScaffoldBackendDryRunPacketItems);
  return { ...model, projectScaffoldBackendDryRunPacketItems };
}
