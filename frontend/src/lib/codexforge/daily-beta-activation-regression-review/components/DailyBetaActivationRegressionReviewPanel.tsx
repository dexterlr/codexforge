"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaActivationRegressionReviewModel, buildDailyBetaActivationRegressionReviewStableKey } from "@/lib/codexforge/daily-beta-activation-regression-review";

const DAILY_BETA_ACTIVATION_REGRESSION_REVIEW_MARKERS = [
  "Daily Beta activation regression review",
  "Daily Beta activation regression review does not run tests",
  "Activation regression fixes require explicit operator approval",
  "Unresolved activation regressions stay blocked",
  "Regression groups",
  "Controlled trial regression checklist",
] as const;

export function DailyBetaActivationRegressionReviewPanel() {
  const model = buildDailyBetaActivationRegressionReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.regressionReviews.map((regressionReview) => ({
    id: buildDailyBetaActivationRegressionReviewStableKey("daily-beta-activation-regression-review-card", regressionReview.id),
    title: regressionReview.activationRegressionReviewIdentity,
    status: regressionReview.status,
    sections: [
      { label: "Regression groups", items: regressionReview.regressionGroups },
      { label: "Activation regression checklist", items: regressionReview.activationRegressionChecklist },
      { label: "Controlled trial regression checklist", items: regressionReview.controlledTrialRegressionChecklist },
      { label: "Provider/local/connector/automation regression checklist", items: regressionReview.providerLocalConnectorAutomationRegressionChecklist },
      { label: "Feedback regression checklist", items: regressionReview.feedbackRegressionChecklist },
      { label: "Denied regression actions", items: regressionReview.deniedRegressionActions },
      { label: "Unresolved regression blockers", items: regressionReview.unresolvedRegressionBlockers },
    ],
    routes: [regressionReview.finalHardeningRoute, regressionReview.activationCandidateRoute],
    nextRecommendedAction: regressionReview.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 573"
      title="Daily Beta activation regression review"
      subtitle="Daily Beta activation regression review reviews activation regressions in plain English without running tests. Daily Beta activation regression review does not run tests. Activation regression fixes require explicit operator approval, and unresolved activation regressions stay blocked."
      primaryLabel="Review regressions"
      anchor="daily-beta-activation-regression-review"
      plainEnglishTitle="Plain-English Daily Beta activation regression review"
      plainEnglishCopy="This page reviews activation regression review identity, regression groups, activation regression checklist, controlled trial regression checklist, provider/local/connector/automation regression checklist, feedback regression checklist, denied regression actions, unresolved regression blockers, final hardening route, activation candidate route, and next recommended action. It is review-only, approval required, and it does not run tests, execute workflows, apply fixes, mutate files, mutate memory, call providers, call local models, call connectors, create or execute automations, persist approvals, store outputs, or store credentials."
      language={model.language}
      markers={[...DAILY_BETA_ACTIVATION_REGRESSION_REVIEW_MARKERS]}
      links={[
        { href: "/daily-beta-activation-feedback-inbox", label: "Feedback" },
        { href: "/daily-beta-activation-final-hardening", label: "Hardening" },
        { href: "/codexforge-daily-beta-activation-candidate", label: "Candidate" },
        { href: "/daily-beta-activation-controlled-operator-trial", label: "Trial review" },
      ]}
      cards={cards}
      advancedSummary="Advanced Daily Beta activation regression review details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.regressionReviews.map((regressionReview) => regressionReview.advancedDailyBetaActivationRegressionReviewDetails)}
      advancedCopy="advanced Daily Beta activation regression review details collapsed/secondary. This route remains review-only and approval required. It never runs tests, executes workflows, applies fixes, mutates files, mutates memory, calls providers, calls local models, calls connectors, creates or executes automations, persists approvals, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="daily-beta-activation-regression-review buildDailyBetaActivationRegressionReviewStableKey DailyBetaActivationRegressionReviewPanel"
    />
  );
}
