import type { AiProviderAccountProfile, AiProviderRegistrySummary } from "./ai-provider-registry-types";

export function buildAiProviderRegistrySummary(
  profiles: AiProviderAccountProfile[]
): AiProviderRegistrySummary {
  const manualHandoffCount = profiles.filter((profile) => profile.kind === "manual-subscription").length;
  const configuredWithoutSecretsCount = profiles.filter((profile) => profile.status === "configured").length;

  return {
    id: "ai-provider-account-registry",
    profiles: profiles.map((profile) => ({ ...profile, allowedUse: [...profile.allowedUse], safetyNotes: [...profile.safetyNotes] })),
    manualHandoffCount,
    configuredWithoutSecretsCount,
    summary: [
      "Provider accounts are represented as safe profiles, not login forms.",
      "Manual ChatGPT and Claude subscriptions stay profile-only with manual handoff.",
      "API and local providers can be planned or configured without storing real credentials.",
    ],
  };
}

