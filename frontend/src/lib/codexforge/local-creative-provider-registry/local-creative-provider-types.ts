export type LocalCreativeProviderKindId =
  | "comfyui-local"
  | "automatic1111-local"
  | "forge-local"
  | "invoke-local"
  | "blender-local"
  | "ffmpeg-local"
  | "local-upscaler"
  | "local-interpolator"
  | "custom-local-http"
  | "manual-workflow";

export type LocalCreativeCapabilityId =
  | "image-generation"
  | "image-upscale"
  | "video-draft"
  | "video-upscale"
  | "frame-interpolation"
  | "keyframe-generation"
  | "storyboard-assets"
  | "prompt-planning"
  | "batch-render"
  | "artifact-gallery";

export type LocalCreativeProviderKind = {
  id: LocalCreativeProviderKindId;
  label: string;
  plainEnglish: string;
  setupStatus: "manual-setup-required" | "planned-local-tool" | "catalog-only";
};

export type LocalCreativeCapability = {
  id: LocalCreativeCapabilityId;
  label: string;
  noviceMeaning: string;
  previewOnly: boolean;
};

export type LocalCreativeCostProfile = {
  id: string;
  localFirstReason: string;
  cloudCreditPosture: "no-cloud-spend" | "cloud-fallback-later";
  operatorCost: string;
};

export type LocalCreativeRoutingProfile = {
  id: string;
  recommendedFor: string[];
  fallbackRule: string;
  approvalBoundary: string;
};

export type LocalCreativeProvider = {
  id: string;
  name: string;
  kind: LocalCreativeProviderKind;
  capabilities: LocalCreativeCapability[];
  costProfile: LocalCreativeCostProfile;
  routingProfile: LocalCreativeRoutingProfile;
  localOnlyRecommended: boolean;
  setupRequired: string;
  safetyNote: string;
};

export type LocalCreativeProviderSummary = {
  providers: LocalCreativeProvider[];
  providerCount: number;
  localFirstCount: number;
  capabilities: string[];
  summary: string;
  nextAction: string;
};
