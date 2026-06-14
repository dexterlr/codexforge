import type {
  UnifiedApprovalPolicyFinalReview,
  UnifiedApprovalPolicyFinalReviewBoundary,
  UnifiedApprovalPolicyFinalReviewModel,
} from "./unified-approval-policy-final-review-types";
import { buildUnifiedApprovalPolicyFinalReviewStableKey } from "./unified-approval-policy-final-review-types";

export const UNIFIED_APPROVAL_POLICY_FINAL_REVIEW_LANGUAGE = [
  "Unified approval policy final review",
  "Unified approval policy final review does not apply approval policy",
  "Approval policy changes require explicit operator approval",
  "Denied approval shortcuts stay blocked",
  "Approval groups",
  "Audit trail checklist",
] as const;

export function buildUnifiedApprovalPolicyFinalReview(
  input: Omit<UnifiedApprovalPolicyFinalReview, "id"> & { idHint: string }
): UnifiedApprovalPolicyFinalReview {
  const { idHint, ...review } = input;
  return {
    id: buildUnifiedApprovalPolicyFinalReviewStableKey("unified-approval-policy-final-review", idHint, input.status),
    ...review,
  };
}

export function buildUnifiedApprovalPolicyFinalReviews(): UnifiedApprovalPolicyFinalReview[] {
  return [
    buildUnifiedApprovalPolicyFinalReview({
      idHint: "review-only-approval-gates",
      status: "blocked",
      unifiedApprovalPolicyIdentity:
        "Unified approval policy identity: unified-approval-policy-final-review-review-only-approval-gates.",
      approvalGroups: [
        "Approval groups: provider calls, local model calls, connector access, automation execution, policy change, result reuse, recovery action, file mutation, and memory promotion.",
      ],
      providerLocalConnectorAutomationApprovalGates: [
        "Provider/local/connector/automation approval gates: each lane requires explicit operator approval before any live-capable action can move forward.",
      ],
      deniedApprovalShortcuts: [
        "Denied approval shortcuts: automatic approvals, one-click cross-lane approval, persisted approval decisions, hidden policy changes, and approval-by-navigation stay blocked.",
      ],
      auditTrailChecklist: [
        "Audit trail checklist: approval request, operator identity, exact scope, evidence link, result policy link, recovery note, rollback note, and unresolved blocker list must be reviewed before any separate approved change.",
      ],
      rollbackChecklist: [
        "Rollback checklist: every approval path needs a reviewed rollback owner, rollback trigger, safe stop condition, and no automatic recovery trigger from this page.",
      ],
      unresolvedApprovalBlockers: [
        "Unresolved approval blockers: missing audit trail, missing rollback checklist, unclear lane scope, unsafe shortcut request, and private data ambiguity.",
      ],
      evidencePolicyRoute:
        "Evidence policy route: /unified-evidence-policy-final-review reviews evidence rules without applying evidence policy.",
      resultPolicyRoute:
        "Result policy route: /unified-result-policy-final-review reviews result rules without accepting results.",
      nextRecommendedAction:
        "Next recommended action: keep approval policy blocked until audit trail and rollback checklist are reviewed outside this page.",
      advancedApprovalPolicyDetails:
        "Advanced approval policy details: unified approval policy final review is review-only. Unified approval policy final review does not apply approval policy, approval policy changes require explicit operator approval, and denied approval shortcuts stay blocked. It does not persist approval decisions, approve actions, apply policies, execute workflows, call providers, call local models, call connectors, create automations, persist settings, mutate files, mutate memory, or create an MCP runtime.",
    }),
  ];
}

export function buildUnifiedApprovalPolicyFinalReviewBoundary(): UnifiedApprovalPolicyFinalReviewBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    unifiedApprovalPolicyFinalReviewDoesNotApplyApprovalPolicy: true,
    approvalPolicyChangesRequireExplicitOperatorApproval: true,
    deniedApprovalShortcutsStayBlocked: true,
    approvalPolicyMutationAllowedFromUi: false,
    approvalDecisionPersistenceAllowedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    actionsApprovedFromUi: false,
    actionsExecutedFromUi: false,
    policyAutoApplyAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    settingsPersistenceAllowedFromUi: false,
  };
}

export function summarizeUnifiedApprovalPolicyFinalReview(
  model: Pick<UnifiedApprovalPolicyFinalReviewModel, "reviews">
): string {
  return `Unified approval policy final review summarizes ${model.reviews.length} approval policy posture without applying approval policy. Approval policy changes require explicit operator approval, and denied approval shortcuts stay blocked.`;
}

export function buildUnifiedApprovalPolicyFinalReviewModel(): UnifiedApprovalPolicyFinalReviewModel {
  const reviews = buildUnifiedApprovalPolicyFinalReviews();
  const model: UnifiedApprovalPolicyFinalReviewModel = {
    title: "Unified approval policy final review",
    summary: "",
    reviews,
    boundary: buildUnifiedApprovalPolicyFinalReviewBoundary(),
    approvalLanguage: [...UNIFIED_APPROVAL_POLICY_FINAL_REVIEW_LANGUAGE],
    advancedDetails: [
      "Unified approval policy final review",
      "Unified approval policy identity",
      "Approval groups",
      "Provider/local/connector/automation approval gates",
      "Denied approval shortcuts",
      "Audit trail checklist",
      "Rollback checklist",
      "Unresolved approval blockers",
      "Evidence policy route",
      "Result policy route",
      "Next recommended action",
      "Unified approval policy final review does not apply approval policy",
      "Approval policy changes require explicit operator approval",
      "Denied approval shortcuts stay blocked",
      "advanced approval policy details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeUnifiedApprovalPolicyFinalReview(model) };
}
