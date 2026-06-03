import type {
  WorkflowCompatibilityCheckerBoundary,
  WorkflowCompatibilityCheckerModel,
  WorkflowCompatibilityReport,
  WorkflowCompatibilityRiskLevel,
  WorkflowCompatibilityStatus,
} from "./workflow-compatibility-checker-types";
import { buildWorkflowCompatibilityCheckerStableKey } from "./workflow-compatibility-checker-types";

export function buildWorkflowCompatibilityReport(args: {
  workflowTemplateSummary: string;
  localMetadataSource: string;
  nodeCompatibility: WorkflowCompatibilityStatus;
  modelCheckpointCompatibility: WorkflowCompatibilityStatus;
  parameterCompatibility: WorkflowCompatibilityStatus;
  outputTypeCompatibility: WorkflowCompatibilityStatus;
  riskLevel: WorkflowCompatibilityRiskLevel;
  blockingReasons: string[];
  recommendedNextRoute: "/missing-model-node-resolver" | "/comfyui-workflows/dry-run";
}): WorkflowCompatibilityReport {
  return {
    id: buildWorkflowCompatibilityCheckerStableKey("compatibility", args.workflowTemplateSummary),
    workflowTemplateSummary: args.workflowTemplateSummary,
    localMetadataSource: args.localMetadataSource,
    nodeCompatibility: args.nodeCompatibility,
    modelCheckpointCompatibility: args.modelCheckpointCompatibility,
    parameterCompatibility: args.parameterCompatibility,
    outputTypeCompatibility: args.outputTypeCompatibility,
    riskLevel: args.riskLevel,
    blockingReasons: args.blockingReasons,
    recommendedNextRoute: args.recommendedNextRoute,
    dryRunContractRoute: "/comfyui-workflows/dry-run",
  };
}

export function buildWorkflowCompatibilityReports(): WorkflowCompatibilityReport[] {
  return [
    buildWorkflowCompatibilityReport({
      workflowTemplateSummary: "local draft image template with checkpoint, VAE, sampler, and optional LoRA",
      localMetadataSource:
        "Local metadata source: summarized ComfyUI metadata reader output, not raw metadata and not full local paths.",
      nodeCompatibility: "needs-review",
      modelCheckpointCompatibility: "unknown",
      parameterCompatibility: "compatible",
      outputTypeCompatibility: "compatible",
      riskLevel: "medium",
      blockingReasons: [
        "Blocking reasons: model/checkpoint compatibility is unknown.",
        "Blocking reasons: one custom node family needs local inventory review.",
      ],
      recommendedNextRoute: "/missing-model-node-resolver",
    }),
    buildWorkflowCompatibilityReport({
      workflowTemplateSummary: "prepared keyframe package with control nodes and image sequence output",
      localMetadataSource:
        "Local metadata source: approved local metadata summary with advanced diagnostics collapsed.",
      nodeCompatibility: "compatible",
      modelCheckpointCompatibility: "compatible",
      parameterCompatibility: "compatible",
      outputTypeCompatibility: "compatible",
      riskLevel: "low",
      blockingReasons: ["Blocking reasons: none for dry-run review."],
      recommendedNextRoute: "/comfyui-workflows/dry-run",
    }),
  ];
}

export function buildWorkflowCompatibilityCheckerBoundary(): WorkflowCompatibilityCheckerBoundary {
  return {
    localOnly: true,
    liveWorkflowExecutionAllowed: false,
    queueSubmissionAllowed: false,
    cloudFallbackAllowed: false,
    arbitraryFileBrowsingAllowed: false,
    fullLocalPathsAboveFoldAllowed: false,
    advancedDiagnosticsSecondary: true,
  };
}

export function summarizeWorkflowCompatibilityChecker(
  model: WorkflowCompatibilityCheckerModel
): string {
  return `${model.title}: Compatibility check does not submit to queue. It compares workflow/template summary, Local metadata source, node compatibility, model/checkpoint compatibility, parameter compatibility, output type compatibility, risk level, Blocking reasons, Recommended next route, and Dry-run contract route.`;
}

export function buildWorkflowCompatibilityCheckerModel(): WorkflowCompatibilityCheckerModel {
  const model: WorkflowCompatibilityCheckerModel = {
    title: "Workflow compatibility checker",
    summary: "",
    reports: buildWorkflowCompatibilityReports(),
    boundary: buildWorkflowCompatibilityCheckerBoundary(),
    diagnostics: [
      "Advanced diagnostics stay secondary.",
      "No live workflow execution.",
      "No queue submission.",
      "No cloud fallback.",
      "No full local paths above the fold.",
    ],
  };

  return { ...model, summary: summarizeWorkflowCompatibilityChecker(model) };
}
