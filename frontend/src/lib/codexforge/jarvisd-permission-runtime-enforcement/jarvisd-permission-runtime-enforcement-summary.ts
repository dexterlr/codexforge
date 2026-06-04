import type {
  JarvisdPermissionRuntimeEnforcementBoundary,
  JarvisdPermissionRuntimeEnforcementModel,
  JarvisdPermissionRuntimeEnforcementReview,
} from "./jarvisd-permission-runtime-enforcement-types";
import { buildJarvisdPermissionRuntimeEnforcementStableKey } from "./jarvisd-permission-runtime-enforcement-types";

export const JARVISD_PERMISSION_RUNTIME_ENFORCEMENT_LANGUAGE = [
  "Jarvisd permission runtime enforcement",
  "Enforcement does not grant permissions automatically",
  "Capabilities are not executed from this page",
  "Expired sessions stay blocked",
  "Allowed runtime scope",
  "Audit handoff",
  "Runtime controls are reviewed before use",
  "Approved local boundary required",
  "Secrets and signing material are never displayed or stored in browser storage",
] as const;

export function buildJarvisdPermissionRuntimeEnforcementReview(
  input: Omit<JarvisdPermissionRuntimeEnforcementReview, "id"> & { idHint: string }
): JarvisdPermissionRuntimeEnforcementReview {
  const { idHint, ...review } = input;
  return {
    id: buildJarvisdPermissionRuntimeEnforcementStableKey(
      "jarvisd-permission-runtime-enforcement",
      idHint,
      input.enforcementDecision
    ),
    ...review,
  };
}

export function buildJarvisdPermissionRuntimeEnforcementReviews(): JarvisdPermissionRuntimeEnforcementReview[] {
  return [
    buildJarvisdPermissionRuntimeEnforcementReview({
      idHint: "reviewed-metadata-scope",
      enforcementIdentity:
        "Enforcement identity: jarvisd-runtime-enforcement-reviewed-metadata-scope models a future approved metadata-only runtime check.",
      sessionConsentDependency:
        "Session consent dependency: /jarvisd-session-consent must contain reviewed consent, expiry, revocation, and operator intent before runtime enforcement can allow a request to proceed.",
      permissionBoundaryDependency:
        "Permission boundary dependency: /jarvisd-permissions must define the exact allowed and denied scope; enforcement does not grant permissions automatically.",
      requestedCapability:
        "Requested capability: project metadata status read, reviewed as a model only and not executed from this page.",
      allowedRuntimeScope: [
        "Approved workspace label",
        "Metadata-only capability shape",
        "Redacted audit handoff after review",
      ],
      deniedRuntimeScope: [
        "No arbitrary local file browsing",
        "No command execution",
        "No file mutation",
        "No secret display",
      ],
      enforcementDecision: "allowed",
      expiryRevocationStatus:
        "Expiry/revocation status: allowed only means the future request can continue to reviewed audit handoff while consent and boundary evidence remain current.",
      auditHandoff:
        "Audit handoff: record enforcement identity, requested capability, allowed runtime scope, denied runtime scope, decision, expiry, revocation state, and blocked reasons without secrets.",
      blockedReasons: [
        "Runtime controls are reviewed before use",
        "Capabilities are not executed from this page",
      ],
      advancedEnforcementDetails:
        "Advanced enforcement details: allowed is a review model, not a local action. This page does not call Jarvisd, run commands, browse files, mutate files, fetch live endpoints, or store signing material.",
    }),
    buildJarvisdPermissionRuntimeEnforcementReview({
      idHint: "missing-explicit-approval",
      enforcementIdentity:
        "Enforcement identity: jarvisd-runtime-enforcement-needs-approval blocks a future capability until human approval is explicit.",
      sessionConsentDependency:
        "Session consent dependency: consent exists as review copy only and must be approved before any runtime permission can be considered.",
      permissionBoundaryDependency:
        "Permission boundary dependency: approved local boundary required before execution; a draft boundary is not enough.",
      requestedCapability:
        "Requested capability: local process status summary, review-only and no local process is read or changed from this UI.",
      allowedRuntimeScope: [
        "Review blocked reasons",
        "Prepare approval copy",
      ],
      deniedRuntimeScope: [
        "No live process polling",
        "No process kill/restart/reset",
        "No environment value display",
      ],
      enforcementDecision: "needs-approval",
      expiryRevocationStatus:
        "Expiry/revocation status: blocked until the operator approves a short-lived local boundary and consent remains unrevoked.",
      auditHandoff:
        "Audit handoff: route missing approval details to /jarvisd-audit-ingestion after validation, never by mutating audit logs directly from UI.",
      blockedReasons: [
        "Approved local boundary required",
        "No explicit session approval",
        "Enforcement does not grant permissions automatically",
      ],
      advancedEnforcementDetails:
        "Advanced enforcement details: needs-approval means no capability execution, no daemon direct call, no raw fetch, no command execution, and no local process mutation.",
    }),
    buildJarvisdPermissionRuntimeEnforcementReview({
      idHint: "expired-session",
      enforcementIdentity:
        "Enforcement identity: jarvisd-runtime-enforcement-expired-session models fail-closed behavior after consent expiry.",
      sessionConsentDependency:
        "Session consent dependency: expired or revoked session consent cannot be reused for runtime permission enforcement.",
      permissionBoundaryDependency:
        "Permission boundary dependency: even a valid permission boundary stays blocked when session consent is expired.",
      requestedCapability:
        "Requested capability: signed request replay check, review-only and no request is sent from this page.",
      allowedRuntimeScope: [
        "None while expired",
        "Review expiry reason only",
      ],
      deniedRuntimeScope: [
        "No signed request reuse",
        "No capability execution",
        "No audit bypass",
      ],
      enforcementDecision: "expired",
      expiryRevocationStatus:
        "Expiry/revocation status: expired sessions stay blocked and must be renewed through explicit consent review.",
      auditHandoff:
        "Audit handoff: record the expired decision as a redacted blocked event candidate for future ingestion review.",
      blockedReasons: [
        "Expired sessions stay blocked",
        "Session consent is stale or revoked",
        "No runtime override from this page",
      ],
      advancedEnforcementDetails:
        "Advanced enforcement details: expired means fail closed. This page does not generate session tokens, store tokens in localStorage, or display signing secrets.",
    }),
    buildJarvisdPermissionRuntimeEnforcementReview({
      idHint: "overbroad-capability",
      enforcementIdentity:
        "Enforcement identity: jarvisd-runtime-enforcement-overbroad-capability blocks broad or ambiguous local capability scope.",
      sessionConsentDependency:
        "Session consent dependency: vague operator intent blocks runtime enforcement even if a capability name is present.",
      permissionBoundaryDependency:
        "Permission boundary dependency: denied scope must stay visible and stronger than any broad requested capability.",
      requestedCapability:
        "Requested capability: arbitrary local file and command bundle, blocked as unsafe and not executed.",
      allowedRuntimeScope: [
        "Review blocked reasons only",
      ],
      deniedRuntimeScope: [
        "No arbitrary local file browsing",
        "No arbitrary file read/open",
        "No file mutation",
        "No command execution",
        "No provider or GitHub API calls",
      ],
      enforcementDecision: "blocked",
      expiryRevocationStatus:
        "Expiry/revocation status: blocked until the request is narrowed, re-consented, and reviewed against a permission boundary.",
      auditHandoff:
        "Audit handoff: preserve blocked reasons for future audit ingestion without calling appendEvent from UI.",
      blockedReasons: [
        "Overbroad requested capability",
        "Denied scope includes files and commands",
        "UI does not execute Jarvisd capabilities",
      ],
      advancedEnforcementDetails:
        "Advanced enforcement details: blocked means no local command, no file browse/read/open/write/delete, no settings auto-import, no provider routing, and no Brain graph mutation.",
    }),
  ];
}

export function buildJarvisdPermissionRuntimeEnforcementBoundary(): JarvisdPermissionRuntimeEnforcementBoundary {
  return {
    automaticPermissionGrantAllowed: false,
    capabilityExecutionAllowedFromUi: false,
    expiredSessionExecutionAllowed: false,
    localActionWithoutApprovalAllowed: false,
    daemonDirectCallAllowedFromUi: false,
    rawFetchAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    arbitraryFileBrowsingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    fileMutationAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    auditLogMutationAllowedFromUi: false,
    appendEventAllowedFromUi: false,
    signingMaterialStorageAllowedInBrowser: false,
    sessionTokenStorageAllowedInBrowser: false,
    settingsAutoImportAllowed: false,
    secretsDisplayedAllowed: false,
    secretsExportedAllowed: false,
    providerApiCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    processEnvDisplayAllowed: false,
    providerRegistryMutationAllowed: false,
    automaticRoutingAllowed: false,
    tokenSpendAllowedFromUi: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
  };
}

export function summarizeJarvisdPermissionRuntimeEnforcement(
  model: Pick<JarvisdPermissionRuntimeEnforcementModel, "enforcementReviews">
): string {
  return `Jarvisd permission runtime enforcement reviews ${model.enforcementReviews.length} runtime decision posture(s). Enforcement does not grant permissions automatically, capabilities are not executed from this page, runtime controls are reviewed before use, and expired sessions stay blocked.`;
}

export function buildJarvisdPermissionRuntimeEnforcementModel(): JarvisdPermissionRuntimeEnforcementModel {
  const enforcementReviews = buildJarvisdPermissionRuntimeEnforcementReviews();
  const model: JarvisdPermissionRuntimeEnforcementModel = {
    title: "Jarvisd permission runtime enforcement",
    summary: "",
    enforcementReviews,
    boundary: buildJarvisdPermissionRuntimeEnforcementBoundary(),
    enforcementLanguage: [...JARVISD_PERMISSION_RUNTIME_ENFORCEMENT_LANGUAGE],
    advancedDetails: [
      "Jarvisd permission runtime enforcement",
      "Enforcement does not grant permissions automatically",
      "Capabilities are not executed from this page",
      "Expired sessions stay blocked",
      "Enforcement identity",
      "Session consent dependency",
      "Permission boundary dependency",
      "Requested capability",
      "Allowed runtime scope",
      "Denied runtime scope",
      "Enforcement decision",
      "Expiry/revocation status",
      "Audit handoff",
      "Blocked reasons",
      "Approved local boundary required",
      "Secrets and signing material are never displayed or stored in browser storage",
    ],
  };
  return { ...model, summary: summarizeJarvisdPermissionRuntimeEnforcement(model) };
}
