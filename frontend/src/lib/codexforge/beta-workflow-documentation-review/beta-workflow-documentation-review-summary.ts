import type {
  BetaWorkflowDocumentationReview,
  BetaWorkflowDocumentationReviewBoundary,
  BetaWorkflowDocumentationReviewModel,
} from "./beta-workflow-documentation-review-types";
import { buildBetaWorkflowDocumentationReviewStableKey } from "./beta-workflow-documentation-review-types";

export const BETA_WORKFLOW_DOCUMENTATION_REVIEW_LANGUAGE = [
  "Beta workflow documentation review",
  "Beta workflow documentation review does not publish documentation automatically",
  "Documentation changes require explicit operator approval",
  "Stale documentation blockers stay blocked",
  "Documentation groups",
  "Operator runbook checklist",
] as const;

export function buildBetaWorkflowDocumentationReview(
  input: Omit<BetaWorkflowDocumentationReview, "id"> & { idHint: string }
): BetaWorkflowDocumentationReview {
  const { idHint, ...review } = input;
  return {
    id: buildBetaWorkflowDocumentationReviewStableKey("beta-workflow-documentation-review", idHint, input.status),
    ...review,
  };
}

export function buildBetaWorkflowDocumentationReviews(): BetaWorkflowDocumentationReview[] {
  return [
    buildBetaWorkflowDocumentationReview({
      idHint: "review-only-docs-gate",
      status: "blocked",
      betaWorkflowDocumentationIdentity:
        "Beta workflow documentation identity: beta-workflow-documentation-review-review-only-docs-gate.",
      documentationGroups: [
        "Documentation groups: operator runbook, checkpoint notes, status index, safety wording, onboarding handoff, Beta 2 release candidate copy, and smoke instructions.",
      ],
      operatorRunbookChecklist: [
        "Operator runbook checklist: review commands, routes, approval language, rollback notes, and no-go boundaries before publishing or applying any documentation change.",
      ],
      checkpointDocChecklist: [
        "Checkpoint doc checklist: checkpoint documentation stays preserved unless an operator explicitly approves a documentation update outside this page.",
      ],
      safetyWordingChecklist: [
        "Safety wording checklist: every route says review-only, approval required, no workflow execution, no provider/local/connector calls, no automation creation, no file mutation, and no memory mutation.",
      ],
      deniedDocumentationShortcuts: [
        "Denied documentation shortcuts: publish docs, apply onboarding changes, mutate files from UI, claim CI passed, export files, write runbooks, or store outputs.",
      ],
      unresolvedDocumentationBlockers: [
        "Unresolved documentation blockers: stale documentation blockers stay blocked until explicit operator approval resolves them outside this page.",
      ],
      onboardingFinalPassRoute:
        "Onboarding final pass route: /beta-workflow-onboarding-final-pass reviews onboarding readiness without launching workflows.",
      betaTwoReleaseCandidateRoute:
        "Beta 2 release candidate route: /codexforge-beta-2-release-candidate summarizes Beta 2 readiness without going live.",
      nextRecommendedAction:
        "Next recommended action: keep docs review-only, resolve stale wording, and require explicit operator approval before documentation changes.",
      advancedDocumentationDetails:
        "Advanced documentation details: Beta workflow documentation review is review-only. Beta workflow documentation review does not publish documentation automatically, documentation changes require explicit operator approval, and stale documentation blockers stay blocked. It does not mutate files from UI, publish docs, apply onboarding changes, claim CI passed, execute workflows, run tests, call providers, call local models, call connectors, store outputs, or mutate memory.",
    }),
  ];
}

export function buildBetaWorkflowDocumentationReviewBoundary(): BetaWorkflowDocumentationReviewBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    betaWorkflowDocumentationReviewDoesNotPublishDocumentationAutomatically: true,
    documentationChangesRequireExplicitOperatorApproval: true,
    staleDocumentationBlockersStayBlocked: true,
    actionsExecutedFromUi: false,
    documentationPublishAllowedFromUi: false,
    documentationApplyAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    ciPassClaimAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    memoryMutationAllowedFromUi: false,
  };
}

export function summarizeBetaWorkflowDocumentationReview(
  model: Pick<BetaWorkflowDocumentationReviewModel, "reviews">
): string {
  return `Beta workflow documentation review checks ${model.reviews.length} documentation posture without publishing documentation automatically. Documentation changes require explicit operator approval, and stale documentation blockers stay blocked.`;
}

export function buildBetaWorkflowDocumentationReviewModel(): BetaWorkflowDocumentationReviewModel {
  const reviews = buildBetaWorkflowDocumentationReviews();
  const model: BetaWorkflowDocumentationReviewModel = {
    title: "Beta workflow documentation review",
    summary: "",
    reviews,
    boundary: buildBetaWorkflowDocumentationReviewBoundary(),
    documentationLanguage: [...BETA_WORKFLOW_DOCUMENTATION_REVIEW_LANGUAGE],
    advancedDetails: [
      "Beta workflow documentation review",
      "beta workflow documentation identity",
      "Documentation groups",
      "Operator runbook checklist",
      "checkpoint doc checklist",
      "safety wording checklist",
      "denied documentation shortcuts",
      "unresolved documentation blockers",
      "onboarding final pass route",
      "Beta 2 release candidate route",
      "next recommended action",
      "Beta workflow documentation review does not publish documentation automatically",
      "Documentation changes require explicit operator approval",
      "Stale documentation blockers stay blocked",
      "advanced documentation details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeBetaWorkflowDocumentationReview(model) };
}
