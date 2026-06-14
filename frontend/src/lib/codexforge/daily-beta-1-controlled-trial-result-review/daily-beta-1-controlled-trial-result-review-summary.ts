import type { DailyBetaOneControlledTrialResultReview, DailyBetaOneControlledTrialResultReviewBoundary, DailyBetaOneControlledTrialResultReviewModel } from "./daily-beta-1-controlled-trial-result-review-types";
import { buildDailyBetaOneControlledTrialResultReviewStableKey } from "./daily-beta-1-controlled-trial-result-review-types";

export const DAILY_BETA_ONE_CONTROLLED_TRIAL_RESULT_REVIEW_LANGUAGE = [
  "Daily Beta 1 controlled trial result review",
  "Daily Beta 1 controlled trial result review does not store live outputs",
  "Controlled trial results require explicit operator review before use",
  "Unsafe trial results remain blocked",
  "Result groups",
  "Trial evidence checklist",
] as const;

export function buildDailyBetaOneControlledTrialResultReview(input: Omit<DailyBetaOneControlledTrialResultReview, "id"> & { idHint: string }): DailyBetaOneControlledTrialResultReview {
  const { idHint, ...review } = input;
  return { id: buildDailyBetaOneControlledTrialResultReviewStableKey("daily-beta-1-controlled-trial-result-review", idHint, input.status), ...review };
}

export function buildDailyBetaOneControlledTrialResultReviews(): DailyBetaOneControlledTrialResultReview[] {
  return [
    buildDailyBetaOneControlledTrialResultReview({
      idHint: "operator-result-review-packet",
      status: "blocked",
      controlledTrialResultReviewIdentity: "Controlled trial result review identity: daily-beta-1-controlled-trial-result-review-operator-result-review-packet.",
      resultGroups: [
        "Result groups: operator notes, validation evidence, safety observations, blocker evidence, and reuse candidates stay grouped for human review only.",
      ],
      trialEvidenceChecklist: [
        "Trial evidence checklist: each claimed result needs source owner, validation log, safety note, timestamp from approved evidence, and explicit operator review before use.",
      ],
      resultAcceptanceChecklist: [
        "Result acceptance checklist: acceptance requires operator approval outside this page, matching validation logs, no unresolved safety blocker, and no unreviewed live output storage.",
      ],
      resultRejectionChecklist: [
        "Result rejection checklist: reject stale, unsafe, untraceable, private, unapproved, or execution-claimed results; unsafe trial results remain blocked.",
      ],
      resultReuseChecklist: [
        "Result reuse checklist: reuse requires explicit operator review, redaction, scope match, evidence link, and confirmation that no live outputs are stored by this UI.",
      ],
      deniedResultActions: [
        "Denied result actions: store live outputs, accept results automatically, execute workflows, launch Daily Beta 1, run regression tests, call providers, call local models, fetch connector data, create automations, mutate files, or mutate memory.",
      ],
      unresolvedResultBlockers: [
        "Unresolved result blockers: missing evidence owner, unreviewed safety note, unclear recovery route, unapproved reuse, and any unsafe result claim.",
      ],
      recoveryReviewRoute: "Recovery review route: /daily-beta-1-controlled-trial-recovery-review reviews recovery options without triggering recovery.",
      hardeningRoute: "Hardening route: /daily-beta-1-controlled-trial-hardening reviews hardening needs without applying changes.",
      nextRecommendedAction: "Next recommended action: keep controlled trial results blocked until an operator reviews evidence, acceptance, rejection, and reuse decisions outside this page.",
      advancedControlledTrialResultReviewDetails: "Advanced controlled trial result review details: Daily Beta 1 controlled trial result review is review-only. Daily Beta 1 controlled trial result review does not store live outputs, controlled trial results require explicit operator review before use, and unsafe trial results remain blocked. It does not store outputs, accept results automatically, execute workflows, launch Daily Beta 1, execute controlled trial, trigger recovery, apply hardening, run boundary probes, call providers, call local models, call local bridge endpoints, call connectors, fetch connector data, create automations, mutate files, mutate memory, persist approval decisions, or create an MCP runtime.",
    }),
  ];
}

export function buildDailyBetaOneControlledTrialResultReviewBoundary(): DailyBetaOneControlledTrialResultReviewBoundary {
  return { reviewOnly: true, approvalRequired: true, controlledTrialExecutionAllowedFromUi: false, resultStorageAllowedFromUi: false, resultAcceptanceAutomationAllowedFromUi: false, workflowExecutionAllowedFromUi: false, dailyBetaOneLaunchAllowedFromUi: false, providerApiCallsAllowedFromUi: false, localModelCallsAllowedFromUi: false, localBridgeEndpointCallsAllowedFromUi: false, connectorApiCallsAllowedFromUi: false, automationCreationAllowedFromUi: false, fileMutationAllowedFromUi: false, memoryMutationAllowedFromUi: false, outputStorageAllowed: false, credentialStorageAllowed: false };
}

export function summarizeDailyBetaOneControlledTrialResultReview(model: Pick<DailyBetaOneControlledTrialResultReviewModel, "resultReviews">): string {
  return "Daily Beta 1 controlled trial result review summarizes " + model.resultReviews.length + " result review packet. Daily Beta 1 controlled trial result review does not store live outputs, controlled trial results require explicit operator review before use, and unsafe trial results remain blocked.";
}

export function buildDailyBetaOneControlledTrialResultReviewModel(): DailyBetaOneControlledTrialResultReviewModel {
  const resultReviews = buildDailyBetaOneControlledTrialResultReviews();
  const model: DailyBetaOneControlledTrialResultReviewModel = {
    title: "Daily Beta 1 controlled trial result review",
    summary: "",
    resultReviews,
    boundary: buildDailyBetaOneControlledTrialResultReviewBoundary(),
    language: [...DAILY_BETA_ONE_CONTROLLED_TRIAL_RESULT_REVIEW_LANGUAGE],
    advancedDetails: [
      "Daily Beta 1 controlled trial result review",
      "Controlled trial result review identity",
      "Result groups",
      "Trial evidence checklist",
      "Result acceptance checklist",
      "Result rejection checklist",
      "Result reuse checklist",
      "Denied result actions",
      "Unresolved result blockers",
      "Recovery review route",
      "Hardening route",
      "Next recommended action",
      "Daily Beta 1 controlled trial result review does not store live outputs",
      "Controlled trial results require explicit operator review before use",
      "Unsafe trial results remain blocked",
      "advanced controlled trial result details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeDailyBetaOneControlledTrialResultReview(model) };
}
