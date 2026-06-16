"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaOneFinalRegressionReviewModel, buildDailyBetaOneFinalRegressionReviewStableKey } from "@/lib/codexforge/daily-beta-1-final-regression-review";

const DAILY_BETA_ONE_FINAL_REGRESSION_REVIEW_MARKERS = [
  "Daily Beta 1 final regression review",
  "Daily Beta 1 final regression review does not run tests",
  "Final regression fixes require explicit operator approval",
  "Unresolved final regressions stay blocked",
  "Regression groups",
  "File test regression checklist",
] as const;

export function DailyBetaOneFinalRegressionReviewPanel() {
  const model = buildDailyBetaOneFinalRegressionReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.finalRegressionReviews.map((finalRegressionReview) => ({
    id: buildDailyBetaOneFinalRegressionReviewStableKey("daily-beta-1-final-regression-review-card", finalRegressionReview.id),
    title: finalRegressionReview.finalRegressionReviewIdentity,
    status: finalRegressionReview.status,
    sections: [
      { label: "Regression groups", items: finalRegressionReview.regressionGroups },
      { label: "Activation regression checklist", items: finalRegressionReview.activationRegressionChecklist },
      { label: "Operator readiness regression checklist", items: finalRegressionReview.operatorReadinessRegressionChecklist },
      { label: "Provider/local/connector/automation regression checklist", items: finalRegressionReview.providerLocalConnectorAutomationRegressionChecklist },
      { label: "File test regression checklist", items: finalRegressionReview.fileTestRegressionChecklist },
      { label: "Denied regression actions", items: finalRegressionReview.deniedRegressionActions },
      { label: "Unresolved final regressions", items: finalRegressionReview.unresolvedFinalRegressionBlockers },
    ],
    routes: [finalRegressionReview.finalRecoveryReviewRoute, finalRegressionReview.finalHardeningRoute],
    nextRecommendedAction: finalRegressionReview.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 582"
      title="Daily Beta 1 final regression review"
      subtitle="Daily Beta 1 final regression review reviews final regressions in plain English without running tests. Daily Beta 1 final regression review does not run tests. Final regression fixes require explicit operator approval, and unresolved final regressions stay blocked."
      primaryLabel="Review regressions"
      anchor="daily-beta-1-final-regression-review"
      plainEnglishTitle="Plain-English Daily Beta 1 final regression review"
      plainEnglishCopy="This page reviews final regression review identity, regression groups, activation regression checklist, operator readiness regression checklist, provider/local/connector/automation regression checklist, file test regression checklist, denied regression actions, unresolved final regression blockers, final recovery review route, final hardening route, and next recommended action. It is review-only, approval required, and it does not run tests, execute workflows, apply fixes, activate Daily Beta 1, go live, call providers, call local models, call connectors, create automations, mutate files, mutate memory, persist approvals, store outputs, or store credentials."
      language={model.language}
      markers={[...DAILY_BETA_ONE_FINAL_REGRESSION_REVIEW_MARKERS]}
      links={[
        { href: "/daily-beta-1-final-recovery-review", label: "Recovery" },
        { href: "/daily-beta-1-final-hardening-pass", label: "Hardening" },
        { href: "/daily-beta-1-final-operator-review", label: "Operator review" },
        { href: "/codexforge-daily-beta-1-final-candidate", label: "Final candidate" },
      ]}
      cards={cards}
      advancedSummary="Advanced Daily Beta 1 final regression review details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.finalRegressionReviews.map((finalRegressionReview) => finalRegressionReview.advancedDailyBetaOneFinalRegressionReviewDetails)}
      advancedCopy="advanced Daily Beta 1 final regression review details collapsed/secondary. This route remains review-only and approval required. It never runs final regression tests from UI, runs tests, executes workflows, applies fixes, activates Daily Beta 1, goes live, calls providers, calls local models, calls connectors, creates automations, mutates files, mutates memory, persists approvals, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="daily-beta-1-final-regression-review buildDailyBetaOneFinalRegressionReviewStableKey DailyBetaOneFinalRegressionReviewPanel"
    />
  );
}
