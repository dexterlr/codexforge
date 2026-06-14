import type { ConnectorExecutionBoundaryReadinessReview, ConnectorExecutionBoundaryReadinessReviewBoundary, ConnectorExecutionBoundaryReadinessReviewModel } from "./connector-execution-boundary-readiness-review-types";
import { buildConnectorExecutionBoundaryReadinessReviewStableKey } from "./connector-execution-boundary-readiness-review-types";

export const CONNECTOR_EXECUTION_BOUNDARY_READINESS_REVIEW_LANGUAGE = [
  "Connector execution boundary readiness review",
  "Connector execution boundary readiness review does not call connectors",
  "Connector execution requires explicit operator approval",
  "Unresolved connector boundary blockers stay blocked",
  "Connector boundary groups",
  "Source redaction checklist",
] as const;

export function buildConnectorExecutionBoundaryReadinessReview(input: Omit<ConnectorExecutionBoundaryReadinessReview, "id"> & { idHint: string }): ConnectorExecutionBoundaryReadinessReview {
  const { idHint, ...review } = input;
  return { id: buildConnectorExecutionBoundaryReadinessReviewStableKey("connector-execution-boundary-readiness-review", idHint, input.status), ...review };
}

export function buildConnectorExecutionBoundaryReadinessReviews(): ConnectorExecutionBoundaryReadinessReview[] {
  return [
    buildConnectorExecutionBoundaryReadinessReview({
      idHint: "connector-readiness-review-packet",
      status: "blocked",
      connectorExecutionBoundaryIdentity: "Connector execution boundary identity: connector-execution-boundary-readiness-review-connector-readiness-review-packet.",
      connectorBoundaryGroups: [
        "Connector boundary groups: account permission, source scope, redaction, citation, evidence capture, output retention, rollback, revocation, and audit logging.",
      ],
      accountPermissionChecklist: [
        "Account/permission checklist: connector execution requires explicit operator approval, approved account scope, least-privilege permissions, revocation owner, and no arbitrary account connection from this page.",
      ],
      sourceRedactionChecklist: [
        "Source redaction checklist: sources must be scoped, redacted, cited, reviewed, and approved before use; this page does not fetch connector data.",
      ],
      evidenceCitationChecklist: [
        "Evidence/citation checklist: connector outputs need approved citation, evidence owner, redaction owner, retention rule, and rejection rule before use.",
      ],
      rollbackRevocationChecklist: [
        "Rollback/revocation checklist: account revocation, token rotation, data discard, citation correction, audit owner, and rollback owner must be documented outside this page.",
      ],
      deniedConnectorExecutionActions: [
        "Denied connector execution actions: call connectors, connect accounts, fetch connector data, store connector outputs, store credentials, browse web/search, execute workflows, or approve connector access automatically.",
      ],
      unresolvedConnectorBoundaryBlockers: [
        "Unresolved connector boundary blockers: missing account approval, missing source scope, unresolved redaction, missing citation policy, missing revocation owner, and missing output retention rule.",
      ],
      automationExecutionReadinessRoute: "Automation execution readiness route: /automation-execution-boundary-readiness-review reviews automation readiness without creating or running automations.",
      backendBoundaryInventoryRoute: "Backend boundary inventory route: /live-backend-boundary-inventory inventories missing execution boundaries without running probes.",
      nextRecommendedAction: "Next recommended action: keep connector execution blocked until account permission, source redaction, citation, revocation, and output retention boundaries are approved outside this page.",
      advancedConnectorExecutionBoundaryDetails: "Advanced connector execution boundary details: Connector execution boundary readiness review is review-only. Connector execution boundary readiness review does not call connectors, connector execution requires explicit operator approval, and unresolved connector boundary blockers stay blocked. It does not call connectors, connect accounts, fetch connector data, store connector outputs, store credentials, browse web/search, execute workflows, call providers, call local models, call local bridge endpoints, create automations, mutate files, mutate memory, or create an MCP runtime.",
    }),
  ];
}

export function buildConnectorExecutionBoundaryReadinessReviewBoundary(): ConnectorExecutionBoundaryReadinessReviewBoundary {
  return { reviewOnly: true, approvalRequired: true, connectorApiCallsAllowedFromUi: false, connectorAccountConnectionAllowedFromUi: false, connectorDataFetchAllowedFromUi: false, connectorDataStorageAllowedFromUi: false, workflowExecutionAllowedFromUi: false, providerApiCallsAllowedFromUi: false, localModelCallsAllowedFromUi: false, automationCreationAllowedFromUi: false, fileMutationAllowedFromUi: false, outputStorageAllowed: false, credentialStorageAllowed: false };
}

export function summarizeConnectorExecutionBoundaryReadinessReview(model: Pick<ConnectorExecutionBoundaryReadinessReviewModel, "connectorReviews">): string {
  return "Connector execution boundary readiness review summarizes " + model.connectorReviews.length + " connector boundary review packet. Connector execution boundary readiness review does not call connectors, connector execution requires explicit operator approval, and unresolved connector boundary blockers stay blocked.";
}

export function buildConnectorExecutionBoundaryReadinessReviewModel(): ConnectorExecutionBoundaryReadinessReviewModel {
  const connectorReviews = buildConnectorExecutionBoundaryReadinessReviews();
  const model: ConnectorExecutionBoundaryReadinessReviewModel = {
    title: "Connector execution boundary readiness review",
    summary: "",
    connectorReviews,
    boundary: buildConnectorExecutionBoundaryReadinessReviewBoundary(),
    language: [...CONNECTOR_EXECUTION_BOUNDARY_READINESS_REVIEW_LANGUAGE],
    advancedDetails: [
      "Connector execution boundary readiness review",
      "Connector execution boundary identity",
      "Connector boundary groups",
      "Account/permission checklist",
      "Source redaction checklist",
      "Evidence/citation checklist",
      "Rollback/revocation checklist",
      "Denied connector execution actions",
      "Unresolved connector boundary blockers",
      "Automation execution readiness route",
      "Backend boundary inventory route",
      "Next recommended action",
      "Connector execution boundary readiness review does not call connectors",
      "Connector execution requires explicit operator approval",
      "Unresolved connector boundary blockers stay blocked",
      "advanced connector execution boundary details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeConnectorExecutionBoundaryReadinessReview(model) };
}
