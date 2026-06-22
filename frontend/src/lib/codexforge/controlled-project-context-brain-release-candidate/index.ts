import {
  buildProjectContextBrainRouteModel,
  summarizeProjectContextBrainRouteModel,
  type ProjectContextBrainRouteModel,
} from "../project-context-brain";

export const CONTROLLED_PROJECT_CONTEXT_BRAIN_RELEASE_CANDIDATE_LANGUAGE =
  "Controlled project context brain release candidate | Controlled project context brain release candidate does not call models browse arbitrary files write files run commands persist approvals create queues persist evidence results audit or promote memory from the frontend | Controlled project context brain release requires explicit operator approval | Release candidate prepares CodexForge for backend-owned project context inspection without broad execution | Denied controlled project context brain paths remain blocked | Controlled project context brain release checklist | Go to Controlled Project Context Brain Release Candidate";

export function buildControlledProjectContextBrainReleaseCandidateModel(): ProjectContextBrainRouteModel {
  return buildProjectContextBrainRouteModel("controlled-project-context-brain-release-candidate");
}

export function summarizeControlledProjectContextBrainReleaseCandidate(
  model = buildControlledProjectContextBrainReleaseCandidateModel()
): string {
  return summarizeProjectContextBrainRouteModel(model);
}
