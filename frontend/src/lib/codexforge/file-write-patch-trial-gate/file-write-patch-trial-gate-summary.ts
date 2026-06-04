import type {
  FileWritePatchTrial,
  FileWritePatchTrialBoundary,
  FileWritePatchTrialGateModel,
} from "./file-write-patch-trial-gate-types";
import { buildFileWritePatchTrialGateStableKey } from "./file-write-patch-trial-gate-types";

export const FILE_WRITE_PATCH_TRIAL_GATE_LANGUAGE = [
  "File write patch trial gate",
  "Write and patch operations are not performed from this page",
  "Approved local boundary is required before mutation",
  "Delete operations require separate explicit review",
  "Allowed write scope",
  "Required confirmation copy",
] as const;

export function buildFileWritePatchTrial(
  input: Omit<FileWritePatchTrial, "id"> & { idHint: string }
): FileWritePatchTrial {
  const { idHint, ...trial } = input;
  return {
    id: buildFileWritePatchTrialGateStableKey(
      "file-write-patch-trial-gate",
      idHint,
      input.status
    ),
    ...trial,
  };
}

export function buildFileWritePatchTrials(): FileWritePatchTrial[] {
  return [
    buildFileWritePatchTrial({
      idHint: "reviewed-local-patch-trial",
      trialGateIdentity:
        "Trial gate identity: file-write-patch-trial-reviewed-local-patch, a review packet for a future approved local write or patch request.",
      dryRunDependency:
        "Dry-run dependency: /file-operation-dry-run must confirm expected effect summary, blocked reasons, and redacted risk posture first.",
      patchPreviewDependency:
        "Patch preview dependency: /patch-preview-workbench must provide reviewed hunk summary, affected files summary, and risk/secrets status.",
      approvalBoundaryDependency:
        "Approval boundary dependency: /patch-apply-approval must confirm explicit approval copy and local-only boundary before mutation.",
      allowedWriteScope:
        "Allowed write scope: named project-relative files from the reviewed patch preview, with no broad folders, no hidden files, and no secret values.",
      deniedWriteScope:
        "Denied write scope: arbitrary local browsing, unreviewed files, environment files, credential stores, delete requests, command execution, and provider sends.",
      expectedChangedFiles:
        "Expected changed files: reviewed file names and intended effect summaries only; no raw patch is applied from this page.",
      rollbackPlan:
        "Rollback plan: restore route, failed-operation handling, review inbox handoff, and stop condition must be ready before any future local boundary.",
      requiredConfirmationCopy:
        "Required confirmation copy: I approve the reviewed dry run, patch preview, allowed write scope, rollback plan, and approved local boundary for a future local write or patch request.",
      blockedReasons: [
        "Write and patch operations are not performed from this page",
        "Approved local boundary is required before mutation",
        "Delete operations require separate explicit review",
      ],
      status: "review-required",
      advancedTrialDetails:
        "Advanced trial details: this page does not write files, apply patches, delete files, execute commands, call Jarvisd directly, call providers, or grant permissions automatically.",
    }),
    buildFileWritePatchTrial({
      idHint: "missing-approval-blocked",
      trialGateIdentity:
        "Trial gate identity: file-write-patch-trial-missing-approval-blocked.",
      dryRunDependency:
        "Dry-run dependency: blocked until a dry run exists and is reviewed.",
      patchPreviewDependency:
        "Patch preview dependency: blocked until patch preview and risk review are complete.",
      approvalBoundaryDependency:
        "Approval boundary dependency: blocked because no approved local boundary is present.",
      allowedWriteScope:
        "Allowed write scope: no write scope is allowed while approval is missing.",
      deniedWriteScope:
        "Denied write scope: all file writes, patch apply attempts, delete operations, command execution, and direct daemon calls.",
      expectedChangedFiles:
        "Expected changed files: none accepted while the trial gate is blocked.",
      rollbackPlan:
        "Rollback plan: blocked until restore plan and recovery route are reviewed.",
      requiredConfirmationCopy:
        "Required confirmation copy: stop here; approved local boundary is required before mutation.",
      blockedReasons: [
        "Reviewed dry run missing",
        "Patch preview missing",
        "Approved local boundary missing",
      ],
      status: "blocked",
      advancedTrialDetails:
        "Advanced trial details: blocked trials remain copy-only and cannot trigger local writes, patch apply, delete, retry, or command execution.",
    }),
  ];
}

export function buildFileWritePatchTrialBoundary(): FileWritePatchTrialBoundary {
  return {
    writePatchPerformedFromPageAllowed: false,
    approvedLocalBoundaryRequired: true,
    deleteOperationsRequireSeparateExplicitReview: true,
    fileWriteAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
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

export function summarizeFileWritePatchTrialGate(
  model: Pick<FileWritePatchTrialGateModel, "trials">
): string {
  return `File write patch trial gate prepares ${model.trials.length} reviewed trial gate shape(s). Write and patch operations are not performed from this page, approved local boundary is required before mutation, and delete operations require separate explicit review.`;
}

export function buildFileWritePatchTrialGateModel(): FileWritePatchTrialGateModel {
  const trials = buildFileWritePatchTrials();
  const model: FileWritePatchTrialGateModel = {
    title: "File write patch trial gate",
    summary: "",
    trials,
    boundary: buildFileWritePatchTrialBoundary(),
    trialLanguage: [...FILE_WRITE_PATCH_TRIAL_GATE_LANGUAGE],
    advancedDetails: [
      "File write patch trial gate",
      "Write and patch operations are not performed from this page",
      "Approved local boundary is required before mutation",
      "Delete operations require separate explicit review",
      "Trial gate identity",
      "Dry-run dependency",
      "Patch preview dependency",
      "Approval boundary dependency",
      "Allowed write scope",
      "Denied write scope",
      "Expected changed files",
      "Rollback plan",
      "Required confirmation copy",
      "Blocked reasons",
      "Advanced trial details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizeFileWritePatchTrialGate(model) };
}
