import type { HealthProbeExecutionBridge, HealthProbeExecutionStatus, HealthProbePreflight, HealthProbeRequest, HealthProbeResultItem } from "./future-health-probe-types";
import { buildHealthProbePreflight } from "./health-probe-preflight";
import { buildHealthProbeAllowlist } from "./health-probe-allowlist";
import { buildHealthProbeApprovalPacket } from "./health-probe-approval";
import { buildHealthProbeRequest } from "./health-probe-request";

export function buildHealthProbeExecutionBridge(args: {
  request?: HealthProbeRequest;
  preflight?: HealthProbePreflight;
  suppliedResultItem?: HealthProbeResultItem;
} = {}): HealthProbeExecutionBridge {
  const request = args.request ?? buildHealthProbeRequest();
  const preflight = args.preflight ?? buildHealthProbePreflight({ request, allowlist: buildHealthProbeAllowlist(), approval: buildHealthProbeApprovalPacket({ request }) });
  const status: HealthProbeExecutionStatus = args.suppliedResultItem
    ? "completed-supplied"
    : preflight.status === "blocker"
      ? "preflight-failed"
      : request.requestedMode === "manual-confirmation"
        ? "manual-only"
        : request.requestedMode === "request-ready"
          ? "request-ready"
          : "probe-disabled";
  const bridge: HealthProbeExecutionBridge = {
    id: "future-guarded-health-probe-execution-bridge",
    status,
    requestId: request.id,
    targetId: request.targetId,
    allowedToCallGuardedProbeApi: false,
    noExecutionOnRender: true,
    noExecutionOnModuleLoad: true,
    noCreativeJobs: true,
    noFileWrites: true,
    blockedReasons: [
      "Default implementation returns manual-only/request-ready/blocked by default",
      "No creative jobs",
      "No file writes",
      "No command execution",
      "No local HTTP calls",
      "No fabricated completed success",
    ],
    summary: [],
  };
  return { ...bridge, summary: summarizeHealthProbeExecutionBridge(bridge) };
}

export function executeHealthProbeRequest(args: {
  request?: HealthProbeRequest;
  preflight?: HealthProbePreflight;
  suppliedResultItem?: HealthProbeResultItem;
} = {}): HealthProbeExecutionBridge {
  return buildHealthProbeExecutionBridge(args);
}

export function summarizeHealthProbeExecutionBridge(bridge: HealthProbeExecutionBridge): string[] {
  return [
    `Execution bridge status: ${bridge.status}; guarded probe API allowed: ${bridge.allowedToCallGuardedProbeApi}.`,
    "The bridge is the only domain place that may later call a guarded probe API.",
    "Default bridge does not fabricate completed success and does not execute on render or module load.",
  ];
}
