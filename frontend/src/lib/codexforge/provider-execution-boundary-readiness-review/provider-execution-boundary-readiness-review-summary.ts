import type { ProviderExecutionBoundaryReadinessReview, ProviderExecutionBoundaryReadinessReviewBoundary, ProviderExecutionBoundaryReadinessReviewModel } from "./provider-execution-boundary-readiness-review-types";
import { buildProviderExecutionBoundaryReadinessReviewStableKey } from "./provider-execution-boundary-readiness-review-types";

export const PROVIDER_EXECUTION_BOUNDARY_READINESS_REVIEW_LANGUAGE = [
  "Provider execution boundary readiness review",
  "Provider execution boundary readiness review does not call providers",
  "Provider execution requires explicit operator approval",
  "Unresolved provider boundary blockers stay blocked",
  "Provider boundary groups",
  "Budget rate-limit checklist",
] as const;

export function buildProviderExecutionBoundaryReadinessReview(input: Omit<ProviderExecutionBoundaryReadinessReview, "id"> & { idHint: string }): ProviderExecutionBoundaryReadinessReview {
  const { idHint, ...review } = input;
  return { id: buildProviderExecutionBoundaryReadinessReviewStableKey("provider-execution-boundary-readiness-review", idHint, input.status), ...review };
}

export function buildProviderExecutionBoundaryReadinessReviews(): ProviderExecutionBoundaryReadinessReview[] {
  return [
    buildProviderExecutionBoundaryReadinessReview({
      idHint: "provider-readiness-review-packet",
      status: "blocked",
      providerExecutionBoundaryIdentity: "Provider execution boundary identity: provider-execution-boundary-readiness-review-provider-readiness-review-packet.",
      providerBoundaryGroups: [
        "Provider boundary groups: approval gate, prompt/privacy, credential handling, budget, rate-limit, result evidence, output retention, rollback, and audit logging.",
      ],
      approvalGateChecklist: [
        "Approval gate checklist: provider execution requires explicit operator approval, approved provider scope, approved model/provider target, and a documented stop condition outside this page.",
      ],
      promptPrivacyChecklist: [
        "Prompt/privacy checklist: prompts must be reviewed, redacted, scoped, and approved before any provider request; this page does not send prompts.",
      ],
      budgetRateLimitChecklist: [
        "Budget rate-limit checklist: budget ceiling, rate-limit policy, retry policy, timeout policy, and cost owner must be reviewed before execution outside this page.",
      ],
      resultEvidenceChecklist: [
        "Result/evidence checklist: provider outputs need approved capture, redaction, review, retention, citation, and rejection rules before use.",
      ],
      deniedProviderExecutionActions: [
        "Denied provider execution actions: call providers, route provider traffic, send prompts, test provider connections, store provider outputs, store credentials, persist settings, execute workflows, or approve execution automatically.",
      ],
      unresolvedProviderBoundaryBlockers: [
        "Unresolved provider boundary blockers: missing approval gate, unresolved prompt privacy, unresolved budget/rate-limit owner, missing evidence policy, and missing output retention rule.",
      ],
      localModelExecutionReadinessRoute: "Local model execution readiness route: /local-model-execution-boundary-readiness-review reviews local model readiness without calling local models.",
      connectorExecutionReadinessRoute: "Connector execution readiness route: /connector-execution-boundary-readiness-review reviews connector readiness without calling connectors.",
      nextRecommendedAction: "Next recommended action: keep provider execution blocked until a bounded provider implementation, approval gate, privacy review, budget policy, and evidence policy are approved outside this page.",
      advancedProviderExecutionBoundaryDetails: "Advanced provider execution boundary details: Provider execution boundary readiness review is review-only. Provider execution boundary readiness review does not call providers, provider execution requires explicit operator approval, and unresolved provider boundary blockers stay blocked. It does not call providers, route provider traffic, send prompts, store provider outputs, store credentials, persist endpoints, execute workflows, call local models, call local bridge endpoints, call connectors, fetch connector data, create automations, mutate files, mutate memory, or create an MCP runtime.",
    }),
  ];
}

export function buildProviderExecutionBoundaryReadinessReviewBoundary(): ProviderExecutionBoundaryReadinessReviewBoundary {
  return { reviewOnly: true, approvalRequired: true, providerApiCallsAllowedFromUi: false, providerTrafficRoutingAllowedFromUi: false, promptSendingAllowedFromUi: false, providerOutputStorageAllowedFromUi: false, workflowExecutionAllowedFromUi: false, providerCredentialStorageAllowedFromUi: false, localModelCallsAllowedFromUi: false, connectorApiCallsAllowedFromUi: false, automationCreationAllowedFromUi: false, outputStorageAllowed: false, credentialStorageAllowed: false };
}

export function summarizeProviderExecutionBoundaryReadinessReview(model: Pick<ProviderExecutionBoundaryReadinessReviewModel, "providerReviews">): string {
  return "Provider execution boundary readiness review summarizes " + model.providerReviews.length + " provider boundary review packet. Provider execution boundary readiness review does not call providers, provider execution requires explicit operator approval, and unresolved provider boundary blockers stay blocked.";
}

export function buildProviderExecutionBoundaryReadinessReviewModel(): ProviderExecutionBoundaryReadinessReviewModel {
  const providerReviews = buildProviderExecutionBoundaryReadinessReviews();
  const model: ProviderExecutionBoundaryReadinessReviewModel = {
    title: "Provider execution boundary readiness review",
    summary: "",
    providerReviews,
    boundary: buildProviderExecutionBoundaryReadinessReviewBoundary(),
    language: [...PROVIDER_EXECUTION_BOUNDARY_READINESS_REVIEW_LANGUAGE],
    advancedDetails: [
      "Provider execution boundary readiness review",
      "Provider execution boundary identity",
      "Provider boundary groups",
      "Approval gate checklist",
      "Prompt/privacy checklist",
      "Budget rate-limit checklist",
      "Result/evidence checklist",
      "Denied provider execution actions",
      "Unresolved provider boundary blockers",
      "Local model execution readiness route",
      "Connector execution readiness route",
      "Next recommended action",
      "Provider execution boundary readiness review does not call providers",
      "Provider execution requires explicit operator approval",
      "Unresolved provider boundary blockers stay blocked",
      "advanced provider execution boundary details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeProviderExecutionBoundaryReadinessReview(model) };
}
