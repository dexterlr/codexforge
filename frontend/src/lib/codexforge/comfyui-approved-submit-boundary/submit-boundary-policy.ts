import type {
  SubmitBoundaryApproval,
  SubmitBoundaryPolicy,
  SubmitBoundaryRequest,
} from "./comfyui-submit-boundary-types";

export function buildSubmitBoundaryPolicy(
  request: SubmitBoundaryRequest,
  approval: SubmitBoundaryApproval
): SubmitBoundaryPolicy {
  const failures = [
    request.liveHealthGateReviewed ? "" : "Live health gate must be reviewed.",
    request.metadataReviewed ? "" : "Metadata must be reviewed.",
    request.workflowImported ? "" : "Workflow must be imported.",
    request.safetyInspected ? "" : "Safety must be inspected.",
    request.parametersMapped ? "" : "Parameters must be mapped.",
    request.jobPackageBuilt ? "" : "Job package must be built.",
    request.dryRunContractPassed ? "" : "Dry run contract must pass.",
    request.renderQueuePreviewReady ? "" : "Render queue preview must be ready.",
    request.artifactDestinationPlanned ? "" : "Artifact destination must be planned.",
    request.recoveryPathPlanned ? "" : "Recovery path must be planned.",
    approval.futureExecutionApprovalRequired ? "" : "Explicit approval must be required.",
    request.noAutoRunDefault ? "" : "No-auto-run default must be preserved.",
    request.noSecretExposure ? "" : "Secret exposure must be blocked.",
    request.noCloudUrl ? "" : "Cloud URL must be blocked.",
    request.localOnlyComfyUiTarget ? "" : "ComfyUI target must be local-only.",
    approval.boundaryReviewApproved ? "" : "Boundary review approval is missing.",
  ].filter(Boolean);

  return {
    id: "comfyui-submit-boundary-policy",
    requirements: [
      "live health gate reviewed",
      "metadata reviewed",
      "workflow imported",
      "safety inspected",
      "parameters mapped",
      "job package built",
      "dry run contract passed",
      "render queue preview ready",
      "artifact destination planned",
      "recovery path planned",
      "explicit approval required",
      "no-auto-run default",
      "no secret exposure",
      "no cloud URL",
      "local-only ComfyUI target",
    ],
    failures,
    allRequirementsMet: failures.length === 0,
    executionAllowed: failures.length === 0 && approval.futureExecutionApprovalGranted && request.guardedExecutorAvailable,
  };
}

export function isSubmitBoundaryAllowed(policy: SubmitBoundaryPolicy): boolean {
  return policy.executionAllowed;
}
