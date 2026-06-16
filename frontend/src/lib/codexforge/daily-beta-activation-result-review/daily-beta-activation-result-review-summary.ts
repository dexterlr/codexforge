import type { DailyBetaActivationResultReview, DailyBetaActivationResultReviewBoundary, DailyBetaActivationResultReviewModel } from "./daily-beta-activation-result-review-types";
import { buildDailyBetaActivationResultReviewStableKey } from "./daily-beta-activation-result-review-types";

export const DAILY_BETA_ACTIVATION_RESULT_REVIEW_LANGUAGE = [
  "Daily Beta activation result review",
  "Daily Beta activation result review does not store live outputs",
  "Activation results require operator review before use",
  "Unsafe activation results remain blocked",
  "Result groups",
  "Acceptance checklist",
] as const;

export function buildDailyBetaActivationResultReview(input: Omit<DailyBetaActivationResultReview, "id"> & { idHint: string }): DailyBetaActivationResultReview {
  const { idHint, ...resultReview } = input;
  return { id: buildDailyBetaActivationResultReviewStableKey("daily-beta-activation-result-review", idHint, input.status), ...resultReview };
}

export function buildDailyBetaActivationResultReviews(): DailyBetaActivationResultReview[] {
  return [
    buildDailyBetaActivationResultReview({
      idHint: "daily-beta-activation-result-review-packet",
      status: "blocked",
      activationResultIdentity: "Activation result identity: daily-beta-activation-result-review-packet.",
      resultGroups: [
        "Result groups: acceptance checklist, rejection checklist, reuse checklist, safety review checklist, denied result actions, unresolved result blockers, recovery review route, hardening route, and next recommended action.",
      ],
      acceptanceChecklist: [
        "Acceptance checklist: activation results need explicit operator review, source evidence, scope match, privacy review, boundary approval, and rollback note before any reuse.",
      ],
      rejectionChecklist: [
        "Rejection checklist: unsafe outputs, unclear provenance, missing approval, missing redaction, missing rollback, or unbounded provider/local/connector data keep the result blocked.",
      ],
      reuseChecklist: [
        "Reuse checklist: reusable result summaries must stay copy-only, cite their source, avoid credential/output storage, and require operator approval before future use.",
      ],
      safetyReviewChecklist: [
        "Safety review checklist: check for activation claims, live output leakage, secret exposure, provider/local/connector output retention, memory mutation, and file mutation before reuse.",
      ],
      deniedResultActions: [
        "Denied result actions: store live outputs, ingest results, mutate memory, mutate files, call providers, call local models, call connectors, create automations, persist approval decisions, trigger recovery, apply hardening, go live, or store credentials.",
      ],
      unresolvedResultBlockers: [
        "Unresolved result blockers: missing operator review, unsafe activation result, missing evidence review, missing redaction, missing reuse approval, and unresolved recovery/hardening decision.",
      ],
      activationRecoveryReviewRoute: "Activation recovery review route: /daily-beta-activation-recovery-review reviews recovery options without triggering them.",
      activationHardeningRoute: "Activation hardening route: /daily-beta-activation-hardening-pass reviews hardening needs without applying changes.",
      nextRecommendedAction: "Next recommended action: keep unsafe activation results blocked and review recovery/hardening needs before any result reuse request.",
      advancedDailyBetaActivationResultReviewDetails: "Advanced Daily Beta activation result review details: Daily Beta activation result review is review-only. Daily Beta activation result review does not store live outputs, activation results require operator review before use, and unsafe activation results remain blocked. It does not store outputs, ingest results, mutate memory, mutate files, call providers, call local models, call connectors, create automations, persist approval decisions, trigger recovery, apply hardening, go live, store credentials, or create an MCP runtime.",
    }),
  ];
}

export function buildDailyBetaActivationResultReviewBoundary(): DailyBetaActivationResultReviewBoundary {
  return { reviewOnly: true, approvalRequired: true, liveOutputStorageAllowedFromUi: false, resultIngestionAllowedFromUi: false, memoryMutationAllowedFromUi: false, fileMutationAllowedFromUi: false, providerApiCallsAllowedFromUi: false, localModelCallsAllowedFromUi: false, connectorApiCallsAllowedFromUi: false, automationCreationAllowedFromUi: false, outputStorageAllowed: false, credentialStorageAllowed: false };
}

export function summarizeDailyBetaActivationResultReview(model: Pick<DailyBetaActivationResultReviewModel, "resultReviews">): string {
  return "Daily Beta activation result review summarizes " + model.resultReviews.length + " result packet without storing live outputs. Activation results require operator review before use, and unsafe activation results remain blocked.";
}

export function buildDailyBetaActivationResultReviewModel(): DailyBetaActivationResultReviewModel {
  const resultReviews = buildDailyBetaActivationResultReviews();
  const model: DailyBetaActivationResultReviewModel = {
    title: "Daily Beta activation result review",
    summary: "",
    resultReviews,
    boundary: buildDailyBetaActivationResultReviewBoundary(),
    language: [...DAILY_BETA_ACTIVATION_RESULT_REVIEW_LANGUAGE],
    advancedDetails: [
      "Daily Beta activation result review",
      "Activation result identity",
      "Result groups",
      "Acceptance checklist",
      "Rejection checklist",
      "Reuse checklist",
      "Safety review checklist",
      "Denied result actions",
      "Unresolved result blockers",
      "Activation recovery review route",
      "Activation hardening route",
      "Next recommended action",
      "Daily Beta activation result review does not store live outputs",
      "Activation results require operator review before use",
      "Unsafe activation results remain blocked",
      "advanced Daily Beta activation result review details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeDailyBetaActivationResultReview(model) };
}
