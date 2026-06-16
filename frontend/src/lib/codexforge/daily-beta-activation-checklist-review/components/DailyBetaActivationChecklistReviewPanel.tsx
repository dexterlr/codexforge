"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaActivationChecklistReviewModel, buildDailyBetaActivationChecklistReviewStableKey } from "@/lib/codexforge/daily-beta-activation-checklist-review";

const DAILY_BETA_ACTIVATION_CHECKLIST_REVIEW_MARKERS = [
  "Daily Beta activation checklist review",
  "Daily Beta activation checklist review does not activate Daily Beta",
  "Activation requires explicit operator approval",
  "Unresolved activation blockers stay blocked",
  "Activation checklist groups",
  "Live boundary readiness checklist",
] as const;

export function DailyBetaActivationChecklistReviewPanel() {
  const model = buildDailyBetaActivationChecklistReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.checklists.map((checklist) => ({
    id: buildDailyBetaActivationChecklistReviewStableKey("daily-beta-activation-checklist-review-card", checklist.id),
    title: checklist.activationChecklistIdentity,
    status: checklist.status,
    sections: [
      { label: "Activation checklist groups", items: checklist.activationChecklistGroups },
      { label: "Live boundary readiness checklist", items: checklist.liveBoundaryReadinessChecklist },
      { label: "Rollout readiness checklist", items: checklist.rolloutReadinessChecklist },
      { label: "Operator readiness checklist", items: checklist.operatorReadinessChecklist },
      { label: "Evidence/result/recovery readiness checklist", items: checklist.evidenceResultRecoveryReadinessChecklist },
      { label: "Denied activation actions", items: checklist.deniedActivationActions },
      { label: "Unresolved activation blockers", items: checklist.unresolvedActivationBlockers },
    ],
    routes: [checklist.activationDryRunRoute, checklist.activationEvidenceReviewRoute],
    nextRecommendedAction: checklist.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 562"
      title="Daily Beta activation checklist review"
      subtitle="Daily Beta activation checklist review checks readiness in plain English without activating Daily Beta. Daily Beta activation checklist review does not activate Daily Beta. Activation requires explicit operator approval, and unresolved activation blockers stay blocked."
      primaryLabel="Review checklist"
      anchor="daily-beta-activation-checklist-review"
      plainEnglishTitle="Plain-English Daily Beta activation checklist review"
      plainEnglishCopy="This page reviews activation checklist identity, activation checklist groups, live boundary readiness checklist, rollout readiness checklist, operator readiness checklist, evidence/result/recovery readiness checklist, denied activation actions, unresolved activation blockers, activation dry-run route, activation evidence review route, and next recommended action. It is review-only, approval required, and it does not activate Daily Beta, execute workflows, run dry-runs, trigger recovery, apply hardening, go live, persist activation settings, persist approval decisions, call providers, call local models, call connectors, create automations, mutate files, mutate memory, store outputs, or store credentials."
      language={model.language}
      markers={[...DAILY_BETA_ACTIVATION_CHECKLIST_REVIEW_MARKERS]}
      links={[
        { href: "/daily-beta-activation-dry-run-review", label: "Dry-run" },
        { href: "/daily-beta-activation-evidence-review", label: "Evidence" },
        { href: "/live-execution-boundary-final-signoff", label: "Boundary" },
        { href: "/end-to-end-daily-beta-operator-handoff", label: "Handoff" },
      ]}
      cards={cards}
      advancedSummary="Advanced Daily Beta activation checklist review details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.checklists.map((checklist) => checklist.advancedDailyBetaActivationChecklistReviewDetails)}
      advancedCopy="advanced Daily Beta activation checklist review details collapsed/secondary. This route remains review-only and approval required. It never activates Daily Beta, executes workflows, runs dry-runs, triggers recovery, applies hardening, goes live, persists activation settings, persists approval decisions, calls providers, calls local models, calls connectors, creates automations, mutates files, mutates memory, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="daily-beta-activation-checklist-review buildDailyBetaActivationChecklistReviewStableKey DailyBetaActivationChecklistReviewPanel"
    />
  );
}
