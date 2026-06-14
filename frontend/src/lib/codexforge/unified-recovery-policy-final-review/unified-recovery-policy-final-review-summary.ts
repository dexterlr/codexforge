import type {
  UnifiedRecoveryPolicyFinalReview,
  UnifiedRecoveryPolicyFinalReviewBoundary,
  UnifiedRecoveryPolicyFinalReviewModel,
} from "./unified-recovery-policy-final-review-types";
import { buildUnifiedRecoveryPolicyFinalReviewStableKey } from "./unified-recovery-policy-final-review-types";

export const UNIFIED_RECOVERY_POLICY_FINAL_REVIEW_LANGUAGE = [
  "Unified recovery policy final review",
  "Unified recovery policy final review does not trigger recovery",
  "Recovery policy changes require explicit operator approval",
  "Unsafe recovery shortcuts stay blocked",
  "Recovery groups",
  "Provider local connector automation recovery matrix",
] as const;

export function buildUnifiedRecoveryPolicyFinalReview(
  input: Omit<UnifiedRecoveryPolicyFinalReview, "id"> & { idHint: string }
): UnifiedRecoveryPolicyFinalReview {
  const { idHint, ...review } = input;
  return {
    id: buildUnifiedRecoveryPolicyFinalReviewStableKey("unified-recovery-policy-final-review", idHint, input.status),
    ...review,
  };
}

export function buildUnifiedRecoveryPolicyFinalReviews(): UnifiedRecoveryPolicyFinalReview[] {
  return [
    buildUnifiedRecoveryPolicyFinalReview({
      idHint: "rollback-escalation-matrix",
      status: "blocked",
      unifiedRecoveryPolicyIdentity:
        "Unified recovery policy identity: unified-recovery-policy-final-review-rollback-escalation-matrix.",
      recoveryGroups: [
        "Recovery groups: provider response failure, local model failure, connector permission failure, automation schedule failure, result rejection, evidence conflict, policy mismatch, and operator escalation.",
      ],
      rollbackChecklist: [
        "Rollback checklist: rollback scope, owner, trigger, stop condition, evidence requirement, file mutation boundary, and manual approval state must be reviewed before recovery elsewhere.",
      ],
      escalationChecklist: [
        "Escalation checklist: unresolved safety, privacy, output, connector, automation, or local endpoint issues escalate to operator review instead of automatic recovery.",
      ],
      providerLocalConnectorAutomationRecoveryMatrix: [
        "Provider local connector automation recovery matrix: each lane needs a reviewed recovery path and cannot borrow another lane's approval or evidence.",
      ],
      deniedRecoveryShortcuts: [
        "Denied recovery shortcuts: trigger recovery, apply patches, mutate files, rerun workflows, call providers, call local models, call connectors, create automations, or clear blockers automatically.",
      ],
      unresolvedRecoveryBlockers: [
        "Unresolved recovery blockers: missing rollback owner, unclear escalation path, unsafe file boundary, missing evidence, and unapproved automation retry.",
      ],
      settingsRoute:
        "Settings route: /unified-settings-preferences-review reviews preferences without persisting settings.",
      cockpitFinalPolishRoute:
        "Cockpit final polish route: /daily-operator-cockpit-final-polish reviews cockpit readiness without executing actions.",
      nextRecommendedAction:
        "Next recommended action: keep recovery policy blocked until rollback and escalation checklists are approved outside this page.",
      advancedRecoveryPolicyDetails:
        "Advanced recovery policy details: unified recovery policy final review is review-only. Unified recovery policy final review does not trigger recovery, recovery policy changes require explicit operator approval, and unsafe recovery shortcuts stay blocked. It does not execute workflows, trigger recovery, apply patches, mutate files, call providers, call local models, call connectors, execute automations, persist settings, mutate memory, or create an MCP runtime.",
    }),
  ];
}

export function buildUnifiedRecoveryPolicyFinalReviewBoundary(): UnifiedRecoveryPolicyFinalReviewBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    unifiedRecoveryPolicyFinalReviewDoesNotTriggerRecovery: true,
    recoveryPolicyChangesRequireExplicitOperatorApproval: true,
    unsafeRecoveryShortcutsStayBlocked: true,
    recoveryTriggerAllowedFromUi: false,
    recoveryPolicyMutationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    automationExecutionAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    settingsPersistenceAllowedFromUi: false,
    memoryMutationAllowedFromUi: false,
  };
}

export function summarizeUnifiedRecoveryPolicyFinalReview(
  model: Pick<UnifiedRecoveryPolicyFinalReviewModel, "reviews">
): string {
  return `Unified recovery policy final review summarizes ${model.reviews.length} recovery policy posture without triggering recovery. Recovery policy changes require explicit operator approval, and unsafe recovery shortcuts stay blocked.`;
}

export function buildUnifiedRecoveryPolicyFinalReviewModel(): UnifiedRecoveryPolicyFinalReviewModel {
  const reviews = buildUnifiedRecoveryPolicyFinalReviews();
  const model: UnifiedRecoveryPolicyFinalReviewModel = {
    title: "Unified recovery policy final review",
    summary: "",
    reviews,
    boundary: buildUnifiedRecoveryPolicyFinalReviewBoundary(),
    recoveryLanguage: [...UNIFIED_RECOVERY_POLICY_FINAL_REVIEW_LANGUAGE],
    advancedDetails: [
      "Unified recovery policy final review",
      "Unified recovery policy identity",
      "Recovery groups",
      "Rollback checklist",
      "Escalation checklist",
      "Provider local connector automation recovery matrix",
      "Denied recovery shortcuts",
      "Unresolved recovery blockers",
      "Settings route",
      "Cockpit final polish route",
      "Next recommended action",
      "Unified recovery policy final review does not trigger recovery",
      "Recovery policy changes require explicit operator approval",
      "Unsafe recovery shortcuts stay blocked",
      "advanced recovery policy details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeUnifiedRecoveryPolicyFinalReview(model) };
}
