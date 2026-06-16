"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaActivationFinalHardeningModel, buildDailyBetaActivationFinalHardeningStableKey } from "@/lib/codexforge/daily-beta-activation-final-hardening";

const DAILY_BETA_ACTIVATION_FINAL_HARDENING_MARKERS = [
  "Daily Beta activation final hardening",
  "Daily Beta activation final hardening does not apply changes",
  "Final hardening changes require explicit operator approval",
  "Unresolved final hardening blockers stay blocked",
  "Final hardening groups",
  "Feedback regression status",
] as const;

export function DailyBetaActivationFinalHardeningPanel() {
  const model = buildDailyBetaActivationFinalHardeningModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.finalHardenings.map((finalHardening) => ({
    id: buildDailyBetaActivationFinalHardeningStableKey("daily-beta-activation-final-hardening-card", finalHardening.id),
    title: finalHardening.activationFinalHardeningIdentity,
    status: finalHardening.status,
    sections: [
      { label: "Final hardening groups", items: finalHardening.finalHardeningGroups },
      { label: "Final gate status", items: finalHardening.finalGateStatus },
      { label: "Controlled trial status", items: finalHardening.controlledTrialStatus },
      { label: "Feedback regression status", items: finalHardening.feedbackRegressionStatus },
      { label: "Live boundary status", items: finalHardening.liveBoundaryStatus },
      { label: "Denied final hardening actions", items: finalHardening.deniedFinalHardeningActions },
      { label: "Unresolved final hardening blockers", items: finalHardening.unresolvedFinalHardeningBlockers },
    ],
    routes: [finalHardening.activationCandidateRoute, finalHardening.releaseHandoffRoute],
    nextRecommendedAction: finalHardening.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 574"
      title="Daily Beta activation final hardening"
      subtitle="Daily Beta activation final hardening reviews final hardening needs in plain English without applying changes. Daily Beta activation final hardening does not apply changes. Final hardening changes require explicit operator approval, and unresolved final hardening blockers stay blocked."
      primaryLabel="Review final hardening"
      anchor="daily-beta-activation-final-hardening"
      plainEnglishTitle="Plain-English Daily Beta activation final hardening"
      plainEnglishCopy="This page reviews activation final hardening identity, final hardening groups, final gate status, controlled trial status, feedback regression status, live boundary status, denied final hardening actions, unresolved final hardening blockers, activation candidate route, release handoff route, and next recommended action. It is review-only, approval required, and it does not apply changes, mutate files, mutate memory, execute workflows, run tests, trigger recovery, pass the final gate, go live, persist settings, persist approvals, store outputs, call providers, call local models, call connectors, create automations, or store credentials."
      language={model.language}
      markers={[...DAILY_BETA_ACTIVATION_FINAL_HARDENING_MARKERS]}
      links={[
        { href: "/daily-beta-activation-regression-review", label: "Regression" },
        { href: "/codexforge-daily-beta-activation-candidate", label: "Candidate" },
        { href: "/daily-beta-activation-release-handoff", label: "Handoff" },
        { href: "/daily-beta-activation-final-gate", label: "Final gate" },
      ]}
      cards={cards}
      advancedSummary="Advanced Daily Beta activation final hardening details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.finalHardenings.map((finalHardening) => finalHardening.advancedDailyBetaActivationFinalHardeningDetails)}
      advancedCopy="advanced Daily Beta activation final hardening details collapsed/secondary. This route remains review-only and approval required. It never applies changes, mutates files, mutates memory, executes workflows, runs tests, triggers recovery, passes the final gate, goes live, persists settings, persists approvals, stores outputs, calls providers, calls local models, calls connectors, creates automations, stores credentials, or creates an MCP runtime."
      dataScope="daily-beta-activation-final-hardening buildDailyBetaActivationFinalHardeningStableKey DailyBetaActivationFinalHardeningPanel"
    />
  );
}
