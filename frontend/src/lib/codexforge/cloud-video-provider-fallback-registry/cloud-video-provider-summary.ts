import type { CloudVideoProvider, CloudVideoProviderSummary } from "./cloud-video-provider-types";
import { buildDefaultCloudVideoProviders } from "./cloud-video-provider";

export function buildCloudVideoProviderSummary(
  providers: CloudVideoProvider[] = buildDefaultCloudVideoProviders()
): CloudVideoProviderSummary {
  const summary: CloudVideoProviderSummary = {
    providers,
    providerCount: providers.length,
    reviewedFallbackCount: providers.filter((provider) => provider.optionalFallbackOnly).length,
    highRiskCount: providers.filter((provider) => provider.costRisk.risk === "high" || provider.costRisk.risk === "credit-based").length,
    recommendedFirstStep: "Use local creative planning and local drafts first. Review cloud only if local is not good enough.",
    summary: "",
  };
  return { ...summary, summary: summarizeCloudVideoProviders(summary) };
}

export function summarizeCloudVideoProviders(summary: CloudVideoProviderSummary): string {
  return `${summary.providerCount} optional cloud fallback profile(s), ${summary.highRiskCount} with credit or high cost risk, and zero active provider integrations.`;
}
