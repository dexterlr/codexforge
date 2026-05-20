import type { HealthProbeAllowlist, HealthProbeApprovalPacket, HealthProbePolicy, HealthProbeRequest } from "./future-health-probe-types";
import { buildHealthProbeAllowlist, isHealthProbeAllowlisted } from "./health-probe-allowlist";
import { buildHealthProbeApprovalPacket } from "./health-probe-approval";
import { buildHealthProbeRequest } from "./health-probe-request";

export function buildHealthProbePolicy(args: {
  request?: HealthProbeRequest;
  allowlist?: HealthProbeAllowlist;
  approval?: HealthProbeApprovalPacket;
} = {}): HealthProbePolicy {
  const request = args.request ?? buildHealthProbeRequest();
  const allowlist = args.allowlist ?? buildHealthProbeAllowlist();
  const approval = args.approval ?? buildHealthProbeApprovalPacket({ request });
  const allowlisted = isHealthProbeAllowlisted({ targetId: request.targetId, allowlist });
  const manualAllowed = request.requestedMode === "manual-confirmation" || request.probeType === "manual-confirmation";
  const metadataOnly = request.probeType === "metadata-only" || request.probeType === "manual-confirmation";
  const requestReady = Boolean(request.valid && allowlisted && (metadataOnly || approval.valid));
  const blockedReasons = [
    request.valid ? "" : "request required and valid",
    allowlisted ? "" : "allowlist required and no wildcard allowlist",
    request.requestedMode === "guarded-probe-future" && !approval.valid ? "explicit approval required for future guarded probe" : "",
    request.probeType === "command-version-future" ? "command probes blocked by default" : "",
    request.probeType === "local-http-health-future" ? "local HTTP probes blocked by default" : "",
    request.probeType === "path-presence-future" ? "filesystem probes blocked by default unless future guarded" : "",
    "executable launches blocked",
    "render/job execution blocked",
    "arbitrary shell blocked",
    "arbitrary endpoint blocked",
    "artifact writes blocked",
    "secrets blocked",
    "broker execution blocked",
  ].filter(Boolean);
  const probeAllowed = Boolean(metadataOnly && requestReady && manualAllowed);
  const policy: HealthProbePolicy = {
    id: "future-guarded-health-probe-policy",
    previewAllowed: true,
    manualAllowed,
    probeAllowed,
    requestReady,
    blockedReasons,
    warnings: [
      "operator review required",
      "approval does not execute automatically",
      "metadata-only manual confirmation allowed",
      "local app requirement must stay visible",
    ],
    nextSafeAction: probeAllowed ? "Capture supplied manual metadata only." : requestReady ? "Copy request packet for operator review; do not execute." : "Resolve blockers or use manual-only supplied result.",
    rules: [
      "request required",
      "target required",
      "allowlist required",
      "explicit approval required for future guarded probe",
      "metadata-only manual confirmation allowed",
      "command probes blocked by default",
      "local HTTP probes blocked by default",
      "filesystem probes blocked by default unless future guarded",
      "executable launches blocked",
      "render/job execution blocked",
      "arbitrary shell blocked",
      "arbitrary endpoint blocked",
      "artifact writes blocked",
      "secrets blocked",
      "broker execution blocked",
      "operator review required",
    ],
  };
  return policy;
}

export function isHealthProbeAllowed(policy: HealthProbePolicy = buildHealthProbePolicy()): boolean {
  return policy.probeAllowed && policy.previewAllowed && policy.manualAllowed;
}

export function summarizeHealthProbePolicy(policy: HealthProbePolicy): string[] {
  return [
    `Preview allowed: ${policy.previewAllowed}; manual allowed: ${policy.manualAllowed}; probe allowed: ${policy.probeAllowed}.`,
    `Request ready: ${policy.requestReady}; blocked reasons: ${policy.blockedReasons.length}.`,
    policy.nextSafeAction,
  ];
}
