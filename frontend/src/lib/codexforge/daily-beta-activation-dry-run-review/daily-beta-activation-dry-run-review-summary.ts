import type { DailyBetaActivationDryRunReview, DailyBetaActivationDryRunReviewBoundary, DailyBetaActivationDryRunReviewModel } from "./daily-beta-activation-dry-run-review-types";
import { buildDailyBetaActivationDryRunReviewStableKey } from "./daily-beta-activation-dry-run-review-types";

export const DAILY_BETA_ACTIVATION_DRY_RUN_REVIEW_LANGUAGE = [
  "Daily Beta activation dry-run review",
  "Daily Beta activation dry-run review does not run activation dry-runs",
  "Activation dry-runs require explicit operator approval",
  "Unapproved activation dry-run paths remain blocked",
  "Dry-run groups",
  "Rollback checklist",
] as const;

export function buildDailyBetaActivationDryRunReview(input: Omit<DailyBetaActivationDryRunReview, "id"> & { idHint: string }): DailyBetaActivationDryRunReview {
  const { idHint, ...dryRun } = input;
  return { id: buildDailyBetaActivationDryRunReviewStableKey("daily-beta-activation-dry-run-review", idHint, input.status), ...dryRun };
}

export function buildDailyBetaActivationDryRunReviews(): DailyBetaActivationDryRunReview[] {
  return [
    buildDailyBetaActivationDryRunReview({
      idHint: "daily-beta-activation-dry-run-review-packet",
      status: "blocked",
      activationDryRunIdentity: "Activation dry-run identity: daily-beta-activation-dry-run-review-packet.",
      dryRunGroups: [
        "Dry-run groups: boundary dry-run checklist, rollout dry-run checklist, operator decision checklist, rollback checklist, denied dry-run actions, unresolved dry-run blockers, evidence review route, result review route, and next recommended action.",
      ],
      boundaryDryRunChecklist: [
        "Boundary dry-run checklist: provider, local model, connector, automation, file, test, credential, output, audit, and rollback boundaries remain previewed only until approved outside this page.",
      ],
      rolloutDryRunChecklist: [
        "Rollout dry-run checklist: controlled rollout stages, feedback intake, regression review, hardening review, and live boundary review are previewed without executing workflows or rollout steps.",
      ],
      operatorDecisionChecklist: [
        "Operator decision checklist: each activation dry-run path needs a named owner, manual approval note, failure stop condition, rollback contact, and evidence review before it can leave review.",
      ],
      rollbackChecklist: [
        "Rollback checklist: stop criteria, owner, support route, recovery route, communication note, and fallback candidate stay blocked until explicitly approved.",
      ],
      deniedDryRunActions: [
        "Denied dry-run actions: run activation dry-runs, execute workflows, execute rollout, call providers, call local models, call connectors, create automations, mutate files, mutate memory, store outputs, persist approval decisions, trigger recovery, apply hardening, or go live.",
      ],
      unresolvedDryRunBlockers: [
        "Unresolved dry-run blockers: missing explicit operator approval, missing approved live boundary, unresolved rollout blockers, missing rollback owner, and missing evidence/result review.",
      ],
      activationEvidenceReviewRoute: "Activation evidence review route: /daily-beta-activation-evidence-review reviews evidence before use without ingesting it automatically.",
      activationResultReviewRoute: "Activation result review route: /daily-beta-activation-result-review reviews outputs before reuse without storing live outputs.",
      nextRecommendedAction: "Next recommended action: keep activation dry-run paths blocked and review evidence/result readiness before requesting explicit operator approval outside this page.",
      advancedDailyBetaActivationDryRunReviewDetails: "Advanced Daily Beta activation dry-run review details: Daily Beta activation dry-run review is review-only. Daily Beta activation dry-run review does not run activation dry-runs, activation dry-runs require explicit operator approval, and unapproved activation dry-run paths remain blocked. It does not run dry-runs, activate Daily Beta, execute workflows, execute rollout, call providers, call local models, call connectors, create automations, mutate files, mutate memory, store outputs, persist approval decisions, trigger recovery, apply hardening, go live, store credentials, or create an MCP runtime.",
    }),
  ];
}

export function buildDailyBetaActivationDryRunReviewBoundary(): DailyBetaActivationDryRunReviewBoundary {
  return { reviewOnly: true, approvalRequired: true, activationDryRunExecutionAllowedFromUi: false, workflowExecutionAllowedFromUi: false, fileMutationAllowedFromUi: false, memoryMutationAllowedFromUi: false, providerApiCallsAllowedFromUi: false, localModelCallsAllowedFromUi: false, connectorApiCallsAllowedFromUi: false, automationExecutionAllowedFromUi: false, approvalDecisionPersistenceAllowedFromUi: false, outputStorageAllowed: false, credentialStorageAllowed: false };
}

export function summarizeDailyBetaActivationDryRunReview(model: Pick<DailyBetaActivationDryRunReviewModel, "dryRuns">): string {
  return "Daily Beta activation dry-run review previews " + model.dryRuns.length + " activation dry-run packet without running activation dry-runs. Activation dry-runs require explicit operator approval, and unapproved activation dry-run paths remain blocked.";
}

export function buildDailyBetaActivationDryRunReviewModel(): DailyBetaActivationDryRunReviewModel {
  const dryRuns = buildDailyBetaActivationDryRunReviews();
  const model: DailyBetaActivationDryRunReviewModel = {
    title: "Daily Beta activation dry-run review",
    summary: "",
    dryRuns,
    boundary: buildDailyBetaActivationDryRunReviewBoundary(),
    language: [...DAILY_BETA_ACTIVATION_DRY_RUN_REVIEW_LANGUAGE],
    advancedDetails: [
      "Daily Beta activation dry-run review",
      "Activation dry-run identity",
      "Dry-run groups",
      "Boundary dry-run checklist",
      "Rollout dry-run checklist",
      "Operator decision checklist",
      "Rollback checklist",
      "Denied dry-run actions",
      "Unresolved dry-run blockers",
      "Activation evidence review route",
      "Activation result review route",
      "Next recommended action",
      "Daily Beta activation dry-run review does not run activation dry-runs",
      "Activation dry-runs require explicit operator approval",
      "Unapproved activation dry-run paths remain blocked",
      "advanced Daily Beta activation dry-run review details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeDailyBetaActivationDryRunReview(model) };
}
