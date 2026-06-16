"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildLaunchSupportRunbookReviewModel, buildLaunchSupportRunbookReviewStableKey } from "@/lib/codexforge/launch-support-runbook-review";

const LAUNCH_SUPPORT_RUNBOOK_REVIEW_MARKERS = [
  "Launch support runbook review",
  "Launch support runbook review does not publish or send support guidance",
  "Support runbook changes require explicit operator approval",
  "Unresolved support blockers stay blocked",
  "Support runbook groups",
  "Known limitation checklist",
] as const;

export function LaunchSupportRunbookReviewPanel() {
  const model = buildLaunchSupportRunbookReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.launchSupportRunbookReviews.map((review) => ({
    id: buildLaunchSupportRunbookReviewStableKey("launch-support-runbook-review-card", review.id),
    title: review.launchSupportRunbookIdentity,
    status: review.status,
    sections: [
      { label: "Support runbook groups", items: review.supportRunbookGroups },
      { label: "Operator support checklist", items: review.operatorSupportChecklist },
      { label: "Known limitation checklist", items: review.knownLimitationChecklist },
      { label: "Recovery rollback checklist", items: review.recoveryRollbackChecklist },
      { label: "Escalation checklist", items: review.escalationChecklist },
      { label: "Denied support runbook actions", items: review.deniedSupportRunbookActions },
      { label: "Unresolved support blockers", items: review.unresolvedSupportBlockers },
    ],
    routes: [review.goNoGoCandidateRoute, review.firstControlledLaunchPlanRoute],
    nextRecommendedAction: review.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 607"
      title="Launch support runbook review"
      subtitle="Launch support runbook review reviews support guidance without publishing or sending it. Launch support runbook review does not publish or send support guidance. Support runbook changes require explicit operator approval, and unresolved support blockers stay blocked."
      primaryLabel="Review support runbook"
      anchor="launch-support-runbook-review"
      plainEnglishTitle="Plain-English launch support runbook review"
      plainEnglishCopy="This page reviews launch support runbook identity, support runbook groups, operator support checklist, known limitations, recovery/rollback, escalation, denied support runbook actions, unresolved blockers, go/no-go candidate route, first controlled launch plan route, and next recommended action. It is review-only and approval required. It does not publish runbooks, send handoffs, mutate files from UI, export files automatically, launch Daily Beta 1, trigger rollback, start monitoring jobs, call providers, call local models, call connectors, create automations, store outputs, or store credentials."
      language={model.language}
      markers={[...LAUNCH_SUPPORT_RUNBOOK_REVIEW_MARKERS]}
      links={[
        { href: "/codexforge-daily-beta-1-go-no-go-candidate", label: "Go/no-go candidate" },
        { href: "/first-controlled-launch-plan", label: "Controlled launch plan" },
        { href: "/launch-monitoring-plan-review", label: "Monitoring plan" },
        { href: "/launch-rollback-plan-review", label: "Rollback plan" },
      ]}
      cards={cards}
      advancedSummary="Advanced launch support runbook review details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.launchSupportRunbookReviews.map((review) => review.advancedLaunchSupportRunbookReviewDetails)}
      advancedCopy="advanced launch support runbook review details collapsed/secondary. This route remains review-only and approval required. It never publishes support guidance, sends handoff, mutates files from UI, exports files automatically, launches Daily Beta 1, triggers rollback, starts monitoring jobs, calls providers, calls local models, calls connectors, creates automations, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="launch-support-runbook-review buildLaunchSupportRunbookReviewStableKey LaunchSupportRunbookReviewPanel"
    />
  );
}
