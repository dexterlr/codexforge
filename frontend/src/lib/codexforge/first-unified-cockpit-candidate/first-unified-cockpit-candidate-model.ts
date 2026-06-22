import {
  buildUnifiedCockpitRouteModel,
  buildUnifiedCockpitStableKey,
  summarizeUnifiedCockpitRouteModel,
  type UnifiedCockpitRouteModel,
} from "../unified-cockpit";

export const FIRST_UNIFIED_COCKPIT_CANDIDATE_LANGUAGE =
  "First unified cockpit candidate | First unified cockpit candidate does not execute commands or write files | First unified cockpit candidate requires explicit operator approval | Candidate combines goal plan diff command approval execution evidence result recovery safety and dev-surface drawer | Denied first unified cockpit paths remain blocked | First unified cockpit checklist";

export { buildUnifiedCockpitStableKey as buildFirstUnifiedCockpitCandidateStableKey };

export function buildFirstUnifiedCockpitCandidateModel(): UnifiedCockpitRouteModel {
  return buildUnifiedCockpitRouteModel("first-unified-cockpit-candidate");
}

export function summarizeFirstUnifiedCockpitCandidate(model = buildFirstUnifiedCockpitCandidateModel()): string {
  return summarizeUnifiedCockpitRouteModel(model);
}
