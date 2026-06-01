import type { LocalCreativeProvider, LocalCreativeProviderSummary } from "./local-creative-provider-types";
import { buildDefaultLocalCreativeProviders } from "./local-creative-provider";

export function summarizeLocalCreativeProviders(providers: readonly LocalCreativeProvider[]): string {
  return `${providers.length} local creative providers, preview-only, local-first, no cloud credits spent, no generation started.`;
}

export function buildLocalCreativeProviderSummary(providers = buildDefaultLocalCreativeProviders()): LocalCreativeProviderSummary {
  const capabilities = Array.from(new Set(providers.flatMap((provider) => provider.capabilities.map((capability) => capability.label))));
  return {
    providers,
    providerCount: providers.length,
    localFirstCount: providers.filter((provider) => provider.localOnlyRecommended).length,
    capabilities,
    summary: summarizeLocalCreativeProviders(providers),
    nextAction: "Review ComfyUI health, then choose a video workflow before preparing any job.",
  };
}
