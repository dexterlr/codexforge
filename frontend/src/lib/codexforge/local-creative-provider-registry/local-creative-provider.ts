import type { LocalCreativeCapabilityId, LocalCreativeProvider, LocalCreativeProviderKindId } from "./local-creative-provider-types";
import { buildLocalCreativeCapability } from "./local-creative-capability";
import { buildLocalCreativeCostProfile } from "./local-creative-cost-profile";
import { buildLocalCreativeProviderKind } from "./local-creative-provider-kind";
import { buildLocalCreativeRoutingProfile } from "./local-creative-routing-profile";

type ProviderInput = {
  id: string;
  name: string;
  kind: LocalCreativeProviderKindId;
  capabilities: LocalCreativeCapabilityId[];
  recommendedFor: string[];
  setupRequired: string;
  safetyNote: string;
};

export function buildLocalCreativeProvider(input: ProviderInput): LocalCreativeProvider {
  return {
    id: input.id,
    name: input.name,
    kind: buildLocalCreativeProviderKind(input.kind),
    capabilities: input.capabilities.map(buildLocalCreativeCapability),
    costProfile: buildLocalCreativeCostProfile({
      id: `${input.id}-cost`,
      localFirstReason: "Use the workstation for drafts, private creative work, keyframes, and low-res video planning before paid cloud is considered.",
      cloudCreditPosture: "no-cloud-spend",
      operatorCost: "Uses local setup time, GPU time, electricity, and disk space; spends no cloud credits in this preview.",
    }),
    routingProfile: buildLocalCreativeRoutingProfile({
      id: `${input.id}-routing`,
      recommendedFor: input.recommendedFor,
      fallbackRule: "Cloud fallback is optional later and must stay manually reviewed.",
      approvalBoundary: "No creative job starts from this registry; approval and an executor boundary are required later.",
    }),
    localOnlyRecommended: true,
    setupRequired: input.setupRequired,
    safetyNote: input.safetyNote,
  };
}

export function buildDefaultLocalCreativeProviders(): LocalCreativeProvider[] {
  return [
    buildLocalCreativeProvider({ id: "comfyui-local-provider", name: "ComfyUI on this workstation", kind: "comfyui-local", capabilities: ["image-generation", "keyframe-generation", "video-draft", "storyboard-assets", "prompt-planning"], recommendedFor: ["private drafts", "local keyframes", "workflow experiments"], setupRequired: "Install ComfyUI manually and keep it local-only before any approved health check.", safetyNote: "No workflow is run and no prompt is sent from this screen." }),
    buildLocalCreativeProvider({ id: "automatic1111-local-provider", name: "AUTOMATIC1111 local image drafts", kind: "automatic1111-local", capabilities: ["image-generation", "image-upscale", "storyboard-assets"], recommendedFor: ["still image drafts", "visual exploration", "storyboard frames"], setupRequired: "Install and configure the local web UI manually.", safetyNote: "Registry only; no server call and no image generation." }),
    buildLocalCreativeProvider({ id: "forge-local-provider", name: "Forge local image workspace", kind: "forge-local", capabilities: ["image-generation", "image-upscale", "keyframe-generation"], recommendedFor: ["fast local image iteration", "keyframe tests"], setupRequired: "Install Forge locally and review its endpoint later.", safetyNote: "Endpoint checks remain blocked until an approved health boundary exists." }),
    buildLocalCreativeProvider({ id: "invoke-local-provider", name: "Invoke local creative workspace", kind: "invoke-local", capabilities: ["image-generation", "storyboard-assets", "artifact-gallery"], recommendedFor: ["asset review", "storyboard asset planning"], setupRequired: "Install Invoke locally and review artifact paths manually.", safetyNote: "No artifact files are created from this registry." }),
    buildLocalCreativeProvider({ id: "blender-local-provider", name: "Blender local scene renderer", kind: "blender-local", capabilities: ["storyboard-assets", "batch-render", "artifact-gallery"], recommendedFor: ["3D scene previews", "manual render planning"], setupRequired: "Install Blender and use the existing preview boundary before future execution.", safetyNote: "No Blender command is run from this screen." }),
    buildLocalCreativeProvider({ id: "ffmpeg-local-provider", name: "FFmpeg local video utility", kind: "ffmpeg-local", capabilities: ["video-upscale", "frame-interpolation", "batch-render", "artifact-gallery"], recommendedFor: ["video assembly planning", "conversion planning", "local draft processing"], setupRequired: "Install FFmpeg manually and keep execution behind a future approved runner.", safetyNote: "No video command or file write is performed." }),
    buildLocalCreativeProvider({ id: "manual-video-workflow-provider", name: "Manual local video workflow", kind: "manual-workflow", capabilities: ["video-draft", "prompt-planning", "batch-render"], recommendedFor: ["novice planning", "manual review", "cloud fallback decisions"], setupRequired: "Pick a workflow, review the job, and approve later before anything renders.", safetyNote: "Manual planning only; no auto-run and no cloud call." }),
  ];
}
