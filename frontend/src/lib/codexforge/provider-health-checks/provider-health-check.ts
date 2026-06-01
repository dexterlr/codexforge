import type { ProviderHealthCheck, ProviderHealthCheckInput } from "./provider-health-types";
import { buildProviderHealthGuidance } from "./provider-health-guidance";
import { buildProviderHealthRequirement } from "./provider-health-requirement";
import { buildProviderHealthStatus } from "./provider-health-status";

export function buildProviderHealthCheck(input: ProviderHealthCheckInput): ProviderHealthCheck {
  const status = buildProviderHealthStatus(input);
  return { ...input, status, requirement: buildProviderHealthRequirement(input, status), guidance: buildProviderHealthGuidance(status), configured: status === "configured", blocked: status === "missing-key" || status === "planned" || status === "unavailable" || status === "unknown" };
}

export function buildDefaultProviderHealthChecks(): ProviderHealthCheck[] {
  return [
    buildProviderHealthCheck({ id: "openai-compatible", name: "OpenAI-compatible API", kind: "api", needsEnvKey: true, needsBaseUrl: true }),
    buildProviderHealthCheck({ id: "claude-compatible", name: "Claude-compatible API", kind: "api", needsEnvKey: true }),
    buildProviderHealthCheck({ id: "gemini", name: "Gemini API", kind: "api", needsEnvKey: true }),
    buildProviderHealthCheck({ id: "deepseek", name: "DeepSeek API", kind: "api", needsEnvKey: true, needsBaseUrl: true }),
    buildProviderHealthCheck({ id: "openrouter", name: "OpenRouter API", kind: "api", needsEnvKey: true }),
    buildProviderHealthCheck({ id: "ollama", name: "Ollama", kind: "local", localServerLabel: "Ollama on localhost" }),
    buildProviderHealthCheck({ id: "lm-studio", name: "LM Studio", kind: "local", localServerLabel: "LM Studio local server" }),
    buildProviderHealthCheck({ id: "manual-chatgpt", name: "Manual ChatGPT", kind: "manual", manualProfileOnly: true }),
    buildProviderHealthCheck({ id: "manual-claude", name: "Manual Claude", kind: "manual", manualProfileOnly: true }),
  ];
}
