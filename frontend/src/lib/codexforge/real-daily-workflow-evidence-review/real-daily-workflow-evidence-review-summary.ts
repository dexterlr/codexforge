import type {
  RealDailyWorkflowEvidenceReview,
  RealDailyWorkflowEvidenceReviewBoundary,
  RealDailyWorkflowEvidenceReviewModel,
} from "./real-daily-workflow-evidence-review-types";
import { buildRealDailyWorkflowEvidenceReviewStableKey } from "./real-daily-workflow-evidence-review-types";

export const REAL_DAILY_WORKFLOW_EVIDENCE_REVIEW_LANGUAGE = [
  "Real daily workflow evidence review",
  "Real daily workflow evidence review does not ingest evidence automatically",
  "Real daily workflow evidence requires operator review before use",
  "Private workflow evidence stays redacted",
  "Evidence groups",
  "Source citation checklist",
] as const;

export function buildRealDailyWorkflowEvidenceReview(
  input: Omit<RealDailyWorkflowEvidenceReview, "id"> & { idHint: string }
): RealDailyWorkflowEvidenceReview {
  const { idHint, ...review } = input;
  return {
    id: buildRealDailyWorkflowEvidenceReviewStableKey("real-daily-workflow-evidence-review", idHint, input.status),
    ...review,
  };
}

export function buildRealDailyWorkflowEvidenceReviews(): RealDailyWorkflowEvidenceReview[] {
  return [
    buildRealDailyWorkflowEvidenceReview({
      idHint: "source-redaction-approval-review",
      status: "blocked",
      realDailyWorkflowEvidenceIdentity:
        "Real daily workflow evidence identity: real-daily-workflow-evidence-review-source-redaction-approval-review.",
      evidenceGroups: [
        "Evidence groups: operator note, task scope, source citation, redaction decision, privacy classification, approval gate, result handoff, and recovery handoff.",
      ],
      sourceCitationChecklist: [
        "Source citation checklist: evidence needs a reviewed source name, citation note, collection boundary, timestamp supplied by operator logs, and no automatic connector fetch.",
      ],
      redactionPrivacyChecklist: [
        "Redaction/privacy checklist: private workflow evidence stays redacted, secrets stay hidden, connector values stay summarized, and local paths are not opened from this page.",
      ],
      approvalGateChecklist: [
        "Approval gate checklist: evidence cannot be used until the operator reviews source, citation, redaction, privacy, and scope.",
      ],
      deniedEvidenceActions: [
        "Denied evidence actions: ingest evidence, fetch connector data, call providers, call local models, store provider/local/connector outputs, mutate files, mutate memory, promote memory, or send private data.",
      ],
      blockedEvidenceRisks: [
        "Blocked evidence risks: missing citation, private data not redacted, unapproved connector data, unclear source boundary, and unsafe result handoff.",
      ],
      realDailyWorkflowResultReviewRoute:
        "Real daily workflow result review route: /real-daily-workflow-result-review reviews results before reuse.",
      realDailyWorkflowRecoveryReviewRoute:
        "Real daily workflow recovery review route: /real-daily-workflow-recovery-review reviews recovery options without triggering recovery.",
      nextRecommendedAction:
        "Next recommended action: keep evidence blocked until source citation and redaction privacy review are complete.",
      advancedEvidenceDetails:
        "Advanced evidence details: real daily workflow evidence review is review-only. Real daily workflow evidence review does not ingest evidence automatically, real daily workflow evidence requires operator review before use, and private workflow evidence stays redacted. It does not call providers, call local models, call connectors, fetch connector data, store outputs, mutate files, mutate memory, promote memory, or create an MCP runtime.",
    }),
  ];
}

export function buildRealDailyWorkflowEvidenceReviewBoundary(): RealDailyWorkflowEvidenceReviewBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    realDailyWorkflowEvidenceReviewDoesNotIngestEvidenceAutomatically: true,
    realDailyWorkflowEvidenceRequiresOperatorReviewBeforeUse: true,
    privateWorkflowEvidenceStaysRedacted: true,
    evidenceIngestionAllowedFromUi: false,
    outputStorageAllowed: false,
    providerOutputStorageAllowed: false,
    localOutputStorageAllowed: false,
    connectorOutputStorageAllowed: false,
    fileMutationAllowedFromUi: false,
    memoryMutationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
  };
}

export function summarizeRealDailyWorkflowEvidenceReview(
  model: Pick<RealDailyWorkflowEvidenceReviewModel, "reviews">
): string {
  return `Real daily workflow evidence review summarizes ${model.reviews.length} evidence posture without ingesting evidence automatically. Evidence requires operator review before use, and private workflow evidence stays redacted.`;
}

export function buildRealDailyWorkflowEvidenceReviewModel(): RealDailyWorkflowEvidenceReviewModel {
  const reviews = buildRealDailyWorkflowEvidenceReviews();
  const model: RealDailyWorkflowEvidenceReviewModel = {
    title: "Real daily workflow evidence review",
    summary: "",
    reviews,
    boundary: buildRealDailyWorkflowEvidenceReviewBoundary(),
    evidenceLanguage: [...REAL_DAILY_WORKFLOW_EVIDENCE_REVIEW_LANGUAGE],
    advancedDetails: [
      "Real daily workflow evidence review",
      "Real daily workflow evidence identity",
      "Evidence groups",
      "Source citation checklist",
      "Redaction privacy checklist",
      "Approval gate checklist",
      "Denied evidence actions",
      "Blocked evidence risks",
      "Real daily workflow result review route",
      "Real daily workflow recovery review route",
      "Next recommended action",
      "Real daily workflow evidence review does not ingest evidence automatically",
      "Real daily workflow evidence requires operator review before use",
      "Private workflow evidence stays redacted",
      "advanced evidence details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeRealDailyWorkflowEvidenceReview(model) };
}
