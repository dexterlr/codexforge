import type {
  CreativeExecutorAdapterAllowlist,
  CreativeExecutorApprovalPacket,
  CreativeExecutorArtifactCapture,
  CreativeExecutorKillSwitchPlan,
  CreativeExecutorPolicy,
  CreativeExecutorRequest,
} from "./guarded-creative-executor-types";
import { buildCreativeExecutorAdapterAllowlist, isCreativeExecutorAdapterAllowlisted } from "./creative-executor-adapter-allowlist";
import { buildCreativeExecutorApprovalPacket, validateCreativeExecutorApprovalPacket } from "./creative-executor-approval";
import { buildCreativeExecutorRequest, validateCreativeExecutorRequest } from "./creative-executor-request";

export function buildCreativeExecutorPolicy(input: {
  request?: CreativeExecutorRequest;
  allowlist?: CreativeExecutorAdapterAllowlist;
  approval?: CreativeExecutorApprovalPacket;
  killSwitchPlan?: Pick<CreativeExecutorKillSwitchPlan, "ready"> | null;
  artifactCapture?: Pick<CreativeExecutorArtifactCapture, "ready"> | null;
  preflightPassed?: boolean;
} = {}): CreativeExecutorPolicy {
  const request = input.request ?? buildCreativeExecutorRequest();
  const allowlist = input.allowlist ?? buildCreativeExecutorAdapterAllowlist();
  const approval = input.approval ?? buildCreativeExecutorApprovalPacket(request);
  const requestValidation = validateCreativeExecutorRequest(request);
  const approvalValidation = validateCreativeExecutorApprovalPacket(approval);
  const adapterAllowlisted = isCreativeExecutorAdapterAllowlisted(request.adapterId, allowlist);
  const bridgeProfileSupplied = request.localBridgeProfileId.trim().length > 0;
  const killSwitchReady = input.killSwitchPlan?.ready === true;
  const artifactCaptureReady = input.artifactCapture?.ready === true;
  const structurallySafeDryRun =
    requestValidation.valid &&
    adapterAllowlisted &&
    bridgeProfileSupplied &&
    request.requestedMode !== "blocked";
  const requestReady =
    structurallySafeDryRun &&
    approvalValidation.valid &&
    killSwitchReady &&
    artifactCaptureReady &&
    input.preflightPassed === true;

  const blockedReasons = [
    ...requestValidation.blockedReasons,
    adapterAllowlisted ? "" : "adapter allowlisted required",
    bridgeProfileSupplied ? "" : "bridge profile required",
    approvalValidation.valid ? "" : "approval required for execution",
    killSwitchReady ? "" : "kill-switch plan required",
    artifactCaptureReady ? "" : "artifact capture plan required",
    input.preflightPassed ? "" : "preflight must pass",
    "real execution blocked by default in Phase 67",
    "Blender execution blocked by default",
    "ComfyUI execution blocked by default",
    "Unreal execution blocked by default",
    "ffmpeg execution blocked by default",
    "local renderer execution blocked by default",
    "artifact writes blocked from UI",
    "shell command execution blocked from UI",
    "external network calls blocked",
    "broker-execution blocked by policy text only",
    "operator review required",
  ].filter(Boolean);

  return {
    requestRequired: true,
    adapterAllowlistedRequired: true,
    bridgeProfileRequired: true,
    approvalRequiredForExecution: true,
    dryRunAllowed: structurallySafeDryRun,
    executionAllowed: false,
    requestReady,
    blockedReasons,
    warnings: [
      "Dry-run mode is allowed only when structurally safe.",
      "Future guarded executor handoff remains disabled until a later phase explicitly enables it.",
      "No file writes, renderer launches, endpoint calls, provider calls, or command execution occur here.",
    ],
    nextSafeAction: requestReady
      ? "Copy the future executor packet for operator review; execution remains disabled."
      : structurallySafeDryRun
        ? "Review approval, kill-switch, artifact capture, and preflight before request-ready handoff."
        : "Complete request metadata and adapter allowlist before dry-run.",
  };
}

export function isCreativeExecutorAllowed(policy: CreativeExecutorPolicy = buildCreativeExecutorPolicy()): boolean {
  return policy.executionAllowed === true;
}

export function summarizeCreativeExecutorPolicy(policy: CreativeExecutorPolicy = buildCreativeExecutorPolicy()): string[] {
  return [
    `Dry-run allowed: ${String(policy.dryRunAllowed)}.`,
    `Execution allowed: ${String(policy.executionAllowed)}.`,
    `Request ready: ${String(policy.requestReady)}.`,
    `${policy.blockedReasons.length} policy blockers are visible.`,
    policy.nextSafeAction,
  ];
}
