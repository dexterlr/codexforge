import type {
  BetaTwoControlledOperatorTrial,
  BetaTwoControlledOperatorTrialBoundary,
  BetaTwoControlledOperatorTrialModel,
} from "./beta-2-controlled-operator-trial-types";
import { buildBetaTwoControlledOperatorTrialStableKey } from "./beta-2-controlled-operator-trial-types";

export const BETA_TWO_CONTROLLED_OPERATOR_TRIAL_LANGUAGE = [
  "Beta 2 controlled operator trial",
  "Beta 2 controlled operator trial does not execute workflows",
  "Beta 2 trial actions require explicit operator approval",
  "Unapproved Beta 2 trial paths remain blocked",
  "Trial stage groups",
  "Operator task checklist",
] as const;

export function buildBetaTwoControlledOperatorTrial(
  input: Omit<BetaTwoControlledOperatorTrial, "id"> & { idHint: string }
): BetaTwoControlledOperatorTrial {
  const { idHint, ...trial } = input;
  return {
    id: buildBetaTwoControlledOperatorTrialStableKey("beta-2-controlled-operator-trial", idHint, input.status),
    ...trial,
  };
}

export function buildBetaTwoControlledOperatorTrials(): BetaTwoControlledOperatorTrial[] {
  return [
    buildBetaTwoControlledOperatorTrial({
      idHint: "review-only-controlled-trial",
      status: "blocked",
      betaTwoControlledOperatorTrialIdentity:
        "Beta 2 controlled operator trial identity: beta-2-controlled-operator-trial-review-only-controlled-trial.",
      trialStageGroups: [
        "Trial stage groups: setup review, operator task review, approval gate review, evidence/result review, feedback review handoff, and hardening handoff.",
      ],
      operatorTaskChecklist: [
        "Operator task checklist: tasks are previewed only, no workflow is executed, no provider is called, no local model is called, no connector is called, and no automation is created.",
      ],
      approvalGateChecklist: [
        "Approval gate checklist: Beta 2 trial actions require explicit operator approval and unapproved Beta 2 trial paths remain blocked.",
      ],
      evidenceResultChecklist: [
        "Evidence/result checklist: evidence and results are reviewed before use; outputs are not persisted, ingested, exported, or promoted automatically.",
      ],
      deniedTrialActions: [
        "Denied trial actions: execute workflows, call providers, call local models, call connectors, create automations, store outputs, mutate files, or mutate memory.",
      ],
      blockedTrialRisks: [
        "Blocked trial risks: unapproved Beta 2 trial paths remain blocked until explicit operator approval resolves them outside this page.",
      ],
      operatorFeedbackReviewRoute:
        "Operator feedback review route: /beta-2-operator-feedback-review reviews trial feedback without auto-ingesting it.",
      betaTwoHardeningRoute:
        "Beta 2 hardening route: /beta-2-hardening-pass summarizes hardening needs without applying changes.",
      nextRecommendedAction:
        "Next recommended action: keep the controlled operator trial blocked, review approval gates, and capture feedback only after explicit operator review.",
      advancedTrialDetails:
        "Advanced trial details: Beta 2 controlled operator trial is review-only. Beta 2 controlled operator trial does not execute workflows, Beta 2 trial actions require explicit operator approval, and unapproved Beta 2 trial paths remain blocked. It does not call providers, call local models, call connectors, create automations, store outputs, mutate files, mutate memory, or ingest feedback automatically.",
    }),
  ];
}

export function buildBetaTwoControlledOperatorTrialBoundary(): BetaTwoControlledOperatorTrialBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    betaTwoControlledOperatorTrialDoesNotExecuteWorkflows: true,
    betaTwoTrialActionsRequireExplicitOperatorApproval: true,
    unapprovedBetaTwoTrialPathsRemainBlocked: true,
    actionsExecutedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    memoryMutationAllowedFromUi: false,
  };
}

export function summarizeBetaTwoControlledOperatorTrial(
  model: Pick<BetaTwoControlledOperatorTrialModel, "trials">
): string {
  return `Beta 2 controlled operator trial previews ${model.trials.length} trial posture without executing workflows. Beta 2 trial actions require explicit operator approval, and unapproved Beta 2 trial paths remain blocked.`;
}

export function buildBetaTwoControlledOperatorTrialModel(): BetaTwoControlledOperatorTrialModel {
  const trials = buildBetaTwoControlledOperatorTrials();
  const model: BetaTwoControlledOperatorTrialModel = {
    title: "Beta 2 controlled operator trial",
    summary: "",
    trials,
    boundary: buildBetaTwoControlledOperatorTrialBoundary(),
    trialLanguage: [...BETA_TWO_CONTROLLED_OPERATOR_TRIAL_LANGUAGE],
    advancedDetails: [
      "Beta 2 controlled operator trial",
      "Beta 2 controlled operator trial identity",
      "Trial stage groups",
      "Operator task checklist",
      "approval gate checklist",
      "evidence/result checklist",
      "denied trial actions",
      "blocked trial risks",
      "operator feedback review route",
      "Beta 2 hardening route",
      "next recommended action",
      "Beta 2 controlled operator trial does not execute workflows",
      "Beta 2 trial actions require explicit operator approval",
      "Unapproved Beta 2 trial paths remain blocked",
      "advanced trial details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeBetaTwoControlledOperatorTrial(model) };
}
