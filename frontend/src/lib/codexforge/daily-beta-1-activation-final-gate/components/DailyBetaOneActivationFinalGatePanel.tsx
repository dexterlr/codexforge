"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaOneActivationFinalGateModel, buildDailyBetaOneActivationFinalGateStableKey } from "@/lib/codexforge/daily-beta-1-activation-final-gate";

const DAILY_BETA_ONE_ACTIVATION_FINAL_GATE_MARKERS = [
  "Daily Beta 1 activation final gate",
  "Daily Beta 1 activation final gate does not activate Daily Beta 1",
  "Daily Beta 1 final gate decisions require explicit operator approval",
  "Unresolved Daily Beta 1 final gate blockers stay blocked",
  "Final gate groups",
  "Activation candidate status",
] as const;

export function DailyBetaOneActivationFinalGatePanel() {
  const model = buildDailyBetaOneActivationFinalGateModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.finalGates.map((finalGate) => ({
    id: buildDailyBetaOneActivationFinalGateStableKey("daily-beta-1-activation-final-gate-card", finalGate.id),
    title: finalGate.dailyBetaOneActivationFinalGateIdentity,
    status: finalGate.status,
    sections: [
      { label: "Final gate groups", items: finalGate.finalGateGroups },
      { label: "Activation candidate status", items: finalGate.activationCandidateStatus },
      { label: "Final operator/regression/recovery/hardening status", items: finalGate.finalOperatorRegressionRecoveryHardeningStatus },
      { label: "Live boundary status", items: finalGate.liveBoundaryStatus },
      { label: "Release handoff status", items: finalGate.releaseHandoffStatus },
      { label: "Denied final gate actions", items: finalGate.deniedFinalGateActions },
      { label: "Unresolved final gate blockers", items: finalGate.unresolvedFinalGateBlockers },
    ],
    routes: [finalGate.controlledTrialRoute, finalGate.feedbackReviewRoute],
    nextRecommendedAction: finalGate.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 586"
      title="Daily Beta 1 activation final gate"
      subtitle="Daily Beta 1 activation final gate reviews final activation readiness in plain English without activating Daily Beta 1. Daily Beta 1 activation final gate does not activate Daily Beta 1. Daily Beta 1 final gate decisions require explicit operator approval, and unresolved Daily Beta 1 final gate blockers stay blocked."
      primaryLabel="Review final gate"
      anchor="daily-beta-1-activation-final-gate"
      plainEnglishTitle="Plain-English Daily Beta 1 activation final gate"
      plainEnglishCopy="This page reviews Daily Beta 1 activation final gate identity, final gate groups, activation candidate status, final operator/regression/recovery/hardening status, live boundary status, release handoff status, denied final gate actions, unresolved final gate blockers, controlled trial route, feedback review route, and next recommended action. It is review-only and approval required. It does not activate Daily Beta 1, pass the final gate automatically, execute workflows, run controlled trials, run tests, trigger recovery, apply hardening, approve release candidate, lock readiness, go live, call providers, call local models, call connectors, create automations, mutate files, mutate memory, store outputs, or store credentials."
      language={model.language}
      markers={[...DAILY_BETA_ONE_ACTIVATION_FINAL_GATE_MARKERS]}
      links={[
        { href: "/codexforge-daily-beta-1-activation-candidate", label: "Activation candidate" },
        { href: "/daily-beta-1-activation-controlled-trial", label: "Controlled trial" },
        { href: "/daily-beta-1-activation-feedback-review", label: "Feedback review" },
        { href: "/daily-beta-1-final-hardening-pass", label: "Final hardening" },
      ]}
      cards={cards}
      advancedSummary="Advanced Daily Beta 1 activation final gate details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.finalGates.map((finalGate) => finalGate.advancedDailyBetaOneActivationFinalGateDetails)}
      advancedCopy="advanced Daily Beta 1 activation final gate details collapsed/secondary. This route remains review-only and approval required. It never activates Daily Beta 1, passes the final gate automatically, executes workflows, runs controlled trials, runs tests, triggers recovery, applies hardening, approves release candidate, locks readiness, goes live, calls providers, calls local models, calls connectors, creates automations, mutates files, mutates memory, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="daily-beta-1-activation-final-gate buildDailyBetaOneActivationFinalGateStableKey DailyBetaOneActivationFinalGatePanel"
    />
  );
}
