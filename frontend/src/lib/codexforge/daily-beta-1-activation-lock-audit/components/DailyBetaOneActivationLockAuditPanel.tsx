"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaOneActivationLockAuditModel, buildDailyBetaOneActivationLockAuditStableKey } from "@/lib/codexforge/daily-beta-1-activation-lock-audit";

const DAILY_BETA_ONE_ACTIVATION_LOCK_AUDIT_MARKERS = [
  "Daily Beta 1 activation lock audit",
  "Daily Beta 1 activation lock audit does not lock or freeze readiness automatically",
  "Activation lock audit decisions require explicit operator approval",
  "Unresolved activation lock audit blockers stay blocked",
  "Audit groups",
  "Final gate audit checklist",
] as const;

export function DailyBetaOneActivationLockAuditPanel() {
  const model = buildDailyBetaOneActivationLockAuditModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.activationLockAudits.map((activationLockAudit) => ({
    id: buildDailyBetaOneActivationLockAuditStableKey("daily-beta-1-activation-lock-audit-card", activationLockAudit.id),
    title: activationLockAudit.dailyBetaOneActivationLockAuditIdentity,
    status: activationLockAudit.status,
    sections: [
      { label: "Audit groups", items: activationLockAudit.auditGroups },
      { label: "Final gate audit checklist", items: activationLockAudit.finalGateAuditChecklist },
      { label: "Controlled trial audit checklist", items: activationLockAudit.controlledTrialAuditChecklist },
      { label: "Feedback/regression/recovery/hardening audit checklist", items: activationLockAudit.feedbackRegressionRecoveryHardeningAuditChecklist },
      { label: "Release candidate audit checklist", items: activationLockAudit.releaseCandidateAuditChecklist },
      { label: "Denied audit actions", items: activationLockAudit.deniedAuditActions },
      { label: "Unresolved activation lock audit blockers", items: activationLockAudit.unresolvedAuditBlockers },
    ],
    routes: [activationLockAudit.releaseHandoffFinalReviewRoute, activationLockAudit.launchReadinessSummaryRoute],
    nextRecommendedAction: activationLockAudit.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 594"
      title="Daily Beta 1 activation lock audit"
      subtitle="Daily Beta 1 activation lock audit reviews activation readiness lock state in plain English without locking or freezing readiness. Daily Beta 1 activation lock audit does not lock or freeze readiness automatically. Activation lock audit decisions require explicit operator approval, and unresolved activation lock audit blockers stay blocked."
      primaryLabel="Review activation audit"
      anchor="daily-beta-1-activation-lock-audit"
      plainEnglishTitle="Plain-English Daily Beta 1 activation lock audit"
      plainEnglishCopy="This page reviews Daily Beta 1 activation lock audit identity, audit groups, final gate audit checklist, controlled trial audit checklist, feedback/regression/recovery/hardening audit checklist, release candidate audit checklist, denied audit actions, unresolved audit blockers, release handoff final review route, launch readiness summary route, and next recommended action. It is review-only and approval required. It does not lock or freeze readiness automatically, activate Daily Beta 1, launch Daily Beta 1, run launch dry-runs, approve launch, ingest evidence, persist results, send handoff, execute workflows, call providers, call local models, call connectors, create automations, mutate files, mutate memory, store outputs, or store credentials."
      language={model.language}
      markers={[...DAILY_BETA_ONE_ACTIVATION_LOCK_AUDIT_MARKERS]}
      links={[
        { href: "/daily-beta-1-release-handoff-final-review", label: "Handoff final review" },
        { href: "/daily-beta-1-launch-readiness-summary", label: "Launch summary" },
        { href: "/codexforge-daily-beta-1-activation-release-candidate", label: "Activation RC" },
        { href: "/daily-beta-1-activation-readiness-lock", label: "Readiness lock" },
      ]}
      cards={cards}
      advancedSummary="Advanced Daily Beta 1 activation lock audit details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.activationLockAudits.map((activationLockAudit) => activationLockAudit.advancedDailyBetaOneActivationLockAuditDetails)}
      advancedCopy="advanced Daily Beta 1 activation lock audit details collapsed/secondary. This route remains review-only and approval required. It never locks or freezes readiness automatically, activates Daily Beta 1, launches Daily Beta 1, runs launch dry-runs, approves launch, ingests launch evidence, persists launch results, sends handoff, executes workflows, calls providers, calls local models, calls connectors, creates automations, mutates files, mutates memory, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="daily-beta-1-activation-lock-audit buildDailyBetaOneActivationLockAuditStableKey DailyBetaOneActivationLockAuditPanel"
    />
  );
}
