import {
  buildRegressionFixQueueStableKey,
  type RegressionFixQueueItem,
  type RegressionFixQueueLedger,
  type RegressionFixQueueLedgerItem,
  type RegressionFixQueueLedgerState,
} from "./regression-fix-queue-types";
import { buildRegressionFixQueueHandoff } from "./fix-queue-handoff";
import { buildRegressionFixQueuePolicy } from "./fix-queue-policy";
import { buildRegressionFixQueueReadinessItem } from "./fix-queue-readiness";
import { buildRegressionFixQueueRoute } from "./fix-queue-router";

const LABELS: Record<RegressionFixQueueLedgerState, string> = {
  "regression-detected": "Regression detected",
  "triage-reviewed": "Triage reviewed",
  "fix-candidate-created": "Fix candidate created",
  "policy-checked": "Policy checked",
  "priority-scored": "Priority scored",
  "readiness-checked": "Readiness checked",
  "route-selected": "Route selected",
  "handoff-built": "Handoff built",
  blocked: "Blocked",
  queued: "Queued",
  rejected: "Rejected",
  "completed-preview": "Completed preview",
};

export function buildRegressionFixQueueLedgerItem(
  item: RegressionFixQueueItem,
  state: RegressionFixQueueLedgerState,
  detail?: string
): RegressionFixQueueLedgerItem {
  return {
    id: `regression-fix-queue-ledger:${buildRegressionFixQueueStableKey(item.id, state)}`,
    itemId: item.id,
    state,
    label: LABELS[state],
    detail: detail ?? `${LABELS[state]} for ${item.title}.`,
  };
}

export function buildRegressionFixQueueLedger(items: readonly RegressionFixQueueItem[]): RegressionFixQueueLedger {
  const ledgerItems = items.flatMap((item) => {
    const policy = buildRegressionFixQueuePolicy(item);
    const readiness = buildRegressionFixQueueReadinessItem(item);
    const route = buildRegressionFixQueueRoute(item);
    const handoff = buildRegressionFixQueueHandoff(item);
    return [
      buildRegressionFixQueueLedgerItem(item, "regression-detected", `Regression ${item.sourceRegressionId} has ${item.sourceSignalIds.length} signals.`),
      buildRegressionFixQueueLedgerItem(item, "triage-reviewed", item.reviewedTriage ? "Reviewed triage is attached." : "Triage review is still required."),
      buildRegressionFixQueueLedgerItem(item, "fix-candidate-created", "Deterministic queue item created from source regression id, primary file, and candidate kind."),
      buildRegressionFixQueueLedgerItem(item, "policy-checked", policy.allowed ? "Policy allows reviewed queue handoff." : policy.blockedReasons.join(" ")),
      buildRegressionFixQueueLedgerItem(item, "priority-scored", `Priority is ${item.priority} at ${item.priorityScore}.`),
      buildRegressionFixQueueLedgerItem(item, "readiness-checked", `Readiness is ${readiness.status}.`),
      buildRegressionFixQueueLedgerItem(item, "route-selected", `Primary route is ${route.primaryTarget}.`),
      buildRegressionFixQueueLedgerItem(item, "handoff-built", `Handoff built with ${handoff.safetyInstructions.length} safety instructions.`),
      ...(item.queueState === "blocked" ? [buildRegressionFixQueueLedgerItem(item, "blocked", item.warnings.join(" ") || "Queue item blocked.")] : []),
      ...(item.queueState === "queued" || item.queueState === "selected" || item.queueState === "handoff-ready"
        ? [buildRegressionFixQueueLedgerItem(item, "queued", "Item is visible in the prioritized repair queue.")]
        : []),
      ...(item.queueState === "rejected" ? [buildRegressionFixQueueLedgerItem(item, "rejected")] : []),
      ...(item.queueState === "completed-preview" ? [buildRegressionFixQueueLedgerItem(item, "completed-preview")] : []),
    ];
  });

  return {
    id: "regression-fix-queue-ledger",
    items: ledgerItems,
    summary: summarizeRegressionFixQueueLedger(ledgerItems),
  };
}

export function summarizeRegressionFixQueueLedger(items: readonly RegressionFixQueueLedgerItem[]): string[] {
  return [
    `${items.length} regression fix queue ledger events prepared in local UI state only.`,
    "Ledger includes regression-detected, policy-checked, route-selected, and handoff-built before any future operator decision.",
    "Ledger performs no persistence writes and does not mutate Brain graph.",
  ];
}
