"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildCodexForgeDailyBetaOneLaunchCandidateModel, buildCodexForgeDailyBetaOneLaunchCandidateStableKey } from "@/lib/codexforge/codexforge-daily-beta-1-launch-candidate";

const CODEXFORGE_DAILY_BETA_ONE_LAUNCH_CANDIDATE_MARKERS = [
  "CodexForge Daily Beta 1 launch candidate",
  "CodexForge Daily Beta 1 launch candidate does not launch Daily Beta 1",
  "Daily Beta 1 launch requires explicit operator approval",
  "Unresolved launch candidate blockers stay blocked",
  "Daily Beta 1 launch candidate identity",
  "Launch readiness dry-run evidence result status",
] as const;

export function CodexForgeDailyBetaOneLaunchCandidatePanel() {
  const model = buildCodexForgeDailyBetaOneLaunchCandidateModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.launchCandidates.map((launchCandidate) => ({
    id: buildCodexForgeDailyBetaOneLaunchCandidateStableKey("codexforge-daily-beta-1-launch-candidate-card", launchCandidate.id),
    title: launchCandidate.dailyBetaOneLaunchCandidateIdentity,
    status: launchCandidate.status,
    sections: [
      { label: "Activation lock audit status", items: launchCandidate.activationLockAuditStatus },
      { label: "Final handoff status", items: launchCandidate.finalHandoffStatus },
      { label: "Launch readiness dry-run evidence result status", items: launchCandidate.launchReadinessDryRunEvidenceResultStatus },
      { label: "Live boundary status", items: launchCandidate.liveBoundaryStatus },
      { label: "Denied launch candidate actions", items: launchCandidate.deniedLaunchCandidateActions },
      { label: "Unresolved launch candidate blockers", items: launchCandidate.unresolvedLaunchCandidateBlockers },
    ],
    routes: [launchCandidate.launchReadinessLockRoute, launchCandidate.releaseReadinessDashboardRoute],
    nextRecommendedAction: launchCandidate.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 600"
      title="CodexForge Daily Beta 1 launch candidate"
      subtitle="CodexForge Daily Beta 1 launch candidate summarizes launch readiness in plain English without launching. CodexForge Daily Beta 1 launch candidate does not launch Daily Beta 1. Daily Beta 1 launch requires explicit operator approval, and unresolved launch candidate blockers stay blocked."
      primaryLabel="Review launch candidate"
      anchor="codexforge-daily-beta-1-launch-candidate"
      plainEnglishTitle="Plain-English CodexForge Daily Beta 1 launch candidate"
      plainEnglishCopy="This page reviews Daily Beta 1 launch candidate identity, activation lock audit status, final handoff status, launch readiness/dry-run/evidence/result status, live boundary status, denied launch candidate actions, unresolved launch candidate blockers, launch readiness lock route, release readiness dashboard route, and next recommended action. It is review-only and approval required. It does not launch Daily Beta 1, go live, persist launch settings, approve launch automatically, lock launch readiness, run launch dry-runs, ingest evidence, store results, execute workflows, call providers, call local models, call connectors, create automations, mutate files, mutate memory, store outputs, or store credentials."
      language={model.language}
      markers={[...CODEXFORGE_DAILY_BETA_ONE_LAUNCH_CANDIDATE_MARKERS]}
      links={[
        { href: "/daily-beta-1-launch-readiness-lock", label: "Launch lock" },
        { href: "/release-readiness-dashboard", label: "Readiness dashboard" },
        { href: "/daily-beta-1-launch-result-review", label: "Result review" },
        { href: "/daily-beta-1-launch-evidence-review", label: "Evidence review" },
      ]}
      cards={cards}
      advancedSummary="Advanced CodexForge Daily Beta 1 launch candidate details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.launchCandidates.map((launchCandidate) => launchCandidate.advancedCodexForgeDailyBetaOneLaunchCandidateDetails)}
      advancedCopy="advanced CodexForge Daily Beta 1 launch candidate details collapsed/secondary. This route remains review-only and approval required. It never launches Daily Beta 1, goes live, persists launch settings, approves launch automatically, locks launch readiness, runs launch dry-runs, ingests evidence, stores results, executes workflows, calls providers, calls local models, calls connectors, creates automations, mutates files, mutates memory, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="codexforge-daily-beta-1-launch-candidate buildCodexForgeDailyBetaOneLaunchCandidateStableKey CodexForgeDailyBetaOneLaunchCandidatePanel"
    />
  );
}
