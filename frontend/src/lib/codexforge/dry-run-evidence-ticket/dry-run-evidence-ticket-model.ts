import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  DRY_RUN_EVIDENCE_TICKET_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildDryRunEvidenceTicketStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { DRY_RUN_EVIDENCE_TICKET_LANGUAGE, buildDryRunEvidenceTicketStableKey };

const DRY_RUN_EVIDENCE_TICKET_SLUG = "dry-run-evidence-ticket";

export function buildDryRunEvidenceTicket(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(DRY_RUN_EVIDENCE_TICKET_SLUG, input);
}

export function buildDryRunEvidenceTicketItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(DRY_RUN_EVIDENCE_TICKET_SLUG);
}

export function buildDryRunEvidenceTicketBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeDryRunEvidenceTicket(model: { dryRunEvidenceTicketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(DRY_RUN_EVIDENCE_TICKET_SLUG, model.dryRunEvidenceTicketItems);
}

export function buildDryRunEvidenceTicketModel() {
  const dryRunEvidenceTicketItems = buildDryRunEvidenceTicketItems();
  const dryRunEvidenceTicketModel = buildBuildPlanBundleReviewModelForSlug(DRY_RUN_EVIDENCE_TICKET_SLUG, dryRunEvidenceTicketItems);
  return { ...dryRunEvidenceTicketModel, dryRunEvidenceTicketItems };
}
