import type { DailyBetaActivationEvidenceReview, DailyBetaActivationEvidenceReviewBoundary, DailyBetaActivationEvidenceReviewModel } from "./daily-beta-activation-evidence-review-types";
import { buildDailyBetaActivationEvidenceReviewStableKey } from "./daily-beta-activation-evidence-review-types";

export const DAILY_BETA_ACTIVATION_EVIDENCE_REVIEW_LANGUAGE = [
  "Daily Beta activation evidence review",
  "Daily Beta activation evidence review does not ingest evidence automatically",
  "Activation evidence requires operator review before use",
  "Private activation evidence stays redacted",
  "Evidence groups",
  "Citation source checklist",
] as const;

export function buildDailyBetaActivationEvidenceReview(input: Omit<DailyBetaActivationEvidenceReview, "id"> & { idHint: string }): DailyBetaActivationEvidenceReview {
  const { idHint, ...evidenceReview } = input;
  return { id: buildDailyBetaActivationEvidenceReviewStableKey("daily-beta-activation-evidence-review", idHint, input.status), ...evidenceReview };
}

export function buildDailyBetaActivationEvidenceReviews(): DailyBetaActivationEvidenceReview[] {
  return [
    buildDailyBetaActivationEvidenceReview({
      idHint: "daily-beta-activation-evidence-review-packet",
      status: "blocked",
      activationEvidenceIdentity: "Activation evidence identity: daily-beta-activation-evidence-review-packet.",
      evidenceGroups: [
        "Evidence groups: live boundary evidence, rollout evidence, citation source checklist, redaction privacy checklist, denied evidence actions, unresolved evidence blockers, result review route, recovery review route, and next recommended action.",
      ],
      liveBoundaryEvidenceChecklist: [
        "Live boundary evidence checklist: provider, local model, connector, automation, file, test, output, credential, audit, and rollback evidence requires operator review before any activation claim.",
      ],
      rolloutEvidenceChecklist: [
        "Rollout evidence checklist: rollout plan, rollout review, feedback, regression, hardening, and final boundary notes stay review-only and are not ingested automatically.",
      ],
      citationSourceChecklist: [
        "Citation source checklist: every activation evidence note needs a human-readable source, owner, date, scope, limitation, and manual review status before use.",
      ],
      redactionPrivacyChecklist: [
        "Redaction/privacy checklist: private activation evidence stays redacted, credentials stay hidden, live outputs are not stored, and connector/provider/local data is not persisted from this UI.",
      ],
      deniedEvidenceActions: [
        "Denied evidence actions: ingest evidence automatically, store provider outputs, store local model outputs, store connector outputs, store test outputs, mutate memory, mutate files, call providers, call local models, call connectors, create automations, or persist credentials.",
      ],
      unresolvedEvidenceBlockers: [
        "Unresolved evidence blockers: missing source review, missing privacy redaction, missing output retention approval, unresolved rollout evidence gaps, and missing operator approval before use.",
      ],
      activationResultReviewRoute: "Activation result review route: /daily-beta-activation-result-review reviews outputs before reuse without storing live outputs.",
      activationRecoveryReviewRoute: "Activation recovery review route: /daily-beta-activation-recovery-review reviews recovery options without triggering them.",
      nextRecommendedAction: "Next recommended action: keep activation evidence blocked until source review, redaction, result review, and recovery review are completed by an operator outside this page.",
      advancedDailyBetaActivationEvidenceReviewDetails: "Advanced Daily Beta activation evidence review details: Daily Beta activation evidence review is review-only. Daily Beta activation evidence review does not ingest evidence automatically, activation evidence requires operator review before use, and private activation evidence stays redacted. It does not ingest evidence, store provider outputs, store local model outputs, store connector outputs, store test outputs, mutate memory, mutate files, call providers, call local models, call connectors, create automations, persist credentials, store outputs, or create an MCP runtime.",
    }),
  ];
}

export function buildDailyBetaActivationEvidenceReviewBoundary(): DailyBetaActivationEvidenceReviewBoundary {
  return { reviewOnly: true, approvalRequired: true, evidenceIngestionAllowedFromUi: false, outputStorageAllowed: false, providerOutputStorageAllowedFromUi: false, connectorDataStorageAllowedFromUi: false, fileMutationAllowedFromUi: false, memoryMutationAllowedFromUi: false, providerApiCallsAllowedFromUi: false, localModelCallsAllowedFromUi: false, connectorApiCallsAllowedFromUi: false, credentialStorageAllowed: false };
}

export function summarizeDailyBetaActivationEvidenceReview(model: Pick<DailyBetaActivationEvidenceReviewModel, "evidenceReviews">): string {
  return "Daily Beta activation evidence review summarizes " + model.evidenceReviews.length + " evidence packet without ingesting evidence automatically. Activation evidence requires operator review before use, and private activation evidence stays redacted.";
}

export function buildDailyBetaActivationEvidenceReviewModel(): DailyBetaActivationEvidenceReviewModel {
  const evidenceReviews = buildDailyBetaActivationEvidenceReviews();
  const model: DailyBetaActivationEvidenceReviewModel = {
    title: "Daily Beta activation evidence review",
    summary: "",
    evidenceReviews,
    boundary: buildDailyBetaActivationEvidenceReviewBoundary(),
    language: [...DAILY_BETA_ACTIVATION_EVIDENCE_REVIEW_LANGUAGE],
    advancedDetails: [
      "Daily Beta activation evidence review",
      "Activation evidence identity",
      "Evidence groups",
      "Live boundary evidence checklist",
      "Rollout evidence checklist",
      "Citation source checklist",
      "Redaction/privacy checklist",
      "Denied evidence actions",
      "Unresolved evidence blockers",
      "Activation result review route",
      "Activation recovery review route",
      "Next recommended action",
      "Daily Beta activation evidence review does not ingest evidence automatically",
      "Activation evidence requires operator review before use",
      "Private activation evidence stays redacted",
      "advanced Daily Beta activation evidence review details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeDailyBetaActivationEvidenceReview(model) };
}
