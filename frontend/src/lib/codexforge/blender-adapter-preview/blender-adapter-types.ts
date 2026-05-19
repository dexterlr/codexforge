export type BlenderSceneKind =
  | "product-shot"
  | "environment"
  | "character-blockout"
  | "motion-graphics"
  | "abstract"
  | "architecture"
  | "cinematic"
  | "technical-diagram"
  | "unknown";

export type BlenderSceneLayerKind =
  | "world"
  | "environment"
  | "subject"
  | "props"
  | "lighting"
  | "camera"
  | "animation"
  | "render"
  | "annotations";

export type BlenderObjectType =
  | "cube"
  | "sphere"
  | "cylinder"
  | "plane"
  | "text"
  | "curve"
  | "camera-target"
  | "light-helper"
  | "imported-asset-placeholder"
  | "unknown";

export type BlenderLightType =
  | "studio-three-point"
  | "cinematic-key-fill-rim"
  | "soft-product"
  | "dramatic"
  | "environment-only"
  | "technical-flat";

export type BlenderRenderEnginePreference =
  | "eevee-next"
  | "cycles"
  | "workbench"
  | "preview";

export type BlenderRiskLevel = "low" | "medium" | "high" | "critical";

export type BlenderSceneInput = {
  sceneInputId: string;
  sourceCreativePlanId: string;
  sceneGoal: string;
  sceneKind: BlenderSceneKind;
  visualStyle: string;
  scale: string;
  environment: string;
  objectHints: string[];
  materialHints: string[];
  cameraHints: string[];
  lightingHints: string[];
  animationHints: string[];
  renderIntent: string;
  operatorConstraints: string[];
  noExecutionGuarantee: string;
};

export type BlenderSceneInputValidation = {
  valid: boolean;
  blockedReasons: string[];
  warnings: string[];
};

export type BlenderSceneLayer = {
  layerId: string;
  layer: BlenderSceneLayerKind;
  label: string;
  purpose: string;
  previewNotes: string[];
};

export type BlenderSceneModel = {
  sceneId: string;
  sceneKind: BlenderSceneKind;
  coordinateSystemNotes: string[];
  layers: BlenderSceneLayer[];
  objectGroups: string[];
  materialGroups: string[];
  lightingSetup: BlenderLightType;
  cameraSetup: string;
  animationBeats: string[];
  renderSettingsSummary: string[];
  expectedArtifacts: string[];
  riskLevel: BlenderRiskLevel;
  approvalRequired: boolean;
  previewOnlyPosture: string;
};

export type BlenderObjectItem = {
  objectId: string;
  label: string;
  objectType: BlenderObjectType;
  role: string;
  locationHint: string;
  rotationHint: string;
  scaleHint: string;
  materialId: string;
  animationNote: string;
  geometryNodeHint: string;
  riskNote: string;
};

export type BlenderObjectPlan = {
  planId: string;
  sourceSceneId: string;
  items: BlenderObjectItem[];
  summary: string[];
};

export type BlenderMaterialItem = {
  materialId: string;
  label: string;
  baseColorLabel: string;
  roughnessHint: string;
  metallicHint: string;
  emissionHint: string;
  transparencyHint: string;
  texturePlaceholder: string;
  usageNotes: string;
};

export type BlenderMaterialPlan = {
  planId: string;
  sourceSceneId: string;
  items: BlenderMaterialItem[];
  summary: string[];
};

export type BlenderLightItem = {
  lightId: string;
  label: string;
  lightType: BlenderLightType;
  intensityHint: string;
  locationHint: string;
  colorTemperatureHint: string;
  purpose: string;
  shadowNote: string;
};

export type BlenderLightingPlan = {
  planId: string;
  sourceSceneId: string;
  setup: BlenderLightType;
  items: BlenderLightItem[];
  summary: string[];
};

export type BlenderCameraShot = {
  shotId: string;
  label: string;
  cameraLocationHint: string;
  targetHint: string;
  focalLengthHint: string;
  movement: string;
  durationEstimate: string;
  framing: string;
  purpose: string;
};

export type BlenderCameraPlan = {
  planId: string;
  sourceSceneId: string;
  shots: BlenderCameraShot[];
  summary: string[];
};

export type BlenderRenderSettings = {
  settingsId: string;
  sourceSceneId: string;
  enginePreference: BlenderRenderEnginePreference;
  resolutionLabel: string;
  frameRange: string;
  fps: number;
  sampleHint: string;
  outputArtifactPlaceholder: string;
  transparentBackground: boolean;
  riskNotes: string[];
};

export type BlenderPythonSection = {
  sectionId: string;
  label: string;
  scriptText: string;
};

export type BlenderPythonPreview = {
  previewId: string;
  sourceSceneId: string;
  sections: BlenderPythonSection[];
  scriptText: string;
  safetySummary: string[];
};

export type BlenderAdapterSafetyPolicy = {
  policyId: string;
  previewAllowed: boolean;
  executionAllowed: boolean;
  requestReady: boolean;
  blockedReasons: string[];
  warnings: string[];
  nextSafeAction: string;
};

export type BlenderExecutionPacket = {
  packetId: string;
  sourceSceneInputId: string;
  bridgeProfileId: string;
  adapterId: string;
  scriptPreviewId: string;
  expectedArtifacts: string[];
  approvalRequirement: string;
  safetyPolicy: BlenderAdapterSafetyPolicy;
  futureExecutorBoundary: string;
  validationRecommendations: string[];
  noExecutionGuarantee: string;
};

export type BlenderExecutionPacketValidation = {
  valid: boolean;
  blockedReasons: string[];
  warnings: string[];
};

export type BlenderAdapterSummary = {
  sceneReady: boolean;
  objectCount: number;
  materialCount: number;
  lightCount: number;
  cameraShotCount: number;
  scriptPreviewReady: boolean;
  policyPosture: string;
  executionBlockedCount: number;
  nextSafeAction: string;
};

export type BlenderAdapterPreviewModel = {
  sceneInput: BlenderSceneInput;
  sceneInputValidation: BlenderSceneInputValidation;
  sceneModel: BlenderSceneModel;
  objectPlan: BlenderObjectPlan;
  materialPlan: BlenderMaterialPlan;
  lightingPlan: BlenderLightingPlan;
  cameraPlan: BlenderCameraPlan;
  renderSettings: BlenderRenderSettings;
  pythonPreview: BlenderPythonPreview;
  safetyPolicy: BlenderAdapterSafetyPolicy;
  executionPacket: BlenderExecutionPacket;
  executionPacketValidation: BlenderExecutionPacketValidation;
  summary: BlenderAdapterSummary;
};

export function buildBlenderAdapterStableId(prefix: string, parts: string[]): string {
  const source = parts.join("|").toLowerCase().trim();
  let hash = 0;
  for (let index = 0; index < source.length; index += 1) {
    hash = (hash * 31 + source.charCodeAt(index)) % 1000000007;
  }
  return `${prefix}-${hash.toString(36).padStart(6, "0")}`;
}

export function buildBlenderAdapterReactKey(prefix: string, value: string, index: number): string {
  return `${prefix}-${value.replace(/[^a-zA-Z0-9_-]+/g, "-").toLowerCase()}-${index}`;
}
