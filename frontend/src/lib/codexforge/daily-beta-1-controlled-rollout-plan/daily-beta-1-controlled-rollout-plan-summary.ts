import type {
  DailyBetaOneControlledRolloutPlan,
  DailyBetaOneControlledRolloutPlanBoundary,
  DailyBetaOneControlledRolloutPlanModel,
} from "./daily-beta-1-controlled-rollout-plan-types";
import { buildDailyBetaOneControlledRolloutPlanStableKey } from "./daily-beta-1-controlled-rollout-plan-types";

export const DAILY_BETA_ONE_CONTROLLED_ROLLOUT_PLAN_LANGUAGE = [
  "Daily Beta 1 controlled rollout plan",
  "Daily Beta 1 controlled rollout plan does not execute rollout",
  "Rollout actions require explicit operator approval",
  "Unapproved rollout paths remain blocked",
  "Rollout stage groups",
  "Rollback checklist",
] as const;

export function buildDailyBetaOneControlledRolloutPlan(
  input: Omit<DailyBetaOneControlledRolloutPlan, "id"> & { idHint: string }
): DailyBetaOneControlledRolloutPlan {
  const { idHint, ...plan } = input;
  return {
    id: buildDailyBetaOneControlledRolloutPlanStableKey(
      "daily-beta-1-controlled-rollout-plan",
      idHint,
      input.status
    ),
    ...plan,
  };
}

export function buildDailyBetaOneControlledRolloutPlans(): DailyBetaOneControlledRolloutPlan[] {
  return [
    buildDailyBetaOneControlledRolloutPlan({
      idHint: "daily-beta-1-rollout-plan",
      status: "blocked",
      dailyBetaOneRolloutPlanIdentity:
        "Daily Beta 1 rollout plan identity: daily-beta-1-controlled-rollout-plan-daily-beta-1-rollout-plan.",
      rolloutStageGroups: [
        "Rollout stage groups: candidate review, operator cohort review, approval gate review, rollback review, monitoring review, and feedback review.",
      ],
      operatorCohortChecklist: [
        "Operator cohort checklist: initial operators, eligibility notes, safety owner, support owner, feedback owner, and rollback contact must be approved outside this page.",
      ],
      approvalGateChecklist: [
        "Approval gate checklist: release signoff, rollout owner approval, safety owner approval, rollback owner approval, feedback owner approval, and documentation owner approval.",
      ],
      rollbackChecklist: [
        "Rollback checklist: halt criteria, communication owner, evidence capture owner, blocked-path language, and recovery route must be reviewed before rollout.",
      ],
      monitoringReviewChecklist: [
        "Monitoring/review checklist: operator experience signals, safety blockers, regression signals, feedback triage, and rollout review route must stay review-only.",
      ],
      deniedRolloutActions: [
        "Denied rollout actions: execute rollout, launch Daily Beta 1, send notifications, create automations, schedule tasks, create background jobs, call providers, call connectors, or store rollout decisions.",
      ],
      unresolvedRolloutBlockers: [
        "Unresolved rollout blockers: missing cohort approval, incomplete rollback owner, unresolved release signoff blocker, unclear feedback triage, and missing rollout review owner.",
      ],
      dailyBetaOneRolloutReviewRoute:
        "Daily Beta 1 rollout review route: /daily-beta-1-rollout-review reviews rollout readiness without proceeding automatically.",
      dailyBetaOneFeedbackInboxRoute:
        "Daily Beta 1 feedback inbox route: /daily-beta-1-feedback-inbox reviews feedback without auto-ingesting feedback.",
      nextRecommendedAction:
        "Next recommended action: keep rollout blocked until the cohort, approval gate, rollback, monitoring, and feedback review owners approve outside this page.",
      advancedRolloutPlanDetails:
        "Advanced rollout plan details: Daily Beta 1 controlled rollout plan is review-only. Daily Beta 1 controlled rollout plan does not execute rollout, rollout actions require explicit operator approval, and unapproved rollout paths remain blocked. It does not launch Daily Beta 1, send notifications, create automations, schedule tasks, create background jobs, call providers, call local models, call connectors, store rollout decisions, or create an MCP runtime.",
    }),
  ];
}

export function buildDailyBetaOneControlledRolloutPlanBoundary(): DailyBetaOneControlledRolloutPlanBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    dailyBetaOneControlledRolloutPlanDoesNotExecuteRollout: true,
    rolloutActionsRequireExplicitOperatorApproval: true,
    unapprovedRolloutPathsRemainBlocked: true,
    rolloutExecutionAllowedFromUi: false,
    notificationSendingAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    outputStorageAllowed: false,
  };
}

export function summarizeDailyBetaOneControlledRolloutPlan(
  model: Pick<DailyBetaOneControlledRolloutPlanModel, "plans">
): string {
  return `Daily Beta 1 controlled rollout plan reviews ${model.plans.length} rollout plan without executing rollout. Rollout actions require explicit operator approval, and unapproved rollout paths remain blocked.`;
}

export function buildDailyBetaOneControlledRolloutPlanModel(): DailyBetaOneControlledRolloutPlanModel {
  const plans = buildDailyBetaOneControlledRolloutPlans();
  const model: DailyBetaOneControlledRolloutPlanModel = {
    title: "Daily Beta 1 controlled rollout plan",
    summary: "",
    plans,
    boundary: buildDailyBetaOneControlledRolloutPlanBoundary(),
    rolloutPlanLanguage: [...DAILY_BETA_ONE_CONTROLLED_ROLLOUT_PLAN_LANGUAGE],
    advancedDetails: [
      "Daily Beta 1 controlled rollout plan",
      "Daily Beta 1 rollout plan identity",
      "Rollout stage groups",
      "Operator cohort checklist",
      "Approval gate checklist",
      "Rollback checklist",
      "Monitoring/review checklist",
      "Denied rollout actions",
      "Unresolved rollout blockers",
      "Daily Beta 1 rollout review route",
      "Daily Beta 1 feedback inbox route",
      "Next recommended action",
      "Daily Beta 1 controlled rollout plan does not execute rollout",
      "Rollout actions require explicit operator approval",
      "Unapproved rollout paths remain blocked",
      "advanced rollout plan details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeDailyBetaOneControlledRolloutPlan(model) };
}
