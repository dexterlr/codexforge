export type RealLocalComfyUiHealthProbeCheckId =
  | "local bridge availability"
  | "configured ComfyUI base URL policy"
  | "allowed host boundary"
  | "timeout and retry boundaries"
  | "health endpoint readiness"
  | "no cloud call"
  | "no secret exposure"
  | "approved local boundary";

export type RealLocalComfyUiHealthProbeCheckStatus =
  | "ready"
  | "needs-review"
  | "needs-approved-boundary"
  | "blocked";

export type RealLocalComfyUiHealthProbeStatus =
  | "readiness-only"
  | "handoff-ready-approved-boundary-required"
  | "blocked";

export type RealLocalComfyUiHealthProbeContract = {
  id: "real-local-comfyui-health-probe-contract";
  title: "Real local ComfyUI health probe";
  scopeLabel: "Localhost-only readiness check";
  localhostOnlyScope: true;
  allowedHosts: string[];
  configuredBaseUrlPolicy: string;
  timeoutBoundary: string;
  retryBoundary: string;
  healthEndpoint: string;
  arbitraryHostInputAllowed: false;
  uiFetchAllowed: false;
  cloudCallAllowed: false;
  secretsShown: false;
  queueSubmitAllowed: false;
};

export type RealLocalComfyUiHealthProbeCheck = {
  id: RealLocalComfyUiHealthProbeCheckId;
  status: RealLocalComfyUiHealthProbeCheckStatus;
  label: string;
  plainEnglish: string;
  blocksLiveProbe: boolean;
};

export type RealLocalComfyUiHealthProbeBoundary = {
  id: "real-local-comfyui-health-probe-boundary";
  liveProbeExecutedFromUi: false;
  existingHealthGateStatus: string;
  localBridgeFutureProbeReadiness: string;
  approvedLocalBoundaryRequired: true;
  nothingSubmittedYet: true;
  noCloudCalls: true;
  noSecretExposure: true;
  summary: string[];
};

export type RealLocalComfyUiHealthProbeHandoff = {
  id: "real-local-comfyui-health-probe-handoff";
  approvalCopy: string;
  nextStep: string;
  safetyNote: string;
};

export type RealLocalComfyUiHealthProbeSummary = {
  contract: RealLocalComfyUiHealthProbeContract;
  checks: RealLocalComfyUiHealthProbeCheck[];
  boundary: RealLocalComfyUiHealthProbeBoundary;
  handoff: RealLocalComfyUiHealthProbeHandoff;
  status: RealLocalComfyUiHealthProbeStatus;
  readyForLiveProbe: boolean;
  summary: string;
};

export function buildRealLocalComfyUiHealthProbeStableKey(
  ...parts: Array<string | number | null | undefined>
): string {
  return parts
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, "-")
    )
    .filter(Boolean)
    .join(":");
}
