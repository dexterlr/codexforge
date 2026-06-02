import type { LiveHealthProbePolicy, LiveHealthProbeRequest } from "./comfyui-live-health-gate-types";

export function isLocalComfyUiBaseUrl(baseUrl: string): boolean {
  if (!baseUrl.trim()) return false;

  try {
    const parsed = new URL(baseUrl);
    const host = parsed.hostname.toLowerCase();
    if (parsed.protocol !== "http:") return false;
    if (host === "localhost" || host === "127.0.0.1" || host === "::1" || host === "[::1]") return true;
    if (host.startsWith("10.") || host.startsWith("192.168.")) return true;
    const parts = host.split(".").map((part) => Number(part));
    return parts.length === 4 && parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31;
  } catch {
    return false;
  }
}

export function buildLiveHealthProbePolicy(request: LiveHealthProbeRequest): LiveHealthProbePolicy {
  const failures = [
    request.baseUrl.trim() ? "" : "Missing local ComfyUI base URL.",
    request.localOnlyBaseUrl ? "" : "Base URL must be localhost, 127.0.0.1, or a private local address.",
    request.promptPayloadAllowed ? "Prompt payloads are not allowed for health checks." : "",
    request.workflowPayloadAllowed ? "Workflow payloads are not allowed for health checks." : "",
    request.queueMutationAllowed ? "Queue mutation is not allowed for health checks." : "",
    request.fileWriteAllowed ? "File writes are not allowed for health checks." : "",
    request.apiCredentialSupplied ? "API keys or credentials are not allowed for health checks." : "",
    request.cloudUrlAllowed ? "Cloud URLs are not allowed for this gate." : "",
    request.metadataOnlyIntention ? "" : "The probe intention must be metadata-only.",
    request.noAutoRunGuarantee ? "" : "The gate must guarantee no automatic run.",
    request.approvalPosture === "approved-for-future-local-metadata-probe" ? "" : "Explicit approval is still missing.",
  ].filter(Boolean);

  return {
    id: "comfyui-live-health-probe-policy",
    requirements: [
      "local-only base URL",
      "no prompt payload",
      "no workflow payload",
      "no queue mutation",
      "no file write",
      "no API key",
      "no cloud URL",
      "explicit approval posture",
      "metadata-only intention",
      "no auto-run guarantee",
    ],
    failures,
    allRequirementsMet: failures.length === 0,
    allowed: failures.length === 0,
  };
}

export function isLiveHealthProbeAllowed(policy: LiveHealthProbePolicy): boolean {
  return policy.allowed;
}
