import type {
  CodexForgeBrain,
  CodexForgeBrainCapability,
  CodexForgeBrainFactoryOptions,
  CodexForgeBrainHealth,
  CodexForgeBrainProviderInfo,
  CodexForgeBrainRequest,
  CodexForgeBrainResponse,
  CodexForgeBrainRunOutcome,
} from "./types";
import type {
  CodexForgePlanDomain,
  CodexForgeStructuredReply,
} from "@/lib/codexforge/types";

/* ================= CONSTANTS ================= */

const OLLAMA_PROVIDER = "ollama" as const;

const OLLAMA_DEFAULT_CAPABILITIES: CodexForgeBrainCapability[] = [
  "chat",
  "structured",
  "planning",
  "execution",
];

const LIMITS = {
  maxMessages: 80,
  maxMessageText: 8000,
  maxSystemGuide: 4000,
  maxMemoryItems: 24,
  maxMemoryItemText: 400,
  requestTimeoutMs: 60_000,
  maxWarnings: 12,
} as const;

const VALID_DOMAINS: readonly CodexForgePlanDomain[] = [
  "general",
  "web",
  "research",
  "debug",
  "game-server",
  "movie",
  "video",
  "comfyui",
  "unreal",
  "automation",
] as const;

/* ================= TYPES ================= */

type OllamaChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type OllamaChatRequest = {
  model: string;
  messages: OllamaChatMessage[];
  stream: false;
  format?: "json";
  options?: {
    temperature?: number;
    num_predict?: number;
  };
};

type OllamaChatResponse = {
  model?: string;
  message?: {
    role?: string;
    content?: string;
  };
  done?: boolean;
  done_reason?: string;
  total_duration?: number;
  load_duration?: number;
  prompt_eval_count?: number;
  eval_count?: number;
};

type OllamaTagsResponse = {
  models?: Array<{
    name?: string;
    model?: string;
  }>;
};

type OllamaParsedResponse = {
  text: string;
  structured: CodexForgeStructuredReply | null;
  intent: string;
  warnings: string[];
};

/* ================= HELPERS ================= */

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function clampText(text: string, max: number): string {
  return text.length <= max ? text : `${text.slice(0, max - 1)}…`;
}

function normalizeString(value: unknown, max: number): string | undefined {
  if (!isNonEmptyString(value)) return undefined;
  return clampText(value.trim(), max);
}

function uniqueStrings(values: string[]): string[] {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function normalizeWarnings(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return uniqueStrings(
    value
      .filter((item): item is string => typeof item === "string")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => clampText(item, 240))
  ).slice(0, LIMITS.maxWarnings);
}

function normalizeStructuredReply(
  value: unknown
): CodexForgeStructuredReply | null {
  if (!value || !isRecord(value)) return null;
  return value as CodexForgeStructuredReply;
}

function normalizeDomain(value: unknown): CodexForgePlanDomain | undefined {
  return typeof value === "string" &&
    VALID_DOMAINS.includes(value as CodexForgePlanDomain)
    ? (value as CodexForgePlanDomain)
    : undefined;
}

function createAbortController(timeoutMs: number) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  return {
    controller,
    cleanup() {
      clearTimeout(timeoutId);
    },
  };
}

function getResolvedRuntimeOptions(options?: CodexForgeBrainFactoryOptions) {
  return {
    enabled: options?.ollama?.enabled === true,
    model: options?.ollama?.model?.trim() || "qwen3:14b",
    baseUrl: options?.ollama?.baseUrl?.trim() || "http://127.0.0.1:11434",
    timeoutMs:
      typeof options?.ollama?.timeoutMs === "number" &&
      Number.isFinite(options.ollama.timeoutMs) &&
      options.ollama.timeoutMs > 0
        ? options.ollama.timeoutMs
        : LIMITS.requestTimeoutMs,
  };
}

function getIntentFromContext(request: CodexForgeBrainRequest): string {
  if (request.context.executionRequest?.mode === "execute-task-step") {
    return "execution";
  }

  if (isNonEmptyString(request.context.mode)) {
    return request.context.mode.trim();
  }

  return "chat";
}

function buildSystemPrompt(request: CodexForgeBrainRequest): string {
  const context = request.context;
  const parts: string[] = [];

  parts.push("You are CodexForge, an AI developer workspace brain.");
  parts.push(
    "Return concise, structured, practical answers for planning, debugging, coding, research, and execution."
  );
  parts.push("Prefer the smallest safe next step.");
  parts.push("If execution context exists, stay aligned with it.");
  parts.push(
    'Return strict JSON shaped like {"text":"string","structured":object|null,"intent":"string","warnings":["string"]}.'
  );
  parts.push("Do not wrap JSON in markdown fences.");
  parts.push("If you cannot produce structured content, still return valid JSON.");

  if (isNonEmptyString(context.systemGuide)) {
    parts.push(
      `System guide:\n${clampText(context.systemGuide, LIMITS.maxSystemGuide)}`
    );
  }

  if (isNonEmptyString(context.projectName)) {
    parts.push(`Project: ${context.projectName.trim()}`);
  }

  if (isNonEmptyString(context.repoPath)) {
    parts.push(`Repo path: ${context.repoPath.trim()}`);
  }

  if (context.activePlan?.goal) {
    parts.push(`Active plan goal: ${context.activePlan.goal}`);
  }

  if (context.activePlan?.steps?.length) {
    parts.push(
      `Active plan steps:\n${context.activePlan.steps
        .slice(0, 12)
        .map((step, index) => `${index + 1}. ${step}`)
        .join("\n")}`
    );
  }

  if (context.memory?.length) {
    const memoryLines = context.memory
      .slice(0, LIMITS.maxMemoryItems)
      .map((item) => {
        const content = clampText(item.content, LIMITS.maxMemoryItemText);
        return `- [${item.type}] ${content}`;
      });

    if (memoryLines.length > 0) {
      parts.push(`Memory:\n${memoryLines.join("\n")}`);
    }
  }

  if (context.executionRequest?.mode === "execute-task-step") {
    parts.push("Execution request mode is active.");

    if (isNonEmptyString(context.executionRequest.taskGoal)) {
      parts.push(`Task goal: ${context.executionRequest.taskGoal.trim()}`);
    }

    if (typeof context.executionRequest.stepIndex === "number") {
      parts.push(`Task step index: ${context.executionRequest.stepIndex + 1}`);
    }

    if (isNonEmptyString(context.executionRequest.stepText)) {
      parts.push(`Task step text: ${context.executionRequest.stepText.trim()}`);
    }
  }

  if (context.execution?.enginePhase) {
    parts.push(`Engine phase: ${context.execution.enginePhase}`);
  }

  if (typeof context.execution?.diffCount === "number") {
    parts.push(`Known diff count: ${context.execution.diffCount}`);
  }

  if (typeof context.execution?.snapshotFileCount === "number") {
    parts.push(
      `Known snapshot file count: ${context.execution.snapshotFileCount}`
    );
  }

  return parts.join("\n\n");
}

function sanitizeMessages(request: CodexForgeBrainRequest): OllamaChatMessage[] {
  const systemPrompt = buildSystemPrompt(request);

  const history = request.messages
    .slice(-LIMITS.maxMessages)
    .filter(
      (message): message is CodexForgeBrainRequest["messages"][number] =>
        !!message &&
        typeof message === "object" &&
        (message.role === "system" ||
          message.role === "user" ||
          message.role === "assistant") &&
        isNonEmptyString(message.text)
    )
    .map<OllamaChatMessage>((message) => ({
      role: message.role,
      content: clampText(message.text.trim(), LIMITS.maxMessageText),
    }));

  return [
    {
      role: "system",
      content: systemPrompt,
    },
    ...history,
  ];
}

function buildOllamaRequest(
  request: CodexForgeBrainRequest,
  model: string
): OllamaChatRequest {
  const temperature =
    typeof request.runtime?.temperature === "number" &&
    Number.isFinite(request.runtime.temperature)
      ? request.runtime.temperature
      : 0.2;

  const maxOutputTokens =
    typeof request.runtime?.maxOutputTokens === "number" &&
    Number.isFinite(request.runtime.maxOutputTokens) &&
    request.runtime.maxOutputTokens > 0
      ? Math.floor(request.runtime.maxOutputTokens)
      : 1400;

  return {
    model,
    messages: sanitizeMessages(request),
    stream: false,
    format: "json",
    options: {
      temperature,
      num_predict: maxOutputTokens,
    },
  };
}

function parseJsonCandidate(text: string): Record<string, unknown> | null {
  const trimmed = text.trim();
  if (!trimmed) return null;

  try {
    const parsed = JSON.parse(trimmed);
    return isRecord(parsed) ? parsed : null;
  } catch {
    // continue
  }

  const firstBrace = trimmed.indexOf("{");
  const lastBrace = trimmed.lastIndexOf("}");
  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    return null;
  }

  const candidate = trimmed.slice(firstBrace, lastBrace + 1);

  try {
    const parsed = JSON.parse(candidate);
    return isRecord(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function parseOllamaContent(content: string): OllamaParsedResponse {
  const parsed = parseJsonCandidate(content);

  if (!parsed) {
    return {
      text: content.trim(),
      structured: null,
      intent: "chat",
      warnings: ["Ollama returned non-JSON content."],
    };
  }

  const text =
    normalizeString(parsed.text, LIMITS.maxMessageText) ??
    normalizeString(parsed.reply, LIMITS.maxMessageText) ??
    content.trim();

  const structured = normalizeStructuredReply(parsed.structured);
  const intent = normalizeString(parsed.intent, 120) ?? "chat";
  const warnings = normalizeWarnings(parsed.warnings);

  return {
    text,
    structured,
    intent,
    warnings,
  };
}

function buildFailure(args: {
  error: string;
  retryable: boolean;
  health: CodexForgeBrainHealth;
}): CodexForgeBrainRunOutcome {
  return {
    ok: false,
    error: args.error,
    provider: OLLAMA_PROVIDER,
    retryable: args.retryable,
    health: args.health,
  };
}

function buildResponse(args: {
  request: CodexForgeBrainRequest;
  model: string;
  text: string;
  structured: CodexForgeStructuredReply | null;
  intent: string;
  warnings: string[];
  durationMs: number;
  finishReason?: string;
}): CodexForgeBrainResponse {
  const domain =
    normalizeDomain(args.structured?.domain) ??
    normalizeDomain(args.structured?.plan?.domain) ??
    normalizeDomain(args.request.context.activePlan?.domain) ??
    "general";

  return {
    text: args.text,
    structured: args.structured,
    intent: args.intent,
    meta: {
      provider: OLLAMA_PROVIDER,
      model: args.model,
      mode: getIntentFromContext(args.request),
      usedFallback: false,
      durationMs: args.durationMs,
      warnings: args.warnings,
      capabilities: [...OLLAMA_DEFAULT_CAPABILITIES],
      domain,
      raw: {
        finishReason: args.finishReason,
      },
    },
  };
}

/* ================= BRAIN ================= */

export class OllamaBrain implements CodexForgeBrain {
  readonly provider = OLLAMA_PROVIDER;
  readonly model: string;
  readonly capabilities = [...OLLAMA_DEFAULT_CAPABILITIES];

  private readonly baseUrl: string;
  private readonly timeoutMs: number;
  private readonly enabled: boolean;

  constructor(options?: CodexForgeBrainFactoryOptions) {
    const resolved = getResolvedRuntimeOptions(options);

    this.model = resolved.model;
    this.baseUrl = resolved.baseUrl.replace(/\/+$/, "");
    this.timeoutMs = resolved.timeoutMs;
    this.enabled = resolved.enabled;
  }

  getInfo(): CodexForgeBrainProviderInfo {
    return {
      provider: this.provider,
      label: "Ollama",
      model: this.model,
      health: this.enabled ? "unknown" : "offline",
      available: this.enabled,
      capabilities: [...this.capabilities],
    };
  }

  async run(request: CodexForgeBrainRequest): Promise<CodexForgeBrainRunOutcome> {
    if (!this.enabled) {
      return buildFailure({
        error: "Ollama brain is disabled.",
        retryable: false,
        health: "offline",
      });
    }

    const startedAt = Date.now();
    const runtimeTimeoutMs =
      typeof request.runtime?.timeoutMs === "number" &&
      Number.isFinite(request.runtime.timeoutMs) &&
      request.runtime.timeoutMs > 0
        ? request.runtime.timeoutMs
        : this.timeoutMs;

    const abort = createAbortController(runtimeTimeoutMs);

    try {
      const payload = buildOllamaRequest(request, this.model);

      const response = await fetch(`${this.baseUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: abort.controller.signal,
      });

      if (!response.ok) {
        const bodyText = await response.text().catch(() => "");
        return buildFailure({
          error: `Ollama chat request failed (${response.status})${
            bodyText ? `: ${bodyText}` : "."
          }`,
          retryable: response.status >= 500,
          health: "degraded",
        });
      }

      const data = (await response.json().catch(() => null)) as
        | OllamaChatResponse
        | null;

      if (!data || !isRecord(data)) {
        return buildFailure({
          error: "Ollama returned an invalid response.",
          retryable: true,
          health: "degraded",
        });
      }

      const content = normalizeString(
        data.message?.content,
        LIMITS.maxMessageText
      );
      if (!content) {
        return buildFailure({
          error: "Ollama returned empty content.",
          retryable: true,
          health: "degraded",
        });
      }

      const parsed = parseOllamaContent(content);
      const durationMs = Date.now() - startedAt;

      return {
        ok: true,
        response: buildResponse({
          request,
          model: normalizeString(data.model, 200) ?? this.model,
          text: parsed.text,
          structured: parsed.structured,
          intent: parsed.intent,
          warnings: parsed.warnings,
          durationMs,
          finishReason: normalizeString(data.done_reason, 120),
        }),
      };
    } catch (error) {
      const isAbortError =
        error instanceof Error && error.name === "AbortError";

      const message = isAbortError
        ? `Ollama request timed out after ${runtimeTimeoutMs}ms.`
        : error instanceof Error && error.message.trim().length > 0
          ? error.message
          : "Ollama request failed.";

      return buildFailure({
        error: message,
        retryable: !isAbortError,
        health: "degraded",
      });
    } finally {
      abort.cleanup();
    }
  }

  async checkHealth(): Promise<CodexForgeBrainHealth> {
    if (!this.enabled) {
      return "offline";
    }

    const abort = createAbortController(Math.min(this.timeoutMs, 10_000));

    try {
      const response = await fetch(`${this.baseUrl}/api/tags`, {
        method: "GET",
        signal: abort.controller.signal,
      });

      if (!response.ok) {
        return "degraded";
      }

      const data = (await response.json().catch(() => null)) as
        | OllamaTagsResponse
        | null;

      if (!data || !Array.isArray(data.models)) {
        return "degraded";
      }

      const hasModel = data.models.some(
        (model) => model?.name === this.model || model?.model === this.model
      );

      return hasModel ? "ready" : "degraded";
    } catch {
      return "offline";
    } finally {
      abort.cleanup();
    }
  }

  getDebugSnapshot() {
    return {
      provider: this.provider,
      model: this.model,
      baseUrl: this.baseUrl,
      timeoutMs: this.timeoutMs,
      enabled: this.enabled,
      capabilities: [...this.capabilities],
    };
  }
}

/* ================= FACTORY ================= */

export function createOllamaBrain(
  options?: CodexForgeBrainFactoryOptions
): OllamaBrain {
  return new OllamaBrain(options);
}