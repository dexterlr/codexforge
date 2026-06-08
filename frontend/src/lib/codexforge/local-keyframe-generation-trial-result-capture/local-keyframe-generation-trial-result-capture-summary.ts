import { buildApprovedComfyUiSubmitTrialBridgeModel } from "@/lib/codexforge/approved-comfyui-submit-trial-bridge";
import { buildLocalImageGenerationTrialResultCaptureModel } from "@/lib/codexforge/local-image-generation-trial-result-capture";
import { buildRealLocalKeyframeGenerationTrialSummary } from "@/lib/codexforge/real-local-keyframe-generation-trial";
import { buildResultReviewInboxSummary } from "@/lib/codexforge/result-review-inbox";
import type {
  LocalKeyframeGenerationTrialResultCapture,
  LocalKeyframeGenerationTrialResultCaptureBoundary,
  LocalKeyframeGenerationTrialResultCaptureModel,
} from "./local-keyframe-generation-trial-result-capture-types";
import { buildLocalKeyframeGenerationTrialResultCaptureStableKey } from "./local-keyframe-generation-trial-result-capture-types";

export const LOCAL_KEYFRAME_GENERATION_TRIAL_RESULT_CAPTURE_LANGUAGE = [
  "Local keyframe generation trial result capture",
  "Keyframe results are reviewed before promotion",
  "Raw prompt and workflow details stay secondary",
  "Memory is not auto-promoted",
  "Keyframe artifact summary",
  "Local output artifact route",
] as const;

export function buildLocalKeyframeGenerationTrialResultCapture(
  input: Omit<LocalKeyframeGenerationTrialResultCapture, "id"> & { idHint: string }
): LocalKeyframeGenerationTrialResultCapture {
  const { idHint, ...result } = input;
  return {
    id: buildLocalKeyframeGenerationTrialResultCaptureStableKey(
      "local-keyframe-generation-trial-result-capture",
      idHint,
      input.generationStatus
    ),
    ...result,
  };
}

export function buildLocalKeyframeGenerationTrialResultCaptures(): LocalKeyframeGenerationTrialResultCapture[] {
  const submitBridge = buildApprovedComfyUiSubmitTrialBridgeModel();
  const imageResult = buildLocalImageGenerationTrialResultCaptureModel();
  const keyframeTrial = buildRealLocalKeyframeGenerationTrialSummary();
  const reviewInbox = buildResultReviewInboxSummary();

  return [
    buildLocalKeyframeGenerationTrialResultCapture({
      idHint: "needs-review-after-keyframe-trial",
      resultIdentity:
        "Result identity: local-keyframe-generation-trial-result-capture-needs-review, a review record for future approved local keyframe outputs.",
      sourceSubmitTrialImageDependency:
        `Source submit trial / image result dependency: ${submitBridge.summary} Image dependency: ${imageResult.summary}`,
      generationStatus: "needs review",
      promptWorkflowSummary:
        `Prompt/workflow summary: ${keyframeTrial.summary} Raw prompt and workflow details stay secondary before reuse, playback, export, or promotion.`,
      keyframeArtifactSummary:
        "Keyframe artifact summary: reviewed keyframe labels, scene/shot linkage, artifact type, capture status placeholder, and redaction posture without full local paths above the fold.",
      safetyRedactionStatus:
        "Safety/redaction status: suspected secrets, endpoint values, raw prompt/workflow payloads, and full local paths stay redacted or secondary.",
      reviewInboxHandoff:
        `Review inbox handoff: ${reviewInbox.title} receives keyframe results before promotion, reuse, video draft dependency, export, or memory review.`,
      localOutputArtifactRoute:
        "Local output artifact route: /local-output-artifact-capture for approved-root artifact capture review before thumbnail, playback, or export handoff.",
      recoveryRoute:
        "Recovery route: /video-recovery for failed, blocked, timed out, or questionable keyframes before any future retry request.",
      blockedReasons: [
        "Keyframe results are reviewed before promotion",
        "Raw prompt and workflow details stay secondary",
        "Memory is not auto-promoted",
      ],
      advancedResultDetails:
        "Advanced result details: this capture surface does not submit ComfyUI jobs, send ComfyUI requests, mutate files, call appendEvent, call saveBrainGraph, mutate Brain graph, auto-promote memory, call arbitrary local endpoints from UI, create raw polling loops, execute commands, run tests, call provider APIs, send prompts or files, spend tokens, browse local files, write files, apply patches, delete files, open local files, or mutate local processes.",
    }),
    buildLocalKeyframeGenerationTrialResultCapture({
      idHint: "blocked-missing-keyframe-review",
      resultIdentity:
        "Result identity: local-keyframe-generation-trial-result-capture-blocked-missing-review.",
      sourceSubmitTrialImageDependency:
        "Source submit trial / image result dependency: blocked until the approved submit bridge and source image result dependency are reviewed.",
      generationStatus: "blocked",
      promptWorkflowSummary:
        "Prompt/workflow summary: blocked when raw prompt/workflow details would be primary, unredacted, or auto-promoted.",
      keyframeArtifactSummary:
        "Keyframe artifact summary: blocked until keyframe labels, scene/shot linkage, artifact capture handoff, review inbox handoff, and recovery route are present.",
      safetyRedactionStatus:
        "Safety/redaction status: blocked if suspected secrets, endpoint values, raw payload details, or full local paths would be displayed.",
      reviewInboxHandoff:
        "Review inbox handoff: blocked until a human review lane is selected before video draft dependency or promotion.",
      localOutputArtifactRoute:
        "Local output artifact route: /local-output-artifact-capture remains blocked until supplied artifact metadata is reviewable.",
      recoveryRoute:
        "Recovery route: /video-recovery for blocked or timed out keyframe result review before retry.",
      blockedReasons: [
        "Source submit trial / image result dependency missing",
        "Keyframe artifact summary missing",
        "Safety/redaction status missing",
      ],
      advancedResultDetails:
        "Advanced result details: blocked records stay secondary and cannot submit jobs, mutate artifacts, delete files, mutate Brain graph, or promote memory.",
    }),
  ];
}

export function buildLocalKeyframeGenerationTrialResultCaptureBoundary(): LocalKeyframeGenerationTrialResultCaptureBoundary {
  return {
    keyframeResultsReviewedBeforePromotion: true,
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

export function summarizeLocalKeyframeGenerationTrialResultCapture(
  model: Pick<LocalKeyframeGenerationTrialResultCaptureModel, "results">
): string {
  return `Local keyframe generation trial result capture reviews ${model.results.length} result capture record(s). Keyframe results are reviewed before promotion, raw prompt and workflow details stay secondary, and memory is not auto-promoted.`;
}

export function buildLocalKeyframeGenerationTrialResultCaptureModel(): LocalKeyframeGenerationTrialResultCaptureModel {
  const results = buildLocalKeyframeGenerationTrialResultCaptures();
  const model: LocalKeyframeGenerationTrialResultCaptureModel = {
    title: "Local keyframe generation trial result capture",
    summary: "",
    results,
    boundary: buildLocalKeyframeGenerationTrialResultCaptureBoundary(),
    bridgeLanguage: [...LOCAL_KEYFRAME_GENERATION_TRIAL_RESULT_CAPTURE_LANGUAGE],
    advancedDetails: [
      "Local keyframe generation trial result capture",
      "Keyframe results are reviewed before promotion",
      "Raw prompt and workflow details stay secondary",
      "Memory is not auto-promoted",
      "Result identity",
      "Source submit trial / image result dependency",
      "generation status: passed, failed, blocked, timed out, needs review",
      "Prompt/workflow summary",
      "Keyframe artifact summary",
      "Safety/redaction status",
      "Review inbox handoff",
      "Local output artifact route",
      "Recovery route",
      "Blocked reasons",
      "Advanced result details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeLocalKeyframeGenerationTrialResultCapture(model) };
}
