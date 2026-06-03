import type {
  JarvisdHealthVersionProbe,
  JarvisdHealthVersionProbeBoundary,
  JarvisdHealthVersionProbeModel,
} from "./jarvisd-health-version-probe-types";
import { buildJarvisdHealthVersionProbeStableKey } from "./jarvisd-health-version-probe-types";

export const JARVISD_HEALTH_VERSION_PROBE_LANGUAGE = [
  "Jarvisd health and version probe",
  "No probe runs automatically",
  "Live probing remains behind approved local boundary",
  "Localhost-only policy",
  "Version requirement",
  "Timeout policy",
] as const;

export function buildJarvisdHealthVersionProbe(
  input: Omit<JarvisdHealthVersionProbe, "id"> & { idHint: string }
): JarvisdHealthVersionProbe {
  const { idHint, ...probe } = input;
  return {
    id: buildJarvisdHealthVersionProbeStableKey("jarvisd-health-version-probe", idHint, input.probeStatus),
    ...probe,
  };
}

export function buildJarvisdHealthVersionProbes(): JarvisdHealthVersionProbe[] {
  return [
    buildJarvisdHealthVersionProbe({
      idHint: "localhost-version-readiness",
      daemonEndpointSummary:
        "Daemon endpoint summary: future Jarvisd health checks target a reviewed localhost endpoint only after the approved local boundary exists.",
      localhostOnlyPolicy:
        "Localhost-only policy: remote hosts, wildcard endpoints, cloud URLs, and hidden background polling are blocked.",
      versionRequirement:
        "Version requirement: future daemon responses must include a compatible Jarvisd version label, protocol label, and capability registry revision.",
      healthStatus:
        "Health status: not-run in this phase; the page explains readiness and does not contact a daemon.",
      timeoutPolicy:
        "Timeout policy: future probes use a short reviewed timeout and fail closed with a plain blocked reason.",
      retryPolicy:
        "Retry policy: no automatic retry; the operator reviews failure text before any future retry request.",
      capabilityRegistryDependency:
        "Capability registry dependency: health readiness depends on the Jarvisd capability registry declaring safe local-only capabilities.",
      permissionBoundaryDependency:
        "Permission boundary dependency: probing requires a Jarvisd permission boundary before any live local call.",
      auditHandoff:
        "Audit handoff: future probe results record version, health status, timeout result, retry choice, and blocked reasons without secrets.",
      blockedReasons: [
        "No probe runs automatically",
        "Approved local boundary is not connected",
        "Capability registry has not been negotiated live",
        "Permission boundary is not approved",
      ],
      probeStatus: "not-run",
      advancedProbeDetails:
        "Advanced probe details: this page has no daemon client, no raw fetch call, no command execution, no environment value display, no file browsing, and no file mutation.",
    }),
    buildJarvisdHealthVersionProbe({
      idHint: "blocked-nonlocal-health",
      daemonEndpointSummary:
        "Daemon endpoint summary: nonlocal endpoints are not valid Jarvisd health targets.",
      localhostOnlyPolicy:
        "Localhost-only policy: any endpoint outside reviewed localhost policy stays blocked.",
      versionRequirement:
        "Version requirement: unknown versions stay blocked until manually reviewed against the contract.",
      healthStatus:
        "Health status: blocked when endpoint, version, capability registry, permission boundary, or audit handoff is missing.",
      timeoutPolicy:
        "Timeout policy: timeout settings are review data only in this phase and are not applied automatically.",
      retryPolicy:
        "Retry policy: retry plans remain manual notes and never create a background loop.",
      capabilityRegistryDependency:
        "Capability registry dependency: unknown or disabled capabilities do not become probeable because health is requested.",
      permissionBoundaryDependency:
        "Permission boundary dependency: no permission means no live probing.",
      auditHandoff:
        "Audit handoff: blocked health checks should explain the missing boundary in plain English.",
      blockedReasons: [
        "Endpoint is not approved localhost",
        "Version requirement is unknown",
        "No explicit approval",
      ],
      probeStatus: "blocked",
      advancedProbeDetails:
        "Advanced probe details: health/version probing is readiness copy only and cannot send network calls, prompts, files, provider requests, or secrets.",
    }),
  ];
}

export function buildJarvisdHealthVersionProbeBoundary(): JarvisdHealthVersionProbeBoundary {
  return {
    automaticProbeAllowed: false,
    daemonFetchAllowedFromUi: false,
    rawFetchAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    arbitraryFileBrowsingAllowed: false,
    fileMutationAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    secretsDisplayedAllowed: false,
    credentialStorageAllowed: false,
    environmentValueDisplayAllowed: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
  };
}

export function summarizeJarvisdHealthVersionProbe(
  model: Pick<JarvisdHealthVersionProbeModel, "probes">
): string {
  return `Jarvisd health and version probe prepares ${model.probes.length} readiness probe shape(s). No probe runs automatically, localhost-only policy is required, and live probing remains behind approved local boundary.`;
}

export function buildJarvisdHealthVersionProbeModel(): JarvisdHealthVersionProbeModel {
  const probes = buildJarvisdHealthVersionProbes();
  const model: JarvisdHealthVersionProbeModel = {
    title: "Jarvisd health and version probe",
    summary: "",
    probes,
    boundary: buildJarvisdHealthVersionProbeBoundary(),
    probeLanguage: [...JARVISD_HEALTH_VERSION_PROBE_LANGUAGE],
    advancedDetails: [
      "Jarvisd health and version probe",
      "No probe runs automatically",
      "Live probing remains behind approved local boundary",
      "Daemon endpoint summary",
      "Localhost-only policy",
      "Version requirement",
      "Health status",
      "Timeout policy",
      "Retry policy",
      "Capability registry dependency",
      "Permission boundary dependency",
      "Audit handoff",
      "Blocked reasons",
      "No automatic daemon call",
      "No raw fetch from arbitrary UI",
    ],
  };
  return { ...model, summary: summarizeJarvisdHealthVersionProbe(model) };
}
