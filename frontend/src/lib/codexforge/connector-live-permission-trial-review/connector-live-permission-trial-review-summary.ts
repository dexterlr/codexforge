import type {
  ConnectorLivePermissionTrialReview,
  ConnectorLivePermissionTrialReviewBoundary,
  ConnectorLivePermissionTrialReviewModel,
} from "./connector-live-permission-trial-review-types";
import { buildConnectorLivePermissionTrialReviewStableKey } from "./connector-live-permission-trial-review-types";

export const CONNECTOR_LIVE_PERMISSION_TRIAL_REVIEW_LANGUAGE = [
  "Connector live permission trial review",
  "Connector live permission trial does not connect accounts",
  "Connector permissions require explicit operator approval",
  "Connector data stays private until approved",
  "Connector families",
  "Permission scope groups",
] as const;

export function buildConnectorLivePermissionTrialReview(
  input: Omit<ConnectorLivePermissionTrialReview, "id"> & { idHint: string }
): ConnectorLivePermissionTrialReview {
  const { idHint, ...trial } = input;
  return {
    id: buildConnectorLivePermissionTrialReviewStableKey(
      "connector-live-permission-trial-review",
      idHint,
      input.status
    ),
    ...trial,
  };
}

export function buildConnectorLivePermissionTrialReviews(): ConnectorLivePermissionTrialReview[] {
  return [
    buildConnectorLivePermissionTrialReview({
      idHint: "review-only-live-scope-preview",
      status: "ready-for-review",
      connectorLivePermissionTrialIdentity:
        "Connector live permission trial identity: connector-live-permission-trial-review-live-scope-preview.",
      connectorFamilies: [
        "Connector families: Gmail, Calendar, Contacts, Drive, GitHub, workspace evidence, and manual connector review.",
        "Connector families: every family is represented as static review text only; no account is connected.",
      ],
      permissionScopeGroups: [
        "Permission scope groups: account identity, read-only metadata, evidence labels, redaction owner, denied mutation, and manual approval owner.",
        "Permission scope groups: connector permissions require explicit operator approval before any future live connector access.",
      ],
      approvalGateChecklist: [
        "Approval gate checklist: confirm connector owner, minimum scope, redaction route, evidence handoff route, reviewer, rollback note, and denied action list.",
        "Approval gate checklist: connector data stays private until approved and no permission grant is persisted here.",
      ],
      deniedConnectorActions: [
        "Denied connector actions: connect accounts, start authorization, call connector APIs, fetch connector data, store connector data, persist permission grants, sync accounts, send connector data to providers, and ingest evidence automatically.",
        "Denied connector actions: execute workflows, approve actions, mutate files, mutate memory, call local models, launch tools, call web/search APIs, call GitHub APIs, or create automations.",
      ],
      privacyBoundaryNotes: [
        "Privacy boundary notes: private connector details stay redacted and connector data stays private until an explicit approval happens outside this page.",
        "Privacy boundary notes: credentials, tokens, endpoints, private account names, raw messages, raw events, raw contacts, and private repository values are not displayed.",
      ],
      blockedPermissionTrialRisks: [
        "Blocked permission trial risks: any request to connect accounts, call connector APIs, fetch connector data, store connector data, persist grants, or bypass review blocks the trial.",
        "Blocked permission trial risks: live connector access is not available from this review-only page.",
      ],
      dataRedactionRoute:
        "Data redaction route: /connector-data-redaction-trial-review previews redaction rules without fetching connector data.",
      evidenceHandoffRoute:
        "Evidence handoff route: /connector-evidence-handoff-review previews evidence handoff without ingesting evidence automatically.",
      nextRecommendedAction:
        "Next recommended action: review the connector data redaction trial, then review evidence handoff before any manual approval packet.",
      advancedPermissionDetails:
        "Advanced permission details: connector live permission trial review is review-only. Connector live permission trial does not connect accounts, connector permissions require explicit operator approval, and connector data stays private until approved. It does not connect Gmail, Calendar, Contacts, GitHub, Drive, or any connector, call connector APIs, fetch connector data, store connector data, persist permission grants, start authorization, store credentials, store tokens, store endpoints, display private connector details, send connector data to providers, call providers, send prompts, store provider outputs, call local models, call local bridge endpoints, launch local tools, generate creative assets, run research, browse web or search APIs, call GitHub APIs, execute coding workflows, apply patches, scan arbitrary projects, browse local files, read files, write files, export files, delete files, run git commands, run shell commands, run tests, run builds, run smoke checks, ingest evidence, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildConnectorLivePermissionTrialReview({
      idHint: "blocked-live-account-request",
      status: "blocked",
      connectorLivePermissionTrialIdentity:
        "Connector live permission trial identity: connector-live-permission-trial-review-blocked-live-account-request.",
      connectorFamilies: [
        "Connector families: blocked because the request asks for live connector access instead of review.",
      ],
      permissionScopeGroups: [
        "Permission scope groups: no connector permission scope is granted or persisted from this page.",
      ],
      approvalGateChecklist: [
        "Approval gate checklist: return to manual approval review before any future connector access.",
      ],
      deniedConnectorActions: [
        "Denied connector actions: account connection, connector API calls, connector data fetch, connector data storage, permission grant persistence, and provider handoff remain blocked.",
      ],
      privacyBoundaryNotes: [
        "Privacy boundary notes: connector data stays private until approved.",
      ],
      blockedPermissionTrialRisks: [
        "Blocked permission trial risks: broad permission request, missing reviewer, or implied live connection keeps the trial blocked.",
      ],
      dataRedactionRoute:
        "Data redaction route: /connector-data-redaction-trial-review remains the review-only redaction path.",
      evidenceHandoffRoute:
        "Evidence handoff route: /connector-evidence-handoff-review remains the review-only evidence handoff path.",
      nextRecommendedAction:
        "Next recommended action: keep connector access blocked and write a manual approval checklist outside this page.",
      advancedPermissionDetails:
        "Advanced permission details: blocked connector permission trial cannot recover by connecting accounts, calling connector APIs, fetching connector data, storing connector data, persisting grants, displaying private connector details, or sending connector data to providers.",
    }),
  ];
}

export function buildConnectorLivePermissionTrialReviewBoundary(): ConnectorLivePermissionTrialReviewBoundary {
  return {
    connectorLivePermissionTrialReviewOnly: true,
    connectorLivePermissionTrialDoesNotConnectAccounts: true,
    connectorPermissionsRequireExplicitOperatorApproval: true,
    connectorDataStaysPrivateUntilApproved: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    connectorAccountConnectionAllowedFromUi: false,
    connectorDataFetchAllowedFromUi: false,
    connectorDataStorageAllowedFromUi: false,
    permissionGrantPersistenceAllowedFromUi: false,
    privateConnectorDetailsDisplayedAllowed: false,
    evidenceAutoIngestionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    providerTrafficRoutingAllowedFromUi: false,
    promptSendingAllowedFromUi: false,
    providerOutputStorageAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    localToolLaunchingAllowedFromUi: false,
    webSearchApiCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    arbitraryProjectScanningAllowed: false,
    arbitraryLocalFileBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    gitCommandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    testBuildSmokeExecutionAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileExportAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    memoryIngestionAllowedFromUi: false,
    ragIngestionAllowedFromUi: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    reminderCreationAllowedFromUi: false,
    taskSchedulingAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    backgroundJobCreationAllowedFromUi: false,
    notificationSendingAllowedFromUi: false,
    pollingLoopAllowedFromUi: false,
    pluginExecutionAllowedFromUi: false,
    toolExecutionAllowedFromUi: false,
    agentExecutionAllowedFromUi: false,
    extensionRuntimeExecutorCreated: false,
    mcpRuntimeCreated: false,
    mcpToolCallsAllowedFromUi: false,
    credentialStorageAllowed: false,
    endpointStorageAllowed: false,
    tokenStorageAllowed: false,
    localStorageApiKeyStorageAllowed: false,
    sessionStorageApiKeyStorageAllowed: false,
    localStorageTokenStorageAllowed: false,
    sessionStorageTokenStorageAllowed: false,
    processEnvDisplayAllowed: false,
    secretsDisplayedAllowed: false,
    routeCoverageRemovalAllowed: false,
    packageInstallAllowedFromUi: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeConnectorLivePermissionTrialReview(
  model: Pick<ConnectorLivePermissionTrialReviewModel, "trials">
): string {
  return `Connector live permission trial review prepares ${model.trials.length} permission trial posture(s). Connector live permission trial does not connect accounts, connector permissions require explicit operator approval, and connector data stays private until approved.`;
}

export function buildConnectorLivePermissionTrialReviewModel(): ConnectorLivePermissionTrialReviewModel {
  const trials = buildConnectorLivePermissionTrialReviews();
  const model: ConnectorLivePermissionTrialReviewModel = {
    title: "Connector live permission trial review",
    summary: "",
    trials,
    boundary: buildConnectorLivePermissionTrialReviewBoundary(),
    permissionLanguage: [...CONNECTOR_LIVE_PERMISSION_TRIAL_REVIEW_LANGUAGE],
    advancedDetails: [
      "Connector live permission trial review",
      "connector live permission trial identity",
      "Connector families",
      "Permission scope groups",
      "approval gate checklist",
      "denied connector actions",
      "privacy boundary notes",
      "blocked permission trial risks",
      "data redaction route",
      "evidence handoff route",
      "next recommended action",
      "Connector live permission trial does not connect accounts",
      "Connector permissions require explicit operator approval",
      "Connector data stays private until approved",
      "advanced permission details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeConnectorLivePermissionTrialReview(model) };
}
