import { buildProviderAdapterRegistry } from "./provider-adapter-registry";
import type { ProviderAdapterDefinition, ProviderAdapterSummary } from "./provider-adapter-types";

export function buildProviderAdapterSummary(adapters: ProviderAdapterDefinition[] = buildProviderAdapterRegistry()): ProviderAdapterSummary {
  return {
    id: "provider-adapter-summary",
    adapters: adapters.map((adapter) => ({
      ...adapter,
      connectionModes: [...adapter.connectionModes],
      credentialStrategies: [...adapter.credentialStrategies],
      supportedTaskTypes: [...adapter.supportedTaskTypes],
      modelFamilies: [...adapter.modelFamilies],
      routingHints: [...adapter.routingHints],
      limitationNotes: [...adapter.limitationNotes],
    })),
    totalAdapters: adapters.length,
    definitionReadyCount: adapters.filter((adapter) => adapter.setupStatus === "definition-ready").length,
    localPrivateCount: adapters.filter((adapter) => adapter.privacyPosture === "local-private").length,
    manualOnlyCount: adapters.filter((adapter) => adapter.automationReadiness === "manual-only").length,
    safetyHighlights: [
      "No live provider calls yet.",
      "No raw password storage.",
      "No localStorage secrets.",
      "API keys belong in .env.local or a secure local secret strategy.",
    ],
    routingHighlights: [
      "OpenAI-compatible means familiar request shape, not identical providers.",
      "Claude has its own contract and manual browser handoff boundary.",
      "Gemini keeps multimodal and long-context routing clear.",
      "DeepSeek can be routed directly or through compatible endpoints later.",
      "Ollama and LM Studio are local/private targets for prepass and drafts.",
    ],
  };
}
