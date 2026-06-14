import type {
  UnifiedResultPolicyFinalReview,
  UnifiedResultPolicyFinalReviewBoundary,
  UnifiedResultPolicyFinalReviewModel,
} from "./unified-result-policy-final-review-types";
import { buildUnifiedResultPolicyFinalReviewStableKey } from "./unified-result-policy-final-review-types";

export const UNIFIED_RESULT_POLICY_FINAL_REVIEW_LANGUAGE = [
  "Unified result policy final review",
  "Unified result policy final review does not apply result policy",
  "Result policy changes require explicit operator approval",
  "Unsafe results remain blocked",
  "Result groups",
  "Reuse checklist",
] as const;

export function buildUnifiedResultPolicyFinalReview(
  input: Omit<UnifiedResultPolicyFinalReview, "id"> & { idHint: string }
): UnifiedResultPolicyFinalReview {
  const { idHint, ...review } = input;
  return {
    id: buildUnifiedResultPolicyFinalReviewStableKey("unified-result-policy-final-review", idHint, input.status),
    ...review,
  };
}

export function buildUnifiedResultPolicyFinalReviews(): UnifiedResultPolicyFinalReview[] {
  return [
    buildUnifiedResultPolicyFinalReview({
      idHint: "accept-reject-reuse",
      status: "blocked",
      unifiedResultPolicyIdentity:
        "Unified result policy identity: unified-result-policy-final-review-accept-reject-reuse.",
      resultGroups: [
        "Result groups: provider responses, local model outputs, connector-derived results, automation outcomes, validation summaries, patch review outcomes, and operator decisions.",
      ],
      acceptanceChecklist: [
        "Acceptance checklist: result source, evidence link, safety review, redaction state, approval state, reuse scope, and recovery note must be reviewed before acceptance elsewhere.",
      ],
      rejectionChecklist: [
        "Rejection checklist: unsafe, untrusted, private, stale, uncited, incomplete, or unapproved results remain blocked instead of being reused.",
      ],
      reuseChecklist: [
        "Reuse checklist: result reuse needs explicit operator approval, scoped evidence, redaction review, rollback context, and no automatic memory promotion.",
      ],
      safetyReviewChecklist: [
        "Safety review checklist: unsafe results remain blocked until policy, evidence, and recovery reviews are complete.",
      ],
      deniedResultShortcuts: [
        "Denied result shortcuts: accept automatically, store outputs, ingest results, reuse private results, publish results, apply patches, mutate files, or promote memory.",
      ],
      unresolvedResultBlockers: [
        "Unresolved result blockers: missing acceptance evidence, unsafe reuse scope, incomplete redaction, missing rollback note, and unclear output retention.",
      ],
      recoveryPolicyRoute:
        "Recovery policy route: /unified-recovery-policy-final-review reviews rollback rules without triggering recovery.",
      settingsRoute:
        "Settings route: /unified-settings-preferences-review reviews preferences without persisting settings.",
      nextRecommendedAction:
        "Next recommended action: keep result policy blocked until acceptance, rejection, reuse, and safety review checklists are approved outside this page.",
      advancedResultPolicyDetails:
        "Advanced result policy details: unified result policy final review is review-only. Unified result policy final review does not apply result policy, result policy changes require explicit operator approval, and unsafe results remain blocked. It does not ingest results, store outputs, apply policies, execute workflows, call providers, call local models, call connectors, create automations, persist settings, mutate files, mutate memory, or create an MCP runtime.",
    }),
  ];
}

export function buildUnifiedResultPolicyFinalReviewBoundary(): UnifiedResultPolicyFinalReviewBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    unifiedResultPolicyFinalReviewDoesNotApplyResultPolicy: true,
    resultPolicyChangesRequireExplicitOperatorApproval: true,
    unsafeResultsRemainBlocked: true,
    resultPolicyMutationAllowedFromUi: false,
    resultIngestionAllowedFromUi: false,
    outputStorageAllowed: false,
    workflowExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    settingsPersistenceAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    memoryMutationAllowedFromUi: false,
  };
}

export function summarizeUnifiedResultPolicyFinalReview(
  model: Pick<UnifiedResultPolicyFinalReviewModel, "reviews">
): string {
  return `Unified result policy final review summarizes ${model.reviews.length} result policy posture without applying result policy. Result policy changes require explicit operator approval, and unsafe results remain blocked.`;
}

export function buildUnifiedResultPolicyFinalReviewModel(): UnifiedResultPolicyFinalReviewModel {
  const reviews = buildUnifiedResultPolicyFinalReviews();
  const model: UnifiedResultPolicyFinalReviewModel = {
    title: "Unified result policy final review",
    summary: "",
    reviews,
    boundary: buildUnifiedResultPolicyFinalReviewBoundary(),
    resultLanguage: [...UNIFIED_RESULT_POLICY_FINAL_REVIEW_LANGUAGE],
    advancedDetails: [
      "Unified result policy final review",
      "Unified result policy identity",
      "Result groups",
      "Acceptance checklist",
      "Rejection checklist",
      "Reuse checklist",
      "Safety review checklist",
      "Denied result shortcuts",
      "Unresolved result blockers",
      "Recovery policy route",
      "Settings route",
      "Next recommended action",
      "Unified result policy final review does not apply result policy",
      "Result policy changes require explicit operator approval",
      "Unsafe results remain blocked",
      "advanced result policy details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeUnifiedResultPolicyFinalReview(model) };
}
