"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaActivationRecoveryReviewModel, buildDailyBetaActivationRecoveryReviewStableKey } from "@/lib/codexforge/daily-beta-activation-recovery-review";

const DAILY_BETA_ACTIVATION_RECOVERY_REVIEW_MARKERS = [
  "Daily Beta activation recovery review",
  "Daily Beta activation recovery review does not trigger recovery",
  "Recovery actions require explicit operator approval",
  "Unsafe activation recovery shortcuts stay blocked",
  "Recovery groups",
  "Activation failure categories",
] as const;

export function DailyBetaActivationRecoveryReviewPanel() {
  const model = buildDailyBetaActivationRecoveryReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.recoveryReviews.map((recoveryReview) => ({
    id: buildDailyBetaActivationRecoveryReviewStableKey("daily-beta-activation-recovery-review-card", recoveryReview.id),
    title: recoveryReview.activationRecoveryIdentity,
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
    routes: [recoveryReview.activationHardeningRoute, recoveryReview.activationReleaseCandidateRoute],
    nextRecommendedAction: recoveryReview.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 566"
      title="Daily Beta activation recovery review"
      subtitle="Daily Beta activation recovery review reviews recovery options in plain English without triggering them. Daily Beta activation recovery review does not trigger recovery. Recovery actions require explicit operator approval, and unsafe activation recovery shortcuts stay blocked."
      primaryLabel="Review recovery"
      anchor="daily-beta-activation-recovery-review"
      plainEnglishTitle="Plain-English Daily Beta activation recovery review"
      plainEnglishCopy="This page reviews activation recovery identity, recovery groups, activation failure categories, rollback checklist, escalation checklist, operator decision checklist, denied recovery actions, unresolved recovery blockers, activation hardening route, activation release candidate route, and next recommended action. It is review-only, approval required, and it does not trigger recovery, execute workflows, run rollback, mutate files, mutate memory, call providers, call local models, call connectors, create automations, send notifications, persist approval decisions, store outputs, go live, or store credentials."
      language={model.language}
      markers={[...DAILY_BETA_ACTIVATION_RECOVERY_REVIEW_MARKERS]}
      links={[
        { href: "/daily-beta-activation-result-review", label: "Result" },
        { href: "/daily-beta-activation-hardening-pass", label: "Hardening" },
        { href: "/codexforge-daily-beta-activation-release-candidate", label: "Activation RC" },
        { href: "/release-readiness-dashboard", label: "Readiness" },
      ]}
      cards={cards}
      advancedSummary="Advanced Daily Beta activation recovery review details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.recoveryReviews.map((recoveryReview) => recoveryReview.advancedDailyBetaActivationRecoveryReviewDetails)}
      advancedCopy="advanced Daily Beta activation recovery review details collapsed/secondary. This route remains review-only and approval required. It never triggers recovery, executes workflows, runs rollback, mutates files, mutates memory, calls providers, calls local models, calls connectors, creates automations, sends notifications, persists approval decisions, stores outputs, goes live, stores credentials, or creates an MCP runtime."
      dataScope="daily-beta-activation-recovery-review buildDailyBetaActivationRecoveryReviewStableKey DailyBetaActivationRecoveryReviewPanel"
    />
  );
}
