import type { ProviderHealthCheckInput, ProviderHealthState } from "./provider-health-types";

export function buildProviderHealthStatus(input: ProviderHealthCheckInput): ProviderHealthState {
  if (input.planned || input.kind === "planned") return "planned";
  if (input.manualProfileOnly || input.kind === "manual") return "manual-only";
  if (input.kind === "local") return input.localServerLabel ? "local-server-expected" : "unknown";
  if (input.needsEnvKey) return "missing-key";
  if (input.needsBaseUrl) return "unavailable";
  return "configured";
}
