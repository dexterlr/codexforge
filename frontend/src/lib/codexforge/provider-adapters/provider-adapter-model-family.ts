import type { ProviderAdapterModelFamily } from "./provider-adapter-types";

export function buildProviderAdapterModelFamily(input: ProviderAdapterModelFamily): ProviderAdapterModelFamily {
  return {
    ...input,
    strengths: [...input.strengths],
    cautions: [...input.cautions],
  };
}
