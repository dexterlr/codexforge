import type { HealthProbeRequest, HealthProbeRequestedMode, HealthProbeTarget } from "./future-health-probe-types";
import { buildDefaultHealthProbeTargets } from "./health-probe-target";

function stableRequestId(targetId: string, bridgeProfileId: string, requestedMode: string): string {
  return `health-probe-request-${targetId}-${bridgeProfileId}-${requestedMode}`
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-");
}

export function buildHealthProbeRequest(input: {
  target?: HealthProbeTarget;
  targetId?: HealthProbeRequest["targetId"];
  bridgeProfileId?: string;
  requestedMode?: HealthProbeRequestedMode;
  operatorIntent?: string;
  suppliedConfigHints?: string[];
} = {}): HealthProbeRequest {
  const target = input.target ?? buildDefaultHealthProbeTargets().find((item) => item.id === input.targetId) ?? buildDefaultHealthProbeTargets()[0];
  const bridgeProfileId = input.bridgeProfileId ?? `${target.bridgeTargetId}-profile`;
  const requestedMode = input.requestedMode ?? (target.probeType === "metadata-only" ? "request-ready" : target.defaultStatus === "manual-only" ? "manual-confirmation" : "blocked");
  const request: HealthProbeRequest = {
    id: stableRequestId(target.id, bridgeProfileId, requestedMode),
    targetId: target.id,
    bridgeProfileId,
    probeType: target.probeType,
    requestedMode,
    operatorIntent: input.operatorIntent ?? "Review safe metadata/manual-first health evidence without execution.",
    expectedResultShape: target.expectedOutput,
    suppliedConfigHints: input.suppliedConfigHints ?? [target.expectedInput],
    approvalRequired: target.requiresApproval || requestedMode === "guarded-probe-future",
    noJobExecutionGuarantee: "No creative job execution, no render execution, no launch, no file writes.",
    latestMessageAuthorityReminder: "Preserve latest-message authority before acting on any probe request.",
    valid: true,
    blockerReasons: [],
  };
  return validateHealthProbeRequest(request);
}

export function validateHealthProbeRequest(request: HealthProbeRequest): HealthProbeRequest {
  const blockerReasons = [
    request.targetId ? "" : "target selected blocker",
    request.bridgeProfileId ? "" : "bridge profile selected blocker",
    request.expectedResultShape ? "" : "expected output shape known blocker",
    request.noJobExecutionGuarantee.includes("No creative job execution") ? "" : "no-job-execution guarantee missing",
    request.latestMessageAuthorityReminder.includes("latest-message authority") ? "" : "latest-message authority reminder missing",
  ].filter(Boolean);
  return { ...request, valid: blockerReasons.length === 0, blockerReasons };
}

export function summarizeHealthProbeRequest(request: HealthProbeRequest): string[] {
  return [
    `Request ${request.id} targets ${request.targetId} in ${request.requestedMode} mode.`,
    `Approval required: ${request.approvalRequired}; valid: ${request.valid}.`,
    request.noJobExecutionGuarantee,
  ];
}
