import type {
  ConnectorPermissionReadinessAudit,
  ConnectorPermissionReadinessAuditBoundary,
  ConnectorPermissionReadinessAuditModel,
} from "./connector-permission-readiness-audit-types";
import { buildConnectorPermissionReadinessAuditStableKey } from "./connector-permission-readiness-audit-types";

export const CONNECTOR_PERMISSION_READINESS_AUDIT_LANGUAGE = [
  "Connector permission readiness audit",
  "Connector permission audit does not connect accounts",
  "Connector access requires explicit approval",
  "Private connector details stay redacted until approved",
  "Connector groups",
  "Permission scopes",
] as const;

export function buildConnectorPermissionReadinessAudit(
  input: Omit<ConnectorPermissionReadinessAudit, "id"> & { idHint: string }
): ConnectorPermissionReadinessAudit {
  const { idHint, ...audit } = input;
  return {
    id: buildConnectorPermissionReadinessAuditStableKey("connector-permission-readiness-audit", idHint, input.status),
    ...audit,
  };
}

export function buildConnectorPermissionReadinessAudits(): ConnectorPermissionReadinessAudit[] {
  return [
    buildConnectorPermissionReadinessAudit({
      idHint: "review-only-connector-scope",
      status: "ready-for-review",
      connectorPermissionIdentity:
        "Connector permission identity: connector-permission-readiness-audit-review-only-connector-scope.",
      connectorGroups: [
        "Connector groups: Gmail, Calendar, Contacts, workspace evidence connectors, notification handoff, and manual connector review.",
        "Connector groups: every connector group is reviewed as redacted readiness text only; no account is connected.",
      ],
      permissionScopes: [
        "Permission scopes: read-only metadata preview, explicit operator approval, minimal scope, redacted evidence labels, and denied mutation scope.",
        "Permission scopes: connector access requires explicit approval before any future connector data can be read.",
      ],
      redactionPrivacyRules: [
        "Redaction/privacy rules: Private connector details stay redacted until approved.",
        "Redaction/privacy rules: tokens, account names, email content, calendar content, contact values, private IDs, and secrets are not displayed or stored here.",
      ],
      deniedConnectorActions: [
        "Denied connector actions: connector API calls, Gmail connection, Calendar connection, Contacts connection, OAuth flows, token storage, account sync, email reads, event mutation, contact mutation, evidence ingestion, notification sending, and permission grant persistence.",
        "Denied connector actions: provider calls, automations, local bridge calls, local files, commands, memory mutation, plugins, tools, agents, and MCP calls stay blocked.",
      ],
      manualValidationChecklist: [
        "Manual validation checklist: review connector owner, minimum scopes, redaction plan, approval owner, recovery path, and denied action list outside this UI.",
        "Manual validation checklist: confirm private connector details remain redacted before any future approved connector access.",
      ],
      blockedConnectorRisks: [
        "Blocked connector risks: any request to connect accounts, call connector APIs, read connector data, store tokens, display private details, or persist grants blocks readiness.",
        "Blocked connector risks: connector permission audit does not connect accounts and cannot approve connector access.",
      ],
      automationPermissionRoute:
        "Automation permission route: /automation-permission-readiness-audit reviews automation permissions without creating schedules or tasks.",
      providerRoutingRoute:
        "Provider routing route: /provider-routing-readiness-audit reviews provider routing without sending provider traffic.",
      nextRecommendedAction:
        "Next recommended action: review automation permission readiness and provider routing readiness before any future connector approval packet.",
      advancedConnectorDetails:
        "Advanced connector details: connector permission readiness audit is review-only. Connector permission audit does not connect accounts, connector access requires explicit approval, and private connector details stay redacted until approved. It does not call connector APIs, connect Gmail, connect Calendar, connect Contacts, start OAuth, store connector tokens, display private connector details, sync accounts, read email, read calendar events, read contacts, mutate connector data, persist permission grants, send notifications, call provider APIs, send provider traffic, create automations, create schedules, create tasks, create watches, call local bridge endpoints, call local services, launch local tools, scan projects, browse local files, read local files, mutate files, write files, delete files, export files, run workflows, execute actions, approve actions, automate approval, run shell commands, run git commands, run tests, run builds, run smoke checks, apply patches, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, create background jobs, execute plugins, execute tools, execute agents, create an MCP runtime, call MCP tools, print process.env, display secrets, remove route coverage, install packages, or vendor Ruflo/Odysseus code.",
    }),
    buildConnectorPermissionReadinessAudit({
      idHint: "blocked-account-connection-request",
      status: "blocked",
      connectorPermissionIdentity:
        "Connector permission identity: connector-permission-readiness-audit-blocked-account-connection-request.",
      connectorGroups: [
        "Connector groups: blocked because the request asks to connect accounts.",
      ],
      permissionScopes: [
        "Permission scopes: no scope is granted or persisted from this audit.",
      ],
      redactionPrivacyRules: [
        "Redaction/privacy rules: private connector details remain redacted.",
      ],
      deniedConnectorActions: [
        "Denied connector actions: account connection, connector API calls, token storage, connector reads, and permission grants remain blocked.",
      ],
      manualValidationChecklist: [
        "Manual validation checklist: return to approval review before any future connector access.",
      ],
      blockedConnectorRisks: [
        "Blocked connector risks: connection requests are outside this review-only audit.",
      ],
      automationPermissionRoute:
        "Automation permission route: /automation-permission-readiness-audit remains review-only.",
      providerRoutingRoute:
        "Provider routing route: /provider-routing-readiness-audit remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep connector account connection blocked and document the missing approval.",
      advancedConnectorDetails:
        "Advanced connector details: blocked connector permission readiness cannot recover by connecting accounts, calling connector APIs, storing connector tokens, displaying private details, or persisting permission grants.",
    }),
  ];
}

export function buildConnectorPermissionReadinessAuditBoundary(): ConnectorPermissionReadinessAuditBoundary {
  return {
    connectorPermissionReadinessAuditReviewOnly: true,
    connectorPermissionAuditDoesNotConnectAccounts: true,
    connectorAccessRequiresExplicitApproval: true,
    privateConnectorDetailsStayRedactedUntilApproved: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    connectorAccountConnectionAllowedFromUi: false,
    gmailConnectionAllowedFromUi: false,
    calendarConnectionAllowedFromUi: false,
    contactsConnectionAllowedFromUi: false,
    connectorTokenStorageAllowedFromUi: false,
    permissionGrantPersistenceAllowedFromUi: false,
    privateConnectorDetailsDisplayedAllowed: false,
    providerApiCallsAllowedFromUi: false,
    providerTrafficAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    backgroundJobCreationAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    localServiceCallsAllowedFromUi: false,
    localToolLaunchingAllowedFromUi: false,
    localFileReadScanAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    memoryMutationAllowedFromUi: false,
    brainGraphMutationAllowed: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    testBuildSmokeExecutionAllowedFromUi: false,
    processEnvDisplayAllowed: false,
    secretsDisplayedAllowed: false,
    pluginExecutionAllowedFromUi: false,
    toolExecutionAllowedFromUi: false,
    agentExecutionAllowedFromUi: false,
    mcpRuntimeCreated: false,
    mcpToolCallsAllowedFromUi: false,
    routeCoverageRemovalAllowed: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeConnectorPermissionReadinessAudit(
  model: Pick<ConnectorPermissionReadinessAuditModel, "audits">
): string {
  return `Connector permission readiness audit prepares ${model.audits.length} connector permission posture(s). Connector permission audit does not connect accounts, connector access requires explicit approval, and private connector details stay redacted until approved.`;
}

export function buildConnectorPermissionReadinessAuditModel(): ConnectorPermissionReadinessAuditModel {
  const audits = buildConnectorPermissionReadinessAudits();
  const model: ConnectorPermissionReadinessAuditModel = {
    title: "Connector permission readiness audit",
    summary: "",
    audits,
    boundary: buildConnectorPermissionReadinessAuditBoundary(),
    readinessLanguage: [...CONNECTOR_PERMISSION_READINESS_AUDIT_LANGUAGE],
    advancedDetails: [
      "Connector permission readiness audit",
      "connector permission identity",
      "Connector groups",
      "Permission scopes",
      "redaction/privacy rules",
      "denied connector actions",
      "Manual validation checklist",
      "blocked connector risks",
      "automation permission route",
      "provider routing route",
      "next recommended action",
      "Connector permission audit does not connect accounts",
      "Connector access requires explicit approval",
      "Private connector details stay redacted until approved",
      "advanced connector details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeConnectorPermissionReadinessAudit(model) };
}
