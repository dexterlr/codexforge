import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  DRY_RUN_COMMAND_TICKET_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildDryRunCmdTicketStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { DRY_RUN_COMMAND_TICKET_LANGUAGE, buildDryRunCmdTicketStableKey };

const DRY_RUN_COMMAND_TICKET_SLUG = "dry-run-command-ticket";

export function buildDryRunCmdTicket(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(DRY_RUN_COMMAND_TICKET_SLUG, input);
}

export function buildDryRunCmdTicketItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(DRY_RUN_COMMAND_TICKET_SLUG);
}

export function buildDryRunCmdTicketBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeDryRunCmdTicket(model: { dryRunCmdTicketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(DRY_RUN_COMMAND_TICKET_SLUG, model.dryRunCmdTicketItems);
}

export function buildDryRunCmdTicketModel() {
  const dryRunCmdTicketItems = buildDryRunCmdTicketItems();
  const dryRunCmdTicketModel = buildBuildPlanBundleReviewModelForSlug(DRY_RUN_COMMAND_TICKET_SLUG, dryRunCmdTicketItems);
  return { ...dryRunCmdTicketModel, dryRunCmdTicketItems };
}
