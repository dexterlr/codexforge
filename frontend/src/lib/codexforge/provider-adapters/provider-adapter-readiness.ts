import type { ProviderAdapterDefinition, ProviderAdapterReadinessState } from "./provider-adapter-types";

export function describeProviderAdapterReadiness(state: ProviderAdapterReadinessState): string {
  switch (state) {
    case "definition-ready":
      return "Definition is ready for planning, but it still does not call a provider.";
    case "needs-credential-strategy":
      return "Needs a reviewed secret reference path before automation can be considered.";
    case "needs-local-server":
      return "Needs a local server and guarded health check before runtime use.";
    case "manual-handoff-only":
      return "Manual browser handoff only. No login automation.";
    case "blocked-unsafe-secret-storage":
      return "Blocked because the proposed setup would store secrets unsafely.";
    case "planned":
      return "Planned profile only.";
  }
}

export function countProviderAdapterReadiness(
  adapters: readonly ProviderAdapterDefinition[],
  state: ProviderAdapterReadinessState
): number {
  return adapters.filter((adapter) => adapter.setupStatus === state).length;
}
