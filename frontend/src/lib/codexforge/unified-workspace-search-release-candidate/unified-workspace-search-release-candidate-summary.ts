import type {
  UnifiedWorkspaceSearchReleaseCandidate,
  UnifiedWorkspaceSearchReleaseCandidateBoundary,
  UnifiedWorkspaceSearchReleaseCandidateModel,
} from "./unified-workspace-search-release-candidate-types";
import { buildUnifiedWorkspaceSearchReleaseCandidateStableKey } from "./unified-workspace-search-release-candidate-types";

export const UNIFIED_WORKSPACE_SEARCH_RELEASE_CANDIDATE_LANGUAGE = [
  "Unified workspace search release candidate",
  "Unified search candidate does not run live search",
  "Live search requires explicit approval",
  "Denied sources remain blocked",
  "Search scope matrix",
  "Denied source matrix",
] as const;

export function buildUnifiedWorkspaceSearchReleaseCandidate(
  input: Omit<UnifiedWorkspaceSearchReleaseCandidate, "id"> & { idHint: string }
): UnifiedWorkspaceSearchReleaseCandidate {
  const { idHint, ...candidate } = input;
  return {
    id: buildUnifiedWorkspaceSearchReleaseCandidateStableKey(
      "unified-workspace-search-release-candidate",
      idHint,
      input.status
    ),
    ...candidate,
  };
}

export function buildUnifiedWorkspaceSearchReleaseCandidates(): UnifiedWorkspaceSearchReleaseCandidate[] {
  return [
    buildUnifiedWorkspaceSearchReleaseCandidate({
      idHint: "reviewed-loop-search-readiness",
      status: "ready-for-review",
      unifiedSearchCandidateIdentity:
        "Unified search candidate identity: unified-workspace-search-release-candidate-reviewed-loop-search-readiness.",
      sourceSearchPreviews: [
        "Source search previews: result comparison review, cross-loop evidence timeline, project knowledge search preview, cross-loop search review, local-first privacy audit, secrets token storage regression sweep, provider governance release candidate, and connector release candidate.",
        "Source search previews: every source is a static reviewed summary and no live search is run from this page.",
      ],
      searchScopeMatrix: [
        "Search scope matrix: reviewed route labels, reviewed redacted summaries, blocked reasons, approval gate labels, safety markers, and release readiness notes.",
        "Search scope matrix: live search requires explicit approval before any future source can move beyond this review candidate.",
      ],
      deniedSourceMatrix: [
        "Denied source matrix: denied sources remain blocked.",
        "Denied source matrix: raw project files, arbitrary local paths, provider payloads, connector data, web sources, GitHub data, local bridge endpoints, tokens, API keys, secrets, unreviewed evidence, and unapproved memory candidates remain denied.",
      ],
      approvalGates: [
        "Approval gates: source review, privacy review, redaction review, provider readiness review, connector readiness review, evidence review, result comparison review, and final operator approval.",
        "Approval gates: no approval is granted automatically and live search requires explicit approval.",
      ],
      privacyRedactionRequirements: [
        "Privacy/redaction requirements: private project, connector, provider, evidence, search, file, and memory details stay redacted until approved.",
        "Privacy/redaction requirements: query persistence, token storage, API key storage, process.env display, and secret display remain blocked.",
      ],
      releaseBlockers: [
        "Release blockers: any request to run live search, persist search, call APIs, scan files, read files, ingest evidence, mutate memory, write files, or execute tools blocks release.",
        "Release blockers: provider readiness and connector readiness must remain review-only until separate approval gates are satisfied.",
      ],
      providerReadinessRoute:
        "Provider readiness route: /provider-governance-release-candidate reviews provider readiness without provider calls.",
      connectorReadinessRoute:
        "Connector readiness route: /connector-release-candidate reviews connector readiness without connector calls.",
      nextRecommendedAction:
        "Next recommended action: review denied source matrix and approval gates before any live-search readiness audit.",
      advancedCandidateDetails:
        "Advanced release candidate details: unified workspace search release candidate is review-only. Unified search candidate does not run live search, live search requires explicit approval, and denied sources remain blocked. It does not execute actions, approve actions, automate approval, run live search, run search, persist search queries, call provider APIs, call connector APIs, call web/search APIs, call GitHub APIs, call local bridge endpoints, send prompt/file/project/connector/search/evidence data without approval, scan projects, browse local files, crawl paths, read or open arbitrary local files, auto-open local files, run git commands, run shell commands, run tests, run builds, run smoke checks, mutate files, write files, export files, apply patches, delete files, ingest evidence, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildUnifiedWorkspaceSearchReleaseCandidate({
      idHint: "blocked-live-search-request",
      status: "blocked",
      unifiedSearchCandidateIdentity:
        "Unified search candidate identity: unified-workspace-search-release-candidate-blocked-live-search-request.",
      sourceSearchPreviews: [
        "Source search previews: blocked because the request asks the release candidate to run live search.",
      ],
      searchScopeMatrix: [
        "Search scope matrix: blocked live search is outside review-only scope.",
      ],
      deniedSourceMatrix: [
        "Denied source matrix: denied sources remain blocked and live search stays unavailable.",
      ],
      approvalGates: [
        "Approval gates: live search requires explicit approval and no approval is granted here.",
      ],
      privacyRedactionRequirements: [
        "Privacy/redaction requirements: private details stay redacted even when a live search request is blocked.",
      ],
      releaseBlockers: [
        "Release blockers: live search request, API calls, source reads, query persistence, file scans, and memory mutation.",
      ],
      providerReadinessRoute:
        "Provider readiness route: /provider-governance-release-candidate cannot be bypassed by this page.",
      connectorReadinessRoute:
        "Connector readiness route: /connector-release-candidate cannot be bypassed by this page.",
      nextRecommendedAction:
        "Next recommended action: keep live search blocked and return to source review.",
      advancedCandidateDetails:
        "Advanced release candidate details: blocked unified search cannot recover by running live search, calling APIs, reading sources, persisting queries, scanning files, ingesting evidence, or promoting memory from this page.",
    }),
  ];
}

export function buildUnifiedWorkspaceSearchReleaseCandidateBoundary(): UnifiedWorkspaceSearchReleaseCandidateBoundary {
  return {
    unifiedWorkspaceSearchReleaseCandidateReviewOnly: true,
    unifiedSearchCandidateDoesNotRunLiveSearch: true,
    liveSearchRequiresExplicitApproval: true,
    deniedSourcesRemainBlocked: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    liveSearchExecutionAllowedFromUi: false,
    searchExecutionAllowedFromUi: false,
    searchQueryPersistenceAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    promptFileProjectConnectorSearchEvidenceDataAutoSendAllowed: false,
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

export function summarizeUnifiedWorkspaceSearchReleaseCandidate(
  model: Pick<UnifiedWorkspaceSearchReleaseCandidateModel, "candidates">
): string {
  return `Unified workspace search release candidate prepares ${model.candidates.length} search release posture(s). Unified search candidate does not run live search, live search requires explicit approval, and denied sources remain blocked.`;
}

export function buildUnifiedWorkspaceSearchReleaseCandidateModel(): UnifiedWorkspaceSearchReleaseCandidateModel {
  const candidates = buildUnifiedWorkspaceSearchReleaseCandidates();
  const model: UnifiedWorkspaceSearchReleaseCandidateModel = {
    title: "Unified workspace search release candidate",
    summary: "",
    candidates,
    boundary: buildUnifiedWorkspaceSearchReleaseCandidateBoundary(),
    candidateLanguage: [...UNIFIED_WORKSPACE_SEARCH_RELEASE_CANDIDATE_LANGUAGE],
    advancedDetails: [
      "Unified workspace search release candidate",
      "Unified search candidate identity",
      "Source search previews",
      "Search scope matrix",
      "Denied source matrix",
      "Approval gates",
      "Privacy/redaction requirements",
      "Release blockers",
      "Provider readiness route",
      "Connector readiness route",
      "Next recommended action",
      "Unified search candidate does not run live search",
      "Live search requires explicit approval",
      "Denied sources remain blocked",
      "advanced release candidate details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeUnifiedWorkspaceSearchReleaseCandidate(model) };
}
