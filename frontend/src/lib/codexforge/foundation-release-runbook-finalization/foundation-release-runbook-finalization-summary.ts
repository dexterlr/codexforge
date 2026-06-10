import type {
  FoundationReleaseRunbookFinalization,
  FoundationReleaseRunbookFinalizationBoundary,
  FoundationReleaseRunbookFinalizationModel,
} from "./foundation-release-runbook-finalization-types";
import { buildFoundationReleaseRunbookFinalizationStableKey } from "./foundation-release-runbook-finalization-types";

export const FOUNDATION_RELEASE_RUNBOOK_FINALIZATION_LANGUAGE = [
  "Foundation release runbook finalization",
  "Release runbooks are reviewed before use",
  "No release runbook file is written from this page",
  "Secrets and private values are excluded",
  "Release checklist",
  "Operator handoff checklist",
] as const;

export function buildFoundationReleaseRunbookFinalization(
  input: Omit<FoundationReleaseRunbookFinalization, "id"> & { idHint: string }
): FoundationReleaseRunbookFinalization {
  const { idHint, ...runbook } = input;
  return {
    id: buildFoundationReleaseRunbookFinalizationStableKey(
      "foundation-release-runbook-finalization",
      idHint,
      input.status
    ),
    ...runbook,
  };
}

export function buildFoundationReleaseRunbookFinalizations(): FoundationReleaseRunbookFinalization[] {
  return [
    buildFoundationReleaseRunbookFinalization({
      idHint: "operator-foundation-release-runbook",
      status: "review required",
      releaseRunbookIdentity:
        "Release runbook identity: foundation-release-runbook-finalization-operator-foundation-release-runbook.",
      sourceFoundationReleaseCandidate:
        "Source foundation release candidate: /codexforge-foundation-release-candidate supplies the reviewed release decision, known gaps, regression readiness, safety/audit readiness, dashboard readiness, release runbook route, and first real workflow route.",
      releaseChecklist: [
        "Release checklist: confirm the foundation release decision is ready or ready with fixes.",
        "Release checklist: confirm release does not ship automatically.",
        "Release checklist: confirm execution remains behind explicit approval gates.",
        "Release checklist: confirm unresolved regressions stay blocked.",
      ],
      validationChecklist: [
        "Validation checklist: confirm build, smoke, and regression evidence is reviewed outside this page.",
        "Validation checklist: confirm regression matrix does not run tests from this page.",
        "Validation checklist: confirm no build execution from UI, no smoke execution from UI, and no test execution from UI.",
      ],
      rollbackRecoveryChecklist: [
        "Rollback/recovery checklist: keep release rollback notes plain English and reviewed before use.",
        "Rollback/recovery checklist: route unresolved release blockers back to /mvp-hardening-regression-matrix and /cross-loop-safety-audit-inbox.",
        "Rollback/recovery checklist: blocked release actions remain blocked until approved in a separate gate.",
      ],
      privacySecretsChecklist: [
        "Privacy/secrets checklist: secrets and private values are excluded.",
        "Privacy/secrets checklist: API keys, tokens, process.env values, private connector values, private prompts, and sensitive local paths are not displayed.",
        "Privacy/secrets checklist: no token storage and no localStorage API key storage are allowed.",
      ],
      operatorHandoffChecklist: [
        "Operator handoff checklist: first real workflow trial remains guided and approval-gated.",
        "Operator handoff checklist: no release runbook file is written from this page.",
        "Operator handoff checklist: operator must review blocked reasons before any handoff is used.",
      ],
      firstRealWorkflowRoute:
        "First real workflow route: /first-real-operator-workflow-trial prepares the guided real operator workflow trial after this runbook is reviewed.",
      blockedReasons: [
        "Blocked reason: release candidate decision missing.",
        "Blocked reason: validation evidence not reviewed.",
        "Blocked reason: privacy/secrets checklist incomplete.",
      ],
      advancedRunbookDetails:
        "Advanced runbook details: foundation release runbook finalization is review-only and does not write a release runbook file, export files, execute release actions, ship releases, execute workflows, run builds, run smoke checks, run tests, run commands, run shell commands, run git commands, scan arbitrary local projects, browse local files, crawl paths, read files, open files, write files, apply patches, delete files, call provider APIs, call connector APIs, call web/search APIs, send prompt/file/project/connector data without approval, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys in localStorage, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildFoundationReleaseRunbookFinalization({
      idHint: "blocked-runbook-handoff",
      status: "blocked",
      releaseRunbookIdentity:
        "Release runbook identity: foundation-release-runbook-finalization-blocked-runbook-handoff.",
      sourceFoundationReleaseCandidate:
        "Source foundation release candidate: blocked until /codexforge-foundation-release-candidate has a reviewed release decision and known-gap notes.",
      releaseChecklist: [
        "Release checklist: blocked until release decision is reviewed.",
        "Release checklist: blocked until release does not ship automatically is confirmed.",
      ],
      validationChecklist: [
        "Validation checklist: blocked until hardening evidence is reviewed outside this page.",
      ],
      rollbackRecoveryChecklist: [
        "Rollback/recovery checklist: blocked until rollback owner and blocked release paths are clear.",
      ],
      privacySecretsChecklist: [
        "Privacy/secrets checklist: blocked until secrets and private values are excluded.",
      ],
      operatorHandoffChecklist: [
        "Operator handoff checklist: blocked until no file export/write behavior is implied.",
        "Operator handoff checklist: blocked until the first real workflow trial remains guided and approval-gated.",
      ],
      firstRealWorkflowRoute:
        "First real workflow route: /first-real-operator-workflow-trial remains blocked until release runbooks are reviewed before use.",
      blockedReasons: [
        "Blocked reason: release runbooks are reviewed before use.",
        "Blocked reason: no release runbook file is written from this page.",
      ],
      advancedRunbookDetails:
        "Advanced runbook details: blocked runbook finalization cannot recover by writing files, exporting files, shipping a release, executing workflows, calling APIs, storing tokens, promoting memory, mutating Brain graph data, creating automations, sending notifications, or starting background work.",
    }),
  ];
}

export function buildFoundationReleaseRunbookFinalizationBoundary(): FoundationReleaseRunbookFinalizationBoundary {
  return {
    runbookFinalizationReviewOnly: true,
    releaseRunbooksReviewedBeforeUse: true,
    releaseRunbookFileNotWrittenFromPage: true,
    secretsAndPrivateValuesExcluded: true,
    actionsExecutedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    workflowAutomaticRunAllowed: false,
    providerApiCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    promptFileProjectDataAutoSendAllowed: false,
    promptFileProjectConnectorDataAutoSendAllowed: false,
    arbitraryProjectScanningAllowed: false,
    arbitraryLocalFileBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    buildExecutionFromUiAllowed: false,
    smokeExecutionFromUiAllowed: false,
    releaseShippingExecutionAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileExportAllowedFromUi: false,
    runbookExportAllowedFromUi: false,
    runbookFileWriteAllowedFromUi: false,
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
    processEnvDisplayAllowed: false,
    apiKeysDisplayedAllowed: false,
    secretValuesDisplayedAllowed: false,
    secretsDisplayedAllowed: false,
    packageInstallAllowedFromUi: false,
    routeCoverageRemovalAllowed: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeFoundationReleaseRunbookFinalization(
  model: Pick<FoundationReleaseRunbookFinalizationModel, "runbooks">
): string {
  return `Foundation release runbook finalization reviews ${model.runbooks.length} release runbook posture(s). Release runbooks are reviewed before use, no release runbook file is written from this page, and secrets and private values are excluded.`;
}

export function buildFoundationReleaseRunbookFinalizationModel(): FoundationReleaseRunbookFinalizationModel {
  const runbooks = buildFoundationReleaseRunbookFinalizations();
  const model: FoundationReleaseRunbookFinalizationModel = {
    title: "Foundation release runbook finalization",
    summary: "",
    runbooks,
    boundary: buildFoundationReleaseRunbookFinalizationBoundary(),
    runbookLanguage: [...FOUNDATION_RELEASE_RUNBOOK_FINALIZATION_LANGUAGE],
    advancedDetails: [
      "Foundation release runbook finalization",
      "Release runbooks are reviewed before use",
      "No release runbook file is written from this page",
      "Secrets and private values are excluded",
      "Release runbook identity",
      "Source foundation release candidate",
      "Release checklist",
      "Validation checklist",
      "Rollback/recovery checklist",
      "Privacy/secrets checklist",
      "Operator handoff checklist",
      "First real workflow route",
      "Blocked reasons",
      "advanced runbook details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeFoundationReleaseRunbookFinalization(model) };
}
