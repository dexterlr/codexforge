import type {
  ProjectIntelligenceRecovery,
  ProjectIntelligenceRecoveryBoundary,
  ProjectIntelligenceRecoveryFlowModel,
} from "./project-intelligence-recovery-flow-types";
import { buildProjectIntelligenceRecoveryFlowStableKey } from "./project-intelligence-recovery-flow-types";

export const PROJECT_INTELLIGENCE_RECOVERY_FLOW_LANGUAGE = [
  "Project intelligence recovery flow",
  "Retry is never automatic",
  "Recovery does not rescan arbitrary files",
  "Recovery does not mutate files",
  "Safe recovery checklist",
  "Blocked retry reasons",
] as const;

export function buildProjectIntelligenceRecovery(
  input: Omit<ProjectIntelligenceRecovery, "id"> & { idHint: string }
): ProjectIntelligenceRecovery {
  const { idHint, ...recovery } = input;
  return {
    id: buildProjectIntelligenceRecoveryFlowStableKey(
      "project-intelligence-recovery-flow",
      idHint,
      input.failureCategory
    ),
    ...recovery,
  };
}

export function buildProjectIntelligenceRecoveries(): ProjectIntelligenceRecovery[] {
  return [
    buildProjectIntelligenceRecovery({
      idHint: "blocked-redaction-recovery",
      failureCategory: "redaction follow-up",
      recoveryIdentity:
        "Recovery identity: project-intelligence-recovery-redaction-follow-up, a triage packet for a blocked reviewed intelligence result.",
      sourceProjectIntelligenceResult:
        "Source project intelligence result: /project-intelligence-result supplies the blocked result status, findings summary, redaction status, and risk/secrets follow-up.",
      staleBlockedScope:
        "Stale/blocked scope: downstream change planning stays blocked until redaction review confirms the result can be used.",
      safeRecoveryChecklist: [
        "Keep the blocked result visible for review.",
        "Confirm the source live trial identities.",
        "Review redaction status before downstream planning.",
        "Route any unresolved risk back to the review inbox.",
      ],
      retryEligibility:
        "Retry eligibility: retry may be discussed only after human review confirms bounded scope, redaction status, and source trial freshness.",
      blockedRetryReasons: [
        "Retry is never automatic",
        "Recovery does not rescan arbitrary files",
        "Redaction follow-up is unresolved",
      ],
      redactionFollowUp:
        "Redaction follow-up: secret values remain redacted, suspected secret indicators stay visible as markers, and raw sensitive snippets are not displayed.",
      auditHandoff:
        "Audit handoff: preserve recovery identity, source result, failure category, scope, checklist, retry eligibility, and blocked retry reasons as review copy only.",
      nextRecommendedRoute:
        "Next recommended route: /review-inbox for disposition, then /project-intelligence-result if the result can be recaptured after review.",
      advancedRecoveryDetails:
        "Advanced recovery details: this flow does not retry scans automatically, rescan arbitrary files, browse arbitrary paths, mutate files, execute commands, call Jarvisd capabilities, call providers, mutate audit logs, or promote memory.",
    }),
    buildProjectIntelligenceRecovery({
      idHint: "stale-scope-recovery",
      failureCategory: "stale result",
      recoveryIdentity:
        "Recovery identity: project-intelligence-recovery-stale-scope.",
      sourceProjectIntelligenceResult:
        "Source project intelligence result: stale or incomplete result packet from /project-intelligence-result.",
      staleBlockedScope:
        "Stale/blocked scope: project index, search, dependency, or risk trial context may be stale, but recovery does not expand scope or rescan arbitrary files.",
      safeRecoveryChecklist: [
        "Stop downstream planning.",
        "Compare source trial route names and reviewed scope.",
        "Record stale markers for audit handoff.",
        "Use recovery routing before any new reviewed live trial.",
      ],
      retryEligibility:
        "Retry eligibility: not eligible while the result is stale, source scope is unclear, or redaction status is unknown.",
      blockedRetryReasons: [
        "Stale source result",
        "Source live trial freshness unknown",
        "Recovery does not mutate files",
      ],
      redactionFollowUp:
        "Redaction follow-up: unknown redaction state remains blocked until reviewed; secret values are not displayed.",
      auditHandoff:
        "Audit handoff: copy stale scope and blocked retry reasons to the review path without mutating audit logs.",
      nextRecommendedRoute:
        "Next recommended route: /project-indexer-live-trial for reviewed source posture, then /project-intelligence-result after review.",
      advancedRecoveryDetails:
        "Advanced recovery details: stale intelligence is a stop-and-review state, not a reason to browse local files, execute commands, or send data to providers.",
    }),
  ];
}

export function buildProjectIntelligenceRecoveryBoundary(): ProjectIntelligenceRecoveryBoundary {
  return {
    retryAutomaticAllowed: false,
    arbitraryRescanAllowed: false,
    recoveryMutationAllowedFromUi: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    rawFetchAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    directJarvisdCallAllowedFromUi: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    daemonProcessCreationAllowedFromFrontend: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
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

export function summarizeProjectIntelligenceRecoveryFlow(
  model: Pick<ProjectIntelligenceRecoveryFlowModel, "recoveries">
): string {
  return `Project intelligence recovery flow prepares ${model.recoveries.length} recovery triage shape(s). Retry is never automatic, recovery does not rescan arbitrary files, and recovery does not mutate files.`;
}

export function buildProjectIntelligenceRecoveryFlowModel(): ProjectIntelligenceRecoveryFlowModel {
  const recoveries = buildProjectIntelligenceRecoveries();
  const model: ProjectIntelligenceRecoveryFlowModel = {
    title: "Project intelligence recovery flow",
    summary: "",
    recoveries,
    boundary: buildProjectIntelligenceRecoveryBoundary(),
    recoveryLanguage: [...PROJECT_INTELLIGENCE_RECOVERY_FLOW_LANGUAGE],
    advancedDetails: [
      "Project intelligence recovery flow",
      "Retry is never automatic",
      "Recovery does not rescan arbitrary files",
      "Recovery does not mutate files",
      "Recovery identity",
      "Source project intelligence result",
      "Failure category",
      "Stale/blocked scope",
      "Safe recovery checklist",
      "Retry eligibility",
      "Blocked retry reasons",
      "Redaction follow-up",
      "Audit handoff",
      "Next recommended route",
      "Advanced recovery details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeProjectIntelligenceRecoveryFlow(model) };
}
