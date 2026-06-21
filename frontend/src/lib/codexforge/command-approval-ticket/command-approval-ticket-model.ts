import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  COMMAND_APPROVAL_TICKET_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildCommandApprovalTicketStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { COMMAND_APPROVAL_TICKET_LANGUAGE, buildCommandApprovalTicketStableKey };

const COMMAND_APPROVAL_TICKET_SLUG = "command-approval-ticket";

export function buildCommandApprovalTicket(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(COMMAND_APPROVAL_TICKET_SLUG, input);
}

export function buildCommandApprovalTicketItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(COMMAND_APPROVAL_TICKET_SLUG);
}

export function buildCommandApprovalTicketBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeCommandApprovalTicket(model: { commandApprovalTicketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(COMMAND_APPROVAL_TICKET_SLUG, model.commandApprovalTicketItems);
}

export function buildCommandApprovalTicketModel() {
  const commandApprovalTicketItems = buildCommandApprovalTicketItems();
  const commandApprovalTicketModel = buildBuildPlanBundleReviewModelForSlug(COMMAND_APPROVAL_TICKET_SLUG, commandApprovalTicketItems);
  return { ...commandApprovalTicketModel, commandApprovalTicketItems };
}
