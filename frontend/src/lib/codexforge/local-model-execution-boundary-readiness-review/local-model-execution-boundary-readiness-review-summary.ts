import type { LocalModelExecutionBoundaryReadinessReview, LocalModelExecutionBoundaryReadinessReviewBoundary, LocalModelExecutionBoundaryReadinessReviewModel } from "./local-model-execution-boundary-readiness-review-types";
import { buildLocalModelExecutionBoundaryReadinessReviewStableKey } from "./local-model-execution-boundary-readiness-review-types";

export const LOCAL_MODEL_EXECUTION_BOUNDARY_READINESS_REVIEW_LANGUAGE = [
  "Local model execution boundary readiness review",
  "Local model execution boundary readiness review does not call local models",
  "Local model execution requires explicit operator approval",
  "Unresolved local model boundary blockers stay blocked",
  "Local model boundary groups",
  "Local bridge checklist",
] as const;

export function buildLocalModelExecutionBoundaryReadinessReview(input: Omit<LocalModelExecutionBoundaryReadinessReview, "id"> & { idHint: string }): LocalModelExecutionBoundaryReadinessReview {
  const { idHint, ...review } = input;
  return { id: buildLocalModelExecutionBoundaryReadinessReviewStableKey("local-model-execution-boundary-readiness-review", idHint, input.status), ...review };
}

export function buildLocalModelExecutionBoundaryReadinessReviews(): LocalModelExecutionBoundaryReadinessReview[] {
  return [
    buildLocalModelExecutionBoundaryReadinessReview({
      idHint: "local-model-readiness-review-packet",
      status: "blocked",
      localModelExecutionBoundaryIdentity: "Local model execution boundary identity: local-model-execution-boundary-readiness-review-local-model-readiness-review-packet.",
      localModelBoundaryGroups: [
        "Local model boundary groups: approval gate, local bridge, prompt/privacy, model selection, result evidence, output retention, rollback, and audit logging.",
      ],
      approvalGateChecklist: [
        "Approval gate checklist: local model execution requires explicit operator approval, approved model scope, approved local bridge boundary, and a documented stop condition outside this page.",
      ],
      localBridgeChecklist: [
        "Local bridge checklist: local bridge endpoint, request schema, allowed workspace, timeout, rate, audit, and failure modes must be implemented and approved before use; this page does not call local bridge endpoints.",
      ],
      promptPrivacyChecklist: [
        "Prompt/privacy checklist: prompts must be reviewed, redacted, scoped, and approved before any local model request; this page does not send prompts.",
      ],
      resultEvidenceChecklist: [
        "Result/evidence checklist: local model outputs need approved capture, redaction, review, retention, rejection, and audit rules before use.",
      ],
      deniedLocalModelExecutionActions: [
        "Denied local model execution actions: call local models, call local bridge endpoints, send prompts, store local model outputs, execute workflows, scan arbitrary projects, mutate files, or approve execution automatically.",
      ],
      unresolvedLocalModelBoundaryBlockers: [
        "Unresolved local model boundary blockers: missing approval gate, missing local bridge contract, unresolved prompt privacy, missing result evidence policy, and missing output retention rule.",
      ],
      connectorExecutionReadinessRoute: "Connector execution readiness route: /connector-execution-boundary-readiness-review reviews connector readiness without calling connectors.",
      automationExecutionReadinessRoute: "Automation execution readiness route: /automation-execution-boundary-readiness-review reviews automation readiness without creating or running automations.",
      nextRecommendedAction: "Next recommended action: keep local model execution blocked until a bounded local model bridge, approval gate, privacy review, and evidence policy are approved outside this page.",
      advancedLocalModelExecutionBoundaryDetails: "Advanced local model execution boundary details: Local model execution boundary readiness review is review-only. Local model execution boundary readiness review does not call local models, local model execution requires explicit operator approval, and unresolved local model boundary blockers stay blocked. It does not call local models, call local bridge endpoints, send prompts, store local model outputs, execute workflows, scan arbitrary projects, call providers, call connectors, fetch connector data, create automations, mutate files, mutate memory, store credentials, or create an MCP runtime.",
    }),
  ];
}

export function buildLocalModelExecutionBoundaryReadinessReviewBoundary(): LocalModelExecutionBoundaryReadinessReviewBoundary {
  return { reviewOnly: true, approvalRequired: true, localModelCallsAllowedFromUi: false, localBridgeEndpointCallsAllowedFromUi: false, promptSendingAllowedFromUi: false, localModelOutputStorageAllowedFromUi: false, workflowExecutionAllowedFromUi: false, providerApiCallsAllowedFromUi: false, connectorApiCallsAllowedFromUi: false, automationCreationAllowedFromUi: false, fileMutationAllowedFromUi: false, outputStorageAllowed: false, credentialStorageAllowed: false };
}

export function summarizeLocalModelExecutionBoundaryReadinessReview(model: Pick<LocalModelExecutionBoundaryReadinessReviewModel, "localModelReviews">): string {
  return "Local model execution boundary readiness review summarizes " + model.localModelReviews.length + " local model boundary review packet. Local model execution boundary readiness review does not call local models, local model execution requires explicit operator approval, and unresolved local model boundary blockers stay blocked.";
}

export function buildLocalModelExecutionBoundaryReadinessReviewModel(): LocalModelExecutionBoundaryReadinessReviewModel {
  const localModelReviews = buildLocalModelExecutionBoundaryReadinessReviews();
  const model: LocalModelExecutionBoundaryReadinessReviewModel = {
    title: "Local model execution boundary readiness review",
    summary: "",
    localModelReviews,
    boundary: buildLocalModelExecutionBoundaryReadinessReviewBoundary(),
    language: [...LOCAL_MODEL_EXECUTION_BOUNDARY_READINESS_REVIEW_LANGUAGE],
    advancedDetails: [
      "Local model execution boundary readiness review",
      "Local model execution boundary identity",
      "Local model boundary groups",
      "Approval gate checklist",
      "Local bridge checklist",
      "Prompt/privacy checklist",
      "Result/evidence checklist",
      "Denied local model execution actions",
      "Unresolved local model boundary blockers",
      "Connector execution readiness route",
      "Automation execution readiness route",
      "Next recommended action",
      "Local model execution boundary readiness review does not call local models",
      "Local model execution requires explicit operator approval",
      "Unresolved local model boundary blockers stay blocked",
      "advanced local model execution boundary details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeLocalModelExecutionBoundaryReadinessReview(model) };
}
