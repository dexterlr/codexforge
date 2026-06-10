import type {
  CreativeLocalBridgeRealWorldTrialReview,
  CreativeLocalBridgeRealWorldTrialReviewBoundary,
  CreativeLocalBridgeRealWorldTrialReviewModel,
} from "./creative-local-bridge-real-world-trial-review-types";
import { buildCreativeLocalBridgeRealWorldTrialReviewStableKey } from "./creative-local-bridge-real-world-trial-review-types";

export const CREATIVE_LOCAL_BRIDGE_REAL_WORLD_TRIAL_REVIEW_LANGUAGE = [
  "Creative local bridge real-world trial review",
  "Creative local bridge trial review does not launch local tools",
  "Render and generation jobs require explicit approval",
  "Artifacts are reviewed before use",
  "Local bridge tool readiness summary",
  "Provider governance trial route",
] as const;

export function buildCreativeLocalBridgeRealWorldTrialReview(
  input: Omit<CreativeLocalBridgeRealWorldTrialReview, "id"> & { idHint: string }
): CreativeLocalBridgeRealWorldTrialReview {
  const { idHint, ...review } = input;
  return {
    id: buildCreativeLocalBridgeRealWorldTrialReviewStableKey(
      "creative-local-bridge-real-world-trial-review",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildCreativeLocalBridgeRealWorldTrialReviews(): CreativeLocalBridgeRealWorldTrialReview[] {
  return [
    buildCreativeLocalBridgeRealWorldTrialReview({
      idHint: "operator-creative-brief-review",
      status: "ready-for-review",
      creativeTrialIdentity:
        "Creative trial identity: creative-local-bridge-real-world-trial-review-operator-creative-brief-review.",
      sourceFirstRealOperatorWorkflowTrial:
        "Source first real operator workflow trial: /first-real-operator-workflow-trial supplies the reviewed operator scenario, approval gates, blocked actions, and manual validation expectations.",
      operatorCreativeScenario:
        "Operator creative scenario: a real operator reviews a local creative workflow for Blender, Unreal, and ComfyUI readiness without launching local tools, calling a bridge endpoint, or running render and generation jobs.",
      localBridgeToolReadinessSummary:
        "Local bridge tool readiness summary: profile, adapter, health, approval, artifact capture, and handoff notes are reviewed as static evidence only.",
      blenderUnrealComfyUiBoundarySummary:
        "Blender/Unreal/ComfyUI boundary summary: Blender, Unreal, ComfyUI, local tools, local bridge endpoints, render queues, and generation workers stay inactive from this page.",
      renderGenerationApprovalGates: [
        "Render and generation jobs require explicit approval before any future render, image generation, video generation, workflow queue, or local creative tool action.",
        "Render and generation approval gates: local bridge endpoint access requires a separate approved bridge boundary.",
        "Render and generation approval gates: artifacts are reviewed before use and cannot be promoted automatically.",
      ],
      artifactReviewChecklist: [
        "Artifact review checklist: confirm provenance, operator intent, expected output, redaction posture, and review status before use.",
        "Artifact review checklist: confirm artifacts are reviewed before use and no report, render, image, video, or file is written from this page.",
        "Artifact review checklist: confirm creative evidence is context only until a separate approval gate accepts it.",
      ],
      blockedRealActions: [
        "Blocked real actions: local bridge endpoint calls, Blender launch, Unreal launch, ComfyUI launch, local tool launch, render execution, generation job execution, workflow execution, job queue execution, file mutation, file write, file export, and file deletion.",
        "Blocked real actions: provider API calls, connector API calls, web/search API calls, source fetching/browsing, commands, shell commands, git commands, tests, builds, smoke checks, patch apply behavior, commits, token storage, memory/RAG ingestion, memory auto-promotion, Brain graph mutation, reminders, schedules, automations, background jobs, notifications, polling loops, plugin execution, tool execution, agent execution, extension runtime executor, MCP runtime, and MCP tool calls.",
      ],
      trialOutcomeNotes: [
        "Trial outcome notes: ready when the operator can explain creative readiness and every real creative action remains approval-gated.",
        "Trial outcome notes: blocked if a request asks the review page to launch tools, run render or generation jobs, call local bridge endpoints, write artifacts, call providers, or promote memory.",
      ],
      providerGovernanceTrialRoute:
        "Provider governance trial route: /provider-governance-real-world-trial-review reviews provider policy readiness without calling providers or spending tokens.",
      advancedCreativeTrialDetails:
        "Advanced creative trial details: creative local bridge real-world trial review is review-only and does not launch local tools, call local bridge endpoints, launch Blender, launch Unreal, launch ComfyUI, run render jobs, run generation jobs, run workflows, execute jobs, mutate files, write files, export files, delete files, call providers, call connectors, call web/search APIs, fetch sources, browse sources, send prompt/file/project/connector data without approval, run commands, run shell commands, run git commands, run tests, run builds, run smoke checks, apply patches, create commits, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys in localStorage, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildCreativeLocalBridgeRealWorldTrialReview({
      idHint: "blocked-tool-launch-request",
      status: "blocked",
      creativeTrialIdentity:
        "Creative trial identity: creative-local-bridge-real-world-trial-review-blocked-tool-launch-request.",
      sourceFirstRealOperatorWorkflowTrial:
        "Source first real operator workflow trial: blocked until /first-real-operator-workflow-trial confirms the operator scenario and approval gates.",
      operatorCreativeScenario:
        "Operator creative scenario: blocked when the request asks this review page to launch a local tool, call a bridge endpoint, render, generate, write files, or use artifacts without review.",
      localBridgeToolReadinessSummary:
        "Local bridge tool readiness summary: blocked until readiness evidence can be reviewed without local bridge calls.",
      blenderUnrealComfyUiBoundarySummary:
        "Blender/Unreal/ComfyUI boundary summary: blocked because local creative tools remain inactive from this page.",
      renderGenerationApprovalGates: [
        "Render and generation approval gates: blocked because explicit approval is missing.",
      ],
      artifactReviewChecklist: [
        "Artifact review checklist: blocked because artifacts are not reviewed before use.",
      ],
      blockedRealActions: [
        "Blocked real actions: every creative, local bridge, provider, connector, command, file, automation, memory, plugin, tool, agent, and MCP action remains blocked.",
      ],
      trialOutcomeNotes: [
        "Trial outcome notes: blocked until local tool launch, render, generation, artifact, and provider boundaries are reviewed.",
      ],
      providerGovernanceTrialRoute:
        "Provider governance trial route: /provider-governance-real-world-trial-review remains the next review-only handoff after creative review.",
      advancedCreativeTrialDetails:
        "Advanced creative trial details: blocked creative reviews cannot recover by launching tools, calling bridge endpoints, running jobs, writing artifacts, calling APIs, storing tokens, promoting memory, mutating Brain graph data, or creating an MCP runtime.",
    }),
  ];
}

export function buildCreativeLocalBridgeRealWorldTrialReviewBoundary(): CreativeLocalBridgeRealWorldTrialReviewBoundary {
  return {
    creativeLocalBridgeTrialReviewOnly: true,
    creativeLocalBridgeTrialReviewDoesNotLaunchLocalTools: true,
    renderAndGenerationJobsRequireExplicitApproval: true,
    artifactsReviewedBeforeUse: true,
    localBridgeEndpointCallsAllowedFromUi: false,
    localToolLaunchAllowedFromUi: false,
    blenderLaunchAllowedFromUi: false,
    unrealLaunchAllowedFromUi: false,
    comfyUiLaunchAllowedFromUi: false,
    renderGenerationJobExecutionAllowedFromUi: false,
    actionsExecutedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    codingTaskExecutionAllowedFromUi: false,
    taskExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    buildExecutionFromUiAllowed: false,
    smokeExecutionFromUiAllowed: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    commitCreationAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    automaticWebBrowsingAllowed: false,
    webBrowsingAllowedFromUi: false,
    sourceAutoFetchAllowed: false,
    providerApiCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    gmailApiCallsAllowedFromUi: false,
    calendarApiCallsAllowedFromUi: false,
    contactsApiCallsAllowedFromUi: false,
    googleApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    oauthRequestFlowAllowedFromUi: false,
    connectorAuthorizationAllowedFromUi: false,
    connectorDataReadFromPageAllowed: false,
    tokenStorageAllowed: false,
    localStorageTokenStorageAllowed: false,
    sessionStorageTokenStorageAllowed: false,
    localStorageApiKeyStorageAllowed: false,
    promptFileProjectDataAutoSendAllowed: false,
    promptFileProjectConnectorDataAutoSendAllowed: false,
    arbitraryProjectScanningAllowed: false,
    arbitraryLocalFileBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileExportAllowedFromUi: false,
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
    processEnvDisplayAllowed: false,
    secretsDisplayedAllowed: false,
    packageInstallAllowedFromUi: false,
    routeCoverageRemovalAllowed: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeCreativeLocalBridgeRealWorldTrialReview(
  model: Pick<CreativeLocalBridgeRealWorldTrialReviewModel, "reviews">
): string {
  return `Creative local bridge real-world trial review prepares ${model.reviews.length} creative/local bridge trial posture(s). Creative local bridge trial review does not launch local tools, render and generation jobs require explicit approval, and artifacts are reviewed before use.`;
}

export function buildCreativeLocalBridgeRealWorldTrialReviewModel(): CreativeLocalBridgeRealWorldTrialReviewModel {
  const reviews = buildCreativeLocalBridgeRealWorldTrialReviews();
  const model: CreativeLocalBridgeRealWorldTrialReviewModel = {
    title: "Creative local bridge real-world trial review",
    summary: "",
    reviews,
    boundary: buildCreativeLocalBridgeRealWorldTrialReviewBoundary(),
    trialReviewLanguage: [...CREATIVE_LOCAL_BRIDGE_REAL_WORLD_TRIAL_REVIEW_LANGUAGE],
    advancedDetails: [
      "Creative local bridge real-world trial review",
      "Creative local bridge trial review does not launch local tools",
      "Render and generation jobs require explicit approval",
      "Artifacts are reviewed before use",
      "Creative trial identity",
      "Source first real operator workflow trial",
      "Operator creative scenario",
      "Local bridge tool readiness summary",
      "Blender/Unreal/ComfyUI boundary summary",
      "Render/generation approval gates",
      "Artifact review checklist",
      "Blocked real actions",
      "Trial outcome notes",
      "Provider governance trial route",
      "advanced creative trial details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeCreativeLocalBridgeRealWorldTrialReview(model) };
}
