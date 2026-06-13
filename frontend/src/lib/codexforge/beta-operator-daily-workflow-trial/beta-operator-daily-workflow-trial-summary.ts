import type {
  BetaOperatorDailyWorkflowTrial,
  BetaOperatorDailyWorkflowTrialBoundary,
  BetaOperatorDailyWorkflowTrialModel,
} from "./beta-operator-daily-workflow-trial-types";
import { buildBetaOperatorDailyWorkflowTrialStableKey } from "./beta-operator-daily-workflow-trial-types";

export const BETA_OPERATOR_DAILY_WORKFLOW_TRIAL_LANGUAGE = [
  "Beta operator daily workflow trial",
  "Beta operator daily workflow trial does not execute actions",
  "Beta workflow actions require explicit operator approval",
  "Unapproved daily workflow paths remain blocked",
  "Daily workflow stage groups",
  "Operator goals checklist",
] as const;

export function buildBetaOperatorDailyWorkflowTrial(
  input: Omit<BetaOperatorDailyWorkflowTrial, "id"> & { idHint: string }
): BetaOperatorDailyWorkflowTrial {
  const { idHint, ...trial } = input;
  return {
    id: buildBetaOperatorDailyWorkflowTrialStableKey("beta-operator-daily-workflow-trial", idHint, input.status),
    ...trial,
  };
}

export function buildBetaOperatorDailyWorkflowTrials(): BetaOperatorDailyWorkflowTrial[] {
  return [
    buildBetaOperatorDailyWorkflowTrial({
      idHint: "review-only-daily-flow",
      status: "ready-for-review",
      betaDailyWorkflowIdentity:
        "Beta daily workflow identity: beta-operator-daily-workflow-trial-review-only-daily-flow.",
      dailyWorkflowStageGroups: [
        "Daily workflow stage groups: morning review, approval queue, result review, safety check, friction capture, failure recovery review, and end-of-day handoff.",
        "Daily workflow stage groups: each stage is a realistic operator review checkpoint and does not execute actions.",
      ],
      operatorGoalsChecklist: [
        "Operator goals checklist: understand what needs review, decide what stays blocked, identify friction, and prepare safe next actions without launching workflows.",
      ],
      safetyApprovalChecklist: [
        "Safety/approval checklist: beta workflow actions require explicit operator approval, unapproved daily workflow paths remain blocked, and approval decisions are not persisted here.",
      ],
      deniedDailyWorkflowActions: [
        "Denied daily workflow actions: execute workflows, call providers, call local models, call connectors, create automations, approve actions, create reminders, schedule tasks, send notifications, mutate files, or mutate memory.",
      ],
      blockedDailyWorkflowRisks: [
        "Blocked daily workflow risks: missing approval, unclear feedback, unsafe shortcut, connector data risk, provider output risk, automation risk, file mutation risk, and memory mutation risk.",
        "Blocked daily workflow risks: unapproved daily workflow paths remain blocked.",
      ],
      betaWorkflowReviewRoute:
        "Beta workflow review route: /beta-operator-daily-workflow-review reviews usability and safety feedback before use.",
      frictionPatchRoute:
        "Friction patch route: /beta-operator-workflow-friction-patch proposes usability patches without applying them.",
      nextRecommendedAction:
        "Next recommended action: review the daily workflow stage groups, confirm operator goals, and keep all beta workflow actions behind explicit approval.",
      advancedDailyWorkflowDetails:
        "Advanced daily workflow details: beta operator daily workflow trial is review-only. Beta operator daily workflow trial does not execute actions, beta workflow actions require explicit operator approval, and unapproved daily workflow paths remain blocked. It does not execute workflows, run actions, call providers, send prompts, call local models, call local bridge endpoints, call connectors, fetch connector data, store connector data, create automations, execute automations, create reminders, schedule tasks, create watches, create polling loops, create background jobs, send notifications, approve actions, persist approval decisions, store outputs, ingest feedback, ingest evidence, promote memory, mutate Brain graph, call appendEvent, call saveBrainGraph, apply patches, mutate files, write files, run tests, run builds, run smoke checks, run shell commands, run git commands, execute plugins, execute tools, execute agents, create MCP runtimes, store credentials, print process.env, display secrets, remove route coverage, install packages, or vendor Ruflo/Odysseus code.",
    }),
    buildBetaOperatorDailyWorkflowTrial({
      idHint: "blocked-unapproved-daily-path",
      status: "blocked",
      betaDailyWorkflowIdentity:
        "Beta daily workflow identity: beta-operator-daily-workflow-trial-blocked-unapproved-daily-path.",
      dailyWorkflowStageGroups: [
        "Daily workflow stage groups: blocked because a daily path lacks explicit operator approval.",
      ],
      operatorGoalsChecklist: [
        "Operator goals checklist: blocked until the operator confirms review goals.",
      ],
      safetyApprovalChecklist: [
        "Safety/approval checklist: blocked because beta workflow actions require explicit operator approval.",
      ],
      deniedDailyWorkflowActions: [
        "Denied daily workflow actions: no workflow execution, no provider calls, no connector calls, no automations, and no file mutation.",
      ],
      blockedDailyWorkflowRisks: [
        "Blocked daily workflow risks: unapproved daily workflow paths remain blocked.",
      ],
      betaWorkflowReviewRoute:
        "Beta workflow review route: /beta-operator-daily-workflow-review remains review-only.",
      frictionPatchRoute:
        "Friction patch route: /beta-operator-workflow-friction-patch remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep the daily workflow blocked until approval and safety clarity are reviewed.",
      advancedDailyWorkflowDetails:
        "Advanced daily workflow details: blocked daily workflow paths cannot execute actions or create automations from this page.",
    }),
  ];
}

export function buildBetaOperatorDailyWorkflowTrialBoundary(): BetaOperatorDailyWorkflowTrialBoundary {
  return {
    betaOperatorDailyWorkflowTrialReviewOnly: true,
    betaOperatorDailyWorkflowTrialDoesNotExecuteActions: true,
    betaWorkflowActionsRequireExplicitOperatorApproval: true,
    unapprovedDailyWorkflowPathsRemainBlocked: true,
    actionsExecutedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    automationExecutionAllowedFromUi: false,
    feedbackIngestionAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    memoryIngestionAllowedFromUi: false,
    approvalDecisionPersistenceAllowedFromUi: false,
  };
}

export function summarizeBetaOperatorDailyWorkflowTrial(
  model: Pick<BetaOperatorDailyWorkflowTrialModel, "trials">
): string {
  return `Beta operator daily workflow trial previews ${model.trials.length} daily workflow posture(s) without executing actions. Beta operator daily workflow trial does not execute actions, beta workflow actions require explicit operator approval, and unapproved daily workflow paths remain blocked.`;
}

export function buildBetaOperatorDailyWorkflowTrialModel(): BetaOperatorDailyWorkflowTrialModel {
  const trials = buildBetaOperatorDailyWorkflowTrials();
  const model: BetaOperatorDailyWorkflowTrialModel = {
    title: "Beta operator daily workflow trial",
    summary: "",
    trials,
    boundary: buildBetaOperatorDailyWorkflowTrialBoundary(),
    dailyWorkflowLanguage: [...BETA_OPERATOR_DAILY_WORKFLOW_TRIAL_LANGUAGE],
    advancedDetails: [
      "Beta operator daily workflow trial",
      "beta daily workflow identity",
      "Daily workflow stage groups",
      "Operator goals checklist",
      "safety/approval checklist",
      "denied daily workflow actions",
      "blocked daily workflow risks",
      "beta workflow review route",
      "friction patch route",
      "next recommended action",
      "Beta operator daily workflow trial does not execute actions",
      "Beta workflow actions require explicit operator approval",
      "Unapproved daily workflow paths remain blocked",
      "advanced daily workflow details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeBetaOperatorDailyWorkflowTrial(model) };
}
