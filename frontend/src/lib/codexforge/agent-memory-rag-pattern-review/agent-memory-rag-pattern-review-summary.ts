import type {
  AgentMemoryRagPatternReview,
  AgentMemoryRagPatternReviewBoundary,
  AgentMemoryRagPatternReviewModel,
} from "./agent-memory-rag-pattern-review-types";
import { buildAgentMemoryRagPatternReviewStableKey } from "./agent-memory-rag-pattern-review-types";

export const AGENT_MEMORY_RAG_PATTERN_REVIEW_LANGUAGE = [
  "Agent memory RAG pattern review",
  "Memory and RAG are not ingested automatically",
  "Memory promotion requires explicit review",
  "Secret values are redacted before review",
  "Data source boundaries",
  "Promotion policy",
] as const;

export function buildAgentMemoryRagPatternReview(
  input: Omit<AgentMemoryRagPatternReview, "id"> & { idHint: string }
): AgentMemoryRagPatternReview {
  const { idHint, ...review } = input;
  return {
    id: buildAgentMemoryRagPatternReviewStableKey(
      "agent-memory-rag-pattern-review",
      idHint,
      input.reviewIdentity
    ),
    ...review,
  };
}

export function buildAgentMemoryRagPatternReviews(): AgentMemoryRagPatternReview[] {
  return [
    buildAgentMemoryRagPatternReview({
      idHint: "reviewed-memory-candidate-flow",
      reviewIdentity:
        "Review identity: agent-memory-rag-pattern-review-reviewed-memory-candidate-flow.",
      sourceReferenceSpikes: [
        "/ruflo-reference-architecture memory/RAG lessons for separating retrieval planning from memory promotion",
        "/odysseus-reference-architecture deep research and memory lessons for citation and consent boundaries",
      ],
      memoryRagPatternLessons:
        "Memory/RAG pattern lessons: keep retrieval context, citations, candidate memory, redaction, human review, and promotion as separate states.",
      dataSourceBoundaries:
        "Data source boundaries: only reviewed summaries, redacted findings, and approved result records can become candidates; arbitrary local files are not browsed, opened, read, or ingested from this page.",
      redactionPrivacyRules:
        "Redaction/privacy rules: secret values are redacted before review, prompt/file payloads are not sent to providers, and environment values are never displayed.",
      reviewInboxDependency:
        "Review inbox dependency: /review-inbox remains the human review checkpoint before any future memory candidate can be promoted.",
      promotionPolicy:
        "Promotion policy: memory promotion requires explicit review, visible source route, blocked reason handling, and no automatic Brain graph mutation.",
      deniedIngestionScope:
        "Denied ingestion scope: no automatic memory/RAG ingestion, no provider calls, no arbitrary file browsing, no appendEvent call from UI, and no saveBrainGraph call from UI.",
      extensionArchitectureRoute:
        "Extension architecture route: /extension-architecture-decision.",
      blockedReasons: [
        "Memory and RAG are not ingested automatically",
        "Memory promotion requires explicit review",
        "Secret values are redacted before review",
      ],
      advancedReviewDetails:
        "Advanced memory/RAG details: this page does not ingest files, browse arbitrary files, call providers, mutate Brain graph, call appendEvent, call saveBrainGraph, or auto-promote memory.",
    }),
    buildAgentMemoryRagPatternReview({
      idHint: "blocked-auto-ingestion",
      reviewIdentity:
        "Review identity: agent-memory-rag-pattern-review-blocked-auto-ingestion.",
      sourceReferenceSpikes: [
        "Reference spikes stay planning-only",
        "No third-party memory system or vector database is adopted in this review",
      ],
      memoryRagPatternLessons:
        "Memory/RAG pattern lessons: blocked when retrieval output, findings, files, prompts, or audit events would become memory without a separate review step.",
      dataSourceBoundaries:
        "Data source boundaries: blocked if data comes from arbitrary local paths, live providers, unredacted logs, secret-bearing files, or unapproved plugin/tool output.",
      redactionPrivacyRules:
        "Redaction/privacy rules: blocked if any API key, password, token, signing material, endpoint secret, environment value, or raw file content would be displayed.",
      reviewInboxDependency:
        "Review inbox dependency: blocked if review inbox evidence is missing or if promotion bypasses human review.",
      promotionPolicy:
        "Promotion policy: blocked unless the operator explicitly approves a redacted candidate for promotion in a future reviewed workflow.",
      deniedIngestionScope:
        "Denied ingestion scope: no automatic ingestion, no memory auto-promotion, no Brain graph mutation, no provider send, and no local file crawl.",
      extensionArchitectureRoute:
        "Extension architecture route: /extension-architecture-decision.",
      blockedReasons: [
        "Automatic ingestion requested",
        "Secret redaction not proven",
        "Promotion review missing",
      ],
      advancedReviewDetails:
        "Advanced memory/RAG details: blocked ingestion claims remain secondary and cannot imply memory import, RAG indexing, provider traffic, file access, audit append, graph save, or automatic promotion.",
    }),
  ];
}

export function buildAgentMemoryRagPatternReviewBoundary(): AgentMemoryRagPatternReviewBoundary {
  return {
    memoryRagAutoIngestionAllowed: false,
    memoryIngestionAllowedFromUi: false,
    ragIngestionAllowedFromUi: false,
    memoryAutoPromotionAllowed: false,
    memoryPromotionRequiresExplicitReview: true,
    secretRedactionBeforeReviewRequired: true,
    providerApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    promptOrFileAutoSendAllowed: false,
    autoSpendTokensAllowed: false,
    tokenSpendAllowedFromUi: false,
    autoRouteLiveProviderTrafficAllowed: false,
    providerRetryAllowedFromUi: false,
    providerRegistryMutationAllowed: false,
    pluginExecutionAllowedFromUi: false,
    toolExecutionAllowedFromUi: false,
    agentExecutionAllowedFromUi: false,
    mcpRuntimeCreated: false,
    mcpToolCallsAllowedFromUi: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    jarvisdPermissionAutoGrantAllowed: false,
    daemonProcessCreationAllowedFromFrontend: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    localProcessMutationAllowedFromUi: false,
    processKillRestartShutdownAllowedFromUi: false,
    arbitraryLocalEndpointCallsAllowedFromUi: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    artifactDeletionAllowed: false,
    patchApplyAllowedFromUi: false,
    apiKeyExportAllowed: false,
    secretExportAllowed: false,
    apiKeysDisplayedAllowed: false,
    secretValuesDisplayedAllowed: false,
    secretsDisplayedAllowed: false,
    apiKeyLocalStorageAllowed: false,
    localStorageApiKeyStorageAllowed: false,
    processEnvDisplayAllowed: false,
    signingMaterialStorageAllowedInBrowser: false,
    sessionTokenStorageAllowedInBrowser: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    brainGraphMutationAllowed: false,
    comfyUiJobSubmissionAllowedFromPage: false,
    comfyUiRequestSentFromPageAllowed: false,
    renderJobMutationAllowedFromUi: false,
    packageInstallAllowedFromUi: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeAgentMemoryRagPatternReview(
  model: Pick<AgentMemoryRagPatternReviewModel, "reviews">
): string {
  return `Agent memory RAG pattern review evaluates ${model.reviews.length} future memory/RAG posture(s). Memory and RAG are not ingested automatically, memory promotion requires explicit review, and secret values are redacted before review.`;
}

export function buildAgentMemoryRagPatternReviewModel(): AgentMemoryRagPatternReviewModel {
  const reviews = buildAgentMemoryRagPatternReviews();
  const model: AgentMemoryRagPatternReviewModel = {
    title: "Agent memory RAG pattern review",
    summary: "",
    reviews,
    boundary: buildAgentMemoryRagPatternReviewBoundary(),
    reviewLanguage: [...AGENT_MEMORY_RAG_PATTERN_REVIEW_LANGUAGE],
    advancedDetails: [
      "Agent memory RAG pattern review",
      "Memory and RAG are not ingested automatically",
      "Memory promotion requires explicit review",
      "Secret values are redacted before review",
      "Review identity",
      "Source reference spikes",
      "Memory/RAG pattern lessons",
      "Data source boundaries",
      "Redaction/privacy rules",
      "Review inbox dependency",
      "Promotion policy",
      "Denied ingestion scope",
      "Extension architecture route",
      "Blocked reasons",
      "Advanced memory/RAG details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeAgentMemoryRagPatternReview(model) };
}
