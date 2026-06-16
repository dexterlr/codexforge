"use client";

import { DailyBetaOneReleaseReviewSurface, type DailyBetaOneReleaseReviewCard } from "@/lib/codexforge/daily-beta-1-release-review-kit";
import { buildDailyBetaActivationFeedbackInboxModel, buildDailyBetaActivationFeedbackInboxStableKey } from "@/lib/codexforge/daily-beta-activation-feedback-inbox";

const DAILY_BETA_ACTIVATION_FEEDBACK_INBOX_MARKERS = [
  "Daily Beta activation feedback inbox",
  "Daily Beta activation feedback inbox does not auto-ingest feedback",
  "Activation feedback requires operator review before use",
  "Unsafe feedback shortcuts stay blocked",
  "Feedback groups",
  "Safety feedback lane",
] as const;

export function DailyBetaActivationFeedbackInboxPanel() {
  const model = buildDailyBetaActivationFeedbackInboxModel();
  const cards: DailyBetaOneReleaseReviewCard[] = model.feedbackInboxes.map((feedbackInbox) => ({
    id: buildDailyBetaActivationFeedbackInboxStableKey("daily-beta-activation-feedback-inbox-card", feedbackInbox.id),
    title: feedbackInbox.activationFeedbackInboxIdentity,
    status: feedbackInbox.status,
    sections: [
      { label: "Feedback groups", items: feedbackInbox.feedbackGroups },
      { label: "Usability feedback lane", items: feedbackInbox.usabilityFeedbackLane },
      { label: "Safety feedback lane", items: feedbackInbox.safetyFeedbackLane },
      { label: "Activation feedback lane", items: feedbackInbox.activationFeedbackLane },
      { label: "Release feedback lane", items: feedbackInbox.releaseFeedbackLane },
      { label: "Denied feedback actions", items: feedbackInbox.deniedFeedbackActions },
      { label: "Unresolved feedback blockers", items: feedbackInbox.unresolvedFeedbackBlockers },
    ],
    routes: [feedbackInbox.regressionReviewRoute, feedbackInbox.finalHardeningRoute],
    nextRecommendedAction: feedbackInbox.nextRecommendedAction,
  }));

  return (
    <DailyBetaOneReleaseReviewSurface
      phase="Phase 572"
      title="Daily Beta activation feedback inbox"
      subtitle="Daily Beta activation feedback inbox reviews activation feedback in plain English without auto-ingesting it. Daily Beta activation feedback inbox does not auto-ingest feedback. Activation feedback requires operator review before use, and unsafe feedback shortcuts stay blocked."
      primaryLabel="Review feedback"
      anchor="daily-beta-activation-feedback-inbox"
      plainEnglishTitle="Plain-English Daily Beta activation feedback inbox"
      plainEnglishCopy="This page reviews activation feedback inbox identity, feedback groups, usability feedback lane, safety feedback lane, activation feedback lane, release feedback lane, denied feedback actions, unresolved feedback blockers, regression review route, final hardening route, and next recommended action. It is review-only, approval required, and it does not auto-ingest feedback, mutate memory, write files, store outputs, promote memory, persist approval decisions, call providers, call local models, call connectors, create automations, send notifications, or store credentials."
      language={model.language}
      markers={[...DAILY_BETA_ACTIVATION_FEEDBACK_INBOX_MARKERS]}
      links={[
        { href: "/daily-beta-activation-controlled-operator-trial", label: "Trial review" },
        { href: "/daily-beta-activation-regression-review", label: "Regression" },
        { href: "/daily-beta-activation-final-hardening", label: "Hardening" },
        { href: "/daily-beta-activation-final-gate", label: "Final gate" },
      ]}
      cards={cards}
      advancedSummary="Advanced Daily Beta activation feedback inbox details"
      advancedDetails={model.advancedDetails}
      advancedCopies={model.feedbackInboxes.map((feedbackInbox) => feedbackInbox.advancedDailyBetaActivationFeedbackInboxDetails)}
      advancedCopy="advanced Daily Beta activation feedback inbox details collapsed/secondary. This route remains review-only and approval required. It never auto-ingests feedback, mutates memory, writes files, stores outputs, promotes memory, persists approval decisions, calls providers, calls local models, calls connectors, creates automations, sends notifications, stores credentials, or creates an MCP runtime."
      dataScope="daily-beta-activation-feedback-inbox buildDailyBetaActivationFeedbackInboxStableKey DailyBetaActivationFeedbackInboxPanel"
    />
  );
}
