import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  GUIDED_BUILD_REQUIREMENT_CHECKLIST_LANGUAGE,
  buildGuidedBuildWorkflowReview,
  buildGuidedBuildWorkflowReviewBoundary,
  buildGuidedBuildWorkflowReviewModelForSlug,
  buildGuidedBuildWorkflowReviewPackets,
  buildGuidedBuildWorkflowReviewStableKey as buildGuidedBuildRequirementChecklistStableKey,
  summarizeGuidedBuildWorkflowReviewForSlug,
  type GuidedBuildWorkflowReviewPacketInput,
} from "../guided-build-workflow-preview-kit";

export { GUIDED_BUILD_REQUIREMENT_CHECKLIST_LANGUAGE, buildGuidedBuildRequirementChecklistStableKey };

const GUIDED_BUILD_REQUIREMENT_CHECKLIST_SLUG = "guided-build-requirement-checklist";

export function buildGuidedBuildRequirementChecklist(input: GuidedBuildWorkflowReviewPacketInput): UniversalExecutionReviewPacket {
  return buildGuidedBuildWorkflowReview(GUIDED_BUILD_REQUIREMENT_CHECKLIST_SLUG, input);
}

export function buildGuidedBuildRequirementChecklistItems(): UniversalExecutionReviewPacket[] {
  return buildGuidedBuildWorkflowReviewPackets(GUIDED_BUILD_REQUIREMENT_CHECKLIST_SLUG);
}

export function buildGuidedBuildRequirementChecklistBoundary() {
  return buildGuidedBuildWorkflowReviewBoundary();
}

export function summarizeGuidedBuildRequirementChecklist(model: { guidedBuildRequirementChecklistItems: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeGuidedBuildWorkflowReviewForSlug(GUIDED_BUILD_REQUIREMENT_CHECKLIST_SLUG, model.guidedBuildRequirementChecklistItems);
}

export function buildGuidedBuildRequirementChecklistModel() {
  const guidedBuildRequirementChecklistItems = buildGuidedBuildRequirementChecklistItems();
  const guidedBuildRequirementChecklistModel = buildGuidedBuildWorkflowReviewModelForSlug(GUIDED_BUILD_REQUIREMENT_CHECKLIST_SLUG, guidedBuildRequirementChecklistItems);
  return { ...guidedBuildRequirementChecklistModel, guidedBuildRequirementChecklistItems };
}

