import type {
  CreativeExecutorAdapterAllowlist,
  CreativeExecutorApprovalPacket,
  CreativeExecutorArtifactCapture,
  CreativeExecutorDryRun,
  CreativeExecutorKillSwitchPlan,
  CreativeExecutorPolicy,
  CreativeExecutorPreflight,
  CreativeExecutorResult,
  CreativeExecutorSummary,
  GuardedCreativeExecutorModel,
} from "./guarded-creative-executor-types";
import { buildCreativeExecutorAdapterAllowlist } from "./creative-executor-adapter-allowlist";
import { buildCreativeExecutorApprovalPacket, validateCreativeExecutorApprovalPacket } from "./creative-executor-approval";
import { buildCreativeExecutorArtifactCapture } from "./creative-executor-artifact-capture";
import { buildCreativeExecutorDryRun } from "./creative-executor-dry-run";
import { buildCreativeExecutorKillSwitchPlan } from "./creative-executor-kill-switch";
import { buildCreativeExecutorPolicy } from "./creative-executor-policy";
import { buildCreativeExecutorPreflight } from "./creative-executor-preflight";
import { buildCreativeExecutorRequest, validateCreativeExecutorRequest } from "./creative-executor-request";
import { buildCreativeExecutorResult } from "./creative-executor-result";

export function buildCreativeExecutorSummary(input: {
  allowlist: CreativeExecutorAdapterAllowlist;
  approval: CreativeExecutorApprovalPacket;
  policy: CreativeExecutorPolicy;
  preflight: CreativeExecutorPreflight;
  dryRun: CreativeExecutorDryRun;
  killSwitchPlan: CreativeExecutorKillSwitchPlan;
  artifactCapture: CreativeExecutorArtifactCapture;
  result: CreativeExecutorResult;
}): CreativeExecutorSummary {
  const approvalReady = validateCreativeExecutorApprovalPacket(input.approval).valid;
  const blockedCount =
    input.policy.blockedReasons.length +
    input.preflight.checks.filter((check) => check.status === "blocker").length +
    input.dryRun.items.filter((item) => item.blocked).length;

  return {
    requestReady: input.policy.requestReady,
    allowlistReady: input.allowlist.items.some((item) => item.enabled),
    approvalReady,
    policyPosture: input.policy.executionAllowed ? "request-ready" : "execution-disabled",
    preflightStatus: input.preflight.status,
    dryRunStatus: input.dryRun.status,
    killSwitchReadiness: input.killSwitchPlan.ready ? "ready" : "missing",
    artifactCaptureReadiness: input.artifactCapture.ready ? "ready" : "missing",
    executionStatus: input.result.status,
    blockedCount,
    nextSafeAction: input.policy.nextSafeAction,
  };
}

export function buildGuardedCreativeExecutorModel(): GuardedCreativeExecutorModel {
  const request = buildCreativeExecutorRequest();
  const requestValidation = validateCreativeExecutorRequest(request);
  const allowlist = buildCreativeExecutorAdapterAllowlist();
  const approvalPacket = buildCreativeExecutorApprovalPacket(request);
  const approvalValidation = validateCreativeExecutorApprovalPacket(approvalPacket);
  const killSwitchPlan = buildCreativeExecutorKillSwitchPlan(request);
  const artifactCapture = buildCreativeExecutorArtifactCapture(request);
  const preflight = buildCreativeExecutorPreflight({
    request,
    allowlist,
    approval: approvalPacket,
    killSwitchPlan,
    artifactCapture,
    localAppAvailabilityKnown: false,
  });
  const policy = buildCreativeExecutorPolicy({
    request,
    allowlist,
    approval: approvalPacket,
    killSwitchPlan,
    artifactCapture,
    preflightPassed: preflight.passed,
  });
  const dryRun = buildCreativeExecutorDryRun(request);
  const result = buildCreativeExecutorResult({ request, policy, preflight });
  const summary = buildCreativeExecutorSummary({
    allowlist,
    approval: approvalPacket,
    policy,
    preflight,
    dryRun,
    killSwitchPlan,
    artifactCapture,
    result,
  });

  return {
    request,
    requestValidation,
    allowlist,
    approvalPacket,
    approvalValidation,
    policy,
    preflight,
    dryRun,
    killSwitchPlan,
    artifactCapture,
    result,
    summary,
  };
}

export function summarizeCreativeExecutorSession(summary: CreativeExecutorSummary): string[] {
  return [
    `Request ready: ${String(summary.requestReady)}.`,
    `Allowlist ready: ${String(summary.allowlistReady)}.`,
    `Approval ready: ${String(summary.approvalReady)}.`,
    `Policy posture: ${summary.policyPosture}.`,
    `Preflight status: ${summary.preflightStatus}.`,
    `Dry-run status: ${summary.dryRunStatus}.`,
    `Kill-switch readiness: ${summary.killSwitchReadiness}.`,
    `Artifact capture readiness: ${summary.artifactCaptureReadiness}.`,
    `Execution status: ${summary.executionStatus}.`,
    `${summary.blockedCount} blockers remain visible.`,
    summary.nextSafeAction,
  ];
}
