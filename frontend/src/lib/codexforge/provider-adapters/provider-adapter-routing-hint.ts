import type { ProviderAdapterRoutingHint } from "./provider-adapter-types";

export function buildProviderAdapterRoutingHint(input: ProviderAdapterRoutingHint): ProviderAdapterRoutingHint {
  return { ...input };
}
