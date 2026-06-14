import type {
  CodexForgeFoundation500MilestoneReview,
  CodexForgeFoundation500MilestoneReviewBoundary,
  CodexForgeFoundation500MilestoneReviewModel,
} from "./codexforge-foundation-500-milestone-review-types";
import { buildCodexForgeFoundation500MilestoneReviewStableKey } from "./codexforge-foundation-500-milestone-review-types";

export const CODEXFORGE_FOUNDATION_500_MILESTONE_REVIEW_LANGUAGE = [
  "CodexForge Foundation 500 milestone review",
  "Foundation 500 milestone review does not claim live execution",
  "Milestone signoff requires explicit operator approval",
  "Unresolved milestone blockers stay blocked",
  "Foundation 500 milestone identity",
  "Checkpoint docs status",
] as const;

export function buildCodexForgeFoundation500MilestoneReview(
  input: Omit<CodexForgeFoundation500MilestoneReview, "id"> & { idHint: string }
): CodexForgeFoundation500MilestoneReview {
  const { idHint, ...review } = input;
  return {
    id: buildCodexForgeFoundation500MilestoneReviewStableKey(
      "codexforge-foundation-500-milestone-review",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildCodexForgeFoundation500MilestoneReviews(): CodexForgeFoundation500MilestoneReview[] {
  return [
    buildCodexForgeFoundation500MilestoneReview({
      idHint: "foundation-500-review-checkpoint",
      status: "blocked",
      foundation500MilestoneIdentity:
        "Foundation 500 milestone identity: codexforge-foundation-500-milestone-review-foundation-500-review-checkpoint.",
      milestoneGroups: [
        "Milestone groups: foundation route coverage, live-capable review lanes, unified policy review, Beta 2 readiness, daily workflow candidate, checkpoint docs, and release readiness.",
      ],
      foundationCoverageChecklist: [
        "Foundation coverage checklist: navigation, command palette, route shell, review inbox, readiness, evidence, result, recovery, hardening, docs, and smoke coverage are represented as review surfaces.",
      ],
      liveCapableReviewLaneChecklist: [
        "Live-capable review lane checklist: provider, local model, connector, automation, and real daily workflow lanes remain approval-gated and review-only from this milestone page.",
      ],
      beta2ReadinessChecklist: [
        "Beta 2 readiness checklist: Beta 2 release candidate, controlled trial review, feedback review, and hardening pass stay review-only and do not mark Beta 2 live.",
      ],
      checkpointDocsStatus: [
        "Checkpoint docs status: documentation tracks the highest local all-smoke phase and does not claim CI passed or live execution without logs.",
      ],
      deniedMilestoneActions: [
        "Denied milestone actions: claim live execution, approve milestone, approve release, execute workflows, launch real daily workflow, call providers, call local models, call connectors, create automations, mutate files, mutate memory, store credentials, or store outputs.",
      ],
      unresolvedMilestoneBlockers: [
        "Unresolved milestone blockers: missing validation logs, unresolved live-capable boundaries, release risk, incomplete daily workflow evidence, and unapproved milestone signoff.",
      ],
      firstRealDailyWorkflowCandidateRoute:
        "First real daily workflow candidate route: /first-real-daily-workflow-candidate previews the first daily workflow without executing it.",
      releaseReadinessDashboardRoute:
        "Release readiness dashboard route: /release-readiness-dashboard summarizes readiness without approving release.",
      nextRecommendedAction:
        "Next recommended action: keep Foundation 500 as a review checkpoint until explicit operator signoff and validation evidence are available.",
      advancedMilestoneDetails:
        "Advanced milestone details: CodexForge Foundation 500 milestone review is review-only. Foundation 500 milestone review does not claim live execution, milestone signoff requires explicit operator approval, and unresolved milestone blockers stay blocked. It does not approve milestone, approve release, execute workflows, call providers, call local models, call connectors, create automations, mutate files, mutate memory, store credentials, store outputs, or create an MCP runtime.",
    }),
  ];
}

export function buildCodexForgeFoundation500MilestoneReviewBoundary(): CodexForgeFoundation500MilestoneReviewBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    foundation500MilestoneReviewDoesNotClaimLiveExecution: true,
    milestoneSignoffRequiresExplicitOperatorApproval: true,
    unresolvedMilestoneBlockersStayBlocked: true,
    liveExecutionClaimedFromUi: false,
    milestoneSignoffAllowedFromUi: false,
    actionsExecutedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    releaseApprovalAllowedFromUi: false,
    evidenceIngestionAllowedFromUi: false,
    resultIngestionAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    memoryMutationAllowedFromUi: false,
  };
}

export function summarizeCodexForgeFoundation500MilestoneReview(
  model: Pick<CodexForgeFoundation500MilestoneReviewModel, "reviews">
): string {
  return `CodexForge Foundation 500 milestone review summarizes ${model.reviews.length} milestone checkpoint without claiming live execution. Milestone signoff requires explicit operator approval, and unresolved milestone blockers stay blocked.`;
}

export function buildCodexForgeFoundation500MilestoneReviewModel(): CodexForgeFoundation500MilestoneReviewModel {
  const reviews = buildCodexForgeFoundation500MilestoneReviews();
  const model: CodexForgeFoundation500MilestoneReviewModel = {
    title: "CodexForge Foundation 500 milestone review",
    summary: "",
    reviews,
    boundary: buildCodexForgeFoundation500MilestoneReviewBoundary(),
    milestoneLanguage: [...CODEXFORGE_FOUNDATION_500_MILESTONE_REVIEW_LANGUAGE],
    advancedDetails: [
      "CodexForge Foundation 500 milestone review",
      "Foundation 500 milestone identity",
      "Milestone groups",
      "Foundation coverage checklist",
      "Live-capable review lane checklist",
      "Beta 2 readiness checklist",
      "Checkpoint docs status",
      "Denied milestone actions",
      "Unresolved milestone blockers",
      "First real daily workflow candidate route",
      "Release readiness dashboard route",
      "Next recommended action",
      "Foundation 500 milestone review does not claim live execution",
      "Milestone signoff requires explicit operator approval",
      "Unresolved milestone blockers stay blocked",
      "advanced milestone details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeCodexForgeFoundation500MilestoneReview(model) };
}
