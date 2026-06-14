"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaOneFeedbackTriageReviewModel, buildDailyBetaOneFeedbackTriageReviewStableKey } from "@/lib/codexforge/daily-beta-1-feedback-triage-review";

const DAILY_BETA_1_FEEDBACK_TRIAGE_REVIEW_MARKERS = [
  "Daily Beta 1 feedback triage review",
  "Daily Beta 1 feedback triage review does not auto-ingest feedback",
  "Triage decisions require explicit operator approval",
  "Unsafe triage shortcuts stay blocked",
  "Triage groups",
  "Severity priority checklist",
] as const;

export function DailyBetaOneFeedbackTriageReviewPanel() {
  const model = buildDailyBetaOneFeedbackTriageReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.triageReviews.map((review) => ({
    id: buildDailyBetaOneFeedbackTriageReviewStableKey("daily-beta-1-feedback-triage-review-card", review.id),
    title: review.dailyBetaOneFeedbackTriageIdentity,
    status: review.status,
    sections: [
          { label: "Triage groups", items: review.triageGroups },
          { label: "Usability feedback queue", items: review.usabilityFeedbackQueue },
          { label: "Safety feedback queue", items: review.safetyFeedbackQueue },
          { label: "Rollout feedback queue", items: review.rolloutFeedbackQueue },
          { label: "Release feedback queue", items: review.releaseFeedbackQueue },
          { label: "Severity priority checklist", items: review.severityPriorityChecklist },
          { label: "Denied triage actions", items: review.deniedTriageActions },
          { label: "Unresolved triage blockers", items: review.unresolvedTriageBlockers },
    ],
    routes: [review.regressionReviewRoute, review.hardeningPassRoute],
    nextRecommendedAction: review.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 522"
      title="Daily Beta 1 triage"
      subtitle="Daily Beta 1 feedback triage review organizes feedback triage posture in plain English. Daily Beta 1 feedback triage review does not auto-ingest feedback. Triage decisions require explicit operator approval, and unsafe triage shortcuts stay blocked."
      primaryLabel="Review triage"
      anchor="daily-beta-1-feedback-triage-review"
      plainEnglishTitle="Plain-English Daily Beta 1 feedback triage review"
      plainEnglishCopy="This page reviews Daily Beta 1 feedback triage identity, Triage groups, Usability feedback queue, Safety feedback queue, Rollout feedback queue, Release feedback queue, Severity priority checklist, Denied triage actions, Unresolved triage blockers, Regression review route, Hardening pass route, next recommended action. It is review-only, approval required, and it does not execute workflows, go live, launch Daily Beta 1, mutate files, mutate memory, call providers, call local models, call connectors, create automations, or store outputs."
      language={model.language}
      markers={[...DAILY_BETA_1_FEEDBACK_TRIAGE_REVIEW_MARKERS]}
      links={[
        { href: "/daily-beta-1-feedback-inbox", label: "Feedback inbox" },
        { href: "/daily-beta-1-regression-review", label: "Regression" },
        { href: "/daily-beta-1-hardening-pass", label: "Hardening" },
        { href: "/daily-beta-1-rollout-review", label: "Rollout review" },
      ]}
      cards={cards}
      advancedSummary="Advanced triage details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.triageReviews.map((review) => review.advancedDailyBetaOneFeedbackTriageReviewDetails)}
      advancedCopy="advanced triage details collapsed/secondary. This route remains review-only and approval required. It never executes workflows, runs tests, applies changes, publishes documentation, publishes release notes, sends handoff, signs off release, goes live, launches Daily Beta 1, executes rollout, calls providers, calls local models, calls connectors, creates automations, mutates files, mutates memory, stores credentials, stores outputs, or creates an MCP runtime."
      dataScope="daily-beta-1-feedback-triage-review buildDailyBetaOneFeedbackTriageReviewStableKey DailyBetaOneFeedbackTriageReviewPanel"
    />
  );
}
