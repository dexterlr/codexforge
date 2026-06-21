import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  FILE_WRITE_APPROVAL_TICKET_LANGUAGE,
  buildBuildPlanBundleReview,
  buildBuildPlanBundleReviewBoundary,
  buildBuildPlanBundleReviewModelForSlug,
  buildBuildPlanBundleReviewPackets,
  buildBuildPlanBundleReviewStableKey as buildFileWriteApprovalTicketStableKey,
  summarizeBuildPlanBundleReviewForSlug,
  type BuildPlanBundleReviewPacketInput,
} from "../build-plan-bundle-preview-kit";

export { FILE_WRITE_APPROVAL_TICKET_LANGUAGE, buildFileWriteApprovalTicketStableKey };

const FILE_WRITE_APPROVAL_TICKET_SLUG = "file-write-approval-ticket";

export function buildFileWriteApprovalTicket(input: BuildPlanBundleReviewPacketInput): UniversalExecutionReviewPacket {
  return buildBuildPlanBundleReview(FILE_WRITE_APPROVAL_TICKET_SLUG, input);
}

export function buildFileWriteApprovalTicketItems(): UniversalExecutionReviewPacket[] {
  return buildBuildPlanBundleReviewPackets(FILE_WRITE_APPROVAL_TICKET_SLUG);
}

export function buildFileWriteApprovalTicketBoundary() {
  return buildBuildPlanBundleReviewBoundary();
}

export function summarizeFileWriteApprovalTicket(model: { fileWriteApprovalTicketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeBuildPlanBundleReviewForSlug(FILE_WRITE_APPROVAL_TICKET_SLUG, model.fileWriteApprovalTicketItems);
}

export function buildFileWriteApprovalTicketModel() {
  const fileWriteApprovalTicketItems = buildFileWriteApprovalTicketItems();
  const fileWriteApprovalTicketModel = buildBuildPlanBundleReviewModelForSlug(FILE_WRITE_APPROVAL_TICKET_SLUG, fileWriteApprovalTicketItems);
  return { ...fileWriteApprovalTicketModel, fileWriteApprovalTicketItems };
}
