import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  DRY_RUN_RUNTIME_TICKET_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildDryRunRuntimeTicketStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { DRY_RUN_RUNTIME_TICKET_LANGUAGE, buildDryRunRuntimeTicketStableKey };

const DRY_RUN_RUNTIME_TICKET_SLUG = "dry-run-runtime-ticket";

export function buildDryRunRuntimeTicket(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(DRY_RUN_RUNTIME_TICKET_SLUG, input);
}

export function buildDryRunRuntimeTicketItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(DRY_RUN_RUNTIME_TICKET_SLUG);
}

export function buildDryRunRuntimeTicketBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeDryRunRuntimeTicket(model: { dryRunRuntimeTicketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(DRY_RUN_RUNTIME_TICKET_SLUG, model.dryRunRuntimeTicketItems);
}

export function buildDryRunRuntimeTicketModel() {
  const dryRunRuntimeTicketItems = buildDryRunRuntimeTicketItems();
  const dryRunRuntimeTicketModel = buildBuildPlanBundleReviewModelForSlug(DRY_RUN_RUNTIME_TICKET_SLUG, dryRunRuntimeTicketItems);
  return { ...dryRunRuntimeTicketModel, dryRunRuntimeTicketItems };
}
