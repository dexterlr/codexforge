import type {
  CloudVideoCapabilityId,
  CloudVideoCostRiskId,
  CloudVideoProvider,
  CloudVideoProviderKindId,
} from "./cloud-video-provider-types";
import { buildCloudVideoCapability } from "./cloud-video-capability";
import { buildCloudVideoCostRisk } from "./cloud-video-cost-risk";
import { buildCloudVideoFallbackPolicy } from "./cloud-video-fallback-policy";
import { buildCloudVideoProviderHandoff } from "./cloud-video-provider-handoff";
import { buildCloudVideoProviderKind } from "./cloud-video-provider-kind";

export function buildCloudVideoProvider(
  input: Partial<CloudVideoProvider> & {
    kindId?: CloudVideoProviderKindId;
    capabilityIds?: CloudVideoCapabilityId[];
    costRiskId?: CloudVideoCostRiskId;
  } = {}
): CloudVideoProvider {
  const name = input.name ?? "Manual cloud provider";
  const kind = input.kind ?? buildCloudVideoProviderKind(input.kindId ?? "manual-cloud-provider");
  const capabilities =
    input.capabilities ??
    (input.capabilityIds ?? ["final render", "manual browser workflow"]).map((capability) =>
      buildCloudVideoCapability(capability)
    );
  const costRisk = input.costRisk ?? buildCloudVideoCostRisk(input.costRiskId ?? "unknown");
  const fallbackPolicy = input.fallbackPolicy ?? buildCloudVideoFallbackPolicy();
  const providerShell = { name } as CloudVideoProvider;

  return {
    id: input.id ?? `${kind.id}-fallback-profile`,
    name,
    kind,
    capabilities,
    costRisk,
    fallbackPolicy,
    handoff: input.handoff ?? buildCloudVideoProviderHandoff(providerShell),
    optionalFallbackOnly: true,
    noApiIntegration: true,
  };
}

export function buildDefaultCloudVideoProviders(): CloudVideoProvider[] {
  return [
    buildCloudVideoProvider({
      id: "runway-fallback-profile",
      name: "Runway",
      kindId: "runway",
      capabilityIds: ["text-to-video", "image-to-video", "final render", "extend video"],
      costRiskId: "credit-based",
    }),
    buildCloudVideoProvider({
      id: "pika-fallback-profile",
      name: "Pika",
      kindId: "pika",
      capabilityIds: ["text-to-video", "image-to-video", "final render"],
      costRiskId: "credit-based",
    }),
    buildCloudVideoProvider({
      id: "replicate-fallback-profile",
      name: "Replicate",
      kindId: "replicate",
      capabilityIds: ["cloud-only feature", "manual browser workflow", "final render"],
      costRiskId: "medium",
    }),
    buildCloudVideoProvider({
      id: "manual-cloud-provider-fallback-profile",
      name: "Manual cloud provider",
      kindId: "manual-cloud-provider",
      capabilityIds: ["manual browser workflow", "final render"],
      costRiskId: "manual-only",
    }),
  ];
}
