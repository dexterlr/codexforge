import type {
  CodexForgeBrainImportance,
  CodexForgeBrainNode,
  CodexForgeBrainNodeKind,
  CodexForgeBrainStatus,
} from "@/lib/codexforge/brain/graph/types";
import type {
  CodexForgeBrainRankMemoryInput,
  CodexForgeBrainRankedMemory,
} from "./runtime-types";
import { getRuntimeEventNodeIds } from "./event-store";

const DEFAULT_MEMORY_KINDS: CodexForgeBrainNodeKind[] = [
  "memory",
  "decision",
  "task",
  "plan",
  "note",
  "research",
];

const IMPORTANCE_SCORE: Record<CodexForgeBrainImportance, number> = {
  low: 10,
  medium: 40,
  high: 80,
  critical: 120,
};

const STATUS_SCORE: Record<CodexForgeBrainStatus, number> = {
  idle: 5,
  active: 55,
  done: 25,
  blocked: 70,
  error: 85,
  archived: -60,
};

function getRecencyScore(updatedAt: number, currentTime: number): number {
  const ageHours = Math.max(0, currentTime - updatedAt) / 3_600_000;
  return Math.max(0, 45 - ageHours);
}

function buildEventSignalCounts(
  input: CodexForgeBrainRankMemoryInput
): Record<string, number> {
  const counts: Record<string, number> = {};

  for (const event of input.events ?? []) {
    for (const nodeId of getRuntimeEventNodeIds(event)) {
      counts[nodeId] = (counts[nodeId] ?? 0) + 1;
    }
  }

  return counts;
}

function scoreNode(args: {
  node: CodexForgeBrainNode;
  now: number;
  focusNodeIds: Set<string>;
  eventSignalCounts: Record<string, number>;
}): CodexForgeBrainRankedMemory {
  const reasons: string[] = [];
  const { node, now: currentTime, focusNodeIds, eventSignalCounts } = args;
  let score = 0;

  if (node.meta.pinned) {
    score += 100;
    reasons.push("pinned");
  }

  if (node.meta.importance) {
    const importanceScore = IMPORTANCE_SCORE[node.meta.importance] ?? 0;
    score += importanceScore;
    reasons.push(`importance:${node.meta.importance}`);
  }

  if (node.meta.status) {
    const statusScore = STATUS_SCORE[node.meta.status] ?? 0;
    score += statusScore;
    reasons.push(`status:${node.meta.status}`);
  }

  const updatedAt = node.meta.updatedAt ?? node.meta.createdAt ?? currentTime;
  const recencyScore = getRecencyScore(updatedAt, currentTime);
  score += recencyScore;
  if (recencyScore > 0) reasons.push("recent");

  if (focusNodeIds.has(node.id)) {
    score += 35;
    reasons.push("focused");
  }

  const eventSignals = eventSignalCounts[node.id] ?? 0;
  if (eventSignals > 0) {
    score += Math.min(40, eventSignals * 10);
    reasons.push("runtime-signal");
  }

  if (node.meta.archived) {
    score -= 80;
    reasons.push("archived");
  }

  return {
    node,
    score,
    reasons,
    updatedAt,
    status: node.meta.status,
    importance: node.meta.importance,
    pinned: node.meta.pinned === true,
  };
}

export function rankMemory(
  input: CodexForgeBrainRankMemoryInput
): CodexForgeBrainRankedMemory[] {
  const includeKinds = new Set(input.includeKinds ?? DEFAULT_MEMORY_KINDS);
  const focusNodeIds = new Set(input.focusNodeIds ?? []);
  const currentTime = input.now ?? Date.now();
  const eventSignalCounts = buildEventSignalCounts(input);

  return input.graph.nodes
    .filter((node) => includeKinds.has(node.kind))
    .map((node) =>
      scoreNode({
        node,
        now: currentTime,
        focusNodeIds,
        eventSignalCounts,
      })
    )
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.updatedAt - a.updatedAt;
    })
    .slice(0, input.limit ?? 12);
}
