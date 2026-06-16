"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildFirstControlledLaunchPlanModel, buildFirstControlledLaunchPlanStableKey } from "@/lib/codexforge/first-controlled-launch-plan";

const FIRST_CONTROLLED_LAUNCH_PLAN_MARKERS = [
  "First controlled launch plan",
  "First controlled launch plan does not execute launch",
  "Controlled launch actions require explicit operator approval",
  "Unapproved controlled launch paths remain blocked",
  "Launch stage groups",
  "Boundary approval checklist",
] as const;

export function FirstControlledLaunchPlanPanel() {
  const model = buildFirstControlledLaunchPlanModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.firstControlledLaunchPlans.map((plan) => ({
    id: buildFirstControlledLaunchPlanStableKey("first-controlled-launch-plan-card", plan.id),
    title: plan.firstControlledLaunchPlanIdentity,
    status: plan.status,
    sections: [
      { label: "Launch stage groups", items: plan.launchStageGroups },
      { label: "Operator task checklist", items: plan.operatorTaskChecklist },
      { label: "Boundary approval checklist", items: plan.boundaryApprovalChecklist },
      { label: "Rollback monitoring checklist", items: plan.rollbackMonitoringChecklist },
      { label: "Evidence result recovery checklist", items: plan.evidenceResultRecoveryChecklist },
      { label: "Denied launch plan actions", items: plan.deniedLaunchPlanActions },
      { label: "Unresolved launch plan blockers", items: plan.unresolvedLaunchPlanBlockers },
    ],
    routes: [plan.controlledLaunchReviewRoute, plan.controlledLaunchEvidenceRoute],
    nextRecommendedAction: plan.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 609"
      title="First controlled launch plan"
      subtitle="First controlled launch plan organizes the first controlled launch without executing it. First controlled launch plan does not execute launch. Controlled launch actions require explicit operator approval, and unapproved controlled launch paths remain blocked."
      primaryLabel="Review launch plan"
      anchor="first-controlled-launch-plan"
      plainEnglishTitle="Plain-English first controlled launch plan"
      plainEnglishCopy="This page reviews first controlled launch plan identity, launch stage groups, operator task checklist, boundary approval checklist, rollback/monitoring checklist, evidence/result/recovery checklist, denied launch plan actions, unresolved blockers, controlled launch review route, controlled launch evidence route, and next recommended action. It is review-only and approval required. It does not execute launch, launch Daily Beta 1, call providers, call local models, call connectors, create automations, run commands, run tests, mutate files, trigger rollback, start monitoring jobs, send notifications, publish support runbooks, store outputs, or store credentials."
      language={model.language}
      markers={[...FIRST_CONTROLLED_LAUNCH_PLAN_MARKERS]}
      links={[
        { href: "/end-to-end-controlled-rollout-review", label: "Controlled review" },
        { href: "/end-to-end-workflow-evidence-review", label: "Evidence review" },
        { href: "/codexforge-daily-beta-1-go-no-go-candidate", label: "Go/no-go candidate" },
        { href: "/launch-support-runbook-review", label: "Support runbook" },
      ]}
      cards={cards}
      advancedSummary="Advanced first controlled launch plan details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.firstControlledLaunchPlans.map((plan) => plan.advancedFirstControlledLaunchPlanDetails)}
      advancedCopy="advanced first controlled launch plan details collapsed/secondary. This route remains review-only and approval required. It never executes launch, launches Daily Beta 1, calls providers, calls local models, calls connectors, creates automations, runs commands, runs tests, mutates files, triggers rollback, starts monitoring jobs, sends notifications, publishes support runbooks, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="first-controlled-launch-plan buildFirstControlledLaunchPlanStableKey FirstControlledLaunchPlanPanel"
    />
  );
}
