import type { EndToEndRolloutFeedbackInbox, EndToEndRolloutFeedbackInboxBoundary, EndToEndRolloutFeedbackInboxModel } from "./end-to-end-rollout-feedback-inbox-types";
import { buildEndToEndRolloutFeedbackInboxStableKey } from "./end-to-end-rollout-feedback-inbox-types";

export const END_TO_END_ROLLOUT_FEEDBACK_INBOX_LANGUAGE = [
  "End-to-end rollout feedback inbox",
  "End-to-end rollout feedback inbox does not auto-ingest feedback",
  "Rollout feedback requires operator review before use",
  "Unsafe rollout feedback shortcuts stay blocked",
  "Feedback groups",
  "Safety feedback lane",
] as const;

export function buildEndToEndRolloutFeedbackInbox(input: Omit<EndToEndRolloutFeedbackInbox, "id"> & { idHint: string }): EndToEndRolloutFeedbackInbox {
  const { idHint, ...inbox } = input;
  return { id: buildEndToEndRolloutFeedbackInboxStableKey("end-to-end-rollout-feedback-inbox", idHint, input.status), ...inbox };
}

export function buildEndToEndRolloutFeedbackInboxes(): EndToEndRolloutFeedbackInbox[] {
  return [
    buildEndToEndRolloutFeedbackInbox({
      idHint: "end-to-end-rollout-feedback-inbox-packet",
      status: "blocked",
      rolloutFeedbackInboxIdentity: "Rollout feedback inbox identity: end-to-end-rollout-feedback-inbox-packet.",
      feedbackGroups: [
        "Feedback groups: usability feedback, safety feedback, rollout feedback, release feedback, regression handoff, and hardening handoff.",
      ],
      usabilityFeedbackLane: [
        "Usability feedback lane: novice language, route clarity, operator confidence, support needs, and handoff friction require operator review before use.",
      ],
      safetyFeedbackLane: [
        "Safety feedback lane: approval confusion, blocked-path bypass requests, credential/output concerns, memory concerns, and live boundary concerns stay blocked until reviewed.",
      ],
      rolloutFeedbackLane: [
        "Rollout feedback lane: cohort notes, stage readiness, rollback concerns, support load, stop criteria, and monitoring evidence stay review-only.",
      ],
      releaseFeedbackLane: [
        "Release feedback lane: Daily Beta candidate readiness, unresolved blockers, documentation gaps, operator handoff gaps, and release readiness dashboard follow-up.",
      ],
      deniedFeedbackActions: [
        "Denied feedback actions: auto-ingest feedback, mutate memory, write files, persist feedback as memory, run rollout, run tests, apply hardening, call providers, call local models, call connectors, or create automations.",
      ],
      unresolvedFeedbackBlockers: [
        "Unresolved feedback blockers: missing operator review, missing safety triage owner, missing rollout regression owner, missing hardening owner, and unresolved unsafe shortcut requests.",
      ],
      rolloutRegressionRoute: "Rollout regression route: /end-to-end-rollout-regression-review reviews regressions without running tests.",
      rolloutHardeningRoute: "Rollout hardening route: /end-to-end-rollout-hardening-pass reviews hardening needs without applying changes.",
      nextRecommendedAction: "Next recommended action: keep feedback blocked until the usability, safety, rollout, release, regression, and hardening owners review it outside this page.",
      advancedRolloutFeedbackInboxDetails: "Advanced rollout feedback inbox details: End-to-end rollout feedback inbox is review-only. End-to-end rollout feedback inbox does not auto-ingest feedback, rollout feedback requires operator review before use, and unsafe rollout feedback shortcuts stay blocked. It does not ingest feedback, mutate memory, write files, run rollout, run tests, apply hardening, call providers, call local models, call connectors, create automations, store outputs, store credentials, or create an MCP runtime.",
    }),
  ];
}

export function buildEndToEndRolloutFeedbackInboxBoundary(): EndToEndRolloutFeedbackInboxBoundary {
  return { reviewOnly: true, approvalRequired: true, feedbackIngestionAllowedFromUi: false, memoryMutationAllowedFromUi: false, fileWriteAllowedFromUi: false, workflowExecutionAllowedFromUi: false, rolloutExecutionAllowedFromUi: false, providerApiCallsAllowedFromUi: false, localModelCallsAllowedFromUi: false, connectorApiCallsAllowedFromUi: false, automationCreationAllowedFromUi: false, outputStorageAllowed: false, credentialStorageAllowed: false };
}

export function summarizeEndToEndRolloutFeedbackInbox(model: Pick<EndToEndRolloutFeedbackInboxModel, "inboxes">): string {
  return "End-to-end rollout feedback inbox reviews " + model.inboxes.length + " feedback inbox packet without auto-ingesting feedback. Rollout feedback requires operator review before use, and unsafe rollout feedback shortcuts stay blocked.";
}

export function buildEndToEndRolloutFeedbackInboxModel(): EndToEndRolloutFeedbackInboxModel {
  const inboxes = buildEndToEndRolloutFeedbackInboxes();
  const model: EndToEndRolloutFeedbackInboxModel = {
    title: "End-to-end rollout feedback inbox",
    summary: "",
    inboxes,
    boundary: buildEndToEndRolloutFeedbackInboxBoundary(),
    language: [...END_TO_END_ROLLOUT_FEEDBACK_INBOX_LANGUAGE],
    advancedDetails: [
      "End-to-end rollout feedback inbox",
      "Rollout feedback inbox identity",
      "Feedback groups",
      "Usability feedback lane",
      "Safety feedback lane",
      "Rollout feedback lane",
      "Release feedback lane",
      "Denied feedback actions",
      "Unresolved feedback blockers",
      "Rollout regression route",
      "Rollout hardening route",
      "Next recommended action",
      "End-to-end rollout feedback inbox does not auto-ingest feedback",
      "Rollout feedback requires operator review before use",
      "Unsafe rollout feedback shortcuts stay blocked",
      "advanced rollout feedback inbox details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeEndToEndRolloutFeedbackInbox(model) };
}
