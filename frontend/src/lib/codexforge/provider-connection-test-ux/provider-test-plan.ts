import type { ProviderTestPlan } from "./provider-connection-test-types";

export function buildProviderTestPlan(input: ProviderTestPlan): ProviderTestPlan {
  return { ...input };
}

export function buildDefaultProviderTestPlans(): ProviderTestPlan[] {
  return [
    buildProviderTestPlan({ id: "profiles", provider: "Provider profiles", scope: "profile-only", status: "ready-to-check", plainEnglish: "Safe now. Reviews static profile setup only." }),
    buildProviderTestPlan({ id: "env-presence", provider: "Env keys", scope: "env-presence-only", status: "needs-env", plainEnglish: "Safe when server returns booleans only. No values shown." }),
    buildProviderTestPlan({ id: "local-probes", provider: "Ollama, LM Studio, ComfyUI", scope: "local-probe-preview", status: "ready-to-check", plainEnglish: "Safe now as a preview. No live local request yet." }),
    buildProviderTestPlan({ id: "local-live", provider: "Local live health checks", scope: "local-live-health-check-planned", status: "planned", plainEnglish: "Future approved metadata-only localhost check." }),
    buildProviderTestPlan({ id: "cloud-live", provider: "Cloud providers", scope: "cloud-live-test-blocked", status: "blocked-until-approved", plainEnglish: "Blocked in this phase. No cloud provider API calls." }),
    buildProviderTestPlan({ id: "manual-browser", provider: "Manual subscriptions", scope: "manual-browser-check", status: "manual-only", plainEnglish: "Operator checks account status in the browser. CodexForge stores no password." }),
  ];
}
