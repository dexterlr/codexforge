import {
  buildGuidedOperatorRunRouteModel,
  buildGuidedOperatorRunStableKey,
  summarizeGuidedOperatorRunRouteModel,
  type GuidedOperatorRunRouteModel,
} from "../guided-operator-run";

export const GUIDED_OPERATOR_RUN_BOUNDARY_LANGUAGE =
  "Guided operator run boundary | Guided operator run boundary does not call models write files or run commands | Guided operator run requires explicit operator approval | Guided operator run unifies goal plan diff command approval holds evidence result recovery timeline and completion | Denied guided operator run paths remain blocked | Guided operator run checklist | Go to Guided Operator Run Boundary";

export { buildGuidedOperatorRunStableKey as buildGuidedOperatorRunBoundaryStableKey };

export function buildGuidedOperatorRunBoundaryModel(): GuidedOperatorRunRouteModel {
  return buildGuidedOperatorRunRouteModel("guided-operator-run-boundary");
}

export function summarizeGuidedOperatorRunBoundary(model = buildGuidedOperatorRunBoundaryModel()): string {
  return summarizeGuidedOperatorRunRouteModel(model);
}
