import "server-only";

export type CodexForgeGroqCredentialReadResult = Readonly<{
  configured: boolean;
  apiKey: string | null;
  source: "environment" | "none";
}>;

const CODEXFORGE_GROQ_PLACEHOLDER_VALUES = [
  "sk-your-key-here",
  "your_groq_api_key",
  "replace-me",
] as const;

function normalizeCredentialValue(value: string | undefined): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  const normalized = trimmed
    .replace(/^['"]+|['"]+$/g, "")
    .replace(/[<>]/g, "")
    .trim()
    .toLowerCase();

  if (!normalized) {
    return null;
  }

  if (CODEXFORGE_GROQ_PLACEHOLDER_VALUES.includes(normalized as (typeof CODEXFORGE_GROQ_PLACEHOLDER_VALUES)[number])) {
    return null;
  }

  return trimmed;
}

export function readCodexForgeGroqCredential(): CodexForgeGroqCredentialReadResult {
  const rawValue = process.env.GROQ_API_KEY;
  const apiKey = normalizeCredentialValue(rawValue);

  if (!apiKey) {
    return {
      configured: false,
      apiKey: null,
      source: "none",
    };
  }

  return {
    configured: true,
    apiKey,
    source: "environment",
  };
}
