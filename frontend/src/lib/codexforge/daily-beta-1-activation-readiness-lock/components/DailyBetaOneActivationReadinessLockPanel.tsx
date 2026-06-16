"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaOneActivationReadinessLockModel, buildDailyBetaOneActivationReadinessLockStableKey } from "@/lib/codexforge/daily-beta-1-activation-readiness-lock";

const DAILY_BETA_ONE_ACTIVATION_READINESS_LOCK_MARKERS = [
  "Daily Beta 1 activation readiness lock",
  "Daily Beta 1 activation readiness lock does not lock readiness automatically",
  "Daily Beta 1 readiness lock requires explicit operator approval",
  "Unresolved Daily Beta 1 readiness lock blockers stay blocked",
  "Lock criteria groups",
  "Controlled trial checklist",
] as const;

export function DailyBetaOneActivationReadinessLockPanel() {
  const model = buildDailyBetaOneActivationReadinessLockModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.readinessLocks.map((readinessLock) => ({
    id: buildDailyBetaOneActivationReadinessLockStableKey("daily-beta-1-activation-readiness-lock-card", readinessLock.id),
    title: readinessLock.dailyBetaOneActivationReadinessLockIdentity,
    status: readinessLock.status,
    sections: [
      { label: "Lock criteria groups", items: readinessLock.lockCriteriaGroups },
      { label: "Final gate checklist", items: readinessLock.finalGateChecklist },
      { label: "Controlled trial checklist", items: readinessLock.controlledTrialChecklist },
      { label: "Feedback/regression/recovery/hardening checklist", items: readinessLock.feedbackRegressionRecoveryHardeningChecklist },
      { label: "Release candidate checklist", items: readinessLock.releaseCandidateChecklist },
      { label: "Denied readiness lock actions", items: readinessLock.deniedReadinessLockActions },
      { label: "Unresolved readiness lock blockers", items: readinessLock.unresolvedReadinessLockBlockers },
    ],
    routes: [readinessLock.activationReleaseCandidateRoute, readinessLock.releaseReadinessDashboardRoute],
    nextRecommendedAction: readinessLock.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 593"
      title="Daily Beta 1 activation readiness lock"
      subtitle="Daily Beta 1 activation readiness lock reviews readiness criteria in plain English without locking automatically. Daily Beta 1 activation readiness lock does not lock readiness automatically. Daily Beta 1 readiness lock requires explicit operator approval, and unresolved Daily Beta 1 readiness lock blockers stay blocked."
      primaryLabel="Review readiness lock"
      anchor="daily-beta-1-activation-readiness-lock"
      plainEnglishTitle="Plain-English Daily Beta 1 activation readiness lock"
      plainEnglishCopy="This page reviews Daily Beta 1 activation readiness lock identity, lock criteria groups, final gate checklist, controlled trial checklist, feedback/regression/recovery/hardening checklist, release candidate checklist, denied readiness lock actions, unresolved readiness lock blockers, activation release candidate route, release readiness dashboard route, and next recommended action. It is review-only and approval required. It does not lock readiness automatically, activate Daily Beta 1, go live, execute workflows, run controlled trials, run tests, trigger recovery, apply hardening, persist activation settings, persist approval decisions, call providers, call local models, call connectors, create automations, mutate files, mutate memory, store outputs, or store credentials."
      language={model.language}
      markers={[...DAILY_BETA_ONE_ACTIVATION_READINESS_LOCK_MARKERS]}
      links={[
        { href: "/codexforge-daily-beta-1-activation-release-candidate", label: "Release candidate" },
        { href: "/daily-beta-1-activation-hardening-pass", label: "Hardening pass" },
        { href: "/daily-beta-1-activation-final-gate", label: "Final gate" },
        { href: "/release-readiness-dashboard", label: "Readiness dashboard" },
      ]}
      cards={cards}
      advancedSummary="Advanced Daily Beta 1 activation readiness lock details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.readinessLocks.map((readinessLock) => readinessLock.advancedDailyBetaOneActivationReadinessLockDetails)}
      advancedCopy="advanced Daily Beta 1 activation readiness lock details collapsed/secondary. This route remains review-only and approval required. It never locks readiness automatically, activates Daily Beta 1, goes live, executes workflows, runs controlled trials, runs tests, triggers recovery, applies hardening, persists activation settings, persists approval decisions, calls providers, calls local models, calls connectors, creates automations, mutates files, mutates memory, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="daily-beta-1-activation-readiness-lock buildDailyBetaOneActivationReadinessLockStableKey DailyBetaOneActivationReadinessLockPanel"
    />
  );
}
