"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildCodexForgeDailyBetaOneFinalCandidateModel, buildCodexForgeDailyBetaOneFinalCandidateStableKey } from "@/lib/codexforge/codexforge-daily-beta-1-final-candidate";

const CODEXFORGE_DAILY_BETA_ONE_FINAL_CANDIDATE_MARKERS = [
  "CodexForge Daily Beta 1 final candidate",
  "CodexForge Daily Beta 1 final candidate does not activate Daily Beta 1",
  "Daily Beta 1 activation requires explicit operator approval",
  "Unresolved final candidate blockers stay blocked",
  "Daily Beta 1 final candidate identity",
  "Release candidate summary status",
] as const;

export function CodexForgeDailyBetaOneFinalCandidatePanel() {
  const model = buildCodexForgeDailyBetaOneFinalCandidateModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.finalCandidates.map((finalCandidate) => ({
    id: buildCodexForgeDailyBetaOneFinalCandidateStableKey("codexforge-daily-beta-1-final-candidate-card", finalCandidate.id),
    title: finalCandidate.dailyBetaOneFinalCandidateIdentity,
    status: finalCandidate.status,
    sections: [
      { label: "Readiness lock audit status", items: finalCandidate.readinessLockAuditStatus },
      { label: "Release candidate summary status", items: finalCandidate.releaseCandidateSummaryStatus },
      { label: "Activation/final gate status", items: finalCandidate.activationFinalGateStatus },
      { label: "Operator readiness status", items: finalCandidate.operatorReadinessStatus },
      { label: "Denied final candidate actions", items: finalCandidate.deniedFinalCandidateActions },
      { label: "Unresolved final candidate blockers", items: finalCandidate.unresolvedFinalCandidateBlockers },
    ],
    routes: [finalCandidate.finalOperatorReviewRoute, finalCandidate.finalRegressionReviewRoute],
    nextRecommendedAction: finalCandidate.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 580"
      title="CodexForge Daily Beta 1 final candidate"
      subtitle="CodexForge Daily Beta 1 final candidate summarizes final candidate readiness in plain English without activation. CodexForge Daily Beta 1 final candidate does not activate Daily Beta 1. Daily Beta 1 activation requires explicit operator approval, and unresolved final candidate blockers stay blocked."
      primaryLabel="Review final candidate"
      anchor="codexforge-daily-beta-1-final-candidate"
      plainEnglishTitle="Plain-English CodexForge Daily Beta 1 final candidate"
      plainEnglishCopy="This page reviews Daily Beta 1 final candidate identity, readiness lock audit status, release candidate summary status, activation/final gate status, operator readiness status, denied final candidate actions, unresolved final candidate blockers, final operator review route, final regression review route, and next recommended action. It is review-only, approval required, and it does not activate Daily Beta 1, activate Daily Beta, execute workflows, approve release, go live, run tests, send handoff, persist activation settings, call providers, call local models, call connectors, create automations, mutate files, mutate memory, persist approvals, store outputs, or store credentials."
      language={model.language}
      markers={[...CODEXFORGE_DAILY_BETA_ONE_FINAL_CANDIDATE_MARKERS]}
      links={[
        { href: "/daily-beta-1-final-operator-review", label: "Operator review" },
        { href: "/daily-beta-1-final-regression-review", label: "Regression" },
        { href: "/daily-beta-release-candidate-summary", label: "Summary" },
        { href: "/daily-beta-readiness-lock-audit", label: "Lock audit" },
      ]}
      cards={cards}
      advancedSummary="Advanced CodexForge Daily Beta 1 final candidate details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.finalCandidates.map((finalCandidate) => finalCandidate.advancedCodexForgeDailyBetaOneFinalCandidateDetails)}
      advancedCopy="advanced CodexForge Daily Beta 1 final candidate details collapsed/secondary. This route remains review-only and approval required. It never activates Daily Beta 1, activates Daily Beta, executes workflows, approves release, goes live, runs tests, sends handoff, persists activation settings, calls providers, calls local models, calls connectors, creates automations, mutates files, mutates memory, persists approvals, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="codexforge-daily-beta-1-final-candidate buildCodexForgeDailyBetaOneFinalCandidateStableKey CodexForgeDailyBetaOneFinalCandidatePanel"
    />
  );
}
