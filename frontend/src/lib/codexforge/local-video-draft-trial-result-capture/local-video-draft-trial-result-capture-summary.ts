import { buildDraftSideBySidePlaybackReviewModel } from "@/lib/codexforge/draft-side-by-side-playback-review";
import { buildLocalKeyframeGenerationTrialResultCaptureModel } from "@/lib/codexforge/local-keyframe-generation-trial-result-capture";
import { buildLocalVideoPreviewPlayerModel } from "@/lib/codexforge/local-video-preview-player";
import { buildRealLocalVideoDraftTrialSummary } from "@/lib/codexforge/real-local-video-draft-trial";
import { buildResultReviewInboxSummary } from "@/lib/codexforge/result-review-inbox";
import type {
  LocalVideoDraftTrialResultCapture,
  LocalVideoDraftTrialResultCaptureBoundary,
  LocalVideoDraftTrialResultCaptureModel,
} from "./local-video-draft-trial-result-capture-types";
import { buildLocalVideoDraftTrialResultCaptureStableKey } from "./local-video-draft-trial-result-capture-types";

export const LOCAL_VIDEO_DRAFT_TRIAL_RESULT_CAPTURE_LANGUAGE = [
  "Local video draft trial result capture",
  "Video draft results are reviewed before promotion",
  "Raw prompt and workflow details stay secondary",
  "Playback review does not auto-open arbitrary files",
  "Draft video artifact summary",
  "Playback review route",
] as const;

export function buildLocalVideoDraftTrialResultCapture(
  input: Omit<LocalVideoDraftTrialResultCapture, "id"> & { idHint: string }
): LocalVideoDraftTrialResultCapture {
  const { idHint, ...result } = input;
  return {
    id: buildLocalVideoDraftTrialResultCaptureStableKey(
      "local-video-draft-trial-result-capture",
      idHint,
      input.generationStatus
    ),
    ...result,
  };
}

export function buildLocalVideoDraftTrialResultCaptures(): LocalVideoDraftTrialResultCapture[] {
  const keyframeResult = buildLocalKeyframeGenerationTrialResultCaptureModel();
  const videoTrial = buildRealLocalVideoDraftTrialSummary();
  const previewPlayer = buildLocalVideoPreviewPlayerModel();
  const playbackReview = buildDraftSideBySidePlaybackReviewModel();
  const reviewInbox = buildResultReviewInboxSummary();

  return [
    buildLocalVideoDraftTrialResultCapture({
      idHint: "needs-review-after-video-draft-trial",
      resultIdentity:
        "Result identity: local-video-draft-trial-result-capture-needs-review, a review record for future approved local video draft outputs.",
      sourceKeyframeImageDependency:
        `Source keyframe/image result dependency: ${keyframeResult.summary}`,
      generationStatus: "needs review",
      promptWorkflowSummary:
        `Prompt/workflow summary: ${videoTrial.summary} Raw prompt and workflow details stay secondary before playback, compare, export, retry, or promotion.`,
      draftVideoArtifactSummary:
        `Draft video artifact summary: reviewed draft label, source dependency, capture status placeholder, and playback readiness. ${previewPlayer.summary}`,
      playbackReviewRoute:
        `Playback review route: /draft-playback-review for human comparison. ${playbackReview.summary} Playback review does not auto-open arbitrary files.`,
      safetyRedactionStatus:
        "Safety/redaction status: suspected secrets, endpoint values, raw prompt/workflow payloads, and full local paths stay redacted or secondary.",
      reviewInboxHandoff:
        `Review inbox handoff: ${reviewInbox.title} receives video draft results before promotion, comparison, export, retry, or memory review.`,
      recoveryRoute:
        "Recovery route: /video-recovery for failed, blocked, timed out, or questionable video drafts before any future retry request.",
      blockedReasons: [
        "Video draft results are reviewed before promotion",
        "Raw prompt and workflow details stay secondary",
        "Playback review does not auto-open arbitrary files",
      ],
      advancedResultDetails:
        "Advanced result details: this capture surface does not submit ComfyUI jobs, send ComfyUI requests, mutate files, auto-open local files, call appendEvent, call saveBrainGraph, mutate Brain graph, auto-promote memory, call arbitrary local endpoints from UI, create raw polling loops, execute commands, run tests, call provider APIs, send prompts or files, spend tokens, browse local files, write files, apply patches, delete files, or mutate local processes.",
    }),
    buildLocalVideoDraftTrialResultCapture({
      idHint: "blocked-missing-video-draft-review",
      resultIdentity:
        "Result identity: local-video-draft-trial-result-capture-blocked-missing-review.",
      sourceKeyframeImageDependency:
        "Source keyframe/image result dependency: blocked until keyframe/image dependencies are reviewed and safe.",
      generationStatus: "blocked",
      promptWorkflowSummary:
        "Prompt/workflow summary: blocked when raw prompt/workflow details would be primary, unredacted, or auto-promoted.",
      draftVideoArtifactSummary:
        "Draft video artifact summary: blocked until draft label, source dependency, capture status, playback route, review inbox handoff, and recovery route are present.",
      playbackReviewRoute:
        "Playback review route: /draft-playback-review remains blocked until the captured draft can be reviewed without opening arbitrary files.",
      safetyRedactionStatus:
        "Safety/redaction status: blocked if suspected secrets, endpoint values, raw payload details, or full local paths would be displayed.",
      reviewInboxHandoff:
        "Review inbox handoff: blocked until a human review lane is selected before comparison, export, retry, or promotion.",
      recoveryRoute:
        "Recovery route: /video-recovery for blocked or timed out video draft result review before retry.",
      blockedReasons: [
        "Source keyframe/image result dependency missing",
        "Draft video artifact summary missing",
        "Playback review route missing",
      ],
      advancedResultDetails:
        "Advanced result details: blocked records stay secondary and cannot submit jobs, mutate artifacts, delete files, mutate Brain graph, or promote memory.",
    }),
  ];
}

export function buildLocalVideoDraftTrialResultCaptureBoundary(): LocalVideoDraftTrialResultCaptureBoundary {
  return {
    videoDraftResultsReviewedBeforePromotion: true,
    rawPromptWorkflowDetailsStaySecondary: true,
    playbackReviewAutoOpenArbitraryFilesAllowed: false,
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

export function summarizeLocalVideoDraftTrialResultCapture(
  model: Pick<LocalVideoDraftTrialResultCaptureModel, "results">
): string {
  return `Local video draft trial result capture reviews ${model.results.length} result capture record(s). Video draft results are reviewed before promotion, raw prompt and workflow details stay secondary, and playback review does not auto-open arbitrary files.`;
}

export function buildLocalVideoDraftTrialResultCaptureModel(): LocalVideoDraftTrialResultCaptureModel {
  const results = buildLocalVideoDraftTrialResultCaptures();
  const model: LocalVideoDraftTrialResultCaptureModel = {
    title: "Local video draft trial result capture",
    summary: "",
    results,
    boundary: buildLocalVideoDraftTrialResultCaptureBoundary(),
    bridgeLanguage: [...LOCAL_VIDEO_DRAFT_TRIAL_RESULT_CAPTURE_LANGUAGE],
    advancedDetails: [
      "Local video draft trial result capture",
      "Video draft results are reviewed before promotion",
      "Raw prompt and workflow details stay secondary",
      "Playback review does not auto-open arbitrary files",
      "Result identity",
      "Source keyframe/image result dependency",
      "generation status: passed, failed, blocked, timed out, needs review",
      "Prompt/workflow summary",
      "Draft video artifact summary",
      "Playback review route",
      "Safety/redaction status",
      "Review inbox handoff",
      "Recovery route",
      "Blocked reasons",
      "Advanced result details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeLocalVideoDraftTrialResultCapture(model) };
}
