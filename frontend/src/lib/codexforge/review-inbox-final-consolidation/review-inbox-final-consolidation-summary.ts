import type {
  ReviewInboxFinalConsolidation,
  ReviewInboxFinalConsolidationBoundary,
  ReviewInboxFinalConsolidationModel,
} from "./review-inbox-final-consolidation-types";
import { buildReviewInboxFinalConsolidationStableKey } from "./review-inbox-final-consolidation-types";

export const REVIEW_INBOX_FINAL_CONSOLIDATION_LANGUAGE = [
  "Review inbox final consolidation",
  "Review inbox final consolidation does not execute actions",
  "Inbox actions require explicit operator approval",
  "Unresolved inbox blockers stay blocked",
  "Consolidated review groups",
  "Evidence review lane",
] as const;

export function buildReviewInboxFinalConsolidation(
  input: Omit<ReviewInboxFinalConsolidation, "id"> & { idHint: string }
): ReviewInboxFinalConsolidation {
  const { idHint, ...review } = input;
  return {
    id: buildReviewInboxFinalConsolidationStableKey("review-inbox-final-consolidation", idHint, input.status),
    ...review,
  };
}

export function buildReviewInboxFinalConsolidations(): ReviewInboxFinalConsolidation[] {
  return [
    buildReviewInboxFinalConsolidation({
      idHint: "final-lane-rollup",
      status: "blocked",
      finalReviewInboxIdentity:
        "Final review inbox identity: review-inbox-final-consolidation-final-lane-rollup.",
      consolidatedReviewGroups: [
        "Consolidated review groups: evidence, results, approvals, feedback, recovery, hardening, release readiness, and milestone review stay visible in one review-only inbox.",
      ],
      evidenceReviewLane: [
        "Evidence review lane: evidence stays reviewed as source, citation, redaction, and approval context before any separate use.",
      ],
      resultReviewLane: [
        "Result review lane: workflow and policy results stay blocked until acceptance, rejection, reuse, and safety review are complete.",
      ],
      approvalReviewLane: [
        "Approval review lane: inbox actions require explicit operator approval outside this page before any action can advance.",
      ],
      feedbackReviewLane: [
        "Feedback review lane: feedback remains a review item and is not ingested as memory or product state automatically.",
      ],
      recoveryReviewLane: [
        "Recovery review lane: recovery options stay visible without triggering rollback, retry, patching, or file mutation.",
      ],
      hardeningReviewLane: [
        "Hardening review lane: hardening needs are listed for review without applying changes or clearing blockers.",
      ],
      deniedInboxActions: [
        "Denied inbox actions: execute actions, approve actions, ingest evidence, ingest results, ingest feedback, trigger recovery, apply hardening, call providers, call local models, call connectors, create automations, mutate files, or mutate memory.",
      ],
      unresolvedInboxBlockers: [
        "Unresolved inbox blockers: missing explicit approval, incomplete evidence review, unsafe result reuse, private feedback, recovery ambiguity, and unreviewed hardening stay blocked.",
      ],
      releaseReadinessDashboardRoute:
        "Release readiness dashboard route: /release-readiness-dashboard summarizes readiness without approving release.",
      foundation500MilestoneRoute:
        "Foundation 500 milestone route: /codexforge-foundation-500-milestone-review records the milestone as review-only.",
      nextRecommendedAction:
        "Next recommended action: review the blocked lanes, then move only approval-ready items to explicit operator approval outside this page.",
      advancedInboxDetails:
        "Advanced inbox details: review inbox final consolidation is review-only. Review inbox final consolidation does not execute actions, inbox actions require explicit operator approval, and unresolved inbox blockers stay blocked. It does not ingest evidence, ingest results, ingest feedback, trigger recovery, apply hardening, mutate files, mutate memory, route live traffic, store credentials, store outputs, or create an MCP runtime.",
    }),
  ];
}

export function buildReviewInboxFinalConsolidationBoundary(): ReviewInboxFinalConsolidationBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    reviewInboxFinalConsolidationDoesNotExecuteActions: true,
    inboxActionsRequireExplicitOperatorApproval: true,
    unresolvedInboxBlockersStayBlocked: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    evidenceIngestionAllowedFromUi: false,
    resultIngestionAllowedFromUi: false,
    feedbackIngestionAllowedFromUi: false,
    recoveryTriggerAllowedFromUi: false,
    hardeningApplyAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    memoryMutationAllowedFromUi: false,
  };
}

export function summarizeReviewInboxFinalConsolidation(
  model: Pick<ReviewInboxFinalConsolidationModel, "reviews">
): string {
  return `Review inbox final consolidation summarizes ${model.reviews.length} final inbox posture without executing actions. Inbox actions require explicit operator approval, and unresolved inbox blockers stay blocked.`;
}

export function buildReviewInboxFinalConsolidationModel(): ReviewInboxFinalConsolidationModel {
  const reviews = buildReviewInboxFinalConsolidations();
  const model: ReviewInboxFinalConsolidationModel = {
    title: "Review inbox final consolidation",
    summary: "",
    reviews,
    boundary: buildReviewInboxFinalConsolidationBoundary(),
    inboxLanguage: [...REVIEW_INBOX_FINAL_CONSOLIDATION_LANGUAGE],
    advancedDetails: [
      "Review inbox final consolidation",
      "Final review inbox identity",
      "Consolidated review groups",
      "Evidence review lane",
      "Result review lane",
      "Approval review lane",
      "Feedback review lane",
      "Recovery review lane",
      "Hardening review lane",
      "Denied inbox actions",
      "Unresolved inbox blockers",
      "Release readiness dashboard route",
      "Foundation 500 milestone route",
      "Next recommended action",
      "Review inbox final consolidation does not execute actions",
      "Inbox actions require explicit operator approval",
      "Unresolved inbox blockers stay blocked",
      "advanced inbox details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeReviewInboxFinalConsolidation(model) };
}
