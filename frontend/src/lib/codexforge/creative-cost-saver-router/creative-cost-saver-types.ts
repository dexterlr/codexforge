export type CreativeCostTaskType =
  | "video idea planning"
  | "storyboard planning"
  | "keyframe planning"
  | "low-res local draft"
  | "local upscale"
  | "local interpolation"
  | "local final candidate"
  | "cloud final fallback"
  | "artifact review"
  | "retry/failure recovery";

export type CreativeCostRouteDecision =
  | "local-planning"
  | "local-draft"
  | "local-finish"
  | "cloud-fallback-later"
  | "blocked-needs-review"
  | "manual-only";

export type CreativeCostTask = {
  id: string;
  type: CreativeCostTaskType;
  label: string;
  plainEnglish: string;
  qualityGoal: string;
  localFirstStep: string;
  reviewRequired: true;
};

export type CreativeCostRoute = {
  id: string;
  taskId: string;
  decision: CreativeCostRouteDecision;
  whyThisRoute: string;
  nextStep: string;
  cloudPosture: string;
  manualGate: string;
};

export type CreativeCostEstimate = {
  id: string;
  taskId: string;
  localCostPosture: string;
  cloudCreditPosture: string;
  timePosture: string;
  confidence: "approximate";
  plainEnglish: string;
};

export type CreativeLocalFirstPolicy = {
  id: string;
  steps: string[];
  plainEnglish: string;
  approvalBoundary: string;
};

export type CreativeCloudFallbackPolicy = {
  id: string;
  allowedWhen: string[];
  blockedUntil: string;
  plainEnglish: string;
};

export type CreativeCostSaverHandoff = {
  id: string;
  copyLabel: string;
  nextStep: string;
  safetyNote: string;
};

export type CreativeCostSaverSummary = {
  tasks: CreativeCostTask[];
  routes: CreativeCostRoute[];
  estimates: CreativeCostEstimate[];
  localFirstPolicy: CreativeLocalFirstPolicy;
  cloudFallbackPolicy: CreativeCloudFallbackPolicy;
  handoff: CreativeCostSaverHandoff;
  summary: string;
};
