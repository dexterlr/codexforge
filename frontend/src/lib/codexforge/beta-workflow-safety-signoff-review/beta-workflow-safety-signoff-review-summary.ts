import type {
  BetaWorkflowSafetySignoffReview,
  BetaWorkflowSafetySignoffReviewBoundary,
  BetaWorkflowSafetySignoffReviewModel,
} from "./beta-workflow-safety-signoff-review-types";
import { buildBetaWorkflowSafetySignoffReviewStableKey } from "./beta-workflow-safety-signoff-review-types";

export const BETA_WORKFLOW_SAFETY_SIGNOFF_REVIEW_LANGUAGE = [
  "Beta workflow safety signoff review",
  "Beta workflow safety signoff review does not approve release automatically",
  "Safety signoff requires explicit operator approval",
  "Unresolved safety blockers stay blocked",
  "Signoff groups",
  "Data privacy checklist",
] as const;

export function buildBetaWorkflowSafetySignoffReview(
  input: Omit<BetaWorkflowSafetySignoffReview, "id"> & { idHint: string }
): BetaWorkflowSafetySignoffReview {
  const { idHint, ...review } = input;
  return {
    id: buildBetaWorkflowSafetySignoffReviewStableKey("beta-workflow-safety-signoff-review", idHint, input.status),
    ...review,
  };
}

export function buildBetaWorkflowSafetySignoffReviews(): BetaWorkflowSafetySignoffReview[] {
  return [
    buildBetaWorkflowSafetySignoffReview({
      idHint: "review-only-safety-gate",
      status: "blocked",
      betaWorkflowSafetySignoffIdentity:
        "Beta workflow safety signoff identity: beta-workflow-safety-signoff-review-review-only-safety-gate.",
      signoffGroups: [
        "Signoff groups: approval boundaries, data privacy, provider/local/connector/automation safety, route coverage, release blockers, and documentation handoff.",
      ],
      approvalBoundaryChecklist: [
        "Approval boundary checklist: release approval, safety signoff, workflow execution, provider calls, file mutation, and memory mutation all require explicit operator approval outside this page.",
      ],
      dataPrivacyChecklist: [
        "Data privacy checklist: no credentials, tokens, endpoints, provider outputs, connector data, live trial data, or operator feedback are stored from this page.",
      ],
      providerLocalConnectorAutomationSafetyChecklist: [
        "Provider/local/connector/automation safety checklist: no provider traffic, no local model call, no connector API call, no connector data fetch, no automation creation, and no scheduled task.",
      ],
      deniedSignoffShortcuts: [
        "Denied signoff shortcuts: approve release automatically, persist signoff decisions, execute workflows, connect accounts, call providers, call local models, call connectors, or create automations.",
      ],
      unresolvedSignoffBlockers: [
        "Unresolved signoff blockers: unresolved safety blockers stay blocked until an operator explicitly reviews and approves them outside this page.",
      ],
      documentationReviewRoute:
        "Documentation review route: /beta-workflow-documentation-review checks docs without publishing documentation automatically.",
      onboardingFinalPassRoute:
        "Onboarding final pass route: /beta-workflow-onboarding-final-pass reviews onboarding without launching workflows.",
      nextRecommendedAction:
        "Next recommended action: keep safety signoff blocked, review documentation wording, and require explicit operator approval for any release signoff.",
      advancedSignoffDetails:
        "Advanced signoff details: Beta workflow safety signoff review is review-only. Beta workflow safety signoff review does not approve release automatically, safety signoff requires explicit operator approval, and unresolved safety blockers stay blocked. It does not persist signoff decisions, execute workflows, approve actions, call providers, call local models, call connectors, create automations, mutate files, store outputs, or mutate memory.",
    }),
  ];
}

export function buildBetaWorkflowSafetySignoffReviewBoundary(): BetaWorkflowSafetySignoffReviewBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    betaWorkflowSafetySignoffReviewDoesNotApproveReleaseAutomatically: true,
    safetySignoffRequiresExplicitOperatorApproval: true,
    unresolvedSafetyBlockersStayBlocked: true,
    actionsExecutedFromUi: false,
    releaseApprovalAllowedFromUi: false,
    signoffDecisionPersistenceAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    memoryMutationAllowedFromUi: false,
  };
}

export function summarizeBetaWorkflowSafetySignoffReview(
  model: Pick<BetaWorkflowSafetySignoffReviewModel, "reviews">
): string {
  return `Beta workflow safety signoff review checks ${model.reviews.length} safety signoff posture without approving release automatically. Safety signoff requires explicit operator approval, and unresolved safety blockers stay blocked.`;
}

export function buildBetaWorkflowSafetySignoffReviewModel(): BetaWorkflowSafetySignoffReviewModel {
  const reviews = buildBetaWorkflowSafetySignoffReviews();
  const model: BetaWorkflowSafetySignoffReviewModel = {
    title: "Beta workflow safety signoff review",
    summary: "",
    reviews,
    boundary: buildBetaWorkflowSafetySignoffReviewBoundary(),
    signoffLanguage: [...BETA_WORKFLOW_SAFETY_SIGNOFF_REVIEW_LANGUAGE],
    advancedDetails: [
      "Beta workflow safety signoff review",
      "beta workflow safety signoff identity",
      "Signoff groups",
      "approval boundary checklist",
      "Data privacy checklist",
      "provider/local/connector/automation safety checklist",
      "denied signoff shortcuts",
      "unresolved signoff blockers",
      "documentation review route",
      "onboarding final pass route",
      "next recommended action",
      "Beta workflow safety signoff review does not approve release automatically",
      "Safety signoff requires explicit operator approval",
      "Unresolved safety blockers stay blocked",
      "advanced signoff details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeBetaWorkflowSafetySignoffReview(model) };
}
