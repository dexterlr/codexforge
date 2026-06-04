import type {
  JarvisdFileReadPreviewBridge,
  JarvisdFileReadPreviewBridgeBoundary,
  JarvisdFileReadPreviewBridgeModel,
} from "./jarvisd-file-read-preview-bridge-types";
import { buildJarvisdFileReadPreviewBridgeStableKey } from "./jarvisd-file-read-preview-bridge-types";

export const JARVISD_FILE_READ_PREVIEW_BRIDGE_LANGUAGE = [
  "Jarvisd file read preview bridge",
  "File previews require approved scope",
  "Arbitrary local browsing is not allowed",
  "Secret values stay redacted",
  "Secret values are never displayed",
  "Allowed path scope summary",
  "Audit handoff",
  "File bridges are reviewed before use",
  "Approved local boundary required",
] as const;

export function buildJarvisdFileReadPreviewBridge(
  input: Omit<JarvisdFileReadPreviewBridge, "id"> & { idHint: string }
): JarvisdFileReadPreviewBridge {
  const { idHint, ...preview } = input;
  return {
    id: buildJarvisdFileReadPreviewBridgeStableKey(
      "jarvisd-file-read-preview-bridge",
      idHint,
      input.previewResultStatus
    ),
    ...preview,
  };
}

export function buildJarvisdFileReadPreviewBridges(): JarvisdFileReadPreviewBridge[] {
  return [
    buildJarvisdFileReadPreviewBridge({
      idHint: "approved-scope-redacted-preview",
      previewBridgeIdentity:
        "Preview bridge identity: jarvisd-file-read-preview-bridge-approved-scope, a future handoff shape for reviewed file previews.",
      sourceWorkspaceTrust:
        "Source workspace trust: the workspace must already be trusted by /workspace-trust-policy before any preview request can be considered.",
      fileOperationApprovalDependency:
        "File operation approval dependency: /local-file-approval must review the exact path scope before any future read preview can cross the local boundary.",
      permissionRuntimeEnforcementDependency:
        "Permission runtime enforcement dependency: /jarvisd-runtime-enforcement confirms the session has a matching file-preview permission before use.",
      signedRequestDependency:
        "Signed request dependency: /jarvisd-signed-request must authorize the future request; signing secrets are never displayed or stored in browser storage.",
      allowedPathScopeSummary:
        "Allowed path scope summary: only reviewed project-relative paths inside the trusted workspace, with file previews require approved scope.",
      deniedPathScopeSummary:
        "Denied path scope summary: parent folders, home folders, credential stores, environment files, system folders, unrelated repositories, and arbitrary paths stay blocked.",
      redactionStatus:
        "Redaction status: secret values stay redacted before review and suspected sensitive snippets are summarized without raw values.",
      previewResultStatus: "redacted-preview",
      auditHandoff:
        "Audit handoff: route redacted preview request identity, scope, status, and blocked reasons to /jarvisd-audit-ingestion without calling appendEvent from UI.",
      blockedReasons: [
        "File previews require approved scope",
        "Arbitrary local browsing is not allowed",
        "Secret values stay redacted",
      ],
      advancedPreviewDetails:
        "Advanced preview details: this bridge does not browse files, read arbitrary files from UI, auto-open files, mutate files, call Jarvisd directly, execute capabilities, run commands, or call providers.",
    }),
    buildJarvisdFileReadPreviewBridge({
      idHint: "untrusted-workspace-blocked",
      previewBridgeIdentity:
        "Preview bridge identity: jarvisd-file-read-preview-bridge-blocked-workspace.",
      sourceWorkspaceTrust:
        "Source workspace trust: blocked because the workspace trust review is missing or expired.",
      fileOperationApprovalDependency:
        "File operation approval dependency: blocked until /local-file-approval confirms a narrow project-relative path scope.",
      permissionRuntimeEnforcementDependency:
        "Permission runtime enforcement dependency: blocked until runtime permission state is reviewed.",
      signedRequestDependency:
        "Signed request dependency: blocked until a future signed request is reviewed; no request is sent from this UI.",
      allowedPathScopeSummary:
        "Allowed path scope summary: no allowed path is available while trust or approval is missing.",
      deniedPathScopeSummary:
        "Denied path scope summary: all local paths remain denied while the bridge is blocked.",
      redactionStatus:
        "Redaction status: blocked and redacted by default; secret values are not displayed.",
      previewResultStatus: "blocked",
      auditHandoff:
        "Audit handoff: preserve the blocked reason as review copy only; the UI does not mutate Jarvisd audit logs.",
      blockedReasons: [
        "Approved local boundary required",
        "Workspace trust missing",
        "File operation approval missing",
      ],
      advancedPreviewDetails:
        "Advanced preview details: blocked means no file browsing, no local file read/open, no file mutation, no daemon call, and no provider send.",
    }),
  ];
}

export function buildJarvisdFileReadPreviewBridgeBoundary(): JarvisdFileReadPreviewBridgeBoundary {
  return {
    approvedScopeRequired: true,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    directFileReadAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    rawFetchAllowedFromUi: false,
    liveHandshakeAllowedFromUi: false,
    daemonProcessCreationAllowedFromFrontend: false,
    jarvisdDirectCallAllowedFromUi: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    secretValuesDisplayedAllowed: false,
    secretsExportedAllowed: false,
    signingMaterialStorageAllowedInBrowser: false,
    sessionTokenStorageAllowedInBrowser: false,
    apiKeyLocalStorageAllowed: false,
    processEnvDisplayAllowed: false,
    auditLogMutationAllowedFromUi: false,
    appendEventAllowedFromUi: false,
    brainGraphMutationAllowed: false,
    memoryAutoPromotionAllowed: false,
    packageInstallAllowedFromUi: false,
  };
}

export function summarizeJarvisdFileReadPreviewBridge(
  model: Pick<JarvisdFileReadPreviewBridgeModel, "previews">
): string {
  return `Jarvisd file read preview bridge prepares ${model.previews.length} reviewed preview handoff shape(s). File previews require approved scope, arbitrary local browsing is not allowed, and secret values stay redacted.`;
}

export function buildJarvisdFileReadPreviewBridgeModel(): JarvisdFileReadPreviewBridgeModel {
  const previews = buildJarvisdFileReadPreviewBridges();
  const model: JarvisdFileReadPreviewBridgeModel = {
    title: "Jarvisd file read preview bridge",
    summary: "",
    previews,
    boundary: buildJarvisdFileReadPreviewBridgeBoundary(),
    bridgeLanguage: [...JARVISD_FILE_READ_PREVIEW_BRIDGE_LANGUAGE],
    advancedDetails: [
      "Jarvisd file read preview bridge",
      "File previews require approved scope",
      "Arbitrary local browsing is not allowed",
      "Secret values stay redacted",
      "Secret values are never displayed",
      "Preview bridge identity",
      "Source workspace trust",
      "File operation approval dependency",
      "Permission runtime enforcement dependency",
      "Signed request dependency",
      "Allowed path scope summary",
      "Denied path scope summary",
      "Redaction status",
      "Preview result status",
      "Audit handoff",
      "Blocked reasons",
      "File bridges are reviewed before use",
      "Approved local boundary required",
    ],
  };
  return { ...model, summary: summarizeJarvisdFileReadPreviewBridge(model) };
}
