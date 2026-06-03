export type LmStudioRuntimeReadiness = "manual-ready" | "approved-boundary-required" | "blocked";

export type LmStudioRuntimePlan = {
  id: string;
  runtimeEndpointPolicy: string;
  modelSelectionReadiness: LmStudioRuntimeReadiness;
  localServerReadiness: LmStudioRuntimeReadiness;
  openAiCompatibleAdapterFit: string;
  contextTokenNote: string;
  privacyNote: string;
  manualSetupGuidance: string;
  localOnlyTestingNote: string;
  blockedReasons: string[];
  nextRoute: "/provider-adapters" | "/local-model-manager" | "/task-router";
};

export type LmStudioRuntimePlannerBoundary = {
  localOnly: true;
  approvedLocalLiveTestBoundaryRequired: true;
  lmStudioApiCallsAllowed: false;
  endpointSecretStorageAllowed: false;
  cloudProviderApiCallsAllowed: false;
  liveChatTestAllowed: false;
  envValueDisplayAllowed: false;
};

export type LmStudioRuntimePlannerModel = {
  title: "LM Studio runtime planner";
  summary: string;
  plans: LmStudioRuntimePlan[];
  boundary: LmStudioRuntimePlannerBoundary;
  advancedDetails: string[];
};

export function buildLmStudioRuntimePlannerStableKey(
  ...parts: Array<string | number | null | undefined>
): string {
  return parts
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, "-")
    )
    .filter(Boolean)
    .join(":");
}
