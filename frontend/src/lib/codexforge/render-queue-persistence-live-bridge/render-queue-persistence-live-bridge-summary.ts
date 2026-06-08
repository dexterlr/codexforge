import { buildApprovedComfyUiSubmitTrialBridgeModel } from "@/lib/codexforge/approved-comfyui-submit-trial-bridge";
import { buildLocalRenderQueuePersistenceModel } from "@/lib/codexforge/local-render-queue-persistence";
import { buildLocalVideoDraftTrialResultCaptureModel } from "@/lib/codexforge/local-video-draft-trial-result-capture";
import type {
  RenderQueuePersistenceLiveBridge,
  RenderQueuePersistenceLiveBridgeBoundary,
  RenderQueuePersistenceLiveBridgeModel,
} from "./render-queue-persistence-live-bridge-types";
import { buildRenderQueuePersistenceLiveBridgeStableKey } from "./render-queue-persistence-live-bridge-types";

export const RENDER_QUEUE_PERSISTENCE_LIVE_BRIDGE_LANGUAGE = [
  "Render queue persistence live bridge",
  "Render queue persistence does not start jobs",
  "Retry cancel hold actions require separate approval",
  "Queue records are reviewed before promotion",
  "Render status",
  "Job status polling route",
] as const;

export function buildRenderQueuePersistenceLiveBridge(
  input: Omit<RenderQueuePersistenceLiveBridge, "id"> & { idHint: string }
): RenderQueuePersistenceLiveBridge {
  const { idHint, ...bridge } = input;
  return {
    id: buildRenderQueuePersistenceLiveBridgeStableKey(
      "render-queue-persistence-live-bridge",
      idHint,
      input.renderStatus
    ),
    ...bridge,
  };
}

export function buildRenderQueuePersistenceLiveBridges(): RenderQueuePersistenceLiveBridge[] {
  const submitBridge = buildApprovedComfyUiSubmitTrialBridgeModel();
  const videoDraftResult = buildLocalVideoDraftTrialResultCaptureModel();
  const queuePersistence = buildLocalRenderQueuePersistenceModel();

  return [
    buildRenderQueuePersistenceLiveBridge({
      idHint: "needs-review-queue-record",
      bridgeIdentity:
        "Bridge identity: render-queue-persistence-live-bridge-needs-review, a review surface for future approved render queue records and persistence state.",
      sourceSubmitTrialGenerationDependency:
        `Source submit trial / generation result dependency: ${submitBridge.summary} ${videoDraftResult.summary}`,
      queueRecordSummary:
        `Queue record summary: ${queuePersistence.summary} Queue records are reviewed before promotion and stay metadata-only from this page.`,
      renderStatus: "needs review",
      persistenceStatus:
        "Persistence status: review-only record prepared, no browser write, no prompt/file storage, no secret persistence, and no queue mutation from UI.",
      retentionPolicy:
        "Retention policy: queue records retain review labels, source dependency, status, and recovery handoff while artifacts remain retained and secrets excluded.",
      recoveryRoute:
        "Recovery route: /render-queue-recovery for blocked, failed, timed out, or questionable records before any future retry request.",
      jobStatusPollingRoute:
        "Job status polling route: /render-job-status for reviewed status visibility; this live bridge creates no raw polling loops.",
      blockedReasons: [
        "Render queue persistence does not start jobs",
        "Retry cancel hold actions require separate approval",
        "Queue records are reviewed before promotion",
      ],
      advancedQueueDetails:
        "Advanced queue details: this bridge does not start jobs, cancel jobs, hold jobs, retry jobs, mutate queues, submit ComfyUI jobs, call arbitrary local endpoints from UI, create raw polling loops, mutate files, mutate processes, call provider APIs, send prompts or files, spend tokens, execute commands, run tests, browse local files, write files, apply patches, delete files, call appendEvent, call saveBrainGraph, mutate Brain graph, or auto-promote memory.",
    }),
    buildRenderQueuePersistenceLiveBridge({
      idHint: "blocked-unreviewed-queue-record",
      bridgeIdentity:
        "Bridge identity: render-queue-persistence-live-bridge-blocked-unreviewed-record.",
      sourceSubmitTrialGenerationDependency:
        "Source submit trial / generation result dependency: blocked until approved submit trial and generation result dependencies are reviewed.",
      queueRecordSummary:
        "Queue record summary: blocked until source dependency, queue identity, status, persistence status, retention policy, and recovery route are present.",
      renderStatus: "blocked",
      persistenceStatus:
        "Persistence status: blocked when queue state would be written, persisted, or promoted without review.",
      retentionPolicy:
        "Retention policy: blocked until records exclude secrets, raw prompts, full local paths above the fold, and automatic prompt/file storage.",
      recoveryRoute:
        "Recovery route: /render-queue-recovery remains blocked until review guidance is clear.",
      jobStatusPollingRoute:
        "Job status polling route: /render-job-status remains a separate reviewed status surface and does not start a raw polling loop here.",
      blockedReasons: [
        "Source dependency missing",
        "Queue record summary missing",
        "Persistence status missing",
      ],
      advancedQueueDetails:
        "Advanced queue details: blocked records stay secondary and cannot start, cancel, hold, retry, persist, reorder, or mutate render jobs.",
    }),
  ];
}

export function buildRenderQueuePersistenceLiveBridgeBoundary(): RenderQueuePersistenceLiveBridgeBoundary {
  return {
    renderQueuePersistenceStartsJobs: false,
    retryCancelHoldRequireSeparateApproval: true,
    queueRecordsReviewedBeforePromotion: true,
    jobStartAllowedFromUi: false,
    jobCancelAllowedFromUi: false,
    jobHoldAllowedFromUi: false,
    jobRetryAllowedFromUi: false,
    rawPollingLoopsAllowedFromUi: false,
    queueMutationAllowedFromUi: false,
    comfyUiJobSubmissionAllowedFromPage: false,
    comfyUiRequestSentFromPageAllowed: false,
    fileMutationAllowedFromUi: false,
    localFileMutationAllowedFromUi: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    brainGraphMutationAllowed: false,
    memoryAutoPromotionAllowed: false,
    arbitraryLocalEndpointCallsAllowedFromUi: false,
    rawComfyUiPollingLoopsAllowedFromUi: false,
    localProcessMutationAllowedFromUi: false,
    processKillRestartShutdownAllowedFromUi: false,
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
    rawFetchAllowedFromUi: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    fileWriteAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    daemonProcessCreationAllowedFromFrontend: false,
    signingMaterialStorageAllowedInBrowser: false,
    sessionTokenStorageAllowedInBrowser: false,
    packageInstallAllowedFromUi: false,
  };
}

export function summarizeRenderQueuePersistenceLiveBridge(
  model: Pick<RenderQueuePersistenceLiveBridgeModel, "bridges">
): string {
  return `Render queue persistence live bridge reviews ${model.bridges.length} queue persistence bridge record(s). Render queue persistence does not start jobs, retry cancel hold actions require separate approval, and queue records are reviewed before promotion.`;
}

export function buildRenderQueuePersistenceLiveBridgeModel(): RenderQueuePersistenceLiveBridgeModel {
  const bridges = buildRenderQueuePersistenceLiveBridges();
  const model: RenderQueuePersistenceLiveBridgeModel = {
    title: "Render queue persistence live bridge",
    summary: "",
    bridges,
    boundary: buildRenderQueuePersistenceLiveBridgeBoundary(),
    bridgeLanguage: [...RENDER_QUEUE_PERSISTENCE_LIVE_BRIDGE_LANGUAGE],
    advancedDetails: [
      "Render queue persistence live bridge",
      "Render queue persistence does not start jobs",
      "Retry cancel hold actions require separate approval",
      "Queue records are reviewed before promotion",
      "Bridge identity",
      "Source submit trial / generation result dependency",
      "Queue record summary",
      "Render status",
      "render status: queued, running, passed, failed, blocked, cancelled, needs review",
      "Persistence status",
      "Retention policy",
      "Recovery route",
      "Job status polling route",
      "Blocked reasons",
      "Advanced queue details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeRenderQueuePersistenceLiveBridge(model) };
}
