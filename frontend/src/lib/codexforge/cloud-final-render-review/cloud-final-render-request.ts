import type { CloudFinalRenderRequest } from "./cloud-final-render-types";

export function buildCloudFinalRenderRequest(
  input: Partial<CloudFinalRenderRequest> = {}
): CloudFinalRenderRequest {
  return {
    id: input.id ?? "cloud-final-render-request-preview",
    projectName: input.projectName ?? "Reviewed local video project",
    providerOption: input.providerOption ?? "Manual cloud provider option",
    requestedCapability: input.requestedCapability ?? "final render",
    localDraftStatus: input.localDraftStatus ?? "local draft reviewed, local final still preferred first",
    promptAssetStatus: input.promptAssetStatus ?? "prompt and assets require operator review before any future handoff",
    manualApprovalRequired: true,
    noAutoSubmitGuarantee: true,
  };
}

export function buildDefaultCloudFinalRenderRequest(): CloudFinalRenderRequest {
  return buildCloudFinalRenderRequest();
}
