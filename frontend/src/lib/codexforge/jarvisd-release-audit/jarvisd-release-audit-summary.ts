import type {
  JarvisdReleaseAudit,
  JarvisdReleaseAuditBoundary,
  JarvisdReleaseAuditModel,
} from "./jarvisd-release-audit-types";
import { buildJarvisdReleaseAuditStableKey } from "./jarvisd-release-audit-types";

export const JARVISD_RELEASE_AUDIT_LANGUAGE = [
  "Jarvisd release audit",
  "Release audit does not deploy Jarvisd",
  "No daemon action runs from this page",
  "Secrets are not inspected or displayed",
  "Release decision",
  "Known gaps",
] as const;

export function buildJarvisdReleaseAudit(
  input: Omit<JarvisdReleaseAudit, "id"> & { idHint: string }
): JarvisdReleaseAudit {
  const { idHint, ...audit } = input;
  return {
    id: buildJarvisdReleaseAuditStableKey(
      "jarvisd-release-audit",
      idHint,
      input.releaseDecision
    ),
    ...audit,
  };
}

export function buildJarvisdReleaseAudits(): JarvisdReleaseAudit[] {
  return [
    buildJarvisdReleaseAudit({
      idHint: "boundary-suite-ready-with-fixes",
      releaseAuditIdentity:
        "Release audit identity: jarvisd-boundary-suite-ready-with-fixes-review before a future daemon MVP.",
      coveredJarvisdSurfaces: [
        "Jarvisd local daemon contract",
        "Jarvisd health and version probe",
        "Jarvisd capability registry",
        "Jarvisd permission boundary",
        "Jarvisd audit log viewer",
        "Jarvisd recovery console",
        "Jarvisd settings review",
      ],
      contractReadiness:
        "Contract readiness: review route exists and keeps live daemon calls behind a future approved local boundary.",
      healthVersionReadiness:
        "Health/version readiness: probe route is review-only and does not run a localhost probe automatically.",
      capabilityRegistryReadiness:
        "Capability registry readiness: capabilities are described, disabled or blocked as needed, and not executed from UI.",
      permissionBoundaryReadiness:
        "Permission boundary readiness: permissions require explicit approval and are not granted automatically.",
      auditLogReadiness:
        "Audit log readiness: audit entries are redacted, read-only, and do not mutate logs from UI.",
      recoveryReadiness:
        "Recovery readiness: recovery actions are reviewed not executed and no local process is mutated from this page.",
      settingsReviewReadiness:
        "Settings review readiness: secrets are never exported and imports are not applied automatically.",
      knownGaps: [
        "Future Jarvisd MVP still needs an approved daemon boundary",
        "Future live health checks still need localhost-only approval",
        "Future recovery execution remains outside arbitrary UI",
      ],
      releaseDecision: "ready-with-fixes",
      releaseDecisionLabel:
        "Release decision: ready with fixes for planning after smoke scripts pass and execution gaps remain documented.",
      nextRecommendedRoute: "/jarvisd-settings-review",
      advancedAuditDetails:
        "Advanced audit details: this readiness audit does not deploy Jarvisd, call Jarvisd, execute commands, inspect secrets, mutate local state, auto-route traffic, or spend tokens.",
    }),
    buildJarvisdReleaseAudit({
      idHint: "blocked-daemon-mvp-execution",
      releaseAuditIdentity:
        "Release audit identity: jarvisd-daemon-mvp-execution-blocked-review.",
      coveredJarvisdSurfaces: [
        "Permission boundary",
        "Audit log viewer",
        "Recovery console",
        "Settings review",
      ],
      contractReadiness:
        "Contract readiness: blocked if a request expects direct daemon calls from arbitrary UI.",
      healthVersionReadiness:
        "Health/version readiness: blocked if a page would probe live daemon status without an approved local boundary.",
      capabilityRegistryReadiness:
        "Capability registry readiness: blocked if capabilities execute instead of staying review-only.",
      permissionBoundaryReadiness:
        "Permission boundary readiness: blocked if permissions are granted automatically.",
      auditLogReadiness:
        "Audit log readiness: blocked if logs are mutated, fetched live from arbitrary UI, or show secrets.",
      recoveryReadiness:
        "Recovery readiness: blocked if restart, kill, reset, or command execution is wired into UI.",
      settingsReviewReadiness:
        "Settings review readiness: blocked if imports apply automatically or secrets are exported.",
      knownGaps: [
        "No daemon action execution boundary in this phase",
        "No settings apply boundary in this phase",
        "No process control boundary in this phase",
      ],
      releaseDecision: "blocked",
      releaseDecisionLabel:
        "Release decision: blocked for any future daemon MVP request that tries to run local actions from this page.",
      nextRecommendedRoute: "/jarvisd-permissions",
      advancedAuditDetails:
        "Advanced audit details: ready means review-ready only; deploy and local execution remain blocked.",
    }),
  ];
}

export function buildJarvisdReleaseAuditBoundary(): JarvisdReleaseAuditBoundary {
  return {
    jarvisdDeploymentAllowedFromUi: false,
    daemonActionAllowedFromUi: false,
    jarvisdDirectCallAllowedFromUi: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    localStateMutationAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    arbitraryFileBrowsingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    secretsInspectionAllowedFromUi: false,
    secretsDisplayedAllowed: false,
    secretsExportedAllowed: false,
    providerApiCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    settingsAutoExportAllowed: false,
    settingsAutoImportAllowed: false,
    providerRegistryMutationAllowed: false,
    automaticRoutingAllowed: false,
    tokenSpendAllowedFromUi: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
  };
}

export function summarizeJarvisdReleaseAudit(
  model: Pick<JarvisdReleaseAuditModel, "audits">
): string {
  return `Jarvisd release audit reviews ${model.audits.length} readiness decision(s). Release audit does not deploy Jarvisd, no daemon action runs from this page, and secrets are not inspected or displayed.`;
}

export function buildJarvisdReleaseAuditModel(): JarvisdReleaseAuditModel {
  const audits = buildJarvisdReleaseAudits();
  const model: JarvisdReleaseAuditModel = {
    title: "Jarvisd release audit",
    summary: "",
    audits,
    boundary: buildJarvisdReleaseAuditBoundary(),
    auditLanguage: [...JARVISD_RELEASE_AUDIT_LANGUAGE],
    advancedDetails: [
      "Jarvisd release audit",
      "Release audit does not deploy Jarvisd",
      "No daemon action runs from this page",
      "Secrets are not inspected or displayed",
      "Release audit identity",
      "Covered Jarvisd surfaces",
      "Contract readiness",
      "Health/version readiness",
      "Capability registry readiness",
      "Permission boundary readiness",
      "Audit log readiness",
      "Recovery readiness",
      "Settings review readiness",
      "Known gaps",
      "Release decision",
      "Next recommended route",
      "No command execution",
      "No local state mutation",
    ],
  };
  return { ...model, summary: summarizeJarvisdReleaseAudit(model) };
}
