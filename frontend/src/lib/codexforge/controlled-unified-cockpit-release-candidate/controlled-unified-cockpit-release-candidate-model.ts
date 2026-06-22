import {
  buildUnifiedCockpitRouteModel,
  buildUnifiedCockpitStableKey,
  summarizeUnifiedCockpitRouteModel,
  type UnifiedCockpitRouteModel,
} from "../unified-cockpit";

export const CONTROLLED_UNIFIED_COCKPIT_RELEASE_CANDIDATE_LANGUAGE =
  "Controlled unified cockpit release candidate | Controlled unified cockpit release candidate does not call models execute commands or write files | Controlled unified cockpit release requires explicit operator approval | Release candidate makes the cockpit the preferred normal user surface | Denied controlled unified cockpit paths remain blocked | Controlled unified cockpit release checklist";

export { buildUnifiedCockpitStableKey as buildControlledUnifiedCockpitReleaseCandidateStableKey };

export function buildControlledUnifiedCockpitReleaseCandidateModel(): UnifiedCockpitRouteModel {
  return buildUnifiedCockpitRouteModel("controlled-unified-cockpit-release-candidate");
}

export function summarizeControlledUnifiedCockpitReleaseCandidate(model = buildControlledUnifiedCockpitReleaseCandidateModel()): string {
  return summarizeUnifiedCockpitRouteModel(model);
}
