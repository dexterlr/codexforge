import type { FutureHealthProbeSummary, HealthProbeAllowlist, HealthProbeApprovalPacket, HealthProbeExecutionBridge, HealthProbePolicy, HealthProbePreflight, HealthProbeReadinessUpdate, HealthProbeRequest, HealthProbeResult, HealthProbeTarget } from "./future-health-probe-types";

export function buildFutureHealthProbeSummary(args: {
  targets: HealthProbeTarget[];
  request: HealthProbeRequest;
  allowlist: HealthProbeAllowlist;
  approval: HealthProbeApprovalPacket;
  policy: HealthProbePolicy;
  preflight: HealthProbePreflight;
  executionBridge: HealthProbeExecutionBridge;
  result: HealthProbeResult;
  readinessUpdate: HealthProbeReadinessUpdate;
}): FutureHealthProbeSummary {
  const summary: FutureHealthProbeSummary = {
    id: "future-guarded-health-probe-summary",
    targetCount: args.targets.length,
    requestReady: args.request.valid && args.policy.requestReady,
    allowlistReady: args.allowlist.items.some((item) => item.enabled),
    approvalReady: args.approval.valid,
    policyPosture: args.policy.probeAllowed ? "metadata/manual allowed" : "blocked/manual-first",
    preflightStatus: args.preflight.status,
    executionBridgeStatus: args.executionBridge.status,
    suppliedResultCount: args.result.items.filter((item) => item.resultSource === "operator-supplied").length,
    readinessUpdateCount: args.readinessUpdate.items.length,
    nextSafeAction: args.policy.nextSafeAction,
    summary: [],
  };
  return { ...summary, summary: summarizeFutureHealthProbeSession(summary) };
}

export function summarizeFutureHealthProbeSession(summary: FutureHealthProbeSummary): string[] {
  return [
    `${summary.targetCount} targets; request ready: ${summary.requestReady}; allowlist ready: ${summary.allowlistReady}; approval ready: ${summary.approvalReady}.`,
    `Policy posture: ${summary.policyPosture}; preflight: ${summary.preflightStatus}; bridge: ${summary.executionBridgeStatus}.`,
    `${summary.suppliedResultCount} supplied results; ${summary.readinessUpdateCount} readiness updates. Next safe action: ${summary.nextSafeAction}`,
  ];
}
