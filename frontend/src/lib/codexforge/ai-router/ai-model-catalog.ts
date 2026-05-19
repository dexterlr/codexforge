import type { AiModelCatalogEntry, AiQualityTier, AiTaskRequirements, AiTaskStrength } from "./ai-router-types";

const taskStrengths: Record<string, AiTaskStrength[]> = {
  chat: ["summarization", "cheap-draft"],
  "code-inspection": ["coding", "reasoning"],
  "code-generation": ["coding", "planning"],
  "patch-planning": ["coding", "planning", "reasoning"],
  "diff-review": ["coding", "reasoning"],
  summarization: ["summarization", "cheap-draft"],
  extraction: ["extraction", "cheap-draft"],
  "memory-ingestion": ["summarization", "extraction", "local-private"],
  "brain-reasoning": ["reasoning", "planning"],
  "creative-planning": ["planning", "reasoning"],
  research: ["reasoning", "summarization"],
  "tool-execution-review": ["reasoning", "planning"],
  "low-risk-draft": ["cheap-draft", "summarization"],
  "high-risk-apply-review": ["coding", "reasoning", "planning"],
};

export function buildAiModelCatalog(entries: AiModelCatalogEntry[] = []): AiModelCatalogEntry[] {
  const defaults: AiModelCatalogEntry[] = [
    {
      id: "local-small",
      label: "Local small model",
      providerId: "local",
      family: "local-control-plane",
      contextWindowEstimate: 8192,
      subscriptionIncludedUsageEstimate: "Local hardware constrained; no provider billing estimate.",
      qualityTier: "local",
      strengths: ["local-private", "cheap-draft", "summarization", "extraction"],
      weaknesses: ["May be weak for deep reasoning or large code changes."],
      maxOutputHint: 1200,
      supportsTools: false,
      supportsVision: false,
      supportsLocalOffline: true,
      enabled: true,
      estimateNote: "Placeholder local profile; configure actual model manually.",
    },
    {
      id: "api-fast",
      label: "Fast API model",
      providerId: "openai-compatible",
      family: "manual-fast",
      contextWindowEstimate: 32000,
      qualityTier: "fast",
      strengths: ["summarization", "extraction", "cheap-draft", "coding"],
      weaknesses: ["Not preferred for high-risk apply review."],
      maxOutputHint: 2000,
      supportsTools: true,
      supportsVision: false,
      supportsLocalOffline: false,
      enabled: true,
      estimateNote: "Manual placeholder; no live pricing claim.",
    },
    {
      id: "api-balanced",
      label: "Balanced API model",
      providerId: "openai-compatible",
      family: "manual-balanced",
      contextWindowEstimate: 128000,
      qualityTier: "balanced",
      strengths: ["coding", "reasoning", "summarization", "planning", "extraction"],
      weaknesses: ["Use compression before very large contexts."],
      maxOutputHint: 4000,
      supportsTools: true,
      supportsVision: true,
      supportsLocalOffline: false,
      enabled: true,
      estimateNote: "Manual placeholder; operator controls actual provider/model.",
    },
    {
      id: "api-premium-reasoning",
      label: "Premium reasoning model",
      providerId: "manual-subscription",
      family: "manual-premium",
      contextWindowEstimate: 200000,
      qualityTier: "premium",
      strengths: ["coding", "reasoning", "planning", "vision"],
      weaknesses: ["Reserve for high-risk reasoning and final review."],
      maxOutputHint: 8000,
      supportsTools: true,
      supportsVision: true,
      supportsLocalOffline: false,
      enabled: true,
      estimateNote: "Manual subscription placeholder; no hardcoded billing claim.",
    },
    {
      id: "ollama-coder",
      label: "Ollama local coder",
      providerId: "ollama",
      family: "local-coder",
      contextWindowEstimate: 16000,
      qualityTier: "local",
      strengths: ["coding", "local-private", "cheap-draft"],
      weaknesses: ["Requires local server and model memory capacity."],
      maxOutputHint: 2000,
      supportsTools: false,
      supportsVision: false,
      supportsLocalOffline: true,
      enabled: true,
      estimateNote: "Local server profile; deterministic router does not probe server.",
    },
    {
      id: "lm-studio-balanced",
      label: "LM Studio balanced local",
      providerId: "lm-studio",
      family: "local-balanced",
      contextWindowEstimate: 24000,
      qualityTier: "local",
      strengths: ["local-private", "summarization", "coding", "extraction"],
      weaknesses: ["Quality depends on manually selected local model."],
      maxOutputHint: 2000,
      supportsTools: false,
      supportsVision: false,
      supportsLocalOffline: true,
      enabled: true,
      estimateNote: "Local server profile; no external calls.",
    },
  ];

  return [...defaults, ...entries];
}

export function rankAiModelsByCapability(
  models: AiModelCatalogEntry[],
  task: AiTaskRequirements
): AiModelCatalogEntry[] {
  const wanted = taskStrengths[task.taskKind] ?? [];
  const tierWeight: Record<AiQualityTier, number> = {
    local: task.privacyLevel === "private" || task.privacyLevel === "secret" ? 34 : 14,
    fast: task.costSensitivity === "high" ? 28 : 12,
    balanced: 24,
    specialist: 27,
    premium: task.qualitySensitivity === "high" ? 36 : 8,
  };

  return [...models]
    .filter((model) => model.enabled)
    .sort((a, b) => {
      const score = (model: AiModelCatalogEntry) => {
        const strengthScore = model.strengths.filter((strength) => wanted.includes(strength)).length * 12;
        const toolScore = task.requiresToolUse && model.supportsTools ? 8 : 0;
        const visionScore = task.requiresVision && model.supportsVision ? 12 : 0;
        const contextScore = model.contextWindowEstimate >= 64000 ? 8 : 0;
        const codePenalty = task.requiresCodeStrength && !model.strengths.includes("coding") ? 18 : 0;
        return strengthScore + tierWeight[model.qualityTier] + toolScore + visionScore + contextScore - codePenalty;
      };

      const diff = score(b) - score(a);
      return diff === 0 ? a.label.localeCompare(b.label) : diff;
    });
}

export function findAiModelsForTask(
  task: AiTaskRequirements,
  models = buildAiModelCatalog()
): AiModelCatalogEntry[] {
  return rankAiModelsByCapability(models, task).filter((model) => {
    if (task.requiresToolUse && !model.supportsTools) return false;
    if (task.requiresVision && !model.supportsVision) return false;
    if (task.privacyLevel === "secret" && !model.supportsLocalOffline) return false;
    return true;
  });
}

export function summarizeAiModelCatalog(models: AiModelCatalogEntry[]): string {
  const enabled = models.filter((model) => model.enabled).length;
  const local = models.filter((model) => model.supportsLocalOffline).length;
  return `${enabled} enabled model profiles, ${local} local/offline-capable, all costs marked as manual estimates.`;
}
