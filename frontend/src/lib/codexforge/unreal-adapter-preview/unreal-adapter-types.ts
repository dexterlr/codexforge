export type UnrealProjectKind =
  | "cinematic-preview"
  | "playable-level-preview"
  | "architectural-visualization"
  | "product-showcase"
  | "virtual-production"
  | "technical-demo"
  | "environment-blockout"
  | "interaction-prototype"
  | "unknown";

export type UnrealLevelLayerKind =
  | "world"
  | "terrain"
  | "architecture"
  | "props"
  | "characters"
  | "lighting"
  | "cameras"
  | "sequencer"
  | "gameplay"
  | "ui"
  | "post-process"
  | "packaging";

export type UnrealRiskLevel = "low" | "medium" | "high" | "critical";

export type UnrealActorType =
  | "static-mesh-actor"
  | "skeletal-mesh-placeholder"
  | "camera-actor"
  | "cine-camera-actor"
  | "point-light"
  | "directional-light"
  | "sky-light"
  | "post-process-volume"
  | "trigger-volume"
  | "blueprint-actor-placeholder"
  | "niagara-placeholder"
  | "unknown";

export type UnrealAssetType =
  | "static-mesh"
  | "skeletal-mesh"
  | "material"
  | "texture"
  | "blueprint"
  | "level-sequence"
  | "niagara-system"
  | "sound"
  | "ui-widget"
  | "unknown";

export type UnrealBlueprintType =
  | "actor-blueprint"
  | "level-blueprint"
  | "widget-blueprint"
  | "animation-blueprint"
  | "blueprint-interface"
  | "function-library"
  | "unknown";

export type UnrealProjectInput = {
  projectInputId: string;
  sourceCreativePlanId: string;
  projectGoal: string;
  projectKind: UnrealProjectKind;
  levelIntent: string;
  cinematicIntent: string;
  targetPlatformLabel: string;
  visualStyle: string;
  worldEnvironmentHints: string[];
  actorHints: string[];
  assetHints: string[];
  materialHints: string[];
  blueprintHints: string[];
  sequencerCameraHints: string[];
  packagingBuildConstraints: string[];
  operatorConstraints: string[];
  noExecutionGuarantee: string;
};

export type UnrealProjectInputValidation = {
  valid: boolean;
  blockedReasons: string[];
  warnings: string[];
};

export type UnrealLevelLayer = {
  layerId: string;
  layer: UnrealLevelLayerKind;
  label: string;
  purpose: string;
  previewNotes: string[];
};

export type UnrealLevelModel = {
  levelId: string;
  projectKind: UnrealProjectKind;
  worldNotes: string[];
  levelLayers: UnrealLevelLayer[];
  actorGroups: string[];
  assetGroups: string[];
  materialGroups: string[];
  blueprintSystems: string[];
  sequencerCameraSetup: string[];
  buildPackageNotes: string[];
  expectedArtifacts: string[];
  riskLevel: UnrealRiskLevel;
  approvalRequired: boolean;
  previewOnlyPosture: string;
};

export type UnrealActorItem = {
  actorId: string;
  label: string;
  actorType: UnrealActorType;
  role: string;
  locationHint: string;
  rotationHint: string;
  scaleHint: string;
  materialId: string;
  blueprintSystemId: string;
  animationSequencerNote: string;
  riskNote: string;
};

export type UnrealActorPlan = {
  planId: string;
  sourceLevelId: string;
  items: UnrealActorItem[];
  summary: string[];
};

export type UnrealAssetItem = {
  assetId: string;
  label: string;
  assetType: UnrealAssetType;
  sourceHint: string;
  placeholderPath: string;
  required: boolean;
  importRequirementNote: string;
  licenseUserResponsibilityNote: string;
  missingAssetRisk: string;
  reviewAction: string;
};

export type UnrealAssetPlan = {
  planId: string;
  sourceLevelId: string;
  items: UnrealAssetItem[];
  summary: string[];
};

export type UnrealMaterialItem = {
  materialId: string;
  label: string;
  baseColorLabel: string;
  roughnessHint: string;
  metallicHint: string;
  emissiveHint: string;
  texturePlaceholders: string[];
  materialInstanceNote: string;
  usageNotes: string;
};

export type UnrealMaterialPlan = {
  planId: string;
  sourceLevelId: string;
  items: UnrealMaterialItem[];
  summary: string[];
};

export type UnrealBlueprintItem = {
  blueprintId: string;
  label: string;
  blueprintType: UnrealBlueprintType;
  purpose: string;
  actorTarget: string;
  eventGraphSummary: string;
  inputEvents: string[];
  outputActions: string[];
  variables: string[];
  safetyNote: string;
  implementationComplexity: "low" | "medium" | "high";
};

export type UnrealBlueprintPlan = {
  planId: string;
  sourceLevelId: string;
  items: UnrealBlueprintItem[];
  summary: string[];
};

export type UnrealSequencerShot = {
  shotId: string;
  label: string;
  cameraActor: string;
  targetActor: string;
  movement: string;
  durationEstimate: string;
  lensFocalHint: string;
  trackNotes: string[];
  transitionNote: string;
  renderNote: string;
};

export type UnrealSequencerPlan = {
  sequenceId: string;
  sequenceLabel: string;
  shotList: UnrealSequencerShot[];
  cameraCuts: string[];
  animationTracks: string[];
  audioPlaceholder: string;
  renderOutputPlaceholder: string;
  reviewNotes: string[];
};

export type UnrealBuildSettings = {
  settingsId: string;
  sourceLevelId: string;
  targetPlatformLabel: string;
  editorVersionPlaceholder: string;
  renderingPathHint: string;
  qualityPreset: string;
  resolutionLabel: string;
  frameRange: string;
  fps: number;
  packageBuildIntent: string;
  outputArtifactPlaceholder: string;
  riskNotes: string[];
  validationRecommendations: string[];
};

export type UnrealCommandSection = {
  sectionId: string;
  label: string;
  previewText: string;
};

export type UnrealCommandPreview = {
  previewId: string;
  sourceLevelId: string;
  sections: UnrealCommandSection[];
  previewText: string;
  safetySummary: string[];
};

export type UnrealAdapterSafetyPolicy = {
  policyId: string;
  previewAllowed: boolean;
  executionAllowed: boolean;
  requestReady: boolean;
  blockedReasons: string[];
  warnings: string[];
  nextSafeAction: string;
};

export type UnrealExecutionPacket = {
  packetId: string;
  sourceProjectInputId: string;
  bridgeProfileId: string;
  adapterId: string;
  commandPreviewId: string;
  expectedArtifacts: string[];
  assetPlan: UnrealAssetPlan;
  sequencerPlan: UnrealSequencerPlan;
  buildSettings: UnrealBuildSettings;
  approvalRequirement: string;
  safetyPolicy: UnrealAdapterSafetyPolicy;
  futureExecutorBoundary: string;
  validationRecommendations: string[];
  noExecutionGuarantee: string;
};

export type UnrealExecutionPacketValidation = {
  valid: boolean;
  blockedReasons: string[];
  warnings: string[];
};

export type UnrealAdapterSummary = {
  projectReady: boolean;
  actorCount: number;
  assetCount: number;
  materialCount: number;
  blueprintCount: number;
  sequencerShotCount: number;
  commandPreviewReady: boolean;
  policyPosture: string;
  executionBlockedCount: number;
  nextSafeAction: string;
};

export type UnrealAdapterPreviewModel = {
  projectInput: UnrealProjectInput;
  projectInputValidation: UnrealProjectInputValidation;
  levelModel: UnrealLevelModel;
  actorPlan: UnrealActorPlan;
  assetPlan: UnrealAssetPlan;
  materialPlan: UnrealMaterialPlan;
  blueprintPlan: UnrealBlueprintPlan;
  sequencerPlan: UnrealSequencerPlan;
  buildSettings: UnrealBuildSettings;
  commandPreview: UnrealCommandPreview;
  safetyPolicy: UnrealAdapterSafetyPolicy;
  executionPacket: UnrealExecutionPacket;
  executionPacketValidation: UnrealExecutionPacketValidation;
  summary: UnrealAdapterSummary;
};

export function buildUnrealAdapterStableId(prefix: string, parts: string[]): string {
  const source = parts.join("|").toLowerCase().trim();
  let hash = 0;
  for (let index = 0; index < source.length; index += 1) {
    hash = (hash * 33 + source.charCodeAt(index)) % 1000000007;
  }
  return `${prefix}-${hash.toString(36).padStart(6, "0")}`;
}

export function buildUnrealAdapterReactKey(prefix: string, value: string, index: number): string {
  return `${prefix}-${value.replace(/[^a-zA-Z0-9_-]+/g, "-").toLowerCase()}-${index}`;
}
