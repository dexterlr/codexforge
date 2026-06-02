import type { CreativeCostSaverSummary } from "./creative-cost-saver-types";
import { buildCreativeCloudFallbackPolicy } from "./creative-cloud-fallback-policy";
import { buildCreativeCostEstimate } from "./creative-cost-estimate";
import { buildCreativeCostRoute } from "./creative-cost-route";
import { buildCreativeCostSaverHandoff } from "./creative-cost-saver-handoff";
import { buildDefaultCreativeCostTasks } from "./creative-cost-task";
import { buildCreativeLocalFirstPolicy } from "./creative-local-first-policy";

export function buildCreativeCostSaverSummary(): CreativeCostSaverSummary {
  const tasks = buildDefaultCreativeCostTasks();
  const summary: CreativeCostSaverSummary = {
    tasks,
    routes: tasks.map((task) => buildCreativeCostRoute(task)),
    estimates: tasks.map((task) => buildCreativeCostEstimate(task)),
    localFirstPolicy: buildCreativeLocalFirstPolicy(),
    cloudFallbackPolicy: buildCreativeCloudFallbackPolicy(),
    handoff: buildCreativeCostSaverHandoff(),
    summary: "",
  };
  return { ...summary, summary: summarizeCreativeCostSaver(summary) };
}

export function summarizeCreativeCostSaver(summary: CreativeCostSaverSummary): string {
  const localRoutes = summary.routes.filter((route) => route.decision.startsWith("local")).length;
  return `${localRoutes} local-first routes before cloud fallback; no cloud credits are spent and all estimates are approximate.`;
}
