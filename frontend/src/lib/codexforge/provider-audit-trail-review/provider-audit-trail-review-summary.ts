import type {
  ProviderAuditTrailReview,
  ProviderAuditTrailReviewBoundary,
  ProviderAuditTrailReviewModel,
} from "./provider-audit-trail-review-types";
import { buildProviderAuditTrailReviewStableKey } from "./provider-audit-trail-review-types";

export const PROVIDER_AUDIT_TRAIL_REVIEW_LANGUAGE = [
  "Provider audit trail review",
  "Provider audit trail review does not store provider outputs",
  "Provider audit events require operator review",
  "Private prompts and outputs stay redacted",
  "Audit event groups",
  "Retention boundary checklist",
] as const;

export function buildProviderAuditTrailReview(
  input: Omit<ProviderAuditTrailReview, "id"> & { idHint: string }
): ProviderAuditTrailReview {
  const { idHint, ...auditTrail } = input;
  return {
    id: buildProviderAuditTrailReviewStableKey("provider-audit-trail-review", idHint, input.status),
    ...auditTrail,
  };
}

export function buildProviderAuditTrailReviews(): ProviderAuditTrailReview[] {
  return [
    buildProviderAuditTrailReview({
      idHint: "review-only-audit-expectations",
      status: "ready-for-review",
      providerAuditTrailIdentity:
        "Provider audit trail identity: provider-audit-trail-review-review-only-audit-expectations.",
      auditEventGroups: [
        "Audit event groups: provider selection review, permission preset review, approval gate review, prompt privacy review, output retention review, cost/rate review, and blocked-risk review.",
        "Audit event groups: event groups are expectations only and are not persisted as audit events from this page.",
      ],
      providerRequestResponseReviewPolicy: [
        "Provider request/response review policy: request class, redaction status, output class, reviewer, approval owner, and retention boundary are reviewed without storing request or response bodies.",
        "Provider request/response review policy: private prompts and outputs stay redacted and no provider output is displayed, stored, or ingested here.",
      ],
      redactionAndPrivacyRules: [
        "Redaction and privacy rules: redact private prompts, provider outputs, credentials, endpoints, connector details, file paths, and project-sensitive data before any future audit packet is reviewed.",
        "Redaction and privacy rules: this page never prints process.env values, secret values, provider keys, tokens, endpoints, private prompts, or private outputs.",
      ],
      deniedAuditActions: [
        "Denied audit actions: storing provider outputs, persisting audit events, ingesting responses, calling providers, sending prompts, routing traffic, writing audit files, mutating memory, and auto-promoting evidence.",
        "Denied audit actions: provider audit events require operator review and cannot be approved or recorded automatically from this page.",
      ],
      retentionBoundaryChecklist: [
        "Retention boundary checklist: classify output sensitivity, decide whether retention is allowed, identify redaction owner, define review owner, confirm no automatic ingestion, and record unresolved risk outside this UI.",
        "Retention boundary checklist: provider audit trail review does not store provider outputs or persist audit trail data.",
      ],
      blockedAuditTrailRisks: [
        "Blocked audit trail risks: private prompt exposure, output storage request, missing redaction owner, missing approval owner, audit event persistence request, response ingestion request, and credential display request.",
        "Blocked audit trail risks: unresolved audit risk keeps the audit trail in review-only mode.",
      ],
      hardeningPassRoute:
        "Hardening pass route: /provider-integration-hardening-pass reviews hardening checks without calling providers.",
      providerSelectionRoute:
        "Provider selection route: /provider-selection-ux-polish reviews provider choice without switching live providers.",
      nextRecommendedAction:
        "Next recommended action: review hardening checks, then return to provider selection only as a preview until explicit approval exists.",
      advancedAuditDetails:
        "Advanced audit details: provider audit trail review is review-only. Provider audit trail review does not store provider outputs, provider audit events require operator review, and private prompts and outputs stay redacted. It does not store outputs, call providers, persist audit events, persist provider trial data, ingest provider outputs, ingest provider responses, mutate memory, call local models, call local bridge endpoints, launch local tools, call connector APIs, call web/search APIs, call GitHub APIs, send prompts, send prompt/file/project/connector/provider/model/output/audit data without approval, route provider traffic, connect providers, test provider connections, store credentials, store tokens, store endpoints, scan arbitrary projects, browse local files, crawl paths, read or open files, auto-open local files, run git commands, run shell commands, run tests, run builds, run smoke checks, execute workflows, execute actions, approve actions, automate approval, mutate files, write files, export files, apply patches, delete files, ingest evidence, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildProviderAuditTrailReview({
      idHint: "blocked-output-storage-request",
      status: "blocked",
      providerAuditTrailIdentity:
        "Provider audit trail identity: provider-audit-trail-review-blocked-output-storage-request.",
      auditEventGroups: [
        "Audit event groups: blocked because the request asks this review page to persist an audit event or store provider output.",
      ],
      providerRequestResponseReviewPolicy: [
        "Provider request/response review policy: private prompts and outputs remain redacted and unrecorded.",
      ],
      redactionAndPrivacyRules: [
        "Redaction and privacy rules: output text, prompt text, keys, tokens, endpoints, and project-sensitive data stay hidden.",
      ],
      deniedAuditActions: [
        "Denied audit actions: provider output storage, audit event persistence, response ingestion, memory mutation, and provider calls remain blocked.",
      ],
      retentionBoundaryChecklist: [
        "Retention boundary checklist: return to operator review before any future audit retention decision is made elsewhere.",
      ],
      blockedAuditTrailRisks: [
        "Blocked audit trail risks: output storage and audit persistence requests keep this review blocked.",
      ],
      hardeningPassRoute:
        "Hardening pass route: /provider-integration-hardening-pass remains review-only.",
      providerSelectionRoute:
        "Provider selection route: /provider-selection-ux-polish remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep outputs redacted and document the missing retention approval outside this page.",
      advancedAuditDetails:
        "Advanced audit details: blocked audit trail review cannot recover by storing outputs, persisting audit events, ingesting responses, mutating memory, or calling providers from this page.",
    }),
  ];
}

export function buildProviderAuditTrailReviewBoundary(): ProviderAuditTrailReviewBoundary {
  return {
    providerAuditTrailReviewReviewOnly: true,
    providerAuditTrailReviewDoesNotStoreProviderOutputs: true,
    providerAuditEventsRequireOperatorReview: true,
    privatePromptsAndOutputsStayRedacted: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    providerConnectionAllowedFromUi: false,
    providerConnectionTestsAllowedFromUi: false,
    liveProviderTrafficAllowedFromUi: false,
    providerTrafficRoutingAllowedFromUi: false,
    promptSendingAllowedFromUi: false,
    providerOutputStorageAllowedFromUi: false,
    providerOutputIngestionAllowedFromUi: false,
    providerOutputRetentionAllowedFromUi: false,
    providerAuditEventPersistenceAllowedFromUi: false,
    auditEventPersistenceAllowedFromUi: false,
    providerTrialDataPersistenceAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    localToolLaunchingAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    promptFileProjectConnectorProviderModelOutputAuditDataAutoSendAllowed: false,
    arbitraryProjectScanningAllowed: false,
    arbitraryLocalFileBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    gitCommandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    buildExecutionFromUiAllowed: false,
    smokeExecutionFromUiAllowed: false,
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
    memoryMutationAllowedFromUi: false,
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
    localStorageTokenStorageAllowed: false,
    sessionStorageTokenStorageAllowed: false,
    localStorageApiKeyStorageAllowed: false,
    sessionStorageApiKeyStorageAllowed: false,
    outputStorageAllowed: false,
    processEnvDisplayAllowed: false,
    secretsDisplayedAllowed: false,
    packageInstallAllowedFromUi: false,
    routeCoverageRemovalAllowed: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeProviderAuditTrailReview(
  model: Pick<ProviderAuditTrailReviewModel, "auditTrails">
): string {
  return `Provider audit trail review prepares ${model.auditTrails.length} audit expectation review(s). Provider audit trail review does not store provider outputs, provider audit events require operator review, and private prompts and outputs stay redacted.`;
}

export function buildProviderAuditTrailReviewModel(): ProviderAuditTrailReviewModel {
  const auditTrails = buildProviderAuditTrailReviews();
  const model: ProviderAuditTrailReviewModel = {
    title: "Provider audit trail review",
    summary: "",
    auditTrails,
    boundary: buildProviderAuditTrailReviewBoundary(),
    auditLanguage: [...PROVIDER_AUDIT_TRAIL_REVIEW_LANGUAGE],
    advancedDetails: [
      "Provider audit trail review",
      "provider audit trail identity",
      "Audit event groups",
      "Provider request/response review policy",
      "redaction and privacy rules",
      "denied audit actions",
      "Retention boundary checklist",
      "blocked audit trail risks",
      "hardening pass route",
      "provider selection route",
      "next recommended action",
      "Provider audit trail review does not store provider outputs",
      "Provider audit events require operator review",
      "Private prompts and outputs stay redacted",
      "advanced audit details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeProviderAuditTrailReview(model) };
}
