import type {
  CodexForgeBrainEdge,
  CodexForgeBrainNodeId,
} from "@/lib/codexforge/brain/graph/types";
import type { CodexForgeBrainRuntimeEvent } from "../runtime-types";
import type { CodexForgePredictiveContextSignal } from "./predictive-context";

export type CodexForgeRelevanceInput = {
  id: string;
  label?: string;
  text?: string;
  path?: string;
  focusText?: string;
  focusPath?: string;
  nodeId?: CodexForgeBrainNodeId;
  focusNodeIds?: readonly CodexForgeBrainNodeId[];
  graphEdges?: readonly CodexForgeBrainEdge[];
  timestamp?: number;
  now?: number;
  importance?: number;
  riskSeverity?: "low" | "medium" | "high" | "critical";
  activeTaskId?: string;
  taskId?: string;
  events?: readonly CodexForgeBrainRuntimeEvent[];
};

export type CodexForgeRelevanceScore = {
  id: string;
  score: number;
  confidence: number;
  timestamp: number;
  reasons: string[];
  factors: {
    keywordOverlap: number;
    phraseOverlap: number;
    pathAreaMatch: number;
    pathDepthMatch: number;
    graphProximity: number;
    recency: number;
    importance: number;
    riskSeverity: number;
    activeTaskMatch: number;
    runtimeEventCorrelation: number;
    failureSignalBoost: number;
    implementationIntentBoost: number;
  };
};

const RISK_SCORE = {
  low: 0.25,
  medium: 0.5,
  high: 0.78,
  critical: 1,
} as const;

const STOP_WORDS = new Set([
  "and",
  "are",
  "but",
  "for",
  "from",
  "has",
  "have",
  "into",
  "that",
  "the",
  "this",
  "with",
  "your",
]);

const FAILURE_TERMS = new Set([
  "build",
  "error",
  "fail",
  "failed",
  "failure",
  "lint",
  "regression",
  "smoke",
  "test",
  "typecheck",
]);

const IMPLEMENTATION_TERMS = new Set([
  "api",
  "component",
  "context",
  "engine",
  "route",
  "runtime",
  "service",
  "store",
  "types",
]);

export function clampScore(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(1, Number(value.toFixed(4))));
}

function normalizeContextText(value: string | undefined): string {
  return (value ?? "")
    .toLowerCase()
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[^a-z0-9/_\-.]+/g, " ")
    .trim();
}

export function tokenizeContextText(value: string | undefined): string[] {
  const normalized = normalizeContextText(value);
  if (!normalized) return [];
  return Array.from(
    new Set(
      normalized
        .split(/\s+/)
        .flatMap((token) => token.split(/[/_\-.]+/).concat(token))
        .map((token) => token.trim())
        .filter((token) => token.length >= 3 && !STOP_WORDS.has(token))
    )
  ).sort();
}

function tokenSet(value: string | undefined): Set<string> {
  return new Set(tokenizeContextText(value));
}

function overlapRatio(left: Set<string>, right: Set<string>): number {
  if (left.size === 0 || right.size === 0) return 0;
  let overlap = 0;
  for (const token of left) {
    if (right.has(token)) overlap += 1;
  }
  return clampScore(overlap / Math.sqrt(left.size * right.size));
}

function keywordOverlap(text: string | undefined, focusText: string | undefined): number {
  return overlapRatio(tokenSet(text), tokenSet(focusText));
}

function phraseTokens(value: string | undefined): Set<string> {
  const tokens = tokenizeContextText(value);
  const phrases = new Set<string>();
  for (let index = 0; index < tokens.length - 1; index += 1) {
    phrases.add(`${tokens[index]} ${tokens[index + 1]}`);
  }
  for (let index = 0; index < tokens.length - 2; index += 1) {
    phrases.add(`${tokens[index]} ${tokens[index + 1]} ${tokens[index + 2]}`);
  }
  return phrases;
}

function phraseOverlap(text: string | undefined, focusText: string | undefined): number {
  return overlapRatio(phraseTokens(text), phraseTokens(focusText));
}

function pathArea(path: string | undefined): string {
  if (!path) return "";
  const normalized = path.replaceAll("\\", "/").toLowerCase();
  if (normalized.includes("/brain/runtime/context/")) return "predictive-context";
  if (normalized.includes("/brain/runtime/memory/")) return "memory";
  if (normalized.includes("/brain/runtime/")) return "runtime";
  if (normalized.includes("/files/")) return "files";
  if (normalized.includes("/app/api/")) return "api";
  if (normalized.includes("/chat/")) return "chat";
  if (normalized.includes("scripts/smoke-")) return "smoke";
  if (normalized.includes("/components/")) return "ui";
  return normalized.split("/").slice(0, 3).join("/");
}

function pathAreaMatch(path: string | undefined, focusPath: string | undefined): number {
  if (!path || !focusPath) return 0;
  const left = path.replaceAll("\\", "/").toLowerCase();
  const right = focusPath.replaceAll("\\", "/").toLowerCase();
  if (left === right) return 1;
  if (pathArea(left) && pathArea(left) === pathArea(right)) return 0.72;
  return pathDepthMatch(left, right);
}

function pathDepthMatch(path: string | undefined, focusPath: string | undefined): number {
  if (!path || !focusPath) return 0;
  const leftParts = path.replaceAll("\\", "/").toLowerCase().split("/");
  const rightParts = focusPath.replaceAll("\\", "/").toLowerCase().split("/");
  const sharedPrefix = leftParts.filter((part, index) => part === rightParts[index]).length;
  const sharedAny = leftParts.filter((part) => rightParts.includes(part)).length;
  return clampScore(
    sharedPrefix / Math.max(leftParts.length, rightParts.length) +
      (sharedAny / Math.max(leftParts.length, rightParts.length)) * 0.35
  );
}

function graphProximity(
  nodeId: CodexForgeBrainNodeId | undefined,
  focusNodeIds: readonly CodexForgeBrainNodeId[] | undefined,
  edges: readonly CodexForgeBrainEdge[] | undefined
): number {
  if (!nodeId || !focusNodeIds?.length) return 0;
  if (focusNodeIds.includes(nodeId)) return 1;
  const connected = (edges ?? []).some(
    (edge) =>
      (edge.from === nodeId && focusNodeIds.includes(edge.to)) ||
      (edge.to === nodeId && focusNodeIds.includes(edge.from))
  );
  return connected ? 0.62 : 0;
}

function recency(timestamp: number | undefined, now: number | undefined): number {
  if (typeof timestamp !== "number" || typeof now !== "number") return 0;
  const ageMs = Math.max(0, now - timestamp);
  const sevenDays = 7 * 24 * 60 * 60 * 1000;
  return clampScore(1 - ageMs / sevenDays);
}

function runtimeEventCorrelation(
  id: string,
  taskId: string | undefined,
  nodeId: string | undefined,
  events: readonly CodexForgeBrainRuntimeEvent[] | undefined
): number {
  if (!events?.length) return 0;
  const matches = events.filter((event) => {
    const payload = event.payload as Record<string, unknown>;
    return (
      event.id === id ||
      payload.taskId === taskId ||
      payload.nodeId === nodeId ||
      payload.executionId === id ||
      payload.diffId === id ||
      payload.memoryId === id
    );
  }).length;
  return clampScore(matches / 4);
}

function domainBoost(text: string | undefined, focusText: string | undefined, terms: Set<string>): number {
  const textTokens = tokenSet(text);
  const focusTokens = tokenSet(focusText);
  const textHits = [...terms].filter((term) => textTokens.has(term)).length;
  const focusHits = [...terms].filter((term) => focusTokens.has(term)).length;
  if (textHits === 0 || focusHits === 0) return 0;
  return clampScore((textHits + focusHits) / (terms.size * 0.6));
}

function buildReasons(factors: CodexForgeRelevanceScore["factors"]): string[] {
  return Object.entries(factors)
    .filter(([, value]) => value > 0)
    .sort(([, left], [, right]) => right - left)
    .map(([key, value]) => `${key}:${value.toFixed(2)}`);
}

export function calculateRelevanceScore(
  input: CodexForgeRelevanceInput
): CodexForgeRelevanceScore {
  const searchableText = [input.label, input.text, input.path].filter(Boolean).join(" ");
  const focusText = [input.focusText, input.focusPath].filter(Boolean).join(" ");
  const factors = {
    keywordOverlap: keywordOverlap(searchableText, focusText),
    phraseOverlap: phraseOverlap(searchableText, focusText),
    pathAreaMatch: pathAreaMatch(input.path, input.focusPath),
    pathDepthMatch: pathDepthMatch(input.path, input.focusPath),
    graphProximity: graphProximity(input.nodeId, input.focusNodeIds, input.graphEdges),
    recency: recency(input.timestamp, input.now),
    importance: clampScore(input.importance ?? 0),
    riskSeverity: input.riskSeverity ? RISK_SCORE[input.riskSeverity] : 0,
    activeTaskMatch:
      input.activeTaskId && input.taskId && input.activeTaskId === input.taskId ? 1 : 0,
    runtimeEventCorrelation: runtimeEventCorrelation(
      input.id,
      input.taskId,
      input.nodeId,
      input.events
    ),
    failureSignalBoost: domainBoost(searchableText, focusText, FAILURE_TERMS),
    implementationIntentBoost: domainBoost(searchableText, focusText, IMPLEMENTATION_TERMS),
  };
  const score = clampScore(
    factors.keywordOverlap * 0.16 +
      factors.phraseOverlap * 0.1 +
      factors.pathAreaMatch * 0.14 +
      factors.pathDepthMatch * 0.08 +
      factors.graphProximity * 0.13 +
      factors.recency * 0.08 +
      factors.importance * 0.12 +
      factors.riskSeverity * 0.08 +
      factors.activeTaskMatch * 0.07 +
      factors.runtimeEventCorrelation * 0.07 +
      factors.failureSignalBoost * 0.09 +
      factors.implementationIntentBoost * 0.06
  );
  const reasons = buildReasons(factors);

  return {
    id: input.id,
    score,
    confidence: clampScore(0.32 + Math.min(reasons.length, 6) * 0.07 + score * 0.38),
    timestamp: input.timestamp ?? 0,
    reasons: reasons.length ? reasons : ["baseline:0.00"],
    factors,
  };
}

export function rankContextSignals<T extends CodexForgePredictiveContextSignal>(
  signals: readonly T[],
  limit = signals.length
): T[] {
  return [...signals]
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.confidence - a.confidence ||
        b.timestamp - a.timestamp ||
        a.id.localeCompare(b.id)
    )
    .slice(0, Math.max(0, limit));
}
