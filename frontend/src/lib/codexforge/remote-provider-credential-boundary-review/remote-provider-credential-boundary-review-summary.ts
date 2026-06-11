import type {
  RemoteProviderCredentialBoundaryReview,
  RemoteProviderCredentialBoundaryReviewBoundary,
  RemoteProviderCredentialBoundaryReviewModel,
} from "./remote-provider-credential-boundary-review-types";
import { buildRemoteProviderCredentialBoundaryReviewStableKey } from "./remote-provider-credential-boundary-review-types";

export const REMOTE_PROVIDER_CREDENTIAL_BOUNDARY_REVIEW_LANGUAGE = [
  "Remote provider credential boundary review",
  "Credential boundary review does not store credentials",
  "Keys and tokens are never displayed",
  "Provider access requires explicit operator approval",
  "Credential categories",
  "Denied storage locations",
] as const;

export function buildRemoteProviderCredentialBoundaryReview(
  input: Omit<RemoteProviderCredentialBoundaryReview, "id"> & { idHint: string }
): RemoteProviderCredentialBoundaryReview {
  const { idHint, ...review } = input;
  return {
    id: buildRemoteProviderCredentialBoundaryReviewStableKey(
      "remote-provider-credential-boundary-review",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildRemoteProviderCredentialBoundaryReviews(): RemoteProviderCredentialBoundaryReview[] {
  return [
    buildRemoteProviderCredentialBoundaryReview({
      idHint: "remote-provider-secret-handling",
      status: "ready-for-review",
      credentialBoundaryIdentity:
        "Credential boundary identity: remote-provider-credential-boundary-review-remote-provider-secret-handling.",
      credentialCategories: [
        "Credential categories: provider API keys, bearer tokens, organization IDs, project IDs, base URLs, endpoint labels, signing material, account aliases, and manual approval evidence.",
        "Credential categories: category names are reviewed only; keys and tokens are never displayed.",
      ],
      deniedStorageLocations: [
        "Denied storage locations: localStorage, sessionStorage, cookies, URL query strings, route params, browser-visible state, copied payloads, logs, source files, generated exports, memory, Brain graph, and provider registry settings.",
        "Denied storage locations: credential boundary review does not store credentials, endpoints, tokens, provider keys, or signing material.",
      ],
      redactionRules: [
        "Redaction rules: show only policy labels, never raw key values, token prefixes, endpoint secrets, account tokens, process env values, or real credential examples.",
        "Redaction rules: use plain placeholder wording without example real key or token values.",
      ],
      manualValidationChecklist: [
        "Manual validation checklist: operator confirms storage boundary, redaction language, access owner, provider family, endpoint privacy, approval packet, rollback owner, and blocked risk before any future credential use.",
        "Manual validation checklist: no provider connection, API call, live test, traffic routing, or credential write starts here.",
      ],
      approvalGates: [
        "Approval gates: provider access requires explicit operator approval before any provider credential is used.",
        "Approval gates: approval is reviewed here but never granted automatically.",
      ],
      blockedCredentialRisks: [
        "Blocked credential risks: raw secret display, browser storage, token persistence, endpoint echoing, process env printing, provider connection, provider API calls, prompt sends, file sends, project sends, connector calls, and memory mutation.",
        "Blocked credential risks: any request to display, store, export, test, or send credentials remains blocked.",
      ],
      providerFailoverRoute:
        "Provider failover route: /provider-failover-policy-review reviews fallback behavior without switching providers.",
      multiProviderRoutingRoute:
        "Multi-provider routing route: /multi-provider-routing-release-candidate reviews routing readiness without routing live traffic.",
      nextRecommendedAction:
        "Next recommended action: review failover policy, then review multi-provider routing readiness before any provider access approval packet.",
      advancedCredentialDetails:
        "Advanced credential details: remote provider credential boundary review is review-only. Credential boundary review does not store credentials, keys and tokens are never displayed, and provider access requires explicit operator approval. It does not store credentials, store API keys, store tokens, store endpoints, write browser storage, display keys, display tokens, display secrets, display endpoint values, print process.env, connect providers, test provider connections, call provider APIs, call OpenAI-compatible providers, route provider traffic, switch providers, retry provider calls, call local models, call local bridge endpoints, call connector APIs, call web/search APIs, call GitHub APIs, send prompt/file/project/connector/provider/model/credential data without approval, scan arbitrary projects, browse local files, crawl paths, read local files, open local files, auto-open files, run git commands, run shell commands, run tests, run builds, run smoke checks, run workflows, execute actions, approve actions, automate approval, mutate files, write files, export files, apply patches, delete files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildRemoteProviderCredentialBoundaryReview({
      idHint: "blocked-secret-display-request",
      status: "blocked",
      credentialBoundaryIdentity:
        "Credential boundary identity: remote-provider-credential-boundary-review-blocked-secret-display-request.",
      credentialCategories: [
        "Credential categories: blocked when a request asks for raw key, token, endpoint, or process env display.",
      ],
      deniedStorageLocations: [
        "Denied storage locations: browser storage, files, exports, logs, memory, and route state remain blocked.",
      ],
      redactionRules: [
        "Redaction rules: blocked because keys and tokens are never displayed.",
      ],
      manualValidationChecklist: [
        "Manual validation checklist: return to human review without exposing credential values.",
      ],
      approvalGates: [
        "Approval gates: blocked because provider access requires explicit operator approval.",
      ],
      blockedCredentialRisks: [
        "Blocked credential risks: display, persistence, provider calls, and data sends remain blocked.",
      ],
      providerFailoverRoute:
        "Provider failover route: /provider-failover-policy-review remains review-only.",
      multiProviderRoutingRoute:
        "Multi-provider routing route: /multi-provider-routing-release-candidate remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep credential handling blocked until redaction and approval are reviewed elsewhere.",
      advancedCredentialDetails:
        "Advanced credential details: blocked credential boundary review cannot recover by showing secrets, storing keys, calling providers, writing files, or mutating memory.",
    }),
  ];
}

export function buildRemoteProviderCredentialBoundaryReviewBoundary(): RemoteProviderCredentialBoundaryReviewBoundary {
  return {
    remoteProviderCredentialBoundaryReviewOnly: true,
    credentialBoundaryReviewDoesNotStoreCredentials: true,
    keysAndTokensAreNeverDisplayed: true,
    providerAccessRequiresExplicitOperatorApproval: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    openAICompatibleProviderApiCallsAllowedFromUi: false,
    providerConnectionAllowedFromUi: false,
    providerConnectionTestsAllowedFromUi: false,
    liveProviderTrafficAllowedFromUi: false,
    providerSwitchingAllowedFromUi: false,
    providerRetryCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    promptFileProjectConnectorProviderModelCredentialDataAutoSendAllowed: false,
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
    providerKeyStorageAllowedFromUi: false,
    providerTokenStorageAllowedFromUi: false,
    endpointStorageAllowed: false,
    tokenStorageAllowed: false,
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

export function summarizeRemoteProviderCredentialBoundaryReview(
  model: Pick<RemoteProviderCredentialBoundaryReviewModel, "reviews">
): string {
  return `Remote provider credential boundary review prepares ${model.reviews.length} credential boundary posture(s). Credential boundary review does not store credentials, keys and tokens are never displayed, and provider access requires explicit operator approval.`;
}

export function buildRemoteProviderCredentialBoundaryReviewModel(): RemoteProviderCredentialBoundaryReviewModel {
  const reviews = buildRemoteProviderCredentialBoundaryReviews();
  const model: RemoteProviderCredentialBoundaryReviewModel = {
    title: "Remote provider credential boundary review",
    summary: "",
    reviews,
    boundary: buildRemoteProviderCredentialBoundaryReviewBoundary(),
    credentialLanguage: [...REMOTE_PROVIDER_CREDENTIAL_BOUNDARY_REVIEW_LANGUAGE],
    advancedDetails: [
      "Remote provider credential boundary review",
      "credential boundary identity",
      "Credential categories",
      "Denied storage locations",
      "Redaction rules",
      "Manual validation checklist",
      "Approval gates",
      "Blocked credential risks",
      "Provider failover route",
      "Multi-provider routing route",
      "Next recommended action",
      "Credential boundary review does not store credentials",
      "Keys and tokens are never displayed",
      "Provider access requires explicit operator approval",
      "advanced credential details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeRemoteProviderCredentialBoundaryReview(model) };
}
