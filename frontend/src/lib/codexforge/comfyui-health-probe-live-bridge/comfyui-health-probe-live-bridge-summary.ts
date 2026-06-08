import { buildRealLocalComfyUiHealthProbeSummary } from "@/lib/codexforge/real-local-comfyui-health-probe";
import { buildRealLocalComfyUiMetadataReaderSummary } from "@/lib/codexforge/real-local-comfyui-metadata-reader";
import type {
  ComfyUiHealthProbeLiveBridge,
  ComfyUiHealthProbeLiveBridgeBoundary,
  ComfyUiHealthProbeLiveBridgeModel,
} from "./comfyui-health-probe-live-bridge-types";
import { buildComfyUiHealthProbeLiveBridgeStableKey } from "./comfyui-health-probe-live-bridge-types";

export const COMFY_UI_HEALTH_PROBE_LIVE_BRIDGE_LANGUAGE = [
  "ComfyUI health probe live bridge",
  "ComfyUI health checks require approved local boundary",
  "No ComfyUI job is submitted from this page",
  "Local endpoints and secrets are not exposed",
  "Health probe status",
  "Metadata bridge route",
] as const;

export function buildComfyUiHealthProbeLiveBridge(
  input: Omit<ComfyUiHealthProbeLiveBridge, "id"> & { idHint: string }
): ComfyUiHealthProbeLiveBridge {
  const { idHint, ...bridge } = input;
  return {
    id: buildComfyUiHealthProbeLiveBridgeStableKey(
      "comfyui-health-probe-live-bridge",
      idHint,
      input.status
    ),
    ...bridge,
  };
}

export function buildComfyUiHealthProbeLiveBridges(): ComfyUiHealthProbeLiveBridge[] {
  const health = buildRealLocalComfyUiHealthProbeSummary();
  const metadata = buildRealLocalComfyUiMetadataReaderSummary();

  return [
    buildComfyUiHealthProbeLiveBridge({
      idHint: "approved-local-boundary-health-bridge",
      status: "approved-boundary-required",
      bridgeIdentity:
        "Bridge identity: comfyui-health-probe-live-bridge-approved-boundary, a readiness bridge from real local ComfyUI health evidence to metadata review.",
      localEndpointSummary:
        "Local endpoint summary: loopback-only health readiness is summarized by policy label; local endpoints and secrets are not exposed in this page.",
      approvedLocalBoundaryDependency:
        "Approved local boundary dependency: ComfyUI health checks require approved local boundary before any future health endpoint contact.",
      healthProbeStatus:
        `Health probe status: ${health.status}; existing health probe says ${health.summary}`,
      versionCapabilitySummary:
        `Version/capability summary: ${metadata.status} metadata status from ${metadata.sourceLabel}; ${metadata.modelCheckpointVisibilityStatus}`,
      timeoutPolicy:
        "Timeout policy: use the existing approved-boundary timeout and retry notes; this page creates no raw polling loop and no browser-side health fetch.",
      redactionStatus:
        "Redaction status: local endpoints and secrets are not exposed; version and capability details are compact summaries only.",
      recoveryRoute:
        "Recovery route: /comfyui-real-health for health readiness review before any future approved local probe.",
      metadataBridgeRoute:
        "Metadata bridge route: /comfyui-metadata-reader for safe capability summary before workflow package validation.",
      blockedReasons: [
        "ComfyUI health checks require approved local boundary",
        "No ComfyUI job is submitted from this page",
        "Local endpoints and secrets are not exposed",
      ],
      advancedHealthDetails:
        "Advanced health details: this bridge does not submit ComfyUI jobs, call arbitrary local endpoints from UI, create raw ComfyUI polling loops, mutate local files or processes, kill or restart local processes, call provider APIs, send prompts or files, auto-spend tokens, execute commands, read local files, write files, apply patches, mutate Brain graph, call appendEvent, call saveBrainGraph, or auto-promote memory.",
    }),
    buildComfyUiHealthProbeLiveBridge({
      idHint: "blocked-unapproved-local-boundary",
      status: "blocked",
      bridgeIdentity:
        "Bridge identity: comfyui-health-probe-live-bridge-blocked-unapproved-boundary.",
      localEndpointSummary:
        "Local endpoint summary: blocked; local endpoint values are not displayed and arbitrary local endpoint input is not accepted.",
      approvedLocalBoundaryDependency:
        "Approved local boundary dependency: blocked until an approved local boundary exists for the health check.",
      healthProbeStatus:
        "Health probe status: blocked until local boundary approval, timeout policy, and redaction status are reviewed.",
      versionCapabilitySummary:
        "Version/capability summary: blocked until metadata can be summarized safely without raw local endpoint details, secrets, or giant JSON above the fold.",
      timeoutPolicy:
        "Timeout policy: blocked until reviewed timeout and no raw polling loop policy are confirmed.",
      redactionStatus:
        "Redaction status: blocked if local endpoints, secrets, raw paths, or raw health payloads would be exposed.",
      recoveryRoute:
        "Recovery route: /comfyui-real-health to review the existing real local health probe readiness.",
      metadataBridgeRoute:
        "Metadata bridge route: /comfyui-metadata-reader remains the safe summary route after health readiness is reviewed.",
      blockedReasons: [
        "Approved local boundary missing",
        "Timeout policy missing",
        "Redaction status missing",
      ],
      advancedHealthDetails:
        "Advanced health details: blocked bridge records stay secondary and cannot call local endpoints, submit jobs, mutate queues, read files, or mutate local processes.",
    }),
  ];
}

export function buildComfyUiHealthProbeLiveBridgeBoundary(): ComfyUiHealthProbeLiveBridgeBoundary {
  return {
    approvedLocalBoundaryRequired: true,
    comfyUiJobSubmissionAllowedFromPage: false,
    arbitraryLocalEndpointCallsAllowedFromUi: false,
    rawComfyUiPollingLoopsAllowedFromUi: false,
    localEndpointDisplayAllowed: false,
    secretDisplayAllowed: false,
    localFileMutationAllowedFromUi: false,
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
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
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

export function summarizeComfyUiHealthProbeLiveBridge(
  model: Pick<ComfyUiHealthProbeLiveBridgeModel, "bridges">
): string {
  return `ComfyUI health probe live bridge reviews ${model.bridges.length} local health bridge record(s). ComfyUI health checks require approved local boundary, no ComfyUI job is submitted from this page, and local endpoints and secrets are not exposed.`;
}

export function buildComfyUiHealthProbeLiveBridgeModel(): ComfyUiHealthProbeLiveBridgeModel {
  const bridges = buildComfyUiHealthProbeLiveBridges();
  const model: ComfyUiHealthProbeLiveBridgeModel = {
    title: "ComfyUI health probe live bridge",
    summary: "",
    bridges,
    boundary: buildComfyUiHealthProbeLiveBridgeBoundary(),
    bridgeLanguage: [...COMFY_UI_HEALTH_PROBE_LIVE_BRIDGE_LANGUAGE],
    advancedDetails: [
      "ComfyUI health probe live bridge",
      "ComfyUI health checks require approved local boundary",
      "No ComfyUI job is submitted from this page",
      "Local endpoints and secrets are not exposed",
      "Bridge identity",
      "Local endpoint summary",
      "Approved local boundary dependency",
      "Health probe status",
      "Version/capability summary",
      "Timeout policy",
      "Redaction status",
      "Recovery route",
      "Metadata bridge route",
      "Blocked reasons",
      "Advanced health details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeComfyUiHealthProbeLiveBridge(model) };
}
