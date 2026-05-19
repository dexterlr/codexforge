import type { ProductFunctionalWorkflowAudit, ProductModuleConsolidationAudit, ProductReadinessScore, ProductReadinessScorecard, ProductRouteReadinessAudit, ProductSafetyPostureAudit, ProductSmokeCoverageAudit, ProductUxConsistencyAudit } from "./product-readiness-types";
import { buildProductReadinessStableKey } from "./product-readiness-types";

export function buildProductReadinessScore(input: Omit<ProductReadinessScore, "id"> & { id?: string }): ProductReadinessScore {
  return {
    id: input.id ?? buildProductReadinessStableKey("product-readiness-score", input.category),
    category: input.category,
    score: input.score,
    detail: input.detail,
    recommendedAction: input.recommendedAction,
  };
}

export function buildProductReadinessScorecard(input: {
  routeAudit: ProductRouteReadinessAudit;
  smokeAudit: ProductSmokeCoverageAudit;
  safetyAudit: ProductSafetyPostureAudit;
  uxAudit: ProductUxConsistencyAudit;
  workflowAudit: ProductFunctionalWorkflowAudit;
  moduleAudit: ProductModuleConsolidationAudit;
}): ProductReadinessScorecard {
  const scores = [
    buildProductReadinessScore({ category: "route readiness", score: input.routeAudit.readyCount >= 12 ? "good" : "needs-work", detail: input.routeAudit.summary.join(" "), recommendedAction: "Keep /readiness in route and shell registries." }),
    buildProductReadinessScore({ category: "smoke coverage", score: input.smokeAudit.missingCount === 0 && input.smokeAudit.duplicateRiskCount === 0 ? "good" : "needs-work", detail: input.smokeAudit.summary.join(" "), recommendedAction: "Missing smoke before new features." }),
    buildProductReadinessScore({ category: "safety posture", score: input.safetyAudit.blockerCount === 0 ? "excellent" : "blocked", detail: input.safetyAudit.summary.join(" "), recommendedAction: "Safety gap before execution." }),
    buildProductReadinessScore({ category: "UX consistency", score: input.uxAudit.riskCount > 4 ? "needs-work" : "good", detail: input.uxAudit.summary.join(" "), recommendedAction: "UX overflow before more surfaces." }),
    buildProductReadinessScore({ category: "workflow functionality", score: input.workflowAudit.functionalCount > 4 ? "good" : "needs-work", detail: input.workflowAudit.summary.join(" "), recommendedAction: "Real workflow before abstract features." }),
    buildProductReadinessScore({ category: "consolidation readiness", score: input.moduleAudit.candidateCount > 0 ? "needs-work" : "good", detail: input.moduleAudit.summary.join(" "), recommendedAction: "Consolidation before more dashboards." }),
    buildProductReadinessScore({ category: "operator clarity", score: "good", detail: "Readiness is visible from Home, Shell, Palette, Stabilization, Handoff, and Mission Control.", recommendedAction: "Keep next actions copy-only." }),
    buildProductReadinessScore({ category: "next-phase readiness", score: input.safetyAudit.blockerCount === 0 && input.smokeAudit.missingCount === 0 ? "good" : "blocked", detail: "Phase 55 should consolidate before more feature surfaces.", recommendedAction: "If clean, recommend Phase 55 Consolidation Pass." }),
  ];
  const overallReadiness = input.safetyAudit.blockerCount > 0 ? "blocked" : input.workflowAudit.functionalCount === 0 || input.moduleAudit.candidateCount > 4 ? "needs-work" : "good";
  return {
    id: "product-readiness-scorecard",
    scores,
    overallReadiness,
    summary: summarizeProductReadinessScorecard({ scores, overallReadiness }),
  };
}

export function summarizeProductReadinessScorecard(scorecard: Pick<ProductReadinessScorecard, "scores" | "overallReadiness">): string[] {
  return [
    `Overall readiness is ${scorecard.overallReadiness}.`,
    `${scorecard.scores.length} score categories reviewed: route readiness, smoke coverage, safety posture, UX consistency, workflow functionality, consolidation readiness, operator clarity, next-phase readiness.`,
  ];
}
