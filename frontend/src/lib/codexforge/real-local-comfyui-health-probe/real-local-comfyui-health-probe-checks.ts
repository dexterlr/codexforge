import type {
  RealLocalComfyUiHealthProbeCheck,
  RealLocalComfyUiHealthProbeCheckId,
  RealLocalComfyUiHealthProbeCheckStatus,
  RealLocalComfyUiHealthProbeContract,
} from "./real-local-comfyui-health-probe-types";

const HEALTH_CHECK_COPY: Record<RealLocalComfyUiHealthProbeCheckId, string> = {
  "local bridge availability": "Local bridge availability is checked as readiness metadata before any local service contact.",
  "configured ComfyUI base URL policy": "The ComfyUI base URL policy is localhost-only and not treated as a secret.",
  "allowed host boundary": "Allowed host boundary is limited to localhost and loopback addresses, not arbitrary hostnames.",
  "timeout and retry boundaries": "Timeout and retry boundaries are explicit so a future probe cannot hang or retry forever.",
  "health endpoint readiness": "Health endpoint readiness is modeled, but the live probe is not executed from arbitrary UI yet.",
  "no cloud call": "No cloud calls are part of this readiness check.",
  "no secret exposure": "No secrets are shown, stored, or required for this local health check.",
  "approved local boundary": "Approved local boundary required before any real local probe can contact ComfyUI.",
};

export function buildRealLocalComfyUiHealthProbeContract(): RealLocalComfyUiHealthProbeContract {
  return {
    id: "real-local-comfyui-health-probe-contract",
    title: "Real local ComfyUI health probe",
    scopeLabel: "Localhost-only readiness check",
    localhostOnlyScope: true,
    allowedHosts: ["localhost", "127.0.0.1", "::1"],
    configuredBaseUrlPolicy: "Only an approved local bridge may resolve the configured ComfyUI base URL.",
    timeoutBoundary: "Future approved probe must use a short bounded timeout.",
    retryBoundary: "Future approved probe may use a small explicit retry count, never an unbounded loop.",
    healthEndpoint: "Readiness endpoint only; no prompt, workflow, queue, file, or cloud target.",
    arbitraryHostInputAllowed: false,
    uiFetchAllowed: false,
    cloudCallAllowed: false,
    secretsShown: false,
    queueSubmitAllowed: false,
  };
}

export function buildRealLocalComfyUiHealthProbeCheck(
  id: RealLocalComfyUiHealthProbeCheckId,
  status: RealLocalComfyUiHealthProbeCheckStatus = "ready"
): RealLocalComfyUiHealthProbeCheck {
  return {
    id,
    status,
    label: id,
    plainEnglish: HEALTH_CHECK_COPY[id],
    blocksLiveProbe: status === "blocked" || status === "needs-approved-boundary",
  };
}

export function buildRealLocalComfyUiHealthProbeChecks(args: {
  localBridgeFutureProbeReadiness: string;
}): RealLocalComfyUiHealthProbeCheck[] {
  return [
    buildRealLocalComfyUiHealthProbeCheck(
      "local bridge availability",
      args.localBridgeFutureProbeReadiness === "request-ready" ? "ready" : "needs-review"
    ),
    buildRealLocalComfyUiHealthProbeCheck("configured ComfyUI base URL policy"),
    buildRealLocalComfyUiHealthProbeCheck("allowed host boundary"),
    buildRealLocalComfyUiHealthProbeCheck("timeout and retry boundaries"),
    buildRealLocalComfyUiHealthProbeCheck("health endpoint readiness", "needs-approved-boundary"),
    buildRealLocalComfyUiHealthProbeCheck("no cloud call"),
    buildRealLocalComfyUiHealthProbeCheck("no secret exposure"),
    buildRealLocalComfyUiHealthProbeCheck("approved local boundary", "needs-approved-boundary"),
  ];
}
