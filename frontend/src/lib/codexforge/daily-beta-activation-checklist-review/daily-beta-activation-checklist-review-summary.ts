import type { DailyBetaActivationChecklistReview, DailyBetaActivationChecklistReviewBoundary, DailyBetaActivationChecklistReviewModel } from "./daily-beta-activation-checklist-review-types";
import { buildDailyBetaActivationChecklistReviewStableKey } from "./daily-beta-activation-checklist-review-types";

export const DAILY_BETA_ACTIVATION_CHECKLIST_REVIEW_LANGUAGE = [
  "Daily Beta activation checklist review",
  "Daily Beta activation checklist review does not activate Daily Beta",
  "Activation requires explicit operator approval",
  "Unresolved activation blockers stay blocked",
  "Activation checklist groups",
  "Live boundary readiness checklist",
] as const;

export function buildDailyBetaActivationChecklistReview(input: Omit<DailyBetaActivationChecklistReview, "id"> & { idHint: string }): DailyBetaActivationChecklistReview {
  const { idHint, ...checklist } = input;
  return { id: buildDailyBetaActivationChecklistReviewStableKey("daily-beta-activation-checklist-review", idHint, input.status), ...checklist };
}

export function buildDailyBetaActivationChecklistReviews(): DailyBetaActivationChecklistReview[] {
  return [
    buildDailyBetaActivationChecklistReview({
      idHint: "daily-beta-activation-checklist-review-packet",
      status: "blocked",
      activationChecklistIdentity: "Activation checklist identity: daily-beta-activation-checklist-review-packet.",
      activationChecklistGroups: [
        "Activation checklist groups: live boundary readiness, rollout readiness, operator readiness, evidence/result/recovery readiness, denied activation actions, unresolved activation blockers, dry-run review route, evidence review route, and next recommended action.",
      ],
      liveBoundaryReadinessChecklist: [
        "Live boundary readiness checklist: final live execution boundary review stays blocked until every provider, local model, connector, automation, file, test, output, credential, audit, and rollback boundary has explicit operator approval outside this page.",
      ],
      rolloutReadinessChecklist: [
        "Rollout readiness checklist: controlled rollout plan, rollout review, feedback inbox, regression review, and hardening pass remain review-only and do not execute rollout or proceed automatically.",
      ],
      operatorReadinessChecklist: [
        "Operator readiness checklist: named owner, manual approval path, manual stop condition, evidence review owner, recovery owner, and release candidate reviewer must be confirmed before activation can be considered.",
      ],
      evidenceResultRecoveryReadinessChecklist: [
        "Evidence/result/recovery readiness checklist: evidence review, result review, recovery review, hardening review, output retention, privacy redaction, and rollback notes require operator review before use.",
      ],
      deniedActivationActions: [
        "Denied activation actions: activate Daily Beta, execute workflows, run activation dry-runs, trigger recovery, apply hardening, go live, persist activation settings, persist approval decisions, call providers, call local models, call connectors, create automations, mutate files, mutate memory, store outputs, or store credentials.",
      ],
      unresolvedActivationBlockers: [
        "Unresolved activation blockers: missing operator approval, missing live boundary approval, unresolved rollout blockers, missing evidence/result/recovery review, missing release candidate approval, and missing operator readiness signoff approval.",
      ],
      activationDryRunRoute: "Activation dry-run route: /daily-beta-activation-dry-run-review previews dry-run steps without running them.",
      activationEvidenceReviewRoute: "Activation evidence review route: /daily-beta-activation-evidence-review reviews evidence before use without ingesting it automatically.",
      nextRecommendedAction: "Next recommended action: keep Daily Beta activation blocked and review the activation dry-run and evidence routes before asking for explicit operator approval outside this page.",
      advancedDailyBetaActivationChecklistReviewDetails: "Advanced Daily Beta activation checklist review details: Daily Beta activation checklist review is review-only. Daily Beta activation checklist review does not activate Daily Beta, activation requires explicit operator approval, and unresolved activation blockers stay blocked. It does not activate Daily Beta, execute workflows, run dry-runs, trigger recovery, apply hardening, go live, persist activation settings, persist approval decisions, call providers, call local models, call connectors, create automations, mutate files, mutate memory, store outputs, store credentials, or create an MCP runtime.",
    }),
  ];
}

export function buildDailyBetaActivationChecklistReviewBoundary(): DailyBetaActivationChecklistReviewBoundary {
  return { reviewOnly: true, approvalRequired: true, dailyBetaActivationAllowedFromUi: false, activationSettingsPersistenceAllowedFromUi: false, workflowExecutionAllowedFromUi: false, providerApiCallsAllowedFromUi: false, localModelCallsAllowedFromUi: false, connectorApiCallsAllowedFromUi: false, automationCreationAllowedFromUi: false, fileMutationAllowedFromUi: false, memoryMutationAllowedFromUi: false, approvalDecisionPersistenceAllowedFromUi: false, outputStorageAllowed: false, credentialStorageAllowed: false };
}

export function summarizeDailyBetaActivationChecklistReview(model: Pick<DailyBetaActivationChecklistReviewModel, "checklists">): string {
  return "Daily Beta activation checklist review summarizes " + model.checklists.length + " activation checklist packet without activating Daily Beta. Activation requires explicit operator approval, and unresolved activation blockers stay blocked.";
}

export function buildDailyBetaActivationChecklistReviewModel(): DailyBetaActivationChecklistReviewModel {
  const checklists = buildDailyBetaActivationChecklistReviews();
  const model: DailyBetaActivationChecklistReviewModel = {
    title: "Daily Beta activation checklist review",
    summary: "",
    checklists,
    boundary: buildDailyBetaActivationChecklistReviewBoundary(),
    language: [...DAILY_BETA_ACTIVATION_CHECKLIST_REVIEW_LANGUAGE],
    advancedDetails: [
      "Daily Beta activation checklist review",
      "Activation checklist identity",
      "Activation checklist groups",
      "Live boundary readiness checklist",
      "Rollout readiness checklist",
      "Operator readiness checklist",
      "Evidence/result/recovery readiness checklist",
      "Denied activation actions",
      "Unresolved activation blockers",
      "Activation dry-run route",
      "Activation evidence review route",
      "Next recommended action",
      "Daily Beta activation checklist review does not activate Daily Beta",
      "Activation requires explicit operator approval",
      "Unresolved activation blockers stay blocked",
      "advanced Daily Beta activation checklist review details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeDailyBetaActivationChecklistReview(model) };
}
