import type {
  FileOperationDryRun,
  FileOperationDryRunBoundary,
  FileOperationDryRunBridgeModel,
} from "./file-operation-dry-run-bridge-types";
import { buildFileOperationDryRunBridgeStableKey } from "./file-operation-dry-run-bridge-types";

export const FILE_OPERATION_DRY_RUN_BRIDGE_LANGUAGE = [
  "File operation dry run bridge",
  "Dry run does not mutate files",
  "Arbitrary local browsing is not allowed",
  "Secret values stay redacted",
  "Expected effect summary",
  "Audit handoff",
] as const;

export function buildFileOperationDryRun(
  input: Omit<FileOperationDryRun, "id"> & { idHint: string }
): FileOperationDryRun {
  const { idHint, ...dryRun } = input;
  return {
    id: buildFileOperationDryRunBridgeStableKey(
      "file-operation-dry-run-bridge",
      idHint,
      input.operationType,
      input.status
    ),
    ...dryRun,
  };
}

export function buildFileOperationDryRuns(): FileOperationDryRun[] {
  return [
    buildFileOperationDryRun({
      idHint: "reviewed-write-patch-request",
      dryRunIdentity:
        "Dry-run identity: file-operation-dry-run-reviewed-write-patch-request, a model for a proposed file operation before mutation is possible.",
      sourceOperationRequest:
        "Source operation request: reviewed change-plan and patch-preview metadata only; no arbitrary local file content is read from UI.",
      workspaceTrustDependency:
        "Workspace trust dependency: /workspace-trust-policy must confirm the trusted workspace and approved roots first.",
      fileApprovalDependency:
        "File approval dependency: /local-file-approval must review the exact path scope before any future local boundary can proceed.",
      permissionEnforcementDependency:
        "Permission enforcement dependency: /jarvisd-runtime-enforcement must confirm matching file-operation permission without granting permissions automatically.",
      operationType: "write patch",
      affectedPathScopeSummary:
        "Affected path scope summary: named project-relative files from a reviewed preview only; arbitrary local browsing is not allowed.",
      expectedEffectSummary:
        "Expected effect summary: the dry run predicts changed-file intent, risk, and handoff notes, but dry run does not mutate files.",
      riskSecretsStatus:
        "Risk/secrets status: secret values stay redacted and suspected sensitive fields are summarized without raw values.",
      auditHandoff:
        "Audit handoff: record dry-run identity, operation type, scope summary, expected effect summary, and blocked reasons for /jarvisd-audit-ingestion without mutating audit logs.",
      blockedReasons: [
        "Dry run does not mutate files",
        "Arbitrary local browsing is not allowed",
        "Approved local boundary required before write or patch",
      ],
      status: "review-required",
      advancedDryRunDetails:
        "Advanced dry-run details: this bridge does not browse local files, read or open arbitrary files, write files, apply patches, delete files, execute commands, call Jarvisd directly, call providers, or display secret values.",
    }),
    buildFileOperationDryRun({
      idHint: "delete-request-blocked",
      dryRunIdentity:
        "Dry-run identity: file-operation-dry-run-delete-request-blocked.",
      sourceOperationRequest:
        "Source operation request: delete intent remains blocked and is shown as review copy only.",
      workspaceTrustDependency:
        "Workspace trust dependency: even trusted workspaces do not allow delete from this page.",
      fileApprovalDependency:
        "File approval dependency: delete is not performed here and requires a separate explicit review later.",
      permissionEnforcementDependency:
        "Permission enforcement dependency: no Jarvisd capability is executed from this UI.",
      operationType: "delete request",
      affectedPathScopeSummary:
        "Affected path scope summary: no delete path is accepted while the request is blocked.",
      expectedEffectSummary:
        "Expected effect summary: blocked delete request is retained as a warning; no file deletion is performed here.",
      riskSecretsStatus:
        "Risk/secrets status: secret values stay redacted, and no raw path browsing is allowed.",
      auditHandoff:
        "Audit handoff: blocked delete reason can be copied to review, but the UI does not mutate Jarvisd audit logs.",
      blockedReasons: [
        "Delete is not performed here",
        "Separate explicit review required",
        "Rollback evidence missing",
      ],
      status: "blocked",
      advancedDryRunDetails:
        "Advanced dry-run details: blocked delete modeling never retries, deletes, opens local files, writes files, or starts a daemon.",
    }),
  ];
}

export function buildFileOperationDryRunBoundary(): FileOperationDryRunBoundary {
  return {
    dryRunDoesNotMutateFiles: true,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    directFileReadAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    jarvisdDirectCallAllowedFromUi: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    rawFetchAllowedFromUi: false,
    daemonProcessCreationAllowedFromFrontend: false,
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

export function summarizeFileOperationDryRunBridge(
  model: Pick<FileOperationDryRunBridgeModel, "dryRuns">
): string {
  return `File operation dry run bridge prepares ${model.dryRuns.length} reviewed dry-run shape(s). Dry run does not mutate files, arbitrary local browsing is not allowed, and secret values stay redacted.`;
}

export function buildFileOperationDryRunBridgeModel(): FileOperationDryRunBridgeModel {
  const dryRuns = buildFileOperationDryRuns();
  const model: FileOperationDryRunBridgeModel = {
    title: "File operation dry run bridge",
    summary: "",
    dryRuns,
    boundary: buildFileOperationDryRunBoundary(),
    dryRunLanguage: [...FILE_OPERATION_DRY_RUN_BRIDGE_LANGUAGE],
    advancedDetails: [
      "File operation dry run bridge",
      "Dry run does not mutate files",
      "Arbitrary local browsing is not allowed",
      "Secret values stay redacted",
      "Dry-run identity",
      "Source operation request",
      "Workspace trust dependency",
      "File approval dependency",
      "Permission enforcement dependency",
      "Operation type",
      "Affected path scope summary",
      "Expected effect summary",
      "Risk/secrets status",
      "Audit handoff",
      "Blocked reasons",
      "Delete is not performed here",
      "Approved local boundary required",
      "Advanced dry-run details collapsed/secondary",
    ],
  };
  return { ...model, summary: summarizeFileOperationDryRunBridge(model) };
}
