import type { DailyBetaActivationFeedbackInbox, DailyBetaActivationFeedbackInboxBoundary, DailyBetaActivationFeedbackInboxModel } from "./daily-beta-activation-feedback-inbox-types";
import { buildDailyBetaActivationFeedbackInboxStableKey } from "./daily-beta-activation-feedback-inbox-types";

export const DAILY_BETA_ACTIVATION_FEEDBACK_INBOX_LANGUAGE = [
  "Daily Beta activation feedback inbox",
  "Daily Beta activation feedback inbox does not auto-ingest feedback",
  "Activation feedback requires operator review before use",
  "Unsafe feedback shortcuts stay blocked",
  "Feedback groups",
  "Safety feedback lane",
] as const;

export function buildDailyBetaActivationFeedbackInbox(input: Omit<DailyBetaActivationFeedbackInbox, "id"> & { idHint: string }): DailyBetaActivationFeedbackInbox {
  const { idHint, ...feedbackInbox } = input;
  return { id: buildDailyBetaActivationFeedbackInboxStableKey("daily-beta-activation-feedback-inbox", idHint, input.status), ...feedbackInbox };
}

export function buildDailyBetaActivationFeedbackInboxes(): DailyBetaActivationFeedbackInbox[] {
  return [
    buildDailyBetaActivationFeedbackInbox({
      idHint: "daily-beta-activation-feedback-inbox-packet",
      status: "blocked",
      activationFeedbackInboxIdentity: "Activation feedback inbox identity: daily-beta-activation-feedback-inbox-packet.",
      feedbackGroups: [
        "Feedback groups: usability feedback lane, safety feedback lane, activation feedback lane, release feedback lane, denied feedback actions, unresolved feedback blockers, regression review route, final hardening route, and next recommended action.",
      ],
      usabilityFeedbackLane: [
        "Usability feedback lane: operator notes can be reviewed in plain English, but feedback is not auto-ingested, stored as memory, written to files, or promoted into future behavior from this UI.",
      ],
      safetyFeedbackLane: [
        "Safety feedback lane: unsafe shortcuts, approval bypasses, activation claims, provider/local/connector output exposure, credential exposure, and memory mutation requests stay blocked until operator review outside this page.",
      ],
      activationFeedbackLane: [
        "Activation feedback lane: activation feedback requires source, owner, scope, limitation, safety review, and explicit operator review before any use.",
      ],
      releaseFeedbackLane: [
        "Release feedback lane: release notes, handoff notes, readiness notes, and rollout notes remain review-only and are not sent, exported, published, or stored automatically.",
      ],
      deniedFeedbackActions: [
        "Denied feedback actions: auto-ingest feedback, mutate memory, write files, store outputs, promote memory, persist approval decisions, call providers, call local models, call connectors, create automations, send notifications, or store credentials.",
      ],
      unresolvedFeedbackBlockers: [
        "Unresolved feedback blockers: missing operator review, unsafe shortcut request, unclear source, missing redaction, missing regression review, and missing final hardening review.",
      ],
      regressionReviewRoute: "Regression review route: /daily-beta-activation-regression-review reviews activation regressions without running tests or applying fixes.",
      finalHardeningRoute: "Final hardening route: /daily-beta-activation-final-hardening reviews final hardening needs without applying changes.",
      nextRecommendedAction: "Next recommended action: keep activation feedback blocked until operator review, safety review, regression review, and final hardening review happen outside this page.",
      advancedDailyBetaActivationFeedbackInboxDetails: "Advanced Daily Beta activation feedback inbox details: Daily Beta activation feedback inbox is review-only. Daily Beta activation feedback inbox does not auto-ingest feedback, activation feedback requires operator review before use, and unsafe feedback shortcuts stay blocked. It does not auto-ingest feedback, mutate memory, write files, store outputs, promote memory, persist approval decisions, call providers, call local models, call connectors, create automations, send notifications, store credentials, or create an MCP runtime.",
    }),
  ];
}

export function buildDailyBetaActivationFeedbackInboxBoundary(): DailyBetaActivationFeedbackInboxBoundary {
  return { reviewOnly: true, approvalRequired: true, feedbackIngestionAllowedFromUi: false, memoryMutationAllowedFromUi: false, memoryAutoPromotionAllowed: false, fileMutationAllowedFromUi: false, fileWriteAllowedFromUi: false, providerApiCallsAllowedFromUi: false, localModelCallsAllowedFromUi: false, connectorApiCallsAllowedFromUi: false, automationCreationAllowedFromUi: false, approvalDecisionPersistenceAllowedFromUi: false, outputStorageAllowed: false, credentialStorageAllowed: false };
}

export function summarizeDailyBetaActivationFeedbackInbox(model: Pick<DailyBetaActivationFeedbackInboxModel, "feedbackInboxes">): string {
  return "Daily Beta activation feedback inbox summarizes " + model.feedbackInboxes.length + " feedback packet without auto-ingesting feedback. Activation feedback requires operator review before use, and unsafe feedback shortcuts stay blocked.";
}

export function buildDailyBetaActivationFeedbackInboxModel(): DailyBetaActivationFeedbackInboxModel {
  const feedbackInboxes = buildDailyBetaActivationFeedbackInboxes();
  const model: DailyBetaActivationFeedbackInboxModel = {
    title: "Daily Beta activation feedback inbox",
    summary: "",
    feedbackInboxes,
    boundary: buildDailyBetaActivationFeedbackInboxBoundary(),
    language: [...DAILY_BETA_ACTIVATION_FEEDBACK_INBOX_LANGUAGE],
    advancedDetails: [
      "Daily Beta activation feedback inbox",
      "Activation feedback inbox identity",
      "Feedback groups",
      "Usability feedback lane",
      "Safety feedback lane",
      "Activation feedback lane",
      "Release feedback lane",
      "Denied feedback actions",
      "Unresolved feedback blockers",
      "Regression review route",
      "Final hardening route",
      "Next recommended action",
      "Daily Beta activation feedback inbox does not auto-ingest feedback",
      "Activation feedback requires operator review before use",
      "Unsafe feedback shortcuts stay blocked",
      "advanced Daily Beta activation feedback inbox details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeDailyBetaActivationFeedbackInbox(model) };
}
