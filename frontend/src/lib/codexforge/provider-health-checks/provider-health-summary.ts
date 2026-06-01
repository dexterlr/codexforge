import type { ProviderHealthCheck, ProviderHealthSummary } from "./provider-health-types";
import { buildDefaultProviderHealthChecks } from "./provider-health-check";

export function summarizeProviderHealth(checks: readonly ProviderHealthCheck[]): string {
  const configured = checks.filter((check) => check.status === "configured").length;
  const manual = checks.filter((check) => check.status === "manual-only").length;
  const local = checks.filter((check) => check.status === "local-server-expected").length;
  return configured + " configured, " + manual + " manual-only, " + local + " local-server expected, no provider API calls.";
}

export function buildProviderHealthSummary(checks: ProviderHealthCheck[] = buildDefaultProviderHealthChecks()): ProviderHealthSummary {
  const configuredCount = checks.filter((check) => check.configured).length;
  const blockedCount = checks.filter((check) => check.blocked).length;
  const manualCount = checks.filter((check) => check.status === "manual-only").length;
  const plannedCount = checks.filter((check) => check.status === "planned").length;
  const nextFix = checks.find((check) => check.status === "missing-key")?.requirement ?? "Use manual or local routes until an API provider is configured.";
  return { checks, configuredCount, blockedCount, manualCount, plannedCount, nextFix, summary: summarizeProviderHealth(checks) };
}
