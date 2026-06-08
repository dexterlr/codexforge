import { buildApprovedComfyUiSubmitTrialBridgeModel } from "@/lib/codexforge/approved-comfyui-submit-trial-bridge";
import { buildRealLocalImageGenerationTrialSummary } from "@/lib/codexforge/real-local-image-generation-trial";
import { buildRealLocalOutputArtifactCaptureSummary } from "@/lib/codexforge/real-local-output-artifact-capture";
import { buildResultReviewInboxSummary } from "@/lib/codexforge/result-review-inbox";
import type {
  LocalImageGenerationTrialResultCapture,
  LocalImageGenerationTrialResultCaptureBoundary,
  LocalImageGenerationTrialResultCaptureModel,
} from "./local-image-generation-trial-result-capture-types";
import { buildLocalImageGenerationTrialResultCaptureStableKey } from "./local-image-generation-trial-result-capture-types";

export const LOCAL_IMAGE_GENERATION_TRIAL_RESULT_CAPTURE_LANGUAGE = [
  "Local image generation trial result capture",
  "Image results are reviewed before promotion",
  "Raw prompt and workflow details stay secondary",
  "Memory is not auto-promoted",
  "Artifact summary",
  "Review inbox handoff",
] as const;

export function buildLocalImageGenerationTrialResultCapture(
  input: Omit<LocalImageGenerationTrialResultCapture, "id"> & { idHint: string }
): LocalImageGenerationTrialResultCapture {
  const { idHint, ...result } = input;
  return {
    id: buildLocalImageGenerationTrialResultCaptureStableKey(
      "local-image-generation-trial-result-capture",
      idHint,
      input.generationStatus
    ),
    ...result,
  };
}

export function buildLocalImageGenerationTrialResultCaptures(): LocalImageGenerationTrialResultCapture[] {
  const submitBridge = buildApprovedComfyUiSubmitTrialBridgeModel();
  const imageTrial = buildRealLocalImageGenerationTrialSummary();
  const outputCapture = buildRealLocalOutputArtifactCaptureSummary();
  const reviewInbox = buildResultReviewInboxSummary();

  return [
    buildLocalImageGenerationTrialResultCapture({
      idHint: "needs-review-after-approved-local-trial",
      resultIdentity:
        "Result identity: local-image-generation-trial-result-capture-needs-review, a review record for future approved ComfyUI/local image generation outputs.",
      sourceSubmitTrial:
        `Source submit trial: ${submitBridge.summary}`,
      generationStatus: "needs review",
      promptWorkflowSummary:
        `Prompt/workflow summary: ${imageTrial.summary} Raw prompt and workflow details stay secondary before any reuse or promotion.`,
      artifactSummary:
        `Artifact summary: ${outputCapture.summary} Supplied artifact metadata is summarized; full local paths and raw payload details stay secondary.`,
      safetyRedactionStatus:
        "Safety/redaction status: suspected secrets, endpoint values, full local paths, and raw prompt/workflow payloads stay redacted or secondary.",
      reviewInboxHandoff:
        `Review inbox handoff: ${reviewInbox.title} receives the result before promotion, reuse, export, or memory review.`,
      artifactHandoffRoute:
        "Artifact handoff route: /local-output-capture for reviewed artifact capture metadata before export.",
      recoveryRoute:
        "Recovery route: /video-recovery for failed, blocked, timed out, or questionable outputs before retry.",
      blockedReasons: [
        "Image results are reviewed before promotion",
        "Raw prompt and workflow details stay secondary",
        "Memory is not auto-promoted",
      ],
      advancedResultDetails:
        "Advanced result details: this capture surface does not submit ComfyUI jobs, send ComfyUI requests, mutate files, call appendEvent, call saveBrainGraph, mutate Brain graph, auto-promote memory, call arbitrary local endpoints from UI, create raw polling loops, execute commands, run tests, call provider APIs, send prompts or files, spend tokens, browse local files, write files, apply patches, delete files, or mutate local processes.",
    }),
    buildLocalImageGenerationTrialResultCapture({
      idHint: "blocked-unreviewed-result",
      resultIdentity:
        "Result identity: local-image-generation-trial-result-capture-blocked-unreviewed-result.",
      sourceSubmitTrial:
        "Source submit trial: blocked until the approved ComfyUI submit trial bridge is reviewed and explicit approval evidence exists.",
      generationStatus: "blocked",
      promptWorkflowSummary:
        "Prompt/workflow summary: blocked when raw prompt/workflow details would be primary, unredacted, or auto-promoted.",
      artifactSummary:
        "Artifact summary: blocked until artifact type, source trial, checksum/status placeholder, review inbox handoff, recovery route, and retention note are safe.",
      safetyRedactionStatus:
        "Safety/redaction status: blocked if suspected secrets, full local paths, endpoint values, or raw payload details would be displayed.",
      reviewInboxHandoff:
        "Review inbox handoff: blocked until a human review route is selected before promotion or reuse.",
      artifactHandoffRoute:
        "Artifact handoff route: /local-output-capture remains blocked until supplied artifact metadata is reviewable.",
      recoveryRoute:
        "Recovery route: /video-recovery for blocked or timed out result review before retry.",
      blockedReasons: [
        "Review inbox handoff missing",
        "Artifact summary missing",
        "Safety/redaction status missing",
      ],
      advancedResultDetails:
        "Advanced result details: blocked records stay secondary and cannot submit jobs, mutate artifacts, delete files, mutate Brain graph, or promote memory.",
    }),
  ];
}

export function buildLocalImageGenerationTrialResultCaptureBoundary(): LocalImageGenerationTrialResultCaptureBoundary {
  return {
    imageResultsReviewedBeforePromotion: true,
    rawPromptWorkflowDetailsStaySecondary: true,
    memoryAutoPromotionAllowed: false,
    comfyUiJobSubmissionAllowedFromPage: false,
    comfyUiRequestSentFromPageAllowed: false,
    fileMutationAllowedFromUi: false,
    localFileMutationAllowedFromUi: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    brainGraphMutationAllowed: false,
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

export function summarizeLocalImageGenerationTrialResultCapture(
  model: Pick<LocalImageGenerationTrialResultCaptureModel, "results">
): string {
  return `Local image generation trial result capture reviews ${model.results.length} result capture record(s). Image results are reviewed before promotion, raw prompt and workflow details stay secondary, and memory is not auto-promoted.`;
}

export function buildLocalImageGenerationTrialResultCaptureModel(): LocalImageGenerationTrialResultCaptureModel {
  const results = buildLocalImageGenerationTrialResultCaptures();
  const model: LocalImageGenerationTrialResultCaptureModel = {
    title: "Local image generation trial result capture",
    summary: "",
    results,
    boundary: buildLocalImageGenerationTrialResultCaptureBoundary(),
    bridgeLanguage: [...LOCAL_IMAGE_GENERATION_TRIAL_RESULT_CAPTURE_LANGUAGE],
    advancedDetails: [
      "Local image generation trial result capture",
      "Image results are reviewed before promotion",
      "Raw prompt and workflow details stay secondary",
      "Memory is not auto-promoted",
      "Result identity",
      "Source submit trial",
      "generation status: passed, failed, blocked, timed out, needs review",
      "Prompt/workflow summary",
      "Artifact summary",
      "Safety/redaction status",
      "Review inbox handoff",
      "Artifact handoff route",
      "Recovery route",
      "Blocked reasons",
      "Advanced result details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeLocalImageGenerationTrialResultCapture(model) };
}
