import type {
  DailyBetaOneFeedbackInbox,
  DailyBetaOneFeedbackInboxBoundary,
  DailyBetaOneFeedbackInboxModel,
} from "./daily-beta-1-feedback-inbox-types";
import { buildDailyBetaOneFeedbackInboxStableKey } from "./daily-beta-1-feedback-inbox-types";

export const DAILY_BETA_ONE_FEEDBACK_INBOX_LANGUAGE = [
  "Daily Beta 1 feedback inbox",
  "Daily Beta 1 feedback inbox does not auto-ingest feedback",
  "Daily Beta 1 feedback requires operator review before use",
  "Unsafe feedback shortcuts stay blocked",
  "Feedback groups",
  "Safety feedback lane",
] as const;

export function buildDailyBetaOneFeedbackInbox(
  input: Omit<DailyBetaOneFeedbackInbox, "id"> & { idHint: string }
): DailyBetaOneFeedbackInbox {
  const { idHint, ...inbox } = input;
  return {
    id: buildDailyBetaOneFeedbackInboxStableKey("daily-beta-1-feedback-inbox", idHint, input.status),
    ...inbox,
  };
}

export function buildDailyBetaOneFeedbackInboxes(): DailyBetaOneFeedbackInbox[] {
  return [
    buildDailyBetaOneFeedbackInbox({
      idHint: "daily-beta-1-feedback-review",
      status: "blocked",
      dailyBetaOneFeedbackInboxIdentity:
        "Daily Beta 1 feedback inbox identity: daily-beta-1-feedback-inbox-daily-beta-1-feedback-review.",
      feedbackGroups: [
        "Feedback groups: usability feedback, safety feedback, rollout feedback, release feedback, hardening return feedback, and operator confidence feedback.",
      ],
      usabilityFeedbackLane: [
        "Usability feedback lane: navigation clarity, novice language, expert scan path, blocked-state language, and next action clarity require operator review before use.",
      ],
      safetyFeedbackLane: [
        "Safety feedback lane: feedback must not request approval bypass, live execution, provider calls, connector calls, automation creation, file writes, or memory promotion.",
      ],
      rolloutFeedbackLane: [
        "Rollout feedback lane: cohort notes, rollout blockers, rollback signals, support notes, and review outcomes stay review-only until approved outside this page.",
      ],
      releaseFeedbackLane: [
        "Release feedback lane: release owner notes, signoff concerns, documentation issues, onboarding issues, and Daily Beta 1 candidate blockers require operator review before use.",
      ],
      deniedFeedbackActions: [
        "Denied feedback actions: auto-ingest feedback, mutate memory, write files, store outputs, approve release, launch Daily Beta 1, execute workflows, call providers, call connectors, or create automations.",
      ],
      unresolvedFeedbackBlockers: [
        "Unresolved feedback blockers: unsafe shortcut request, missing operator review, unclear privacy scope, unresolved rollout blocker, and missing hardening return owner.",
      ],
      dailyBetaHardeningRoute:
        "Daily Beta hardening route: /daily-beta-hardening-pass reviews hardening needs without applying changes.",
      dailyBetaOneCandidateRoute:
        "Daily Beta 1 candidate route: /codexforge-daily-beta-1-candidate summarizes Daily Beta 1 readiness without going live.",
      nextRecommendedAction:
        "Next recommended action: keep Daily Beta 1 feedback blocked from use until usability, safety, rollout, release, and hardening owners review it outside this page.",
      advancedFeedbackInboxDetails:
        "Advanced feedback inbox details: Daily Beta 1 feedback inbox is review-only. Daily Beta 1 feedback inbox does not auto-ingest feedback, Daily Beta 1 feedback requires operator review before use, and unsafe feedback shortcuts stay blocked. It does not ingest feedback, mutate memory, write files, store outputs, execute workflows, launch Daily Beta 1, call providers, call local models, call connectors, create automations, or create an MCP runtime.",
    }),
  ];
}

export function buildDailyBetaOneFeedbackInboxBoundary(): DailyBetaOneFeedbackInboxBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    dailyBetaOneFeedbackInboxDoesNotAutoIngestFeedback: true,
    dailyBetaOneFeedbackRequiresOperatorReviewBeforeUse: true,
    unsafeFeedbackShortcutsStayBlocked: true,
    feedbackIngestionAllowedFromUi: false,
    memoryMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    outputStorageAllowed: false,
  };
}

export function summarizeDailyBetaOneFeedbackInbox(
  model: Pick<DailyBetaOneFeedbackInboxModel, "inboxes">
): string {
  return `Daily Beta 1 feedback inbox reviews ${model.inboxes.length} feedback posture without auto-ingesting feedback. Daily Beta 1 feedback requires operator review before use, and unsafe feedback shortcuts stay blocked.`;
}

export function buildDailyBetaOneFeedbackInboxModel(): DailyBetaOneFeedbackInboxModel {
  const inboxes = buildDailyBetaOneFeedbackInboxes();
  const model: DailyBetaOneFeedbackInboxModel = {
    title: "Daily Beta 1 feedback inbox",
    summary: "",
    inboxes,
    boundary: buildDailyBetaOneFeedbackInboxBoundary(),
    feedbackInboxLanguage: [...DAILY_BETA_ONE_FEEDBACK_INBOX_LANGUAGE],
    advancedDetails: [
      "Daily Beta 1 feedback inbox",
      "Daily Beta 1 feedback inbox identity",
      "Feedback groups",
      "Usability feedback lane",
      "Safety feedback lane",
      "Rollout feedback lane",
      "Release feedback lane",
      "Denied feedback actions",
      "Unresolved feedback blockers",
      "Daily Beta hardening route",
      "Daily Beta 1 candidate route",
      "Next recommended action",
      "Daily Beta 1 feedback inbox does not auto-ingest feedback",
      "Daily Beta 1 feedback requires operator review before use",
      "Unsafe feedback shortcuts stay blocked",
      "advanced feedback inbox details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeDailyBetaOneFeedbackInbox(model) };
}
