import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  DRY_RUN_ADAPTER_TICKET_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildDryRunAdapterTicketStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { DRY_RUN_ADAPTER_TICKET_LANGUAGE, buildDryRunAdapterTicketStableKey };

const DRY_RUN_ADAPTER_TICKET_SLUG = "dry-run-adapter-ticket";

export function buildDryRunAdapterTicket(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(DRY_RUN_ADAPTER_TICKET_SLUG, input);
}

export function buildDryRunAdapterTicketItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(DRY_RUN_ADAPTER_TICKET_SLUG);
}

export function buildDryRunAdapterTicketBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeDryRunAdapterTicket(model: { dryRunAdapterTicketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(DRY_RUN_ADAPTER_TICKET_SLUG, model.dryRunAdapterTicketItems);
}

export function buildDryRunAdapterTicketModel() {
  const dryRunAdapterTicketItems = buildDryRunAdapterTicketItems();
  const dryRunAdapterTicketModel = buildBuildPlanBundleReviewModelForSlug(DRY_RUN_ADAPTER_TICKET_SLUG, dryRunAdapterTicketItems);
  return { ...dryRunAdapterTicketModel, dryRunAdapterTicketItems };
}
