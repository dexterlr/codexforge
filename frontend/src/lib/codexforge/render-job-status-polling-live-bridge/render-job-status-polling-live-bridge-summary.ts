import { buildRenderQueuePersistenceLiveBridgeModel } from "@/lib/codexforge/render-queue-persistence-live-bridge";
import type {
  RenderJobStatusPollingLiveBridge,
  RenderJobStatusPollingLiveBridgeBoundary,
  RenderJobStatusPollingLiveBridgeModel,
} from "./render-job-status-polling-live-bridge-types";
import { buildRenderJobStatusPollingLiveBridgeStableKey } from "./render-job-status-polling-live-bridge-types";

export const RENDER_JOB_STATUS_POLLING_LIVE_BRIDGE_LANGUAGE = [
  "Render job status polling live bridge",
  "Status polling requires approved local boundary",
  "Polling does not start cancel hold or retry jobs",
  "Uncontrolled polling loops are not created from this page",
  "Artifact readiness summary",
  "Cancel hold boundary route",
] as const;

export function buildRenderJobStatusPollingLiveBridge(
  input: Omit<RenderJobStatusPollingLiveBridge, "id"> & { idHint: string }
): RenderJobStatusPollingLiveBridge {
  const { idHint, ...bridge } = input;
  return {
    id: buildRenderJobStatusPollingLiveBridgeStableKey(
      "render-job-status-polling-live-bridge",
      idHint,
      input.renderStatusSummary
    ),
    ...bridge,
  };
}

export function buildRenderJobStatusPollingLiveBridges(): RenderJobStatusPollingLiveBridge[] {
  const queuePersistence = buildRenderQueuePersistenceLiveBridgeModel();

  return [
    buildRenderJobStatusPollingLiveBridge({
      idHint: "reviewed-local-job-status",
      bridgeIdentity:
        "Bridge identity: render-job-status-polling-live-bridge-reviewed-local-job-status, a future approved status view for one persisted render queue record.",
      sourceRenderQueuePersistenceDependency:
        `Source render queue persistence dependency: ${queuePersistence.summary}`,
      approvedLocalBoundaryDependency:
        "Approved local boundary dependency: Status polling requires approved local boundary before any live status check is allowed.",
      jobIdentitySummary:
        "Job identity summary: one reviewed local queue record, one human-readable job label, no secret endpoint value, and no full local path above the fold.",
      pollingPolicy:
        "Polling policy: bounded status review only; polling does not start, cancel, hold, or retry jobs.",
      timeoutPolicy:
        "Timeout policy: stale, missing, or unhealthy status responses become visible review states instead of an uncontrolled loop.",
      renderStatusSummary:
        "Render status summary: queued, running, complete, failed, held, blocked, unknown, or needs review can be shown as plain status only.",
      artifactReadinessSummary:
        "Artifact readiness summary: completed or failed outputs route to artifact capture review before preview, reuse, export, or retention decisions.",
      cancelHoldBoundaryRoute:
        "Cancel hold boundary route: /render-job-cancel-hold-boundary for explicit review before any future cancel or hold request.",
      blockedReasons: [
        "Status polling requires approved local boundary",
        "Polling does not start cancel hold or retry jobs",
        "Uncontrolled polling loops are not created from this page",
      ],
      advancedStatusDetails:
        "Advanced status details: this bridge does not submit ComfyUI jobs, start render jobs, cancel render jobs, hold render jobs, retry render jobs, create raw polling loops, call arbitrary local endpoints from UI, mutate local files, mutate processes, browse local files, open local files, delete artifacts, call provider APIs, send prompts or files, spend tokens, execute commands, run tests, call appendEvent, call saveBrainGraph, mutate Brain graph, or auto-promote memory.",
    }),
    buildRenderJobStatusPollingLiveBridge({
      idHint: "blocked-unapproved-status",
      bridgeIdentity:
        "Bridge identity: render-job-status-polling-live-bridge-blocked-unapproved-status.",
      sourceRenderQueuePersistenceDependency:
        "Source render queue persistence dependency: blocked until a reviewed render queue persistence record is selected.",
      approvedLocalBoundaryDependency:
        "Approved local boundary dependency: blocked because status polling requires approved local boundary and cannot be created from arbitrary UI.",
      jobIdentitySummary:
        "Job identity summary: blocked until a safe job label, reviewed queue record, and redacted endpoint posture are present.",
      pollingPolicy:
        "Polling policy: blocked when the page would create an uncontrolled polling loop or raw local request path.",
      timeoutPolicy:
        "Timeout policy: blocked until timeout handling is explicit, bounded, and reviewable.",
      renderStatusSummary:
        "Render status summary: blocked until status can be shown without starting, cancelling, holding, or retrying a job.",
      artifactReadinessSummary:
        "Artifact readiness summary: blocked until output readiness can route to approved artifact capture without local file browsing.",
      cancelHoldBoundaryRoute:
        "Cancel hold boundary route: /render-job-cancel-hold-boundary remains the separate approval review surface.",
      blockedReasons: [
        "Render queue persistence dependency missing",
        "Approved local boundary dependency missing",
        "Timeout policy missing",
      ],
      advancedStatusDetails:
        "Advanced status details: blocked records stay secondary and cannot start jobs, cancel jobs, hold jobs, retry jobs, call local endpoints, create loops, mutate queues, mutate files, mutate processes, or expose secrets.",
    }),
  ];
}

export function buildRenderJobStatusPollingLiveBridgeBoundary(): RenderJobStatusPollingLiveBridgeBoundary {
  return {
    statusPollingRequiresApprovedLocalBoundary: true,
    pollingStartsJobs: false,
    pollingCancelsJobs: false,
    pollingHoldsJobs: false,
    pollingRetriesJobs: false,
    uncontrolledPollingLoopsCreatedFromPage: false,
    renderJobSubmissionAllowedFromPage: false,
    comfyUiJobSubmissionAllowedFromPage: false,
    comfyUiRequestSentFromPageAllowed: false,
    arbitraryLocalEndpointCallsAllowedFromUi: false,
    rawComfyUiPollingLoopsAllowedFromUi: false,
    localProcessMutationAllowedFromUi: false,
    processKillRestartShutdownAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    localFileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    artifactDeletionAllowed: false,
    patchApplyAllowedFromUi: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    providerApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    promptOrFileAutoSendAllowed: false,
    autoSpendTokensAllowed: false,
    tokenSpendAllowedFromUi: false,
    autoRouteLiveProviderTrafficAllowed: false,
    providerRetryAllowedFromUi: false,
    apiKeyExportAllowed: false,
    secretExportAllowed: false,
    apiKeysDisplayedAllowed: false,
    secretValuesDisplayedAllowed: false,
    secretsDisplayedAllowed: false,
    apiKeyLocalStorageAllowed: false,
    localStorageApiKeyStorageAllowed: false,
    processEnvDisplayAllowed: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    daemonProcessCreationAllowedFromFrontend: false,
    signingMaterialStorageAllowedInBrowser: false,
    sessionTokenStorageAllowedInBrowser: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    brainGraphMutationAllowed: false,
    memoryAutoPromotionAllowed: false,
    packageInstallAllowedFromUi: false,
  };
}

export function summarizeRenderJobStatusPollingLiveBridge(
  model: Pick<RenderJobStatusPollingLiveBridgeModel, "bridges">
): string {
  return `Render job status polling live bridge reviews ${model.bridges.length} status bridge record(s). Status polling requires approved local boundary, polling does not start cancel hold or retry jobs, and uncontrolled polling loops are not created from this page.`;
}

export function buildRenderJobStatusPollingLiveBridgeModel(): RenderJobStatusPollingLiveBridgeModel {
  const bridges = buildRenderJobStatusPollingLiveBridges();
  const model: RenderJobStatusPollingLiveBridgeModel = {
    title: "Render job status polling live bridge",
    summary: "",
    bridges,
    boundary: buildRenderJobStatusPollingLiveBridgeBoundary(),
    bridgeLanguage: [...RENDER_JOB_STATUS_POLLING_LIVE_BRIDGE_LANGUAGE],
    advancedDetails: [
      "Render job status polling live bridge",
      "Status polling requires approved local boundary",
      "Polling does not start cancel hold or retry jobs",
      "Uncontrolled polling loops are not created from this page",
      "Bridge identity",
      "Source render queue persistence dependency",
      "Approved local boundary dependency",
      "Job identity summary",
      "Polling policy",
      "Timeout policy",
      "Render status summary",
      "Artifact readiness summary",
      "Cancel hold boundary route",
      "Blocked reasons",
      "Advanced status details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeRenderJobStatusPollingLiveBridge(model) };
}
