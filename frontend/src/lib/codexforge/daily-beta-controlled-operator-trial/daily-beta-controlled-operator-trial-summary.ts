import type {
  DailyBetaControlledOperatorTrial,
  DailyBetaControlledOperatorTrialBoundary,
  DailyBetaControlledOperatorTrialModel,
} from "./daily-beta-controlled-operator-trial-types";
import { buildDailyBetaControlledOperatorTrialStableKey } from "./daily-beta-controlled-operator-trial-types";

export const DAILY_BETA_CONTROLLED_OPERATOR_TRIAL_LANGUAGE = [
  "Daily Beta controlled operator trial",
  "Daily Beta controlled operator trial does not execute workflows",
  "Daily Beta trial actions require explicit operator approval",
  "Unapproved Daily Beta trial paths remain blocked",
  "Daily beta trial groups",
  "Operator task checklist",
] as const;

export function buildDailyBetaControlledOperatorTrial(
  input: Omit<DailyBetaControlledOperatorTrial, "id"> & { idHint: string }
): DailyBetaControlledOperatorTrial {
  const { idHint, ...trial } = input;
  return {
    id: buildDailyBetaControlledOperatorTrialStableKey("daily-beta-controlled-operator-trial", idHint, input.status),
    ...trial,
  };
}

export function buildDailyBetaControlledOperatorTrials(): DailyBetaControlledOperatorTrial[] {
  return [
    buildDailyBetaControlledOperatorTrial({
      idHint: "review-only-daily-beta-trial",
      status: "blocked",
      dailyBetaControlledOperatorTrialIdentity:
        "Daily Beta controlled operator trial identity: daily-beta-controlled-operator-trial-review-only-daily-beta-trial.",
      dailyBetaTrialGroups: [
        "Daily beta trial groups: morning planning workflow, provider draft review workflow, connector evidence review workflow, automation handoff review workflow, result review workflow, and recovery review workflow.",
      ],
      operatorTaskChecklist: [
        "Operator task checklist: confirm the trial goal, private data boundary, expected output, stop condition, evidence owner, result owner, feedback owner, and recovery owner.",
      ],
      approvalGateChecklist: [
        "Approval gate checklist: Daily Beta trial actions require explicit operator approval, bounded execution lane, rollback owner, and separate approved backend boundary before any real action.",
      ],
      evidenceResultRecoveryChecklist: [
        "Evidence/result/recovery checklist: evidence capture, result acceptance, unsafe output handling, feedback review, recovery route, and hardening route stay visible.",
      ],
      deniedTrialActions: [
        "Denied trial actions: execute workflows, launch Daily Beta trial, call providers, call local models, call connectors, create automations, store outputs, write files, or mutate memory.",
      ],
      unresolvedDailyBetaTrialBlockers: [
        "Unresolved daily beta trial blockers: missing approval owner, missing evidence owner, unresolved Daily Beta release blocker, unsafe output handling, and incomplete feedback review.",
      ],
      dailyBetaFeedbackReviewRoute:
        "Daily Beta feedback review route: /daily-beta-feedback-review reviews Daily Beta feedback without auto-ingesting feedback.",
      dailyBetaHardeningRoute:
        "Daily Beta hardening route: /beta-2-hardening-pass remains the existing hardening review surface until a Daily Beta hardening route is approved.",
      nextRecommendedAction:
        "Next recommended action: keep Daily Beta trial actions blocked until approval gates and feedback review ownership are complete outside this page.",
      advancedTrialDetails:
        "Advanced trial details: Daily Beta controlled operator trial is review-only. Daily Beta controlled operator trial does not execute workflows, Daily Beta trial actions require explicit operator approval, and unapproved Daily Beta trial paths remain blocked. It does not execute workflows, call providers, call local models, call connectors, create automations, store outputs, write files, mutate memory, or create an MCP runtime.",
    }),
  ];
}

export function buildDailyBetaControlledOperatorTrialBoundary(): DailyBetaControlledOperatorTrialBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    dailyBetaControlledOperatorTrialDoesNotExecuteWorkflows: true,
    dailyBetaTrialActionsRequireExplicitOperatorApproval: true,
    unapprovedDailyBetaTrialPathsRemainBlocked: true,
    workflowExecutionAllowedFromUi: false,
    trialLaunchAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    outputStorageAllowed: false,
    fileMutationAllowedFromUi: false,
    memoryMutationAllowedFromUi: false,
  };
}

export function summarizeDailyBetaControlledOperatorTrial(
  model: Pick<DailyBetaControlledOperatorTrialModel, "trials">
): string {
  return `Daily Beta controlled operator trial previews ${model.trials.length} Daily Beta trial posture without executing workflows. Daily Beta trial actions require explicit operator approval, and unapproved Daily Beta trial paths remain blocked.`;
}

export function buildDailyBetaControlledOperatorTrialModel(): DailyBetaControlledOperatorTrialModel {
  const trials = buildDailyBetaControlledOperatorTrials();
  const model: DailyBetaControlledOperatorTrialModel = {
    title: "Daily Beta controlled operator trial",
    summary: "",
    trials,
    boundary: buildDailyBetaControlledOperatorTrialBoundary(),
    trialLanguage: [...DAILY_BETA_CONTROLLED_OPERATOR_TRIAL_LANGUAGE],
    advancedDetails: [
      "Daily Beta controlled operator trial",
      "Daily Beta controlled operator trial identity",
      "Daily beta trial groups",
      "Operator task checklist",
      "Approval gate checklist",
      "Evidence/result/recovery checklist",
      "Denied trial actions",
      "Unresolved daily beta trial blockers",
      "Daily Beta feedback review route",
      "Daily Beta hardening route",
      "Next recommended action",
      "Daily Beta controlled operator trial does not execute workflows",
      "Daily Beta trial actions require explicit operator approval",
      "Unapproved Daily Beta trial paths remain blocked",
      "advanced trial details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeDailyBetaControlledOperatorTrial(model) };
}
