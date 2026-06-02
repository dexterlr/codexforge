import type { CreativeCostRoute, CreativeCostRouteDecision, CreativeCostTask } from "./creative-cost-saver-types";

function decideRoute(task: CreativeCostTask): CreativeCostRouteDecision {
  if (task.type.includes("planning")) return "local-planning";
  if (task.type === "low-res local draft") return "local-draft";
  if (task.type === "local upscale" || task.type === "local interpolation" || task.type === "local final candidate") return "local-finish";
  if (task.type === "cloud final fallback") return "cloud-fallback-later";
  if (task.type === "artifact review") return "blocked-needs-review";
  return "manual-only";
}

export function buildCreativeCostRoute(task: CreativeCostTask, input: Partial<CreativeCostRoute> = {}): CreativeCostRoute {
  const decision = input.decision ?? decideRoute(task);
  return {
    id: input.id ?? `${task.id}-route`,
    taskId: task.id,
    decision,
    whyThisRoute:
      input.whyThisRoute ??
      "Local drafts save money because the operator can review the direction before cloud credits are spent.",
    nextStep:
      input.nextStep ??
      (decision === "cloud-fallback-later"
        ? "Keep cloud as an optional later step after local review proves it is needed."
        : "Use the local-first planning path and review the handoff."),
    cloudPosture: input.cloudPosture ?? "No cloud credits are spent by this route preview.",
    manualGate: input.manualGate ?? "Nothing renders until explicitly approved execution exists.",
  };
}
