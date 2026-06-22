import {
  buildGuidedOperatorRunRouteModel,
  buildGuidedOperatorRunStableKey,
  summarizeGuidedOperatorRunRouteModel,
  type GuidedOperatorRunRouteModel,
} from "../guided-operator-run";

export const GUIDED_OPERATOR_SAFETY_INTERLOCKS_LANGUAGE =
  "Guided operator safety interlocks | Guided operator safety interlocks do not release actions | Guided operator safety interlocks require explicit operator approval | Safety interlocks block file writes commands models providers connectors runtimes adapters persistence export recovery queues and memory promotion | Denied guided operator safety paths remain blocked | Guided operator safety interlocks checklist | Go to Guided Operator Safety Interlocks";

export { buildGuidedOperatorRunStableKey as buildGuidedOperatorSafetyInterlocksStableKey };

export function buildGuidedOperatorSafetyInterlocksModel(): GuidedOperatorRunRouteModel {
  return buildGuidedOperatorRunRouteModel("guided-operator-safety-interlocks");
}

export function summarizeGuidedOperatorSafetyInterlocks(model = buildGuidedOperatorSafetyInterlocksModel()): string {
  return summarizeGuidedOperatorRunRouteModel(model);
}
