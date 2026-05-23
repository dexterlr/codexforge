import { buildRunHistoryStableKey, type RunHistoryNextAction, type RunHistoryNextActionPlan, type RunHistoryRecord, type RunHistoryRoute } from "./run-history-types";

function action(label: string, route: RunHistoryRoute, reason: string, requiresReview = true): RunHistoryNextAction {
  return {
    actionId: buildRunHistoryStableKey("run-history-next-action", label, route, reason),
    label,
    route,
    reason,
    copyPayload: `${label}: ${reason}. Keep this copy-only and reviewed.`,
    requiresReview,
    noMutation: true,
  };
}

export function selectRunHistoryNextAction(record: RunHistoryRecord): RunHistoryNextAction {
  if (record.reviewStatus === "needs-review" || record.reviewStatus === "unknown") return action("Open workflow results", "/workflow-results", "Needs review -> open workflow results.");
  if (record.validationStatus === "failed") return action("Open closed-loop review", "/closed-loop", "Validation failed -> closed-loop.");
  if (record.validationStatus === "passed") return action("Copy commit guidance", "/run-history", "Validation passed -> commit guidance after review.", false);
  if (record.currentNextAction.toLowerCase().includes("apply pending")) return action("Review apply validation", "/apply-validation", "Apply pending -> apply-validation.");
  if (record.currentNextAction.toLowerCase().includes("preview pending")) return action("Open code flow files", "/code-flow", "Preview pending -> code-flow/files.");
  if (record.memoryCandidateReadiness === "ready-for-review") return action("Open memory review", "/memory", "Memory candidate ready -> memory review.");
  if (record.reviewStatus === "blocked") return action("Resolve smallest unblock step", "/run-history", "Blocked -> show smallest unblock step.");
  if (record.reviewStatus === "complete") return action("Start next workflow", "/start", "Complete -> start next workflow or export handoff.", false);
  return action("Review run history", "/run-history", "Review the run and choose the next safe action.");
}

export function buildRunHistoryNextActionPlan(record: RunHistoryRecord): RunHistoryNextActionPlan {
  const actions = [
    selectRunHistoryNextAction(record),
    action("Open workflow results", "/workflow-results", "Review source result before handoff."),
    action("Open run history", "/run-history", "Review recent runs and copy handoff."),
    action("Open memory inbox", "/memory-inbox", "Review candidate only; no auto-promotion."),
  ];
  return {
    planId: buildRunHistoryStableKey("run-history-next-action-plan", record.runId, actions[0].actionId),
    selected: actions[0],
    actions,
    smallestUnblockStep: record.reviewStatus === "blocked" ? record.currentNextAction : "Review the featured run, then copy a handoff if needed.",
  };
}

export function summarizeRunHistoryNextAction(actionPlan: RunHistoryNextActionPlan): string[] {
  return [
    `${actionPlan.selected.label} via ${actionPlan.selected.route}.`,
    actionPlan.selected.reason,
    `Smallest unblock step: ${actionPlan.smallestUnblockStep}`,
  ];
}
