"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaOneControlledTrialHardeningModel, buildDailyBetaOneControlledTrialHardeningStableKey } from "@/lib/codexforge/daily-beta-1-controlled-trial-hardening";

const DAILY_BETA_ONE_CONTROLLED_TRIAL_HARDENING_MARKERS = [
  "Daily Beta 1 controlled trial hardening",
  "Daily Beta 1 controlled trial hardening does not apply changes",
  "Controlled trial hardening changes require explicit operator approval",
  "Unresolved controlled trial hardening blockers stay blocked",
  "Hardening groups",
  "Boundary readiness checklist",
] as const;

export function DailyBetaOneControlledTrialHardeningPanel() {
  const model = buildDailyBetaOneControlledTrialHardeningModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.hardeningReviews.map((review) => ({
    id: buildDailyBetaOneControlledTrialHardeningStableKey("daily-beta-1-controlled-trial-hardening-card", review.id),
    title: review.controlledTrialHardeningIdentity,
    status: review.status,
    sections: [
      { label: "Hardening groups", items: review.hardeningGroups },
      { label: "Result review status", items: review.resultReviewStatus },
      { label: "Recovery review status", items: review.recoveryReviewStatus },
      { label: "Release candidate readiness checklist", items: review.releaseCandidateReadinessChecklist },
      { label: "Boundary readiness checklist", items: review.boundaryReadinessChecklist },
      { label: "Denied hardening actions", items: review.deniedHardeningActions },
      { label: "Unresolved hardening blockers", items: review.unresolvedHardeningBlockers },
    ],
    routes: [review.backendBoundaryInventoryRoute, review.providerExecutionBoundaryRoute],
    nextRecommendedAction: review.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 532"
      title="Trial hardening"
      subtitle="Daily Beta 1 controlled trial hardening reviews hardening needs in plain English. Daily Beta 1 controlled trial hardening does not apply changes. Controlled trial hardening changes require explicit operator approval, and unresolved controlled trial hardening blockers stay blocked."
      primaryLabel="Review hardening"
      anchor="daily-beta-1-controlled-trial-hardening"
      plainEnglishTitle="Plain-English Daily Beta 1 controlled trial hardening"
      plainEnglishCopy="This page reviews controlled trial hardening identity, Hardening groups, Result review status, Recovery review status, Release candidate readiness checklist, Boundary readiness checklist, Denied hardening actions, Unresolved hardening blockers, Backend boundary inventory route, Provider execution boundary route, and next recommended action. It is review-only, approval required, and it does not apply changes, execute workflows, mutate files, mutate memory, launch Daily Beta 1, run boundary probes, call providers, call local models, call connectors, create automations, or store credentials."
      language={model.language}
      markers={[...DAILY_BETA_ONE_CONTROLLED_TRIAL_HARDENING_MARKERS]}
      links={[
        { href: "/daily-beta-1-controlled-trial-result-review", label: "Result review" },
        { href: "/daily-beta-1-controlled-trial-recovery-review", label: "Recovery review" },
        { href: "/live-backend-boundary-inventory", label: "Backend boundaries" },
        { href: "/provider-execution-boundary-readiness-review", label: "Provider boundary" },
      ]}
      cards={cards}
      advancedSummary="Advanced controlled trial hardening details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.hardeningReviews.map((review) => review.advancedControlledTrialHardeningDetails)}
      advancedCopy="advanced controlled trial hardening details collapsed/secondary. This route remains review-only and approval required. It never applies changes, executes workflows, mutates files, mutates memory, launches Daily Beta 1, executes controlled trial, triggers recovery, runs boundary probes, calls providers, calls local models, calls local bridge endpoints, calls connectors, creates automations, stores credentials, stores outputs, or creates an MCP runtime."
      dataScope="daily-beta-1-controlled-trial-hardening buildDailyBetaOneControlledTrialHardeningStableKey DailyBetaOneControlledTrialHardeningPanel"
    />
  );
}
