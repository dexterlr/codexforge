"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaOneActivationRecoveryReviewModel, buildDailyBetaOneActivationRecoveryReviewStableKey } from "@/lib/codexforge/daily-beta-1-activation-recovery-review";

const DAILY_BETA_ONE_ACTIVATION_RECOVERY_REVIEW_MARKERS = [
  "Daily Beta 1 activation recovery review",
  "Daily Beta 1 activation recovery review does not trigger recovery",
  "Daily Beta 1 recovery actions require explicit operator approval",
  "Unsafe recovery shortcuts stay blocked",
  "Recovery groups",
  "Activation failure categories",
] as const;

export function DailyBetaOneActivationRecoveryReviewPanel() {
  const model = buildDailyBetaOneActivationRecoveryReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.recoveryReviews.map((recoveryReview) => ({
    id: buildDailyBetaOneActivationRecoveryReviewStableKey("daily-beta-1-activation-recovery-review-card", recoveryReview.id),
    title: recoveryReview.dailyBetaOneActivationRecoveryIdentity,
    status: recoveryReview.status,
    sections: [
      { label: "Recovery groups", items: recoveryReview.recoveryGroups },
      { label: "Activation failure categories", items: recoveryReview.activationFailureCategories },
      { label: "Rollback checklist", items: recoveryReview.rollbackChecklist },
      { label: "Escalation checklist", items: recoveryReview.escalationChecklist },
      { label: "Operator decision checklist", items: recoveryReview.operatorDecisionChecklist },
      { label: "Denied recovery actions", items: recoveryReview.deniedRecoveryActions },
      { label: "Unresolved recovery blockers", items: recoveryReview.unresolvedRecoveryBlockers },
    ],
    routes: [recoveryReview.hardeningPassRoute, recoveryReview.activationReleaseCandidateRoute],
    nextRecommendedAction: recoveryReview.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 590"
      title="Daily Beta 1 activation recovery review"
      subtitle="Daily Beta 1 activation recovery review reviews recovery options in plain English without triggering them. Daily Beta 1 activation recovery review does not trigger recovery. Daily Beta 1 recovery actions require explicit operator approval, and unsafe recovery shortcuts stay blocked."
      primaryLabel="Review recovery"
      anchor="daily-beta-1-activation-recovery-review"
      plainEnglishTitle="Plain-English Daily Beta 1 activation recovery review"
      plainEnglishCopy="This page reviews Daily Beta 1 activation recovery identity, recovery groups, activation failure categories, rollback checklist, escalation checklist, operator decision checklist, denied recovery actions, unresolved recovery blockers, hardening pass route, activation release candidate route, and next recommended action. It is review-only and approval required. It does not trigger recovery, execute workflows, run rollback, mutate files, mutate memory, call providers, call local models, call connectors, create automations, send notifications, persist approval decisions, store outputs, go live, activate Daily Beta 1, or store credentials."
      language={model.language}
      markers={[...DAILY_BETA_ONE_ACTIVATION_RECOVERY_REVIEW_MARKERS]}
      links={[
        { href: "/daily-beta-1-activation-regression-review", label: "Regression review" },
        { href: "/daily-beta-1-activation-hardening-pass", label: "Hardening pass" },
        { href: "/codexforge-daily-beta-1-activation-release-candidate", label: "Release candidate" },
        { href: "/daily-beta-1-activation-final-gate", label: "Final gate" },
      ]}
      cards={cards}
      advancedSummary="Advanced Daily Beta 1 activation recovery review details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.recoveryReviews.map((recoveryReview) => recoveryReview.advancedDailyBetaOneActivationRecoveryReviewDetails)}
      advancedCopy="advanced Daily Beta 1 activation recovery review details collapsed/secondary. This route remains review-only and approval required. It never triggers recovery, executes workflows, runs rollback, mutates files, mutates memory, calls providers, calls local models, calls connectors, creates automations, sends notifications, persists approval decisions, stores outputs, goes live, activates Daily Beta 1, stores credentials, or creates an MCP runtime."
      dataScope="daily-beta-1-activation-recovery-review buildDailyBetaOneActivationRecoveryReviewStableKey DailyBetaOneActivationRecoveryReviewPanel"
    />
  );
}
