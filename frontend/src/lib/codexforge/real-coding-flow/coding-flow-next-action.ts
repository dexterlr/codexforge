import { buildCodingFlowRouteHandoff } from "./coding-flow-route-handoff";
import type { CodingFlowInput, CodingFlowNextAction, CodingFlowNextActionPlan } from "./real-coding-flow-types";

function action(id: string, label: string, route: CodingFlowNextAction["route"], reason: string, requiresApproval = false, copyPayload: string | null = null): CodingFlowNextAction {
  return { id, label, route, reason, copyPayload, requiresApproval, noMutation: true };
}

export function selectCodingFlowNextAction(input: CodingFlowInput): CodingFlowNextAction {
  if (input.currentStep === "blocked") return action("unblock-flow", "Resolve the smallest blocked step", "/code-flow", "Flow is blocked.");
  if (!input.selectedFilePath) return action("open-files", "Open Files", "/files", "No file selected.");
  if (!input.requestedChangeText) return action("describe-change", "Describe change", "/code-flow", "No change text supplied.");
  if (!input.previewId) return action("prepare-preview", "Prepare preview patch", "/files", "Preview patch is missing.");
  if (!input.applyRequestId) return action("review-apply", "Review apply request", "/files", "Preview exists but approval is missing.", true);
  if (!input.validationRequestId) return action("prepare-validation", "Prepare validation", "/validation", "Apply is ready but validation is missing.");
  if (input.resultStatus === "fail") return action("open-closed-loop", "Open Closed Loop Fix", "/closed-loop", "Validation failed.");
  if (input.resultStatus === "pass") return action("commit-handoff", "Suggest commit/tag/push handoff", "/code-flow", "Validation passed.", true);
  return action("review-validation", "Review validation result", "/validation", "Validation result is unknown.");
}

export function buildCodingFlowNextActionPlan(input: CodingFlowInput): CodingFlowNextActionPlan {
  const selected = selectCodingFlowNextAction(input);
  const actions = [
    selected,
    action("copy-patch-request", "Copy code-flow patch request", "/code-flow", "Copy handoff only.", false, buildCodingFlowRouteHandoff("Copy patch request").copyPayload ?? "Copy patch request: selected file, requested change, constraints, and acceptance criteria."),
    action("copy-validation-checklist", "Copy code-flow validation checklist", "/validation", "Copy handoff only.", false, "npm run build\nnpm run smoke:codexforge:server\ngit diff --check\ngit status --short"),
  ];
  return { selected, actions, smallestUnblockStep: selected.reason };
}

export function summarizeCodingFlowNextAction(action: CodingFlowNextAction): string {
  return `${action.label} at ${action.route}: ${action.reason}`;
}
