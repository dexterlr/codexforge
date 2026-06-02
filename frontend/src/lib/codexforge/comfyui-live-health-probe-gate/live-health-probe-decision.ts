import type {
  LiveHealthProbeDecision,
  LiveHealthProbePolicy,
  LiveHealthProbeRequest,
} from "./comfyui-live-health-gate-types";

export function buildLiveHealthProbeDecision(
  request: LiveHealthProbeRequest,
  policy: LiveHealthProbePolicy
): LiveHealthProbeDecision {
  if (!request.baseUrl.trim()) {
    return {
      id: "comfyui-live-health-probe-decision",
      status: "blocked-missing-base-url",
      label: "Blocked: missing local URL",
      explanation: "A future probe cannot be reviewed until a local ComfyUI base URL is supplied.",
      futureProbeAllowed: false,
    };
  }

  if (!request.localOnlyBaseUrl || request.cloudUrlAllowed) {
    return {
      id: "comfyui-live-health-probe-decision",
      status: "blocked-nonlocal-url",
      label: "Blocked: nonlocal target",
      explanation: "Only localhost, 127.0.0.1, or private local addresses can be considered for a future health probe.",
      futureProbeAllowed: false,
    };
  }

  if (policy.allowed) {
    return {
      id: "comfyui-live-health-probe-decision",
      status: "ready-for-future-approved-probe",
      label: "Ready for future approved probe",
      explanation: "The request meets the local-only, metadata-only, no-auto-run policy. A later approved bridge would still do the actual check.",
      futureProbeAllowed: true,
    };
  }

  if (policy.failures.length === 1 && policy.failures[0] === "Explicit approval is still missing.") {
    return {
      id: "comfyui-live-health-probe-decision",
      status: "preview-only",
      label: "Preview only",
      explanation: "The target shape is safe to review, but no live probe is approved from this page.",
      futureProbeAllowed: false,
    };
  }

  return {
    id: "comfyui-live-health-probe-decision",
    status: policy.failures.length > 0 ? "blocked-policy" : "unknown",
    label: policy.failures.length > 0 ? "Blocked by policy" : "Unknown",
    explanation: policy.failures.length > 0 ? "One or more safety requirements are not met." : "The gate cannot make a confident decision yet.",
    futureProbeAllowed: false,
  };
}
