export * from "./future-health-probe-types";
export * from "./health-probe-target";
export * from "./health-probe-request";
export * from "./health-probe-allowlist";
export * from "./health-probe-approval";
export * from "./health-probe-policy";
export * from "./health-probe-preflight";
export * from "./health-probe-execution-bridge";
export * from "./health-probe-result";
export * from "./health-probe-readiness-update";
export * from "./future-health-probe-summary";

// index exports buildHealthProbeTarget buildDefaultHealthProbeTargets buildHealthProbeRequest
// validateHealthProbeRequest buildHealthProbeAllowlist buildHealthProbeAllowlistItem
// isHealthProbeAllowlisted buildHealthProbeApprovalPacket validateHealthProbeApprovalPacket
// buildHealthProbePolicy isHealthProbeAllowed buildHealthProbePreflight
// buildHealthProbePreflightCheck buildHealthProbeExecutionBridge executeHealthProbeRequest
// buildHealthProbeResult buildHealthProbeResultItem buildHealthProbeReadinessUpdate
// buildHealthProbeReadinessUpdateItem buildFutureHealthProbeSummary

import { buildHealthProbeAllowlist } from "./health-probe-allowlist";
import { buildHealthProbeApprovalPacket } from "./health-probe-approval";
import { buildHealthProbeExecutionBridge } from "./health-probe-execution-bridge";
import { buildHealthProbePolicy } from "./health-probe-policy";
import { buildHealthProbePreflight } from "./health-probe-preflight";
import { buildHealthProbeReadinessUpdate } from "./health-probe-readiness-update";
import { buildHealthProbeRequest } from "./health-probe-request";
import { buildHealthProbeResult } from "./health-probe-result";
import { buildDefaultHealthProbeTargets } from "./health-probe-target";
import { buildFutureHealthProbeSummary } from "./future-health-probe-summary";
import type { FutureHealthProbeModel } from "./future-health-probe-types";

export function buildFutureHealthProbeModel(): FutureHealthProbeModel {
  const targets = buildDefaultHealthProbeTargets();
  const request = buildHealthProbeRequest({ target: targets[0], requestedMode: "blocked" });
  const allowlist = buildHealthProbeAllowlist();
  const approval = buildHealthProbeApprovalPacket({ request });
  const policy = buildHealthProbePolicy({ request, allowlist, approval });
  const preflight = buildHealthProbePreflight({ request, allowlist, approval, policy });
  const executionBridge = buildHealthProbeExecutionBridge({ request, preflight });
  const result = buildHealthProbeResult(targets);
  const readinessUpdate = buildHealthProbeReadinessUpdate(result);
  const summary = buildFutureHealthProbeSummary({ targets, request, allowlist, approval, policy, preflight, executionBridge, result, readinessUpdate });
  return { targets, request, allowlist, approval, policy, preflight, executionBridge, result, readinessUpdate, summary };
}
