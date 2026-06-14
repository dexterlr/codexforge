"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildCodexForgeDailyBetaOneReleaseCandidateModel, buildCodexForgeDailyBetaOneReleaseCandidateStableKey } from "@/lib/codexforge/codexforge-daily-beta-1-release-candidate";

const CODEXFORGE_DAILY_BETA_1_RELEASE_CANDIDATE_MARKERS = [
  "CodexForge Daily Beta 1 release candidate",
  "CodexForge Daily Beta 1 release candidate does not go live",
  "Daily Beta 1 release requires explicit operator approval",
  "Unresolved release candidate blockers stay blocked",
  "Daily Beta 1 release candidate identity",
  "Final safety status",
] as const;

export function CodexForgeDailyBetaOneReleaseCandidatePanel() {
  const model = buildCodexForgeDailyBetaOneReleaseCandidateModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.releaseCandidates.map((candidate) => ({
    id: buildCodexForgeDailyBetaOneReleaseCandidateStableKey("codexforge-daily-beta-1-release-candidate-card", candidate.id),
    title: candidate.dailyBetaOneReleaseCandidateIdentity,
    status: candidate.status,
    sections: [
          { label: "Feedback triage status", items: candidate.feedbackTriageStatus },
          { label: "Regression status", items: candidate.regressionStatus },
          { label: "Hardening status", items: candidate.hardeningStatus },
          { label: "Documentation/release notes/handoff status", items: candidate.documentationReleaseNotesHandoffStatus },
          { label: "Final safety status", items: candidate.finalSafetyStatus },
          { label: "Denied release candidate actions", items: candidate.deniedReleaseCandidateActions },
          { label: "Unresolved release candidate blockers", items: candidate.unresolvedReleaseCandidateBlockers },
    ],
    routes: [candidate.nextRolloutMilestoneRoute, candidate.checkpointDocsRoute],
    nextRecommendedAction: candidate.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 529"
      title="Daily Beta 1 release candidate"
      subtitle="CodexForge Daily Beta 1 release candidate summarizes release candidate posture in plain English. CodexForge Daily Beta 1 release candidate does not go live. Daily Beta 1 release requires explicit operator approval, and unresolved release candidate blockers stay blocked."
      primaryLabel="Review RC"
      anchor="codexforge-daily-beta-1-release-candidate"
      plainEnglishTitle="Plain-English CodexForge Daily Beta 1 release candidate"
      plainEnglishCopy="This page reviews Daily Beta 1 release candidate identity, Feedback triage status, Regression status, Hardening status, Documentation/release notes/handoff status, Final safety status, Denied release candidate actions, Unresolved release candidate blockers, Next rollout milestone route, Checkpoint docs route, next recommended action. It is review-only, approval required, and it does not execute workflows, go live, launch Daily Beta 1, mutate files, mutate memory, call providers, call local models, call connectors, create automations, or store outputs."
      language={model.language}
      markers={[...CODEXFORGE_DAILY_BETA_1_RELEASE_CANDIDATE_MARKERS]}
      links={[
        { href: "/daily-beta-1-feedback-triage-review", label: "Feedback triage" },
        { href: "/daily-beta-1-regression-review", label: "Regression" },
        { href: "/daily-beta-1-final-safety-review", label: "Safety" },
        { href: "/release-readiness-dashboard", label: "Readiness" },
      ]}
      cards={cards}
      advancedSummary="Advanced release candidate details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.releaseCandidates.map((candidate) => candidate.advancedDailyBetaOneReleaseCandidateDetails)}
      advancedCopy="advanced release candidate details collapsed/secondary. This route remains review-only and approval required. It never executes workflows, runs tests, applies changes, publishes documentation, publishes release notes, sends handoff, signs off release, goes live, launches Daily Beta 1, executes rollout, calls providers, calls local models, calls connectors, creates automations, mutates files, mutates memory, stores credentials, stores outputs, or creates an MCP runtime."
      dataScope="codexforge-daily-beta-1-release-candidate buildCodexForgeDailyBetaOneReleaseCandidateStableKey CodexForgeDailyBetaOneReleaseCandidatePanel"
    />
  );
}
