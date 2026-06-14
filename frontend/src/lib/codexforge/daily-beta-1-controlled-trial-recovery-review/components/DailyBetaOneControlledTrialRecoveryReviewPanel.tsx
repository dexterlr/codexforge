"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaOneControlledTrialRecoveryReviewModel, buildDailyBetaOneControlledTrialRecoveryReviewStableKey } from "@/lib/codexforge/daily-beta-1-controlled-trial-recovery-review";

const DAILY_BETA_ONE_CONTROLLED_TRIAL_RECOVERY_REVIEW_MARKERS = [
  "Daily Beta 1 controlled trial recovery review",
  "Daily Beta 1 controlled trial recovery review does not trigger recovery",
  "Recovery actions require explicit operator approval",
  "Unsafe recovery shortcuts stay blocked",
  "Recovery groups",
  "Failure categories",
] as const;

export function DailyBetaOneControlledTrialRecoveryReviewPanel() {
  const model = buildDailyBetaOneControlledTrialRecoveryReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.recoveryReviews.map((review) => ({
    id: buildDailyBetaOneControlledTrialRecoveryReviewStableKey("daily-beta-1-controlled-trial-recovery-review-card", review.id),
    title: review.controlledTrialRecoveryReviewIdentity,
    status: review.status,
    sections: [
      { label: "Recovery groups", items: review.recoveryGroups },
      { label: "Failure categories", items: review.failureCategories },
      { label: "Rollback checklist", items: review.rollbackChecklist },
      { label: "Escalation checklist", items: review.escalationChecklist },
      { label: "Operator decision checklist", items: review.operatorDecisionChecklist },
      { label: "Denied recovery actions", items: review.deniedRecoveryActions },
      { label: "Unresolved recovery blockers", items: review.unresolvedRecoveryBlockers },
    ],
    routes: [review.hardeningRoute, review.backendBoundaryInventoryRoute],
    nextRecommendedAction: review.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 531"
      title="Trial recovery"
      subtitle="Daily Beta 1 controlled trial recovery review reviews recovery options in plain English. Daily Beta 1 controlled trial recovery review does not trigger recovery. Recovery actions require explicit operator approval, and unsafe recovery shortcuts stay blocked."
      primaryLabel="Review recovery"
      anchor="daily-beta-1-controlled-trial-recovery-review"
      plainEnglishTitle="Plain-English Daily Beta 1 controlled trial recovery review"
      plainEnglishCopy="This page reviews controlled trial recovery review identity, Recovery groups, Failure categories, Rollback checklist, Escalation checklist, Operator decision checklist, Denied recovery actions, Unresolved recovery blockers, Hardening route, Backend boundary inventory route, and next recommended action. It is review-only, approval required, and it does not trigger recovery, execute workflows, mutate files, launch Daily Beta 1, call providers, call local models, call connectors, create automations, send notifications, mutate memory, or store credentials."
      language={model.language}
      markers={[...DAILY_BETA_ONE_CONTROLLED_TRIAL_RECOVERY_REVIEW_MARKERS]}
      links={[
        { href: "/daily-beta-1-controlled-trial-result-review", label: "Result review" },
        { href: "/daily-beta-1-controlled-trial-hardening", label: "Hardening" },
        { href: "/live-backend-boundary-inventory", label: "Backend boundaries" },
        { href: "/codexforge-daily-beta-1-release-candidate", label: "Release candidate" },
      ]}
      cards={cards}
      advancedSummary="Advanced controlled trial recovery details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.recoveryReviews.map((review) => review.advancedControlledTrialRecoveryReviewDetails)}
      advancedCopy="advanced controlled trial recovery details collapsed/secondary. This route remains review-only and approval required. It never triggers recovery, executes workflows, mutates files, launches Daily Beta 1, executes controlled trial, runs boundary probes, calls providers, calls local models, calls local bridge endpoints, calls connectors, creates automations, sends notifications, mutates memory, stores credentials, stores outputs, or creates an MCP runtime."
      dataScope="daily-beta-1-controlled-trial-recovery-review buildDailyBetaOneControlledTrialRecoveryReviewStableKey DailyBetaOneControlledTrialRecoveryReviewPanel"
    />
  );
}
