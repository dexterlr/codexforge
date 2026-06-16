"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaOneActivationHardeningPassModel, buildDailyBetaOneActivationHardeningPassStableKey } from "@/lib/codexforge/daily-beta-1-activation-hardening-pass";

const DAILY_BETA_ONE_ACTIVATION_HARDENING_PASS_MARKERS = [
  "Daily Beta 1 activation hardening pass",
  "Daily Beta 1 activation hardening pass does not apply changes",
  "Daily Beta 1 activation hardening changes require explicit operator approval",
  "Unresolved Daily Beta 1 activation hardening blockers stay blocked",
  "Hardening groups",
  "Live boundary status",
] as const;

export function DailyBetaOneActivationHardeningPassPanel() {
  const model = buildDailyBetaOneActivationHardeningPassModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.hardeningPasses.map((hardeningPass) => ({
    id: buildDailyBetaOneActivationHardeningPassStableKey("daily-beta-1-activation-hardening-pass-card", hardeningPass.id),
    title: hardeningPass.dailyBetaOneActivationHardeningIdentity,
    status: hardeningPass.status,
    sections: [
      { label: "Hardening groups", items: hardeningPass.hardeningGroups },
      { label: "Final gate status", items: hardeningPass.finalGateStatus },
      { label: "Controlled trial status", items: hardeningPass.controlledTrialStatus },
      { label: "Feedback/regression/recovery status", items: hardeningPass.feedbackRegressionRecoveryStatus },
      { label: "Live boundary status", items: hardeningPass.liveBoundaryStatus },
      { label: "Denied hardening actions", items: hardeningPass.deniedHardeningActions },
      { label: "Unresolved hardening blockers", items: hardeningPass.unresolvedHardeningBlockers },
    ],
    routes: [hardeningPass.activationReleaseCandidateRoute, hardeningPass.readinessLockRoute],
    nextRecommendedAction: hardeningPass.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 591"
      title="Daily Beta 1 activation hardening pass"
      subtitle="Daily Beta 1 activation hardening pass reviews activation hardening needs in plain English without applying changes. Daily Beta 1 activation hardening pass does not apply changes. Daily Beta 1 activation hardening changes require explicit operator approval, and unresolved Daily Beta 1 activation hardening blockers stay blocked."
      primaryLabel="Review hardening"
      anchor="daily-beta-1-activation-hardening-pass"
      plainEnglishTitle="Plain-English Daily Beta 1 activation hardening pass"
      plainEnglishCopy="This page reviews Daily Beta 1 activation hardening identity, hardening groups, final gate status, controlled trial status, feedback/regression/recovery status, live boundary status, denied hardening actions, unresolved hardening blockers, activation release candidate route, readiness lock route, and next recommended action. It is review-only and approval required. It does not apply changes, execute workflows, trigger recovery, run tests, activate Daily Beta 1, mutate files, mutate memory, persist settings, persist approval decisions, call providers, call local models, call connectors, create automations, store outputs, go live, lock readiness, or store credentials."
      language={model.language}
      markers={[...DAILY_BETA_ONE_ACTIVATION_HARDENING_PASS_MARKERS]}
      links={[
        { href: "/daily-beta-1-activation-recovery-review", label: "Recovery review" },
        { href: "/codexforge-daily-beta-1-activation-release-candidate", label: "Release candidate" },
        { href: "/daily-beta-1-activation-readiness-lock", label: "Readiness lock" },
        { href: "/daily-beta-1-activation-final-gate", label: "Final gate" },
      ]}
      cards={cards}
      advancedSummary="Advanced Daily Beta 1 activation hardening pass details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.hardeningPasses.map((hardeningPass) => hardeningPass.advancedDailyBetaOneActivationHardeningPassDetails)}
      advancedCopy="advanced Daily Beta 1 activation hardening pass details collapsed/secondary. This route remains review-only and approval required. It never applies changes, executes workflows, triggers recovery, runs tests, activates Daily Beta 1, mutates files, mutates memory, persists settings, persists approval decisions, calls providers, calls local models, calls connectors, creates automations, stores outputs, goes live, locks readiness, stores credentials, or creates an MCP runtime."
      dataScope="daily-beta-1-activation-hardening-pass buildDailyBetaOneActivationHardeningPassStableKey DailyBetaOneActivationHardeningPassPanel"
    />
  );
}
