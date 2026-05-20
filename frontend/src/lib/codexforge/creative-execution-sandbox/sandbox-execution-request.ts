import type {
  SandboxExecutionRequest,
  SandboxExecutorKind,
  SandboxMode,
  SandboxValidation,
} from "./creative-execution-sandbox-types";
import { buildCreativeExecutionSandboxStableId } from "./creative-execution-sandbox-types";

export function buildSandboxExecutionRequest(
  input: Partial<SandboxExecutionRequest> = {}
): SandboxExecutionRequest {
  const sourceExecutionPacketId = input.sourceExecutionPacketId ?? "video-render-execution-packet-preview";
  const executorKind = input.executorKind ?? "ffmpeg";
  const sandboxMode = input.sandboxMode ?? "full-sandbox";

  return {
    requestId:
      input.requestId ??
      buildCreativeExecutionSandboxStableId("creative-execution-sandbox-request", [
        sourceExecutionPacketId,
        executorKind,
        sandboxMode,
      ]),
    sourceExecutorRequestId: input.sourceExecutorRequestId ?? "creative-executor-request-video-render-preview",
    sourceExecutionPacketId,
    sourceRoute: input.sourceRoute ?? "/creative-executor",
    executorKind,
    adapterId: input.adapterId ?? "video-render-job-preview",
    sandboxMode,
    operatorIntent:
      input.operatorIntent ??
      "Simulate the creative executor lifecycle end-to-end with fake supplied outputs before any future guarded executor work.",
    suppliedFakeInputs: input.suppliedFakeInputs ?? [
      "fake timeline metadata",
      "fake queue position",
      "fake operator approval posture",
    ],
    expectedFakeOutputs: input.expectedFakeOutputs ?? [
      "image-placeholder",
      "video-placeholder",
      "render-log-placeholder",
      "metadata-placeholder",
    ],
    approvalPosture: input.approvalPosture ?? "approval-required",
    localBridgeHealthPosture: input.localBridgeHealthPosture ?? "preview-only",
    noRealExecutionGuarantee:
      input.noRealExecutionGuarantee ??
      "Creative Execution Sandbox is simulation-only: no real execution, no render execution, no command execution, no local HTTP calls, no provider API calls, no file writes, no artifact file creation, and no local process launch.",
    latestMessageAuthorityReminder:
      input.latestMessageAuthorityReminder ??
      "Preserve latest-message authority: the newest operator instruction controls this sandbox handoff.",
  };
}

export function validateSandboxExecutionRequest(request: SandboxExecutionRequest): SandboxValidation {
  const guarantee = request.noRealExecutionGuarantee.toLowerCase();
  const blockedReasons = [
    request.requestId ? "" : "request id required",
    request.sourceExecutorRequestId ? "" : "source executor request id required",
    request.sourceExecutionPacketId ? "" : "source execution packet id required",
    request.sourceRoute ? "" : "source route required",
    request.adapterId ? "" : "adapter id required",
    request.suppliedFakeInputs.length > 0 ? "" : "supplied fake inputs required",
    request.expectedFakeOutputs.length > 0 ? "" : "expected fake outputs required",
    guarantee.includes("no real execution") ? "" : "no real execution guarantee required",
    guarantee.includes("no file writes") ? "" : "no file writes guarantee required",
    guarantee.includes("no local http calls") ? "" : "no local HTTP calls guarantee required",
    request.latestMessageAuthorityReminder.toLowerCase().includes("latest-message authority")
      ? ""
      : "latest-message authority reminder required",
  ].filter(Boolean);

  const warnings = [
    request.localBridgeHealthPosture === "reviewed"
      ? ""
      : "Local Bridge Health is not marked reviewed; keep future executor work blocked.",
    request.approvalPosture === "approval-reviewed"
      ? ""
      : "Approval posture still requires review before any real executor phase.",
    request.executorKind === "unknown" ? "Unknown executor kind should remain blocked." : "",
  ].filter(Boolean);

  return { valid: blockedReasons.length === 0, blockedReasons, warnings };
}

export function summarizeSandboxExecutionRequest(request: SandboxExecutionRequest): string[] {
  return [
    `${request.requestId} simulates ${request.sourceExecutionPacketId} from ${request.sourceRoute}.`,
    `Executor kind: ${request.executorKind}; adapter: ${request.adapterId}; mode: ${request.sandboxMode}.`,
    `Supplied fake inputs: ${request.suppliedFakeInputs.join(", ")}.`,
    `Expected fake outputs: ${request.expectedFakeOutputs.join(", ")}.`,
    request.noRealExecutionGuarantee,
    request.latestMessageAuthorityReminder,
  ];
}

export function normalizeSandboxExecutorKind(kind: string | undefined): SandboxExecutorKind {
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

export function normalizeSandboxMode(mode: string | undefined): SandboxMode {
  if (
    mode === "dry-run-simulation" ||
    mode === "lifecycle-simulation" ||
    mode === "cancellation-simulation" ||
    mode === "artifact-capture-simulation" ||
    mode === "verification-simulation" ||
    mode === "full-sandbox"
  ) {
    return mode;
  }

  return "full-sandbox";
}
