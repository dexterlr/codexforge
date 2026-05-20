import type { CreativeProductionPlan, RenderQueuePreview, RenderQueuePreviewItem } from "./creative-types";

export function summarizeRenderQueuePreview(queue: RenderQueuePreview): string {
  return `Render queue preview: ${queue.items.length} local-safe simulated item(s), preview-only, no render execution; review Video Render Job Preview at /video-render.`;
}

export function buildRenderQueuePreview(plan: CreativeProductionPlan): RenderQueuePreview {
  const common = {
    status: "preview-only",
    sideEffectSummary: "No renderer or creative application is launched; this is a local-safe simulated render-job marker.",
    approvalRequirement: "approval required before execution",
      localSafeSimulatedRenderJobMarker: "render-job:local-safe-simulated:preview-only",
      videoRenderJobPreviewRoute: "/video-render",
  } as const;

  const items = [
    {
      id: "render-queue:storyboard-preview",
      capability: "rendering",
      adapter: "local-safe-render-job",
      estimatedArtifactPathPlaceholder: "artifacts/codexforge/creative/storyboard-preview.mp4",
      ...common,
    },
    {
      id: "render-queue:blender-scene-preview",
      capability: "blender",
      adapter: "blender-python",
      estimatedArtifactPathPlaceholder: "artifacts/codexforge/creative/blender-scene-preview.png",
      ...common,
    },
    {
      id: "render-queue:comfyui-contact-sheet",
      capability: "comfyui",
      adapter: "comfyui-workflow-run",
      estimatedArtifactPathPlaceholder: "artifacts/codexforge/creative/comfyui-contact-sheet.png",
      ...common,
    },
    {
      id: "render-queue:unreal-cinematic-preview",
      capability: "unreal",
      adapter: "unreal-command-preview",
      estimatedArtifactPathPlaceholder: "artifacts/codexforge/creative/unreal-cinematic-preview.mp4",
      ...common,
    },
  ] satisfies RenderQueuePreviewItem[];

  const queue = {
    id: `${plan.id}:render-queue-preview`,
    items,
    summary: "",
  } satisfies RenderQueuePreview;

  return { ...queue, summary: summarizeRenderQueuePreview(queue) };
}
