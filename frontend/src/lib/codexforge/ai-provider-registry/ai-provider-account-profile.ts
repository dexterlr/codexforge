import type { AiProviderAccountProfile } from "./ai-provider-registry-types";

export function buildAiProviderAccountProfile(
  input: AiProviderAccountProfile
): AiProviderAccountProfile {
  return {
    ...input,
    allowedUse: [...input.allowedUse],
    safetyNotes: [...input.safetyNotes],
  };
}

export function buildDefaultAiProviderAccountProfiles(): AiProviderAccountProfile[] {
  return [
    buildAiProviderAccountProfile({
      id: "chatgpt-manual",
      providerName: "ChatGPT",
      kind: "manual-subscription",
      status: "profile-only",
      accessMode: "Manual browser handoff",
      allowedUse: ["Planning", "review", "large-context reasoning"],
      safetyNotes: ["No raw password storage", "No localStorage secrets", "No provider API calls"],
      credentialPosture: "none-stored",
    }),
    buildAiProviderAccountProfile({
      id: "claude-manual",
      providerName: "Claude",
      kind: "manual-subscription",
      status: "profile-only",
      accessMode: "Manual browser handoff",
      allowedUse: ["Careful review", "writing help", "fallback reasoning"],
      safetyNotes: ["Subscription stays manual", "CodexForge never asks for real credentials"],
      credentialPosture: "none-stored",
    }),
    buildAiProviderAccountProfile({
      id: "openai-api-planned",
      providerName: "OpenAI API",
      kind: "api-profile",
      status: "planned",
      accessMode: "Future external secret manager reference",
      allowedUse: ["Configured profile planning", "cost estimation", "future reviewed automation"],
      safetyNotes: ["Profile only", "No process environment values shown", "No network calls"],
      credentialPosture: "external-reference-only",
    }),
    buildAiProviderAccountProfile({
      id: "local-runtime",
      providerName: "Local model runtime",
      kind: "local-runtime",
      status: "configured",
      accessMode: "Local runtime profile",
      allowedUse: ["Private drafts", "cheap summarization", "offline planning"],
      safetyNotes: ["No provider account needed", "No secret value stored"],
      credentialPosture: "local-runtime-only",
    }),
  ];
}

