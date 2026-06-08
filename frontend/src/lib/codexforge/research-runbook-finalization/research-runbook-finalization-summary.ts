import type {
  ResearchRunbookFinalization,
  ResearchRunbookFinalizationBoundary,
  ResearchRunbookFinalizationModel,
} from "./research-runbook-finalization-types";
import { buildResearchRunbookFinalizationStableKey } from "./research-runbook-finalization-types";

export const RESEARCH_RUNBOOK_FINALIZATION_LANGUAGE = [
  "Research runbook finalization",
  "Research runbooks are reviewed before use",
  "Runbooks never include API keys or secrets",
  "Runbook finalization does not browse or export automatically",
  "Operator checklist",
  "Freshness recheck policy",
] as const;

export function buildResearchRunbookFinalization(
  input: Omit<ResearchRunbookFinalization, "id"> & { idHint: string }
): ResearchRunbookFinalization {
  const { idHint, ...runbook } = input;
  return {
    id: buildResearchRunbookFinalizationStableKey(
      "research-runbook-finalization",
      idHint,
      input.status
    ),
    ...runbook,
  };
}

export function buildResearchRunbookFinalizations(): ResearchRunbookFinalization[] {
  return [
    buildResearchRunbookFinalization({
      idHint: "first-loop-operator-runbook",
      status: "review required",
      runbookIdentity: "Runbook identity: research-runbook-finalization-first-loop-operator-runbook.",
      sourceResearchReleaseCandidate:
        "Source research release candidate: /research-workspace-release-candidate supplies the reviewed release decision and known gaps.",
      approvedResearchWorkflowSummary:
        "Approved research workflow summary: scope research, approve provider boundary, collect source metadata for review, review evidence, draft claims, review citations, draft summary, review export, and keep every step approval-gated.",
      sourceCollectionRules: [
        "Source collection rules: source collection requires explicit approval before any future provider or web action.",
        "Source collection rules: no source is fetched, refreshed, normalized, cited, or moved forward automatically.",
        "Source collection rules: public, attributable, narrow, and relevant sources are preferred; private local context is denied.",
      ],
      citationRules: [
        "Citation rules: citations stay draft-labeled until reviewed.",
        "Citation rules: missing attribution, date, publisher, route, quality, or conflict flags block citation readiness.",
        "Citation rules: no citation is finalized, exported, or auto-cited from this page.",
      ],
      conflictHandlingRules: [
        "Conflict handling rules: conflicting evidence stays flagged and is not resolved automatically.",
        "Conflict handling rules: claims, citations, summaries, and reports must show unresolved conflict notes until explicitly reviewed.",
        "Conflict handling rules: route unresolved conflicts to /evidence-conflict-resolver-review.",
      ],
      freshnessRecheckPolicy:
        "Freshness recheck policy: freshness rechecks require explicit approval, a narrow allowed scope, denied scope notes, and budget/rate-limit guardrails before any future recheck.",
      privacyRedactionChecklist: [
        "Privacy/redaction checklist: remove API keys, tokens, secret-like values, private prompts, hidden memory, sensitive file paths, and personal data.",
        "Privacy/redaction checklist: runbooks never include API keys or secrets.",
        "Privacy/redaction checklist: raw sensitive content stays out of operator-ready instructions.",
      ],
      operatorChecklist: [
        "Operator checklist: confirm release candidate decision and known gaps.",
        "Operator checklist: confirm evidence conflicts and stale sources remain visible.",
        "Operator checklist: confirm export review is separate from actual export.",
        "Operator checklist: confirm memory is not auto-promoted.",
      ],
      blockedReasons: [
        "Research runbooks are reviewed before use",
        "Runbooks never include API keys or secrets",
        "Runbook finalization does not browse or export automatically",
      ],
      advancedRunbookDetails:
        "Advanced runbook details: this finalization page does not browse the web, call providers, fetch sources, refresh sources, recheck freshness, update evidence, ingest evidence, auto-cite, finalize citations, export reports, write files, display secrets, ingest memory, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an MCP runtime, run commands, apply patches, delete files, or delete artifacts.",
    }),
    buildResearchRunbookFinalization({
      idHint: "blocked-unapproved-gaps",
      status: "blocked",
      runbookIdentity: "Runbook identity: research-runbook-finalization-blocked-unapproved-gaps.",
      sourceResearchReleaseCandidate:
        "Source research release candidate: blocked until /research-workspace-release-candidate has an approved release decision and known-gap notes.",
      approvedResearchWorkflowSummary:
        "Approved research workflow summary: blocked because release readiness, conflict handling, freshness policy, or privacy checklist has not been reviewed.",
      sourceCollectionRules: [
        "Source collection rules: blocked until allowed source scope and denied source scope are explicit.",
        "Source collection rules: blocked until no automatic source fetch or refresh is confirmed.",
      ],
      citationRules: [
        "Citation rules: blocked until citation drafts show missing metadata and approval status.",
        "Citation rules: blocked until final citation/export steps stay separated.",
      ],
      conflictHandlingRules: [
        "Conflict handling rules: blocked until conflict options are reviewed.",
        "Conflict handling rules: blocked until stale evidence remains flagged.",
      ],
      freshnessRecheckPolicy:
        "Freshness recheck policy: blocked until /research-freshness-recheck-boundary defines allowed scope, denied scope, budget/rate-limit guardrail, and approval requirement.",
      privacyRedactionChecklist: [
        "Privacy/redaction checklist: blocked until secret exclusion is confirmed.",
        "Privacy/redaction checklist: blocked until sensitive source notes remain secondary.",
      ],
      operatorChecklist: [
        "Operator checklist: blocked until reviewer confirms the runbook is non-secret.",
        "Operator checklist: blocked until no automatic browse, export, provider send, memory promotion, or file write behavior is implied.",
      ],
      blockedReasons: [
        "Release candidate decision missing",
        "Freshness recheck policy missing",
        "Privacy/redaction checklist missing",
      ],
      advancedRunbookDetails:
        "Advanced runbook details: blocked runbooks cannot imply automatic browsing, web/search/provider API calls, prompt/file/source sending, source auto-fetching, freshness auto-recheck, evidence auto-update, automatic report export, file export/write behavior, API key display, secret display, memory/RAG ingestion, memory auto-promotion, Brain graph mutation, plugin execution, tool execution, agent execution, MCP runtime, command execution, package install behavior, or third-party vendoring.",
    }),
  ];
}

export function buildResearchRunbookFinalizationBoundary(): ResearchRunbookFinalizationBoundary {
  return {
    runbookFinalizationReviewOnly: true,
    researchRunbooksReviewedBeforeUse: true,
    runbooksNeverIncludeApiKeysOrSecrets: true,
    runbookFinalizationDoesNotBrowseOrExportAutomatically: true,
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

export function summarizeResearchRunbookFinalization(
  model: Pick<ResearchRunbookFinalizationModel, "runbooks">
): string {
  return `Research runbook finalization prepares ${model.runbooks.length} operator runbook posture(s). Research runbooks are reviewed before use, runbooks never include API keys or secrets, and runbook finalization does not browse or export automatically.`;
}

export function buildResearchRunbookFinalizationModel(): ResearchRunbookFinalizationModel {
  const runbooks = buildResearchRunbookFinalizations();
  const model: ResearchRunbookFinalizationModel = {
    title: "Research runbook finalization",
    summary: "",
    runbooks,
    boundary: buildResearchRunbookFinalizationBoundary(),
    runbookLanguage: [...RESEARCH_RUNBOOK_FINALIZATION_LANGUAGE],
    advancedDetails: [
      "Research runbook finalization",
      "Research runbooks are reviewed before use",
      "Runbooks never include API keys or secrets",
      "Runbook finalization does not browse or export automatically",
      "Runbook identity",
      "Source research release candidate",
      "Approved research workflow summary",
      "Source collection rules",
      "Citation rules",
      "Conflict handling rules",
      "Freshness recheck policy",
      "Privacy/redaction checklist",
      "Operator checklist",
      "Blocked reasons",
      "Advanced runbook details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeResearchRunbookFinalization(model) };
}
