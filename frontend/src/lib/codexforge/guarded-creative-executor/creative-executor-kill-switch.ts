import type {
  CreativeExecutorKillSwitchItem,
  CreativeExecutorKillSwitchPlan,
  CreativeExecutorRequest,
} from "./guarded-creative-executor-types";
import { buildCreativeExecutorStableId } from "./guarded-creative-executor-types";
import { buildCreativeExecutorRequest } from "./creative-executor-request";

export function buildCreativeExecutorKillSwitchItem(input: CreativeExecutorKillSwitchItem): CreativeExecutorKillSwitchItem {
  return input;
}

export function buildCreativeExecutorKillSwitchPlan(
  request: CreativeExecutorRequest = buildCreativeExecutorRequest()
): CreativeExecutorKillSwitchPlan {
  const labels = [
    "cancel queued job",
    "terminate local process future-only",
    "stop render queue future-only",
    "block artifact capture future-only",
    "preserve partial outputs future-only",
    "collect logs future-only",
    "mark failed/review-required",
    "no current execution to cancel",
  ];
  const items = labels.map((label, index) =>
    buildCreativeExecutorKillSwitchItem({
      itemId: buildCreativeExecutorStableId("kill-switch", [request.requestId, label]),
      label,
      policy: `${label} policy is planned for a future guarded executor boundary.`,
      futureOnly: label !== "no current execution to cancel" && label !== "mark failed/review-required",
      currentPhaseAction:
        label === "no current execution to cancel"
          ? "Phase 67 has no running process to cancel."
          : "Policy/planning only; no process termination in Phase 67.",
    })
  );

  return {
    planId: buildCreativeExecutorStableId("creative-executor-kill-switch", [request.requestId]),
    requestId: request.requestId,
    items,
    ready: true,
    summary: summarizeCreativeExecutorKillSwitchPlan({ items, ready: true }),
  };
}

export function summarizeCreativeExecutorKillSwitchPlan(plan: Pick<CreativeExecutorKillSwitchPlan, "items" | "ready">): string[] {
  return [
    `Kill-switch plan ready: ${String(plan.ready)}.`,
    `${plan.items.length} cancellation policy items are visible.`,
    "Kill-switch plan says future-only where process control would be required.",
    "No process termination occurs in Phase 67.",
  ];
}
