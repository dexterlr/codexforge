import { buildRenderJobStatusPollingLiveBridgeModel } from "@/lib/codexforge/render-job-status-polling-live-bridge";
import type {
  RenderJobCancelHoldLiveBoundary,
  RenderJobCancelHoldLiveBoundaryModel,
  RenderJobCancelHoldLiveBoundaryPolicy,
} from "./render-job-cancel-hold-live-boundary-types";
import { buildRenderJobCancelHoldLiveBoundaryStableKey } from "./render-job-cancel-hold-live-boundary-types";

export const RENDER_JOB_CANCEL_HOLD_LIVE_BOUNDARY_LANGUAGE = [
  "Render job cancel hold live boundary",
  "Cancel and hold actions require explicit approval",
  "No render job is cancelled or held from this page",
  "Retry resume actions require separate review",
  "Required confirmation copy",
  "Audit handoff",
] as const;

export function buildRenderJobCancelHoldLiveBoundary(
  input: Omit<RenderJobCancelHoldLiveBoundary, "id"> & { idHint: string }
): RenderJobCancelHoldLiveBoundary {
  const { idHint, ...boundary } = input;
  return {
    id: buildRenderJobCancelHoldLiveBoundaryStableKey(
      "render-job-cancel-hold-live-boundary",
      idHint,
      input.boundaryIdentity
    ),
    ...boundary,
  };
}

export function buildRenderJobCancelHoldLiveBoundaries(): RenderJobCancelHoldLiveBoundary[] {
  const statusPolling = buildRenderJobStatusPollingLiveBridgeModel();

  return [
    buildRenderJobCancelHoldLiveBoundary({
      idHint: "reviewed-cancel-hold-request",
      boundaryIdentity:
        "Boundary identity: render-job-cancel-hold-live-boundary-reviewed-request, an explicit review surface before any future cancel or hold handoff.",
      sourceRenderStatusPollingDependency:
        `Source render status polling dependency: ${statusPolling.summary}`,
      activeJobSummary:
        "Active job summary: one reviewed job label, current status summary, artifact retention note, and no secret endpoint value.",
      cancelEligibility:
        "Cancel eligibility: eligible only after the job identity, current status, artifact retention rule, and explicit approval copy are reviewed.",
      holdEligibility:
        "Hold eligibility: eligible only when preventing the next step is safer than allowing the queued or running step to continue.",
      deniedActionScope:
        "Denied action scope: no render job is cancelled or held from this page, and retry resume actions require separate review.",
      requiredConfirmationCopy:
        "Required confirmation copy: I understand cancel and hold actions require explicit approval, no render job is cancelled or held from this page, artifacts are not deleted, and retry resume actions require separate review.",
      recoveryRoute:
        "Recovery route: /render-queue-recovery handles failed, stopped, held, unclear, or timed-out jobs before any future retry or resume request.",
      auditHandoff:
        "Audit handoff: record the reviewed job label, requested intent, operator confirmation, blocked reasons, and recovery route without mutating local logs from UI.",
      blockedReasons: [
        "Cancel and hold actions require explicit approval",
        "No render job is cancelled or held from this page",
        "Retry resume actions require separate review",
      ],
      advancedBoundaryDetails:
        "Advanced boundary details: this page does not cancel jobs, hold jobs, retry jobs, resume jobs, submit ComfyUI jobs, start render jobs, mutate queues, mutate local processes, mutate files, delete artifacts, browse local files, open local files, call arbitrary local endpoints from UI, create raw polling loops, call provider APIs, send prompts or files, spend tokens, execute commands, run tests, call appendEvent, call saveBrainGraph, mutate Brain graph, or auto-promote memory.",
    }),
    buildRenderJobCancelHoldLiveBoundary({
      idHint: "blocked-unreviewed-control",
      boundaryIdentity:
        "Boundary identity: render-job-cancel-hold-live-boundary-blocked-unreviewed-control.",
      sourceRenderStatusPollingDependency:
        "Source render status polling dependency: blocked until the status polling live bridge supplies a reviewed job status summary.",
      activeJobSummary:
        "Active job summary: blocked until a safe job identity, current status, and artifact retention note are present.",
      cancelEligibility:
        "Cancel eligibility: blocked when the operator has not reviewed the job identity, status, expected effect, and required confirmation copy.",
      holdEligibility:
        "Hold eligibility: blocked when the page cannot explain what next step would be prevented.",
      deniedActionScope:
        "Denied action scope: blocked requests cannot mutate queues, processes, files, artifacts, providers, audit logs, memory, or Brain graph.",
      requiredConfirmationCopy:
        "Required confirmation copy: blocked until the approval language is explicit, plain-English, and separate from retry or resume review.",
      recoveryRoute:
        "Recovery route: /render-queue-recovery remains the safe handoff when cancel or hold eligibility is unclear.",
      auditHandoff:
        "Audit handoff: blocked until review evidence can be passed to a future approved boundary without direct local mutation.",
      blockedReasons: [
        "Render status summary missing",
        "Required confirmation copy missing",
        "Audit handoff missing",
      ],
      advancedBoundaryDetails:
        "Advanced boundary details: blocked entries stay secondary and cannot cancel, hold, retry, resume, mutate queues, mutate files, mutate processes, or delete artifacts.",
    }),
  ];
}

export function buildRenderJobCancelHoldLiveBoundaryPolicy(): RenderJobCancelHoldLiveBoundaryPolicy {
  return {
    cancelAndHoldRequireExplicitApproval: true,
    cancelAllowedFromPage: false,
    holdAllowedFromPage: false,
    retryAllowedFromPage: false,
    resumeAllowedFromPage: false,
    renderJobSubmissionAllowedFromPage: false,
    renderJobMutationAllowedFromUi: false,
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
    arbitraryLocalEndpointCallsAllowedFromUi: false,
    rawComfyUiPollingLoopsAllowedFromUi: false,
    comfyUiJobSubmissionAllowedFromPage: false,
    comfyUiRequestSentFromPageAllowed: false,
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

export function summarizeRenderJobCancelHoldLiveBoundary(
  model: Pick<RenderJobCancelHoldLiveBoundaryModel, "boundaries">
): string {
  return `Render job cancel hold live boundary reviews ${model.boundaries.length} cancel or hold boundary record(s). Cancel and hold actions require explicit approval, no render job is cancelled or held from this page, and retry resume actions require separate review.`;
}

export function buildRenderJobCancelHoldLiveBoundaryModel(): RenderJobCancelHoldLiveBoundaryModel {
  const boundaries = buildRenderJobCancelHoldLiveBoundaries();
  const model: RenderJobCancelHoldLiveBoundaryModel = {
    title: "Render job cancel hold live boundary",
    summary: "",
    boundaries,
    policy: buildRenderJobCancelHoldLiveBoundaryPolicy(),
    boundaryLanguage: [...RENDER_JOB_CANCEL_HOLD_LIVE_BOUNDARY_LANGUAGE],
    advancedDetails: [
      "Render job cancel hold live boundary",
      "Cancel and hold actions require explicit approval",
      "No render job is cancelled or held from this page",
      "Retry resume actions require separate review",
      "Boundary identity",
      "Source render status polling dependency",
      "Active job summary",
      "Cancel eligibility",
      "Hold eligibility",
      "Denied action scope",
      "Required confirmation copy",
      "Recovery route",
      "Audit handoff",
      "Blocked reasons",
      "Advanced boundary details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeRenderJobCancelHoldLiveBoundary(model) };
}
