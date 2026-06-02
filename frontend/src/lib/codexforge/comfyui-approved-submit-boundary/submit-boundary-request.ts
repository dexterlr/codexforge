import type { SubmitBoundaryRequest } from "./comfyui-submit-boundary-types";

export function buildSubmitBoundaryRequest(input: Partial<SubmitBoundaryRequest> = {}): SubmitBoundaryRequest {
  return {
    id: input.id ?? "comfyui-submit-boundary-request",
    localOnlyComfyUiTarget: true,
    liveHealthGateReviewed: input.liveHealthGateReviewed ?? true,
    metadataReviewed: input.metadataReviewed ?? true,
    workflowImported: input.workflowImported ?? true,
    safetyInspected: input.safetyInspected ?? true,
    parametersMapped: input.parametersMapped ?? true,
    jobPackageBuilt: input.jobPackageBuilt ?? true,
    dryRunContractPassed: input.dryRunContractPassed ?? true,
    renderQueuePreviewReady: input.renderQueuePreviewReady ?? true,
    artifactDestinationPlanned: input.artifactDestinationPlanned ?? true,
    recoveryPathPlanned: input.recoveryPathPlanned ?? true,
    noAutoRunDefault: true,
    noSecretExposure: true,
    noCloudUrl: true,
    guardedExecutorAvailable: false,
  };
}

export function buildDefaultSubmitBoundaryRequest(): SubmitBoundaryRequest {
  return buildSubmitBoundaryRequest();
}
