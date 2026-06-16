"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaActivationFinalGateModel, buildDailyBetaActivationFinalGateStableKey } from "@/lib/codexforge/daily-beta-activation-final-gate";

const DAILY_BETA_ACTIVATION_FINAL_GATE_MARKERS = [
  "Daily Beta activation final gate",
  "Daily Beta activation final gate does not activate Daily Beta",
  "Final gate decisions require explicit operator approval",
  "Unresolved final gate blockers stay blocked",
  "Final gate groups",
  "Live boundary status",
] as const;

export function DailyBetaActivationFinalGatePanel() {
  const model = buildDailyBetaActivationFinalGateModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.finalGates.map((finalGate) => ({
    id: buildDailyBetaActivationFinalGateStableKey("daily-beta-activation-final-gate-card", finalGate.id),
    title: finalGate.activationFinalGateIdentity,
    status: finalGate.status,
    sections: [
      { label: "Final gate groups", items: finalGate.finalGateGroups },
      { label: "Activation checklist status", items: finalGate.activationChecklistStatus },
      { label: "Dry-run/evidence/result/recovery/hardening status", items: finalGate.dryRunEvidenceResultRecoveryHardeningStatus },
      { label: "Live boundary status", items: finalGate.liveBoundaryStatus },
      { label: "Operator readiness status", items: finalGate.operatorReadinessStatus },
      { label: "Denied final gate actions", items: finalGate.deniedFinalGateActions },
      { label: "Unresolved final gate blockers", items: finalGate.unresolvedFinalGateBlockers },
    ],
    routes: [finalGate.controlledOperatorTrialRoute, finalGate.feedbackInboxRoute],
    nextRecommendedAction: finalGate.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 570"
      title="Daily Beta activation final gate"
      subtitle="Daily Beta activation final gate reviews final activation readiness in plain English without passing the gate. Daily Beta activation final gate does not activate Daily Beta. Final gate decisions require explicit operator approval, and unresolved final gate blockers stay blocked."
      primaryLabel="Review final gate"
      anchor="daily-beta-activation-final-gate"
      plainEnglishTitle="Plain-English Daily Beta activation final gate"
      plainEnglishCopy="This page reviews activation final gate identity, final gate groups, activation checklist status, dry-run/evidence/result/recovery/hardening status, live boundary status, operator readiness status, denied final gate actions, unresolved final gate blockers, controlled operator trial route, feedback inbox route, and next recommended action. It is review-only, approval required, and it does not pass the final gate automatically, activate Daily Beta, execute workflows, run controlled operator trials, trigger recovery, apply hardening, go live, call providers, call local models, call connectors, create automations, mutate files, mutate memory, persist approval decisions, store outputs, or store credentials."
      language={model.language}
      markers={[...DAILY_BETA_ACTIVATION_FINAL_GATE_MARKERS]}
      links={[
        { href: "/daily-beta-activation-controlled-operator-trial", label: "Trial review" },
        { href: "/daily-beta-activation-feedback-inbox", label: "Feedback" },
        { href: "/daily-beta-activation-operator-readiness-review", label: "Operator" },
        { href: "/live-execution-boundary-final-signoff", label: "Boundary" },
      ]}
      cards={cards}
      advancedSummary="Advanced Daily Beta activation final gate details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.finalGates.map((finalGate) => finalGate.advancedDailyBetaActivationFinalGateDetails)}
      advancedCopy="advanced Daily Beta activation final gate details collapsed/secondary. This route remains review-only and approval required. It never passes the final gate automatically, activates Daily Beta, executes workflows, runs controlled operator trials, triggers recovery, applies hardening, goes live, calls providers, calls local models, calls connectors, creates automations, mutates files, mutates memory, persists approval decisions, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="daily-beta-activation-final-gate buildDailyBetaActivationFinalGateStableKey DailyBetaActivationFinalGatePanel"
    />
  );
}
