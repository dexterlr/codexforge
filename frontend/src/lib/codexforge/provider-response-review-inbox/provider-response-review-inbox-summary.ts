import type {
  ProviderResponseReviewInbox,
  ProviderResponseReviewInboxBoundary,
  ProviderResponseReviewInboxModel,
} from "./provider-response-review-inbox-types";
import { buildProviderResponseReviewInboxStableKey } from "./provider-response-review-inbox-types";

export const PROVIDER_RESPONSE_REVIEW_INBOX_LANGUAGE = [
  "Provider response review inbox",
  "Provider response review inbox does not store provider responses",
  "Provider responses require operator review before use",
  "Private prompt details stay redacted",
  "Response review groups",
  "Response safety checks",
] as const;

export function buildProviderResponseReviewInbox(
  input: Omit<ProviderResponseReviewInbox, "id"> & { idHint: string }
): ProviderResponseReviewInbox {
  const { idHint, ...inbox } = input;
  return {
    id: buildProviderResponseReviewInboxStableKey("provider-response-review-inbox", idHint, input.status),
    ...inbox,
  };
}

export function buildProviderResponseReviewInboxes(): ProviderResponseReviewInbox[] {
  return [
    buildProviderResponseReviewInbox({
      idHint: "review-only-response-handling",
      status: "ready-for-review",
      providerResponseInboxIdentity:
        "Provider response inbox identity: provider-response-review-inbox-review-only-response-handling.",
      responseReviewGroups: [
        "Response review groups: approved trial output placeholder, refusal and safety behavior, privacy redaction, format validity, hallucination risk, cost/rate-limit note, and operator decision note.",
        "Response review groups: groups are labels only; provider response review inbox does not store provider responses.",
      ],
      responseSafetyChecks: [
        "Response safety checks: private prompt details stay redacted, raw provider response text is not persisted, credentials are never shown, and response use waits for operator review.",
        "Response safety checks: provider responses require operator review before use.",
      ],
      redactionPrivacyRules: [
        "Redaction and privacy rules: show only redacted prompt class, provider family label, safety outcome, and review status.",
        "Redaction and privacy rules: private prompt details stay redacted and response text is never stored here.",
      ],
      acceptanceRejectionCriteria: [
        "Acceptance/rejection criteria: accept only after redaction, safety, accuracy, cost, and approval checks are manually reviewed.",
        "Acceptance/rejection criteria: reject responses with private prompt leakage, credential leakage, unsafe content, unsupported tool action, hidden provider routing, or unreviewed cost risk.",
      ],
      deniedResponseActions: [
        "Denied response actions: storing provider responses, ingesting responses into memory, auto-promoting response lessons, auto-accepting output, sending follow-up prompts, calling providers, and routing live traffic.",
        "Denied response actions: file mutation, Brain graph mutation, connector calls, web/search calls, GitHub calls, shell execution, git execution, and workflow execution.",
      ],
      blockedResponseRisks: [
        "Blocked response risks: unredacted private prompt detail, raw response persistence, response use before review, hidden credential, hallucinated action, unsafe follow-up prompt, and memory ingestion.",
        "Blocked response risks: any unreviewed provider response stays blocked.",
      ],
      providerSafetyRegressionRoute:
        "Provider safety regression route: /provider-safety-regression-review checks provider safety assumptions without executing provider calls.",
      firstControlledTrialRoute:
        "First controlled trial route: /first-controlled-provider-trial reviews the trial plan without sending provider traffic.",
      nextRecommendedAction:
        "Next recommended action: review safety regression assumptions before any provider response is accepted for use.",
      advancedResponseDetails:
        "Advanced response details: provider response review inbox is review-only. Provider response review inbox does not store provider responses, provider responses require operator review before use, and private prompt details stay redacted. It does not store responses, ingest responses, call providers, call OpenAI-compatible providers, connect providers, test provider connections, route provider traffic, send prompts, switch providers, retry provider calls, fetch billing, store credentials, store tokens, store endpoints, call local models, call local bridge endpoints, call connector APIs, call web/search APIs, call GitHub APIs, send prompt/file/project/connector/provider/model/credential/response data without approval, scan arbitrary projects, browse local files, crawl paths, read local files, open local files, auto-open files, run git commands, run shell commands, run tests, run builds, run smoke checks, run workflows, execute actions, approve actions, automate approval, mutate files, write files, export files, apply patches, delete files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildProviderResponseReviewInbox({
      idHint: "blocked-response-storage-request",
      status: "blocked",
      providerResponseInboxIdentity:
        "Provider response inbox identity: provider-response-review-inbox-blocked-response-storage-request.",
      responseReviewGroups: [
        "Response review groups: blocked when a request asks this page to save, ingest, or reuse a provider response.",
      ],
      responseSafetyChecks: [
        "Response safety checks: blocked because response use requires operator review before use.",
      ],
      redactionPrivacyRules: [
        "Redaction and privacy rules: blocked because private prompt details stay redacted.",
      ],
      acceptanceRejectionCriteria: [
        "Acceptance/rejection criteria: blocked until an operator reviews the response outside this page.",
      ],
      deniedResponseActions: [
        "Denied response actions: response storage, response ingestion, prompt replay, provider calls, and memory mutation remain blocked.",
      ],
      blockedResponseRisks: [
        "Blocked response risks: raw provider response persistence and unreviewed response use remain blocked.",
      ],
      providerSafetyRegressionRoute:
        "Provider safety regression route: /provider-safety-regression-review remains review-only.",
      firstControlledTrialRoute:
        "First controlled trial route: /first-controlled-provider-trial remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep response handling blocked until redaction and safety regression checks are reviewed.",
      advancedResponseDetails:
        "Advanced response details: blocked provider response review cannot recover by storing responses, ingesting memory, calling providers, writing files, or mutating memory.",
    }),
  ];
}

export function buildProviderResponseReviewInboxBoundary(): ProviderResponseReviewInboxBoundary {
  return {
    providerResponseReviewInboxReviewOnly: true,
    providerResponseReviewInboxDoesNotStoreProviderResponses: true,
    providerResponsesRequireOperatorReviewBeforeUse: true,
    privatePromptDetailsStayRedacted: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    openAICompatibleProviderApiCallsAllowedFromUi: false,
    providerConnectionAllowedFromUi: false,
    providerConnectionTestsAllowedFromUi: false,
    liveProviderTrafficAllowedFromUi: false,
    providerTrafficRoutingAllowedFromUi: false,
    providerSwitchingAllowedFromUi: false,
    providerRetryCallsAllowedFromUi: false,
    promptSendingAllowedFromUi: false,
    providerResponseStorageAllowedFromUi: false,
    providerResponseIngestionAllowedFromUi: false,
    providerResponseUseBeforeReviewAllowed: false,
    localModelCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    promptFileProjectConnectorProviderModelCredentialResponseDataAutoSendAllowed: false,
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
    responseStorageAllowed: false,
    localStorageTokenStorageAllowed: false,
    sessionStorageTokenStorageAllowed: false,
    localStorageApiKeyStorageAllowed: false,
    sessionStorageApiKeyStorageAllowed: false,
    processEnvDisplayAllowed: false,
    secretsDisplayedAllowed: false,
    packageInstallAllowedFromUi: false,
    routeCoverageRemovalAllowed: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeProviderResponseReviewInbox(
  model: Pick<ProviderResponseReviewInboxModel, "inboxes">
): string {
  return `Provider response review inbox prepares ${model.inboxes.length} response review posture(s). Provider response review inbox does not store provider responses, provider responses require operator review before use, and private prompt details stay redacted.`;
}

export function buildProviderResponseReviewInboxModel(): ProviderResponseReviewInboxModel {
  const inboxes = buildProviderResponseReviewInboxes();
  const model: ProviderResponseReviewInboxModel = {
    title: "Provider response review inbox",
    summary: "",
    inboxes,
    boundary: buildProviderResponseReviewInboxBoundary(),
    responseLanguage: [...PROVIDER_RESPONSE_REVIEW_INBOX_LANGUAGE],
    advancedDetails: [
      "Provider response review inbox",
      "provider response inbox identity",
      "Response review groups",
      "Response safety checks",
      "Redaction and privacy rules",
      "Acceptance/rejection criteria",
      "Denied response actions",
      "Blocked response risks",
      "Provider safety regression route",
      "First controlled trial route",
      "Next recommended action",
      "Provider response review inbox does not store provider responses",
      "Provider responses require operator review before use",
      "Private prompt details stay redacted",
      "advanced response details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeProviderResponseReviewInbox(model) };
}
