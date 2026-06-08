import type {
  EvidenceConflictResolverReview,
  EvidenceConflictResolverReviewBoundary,
  EvidenceConflictResolverReviewModel,
} from "./evidence-conflict-resolver-review-types";
import { buildEvidenceConflictResolverReviewStableKey } from "./evidence-conflict-resolver-review-types";

export const EVIDENCE_CONFLICT_RESOLVER_REVIEW_LANGUAGE = [
  "Evidence conflict resolver review",
  "Conflicts are not resolved automatically",
  "Stale evidence remains flagged",
  "Final resolution requires explicit review",
  "Proposed resolution options",
  "Freshness recheck route",
] as const;

export function buildEvidenceConflictResolverReview(
  input: Omit<EvidenceConflictResolverReview, "id"> & { idHint: string }
): EvidenceConflictResolverReview {
  const { idHint, ...review } = input;
  return {
    id: buildEvidenceConflictResolverReviewStableKey(
      "evidence-conflict-resolver-review",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildEvidenceConflictResolverReviews(): EvidenceConflictResolverReview[] {
  return [
    buildEvidenceConflictResolverReview({
      idHint: "stale-opposing-source",
      status: "review required",
      conflictReviewIdentity:
        "Conflict review identity: evidence-conflict-resolver-review-stale-opposing-source.",
      sourceEvidenceInbox:
        "Source evidence inbox: /research-evidence-inbox supplies reviewed evidence packets with conflict and stale source flags.",
      conflictingClaimSummary:
        "Conflicting claim summary: the proposed claim is partly supported by one reviewed source and challenged by another source with a newer or better-scoped finding.",
      supportingSourceSummary:
        "Supporting source summary: source A supports the claim but carries a freshness warning and needs reviewer confirmation before use.",
      opposingSourceSummary:
        "Opposing source summary: source B disputes the claim or narrows the claim scope and must remain visible during review.",
      freshnessStalenessSignal:
        "Freshness/staleness signal: stale evidence remains flagged and cannot be hidden by a confidence score or summary draft.",
      confidenceImpact:
        "Confidence impact: confidence drops to low or medium until a reviewer chooses whether to narrow, split, block, or recheck the claim.",
      proposedResolutionOptions: [
        "Proposed resolution options: keep the conflict open and block downstream summary/report use.",
        "Proposed resolution options: narrow the claim and keep both sources visible for citation review.",
        "Proposed resolution options: route to freshness recheck boundary before any future source refresh.",
      ],
      freshnessRecheckRoute:
        "Freshness recheck route: /research-freshness-recheck-boundary reviews whether a future freshness recheck is allowed.",
      blockedReasons: [
        "Conflicts are not resolved automatically",
        "Stale evidence remains flagged",
        "Final resolution requires explicit review",
      ],
      advancedConflictDetails:
        "Advanced conflict details: this review does not browse the web, call providers, fetch sources, refresh sources, recheck freshness, auto-update evidence, auto-update claims, auto-cite, finalize citations, export reports, write files, ingest memory, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an MCP runtime, run commands, apply patches, delete files, or delete artifacts.",
    }),
    buildEvidenceConflictResolverReview({
      idHint: "blocked-missing-opposition",
      status: "blocked",
      conflictReviewIdentity:
        "Conflict review identity: evidence-conflict-resolver-review-blocked-missing-opposition.",
      sourceEvidenceInbox:
        "Source evidence inbox: blocked until /research-evidence-inbox shows both supporting and opposing source summaries with source quality notes.",
      conflictingClaimSummary:
        "Conflicting claim summary: blocked because the claim cannot be fairly reviewed without the opposing source context.",
      supportingSourceSummary:
        "Supporting source summary: blocked when supporting evidence is unattributed, stale, low-quality, or missing citation fields.",
      opposingSourceSummary:
        "Opposing source summary: blocked when opposition is only implied, missing, stale, or too broad for claim review.",
      freshnessStalenessSignal:
        "Freshness/staleness signal: blocked because source freshness is unknown and stale evidence remains flagged.",
      confidenceImpact:
        "Confidence impact: blocked because confidence cannot be calculated into a final resolution without explicit review.",
      proposedResolutionOptions: [
        "Proposed resolution options: block the claim until source metadata is reviewed.",
        "Proposed resolution options: request a reviewed freshness boundary before rechecking.",
        "Proposed resolution options: exclude the claim from summary/report drafts until reviewer approval.",
      ],
      freshnessRecheckRoute:
        "Freshness recheck route: /research-freshness-recheck-boundary stays approval-gated and does not refresh sources from this page.",
      blockedReasons: [
        "Opposing source summary missing",
        "Freshness/staleness signal unresolved",
        "Final resolution requires explicit review",
      ],
      advancedConflictDetails:
        "Advanced conflict details: blocked conflict reviews cannot imply automatic conflict resolution, source auto-fetching, freshness auto-recheck, web/search/provider API calls, automatic provider send, claim auto-update, evidence auto-update, auto-citation finalization, automatic report export, file export/write behavior, memory/RAG ingestion, memory auto-promotion, Brain graph mutation, plugin execution, tool execution, agent execution, MCP tool calls, local file access, command execution, package install behavior, or third-party vendoring.",
    }),
  ];
}

export function buildEvidenceConflictResolverReviewBoundary(): EvidenceConflictResolverReviewBoundary {
  return {
    conflictResolverReviewOnly: true,
    conflictsNotResolvedAutomatically: true,
    staleEvidenceRemainsFlagged: true,
    finalResolutionRequiresExplicitReview: true,
    automaticWebBrowsingAllowed: false,
    webBrowsingAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    automaticProviderCallsAllowed: false,
    automaticProviderSendAllowed: false,
    promptOrFileAutoSendAllowed: false,
    promptFileSourceAutoSendAllowed: false,
    sourceAutoSendAllowed: false,
    sourceAutoFetchAllowed: false,
    sourceAutoRefreshAllowed: false,
    sourceAutoIngestionAllowed: false,
    evidenceAutoIngestionAllowed: false,
    evidenceAutoUpdateAllowed: false,
    claimAutoUpdateAllowed: false,
    evidenceAutoCitationAllowed: false,
    citationAutoFinalizationAllowed: false,
    automaticReportExportAllowed: false,
    reportAutoExportAllowed: false,
    fileExportAllowedFromUi: false,
    freshnessAutoRecheckAllowed: false,
    memoryIngestionAllowedFromUi: false,
    ragIngestionAllowedFromUi: false,
    memoryAutoPromotionAllowed: false,
    autoSpendTokensAllowed: false,
    tokenSpendAllowedFromUi: false,
    providerRetryAllowedFromUi: false,
    rawFetchAllowedFromUi: false,
    apiKeysDisplayedAllowed: false,
    secretValuesDisplayedAllowed: false,
    secretsDisplayedAllowed: false,
    apiKeyLocalStorageAllowed: false,
    localStorageApiKeyStorageAllowed: false,
    processEnvDisplayAllowed: false,
    pluginExecutionAllowedFromUi: false,
    toolExecutionAllowedFromUi: false,
    agentExecutionAllowedFromUi: false,
    extensionInstallAllowedFromUi: false,
    extensionRuntimeExecutorCreated: false,
    mcpRuntimeCreated: false,
    mcpServerCreated: false,
    mcpClientCreated: false,
    mcpToolCallsAllowedFromUi: false,
    jarvisdPermissionAutoGrantAllowed: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    daemonProcessCreationAllowedFromFrontend: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
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
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    brainGraphMutationAllowed: false,
    processKillRestartShutdownAllowedFromUi: false,
    packageInstallAllowedFromUi: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeEvidenceConflictResolverReview(
  model: Pick<EvidenceConflictResolverReviewModel, "reviews">
): string {
  return `Evidence conflict resolver review prepares ${model.reviews.length} conflict review posture(s). Conflicts are not resolved automatically, stale evidence remains flagged, and final resolution requires explicit review.`;
}

export function buildEvidenceConflictResolverReviewModel(): EvidenceConflictResolverReviewModel {
  const reviews = buildEvidenceConflictResolverReviews();
  const model: EvidenceConflictResolverReviewModel = {
    title: "Evidence conflict resolver review",
    summary: "",
    reviews,
    boundary: buildEvidenceConflictResolverReviewBoundary(),
    conflictLanguage: [...EVIDENCE_CONFLICT_RESOLVER_REVIEW_LANGUAGE],
    advancedDetails: [
      "Evidence conflict resolver review",
      "Conflicts are not resolved automatically",
      "Stale evidence remains flagged",
      "Final resolution requires explicit review",
      "Conflict review identity",
      "Source evidence inbox",
      "Conflicting claim summary",
      "Supporting source summary",
      "Opposing source summary",
      "Freshness/staleness signal",
      "Confidence impact",
      "Proposed resolution options",
      "Freshness recheck route",
      "Blocked reasons",
      "Advanced conflict details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeEvidenceConflictResolverReview(model) };
}
