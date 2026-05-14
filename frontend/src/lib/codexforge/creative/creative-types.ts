export type CreativeMedium =
  | "video"
  | "image"
  | "blender-scene"
  | "comfyui-workflow"
  | "unreal-cinematic"
  | "mixed-production";

export type CreativeIntent =
  | "video"
  | "image"
  | "blender-scene"
  | "comfyui-workflow"
  | "unreal-level-cinematic"
  | "mixed-production";

export type CreativeProductionStageId =
  | "brief"
  | "storyboard"
  | "asset-plan"
  | "scene-workflow-level-plan"
  | "render-queue-preview"
  | "patch-preview-handoff"
  | "approval-boundary"
  | "future-guarded-adapter";

export type CreativePreviewStatus =
  | "preview-only"
  | "planned"
  | "approval-required"
  | "blocked-until-approval";

export type CreativeAdapterName =
  | "blender-python"
  | "comfyui-workflow-run"
  | "unreal-editor-command"
  | "local-safe-render-job"
  | "safe-patch-preview";

export type CreativeBriefInput = {
  title?: string;
  prompt?: string;
  mediumHint?: CreativeMedium;
  audience?: string;
  style?: string;
  constraints?: string[];
  references?: string[];
};

export type CreativeBrief = {
  id: string;
  title: string;
  prompt: string;
  intent: CreativeIntent;
  medium: CreativeMedium;
  audience: string;
  style: string;
  constraints: string[];
  references: string[];
  summary: string;
};

export type CreativeProductionStage = {
  id: CreativeProductionStageId;
  label: string;
  status: CreativePreviewStatus;
  summary: string;
  outputs: string[];
  approvalGate: string;
};

export type CreativeProductionPlan = {
  id: string;
  goal: string;
  medium: CreativeMedium;
  stages: CreativeProductionStage[];
  risks: string[];
  assets: string[];
  adapters: CreativeAdapterName[];
  approvalGates: string[];
  expectedArtifacts: string[];
  safeNextAction: string;
  summary: string;
};

export type StoryboardShot = {
  id: string;
  shotNumber: number;
  camera: string;
  movement: string;
  visualDescription: string;
  promptHint: string;
  durationEstimate: string;
  assetNeeds: string[];
  safetyNotes: string[];
};

export type Storyboard = {
  id: string;
  title: string;
  shots: StoryboardShot[];
  summary: string;
};

export type BlenderScenePlan = {
  id: string;
  adapter: "blender-python";
  approvalRequired: true;
  sceneObjects: string[];
  materials: string[];
  lighting: string[];
  camera: string[];
  animationBeats: string[];
  geometryNodeHints: string[];
  renderSettingsPreview: string[];
  summary: string;
};

export type ComfyUIWorkflowPlan = {
  id: string;
  adapter: "comfyui-workflow-run";
  approvalRequired: true;
  promptNodes: string[];
  modelCheckpointPlaceholder: string;
  samplerPlaceholder: string;
  seedPolicy: string;
  inputAssets: string[];
  outputAssets: string[];
  workflowRisks: string[];
  summary: string;
};

export type UnrealLevelPlan = {
  id: string;
  adapter: "unreal-editor-command";
  approvalRequired: true;
  levelIntent: string;
  actorsAssets: string[];
  blueprintScriptHints: string[];
  sequencerCameraBeats: string[];
  packagingBuildWarning: string;
  summary: string;
};

export type RenderQueuePreviewItem = {
  id: string;
  capability: "rendering" | "blender" | "comfyui" | "unreal";
  adapter: CreativeAdapterName;
  status: "preview-only";
  sideEffectSummary: string;
  approvalRequirement: string;
  estimatedArtifactPathPlaceholder: string;
  localSafeSimulatedRenderJobMarker: string;
};

export type RenderQueuePreview = {
  id: string;
  items: RenderQueuePreviewItem[];
  summary: string;
};

export type CreativeArtifact = {
  artifactId: string;
  type:
    | "storyboard-markdown-preview"
    | "blender-python-preview"
    | "comfyui-workflow-json-preview"
    | "unreal-editor-command-preview"
    | "render-queue-manifest-preview"
    | "artifact-ledger-update-preview";
  label: string;
  status: CreativePreviewStatus;
  sourceStage: CreativeProductionStageId;
  placeholderOutputPath: string;
  safetyNote: string;
  reviewAction: string;
};

export type CreativeArtifactGallery = {
  id: string;
  artifacts: CreativeArtifact[];
  summary: string;
};

export type CreativeSideEffectRisk = "none" | "local-app-control" | "local-file-write-preview" | "mixed-approval-required";

export type CreativeApprovalBoundary = {
  id: string;
  required: true;
  risk: CreativeSideEffectRisk;
  rules: string[];
  allowedNow: string[];
  blockedUntilApproval: string[];
  summary: string;
};

export type CreativePatchHandoffItem = {
  id: string;
  label: string;
  previewType: CreativeArtifact["type"];
  prompt: string;
  approvalBoundary: string;
};

export type CreativePatchHandoff = {
  id: string;
  items: CreativePatchHandoffItem[];
  safePatchPreviewBoundary: string;
  summary: string;
};

export type CreativeContext = {
  brief: CreativeBrief;
  productionPlan: CreativeProductionPlan;
  storyboard: Storyboard;
  blenderScenePlan: BlenderScenePlan;
  comfyuiWorkflowPlan: ComfyUIWorkflowPlan;
  unrealLevelPlan: UnrealLevelPlan;
  renderQueuePreview: RenderQueuePreview;
  artifactGallery: CreativeArtifactGallery;
  approvalBoundary: CreativeApprovalBoundary;
  patchHandoff: CreativePatchHandoff;
};

export function buildCreativeReactKey(
  scope: string,
  parts: readonly unknown[],
  index: number
): string {
  const stableParts = parts
    .map((part) => {
      if (typeof part === "string" || typeof part === "number" || typeof part === "boolean") {
        return String(part);
      }

      return "";
    })
    .map((part) => part.trim().toLowerCase().replace(/[^a-z0-9_.:/-]+/g, "-"))
    .filter(Boolean);

  return [scope, ...stableParts, String(index)].join(":");
}
