"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaOneActivationFeedbackReviewModel, buildDailyBetaOneActivationFeedbackReviewStableKey } from "@/lib/codexforge/daily-beta-1-activation-feedback-review";

const DAILY_BETA_ONE_ACTIVATION_FEEDBACK_REVIEW_MARKERS = [
  "Daily Beta 1 activation feedback review",
  "Daily Beta 1 activation feedback review does not auto-ingest feedback",
  "Daily Beta 1 activation feedback requires operator review before use",
  "Unsafe feedback shortcuts stay blocked",
  "Feedback groups",
  "Safety feedback lane",
] as const;

export function DailyBetaOneActivationFeedbackReviewPanel() {
  const model = buildDailyBetaOneActivationFeedbackReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.feedbackReviews.map((feedbackReview) => ({
    id: buildDailyBetaOneActivationFeedbackReviewStableKey("daily-beta-1-activation-feedback-review-card", feedbackReview.id),
    title: feedbackReview.dailyBetaOneActivationFeedbackIdentity,
    status: feedbackReview.status,
    sections: [
      { label: "Feedback groups", items: feedbackReview.feedbackGroups },
      { label: "Usability feedback lane", items: feedbackReview.usabilityFeedbackLane },
      { label: "Safety feedback lane", items: feedbackReview.safetyFeedbackLane },
      { label: "Activation feedback lane", items: feedbackReview.activationFeedbackLane },
      { label: "Release feedback lane", items: feedbackReview.releaseFeedbackLane },
      { label: "Denied feedback actions", items: feedbackReview.deniedFeedbackActions },
      { label: "Unresolved feedback blockers", items: feedbackReview.unresolvedFeedbackBlockers },
    ],
    routes: [feedbackReview.regressionReviewRoute, feedbackReview.hardeningPassRoute],
    nextRecommendedAction: feedbackReview.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 588"
      title="Daily Beta 1 activation feedback review"
      subtitle="Daily Beta 1 activation feedback review reviews activation feedback in plain English without auto-ingesting it. Daily Beta 1 activation feedback review does not auto-ingest feedback. Daily Beta 1 activation feedback requires operator review before use, and unsafe feedback shortcuts stay blocked."
      primaryLabel="Review feedback"
      anchor="daily-beta-1-activation-feedback-review"
      plainEnglishTitle="Plain-English Daily Beta 1 activation feedback review"
      plainEnglishCopy="This page reviews Daily Beta 1 activation feedback identity, feedback groups, usability feedback lane, safety feedback lane, activation feedback lane, release feedback lane, denied feedback actions, unresolved feedback blockers, regression review route, hardening pass route, and next recommended action. It is review-only and approval required. It does not auto-ingest feedback, mutate memory, promote memory, write files, store outputs, persist approval decisions, activate Daily Beta 1, go live, call providers, call local models, call connectors, create automations, or store credentials."
      language={model.language}
      markers={[...DAILY_BETA_ONE_ACTIVATION_FEEDBACK_REVIEW_MARKERS]}
      links={[
        { href: "/daily-beta-1-activation-controlled-trial", label: "Controlled trial" },
        { href: "/daily-beta-1-activation-regression-review", label: "Regression review" },
        { href: "/daily-beta-1-activation-hardening-pass", label: "Hardening pass" },
        { href: "/daily-beta-1-activation-final-gate", label: "Final gate" },
      ]}
      cards={cards}
      advancedSummary="Advanced Daily Beta 1 activation feedback review details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.feedbackReviews.map((feedbackReview) => feedbackReview.advancedDailyBetaOneActivationFeedbackReviewDetails)}
      advancedCopy="advanced Daily Beta 1 activation feedback review details collapsed/secondary. This route remains review-only and approval required. It never auto-ingests feedback, mutates memory, promotes memory, writes files, stores outputs, persists approval decisions, activates Daily Beta 1, goes live, calls providers, calls local models, calls connectors, creates automations, stores credentials, or creates an MCP runtime."
      dataScope="daily-beta-1-activation-feedback-review buildDailyBetaOneActivationFeedbackReviewStableKey DailyBetaOneActivationFeedbackReviewPanel"
    />
  );
}
