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
    pathAreaMatch: number;
    graphProximity: number;
    recency: number;
    importance: number;
    riskSeverity: number;
    activeTaskMatch: number;
    runtimeEventCorrelation: number;
  };
};

const RISK_SCORE = {
  low: 0.25,
  medium: 0.5,
  high: 0.78,
  critical: 1,
} as const;

export function clampScore(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(1, Number(value.toFixed(4))));
}

export function tokenizeContextText(value: string | undefined): string[] {
  if (!value) return [];
  return Array.from(
    new Set(
      value
        .toLowerCase()
        .replace(/[^a-z0-9/_\-.]+/g, " ")
        .split(/\s+/)
        .map((token) => token.trim())
        .filter((token) => token.length >= 3)
    )
  ).sort();
}

function keywordOverlap(text: string | undefined, focusText: string | undefined): number {
  const tokens = tokenizeContextText(text);
  const focusTokens = new Set(tokenizeContextText(focusText));
  if (tokens.length === 0 || focusTokens.size === 0) return 0;
  const overlap = tokens.filter((token) => focusTokens.has(token)).length;
  return clampScore(overlap / Math.max(tokens.length, focusTokens.size));
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
  const leftParts = left.split("/");
  const rightParts = right.split("/");
  const shared = leftParts.filter((part, index) => part === rightParts[index]).length;
  return clampScore(shared / Math.max(leftParts.length, rightParts.length));
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

export function calculateRelevanceScore(
  input: CodexForgeRelevanceInput
): CodexForgeRelevanceScore {
  const factors = {
    keywordOverlap: keywordOverlap(
      [input.label, input.text, input.path].filter(Boolean).join(" "),
      input.focusText
    ),
    pathAreaMatch: pathAreaMatch(input.path, input.focusPath),
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
  };
  const score = clampScore(
    factors.keywordOverlap * 0.18 +
      factors.pathAreaMatch * 0.16 +
      factors.graphProximity * 0.14 +
      factors.recency * 0.12 +
      factors.importance * 0.14 +
      factors.riskSeverity * 0.1 +
      factors.activeTaskMatch * 0.08 +
      factors.runtimeEventCorrelation * 0.08
  );
  const reasons = Object.entries(factors)
    .filter(([, value]) => value > 0)
    .map(([key, value]) => `${key}:${value.toFixed(2)}`)
    .sort();

  return {
    id: input.id,
    score,
    confidence: clampScore(0.35 + reasons.length * 0.08 + score * 0.35),
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
