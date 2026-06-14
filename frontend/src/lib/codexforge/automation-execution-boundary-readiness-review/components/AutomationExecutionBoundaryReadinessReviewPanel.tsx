"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildAutomationExecutionBoundaryReadinessReviewModel, buildAutomationExecutionBoundaryReadinessReviewStableKey } from "@/lib/codexforge/automation-execution-boundary-readiness-review";

const AUTOMATION_EXECUTION_BOUNDARY_READINESS_REVIEW_MARKERS = [
  "Automation execution boundary readiness review",
  "Automation execution boundary readiness review does not create or run automations",
  "Automation execution requires explicit operator approval",
  "Unresolved automation boundary blockers stay blocked",
  "Automation boundary groups",
  "Schedule watch checklist",
] as const;

export function AutomationExecutionBoundaryReadinessReviewPanel() {
  const model = buildAutomationExecutionBoundaryReadinessReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.automationReviews.map((review) => ({
    id: buildAutomationExecutionBoundaryReadinessReviewStableKey("automation-execution-boundary-readiness-review-card", review.id),
    title: review.automationExecutionBoundaryIdentity,
    status: review.status,
    sections: [
      { label: "Automation boundary groups", items: review.automationBoundaryGroups },
      { label: "Approval gate checklist", items: review.approvalGateChecklist },
      { label: "Schedule watch checklist", items: review.scheduleWatchChecklist },
      { label: "Notification checklist", items: review.notificationChecklist },
      { label: "Stop/rollback checklist", items: review.stopRollbackChecklist },
      { label: "Denied automation execution actions", items: review.deniedAutomationExecutionActions },
      { label: "Unresolved automation boundary blockers", items: review.unresolvedAutomationBoundaryBlockers },
    ],
    routes: [review.backendBoundaryInventoryRoute, review.dailyBetaOneReleaseCandidateRoute],
    nextRecommendedAction: review.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 537"
      title="Automation boundary"
      subtitle="Automation execution boundary readiness review reviews automation execution readiness in plain English. Automation execution boundary readiness review does not create or run automations. Automation execution requires explicit operator approval, and unresolved automation boundary blockers stay blocked."
      primaryLabel="Review automation"
      anchor="automation-execution-boundary-readiness-review"
      plainEnglishTitle="Plain-English automation execution boundary readiness review"
      plainEnglishCopy="This page reviews automation execution boundary identity, Automation boundary groups, Approval gate checklist, Schedule watch checklist, Notification checklist, Stop/rollback checklist, Denied automation execution actions, Unresolved automation boundary blockers, Backend boundary inventory route, Daily Beta 1 release candidate route, and next recommended action. It is review-only, approval required, and it does not create automations, run automations, schedule tasks, create reminders, create watches, start polling loops, create background jobs, send notifications, execute workflows, call providers, call local models, call connectors, mutate files, mutate memory, or store credentials."
      language={model.language}
      markers={[...AUTOMATION_EXECUTION_BOUNDARY_READINESS_REVIEW_MARKERS]}
      links={[
        { href: "/live-backend-boundary-inventory", label: "Backend inventory" },
        { href: "/provider-execution-boundary-readiness-review", label: "Provider boundary" },
        { href: "/connector-execution-boundary-readiness-review", label: "Connector boundary" },
        { href: "/codexforge-daily-beta-1-release-candidate", label: "Release candidate" },
      ]}
      cards={cards}
      advancedSummary="Advanced automation execution boundary details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.automationReviews.map((review) => review.advancedAutomationExecutionBoundaryDetails)}
      advancedCopy="advanced automation execution boundary details collapsed/secondary. This route remains review-only and approval required. It never creates automations, runs automations, schedules tasks, creates reminders, creates watches, starts polling loops, creates background jobs, sends notifications, persists automation rules, executes workflows, calls providers, calls local models, calls connectors, mutates files, mutates memory, stores credentials, stores outputs, or creates an MCP runtime."
      dataScope="automation-execution-boundary-readiness-review buildAutomationExecutionBoundaryReadinessReviewStableKey AutomationExecutionBoundaryReadinessReviewPanel"
    />
  );
}
