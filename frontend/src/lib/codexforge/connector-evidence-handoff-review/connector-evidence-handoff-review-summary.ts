import type {
  ConnectorEvidenceHandoffReview,
  ConnectorEvidenceHandoffReviewBoundary,
  ConnectorEvidenceHandoffReviewModel,
} from "./connector-evidence-handoff-review-types";
import { buildConnectorEvidenceHandoffReviewStableKey } from "./connector-evidence-handoff-review-types";

export const CONNECTOR_EVIDENCE_HANDOFF_REVIEW_LANGUAGE = [
  "Connector evidence handoff review",
  "Connector evidence handoff does not ingest evidence automatically",
  "Connector evidence requires operator review before use",
  "Private connector evidence stays redacted",
  "Evidence handoff groups",
  "Citation source checklist",
] as const;

export function buildConnectorEvidenceHandoffReview(
  input: Omit<ConnectorEvidenceHandoffReview, "id"> & { idHint: string }
): ConnectorEvidenceHandoffReview {
  const { idHint, ...review } = input;
  return {
    id: buildConnectorEvidenceHandoffReviewStableKey(
      "connector-evidence-handoff-review",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildConnectorEvidenceHandoffReviews(): ConnectorEvidenceHandoffReview[] {
  return [
    buildConnectorEvidenceHandoffReview({
      idHint: "review-before-use-handoff",
      status: "ready-for-review",
      connectorEvidenceHandoffIdentity:
        "Connector evidence handoff identity: connector-evidence-handoff-review-review-before-use-handoff.",
      evidenceHandoffGroups: [
        "Evidence handoff groups: permission trial summary, redaction status, citation/source checklist, reviewer note, denied evidence, release candidate route, and automation dry-run route.",
        "Evidence handoff groups: connector evidence handoff does not ingest evidence automatically.",
      ],
      reviewBeforeUsePolicy: [
        "Review-before-use policy: connector evidence requires operator review before use.",
        "Review-before-use policy: private connector evidence stays redacted until an operator approves a specific future use.",
      ],
      citationSourceChecklist: [
        "Citation source checklist: keep connector family label, approved purpose, redaction status, reviewer-written summary, and source class without raw private values.",
        "Citation source checklist: include enough context for review while excluding raw messages, raw events, raw contacts, tokens, secrets, and private account identifiers.",
      ],
      deniedHandoffActions: [
        "Denied handoff actions: ingest evidence automatically, send evidence to providers, promote memory, mutate RAG, call connectors, fetch connector data, store connector data, and persist permission grants.",
        "Denied handoff actions: run research, browse web/search, execute workflows, create automations, mutate files, launch tools, or approve handoff automatically.",
      ],
      memoryAndResearchBoundaryNotes: [
        "Memory and research boundary notes: connector evidence is not ingested into memory, RAG, research summaries, or provider prompts from this page.",
        "Memory and research boundary notes: research use requires a separate operator review after redaction and citation/source checks are complete.",
      ],
      blockedEvidenceHandoffRisks: [
        "Blocked evidence handoff risks: raw private connector evidence, missing redaction, missing citation/source checklist, automatic ingestion, provider send, or memory promotion blocks handoff.",
        "Blocked evidence handoff risks: connector APIs and connector data fetches remain blocked from this review page.",
      ],
      connectorReleaseCandidateRoute:
        "Connector release candidate route: /connector-integration-release-candidate summarizes connector readiness without live connector calls.",
      automationDryRunRoute:
        "Automation dry-run route: /automation-permission-readiness-audit reviews automation posture without creating schedules, tasks, reminders, or background jobs.",
      nextRecommendedAction:
        "Next recommended action: review the connector integration release candidate after confirming redaction and citation/source checklist status.",
      advancedHandoffDetails:
        "Advanced handoff details: connector evidence handoff review is review-only. Connector evidence handoff does not ingest evidence automatically, connector evidence requires operator review before use, and private connector evidence stays redacted. It does not connect accounts, call connector APIs, fetch connector data, store connector data, persist permission grants, display real private connector data, ingest evidence, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, send evidence to providers, call providers, send prompts, store provider outputs, call local models, call local bridge endpoints, launch local tools, generate creative assets, run research, browse web or search APIs, call GitHub APIs, execute coding workflows, apply patches, scan arbitrary projects, browse local files, read files, write files, export files, delete files, run git commands, run shell commands, run tests, run builds, run smoke checks, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store credentials, store tokens, store endpoints, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildConnectorEvidenceHandoffReview({
      idHint: "blocked-auto-ingestion-request",
      status: "blocked",
      connectorEvidenceHandoffIdentity:
        "Connector evidence handoff identity: connector-evidence-handoff-review-blocked-auto-ingestion-request.",
      evidenceHandoffGroups: [
        "Evidence handoff groups: blocked because the request implies automatic evidence ingestion.",
      ],
      reviewBeforeUsePolicy: [
        "Review-before-use policy: blocked until connector evidence is reviewed by an operator before use.",
      ],
      citationSourceChecklist: [
        "Citation source checklist: blocked until citation/source fields are minimized and redacted.",
      ],
      deniedHandoffActions: [
        "Denied handoff actions: automatic evidence ingestion, provider send, memory promotion, connector API call, and connector data fetch remain blocked.",
      ],
      memoryAndResearchBoundaryNotes: [
        "Memory and research boundary notes: memory, RAG, and research use remain separate from this page.",
      ],
      blockedEvidenceHandoffRisks: [
        "Blocked evidence handoff risks: missing review-before-use policy, raw evidence, or implied automation keeps the handoff blocked.",
      ],
      connectorReleaseCandidateRoute:
        "Connector release candidate route: /connector-integration-release-candidate remains review-only.",
      automationDryRunRoute:
        "Automation dry-run route: /automation-permission-readiness-audit remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep evidence handoff blocked until redaction and operator review are complete.",
      advancedHandoffDetails:
        "Advanced handoff details: blocked connector evidence handoff cannot recover by ingesting evidence automatically, sending evidence to providers, mutating memory, calling connectors, or approving handoff automatically.",
    }),
  ];
}

export function buildConnectorEvidenceHandoffReviewBoundary(): ConnectorEvidenceHandoffReviewBoundary {
  return {
    connectorEvidenceHandoffReviewOnly: true,
    connectorEvidenceHandoffDoesNotIngestEvidenceAutomatically: true,
    connectorEvidenceRequiresOperatorReviewBeforeUse: true,
    privateConnectorEvidenceStaysRedacted: true,
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

export function summarizeConnectorEvidenceHandoffReview(
  model: Pick<ConnectorEvidenceHandoffReviewModel, "reviews">
): string {
  return `Connector evidence handoff review prepares ${model.reviews.length} evidence handoff posture(s). Connector evidence handoff does not ingest evidence automatically, connector evidence requires operator review before use, and private connector evidence stays redacted.`;
}

export function buildConnectorEvidenceHandoffReviewModel(): ConnectorEvidenceHandoffReviewModel {
  const reviews = buildConnectorEvidenceHandoffReviews();
  const model: ConnectorEvidenceHandoffReviewModel = {
    title: "Connector evidence handoff review",
    summary: "",
    reviews,
    boundary: buildConnectorEvidenceHandoffReviewBoundary(),
    handoffLanguage: [...CONNECTOR_EVIDENCE_HANDOFF_REVIEW_LANGUAGE],
    advancedDetails: [
      "Connector evidence handoff review",
      "connector evidence handoff identity",
      "Evidence handoff groups",
      "review-before-use policy",
      "Citation source checklist",
      "denied handoff actions",
      "memory and research boundary notes",
      "blocked evidence handoff risks",
      "connector release candidate route",
      "automation dry-run route",
      "next recommended action",
      "Connector evidence handoff does not ingest evidence automatically",
      "Connector evidence requires operator review before use",
      "Private connector evidence stays redacted",
      "advanced handoff details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeConnectorEvidenceHandoffReview(model) };
}
