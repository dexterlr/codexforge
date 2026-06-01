import type { EnvKeyDefinition } from "./safe-env-key-types";

export function buildEnvKeyDefinition(input: EnvKeyDefinition): EnvKeyDefinition {
  return { ...input };
}

export function buildDefaultEnvKeyDefinitions(): EnvKeyDefinition[] {
  return [
    ["OPENAI_API_KEY", "OpenAI", "api-key"],
    ["ANTHROPIC_API_KEY", "Anthropic", "api-key"],
    ["GEMINI_API_KEY", "Gemini", "api-key"],
    ["GOOGLE_API_KEY", "Google Gemini", "api-key"],
    ["DEEPSEEK_API_KEY", "DeepSeek", "api-key"],
    ["OPENROUTER_API_KEY", "OpenRouter", "api-key"],
    ["OPENAI_COMPATIBLE_API_KEY", "OpenAI-compatible", "api-key"],
    ["OPENAI_COMPATIBLE_BASE_URL", "OpenAI-compatible", "base-url"],
    ["OLLAMA_BASE_URL", "Ollama local server", "base-url"],
    ["LM_STUDIO_BASE_URL", "LM Studio local server", "base-url"],
    ["COMFYUI_BASE_URL", "ComfyUI local server", "base-url"],
  ].map(([keyName, provider, kind]) =>
    buildEnvKeyDefinition({
      id: String(keyName).toLowerCase().replaceAll("_", "-"),
      keyName: String(keyName),
      provider: String(provider),
      kind: kind as EnvKeyDefinition["kind"],
      requiredFor: kind === "api-key" ? "Cloud or compatible API access after approval" : "Local or compatible server address",
      placeholder: `${keyName}=<set-in-env-local-only>`,
    })
  );
}
