"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildFirstRealEndToEndWorkflowTrialPlanModel, buildFirstRealEndToEndWorkflowTrialPlanStableKey } from "@/lib/codexforge/first-real-end-to-end-workflow-trial-plan";

const FIRST_REAL_END_TO_END_WORKFLOW_TRIAL_PLAN_MARKERS = [
  "First real end-to-end workflow trial plan",
  "First real end-to-end workflow trial plan does not execute workflows",
  "End-to-end workflow execution requires explicit operator approval at every boundary",
  "Unapproved end-to-end workflow paths remain blocked",
  "Workflow stage groups",
  "File patch test execution checklist",
] as const;

export function FirstRealEndToEndWorkflowTrialPlanPanel() {
  const model = buildFirstRealEndToEndWorkflowTrialPlanModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.workflowTrialPlans.map((plan) => ({
    id: buildFirstRealEndToEndWorkflowTrialPlanStableKey("first-real-end-to-end-workflow-trial-plan-card", plan.id),
    title: plan.endToEndWorkflowTrialPlanIdentity,
    status: plan.status,
    sections: [
      { label: "Workflow stage groups", items: plan.workflowStageGroups },
      { label: "Provider/local/connector/automation handoff checklist", items: plan.providerLocalConnectorAutomationHandoffChecklist },
      { label: "File patch test execution checklist", items: plan.filePatchTestExecutionChecklist },
      { label: "Approval gate checklist", items: plan.approvalGateChecklist },
      { label: "Evidence/result/recovery checklist", items: plan.evidenceResultRecoveryChecklist },
      { label: "Denied workflow trial plan actions", items: plan.deniedWorkflowTrialPlanActions },
      { label: "Unresolved workflow plan blockers", items: plan.unresolvedWorkflowPlanBlockers },
    ],
    routes: [plan.endToEndTrialReviewRoute, plan.endToEndEvidenceReviewRoute],
    nextRecommendedAction: plan.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 547"
      title="Workflow trial plan"
      subtitle="First real end-to-end workflow trial plan composes approved boundaries in plain English without executing them. First real end-to-end workflow trial plan does not execute workflows. End-to-end workflow execution requires explicit operator approval at every boundary, and unapproved end-to-end workflow paths remain blocked."
      primaryLabel="Review plan"
      anchor="first-real-end-to-end-workflow-trial-plan"
      plainEnglishTitle="Plain-English first real end-to-end workflow trial plan"
      plainEnglishCopy="This page reviews end-to-end workflow trial plan identity, Workflow stage groups, Provider/local/connector/automation handoff checklist, File patch test execution checklist, Approval gate checklist, Evidence/result/recovery checklist, Denied workflow trial plan actions, Unresolved workflow plan blockers, End-to-end trial review route, End-to-end evidence review route, and next recommended action. It is review-only, approval required, and it does not execute workflows, call providers, call local models, call connectors, create automations, mutate files, apply patches, run tests, store outputs, persist approvals, or mutate memory."
      language={model.language}
      markers={[...FIRST_REAL_END_TO_END_WORKFLOW_TRIAL_PLAN_MARKERS]}
      links={[
        { href: "/first-real-end-to-end-workflow-trial-review", label: "Trial review" },
        { href: "/end-to-end-workflow-evidence-review", label: "Evidence review" },
        { href: "/first-approved-test-execution-trial", label: "Test trial" },
        { href: "/unified-execution-boundary-gap-report", label: "Gap report" },
      ]}
      cards={cards}
      advancedSummary="Advanced workflow trial plan details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.workflowTrialPlans.map((plan) => plan.advancedWorkflowTrialPlanDetails)}
      advancedCopy="advanced workflow trial plan details collapsed/secondary. This route remains review-only and approval required. It never executes workflows, calls providers, calls local models, calls local bridge endpoints, calls connectors, creates automations, mutates files, applies patches, runs tests, stores outputs, persists approvals, mutates memory, or creates an MCP runtime."
      dataScope="first-real-end-to-end-workflow-trial-plan buildFirstRealEndToEndWorkflowTrialPlanStableKey FirstRealEndToEndWorkflowTrialPlanPanel"
    />
  );
}
