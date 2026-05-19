import type { ConsolidationSummary } from "./consolidation-types";
import { buildCockpitConsolidationAudit } from "./cockpit-consolidation";
import { buildConsolidationPlan } from "./consolidation-plan";
import { buildRouteConsolidationPlan } from "./route-consolidation";
import { buildSharedNextActionModel } from "./shared-next-action-model";
import { buildSharedReadinessModel } from "./shared-readiness-model";
import { buildSharedSafetyCopy } from "./shared-safety-copy";
import { buildCodexForgeSurfaceMap } from "./surface-map";
import { buildWorkflowEntrypoints } from "./workflow-entrypoints";

export function buildConsolidationSummary(): ConsolidationSummary {
  const surfaceMap = buildCodexForgeSurfaceMap();
  const routePlan = buildRouteConsolidationPlan();
  const cockpitAudit = buildCockpitConsolidationAudit();
  const readinessModel = buildSharedReadinessModel();
  const nextActionModel = buildSharedNextActionModel(readinessModel);
  const safetyCopy = buildSharedSafetyCopy();
  const workflowEntrypoints = buildWorkflowEntrypoints();
  const consolidationPlan = buildConsolidationPlan();
  const summary = {
    id: "consolidation-summary" as const,
    surfaceMap,
    routePlan,
    cockpitAudit,
    readinessModel,
    nextActionModel,
    safetyCopy,
    workflowEntrypoints,
    consolidationPlan,
    primaryRouteCount: routePlan.primaryRouteCount,
    secondaryRouteCount: routePlan.secondaryRouteCount,
    deepRouteCount: routePlan.deepRouteCount,
    consolidationCandidateCount: cockpitAudit.items.length + routePlan.linkOnlyCandidateCount,
    workflowEntrypointCount: workflowEntrypoints.items.length,
    topRecommendation: consolidationPlan.topRecommendation,
    recommendedNextPhase: "Phase 58 Approved Patch Apply v1",
    summary: [] as string[],
  };
  return { ...summary, summary: summarizeConsolidationSession(summary) };
}

export function summarizeConsolidationSession(summary: Pick<ConsolidationSummary, "primaryRouteCount" | "secondaryRouteCount" | "deepRouteCount" | "consolidationCandidateCount" | "workflowEntrypointCount" | "topRecommendation" | "recommendedNextPhase">): string[] {
  return [
    `${summary.primaryRouteCount} primary routes, ${summary.secondaryRouteCount} secondary routes, and ${summary.deepRouteCount} deep routes are classified.`,
    `${summary.consolidationCandidateCount} consolidation candidates and ${summary.workflowEntrypointCount} workflow entrypoints are visible.`,
    `Top recommendation: ${summary.topRecommendation}`,
    `Recommended next phase: ${summary.recommendedNextPhase}.`,
  ];
}
