import type { ProviderTestNextAction } from "./provider-connection-test-types";

export function buildProviderTestNextAction(input: ProviderTestNextAction): ProviderTestNextAction {
  return { ...input };
}
