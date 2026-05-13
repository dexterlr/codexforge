import type {
  CodexForgeBrainFocusNeighborhood,
  CodexForgeBrainFocusSignal,
  CodexForgeBrainFocusSignalKind,
  CodexForgeBrainFocusTarget,
} from "./focus-types";

export const CODEXFORGE_BRAIN_FOCUS_SIGNAL_KINDS: readonly CodexForgeBrainFocusSignalKind[] = [
  "memory",
  "concept",
  "task",
  "execution",
  "risk",
  "file",
  "architecture",
  "agent",
  "recommendation",
  "insight",
  "health",
  "topology",
  "replay",
  "lineage",
  "context",
  "approval-boundary",
] as const;

export function groupFocusSignalsByKind(
  signals: readonly CodexForgeBrainFocusSignal[]
): Record<CodexForgeBrainFocusSignalKind, CodexForgeBrainFocusSignal[]> {
  const grouped = CODEXFORGE_BRAIN_FOCUS_SIGNAL_KINDS.reduce(
    (next, kind) => {
      next[kind] = [];
      return next;
    },
    {} as Record<CodexForgeBrainFocusSignalKind, CodexForgeBrainFocusSignal[]>
  );

  for (const signal of [...signals].sort(compareSignals)) {
    grouped[signal.kind].push(signal);
  }

  return grouped;
}

export function selectFocusNeighborhoodHighlights(
  signals: readonly CodexForgeBrainFocusSignal[],
  limit = 8
): CodexForgeBrainFocusSignal[] {
  return [...signals].sort(compareSignals).slice(0, Math.max(0, limit));
}

export function recommendFocusNextSafeDrilldown(
  target: CodexForgeBrainFocusTarget,
  highlights: readonly CodexForgeBrainFocusSignal[]
): string {
  const approval = highlights.find((signal) => signal.approvalRequired);
  if (approval) {
    return `Inspect approval boundary for ${approval.label}; keep navigation read-only.`;
  }

  const top = highlights[0];
  if (top) {
    return top.nextSafeDrilldown;
  }

  return target.nextSafeDrilldown;
}

export function buildBrainFocusNeighborhood(input: {
  focusTarget: CodexForgeBrainFocusTarget;
  signals: readonly CodexForgeBrainFocusSignal[];
}): CodexForgeBrainFocusNeighborhood {
  const related = [...input.signals].sort(compareSignals);
  const groupedSignals = groupFocusSignalsByKind(related);
  const highlights = selectFocusNeighborhoodHighlights(related, 8);

  return {
    focusTarget: input.focusTarget,
    signals: related,
    groupedSignals,
    highlights,
    relatedNodes: related.filter((signal) => signal.nodeIds.length > 0),
    relatedFiles: groupedSignals.file,
    relatedTasks: groupedSignals.task,
    relatedMemories: groupedSignals.memory,
    relatedConcepts: groupedSignals.concept,
    relatedRisks: groupedSignals.risk,
    relatedRecommendations: groupedSignals.recommendation,
    relatedAgents: groupedSignals.agent,
    relatedExecutions: groupedSignals.execution,
    nextSafeDrilldown: recommendFocusNextSafeDrilldown(input.focusTarget, highlights),
  };
}

function compareSignals(
  a: CodexForgeBrainFocusSignal,
  b: CodexForgeBrainFocusSignal
): number {
  if (b.relevance !== a.relevance) return b.relevance - a.relevance;
  const severityDiff = severityRank(b.severity) - severityRank(a.severity);
  if (severityDiff !== 0) return severityDiff;
  if (b.timestamp !== a.timestamp) return b.timestamp - a.timestamp;
  return a.id.localeCompare(b.id);
}

function severityRank(severity: string): number {
  switch (severity) {
    case "critical":
      return 5;
    case "high":
      return 4;
    case "medium":
      return 3;
    case "low":
      return 2;
    default:
      return 1;
  }
}
