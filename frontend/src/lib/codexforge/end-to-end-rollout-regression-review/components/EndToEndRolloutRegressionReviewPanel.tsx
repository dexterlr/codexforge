"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildEndToEndRolloutRegressionReviewModel, buildEndToEndRolloutRegressionReviewStableKey } from "@/lib/codexforge/end-to-end-rollout-regression-review";

const END_TO_END_ROLLOUT_REGRESSION_REVIEW_MARKERS = [
  "End-to-end rollout regression review",
  "End-to-end rollout regression review does not run tests",
  "Rollout regression fixes require explicit operator approval",
  "Unresolved rollout regressions stay blocked",
  "Regression groups",
  "File test regression checklist",
] as const;

export function EndToEndRolloutRegressionReviewPanel() {
  const model = buildEndToEndRolloutRegressionReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.reviews.map((review) => ({
    id: buildEndToEndRolloutRegressionReviewStableKey("end-to-end-rollout-regression-review-card", review.id),
    title: review.rolloutRegressionReviewIdentity,
    status: review.status,
    sections: [
      { label: "Regression groups", items: review.regressionGroups },
      { label: "Workflow regression checklist", items: review.workflowRegressionChecklist },
      { label: "Provider/local/connector/automation regression checklist", items: review.providerLocalConnectorAutomationRegressionChecklist },
      { label: "File test regression checklist", items: review.fileTestRegressionChecklist },
      { label: "Feedback regression checklist", items: review.feedbackRegressionChecklist },
      { label: "Denied regression actions", items: review.deniedRegressionActions },
      { label: "Unresolved regression blockers", items: review.unresolvedRegressionBlockers },
    ],
    routes: [review.rolloutHardeningRoute, review.finalLiveBoundarySignoffRoute],
    nextRecommendedAction: review.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 557"
      title="Rollout regression review"
      subtitle="End-to-end rollout regression review reviews rollout regressions in plain English without running tests. End-to-end rollout regression review does not run tests. Rollout regression fixes require explicit operator approval, and unresolved rollout regressions stay blocked."
      primaryLabel="Review regressions"
      anchor="end-to-end-rollout-regression-review"
      plainEnglishTitle="Plain-English end-to-end rollout regression review"
      plainEnglishCopy="This page reviews rollout regression review identity, regression groups, workflow regression checklist, provider/local/connector/automation regression checklist, file test regression checklist, feedback regression checklist, denied regression actions, unresolved regression blockers, rollout hardening route, final live boundary signoff route, and next recommended action. It is review-only, approval required, and it does not run tests, run smoke, execute workflows, apply fixes, apply hardening, mutate files, mutate memory, call providers, call local models, call connectors, create automations, store outputs, or store credentials."
      language={model.language}
      markers={[...END_TO_END_ROLLOUT_REGRESSION_REVIEW_MARKERS]}
      links={[
        { href: "/end-to-end-rollout-feedback-inbox", label: "Feedback" },
        { href: "/end-to-end-rollout-hardening-pass", label: "Hardening" },
        { href: "/live-execution-boundary-final-signoff", label: "Final boundary" },
        { href: "/test-execution-boundary-readiness-review", label: "Test boundary" },
      ]}
      cards={cards}
      advancedSummary="Advanced rollout regression review details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.reviews.map((review) => review.advancedRolloutRegressionReviewDetails)}
      advancedCopy="advanced rollout regression review details collapsed/secondary. This route remains review-only and approval required. It never runs tests, runs smoke, executes workflows, applies fixes, applies hardening, mutates files, mutates memory, calls providers, calls local models, calls connectors, creates automations, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="end-to-end-rollout-regression-review buildEndToEndRolloutRegressionReviewStableKey EndToEndRolloutRegressionReviewPanel"
    />
  );
}
