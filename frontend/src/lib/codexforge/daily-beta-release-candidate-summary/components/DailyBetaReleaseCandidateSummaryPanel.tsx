"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaReleaseCandidateSummaryModel, buildDailyBetaReleaseCandidateSummaryStableKey } from "@/lib/codexforge/daily-beta-release-candidate-summary";

const DAILY_BETA_RELEASE_CANDIDATE_SUMMARY_MARKERS = [
  "Daily Beta release candidate summary",
  "Daily Beta release candidate summary does not approve release",
  "Release candidate decisions require explicit operator approval",
  "Unresolved release summary blockers stay blocked",
  "Summary groups",
  "Activation readiness summary",
] as const;

export function DailyBetaReleaseCandidateSummaryPanel() {
  const model = buildDailyBetaReleaseCandidateSummaryModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.releaseCandidateSummaries.map((releaseCandidateSummary) => ({
    id: buildDailyBetaReleaseCandidateSummaryStableKey("daily-beta-release-candidate-summary-card", releaseCandidateSummary.id),
    title: releaseCandidateSummary.releaseCandidateSummaryIdentity,
    status: releaseCandidateSummary.status,
    sections: [
      { label: "Summary groups", items: releaseCandidateSummary.summaryGroups },
      { label: "Activation readiness summary", items: releaseCandidateSummary.activationReadinessSummary },
      { label: "Final gate summary", items: releaseCandidateSummary.finalGateSummary },
      { label: "Feedback/regression/hardening summary", items: releaseCandidateSummary.feedbackRegressionHardeningSummary },
      { label: "Operator readiness summary", items: releaseCandidateSummary.operatorReadinessSummary },
      { label: "Denied summary actions", items: releaseCandidateSummary.deniedSummaryActions },
      { label: "Unresolved release summary blockers", items: releaseCandidateSummary.unresolvedSummaryBlockers },
    ],
    routes: [releaseCandidateSummary.dailyBetaOneFinalCandidateRoute, releaseCandidateSummary.finalOperatorReviewRoute],
    nextRecommendedAction: releaseCandidateSummary.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 579"
      title="Daily Beta release candidate summary"
      subtitle="Daily Beta release candidate summary summarizes readiness in plain English without approving release. Daily Beta release candidate summary does not approve release. Release candidate decisions require explicit operator approval, and unresolved release summary blockers stay blocked."
      primaryLabel="Review summary"
      anchor="daily-beta-release-candidate-summary"
      plainEnglishTitle="Plain-English Daily Beta release candidate summary"
      plainEnglishCopy="This page reviews release candidate summary identity, summary groups, activation readiness summary, final gate summary, feedback/regression/hardening summary, operator readiness summary, denied summary actions, unresolved summary blockers, Daily Beta 1 final candidate route, final operator review route, and next recommended action. It is review-only, approval required, and it does not approve release, go live, persist release settings, activate Daily Beta, activate Daily Beta 1, execute workflows, run tests, send handoff, call providers, call local models, call connectors, create automations, mutate files, mutate memory, persist approvals, store outputs, or store credentials."
      language={model.language}
      markers={[...DAILY_BETA_RELEASE_CANDIDATE_SUMMARY_MARKERS]}
      links={[
        { href: "/codexforge-daily-beta-1-final-candidate", label: "Final candidate" },
        { href: "/daily-beta-1-final-operator-review", label: "Operator review" },
        { href: "/daily-beta-readiness-lock-audit", label: "Lock audit" },
        { href: "/release-readiness-dashboard", label: "Readiness" },
      ]}
      cards={cards}
      advancedSummary="Advanced Daily Beta release candidate summary details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.releaseCandidateSummaries.map((releaseCandidateSummary) => releaseCandidateSummary.advancedDailyBetaReleaseCandidateSummaryDetails)}
      advancedCopy="advanced Daily Beta release candidate summary details collapsed/secondary. This route remains review-only and approval required. It never approves release, marks the release candidate approved automatically, goes live, persists release settings, activates Daily Beta, activates Daily Beta 1, executes workflows, runs tests, sends handoff, calls providers, calls local models, calls connectors, creates automations, mutates files, mutates memory, persists approvals, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="daily-beta-release-candidate-summary buildDailyBetaReleaseCandidateSummaryStableKey DailyBetaReleaseCandidateSummaryPanel"
    />
  );
}
