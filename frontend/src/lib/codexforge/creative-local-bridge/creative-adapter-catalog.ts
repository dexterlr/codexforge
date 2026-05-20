import type {
  CreativeAdapterCatalogItem,
  CreativeAdapterExecutionMode,
  CreativeArtifactCaptureType,
  CreativeBridgeKind,
  CreativeRiskLevel,
} from "./creative-local-bridge-types";

type AdapterInput = {
  id: string;
  label: string;
  bridgeKind: CreativeBridgeKind;
  capability: string;
  executionMode?: CreativeAdapterExecutionMode;
  requiredInputs?: string[];
  expectedArtifacts?: CreativeArtifactCaptureType[];
  sideEffects?: string[];
  riskLevel?: CreativeRiskLevel;
  approvalRequired?: boolean;
  validationRecommendation?: string;
  outputRoute?: string;
};

export function buildCreativeAdapterCatalogItem(input: AdapterInput): CreativeAdapterCatalogItem {
  return {
    id: input.id,
    label: input.label,
    bridgeKind: input.bridgeKind,
    capability: input.capability,
    executionMode: input.executionMode ?? "preview-only",
    requiredInputs: input.requiredInputs ?? ["creative plan summary", "operator intent"],
    expectedArtifacts: input.expectedArtifacts ?? ["unknown"],
    sideEffects: input.sideEffects ?? ["Preview metadata only in Phase 61."],
    riskLevel: input.riskLevel ?? "medium",
    approvalRequired: input.approvalRequired ?? true,
    validationRecommendation:
      input.validationRecommendation ?? "Review adapter inputs and approval packet manually.",
    outputRoute: input.outputRoute ?? "/creative-bridge",
  };
}

export function buildCreativeAdapterCatalog(): CreativeAdapterCatalogItem[] {
  return [
    buildCreativeAdapterCatalogItem({
      id: "blender-python-preview",
      label: "Blender Adapter Preview v1",
      bridgeKind: "blender",
      capability: "scene script preview and future executor packet",
      expectedArtifacts: ["prompt", "scene-plan", "blender-python-preview", "blender-scene-plan"],
      sideEffects: ["No Blender execution.", "No render execution.", "No file writes."],
      riskLevel: "high",
      outputRoute: "/blender",
    }),
    buildCreativeAdapterCatalogItem({
      id: "blender-render-job",
      label: "Blender Render Job",
      bridgeKind: "blender",
      capability: "render job request",
      executionMode: "future-guarded",
      expectedArtifacts: ["image", "video", "render-log", "blender-file"],
      sideEffects: ["Render execution blocked in Phase 61."],
      riskLevel: "critical",
    }),
    buildCreativeAdapterCatalogItem({
      id: "comfyui-workflow-preview",
      label: "ComfyUI Workflow Preview",
      bridgeKind: "comfyui",
      capability: "workflow graph preview",
      expectedArtifacts: ["comfyui-workflow", "prompt", "image"],
      sideEffects: ["No ComfyUI execution.", "No endpoint call."],
      riskLevel: "high",
    }),
    buildCreativeAdapterCatalogItem({
      id: "comfyui-workflow-run",
      label: "ComfyUI Workflow Run",
      bridgeKind: "comfyui",
      capability: "workflow run request",
      executionMode: "future-guarded",
      expectedArtifacts: ["image", "render-log", "comfyui-workflow"],
      sideEffects: ["Workflow execution blocked in Phase 61."],
      riskLevel: "critical",
    }),
    buildCreativeAdapterCatalogItem({
      id: "unreal-editor-command-preview",
      label: "Unreal Adapter Preview v1",
      bridgeKind: "unreal",
      capability: "level model, actor/asset plan, Sequencer plan, command preview, and future executor packet",
      expectedArtifacts: ["unreal-sequence", "unreal-level-plan", "unreal-command-preview", "scene-plan"],
      sideEffects: ["No Unreal execution.", "No Unreal Editor launch.", "No render execution.", "No package/build.", "No file writes."],
      riskLevel: "high",
      outputRoute: "/unreal",
    }),
    buildCreativeAdapterCatalogItem({
      id: "unreal-sequencer-render",
      label: "Unreal Sequencer Render",
      bridgeKind: "unreal",
      capability: "sequencer render request",
      executionMode: "future-guarded",
      expectedArtifacts: ["video", "render-log", "unreal-sequence"],
      sideEffects: ["Video render execution blocked in Phase 61."],
      riskLevel: "critical",
    }),
    buildCreativeAdapterCatalogItem({
      id: "local-video-render-preview",
      label: "Video Render Job Preview v1",
      bridgeKind: "video-render",
      capability: "video render job preview, queue preview, artifact expectations, approval packet, and future executor handoff",
      expectedArtifacts: ["video", "image-sequence", "frame", "thumbnail", "render-log"],
      sideEffects: ["No render execution.", "No command execution.", "No ffmpeg execution.", "No file writes."],
      riskLevel: "high",
      outputRoute: "/video-render",
    }),
    buildCreativeAdapterCatalogItem({
      id: "image-generation-preview",
      label: "Image Generation Preview",
      bridgeKind: "image-generation",
      capability: "local image request preview",
      expectedArtifacts: ["image", "prompt"],
      riskLevel: "high",
    }),
    buildCreativeAdapterCatalogItem({
      id: "artifact-capture",
      label: "Artifact Capture",
      bridgeKind: "manual-offline",
      capability: "artifact capture planning",
      expectedArtifacts: ["image", "video", "render-log", "unknown"],
      riskLevel: "medium",
    }),
    buildCreativeAdapterCatalogItem({
      id: "manual-export",
      label: "Manual Export",
      bridgeKind: "manual-offline",
      capability: "manual export checklist",
      executionMode: "preview-only",
      expectedArtifacts: ["prompt", "scene-plan", "unknown"],
      riskLevel: "low",
      approvalRequired: false,
    }),
  ];
}

export function findCreativeAdaptersForPlan(
  medium: string,
  adapters: CreativeAdapterCatalogItem[] = buildCreativeAdapterCatalog()
): CreativeAdapterCatalogItem[] {
  const normalized = medium.toLowerCase();
  return adapters.filter((adapter) => normalized.includes(adapter.bridgeKind.split("-")[0]));
}

export function summarizeCreativeAdapterCatalog(
  adapters: CreativeAdapterCatalogItem[] = buildCreativeAdapterCatalog()
): string[] {
  const blocked = adapters.filter((adapter) => adapter.executionMode !== "preview-only").length;
  return [
    `${adapters.length} creative adapters cataloged.`,
    `${blocked} adapters require future guarded execution; adapter catalog mentions Guarded Creative Executor for future handoff.`,
    "All Phase 61 adapter outputs are preview-only metadata or copyable handoff text.",
  ];
}
