"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaOneRegressionReviewModel, buildDailyBetaOneRegressionReviewStableKey } from "@/lib/codexforge/daily-beta-1-regression-review";

const DAILY_BETA_1_REGRESSION_REVIEW_MARKERS = [
  "Daily Beta 1 regression review",
  "Daily Beta 1 regression review does not run tests",
  "Regression fixes require explicit operator approval",
  "Unresolved regressions stay blocked",
  "Regression groups",
  "Rollout regression checklist",
] as const;

export function DailyBetaOneRegressionReviewPanel() {
  const model = buildDailyBetaOneRegressionReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.regressionReviews.map((review) => ({
    id: buildDailyBetaOneRegressionReviewStableKey("daily-beta-1-regression-review-card", review.id),
    title: review.dailyBetaOneRegressionIdentity,
    status: review.status,
    sections: [
          { label: "Regression groups", items: review.regressionGroups },
          { label: "Rollout regression checklist", items: review.rolloutRegressionChecklist },
          { label: "Feedback regression checklist", items: review.feedbackRegressionChecklist },
          { label: "Provider/local/connector/automation regression checklist", items: review.providerLocalConnectorAutomationRegressionChecklist },
          { label: "Approval/evidence/result/recovery regression checklist", items: review.approvalEvidenceResultRecoveryRegressionChecklist },
          { label: "Denied regression actions", items: review.deniedRegressionActions },
          { label: "Unresolved regression blockers", items: review.unresolvedRegressionBlockers },
    ],
    routes: [review.hardeningPassRoute, review.documentationRefreshRoute],
    nextRecommendedAction: review.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 523"
      title="Daily Beta 1 regression"
      subtitle="Daily Beta 1 regression review reviews regression posture in plain English. Daily Beta 1 regression review does not run tests. Regression fixes require explicit operator approval, and unresolved regressions stay blocked."
      primaryLabel="Review regressions"
      anchor="daily-beta-1-regression-review"
      plainEnglishTitle="Plain-English Daily Beta 1 regression review"
      plainEnglishCopy="This page reviews Daily Beta 1 regression identity, Regression groups, Rollout regression checklist, Feedback regression checklist, Provider/local/connector/automation regression checklist, Approval/evidence/result/recovery regression checklist, Denied regression actions, Unresolved regression blockers, Hardening pass route, Documentation refresh route, next recommended action. It is review-only, approval required, and it does not execute workflows, go live, launch Daily Beta 1, mutate files, mutate memory, call providers, call local models, call connectors, create automations, or store outputs."
      language={model.language}
      markers={[...DAILY_BETA_1_REGRESSION_REVIEW_MARKERS]}
      links={[
        { href: "/daily-beta-1-feedback-triage-review", label: "Feedback triage" },
        { href: "/daily-beta-1-hardening-pass", label: "Hardening" },
        { href: "/daily-beta-1-documentation-refresh", label: "Docs refresh" },
        { href: "/daily-beta-1-rollout-review", label: "Rollout review" },
      ]}
      cards={cards}
      advancedSummary="Advanced regression details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.regressionReviews.map((review) => review.advancedDailyBetaOneRegressionReviewDetails)}
      advancedCopy="advanced regression details collapsed/secondary. This route remains review-only and approval required. It never executes workflows, runs tests, applies changes, publishes documentation, publishes release notes, sends handoff, signs off release, goes live, launches Daily Beta 1, executes rollout, calls providers, calls local models, calls connectors, creates automations, mutates files, mutates memory, stores credentials, stores outputs, or creates an MCP runtime."
      dataScope="daily-beta-1-regression-review buildDailyBetaOneRegressionReviewStableKey DailyBetaOneRegressionReviewPanel"
    />
  );
}
