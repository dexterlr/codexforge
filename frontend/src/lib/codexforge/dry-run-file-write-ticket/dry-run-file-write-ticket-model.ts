import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  DRY_RUN_FILE_WRITE_TICKET_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildDryRunFileWriteTicketStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { DRY_RUN_FILE_WRITE_TICKET_LANGUAGE, buildDryRunFileWriteTicketStableKey };

const DRY_RUN_FILE_WRITE_TICKET_SLUG = "dry-run-file-write-ticket";

export function buildDryRunFileWriteTicket(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(DRY_RUN_FILE_WRITE_TICKET_SLUG, input);
}

export function buildDryRunFileWriteTicketItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(DRY_RUN_FILE_WRITE_TICKET_SLUG);
}

export function buildDryRunFileWriteTicketBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeDryRunFileWriteTicket(model: { dryRunFileWriteTicketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(DRY_RUN_FILE_WRITE_TICKET_SLUG, model.dryRunFileWriteTicketItems);
}

export function buildDryRunFileWriteTicketModel() {
  const dryRunFileWriteTicketItems = buildDryRunFileWriteTicketItems();
  const dryRunFileWriteTicketModel = buildBuildPlanBundleReviewModelForSlug(DRY_RUN_FILE_WRITE_TICKET_SLUG, dryRunFileWriteTicketItems);
  return { ...dryRunFileWriteTicketModel, dryRunFileWriteTicketItems };
}
