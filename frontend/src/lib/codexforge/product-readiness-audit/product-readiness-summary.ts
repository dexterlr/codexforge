import type { ProductReadinessSummary } from "./product-readiness-types";
import { buildFunctionalWorkflowAudit } from "./functional-workflow-audit";
import { buildModuleConsolidationAudit } from "./module-consolidation-audit";
import { buildProductReadinessNextActionPlan } from "./readiness-next-actions";
import { buildProductReadinessScorecard } from "./readiness-scorecard";
import { buildProductSafetyPostureAudit } from "./safety-posture-audit";
import { buildRouteReadinessAudit } from "./route-readiness-audit";
import { buildSmokeCoverageAudit } from "./smoke-coverage-audit";
import { buildUxConsistencyAudit } from "./ux-consistency-audit";

export function buildProductReadinessSummary(): ProductReadinessSummary {
  const routeAudit = buildRouteReadinessAudit();
  const smokeAudit = buildSmokeCoverageAudit();
  const safetyAudit = buildProductSafetyPostureAudit();
  const uxAudit = buildUxConsistencyAudit();
  const moduleAudit = buildModuleConsolidationAudit();
  const workflowAudit = buildFunctionalWorkflowAudit();
  const scorecard = buildProductReadinessScorecard({
    routeAudit,
    smokeAudit,
    safetyAudit,
    uxAudit,
    workflowAudit,
    moduleAudit,
  });
  const compact = {
    safetyBlockerCount: safetyAudit.blockerCount,
    smokeCoverageCount: smokeAudit.coveredCount,
    uxRiskCount: uxAudit.riskCount,
    duplicateConsolidationCount: moduleAudit.candidateCount,
    functionalWorkflowCount: workflowAudit.functionalCount,
  };
  const nextActions = buildProductReadinessNextActionPlan({ summary: compact, scorecard });
  const topRisk =
    safetyAudit.blockerCount > 0
      ? "Safety blocker before execution."
      : workflowAudit.functionalCount === 0
        ? "Real workflows remain preview-only or scaffolded."
        : moduleAudit.candidateCount > 0
          ? "Dashboard sprawl and duplicate panels."
          : "No top blocker detected.";
  const recommendedNextPhase =
    safetyAudit.blockerCount === 0 && smokeAudit.missingCount === 0
      ? "Approved Patch Apply v1 request-ready / Phase 59 Validation Runner v1"
      : "Stop and stabilize";
  const summary = {
    id: "product-readiness-summary",
    overallReadiness: scorecard.overallReadiness,
    routeCount: routeAudit.items.length,
    smokeCoverageCount: smokeAudit.coveredCount,
    safetyBlockerCount: safetyAudit.blockerCount,
    uxRiskCount: uxAudit.riskCount,
    duplicateConsolidationCount: moduleAudit.candidateCount,
    functionalWorkflowCount: workflowAudit.functionalCount,
    topRisk,
    recommendedNextPhase,
    routeAudit,
    smokeAudit,
    safetyAudit,
    uxAudit,
    moduleAudit,
    workflowAudit,
    scorecard,
    nextActions,
    summary: [] as string[],
  };
  return {
    ...summary,
    summary: summarizeProductReadinessSession(summary),
  };
}

export function summarizeProductReadinessSession(summary: Pick<ProductReadinessSummary, "overallReadiness" | "routeCount" | "smokeCoverageCount" | "safetyBlockerCount" | "uxRiskCount" | "duplicateConsolidationCount" | "functionalWorkflowCount" | "topRisk" | "recommendedNextPhase">): string[] {
  return [
    `Overall readiness: ${summary.overallReadiness}.`,
    `${summary.routeCount} routes audited; ${summary.smokeCoverageCount} smoke targets covered.`,
    `${summary.safetyBlockerCount} safety blockers, ${summary.uxRiskCount} UX risks, ${summary.duplicateConsolidationCount} consolidation candidates, ${summary.functionalWorkflowCount} fully functional workflows.`,
    `Top risk: ${summary.topRisk}`,
    `Recommended next phase: ${summary.recommendedNextPhase}.`,
  ];
}
