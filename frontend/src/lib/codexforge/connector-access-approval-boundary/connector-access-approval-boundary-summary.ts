import type { ConnectorAccessApprovalBoundary, ConnectorAccessApprovalBoundaryBoundary, ConnectorAccessApprovalBoundaryModel } from "./connector-access-approval-boundary-types";
import { buildConnectorAccessApprovalBoundaryStableKey } from "./connector-access-approval-boundary-types";
import { buildUniversalExecutionReviewBoundary, UNIVERSAL_EXECUTION_REVIEW_SAFETY_MARKERS } from "../universal-execution-review-kit";

export const CONNECTOR_ACCESS_APPROVAL_BOUNDARY_LANGUAGE = [
  "Connector access approval boundary",
  "Connector access approval boundary does not connect accounts or fetch connector data",
  "Connector access requires explicit operator approval",
  "Unsafe connector access stays blocked",
  "Connector groups",
  "Data scope checklist",
] as const;

export function buildConnectorAccessApprovalBoundary(input: Omit<ConnectorAccessApprovalBoundary, "id"> & { idHint: string }): ConnectorAccessApprovalBoundary {
  const { idHint, ...boundary } = input;
  return { id: buildConnectorAccessApprovalBoundaryStableKey("connector-access-approval-boundary", idHint, input.status), ...boundary };
}

export function buildConnectorAccessApprovalBoundaries(): ConnectorAccessApprovalBoundary[] {
  return [
    buildConnectorAccessApprovalBoundary({
      idHint: "connector-access-approval-boundary",
      status: "blocked",
      identity: "Connector boundary identity: connector-access-approval-boundary reviews accounts, scopes, fetches, mutations, redaction, audit, and revocation without connecting accounts or fetching connector data.",
      sections: [
        { label: "Connector groups", items: ["Connector groups: email, calendar, contacts, documents, chat, issue trackers, source control, storage, meetings, notifications, and custom connectors stay blocked until approved."] },
        { label: "Account/permission checklist", items: ["Account/permission checklist: account owner, consent, scopes, revocation, minimum privilege, and no credential storage must be reviewed before any future connector access."] },
        { label: "Data scope checklist", items: ["Data scope checklist: requested objects, time range, privacy class, redaction, citation, retention, and denied sensitive fields must be visible before approval."] },
        { label: "Fetch/mutation checklist", items: ["Fetch/mutation checklist: read, create, update, delete, send, schedule, and notify operations remain denied unless a specific approved connector boundary exists."] },
        { label: "Redaction/audit checklist", items: ["Redaction/audit checklist: private connector data, evidence, result review, audit owner, and output retention must be defined before future access."] },
        { label: "Denied connector actions", items: ["Denied connector actions: connect accounts, fetch connector data, mutate connector data, send messages, create events, browse web/search/connectors, persist connector data, or store credentials from UI."] },
        { label: "Unresolved connector blockers", items: ["Unresolved connector blockers: missing account consent, missing scope approval, missing redaction, missing audit route, missing evidence boundary, and missing result review keep unsafe connector access blocked."] },
      ],
      routes: ["/evidence-capture-boundary", "/result-review-boundary", "/workflow-profile-registry"],
      nextRecommendedAction: "Next recommended action: keep connector access blocked, review account and data scope requirements, then seek explicit operator approval after connector implementation evidence exists.",
      advancedDetails: `Advanced connector access approval boundary details: Connector access approval boundary does not connect accounts or fetch connector data. Connector access requires explicit operator approval. Unsafe connector access stays blocked. ${UNIVERSAL_EXECUTION_REVIEW_SAFETY_MARKERS.join("; ")}.`,
    }),
  ];
}

export function buildConnectorAccessApprovalBoundaryBoundary(): ConnectorAccessApprovalBoundaryBoundary {
  return buildUniversalExecutionReviewBoundary();
}

export function summarizeConnectorAccessApprovalBoundary(model: Pick<ConnectorAccessApprovalBoundaryModel, "connectorAccessApprovalBoundaries">): string {
  return "Connector access approval boundary reviews " + model.connectorAccessApprovalBoundaries.length + " connector boundary packet without connecting accounts or fetching connector data. Connector access requires explicit operator approval, and unsafe connector access stays blocked.";
}

export function buildConnectorAccessApprovalBoundaryModel(): ConnectorAccessApprovalBoundaryModel {
  const connectorAccessApprovalBoundaries = buildConnectorAccessApprovalBoundaries();
  const model: ConnectorAccessApprovalBoundaryModel = {
    title: "Connector access approval boundary",
    summary: "",
    reviewPackets: connectorAccessApprovalBoundaries,
    connectorAccessApprovalBoundaries,
    boundary: buildConnectorAccessApprovalBoundaryBoundary(),
    language: [...CONNECTOR_ACCESS_APPROVAL_BOUNDARY_LANGUAGE],
    advancedDetails: [
      "Connector boundary identity",
      "Connector groups",
      "Account/permission checklist",
      "Data scope checklist",
      "Fetch/mutation checklist",
      "Redaction/audit checklist",
      "Denied connector actions",
      "Unresolved connector blockers",
      "Evidence boundary route",
      "Result review boundary route",
      "Next recommended action",
      "advanced connector access approval boundary details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizeConnectorAccessApprovalBoundary(model) };
}
