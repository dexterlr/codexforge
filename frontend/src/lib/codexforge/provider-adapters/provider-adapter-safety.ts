import type { ProviderAdapterSafetyProfile } from "./provider-adapter-types";

export function buildProviderAdapterSafetyProfile(input: ProviderAdapterSafetyProfile): ProviderAdapterSafetyProfile {
  return {
    blocked: [...input.blocked],
    allowed: [...input.allowed],
    credentialGuidance: [...input.credentialGuidance],
    operatorCopy: [...input.operatorCopy],
  };
}

export function buildDefaultProviderAdapterSafetyProfile(extra: Partial<ProviderAdapterSafetyProfile> = {}): ProviderAdapterSafetyProfile {
  return buildProviderAdapterSafetyProfile({
    blocked: [
      "No live provider calls yet",
      "No raw password storage",
      "No localStorage secrets",
      "No browser cookie storage",
      "No login automation",
      ...(extra.blocked ?? []),
    ],
    allowed: [
      "Static adapter definitions",
      "Masked key examples only",
      "Env var names as setup labels",
      "Manual/browser handoff profiles",
      ...(extra.allowed ?? []),
    ],
    credentialGuidance: [
      "API keys belong in .env.local or a secure local secret strategy.",
      "CodexForge describes credential shape but does not capture secret values in the UI.",
      ...(extra.credentialGuidance ?? []),
    ],
    operatorCopy: [
      "Adapters describe capabilities and safe setup only.",
      "No provider call happens from this adapter readiness page.",
      ...(extra.operatorCopy ?? []),
    ],
  });
}
