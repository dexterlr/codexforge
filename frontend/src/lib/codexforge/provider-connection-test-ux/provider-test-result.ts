import type { ProviderTestPlan, ProviderTestResult } from "./provider-connection-test-types";

export function buildProviderTestResult(plan: ProviderTestPlan): ProviderTestResult {
  return {
    id: `${plan.id}-result`,
    planId: plan.id,
    status: plan.status,
    resultText: plan.scope === "cloud-live-test-blocked" ? "Blocked until explicitly approved in a later phase." : "No live provider call has run.",
  };
}
