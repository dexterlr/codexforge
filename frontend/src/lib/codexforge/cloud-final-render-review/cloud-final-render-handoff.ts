import type { CloudFinalRenderHandoff, CloudFinalRenderReadiness, CloudFinalRenderRequest } from "./cloud-final-render-types";

export function buildCloudFinalRenderHandoff(
  request: CloudFinalRenderRequest,
  readiness: CloudFinalRenderReadiness,
  input: Partial<CloudFinalRenderHandoff> = {}
): CloudFinalRenderHandoff {
  return {
    id: input.id ?? "cloud-final-render-handoff",
    copyLabel: input.copyLabel ?? "Copy manual cloud render handoff allowed",
    packet:
      input.packet ??
      [
        `Project: ${request.projectName}`,
        `Provider option: ${request.providerOption}`,
        `Capability requested: ${request.requestedCapability}`,
        `Readiness: ${readiness.status}`,
        "Nothing is uploaded yet",
        "Nothing is generated yet",
        "Manual approval is required before any real cloud path",
      ],
    safetyNote:
      input.safetyNote ??
      "Copying this handoff does not call a provider, upload assets, spend credits, or submit a prompt.",
  };
}
