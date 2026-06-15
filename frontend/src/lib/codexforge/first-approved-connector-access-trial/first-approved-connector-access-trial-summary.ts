import type { FirstApprovedConnectorAccessTrial, FirstApprovedConnectorAccessTrialBoundary, FirstApprovedConnectorAccessTrialModel } from "./first-approved-connector-access-trial-types";
import { buildFirstApprovedConnectorAccessTrialStableKey } from "./first-approved-connector-access-trial-types";

export const FIRST_APPROVED_CONNECTOR_ACCESS_TRIAL_LANGUAGE = [
  "First approved connector access trial",
  "First approved connector access trial does not call connectors from UI",
  "Connector access requires explicit operator approval at the boundary",
  "Unapproved connector trial paths remain blocked",
  "Connector trial groups",
  "Source redaction checklist",
] as const;

export function buildFirstApprovedConnectorAccessTrial(input: Omit<FirstApprovedConnectorAccessTrial, "id"> & { idHint: string }): FirstApprovedConnectorAccessTrial {
  const { idHint, ...trial } = input;
  return { id: buildFirstApprovedConnectorAccessTrialStableKey("first-approved-connector-access-trial", idHint, input.status), ...trial };
}

export function buildFirstApprovedConnectorAccessTrials(): FirstApprovedConnectorAccessTrial[] {
  return [
    buildFirstApprovedConnectorAccessTrial({
      idHint: "connector-access-trial-review-packet",
      status: "blocked",
      firstApprovedConnectorTrialIdentity: "First approved connector trial identity: first-approved-connector-access-trial-connector-access-trial-review-packet.",
      connectorTrialGroups: [
        "Connector trial groups: account permission, source scope, redaction, citation, evidence capture, retention, rollback, revocation, and audit logging.",
      ],
      accountPermissionChecklist: [
        "Account/permission checklist: connector access requires explicit operator approval at the boundary, with account scope, least-privilege permission, revocation owner, and stop condition reviewed elsewhere.",
      ],
      sourceRedactionChecklist: [
        "Source redaction checklist: source scope, private fields, citation needs, redaction owner, and rejection rule must be approved before any connector access elsewhere.",
      ],
      evidenceCitationChecklist: [
        "Evidence/citation checklist: connector outputs need approved citation, evidence owner, redaction, retention, and audit policy before use.",
      ],
      rollbackRevocationChecklist: [
        "Rollback/revocation checklist: access revocation, token rotation, data discard, citation correction, and audit owner must be documented before live access claims.",
      ],
      deniedConnectorTrialActions: [
        "Denied connector trial actions: call connectors, connect accounts, fetch connector data, store connector outputs, store credentials, browse web/search, approve connector paths automatically, or persist permissions.",
      ],
      unresolvedConnectorTrialBlockers: [
        "Unresolved connector trial blockers: missing account approval, missing source scope, unresolved redaction, missing citation policy, missing revocation owner, and missing output retention rule.",
      ],
      firstApprovedAutomationDryRunRoute: "First approved automation dry-run route: /first-approved-automation-dry-run-trial reviews automation dry-run readiness without creating automations.",
      firstApprovedFilePatchDryRunRoute: "First approved file patch dry-run route: /first-approved-file-patch-dry-run reviews patch dry-run readiness without applying patches.",
      nextRecommendedAction: "Next recommended action: keep unapproved connector trial paths blocked until account permission, source redaction, evidence, citation, revocation, and explicit approval are implemented outside this page.",
      advancedConnectorTrialDetails: "Advanced connector trial details: First approved connector access trial is review-only. First approved connector access trial does not call connectors from UI, connector access requires explicit operator approval at the boundary, and unapproved connector trial paths remain blocked. It does not call connectors, connect accounts, fetch connector data, store connector outputs, store credentials, browse web/search, persist permissions, persist approvals, call providers, call local models, create automations, mutate files, run tests, or create an MCP runtime.",
    }),
  ];
}

export function buildFirstApprovedConnectorAccessTrialBoundary(): FirstApprovedConnectorAccessTrialBoundary {
  return { reviewOnly: true, approvalRequired: true, connectorApiCallsAllowedFromUi: false, connectorAccountConnectionAllowedFromUi: false, connectorDataFetchAllowedFromUi: false, connectorDataStorageAllowedFromUi: false, approvalDecisionPersistenceAllowedFromUi: false, providerApiCallsAllowedFromUi: false, localModelCallsAllowedFromUi: false, automationCreationAllowedFromUi: false, fileMutationAllowedFromUi: false, outputStorageAllowed: false, credentialStorageAllowed: false };
}

export function summarizeFirstApprovedConnectorAccessTrial(model: Pick<FirstApprovedConnectorAccessTrialModel, "connectorTrials">): string {
  return "First approved connector access trial summarizes " + model.connectorTrials.length + " connector access trial review packet. First approved connector access trial does not call connectors from UI, connector access requires explicit operator approval at the boundary, and unapproved connector trial paths remain blocked.";
}

export function buildFirstApprovedConnectorAccessTrialModel(): FirstApprovedConnectorAccessTrialModel {
  const connectorTrials = buildFirstApprovedConnectorAccessTrials();
  const model: FirstApprovedConnectorAccessTrialModel = {
    title: "First approved connector access trial",
    summary: "",
    connectorTrials,
    boundary: buildFirstApprovedConnectorAccessTrialBoundary(),
    language: [...FIRST_APPROVED_CONNECTOR_ACCESS_TRIAL_LANGUAGE],
    advancedDetails: [
      "First approved connector access trial",
      "First approved connector trial identity",
      "Connector trial groups",
      "Account/permission checklist",
      "Source redaction checklist",
      "Evidence/citation checklist",
      "Rollback/revocation checklist",
      "Denied connector trial actions",
      "Unresolved connector trial blockers",
      "First approved automation dry-run route",
      "First approved file patch dry-run route",
      "Next recommended action",
      "First approved connector access trial does not call connectors from UI",
      "Connector access requires explicit operator approval at the boundary",
      "Unapproved connector trial paths remain blocked",
      "advanced connector trial details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeFirstApprovedConnectorAccessTrial(model) };
}
