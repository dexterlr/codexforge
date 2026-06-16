"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildEndToEndControlledRolloutPlanModel, buildEndToEndControlledRolloutPlanStableKey } from "@/lib/codexforge/end-to-end-controlled-rollout-plan";

const END_TO_END_CONTROLLED_ROLLOUT_PLAN_MARKERS = [
  "End-to-end controlled rollout plan",
  "End-to-end controlled rollout plan does not execute rollout",
  "Rollout actions require explicit operator approval",
  "Unapproved rollout paths remain blocked",
  "Rollout stage groups",
  "Operator cohort checklist",
] as const;

export function EndToEndControlledRolloutPlanPanel() {
  const model = buildEndToEndControlledRolloutPlanModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.plans.map((plan) => ({
    id: buildEndToEndControlledRolloutPlanStableKey("end-to-end-controlled-rollout-plan-card", plan.id),
    title: plan.controlledRolloutPlanIdentity,
    status: plan.status,
    sections: [
      { label: "Rollout stage groups", items: plan.rolloutStageGroups },
      { label: "Operator cohort checklist", items: plan.operatorCohortChecklist },
      { label: "Approval gate checklist", items: plan.approvalGateChecklist },
      { label: "Rollback checklist", items: plan.rollbackChecklist },
      { label: "Monitoring/evidence checklist", items: plan.monitoringEvidenceChecklist },
      { label: "Denied rollout plan actions", items: plan.deniedRolloutPlanActions },
      { label: "Unresolved rollout plan blockers", items: plan.unresolvedRolloutPlanBlockers },
    ],
    routes: [plan.rolloutReviewRoute, plan.rolloutFeedbackInboxRoute],
    nextRecommendedAction: plan.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 554"
      title="Controlled rollout plan"
      subtitle="End-to-end controlled rollout plan organizes rollout stages in plain English without executing rollout. End-to-end controlled rollout plan does not execute rollout. Rollout actions require explicit operator approval, and unapproved rollout paths remain blocked."
      primaryLabel="Review rollout plan"
      anchor="end-to-end-controlled-rollout-plan"
      plainEnglishTitle="Plain-English end-to-end controlled rollout plan"
      plainEnglishCopy="This page reviews controlled rollout plan identity, rollout stage groups, operator cohort checklist, approval gate checklist, rollback checklist, monitoring/evidence checklist, denied rollout plan actions, unresolved rollout plan blockers, rollout review route, rollout feedback inbox route, and next recommended action. It is review-only, approval required, and it does not execute rollout, proceed automatically, send notifications, create automations, execute workflows, call providers, call local models, call connectors, mutate files, mutate memory, store outputs, or store credentials."
      language={model.language}
      markers={[...END_TO_END_CONTROLLED_ROLLOUT_PLAN_MARKERS]}
      links={[
        { href: "/codexforge-end-to-end-workflow-release-candidate", label: "E2E RC" },
        { href: "/end-to-end-controlled-rollout-review", label: "Rollout review" },
        { href: "/end-to-end-rollout-feedback-inbox", label: "Feedback inbox" },
        { href: "/unified-execution-boundary-gap-report", label: "Gap report" },
      ]}
      cards={cards}
      advancedSummary="Advanced controlled rollout plan details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.plans.map((plan) => plan.advancedControlledRolloutPlanDetails)}
      advancedCopy="advanced controlled rollout plan details collapsed/secondary. This route remains review-only and approval required. It never executes rollout, proceeds automatically, sends notifications, creates automations, executes workflows, calls providers, calls local models, calls connectors, mutates files, mutates memory, persists approval decisions, stores outputs, stores credentials, signs off live boundaries, or creates an MCP runtime."
      dataScope="end-to-end-controlled-rollout-plan buildEndToEndControlledRolloutPlanStableKey EndToEndControlledRolloutPlanPanel"
    />
  );
}
