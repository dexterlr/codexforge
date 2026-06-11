import type {
  CreativeWorkflowReadinessAudit,
  CreativeWorkflowReadinessAuditBoundary,
  CreativeWorkflowReadinessAuditModel,
} from "./creative-workflow-readiness-audit-types";
import { buildCreativeWorkflowReadinessAuditStableKey } from "./creative-workflow-readiness-audit-types";

export const CREATIVE_WORKFLOW_READINESS_AUDIT_LANGUAGE = [
  "Creative workflow readiness audit",
  "Creative readiness audit does not generate assets",
  "Creative execution requires explicit operator approval",
  "Blocked creative actions stay blocked",
  "Supported creative workflow groups",
  "Local bridge dependency summary",
] as const;

export function buildCreativeWorkflowReadinessAudit(
  input: Omit<CreativeWorkflowReadinessAudit, "id"> & { idHint: string }
): CreativeWorkflowReadinessAudit {
  const { idHint, ...audit } = input;
  return {
    id: buildCreativeWorkflowReadinessAuditStableKey("creative-workflow-readiness-audit", idHint, input.status),
    ...audit,
  };
}

export function buildCreativeWorkflowReadinessAudits(): CreativeWorkflowReadinessAudit[] {
  return [
    buildCreativeWorkflowReadinessAudit({
      idHint: "review-only-creative-workflow-readiness",
      status: "ready-for-review",
      creativeWorkflowReadinessIdentity:
        "Creative workflow readiness identity: creative-workflow-readiness-audit-review-only-creative-workflow-readiness.",
      supportedCreativeWorkflowGroups: [
        "Supported creative workflow groups: prompt planning, storyboard planning, style and brand review, local bridge readiness review, artifact capture planning, provider routing review, and guarded execution handoff.",
        "Supported creative workflow groups: every group is reviewed from static readiness language only; no creative workflow runs from this page.",
      ],
      localBridgeDependencySummary: [
        "Local bridge dependency summary: creative local bridge health, allowed adapter names, artifact output boundaries, kill switch posture, and manual operator approval are dependencies for any future execution.",
        "Local bridge dependency summary: this audit does not call local bridge endpoints, launch local tools, inspect local projects, or run local creative tools.",
      ],
      providerDependencySummary: [
        "Provider dependency summary: cloud and local creative provider choices remain advisory until provider routing, privacy, budget, and approval gates are reviewed elsewhere.",
        "Provider dependency summary: this page does not call creative providers, send prompts, spend tokens, or generate images, video, audio, or other assets.",
      ],
      manualValidationChecklist: [
        "Manual validation checklist: confirm creative intent, allowed workflow group, data sensitivity, local bridge dependency, provider dependency, artifact capture plan, rollback note, and explicit approval path.",
        "Manual validation checklist: record readiness evidence manually; the creative readiness audit does not generate assets, mutate files, or mutate memory.",
      ],
      deniedCreativeActions: [
        "Denied creative actions: media generation, image generation, video generation, audio generation, workflow execution, local tool launch, local bridge calls, provider calls, file reads, file writes, exports, and memory mutation.",
        "Denied creative actions: blocked creative actions stay blocked until a separate explicit operator approval exists.",
      ],
      blockedCreativeReadinessRisks: [
        "Blocked creative readiness risks: missing approval, unresolved provider routing, unresolved local bridge boundary, unsafe artifact output, prompt privacy uncertainty, and any request to run generation from this page.",
        "Blocked creative readiness risks: direct creative generation or local tool launch requests keep readiness blocked.",
      ],
      researchReadinessRoute:
        "Research readiness route: /research-workflow-readiness-audit reviews research readiness without running research.",
      operatorCockpitRoute:
        "Operator cockpit route: /operator-cockpit-release-candidate reviews cockpit readiness without executing workflows.",
      nextRecommendedAction:
        "Next recommended action: review research and coding workflow readiness before a cockpit release candidate decision.",
      advancedCreativeReadinessDetails:
        "Advanced creative readiness details: creative workflow readiness audit is review-only. Creative readiness audit does not generate assets, creative execution requires explicit operator approval, and blocked creative actions stay blocked. It does not run creative workflows, generate media, generate images, generate video, create assets, launch local tools, call local bridge endpoints, call creative providers, call provider APIs, call connector APIs, call web/search APIs, call GitHub APIs, send prompt/file/project/connector/provider/workflow data without approval, scan projects, browse local files, crawl paths, read local files, open local files, auto-open files, mutate files, write files, delete files, export files, apply patches, run shell commands, run git commands, run tests, run builds, run smoke checks, mutate memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildCreativeWorkflowReadinessAudit({
      idHint: "blocked-creative-execution-request",
      status: "blocked",
      creativeWorkflowReadinessIdentity:
        "Creative workflow readiness identity: creative-workflow-readiness-audit-blocked-creative-execution-request.",
      supportedCreativeWorkflowGroups: [
        "Supported creative workflow groups: blocked request handling for creative workflow readiness.",
      ],
      localBridgeDependencySummary: [
        "Local bridge dependency summary: blocked while a request asks this page to launch a local creative tool or call a bridge endpoint.",
      ],
      providerDependencySummary: [
        "Provider dependency summary: blocked while a request asks this page to call a creative provider or generate assets.",
      ],
      manualValidationChecklist: [
        "Manual validation checklist: return to explicit operator approval and reviewed execution boundaries before any future creative action.",
      ],
      deniedCreativeActions: [
        "Denied creative actions: creative generation, tool launch, local bridge calls, provider sends, file mutation, and memory mutation remain blocked.",
      ],
      blockedCreativeReadinessRisks: [
        "Blocked creative readiness risks: unapproved generation requests cannot become readiness from this audit page.",
      ],
      researchReadinessRoute:
        "Research readiness route: /research-workflow-readiness-audit remains review-only.",
      operatorCockpitRoute:
        "Operator cockpit route: /operator-cockpit-release-candidate remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep the creative action blocked and document the missing approval.",
      advancedCreativeReadinessDetails:
        "Advanced creative readiness details: blocked creative readiness cannot recover by generating assets, running workflows, launching local tools, calling providers, approving work, writing files, or promoting memory.",
    }),
  ];
}

export function buildCreativeWorkflowReadinessAuditBoundary(): CreativeWorkflowReadinessAuditBoundary {
  return {
    creativeWorkflowReadinessAuditReviewOnly: true,
    creativeReadinessAuditDoesNotGenerateAssets: true,
    creativeExecutionRequiresExplicitOperatorApproval: true,
    blockedCreativeActionsStayBlocked: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    creativeWorkflowExecutionAllowedFromUi: false,
    assetGenerationAllowedFromUi: false,
    mediaGenerationAllowedFromUi: false,
    imageGenerationAllowedFromUi: false,
    videoGenerationAllowedFromUi: false,
    localToolLaunchingAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    promptFileProjectConnectorProviderWorkflowDataAutoSendAllowed: false,
    arbitraryProjectScanningAllowed: false,
    arbitraryLocalFileBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileExportAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    memoryIngestionAllowedFromUi: false,
    ragIngestionAllowedFromUi: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    testBuildSmokeExecutionAllowedFromUi: false,
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

export function summarizeCreativeWorkflowReadinessAudit(
  model: Pick<CreativeWorkflowReadinessAuditModel, "audits">
): string {
  return `Creative workflow readiness audit prepares ${model.audits.length} creative readiness posture(s). Creative readiness audit does not generate assets, creative execution requires explicit operator approval, and blocked creative actions stay blocked.`;
}

export function buildCreativeWorkflowReadinessAuditModel(): CreativeWorkflowReadinessAuditModel {
  const audits = buildCreativeWorkflowReadinessAudits();
  const model: CreativeWorkflowReadinessAuditModel = {
    title: "Creative workflow readiness audit",
    summary: "",
    audits,
    boundary: buildCreativeWorkflowReadinessAuditBoundary(),
    readinessLanguage: [...CREATIVE_WORKFLOW_READINESS_AUDIT_LANGUAGE],
    advancedDetails: [
      "Creative workflow readiness audit",
      "creative workflow readiness identity",
      "Supported creative workflow groups",
      "Local bridge dependency summary",
      "provider dependency summary",
      "manual validation checklist",
      "denied creative actions",
      "blocked creative readiness risks",
      "research readiness route",
      "operator cockpit route",
      "next recommended action",
      "Creative readiness audit does not generate assets",
      "Creative execution requires explicit operator approval",
      "Blocked creative actions stay blocked",
      "advanced creative readiness details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeCreativeWorkflowReadinessAudit(model) };
}
