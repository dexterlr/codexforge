import type { DailyBetaOneRegressionReview, DailyBetaOneRegressionReviewBoundary, DailyBetaOneRegressionReviewModel } from "./daily-beta-1-regression-review-types";
import { buildDailyBetaOneRegressionReviewStableKey } from "./daily-beta-1-regression-review-types";

export const DAILY_BETA_ONE_REGRESSION_REVIEW_LANGUAGE = [
  "Daily Beta 1 regression review",
  "Daily Beta 1 regression review does not run tests",
  "Regression fixes require explicit operator approval",
  "Unresolved regressions stay blocked",
  "Regression groups",
  "Rollout regression checklist",
] as const;

export function buildDailyBetaOneRegressionReview(input: Omit<DailyBetaOneRegressionReview, "id"> & { idHint: string }): DailyBetaOneRegressionReview {
  const { idHint, ...packet } = input;
  return { id: buildDailyBetaOneRegressionReviewStableKey("daily-beta-1-regression-review", idHint, input.status), ...packet };
}

export function buildDailyBetaOneRegressionReviews(): DailyBetaOneRegressionReview[] {
  return [
    buildDailyBetaOneRegressionReview({
      idHint: "release-candidate-review-package",
      status: "blocked",
      dailyBetaOneRegressionIdentity: "Daily Beta 1 regression identity: daily-beta-1-regression-review-release-candidate-regressions.",
      regressionGroups: [
        "Regression groups: rollout regressions, feedback regressions, provider/local/connector/automation regressions, approval regressions, evidence regressions, result regressions, and recovery regressions.",
      ],
      rolloutRegressionChecklist: [
        "Rollout regression checklist: cohort guardrails, rollback language, rollout stop points, feedback return path, and no rollout auto-proceed remain intact.",
      ],
      feedbackRegressionChecklist: [
        "Feedback regression checklist: no feedback auto-ingestion, no memory mutation, no feedback data sending without approval, and no release approval automation.",
      ],
      providerLocalConnectorAutomationRegressionChecklist: [
        "Provider/local/connector/automation regression checklist: no provider calls, no local model calls, no connector calls, no automation creation, no background jobs, and no polling loops.",
      ],
      approvalEvidenceResultRecoveryRegressionChecklist: [
        "Approval/evidence/result/recovery regression checklist: no approval automation, no evidence ingestion, no result ingestion, no output persistence, no recovery trigger, and no policy auto-apply.",
      ],
      deniedRegressionActions: [
        "Denied regression actions: run tests, execute workflows, apply fixes, approve fixes, launch Daily Beta 1, call providers, call connectors, create automations, mutate files, or mutate memory.",
      ],
      unresolvedRegressionBlockers: [
        "Unresolved regression blockers: unreviewed safety regression, stale rollout blocker, missing evidence owner, missing recovery owner, and unresolved provider/local/connector/automation boundary question.",
      ],
      hardeningPassRoute: "Hardening pass route: /daily-beta-1-hardening-pass reviews hardening needs without applying fixes.",
      documentationRefreshRoute: "Documentation refresh route: /daily-beta-1-documentation-refresh reviews documentation updates without publishing them.",
      nextRecommendedAction: "Next recommended action: keep unresolved regressions blocked until regression owners approve any fix outside this page and evidence is reviewed separately.",
      advancedDailyBetaOneRegressionReviewDetails: "Advanced regression details: Daily Beta 1 regression review is review-only. Daily Beta 1 regression review does not run tests, regression fixes require explicit operator approval, and unresolved regressions stay blocked. It does not run tests, execute workflows, apply fixes, launch Daily Beta 1, call providers, call local models, call connectors, create automations, mutate files, mutate memory, store outputs, or create an MCP runtime.",
    }),
  ];
}

export function buildDailyBetaOneRegressionReviewBoundary(): DailyBetaOneRegressionReviewBoundary {
  return { reviewOnly: true, approvalRequired: true, actionExecutionAllowedFromUi: false, workflowExecutionAllowedFromUi: false, dailyBetaOneLaunchAllowedFromUi: false, rolloutExecutionAllowedFromUi: false, goLiveAllowedFromUi: false, approvalAutomationAllowedFromUi: false, approvalDecisionPersistenceAllowedFromUi: false, releaseSignoffAutomationAllowedFromUi: false, finalSafetySignoffAutomationAllowedFromUi: false, regressionTestExecutionAllowedFromUi: false, documentationPublishAllowedFromUi: false, releaseNotesPublishAllowedFromUi: false, handoffSendAllowedFromUi: false, feedbackIngestionAllowedFromUi: false, providerApiCallsAllowedFromUi: false, localModelCallsAllowedFromUi: false, localBridgeEndpointCallsAllowedFromUi: false, connectorApiCallsAllowedFromUi: false, automationCreationAllowedFromUi: false, fileMutationAllowedFromUi: false, memoryMutationAllowedFromUi: false, outputStorageAllowed: false, credentialStorageAllowed: false };
}

export function summarizeDailyBetaOneRegressionReview(model: Pick<DailyBetaOneRegressionReviewModel, "regressionReviews">): string {
  return "Daily Beta 1 regression review reviews " + model.regressionReviews.length + " regression posture. Daily Beta 1 regression review does not run tests, regression fixes require explicit operator approval, and unresolved regressions stay blocked.";
}

export function buildDailyBetaOneRegressionReviewModel(): DailyBetaOneRegressionReviewModel {
  const regressionReviews = buildDailyBetaOneRegressionReviews();
  const model: DailyBetaOneRegressionReviewModel = {
    title: "Daily Beta 1 regression review",
    summary: "",
    regressionReviews,
    boundary: buildDailyBetaOneRegressionReviewBoundary(),
    language: [...DAILY_BETA_ONE_REGRESSION_REVIEW_LANGUAGE],
    advancedDetails: [
      "Daily Beta 1 regression review",
      "Daily Beta 1 regression identity",
      "Regression groups",
      "Rollout regression checklist",
      "Feedback regression checklist",
      "Provider/local/connector/automation regression checklist",
      "Approval/evidence/result/recovery regression checklist",
      "Denied regression actions",
      "Unresolved regression blockers",
      "Hardening pass route",
      "Documentation refresh route",
      "Next recommended action",
      "Daily Beta 1 regression review does not run tests",
      "Regression fixes require explicit operator approval",
      "Unresolved regressions stay blocked",
      "Regression groups",
      "Rollout regression checklist",
      "advanced regression details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeDailyBetaOneRegressionReview(model) };
}
