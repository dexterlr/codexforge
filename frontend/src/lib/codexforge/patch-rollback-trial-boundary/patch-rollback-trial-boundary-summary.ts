import type {
  PatchRollbackTrial,
  PatchRollbackTrialBoundary,
  PatchRollbackTrialBoundaryModel,
} from "./patch-rollback-trial-boundary-types";
import { buildPatchRollbackTrialBoundaryStableKey } from "./patch-rollback-trial-boundary-types";

export const PATCH_ROLLBACK_TRIAL_BOUNDARY_LANGUAGE = [
  "Patch rollback trial boundary",
  "Rollback is not performed from this page",
  "Approved local boundary is required before rollback",
  "Rollback does not delete unrelated files",
  "Recovery checklist",
  "Audit handoff",
] as const;

export function buildPatchRollbackTrial(
  input: Omit<PatchRollbackTrial, "id"> & { idHint: string }
): PatchRollbackTrial {
  const { idHint, ...trial } = input;
  return {
    id: buildPatchRollbackTrialBoundaryStableKey(
      "patch-rollback-trial-boundary",
      idHint,
      input.status
    ),
    ...trial,
  };
}

export function buildPatchRollbackTrials(): PatchRollbackTrial[] {
  return [
    buildPatchRollbackTrial({
      idHint: "failed-apply-review",
      rollbackTrialIdentity:
        "Rollback trial identity: patch-rollback-trial-failed-apply-review, a future rollback request reviewed after a failed patch apply result.",
      sourcePatchApplyResult:
        "Source patch apply result: /patch-apply-result provides result identity, source patch apply trial, apply status, affected files summary, hunk result summary, validation/test summary, risk follow-up, review inbox handoff, and blocked reasons.",
      rollbackReason:
        "Rollback reason: failed or partial patch apply needs recovery review before any local rollback boundary is considered.",
      affectedFilesSummary:
        "Affected files summary: only reviewed file targets from the patch apply result may be considered; this page does not browse, open, write, delete, or mutate files.",
      allowedRollbackScope:
        "Allowed rollback scope: the named failed patch apply result, reviewed affected file summary, reviewed rollback reason, and explicit confirmation copy.",
      deniedRollbackScope:
        "Denied rollback scope: unrelated files, arbitrary local browsing, secret values, file deletion, shell commands, git commands, tests, provider calls, and direct Jarvisd capability execution from arbitrary UI.",
      recoveryChecklist: [
        "Confirm source patch apply result and failed hunk summary.",
        "Review affected files summary without opening arbitrary local files.",
        "Confirm rollback reason and approved local boundary.",
        "Send audit handoff for review before any future local rollback.",
      ],
      requiredConfirmationCopy:
        "Required confirmation copy: I reviewed this failed patch apply result, affected files summary, rollback reason, recovery checklist, and approved local boundary before rollback.",
      auditHandoff:
        "Audit handoff: preserve rollback trial identity, source result, rollback reason, scope, checklist, confirmation copy, and blocked reasons as review text only.",
      blockedReasons: [
        "Rollback is not performed from this page",
        "Approved local boundary is required before rollback",
        "Rollback does not delete unrelated files",
      ],
      status: "review required",
      advancedRollbackDetails:
        "Advanced rollback details: this page does not rollback files, mutate files, delete files, execute commands, run tests, run git, apply patches, call providers, mutate audit logs, mutate Brain graph, or execute Jarvisd capabilities.",
    }),
    buildPatchRollbackTrial({
      idHint: "blocked-missing-result",
      rollbackTrialIdentity:
        "Rollback trial identity: patch-rollback-trial-blocked-missing-result.",
      sourcePatchApplyResult:
        "Source patch apply result: blocked until /patch-apply-result supplies reviewed outcome context.",
      rollbackReason:
        "Rollback reason: blocked because no reviewed failed or reverted patch apply result is present.",
      affectedFilesSummary:
        "Affected files summary: unavailable; arbitrary local file inspection is blocked.",
      allowedRollbackScope:
        "Allowed rollback scope: blocked-state explanation and next-route guidance only.",
      deniedRollbackScope:
        "Denied rollback scope: rollback, file mutation, file deletion, command execution, tests, git commands, and direct daemon calls.",
      recoveryChecklist: [
        "Stop the rollback path.",
        "Review patch apply result capture first.",
        "Confirm affected files summary before any rollback discussion.",
      ],
      requiredConfirmationCopy:
        "Required confirmation copy: stop here because approved local boundary is required before rollback.",
      auditHandoff:
        "Audit handoff: record the blocked state as review copy only; audit logs are not mutated by this UI.",
      blockedReasons: [
        "Source patch apply result missing",
        "Approved local boundary missing",
        "Affected files summary missing",
      ],
      status: "blocked",
      advancedRollbackDetails:
        "Advanced rollback details: blocked rollback trials remain review-only and cannot trigger hidden recovery action.",
    }),
  ];
}

export function buildPatchRollbackTrialBoundary(): PatchRollbackTrialBoundary {
  return {
    rollbackPerformedFromPageAllowed: false,
    approvedLocalBoundaryRequired: true,
    unrelatedFileDeletionAllowed: false,
    patchApplyAllowedFromUi: false,
    rollbackAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
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
    memoryAutoPromotionAllowed: false,
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

export function summarizePatchRollbackTrialBoundary(
  model: Pick<PatchRollbackTrialBoundaryModel, "trials">
): string {
  return `Patch rollback trial boundary prepares ${model.trials.length} rollback review shape(s). Rollback is not performed from this page, an approved local boundary is required before rollback, and rollback does not delete unrelated files.`;
}

export function buildPatchRollbackTrialBoundaryModel(): PatchRollbackTrialBoundaryModel {
  const trials = buildPatchRollbackTrials();
  const model: PatchRollbackTrialBoundaryModel = {
    title: "Patch rollback trial boundary",
    summary: "",
    trials,
    boundary: buildPatchRollbackTrialBoundary(),
    rollbackLanguage: [...PATCH_ROLLBACK_TRIAL_BOUNDARY_LANGUAGE],
    advancedDetails: [
      "Patch rollback trial boundary",
      "Rollback is not performed from this page",
      "Approved local boundary is required before rollback",
      "Rollback does not delete unrelated files",
      "Rollback trial identity",
      "Source patch apply result",
      "Rollback reason",
      "Affected files summary",
      "Allowed rollback scope",
      "Denied rollback scope",
      "Recovery checklist",
      "Required confirmation copy",
      "Audit handoff",
      "Blocked reasons",
      "Advanced rollback details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizePatchRollbackTrialBoundary(model) };
}
