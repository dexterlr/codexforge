"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaOneControlledLaunchReadinessLockModel, buildDailyBetaOneControlledLaunchReadinessLockStableKey } from "@/lib/codexforge/daily-beta-1-controlled-launch-readiness-lock";

const DAILY_BETA_ONE_CONTROLLED_LAUNCH_READINESS_LOCK_MARKERS = [
  "Daily Beta 1 controlled launch readiness lock",
  "Daily Beta 1 controlled launch readiness lock does not lock launch readiness automatically",
  "Controlled launch readiness lock requires explicit operator approval",
  "Unresolved controlled launch readiness lock blockers stay blocked",
  "Lock criteria groups",
  "Candidate handoff checklist",
] as const;

export function DailyBetaOneControlledLaunchReadinessLockPanel() {
  const model = buildDailyBetaOneControlledLaunchReadinessLockModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.dailyBetaOneControlledLaunchReadinessLocks.map((readinessLock) => ({
    id: buildDailyBetaOneControlledLaunchReadinessLockStableKey("daily-beta-1-controlled-launch-readiness-lock-card", readinessLock.id),
    title: readinessLock.controlledLaunchReadinessLockIdentity,
    status: readinessLock.status,
    sections: [
      { label: "Lock criteria groups", items: readinessLock.lockCriteriaGroups },
      { label: "Launch review checklist", items: readinessLock.launchReviewChecklist },
      { label: "Evidence/result/recovery/hardening checklist", items: readinessLock.evidenceResultRecoveryHardeningChecklist },
      { label: "Candidate handoff checklist", items: readinessLock.candidateHandoffChecklist },
      { label: "Rollback checklist", items: readinessLock.rollbackChecklist },
      { label: "Denied readiness lock actions", items: readinessLock.deniedReadinessLockActions },
      { label: "Unresolved readiness lock blockers", items: readinessLock.unresolvedReadinessLockBlockers },
    ],
    routes: [readinessLock.controlledLaunchCandidateRoute, readinessLock.checkpointDocsRoute],
    nextRecommendedAction: readinessLock.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 617"
      title="Daily Beta 1 controlled launch readiness lock"
      subtitle="Daily Beta 1 controlled launch readiness lock reviews lock criteria without freezing launch posture. Daily Beta 1 controlled launch readiness lock does not lock launch readiness automatically. Controlled launch readiness lock requires explicit operator approval, and unresolved controlled launch readiness lock blockers stay blocked."
      primaryLabel="Review readiness lock"
      anchor="daily-beta-1-controlled-launch-readiness-lock"
      plainEnglishTitle="Plain-English Daily Beta 1 controlled launch readiness lock"
      plainEnglishCopy="This page reviews controlled launch readiness lock identity, lock criteria groups, launch review checklist, evidence/result/recovery/hardening checklist, candidate handoff checklist, rollback checklist, denied readiness lock actions, unresolved readiness lock blockers, controlled launch candidate route, checkpoint docs route, and next recommended action. It is review-only and approval required. It does not lock launch readiness automatically, freeze readiness, launch Daily Beta 1, go live, execute controlled launch, approve launch, persist approval decisions, persist launch settings, ingest evidence, store results, trigger recovery, apply hardening, send handoff, mutate files, mutate memory, call providers, call local models, call connectors, create automations, store outputs, or store credentials. Actual project/server building still requires approved file, command, local runtime, package, and deployment execution boundaries."
      language={model.language}
      markers={[...DAILY_BETA_ONE_CONTROLLED_LAUNCH_READINESS_LOCK_MARKERS]}
      links={[
        { href: "/daily-beta-1-controlled-launch-candidate", label: "Controlled candidate" },
        { href: "/daily-beta-1-controlled-launch-handoff", label: "Controlled handoff" },
        { href: "/first-controlled-launch-review", label: "Launch review" },
        { href: "/release-readiness-dashboard", label: "Readiness dashboard" },
      ]}
      cards={cards}
      advancedSummary="Advanced Daily Beta 1 controlled launch readiness lock details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.dailyBetaOneControlledLaunchReadinessLocks.map((readinessLock) => readinessLock.advancedDailyBetaOneControlledLaunchReadinessLockDetails)}
      advancedCopy="advanced Daily Beta 1 controlled launch readiness lock details collapsed/secondary. This route remains review-only and approval required. It never locks launch readiness automatically, freezes readiness, launches Daily Beta 1, goes live, executes controlled launch, approves launch, persists approval decisions, persists launch settings, ingests evidence, stores results, triggers recovery, applies hardening, sends handoff, mutates files, mutates memory, calls providers, calls local models, calls connectors, creates automations, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="daily-beta-1-controlled-launch-readiness-lock buildDailyBetaOneControlledLaunchReadinessLockStableKey DailyBetaOneControlledLaunchReadinessLockPanel"
    />
  );
}
