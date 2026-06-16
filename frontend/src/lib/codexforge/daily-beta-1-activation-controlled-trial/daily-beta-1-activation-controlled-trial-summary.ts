import type { DailyBetaOneActivationControlledTrial, DailyBetaOneActivationControlledTrialBoundary, DailyBetaOneActivationControlledTrialModel } from "./daily-beta-1-activation-controlled-trial-types";
import { buildDailyBetaOneActivationControlledTrialStableKey } from "./daily-beta-1-activation-controlled-trial-types";

export const DAILY_BETA_ONE_ACTIVATION_CONTROLLED_TRIAL_LANGUAGE = [
  "Daily Beta 1 activation controlled trial",
  "Daily Beta 1 activation controlled trial does not execute workflows",
  "Daily Beta 1 controlled trial actions require explicit operator approval",
  "Unapproved Daily Beta 1 controlled trial paths remain blocked",
  "Controlled trial groups",
  "Operator task checklist",
] as const;

export function buildDailyBetaOneActivationControlledTrial(input: Omit<DailyBetaOneActivationControlledTrial, "id"> & { idHint: string }): DailyBetaOneActivationControlledTrial {
  const { idHint, ...controlledTrial } = input;
  return { id: buildDailyBetaOneActivationControlledTrialStableKey("daily-beta-1-activation-controlled-trial", idHint, input.status), ...controlledTrial };
}

export function buildDailyBetaOneActivationControlledTrials(): DailyBetaOneActivationControlledTrial[] {
  return [
    buildDailyBetaOneActivationControlledTrial({
      idHint: "daily-beta-1-activation-controlled-trial-packet",
      status: "blocked",
      dailyBetaOneControlledTrialIdentity: "Daily Beta 1 controlled trial identity: daily-beta-1-activation-controlled-trial-packet.",
      controlledTrialGroups: [
        "Controlled trial groups: operator task checklist, approval gate checklist, evidence/result/recovery checklist, live boundary checklist, denied controlled trial actions, unresolved controlled trial blockers, feedback review route, regression review route, and next recommended action.",
      ],
      operatorTaskChecklist: [
        "Operator task checklist: name the operator, task owner, rollback owner, evidence owner, stop condition, and manual approval path before any controlled trial request is considered outside this page.",
      ],
      approvalGateChecklist: [
        "Approval gate checklist: Daily Beta 1 controlled trial actions require explicit operator approval and unapproved Daily Beta 1 controlled trial paths remain blocked.",
      ],
      evidenceResultRecoveryChecklist: [
        "Evidence/result/recovery checklist: evidence is not auto-ingested, results are not stored, recovery is not triggered, and hardening is not applied from this UI.",
      ],
      liveBoundaryChecklist: [
        "Live boundary checklist: provider calls, local model calls, connector calls, automation creation, workflow execution, polling, notifications, tests, file mutation, and memory mutation remain blocked from UI.",
      ],
      deniedControlledTrialActions: [
        "Denied controlled trial actions: execute workflows, run controlled trials, activate Daily Beta 1, call providers, call local models, call connectors, create automations, schedule tasks, create watches, send notifications, run tests, mutate files, mutate memory, persist approvals, store outputs, or store credentials.",
      ],
      unresolvedControlledTrialBlockers: [
        "Unresolved controlled trial blockers: missing explicit approval, missing operator owner, missing rollback owner, missing live boundary approval, unreviewed feedback route, and unreviewed regression route.",
      ],
      feedbackReviewRoute: "Feedback review route: /daily-beta-1-activation-feedback-review reviews activation feedback without auto-ingesting feedback.",
      regressionReviewRoute: "Regression review route: /daily-beta-1-activation-regression-review reviews activation regressions without running tests.",
      nextRecommendedAction: "Next recommended action: keep controlled trial paths blocked, review feedback and regression surfaces, then request explicit operator approval outside this page.",
      advancedDailyBetaOneActivationControlledTrialDetails: "Advanced Daily Beta 1 activation controlled trial details: Daily Beta 1 activation controlled trial is review-only. Daily Beta 1 activation controlled trial does not execute workflows, Daily Beta 1 controlled trial actions require explicit operator approval, and unapproved Daily Beta 1 controlled trial paths remain blocked. It does not execute workflows, run controlled trials, activate Daily Beta 1, call providers, call local models, call connectors, create automations, schedule tasks, create watches, send notifications, run tests, mutate files, mutate memory, persist approvals, store outputs, store credentials, or create an MCP runtime.",
    }),
  ];
}

export function buildDailyBetaOneActivationControlledTrialBoundary(): DailyBetaOneActivationControlledTrialBoundary {
  return { reviewOnly: true, approvalRequired: true, controlledTrialExecutionAllowedFromUi: false, workflowExecutionAllowedFromUi: false, dailyBetaOneActivationAllowedFromUi: false, providerApiCallsAllowedFromUi: false, localModelCallsAllowedFromUi: false, connectorApiCallsAllowedFromUi: false, automationCreationAllowedFromUi: false, approvalDecisionPersistenceAllowedFromUi: false, fileMutationAllowedFromUi: false, memoryMutationAllowedFromUi: false, outputStorageAllowed: false, credentialStorageAllowed: false };
}

export function summarizeDailyBetaOneActivationControlledTrial(model: Pick<DailyBetaOneActivationControlledTrialModel, "controlledTrials">): string {
  return "Daily Beta 1 activation controlled trial previews " + model.controlledTrials.length + " controlled trial packet without executing workflows. Daily Beta 1 controlled trial actions require explicit operator approval, and unapproved Daily Beta 1 controlled trial paths remain blocked.";
}

export function buildDailyBetaOneActivationControlledTrialModel(): DailyBetaOneActivationControlledTrialModel {
  const controlledTrials = buildDailyBetaOneActivationControlledTrials();
  const model: DailyBetaOneActivationControlledTrialModel = {
    title: "Daily Beta 1 activation controlled trial",
    summary: "",
    controlledTrials,
    boundary: buildDailyBetaOneActivationControlledTrialBoundary(),
    language: [...DAILY_BETA_ONE_ACTIVATION_CONTROLLED_TRIAL_LANGUAGE],
    advancedDetails: [
      "Daily Beta 1 activation controlled trial",
      "Daily Beta 1 controlled trial identity",
      "Controlled trial groups",
      "Operator task checklist",
      "Approval gate checklist",
      "Evidence/result/recovery checklist",
      "Live boundary checklist",
      "Denied controlled trial actions",
      "Unresolved controlled trial blockers",
      "Feedback review route",
      "Regression review route",
      "Next recommended action",
      "Daily Beta 1 activation controlled trial does not execute workflows",
      "Daily Beta 1 controlled trial actions require explicit operator approval",
      "Unapproved Daily Beta 1 controlled trial paths remain blocked",
      "advanced Daily Beta 1 activation controlled trial details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeDailyBetaOneActivationControlledTrial(model) };
}
