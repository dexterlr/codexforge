import {
  buildProjectContextBrainRouteModel,
  summarizeProjectContextBrainRouteModel,
  type ProjectContextBrainRouteModel,
} from "../project-context-brain";

export const CONTEXT_CONFIDENCE_REVIEW_LANGUAGE =
  "Context confidence review | Context confidence review does not overclaim project understanding | Context confidence review requires explicit operator approval for backend-owned inspection | Context confidence review shows known inferred unknown blocked and needs-approval context levels | Denied context confidence paths remain blocked | Context confidence checklist | Go to Context Confidence Review";

export function buildContextConfidenceReviewModel(): ProjectContextBrainRouteModel {
  return buildProjectContextBrainRouteModel("context-confidence-review");
}

export function summarizeContextConfidenceReview(model = buildContextConfidenceReviewModel()): string {
  return summarizeProjectContextBrainRouteModel(model);
}
