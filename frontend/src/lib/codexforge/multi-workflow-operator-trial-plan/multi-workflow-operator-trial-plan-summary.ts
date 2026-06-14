import type {
  MultiWorkflowOperatorTrialPlan,
  MultiWorkflowOperatorTrialPlanBoundary,
  MultiWorkflowOperatorTrialPlanModel,
} from "./multi-workflow-operator-trial-plan-types";
import { buildMultiWorkflowOperatorTrialPlanStableKey } from "./multi-workflow-operator-trial-plan-types";

export const MULTI_WORKFLOW_OPERATOR_TRIAL_PLAN_LANGUAGE = [
  "Multi-workflow operator trial plan",
  "Multi-workflow operator trial plan does not execute workflows",
  "Multi-workflow trials require explicit operator approval",
  "Unapproved workflow plans remain blocked",
  "Workflow candidate groups",
  "Operator task checklist",
] as const;

export function buildMultiWorkflowOperatorTrialPlan(
  input: Omit<MultiWorkflowOperatorTrialPlan, "id"> & { idHint: string }
): MultiWorkflowOperatorTrialPlan {
  const { idHint, ...plan } = input;
  return {
    id: buildMultiWorkflowOperatorTrialPlanStableKey("multi-workflow-operator-trial-plan", idHint, input.status),
    ...plan,
  };
}

export function buildMultiWorkflowOperatorTrialPlans(): MultiWorkflowOperatorTrialPlan[] {
  return [
    buildMultiWorkflowOperatorTrialPlan({
      idHint: "daily-provider-local-connector-automation-plan",
      status: "blocked",
      multiWorkflowTrialPlanIdentity:
        "Multi-workflow trial plan identity: multi-workflow-operator-trial-plan-daily-provider-local-connector-automation-plan.",
      workflowCandidateGroups: [
        "Workflow candidate groups: daily operator intake, provider-assisted draft review, local model draft review, connector evidence review, automation handoff review, and recovery review.",
      ],
      operatorTaskChecklist: [
        "Operator task checklist: choose candidate workflows, confirm allowed scope, identify private data, assign review owner, and keep every lane blocked until approval exists.",
      ],
      approvalGateChecklist: [
        "Approval gate checklist: exact action, bounded lane, expected output, evidence owner, result review owner, recovery owner, and rollback note must be reviewed outside this page.",
      ],
      providerLocalConnectorAutomationHandoffChecklist: [
        "Provider/local/connector/automation handoff checklist: provider calls, local model calls, connector reads, automation creation, notifications, schedules, and background jobs remain denied here.",
      ],
      evidenceResultRecoveryChecklist: [
        "Evidence/result/recovery checklist: each candidate needs source evidence, result acceptance criteria, privacy review, and recovery path before any separate approved trial.",
      ],
      deniedPlanningActions: [
        "Denied planning actions: execute workflows, launch trials, call providers, call local models, call local bridge endpoints, call connectors, create automations, persist outputs, mutate files, or mutate memory.",
      ],
      unresolvedPlanningBlockers: [
        "Unresolved planning blockers: unapproved workflow lanes, missing evidence owner, unclear result reuse, incomplete recovery path, and missing regression review.",
      ],
      multiWorkflowTrialReviewRoute:
        "Multi-workflow trial review route: /multi-workflow-trial-review compares candidates without launching trials.",
      multiWorkflowRegressionRoute:
        "Multi-workflow regression route: /multi-workflow-regression-review reviews regressions without running tests.",
      nextRecommendedAction:
        "Next recommended action: keep the multi-workflow operator trial plan blocked until explicit operator approval and review owners are recorded outside this page.",
      advancedPlanningDetails:
        "Advanced planning details: multi-workflow operator trial plan is review-only. Multi-workflow operator trial plan does not execute workflows, multi-workflow trials require explicit operator approval, and unapproved workflow plans remain blocked. It does not call providers, call local models, call connectors, create automations, launch trials, persist outputs, write files, mutate memory, or create an MCP runtime.",
    }),
  ];
}

export function buildMultiWorkflowOperatorTrialPlanBoundary(): MultiWorkflowOperatorTrialPlanBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    multiWorkflowOperatorTrialPlanDoesNotExecuteWorkflows: true,
    multiWorkflowTrialsRequireExplicitOperatorApproval: true,
    unapprovedWorkflowPlansRemainBlocked: true,
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

export function summarizeMultiWorkflowOperatorTrialPlan(
  model: Pick<MultiWorkflowOperatorTrialPlanModel, "plans">
): string {
  return `Multi-workflow operator trial plan prepares ${model.plans.length} review-only plan without executing workflows. Multi-workflow trials require explicit operator approval, and unapproved workflow plans remain blocked.`;
}

export function buildMultiWorkflowOperatorTrialPlanModel(): MultiWorkflowOperatorTrialPlanModel {
  const plans = buildMultiWorkflowOperatorTrialPlans();
  const model: MultiWorkflowOperatorTrialPlanModel = {
    title: "Multi-workflow operator trial plan",
    summary: "",
    plans,
    boundary: buildMultiWorkflowOperatorTrialPlanBoundary(),
    planningLanguage: [...MULTI_WORKFLOW_OPERATOR_TRIAL_PLAN_LANGUAGE],
    advancedDetails: [
      "Multi-workflow operator trial plan",
      "Multi-workflow trial plan identity",
      "Workflow candidate groups",
      "Operator task checklist",
      "Approval gate checklist",
      "Provider/local/connector/automation handoff checklist",
      "Evidence/result/recovery checklist",
      "Denied planning actions",
      "Unresolved planning blockers",
      "Multi-workflow trial review route",
      "Multi-workflow regression route",
      "Next recommended action",
      "Multi-workflow operator trial plan does not execute workflows",
      "Multi-workflow trials require explicit operator approval",
      "Unapproved workflow plans remain blocked",
      "advanced planning details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeMultiWorkflowOperatorTrialPlan(model) };
}
