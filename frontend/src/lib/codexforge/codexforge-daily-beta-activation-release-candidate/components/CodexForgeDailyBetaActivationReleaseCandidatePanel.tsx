"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildCodexForgeDailyBetaActivationReleaseCandidateModel, buildCodexForgeDailyBetaActivationReleaseCandidateStableKey } from "@/lib/codexforge/codexforge-daily-beta-activation-release-candidate";

const CODEXFORGE_DAILY_BETA_ACTIVATION_RELEASE_CANDIDATE_MARKERS = [
  "CodexForge Daily Beta activation release candidate",
  "CodexForge Daily Beta activation release candidate does not go live",
  "Daily Beta activation requires explicit operator approval",
  "Unresolved activation release blockers stay blocked",
  "Activation release candidate identity",
  "Evidence result recovery hardening status",
] as const;

export function CodexForgeDailyBetaActivationReleaseCandidatePanel() {
  const model = buildCodexForgeDailyBetaActivationReleaseCandidateModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.releaseCandidates.map((releaseCandidate) => ({
    id: buildCodexForgeDailyBetaActivationReleaseCandidateStableKey("codexforge-daily-beta-activation-release-candidate-card", releaseCandidate.id),
    title: releaseCandidate.activationReleaseCandidateIdentity,
    status: releaseCandidate.status,
    sections: [
      { label: "Checklist status", items: releaseCandidate.checklistStatus },
      { label: "Dry-run status", items: releaseCandidate.dryRunStatus },
      { label: "Evidence result recovery hardening status", items: releaseCandidate.evidenceResultRecoveryHardeningStatus },
      { label: "Live boundary status", items: releaseCandidate.liveBoundaryStatus },
      { label: "Denied activation release actions", items: releaseCandidate.deniedActivationReleaseActions },
      { label: "Unresolved activation release blockers", items: releaseCandidate.unresolvedActivationReleaseBlockers },
    ],
    routes: [releaseCandidate.operatorReadinessReviewRoute, releaseCandidate.releaseReadinessDashboardRoute],
    nextRecommendedAction: releaseCandidate.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 568"
      title="Daily Beta activation release candidate"
      subtitle="CodexForge Daily Beta activation release candidate summarizes activation readiness in plain English without going live. CodexForge Daily Beta activation release candidate does not go live. Daily Beta activation requires explicit operator approval, and unresolved activation release blockers stay blocked."
      primaryLabel="Review release candidate"
      anchor="codexforge-daily-beta-activation-release-candidate"
      plainEnglishTitle="Plain-English CodexForge Daily Beta activation release candidate"
      plainEnglishCopy="This page reviews activation release candidate identity, checklist status, dry-run status, evidence result recovery hardening status, live boundary status, denied activation release actions, unresolved activation release blockers, operator readiness review route, release readiness dashboard route, and next recommended action. It is review-only, approval required, and it does not go live, activate Daily Beta, execute workflows, persist activation settings, persist approval decisions, call providers, call local models, call connectors, create automations, mutate files, mutate memory, store outputs, sign off release automatically, or store credentials."
      language={model.language}
      markers={[...CODEXFORGE_DAILY_BETA_ACTIVATION_RELEASE_CANDIDATE_MARKERS]}
      links={[
        { href: "/daily-beta-activation-hardening-pass", label: "Hardening" },
        { href: "/daily-beta-activation-operator-readiness-review", label: "Operator" },
        { href: "/release-readiness-dashboard", label: "Readiness" },
        { href: "/live-execution-boundary-final-signoff", label: "Boundary" },
      ]}
      cards={cards}
      advancedSummary="Advanced CodexForge Daily Beta activation release candidate details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.releaseCandidates.map((releaseCandidate) => releaseCandidate.advancedCodexForgeDailyBetaActivationReleaseCandidateDetails)}
      advancedCopy="advanced CodexForge Daily Beta activation release candidate details collapsed/secondary. This route remains review-only and approval required. It never goes live, activates Daily Beta, executes workflows, persists activation settings, persists approval decisions, calls providers, calls local models, calls connectors, creates automations, mutates files, mutates memory, stores outputs, signs off release automatically, stores credentials, or creates an MCP runtime."
      dataScope="codexforge-daily-beta-activation-release-candidate buildCodexForgeDailyBetaActivationReleaseCandidateStableKey CodexForgeDailyBetaActivationReleaseCandidatePanel"
    />
  );
}
