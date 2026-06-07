import type {
  CodebaseChangePlanLiveContextBoundary,
  CodebaseChangePlanLiveContextIntegration,
  CodebaseChangePlanLiveContextIntegrationModel,
} from "./codebase-change-plan-live-context-integration-types";
import { buildCodebaseChangePlanLiveContextIntegrationStableKey } from "./codebase-change-plan-live-context-integration-types";

export const CODEBASE_CHANGE_PLAN_LIVE_CONTEXT_INTEGRATION_LANGUAGE = [
  "Codebase change plan live context integration",
  "Live context improves planning but does not modify files",
  "Arbitrary local browsing remains blocked",
  "Secret values stay redacted",
  "Relevant files modules summary",
  "Patch preview route",
] as const;

export function buildCodebaseChangePlanLiveContextIntegration(
  input: Omit<CodebaseChangePlanLiveContextIntegration, "id"> & { idHint: string }
): CodebaseChangePlanLiveContextIntegration {
  const { idHint, ...integration } = input;
  return {
    id: buildCodebaseChangePlanLiveContextIntegrationStableKey(
      "codebase-change-plan-live-context-integration",
      idHint,
      input.planningConfidence
    ),
    ...integration,
  };
}

export function buildCodebaseChangePlanLiveContextIntegrations(): CodebaseChangePlanLiveContextIntegration[] {
  return [
    buildCodebaseChangePlanLiveContextIntegration({
      idHint: "reviewed-intelligence-context",
      planningConfidence: "medium",
      integrationIdentity:
        "Integration identity: change-plan-live-context-reviewed-intelligence, a safe planning context built from reviewed project intelligence.",
      sourceProjectIntelligenceResult:
        "Source project intelligence result: /project-intelligence-result provides reviewed scope, findings summary, redaction status, and risk/secrets follow-up before planning uses context.",
      changeRequestSummary:
        "Change request summary: prepare a small CodexForge codebase change with live project context, without generating or applying patches from this page.",
      relevantFilesModulesSummary:
        "Relevant files modules summary: likely route, component, model, registry, and smoke-script areas are summarized from reviewed metadata only.",
      dependencyRiskContext:
        "Dependency risk context: dependency relationships and risk indicators from reviewed live trials improve planning confidence but stay secondary to human review.",
      secretsRedactionStatus:
        "Secrets redaction status: secret values stay redacted, suspected secret indicators remain markers, and raw sensitive snippets are not displayed.",
      nonGoals:
        "Non-goals: no arbitrary local browsing, no file reads, no file writes, no patch apply, no command execution, no provider send, and no memory promotion.",
      patchPreviewRoute:
        "Patch preview route: /patch-preview-live-context is the next review surface for live-context-aware patch preview.",
      blockedReasons: [
        "Live context improves planning but does not modify files",
        "Arbitrary local browsing remains blocked",
        "Secret values stay redacted",
      ],
      advancedContextDetails:
        "Advanced context details: live context is reviewed metadata only. It does not write files, apply patches, execute commands, browse arbitrary paths, call providers, call GitHub APIs, mutate Brain graph, call appendEvent, or call saveBrainGraph.",
    }),
    buildCodebaseChangePlanLiveContextIntegration({
      idHint: "blocked-intelligence-context",
      planningConfidence: "blocked",
      integrationIdentity:
        "Integration identity: change-plan-live-context-blocked-intelligence.",
      sourceProjectIntelligenceResult:
        "Source project intelligence result: blocked or stale result from /project-intelligence-result.",
      changeRequestSummary:
        "Change request summary: blocked because reviewed project intelligence is missing, stale, or still waiting on redaction follow-up.",
      relevantFilesModulesSummary:
        "Relevant files modules summary: unavailable while source intelligence is blocked; targets are not guessed by browsing local files.",
      dependencyRiskContext:
        "Dependency risk context: unavailable until the reviewed result packet confirms dependency and risk context.",
      secretsRedactionStatus:
        "Secrets redaction status: blocked and redacted by default; secret values stay redacted.",
      nonGoals:
        "Non-goals: no fallback local search, no automatic rescan, no patch preview, no command execution, and no provider traffic.",
      patchPreviewRoute:
        "Patch preview route: /patch-preview-live-context remains blocked until reviewed live context is available.",
      blockedReasons: [
        "Reviewed project intelligence missing",
        "Redaction status not reviewed",
        "Relevant files modules summary blocked",
      ],
      advancedContextDetails:
        "Advanced context details: blocked live context cannot infer file targets, generate diffs, mutate files, or send context to a provider.",
    }),
  ];
}

export function buildCodebaseChangePlanLiveContextBoundary(): CodebaseChangePlanLiveContextBoundary {
  return {
    reviewedProjectIntelligenceRequired: true,
    liveContextModifiesFilesAllowed: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    rawFetchAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    livePatchGenerationAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    directJarvisdCallAllowedFromUi: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    daemonProcessCreationAllowedFromFrontend: false,
    providerApiCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    secretValuesDisplayedAllowed: false,
    signingMaterialStorageAllowedInBrowser: false,
    sessionTokenStorageAllowedInBrowser: false,
    apiKeyLocalStorageAllowed: false,
    processEnvDisplayAllowed: false,
    auditLogMutationAllowedFromUi: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    brainGraphMutationAllowed: false,
    memoryAutoPromotionAllowed: false,
    processKillRestartShutdownAllowedFromUi: false,
    packageInstallAllowedFromUi: false,
  };
}

export function summarizeCodebaseChangePlanLiveContextIntegration(
  model: Pick<CodebaseChangePlanLiveContextIntegrationModel, "integrations">
): string {
  return `Codebase change plan live context integration prepares ${model.integrations.length} planning context shape(s). Live context improves planning but does not modify files, arbitrary local browsing remains blocked, and secret values stay redacted.`;
}

export function buildCodebaseChangePlanLiveContextIntegrationModel(): CodebaseChangePlanLiveContextIntegrationModel {
  const integrations = buildCodebaseChangePlanLiveContextIntegrations();
  const model: CodebaseChangePlanLiveContextIntegrationModel = {
    title: "Codebase change plan live context integration",
    summary: "",
    integrations,
    boundary: buildCodebaseChangePlanLiveContextBoundary(),
    contextLanguage: [...CODEBASE_CHANGE_PLAN_LIVE_CONTEXT_INTEGRATION_LANGUAGE],
    advancedDetails: [
      "Codebase change plan live context integration",
      "Live context improves planning but does not modify files",
      "Arbitrary local browsing remains blocked",
      "Secret values stay redacted",
      "Integration identity",
      "Source project intelligence result",
      "Change request summary",
      "Relevant files modules summary",
      "Dependency/risk context",
      "Secrets redaction status",
      "Non-goals",
      "Planning confidence",
      "Patch preview route",
      "Blocked reasons",
      "Advanced context details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeCodebaseChangePlanLiveContextIntegration(model) };
}
