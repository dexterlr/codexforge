import type { ProviderAdapterCapabilityProfile } from "./provider-adapter-types";

export function buildProviderAdapterCapabilityProfile(
  input: ProviderAdapterCapabilityProfile
): ProviderAdapterCapabilityProfile {
  return {
    ...input,
    notes: [...input.notes],
  };
}
