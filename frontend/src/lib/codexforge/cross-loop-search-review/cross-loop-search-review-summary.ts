import type {
  CrossLoopSearchReview,
  CrossLoopSearchReviewBoundary,
  CrossLoopSearchReviewModel,
} from "./cross-loop-search-review-types";
import { buildCrossLoopSearchReviewStableKey } from "./cross-loop-search-review-types";

export const CROSS_LOOP_SEARCH_REVIEW_LANGUAGE = [
  "Cross-loop search review",
  "Cross-loop search does not run searches from this page",
  "Search sources require explicit review",
  "Private connector project details stay redacted",
  "Searchable loop groups",
  "Result ranking preview",
] as const;

export function buildCrossLoopSearchReview(
  input: Omit<CrossLoopSearchReview, "id"> & { idHint: string }
): CrossLoopSearchReview {
  const { idHint, ...review } = input;
  return {
    id: buildCrossLoopSearchReviewStableKey("cross-loop-search-review", idHint, input.status),
    ...review,
  };
}

export function buildCrossLoopSearchReviews(): CrossLoopSearchReview[] {
  return [
    buildCrossLoopSearchReview({
      idHint: "reviewed-metadata-search",
      status: "ready-for-review",
      searchReviewIdentity:
        "Search review identity: cross-loop-search-review-reviewed-metadata.",
      searchableLoopGroups: [
        "Searchable loop groups: daily cockpit, review inbox, approval queue, result history, safety matrix, recovery playbook, novice mode, expert mode, project knowledge review, connector review, provider review, automation review, and creative local bridge review.",
        "Searchable loop groups: only reviewed route names, labels, redacted summaries, and operator-approved metadata are eligible.",
      ],
      allowedSearchScope: [
        "Allowed search scope: route labels, review-only summaries, safety markers, blocked reasons, and redacted handoff references that already exist inside CodexForge review models.",
        "Allowed search scope: result ranking preview can describe likely ordering but cannot retrieve or scan sources from this page.",
      ],
      deniedSearchScope: [
        "Denied search scope: cross-loop search does not run searches from this page.",
        "Denied search scope: no web/search APIs, provider APIs, connector APIs, local bridge endpoints, local file scans, arbitrary path crawling, or private connector/project reads are allowed.",
      ],
      privacyRedactionRules: [
        "Privacy/redaction rules: search sources require explicit review before they become searchable.",
        "Privacy/redaction rules: private connector/project details stay redacted, and private connector project details stay redacted in previews.",
      ],
      resultRankingPreview: [
        "Result ranking preview: safety blockers rank above convenience matches.",
        "Result ranking preview: exact route matches rank above broad loop matches, and privacy risk lowers confidence until reviewed.",
      ],
      localFirstPrivacyAuditRoute:
        "Local-first privacy audit route: /local-first-privacy-audit reviews privacy posture before any source is approved.",
      secretsRegressionRoute:
        "Secrets regression route: /secrets-token-storage-regression-sweep reviews token and secret storage boundaries.",
      blockedReasons: [
        "Blocked reasons: any request to run search, read connectors, scan local files, call APIs, store tokens, display secrets, or promote memory stays blocked.",
        "Blocked reasons: private source details remain redacted until an explicit operator review approves the source description.",
      ],
      advancedSearchDetails:
        "Advanced search details: cross-loop search review is review-only. It does not run searches, call web/search APIs, call provider APIs, call connector APIs, call local bridge endpoints, read connector data, scan local files, browse files, crawl paths, read files, open files, send prompt/file/project/connector data without approval, execute actions, approve actions, run workflows, run git commands, run shell commands, run tests, run builds, run smoke checks, mutate files, write files, export files, apply patches, delete files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys in browser storage, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildCrossLoopSearchReview({
      idHint: "unreviewed-source",
      status: "blocked",
      searchReviewIdentity:
        "Search review identity: cross-loop-search-review-unreviewed-source.",
      searchableLoopGroups: [
        "Searchable loop groups: unreviewed connector, project, provider, and local file sources are not searchable here.",
      ],
      allowedSearchScope: [
        "Allowed search scope: only the blocked source label can be reviewed.",
      ],
      deniedSearchScope: [
        "Denied search scope: unreviewed sources cannot be queried, read, fetched, crawled, scanned, or ranked as real results.",
      ],
      privacyRedactionRules: [
        "Privacy/redaction rules: private connector/project details stay redacted until source review is complete.",
      ],
      resultRankingPreview: [
        "Result ranking preview: blocked sources are ranked as unavailable with a privacy review reason.",
      ],
      localFirstPrivacyAuditRoute:
        "Local-first privacy audit route: /local-first-privacy-audit explains why private data is not sent automatically.",
      secretsRegressionRoute:
        "Secrets regression route: /secrets-token-storage-regression-sweep keeps secrets and tokens out of browser storage.",
      blockedReasons: [
        "Blocked reasons: source has not been explicitly reviewed, so no search can run from this page.",
      ],
      advancedSearchDetails:
        "Advanced search details: blocked search sources remain redacted and cannot trigger search execution, API calls, connector reads, local file access, token storage, memory mutation, or route coverage changes.",
    }),
  ];
}

export function buildCrossLoopSearchReviewBoundary(): CrossLoopSearchReviewBoundary {
  return {
    crossLoopSearchReviewOnly: true,
    crossLoopSearchDoesNotRunSearchesFromThisPage: true,
    searchSourcesRequireExplicitReview: true,
    privateConnectorProjectDetailsStayRedacted: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    searchExecutionAllowedFromUi: false,
    searchSourceReadingAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    workflowAutomaticRunAllowed: false,
    approvalAutomationAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    promptFileProjectConnectorDataAutoSendAllowed: false,
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

export function summarizeCrossLoopSearchReview(
  model: Pick<CrossLoopSearchReviewModel, "reviews">
): string {
  return `Cross-loop search review prepares ${model.reviews.length} search review posture(s). Cross-loop search does not run searches from this page, search sources require explicit review, and private connector/project details stay redacted.`;
}

export function buildCrossLoopSearchReviewModel(): CrossLoopSearchReviewModel {
  const reviews = buildCrossLoopSearchReviews();
  const model: CrossLoopSearchReviewModel = {
    title: "Cross-loop search review",
    summary: "",
    reviews,
    boundary: buildCrossLoopSearchReviewBoundary(),
    searchLanguage: [...CROSS_LOOP_SEARCH_REVIEW_LANGUAGE],
    advancedDetails: [
      "Cross-loop search review",
      "Search review identity",
      "Searchable loop groups",
      "Allowed search scope",
      "Denied search scope",
      "Privacy/redaction rules",
      "Result ranking preview",
      "Local-first privacy audit route",
      "Secrets regression route",
      "Blocked reasons",
      "Cross-loop search does not run searches from this page",
      "Search sources require explicit review",
      "Private connector project details stay redacted",
      "advanced search details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeCrossLoopSearchReview(model) };
}
