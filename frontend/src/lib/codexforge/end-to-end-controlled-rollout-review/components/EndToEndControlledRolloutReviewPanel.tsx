"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildEndToEndControlledRolloutReviewModel, buildEndToEndControlledRolloutReviewStableKey } from "@/lib/codexforge/end-to-end-controlled-rollout-review";

const END_TO_END_CONTROLLED_ROLLOUT_REVIEW_MARKERS = [
  "End-to-end controlled rollout review",
  "End-to-end controlled rollout review does not proceed automatically",
  "Rollout decisions require explicit operator approval",
  "Unresolved rollout review blockers stay blocked",
  "Rollout review groups",
  "Operator experience checklist",
] as const;

export function EndToEndControlledRolloutReviewPanel() {
  const model = buildEndToEndControlledRolloutReviewModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.reviews.map((review) => ({
    id: buildEndToEndControlledRolloutReviewStableKey("end-to-end-controlled-rollout-review-card", review.id),
    title: review.controlledRolloutReviewIdentity,
    status: review.status,
    sections: [
      { label: "Rollout review groups", items: review.rolloutReviewGroups },
      { label: "Readiness review checklist", items: review.readinessReviewChecklist },
      { label: "Operator experience checklist", items: review.operatorExperienceChecklist },
      { label: "Safety/regression checklist", items: review.safetyRegressionChecklist },
      { label: "Rollback readiness checklist", items: review.rollbackReadinessChecklist },
      { label: "Denied rollout review actions", items: review.deniedRolloutReviewActions },
      { label: "Unresolved rollout review blockers", items: review.unresolvedRolloutReviewBlockers },
    ],
    routes: [review.rolloutFeedbackInboxRoute, review.rolloutRegressionReviewRoute],
    nextRecommendedAction: review.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 555"
      title="Controlled rollout review"
      subtitle="End-to-end controlled rollout review checks rollout readiness in plain English without proceeding automatically. End-to-end controlled rollout review does not proceed automatically. Rollout decisions require explicit operator approval, and unresolved rollout review blockers stay blocked."
      primaryLabel="Review rollout"
      anchor="end-to-end-controlled-rollout-review"
      plainEnglishTitle="Plain-English end-to-end controlled rollout review"
      plainEnglishCopy="This page reviews controlled rollout review identity, rollout review groups, readiness review checklist, operator experience checklist, safety/regression checklist, rollback readiness checklist, denied rollout review actions, unresolved rollout review blockers, rollout feedback inbox route, rollout regression review route, and next recommended action. It is review-only, approval required, and it does not proceed automatically, execute workflows, execute rollout, persist rollout decisions, approve actions, call providers, call local models, call connectors, create automations, mutate files, mutate memory, store outputs, or store credentials."
      language={model.language}
      markers={[...END_TO_END_CONTROLLED_ROLLOUT_REVIEW_MARKERS]}
      links={[
        { href: "/end-to-end-controlled-rollout-plan", label: "Rollout plan" },
        { href: "/end-to-end-rollout-feedback-inbox", label: "Feedback inbox" },
        { href: "/end-to-end-rollout-regression-review", label: "Regression" },
        { href: "/codexforge-end-to-end-workflow-release-candidate", label: "E2E RC" },
      ]}
      cards={cards}
      advancedSummary="Advanced controlled rollout review details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.reviews.map((review) => review.advancedControlledRolloutReviewDetails)}
      advancedCopy="advanced controlled rollout review details collapsed/secondary. This route remains review-only and approval required. It never proceeds automatically, executes workflows, executes rollout, persists rollout decisions, approves actions, calls providers, calls local models, calls connectors, creates automations, mutates files, mutates memory, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="end-to-end-controlled-rollout-review buildEndToEndControlledRolloutReviewStableKey EndToEndControlledRolloutReviewPanel"
    />
  );
}
