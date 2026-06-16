"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildLaunchRollbackPlanReviewModel, buildLaunchRollbackPlanReviewStableKey } from "@/lib/codexforge/launch-rollback-plan-review";

const LAUNCH_ROLLBACK_PLAN_REVIEW_MARKERS = [
  "Launch rollback plan review",
  "Launch rollback plan review does not trigger rollback",
  "Rollback actions require explicit operator approval",
  "Unsafe rollback shortcuts stay blocked",
  "Rollback groups",
  "Stop condition checklist",
] as const;

export function LaunchRollbackPlanReviewPanel() {
  const model = buildLaunchRollbackPlanReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.launchRollbackPlanReviews.map((review) => ({
    id: buildLaunchRollbackPlanReviewStableKey("launch-rollback-plan-review-card", review.id),
    title: review.launchRollbackPlanIdentity,
    status: review.status,
    sections: [
      { label: "Rollback groups", items: review.rollbackGroups },
      { label: "Stop condition checklist", items: review.stopConditionChecklist },
      { label: "Rollback action checklist", items: review.rollbackActionChecklist },
      { label: "Escalation checklist", items: review.escalationChecklist },
      { label: "Evidence logging checklist", items: review.evidenceLoggingChecklist },
      { label: "Denied rollback actions", items: review.deniedRollbackActions },
      { label: "Unresolved rollback blockers", items: review.unresolvedRollbackBlockers },
    ],
    routes: [review.monitoringPlanRoute, review.supportRunbookRoute],
    nextRecommendedAction: review.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 605"
      title="Launch rollback plan review"
      subtitle="Launch rollback plan review reviews rollback paths without triggering rollback. Launch rollback plan review does not trigger rollback. Rollback actions require explicit operator approval, and unsafe rollback shortcuts stay blocked."
      primaryLabel="Review rollback plan"
      anchor="launch-rollback-plan-review"
      plainEnglishTitle="Plain-English launch rollback plan review"
      plainEnglishCopy="This page reviews launch rollback identity, rollback groups, stop conditions, rollback actions, escalation, evidence/logging, denied rollback actions, unresolved blockers, monitoring route, support route, and next recommended action. It is review-only and approval required. It does not trigger rollback, execute workflows, mutate files, run commands, start monitoring jobs, send notifications, call providers, call local models, call connectors, create automations, store outputs, or store credentials."
      language={model.language}
      markers={[...LAUNCH_ROLLBACK_PLAN_REVIEW_MARKERS]}
      links={[
        { href: "/launch-monitoring-plan-review", label: "Monitoring plan" },
        { href: "/launch-support-runbook-review", label: "Support runbook" },
        { href: "/launch-go-no-go-review", label: "Go/no-go review" },
        { href: "/launch-approval-packet", label: "Approval packet" },
      ]}
      cards={cards}
      advancedSummary="Advanced launch rollback plan review details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.launchRollbackPlanReviews.map((review) => review.advancedLaunchRollbackPlanReviewDetails)}
      advancedCopy="advanced launch rollback plan review details collapsed/secondary. This route remains review-only and approval required. It never triggers rollback, executes workflows, mutates files, runs commands, starts monitoring jobs, sends notifications, calls providers, calls local models, calls connectors, creates automations, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="launch-rollback-plan-review buildLaunchRollbackPlanReviewStableKey LaunchRollbackPlanReviewPanel"
    />
  );
}
