import { buildWorkflowResultStableKey, type WorkflowResultFinalStatus, type WorkflowResultNextAction, type WorkflowResultNextActionPlan, type WorkflowResultReview, type WorkflowResultRoute, type WorkflowResultStoragePolicy } from "./workflow-result-types";

function action(label: string, route: WorkflowResultRoute, reason: string): WorkflowResultNextAction {
  return {
    actionId: buildWorkflowResultStableKey("workflow-result-next-action", label, route, reason),
    label,
    route,
    reason,
    copyPayload: `${label}: ${reason}`,
    requiresReview: true,
    noMutation: true,
  };
}

export function selectWorkflowResultNextAction(args: { finalStatus?: WorkflowResultFinalStatus; review?: WorkflowResultReview | null; policy?: WorkflowResultStoragePolicy | null; memoryCandidateReady?: boolean } = {}): WorkflowResultNextAction {
  if (args.review && args.review.reviewStatus !== "pass") return action("Review workflow result", "/workflow-results", "Review missing or blocked checks before handoff.");
  if (args.finalStatus === "validation-passed" || args.finalStatus === "complete") return action("Prepare commit guidance", "/workflow-results", "Validation passed -> commit/tag/push guidance after operator review.");
  if (args.finalStatus === "validation-failed") return action("Open Closed Loop Fix Workflow", "/closed-loop", "Validation failed -> closed-loop fix workflow.");
  if (args.finalStatus === "apply-request-ready") return action("Review Approved Patch Apply", "/apply-validation", "Apply pending -> approved patch apply review.");
  if (args.finalStatus === "preview-ready") return action("Open Real Patch Preview", "/files", "Preview pending -> real patch preview.");
  if (args.finalStatus === "applied-needs-validation") return action("Open Validation Runner", "/validation", "Validation missing -> validation runner.");
  if (args.memoryCandidateReady) return action("Open Memory Review", "/memory", "Memory candidate ready -> memory review.");
  if (args.finalStatus === "blocked") return action("Show smallest unblock step", "/workflow-results", "Blocked -> show the smallest safe unblock step.");
  return action("Capture a real coding flow result", "/code-flow", "Start or continue a workflow before persistence review.");
}

export function buildWorkflowResultNextActionPlan(args: { finalStatus?: WorkflowResultFinalStatus; review?: WorkflowResultReview | null; policy?: WorkflowResultStoragePolicy | null; memoryCandidateReady?: boolean } = {}): WorkflowResultNextActionPlan {
  const actions = [
    action("Prepare commit guidance", "/workflow-results", "Validation passed -> commit/tag/push guidance after operator review."),
    action("Open Closed Loop Fix Workflow", "/closed-loop", "Validation failed -> closed-loop fix workflow."),
    action("Review Approved Patch Apply", "/apply-validation", "Apply pending -> approved patch apply."),
    action("Open Real Patch Preview", "/files", "Preview pending -> real patch preview."),
    action("Open Validation Runner", "/validation", "Validation missing -> validation runner."),
    action("Review workflow result", "/workflow-results", "Review missing -> workflow result review."),
    action("Open Memory Review", "/memory", "Memory candidate ready -> memory review."),
  ];
  const selected = selectWorkflowResultNextAction(args);
  return {
    planId: buildWorkflowResultStableKey("workflow-result-next-action-plan", args.finalStatus ?? "unknown", selected.actionId),
    selected,
    actions,
    smallestUnblockStep: args.finalStatus === "blocked" ? "Redact blocked content or complete the missing review check." : selected.reason,
  };
}

export function summarizeWorkflowResultNextAction(plan: WorkflowResultNextActionPlan): string[] {
  return [
    `${plan.selected.label}: ${plan.selected.reason}`,
    `Smallest unblock step: ${plan.smallestUnblockStep}`,
  ];
}
