import type {
  SecretsTokenStorageRegressionSweep,
  SecretsTokenStorageRegressionSweepBoundary,
  SecretsTokenStorageRegressionSweepModel,
} from "./secrets-token-storage-regression-sweep-types";
import { buildSecretsTokenStorageRegressionSweepStableKey } from "./secrets-token-storage-regression-sweep-types";

export const SECRETS_TOKEN_STORAGE_REGRESSION_SWEEP_LANGUAGE = [
  "Secrets token storage regression sweep",
  "Secrets and tokens are never displayed or stored here",
  "Browser token storage remains blocked",
  "Regression findings require operator review",
  "Token storage policy",
  "Process env policy",
] as const;

export function buildSecretsTokenStorageRegressionSweep(
  input: Omit<SecretsTokenStorageRegressionSweep, "id"> & { idHint: string }
): SecretsTokenStorageRegressionSweep {
  const { idHint, ...sweep } = input;
  return {
    id: buildSecretsTokenStorageRegressionSweepStableKey(
      "secrets-token-storage-regression-sweep",
      idHint,
      input.status
    ),
    ...sweep,
  };
}

export function buildSecretsTokenStorageRegressionSweeps(): SecretsTokenStorageRegressionSweep[] {
  return [
    buildSecretsTokenStorageRegressionSweep({
      idHint: "browser-storage-policy",
      status: "ready-for-review",
      secretsSweepIdentity:
        "Secrets sweep identity: secrets-token-storage-regression-sweep-browser-storage-policy.",
      tokenStoragePolicy: [
        "Token storage policy: secrets and tokens are never displayed or stored here.",
        "Token storage policy: tokens, API keys, OAuth credentials, connector credentials, provider keys, signing material, and session tokens stay out of this UI.",
      ],
      browserStoragePolicy: [
        "Browser storage policy: browser token storage remains blocked.",
        "Browser storage policy: localStorage and sessionStorage are not used for API keys, tokens, secrets, provider keys, connector tokens, or signing material.",
      ],
      connectorTokenPolicy: [
        "Connector token policy: connector token values are not displayed, copied, persisted, refreshed, exchanged, or sent from this page.",
        "Connector token policy: connector authorization remains outside this review surface and requires explicit operator-controlled routes.",
      ],
      providerKeyPolicy: [
        "Provider key policy: provider key values are not displayed, stored, tested, or sent from this page.",
        "Provider key policy: this sweep never calls provider APIs and never prints key material.",
      ],
      processEnvPolicy: [
        "Process env policy: process.env values are never printed in this UI or logs.",
        "Process env policy: this page may show the policy label only, never environment variable values.",
      ],
      regressionFindingsPreview: [
        "Regression findings preview: token storage policy, browser storage policy, connector token policy, provider key policy, and process env policy all remain review-only.",
        "Regression findings preview: regression findings require operator review before any future remediation route is considered.",
      ],
      blockedRisks: [
        "Blocked risks: any secret display, browser token storage, API key storage, connector token read, provider key read, process env value print, or automatic export stays blocked.",
        "Blocked risks: no scan, search, connector call, provider call, file read, file write, memory mutation, or route execution starts here.",
      ],
      nextRecommendedRoute:
        "Next recommended route: /dashboard-density-navigation-polish keeps the cockpit compact while preserving privacy and secrets review routes.",
      advancedSecretsDetails:
        "Advanced secrets details: secrets token storage regression sweep is review-only. It does not display secrets, display tokens, store tokens, store API keys, use localStorage for secrets, use sessionStorage for secrets, read process.env values, print process.env values, call APIs, call connectors, call providers, call web/search APIs, call local bridge endpoints, run searches, scan local files, browse files, crawl paths, read files, open files, send prompt/file/project/connector data without approval, execute actions, approve actions, run workflows, run git commands, run shell commands, run tests, run builds, run smoke checks, mutate files, write files, export files, apply patches, delete files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildSecretsTokenStorageRegressionSweep({
      idHint: "blocked-secret-exposure",
      status: "blocked",
      secretsSweepIdentity:
        "Secrets sweep identity: secrets-token-storage-regression-sweep-blocked-secret-exposure.",
      tokenStoragePolicy: [
        "Token storage policy: secret exposure requests are blocked and tokens are never displayed or stored here.",
      ],
      browserStoragePolicy: [
        "Browser storage policy: browser token storage remains blocked for blocked secret exposure findings.",
      ],
      connectorTokenPolicy: [
        "Connector token policy: connector token values remain redacted and unavailable.",
      ],
      providerKeyPolicy: [
        "Provider key policy: provider key values remain redacted and unavailable.",
      ],
      processEnvPolicy: [
        "Process env policy: process env values are never printed.",
      ],
      regressionFindingsPreview: [
        "Regression findings preview: blocked findings show policy posture only, not secret values.",
      ],
      blockedRisks: [
        "Blocked risks: secret display, token persistence, process env printing, API calls, connector reads, local file scans, and memory promotion stay blocked.",
      ],
      nextRecommendedRoute:
        "Next recommended route: /local-first-privacy-audit to review privacy scope before any source is trusted.",
      advancedSecretsDetails:
        "Advanced secrets details: blocked secret exposure cannot display, persist, export, scan, read, send, mutate, schedule, poll, notify, execute, or promote anything from this page.",
    }),
  ];
}

export function buildSecretsTokenStorageRegressionSweepBoundary(): SecretsTokenStorageRegressionSweepBoundary {
  return {
    secretsSweepReviewOnly: true,
    secretsAndTokensNeverDisplayedOrStoredHere: true,
    browserTokenStorageRemainsBlocked: true,
    regressionFindingsRequireOperatorReview: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    workflowAutomaticRunAllowed: false,
    approvalAutomationAllowedFromUi: false,
    searchExecutionAllowedFromUi: false,
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
    browserTokenStorageAllowed: false,
    localStorageTokenStorageAllowed: false,
    sessionStorageTokenStorageAllowed: false,
    localStorageApiKeyStorageAllowed: false,
    sessionStorageApiKeyStorageAllowed: false,
    connectorTokenDisplayAllowed: false,
    providerKeyDisplayAllowed: false,
    processEnvDisplayAllowed: false,
    secretsDisplayedAllowed: false,
    packageInstallAllowedFromUi: false,
    routeCoverageRemovalAllowed: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeSecretsTokenStorageRegressionSweep(
  model: Pick<SecretsTokenStorageRegressionSweepModel, "sweeps">
): string {
  return `Secrets token storage regression sweep prepares ${model.sweeps.length} secrets and token storage posture(s). Secrets and tokens are never displayed or stored here, browser token storage remains blocked, and regression findings require operator review.`;
}

export function buildSecretsTokenStorageRegressionSweepModel(): SecretsTokenStorageRegressionSweepModel {
  const sweeps = buildSecretsTokenStorageRegressionSweeps();
  const model: SecretsTokenStorageRegressionSweepModel = {
    title: "Secrets token storage regression sweep",
    summary: "",
    sweeps,
    boundary: buildSecretsTokenStorageRegressionSweepBoundary(),
    secretsLanguage: [...SECRETS_TOKEN_STORAGE_REGRESSION_SWEEP_LANGUAGE],
    advancedDetails: [
      "Secrets token storage regression sweep",
      "Secrets sweep identity",
      "Token storage policy",
      "Browser storage policy",
      "Connector token policy",
      "Provider key policy",
      "Process env policy",
      "Regression findings preview",
      "Blocked risks",
      "Next recommended route",
      "Secrets and tokens are never displayed or stored here",
      "Browser token storage remains blocked",
      "Regression findings require operator review",
      "advanced secrets details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeSecretsTokenStorageRegressionSweep(model) };
}
