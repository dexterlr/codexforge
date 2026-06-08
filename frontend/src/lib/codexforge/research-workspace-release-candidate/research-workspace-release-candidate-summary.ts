import type {
  ResearchWorkspaceReleaseCandidate,
  ResearchWorkspaceReleaseCandidateBoundary,
  ResearchWorkspaceReleaseCandidateModel,
} from "./research-workspace-release-candidate-types";
import { buildResearchWorkspaceReleaseCandidateStableKey } from "./research-workspace-release-candidate-types";

export const RESEARCH_WORKSPACE_RELEASE_CANDIDATE_LANGUAGE = [
  "Research workspace release candidate",
  "Research release candidate remains review-only",
  "No web or provider request is sent from this page",
  "Memory is not auto-promoted",
  "Release decision",
  "Known gaps",
] as const;

export function buildResearchWorkspaceReleaseCandidate(
  input: Omit<ResearchWorkspaceReleaseCandidate, "id"> & { idHint: string }
): ResearchWorkspaceReleaseCandidate {
  const { idHint, ...candidate } = input;
  return {
    id: buildResearchWorkspaceReleaseCandidateStableKey(
      "research-workspace-release-candidate",
      idHint,
      input.releaseDecision
    ),
    ...candidate,
  };
}

export function buildResearchWorkspaceReleaseCandidates(): ResearchWorkspaceReleaseCandidate[] {
  return [
    buildResearchWorkspaceReleaseCandidate({
      idHint: "first-loop-ready-with-fixes",
      releaseDecision: "ready with fixes",
      releaseCandidateIdentity:
        "Release candidate identity: research-workspace-release-candidate-first-loop-ready-with-fixes.",
      coveredResearchSurfaces: [
        "/research-workspace",
        "/web-research-provider-boundary",
        "/research-source-collector-trial",
        "/research-evidence-inbox",
        "/research-claim-builder",
        "/research-citation-draft-review",
        "/research-summary-draft-builder",
        "/research-report-export-review",
      ],
      evidenceInboxReadiness:
        "Evidence inbox readiness: review-ready when evidence packets show source quality, citation readiness, redaction status, and stale/conflict flags.",
      claimReadiness:
        "Claim readiness: review-ready when proposed claims keep qualifiers, evidence support, confidence, and conflict or stale evidence visible.",
      citationReadiness:
        "Citation readiness: draft-ready when attribution, publisher, date, route, missing metadata, and source quality notes are visible for review.",
      summaryReportReadiness:
        "Summary/report readiness: ready with fixes because summaries and report exports remain draft-labeled until unresolved conflicts and approval notes are reviewed.",
      privacyRedactionReadiness:
        "Privacy/redaction readiness: ready with fixes when private prompts, file paths, hidden memory, API keys, tokens, and secret-like values stay excluded.",
      knownGaps: [
        "Known gaps: stale evidence needs a future approved freshness boundary before any recheck.",
        "Known gaps: conflicts require explicit review before claims, citations, summaries, or reports are treated as ready.",
        "Known gaps: operator runbook wording needs final review before use.",
      ],
      nextRecommendedRoute:
        "Next recommended route: /research-runbook-finalization prepares the operator runbook without browsing, exporting, or provider calls.",
      blockedReasons: [
        "Research release candidate remains review-only",
        "No web or provider request is sent from this page",
        "Memory is not auto-promoted",
      ],
      advancedReleaseDetails:
        "Advanced release details: this candidate does not browse the web, call providers, fetch sources, refresh sources, recheck freshness, ingest evidence, update evidence, auto-cite, finalize citations, export reports, write files, ingest memory, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an MCP runtime, run commands, apply patches, delete files, or delete artifacts.",
    }),
    buildResearchWorkspaceReleaseCandidate({
      idHint: "blocked-conflict-heavy-loop",
      releaseDecision: "blocked",
      releaseCandidateIdentity:
        "Release candidate identity: research-workspace-release-candidate-blocked-conflict-heavy-loop.",
      coveredResearchSurfaces: [
        "/research-evidence-inbox",
        "/research-claim-builder",
        "/research-citation-draft-review",
        "/research-summary-draft-builder",
        "/research-report-export-review",
      ],
      evidenceInboxReadiness:
        "Evidence inbox readiness: blocked while stale or conflicting packets lack reviewer decisions and source quality status.",
      claimReadiness:
        "Claim readiness: blocked when proposed claims would hide unresolved conflict notes or overstate evidence coverage.",
      citationReadiness:
        "Citation readiness: blocked when citation drafts miss attribution, dates, source routes, or quality flags.",
      summaryReportReadiness:
        "Summary/report readiness: blocked until summary drafts and export reviews show conflict handling and an approval note.",
      privacyRedactionReadiness:
        "Privacy/redaction readiness: blocked until sensitive data and secrets are excluded from visible research content and handoff notes.",
      knownGaps: [
        "Known gaps: conflict resolution route must review options before any claim update.",
        "Known gaps: freshness recheck route must approve scope before any source refresh.",
        "Known gaps: report export remains blocked until final review is explicit.",
      ],
      nextRecommendedRoute:
        "Next recommended route: /evidence-conflict-resolver-review reviews conflict options without resolving them automatically.",
      blockedReasons: [
        "Conflict review missing",
        "Freshness recheck approval missing",
        "Final report approval missing",
      ],
      advancedReleaseDetails:
        "Advanced release details: blocked candidates cannot imply automatic browsing, web/search/provider API calls, source auto-fetching, freshness auto-recheck, evidence auto-update, auto-citation finalization, automatic report export, file export/write behavior, memory/RAG ingestion, memory auto-promotion, Brain graph mutation, plugin execution, tool execution, agent execution, MCP tool calls, local file access, command execution, package install behavior, or third-party vendoring.",
    }),
  ];
}

export function buildResearchWorkspaceReleaseCandidateBoundary(): ResearchWorkspaceReleaseCandidateBoundary {
  return {
    releaseCandidateReviewOnly: true,
    researchReleaseCandidateRemainsReviewOnly: true,
    noWebOrProviderRequestSentFromPage: true,
    memoryNotAutoPromoted: true,
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

export function summarizeResearchWorkspaceReleaseCandidate(
  model: Pick<ResearchWorkspaceReleaseCandidateModel, "candidates">
): string {
  return `Research workspace release candidate reviews ${model.candidates.length} release posture(s) for the first research workspace loop. Research release candidate remains review-only, no web or provider request is sent from this page, and memory is not auto-promoted.`;
}

export function buildResearchWorkspaceReleaseCandidateModel(): ResearchWorkspaceReleaseCandidateModel {
  const candidates = buildResearchWorkspaceReleaseCandidates();
  const model: ResearchWorkspaceReleaseCandidateModel = {
    title: "Research workspace release candidate",
    summary: "",
    candidates,
    boundary: buildResearchWorkspaceReleaseCandidateBoundary(),
    releaseLanguage: [...RESEARCH_WORKSPACE_RELEASE_CANDIDATE_LANGUAGE],
    advancedDetails: [
      "Research workspace release candidate",
      "Research release candidate remains review-only",
      "No web or provider request is sent from this page",
      "Memory is not auto-promoted",
      "Release candidate identity",
      "Covered research surfaces",
      "Evidence inbox readiness",
      "Claim readiness",
      "Citation readiness",
      "Summary/report readiness",
      "Privacy/redaction readiness",
      "Known gaps",
      "Release decision: ready, ready with fixes, blocked",
      "Next recommended route",
      "Blocked reasons",
      "Advanced release details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeResearchWorkspaceReleaseCandidate(model) };
}
