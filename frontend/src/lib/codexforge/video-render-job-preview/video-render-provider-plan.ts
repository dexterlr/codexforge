import type { VideoRenderProviderItem, VideoRenderProviderKind, VideoRenderProviderPlan, VideoRenderRiskLevel } from "./video-render-job-types";

type ProviderArgs = Partial<VideoRenderProviderItem> & {
  providerId: string;
  label: string;
  providerKind: VideoRenderProviderKind;
};

function defaultRoute(kind: VideoRenderProviderKind): string {
  if (kind === "blender") return "/blender";
  if (kind === "comfyui") return "/comfyui";
  if (kind === "unreal") return "/unreal";
  return "/video-render";
}

function defaultRisk(kind: VideoRenderProviderKind): VideoRenderRiskLevel {
  return kind === "ffmpeg" || kind === "local-renderer" ? "critical" : "high";
}

export function buildVideoRenderProviderItem(input: ProviderArgs): VideoRenderProviderItem {
  const blockedReasons =
    input.blockedReasons ??
    (input.providerKind === "manual-export"
      ? ["Manual export only; no UI execution."]
      : [`${input.label} execution blocked in Phase 66.`]);
  return {
    providerId: input.providerId,
    label: input.label,
    providerKind: input.providerKind,
    sourceRoute: input.sourceRoute ?? defaultRoute(input.providerKind),
    requiredAdapterPacket: input.requiredAdapterPacket ?? `${input.providerKind}-adapter-packet-placeholder`,
    expectedInput: input.expectedInput ?? "Render queue metadata and reviewed shot plan.",
    expectedOutput: input.expectedOutput ?? "Placeholder output artifact plan and metadata.",
    executionMode: input.executionMode ?? (input.providerKind === "manual-export" ? "manual-only" : "future-guarded"),
    localRequirement: input.localRequirement ?? "Operator configured local app; not checked by UI.",
    riskLevel: input.riskLevel ?? defaultRisk(input.providerKind),
    approvalRequired: input.approvalRequired ?? true,
    blockedReasons,
  };
}

export function buildVideoRenderProviderPlan(): VideoRenderProviderPlan {
  const providers = [
    buildVideoRenderProviderItem({ providerId: "provider-blender", label: "Blender animation preview", providerKind: "blender" }),
    buildVideoRenderProviderItem({ providerId: "provider-comfyui", label: "ComfyUI image sequence preview", providerKind: "comfyui" }),
    buildVideoRenderProviderItem({ providerId: "provider-unreal", label: "Unreal Sequencer preview", providerKind: "unreal" }),
    buildVideoRenderProviderItem({ providerId: "provider-ffmpeg", label: "ffmpeg assembly preview", providerKind: "ffmpeg", executionMode: "disabled", blockedReasons: ["ffmpeg execution blocked in Phase 66.", "Command preview is non-runnable by default."] }),
    buildVideoRenderProviderItem({ providerId: "provider-local-renderer", label: "Generic local renderer preview", providerKind: "local-renderer" }),
    buildVideoRenderProviderItem({ providerId: "provider-manual-export", label: "Manual export review", providerKind: "manual-export", approvalRequired: false }),
  ];
  const plan: VideoRenderProviderPlan = {
    providerPlanId: "video-render-provider-plan-phase-66",
    providers,
    summary: [],
  };
  return { ...plan, summary: summarizeVideoRenderProviderPlan(plan) };
}

export function summarizeVideoRenderProviderPlan(plan: VideoRenderProviderPlan): string[] {
  return [
    `${plan.providers.length} planned providers including blender, comfyui, unreal, ffmpeg as blocked/future provider, local-renderer, and manual-export.`,
    "All executable providers are preview-only, future-guarded, disabled, or manual-only.",
  ];
}
