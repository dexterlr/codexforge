"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildCodexForgeEndToEndDailyBetaCandidateModel, buildCodexForgeEndToEndDailyBetaCandidateStableKey } from "@/lib/codexforge/codexforge-end-to-end-daily-beta-candidate";

const CODEXFORGE_END_TO_END_DAILY_BETA_CANDIDATE_MARKERS = [
  "CodexForge end-to-end Daily Beta candidate",
  "CodexForge end-to-end Daily Beta candidate does not go live",
  "Daily Beta activation requires explicit operator approval",
  "Unresolved Daily Beta candidate blockers stay blocked",
  "End-to-end Daily Beta candidate identity",
  "Live boundary signoff status",
] as const;

export function CodexForgeEndToEndDailyBetaCandidatePanel() {
  const model = buildCodexForgeEndToEndDailyBetaCandidateModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.candidates.map((candidate) => ({
    id: buildCodexForgeEndToEndDailyBetaCandidateStableKey("codexforge-end-to-end-daily-beta-candidate-card", candidate.id),
    title: candidate.endToEndDailyBetaCandidateIdentity,
    status: candidate.status,
    sections: [
      { label: "Release candidate status", items: candidate.releaseCandidateStatus },
      { label: "Rollout status", items: candidate.rolloutStatus },
      { label: "Feedback/regression/hardening status", items: candidate.feedbackRegressionHardeningStatus },
      { label: "Live boundary signoff status", items: candidate.liveBoundarySignoffStatus },
      { label: "Denied Daily Beta candidate actions", items: candidate.deniedDailyBetaCandidateActions },
      { label: "Unresolved Daily Beta candidate blockers", items: candidate.unresolvedDailyBetaCandidateBlockers },
    ],
    routes: [candidate.operatorHandoffRoute, candidate.checkpointDocsRoute],
    nextRecommendedAction: candidate.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 560"
      title="End-to-end Daily Beta candidate"
      subtitle="CodexForge end-to-end Daily Beta candidate summarizes Daily Beta readiness in plain English without going live. CodexForge end-to-end Daily Beta candidate does not go live. Daily Beta activation requires explicit operator approval, and unresolved Daily Beta candidate blockers stay blocked."
      primaryLabel="Review candidate"
      anchor="codexforge-end-to-end-daily-beta-candidate"
      plainEnglishTitle="Plain-English CodexForge end-to-end Daily Beta candidate"
      plainEnglishCopy="This page reviews end-to-end Daily Beta candidate identity, release candidate status, rollout status, feedback/regression/hardening status, live boundary signoff status, denied Daily Beta candidate actions, unresolved Daily Beta candidate blockers, operator handoff route, checkpoint docs route, and next recommended action. It is review-only, approval required, and it does not go live, activate Daily Beta, execute workflows, run rollout, persist activation settings, persist approval decisions, call providers, call local models, call connectors, create automations, mutate files, mutate memory, store outputs, or store credentials."
      language={model.language}
      markers={[...CODEXFORGE_END_TO_END_DAILY_BETA_CANDIDATE_MARKERS]}
      links={[
        { href: "/live-execution-boundary-final-signoff", label: "Final boundary" },
        { href: "/end-to-end-daily-beta-operator-handoff", label: "Handoff" },
        { href: "/release-readiness-dashboard", label: "Readiness" },
        { href: "/codexforge-end-to-end-workflow-release-candidate", label: "E2E RC" },
      ]}
      cards={cards}
      advancedSummary="Advanced end-to-end Daily Beta candidate details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.candidates.map((candidate) => candidate.advancedEndToEndDailyBetaCandidateDetails)}
      advancedCopy="advanced end-to-end Daily Beta candidate details collapsed/secondary. This route remains review-only and approval required. It never goes live, activates Daily Beta, executes workflows, runs rollout, persists activation settings, persists approval decisions, calls providers, calls local models, calls connectors, creates automations, mutates files, mutates memory, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="codexforge-end-to-end-daily-beta-candidate buildCodexForgeEndToEndDailyBetaCandidateStableKey CodexForgeEndToEndDailyBetaCandidatePanel"
    />
  );
}
