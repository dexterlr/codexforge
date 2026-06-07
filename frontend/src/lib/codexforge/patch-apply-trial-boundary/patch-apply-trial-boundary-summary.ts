import type {
  PatchApplyTrial,
  PatchApplyTrialBoundary,
  PatchApplyTrialBoundaryModel,
} from "./patch-apply-trial-boundary-types";
import { buildPatchApplyTrialBoundaryStableKey } from "./patch-apply-trial-boundary-types";

export const PATCH_APPLY_TRIAL_BOUNDARY_LANGUAGE = [
  "Patch apply trial boundary",
  "Patches are not applied from this page",
  "Approved local boundary is required before patch apply",
  "Secret values stay redacted",
  "Allowed apply scope",
  "Required confirmation copy",
] as const;

export function buildPatchApplyTrial(
  input: Omit<PatchApplyTrial, "id"> & { idHint: string }
): PatchApplyTrial {
  const { idHint, ...trial } = input;
  return {
    id: buildPatchApplyTrialBoundaryStableKey(
      "patch-apply-trial-boundary",
      idHint,
      input.status,
      input.riskSecretsStatus
    ),
    ...trial,
  };
}

export function buildPatchApplyTrials(): PatchApplyTrial[] {
  return [
    buildPatchApplyTrial({
      idHint: "reviewed-preview-ready",
      trialIdentity:
        "Patch apply trial identity: patch-apply-trial-reviewed-preview, a future local apply request reviewed before any mutation.",
      sourcePatchPreview:
        "Source patch preview: /patch-preview-workbench supplies reviewed hunk intent, affected files summary, risk notes, and operator-visible approval copy.",
      fileWritePatchTrialDependency:
        "File write patch trial dependency: /file-write-patch-trial must confirm the write and patch scope before this apply trial can be considered.",
      workspaceTrustDependency:
        "Workspace trust dependency: /workspace-trust-policy must confirm the canonical workspace and approved roots.",
      permissionEnforcementDependency:
        "Permission enforcement dependency: /jarvisd-runtime-enforcement and /jarvisd-permissions must show the future local boundary before patch apply.",
      allowedApplyScope:
        "Allowed apply scope: only the named patch identity, reviewed file targets, reviewed hunks, approved workspace root, and explicit confirmation copy.",
      deniedApplyScope:
        "Denied apply scope: arbitrary local browsing, unreviewed files, secret values, shell commands, tests, git commands, provider traffic, and direct Jarvisd capability execution from arbitrary UI.",
      riskSecretsStatus: "redacted",
      testPlanDependency:
        "Test plan dependency: /test-command-bridge and /test-execution-trial define validation intent, but tests are not run from this page.",
      requiredConfirmationCopy:
        "Required confirmation copy: I reviewed this patch preview, file write patch trial, workspace trust status, permissions, secrets redaction, and test plan for a future approved local apply boundary.",
      blockedReasons: [
        "Patches are not applied from this page",
        "Approved local boundary is required before patch apply",
        "Secret values stay redacted",
      ],
      status: "review required",
      advancedTrialDetails:
        "Advanced trial details: this trial boundary reviews contracts only and cannot apply patches, write files, rollback files, execute commands, run tests, run git, call providers, or execute Jarvisd capabilities.",
    }),
    buildPatchApplyTrial({
      idHint: "blocked-missing-boundary",
      trialIdentity:
        "Patch apply trial identity: patch-apply-trial-blocked-missing-boundary.",
      sourcePatchPreview:
        "Source patch preview: blocked until a reviewed patch preview and redacted risk summary are present.",
      fileWritePatchTrialDependency:
        "File write patch trial dependency: blocked until /file-write-patch-trial confirms allowed write scope.",
      workspaceTrustDependency:
        "Workspace trust dependency: blocked until canonical workspace trust is reviewed.",
      permissionEnforcementDependency:
        "Permission enforcement dependency: blocked until local permission enforcement is explicit.",
      allowedApplyScope:
        "Allowed apply scope: status review and next-route guidance only while the approved local boundary is missing.",
      deniedApplyScope:
        "Denied apply scope: patch apply, file writes, rollback, command execution, git commands, tests, secret display, and provider calls.",
      riskSecretsStatus: "blocked",
      testPlanDependency:
        "Test plan dependency: blocked until validation intent is reviewed through the test bridge.",
      requiredConfirmationCopy:
        "Required confirmation copy: stop here because approved local boundary is required before patch apply.",
      blockedReasons: [
        "Approved local boundary missing",
        "File write patch trial dependency missing",
        "Test plan dependency missing",
      ],
      status: "blocked",
      advancedTrialDetails:
        "Advanced trial details: blocked apply trials remain review-only and do not attempt hidden local action.",
    }),
  ];
}

export function buildPatchApplyTrialBoundary(): PatchApplyTrialBoundary {
  return {
    patchesAppliedFromPageAllowed: false,
    approvedLocalBoundaryRequired: true,
    secretValuesRedactedRequired: true,
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
    processKillRestartShutdownAllowedFromUi: false,
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
    packageInstallAllowedFromUi: false,
  };
}

export function summarizePatchApplyTrialBoundary(
  model: Pick<PatchApplyTrialBoundaryModel, "trials">
): string {
  return `Patch apply trial boundary prepares ${model.trials.length} future apply trial shape(s). Patches are not applied from this page, an approved local boundary is required before patch apply, and secret values stay redacted.`;
}

export function buildPatchApplyTrialBoundaryModel(): PatchApplyTrialBoundaryModel {
  const trials = buildPatchApplyTrials();
  const model: PatchApplyTrialBoundaryModel = {
    title: "Patch apply trial boundary",
    summary: "",
    trials,
    boundary: buildPatchApplyTrialBoundary(),
    trialLanguage: [...PATCH_APPLY_TRIAL_BOUNDARY_LANGUAGE],
    advancedDetails: [
      "Patch apply trial boundary",
      "Patches are not applied from this page",
      "Approved local boundary is required before patch apply",
      "Secret values stay redacted",
      "Patch apply trial identity",
      "Source patch preview",
      "File write patch trial dependency",
      "Workspace trust dependency",
      "Permission enforcement dependency",
      "Allowed apply scope",
      "Denied apply scope",
      "Risk/secrets status",
      "Test plan dependency",
      "Required confirmation copy",
      "Blocked reasons",
      "Advanced trial details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizePatchApplyTrialBoundary(model) };
}
