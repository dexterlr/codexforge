import type { LiveHealthProbeRequest } from "./comfyui-live-health-gate-types";
import { isLocalComfyUiBaseUrl } from "./live-health-probe-policy";

export function buildLiveHealthProbeRequest(input: Partial<LiveHealthProbeRequest> = {}): LiveHealthProbeRequest {
  const baseUrl = input.baseUrl ?? "http://127.0.0.1:8188";

  return {
    id: input.id ?? "comfyui-live-health-probe-request",
    baseUrl,
    localOnlyBaseUrl: input.localOnlyBaseUrl ?? isLocalComfyUiBaseUrl(baseUrl),
    promptPayloadAllowed: false,
    workflowPayloadAllowed: false,
    queueMutationAllowed: false,
    fileWriteAllowed: false,
    apiCredentialSupplied: false,
    cloudUrlAllowed: false,
    approvalPosture: input.approvalPosture ?? "not-approved",
    metadataOnlyIntention: true,
    noAutoRunGuarantee: true,
  };
}

export function buildDefaultLiveHealthProbeRequest(): LiveHealthProbeRequest {
  return buildLiveHealthProbeRequest();
}
