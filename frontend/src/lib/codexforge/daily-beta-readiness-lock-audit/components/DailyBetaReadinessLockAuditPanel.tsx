"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaReadinessLockAuditModel, buildDailyBetaReadinessLockAuditStableKey } from "@/lib/codexforge/daily-beta-readiness-lock-audit";

const DAILY_BETA_READINESS_LOCK_AUDIT_MARKERS = [
  "Daily Beta readiness lock audit",
  "Daily Beta readiness lock audit does not lock or freeze readiness automatically",
  "Readiness lock audit decisions require explicit operator approval",
  "Unresolved readiness lock audit blockers stay blocked",
  "Audit groups",
  "Final gate audit checklist",
] as const;

export function DailyBetaReadinessLockAuditPanel() {
  const model = buildDailyBetaReadinessLockAuditModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.readinessLockAudits.map((readinessLockAudit) => ({
    id: buildDailyBetaReadinessLockAuditStableKey("daily-beta-readiness-lock-audit-card", readinessLockAudit.id),
    title: readinessLockAudit.readinessLockAuditIdentity,
    status: readinessLockAudit.status,
    sections: [
      { label: "Audit groups", items: readinessLockAudit.auditGroups },
      { label: "Final gate audit checklist", items: readinessLockAudit.finalGateAuditChecklist },
      { label: "Controlled trial audit checklist", items: readinessLockAudit.controlledTrialAuditChecklist },
      { label: "Feedback/regression/final hardening audit checklist", items: readinessLockAudit.feedbackRegressionFinalHardeningAuditChecklist },
      { label: "Release handoff audit checklist", items: readinessLockAudit.releaseHandoffAuditChecklist },
      { label: "Denied audit actions", items: readinessLockAudit.deniedAuditActions },
      { label: "Unresolved readiness lock audit blockers", items: readinessLockAudit.unresolvedAuditBlockers },
    ],
    routes: [readinessLockAudit.releaseCandidateSummaryRoute, readinessLockAudit.dailyBetaOneFinalCandidateRoute],
    nextRecommendedAction: readinessLockAudit.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 578"
      title="Daily Beta readiness lock audit"
      subtitle="Daily Beta readiness lock audit reviews the readiness lock in plain English without locking or freezing readiness. Daily Beta readiness lock audit does not lock or freeze readiness automatically. Readiness lock audit decisions require explicit operator approval, and unresolved readiness lock audit blockers stay blocked."
      primaryLabel="Review lock audit"
      anchor="daily-beta-readiness-lock-audit"
      plainEnglishTitle="Plain-English Daily Beta readiness lock audit"
      plainEnglishCopy="This page reviews readiness lock audit identity, audit groups, final gate audit checklist, controlled trial audit checklist, feedback/regression/final hardening audit checklist, release handoff audit checklist, denied audit actions, unresolved audit blockers, release candidate summary route, Daily Beta 1 final candidate route, and next recommended action. It is review-only, approval required, and it does not lock or freeze readiness automatically, audit-lock automatically, activate Daily Beta, activate Daily Beta 1, execute workflows, run tests, call providers, call local models, call connectors, create automations, mutate files, mutate memory, approve release, go live, persist approvals, store outputs, or store credentials."
      language={model.language}
      markers={[...DAILY_BETA_READINESS_LOCK_AUDIT_MARKERS]}
      links={[
        { href: "/daily-beta-release-candidate-summary", label: "Summary" },
        { href: "/codexforge-daily-beta-1-final-candidate", label: "Final candidate" },
        { href: "/daily-beta-activation-readiness-lock", label: "Readiness lock" },
        { href: "/release-readiness-dashboard", label: "Readiness" },
      ]}
      cards={cards}
      advancedSummary="Advanced Daily Beta readiness lock audit details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.readinessLockAudits.map((readinessLockAudit) => readinessLockAudit.advancedDailyBetaReadinessLockAuditDetails)}
      advancedCopy="advanced Daily Beta readiness lock audit details collapsed/secondary. This route remains review-only and approval required. It never locks or freezes readiness automatically, audit-locks automatically, activates Daily Beta, activates Daily Beta 1, executes workflows, runs tests, calls providers, calls local models, calls connectors, creates automations, mutates files, mutates memory, approves release, goes live, persists approvals, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="daily-beta-readiness-lock-audit buildDailyBetaReadinessLockAuditStableKey DailyBetaReadinessLockAuditPanel"
    />
  );
}
