import type {
  PatchApplyResultCapture,
  PatchApplyResultCaptureBoundary,
  PatchApplyResultCaptureModel,
} from "./patch-apply-result-capture-types";
import { buildPatchApplyResultCaptureStableKey } from "./patch-apply-result-capture-types";

export const PATCH_APPLY_RESULT_CAPTURE_LANGUAGE = [
  "Patch apply result capture",
  "Results are reviewed before promotion",
  "Failed patch applies are retained for recovery",
  "Memory is not auto-promoted",
  "Hunk result summary",
  "Review inbox handoff",
] as const;

export function buildPatchApplyResultCapture(
  input: Omit<PatchApplyResultCapture, "id"> & { idHint: string }
): PatchApplyResultCapture {
  const { idHint, ...result } = input;
  return {
    id: buildPatchApplyResultCaptureStableKey(
      "patch-apply-result-capture",
      idHint,
      input.applyStatus
    ),
    ...result,
  };
}

export function buildPatchApplyResultCaptures(): PatchApplyResultCapture[] {
  return [
    buildPatchApplyResultCapture({
      idHint: "needs-review-apply",
      resultIdentity:
        "Result identity: patch-apply-result-needs-review, captured after a future approved local apply boundary reports back.",
      sourcePatchApplyTrial:
        "Source patch apply trial: /patch-apply-trial supplies patch apply trial identity, preview dependency, file write patch trial dependency, workspace trust, permission enforcement, allowed scope, denied scope, risk status, test plan dependency, and confirmation copy.",
      applyStatus: "needs review",
      affectedFilesSummary:
        "Affected files summary: reviewed file names and counts are summarized; this page does not browse, open, write, delete, or mutate files.",
      hunkResultSummary:
        "Hunk result summary: accepted, rejected, partial, or blocked hunk outcomes are summarized for review without showing giant raw patches above the fold.",
      validationTestSummary:
        "Validation/test summary: validation notes are captured as reviewed evidence; tests are not run from this page.",
      riskSecretsFollowUp:
        "Risk/secrets follow-up: secret values stay redacted and suspected risk items remain visible until reviewed.",
      rollbackTrialRoute:
        "Rollback trial route: /patch-rollback-trial reviews recovery options before any rollback boundary is considered.",
      reviewInboxHandoff:
        "Review inbox handoff: /review-inbox receives apply status, affected files summary, hunk result summary, validation/test summary, risk follow-up, rollback route, and blocked reasons.",
      blockedReasons: [
        "Results are reviewed before promotion",
        "Memory is not auto-promoted",
        "Rollback review is separate",
      ],
      advancedResultDetails:
        "Advanced result details: this capture surface does not apply patches, mutate files, rollback files, call appendEvent, call saveBrainGraph, mutate Brain graph, execute commands, run tests, run git, call providers, or execute Jarvisd capabilities.",
    }),
    buildPatchApplyResultCapture({
      idHint: "failed-retained-apply",
      resultIdentity:
        "Result identity: patch-apply-result-failed-retained-for-recovery.",
      sourcePatchApplyTrial:
        "Source patch apply trial: failed result remains linked to /patch-apply-trial confirmation copy and allowed apply scope.",
      applyStatus: "failed",
      affectedFilesSummary:
        "Affected files summary: failed or partial file effects stay summarized for recovery review and are not hidden.",
      hunkResultSummary:
        "Hunk result summary: failed hunks remain retained for recovery review.",
      validationTestSummary:
        "Validation/test summary: failed validation evidence stays visible as review text only.",
      riskSecretsFollowUp:
        "Risk/secrets follow-up: redacted risk notes remain visible and are not sent to providers automatically.",
      rollbackTrialRoute:
        "Rollback trial route: /patch-rollback-trial is the next review route; rollback is not performed here.",
      reviewInboxHandoff:
        "Review inbox handoff: failed patch applies are retained for recovery and routed to /review-inbox before promotion.",
      blockedReasons: [
        "Failed patch applies are retained for recovery",
        "Promotion requires review",
        "Approved local boundary required",
      ],
      advancedResultDetails:
        "Advanced result details: failed results are not deleted, auto-promoted, or silently converted into success.",
    }),
  ];
}

export function buildPatchApplyResultCaptureBoundary(): PatchApplyResultCaptureBoundary {
  return {
    resultsReviewedBeforePromotionRequired: true,
    failedPatchAppliesRetainedForRecovery: true,
    memoryAutoPromotionAllowed: false,
    patchApplyAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    rollbackAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    gitCommandExecutionAllowedFromUi: false,
    runCommandCallAllowedFromUi: false,
    brokerExecutionCallAllowedFromUi: false,
    localExecutorApiCallAllowedFromUi: false,
    jarvisdDirectCallAllowedFromUi: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    rawFetchAllowedFromUi: false,
    daemonProcessCreationAllowedFromFrontend: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    brainGraphMutationAllowed: false,
    providerApiCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    secretValuesDisplayedAllowed: false,
    signingMaterialStorageAllowedInBrowser: false,
    sessionTokenStorageAllowedInBrowser: false,
    apiKeyLocalStorageAllowed: false,
    processEnvDisplayAllowed: false,
    processKillRestartShutdownAllowedFromUi: false,
    packageInstallAllowedFromUi: false,
  };
}

export function summarizePatchApplyResultCapture(
  model: Pick<PatchApplyResultCaptureModel, "results">
): string {
  return `Patch apply result capture prepares ${model.results.length} apply result review shape(s). Results are reviewed before promotion, failed patch applies are retained for recovery, and memory is not auto-promoted.`;
}

export function buildPatchApplyResultCaptureModel(): PatchApplyResultCaptureModel {
  const results = buildPatchApplyResultCaptures();
  const model: PatchApplyResultCaptureModel = {
    title: "Patch apply result capture",
    summary: "",
    results,
    boundary: buildPatchApplyResultCaptureBoundary(),
    resultLanguage: [...PATCH_APPLY_RESULT_CAPTURE_LANGUAGE],
    advancedDetails: [
      "Patch apply result capture",
      "Results are reviewed before promotion",
      "Failed patch applies are retained for recovery",
      "Memory is not auto-promoted",
      "Result identity",
      "Source patch apply trial",
      "Apply status: passed, failed, blocked, needs review",
      "Affected files summary",
      "Hunk result summary",
      "Validation/test summary",
      "Risk/secrets follow-up",
      "Rollback trial route",
      "Review inbox handoff",
      "Blocked reasons",
      "Advanced result details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizePatchApplyResultCapture(model) };
}
