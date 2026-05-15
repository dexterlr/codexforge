import {
  buildReadOnlyExecutionStableKey,
  type ReadOnlyExecutionLedger,
  type ReadOnlyExecutionLedgerItem,
  type ReadOnlyExecutionLedgerState,
  type ReadOnlyExecutionPolicy,
  type ReadOnlyExecutionRequest,
  type ReadOnlyExecutionResult,
  type ReadOnlyToolRoute,
} from "./read-only-execution-types";

export function buildReadOnlyExecutionLedgerItem(args: {
  state: ReadOnlyExecutionLedgerState;
  label: string;
  detail: string;
  requestId: string;
  taskId: string;
  stepId: string;
}): ReadOnlyExecutionLedgerItem {
  return {
    id: buildReadOnlyExecutionStableKey(
      "read-only-execution-ledger",
      args.requestId,
      args.taskId,
      args.stepId,
      args.state,
      args.label
    ),
    state: args.state,
    label: args.label,
    detail: args.detail,
    requestId: args.requestId,
    taskId: args.taskId,
    stepId: args.stepId,
  };
}

export function buildReadOnlyExecutionLedger(args: {
  request: ReadOnlyExecutionRequest;
  policy: ReadOnlyExecutionPolicy;
  route?: ReadOnlyToolRoute | null;
  result?: ReadOnlyExecutionResult | null;
}): ReadOnlyExecutionLedger {
  const items: ReadOnlyExecutionLedgerItem[] = [
    buildReadOnlyExecutionLedgerItem({
      state: "requested",
      label: "Read-only request prepared",
      detail: `${args.request.stepLabel} requests ${args.request.selectedReadOnlyTool} with visible input fingerprint ${args.request.toolInputPreview.fingerprint}.`,
      requestId: args.request.requestId,
      taskId: args.request.taskId,
      stepId: args.request.stepId,
    }),
  ];

  if (args.request.approval.approved) {
    items.push(
      buildReadOnlyExecutionLedgerItem({
        state: "approved",
        label: "Explicit approval recorded",
        detail: `Approval state is ${args.request.approval.state} with approval id ${args.request.approval.approvalId ?? "missing"}.`,
        requestId: args.request.requestId,
        taskId: args.request.taskId,
        stepId: args.request.stepId,
      })
    );
  } else {
    items.push(
      buildReadOnlyExecutionLedgerItem({
        state: "approval-required",
        label: "Approval required",
        detail: "No tool is executed until explicit read-only execution approval is present in request data.",
        requestId: args.request.requestId,
        taskId: args.request.taskId,
        stepId: args.request.stepId,
      })
    );
  }

  if (!args.policy.allowed) {
    items.push(
      buildReadOnlyExecutionLedgerItem({
        state: "blocked",
        label: "Policy blocked",
        detail: args.policy.blockedReasons.join(" ") || "Policy blocks this request.",
        requestId: args.request.requestId,
        taskId: args.request.taskId,
        stepId: args.request.stepId,
      })
    );
  }

  if (args.route) {
    items.push(
      buildReadOnlyExecutionLedgerItem({
        state: "routed",
        label: "Read-only route prepared",
        detail: `${args.route.toolName} route mode is ${args.route.routeMode}; router does not execute tools.`,
        requestId: args.request.requestId,
        taskId: args.request.taskId,
        stepId: args.request.stepId,
      })
    );
  }

  if (args.result) {
    if (args.result.status === "completed") {
      items.push(
        buildReadOnlyExecutionLedgerItem({
          state: "executed",
          label: "Read-only tool executed",
          detail: `${args.result.toolName} completed through the guarded read-only bridge.`,
          requestId: args.request.requestId,
          taskId: args.request.taskId,
          stepId: args.request.stepId,
        }),
        buildReadOnlyExecutionLedgerItem({
          state: "captured",
          label: "Result captured",
          detail: `${args.result.evidenceSnippets.length} snippet(s), ${args.result.filePaths.length} path(s), and ${args.result.matchedLines.length} match line(s) are visible.`,
          requestId: args.request.requestId,
          taskId: args.request.taskId,
          stepId: args.request.stepId,
        })
      );
    }

    if (args.result.status === "failed") {
      items.push(
        buildReadOnlyExecutionLedgerItem({
          state: "failed",
          label: "Read-only execution failed",
          detail: args.result.errorMessage ?? args.result.summary,
          requestId: args.request.requestId,
          taskId: args.request.taskId,
          stepId: args.request.stepId,
        })
      );
    }

    if (args.result.status === "blocked") {
      items.push(
        buildReadOnlyExecutionLedgerItem({
          state: "blocked",
          label: "Execution bridge refused request",
          detail: args.result.errorMessage ?? args.result.summary,
          requestId: args.request.requestId,
          taskId: args.request.taskId,
          stepId: args.request.stepId,
        })
      );
    }

    if (args.result.status === "skipped") {
      items.push(
        buildReadOnlyExecutionLedgerItem({
          state: "skipped",
          label: "Execution skipped",
          detail: args.result.summary,
          requestId: args.request.requestId,
          taskId: args.request.taskId,
          stepId: args.request.stepId,
        })
      );
    }
  }

  const ledger: ReadOnlyExecutionLedger = {
    id: "read-only-execution-ledger",
    requestId: args.request.requestId,
    items,
    summary: [],
  };

  return {
    ...ledger,
    summary: summarizeReadOnlyExecutionLedger(ledger),
  };
}

export function summarizeReadOnlyExecutionLedger(
  ledger: ReadOnlyExecutionLedger
): string[] {
  return [
    `Read-only execution ledger has ${ledger.items.length} local state item(s).`,
    "Ledger states include requested, approval-required, blocked, approved, routed, executed, captured, failed, and skipped.",
    "No persistence write, file mutation, graph mutation, or automatic execution is performed by the ledger.",
  ];
}
