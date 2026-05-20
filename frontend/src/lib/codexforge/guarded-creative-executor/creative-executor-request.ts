import type {
  CreativeExecutorKind,
  CreativeExecutorRequest,
  CreativeExecutorRequestedMode,
  CreativeExecutorValidation,
} from "./guarded-creative-executor-types";
import { buildCreativeExecutorStableId } from "./guarded-creative-executor-types";

export function buildCreativeExecutorRequest(input: Partial<CreativeExecutorRequest> = {}): CreativeExecutorRequest {
  const sourcePacketId = input.sourcePacketId ?? "video-render-preview-packet";
  const adapterId = input.adapterId ?? "video-render-preview";
  const requestedMode = input.requestedMode ?? "dry-run";

  return {
    requestId:
      input.requestId ??
      buildCreativeExecutorStableId("creative-executor-request", [
        sourcePacketId,
        adapterId,
        requestedMode,
      ]),
    sourcePacketId,
    sourceRoute: input.sourceRoute ?? "/video-render",
    sourceAdapterKind: input.sourceAdapterKind ?? "video-render-job-preview",
    requestedExecutorKind: input.requestedExecutorKind ?? "ffmpeg",
    requestedMode,
    operatorIntent:
      input.operatorIntent ??
      "Prepare a dry-run-first creative execution packet for guarded future handoff.",
    expectedInputArtifacts: input.expectedInputArtifacts ?? ["timeline", "shot-plan", "approval-packet"],
    expectedOutputArtifacts: input.expectedOutputArtifacts ?? ["video", "render-log", "artifact-review-card"],
    localBridgeProfileId: input.localBridgeProfileId ?? "video-render-local",
    adapterId,
    policyPosture: input.policyPosture ?? "dry-run-first",
    noAutoExecutionGuarantee:
      input.noAutoExecutionGuarantee ??
      "Phase 67 is dry-run-first and request-ready only; no renderer, shell command, provider, endpoint, artifact write, or local app execution starts automatically.",
    latestMessageAuthorityReminder:
      input.latestMessageAuthorityReminder ??
      "Preserve latest-message authority: newest operator instruction controls the current handoff.",
  };
}

export function validateCreativeExecutorRequest(request: CreativeExecutorRequest): CreativeExecutorValidation {
  const blockedReasons = [
    request.requestId ? "" : "request id required",
    request.sourcePacketId ? "" : "source packet id required",
    request.sourceRoute ? "" : "source route required",
    request.adapterId ? "" : "adapter id required",
    request.localBridgeProfileId ? "" : "local bridge profile required",
    request.expectedInputArtifacts.length > 0 ? "" : "expected input artifacts required",
    request.expectedOutputArtifacts.length > 0 ? "" : "expected output artifacts required",
    request.noAutoExecutionGuarantee.toLowerCase().includes("no renderer") ? "" : "no-auto-execution guarantee required",
  ].filter(Boolean);
  const warnings = [
    request.requestedMode === "guarded-execution-future"
      ? "Future guarded execution remains disabled by Phase 67 policy."
      : "Dry-run/request-ready modes do not execute.",
    request.requestedExecutorKind === "unknown"
      ? "Unknown executor kind is treated as blocked."
      : "",
  ].filter(Boolean);

  return { valid: blockedReasons.length === 0, blockedReasons, warnings };
}

export function summarizeCreativeExecutorRequest(request: CreativeExecutorRequest): string[] {
  return [
    `${request.requestId} maps ${request.sourcePacketId} to ${request.adapterId}.`,
    `Executor kind: ${request.requestedExecutorKind}; mode: ${request.requestedMode}.`,
    `Inputs: ${request.expectedInputArtifacts.join(", ")}.`,
    `Outputs: ${request.expectedOutputArtifacts.join(", ")}.`,
    request.noAutoExecutionGuarantee,
    request.latestMessageAuthorityReminder,
  ];
}

export function normalizeCreativeExecutorKind(kind: string | undefined): CreativeExecutorKind {
  if (
    kind === "blender" ||
    kind === "comfyui" ||
    kind === "unreal" ||
    kind === "ffmpeg" ||
    kind === "local-renderer" ||
    kind === "artifact-capture" ||
    kind === "manual-export"
  ) {
    return kind;
  }

  return "unknown";
}

export function normalizeCreativeExecutorMode(mode: string | undefined): CreativeExecutorRequestedMode {
  if (
    mode === "dry-run" ||
    mode === "request-ready" ||
    mode === "guarded-execution-future" ||
    mode === "manual-only" ||
    mode === "blocked"
  ) {
    return mode;
  }

  return "blocked";
}
