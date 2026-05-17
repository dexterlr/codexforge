import type {
  CodexForgeBrainGraph,
  CodexForgeBrainImportance,
  CodexForgeBrainNode,
  CodexForgeBrainNodeKind,
  CodexForgeBrainStatus,
  CodexForgeBrainTimestamp,
} from "@/lib/codexforge/brain/graph/types";
import { getRuntimeEventNodeIds } from "../event-store";
import { rankMemory } from "../memory-ranker";
import type { CodexForgeBrainRuntimeEvent } from "../runtime-types";
import { calculateMemoryAgeScore } from "./memory-aging";

const IMPORTANCE_SCORE: Record<CodexForgeBrainImportance, number> = {
  low: 0.25,
  medium: 0.5,
  high: 0.78,
  critical: 1,
};

const STATUS_SCORE: Record<CodexForgeBrainStatus, number> = {
  idle: 0.42,
  active: 0.78,
  done: 0.65,
  blocked: 0.5,
  error: 0.45,
  archived: 0.2,
};

const DEFAULT_MEMORY_KINDS: CodexForgeBrainNodeKind[] = [
  "memory",
  "decision",
  "task",
  "plan",
  "note",
  "research",
];

export type CodexForgeCognitiveMemoryConfidenceInput = {
  node: CodexForgeBrainNode;
  events?: readonly CodexForgeBrainRuntimeEvent[];
  now?: CodexForgeBrainTimestamp;
  contradictionRisk?: number;
  focusNodeIds?: readonly string[];
};

export type CodexForgeCognitiveMemoryScoreBreakdown = {
  score: number;
  confidence: number;
  importance: number;
  recency: number;
  status: number;
  pinned: number;
  archived: number;
  sourceRefs: number;
  repeatedEventSignals: number;
  sourceDiversity: number;
  contradictionRisk: number;
  baselineRankSignal: number;
  reasons: string[];
};

export type CodexForgeCognitiveMemoryScore = {
  node: CodexForgeBrainNode;
  score: number;
  confidence: number;
  importance: number;
  updatedAt: CodexForgeBrainTimestamp;
  reasons: string[];
  breakdown: CodexForgeCognitiveMemoryScoreBreakdown;
};

export type CodexForgeRankCognitiveMemoryInput = {
  graph: CodexForgeBrainGraph;
  events?: readonly CodexForgeBrainRuntimeEvent[];
  focusNodeIds?: readonly string[];
  includeKinds?: readonly CodexForgeBrainNodeKind[];
  contradictionRisks?: Readonly<Record<string, number>>;
  limit?: number;
  now?: CodexForgeBrainTimestamp;
};

function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

function uniqueCount(values: readonly string[]): number {
  return new Set(values.map((value) => value.trim()).filter(Boolean)).size;
}

function getEventSignalCount(
  node: CodexForgeBrainNode,
  events: readonly CodexForgeBrainRuntimeEvent[]
): number {
  let count = 0;

  for (const event of events) {
    if (getRuntimeEventNodeIds(event).includes(node.id)) {
      count += 1;
    }
  }

  return count;
}

function getSourceRefScore(node: CodexForgeBrainNode): number {
  const refs = node.meta.sourceRefs ?? [];
  if (refs.length === 0) return 0.2;
  return clamp01(0.35 + Math.min(5, refs.length) * 0.12);
}

function getSourceDiversityScore(node: CodexForgeBrainNode): number {
  const refs = node.meta.sourceRefs ?? [];
  if (refs.length === 0) return 0.1;
  return clamp01(0.2 + uniqueCount(refs.map((ref) => ref.type)) * 0.18);
}

function getBaselineRankSignals(
  input: CodexForgeRankCognitiveMemoryInput
): Map<string, number> {
  const ranked = rankMemory({
    graph: input.graph,
    events: input.events ? [...input.events] : undefined,
    focusNodeIds: input.focusNodeIds ? [...input.focusNodeIds] : undefined,
    includeKinds: input.includeKinds ? [...input.includeKinds] : undefined,
    limit: input.graph.nodes.length,
    now: input.now,
  });
  const strongest = ranked.reduce(
    (max, item) => Math.max(max, Math.max(0, item.score)),
    0
  );

  return new Map(
    ranked.map((item) => [
      item.node.id,
      strongest > 0 ? clamp01(Math.max(0, item.score) / strongest) : 0,
    ])
  );
}

export function calculateMemoryImportance(
  node: CodexForgeBrainNode
): number {
  const base = node.meta.importance
    ? IMPORTANCE_SCORE[node.meta.importance]
    : 0.38;
  const pinnedBoost = node.meta.pinned ? 0.12 : 0;
  const archivePenalty =
    node.meta.archived === true || node.meta.status === "archived" ? -0.22 : 0;

  return clamp01(base + pinnedBoost + archivePenalty);
}

export function buildCognitiveMemoryScoreBreakdown(
  input: CodexForgeCognitiveMemoryConfidenceInput & {
    baselineRankSignal?: number;
  }
): CodexForgeCognitiveMemoryScoreBreakdown {
  const node = input.node;
  const events = input.events ?? [];
  const age = calculateMemoryAgeScore({
    createdAt: node.meta.createdAt,
    updatedAt: node.meta.updatedAt,
    status: node.meta.status,
    importance: node.meta.importance,
    pinned: node.meta.pinned,
    archived: node.meta.archived,
    now: input.now,
  });
  const importance = calculateMemoryImportance(node);
  const status = node.meta.status ? STATUS_SCORE[node.meta.status] : 0.5;
  const pinned = node.meta.pinned ? 1 : 0;
  const archived =
    node.meta.archived === true || node.meta.status === "archived" ? 1 : 0;
  const sourceRefs = getSourceRefScore(node);
  const sourceDiversity = getSourceDiversityScore(node);
  const repeatedEventSignals = clamp01(getEventSignalCount(node, events) / 5);
  const contradictionRisk = clamp01(input.contradictionRisk ?? 0);
  const baselineRankSignal = clamp01(input.baselineRankSignal ?? 0);
  const confidence = clamp01(
    importance * 0.2 +
      age.score * 0.18 +
      status * 0.14 +
      sourceRefs * 0.12 +
      sourceDiversity * 0.1 +
      repeatedEventSignals * 0.12 +
      baselineRankSignal * 0.08 +
      pinned * 0.08 -
      archived * 0.22 -
      contradictionRisk * 0.18
  );
  const score = clamp01(
    confidence * 0.58 +
      importance * 0.18 +
      age.recency * 0.1 +
      repeatedEventSignals * 0.08 +
      sourceDiversity * 0.06 -
      contradictionRisk * 0.12
  );
  const reasons = [
    `importance:${node.meta.importance ?? "unspecified"}`,
    `status:${node.meta.status ?? "unspecified"}`,
    `recency:${age.recency.toFixed(2)}`,
    sourceRefs > 0.2 ? "source-refs-present" : "source-refs-sparse",
    sourceDiversity > 0.38 ? "source-diversity-present" : "source-diversity-low",
    repeatedEventSignals > 0 ? "repeated-runtime-signal" : "no-runtime-repeat",
    baselineRankSignal > 0 ? "phase-1-rank-signal" : "no-phase-1-rank-signal",
    contradictionRisk > 0 ? "contradiction-risk-candidate" : "no-contradiction-risk",
    ...(node.meta.pinned ? ["pinned"] : []),
    ...(archived ? ["archived-lowered"] : []),
  ];

  return {
    score,
    confidence,
    importance,
    recency: age.recency,
    status,
    pinned,
    archived,
    sourceRefs,
    repeatedEventSignals,
    sourceDiversity,
    contradictionRisk,
    baselineRankSignal,
    reasons,
  };
}

export function calculateMemoryConfidence(
  input: CodexForgeCognitiveMemoryConfidenceInput
): CodexForgeCognitiveMemoryScore {
  const breakdown = buildCognitiveMemoryScoreBreakdown(input);
  const updatedAt = input.node.meta.updatedAt ?? input.node.meta.createdAt ?? input.now ?? 0;

  return {
    node: input.node,
    score: breakdown.score,
    confidence: breakdown.confidence,
    importance: breakdown.importance,
    updatedAt,
    reasons: breakdown.reasons,
    breakdown,
  };
}

export function rankCognitiveMemory(
  input: CodexForgeRankCognitiveMemoryInput
): CodexForgeCognitiveMemoryScore[] {
  const includeKinds = new Set(input.includeKinds ?? DEFAULT_MEMORY_KINDS);
  const baselineRankSignals = getBaselineRankSignals(input);

  return input.graph.nodes
    .filter((node) => includeKinds.has(node.kind))
    .map((node) => {
      const breakdown = buildCognitiveMemoryScoreBreakdown({
        node,
        events: input.events,
        now: input.now,
        contradictionRisk: input.contradictionRisks?.[node.id],
        focusNodeIds: input.focusNodeIds,
        baselineRankSignal: baselineRankSignals.get(node.id) ?? 0,
      });

      return {
        node,
        score: breakdown.score,
        confidence: breakdown.confidence,
        importance: breakdown.importance,
        updatedAt: node.meta.updatedAt ?? node.meta.createdAt ?? input.now ?? 0,
        reasons: breakdown.reasons,
        breakdown,
      };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (b.confidence !== a.confidence) return b.confidence - a.confidence;
      if (b.updatedAt !== a.updatedAt) return b.updatedAt - a.updatedAt;
      return a.node.id.localeCompare(b.node.id);
    })
    .slice(0, input.limit ?? 12);
}
