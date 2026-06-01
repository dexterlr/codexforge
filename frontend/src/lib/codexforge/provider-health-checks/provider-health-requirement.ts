import type { ProviderHealthCheckInput, ProviderHealthState } from "./provider-health-types";

export function buildProviderHealthRequirement(input: ProviderHealthCheckInput, status: ProviderHealthState): string {
  if (status === "configured") return "Ready from saved metadata. Secrets are not shown.";
  if (status === "missing-key") return input.needsBaseUrl ? "Add an environment key and confirm the compatible base URL." : "Add an environment key outside the browser.";
  if (status === "manual-only") return "Use a manual browser profile. CodexForge does not store passwords or cookies.";
  if (status === "local-server-expected") return "Start " + (input.localServerLabel ?? "the local server") + " when you choose a local run.";
  if (status === "planned") return "Planned adapter. Keep it visible for routing notes, but do not route automation here yet.";
  if (status === "unavailable") return "Missing setup details. Leave it out of automated routes for now.";
  return "Unknown setup. Review the provider profile before using it.";
}
