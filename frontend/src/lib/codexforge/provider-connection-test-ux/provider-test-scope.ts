import type { ProviderTestScope, ProviderTestScopeKind } from "./provider-connection-test-types";

export function buildProviderTestScope(scope: ProviderTestScopeKind): ProviderTestScope {
  const safeNow = scope === "profile-only" || scope === "local-probe-preview" || scope === "manual-browser-check";
  return {
    id: `${scope}-scope`,
    scope,
    safeNow,
    explanation: safeNow ? "Safe now because it is profile, preview, or manual-only." : "Future or blocked until an approved safe boundary exists.",
  };
}
