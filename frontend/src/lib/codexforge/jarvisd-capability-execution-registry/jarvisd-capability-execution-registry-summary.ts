import type {
  JarvisdCapabilityExecutionRegistryBoundary,
  JarvisdCapabilityExecutionRegistryItem,
  JarvisdCapabilityExecutionRegistryModel,
} from "./jarvisd-capability-execution-registry-types";
import { buildJarvisdCapabilityExecutionRegistryStableKey } from "./jarvisd-capability-execution-registry-types";

export const JARVISD_CAPABILITY_EXECUTION_REGISTRY_LANGUAGE = [
  "Jarvisd capability execution registry",
  "Registry does not execute capabilities",
  "Disabled capabilities remain blocked",
  "Approved boundary is required before execution",
  "Required permission",
  "Signed request requirement",
  "Runtime controls are reviewed before use",
  "Approved local boundary required",
  "Secrets and signing material are never displayed or stored in browser storage",
] as const;

export function buildJarvisdCapabilityExecutionRegistryItem(
  input: Omit<JarvisdCapabilityExecutionRegistryItem, "id"> & { idHint: string }
): JarvisdCapabilityExecutionRegistryItem {
  const { idHint, ...item } = input;
  return {
    id: buildJarvisdCapabilityExecutionRegistryStableKey(
      "jarvisd-capability-execution-registry",
      idHint,
      input.executionStatus
    ),
    ...item,
  };
}

export function buildJarvisdCapabilityExecutionRegistryItems(): JarvisdCapabilityExecutionRegistryItem[] {
  return [
    buildJarvisdCapabilityExecutionRegistryItem({
      idHint: "project-metadata-status",
      executableCapabilityIdentity:
        "Executable capability identity: jarvisd-executable-project-metadata-status.",
      capabilityCategory:
        "Capability category: read-only project metadata status, reviewed as a future local capability.",
      requiredPermission:
        "Required permission: approved project metadata status scope, no arbitrary file browsing, no file contents, and no mutation.",
      sessionConsentRequirement:
        "Session consent requirement: /jarvisd-session-consent must approve a short-lived local session for this specific capability.",
      signedRequestRequirement:
        "Signed request requirement: /jarvisd-signed-request must define request identity, nonce/challenge, expiry, and replay protection without browser-stored signing secrets.",
      auditRequirement:
        "Audit requirement: future execution must hand off a redacted event candidate with capability identity, permission reference, decision, and blocked reasons.",
      recoveryRequirement:
        "Recovery requirement: /jarvisd-recovery-console must describe fail-closed handling if consent, permission, or audit validation is missing.",
      riskLevel: "medium",
      executionStatus: "approved-boundary-required",
      nextRecommendedRoute: "/jarvisd-runtime-enforcement",
      advancedRegistryDetails:
        "Advanced registry details: this entry maps requirements only. Registry does not execute capabilities, call Jarvisd, fetch endpoints, browse files, or mutate local state.",
    }),
    buildJarvisdCapabilityExecutionRegistryItem({
      idHint: "signed-request-preview",
      executableCapabilityIdentity:
        "Executable capability identity: jarvisd-executable-signed-request-preview.",
      capabilityCategory:
        "Capability category: signed request review and replay guard, not a request sender.",
      requiredPermission:
        "Required permission: permission boundary reference that names allowed capability target and denied runtime scope.",
      sessionConsentRequirement:
        "Session consent requirement: consent copy must match the capability target and expire before reuse is possible.",
      signedRequestRequirement:
        "Signed request requirement: signing material is never displayed or stored in browser storage, and requests are not sent from this registry.",
      auditRequirement:
        "Audit requirement: log only redacted request identity and replay guard result after validation.",
      recoveryRequirement:
        "Recovery requirement: missing nonce, expired consent, or replay risk routes to recovery and remains blocked.",
      riskLevel: "high",
      executionStatus: "review-only",
      nextRecommendedRoute: "/jarvisd-signed-request",
      advancedRegistryDetails:
        "Advanced registry details: review-only means no secret generation in UI, no localStorage token storage, no raw fetch, and no live handshake.",
    }),
    buildJarvisdCapabilityExecutionRegistryItem({
      idHint: "local-process-control",
      executableCapabilityIdentity:
        "Executable capability identity: jarvisd-executable-local-process-control-blocked.",
      capabilityCategory:
        "Capability category: process control and daemon restart actions, blocked from arbitrary UI.",
      requiredPermission:
        "Required permission: not grantable here; process kill, restart, shutdown, and reset require explicit approved local boundary outside this review page.",
      sessionConsentRequirement:
        "Session consent requirement: even valid consent cannot bypass the blocked process-control posture.",
      signedRequestRequirement:
        "Signed request requirement: a signed request is insufficient without a separate approved local boundary.",
      auditRequirement:
        "Audit requirement: blocked process-control attempts must be redacted and validated before future ingestion review.",
      recoveryRequirement:
        "Recovery requirement: route to /jarvisd-kill-switch for safe shutdown review copy and /jarvisd-recovery-console for manual recovery.",
      riskLevel: "blocked",
      executionStatus: "blocked",
      nextRecommendedRoute: "/jarvisd-kill-switch",
      advancedRegistryDetails:
        "Advanced registry details: no local process is killed, restarted, reset, or shut down from UI. Disabled capabilities remain blocked.",
    }),
    buildJarvisdCapabilityExecutionRegistryItem({
      idHint: "artifact-retention-review",
      executableCapabilityIdentity:
        "Executable capability identity: jarvisd-executable-artifact-retention-review.",
      capabilityCategory:
        "Capability category: artifact and operation retention note for future safe shutdown review.",
      requiredPermission:
        "Required permission: read-only artifact metadata reference, no artifact deletion, no export of secrets, and no file mutation.",
      sessionConsentRequirement:
        "Session consent requirement: consent must state retention intent and denied mutation scope.",
      signedRequestRequirement:
        "Signed request requirement: signed request must carry retention intent without secret payloads.",
      auditRequirement:
        "Audit requirement: retain redacted artifact/operation notes and blocked reasons after validation.",
      recoveryRequirement:
        "Recovery requirement: if retention evidence is incomplete, recovery remains manual and review-only.",
      riskLevel: "medium",
      executionStatus: "disabled",
      nextRecommendedRoute: "/jarvisd-audit-ingestion",
      advancedRegistryDetails:
        "Advanced registry details: disabled means no artifact is exported, deleted, opened, or mutated from this registry.",
    }),
  ];
}

export function buildJarvisdCapabilityExecutionRegistryBoundary(): JarvisdCapabilityExecutionRegistryBoundary {
  return {
    capabilityExecutionAllowedFromUi: false,
    disabledCapabilityExecutionAllowed: false,
    approvedBoundaryBypassAllowed: false,
    commandExecutionAllowedFromUi: false,
    arbitraryFileBrowsingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    fileMutationAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    daemonDirectCallAllowedFromUi: false,
    rawFetchAllowedFromUi: false,
    liveHandshakeAllowedFromUi: false,
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

export function summarizeJarvisdCapabilityExecutionRegistry(
  model: Pick<JarvisdCapabilityExecutionRegistryModel, "executableCapabilities">
): string {
  return `Jarvisd capability execution registry maps ${model.executableCapabilities.length} executable capability posture(s) to permission, consent, signed request, audit, and recovery requirements. Registry does not execute capabilities, disabled capabilities remain blocked, and approved boundary is required before execution.`;
}

export function buildJarvisdCapabilityExecutionRegistryModel(): JarvisdCapabilityExecutionRegistryModel {
  const executableCapabilities = buildJarvisdCapabilityExecutionRegistryItems();
  const model: JarvisdCapabilityExecutionRegistryModel = {
    title: "Jarvisd capability execution registry",
    summary: "",
    executableCapabilities,
    boundary: buildJarvisdCapabilityExecutionRegistryBoundary(),
    registryLanguage: [...JARVISD_CAPABILITY_EXECUTION_REGISTRY_LANGUAGE],
    advancedDetails: [
      "Jarvisd capability execution registry",
      "Registry does not execute capabilities",
      "Disabled capabilities remain blocked",
      "Approved boundary is required before execution",
      "Executable capability identity",
      "Capability category",
      "Required permission",
      "Session consent requirement",
      "Signed request requirement",
      "Audit requirement",
      "Recovery requirement",
      "Risk level",
      "Execution status",
      "Next recommended route",
      "Approved local boundary required",
      "Secrets and signing material are never displayed or stored in browser storage",
    ],
  };
  return { ...model, summary: summarizeJarvisdCapabilityExecutionRegistry(model) };
}
