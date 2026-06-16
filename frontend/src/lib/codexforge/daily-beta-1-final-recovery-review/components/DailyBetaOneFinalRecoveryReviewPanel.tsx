"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaOneFinalRecoveryReviewModel, buildDailyBetaOneFinalRecoveryReviewStableKey } from "@/lib/codexforge/daily-beta-1-final-recovery-review";

const DAILY_BETA_ONE_FINAL_RECOVERY_REVIEW_MARKERS = [
  "Daily Beta 1 final recovery review",
  "Daily Beta 1 final recovery review does not trigger recovery",
  "Final recovery actions require explicit operator approval",
  "Unsafe final recovery shortcuts stay blocked",
  "Recovery groups",
  "Activation failure categories",
] as const;

export function DailyBetaOneFinalRecoveryReviewPanel() {
  const model = buildDailyBetaOneFinalRecoveryReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.finalRecoveryReviews.map((finalRecoveryReview) => ({
    id: buildDailyBetaOneFinalRecoveryReviewStableKey("daily-beta-1-final-recovery-review-card", finalRecoveryReview.id),
    title: finalRecoveryReview.finalRecoveryReviewIdentity,
    status: finalRecoveryReview.status,
    sections: [
      { label: "Recovery groups", items: finalRecoveryReview.recoveryGroups },
      { label: "Activation failure categories", items: finalRecoveryReview.activationFailureCategories },
      { label: "Rollback checklist", items: finalRecoveryReview.rollbackChecklist },
      { label: "Escalation checklist", items: finalRecoveryReview.escalationChecklist },
      { label: "Operator decision checklist", items: finalRecoveryReview.operatorDecisionChecklist },
      { label: "Denied recovery actions", items: finalRecoveryReview.deniedRecoveryActions },
      { label: "Unresolved final recovery blockers", items: finalRecoveryReview.unresolvedFinalRecoveryBlockers },
    ],
    routes: [finalRecoveryReview.finalHardeningRoute, finalRecoveryReview.dailyBetaOneActivationCandidateRoute],
    nextRecommendedAction: finalRecoveryReview.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 583"
      title="Daily Beta 1 final recovery review"
      subtitle="Daily Beta 1 final recovery review reviews recovery options in plain English without triggering them. Daily Beta 1 final recovery review does not trigger recovery. Final recovery actions require explicit operator approval, and unsafe final recovery shortcuts stay blocked."
      primaryLabel="Review recovery"
      anchor="daily-beta-1-final-recovery-review"
      plainEnglishTitle="Plain-English Daily Beta 1 final recovery review"
      plainEnglishCopy="This page reviews final recovery review identity, recovery groups, activation failure categories, rollback checklist, escalation checklist, operator decision checklist, denied recovery actions, unresolved final recovery blockers, final hardening route, Daily Beta 1 activation candidate route, and next recommended action. It is review-only, approval required, and it does not trigger recovery, execute workflows, mutate files, activate Daily Beta 1, go live, apply hardening, run tests, call providers, call local models, call connectors, create automations, mutate memory, persist approvals, store outputs, or store credentials."
      language={model.language}
      markers={[...DAILY_BETA_ONE_FINAL_RECOVERY_REVIEW_MARKERS]}
      links={[
        { href: "/daily-beta-1-final-hardening-pass", label: "Hardening" },
        { href: "/codexforge-daily-beta-1-activation-candidate", label: "Activation candidate" },
        { href: "/daily-beta-1-final-regression-review", label: "Regression" },
        { href: "/daily-beta-1-final-operator-review", label: "Operator review" },
      ]}
      cards={cards}
      advancedSummary="Advanced Daily Beta 1 final recovery review details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.finalRecoveryReviews.map((finalRecoveryReview) => finalRecoveryReview.advancedDailyBetaOneFinalRecoveryReviewDetails)}
      advancedCopy="advanced Daily Beta 1 final recovery review details collapsed/secondary. This route remains review-only and approval required. It never triggers final recovery from UI, triggers recovery, executes workflows, mutates files, activates Daily Beta 1, goes live, applies hardening, runs tests, calls providers, calls local models, calls connectors, creates automations, mutates memory, persists approvals, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="daily-beta-1-final-recovery-review buildDailyBetaOneFinalRecoveryReviewStableKey DailyBetaOneFinalRecoveryReviewPanel"
    />
  );
}
