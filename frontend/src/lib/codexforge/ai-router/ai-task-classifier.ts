import type {
  AiContextSize,
  AiRequirementLevel,
  AiTaskClassification,
  AiTaskKind,
  AiTaskRequirements,
} from "./ai-router-types";

function includesAny(text: string, words: readonly string[]): boolean {
  return words.some((word) => text.includes(word));
}

function contextSizeFromText(text: string): AiContextSize {
  if (text.length > 48000) return "very-large";
  if (text.length > 16000) return "large";
  if (text.length > 4000) return "medium";
  return "small";
}

function reasoningForTask(taskKind: AiTaskKind): AiRequirementLevel {
  if (
    taskKind === "brain-reasoning" ||
    taskKind === "diff-review" ||
    taskKind === "high-risk-apply-review" ||
    taskKind === "tool-execution-review"
  ) {
    return "high";
  }

  if (
    taskKind === "code-generation" ||
    taskKind === "patch-planning" ||
    taskKind === "research" ||
    taskKind === "creative-planning"
  ) {
    return "medium";
  }

  return "low";
}

function detectTaskKind(text: string): AiTaskKind {
  const normalized = text.toLowerCase();

  if (includesAny(normalized, ["apply", "rollback", "production", "approval gate"])) {
    return "high-risk-apply-review";
  }
  if (includesAny(normalized, ["diff", "review patch", "pull request", "regression"])) {
    return "diff-review";
  }
  if (includesAny(normalized, ["generate code", "implement", "build feature", "write component"])) {
    return "code-generation";
  }
  if (includesAny(normalized, ["inspect", "read code", "find file", "trace"])) {
    return "code-inspection";
  }
  if (includesAny(normalized, ["plan patch", "patch plan", "change plan"])) {
    return "patch-planning";
  }
  if (includesAny(normalized, ["summarize", "summary", "compress"])) {
    return "summarization";
  }
  if (includesAny(normalized, ["extract", "parse", "fields", "json"])) {
    return "extraction";
  }
  if (includesAny(normalized, ["memory", "ingest", "recall"])) {
    return "memory-ingestion";
  }
  if (includesAny(normalized, ["brain", "reason", "architecture", "tradeoff"])) {
    return "brain-reasoning";
  }
  if (includesAny(normalized, ["creative", "story", "design", "campaign"])) {
    return "creative-planning";
  }
  if (includesAny(normalized, ["research", "compare", "sources"])) {
    return "research";
  }
  if (includesAny(normalized, ["tool", "execute", "command", "policy"])) {
    return "tool-execution-review";
  }
  if (includesAny(normalized, ["draft", "quick", "rough"])) {
    return "low-risk-draft";
  }

  return "chat";
}

export function buildAiTaskRequirements(
  taskKind: AiTaskKind,
  overrides: Partial<AiTaskRequirements> = {}
): AiTaskRequirements {
  const requiredReasoningDepth = reasoningForTask(taskKind);
  const requiresCodeStrength =
    taskKind === "code-inspection" ||
    taskKind === "code-generation" ||
    taskKind === "patch-planning" ||
    taskKind === "diff-review" ||
    taskKind === "high-risk-apply-review";

  return {
    taskKind,
    requiredReasoningDepth,
    requiredContextSize: "small",
    privacyLevel: "internal",
    latencyPreference:
      taskKind === "summarization" || taskKind === "extraction" || taskKind === "low-risk-draft"
        ? "interactive"
        : "balanced",
    costSensitivity:
      taskKind === "high-risk-apply-review" || taskKind === "brain-reasoning"
        ? "low"
        : "high",
    qualitySensitivity: requiredReasoningDepth,
    requiresToolUse:
      taskKind === "tool-execution-review" || taskKind === "high-risk-apply-review",
    requiresVision: false,
    requiresCodeStrength,
    fallbackAllowed: taskKind !== "high-risk-apply-review",
    ...overrides,
  };
}

export function classifyAiTask(sourceText = ""): AiTaskClassification {
  const taskKind = detectTaskKind(sourceText);
  const normalized = sourceText.toLowerCase();
  const privacyLevel = includesAny(normalized, ["secret", "api key", "token", "credential"])
    ? "secret"
    : includesAny(normalized, ["private", "local only", "sensitive"])
      ? "private"
      : "internal";
  const requirements = buildAiTaskRequirements(taskKind, {
    requiredContextSize: contextSizeFromText(sourceText),
    privacyLevel,
    requiresVision: includesAny(normalized, ["image", "screenshot", "vision"]),
  });

  return {
    ...requirements,
    sourceText,
    summary: summarizeAiTaskClass(requirements),
  };
}

export function summarizeAiTaskClass(task: AiTaskRequirements): string {
  return `${task.taskKind}: reasoning ${task.requiredReasoningDepth}, context ${task.requiredContextSize}, privacy ${task.privacyLevel}, cost ${task.costSensitivity}.`;
}
