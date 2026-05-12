import type {
  CodexForgeBrainImportance,
  CodexForgeBrainStatus,
  CodexForgeBrainTimestamp,
} from "@/lib/codexforge/brain/graph/types";

const DAY_MS = 24 * 60 * 60 * 1000;
const DEFAULT_STALE_AFTER_MS = 30 * DAY_MS;
const DEFAULT_HALF_LIFE_MS = 14 * DAY_MS;

const IMPORTANCE_RETENTION: Record<CodexForgeBrainImportance, number> = {
  low: 0.75,
  medium: 0.9,
  high: 1.2,
  critical: 1.45,
};

const STATUS_RETENTION: Record<CodexForgeBrainStatus, number> = {
  idle: 0.9,
  active: 1,
  done: 0.85,
  blocked: 0.95,
  error: 0.9,
  archived: 0.45,
};

export type CodexForgeCognitiveMemoryAgeInput = {
  createdAt?: CodexForgeBrainTimestamp;
  updatedAt?: CodexForgeBrainTimestamp;
  status?: CodexForgeBrainStatus;
  importance?: CodexForgeBrainImportance;
  pinned?: boolean;
  archived?: boolean;
  now?: CodexForgeBrainTimestamp;
  staleAfterMs?: number;
  halfLifeMs?: number;
};

export type CodexForgeCognitiveMemoryDecayInput = {
  ageMs: number;
  importance?: CodexForgeBrainImportance;
  pinned?: boolean;
  halfLifeMs?: number;
};

export type CodexForgeCognitiveMemoryAgeScore = {
  score: number;
  recency: number;
  decay: number;
  ageMs: number;
  stale: boolean;
  reasons: string[];
  breakdown: {
    recency: number;
    decay: number;
    pinRetention: number;
    importanceRetention: number;
    statusRetention: number;
    archivePenalty: number;
  };
};

function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

function positiveNumber(value: number | undefined, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) && value > 0
    ? value
    : fallback;
}

function resolveTimestamp(
  updatedAt: number | undefined,
  createdAt: number | undefined,
  fallback: number
): number {
  if (typeof updatedAt === "number" && Number.isFinite(updatedAt)) return updatedAt;
  if (typeof createdAt === "number" && Number.isFinite(createdAt)) return createdAt;
  return fallback;
}

export function calculateMemoryRecency(
  updatedAt: CodexForgeBrainTimestamp | undefined,
  now: CodexForgeBrainTimestamp,
  staleAfterMs = DEFAULT_STALE_AFTER_MS
): number {
  const freshnessWindow = positiveNumber(staleAfterMs, DEFAULT_STALE_AFTER_MS);
  const resolvedUpdatedAt = resolveTimestamp(updatedAt, undefined, now);
  const ageMs = Math.max(0, now - resolvedUpdatedAt);

  return clamp01(1 - ageMs / freshnessWindow);
}

export function calculateMemoryDecay(
  input: CodexForgeCognitiveMemoryDecayInput
): number {
  const baseHalfLife = positiveNumber(input.halfLifeMs, DEFAULT_HALF_LIFE_MS);
  const pinRetention = input.pinned ? 1.65 : 1;
  const importanceRetention = input.importance
    ? IMPORTANCE_RETENTION[input.importance]
    : 1;
  const effectiveHalfLife = baseHalfLife * pinRetention * importanceRetention;
  const ageMs = Math.max(0, input.ageMs);

  return clamp01(Math.exp((-Math.LN2 * ageMs) / effectiveHalfLife));
}

export function calculateMemoryAgeScore(
  input: CodexForgeCognitiveMemoryAgeInput
): CodexForgeCognitiveMemoryAgeScore {
  const currentTime = input.now ?? Date.now();
  const updatedAt = resolveTimestamp(input.updatedAt, input.createdAt, currentTime);
  const ageMs = Math.max(0, currentTime - updatedAt);
  const staleAfterMs = positiveNumber(input.staleAfterMs, DEFAULT_STALE_AFTER_MS);
  const recency = calculateMemoryRecency(updatedAt, currentTime, staleAfterMs);
  const decay = calculateMemoryDecay({
    ageMs,
    importance: input.importance,
    pinned: input.pinned,
    halfLifeMs: input.halfLifeMs,
  });
  const pinRetention = input.pinned ? 1 : 0.92;
  const importanceRetention = input.importance
    ? Math.min(1, IMPORTANCE_RETENTION[input.importance] / 1.2)
    : 0.82;
  const statusRetention = input.status ? STATUS_RETENTION[input.status] : 0.95;
  const archivePenalty =
    input.archived === true || input.status === "archived" ? 0.45 : 1;
  const score = clamp01(
    (recency * 0.55 + decay * 0.45) *
      pinRetention *
      importanceRetention *
      statusRetention *
      archivePenalty
  );
  const stale = ageMs >= staleAfterMs;
  const reasons: string[] = [];

  if (input.pinned) reasons.push("pinned-memory-decays-slower");
  if (input.importance === "critical" || input.importance === "high") {
    reasons.push(`importance-retention:${input.importance}`);
  }
  if (input.status) reasons.push(`status:${input.status}`);
  if (input.archived === true || input.status === "archived") {
    reasons.push("archived-memory-lowered");
  }
  if (stale) reasons.push("stale-recency-window");
  if (reasons.length === 0) reasons.push("standard-recency-decay");

  return {
    score,
    recency,
    decay,
    ageMs,
    stale,
    reasons,
    breakdown: {
      recency,
      decay,
      pinRetention,
      importanceRetention,
      statusRetention,
      archivePenalty,
    },
  };
}
