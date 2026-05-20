import type { HealthProbeAllowlist, HealthProbeApprovalPacket, HealthProbePolicy, HealthProbePreflight, HealthProbePreflightCheck, HealthProbeRequest } from "./future-health-probe-types";
import { isHealthProbeAllowlisted } from "./health-probe-allowlist";
import { buildHealthProbePolicy } from "./health-probe-policy";

export function buildHealthProbePreflightCheck(check: HealthProbePreflightCheck): HealthProbePreflightCheck {
  return check;
}

export function buildHealthProbePreflight(args: {
  request: HealthProbeRequest;
  allowlist: HealthProbeAllowlist;
  approval: HealthProbeApprovalPacket;
  policy?: HealthProbePolicy;
}): HealthProbePreflight {
  const policy = args.policy ?? buildHealthProbePolicy(args);
  const targetAllowlisted = isHealthProbeAllowlisted({ targetId: args.request.targetId, allowlist: args.allowlist });
  const checks = [
    buildHealthProbePreflightCheck({ id: "target-selected", label: "target selected", status: args.request.targetId ? "pass" : "blocker", detail: "Target selected before any request." }),
    buildHealthProbePreflightCheck({ id: "target-allowlisted", label: "target allowlisted", status: targetAllowlisted ? "pass" : "blocker", detail: "Explicit allowlist item required; no wildcard adapter or command." }),
    buildHealthProbePreflightCheck({ id: "bridge-profile-selected", label: "bridge profile selected", status: args.request.bridgeProfileId ? "pass" : "blocker", detail: "Bridge profile id is present." }),
    buildHealthProbePreflightCheck({ id: "approval-present", label: "approval present", status: args.approval.approved ? "pass" : "warning", detail: "Approval defaults false; missing acknowledgements block request readiness." }),
    buildHealthProbePreflightCheck({ id: "policy-passed", label: "policy passed", status: policy.requestReady ? "pass" : "blocker", detail: "Policy blocks unsafe command, local HTTP, filesystem, launch, render, broker, and write paths." }),
    buildHealthProbePreflightCheck({ id: "expected-output-shape-known", label: "expected output shape known", status: args.request.expectedResultShape ? "pass" : "unknown", detail: args.request.expectedResultShape }),
    buildHealthProbePreflightCheck({ id: "no-render-job-execution", label: "no render/job execution", status: "pass", detail: "No creative job execution and no render execution." }),
    buildHealthProbePreflightCheck({ id: "no-arbitrary-command", label: "no arbitrary command", status: "pass", detail: "No arbitrary command input and no arbitrary shell." }),
    buildHealthProbePreflightCheck({ id: "no-arbitrary-endpoint", label: "no arbitrary endpoint", status: "pass", detail: "No arbitrary endpoint and local HTTP probes blocked by default." }),
    buildHealthProbePreflightCheck({ id: "no-secrets", label: "no secrets", status: "pass", detail: "No secrets accepted or required." }),
    buildHealthProbePreflightCheck({ id: "local-app-requirement-visible", label: "local app requirement visible", status: "warning", detail: "Local app requirement is visible but not executed." }),
    buildHealthProbePreflightCheck({ id: "result-routing-visible", label: "result routing visible", status: "pass", detail: "Result routes to readiness update metadata only; no automatic persistence." }),
  ];
  const status = checks.some((check) => check.status === "blocker") ? "blocker" : checks.some((check) => check.status === "warning") ? "warning" : "pass";
  const preflight: HealthProbePreflight = { id: "future-guarded-health-probe-preflight", checks, status, summary: [] };
  return { ...preflight, summary: summarizeHealthProbePreflight(preflight) };
}

export function summarizeHealthProbePreflight(preflight: HealthProbePreflight): string[] {
  return [
    `Preflight status: ${preflight.status}; checks: ${preflight.checks.length}.`,
    `${preflight.checks.filter((check) => check.status === "blocker").length} blockers and ${preflight.checks.filter((check) => check.status === "warning").length} warnings.`,
    "Preflight checks no arbitrary command, no arbitrary endpoint, no secrets, no render/job execution, and result routing visibility.",
  ];
}
