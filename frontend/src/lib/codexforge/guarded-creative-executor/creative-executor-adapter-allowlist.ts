import type {
  CreativeExecutorAdapterAllowlist,
  CreativeExecutorAdapterAllowlistItem,
  CreativeExecutorAllowedMode,
  CreativeExecutorKind,
} from "./guarded-creative-executor-types";

const DEFAULT_ITEMS: Array<{
  adapterId: string;
  executorKind: CreativeExecutorKind;
  label: string;
  allowedMode: CreativeExecutorAllowedMode;
  enabled: boolean;
  sideEffects: string[];
}> = [
  { adapterId: "blender-python-preview", executorKind: "blender", label: "Blender Python Preview", allowedMode: "preview-only", enabled: true, sideEffects: ["script preview only"] },
  { adapterId: "blender-render-job", executorKind: "blender", label: "Blender Render Job", allowedMode: "future-guarded", enabled: false, sideEffects: ["would launch Blender in future only", "would create render outputs in future only"] },
  { adapterId: "comfyui-workflow-preview", executorKind: "comfyui", label: "ComfyUI Workflow Preview", allowedMode: "preview-only", enabled: true, sideEffects: ["workflow manifest preview only"] },
  { adapterId: "comfyui-workflow-run", executorKind: "comfyui", label: "ComfyUI Workflow Run", allowedMode: "future-guarded", enabled: false, sideEffects: ["would contact local ComfyUI in future only", "would create image outputs in future only"] },
  { adapterId: "unreal-editor-command-preview", executorKind: "unreal", label: "Unreal Editor Command Preview", allowedMode: "preview-only", enabled: true, sideEffects: ["command text preview only"] },
  { adapterId: "unreal-sequencer-render", executorKind: "unreal", label: "Unreal Sequencer Render", allowedMode: "future-guarded", enabled: false, sideEffects: ["would launch Unreal in future only", "would render sequence in future only"] },
  { adapterId: "video-render-preview", executorKind: "ffmpeg", label: "Video Render Preview", allowedMode: "dry-run-only", enabled: true, sideEffects: ["queue preview only"] },
  { adapterId: "ffmpeg-render-preview", executorKind: "ffmpeg", label: "ffmpeg Render Preview", allowedMode: "dry-run-only", enabled: true, sideEffects: ["command plan preview only"] },
  { adapterId: "artifact-capture", executorKind: "artifact-capture", label: "Artifact Capture", allowedMode: "dry-run-only", enabled: true, sideEffects: ["capture plan only", "no file writes"] },
  { adapterId: "manual-export", executorKind: "manual-export", label: "Manual Export", allowedMode: "dry-run-only", enabled: true, sideEffects: ["operator manual step only"] },
];

export function buildCreativeExecutorAdapterAllowlistItem(
  input: Partial<CreativeExecutorAdapterAllowlistItem> & Pick<CreativeExecutorAdapterAllowlistItem, "adapterId">
): CreativeExecutorAdapterAllowlistItem {
  const definition = DEFAULT_ITEMS.find((item) => item.adapterId === input.adapterId);
  const allowedMode = input.allowedMode ?? definition?.allowedMode ?? "disabled";
  const enabled = input.enabled ?? definition?.enabled ?? false;

  return {
    adapterId: input.adapterId,
    executorKind: input.executorKind ?? definition?.executorKind ?? "unknown",
    label: input.label ?? definition?.label ?? input.adapterId,
    allowedMode,
    enabled,
    phaseStatus:
      input.phaseStatus ??
      (allowedMode === "future-guarded"
        ? "phase-67-future"
        : allowedMode === "disabled"
          ? "phase-67-disabled"
          : "phase-67-dry-run"),
    requiredApprovals: input.requiredApprovals ?? ["operator review", "dry-run first", "future executor approval"],
    requiredLocalBridgeHealth: input.requiredLocalBridgeHealth ?? "required before future execution; dry-run can proceed with explicit unknown health",
    requiredArtifactCapturePlan: input.requiredArtifactCapturePlan ?? "required before request-ready handoff",
    sideEffects: input.sideEffects ?? definition?.sideEffects ?? ["unknown side effects blocked"],
    blockedReasons:
      input.blockedReasons ??
      (enabled
        ? ["real execution disabled in Phase 67"]
        : ["adapter execution disabled by default in Phase 67", "future guarded executor required"]),
  };
}

export function buildCreativeExecutorAdapterAllowlist(
  items: CreativeExecutorAdapterAllowlistItem[] = DEFAULT_ITEMS.map((item) =>
    buildCreativeExecutorAdapterAllowlistItem({ adapterId: item.adapterId })
  )
): CreativeExecutorAdapterAllowlist {
  return {
    allowlistId: "creative-executor-adapter-allowlist-phase-67",
    items,
    summary: summarizeCreativeExecutorAdapterAllowlist({ items }),
  };
}

export function isCreativeExecutorAdapterAllowlisted(
  adapterId: string,
  allowlist: CreativeExecutorAdapterAllowlist = buildCreativeExecutorAdapterAllowlist()
): boolean {
  const item = allowlist.items.find((candidate) => candidate.adapterId === adapterId);
  return Boolean(item && item.enabled && item.allowedMode !== "disabled");
}

export function summarizeCreativeExecutorAdapterAllowlist(
  allowlist: Pick<CreativeExecutorAdapterAllowlist, "items">
): string[] {
  const enabled = allowlist.items.filter((item) => item.enabled).length;
  return [
    `${allowlist.items.length} adapters are defined for Phase 67.`,
    `${enabled} adapters are enabled for preview or dry-run only.`,
    "Real Blender, ComfyUI, Unreal, ffmpeg, and local renderer execution remains disabled by default.",
  ];
}
