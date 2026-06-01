import type { ProviderConnectionTestSummary, ProviderTestScopeKind } from "./provider-connection-test-types";
import { buildDefaultProviderTestPlans } from "./provider-test-plan";
import { buildProviderTestNextAction } from "./provider-test-next-action";
import { buildProviderTestResult } from "./provider-test-result";
import { buildProviderTestSafety } from "./provider-test-safety";
import { buildProviderTestScope } from "./provider-test-scope";

export function summarizeProviderConnectionTests(summary: ProviderConnectionTestSummary): string {
  return `${summary.plans.length} provider test plans: safe now versus future approved live test, with cloud live tests blocked.`;
}

export function buildProviderConnectionTestSummary(): ProviderConnectionTestSummary {
  const plans = buildDefaultProviderTestPlans();
  const scopeNames = Array.from(new Set(plans.map((plan) => plan.scope))) as ProviderTestScopeKind[];
  const summary: ProviderConnectionTestSummary = {
    plans,
    scopes: scopeNames.map(buildProviderTestScope),
    safety: buildProviderTestSafety(),
    results: plans.map(buildProviderTestResult),
    nextActions: [
      buildProviderTestNextAction({ id: "env", label: "Review env readiness", route: "/env-readiness", reason: "Needed before env presence checks." }),
      buildProviderTestNextAction({ id: "local", label: "Review local probes", route: "/local-provider-probes", reason: "Needed before local live checks." }),
      buildProviderTestNextAction({ id: "setup", label: "Review setup wizard", route: "/provider-setup", reason: "Keeps provider setup novice-friendly." }),
    ],
    summary: "",
  };
  return { ...summary, summary: summarizeProviderConnectionTests(summary) };
}
