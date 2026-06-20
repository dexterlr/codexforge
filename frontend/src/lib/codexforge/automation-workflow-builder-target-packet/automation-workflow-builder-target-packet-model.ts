import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  AUTOMATION_WORKFLOW_BUILDER_TARGET_PACKET_LANGUAGE,
  buildUniversalProjectBuilderReview,
  buildUniversalProjectBuilderReviewBoundary,
  buildUniversalProjectBuilderReviewModelForSlug,
  buildUniversalProjectBuilderReviewPackets,
  buildUniversalProjectBuilderReviewStableKey as buildAutomationWorkflowBuilderTargetPacketStableKey,
  summarizeUniversalProjectBuilderReviewForSlug,
  type UniversalProjectBuilderReviewPacketInput,
} from "../universal-project-builder-preview-kit";

export { AUTOMATION_WORKFLOW_BUILDER_TARGET_PACKET_LANGUAGE, buildAutomationWorkflowBuilderTargetPacketStableKey };

const AUTOMATION_WORKFLOW_BUILDER_TARGET_PACKET_SLUG = "automation-workflow-builder-target-packet";

export function buildAutomationWorkflowBuilderTargetPacket(input: UniversalProjectBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildUniversalProjectBuilderReview(AUTOMATION_WORKFLOW_BUILDER_TARGET_PACKET_SLUG, input);
}

export function buildAutomationWorkflowBuilderTargetPacketItems(): UniversalExecutionReviewPacket[] {
  return buildUniversalProjectBuilderReviewPackets(AUTOMATION_WORKFLOW_BUILDER_TARGET_PACKET_SLUG);
}

export function buildAutomationWorkflowBuilderTargetPacketBoundary() {
  return buildUniversalProjectBuilderReviewBoundary();
}

export function summarizeAutomationWorkflowBuilderTargetPacket(model: { automationWorkflowBuilderTargetPacketItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeUniversalProjectBuilderReviewForSlug(AUTOMATION_WORKFLOW_BUILDER_TARGET_PACKET_SLUG, model.automationWorkflowBuilderTargetPacketItems);
}

export function buildAutomationWorkflowBuilderTargetPacketModel() {
  const automationWorkflowBuilderTargetPacketItems = buildAutomationWorkflowBuilderTargetPacketItems();
  const automationWorkflowBuilderTargetPacketModel = buildUniversalProjectBuilderReviewModelForSlug(AUTOMATION_WORKFLOW_BUILDER_TARGET_PACKET_SLUG, automationWorkflowBuilderTargetPacketItems);
  return { ...automationWorkflowBuilderTargetPacketModel, automationWorkflowBuilderTargetPacketItems };
}
