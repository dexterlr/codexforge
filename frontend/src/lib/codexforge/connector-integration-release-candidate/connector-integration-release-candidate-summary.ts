import type {
  ConnectorIntegrationReleaseCandidate,
  ConnectorIntegrationReleaseCandidateBoundary,
  ConnectorIntegrationReleaseCandidateModel,
} from "./connector-integration-release-candidate-types";
import { buildConnectorIntegrationReleaseCandidateStableKey } from "./connector-integration-release-candidate-types";

export const CONNECTOR_INTEGRATION_RELEASE_CANDIDATE_LANGUAGE = [
  "Connector integration release candidate",
  "Connector integration release candidate does not call connector APIs",
  "Live connector access requires explicit approval",
  "Denied connector paths remain blocked",
  "Connector family matrix",
  "Evidence handoff status",
] as const;

export function buildConnectorIntegrationReleaseCandidate(
  input: Omit<ConnectorIntegrationReleaseCandidate, "id"> & { idHint: string }
): ConnectorIntegrationReleaseCandidate {
  const { idHint, ...candidate } = input;
  return {
    id: buildConnectorIntegrationReleaseCandidateStableKey(
      "connector-integration-release-candidate",
      idHint,
      input.status
    ),
    ...candidate,
  };
}

export function buildConnectorIntegrationReleaseCandidates(): ConnectorIntegrationReleaseCandidate[] {
  return [
    buildConnectorIntegrationReleaseCandidate({
      idHint: "review-only-connector-readiness",
      status: "ready-for-review",
      connectorIntegrationCandidateIdentity:
        "Connector integration candidate identity: connector-integration-release-candidate-review-only-connector-readiness.",
      connectorFamilyMatrix: [
        "Connector family matrix: Gmail permissions are review-only; no mailbox connection, search, read, draft, send, or sync occurs.",
        "Connector family matrix: Calendar permissions are review-only; no event read, create, update, delete, or sync occurs.",
        "Connector family matrix: Contacts permissions are review-only; no contact lookup, read, create, update, delete, or sync occurs.",
        "Connector family matrix: GitHub and Drive families remain future review categories; no connector API calls or private data reads occur.",
      ],
      permissionBoundaryStatus:
        "Permission boundary status: live connector access requires explicit approval and permission grants are not persisted from this page.",
      redactionBoundaryStatus:
        "Redaction boundary status: private connector details stay redacted and redaction rules require operator review before evidence handoff.",
      evidenceHandoffStatus:
        "Evidence handoff status: connector evidence handoff does not ingest evidence automatically and evidence requires operator review before use.",
      deniedConnectorPaths: [
        "Denied connector paths: connect accounts, authorize connectors, call connector APIs, fetch connector data, store connector data, persist permission grants, sync accounts, send evidence to providers, and ingest evidence automatically.",
        "Denied connector paths: route live provider traffic, send prompts, mutate files, mutate memory, create automations, run research, browse web/search, execute tools, execute agents, or create MCP runtimes.",
      ],
      blockedIntegrationRisks: [
        "Blocked integration risks: missing approval owner, broad scope, unresolved redaction, missing citation/source checklist, provider send request, memory promotion request, or live connector call request.",
        "Blocked integration risks: denied connector paths remain blocked until a separate manual approval packet exists.",
      ],
      automationDryRunRoute:
        "Automation dry-run route: /automation-permission-readiness-audit reviews automation posture without creating schedules, tasks, reminders, watches, background jobs, or notifications.",
      automationApprovalQueueRoute:
        "Automation approval queue route: /approval-queue reviews pending approvals without granting approval from this page.",
      nextRecommendedAction:
        "Next recommended action: keep live connector access blocked, review automation dry-run posture, and prepare a manual approval packet outside this page.",
      advancedReleaseCandidateDetails:
        "Advanced release candidate details: connector integration release candidate is review-only. Connector integration release candidate does not call connector APIs, live connector access requires explicit approval, and denied connector paths remain blocked. It does not connect accounts, authorize connectors, call Gmail, Calendar, Contacts, GitHub, Drive, or any connector APIs, fetch connector data, store connector data, persist permission grants, display real private connector data, ingest evidence, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, send evidence to providers, call providers, send prompts, store provider outputs, route live provider traffic, call local models, call local bridge endpoints, launch local tools, generate creative assets, run research, browse web or search APIs, call GitHub APIs, execute coding workflows, apply patches, scan arbitrary projects, browse local files, read files, write files, export files, delete files, run git commands, run shell commands, run tests, run builds, run smoke checks, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store credentials, store tokens, store endpoints, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildConnectorIntegrationReleaseCandidate({
      idHint: "blocked-live-connector-call",
      status: "blocked",
      connectorIntegrationCandidateIdentity:
        "Connector integration candidate identity: connector-integration-release-candidate-blocked-live-connector-call.",
      connectorFamilyMatrix: [
        "Connector family matrix: blocked because live connector access or connector API execution is implied.",
      ],
      permissionBoundaryStatus:
        "Permission boundary status: blocked until explicit operator approval exists outside this page.",
      redactionBoundaryStatus:
        "Redaction boundary status: blocked until private connector details stay redacted.",
      evidenceHandoffStatus:
        "Evidence handoff status: blocked until evidence handoff remains review-before-use with no automatic ingestion.",
      deniedConnectorPaths: [
        "Denied connector paths: connector API calls, connector data fetch, connector data storage, permission persistence, provider send, and memory promotion remain blocked.",
      ],
      blockedIntegrationRisks: [
        "Blocked integration risks: live connector request, missing redaction, missing handoff review, or automatic approval keeps the candidate blocked.",
      ],
      automationDryRunRoute:
        "Automation dry-run route: /automation-permission-readiness-audit remains review-only.",
      automationApprovalQueueRoute:
        "Automation approval queue route: /approval-queue remains manual and cannot approve from this page.",
      nextRecommendedAction:
        "Next recommended action: keep denied connector paths blocked and return to permission, redaction, and evidence handoff review.",
      advancedReleaseCandidateDetails:
        "Advanced release candidate details: blocked connector integration cannot recover by calling connector APIs, fetching connector data, storing connector data, persisting permissions, ingesting evidence, sending evidence to providers, mutating memory, or approving access automatically.",
    }),
  ];
}

export function buildConnectorIntegrationReleaseCandidateBoundary(): ConnectorIntegrationReleaseCandidateBoundary {
  return {
    connectorIntegrationReleaseCandidateReviewOnly: true,
    connectorIntegrationReleaseCandidateDoesNotCallConnectorApis: true,
    liveConnectorAccessRequiresExplicitApproval: true,
    deniedConnectorPathsRemainBlocked: true,
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
    connectorEvidenceAutoIngestionAllowed: false,
    evidenceAutoIngestionAllowedFromUi: false,
    evidenceSentToProvidersAllowedFromUi: false,
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
    evidenceIngestionAllowedFromUi: false,
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

export function summarizeConnectorIntegrationReleaseCandidate(
  model: Pick<ConnectorIntegrationReleaseCandidateModel, "candidates">
): string {
  return `Connector integration release candidate prepares ${model.candidates.length} connector readiness candidate(s). Connector integration release candidate does not call connector APIs, live connector access requires explicit approval, and denied connector paths remain blocked.`;
}

export function buildConnectorIntegrationReleaseCandidateModel(): ConnectorIntegrationReleaseCandidateModel {
  const candidates = buildConnectorIntegrationReleaseCandidates();
  const model: ConnectorIntegrationReleaseCandidateModel = {
    title: "Connector integration release candidate",
    summary: "",
    candidates,
    boundary: buildConnectorIntegrationReleaseCandidateBoundary(),
    releaseLanguage: [...CONNECTOR_INTEGRATION_RELEASE_CANDIDATE_LANGUAGE],
    advancedDetails: [
      "Connector integration release candidate",
      "connector integration candidate identity",
      "Connector family matrix",
      "permission boundary status",
      "redaction boundary status",
      "Evidence handoff status",
      "denied connector paths",
      "blocked integration risks",
      "automation dry-run route",
      "automation approval queue route",
      "next recommended action",
      "Connector integration release candidate does not call connector APIs",
      "Live connector access requires explicit approval",
      "Denied connector paths remain blocked",
      "advanced release candidate details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeConnectorIntegrationReleaseCandidate(model) };
}
