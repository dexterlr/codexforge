"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildCodexForgeDailyBetaActivationCandidateModel, buildCodexForgeDailyBetaActivationCandidateStableKey } from "@/lib/codexforge/codexforge-daily-beta-activation-candidate";

const CODEXFORGE_DAILY_BETA_ACTIVATION_CANDIDATE_MARKERS = [
  "CodexForge Daily Beta activation candidate",
  "CodexForge Daily Beta activation candidate does not go live",
  "Daily Beta activation requires explicit operator approval",
  "Unresolved activation candidate blockers stay blocked",
  "Daily Beta activation candidate identity",
  "Live boundary status",
] as const;

export function CodexForgeDailyBetaActivationCandidatePanel() {
  const model = buildCodexForgeDailyBetaActivationCandidateModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.activationCandidates.map((activationCandidate) => ({
    id: buildCodexForgeDailyBetaActivationCandidateStableKey("codexforge-daily-beta-activation-candidate-card", activationCandidate.id),
    title: activationCandidate.dailyBetaActivationCandidateIdentity,
    status: activationCandidate.status,
    sections: [
      { label: "Final gate status", items: activationCandidate.finalGateStatus },
      { label: "Controlled trial status", items: activationCandidate.controlledTrialStatus },
      { label: "Feedback/regression/final hardening status", items: activationCandidate.feedbackRegressionFinalHardeningStatus },
      { label: "Live boundary status", items: activationCandidate.liveBoundaryStatus },
      { label: "Denied activation candidate actions", items: activationCandidate.deniedActivationCandidateActions },
      { label: "Unresolved activation candidate blockers", items: activationCandidate.unresolvedActivationCandidateBlockers },
    ],
    routes: [activationCandidate.releaseHandoffRoute, activationCandidate.readinessLockRoute],
    nextRecommendedAction: activationCandidate.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 575"
      title="CodexForge Daily Beta activation candidate"
      subtitle="CodexForge Daily Beta activation candidate summarizes activation readiness in plain English without going live. CodexForge Daily Beta activation candidate does not go live. Daily Beta activation requires explicit operator approval, and unresolved activation candidate blockers stay blocked."
      primaryLabel="Review candidate"
      anchor="codexforge-daily-beta-activation-candidate"
      plainEnglishTitle="Plain-English CodexForge Daily Beta activation candidate"
      plainEnglishCopy="This page reviews Daily Beta activation candidate identity, final gate status, controlled trial status, feedback/regression/final hardening status, live boundary status, denied activation candidate actions, unresolved activation candidate blockers, release handoff route, readiness lock route, and next recommended action. It is review-only, approval required, and it does not go live, activate Daily Beta, execute workflows, persist activation settings, persist approval decisions, pass the final gate, run controlled trials, send handoff, lock readiness, call providers, call local models, call connectors, create automations, mutate files, mutate memory, store outputs, or store credentials."
      language={model.language}
      markers={[...CODEXFORGE_DAILY_BETA_ACTIVATION_CANDIDATE_MARKERS]}
      links={[
        { href: "/daily-beta-activation-final-hardening", label: "Hardening" },
        { href: "/daily-beta-activation-release-handoff", label: "Handoff" },
        { href: "/daily-beta-activation-readiness-lock", label: "Readiness lock" },
        { href: "/daily-beta-activation-final-gate", label: "Final gate" },
      ]}
      cards={cards}
      advancedSummary="Advanced CodexForge Daily Beta activation candidate details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.activationCandidates.map((activationCandidate) => activationCandidate.advancedCodexForgeDailyBetaActivationCandidateDetails)}
      advancedCopy="advanced CodexForge Daily Beta activation candidate details collapsed/secondary. This route remains review-only and approval required. It never goes live, activates Daily Beta, executes workflows, persists activation settings, persists approval decisions, passes the final gate, runs controlled trials, sends handoff, locks readiness, calls providers, calls local models, calls connectors, creates automations, mutates files, mutates memory, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="codexforge-daily-beta-activation-candidate buildCodexForgeDailyBetaActivationCandidateStableKey CodexForgeDailyBetaActivationCandidatePanel"
    />
  );
}
