import type {
  FileOperationRecovery,
  FileOperationRecoveryBoundary,
  FileOperationRecoveryFlowModel,
} from "./file-operation-recovery-flow-types";
import { buildFileOperationRecoveryFlowStableKey } from "./file-operation-recovery-flow-types";

export const FILE_OPERATION_RECOVERY_FLOW_LANGUAGE = [
  "File operation recovery flow",
  "Retry is never automatic",
  "Recovery does not mutate files",
  "Rollback requires explicit approved boundary",
  "Safe recovery checklist",
  "Blocked retry reasons",
] as const;

export function buildFileOperationRecovery(
  input: Omit<FileOperationRecovery, "id"> & { idHint: string }
): FileOperationRecovery {
  const { idHint, ...recovery } = input;
  return {
    id: buildFileOperationRecoveryFlowStableKey(
      "file-operation-recovery-flow",
      idHint,
      input.failureCategory
    ),
    ...recovery,
  };
}

export function buildFileOperationRecoveries(): FileOperationRecovery[] {
  return [
    buildFileOperationRecovery({
      idHint: "failed-validation-recovery",
      recoveryIdentity:
        "Recovery identity: file-operation-recovery-failed-validation, a triage packet for a failed future file operation.",
      sourceResult:
        "Source result: /file-operation-result provides failed operation status, affected files summary, validation summary, and rollback status.",
      failureCategory: "validation failed",
      affectedScope:
        "Affected scope: reviewed project-relative file summary only; recovery does not browse or open local files from UI.",
      safeRecoveryChecklist: [
        "Keep the failed result visible for review.",
        "Confirm affected files summary and risk/secrets follow-up.",
        "Review rollback status before any retry discussion.",
        "Route human review to /review-inbox before promotion.",
      ],
      rollbackRecommendation:
        "Rollback recommendation: rollback requires explicit approved boundary and a reviewed restore plan before any local mutation.",
      retryEligibility:
        "Retry eligibility: retry may be discussed only after dry run, approval boundary, rollback plan, and validation evidence are reviewed.",
      blockedRetryReasons: [
        "Retry is never automatic",
        "Rollback status needs review",
        "Approved local boundary missing",
      ],
      nextRecommendedRoute:
        "Next recommended route: /review-inbox for disposition, then /file-write-patch-trial only if a human creates a new reviewed trial.",
      auditHandoff:
        "Audit handoff: preserve recovery identity, source result, failure category, affected scope, checklist, and blocked retry reasons without mutating audit logs.",
      advancedRecoveryDetails:
        "Advanced recovery details: this flow does not retry operations, mutate files, execute commands, delete files, call Jarvisd directly, call providers, mutate Brain graph, or auto-promote memory.",
    }),
    buildFileOperationRecovery({
      idHint: "scope-mismatch-blocked",
      recoveryIdentity:
        "Recovery identity: file-operation-recovery-scope-mismatch-blocked.",
      sourceResult:
        "Source result: blocked result indicates the affected scope does not match the approved local boundary.",
      failureCategory: "scope mismatch",
      affectedScope:
        "Affected scope: unapproved scope remains denied and no file is opened, written, deleted, or retried.",
      safeRecoveryChecklist: [
        "Stop the retry path.",
        "Return to file approval for narrower scope review.",
        "Confirm secret redaction before any future trial.",
        "Keep audit handoff copy read-only.",
      ],
      rollbackRecommendation:
        "Rollback recommendation: no rollback action runs here; rollback requires explicit approved boundary if later needed.",
      retryEligibility:
        "Retry eligibility: not eligible until workspace trust, file approval, and permission enforcement all match the requested scope.",
      blockedRetryReasons: [
        "Scope mismatch",
        "File approval missing",
        "Retry is never automatic",
      ],
      nextRecommendedRoute:
        "Next recommended route: /local-file-approval for scope review before any new dry run.",
      auditHandoff:
        "Audit handoff: copy blocked recovery context to /jarvisd-audit-ingestion as review text only.",
      advancedRecoveryDetails:
        "Advanced recovery details: blocked recovery remains triage-only and cannot trigger local actions, retries, deletes, or shell commands.",
    }),
  ];
}

export function buildFileOperationRecoveryBoundary(): FileOperationRecoveryBoundary {
  return {
    retryAutomaticAllowed: false,
    recoveryMutationAllowedFromUi: false,
    rollbackRequiresExplicitApprovedBoundary: true,
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
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    brainGraphMutationAllowed: false,
    memoryAutoPromotionAllowed: false,
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

export function summarizeFileOperationRecoveryFlow(
  model: Pick<FileOperationRecoveryFlowModel, "recoveries">
): string {
  return `File operation recovery flow prepares ${model.recoveries.length} recovery triage shape(s). Retry is never automatic, recovery does not mutate files, and rollback requires explicit approved boundary.`;
}

export function buildFileOperationRecoveryFlowModel(): FileOperationRecoveryFlowModel {
  const recoveries = buildFileOperationRecoveries();
  const model: FileOperationRecoveryFlowModel = {
    title: "File operation recovery flow",
    summary: "",
    recoveries,
    boundary: buildFileOperationRecoveryBoundary(),
    recoveryLanguage: [...FILE_OPERATION_RECOVERY_FLOW_LANGUAGE],
    advancedDetails: [
      "File operation recovery flow",
      "Retry is never automatic",
      "Recovery does not mutate files",
      "Rollback requires explicit approved boundary",
      "Recovery identity",
      "Source result",
      "Failure category",
      "Affected scope",
      "Safe recovery checklist",
      "Rollback recommendation",
      "Retry eligibility",
      "Blocked retry reasons",
      "Next recommended route",
      "Audit handoff",
      "Advanced recovery details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizeFileOperationRecoveryFlow(model) };
}
