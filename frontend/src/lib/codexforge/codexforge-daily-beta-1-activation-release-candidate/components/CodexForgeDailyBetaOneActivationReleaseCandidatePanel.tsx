"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildCodexForgeDailyBetaOneActivationReleaseCandidateModel, buildCodexForgeDailyBetaOneActivationReleaseCandidateStableKey } from "@/lib/codexforge/codexforge-daily-beta-1-activation-release-candidate";

const CODEXFORGE_DAILY_BETA_ONE_ACTIVATION_RELEASE_CANDIDATE_MARKERS = [
  "CodexForge Daily Beta 1 activation release candidate",
  "CodexForge Daily Beta 1 activation release candidate does not go live",
  "Daily Beta 1 activation requires explicit operator approval",
  "Unresolved Daily Beta 1 activation release blockers stay blocked",
  "Daily Beta 1 activation release candidate identity",
  "Feedback regression recovery hardening status",
] as const;

export function CodexForgeDailyBetaOneActivationReleaseCandidatePanel() {
  const model = buildCodexForgeDailyBetaOneActivationReleaseCandidateModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.releaseCandidates.map((releaseCandidate) => ({
    id: buildCodexForgeDailyBetaOneActivationReleaseCandidateStableKey("codexforge-daily-beta-1-activation-release-candidate-card", releaseCandidate.id),
    title: releaseCandidate.dailyBetaOneActivationReleaseCandidateIdentity,
    status: releaseCandidate.status,
    sections: [
      { label: "Final gate status", items: releaseCandidate.finalGateStatus },
      { label: "Controlled trial status", items: releaseCandidate.controlledTrialStatus },
      { label: "Feedback regression recovery hardening status", items: releaseCandidate.feedbackRegressionRecoveryHardeningStatus },
      { label: "Live boundary status", items: releaseCandidate.liveBoundaryStatus },
      { label: "Denied release candidate actions", items: releaseCandidate.deniedReleaseCandidateActions },
      { label: "Unresolved release candidate blockers", items: releaseCandidate.unresolvedReleaseCandidateBlockers },
    ],
    routes: [releaseCandidate.readinessLockRoute, releaseCandidate.checkpointDocsRoute],
    nextRecommendedAction: releaseCandidate.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 592"
      title="CodexForge Daily Beta 1 activation release candidate"
      subtitle="CodexForge Daily Beta 1 activation release candidate summarizes activation readiness in plain English without going live. CodexForge Daily Beta 1 activation release candidate does not go live. Daily Beta 1 activation requires explicit operator approval, and unresolved Daily Beta 1 activation release blockers stay blocked."
      primaryLabel="Review release candidate"
      anchor="codexforge-daily-beta-1-activation-release-candidate"
      plainEnglishTitle="Plain-English CodexForge Daily Beta 1 activation release candidate"
      plainEnglishCopy="This page reviews Daily Beta 1 activation release candidate identity, final gate status, controlled trial status, feedback/regression/recovery/hardening status, live boundary status, denied release candidate actions, unresolved release candidate blockers, readiness lock route, checkpoint docs route, and next recommended action. It is review-only and approval required. It does not go live, activate Daily Beta 1, sign off activation release candidate automatically, persist activation settings, persist approval decisions, execute workflows, run tests, trigger recovery, apply hardening, call providers, call local models, call connectors, create automations, mutate files, mutate memory, store outputs, or store credentials."
      language={model.language}
      markers={[...CODEXFORGE_DAILY_BETA_ONE_ACTIVATION_RELEASE_CANDIDATE_MARKERS]}
      links={[
        { href: "/daily-beta-1-activation-hardening-pass", label: "Hardening pass" },
        { href: "/daily-beta-1-activation-readiness-lock", label: "Readiness lock" },
        { href: "/daily-beta-1-activation-final-gate", label: "Final gate" },
        { href: "/release-readiness-dashboard", label: "Readiness dashboard" },
      ]}
      cards={cards}
      advancedSummary="Advanced CodexForge Daily Beta 1 activation release candidate details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.releaseCandidates.map((releaseCandidate) => releaseCandidate.advancedCodexForgeDailyBetaOneActivationReleaseCandidateDetails)}
      advancedCopy="advanced CodexForge Daily Beta 1 activation release candidate details collapsed/secondary. This route remains review-only and approval required. It never goes live, activates Daily Beta 1, signs off activation release candidate automatically, persists activation settings, persists approval decisions, executes workflows, runs tests, triggers recovery, applies hardening, calls providers, calls local models, calls connectors, creates automations, mutates files, mutates memory, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="codexforge-daily-beta-1-activation-release-candidate buildCodexForgeDailyBetaOneActivationReleaseCandidateStableKey CodexForgeDailyBetaOneActivationReleaseCandidatePanel"
    />
  );
}
