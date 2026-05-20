import type { BridgeHealthPolicy, BridgeHealthProbeMode } from "./local-bridge-health-types";

export function buildBridgeHealthPolicy(): BridgeHealthPolicy {
  const blockedReasons = [
    "executable launch blocked by default",
    "local HTTP call blocked by default",
    "ffmpeg version command blocked by default",
    "Blender launch blocked",
    "ComfyUI HTTP request blocked",
    "Unreal launch blocked",
    "artifact directory write blocked",
    "command execution blocked from UI",
    "broker execution blocked",
  ];
  const warnings = [
    "approval required for any future probe",
    "explicit allowlist required for any future probe",
    "operator review required",
  ];
  return {
    id: "local-bridge-health-policy",
    previewAllowed: true,
    probeAllowed: false,
    requestReady: false,
    blockedReasons,
    warnings,
    nextSafeAction: "Use setup guide first; future guarded health probe requires approval and explicit allowlist.",
    rules: [
      "metadata-only health model allowed",
      "dry-run probe preview allowed",
      "safe metadata probe may be future-guarded",
      "executable launch blocked by default",
      "local HTTP call blocked by default in deterministic logic",
      "ffmpeg version command blocked by default from UI",
      "Blender launch blocked",
      "ComfyUI HTTP request blocked",
      "Unreal launch blocked",
      "artifact directory write blocked",
      "command execution blocked from UI",
      "broker execution blocked",
      "approval required for any future probe",
      "explicit allowlist required for any future probe",
      "operator review required",
    ],
  };
}

export function isBridgeHealthProbeAllowed(args: { mode?: BridgeHealthProbeMode; approved?: boolean; allowlisted?: boolean } = {}): boolean {
  return Boolean(args.approved && args.allowlisted && args.mode === "safe-metadata-only");
}

export function summarizeBridgeHealthPolicy(policy: BridgeHealthPolicy = buildBridgeHealthPolicy()): string[] {
  return [
    `Preview allowed: ${policy.previewAllowed}; probe allowed: ${policy.probeAllowed}.`,
    `${policy.blockedReasons.length} blocked reasons keep Phase 68 manual-only/future-guarded.`,
    policy.nextSafeAction,
  ];
}
