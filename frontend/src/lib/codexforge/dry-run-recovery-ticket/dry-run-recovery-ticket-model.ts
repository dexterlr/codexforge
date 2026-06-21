import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  DRY_RUN_RECOVERY_TICKET_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildDryRunRecoveryTicketStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { DRY_RUN_RECOVERY_TICKET_LANGUAGE, buildDryRunRecoveryTicketStableKey };

const DRY_RUN_RECOVERY_TICKET_SLUG = "dry-run-recovery-ticket";

export function buildDryRunRecoveryTicket(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(DRY_RUN_RECOVERY_TICKET_SLUG, input);
}

export function buildDryRunRecoveryTicketItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(DRY_RUN_RECOVERY_TICKET_SLUG);
}

export function buildDryRunRecoveryTicketBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeDryRunRecoveryTicket(model: { dryRunRecoveryTicketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(DRY_RUN_RECOVERY_TICKET_SLUG, model.dryRunRecoveryTicketItems);
}

export function buildDryRunRecoveryTicketModel() {
  const dryRunRecoveryTicketItems = buildDryRunRecoveryTicketItems();
  const dryRunRecoveryTicketModel = buildBuildPlanBundleReviewModelForSlug(DRY_RUN_RECOVERY_TICKET_SLUG, dryRunRecoveryTicketItems);
  return { ...dryRunRecoveryTicketModel, dryRunRecoveryTicketItems };
}
