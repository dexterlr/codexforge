import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  DRY_RUN_RESULT_TICKET_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildDryRunResultTicketStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { DRY_RUN_RESULT_TICKET_LANGUAGE, buildDryRunResultTicketStableKey };

const DRY_RUN_RESULT_TICKET_SLUG = "dry-run-result-ticket";

export function buildDryRunResultTicket(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(DRY_RUN_RESULT_TICKET_SLUG, input);
}

export function buildDryRunResultTicketItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(DRY_RUN_RESULT_TICKET_SLUG);
}

export function buildDryRunResultTicketBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeDryRunResultTicket(model: { dryRunResultTicketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(DRY_RUN_RESULT_TICKET_SLUG, model.dryRunResultTicketItems);
}

export function buildDryRunResultTicketModel() {
  const dryRunResultTicketItems = buildDryRunResultTicketItems();
  const dryRunResultTicketModel = buildBuildPlanBundleReviewModelForSlug(DRY_RUN_RESULT_TICKET_SLUG, dryRunResultTicketItems);
  return { ...dryRunResultTicketModel, dryRunResultTicketItems };
}
