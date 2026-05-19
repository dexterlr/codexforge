import type { CreativeBridgeKind, CreativeBridgeProfile } from "./creative-local-bridge-types";

type ProfileInput = Partial<CreativeBridgeProfile> & {
  id: string;
  label: string;
  bridgeKind: CreativeBridgeKind;
};

export function buildCreativeBridgeProfile(input: ProfileInput): CreativeBridgeProfile {
  const status = input.status ?? "unknown";
  return {
    id: input.id,
    label: input.label,
    bridgeKind: input.bridgeKind,
    connectionMode: input.connectionMode ?? "planned",
    executableSourceHint: input.executableSourceHint ?? "Configured outside CodexForge UI.",
    endpointHint: input.endpointHint ?? "No endpoint probed by Phase 61.",
    secretStrategy: input.secretStrategy ?? "not-configured",
    privacyPosture: input.privacyPosture ?? "Local-first metadata only; no provider calls.",
    artifactOutputStrategy:
      input.artifactOutputStrategy ?? "Placeholder artifact paths only; UI performs no writes.",
    supportsQueue: input.supportsQueue ?? false,
    supportsPreview: input.supportsPreview ?? true,
    supportsDryRun: input.supportsDryRun ?? false,
    supportsCancellation: input.supportsCancellation ?? false,
    supportsHealthCheck: input.supportsHealthCheck ?? false,
    status,
    safetyNotes: input.safetyNotes ?? [
      "Metadata only.",
      "No process execution.",
      "No endpoint probing.",
      "No secrets stored.",
    ],
  };
}

export function buildDefaultCreativeBridgeProfiles(): CreativeBridgeProfile[] {
  return [
    buildCreativeBridgeProfile({
      id: "blender-local",
      label: "Blender Local",
      bridgeKind: "blender",
      connectionMode: "local-process",
      executableSourceHint: "Operator-configured Blender executable path.",
      status: "missing-local-app",
      supportsQueue: true,
      supportsDryRun: true,
      supportsCancellation: true,
      supportsHealthCheck: true,
    }),
    buildCreativeBridgeProfile({
      id: "comfyui-local",
      label: "ComfyUI Local",
      bridgeKind: "comfyui",
      connectionMode: "local-http",
      endpointHint: "Operator-configured local ComfyUI endpoint.",
      secretStrategy: "none",
      status: "missing-endpoint",
      supportsQueue: true,
      supportsDryRun: true,
      supportsCancellation: true,
      supportsHealthCheck: true,
    }),
    buildCreativeBridgeProfile({
      id: "unreal-local",
      label: "Unreal Local",
      bridgeKind: "unreal",
      connectionMode: "local-process",
      executableSourceHint: "Operator-configured Unreal Editor path.",
      status: "planned",
      supportsQueue: true,
      supportsDryRun: true,
      supportsCancellation: true,
    }),
    buildCreativeBridgeProfile({
      id: "video-render-local",
      label: "Video Render Local",
      bridgeKind: "video-render",
      connectionMode: "planned",
      status: "planned",
      supportsQueue: true,
      supportsDryRun: true,
    }),
    buildCreativeBridgeProfile({
      id: "image-generation-local",
      label: "Image Generation Local",
      bridgeKind: "image-generation",
      connectionMode: "planned",
      status: "planned",
      supportsDryRun: true,
    }),
    buildCreativeBridgeProfile({
      id: "audio-generation-local",
      label: "Audio Generation Local",
      bridgeKind: "audio-generation",
      connectionMode: "planned",
      status: "planned",
    }),
    buildCreativeBridgeProfile({
      id: "custom-local-service",
      label: "Custom Local Service",
      bridgeKind: "custom-local-service",
      connectionMode: "planned",
      endpointHint: "Operator-defined local endpoint; not probed.",
      status: "unknown",
    }),
    buildCreativeBridgeProfile({
      id: "manual-offline",
      label: "Manual / Offline",
      bridgeKind: "manual-offline",
      connectionMode: "manual",
      secretStrategy: "none",
      status: "ready",
      supportsQueue: false,
      supportsDryRun: true,
      supportsHealthCheck: false,
    }),
  ];
}

export function isCreativeBridgeProfileReady(profile: CreativeBridgeProfile): boolean {
  return profile.status === "ready" && profile.supportsPreview;
}

export function summarizeCreativeBridgeProfile(profile: CreativeBridgeProfile): string[] {
  return [
    `${profile.label} is ${profile.status}.`,
    `Connection mode: ${profile.connectionMode}.`,
    `Secret strategy: ${profile.secretStrategy}.`,
    profile.artifactOutputStrategy,
  ];
}
