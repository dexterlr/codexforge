import { buildClaudeCompatibleAdapter } from "./claude-compatible-adapter";
import { buildDeepSeekProviderAdapter } from "./deepseek-provider-adapter";
import { buildGeminiProviderAdapter } from "./gemini-provider-adapter";
import { buildLmStudioLocalAdapter } from "./lm-studio-local-adapter";
import { buildOllamaLocalAdapter } from "./ollama-local-adapter";
import { buildOpenAiCompatibleAdapter } from "./openai-compatible-adapter";
import type { ProviderAdapterDefinition, ProviderAdapterId } from "./provider-adapter-types";

export function buildProviderAdapterRegistry(): ProviderAdapterDefinition[] {
  return [
    buildOpenAiCompatibleAdapter(),
    buildClaudeCompatibleAdapter(),
    buildGeminiProviderAdapter(),
    buildDeepSeekProviderAdapter(),
    buildOllamaLocalAdapter(),
    buildLmStudioLocalAdapter(),
  ];
}

export function getProviderAdapterById(id: ProviderAdapterId): ProviderAdapterDefinition | undefined {
  return buildProviderAdapterRegistry().find((adapter) => adapter.id === id);
}
