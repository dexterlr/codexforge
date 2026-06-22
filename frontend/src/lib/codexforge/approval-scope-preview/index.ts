import {
  buildGoalCompilerRouteModel,
  summarizeGoalCompilerRouteModel,
  type GoalCompilerRouteModel,
} from "../goal-compiler";

export const APPROVAL_SCOPE_PREVIEW_LANGUAGE =
  "Approval scope preview | Approval scope preview does not persist approvals | Approval scope preview requires explicit human approval | Approval scope preview defines operator identity scope expiry touched files command candidates model/tool needs and denied paths | Denied approval scope paths remain blocked | Approval scope checklist | Go to Approval Scope Preview";

export function buildApprovalScopePreviewModel(): GoalCompilerRouteModel {
  return buildGoalCompilerRouteModel("approval-scope-preview");
}

export function summarizeApprovalScopePreview(model = buildApprovalScopePreviewModel()): string {
  return summarizeGoalCompilerRouteModel(model);
}
