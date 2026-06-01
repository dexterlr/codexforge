export type AiProviderAccountKind = "manual-subscription" | "api-profile" | "local-runtime";
export type AiProviderAccountStatus = "profile-only" | "planned" | "configured";

export type AiProviderAccountProfile = {
  id: string;
  providerName: string;
  kind: AiProviderAccountKind;
  status: AiProviderAccountStatus;
  accessMode: string;
  allowedUse: string[];
  safetyNotes: string[];
  credentialPosture: "none-stored" | "external-reference-only" | "local-runtime-only";
};

export type AiProviderRegistrySummary = {
  id: "ai-provider-account-registry";
  profiles: AiProviderAccountProfile[];
  manualHandoffCount: number;
  configuredWithoutSecretsCount: number;
  summary: string[];
};

