import type {
  RealDailyWorkflowRecoveryReview,
  RealDailyWorkflowRecoveryReviewBoundary,
  RealDailyWorkflowRecoveryReviewModel,
} from "./real-daily-workflow-recovery-review-types";
import { buildRealDailyWorkflowRecoveryReviewStableKey } from "./real-daily-workflow-recovery-review-types";

export const REAL_DAILY_WORKFLOW_RECOVERY_REVIEW_LANGUAGE = [
  "Real daily workflow recovery review",
  "Real daily workflow recovery review does not trigger recovery",
  "Recovery actions require explicit operator approval",
  "Unsafe recovery shortcuts remain blocked",
  "Recovery groups",
  "Rollback checklist",
] as const;

export function buildRealDailyWorkflowRecoveryReview(
  input: Omit<RealDailyWorkflowRecoveryReview, "id"> & { idHint: string }
): RealDailyWorkflowRecoveryReview {
  const { idHint, ...review } = input;
  return {
    id: buildRealDailyWorkflowRecoveryReviewStableKey("real-daily-workflow-recovery-review", idHint, input.status),
    ...review,
  };
}

export function buildRealDailyWorkflowRecoveryReviews(): RealDailyWorkflowRecoveryReview[] {
  return [
    buildRealDailyWorkflowRecoveryReview({
      idHint: "rollback-escalation-review",
      status: "blocked",
      realDailyWorkflowRecoveryIdentity:
        "Real daily workflow recovery identity: real-daily-workflow-recovery-review-rollback-escalation-review.",
      recoveryGroups: [
        "Recovery groups: failure category, operator stop condition, rollback owner, escalation owner, evidence snapshot, result disposition, and hardening follow-up.",
      ],
      failureCategories: [
        "Failure categories: approval mismatch, evidence gap, unsafe result, provider boundary missing, local boundary missing, connector privacy risk, automation schedule risk, and file mutation risk.",
      ],
      rollbackChecklist: [
        "Rollback checklist: rollback owner, exact scope, safe stop condition, evidence link, result disposition, and no automatic file mutation are reviewed before any separate action.",
      ],
      escalationChecklist: [
        "Escalation checklist: operator owner, policy owner, privacy owner, recovery owner, and release owner must be identified for unsafe or ambiguous paths.",
      ],
      deniedRecoveryShortcuts: [
        "Denied recovery shortcuts: trigger recovery, rerun workflow, apply patch, mutate files, mutate memory, call providers, call local models, call connectors, create automations, or bypass approval.",
      ],
      blockedRecoveryRisks: [
        "Blocked recovery risks: unclear rollback scope, unsafe shortcut request, missing owner, private evidence, unresolved result risk, and hardening dependency.",
      ],
      realDailyWorkflowHardeningRoute:
        "Real daily workflow hardening route: /real-daily-workflow-hardening-pass reviews hardening needs without applying changes.",
      releaseReadinessDashboardRoute:
        "Release readiness dashboard route: /release-readiness-dashboard keeps unresolved release risks blocked.",
      nextRecommendedAction:
        "Next recommended action: keep recovery options review-only until rollback and escalation checklists have explicit operator approval.",
      advancedRecoveryDetails:
        "Advanced recovery details: real daily workflow recovery review is review-only. Real daily workflow recovery review does not trigger recovery, recovery actions require explicit operator approval, and unsafe recovery shortcuts remain blocked. It does not execute workflows, apply patches, mutate files, mutate memory, call providers, call local models, call connectors, create automations, or create an MCP runtime.",
    }),
  ];
}

export function buildRealDailyWorkflowRecoveryReviewBoundary(): RealDailyWorkflowRecoveryReviewBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    realDailyWorkflowRecoveryReviewDoesNotTriggerRecovery: true,
    recoveryActionsRequireExplicitOperatorApproval: true,
    unsafeRecoveryShortcutsRemainBlocked: true,
    recoveryTriggerAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    hardeningApplyAllowedFromUi: false,
    memoryMutationAllowedFromUi: false,
  };
}

export function summarizeRealDailyWorkflowRecoveryReview(
  model: Pick<RealDailyWorkflowRecoveryReviewModel, "reviews">
): string {
  return `Real daily workflow recovery review summarizes ${model.reviews.length} recovery posture without triggering recovery. Recovery actions require explicit operator approval, and unsafe recovery shortcuts remain blocked.`;
}

export function buildRealDailyWorkflowRecoveryReviewModel(): RealDailyWorkflowRecoveryReviewModel {
  const reviews = buildRealDailyWorkflowRecoveryReviews();
  const model: RealDailyWorkflowRecoveryReviewModel = {
    title: "Real daily workflow recovery review",
    summary: "",
    reviews,
    boundary: buildRealDailyWorkflowRecoveryReviewBoundary(),
    recoveryLanguage: [...REAL_DAILY_WORKFLOW_RECOVERY_REVIEW_LANGUAGE],
    advancedDetails: [
      "Real daily workflow recovery review",
      "Real daily workflow recovery identity",
      "Recovery groups",
      "Failure categories",
      "Rollback checklist",
      "Escalation checklist",
      "Denied recovery shortcuts",
      "Blocked recovery risks",
      "Real daily workflow hardening route",
      "Release readiness dashboard route",
      "Next recommended action",
      "Real daily workflow recovery review does not trigger recovery",
      "Recovery actions require explicit operator approval",
      "Unsafe recovery shortcuts remain blocked",
      "advanced recovery details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeRealDailyWorkflowRecoveryReview(model) };
}
