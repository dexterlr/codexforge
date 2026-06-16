"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaActivationDryRunReviewModel, buildDailyBetaActivationDryRunReviewStableKey } from "@/lib/codexforge/daily-beta-activation-dry-run-review";

const DAILY_BETA_ACTIVATION_DRY_RUN_REVIEW_MARKERS = [
  "Daily Beta activation dry-run review",
  "Daily Beta activation dry-run review does not run activation dry-runs",
  "Activation dry-runs require explicit operator approval",
  "Unapproved activation dry-run paths remain blocked",
  "Dry-run groups",
  "Rollback checklist",
] as const;

export function DailyBetaActivationDryRunReviewPanel() {
  const model = buildDailyBetaActivationDryRunReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.dryRuns.map((dryRun) => ({
    id: buildDailyBetaActivationDryRunReviewStableKey("daily-beta-activation-dry-run-review-card", dryRun.id),
    title: dryRun.activationDryRunIdentity,
    status: dryRun.status,
    sections: [
      { label: "Dry-run groups", items: dryRun.dryRunGroups },
      { label: "Boundary dry-run checklist", items: dryRun.boundaryDryRunChecklist },
      { label: "Rollout dry-run checklist", items: dryRun.rolloutDryRunChecklist },
      { label: "Operator decision checklist", items: dryRun.operatorDecisionChecklist },
      { label: "Rollback checklist", items: dryRun.rollbackChecklist },
      { label: "Denied dry-run actions", items: dryRun.deniedDryRunActions },
      { label: "Unresolved dry-run blockers", items: dryRun.unresolvedDryRunBlockers },
    ],
    routes: [dryRun.activationEvidenceReviewRoute, dryRun.activationResultReviewRoute],
    nextRecommendedAction: dryRun.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 563"
      title="Daily Beta activation dry-run review"
      subtitle="Daily Beta activation dry-run review previews activation dry-run steps in plain English without running them. Daily Beta activation dry-run review does not run activation dry-runs. Activation dry-runs require explicit operator approval, and unapproved activation dry-run paths remain blocked."
      primaryLabel="Review dry-run"
      anchor="daily-beta-activation-dry-run-review"
      plainEnglishTitle="Plain-English Daily Beta activation dry-run review"
      plainEnglishCopy="This page reviews activation dry-run identity, dry-run groups, boundary dry-run checklist, rollout dry-run checklist, operator decision checklist, rollback checklist, denied dry-run actions, unresolved dry-run blockers, activation evidence review route, activation result review route, and next recommended action. It is review-only, approval required, and it does not run activation dry-runs, activate Daily Beta, execute workflows, mutate files, mutate memory, call providers, call local models, call connectors, create automations, trigger recovery, apply hardening, store outputs, persist approval decisions, go live, or store credentials."
      language={model.language}
      markers={[...DAILY_BETA_ACTIVATION_DRY_RUN_REVIEW_MARKERS]}
      links={[
        { href: "/daily-beta-activation-checklist-review", label: "Checklist" },
        { href: "/daily-beta-activation-evidence-review", label: "Evidence" },
        { href: "/daily-beta-activation-result-review", label: "Result" },
        { href: "/live-execution-boundary-final-signoff", label: "Boundary" },
      ]}
      cards={cards}
      advancedSummary="Advanced Daily Beta activation dry-run review details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.dryRuns.map((dryRun) => dryRun.advancedDailyBetaActivationDryRunReviewDetails)}
      advancedCopy="advanced Daily Beta activation dry-run review details collapsed/secondary. This route remains review-only and approval required. It never runs activation dry-runs, activates Daily Beta, executes workflows, mutates files, mutates memory, calls providers, calls local models, calls connectors, creates automations, triggers recovery, applies hardening, stores outputs, persists approval decisions, goes live, stores credentials, or creates an MCP runtime."
      dataScope="daily-beta-activation-dry-run-review buildDailyBetaActivationDryRunReviewStableKey DailyBetaActivationDryRunReviewPanel"
    />
  );
}
