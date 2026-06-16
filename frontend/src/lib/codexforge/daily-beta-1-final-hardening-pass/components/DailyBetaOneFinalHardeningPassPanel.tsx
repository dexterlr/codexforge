"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaOneFinalHardeningPassModel, buildDailyBetaOneFinalHardeningPassStableKey } from "@/lib/codexforge/daily-beta-1-final-hardening-pass";

const DAILY_BETA_ONE_FINAL_HARDENING_PASS_MARKERS = [
  "Daily Beta 1 final hardening pass",
  "Daily Beta 1 final hardening pass does not apply changes",
  "Final hardening changes require explicit operator approval",
  "Unresolved final hardening blockers stay blocked",
  "Hardening groups",
  "Live boundary status",
] as const;

export function DailyBetaOneFinalHardeningPassPanel() {
  const model = buildDailyBetaOneFinalHardeningPassModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.finalHardeningPasses.map((finalHardeningPass) => ({
    id: buildDailyBetaOneFinalHardeningPassStableKey("daily-beta-1-final-hardening-pass-card", finalHardeningPass.id),
    title: finalHardeningPass.finalHardeningPassIdentity,
    status: finalHardeningPass.status,
    sections: [
      { label: "Hardening groups", items: finalHardeningPass.hardeningGroups },
      { label: "Final candidate status", items: finalHardeningPass.finalCandidateStatus },
      { label: "Final operator review status", items: finalHardeningPass.finalOperatorReviewStatus },
      { label: "Final regression/recovery status", items: finalHardeningPass.finalRegressionRecoveryStatus },
      { label: "Live boundary status", items: finalHardeningPass.liveBoundaryStatus },
      { label: "Denied final hardening actions", items: finalHardeningPass.deniedFinalHardeningActions },
      { label: "Unresolved final hardening blockers", items: finalHardeningPass.unresolvedFinalHardeningBlockers },
    ],
    routes: [finalHardeningPass.dailyBetaOneActivationCandidateRoute, finalHardeningPass.releaseReadinessDashboardRoute],
    nextRecommendedAction: finalHardeningPass.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 584"
      title="Daily Beta 1 final hardening pass"
      subtitle="Daily Beta 1 final hardening pass reviews final hardening needs in plain English without applying changes. Daily Beta 1 final hardening pass does not apply changes. Final hardening changes require explicit operator approval, and unresolved final hardening blockers stay blocked."
      primaryLabel="Review hardening"
      anchor="daily-beta-1-final-hardening-pass"
      plainEnglishTitle="Plain-English Daily Beta 1 final hardening pass"
      plainEnglishCopy="This page reviews final hardening pass identity, hardening groups, final candidate status, final operator review status, final regression/recovery status, live boundary status, denied final hardening actions, unresolved final hardening blockers, Daily Beta 1 activation candidate route, release readiness dashboard route, and next recommended action. It is review-only, approval required, and it does not apply changes, mutate files, mutate memory, execute workflows, run tests, trigger recovery, activate Daily Beta 1, go live, call providers, call local models, call connectors, create automations, persist approvals, store outputs, or store credentials."
      language={model.language}
      markers={[...DAILY_BETA_ONE_FINAL_HARDENING_PASS_MARKERS]}
      links={[
        { href: "/codexforge-daily-beta-1-activation-candidate", label: "Activation candidate" },
        { href: "/release-readiness-dashboard", label: "Readiness" },
        { href: "/daily-beta-1-final-recovery-review", label: "Recovery" },
        { href: "/daily-beta-1-final-regression-review", label: "Regression" },
      ]}
      cards={cards}
      advancedSummary="Advanced Daily Beta 1 final hardening pass details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.finalHardeningPasses.map((finalHardeningPass) => finalHardeningPass.advancedDailyBetaOneFinalHardeningPassDetails)}
      advancedCopy="advanced Daily Beta 1 final hardening pass details collapsed/secondary. This route remains review-only and approval required. It never applies final hardening from UI, applies changes, mutates files, mutates memory, executes workflows, runs tests, triggers recovery, activates Daily Beta 1, goes live, calls providers, calls local models, calls connectors, creates automations, persists approvals, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="daily-beta-1-final-hardening-pass buildDailyBetaOneFinalHardeningPassStableKey DailyBetaOneFinalHardeningPassPanel"
    />
  );
}
