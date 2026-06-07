import type {
  ProjectIntelligenceResult,
  ProjectIntelligenceResultCaptureBoundary,
  ProjectIntelligenceResultCaptureModel,
} from "./project-intelligence-result-capture-types";
import { buildProjectIntelligenceResultCaptureStableKey } from "./project-intelligence-result-capture-types";

export const PROJECT_INTELLIGENCE_RESULT_CAPTURE_LANGUAGE = [
  "Project intelligence result capture",
  "Results are reviewed before use",
  "Secret values remain redacted",
  "Memory is not auto-promoted",
  "Findings summary",
  "Review inbox handoff",
] as const;

export function buildProjectIntelligenceResult(
  input: Omit<ProjectIntelligenceResult, "id"> & { idHint: string }
): ProjectIntelligenceResult {
  const { idHint, ...result } = input;
  return {
    id: buildProjectIntelligenceResultCaptureStableKey(
      "project-intelligence-result-capture",
      idHint,
      input.resultStatus
    ),
    ...result,
  };
}

export function buildProjectIntelligenceResults(): ProjectIntelligenceResult[] {
  return [
    buildProjectIntelligenceResult({
      idHint: "reviewed-live-trial-packet",
      resultStatus: "needs review",
      resultIdentity:
        "Result identity: project-intelligence-result-reviewed-live-trial-packet, a reviewed packet that consolidates index, search, dependency, and risk live trial outcomes.",
      sourceIndexTrial:
        "Source index trial: /project-indexer-live-trial supplies approved bounded workspace scope and excluded-path context.",
      sourceSearchTrial:
        "Source search trial: /project-search-live-trial supplies redacted result preview and approved indexed search scope.",
      sourceDependencyTrial:
        "Source dependency trial: /project-dependency-live-trial supplies module and dependency relationship metadata without installing packages.",
      sourceRiskSecretsTrial:
        "Source risk/secrets trial: /project-risk-scan-live-trial supplies redacted risk and suspected secret indicators.",
      workspaceScopeSummary:
        "Workspace scope summary: canonical CodexForge frontend metadata only; unrelated roots, dependency folders, generated output, and suspected secret stores remain excluded.",
      findingsSummary:
        "Findings summary: bounded index readiness, redacted search matches, dependency relationships, stale markers, and risk indicators are summarized for human review before use.",
      redactionStatus:
        "Redaction status: secret values remain redacted, suspected secrets are represented as indicators, and raw sensitive snippets are never displayed.",
      riskSecretsFollowUp:
        "Risk/secrets follow-up: unresolved risk stays visible and routes back to redaction review before planning or patch preview context can use it.",
      reviewInboxHandoff:
        "Review inbox handoff: /review-inbox receives the reviewed result summary, redaction status, risk follow-up, blocked reasons, and next route.",
      recoveryRoute:
        "Recovery route: /project-intelligence-recovery handles blocked, stale, failed, or incomplete intelligence without retrying scans automatically.",
      nextRecommendedRoute:
        "Next recommended route: /change-plan-live-context can use the reviewed packet as planning context after human review.",
      blockedReasons: [
        "Results are reviewed before use",
        "Secret values remain redacted",
        "Memory is not auto-promoted",
      ],
      advancedResultDetails:
        "Advanced result details: status values are passed, failed, blocked, and needs review. This page does not mutate files, call appendEvent, call saveBrainGraph, mutate Brain graph, promote memory, execute commands, browse arbitrary files, call providers, call GitHub APIs, or apply patches.",
    }),
    buildProjectIntelligenceResult({
      idHint: "blocked-redaction-follow-up",
      resultStatus: "blocked",
      resultIdentity:
        "Result identity: project-intelligence-result-blocked-redaction-follow-up.",
      sourceIndexTrial:
        "Source index trial: bounded workspace metadata exists but must stay stopped until risk follow-up is reviewed.",
      sourceSearchTrial:
        "Source search trial: redacted result preview requires review before downstream planning context.",
      sourceDependencyTrial:
        "Source dependency trial: dependency metadata is retained as review context only.",
      sourceRiskSecretsTrial:
        "Source risk/secrets trial: suspected secret indicator blocks downstream use until redaction follow-up is reviewed.",
      workspaceScopeSummary:
        "Workspace scope summary: approved scope remains narrow; recovery does not expand scope or browse arbitrary local files.",
      findingsSummary:
        "Findings summary: blocked because a risk/secrets follow-up remains open; no secret value is displayed.",
      redactionStatus:
        "Redaction status: blocked and redacted by default. Secret values remain redacted in primary and advanced views.",
      riskSecretsFollowUp:
        "Risk/secrets follow-up: review the redacted indicator in /project-risk-scan-live-trial and /jarvisd-secrets-redaction before use.",
      reviewInboxHandoff:
        "Review inbox handoff: /review-inbox keeps the blocked result visible instead of hiding or promoting it.",
      recoveryRoute:
        "Recovery route: /project-intelligence-recovery explains the blocked retry reasons without rescanning files.",
      nextRecommendedRoute:
        "Next recommended route: /project-intelligence-recovery before any change planning context.",
      blockedReasons: [
        "Risk/secrets follow-up unresolved",
        "Redaction review required",
        "Downstream planning context blocked",
      ],
      advancedResultDetails:
        "Advanced result details: blocked intelligence stays reviewed copy only and cannot trigger local browsing, file reads, command execution, provider sends, memory promotion, or patch preview generation.",
    }),
  ];
}

export function buildProjectIntelligenceResultCaptureBoundary(): ProjectIntelligenceResultCaptureBoundary {
  return {
    reviewBeforeUseRequired: true,
    sourceLiveTrialsRequired: true,
    secretValuesRedacted: true,
    memoryAutoPromotionAllowed: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    rawFetchAllowedFromUi: false,
    directJarvisdCallAllowedFromUi: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    daemonProcessCreationAllowedFromFrontend: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    providerApiCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    signingMaterialStorageAllowedInBrowser: false,
    sessionTokenStorageAllowedInBrowser: false,
    apiKeyLocalStorageAllowed: false,
    processEnvDisplayAllowed: false,
    auditLogMutationAllowedFromUi: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    brainGraphMutationAllowed: false,
    processKillRestartShutdownAllowedFromUi: false,
    packageInstallAllowedFromUi: false,
  };
}

export function summarizeProjectIntelligenceResultCapture(
  model: Pick<ProjectIntelligenceResultCaptureModel, "results">
): string {
  return `Project intelligence result capture prepares ${model.results.length} reviewed result packet shape(s). Results are reviewed before use, secret values remain redacted, and memory is not auto-promoted.`;
}

export function buildProjectIntelligenceResultCaptureModel(): ProjectIntelligenceResultCaptureModel {
  const results = buildProjectIntelligenceResults();
  const model: ProjectIntelligenceResultCaptureModel = {
    title: "Project intelligence result capture",
    summary: "",
    results,
    boundary: buildProjectIntelligenceResultCaptureBoundary(),
    resultLanguage: [...PROJECT_INTELLIGENCE_RESULT_CAPTURE_LANGUAGE],
    advancedDetails: [
      "Project intelligence result capture",
      "Results are reviewed before use",
      "Secret values remain redacted",
      "Memory is not auto-promoted",
      "Result identity",
      "Source index/search/dependency/risk trials",
      "Result status: passed, failed, blocked, needs review",
      "Workspace scope summary",
      "Findings summary",
      "Redaction status",
      "Risk/secrets follow-up",
      "Review inbox handoff",
      "Recovery route",
      "Next recommended route",
      "Blocked reasons",
      "Advanced result details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeProjectIntelligenceResultCapture(model) };
}
