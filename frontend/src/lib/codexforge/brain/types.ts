import type {
  CodexForgeChatContext,
  CodexForgeChatMode,
  CodexForgeChatSuccessMeta,
  CodexForgePlanDomain,
  CodexForgeStructuredReply,
} from "@/lib/codexforge/types";
import type {
  CodexForgeBrainGraph,
  CodexForgeBrainGraphSnapshot,
  CodexForgeBrainNodeKind,
} from "./graph/types";

/* ================= CORE PROVIDER TYPES ================= */

export type CodexForgeBrainProvider =
  | "local-engine"
  | "ollama"
  | "openai"
  | "anthropic"
  | "custom";

export type CodexForgeBrainCapability =
  | "chat"
  | "structured"
  | "planning"
  | "execution"
  | "streaming"
  | "tools"
  | "vision"
  | "diffs"
  | "snapshot-awareness"
  | "graph-memory";

export type CodexForgeBrainHealth =
  | "unknown"
  | "ready"
  | "degraded"
  | "offline";

export type CodexForgeBrainStatus =
  | "idle"
  | "running"
  | "success"
  | "failed"
  | "cancelled";

/* ================= INPUT MESSAGE ================= */

export type CodexForgeBrainMessageRole = "system" | "user" | "assistant";

export type CodexForgeBrainMessage = {
  id: string;
  role: CodexForgeBrainMessageRole;
  text: string;
  ts: number;
};

/* ================= GRAPH CONTEXT ================= */

export type CodexForgeBrainGraphSummary = {
  nodeCount: number;
  edgeCount: number;
  kinds?: Partial<Record<CodexForgeBrainNodeKind, number>>;
  updatedAt?: number;
};

export type CodexForgeBrainGraphStats = CodexForgeBrainGraphSummary;

export type CodexForgeBrainFocusReason =
  | "conversation"
  | "task"
  | "memory"
  | "execution"
  | "manual"
  | "related"
  | "recent"
  | "summary";

export type CodexForgeBrainActivation = {
  nodeId: string;
  score: number;
  reason: CodexForgeBrainFocusReason | string;
};

export type CodexForgeBrainFocus = {
  nodeIds: string[];
  depth?: number;
  activations?: CodexForgeBrainActivation[];
};

export type CodexForgeBrainGraphContext = {
  graph?: CodexForgeBrainGraph | null;
  snapshot?: CodexForgeBrainGraphSnapshot | null;
  summary?: CodexForgeBrainGraphSummary;
  focusNodeIds?: string[];
  includeConnectedDepth?: number;
  focus?: CodexForgeBrainFocus;
};

/* ================= REQUEST ================= */

export type CodexForgeBrainRuntime = {
  requestId?: string;
  now?: number;
  timeoutMs?: number;
  preferredProvider?: CodexForgeBrainProvider;
  allowFallback?: boolean;
  temperature?: number;
  maxOutputTokens?: number;
};

export type CodexForgeBrainRequest = {
  messages: CodexForgeBrainMessage[];
  context: CodexForgeChatContext;
  runtime?: CodexForgeBrainRuntime;
  graph?: CodexForgeBrainGraphContext;
};

/* ================= RESPONSE ================= */

export type CodexForgeBrainRawMeta = {
  finishReason?: string;
};

export type CodexForgeBrainResponseMeta = {
  provider: CodexForgeBrainProvider;
  model: string;

  mode: string;
  usedFallback: boolean;

  durationMs?: number;
  warnings?: string[];

  capabilities?: CodexForgeBrainCapability[];
  domain?: CodexForgePlanDomain;

  graphUsed?: boolean;
  graphNodeCount?: number;
  graphEdgeCount?: number;
  graphFocusNodeIds?: string[];

  raw?: CodexForgeBrainRawMeta;
};

export type CodexForgeBrainResponse = {
  text: string;
  structured: CodexForgeStructuredReply | null;
  intent: string;
  meta: CodexForgeBrainResponseMeta;
};

/* ================= RUN RESULT ================= */

export type CodexForgeBrainRunResult = {
  ok: true;
  response: CodexForgeBrainResponse;
};

export type CodexForgeBrainRunFailure = {
  ok: false;
  error: string;
  provider: CodexForgeBrainProvider;
  retryable: boolean;
  health?: CodexForgeBrainHealth;
};

export type CodexForgeBrainRunOutcome =
  | CodexForgeBrainRunResult
  | CodexForgeBrainRunFailure;

/* ================= PROVIDER INFO ================= */

export type CodexForgeBrainProviderInfo = {
  provider: CodexForgeBrainProvider;
  label: string;
  model: string;
  health: CodexForgeBrainHealth;
  available: boolean;
  capabilities: CodexForgeBrainCapability[];
};

export type CodexForgeBrainRuntimeInfo = {
  provider: CodexForgeBrainProvider;
  model: string;
  health: CodexForgeBrainHealth;
  available: boolean;
  capabilities: CodexForgeBrainCapability[];
  status?: CodexForgeBrainStatus;
};

/* ================= BRAIN INTERFACE ================= */

export interface CodexForgeBrain {
  readonly provider: CodexForgeBrainProvider;
  readonly model: string;
  readonly capabilities: CodexForgeBrainCapability[];

  getInfo(): CodexForgeBrainProviderInfo;
  run(request: CodexForgeBrainRequest): Promise<CodexForgeBrainRunOutcome>;
}

/* ================= FACTORY CONFIG ================= */

export type CodexForgeBrainFactoryOptions = {
  preferredProvider?: CodexForgeBrainProvider;
  enableFallback?: boolean;

  ollama?: {
    enabled?: boolean;
    model?: string;
    baseUrl?: string;
    timeoutMs?: number;
  };

  openai?: {
    enabled?: boolean;
    model?: string;
  };

  anthropic?: {
    enabled?: boolean;
    model?: string;
  };
};

/* ================= NORMALIZED OPTIONS ================= */

export type NormalizedCodexForgeBrainFactoryOptions = {
  preferredProvider: CodexForgeBrainProvider;
  enableFallback: boolean;

  ollama: {
    enabled: boolean;
    model: string;
    baseUrl: string;
    timeoutMs: number;
  };

  openai: {
    enabled: boolean;
    model: string;
  };

  anthropic: {
    enabled: boolean;
    model: string;
  };
};

/* ================= DEFAULTS ================= */

export const DEFAULT_CODEXFORGE_BRAIN_PROVIDER: CodexForgeBrainProvider =
  "local-engine";

export const DEFAULT_CODEXFORGE_BRAIN_MODEL =
  "codexforge-local-structured-v2";

export const DEFAULT_CODEXFORGE_BRAIN_CAPABILITIES: readonly CodexForgeBrainCapability[] =
  [
    "chat",
    "structured",
    "planning",
    "execution",
    "diffs",
    "snapshot-awareness",
    "graph-memory",
  ] as const;

export const DEFAULT_CODEXFORGE_OLLAMA_MODEL = "qwen3:14b";
export const DEFAULT_CODEXFORGE_OLLAMA_BASE_URL = "http://127.0.0.1:11434";
export const DEFAULT_CODEXFORGE_OLLAMA_TIMEOUT_MS = 60_000;

export const DEFAULT_CODEXFORGE_OPENAI_MODEL = "gpt-5";
export const DEFAULT_CODEXFORGE_ANTHROPIC_MODEL = "claude-sonnet-4-5";

/* ================= INTERNAL CONSTANTS ================= */

const VALID_BRAIN_PROVIDERS = new Set<CodexForgeBrainProvider>([
  "local-engine",
  "ollama",
  "openai",
  "anthropic",
  "custom",
]);

const VALID_BRAIN_CAPABILITIES = new Set<CodexForgeBrainCapability>([
  "chat",
  "structured",
  "planning",
  "execution",
  "streaming",
  "tools",
  "vision",
  "diffs",
  "snapshot-awareness",
  "graph-memory",
]);

const VALID_BRAIN_HEALTH_VALUES = new Set<CodexForgeBrainHealth>([
  "unknown",
  "ready",
  "degraded",
  "offline",
]);

const VALID_CHAT_MODES = new Set<CodexForgeChatMode>([
  "local",
  "local-fallback",
  "local-execution",
  "local-execution-fallback",
  "remote",
]);

/* ================= TYPE GUARDS ================= */

export function isCodexForgeBrainProvider(
  value: unknown
): value is CodexForgeBrainProvider {
  return (
    typeof value === "string" &&
    VALID_BRAIN_PROVIDERS.has(value as CodexForgeBrainProvider)
  );
}

export function isCodexForgeBrainCapability(
  value: unknown
): value is CodexForgeBrainCapability {
  return (
    typeof value === "string" &&
    VALID_BRAIN_CAPABILITIES.has(value as CodexForgeBrainCapability)
  );
}

export function isCodexForgeBrainHealth(
  value: unknown
): value is CodexForgeBrainHealth {
  return (
    typeof value === "string" &&
    VALID_BRAIN_HEALTH_VALUES.has(value as CodexForgeBrainHealth)
  );
}

export function isCodexForgeChatMode(
  value: unknown
): value is CodexForgeChatMode {
  return (
    typeof value === "string" &&
    VALID_CHAT_MODES.has(value as CodexForgeChatMode)
  );
}

/* ================= HELPERS ================= */

function normalizeNonEmptyString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function normalizeBoolean(value: unknown, fallback: boolean): boolean {
  return typeof value === "boolean" ? value : fallback;
}

function normalizePositiveNumber(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) && value > 0
    ? value
    : fallback;
}

/* ================= NORMALIZATION ================= */

export function normalizeCodexForgeBrainFactoryOptions(
  options?: CodexForgeBrainFactoryOptions
): NormalizedCodexForgeBrainFactoryOptions {
  return {
    preferredProvider: isCodexForgeBrainProvider(options?.preferredProvider)
      ? options.preferredProvider
      : DEFAULT_CODEXFORGE_BRAIN_PROVIDER,

    enableFallback: normalizeBoolean(options?.enableFallback, true),

    ollama: {
      enabled: options?.ollama?.enabled === true,
      model:
        normalizeNonEmptyString(options?.ollama?.model) ??
        DEFAULT_CODEXFORGE_OLLAMA_MODEL,
      baseUrl:
        normalizeNonEmptyString(options?.ollama?.baseUrl) ??
        DEFAULT_CODEXFORGE_OLLAMA_BASE_URL,
      timeoutMs: normalizePositiveNumber(
        options?.ollama?.timeoutMs,
        DEFAULT_CODEXFORGE_OLLAMA_TIMEOUT_MS
      ),
    },

    openai: {
      enabled: options?.openai?.enabled === true,
      model:
        normalizeNonEmptyString(options?.openai?.model) ??
        DEFAULT_CODEXFORGE_OPENAI_MODEL,
    },

    anthropic: {
      enabled: options?.anthropic?.enabled === true,
      model:
        normalizeNonEmptyString(options?.anthropic?.model) ??
        DEFAULT_CODEXFORGE_ANTHROPIC_MODEL,
    },
  };
}

/* ================= GRAPH HELPERS ================= */

export function summarizeCodexForgeBrainGraph(
  graph?: CodexForgeBrainGraph | null
): CodexForgeBrainGraphSummary | undefined {
  if (!graph) return undefined;

  const kinds: Partial<Record<CodexForgeBrainNodeKind, number>> = {};

  for (const node of graph.nodes) {
    kinds[node.kind] = (kinds[node.kind] ?? 0) + 1;
  }

  return {
    nodeCount: graph.nodes.length,
    edgeCount: graph.edges.length,
    kinds,
    updatedAt: graph.meta.updatedAt,
  };
}

export function getCodexForgeBrainGraphCounts(
  graph?: CodexForgeBrainGraph | null
): { nodeCount: number; edgeCount: number } {
  return {
    nodeCount: graph?.nodes.length ?? 0,
    edgeCount: graph?.edges.length ?? 0,
  };
}

export function getCodexForgeBrainGraphFocusNodeIds(
  context?: CodexForgeBrainGraphContext | null
): string[] {
  const direct = Array.isArray(context?.focusNodeIds)
    ? context.focusNodeIds
    : [];
  const nested = Array.isArray(context?.focus?.nodeIds)
    ? context.focus.nodeIds
    : [];

  return Array.from(new Set([...direct, ...nested].filter(Boolean)));
}

export function getCodexForgeBrainGraphDepth(
  context?: CodexForgeBrainGraphContext | null
): number | undefined {
  if (
    typeof context?.includeConnectedDepth === "number" &&
    Number.isFinite(context.includeConnectedDepth) &&
    context.includeConnectedDepth >= 0
  ) {
    return context.includeConnectedDepth;
  }

  if (
    typeof context?.focus?.depth === "number" &&
    Number.isFinite(context.focus.depth) &&
    context.focus.depth >= 0
  ) {
    return context.focus.depth;
  }

  return undefined;
}

/* ================= CHAT META ADAPTER ================= */

export function toCodexForgeChatMeta(
  response: CodexForgeBrainResponse,
  overrides?: Partial<CodexForgeChatSuccessMeta>
): CodexForgeChatSuccessMeta {
  const mode = isCodexForgeChatMode(response.meta.mode)
    ? response.meta.mode
    : undefined;

  return {
    model: response.meta.model,
    ...(mode ? { mode } : {}),
    usedFallback: response.meta.usedFallback,
    intent: response.intent,
    ...(response.meta.domain ? { domain: response.meta.domain } : {}),
    ...(overrides ?? {}),
  };
}

/* ================= RESULT HELPERS ================= */

export function createCodexForgeBrainSuccess(
  response: CodexForgeBrainResponse
): CodexForgeBrainRunResult {
  return {
    ok: true,
    response,
  };
}

export function createCodexForgeBrainFailure(
  error: string,
  provider: CodexForgeBrainProvider,
  retryable: boolean,
  health?: CodexForgeBrainHealth
): CodexForgeBrainRunFailure {
  return {
    ok: false,
    error,
    provider,
    retryable,
    ...(health ? { health } : {}),
  };
}