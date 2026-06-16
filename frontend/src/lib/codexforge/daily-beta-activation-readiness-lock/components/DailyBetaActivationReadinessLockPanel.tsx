"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaActivationReadinessLockModel, buildDailyBetaActivationReadinessLockStableKey } from "@/lib/codexforge/daily-beta-activation-readiness-lock";

const DAILY_BETA_ACTIVATION_READINESS_LOCK_MARKERS = [
  "Daily Beta activation readiness lock",
  "Daily Beta activation readiness lock does not lock readiness automatically",
  "Readiness lock requires explicit operator approval",
  "Unresolved readiness lock blockers stay blocked",
  "Lock criteria groups",
  "Rollback checklist",
] as const;

export function DailyBetaActivationReadinessLockPanel() {
  const model = buildDailyBetaActivationReadinessLockModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.readinessLocks.map((readinessLock) => ({
    id: buildDailyBetaActivationReadinessLockStableKey("daily-beta-activation-readiness-lock-card", readinessLock.id),
    title: readinessLock.activationReadinessLockIdentity,
    status: readinessLock.status,
    sections: [
      { label: "Lock criteria groups", items: readinessLock.lockCriteriaGroups },
      { label: "Final gate checklist", items: readinessLock.finalGateChecklist },
      { label: "Trial/feedback/regression/hardening checklist", items: readinessLock.trialFeedbackRegressionHardeningChecklist },
      { label: "Handoff checklist", items: readinessLock.handoffChecklist },
      { label: "Rollback checklist", items: readinessLock.rollbackChecklist },
      { label: "Denied readiness lock actions", items: readinessLock.deniedReadinessLockActions },
      { label: "Unresolved readiness lock blockers", items: readinessLock.unresolvedReadinessLockBlockers },
    ],
    routes: [readinessLock.activationCandidateRoute, readinessLock.checkpointDocsRoute],
    nextRecommendedAction: readinessLock.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 577"
      title="Daily Beta activation readiness lock"
      subtitle="Daily Beta activation readiness lock reviews readiness lock criteria in plain English without locking or freezing automatically. Daily Beta activation readiness lock does not lock readiness automatically. Readiness lock requires explicit operator approval, and unresolved readiness lock blockers stay blocked."
      primaryLabel="Review readiness lock"
      anchor="daily-beta-activation-readiness-lock"
      plainEnglishTitle="Plain-English Daily Beta activation readiness lock"
      plainEnglishCopy="This page reviews activation readiness lock identity, lock criteria groups, final gate checklist, trial/feedback/regression/hardening checklist, handoff checklist, rollback checklist, denied readiness lock actions, unresolved readiness lock blockers, activation candidate route, checkpoint docs route, and next recommended action. It is review-only, approval required, and it does not lock readiness automatically, freeze readiness, activate Daily Beta, go live, send handoff, export files automatically, mutate files, mutate memory, execute workflows, call providers, call local models, call connectors, create automations, persist approvals, store outputs, or store credentials."
      language={model.language}
      markers={[...DAILY_BETA_ACTIVATION_READINESS_LOCK_MARKERS]}
      links={[
        { href: "/codexforge-daily-beta-activation-candidate", label: "Candidate" },
        { href: "/daily-beta-activation-release-handoff", label: "Handoff" },
        { href: "/daily-beta-activation-final-gate", label: "Final gate" },
        { href: "/release-readiness-dashboard", label: "Readiness" },
      ]}
      cards={cards}
      advancedSummary="Advanced Daily Beta activation readiness lock details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.readinessLocks.map((readinessLock) => readinessLock.advancedDailyBetaActivationReadinessLockDetails)}
      advancedCopy="advanced Daily Beta activation readiness lock details collapsed/secondary. This route remains review-only and approval required. It never locks readiness automatically, freezes readiness, activates Daily Beta, goes live, sends handoff, exports files automatically, mutates files, mutates memory, executes workflows, calls providers, calls local models, calls connectors, creates automations, persists approvals, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="daily-beta-activation-readiness-lock buildDailyBetaActivationReadinessLockStableKey DailyBetaActivationReadinessLockPanel"
    />
  );
}
