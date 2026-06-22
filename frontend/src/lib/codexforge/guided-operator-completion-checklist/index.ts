import {
  buildGuidedOperatorRunRouteModel,
  buildGuidedOperatorRunStableKey,
  summarizeGuidedOperatorRunRouteModel,
  type GuidedOperatorRunRouteModel,
} from "../guided-operator-run";

export const GUIDED_OPERATOR_COMPLETION_CHECKLIST_LANGUAGE =
  "Guided operator completion checklist | Guided operator completion checklist does not mark real work complete | Guided operator completion checklist requires explicit operator approval before future completion | Completion checklist shows reviewed goal plan diff command approval evidence result recovery timeline and denied paths | Denied guided operator completion paths remain blocked | Guided operator completion checklist | Go to Guided Operator Completion Checklist";

export { buildGuidedOperatorRunStableKey as buildGuidedOperatorCompletionChecklistStableKey };

export function buildGuidedOperatorCompletionChecklistModel(): GuidedOperatorRunRouteModel {
  return buildGuidedOperatorRunRouteModel("guided-operator-completion-checklist");
}

export function summarizeGuidedOperatorCompletionChecklist(model = buildGuidedOperatorCompletionChecklistModel()): string {
  return summarizeGuidedOperatorRunRouteModel(model);
}
