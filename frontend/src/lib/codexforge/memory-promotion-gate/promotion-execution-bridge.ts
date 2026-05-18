import type {
  MemoryPromotionExecutionBridge,
  MemoryPromotionRequestPacket,
} from "./memory-promotion-gate-types";

const PHASE_45_BLOCKED_MESSAGE = "Phase 45 prepares the request; execution remains blocked until a guarded runtime event executor exists.";

export function buildMemoryPromotionExecutionBridge(request: MemoryPromotionRequestPacket): MemoryPromotionExecutionBridge {
  const blockedReasons = request.state === "request-ready" ? ["guarded runtime event executor missing"] : request.blockedReasons;
  const bridge: MemoryPromotionExecutionBridge = {
    id: `${request.id}:execution-bridge`,
    requestId: request.id,
    state: request.state === "request-ready" ? "request-ready" : "blocked",
    canExecuteInPhase45: false,
    resultContract: [
      "No auto-run.",
      "No appendEvent call from UI.",
      "No graph mutation from UI.",
      "Return blocked/request-ready/result contract only.",
    ],
    blockedReasons,
    message: PHASE_45_BLOCKED_MESSAGE,
    summary: [],
  };
  return { ...bridge, summary: summarizeMemoryPromotionExecutionBridge(bridge) };
}

export function executeApprovedMemoryPromotionRequest(request: MemoryPromotionRequestPacket): MemoryPromotionExecutionBridge {
  return buildMemoryPromotionExecutionBridge(request);
}

export function summarizeMemoryPromotionExecutionBridge(bridge: MemoryPromotionExecutionBridge): string[] {
  return [
    bridge.message,
    bridge.state === "request-ready" ? "Request is prepared for a future guarded executor." : `Bridge is blocked: ${bridge.blockedReasons.join(", ")}.`,
    "Execution bridge never auto-runs and never mutates Brain graph from UI.",
  ];
}
