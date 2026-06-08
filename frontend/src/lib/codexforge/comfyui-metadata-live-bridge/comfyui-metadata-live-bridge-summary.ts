import { buildComfyUiHealthProbeLiveBridgeModel } from "@/lib/codexforge/comfyui-health-probe-live-bridge";
import { buildRealLocalComfyUiMetadataReaderSummary } from "@/lib/codexforge/real-local-comfyui-metadata-reader";
import type {
  ComfyUiMetadataLiveBridge,
  ComfyUiMetadataLiveBridgeBoundary,
  ComfyUiMetadataLiveBridgeModel,
} from "./comfyui-metadata-live-bridge-types";
import { buildComfyUiMetadataLiveBridgeStableKey } from "./comfyui-metadata-live-bridge-types";

export const COMFY_UI_METADATA_LIVE_BRIDGE_LANGUAGE = [
  "ComfyUI metadata live bridge",
  "Metadata reads require approved local boundary",
  "No ComfyUI job is submitted from this page",
  "Local endpoints and secrets are not exposed",
  "Node model availability summary",
  "Workflow validator route",
] as const;

export function buildComfyUiMetadataLiveBridge(
  input: Omit<ComfyUiMetadataLiveBridge, "id"> & { idHint: string }
): ComfyUiMetadataLiveBridge {
  const { idHint, ...bridge } = input;
  return {
    id: buildComfyUiMetadataLiveBridgeStableKey(
      "comfyui-metadata-live-bridge",
      idHint,
      input.status
    ),
    ...bridge,
  };
}

export function buildComfyUiMetadataLiveBridges(): ComfyUiMetadataLiveBridge[] {
  const healthBridge = buildComfyUiHealthProbeLiveBridgeModel();
  const metadata = buildRealLocalComfyUiMetadataReaderSummary();

  return [
    buildComfyUiMetadataLiveBridge({
      idHint: "approved-boundary-metadata-review",
      status: "approved-boundary-required",
      bridgeIdentity:
        "Bridge identity: comfyui-metadata-live-bridge-approved-boundary, a review surface for future approved ComfyUI status, version, capability, node, and model summaries.",
      healthProbeDependency:
        `Health probe dependency: ${healthBridge.summary} Metadata review waits for the health bridge before any future approved local read.`,
      approvedLocalBoundaryDependency:
        "Approved local boundary dependency: Metadata reads require approved local boundary before any future local ComfyUI metadata contact.",
      metadataSourceSummary:
        `Metadata source summary: existing safe reader source is ${metadata.sourceLabel}; future live metadata is summarized, not shown as giant raw JSON above the fold.`,
      versionCapabilitySummary:
        `Version/capability summary: ${metadata.status}; ${metadata.modelCheckpointVisibilityStatus}`,
      nodeModelAvailabilitySummary:
        "Node model availability summary: available nodes, missing custom nodes, model visibility, and unknown capability risk are summarized in plain English.",
      timeoutPolicy:
        "Timeout policy: future reads use the approved local boundary timeout; this page creates no raw polling loop and no browser-side local endpoint call.",
      redactionStatus:
        "Redaction status: local endpoints and secrets are not exposed; suspected credentials, full paths, and endpoint secrets stay redacted.",
      workflowValidatorRoute:
        "Workflow validator route: /workflow-validator-live-bridge for prepared package validation before any submit trial review.",
      blockedReasons: [
        "Metadata reads require approved local boundary",
        "No ComfyUI job is submitted from this page",
        "Local endpoints and secrets are not exposed",
      ],
      advancedMetadataDetails:
        "Advanced metadata details: this bridge does not submit ComfyUI jobs, send ComfyUI requests from UI, call arbitrary local endpoints from UI, create raw polling loops, mutate local files or processes, kill or restart local processes, call provider APIs, send prompts or files, auto-spend tokens, execute commands, browse local files, write files, apply patches, mutate Brain graph, call appendEvent, call saveBrainGraph, or auto-promote memory.",
    }),
    buildComfyUiMetadataLiveBridge({
      idHint: "blocked-unreviewed-metadata-source",
      status: "blocked",
      bridgeIdentity:
        "Bridge identity: comfyui-metadata-live-bridge-blocked-unreviewed-source.",
      healthProbeDependency:
        "Health probe dependency: blocked until health readiness, approved local boundary, timeout policy, and redaction status are reviewed.",
      approvedLocalBoundaryDependency:
        "Approved local boundary dependency: blocked when a metadata read would bypass the approved local boundary.",
      metadataSourceSummary:
        "Metadata source summary: blocked if the source would expose raw local endpoint values, secrets, raw paths, or giant metadata JSON in the first view.",
      versionCapabilitySummary:
        "Version/capability summary: blocked until version and capability evidence can be reduced to compact, safe labels.",
      nodeModelAvailabilitySummary:
        "Node model availability summary: blocked until missing node/model risk can be summarized without browsing arbitrary local files.",
      timeoutPolicy:
        "Timeout policy: blocked until reviewed timeout and no raw polling loop posture are confirmed.",
      redactionStatus:
        "Redaction status: blocked if suspected secrets, endpoint values, full local paths, or credential-like strings would be displayed.",
      workflowValidatorRoute:
        "Workflow validator route: /workflow-validator-live-bridge remains the next review route after metadata is safely summarized.",
      blockedReasons: [
        "Approved local boundary missing",
        "Metadata source summary missing",
        "Redaction status missing",
      ],
      advancedMetadataDetails:
        "Advanced metadata details: blocked records remain secondary and cannot contact endpoints, submit jobs, browse files, mutate files, or mutate local processes.",
    }),
  ];
}

export function buildComfyUiMetadataLiveBridgeBoundary(): ComfyUiMetadataLiveBridgeBoundary {
  return {
    approvedLocalBoundaryRequired: true,
    metadataReadsAllowedWithoutApproval: false,
    comfyUiJobSubmissionAllowedFromPage: false,
    comfyUiRequestSentFromPageAllowed: false,
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

export function summarizeComfyUiMetadataLiveBridge(
  model: Pick<ComfyUiMetadataLiveBridgeModel, "bridges">
): string {
  return `ComfyUI metadata live bridge reviews ${model.bridges.length} metadata bridge record(s). Metadata reads require approved local boundary, no ComfyUI job is submitted from this page, and local endpoints and secrets are not exposed.`;
}

export function buildComfyUiMetadataLiveBridgeModel(): ComfyUiMetadataLiveBridgeModel {
  const bridges = buildComfyUiMetadataLiveBridges();
  const model: ComfyUiMetadataLiveBridgeModel = {
    title: "ComfyUI metadata live bridge",
    summary: "",
    bridges,
    boundary: buildComfyUiMetadataLiveBridgeBoundary(),
    bridgeLanguage: [...COMFY_UI_METADATA_LIVE_BRIDGE_LANGUAGE],
    advancedDetails: [
      "ComfyUI metadata live bridge",
      "Metadata reads require approved local boundary",
      "No ComfyUI job is submitted from this page",
      "Local endpoints and secrets are not exposed",
      "Bridge identity",
      "Health probe dependency",
      "Approved local boundary dependency",
      "Metadata source summary",
      "Version/capability summary",
      "Node model availability summary",
      "Timeout policy",
      "Redaction status",
      "Workflow validator route",
      "Blocked reasons",
      "Advanced metadata details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeComfyUiMetadataLiveBridge(model) };
}
