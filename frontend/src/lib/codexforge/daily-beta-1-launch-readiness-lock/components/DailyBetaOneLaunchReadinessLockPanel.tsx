"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaOneLaunchReadinessLockModel, buildDailyBetaOneLaunchReadinessLockStableKey } from "@/lib/codexforge/daily-beta-1-launch-readiness-lock";

const DAILY_BETA_ONE_LAUNCH_READINESS_LOCK_MARKERS = [
  "Daily Beta 1 launch readiness lock",
  "Daily Beta 1 launch readiness lock does not lock launch readiness automatically",
  "Launch readiness lock requires explicit operator approval",
  "Unresolved launch readiness lock blockers stay blocked",
  "Lock criteria groups",
  "Launch candidate checklist",
] as const;

export function DailyBetaOneLaunchReadinessLockPanel() {
  const model = buildDailyBetaOneLaunchReadinessLockModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.launchReadinessLocks.map((launchReadinessLock) => ({
    id: buildDailyBetaOneLaunchReadinessLockStableKey("daily-beta-1-launch-readiness-lock-card", launchReadinessLock.id),
    title: launchReadinessLock.launchReadinessLockIdentity,
    status: launchReadinessLock.status,
    sections: [
      { label: "Lock criteria groups", items: launchReadinessLock.lockCriteriaGroups },
      { label: "Launch readiness summary checklist", items: launchReadinessLock.launchReadinessSummaryChecklist },
      { label: "Dry-run/evidence/result checklist", items: launchReadinessLock.dryRunEvidenceResultChecklist },
      { label: "Launch candidate checklist", items: launchReadinessLock.launchCandidateChecklist },
      { label: "Rollback checklist", items: launchReadinessLock.rollbackChecklist },
      { label: "Denied readiness lock actions", items: launchReadinessLock.deniedReadinessLockActions },
      { label: "Unresolved launch readiness lock blockers", items: launchReadinessLock.unresolvedLaunchReadinessLockBlockers },
    ],
    routes: [launchReadinessLock.launchCandidateRoute, launchReadinessLock.checkpointDocsRoute],
    nextRecommendedAction: launchReadinessLock.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 601"
      title="Daily Beta 1 launch readiness lock"
      subtitle="Daily Beta 1 launch readiness lock reviews launch lock criteria in plain English without locking or freezing launch readiness. Daily Beta 1 launch readiness lock does not lock launch readiness automatically. Launch readiness lock requires explicit operator approval, and unresolved launch readiness lock blockers stay blocked."
      primaryLabel="Review launch lock"
      anchor="daily-beta-1-launch-readiness-lock"
      plainEnglishTitle="Plain-English Daily Beta 1 launch readiness lock"
      plainEnglishCopy="This page reviews launch readiness lock identity, lock criteria groups, launch readiness summary checklist, dry-run/evidence/result checklist, launch candidate checklist, rollback checklist, denied readiness lock actions, unresolved launch readiness lock blockers, launch candidate route, checkpoint docs route, and next recommended action. It is review-only and approval required. It does not lock launch readiness automatically, launch Daily Beta 1, go live, approve launch, persist launch settings, run launch dry-runs, ingest evidence, store results, execute workflows, call providers, call local models, call connectors, create automations, mutate files, mutate memory, store outputs, or store credentials."
      language={model.language}
      markers={[...DAILY_BETA_ONE_LAUNCH_READINESS_LOCK_MARKERS]}
      links={[
        { href: "/codexforge-daily-beta-1-launch-candidate", label: "Launch candidate" },
        { href: "/release-readiness-dashboard", label: "Readiness dashboard" },
        { href: "/daily-beta-1-launch-result-review", label: "Result review" },
        { href: "/daily-beta-1-launch-readiness-summary", label: "Launch summary" },
      ]}
      cards={cards}
      advancedSummary="Advanced Daily Beta 1 launch readiness lock details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.launchReadinessLocks.map((launchReadinessLock) => launchReadinessLock.advancedDailyBetaOneLaunchReadinessLockDetails)}
      advancedCopy="advanced Daily Beta 1 launch readiness lock details collapsed/secondary. This route remains review-only and approval required. It never locks launch readiness automatically, launches Daily Beta 1, goes live, approves launch, persists launch settings, runs launch dry-runs, ingests evidence, stores results, executes workflows, calls providers, calls local models, calls connectors, creates automations, mutates files, mutates memory, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="daily-beta-1-launch-readiness-lock buildDailyBetaOneLaunchReadinessLockStableKey DailyBetaOneLaunchReadinessLockPanel"
    />
  );
}
