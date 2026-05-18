import {
  buildRegressionFixQueueStableKey,
  type RegressionFixQueueItem,
  type RegressionFixQueueRoute,
  type RegressionFixQueueRouteTarget,
} from "./regression-fix-queue-types";

function uniqueTargets(targets: readonly RegressionFixQueueRouteTarget[]): RegressionFixQueueRouteTarget[] {
  const seen = new Set<RegressionFixQueueRouteTarget>();
  const result: RegressionFixQueueRouteTarget[] = [];
  for (const target of targets) {
    if (!seen.has(target)) {
      seen.add(target);
      result.push(target);
    }
  }
  return result;
}

function targetsFor(item: RegressionFixQueueItem): { targets: RegressionFixQueueRouteTarget[]; reason: string } {
  if (item.targetFiles.length === 0 && !item.investigationNeeded) {
    return { targets: ["Manual Investigation"], reason: "No target file is selected." };
  }
  if (item.confidence < 0.45 || item.investigationNeeded) {
    return { targets: ["Grounded Fix Recommendation", "Manual Investigation"], reason: "Low confidence requires investigation before preview." };
  }
  if (item.candidateKind === "key-stability-fix" || item.candidateKind === "layout-polish-fix") {
    return { targets: ["Safe Patch Preview", "Preview Diff Composer"], reason: "Key stability or UI layout regression needs safe preview and composed preview diff." };
  }
  if (
    item.buildFailurePresent ||
    item.candidateKind === "type-contract-fix" ||
    item.candidateKind === "export-contract-fix" ||
    item.candidateKind === "route-contract-fix"
  ) {
    return { targets: ["Grounded Fix Recommendation", "Safe Patch Preview"], reason: "Build, type, export, or route contract failure needs grounded fix review before safe preview." };
  }
  if (item.candidateKind === "smoke-marker-fix" || item.smokeFailureCount > 0) {
    return { targets: ["Preview Diff Composer", "Verification Ingestion"], reason: "Missing smoke marker should compose a preview diff and keep smoke validation attached." };
  }
  if (item.candidateKind === "policy-boundary-fix") {
    return { targets: ["Manual Investigation", "Safe Patch Preview"], reason: "Policy boundary failures require manual investigation before preview." };
  }

  return { targets: ["Patch Preview Queue", "Safe Patch Preview", "Preview Diff Composer"], reason: "Reviewed regression fix candidate can move through preview queue handoff." };
}

export function buildRegressionFixQueueRoute(item: RegressionFixQueueItem): RegressionFixQueueRoute {
  const base = targetsFor(item);
  const targets = uniqueTargets([
    ...base.targets,
    ...(item.riskLevel === "high" || item.riskLevel === "critical" ? ["Patch Application Gate" as const] : []),
  ]);
  const primaryTarget = targets[0] ?? "Manual Investigation";
  const route: Omit<RegressionFixQueueRoute, "summary"> = {
    id: `regression-fix-queue-route:${buildRegressionFixQueueStableKey(item.id, primaryTarget, targets.join("|"))}`,
    itemId: item.id,
    primaryTarget,
    targets,
    reason: base.reason,
    safetyNotes: [
      "Inspect regression output first.",
      "Verify current files before trusting evidence.",
      "Evidence is context, not proof.",
      "Safe Patch Preview and Preview Diff Composer are handoff surfaces only.",
      item.riskLevel === "high" || item.riskLevel === "critical"
        ? "High risk routes to Patch Application Gate only after preview and dry-run review."
        : "Preview-only handoff remains review gated.",
    ],
    blockedActions: ["apply-diff", "write-file", "run-command", "broker-execution", "auto-fix", "auto-rollback"],
  };

  return { ...route, summary: summarizeRegressionFixQueueRoute(route) };
}

export function routeRegressionFixQueueItem(item: RegressionFixQueueItem): RegressionFixQueueRoute {
  return buildRegressionFixQueueRoute(item);
}

export function summarizeRegressionFixQueueRoute(
  route: Omit<RegressionFixQueueRoute, "summary"> | RegressionFixQueueRoute
): string[] {
  return [
    `Primary route is ${route.primaryTarget}.`,
    `Route targets: ${route.targets.join(", ")}.`,
    route.reason,
    "Routing is review-only and blocks apply-diff, write-file, run-command, and broker-execution.",
  ];
}
