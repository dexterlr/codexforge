import {
  buildUnifiedCockpitRouteModel,
  buildUnifiedCockpitStableKey,
  summarizeUnifiedCockpitRouteModel,
  type UnifiedCockpitRouteModel,
} from "../unified-cockpit";

export const COCKPIT_SINGLE_PAGE_NAVIGATION_CONTRACT_LANGUAGE =
  "Cockpit single-page navigation contract | Cockpit single-page navigation contract does not execute navigation side effects | Single-page navigation keeps goal plan approval execution evidence result and recovery in one cockpit | Phase routes remain deep-linkable dev/test diagnostics | Normal users should not need multi-page phase navigation | Cockpit single-page navigation checklist";

export { buildUnifiedCockpitStableKey as buildCockpitSinglePageNavigationContractStableKey };

export function buildCockpitSinglePageNavigationContractModel(): UnifiedCockpitRouteModel {
  return buildUnifiedCockpitRouteModel("cockpit-single-page-navigation-contract");
}

export function summarizeCockpitSinglePageNavigationContract(model = buildCockpitSinglePageNavigationContractModel()): string {
  return summarizeUnifiedCockpitRouteModel(model);
}
