import type { LocalCreativeRoutingProfile } from "./local-creative-provider-types";

export function buildLocalCreativeRoutingProfile(input: LocalCreativeRoutingProfile): LocalCreativeRoutingProfile {
  return { ...input, recommendedFor: [...input.recommendedFor] };
}
