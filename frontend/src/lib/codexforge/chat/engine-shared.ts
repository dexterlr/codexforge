import type {
  CodexForgeChatContext,
  CodexForgeExecutionPhase,
  CodexForgePlanDomain,
  CodexForgePlanStatus,
} from "../types";

export const VALID_DOMAINS: readonly CodexForgePlanDomain[] = [
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

export const VALID_EXECUTION_PHASES: readonly CodexForgeExecutionPhase[] = [
  "idle",
  "planning",
  "awaiting_plan_approval",
  "diffing",
  "awaiting_diff_approval",
  "applying",
  "testing",
  "done",
  "error",
  "fallback",
] as const;

export const VALID_PLAN_STATUSES: readonly CodexForgePlanStatus[] = [
  "draft",
  "active",
  "completed",
  "executed",
  "blocked",
  "needs-approval",
] as const;

export const LIMITS = {
  maxWarnings: 12,
  maxSectionItems: 8,
  maxTools: 8,
  maxFiles: 8,
  maxCommands: 8,
  maxRisks: 8,
  maxNextSteps: 8,
  maxPlanSteps: 12,
  maxTags: 16,
  maxContextItems: 10,
  maxStatusItems: 10,
  maxSampledPaths: 8,
  maxGraphMessages: 40,
  maxGraphMemoryItems: 20,
  maxGraphDiffs: 12,
  maxGraphSteps: 16,
  maxUnderstandingItems: 8,
  maxGoalText: 240,
  maxSummaryText: 220,
} as const;

export type ExecutionRequest = {
  taskId?: string;
  taskGoal?: string;
  stepIndex?: number;
  stepText?: string;
  mode?: string;
} | null;

export function now(): number {
  return Date.now();
}

export function clean(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

export function lower(value: string): string {
  return value.toLowerCase();
}

export function dedupe(values: string[]): string[] {
  return Array.from(new Set(values.map(clean).filter(Boolean)));
}

export function includesAny(text: string, terms: readonly string[]): boolean {
  return terms.some((term) => text.includes(term));
}

export function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  return value as Record<string, unknown>;
}

export function asString(value: unknown): string {
  return typeof value === "string" ? clean(value) : "";
}

export function asFiniteNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

export function clampList(values: string[], max: number): string[] {
  return dedupe(values).slice(0, max);
}

export function clampOptionalList(
  values: string[],
  max: number
): string[] | undefined {
  const normalized = clampList(values, max);
  return normalized.length > 0 ? normalized : undefined;
}

export function normalizeDomain(value: unknown): CodexForgePlanDomain | null {
  return typeof value === "string" &&
    VALID_DOMAINS.includes(value as CodexForgePlanDomain)
    ? (value as CodexForgePlanDomain)
    : null;
}

export function normalizeExecutionPhase(
  value: unknown
): CodexForgeExecutionPhase | undefined {
  return typeof value === "string" &&
    VALID_EXECUTION_PHASES.includes(value as CodexForgeExecutionPhase)
    ? (value as CodexForgeExecutionPhase)
    : undefined;
}

export function clampText(text: string, max = 240): string {
  if (text.length <= max) {
    return text;
  }

  return `${text.slice(0, Math.max(0, max - 3))}...`;
}

export function stableHash(input: string): string {
  let hash = 2166136261;

  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return Math.abs(hash >>> 0).toString(16);
}

export function toIdPart(value: string): string {
  const normalized = lower(clean(value))
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (normalized.length > 0) {
    return normalized.slice(0, 80);
  }

  return stableHash(value);
}

export function buildStableId(
  prefix: string,
  ...parts: Array<string | number | undefined>
): string {
  const normalizedParts = parts
    .filter(
      (part): part is string | number => part !== undefined && part !== null
    )
    .map((part) => String(part))
    .map(clean)
    .filter(Boolean)
    .map(toIdPart);

  if (normalizedParts.length === 0) {
    return `${prefix}:${stableHash(prefix)}`;
  }

  return `${prefix}:${normalizedParts.join(":")}`;
}

export function tryJsonStringify(value: unknown): string {
  try {
    return JSON.stringify(value);
  } catch {
    return "";
  }
}

export function mergeWarnings(
  ...warningGroups: Array<string[] | undefined>
): string[] {
  return clampList(
    warningGroups.flatMap((group) => group ?? []).filter(Boolean),
    LIMITS.maxWarnings
  );
}

export function getExecutionRequest(
  context: CodexForgeChatContext
): ExecutionRequest {
  const record = asRecord(
    (context as CodexForgeChatContext & { executionRequest?: unknown })
      .executionRequest
  );

  if (!record) {
    return null;
  }

  const stepIndex = asFiniteNumber(record.stepIndex);

  return {
    taskId: asString(record.taskId) || undefined,
    taskGoal: asString(record.taskGoal) || undefined,
    stepIndex,
    stepText: asString(record.stepText) || undefined,
    mode: asString(record.mode) || undefined,
  };
}

export function isExecutionMode(context: CodexForgeChatContext): boolean {
  const request = getExecutionRequest(context);
  return !!request && request.mode === "execute-task-step";
}

export function getExecutionPhaseFromContext(
  context: CodexForgeChatContext
): CodexForgeExecutionPhase | undefined {
  return normalizeExecutionPhase(context.execution?.enginePhase);
}

export function getExecutionDiffCount(
  context: CodexForgeChatContext
): number | undefined {
  return asFiniteNumber(context.execution?.diffCount);
}

export function getExecutionSnapshotFileCount(
  context: CodexForgeChatContext
): number | undefined {
  return asFiniteNumber(context.execution?.snapshotFileCount);
}

export function resolveExecutionPhase(
  context: CodexForgeChatContext
): CodexForgeExecutionPhase {
  const fromContext = getExecutionPhaseFromContext(context);
  if (fromContext) {
    return fromContext;
  }

  return isExecutionMode(context) ? "done" : "planning";
}