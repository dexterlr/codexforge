import {
  buildProjectContextBrainRouteModel,
  summarizeProjectContextBrainRouteModel,
  type ProjectContextBrainRouteModel,
} from "../project-context-brain";

export const FIRST_PROJECT_CONTEXT_BRAIN_CANDIDATE_LANGUAGE =
  "First project context brain candidate | First project context brain candidate does not execute inspection from the frontend | First project context brain candidate requires explicit operator approval | Candidate combines workspace identity project map framework runtime package tooling important files command candidates risk zones evidence result recovery and confidence | Denied first project context brain paths remain blocked | First project context brain checklist | Go to First Project Context Brain Candidate";

export function buildFirstProjectContextBrainCandidateModel(): ProjectContextBrainRouteModel {
  return buildProjectContextBrainRouteModel("first-project-context-brain-candidate");
}

export function summarizeFirstProjectContextBrainCandidate(
  model = buildFirstProjectContextBrainCandidateModel()
): string {
  return summarizeProjectContextBrainRouteModel(model);
}
