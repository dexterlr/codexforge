import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  DRY_RUN_DOMAIN_TICKET_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildDryRunDomainTicketStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { DRY_RUN_DOMAIN_TICKET_LANGUAGE, buildDryRunDomainTicketStableKey };

const DRY_RUN_DOMAIN_TICKET_SLUG = "dry-run-domain-ticket";

export function buildDryRunDomainTicket(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(DRY_RUN_DOMAIN_TICKET_SLUG, input);
}

export function buildDryRunDomainTicketItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(DRY_RUN_DOMAIN_TICKET_SLUG);
}

export function buildDryRunDomainTicketBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeDryRunDomainTicket(model: { dryRunDomainTicketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(DRY_RUN_DOMAIN_TICKET_SLUG, model.dryRunDomainTicketItems);
}

export function buildDryRunDomainTicketModel() {
  const dryRunDomainTicketItems = buildDryRunDomainTicketItems();
  const dryRunDomainTicketModel = buildBuildPlanBundleReviewModelForSlug(DRY_RUN_DOMAIN_TICKET_SLUG, dryRunDomainTicketItems);
  return { ...dryRunDomainTicketModel, dryRunDomainTicketItems };
}
