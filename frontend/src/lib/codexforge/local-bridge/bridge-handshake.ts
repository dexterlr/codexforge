import type {
  BridgeCapabilityFamily,
  BridgeHandshakePreview,
  BridgeHandshakeStep,
  BridgeHandshakeStepId,
} from "./bridge-types";

export function buildBridgeHandshakeStep(
  id: BridgeHandshakeStepId,
  detail?: string
): BridgeHandshakeStep {
  const labels: Record<BridgeHandshakeStepId, string> = {
    "inspect-adapter": "Inspect adapter",
    "check-consent-boundary": "Check consent boundary",
    "check-policy": "Check policy",
    "prepare-run-handoff": "Prepare run handoff",
    "await-explicit-approval": "Await explicit approval",
    "future-external-execution": "Future external execution",
  };
  const blocked = id === "future-external-execution";

  return {
    id,
    label: labels[id],
    status: blocked ? "blocked" : id === "await-explicit-approval" ? "guarded" : "ready",
    detail:
      detail ??
      (blocked
        ? "External execution remains blocked in Phase 9 preview."
        : "Preview check is deterministic and local-only."),
    safe: !blocked,
  };
}

export function buildBridgeHandshakePreview(
  adapterFamily: BridgeCapabilityFamily = "PC bridge"
): BridgeHandshakePreview {
  const steps = [
    buildBridgeHandshakeStep("inspect-adapter", "Read adapter metadata from the local manifest."),
    buildBridgeHandshakeStep("check-consent-boundary", "Confirm explicit session consent requirements."),
    buildBridgeHandshakeStep("check-policy", "Apply bridge policy before any handoff."),
    buildBridgeHandshakeStep("prepare-run-handoff", "Prepare an Operator Run Center preview payload."),
    buildBridgeHandshakeStep("await-explicit-approval", "Stop until future guarded approval is present."),
    buildBridgeHandshakeStep("future-external-execution"),
  ];

  return {
    id: `bridge-handshake:${adapterFamily.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    adapterFamily,
    mode: "preview-only",
    steps,
    blocked: steps.some((step) => step.status === "blocked"),
    summary: summarizeBridgeHandshakePreviewFromSteps(steps),
  };
}

function summarizeBridgeHandshakePreviewFromSteps(steps: BridgeHandshakeStep[]): string[] {
  return [
    `${steps.length} handshake steps prepared.`,
    "Adapter handshake preview opens no external connection.",
    "Future external execution is blocked.",
  ];
}

export function summarizeBridgeHandshakePreview(
  handshake: BridgeHandshakePreview = buildBridgeHandshakePreview()
): string[] {
  return [...handshake.summary];
}
