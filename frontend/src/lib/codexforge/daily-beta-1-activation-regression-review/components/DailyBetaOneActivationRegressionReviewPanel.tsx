"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaOneActivationRegressionReviewModel, buildDailyBetaOneActivationRegressionReviewStableKey } from "@/lib/codexforge/daily-beta-1-activation-regression-review";

const DAILY_BETA_ONE_ACTIVATION_REGRESSION_REVIEW_MARKERS = [
  "Daily Beta 1 activation regression review",
  "Daily Beta 1 activation regression review does not run tests",
  "Daily Beta 1 activation regression fixes require explicit operator approval",
  "Unresolved Daily Beta 1 activation regressions stay blocked",
  "Regression groups",
  "Controlled trial regression checklist",
] as const;

export function DailyBetaOneActivationRegressionReviewPanel() {
  const model = buildDailyBetaOneActivationRegressionReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.regressionReviews.map((regressionReview) => ({
    id: buildDailyBetaOneActivationRegressionReviewStableKey("daily-beta-1-activation-regression-review-card", regressionReview.id),
    title: regressionReview.dailyBetaOneActivationRegressionIdentity,
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
    routes: [regressionReview.recoveryReviewRoute, regressionReview.hardeningPassRoute],
    nextRecommendedAction: regressionReview.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 589"
      title="Daily Beta 1 activation regression review"
      subtitle="Daily Beta 1 activation regression review reviews activation regressions in plain English without running tests. Daily Beta 1 activation regression review does not run tests. Daily Beta 1 activation regression fixes require explicit operator approval, and unresolved Daily Beta 1 activation regressions stay blocked."
      primaryLabel="Review regressions"
      anchor="daily-beta-1-activation-regression-review"
      plainEnglishTitle="Plain-English Daily Beta 1 activation regression review"
      plainEnglishCopy="This page reviews Daily Beta 1 activation regression identity, regression groups, activation regression checklist, controlled trial regression checklist, provider/local/connector/automation regression checklist, feedback regression checklist, denied regression actions, unresolved regression blockers, recovery review route, hardening pass route, and next recommended action. It is review-only and approval required. It does not run tests, execute workflows, apply fixes, activate Daily Beta 1, mutate files, mutate memory, call providers, call local models, call connectors, create automations, persist approvals, store outputs, or store credentials."
      language={model.language}
      markers={[...DAILY_BETA_ONE_ACTIVATION_REGRESSION_REVIEW_MARKERS]}
      links={[
        { href: "/daily-beta-1-activation-feedback-review", label: "Feedback review" },
        { href: "/daily-beta-1-activation-recovery-review", label: "Recovery review" },
        { href: "/daily-beta-1-activation-hardening-pass", label: "Hardening pass" },
        { href: "/daily-beta-1-activation-controlled-trial", label: "Controlled trial" },
      ]}
      cards={cards}
      advancedSummary="Advanced Daily Beta 1 activation regression review details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.regressionReviews.map((regressionReview) => regressionReview.advancedDailyBetaOneActivationRegressionReviewDetails)}
      advancedCopy="advanced Daily Beta 1 activation regression review details collapsed/secondary. This route remains review-only and approval required. It never runs tests, executes workflows, applies fixes, activates Daily Beta 1, mutates files, mutates memory, calls providers, calls local models, calls connectors, creates automations, persists approvals, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="daily-beta-1-activation-regression-review buildDailyBetaOneActivationRegressionReviewStableKey DailyBetaOneActivationRegressionReviewPanel"
    />
  );
}
