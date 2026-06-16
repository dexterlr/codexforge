"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildLaunchMonitoringPlanReviewModel, buildLaunchMonitoringPlanReviewStableKey } from "@/lib/codexforge/launch-monitoring-plan-review";

const LAUNCH_MONITORING_PLAN_REVIEW_MARKERS = [
  "Launch monitoring plan review",
  "Launch monitoring plan review does not start monitoring jobs",
  "Monitoring setup requires explicit operator approval",
  "Unresolved monitoring blockers stay blocked",
  "Monitoring groups",
  "Operator review cadence checklist",
] as const;

export function LaunchMonitoringPlanReviewPanel() {
  const model = buildLaunchMonitoringPlanReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.launchMonitoringPlanReviews.map((review) => ({
    id: buildLaunchMonitoringPlanReviewStableKey("launch-monitoring-plan-review-card", review.id),
    title: review.launchMonitoringPlanIdentity,
    status: review.status,
    sections: [
      { label: "Monitoring groups", items: review.monitoringGroups },
      { label: "Evidence logging checklist", items: review.evidenceLoggingChecklist },
      { label: "Alert notification checklist", items: review.alertNotificationChecklist },
      { label: "Operator review cadence checklist", items: review.operatorReviewCadenceChecklist },
      { label: "Privacy redaction checklist", items: review.privacyRedactionChecklist },
      { label: "Denied monitoring actions", items: review.deniedMonitoringActions },
      { label: "Unresolved monitoring blockers", items: review.unresolvedMonitoringBlockers },
    ],
    routes: [review.supportRunbookRoute, review.goNoGoCandidateRoute],
    nextRecommendedAction: review.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 606"
      title="Launch monitoring plan review"
      subtitle="Launch monitoring plan review reviews monitoring requirements without starting jobs. Launch monitoring plan review does not start monitoring jobs. Monitoring setup requires explicit operator approval, and unresolved monitoring blockers stay blocked."
      primaryLabel="Review monitoring plan"
      anchor="launch-monitoring-plan-review"
      plainEnglishTitle="Plain-English launch monitoring plan review"
      plainEnglishCopy="This page reviews launch monitoring identity, monitoring groups, evidence/logging, alerts/notifications, operator review cadence, privacy/redaction, denied monitoring actions, unresolved blockers, support route, go/no-go candidate route, and next recommended action. It is review-only and approval required. It does not start monitoring jobs, create polling loops, send notifications, create background jobs, schedule tasks, call providers, call local models, call connectors, fetch connector data, create automations, store outputs, or store credentials."
      language={model.language}
      markers={[...LAUNCH_MONITORING_PLAN_REVIEW_MARKERS]}
      links={[
        { href: "/launch-support-runbook-review", label: "Support runbook" },
        { href: "/codexforge-daily-beta-1-go-no-go-candidate", label: "Go/no-go candidate" },
        { href: "/launch-rollback-plan-review", label: "Rollback plan" },
        { href: "/launch-go-no-go-review", label: "Go/no-go review" },
      ]}
      cards={cards}
      advancedSummary="Advanced launch monitoring plan review details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.launchMonitoringPlanReviews.map((review) => review.advancedLaunchMonitoringPlanReviewDetails)}
      advancedCopy="advanced launch monitoring plan review details collapsed/secondary. This route remains review-only and approval required. It never starts monitoring jobs, creates polling loops, sends notifications, creates background jobs, schedules tasks, calls providers, calls local models, calls connectors, creates automations, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="launch-monitoring-plan-review buildLaunchMonitoringPlanReviewStableKey LaunchMonitoringPlanReviewPanel"
    />
  );
}
