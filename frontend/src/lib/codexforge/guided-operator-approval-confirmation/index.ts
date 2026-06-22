import {
  buildGuidedOperatorRunRouteModel,
  buildGuidedOperatorRunStableKey,
  summarizeGuidedOperatorRunRouteModel,
  type GuidedOperatorRunRouteModel,
} from "../guided-operator-run";

export const GUIDED_OPERATOR_APPROVAL_CONFIRMATION_LANGUAGE =
  "Guided operator approval confirmation | Guided operator approval confirmation does not approve actions | Guided operator approval confirmation requires explicit human approval | Approval confirmation explains exactly what would be approved and what remains blocked | Denied guided operator approval paths remain blocked | Guided operator approval confirmation checklist | Go to Guided Operator Approval Confirmation";

export { buildGuidedOperatorRunStableKey as buildGuidedOperatorApprovalConfirmationStableKey };

export function buildGuidedOperatorApprovalConfirmationModel(): GuidedOperatorRunRouteModel {
  return buildGuidedOperatorRunRouteModel("guided-operator-approval-confirmation");
}

export function summarizeGuidedOperatorApprovalConfirmation(model = buildGuidedOperatorApprovalConfirmationModel()): string {
  return summarizeGuidedOperatorRunRouteModel(model);
}
