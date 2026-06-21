import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GUARDED_EXECUTION_DRY_RUN_TICKET_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildGuardedExecutionDryRunTicketStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { GUARDED_EXECUTION_DRY_RUN_TICKET_LANGUAGE, buildGuardedExecutionDryRunTicketStableKey };

const GUARDED_EXECUTION_DRY_RUN_TICKET_SLUG = "guarded-execution-dry-run-ticket";

export function buildGuardedExecutionDryRunTicket(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(GUARDED_EXECUTION_DRY_RUN_TICKET_SLUG, input);
}

export function buildGuardedExecutionDryRunTicketItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(GUARDED_EXECUTION_DRY_RUN_TICKET_SLUG);
}

export function buildGuardedExecutionDryRunTicketBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeGuardedExecutionDryRunTicket(model: { guardedExecutionDryRunTicketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(GUARDED_EXECUTION_DRY_RUN_TICKET_SLUG, model.guardedExecutionDryRunTicketItems);
}

export function buildGuardedExecutionDryRunTicketModel() {
  const guardedExecutionDryRunTicketItems = buildGuardedExecutionDryRunTicketItems();
  const guardedExecutionDryRunTicketModel = buildBuildPlanBundleReviewModelForSlug(GUARDED_EXECUTION_DRY_RUN_TICKET_SLUG, guardedExecutionDryRunTicketItems);
  return { ...guardedExecutionDryRunTicketModel, guardedExecutionDryRunTicketItems };
}
