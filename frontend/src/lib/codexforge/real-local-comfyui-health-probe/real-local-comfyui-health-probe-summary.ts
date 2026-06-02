import { buildLiveHealthProbeSummary } from "@/lib/codexforge/comfyui-live-health-probe-gate";
import { buildLocalBridgeHealthModel } from "@/lib/codexforge/local-bridge-health";
import type {
  RealLocalComfyUiHealthProbeBoundary,
  RealLocalComfyUiHealthProbeHandoff,
  RealLocalComfyUiHealthProbeSummary,
} from "./real-local-comfyui-health-probe-types";
import {
  buildRealLocalComfyUiHealthProbeChecks,
  buildRealLocalComfyUiHealthProbeContract,
} from "./real-local-comfyui-health-probe-checks";

export function buildRealLocalComfyUiHealthProbeBoundary(args: {
  existingHealthGateStatus: string;
  localBridgeFutureProbeReadiness: string;
}): RealLocalComfyUiHealthProbeBoundary {
  return {
    id: "real-local-comfyui-health-probe-boundary",
    liveProbeExecutedFromUi: false,
    existingHealthGateStatus: args.existingHealthGateStatus,
    localBridgeFutureProbeReadiness: args.localBridgeFutureProbeReadiness,
    approvedLocalBoundaryRequired: true,
    nothingSubmittedYet: true,
    noCloudCalls: true,
    noSecretExposure: true,
    summary: [
      "Real local ComfyUI health probe is a readiness contract today.",
      "Localhost-only readiness check explains what a future approved local bridge may check.",
      "Nothing is submitted yet; no workflow, prompt, file, queue, or cloud call is made.",
      "Approved local boundary required before a live health endpoint is contacted.",
    ],
  };
}

export function buildRealLocalComfyUiHealthProbeHandoff(): RealLocalComfyUiHealthProbeHandoff {
  return {
    id: "real-local-comfyui-health-probe-handoff",
    approvalCopy:
      "Approve a localhost-only ComfyUI health probe through the approved local boundary only. No cloud calls, no secrets, no prompt payload, no workflow payload, and no queue submit.",
    nextStep: "Use the approved local bridge boundary before any real health endpoint contact.",
    safetyNote: "The UI presents readiness only and does not run a live probe from arbitrary UI.",
  };
}

export function summarizeRealLocalComfyUiHealthProbe(
  summary: RealLocalComfyUiHealthProbeSummary
): string {
  return `${summary.contract.title}: ${summary.contract.scopeLabel}. Status ${summary.status}; Nothing is submitted yet, No cloud calls, and Approved local boundary required.`;
}

export function buildRealLocalComfyUiHealthProbeSummary(): RealLocalComfyUiHealthProbeSummary {
  const existingGate = buildLiveHealthProbeSummary();
  const bridgeModel = buildLocalBridgeHealthModel();
  const contract = buildRealLocalComfyUiHealthProbeContract();
  const boundary = buildRealLocalComfyUiHealthProbeBoundary({
    existingHealthGateStatus: existingGate.decision.status,
    localBridgeFutureProbeReadiness: bridgeModel.summary.futureProbeReadiness,
  });
  const checks = buildRealLocalComfyUiHealthProbeChecks({
    localBridgeFutureProbeReadiness: bridgeModel.summary.futureProbeReadiness,
  });
  const blocked = checks.some((check) => check.status === "blocked");
  const approvedBoundaryNeeded = checks.some((check) => check.status === "needs-approved-boundary");
  const status = blocked
    ? "blocked"
    : approvedBoundaryNeeded
      ? "handoff-ready-approved-boundary-required"
      : "readiness-only";
  const summary: RealLocalComfyUiHealthProbeSummary = {
    contract,
    checks,
    boundary,
    handoff: buildRealLocalComfyUiHealthProbeHandoff(),
    status,
    readyForLiveProbe: status === "readiness-only",
    summary: "",
  };
  return { ...summary, summary: summarizeRealLocalComfyUiHealthProbe(summary) };
}
