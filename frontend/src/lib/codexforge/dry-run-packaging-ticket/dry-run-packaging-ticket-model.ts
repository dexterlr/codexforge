import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  DRY_RUN_PACKAGING_TICKET_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildDryRunPackagingTicketStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { DRY_RUN_PACKAGING_TICKET_LANGUAGE, buildDryRunPackagingTicketStableKey };

const DRY_RUN_PACKAGING_TICKET_SLUG = "dry-run-packaging-ticket";

export function buildDryRunPackagingTicket(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(DRY_RUN_PACKAGING_TICKET_SLUG, input);
}

export function buildDryRunPackagingTicketItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(DRY_RUN_PACKAGING_TICKET_SLUG);
}

export function buildDryRunPackagingTicketBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeDryRunPackagingTicket(model: { dryRunPackagingTicketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(DRY_RUN_PACKAGING_TICKET_SLUG, model.dryRunPackagingTicketItems);
}

export function buildDryRunPackagingTicketModel() {
  const dryRunPackagingTicketItems = buildDryRunPackagingTicketItems();
  const dryRunPackagingTicketModel = buildBuildPlanBundleReviewModelForSlug(DRY_RUN_PACKAGING_TICKET_SLUG, dryRunPackagingTicketItems);
  return { ...dryRunPackagingTicketModel, dryRunPackagingTicketItems };
}
