import type { LocalCreativeCostProfile } from "./local-creative-provider-types";

export function buildLocalCreativeCostProfile(input: LocalCreativeCostProfile): LocalCreativeCostProfile {
  return { ...input };
}
