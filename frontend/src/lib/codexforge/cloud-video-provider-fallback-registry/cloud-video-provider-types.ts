export type CloudVideoProviderKindId =
  | "runway"
  | "pika"
  | "replicate"
  | "luma"
  | "kling"
  | "veo"
  | "sora-manual"
  | "custom-http-video"
  | "manual-cloud-provider"
  | "unknown";

export type CloudVideoCapabilityId =
  | "text-to-video"
  | "image-to-video"
  | "keyframe-to-video"
  | "upscale"
  | "extend video"
  | "lip sync"
  | "final render"
  | "cloud-only feature"
  | "manual browser workflow";

export type CloudVideoCostRiskId =
  | "unknown"
  | "low"
  | "medium"
  | "high"
  | "credit-based"
  | "subscription-limited"
  | "manual-only";

export type CloudVideoProviderKind = {
  id: CloudVideoProviderKindId;
  label: string;
  plainEnglish: string;
  activeIntegration: false;
  manualFallbackOnly: true;
};

export type CloudVideoCapability = {
  id: string;
  capability: CloudVideoCapabilityId;
  label: string;
  plainEnglish: string;
  localFirstCheck: string;
};

export type CloudVideoCostRisk = {
  id: string;
  risk: CloudVideoCostRiskId;
  label: string;
  plainEnglish: string;
  budgetNote: string;
};

export type CloudVideoFallbackPolicy = {
  id: string;
  allowedWhen: string[];
  blockedUntil: string;
  plainEnglish: string;
  noAutoSubmitGuarantee: true;
};

export type CloudVideoProviderHandoff = {
  id: string;
  copyLabel: string;
  packet: string[];
  safetyNote: string;
};

export type CloudVideoProvider = {
  id: string;
  name: string;
  kind: CloudVideoProviderKind;
  capabilities: CloudVideoCapability[];
  costRisk: CloudVideoCostRisk;
  fallbackPolicy: CloudVideoFallbackPolicy;
  handoff: CloudVideoProviderHandoff;
  optionalFallbackOnly: true;
  noApiIntegration: true;
};

export type CloudVideoProviderSummary = {
  providers: CloudVideoProvider[];
  providerCount: number;
  reviewedFallbackCount: number;
  highRiskCount: number;
  recommendedFirstStep: string;
  summary: string;
};
