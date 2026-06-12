import type {
  LocalModelOutputReviewInbox,
  LocalModelOutputReviewInboxBoundary,
  LocalModelOutputReviewInboxModel,
} from "./local-model-output-review-inbox-types";
import { buildLocalModelOutputReviewInboxStableKey } from "./local-model-output-review-inbox-types";

export const LOCAL_MODEL_OUTPUT_REVIEW_INBOX_LANGUAGE = [
  "Local model output review inbox",
  "Local model output review does not store model outputs",
  "Local model outputs require operator review before use",
  "Private prompt details stay redacted",
  "Output review groups",
  "Output safety checks",
] as const;

export function buildLocalModelOutputReviewInbox(
  input: Omit<LocalModelOutputReviewInbox, "id"> & { idHint: string }
): LocalModelOutputReviewInbox {
  const { idHint, ...inbox } = input;
  return {
    id: buildLocalModelOutputReviewInboxStableKey("local-model-output-review-inbox", idHint, input.status),
    ...inbox,
  };
}

export function buildLocalModelOutputReviewInboxes(): LocalModelOutputReviewInbox[] {
  return [
    buildLocalModelOutputReviewInbox({
      idHint: "review-only-output-handling",
      status: "ready-for-review",
      localModelOutputInboxIdentity:
        "Local model output inbox identity: local-model-output-review-inbox-review-only-output-handling.",
      outputReviewGroups: [
        "Output review groups: redacted prompt class, local runtime family label, safety posture, privacy posture, quality note, refusal behavior, follow-up action risk, and operator decision note.",
        "Output review groups: groups are labels only; local model output review does not store model outputs.",
      ],
      outputSafetyChecks: [
        "Output safety checks: local model outputs require operator review before use, raw output text is not persisted, private prompt details stay redacted, and credentials are never shown.",
        "Output safety checks: unreviewed output cannot be accepted, rejected automatically, ingested, or promoted to memory from this page.",
      ],
      redactionPrivacyRules: [
        "Redaction/privacy rules: show only review labels, safety result labels, runtime family labels, and redacted prompt class.",
        "Redaction/privacy rules: private prompt details stay redacted and live output text is never stored here.",
      ],
      acceptanceRejectionCriteria: [
        "Acceptance/rejection criteria: accept only after manual safety, privacy, accuracy, policy, redaction, and intended-use review.",
        "Acceptance/rejection criteria: reject output with private prompt leakage, credential leakage, unsafe instruction, unsupported tool action, hidden routing, file mutation request, or unreviewed memory claim.",
      ],
      deniedOutputActions: [
        "Denied output actions: storing model outputs, ingesting outputs, auto-promoting output lessons, auto-accepting output, sending follow-up prompts, calling local models, and routing local model traffic.",
        "Denied output actions: connector calls, web/search calls, GitHub calls, file mutation, Brain graph mutation, shell execution, git execution, and workflow execution remain blocked.",
      ],
      blockedOutputRisks: [
        "Blocked output risks: raw output persistence, unreviewed output use, private prompt leakage, credential leakage, hallucinated action, unsafe follow-up prompt, endpoint exposure, and memory ingestion.",
        "Blocked output risks: any local model output stays blocked until operator review is complete outside this page.",
      ],
      localFailoverRoute:
        "Local failover route: /local-model-failover-review reviews fallback behavior without switching runtimes.",
      runtimeBoundaryRoute:
        "Runtime boundary route: /local-model-runtime-boundary-review reviews runtime boundaries without calling local models.",
      nextRecommendedAction:
        "Next recommended action: review failover behavior and runtime boundary posture before any local model output can be used.",
      advancedOutputDetails:
        "Advanced output details: local model output review inbox is review-only. Local model output review does not store model outputs, local model outputs require operator review before use, and private prompt details stay redacted. It does not store model outputs, ingest outputs, call local models, call local bridge endpoints, probe local endpoints, launch local tools, route local model traffic, switch runtimes, retry model calls, send prompts to models, call provider APIs, call OpenAI-compatible providers, test provider connections, route provider traffic, call connector APIs, call web/search APIs, call GitHub APIs, send prompt/file/project/connector/provider/model/endpoint/output data without approval, store endpoints, store tokens, store credentials, display secrets, print process.env, scan arbitrary projects, browse local files, crawl paths, read local files, open local files, auto-open files, run git commands, run shell commands, run tests, run builds, run smoke checks, run workflows, execute actions, approve actions, automate approval, mutate files, write files, export files, apply patches, delete files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildLocalModelOutputReviewInbox({
      idHint: "blocked-output-storage-request",
      status: "blocked",
      localModelOutputInboxIdentity:
        "Local model output inbox identity: local-model-output-review-inbox-blocked-output-storage-request.",
      outputReviewGroups: [
        "Output review groups: blocked when a request asks this page to save, ingest, reuse, or auto-accept local model output.",
      ],
      outputSafetyChecks: [
        "Output safety checks: blocked because local model outputs require operator review before use.",
      ],
      redactionPrivacyRules: [
        "Redaction/privacy rules: blocked because private prompt details stay redacted.",
      ],
      acceptanceRejectionCriteria: [
        "Acceptance/rejection criteria: blocked until an operator reviews the output outside this page.",
      ],
      deniedOutputActions: [
        "Denied output actions: output storage, output ingestion, memory mutation, prompt replay, local model calls, and runtime routing remain blocked.",
      ],
      blockedOutputRisks: [
        "Blocked output risks: raw local output persistence and unreviewed output use remain blocked.",
      ],
      localFailoverRoute:
        "Local failover route: /local-model-failover-review remains review-only.",
      runtimeBoundaryRoute:
        "Runtime boundary route: /local-model-runtime-boundary-review remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep output handling blocked until redaction, safety, and runtime boundary checks are reviewed.",
      advancedOutputDetails:
        "Advanced output details: blocked output review cannot recover by storing outputs, ingesting outputs, calling local models, switching runtimes, writing files, or mutating memory.",
    }),
  ];
}

export function buildLocalModelOutputReviewInboxBoundary(): LocalModelOutputReviewInboxBoundary {
  return {
    localModelOutputReviewInboxReviewOnly: true,
    localModelOutputReviewDoesNotStoreModelOutputs: true,
    localModelOutputsRequireOperatorReviewBeforeUse: true,
    privatePromptDetailsStayRedacted: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    localModelTrafficAllowedFromUi: false,
    localModelTrafficRoutingAllowedFromUi: false,
    localModelLiveConnectionTestsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    localEndpointProbeExecutionAllowedFromUi: false,
    localToolLaunchingAllowedFromUi: false,
    runtimeSwitchingAllowedFromUi: false,
    modelRetryCallsAllowedFromUi: false,
    promptSendingAllowedFromUi: false,
    modelOutputStorageAllowedFromUi: false,
    modelOutputIngestionAllowedFromUi: false,
    modelOutputUseBeforeReviewAllowed: false,
    endpointStorageAllowed: false,
    credentialStorageAllowed: false,
    tokenStorageAllowed: false,
    providerApiCallsAllowedFromUi: false,
    openAICompatibleProviderApiCallsAllowedFromUi: false,
    providerConnectionAllowedFromUi: false,
    providerConnectionTestsAllowedFromUi: false,
    liveProviderTrafficAllowedFromUi: false,
    providerTrafficRoutingAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    promptFileProjectConnectorProviderModelEndpointOutputDataAutoSendAllowed: false,
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

export function summarizeLocalModelOutputReviewInbox(
  model: Pick<LocalModelOutputReviewInboxModel, "inboxes">
): string {
  return `Local model output review inbox prepares ${model.inboxes.length} output review posture(s). Local model output review does not store model outputs, local model outputs require operator review before use, and private prompt details stay redacted.`;
}

export function buildLocalModelOutputReviewInboxModel(): LocalModelOutputReviewInboxModel {
  const inboxes = buildLocalModelOutputReviewInboxes();
  const model: LocalModelOutputReviewInboxModel = {
    title: "Local model output review inbox",
    summary: "",
    inboxes,
    boundary: buildLocalModelOutputReviewInboxBoundary(),
    outputReviewLanguage: [...LOCAL_MODEL_OUTPUT_REVIEW_INBOX_LANGUAGE],
    advancedDetails: [
      "Local model output review inbox",
      "local model output inbox identity",
      "Output review groups",
      "Output safety checks",
      "Redaction/privacy rules",
      "Acceptance/rejection criteria",
      "Denied output actions",
      "Blocked output risks",
      "Local failover route",
      "Runtime boundary route",
      "Next recommended action",
      "Local model output review does not store model outputs",
      "Local model outputs require operator review before use",
      "Private prompt details stay redacted",
      "advanced output details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeLocalModelOutputReviewInbox(model) };
}
