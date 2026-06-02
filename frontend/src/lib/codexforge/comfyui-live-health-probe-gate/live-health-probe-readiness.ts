import type { LiveHealthProbePolicy, LiveHealthProbeReadiness, LiveHealthProbeRequest } from "./comfyui-live-health-gate-types";

export function buildLiveHealthProbeReadiness(
  request: LiveHealthProbeRequest,
  policy: LiveHealthProbePolicy
): LiveHealthProbeReadiness {
  const checks = [
    "base URL supplied",
    "base URL is local-only",
    "metadata-only intention confirmed",
    "no prompt payload",
    "no workflow payload",
    "no queue mutation",
    "no file write",
    "no API key",
    "no cloud URL",
    "explicit approval recorded",
    "no-auto-run guarantee",
  ];
  const readyChecks = [
    request.baseUrl.trim() ? "base URL supplied" : "",
    request.localOnlyBaseUrl ? "base URL is local-only" : "",
    request.metadataOnlyIntention ? "metadata-only intention confirmed" : "",
    !request.promptPayloadAllowed ? "no prompt payload" : "",
    !request.workflowPayloadAllowed ? "no workflow payload" : "",
    !request.queueMutationAllowed ? "no queue mutation" : "",
    !request.fileWriteAllowed ? "no file write" : "",
    !request.apiCredentialSupplied ? "no API key" : "",
    !request.cloudUrlAllowed ? "no cloud URL" : "",
    request.approvalPosture === "approved-for-future-local-metadata-probe" ? "explicit approval recorded" : "",
    request.noAutoRunGuarantee ? "no-auto-run guarantee" : "",
  ].filter(Boolean);

  return {
    id: "comfyui-live-health-probe-readiness",
    checks,
    readyChecks,
    blockedChecks: policy.failures,
    reviewed: readyChecks.length > 0,
  };
}
