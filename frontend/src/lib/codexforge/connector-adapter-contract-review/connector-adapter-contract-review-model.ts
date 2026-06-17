import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildConnectorAdapterContractReviewStableKey } from "../universal-execution-review-kit";
import {
  buildExecutionAdapterContractReview,
  buildExecutionAdapterContractReviewAdvancedDetails,
  buildExecutionAdapterContractReviewBoundary,
  buildExecutionAdapterContractReviewModel,
  buildExecutionAdapterContractReviewSections,
  summarizeExecutionAdapterContractReview,
  type ExecutionAdapterContractReviewPacketInput,
} from "../execution-adapter-contract-review-kit";

export { buildConnectorAdapterContractReviewStableKey };

export const CONNECTOR_ADAPTER_CONTRACT_REVIEW_LANGUAGE = [
  "Connector adapter contract review",
  "Connector adapter contract review does not connect accounts or fetch connector data",
  "Connector adapters require explicit operator approval",
  "Adapter not executable from UI",
  "Account permission",
  "Data scope",
  "Fetch/mutation",
  "Redaction/audit",
  "Result review",
  "Denied connector adapter actions",
] as const;

const CONNECTOR_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS = [
  "Connector adapter contract review identity",
  "Account permission",
  "Data scope",
  "Fetch/mutation",
  "Redaction/audit",
  "Result review",
  "Denied connector adapter actions",
  "Unresolved connector adapter blockers",
  "What this unlocks later",
  "Next recommended action",
  "advanced connector adapter contract review details collapsed/secondary",
] as const;

export function buildConnectorAdapterContractReview(input: ExecutionAdapterContractReviewPacketInput): UniversalExecutionReviewPacket {
  return buildExecutionAdapterContractReview("connector-adapter-contract-review", input);
}

export function buildConnectorAdapterContractReviews(): UniversalExecutionReviewPacket[] {
  return [
    buildConnectorAdapterContractReview({
      idHint: "connector-adapter-contract-review",
      status: "blocked",
      identity: "Connector adapter contract review identity: Connector adapter contract review does not connect accounts or fetch connector data. Connector adapters require explicit operator approval before any future account, data, fetch, or mutation boundary.",
      sections: buildExecutionAdapterContractReviewSections(
        { label: "Account permission", items: ["Account permission: account identity, consent state, scopes, owner, revocation path, and no automatic account connection must be visible."] },
        { label: "Data scope", items: ["Data scope: connector, workspace, collection, date range, fields, privacy class, and denied data categories must be reviewed before any future fetch."] },
        { label: "Fetch/mutation", items: ["Fetch/mutation: read-only fetches, write/mutation requests, pagination, rate limits, dry-run preview, and denial handling need separate approval contracts."] },
        { label: "Redaction/audit", items: ["Redaction/audit: secrets, personal data, connector payloads, and identifiers need redaction plus an audit trail that does not store credentials or approval decisions here."] },
        { label: "Result review", items: ["Result review: fetched or mutated connector outcomes require acceptance, rejection, evidence routing, and no automatic reuse or storage."] },
        { label: "Denied connector adapter actions", items: ["Denied connector adapter actions: connect accounts, fetch connector data, mutate connector data, send messages, create events, browse web/search/connectors, persist connector data, or store credentials from UI."] },
        { label: "Unresolved connector adapter blockers", items: ["Unresolved connector adapter blockers: missing consent model, scope guard, credential boundary, redaction policy, audit route, evidence route, and result review keep connector access blocked."] },
      ),
      routes: ["/execution-adapter-contract-inventory", "/evidence-store-adapter-contract-review", "/result-store-adapter-contract-review"],
      nextRecommendedAction: "Next recommended action: keep connector access blocked while account permission, data scope, fetch/mutation, redaction/audit, and result review contracts are completed.",
      advancedDetails: buildExecutionAdapterContractReviewAdvancedDetails("connector adapter contract review", CONNECTOR_ADAPTER_CONTRACT_REVIEW_LANGUAGE, CONNECTOR_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS),
    }),
  ];
}

export function buildConnectorAdapterContractReviewBoundary() {
  return buildExecutionAdapterContractReviewBoundary();
}

export function summarizeConnectorAdapterContractReview(model: { connectorAdapterContractReviews: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeExecutionAdapterContractReview("Connector adapter contract review", model.connectorAdapterContractReviews, "Connector adapters require explicit operator approval.");
}

export function buildConnectorAdapterContractReviewModel() {
  const connectorAdapterContractReviews = buildConnectorAdapterContractReviews();
  const model = buildExecutionAdapterContractReviewModel({
    phase: "Phase 671",
    title: "Connector adapter contract review",
    summarySubject: "Connector adapter contract review",
    approvalCopy: "Connector adapters require explicit operator approval.",
    subtitle: "Review the connector adapter contract without connecting accounts or fetching connector data.",
    primaryLabel: "Review connector adapter",
    anchor: "connector-adapter-contract-review",
    plainEnglishTitle: "Plain-English connector adapter contract review",
    plainEnglishCopy: "This page defines what a real connector adapter must show before it can ever touch an account or data source: permissions, data scope, fetch/mutation rules, redaction/audit, result review, and denied actions. It is not implemented yet.",
    language: CONNECTOR_ADAPTER_CONTRACT_REVIEW_LANGUAGE,
    advancedDetails: [...CONNECTOR_ADAPTER_CONTRACT_REVIEW_ADVANCED_DETAILS],
    links: [
      { href: "/execution-adapter-contract-inventory", label: "Adapter inventory" },
      { href: "/evidence-store-adapter-contract-review", label: "Evidence store adapter" },
      { href: "/result-store-adapter-contract-review", label: "Result store adapter" },
    ],
    packets: connectorAdapterContractReviews,
    advancedCopy: "advanced connector adapter contract review details collapsed/secondary. This route does not connect accounts, fetch connector data, mutate connector data, browse web/search/connectors, persist connector data, store credentials, or create watches.",
    dataScope: "connector-adapter-contract-review buildConnectorAdapterContractReviewStableKey ConnectorAdapterContractReviewPanel",
  });
  return { ...model, connectorAdapterContractReviews };
}
