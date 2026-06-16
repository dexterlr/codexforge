"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildEndToEndRolloutFeedbackInboxModel, buildEndToEndRolloutFeedbackInboxStableKey } from "@/lib/codexforge/end-to-end-rollout-feedback-inbox";

const END_TO_END_ROLLOUT_FEEDBACK_INBOX_MARKERS = [
  "End-to-end rollout feedback inbox",
  "End-to-end rollout feedback inbox does not auto-ingest feedback",
  "Rollout feedback requires operator review before use",
  "Unsafe rollout feedback shortcuts stay blocked",
  "Feedback groups",
  "Safety feedback lane",
] as const;

export function EndToEndRolloutFeedbackInboxPanel() {
  const model = buildEndToEndRolloutFeedbackInboxModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.inboxes.map((inbox) => ({
    id: buildEndToEndRolloutFeedbackInboxStableKey("end-to-end-rollout-feedback-inbox-card", inbox.id),
    title: inbox.rolloutFeedbackInboxIdentity,
    status: inbox.status,
    sections: [
      { label: "Feedback groups", items: inbox.feedbackGroups },
      { label: "Usability feedback lane", items: inbox.usabilityFeedbackLane },
      { label: "Safety feedback lane", items: inbox.safetyFeedbackLane },
      { label: "Rollout feedback lane", items: inbox.rolloutFeedbackLane },
      { label: "Release feedback lane", items: inbox.releaseFeedbackLane },
      { label: "Denied feedback actions", items: inbox.deniedFeedbackActions },
      { label: "Unresolved feedback blockers", items: inbox.unresolvedFeedbackBlockers },
    ],
    routes: [inbox.rolloutRegressionRoute, inbox.rolloutHardeningRoute],
    nextRecommendedAction: inbox.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 556"
      title="Rollout feedback inbox"
      subtitle="End-to-end rollout feedback inbox reviews rollout feedback in plain English without auto-ingesting it. End-to-end rollout feedback inbox does not auto-ingest feedback. Rollout feedback requires operator review before use, and unsafe rollout feedback shortcuts stay blocked."
      primaryLabel="Review feedback"
      anchor="end-to-end-rollout-feedback-inbox"
      plainEnglishTitle="Plain-English end-to-end rollout feedback inbox"
      plainEnglishCopy="This page reviews rollout feedback inbox identity, feedback groups, usability feedback lane, safety feedback lane, rollout feedback lane, release feedback lane, denied feedback actions, unresolved feedback blockers, rollout regression route, rollout hardening route, and next recommended action. It is review-only, approval required, and it does not auto-ingest feedback, mutate memory, write files, run rollout, run tests, apply hardening, call providers, call local models, call connectors, create automations, store outputs, or store credentials."
      language={model.language}
      markers={[...END_TO_END_ROLLOUT_FEEDBACK_INBOX_MARKERS]}
      links={[
        { href: "/end-to-end-controlled-rollout-review", label: "Rollout review" },
        { href: "/end-to-end-rollout-regression-review", label: "Regression" },
        { href: "/end-to-end-rollout-hardening-pass", label: "Hardening" },
        { href: "/release-readiness-dashboard", label: "Readiness" },
      ]}
      cards={cards}
      advancedSummary="Advanced rollout feedback inbox details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.inboxes.map((inbox) => inbox.advancedRolloutFeedbackInboxDetails)}
      advancedCopy="advanced rollout feedback inbox details collapsed/secondary. This route remains review-only and approval required. It never auto-ingests feedback, mutates memory, writes files, runs rollout, runs tests, applies hardening, calls providers, calls local models, calls connectors, creates automations, stores outputs, stores credentials, or creates an MCP runtime."
      dataScope="end-to-end-rollout-feedback-inbox buildEndToEndRolloutFeedbackInboxStableKey EndToEndRolloutFeedbackInboxPanel"
    />
  );
}
