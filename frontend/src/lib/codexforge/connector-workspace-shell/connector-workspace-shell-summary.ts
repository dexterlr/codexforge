import type {
  ConnectorWorkspaceShell,
  ConnectorWorkspaceShellBoundary,
  ConnectorWorkspaceShellModel,
} from "./connector-workspace-shell-types";
import { buildConnectorWorkspaceShellStableKey } from "./connector-workspace-shell-types";

export const CONNECTOR_WORKSPACE_SHELL_LANGUAGE = [
  "Connector workspace shell",
  "Connectors require explicit approval",
  "No connector data is read from this page",
  "Tokens and secrets are never displayed or stored here",
  "Data sensitivity classification",
  "Connector evidence review route",
] as const;

export function buildConnectorWorkspaceShell(
  input: Omit<ConnectorWorkspaceShell, "id"> & { idHint: string }
): ConnectorWorkspaceShell {
  const { idHint, ...workspace } = input;
  return {
    id: buildConnectorWorkspaceShellStableKey("connector-workspace-shell", idHint, input.status),
    ...workspace,
  };
}

export function buildConnectorWorkspaceShells(): ConnectorWorkspaceShell[] {
  return [
    buildConnectorWorkspaceShell({
      idHint: "review-only-first-loop",
      status: "ready for review",
      workspaceIdentity: "Workspace identity: connector-workspace-shell-review-only-first-loop.",
      connectorGoalSummary:
        "Connector goal summary: plan future Gmail, Calendar, and Contacts work before any connector data can be requested, read, synced, or used.",
      connectorTypes: [
        "Connector type: Gmail boundary review",
        "Connector type: Calendar boundary review",
        "Connector type: Contacts boundary review",
      ],
      dataSensitivityClassification:
        "Data sensitivity classification: high sensitivity because email, calendar, and contact data may include private personal, organizational, and relationship context.",
      approvalChecklist: [
        "Approval checklist: confirm the connector, scope, purpose, and reviewer before any future connector request.",
        "Approval checklist: confirm no OAuth request is started from this page.",
        "Approval checklist: confirm tokens, secrets, message bodies, event details, and private contact details stay hidden.",
        "Approval checklist: confirm connector evidence is reviewed before use and never promoted to memory automatically.",
      ],
      connectorEvidenceReviewRoute:
        "Connector evidence review route: /research-evidence-inbox is the review checkpoint for future connector evidence notes before use.",
      gmailBoundaryRoute:
        "Gmail boundary route: /gmail-connector-boundary reviews future Gmail search, read, draft, and send limits before any Gmail action.",
      calendarBoundaryRoute:
        "Calendar boundary route: /calendar-connector-boundary reviews future calendar search, read, create, update, and delete limits before any Calendar action.",
      contactsBoundaryRoute:
        "Contacts boundary route: /contacts-connector-boundary reviews future contact lookup, read, create, update, and delete limits before any Contacts action.",
      blockedReasons: [
        "Connectors require explicit approval",
        "No connector data is read from this page",
        "Tokens and secrets are never displayed or stored here",
      ],
      advancedWorkspaceDetails:
        "Advanced workspace details: this connector workspace shell does not request OAuth, request connector authorization, call Gmail APIs, call Calendar APIs, call Contacts APIs, call Google APIs, read connector data, sync connector data, draft or send email, mutate events, mutate contacts, store tokens, display secrets, send connector data to providers, ingest connector evidence, promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an MCP runtime, run commands, browse files, write files, apply patches, delete files, install packages, or vendor Ruflo/Odysseus code.",
    }),
    buildConnectorWorkspaceShell({
      idHint: "blocked-missing-scope",
      status: "blocked",
      workspaceIdentity: "Workspace identity: connector-workspace-shell-blocked-missing-scope.",
      connectorGoalSummary:
        "Connector goal summary: blocked until the future connector task has a narrow purpose, named connector type, allowed actions, denied actions, and approval checkpoint.",
      connectorTypes: [
        "Connector type: Gmail blocked until message scope is reviewed",
        "Connector type: Calendar blocked until event scope is reviewed",
        "Connector type: Contacts blocked until contact scope is reviewed",
      ],
      dataSensitivityClassification:
        "Data sensitivity classification: blocked high sensitivity because private connector data cannot be requested without explicit scope review.",
      approvalChecklist: [
        "Approval checklist: blocked until reviewer approval is recorded outside this page.",
        "Approval checklist: blocked until connector evidence review stays separate from memory.",
        "Approval checklist: blocked until token and secret handling is explicit.",
      ],
      connectorEvidenceReviewRoute:
        "Connector evidence review route: blocked evidence remains review-only at /research-evidence-inbox and is not ingested automatically.",
      gmailBoundaryRoute:
        "Gmail boundary route: /gmail-connector-boundary remains blocked for unapproved Gmail reads, drafts, or sends.",
      calendarBoundaryRoute:
        "Calendar boundary route: /calendar-connector-boundary remains blocked for unapproved event reads or mutations.",
      contactsBoundaryRoute:
        "Contacts boundary route: /contacts-connector-boundary remains blocked for unapproved contact reads or mutations.",
      blockedReasons: [
        "Connector scope missing",
        "Explicit approval missing",
        "Connector evidence review boundary missing",
      ],
      advancedWorkspaceDetails:
        "Advanced workspace details: blocked connector planning cannot imply OAuth, authorization, connector API calls, Google API calls, automatic connector reads, email drafts or sends, calendar event mutation, contact mutation, token storage, secret display, provider send, memory ingestion, memory promotion, Brain graph mutation, plugin execution, tool execution, agent execution, MCP runtime, command execution, local file access, file mutation, package install behavior, or third-party vendoring.",
    }),
  ];
}

export function buildConnectorWorkspaceShellBoundary(): ConnectorWorkspaceShellBoundary {
  return {
    connectorWorkspaceReviewOnly: true,
    connectorsRequireExplicitApproval: true,
    connectorDataReadFromPageAllowed: false,
    connectorApiCallsAllowedFromUi: false,
    googleApiCallsAllowedFromUi: false,
    gmailApiCallsAllowedFromUi: false,
    calendarApiCallsAllowedFromUi: false,
    contactsApiCallsAllowedFromUi: false,
    oauthRequestFlowAllowedFromUi: false,
    connectorAuthorizationAllowedFromUi: false,
    connectorTokenStorageAllowedFromUi: false,
    browserTokenStorageAllowed: false,
    localStorageTokenStorageAllowed: false,
    sessionStorageTokenStorageAllowed: false,
    tokensDisplayedAllowed: false,
    secretsDisplayedAllowed: false,
    connectorSyncAllowedFromUi: false,
    automaticConnectorReadsAllowed: false,
    automaticEmailReadsAllowed: false,
    automaticCalendarReadsAllowed: false,
    automaticContactReadsAllowed: false,
    emailDraftSendAllowedFromUi: false,
    calendarEventMutationAllowedFromUi: false,
    contactMutationAllowedFromUi: false,
    connectorEvidenceAutoIngestionAllowed: false,
    connectorEvidenceAutoPromotionAllowed: false,
    memoryIngestionAllowedFromUi: false,
    ragIngestionAllowedFromUi: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    automaticProviderCallsAllowed: false,
    providerApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    promptFileSourceConnectorAutoSendAllowed: false,
    pluginExecutionAllowedFromUi: false,
    toolExecutionAllowedFromUi: false,
    agentExecutionAllowedFromUi: false,
    extensionRuntimeExecutorCreated: false,
    mcpRuntimeCreated: false,
    mcpToolCallsAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    daemonProcessCreationAllowedFromFrontend: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    packageInstallAllowedFromUi: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeConnectorWorkspaceShell(
  model: Pick<ConnectorWorkspaceShellModel, "workspaces">
): string {
  return `Connector workspace shell prepares ${model.workspaces.length} connector planning posture(s). Connectors require explicit approval, no connector data is read from this page, and tokens and secrets are never displayed or stored here.`;
}

export function buildConnectorWorkspaceShellModel(): ConnectorWorkspaceShellModel {
  const workspaces = buildConnectorWorkspaceShells();
  const model: ConnectorWorkspaceShellModel = {
    title: "Connector workspace shell",
    summary: "",
    workspaces,
    boundary: buildConnectorWorkspaceShellBoundary(),
    workspaceLanguage: [...CONNECTOR_WORKSPACE_SHELL_LANGUAGE],
    advancedDetails: [
      "Connector workspace shell",
      "Connectors require explicit approval",
      "No connector data is read from this page",
      "Tokens and secrets are never displayed or stored here",
      "Data sensitivity classification",
      "Connector evidence review route",
      "Workspace identity",
      "Connector goal summary",
      "Connector types",
      "Approval checklist",
      "Gmail boundary route",
      "Calendar boundary route",
      "Contacts boundary route",
      "Blocked reasons",
      "Advanced workspace details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeConnectorWorkspaceShell(model) };
}
