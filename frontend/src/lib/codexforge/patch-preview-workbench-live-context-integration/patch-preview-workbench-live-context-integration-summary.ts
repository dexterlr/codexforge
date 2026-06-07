import type {
  PatchPreviewWorkbenchLiveContextBoundary,
  PatchPreviewWorkbenchLiveContextIntegration,
  PatchPreviewWorkbenchLiveContextIntegrationModel,
} from "./patch-preview-workbench-live-context-integration-types";
import { buildPatchPreviewWorkbenchLiveContextIntegrationStableKey } from "./patch-preview-workbench-live-context-integration-types";

export const PATCH_PREVIEW_WORKBENCH_LIVE_CONTEXT_INTEGRATION_LANGUAGE = [
  "Patch preview workbench live context integration",
  "Preview still does not apply patches",
  "Raw diffs stay secondary",
  "Suspected secrets are redacted",
  "Dependency risk context",
  "Rollback note",
] as const;

export function buildPatchPreviewWorkbenchLiveContextIntegration(
  input: Omit<PatchPreviewWorkbenchLiveContextIntegration, "id"> & { idHint: string }
): PatchPreviewWorkbenchLiveContextIntegration {
  const { idHint, ...integration } = input;
  return {
    id: buildPatchPreviewWorkbenchLiveContextIntegrationStableKey(
      "patch-preview-workbench-live-context-integration",
      idHint,
      input.status
    ),
    ...integration,
  };
}

export function buildPatchPreviewWorkbenchLiveContextIntegrations(): PatchPreviewWorkbenchLiveContextIntegration[] {
  return [
    buildPatchPreviewWorkbenchLiveContextIntegration({
      idHint: "reviewed-plan-context-preview",
      status: "review-required",
      integrationIdentity:
        "Integration identity: patch-preview-live-context-reviewed-plan, a safer patch preview context built from reviewed project intelligence and reviewed change plan live context.",
      sourceChangePlanLiveContext:
        "Source change plan live context: /change-plan-live-context supplies relevant files modules summary, dependency/risk context, non-goals, and planning confidence.",
      sourceProjectIntelligenceResult:
        "Source project intelligence result: /project-intelligence-result supplies reviewed scope, findings summary, redaction status, and risk/secrets follow-up.",
      affectedFilesSummary:
        "Affected files summary: proposed affected files are summarized from reviewed context only; this page does not open or write local files.",
      dependencyRiskContext:
        "Dependency risk context: dependency relationships, stale markers, provider-facing configuration risks, and suspected secret indicators stay visible before approval.",
      redactionStatus:
        "Redaction status: suspected secrets are redacted, secret values are never displayed, and raw sensitive snippets stay out of preview.",
      hunkContextSummary:
        "Hunk/context summary: proposed hunk intent is summarized in plain English before raw diff details are opened.",
      approvalRoute:
        "Approval route: /patch-apply-approval remains the separate human approval boundary before any future apply path.",
      rollbackNote:
        "Rollback note: rollback expectations are captured for later review; preview still does not apply patches or run rollback.",
      blockedReasons: [
        "Preview still does not apply patches",
        "Raw diffs stay secondary",
        "Suspected secrets are redacted",
      ],
      advancedPatchContextDetails:
        "Advanced patch context details: this workbench does not write files, apply patches, execute commands, browse arbitrary files, send context to providers, call Jarvisd capabilities, mutate audit logs, or promote memory.",
    }),
    buildPatchPreviewWorkbenchLiveContextIntegration({
      idHint: "blocked-plan-context-preview",
      status: "blocked",
      integrationIdentity:
        "Integration identity: patch-preview-live-context-blocked-plan.",
      sourceChangePlanLiveContext:
        "Source change plan live context: blocked because /change-plan-live-context has no reviewed planning context.",
      sourceProjectIntelligenceResult:
        "Source project intelligence result: missing, blocked, or still waiting for recovery.",
      affectedFilesSummary:
        "Affected files summary: unavailable while source context is blocked; files are not guessed by browsing local paths.",
      dependencyRiskContext:
        "Dependency risk context: unavailable until reviewed intelligence and change plan context are present.",
      redactionStatus:
        "Redaction status: blocked and redacted by default; suspected secrets are redacted.",
      hunkContextSummary:
        "Hunk/context summary: unavailable; raw diffs stay secondary and no generated diff is shown above the fold.",
      approvalRoute:
        "Approval route: /patch-apply-approval remains unavailable until preview context is reviewed.",
      rollbackNote:
        "Rollback note: no rollback action is needed because blocked preview does not apply patches.",
      blockedReasons: [
        "Source change plan live context missing",
        "Project intelligence result not reviewed",
        "Redaction status blocked",
      ],
      advancedPatchContextDetails:
        "Advanced patch context details: blocked patch context cannot write files, apply diffs, execute commands, open files, or send data to providers.",
    }),
  ];
}

export function buildPatchPreviewWorkbenchLiveContextBoundary(): PatchPreviewWorkbenchLiveContextBoundary {
  return {
    reviewedChangePlanLiveContextRequired: true,
    reviewedProjectIntelligenceRequired: true,
    previewAppliesPatchesAllowed: false,
    rawDiffsPrimaryAllowed: false,
    suspectedSecretsRedacted: true,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    rawFetchAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
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

export function summarizePatchPreviewWorkbenchLiveContextIntegration(
  model: Pick<PatchPreviewWorkbenchLiveContextIntegrationModel, "integrations">
): string {
  return `Patch preview workbench live context integration prepares ${model.integrations.length} patch context shape(s). Preview still does not apply patches, raw diffs stay secondary, and suspected secrets are redacted.`;
}

export function buildPatchPreviewWorkbenchLiveContextIntegrationModel(): PatchPreviewWorkbenchLiveContextIntegrationModel {
  const integrations = buildPatchPreviewWorkbenchLiveContextIntegrations();
  const model: PatchPreviewWorkbenchLiveContextIntegrationModel = {
    title: "Patch preview workbench live context integration",
    summary: "",
    integrations,
    boundary: buildPatchPreviewWorkbenchLiveContextBoundary(),
    patchContextLanguage: [...PATCH_PREVIEW_WORKBENCH_LIVE_CONTEXT_INTEGRATION_LANGUAGE],
    advancedDetails: [
      "Patch preview workbench live context integration",
      "Preview still does not apply patches",
      "Raw diffs stay secondary",
      "Suspected secrets are redacted",
      "Integration identity",
      "Source change plan live context",
      "Source project intelligence result",
      "Affected files summary",
      "Dependency risk context",
      "Redaction status",
      "Hunk/context summary",
      "Approval route",
      "Rollback note",
      "Blocked reasons",
      "Advanced patch context details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizePatchPreviewWorkbenchLiveContextIntegration(model) };
}
