import { buildArtifactThumbnailGeneratorModel } from "@/lib/codexforge/artifact-thumbnail-generator";
import { buildExportPackageBuilderModel } from "@/lib/codexforge/export-package-builder-mvp";
import { buildLocalImageGenerationTrialResultCaptureModel } from "@/lib/codexforge/local-image-generation-trial-result-capture";
import { buildLocalKeyframeGenerationTrialResultCaptureModel } from "@/lib/codexforge/local-keyframe-generation-trial-result-capture";
import { buildLocalVideoDraftTrialResultCaptureModel } from "@/lib/codexforge/local-video-draft-trial-result-capture";
import { buildRealLocalOutputArtifactCaptureSummary } from "@/lib/codexforge/real-local-output-artifact-capture";
import type {
  LocalOutputArtifactCaptureLiveBridge,
  LocalOutputArtifactCaptureLiveBridgeBoundary,
  LocalOutputArtifactCaptureLiveBridgeModel,
} from "./local-output-artifact-capture-live-bridge-types";
import { buildLocalOutputArtifactCaptureLiveBridgeStableKey } from "./local-output-artifact-capture-live-bridge-types";

export const LOCAL_OUTPUT_ARTIFACT_CAPTURE_LIVE_BRIDGE_LANGUAGE = [
  "Local output artifact capture live bridge",
  "Artifact capture uses approved output roots only",
  "Arbitrary local browsing is not allowed",
  "Capture does not mutate or delete artifacts",
  "Captured artifact summary",
  "Export package route",
] as const;

export function buildLocalOutputArtifactCaptureLiveBridge(
  input: Omit<LocalOutputArtifactCaptureLiveBridge, "id"> & { idHint: string }
): LocalOutputArtifactCaptureLiveBridge {
  const { idHint, ...bridge } = input;
  return {
    id: buildLocalOutputArtifactCaptureLiveBridgeStableKey(
      "local-output-artifact-capture-live-bridge",
      idHint,
      input.status
    ),
    ...bridge,
  };
}

export function buildLocalOutputArtifactCaptureLiveBridges(): LocalOutputArtifactCaptureLiveBridge[] {
  const imageResult = buildLocalImageGenerationTrialResultCaptureModel();
  const keyframeResult = buildLocalKeyframeGenerationTrialResultCaptureModel();
  const videoDraftResult = buildLocalVideoDraftTrialResultCaptureModel();
  const outputCapture = buildRealLocalOutputArtifactCaptureSummary();
  const thumbnails = buildArtifactThumbnailGeneratorModel();
  const exportPackage = buildExportPackageBuilderModel();

  return [
    buildLocalOutputArtifactCaptureLiveBridge({
      idHint: "approved-root-artifact-review",
      status: "needs review",
      bridgeIdentity:
        "Bridge identity: local-output-artifact-capture-live-bridge-approved-root-review, a review surface for future approved image, keyframe, and video output artifacts.",
      sourceGenerationResult:
        `Source generation result: ${imageResult.summary} ${keyframeResult.summary} ${videoDraftResult.summary}`,
      approvedOutputRootDependency:
        "Approved output root dependency: artifact capture uses approved output roots only; arbitrary local browsing is not allowed.",
      artifactTypeSummary:
        `Artifact type summary: ${outputCapture.record.artifactType} plus image, keyframe, video draft, thumbnail candidate, and export candidate labels supplied by reviewed result capture.`,
      capturedArtifactSummary:
        `Captured artifact summary: ${outputCapture.summary} Capture does not mutate or delete artifacts.`,
      excludedPathsSummary:
        "Excluded paths summary: unapproved folders, arbitrary local files, secrets, endpoint values, full local paths above the fold, unreviewed drafts, and provider payloads are excluded.",
      redactionSafetyStatus:
        "Redaction/safety status: suspected secrets, API keys, endpoint values, raw prompt/workflow payloads, and full local paths stay redacted or secondary.",
      thumbnailRoute:
        `Thumbnail route: /artifact-thumbnails for reviewed thumbnail readiness. ${thumbnails.summary}`,
      exportPackageRoute:
        `Export package route: /export-package-builder for reviewed local packaging handoff. ${exportPackage.summary}`,
      blockedReasons: [
        "Artifact capture uses approved output roots only",
        "Arbitrary local browsing is not allowed",
        "Capture does not mutate or delete artifacts",
      ],
      advancedArtifactDetails:
        "Advanced artifact details: this bridge does not browse arbitrary files, auto-open local files, mutate files, delete artifacts, display secrets, call provider APIs, send prompts or files, spend tokens, call arbitrary local endpoints from UI, create raw polling loops, submit ComfyUI jobs, execute commands, call appendEvent, call saveBrainGraph, mutate Brain graph, or auto-promote memory.",
    }),
    buildLocalOutputArtifactCaptureLiveBridge({
      idHint: "blocked-unapproved-output-root",
      status: "blocked",
      bridgeIdentity:
        "Bridge identity: local-output-artifact-capture-live-bridge-blocked-unapproved-root.",
      sourceGenerationResult:
        "Source generation result: blocked until image, keyframe, or video draft result capture supplies reviewed metadata.",
      approvedOutputRootDependency:
        "Approved output root dependency: blocked when the artifact source is not tied to an approved output root.",
      artifactTypeSummary:
        "Artifact type summary: blocked until artifact kind, source result, capture status, and retention note are reviewable.",
      capturedArtifactSummary:
        "Captured artifact summary: blocked until supplied artifact metadata can be summarized without exposing full local paths above the fold.",
      excludedPathsSummary:
        "Excluded paths summary: blocked until excluded paths and redaction posture are visible in plain English.",
      redactionSafetyStatus:
        "Redaction/safety status: blocked if secrets, API keys, endpoint values, raw payloads, or full local paths would be displayed.",
      thumbnailRoute:
        "Thumbnail route: /artifact-thumbnails remains blocked until a reviewed captured artifact summary exists.",
      exportPackageRoute:
        "Export package route: /export-package-builder remains blocked until artifact capture is reviewed.",
      blockedReasons: [
        "Approved output root dependency missing",
        "Captured artifact summary missing",
        "Excluded paths summary missing",
      ],
      advancedArtifactDetails:
        "Advanced artifact details: blocked records stay secondary and cannot browse folders, open files, mutate artifacts, delete files, upload assets, or promote memory.",
    }),
  ];
}

export function buildLocalOutputArtifactCaptureLiveBridgeBoundary(): LocalOutputArtifactCaptureLiveBridgeBoundary {
  return {
    approvedOutputRootsOnly: true,
    arbitraryLocalBrowsingAllowed: false,
    captureMutatesArtifacts: false,
    artifactDeletionAllowed: false,
    autoOpenLocalFilesAllowed: false,
    secretValuesDisplayedAllowed: false,
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
    secretsDisplayedAllowed: false,
    apiKeyLocalStorageAllowed: false,
    localStorageApiKeyStorageAllowed: false,
    processEnvDisplayAllowed: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    rawFetchAllowedFromUi: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    fileWriteAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    daemonProcessCreationAllowedFromFrontend: false,
    signingMaterialStorageAllowedInBrowser: false,
    sessionTokenStorageAllowedInBrowser: false,
    packageInstallAllowedFromUi: false,
    comfyUiJobSubmissionAllowedFromPage: false,
    comfyUiRequestSentFromPageAllowed: false,
  };
}

export function summarizeLocalOutputArtifactCaptureLiveBridge(
  model: Pick<LocalOutputArtifactCaptureLiveBridgeModel, "bridges">
): string {
  return `Local output artifact capture live bridge reviews ${model.bridges.length} artifact capture bridge record(s). Artifact capture uses approved output roots only, arbitrary local browsing is not allowed, and capture does not mutate or delete artifacts.`;
}

export function buildLocalOutputArtifactCaptureLiveBridgeModel(): LocalOutputArtifactCaptureLiveBridgeModel {
  const bridges = buildLocalOutputArtifactCaptureLiveBridges();
  const model: LocalOutputArtifactCaptureLiveBridgeModel = {
    title: "Local output artifact capture live bridge",
    summary: "",
    bridges,
    boundary: buildLocalOutputArtifactCaptureLiveBridgeBoundary(),
    bridgeLanguage: [...LOCAL_OUTPUT_ARTIFACT_CAPTURE_LIVE_BRIDGE_LANGUAGE],
    advancedDetails: [
      "Local output artifact capture live bridge",
      "Artifact capture uses approved output roots only",
      "Arbitrary local browsing is not allowed",
      "Capture does not mutate or delete artifacts",
      "Bridge identity",
      "Source generation result",
      "Approved output root dependency",
      "Artifact type summary",
      "Captured artifact summary",
      "Excluded paths summary",
      "Redaction/safety status",
      "Thumbnail route",
      "Export package route",
      "Blocked reasons",
      "Advanced artifact details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeLocalOutputArtifactCaptureLiveBridge(model) };
}
