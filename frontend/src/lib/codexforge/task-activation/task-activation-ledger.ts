import {
  buildTaskActivationStableKey,
  type TaskActivationHandoff,
  type TaskActivationLedger,
  type TaskActivationLedgerItem,
  type TaskActivationLedgerState,
  type TaskActivationPolicy,
  type TaskActivationRequest,
  type TaskActivationState,
  type ActivatedTaskPlan,
} from "./task-activation-types";

export function buildTaskActivationLedgerItem(args: {
  state: TaskActivationLedgerState;
  label: string;
  detail: string;
  requestId?: string;
  suggestionId?: string;
}): TaskActivationLedgerItem {
  const requestId = args.requestId ?? "no-request";
  const suggestionId = args.suggestionId ?? "no-suggestion";
  return {
    id: buildTaskActivationStableKey("task-activation-ledger", args.state, requestId, suggestionId, args.label),
    state: args.state,
    label: args.label,
    detail: args.detail,
    requestId,
    suggestionId,
  };
}

export function buildTaskActivationLedger(args: {
  request?: TaskActivationRequest | null;
  policy?: TaskActivationPolicy | null;
  plan?: ActivatedTaskPlan | null;
  handoff?: TaskActivationHandoff | null;
  state?: TaskActivationState | null;
} = {}): TaskActivationLedger {
  const requestId = args.request?.id ?? "no-request";
  const suggestionId = args.request?.taskSuggestionId ?? args.plan?.sourceSuggestionId ?? args.handoff?.suggestionId ?? "no-suggestion";
  const items: TaskActivationLedgerItem[] = [
    buildTaskActivationLedgerItem({
      state: "suggested",
      label: "Suggestion selected",
      detail: "Reviewed Task Activation starts from a visible task suggestion.",
      requestId,
      suggestionId,
    }),
  ];

  if (args.request) {
    items.push(
      buildTaskActivationLedgerItem({
        state: "reviewed",
        label: "Suggestion reviewed",
        detail: args.request.approved
          ? "Suggestion was accepted for planning with explicit review approval."
          : "Suggestion still needs explicit review approval.",
        requestId,
        suggestionId,
      }),
      buildTaskActivationLedgerItem({
        state: "activation-requested",
        label: "Activation requested",
        detail: "Activation request is visible and carries a no-run guarantee.",
        requestId,
        suggestionId,
      })
    );
  }

  if (args.policy?.allowed) {
    items.push(
      buildTaskActivationLedgerItem({
        state: "approved",
        label: "Policy approved",
        detail: "Policy allows active plan preview only.",
        requestId,
        suggestionId,
      })
    );
  } else if (args.policy && args.policy.blockedReasons.length > 0) {
    items.push(
      buildTaskActivationLedgerItem({
        state: "blocked",
        label: "Policy blocked",
        detail: args.policy.blockedReasons.join(" "),
        requestId,
        suggestionId,
      })
    );
  }

  if (args.plan) {
    items.push(
      buildTaskActivationLedgerItem({
        state: "previewed",
        label: "Plan previewed",
        detail: "Active task plan preview was built without execution.",
        requestId,
        suggestionId,
      })
    );
  }

  if (args.handoff) {
    items.push(
      buildTaskActivationLedgerItem({
        state: "handoff-ready",
        label: "Handoff ready",
        detail: "Copy-only handoff prompt is ready for visible review in /jarvis.",
        requestId,
        suggestionId,
      })
    );
  }

  if (args.state?.status === "future-active-task-set") {
    items.push(
      buildTaskActivationLedgerItem({
        state: "future-activated",
        label: "Future active task marked",
        detail: "Future active task is explicitly marked for handoff; no auto-run occurred.",
        requestId,
        suggestionId,
      })
    );
  }

  return {
    id: "task-activation-ledger",
    items,
    summary: summarizeTaskActivationLedger({ id: "task-activation-ledger", items, summary: [] }),
  };
}

export function summarizeTaskActivationLedger(ledger: TaskActivationLedger): string[] {
  const blocked = ledger.items.filter((item) => item.state === "blocked").length;
  const handoffReady = ledger.items.filter((item) => item.state === "handoff-ready").length;
  return [
    `${ledger.items.length} reviewed activation ledger entries are visible.`,
    blocked ? `${blocked} entries show blocked activation.` : "No activation ledger entries are blocked.",
    handoffReady ? "Handoff is ready for visible review in /jarvis." : "Handoff is not ready yet.",
  ];
}
