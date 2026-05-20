import type {
  CreativeExecutorAdapterAllowlist,
  CreativeExecutorApprovalPacket,
  CreativeExecutorArtifactCapture,
  CreativeExecutorKillSwitchPlan,
  CreativeExecutorPreflight,
  CreativeExecutorPreflightCheck,
  CreativeExecutorPreflightStatus,
  CreativeExecutorRequest,
} from "./guarded-creative-executor-types";
import { buildCreativeExecutorStableId } from "./guarded-creative-executor-types";
import { buildCreativeExecutorAdapterAllowlist, isCreativeExecutorAdapterAllowlisted } from "./creative-executor-adapter-allowlist";
import { buildCreativeExecutorApprovalPacket, validateCreativeExecutorApprovalPacket } from "./creative-executor-approval";
import { buildCreativeExecutorRequest, validateCreativeExecutorRequest } from "./creative-executor-request";

export function buildCreativeExecutorPreflightCheck(input: CreativeExecutorPreflightCheck): CreativeExecutorPreflightCheck {
  return input;
}

function rollupStatus(checks: CreativeExecutorPreflightCheck[]): CreativeExecutorPreflightStatus {
  if (checks.some((check) => check.status === "blocker")) return "blocker";
  if (checks.some((check) => check.status === "risk")) return "risk";
  if (checks.some((check) => check.status === "warning")) return "warning";
  if (checks.some((check) => check.status === "unknown")) return "unknown";
  return "pass";
}

export function buildCreativeExecutorPreflight(input: {
  request?: CreativeExecutorRequest;
  allowlist?: CreativeExecutorAdapterAllowlist;
  approval?: CreativeExecutorApprovalPacket;
  killSwitchPlan?: Pick<CreativeExecutorKillSwitchPlan, "ready"> | null;
  artifactCapture?: Pick<CreativeExecutorArtifactCapture, "ready"> | null;
  localAppAvailabilityKnown?: boolean;
} = {}): CreativeExecutorPreflight {
  const request = input.request ?? buildCreativeExecutorRequest();
  const allowlist = input.allowlist ?? buildCreativeExecutorAdapterAllowlist();
  const approval = input.approval ?? buildCreativeExecutorApprovalPacket(request);
  const requestValid = validateCreativeExecutorRequest(request).valid;
  const approvalValid = validateCreativeExecutorApprovalPacket(approval).valid;
  const adapterAllowlisted = isCreativeExecutorAdapterAllowlisted(request.adapterId, allowlist);
  const checks = [
    buildCreativeExecutorPreflightCheck({ checkId: "request-present", label: "request present", status: requestValid ? "pass" : "blocker", detail: "Executor request must be structurally valid." }),
    buildCreativeExecutorPreflightCheck({ checkId: "adapter-allowlisted", label: "adapter allowlisted", status: adapterAllowlisted ? "pass" : "blocker", detail: "Preflight checks adapter allowlisted before handoff." }),
    buildCreativeExecutorPreflightCheck({ checkId: "approval-packet-present", label: "approval packet present", status: approvalValid ? "pass" : "blocker", detail: "All acknowledgements are required for request-ready handoff." }),
    buildCreativeExecutorPreflightCheck({ checkId: "bridge-profile-supplied", label: "bridge profile supplied", status: request.localBridgeProfileId ? "pass" : "blocker", detail: "Local bridge profile id is required." }),
    buildCreativeExecutorPreflightCheck({ checkId: "artifact-capture-plan-supplied", label: "artifact capture plan supplied", status: input.artifactCapture?.ready ? "pass" : "blocker", detail: "Preflight checks artifact capture plan supplied." }),
    buildCreativeExecutorPreflightCheck({ checkId: "kill-switch-plan-supplied", label: "kill-switch plan supplied", status: input.killSwitchPlan?.ready ? "pass" : "blocker", detail: "Cancellation and failure policy must be visible." }),
    buildCreativeExecutorPreflightCheck({ checkId: "local-app-availability-known", label: "local app availability known or explicitly unknown", status: input.localAppAvailabilityKnown ? "pass" : "unknown", detail: "Unknown app health is allowed for dry-run but not future execution." }),
    buildCreativeExecutorPreflightCheck({ checkId: "output-boundary-visible", label: "output boundary visible", status: request.expectedOutputArtifacts.length > 0 ? "pass" : "blocker", detail: "Expected outputs must be visible before handoff." }),
    buildCreativeExecutorPreflightCheck({ checkId: "resource-risk-acknowledged", label: "resource risk acknowledged", status: approval.acknowledgedResourceTimeRisk ? "pass" : "blocker", detail: "Render resource/time risk must be acknowledged." }),
    buildCreativeExecutorPreflightCheck({ checkId: "no-direct-ui-command-execution", label: "no direct UI command execution", status: "pass", detail: "UI exposes copy-only controls and no execute buttons." }),
    buildCreativeExecutorPreflightCheck({ checkId: "no-direct-ui-file-writes", label: "no direct UI file writes", status: "pass", detail: "UI does not save or write artifact files." }),
    buildCreativeExecutorPreflightCheck({ checkId: "no-external-network", label: "no external network", status: "pass", detail: "Deterministic logic does not call remote services." }),
    buildCreativeExecutorPreflightCheck({ checkId: "no-secrets", label: "no secrets", status: "pass", detail: "No API keys or local secrets are required." }),
    buildCreativeExecutorPreflightCheck({ checkId: "latest-message-authority-preserved", label: "latest-message authority preserved", status: "pass", detail: request.latestMessageAuthorityReminder }),
  ];
  const status = rollupStatus(checks);

  return {
    preflightId: buildCreativeExecutorStableId("creative-executor-preflight", [request.requestId]),
    requestId: request.requestId,
    checks,
    status,
    passed: status === "pass",
    summary: summarizeCreativeExecutorPreflight({ checks, status, passed: status === "pass" }),
  };
}

export function summarizeCreativeExecutorPreflight(preflight: Pick<CreativeExecutorPreflight, "checks" | "status" | "passed">): string[] {
  return [
    `Preflight status: ${preflight.status}.`,
    `Passed: ${String(preflight.passed)}.`,
    `${preflight.checks.filter((check) => check.status === "blocker").length} blocker checks.`,
    "Preflight is policy/planning only and does not execute.",
  ];
}
