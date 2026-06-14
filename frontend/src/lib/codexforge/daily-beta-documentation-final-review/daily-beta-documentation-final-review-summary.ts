import type {
  DailyBetaDocumentationFinalReview,
  DailyBetaDocumentationFinalReviewBoundary,
  DailyBetaDocumentationFinalReviewModel,
} from "./daily-beta-documentation-final-review-types";
import { buildDailyBetaDocumentationFinalReviewStableKey } from "./daily-beta-documentation-final-review-types";

export const DAILY_BETA_DOCUMENTATION_FINAL_REVIEW_LANGUAGE = [
  "Daily Beta documentation final review",
  "Daily Beta documentation final review does not publish documentation automatically",
  "Documentation changes require explicit operator approval",
  "Stale Daily Beta documentation blockers stay blocked",
  "Documentation groups",
  "Operator runbook checklist",
] as const;

export function buildDailyBetaDocumentationFinalReview(
  input: Omit<DailyBetaDocumentationFinalReview, "id"> & { idHint: string }
): DailyBetaDocumentationFinalReview {
  const { idHint, ...review } = input;
  return {
    id: buildDailyBetaDocumentationFinalReviewStableKey(
      "daily-beta-documentation-final-review",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildDailyBetaDocumentationFinalReviews(): DailyBetaDocumentationFinalReview[] {
  return [
    buildDailyBetaDocumentationFinalReview({
      idHint: "daily-beta-docs-final-readiness",
      status: "blocked",
      dailyBetaDocumentationIdentity:
        "Daily Beta documentation identity: daily-beta-documentation-final-review-daily-beta-docs-final-readiness.",
      documentationGroups: [
        "Documentation groups: operator runbook, checkpoint docs, release notes, safety wording, rollback notes, and evidence summary.",
      ],
      operatorRunbookChecklist: [
        "Operator runbook checklist: daily task path, approval language, review-only boundaries, rollback owner, feedback triage, and release escalation must be readable before rollout.",
      ],
      checkpointDocsChecklist: [
        "Checkpoint docs checklist: checkpoint phase, status index, validation commands, non-goals, and review-only limitations must match the local all-smoke registry.",
      ],
      releaseNotesChecklist: [
        "Release notes checklist: Daily Beta readiness, hardening blockers, signoff requirements, rollout limitations, and feedback handling must be reviewed before publication.",
      ],
      safetyWordingChecklist: [
        "Safety wording checklist: docs must not claim CI passed, live execution works, provider calls run, feedback is ingested, or Daily Beta 1 launches automatically.",
      ],
      deniedDocumentationShortcuts: [
        "Denied documentation shortcuts: publish documentation automatically, write files from UI, claim CI passed without logs, claim live execution without a boundary, or bypass operator approval.",
      ],
      unresolvedDocumentationBlockers: [
        "Unresolved documentation blockers: stale checkpoint wording, missing rollout limitation, missing onboarding link, missing signoff owner, and unclear feedback review language.",
      ],
      onboardingFinalReviewRoute:
        "Onboarding final review route: /daily-beta-onboarding-final-review reviews onboarding readiness without launching workflows.",
      releaseSignoffRoute:
        "Release signoff route: /daily-beta-release-signoff-review reviews release signoff without approving release.",
      nextRecommendedAction:
        "Next recommended action: keep documentation blocked from publication until operator runbook, checkpoint docs, release notes, and safety wording are approved outside this page.",
      advancedDocumentationDetails:
        "Advanced documentation details: Daily Beta documentation final review is review-only. Daily Beta documentation final review does not publish documentation automatically, documentation changes require explicit operator approval, and stale Daily Beta documentation blockers stay blocked. It does not write files from UI, run documentation updates, claim CI passed, execute workflows, call providers, call local models, call connectors, create automations, or create an MCP runtime.",
    }),
  ];
}

export function buildDailyBetaDocumentationFinalReviewBoundary(): DailyBetaDocumentationFinalReviewBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    dailyBetaDocumentationFinalReviewDoesNotPublishDocumentationAutomatically: true,
    documentationChangesRequireExplicitOperatorApproval: true,
    staleDailyBetaDocumentationBlockersStayBlocked: true,
    documentationPublishAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    outputStorageAllowed: false,
  };
}

export function summarizeDailyBetaDocumentationFinalReview(
  model: Pick<DailyBetaDocumentationFinalReviewModel, "reviews">
): string {
  return `Daily Beta documentation final review reviews ${model.reviews.length} documentation posture without publishing documentation automatically. Documentation changes require explicit operator approval, and stale Daily Beta documentation blockers stay blocked.`;
}

export function buildDailyBetaDocumentationFinalReviewModel(): DailyBetaDocumentationFinalReviewModel {
  const reviews = buildDailyBetaDocumentationFinalReviews();
  const model: DailyBetaDocumentationFinalReviewModel = {
    title: "Daily Beta documentation final review",
    summary: "",
    reviews,
    boundary: buildDailyBetaDocumentationFinalReviewBoundary(),
    documentationLanguage: [...DAILY_BETA_DOCUMENTATION_FINAL_REVIEW_LANGUAGE],
    advancedDetails: [
      "Daily Beta documentation final review",
      "Daily Beta documentation identity",
      "Documentation groups",
      "Operator runbook checklist",
      "Checkpoint docs checklist",
      "Release notes checklist",
      "Safety wording checklist",
      "Denied documentation shortcuts",
      "Unresolved documentation blockers",
      "Onboarding final review route",
      "Release signoff route",
      "Next recommended action",
      "Daily Beta documentation final review does not publish documentation automatically",
      "Documentation changes require explicit operator approval",
      "Stale Daily Beta documentation blockers stay blocked",
      "advanced documentation details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeDailyBetaDocumentationFinalReview(model) };
}
