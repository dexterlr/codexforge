export type WorkflowCompatibilityStatus =
  | "compatible"
  | "needs-review"
  | "blocked"
  | "unknown";

export type WorkflowCompatibilityRiskLevel =
  | "low"
  | "medium"
  | "high"
  | "blocked";

export type WorkflowCompatibilityReport = {
  id: string;
  workflowTemplateSummary: string;
  localMetadataSource: string;
  nodeCompatibility: WorkflowCompatibilityStatus;
  modelCheckpointCompatibility: WorkflowCompatibilityStatus;
  parameterCompatibility: WorkflowCompatibilityStatus;
  outputTypeCompatibility: WorkflowCompatibilityStatus;
  riskLevel: WorkflowCompatibilityRiskLevel;
  blockingReasons: string[];
  recommendedNextRoute: "/missing-model-node-resolver" | "/comfyui-workflows/dry-run";
  dryRunContractRoute: "/comfyui-workflows/dry-run";
};

export type WorkflowCompatibilityCheckerBoundary = {
  localOnly: true;
  liveWorkflowExecutionAllowed: false;
  queueSubmissionAllowed: false;
  cloudFallbackAllowed: false;
  arbitraryFileBrowsingAllowed: false;
  fullLocalPathsAboveFoldAllowed: false;
  advancedDiagnosticsSecondary: true;
};

export type WorkflowCompatibilityCheckerModel = {
  title: "Workflow compatibility checker";
  summary: string;
  reports: WorkflowCompatibilityReport[];
  boundary: WorkflowCompatibilityCheckerBoundary;
  diagnostics: string[];
};

export function buildWorkflowCompatibilityCheckerStableKey(
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
