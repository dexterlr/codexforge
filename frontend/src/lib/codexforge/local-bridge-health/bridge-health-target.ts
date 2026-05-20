import type { BridgeHealthTarget, BridgeHealthTargetId } from "./local-bridge-health-types";

const TARGETS: readonly BridgeHealthTarget[] = [
  {
    id: "blender-local",
    label: "Blender local",
    targetKind: "executable",
    sourceRoute: "/blender",
    expectedCapability: "Blender Adapter Preview v1",
    expectedLocalRequirement: "Operator supplied Blender executable path hint.",
    connectionMode: "local executable metadata",
    probeMode: "future-guarded",
    executionRisk: "high",
    healthStatus: "missing-config",
    setupStatus: "missing",
    nextSetupAction: "Install Blender and configure executable path hint; keep Python execution blocked.",
  },
  {
    id: "comfyui-local",
    label: "ComfyUI local",
    targetKind: "local-http",
    sourceRoute: "/comfyui",
    expectedCapability: "ComfyUI Adapter Preview v1",
    expectedLocalRequirement: "Operator supplied local endpoint hint.",
    connectionMode: "local HTTP metadata",
    probeMode: "future-guarded",
    executionRisk: "high",
    healthStatus: "missing-config",
    setupStatus: "missing",
    nextSetupAction: "Configure local endpoint hint; keep HTTP calls blocked until future guarded probe.",
  },
  {
    id: "unreal-local",
    label: "Unreal local",
    targetKind: "executable",
    sourceRoute: "/unreal",
    expectedCapability: "Unreal Adapter Preview v1",
    expectedLocalRequirement: "Operator supplied Unreal editor or project path hint.",
    connectionMode: "local executable metadata",
    probeMode: "future-guarded",
    executionRisk: "high",
    healthStatus: "missing-config",
    setupStatus: "missing",
    nextSetupAction: "Configure project/editor path hint; keep editor launch blocked.",
  },
  {
    id: "ffmpeg-local",
    label: "ffmpeg local",
    targetKind: "executable",
    sourceRoute: "/video-render",
    expectedCapability: "Video Render Job Preview v1",
    expectedLocalRequirement: "Operator supplied ffmpeg executable path hint.",
    connectionMode: "local executable metadata",
    probeMode: "future-guarded",
    executionRisk: "high",
    healthStatus: "missing-config",
    setupStatus: "missing",
    nextSetupAction: "Configure executable path hint; keep version command blocked until future guarded probe.",
  },
  {
    id: "artifact-output-root",
    label: "Artifact output root",
    targetKind: "local-directory",
    sourceRoute: "/artifacts/review",
    expectedCapability: "Artifact Workspace",
    expectedLocalRequirement: "Operator supplied artifact output boundary.",
    connectionMode: "directory boundary metadata",
    probeMode: "manual-only",
    executionRisk: "medium",
    healthStatus: "missing-config",
    setupStatus: "missing",
    nextSetupAction: "Configure artifact output boundary; no UI writes.",
  },
  {
    id: "local-renderer",
    label: "Local renderer",
    targetKind: "local-service",
    sourceRoute: "/creative-executor",
    expectedCapability: "Guarded Creative Executor",
    expectedLocalRequirement: "Future guarded renderer allowlist and approval packet.",
    connectionMode: "future guarded service metadata",
    probeMode: "disabled",
    executionRisk: "blocked",
    healthStatus: "blocked",
    setupStatus: "blocked",
    nextSetupAction: "Keep execution blocked until Local Bridge Health is configured and validated.",
  },
  {
    id: "custom-local-service",
    label: "Custom local service",
    targetKind: "unknown",
    sourceRoute: "/creative-bridge",
    expectedCapability: "Custom local bridge profile",
    expectedLocalRequirement: "Operator supplied allowlisted service profile.",
    connectionMode: "manual metadata",
    probeMode: "manual-only",
    executionRisk: "blocked",
    healthStatus: "manual-only",
    setupStatus: "manual-review",
    nextSetupAction: "Define service profile and explicit allowlist before any future probe.",
  },
  {
    id: "manual-export",
    label: "Manual export",
    targetKind: "manual",
    sourceRoute: "/creative-bridge",
    expectedCapability: "Manual artifact export",
    expectedLocalRequirement: "Operator confirms export path and review procedure.",
    connectionMode: "manual confirmation",
    probeMode: "manual-only",
    executionRisk: "low",
    healthStatus: "manual-only",
    setupStatus: "manual-review",
    nextSetupAction: "Use setup guide and manual confirmation; do not write artifact files from UI.",
  },
] as const;

export function buildBridgeHealthTarget(input: Partial<BridgeHealthTarget> & Pick<BridgeHealthTarget, "id" | "label">): BridgeHealthTarget {
  const definition = TARGETS.find((target) => target.id === input.id);
  return {
    targetKind: "unknown",
    sourceRoute: "/local-bridge-health",
    expectedCapability: "Local Bridge Health Check v1",
    expectedLocalRequirement: "Operator supplied local metadata.",
    connectionMode: "metadata-only",
    probeMode: "disabled",
    executionRisk: "blocked",
    healthStatus: "unknown",
    setupStatus: "unknown",
    nextSetupAction: "Review setup guide.",
    ...definition,
    ...input,
  };
}

export function buildDefaultBridgeHealthTargets(): BridgeHealthTarget[] {
  return TARGETS.map((target) => buildBridgeHealthTarget(target));
}

export function summarizeBridgeHealthTarget(target: BridgeHealthTarget): string[] {
  return [
    `${target.label}: ${target.healthStatus}.`,
    `Probe mode: ${target.probeMode}; execution risk: ${target.executionRisk}.`,
    target.nextSetupAction,
  ];
}

export function findBridgeHealthTarget(targets: BridgeHealthTarget[], id: BridgeHealthTargetId): BridgeHealthTarget | undefined {
  return targets.find((target) => target.id === id);
}
