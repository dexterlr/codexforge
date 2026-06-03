import type {
  JarvisdPermissionBoundary,
  JarvisdPermissionBoundaryModel,
  JarvisdPermissionBoundarySafety,
} from "./jarvisd-permission-boundary-types";
import { buildJarvisdPermissionBoundaryStableKey } from "./jarvisd-permission-boundary-types";

export const JARVISD_PERMISSION_BOUNDARY_LANGUAGE = [
  "Jarvisd permission boundary",
  "Permissions are not granted automatically",
  "No local action runs without explicit approval",
  "Secrets are never requested by this boundary",
  "Approval copy",
  "Revocation guidance",
] as const;

export function buildJarvisdPermissionBoundary(
  input: Omit<JarvisdPermissionBoundary, "id"> & { idHint: string }
): JarvisdPermissionBoundary {
  const { idHint, ...permission } = input;
  return {
    id: buildJarvisdPermissionBoundaryStableKey("jarvisd-permission-boundary", idHint, input.status),
    ...permission,
  };
}

export function buildJarvisdPermissionBoundaries(): JarvisdPermissionBoundary[] {
  return [
    buildJarvisdPermissionBoundary({
      idHint: "project-index-read-review",
      permissionIdentity:
        "Permission identity: Jarvisd project index read review boundary.",
      requestedCapability:
        "Requested capability: project index read for a reviewed project root label.",
      allowedScope:
        "Allowed scope: metadata summary inside the approved local project boundary after explicit approval.",
      deniedScope:
        "Denied scope: arbitrary file browsing, file contents, secrets, command execution, file writes, and provider sends.",
      approvalCopy:
        "Approval copy: I approve Jarvisd to prepare a local-only project index read summary for the reviewed scope; no commands, secrets, or file mutations are allowed.",
      riskLevel: "medium",
      auditNote:
        "Audit note: record permission identity, requested capability, allowed scope, denied scope, approval copy, and blocked reasons without secret values.",
      revocationGuidance:
        "Revocation guidance: remove the permission from the future local boundary and treat any cached capability plan as blocked.",
      blockedReasons: [
        "Permissions are not granted automatically",
        "Approved local boundary is not connected",
        "No local action runs without explicit approval",
      ],
      nextRoute: "/jarvisd-capabilities",
      status: "not-granted",
      advancedPermissionDetails:
        "Advanced permission details: this permission boundary is review copy only and does not grant access or call Jarvisd.",
    }),
    buildJarvisdPermissionBoundary({
      idHint: "file-read-preview-blocked",
      permissionIdentity:
        "Permission identity: Jarvisd file read preview blocked boundary.",
      requestedCapability:
        "Requested capability: file read preview for a single reviewed path inside allowed scope.",
      allowedScope:
        "Allowed scope: no scope is granted in this phase; future scope must be explicit and narrow.",
      deniedScope:
        "Denied scope: secrets, passwords, API keys, environment values, broad directories, hidden background reads, writes, deletes, and command execution.",
      approvalCopy:
        "Approval copy: not approved in this phase; provide explicit human approval later before any local read preview.",
      riskLevel: "high",
      auditNote:
        "Audit note: keep the denied scope visible and explain why file reads stay blocked without exposing file contents.",
      revocationGuidance:
        "Revocation guidance: leave the permission absent; if it appears later without approval, mark it blocked and route to audit.",
      blockedReasons: [
        "Secrets are never requested by this boundary",
        "No reviewed file path scope",
        "No explicit approval",
        "File mutation and arbitrary browsing remain blocked",
      ],
      nextRoute: "/jarvisd-contract",
      status: "blocked",
      advancedPermissionDetails:
        "Advanced permission details: this boundary does not browse files, mutate files, display secrets, or store credentials.",
    }),
  ];
}

export function buildJarvisdPermissionBoundarySafety(): JarvisdPermissionBoundarySafety {
  return {
    automaticPermissionGrantAllowed: false,
    localActionWithoutApprovalAllowed: false,
    secretsRequestedAllowed: false,
    commandExecutionAllowedFromUi: false,
    arbitraryFileBrowsingAllowed: false,
    fileMutationAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    secretsDisplayedAllowed: false,
    credentialStorageAllowed: false,
    providerRegistryMutationAllowed: false,
    routerPolicyMutationAllowed: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
  };
}

export function summarizeJarvisdPermissionBoundary(
  model: Pick<JarvisdPermissionBoundaryModel, "permissions">
): string {
  return `Jarvisd permission boundary prepares ${model.permissions.length} human-reviewed permission shape(s). Permissions are not granted automatically, no local action runs without explicit approval, and secrets are never requested by this boundary.`;
}

export function buildJarvisdPermissionBoundaryModel(): JarvisdPermissionBoundaryModel {
  const permissions = buildJarvisdPermissionBoundaries();
  const model: JarvisdPermissionBoundaryModel = {
    title: "Jarvisd permission boundary",
    summary: "",
    permissions,
    boundary: buildJarvisdPermissionBoundarySafety(),
    permissionLanguage: [...JARVISD_PERMISSION_BOUNDARY_LANGUAGE],
    advancedDetails: [
      "Jarvisd permission boundary",
      "Permissions are not granted automatically",
      "No local action runs without explicit approval",
      "Secrets are never requested by this boundary",
      "Permission identity",
      "Requested capability",
      "Allowed scope",
      "Denied scope",
      "Approval copy",
      "Risk level",
      "Audit note",
      "Revocation guidance",
      "Blocked reasons",
      "Next route",
      "No command execution",
      "No file mutation",
    ],
  };
  return { ...model, summary: summarizeJarvisdPermissionBoundary(model) };
}
