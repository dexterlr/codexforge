import type {
  FileOperationResult,
  FileOperationResultCaptureBoundary,
  FileOperationResultCaptureModel,
} from "./file-operation-result-capture-types";
import { buildFileOperationResultCaptureStableKey } from "./file-operation-result-capture-types";

export const FILE_OPERATION_RESULT_CAPTURE_LANGUAGE = [
  "File operation result capture",
  "Results are reviewed before promotion",
  "Failed operations are retained for recovery",
  "Memory is not auto-promoted",
  "Affected files summary",
  "Review inbox handoff",
] as const;

export function buildFileOperationResult(
  input: Omit<FileOperationResult, "id"> & { idHint: string }
): FileOperationResult {
  const { idHint, ...result } = input;
  return {
    id: buildFileOperationResultCaptureStableKey(
      "file-operation-result-capture",
      idHint,
      input.operationStatus
    ),
    ...result,
  };
}

export function buildFileOperationResults(): FileOperationResult[] {
  return [
    buildFileOperationResult({
      idHint: "needs-review-result",
      resultIdentity:
        "Result identity: file-operation-result-needs-review, captured from a future approved file operation outcome.",
      sourceTrialGate:
        "Source trial gate: /file-write-patch-trial supplies reviewed dry-run dependency, patch preview dependency, approval boundary dependency, and rollback plan.",
      operationStatus: "needs review",
      affectedFilesSummary:
        "Affected files summary: reviewed file names and outcome notes are summarized without reading arbitrary local files from UI.",
      validationSummary:
        "Validation summary: supplied validation evidence is reviewed as context; tests and commands are not run from this page.",
      riskSecretsFollowUp:
        "Risk/secrets follow-up: secret values stay redacted and unresolved risk remains visible before promotion.",
      rollbackStatus:
        "Rollback status: rollback state is reviewed separately before any result can move forward.",
      reviewInboxHandoff:
        "Review inbox handoff: /review-inbox receives the result summary, risk follow-up, rollback status, and blocked reasons before promotion.",
      recoveryRoute:
        "Recovery route: /file-operation-recovery handles failed or blocked operation triage without retrying automatically.",
      blockedReasons: [
        "Results are reviewed before promotion",
        "Memory is not auto-promoted",
        "No direct graph mutation from UI",
      ],
      advancedResultDetails:
        "Advanced result details: this surface does not mutate files, call appendEvent, call saveBrainGraph, mutate Brain graph, auto-promote memory, execute commands, call providers, or hide failed outcomes.",
    }),
    buildFileOperationResult({
      idHint: "failed-retained-result",
      resultIdentity:
        "Result identity: file-operation-result-failed-retained-for-recovery.",
      sourceTrialGate:
        "Source trial gate: failed result remains linked to the reviewed dry run, trial gate, approval copy, and rollback plan.",
      operationStatus: "failed",
      affectedFilesSummary:
        "Affected files summary: failed or partial operation impact is kept for human review.",
      validationSummary:
        "Validation summary: failed validation is retained and not converted into success copy.",
      riskSecretsFollowUp:
        "Risk/secrets follow-up: suspected secrets remain redacted and follow-up stays open.",
      rollbackStatus:
        "Rollback status: failed operations are retained for recovery until explicit review decides the next route.",
      reviewInboxHandoff:
        "Review inbox handoff: route failed result to /review-inbox for disposition after recovery triage.",
      recoveryRoute:
        "Recovery route: /file-operation-recovery is the next safe route for failed operation triage.",
      blockedReasons: [
        "Failed operations are retained for recovery",
        "Promotion requires review",
        "Rollback status needs review",
      ],
      advancedResultDetails:
        "Advanced result details: failed results are not deleted, retried automatically, auto-promoted, or silently mutated into graph state.",
    }),
  ];
}

export function buildFileOperationResultCaptureBoundary(): FileOperationResultCaptureBoundary {
  return {
    reviewBeforePromotionRequired: true,
    failedOperationsRetainedForRecovery: true,
    memoryAutoPromotionAllowed: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    brainGraphMutationAllowed: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    rawFetchAllowedFromUi: false,
    daemonProcessCreationAllowedFromFrontend: false,
    jarvisdDirectCallAllowedFromUi: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    auditLogMutationAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    secretValuesDisplayedAllowed: false,
    secretsExportedAllowed: false,
    signingMaterialStorageAllowedInBrowser: false,
    sessionTokenStorageAllowedInBrowser: false,
    apiKeyLocalStorageAllowed: false,
    processEnvDisplayAllowed: false,
    packageInstallAllowedFromUi: false,
  };
}

export function summarizeFileOperationResultCapture(
  model: Pick<FileOperationResultCaptureModel, "results">
): string {
  return `File operation result capture prepares ${model.results.length} reviewed result shape(s). Results are reviewed before promotion, failed operations are retained for recovery, and memory is not auto-promoted.`;
}

export function buildFileOperationResultCaptureModel(): FileOperationResultCaptureModel {
  const results = buildFileOperationResults();
  const model: FileOperationResultCaptureModel = {
    title: "File operation result capture",
    summary: "",
    results,
    boundary: buildFileOperationResultCaptureBoundary(),
    resultLanguage: [...FILE_OPERATION_RESULT_CAPTURE_LANGUAGE],
    advancedDetails: [
      "File operation result capture",
      "Results are reviewed before promotion",
      "Failed operations are retained for recovery",
      "Memory is not auto-promoted",
      "Result identity",
      "Source trial gate",
      "Operation status",
      "Affected files summary",
      "Validation summary",
      "Risk/secrets follow-up",
      "Rollback status",
      "Review inbox handoff",
      "Recovery route",
      "Blocked reasons",
      "Advanced result details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizeFileOperationResultCapture(model) };
}
