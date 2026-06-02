import type { CreativeCostEstimate, CreativeCostTask } from "./creative-cost-saver-types";

export function buildCreativeCostEstimate(task: CreativeCostTask, input: Partial<CreativeCostEstimate> = {}): CreativeCostEstimate {
  const cloudRisk =
    task.type === "cloud final fallback"
      ? "possible paid final render later"
      : "cloud credits avoided in this preview";

  return {
    id: input.id ?? `${task.id}-estimate`,
    taskId: task.id,
    localCostPosture: input.localCostPosture ?? "local electricity and time only",
    cloudCreditPosture: input.cloudCreditPosture ?? cloudRisk,
    timePosture: input.timePosture ?? "GPU jobs take time, so review before queueing heavy work.",
    confidence: "approximate",
    plainEnglish:
      input.plainEnglish ??
      "Estimates are approximate. They are here to prevent accidental cloud spend, not to promise exact runtime or cost.",
  };
}
