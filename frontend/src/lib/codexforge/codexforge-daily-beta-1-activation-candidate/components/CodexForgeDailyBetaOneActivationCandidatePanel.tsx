"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildCodexForgeDailyBetaOneActivationCandidateModel, buildCodexForgeDailyBetaOneActivationCandidateStableKey } from "@/lib/codexforge/codexforge-daily-beta-1-activation-candidate";

const CODEXFORGE_DAILY_BETA_ONE_ACTIVATION_CANDIDATE_MARKERS = [
  "CodexForge Daily Beta 1 activation candidate",
  "CodexForge Daily Beta 1 activation candidate does not go live",
  "Daily Beta 1 activation requires explicit operator approval",
  "Unresolved activation candidate blockers stay blocked",
  "Daily Beta 1 activation candidate identity",
  "Final operator regression recovery hardening status",
] as const;

export function CodexForgeDailyBetaOneActivationCandidatePanel() {
  const model = buildCodexForgeDailyBetaOneActivationCandidateModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.activationCandidates.map((activationCandidate) => ({
    id: buildCodexForgeDailyBetaOneActivationCandidateStableKey("codexforge-daily-beta-1-activation-candidate-card", activationCandidate.id),
    title: activationCandidate.dailyBetaOneActivationCandidateIdentity,
    status: activationCandidate.status,
    sections: [
      { label: "Readiness lock audit status", items: activationCandidate.readinessLockAuditStatus },
      { label: "Release candidate summary status", items: activationCandidate.releaseCandidateSummaryStatus },
      { label: "Final operator regression recovery hardening status", items: activationCandidate.finalOperatorRegressionRecoveryHardeningStatus },
      { label: "Live boundary status", items: activationCandidate.liveBoundaryStatus },
      { label: "Denied activation candidate actions", items: activationCandidate.deniedActivationCandidateActions },
      { label: "Unresolved activation candidate blockers", items: activationCandidate.unresolvedActivationCandidateBlockers },
    ],
    routes: [activationCandidate.checkpointDocsRoute, activationCandidate.releaseReadinessDashboardRoute],
    nextRecommendedAction: activationCandidate.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 585"
      title="CodexForge Daily Beta 1 activation candidate"
      subtitle="CodexForge Daily Beta 1 activation candidate summarizes final activation readiness in plain English without going live. CodexForge Daily Beta 1 activation candidate does not go live. Daily Beta 1 activation requires explicit operator approval, and unresolved activation candidate blockers stay blocked."
      primaryLabel="Review activation candidate"
      anchor="codexforge-daily-beta-1-activation-candidate"
      plainEnglishTitle="Plain-English CodexForge Daily Beta 1 activation candidate"
      plainEnglishCopy="This page reviews Daily Beta 1 activation candidate identity, readiness lock audit status, release candidate summary status, final operator/regression/recovery/hardening status, live boundary status, denied activation candidate actions, unresolved activation candidate blockers, checkpoint docs route, release readiness dashboard route, and next recommended action. It is review-only, approval required, and it does not go live, activate Daily Beta 1, activate Daily Beta, sign off Daily Beta 1 activation automatically, persist activation settings, execute workflows, run tests, trigger recovery, apply hardening, send handoff, call providers, call local models, call connectors, create automations, mutate files, mutate memory, persist approvals, store outputs, or store credentials."
      language={model.language}
      markers={[...CODEXFORGE_DAILY_BETA_ONE_ACTIVATION_CANDIDATE_MARKERS]}
      links={[
        { href: "/release-readiness-dashboard", label: "Readiness" },
        { href: "/daily-beta-1-final-hardening-pass", label: "Hardening" },
        { href: "/daily-beta-1-final-recovery-review", label: "Recovery" },
        { href: "/codexforge-daily-beta-1-final-candidate", label: "Final candidate" },
      ]}
      cards={cards}
      advancedSummary="Advanced CodexForge Daily Beta 1 activation candidate details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.activationCandidates.map((activationCandidate) => activationCandidate.advancedCodexForgeDailyBetaOneActivationCandidateDetails)}
      advancedCopy="advanced CodexForge Daily Beta 1 activation candidate details collapsed/secondary. This route remains review-only and approval required. It never goes live, activates Daily Beta 1, activates Daily Beta, signs off Daily Beta 1 activation automatically, persists activation settings, executes workflows, runs tests, triggers recovery, applies hardening, sends handoff, calls providers, calls local models, calls connectors, creates automations, mutates files, mutates memory, persists approvals, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="codexforge-daily-beta-1-activation-candidate buildCodexForgeDailyBetaOneActivationCandidateStableKey CodexForgeDailyBetaOneActivationCandidatePanel"
    />
  );
}
