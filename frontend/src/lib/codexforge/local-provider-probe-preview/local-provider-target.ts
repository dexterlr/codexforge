import type { LocalProviderTarget } from "./local-provider-probe-types";

export function buildLocalProviderTarget(input: LocalProviderTarget): LocalProviderTarget {
  return { ...input };
}

export function buildDefaultLocalProviderTargets(): LocalProviderTarget[] {
  return [
    buildLocalProviderTarget({ id: "ollama", name: "Ollama local server", baseUrlEnvKey: "OLLAMA_BASE_URL", defaultLocalUrl: "http://localhost:11434", hostRule: "localhost or 127.0.0.1 only" }),
    buildLocalProviderTarget({ id: "lm-studio", name: "LM Studio local server", baseUrlEnvKey: "LM_STUDIO_BASE_URL", defaultLocalUrl: "http://localhost:1234", hostRule: "localhost or 127.0.0.1 only" }),
    buildLocalProviderTarget({ id: "comfyui", name: "ComfyUI local server", baseUrlEnvKey: "COMFYUI_BASE_URL", defaultLocalUrl: "http://localhost:8188", hostRule: "localhost or 127.0.0.1 only" }),
    buildLocalProviderTarget({ id: "custom-openai-compatible", name: "custom local OpenAI-compatible server", baseUrlEnvKey: "OPENAI_COMPATIBLE_BASE_URL", defaultLocalUrl: "http://localhost:1234/v1", hostRule: "local-only host required before live health checks" }),
  ];
}
