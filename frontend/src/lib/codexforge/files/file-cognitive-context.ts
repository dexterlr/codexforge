import {
  buildCognitiveMemoryFixtureNodes,
  buildRecommendationFixtureQueue,
  buildRuntimeHealthFixtureSignals,
  buildSemanticTopologyFixtureTopology,
} from "@/lib/codexforge/brain/runtime";
import { calculateFileRisk } from "./file-risk";
import type {
  CodexForgeFileNode,
  CodexForgeFileRuntimeContextSignal,
} from "./types";

export type CodexForgeFileCognitiveSignalKind =
  | "runtime-health"
  | "recommendation"
  | "memory-cluster"
  | "topology-hint"
  | "risk-hint"
  | "concept"
  | "brain-node";

export type CodexForgeFileCognitiveSignal = {
  id: string;
  kind: CodexForgeFileCognitiveSignalKind;
  label: string;
  detail: string;
  score: number;
  reasons: string[];
};

export type CodexForgeFileCognitiveContext = {
  filePath: string;
  summary: string;
  signals: CodexForgeFileCognitiveSignal[];
  relatedConcepts: string[];
  relatedBrainNodes: Array<{
    id: string;
    label: string;
    kind: string;
  }>;
  runtimeSignalCount: number;
  memoryClusterCount: number;
  readOnly: true;
};

function normalizeScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function includesAny(haystack: string, needles: string[]): boolean {
  const lowerHaystack = haystack.toLowerCase();
  return needles.some((needle) => lowerHaystack.includes(needle.toLowerCase()));
}

function dataString(data: unknown, key: string): string {
  if (data !== null && typeof data === "object" && key in data) {
    const value = (data as Record<string, unknown>)[key];
    return typeof value === "string" ? value : "";
  }

  return "";
}

function dataStringArray(data: unknown, key: string): string[] {
  if (data !== null && typeof data === "object" && key in data) {
    const value = (data as Record<string, unknown>)[key];
    return Array.isArray(value)
      ? value.filter((item): item is string => typeof item === "string")
      : [];
  }

  return [];
}

function signal(args: CodexForgeFileCognitiveSignal): CodexForgeFileCognitiveSignal {
  return { ...args, score: normalizeScore(args.score) };
}

export function rankFileContextSignals(
  signals: CodexForgeFileCognitiveSignal[]
): CodexForgeFileCognitiveSignal[] {
  return [...signals].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (a.kind !== b.kind) return a.kind.localeCompare(b.kind);
    return a.id.localeCompare(b.id);
  });
}

export function buildFileCognitiveContext(args: {
  file: CodexForgeFileNode;
  runtimeSignals?: CodexForgeFileRuntimeContextSignal[];
}): CodexForgeFileCognitiveContext {
  const { file } = args;
  const runtimeSignals = args.runtimeSignals ?? [];
  const risk = calculateFileRisk(file);
  const memoryNodes = buildCognitiveMemoryFixtureNodes();
  const recommendationQueue = buildRecommendationFixtureQueue();
  const topology = buildSemanticTopologyFixtureTopology();
  const healthSignals = buildRuntimeHealthFixtureSignals();
  const searchTerms = [
    file.path,
    file.name,
    file.kind,
    file.ownerArea,
    ...file.concepts,
    ...file.tags,
  ].filter(Boolean);

  const signals: CodexForgeFileCognitiveSignal[] = [
    ...runtimeSignals.map((item) =>
      signal({
        id: `runtime:${item.id}`,
        kind: "runtime-health",
        label: item.label,
        detail: item.detail,
        score:
          item.strength === "strong"
            ? 86
            : item.strength === "medium"
              ? 68
              : 44,
        reasons: item.reasons ?? [item.source],
      })
    ),
    ...healthSignals
      .filter((item) => includesAny(`${item.title} ${item.detail}`, searchTerms))
      .map((item) =>
        signal({
          id: `health:${item.id}`,
          kind: "runtime-health",
          label: item.title,
          detail: item.detail,
          score: item.severity === "critical" ? 92 : item.severity === "high" ? 80 : 58,
          reasons: [...item.reasons],
        })
      ),
    ...risk.signals.map((item) =>
      signal({
        id: `risk:${file.path}:${item.id}`,
        kind: "risk-hint",
        label: item.label,
        detail: item.reason,
        score: item.score > 0 ? 62 + item.score : 42,
        reasons: [risk.level, `${risk.score}/100`],
      })
    ),
    ...file.concepts.map((concept) =>
      signal({
        id: `concept:${file.path}:${concept}`,
        kind: "concept",
        label: concept,
        detail: `Concept inferred from ${file.ownerArea}.`,
        score: 54,
        reasons: ["file concept", file.kind],
      })
    ),
  ];

  const relatedMemoryNodes = memoryNodes.filter((node) => {
    const text = `${node.id} ${dataString(node.data, "label")} ${dataString(
      node.data,
      "content"
    )} ${dataStringArray(node.data, "tags").join(" ")}`;
    return includesAny(text, searchTerms);
  });

  for (const node of relatedMemoryNodes) {
    signals.push(
      signal({
        id: `memory:${node.id}`,
        kind: "memory-cluster",
        label: dataString(node.data, "label") || node.id,
        detail:
          dataString(node.data, "summary") ||
          dataString(node.data, "content") ||
          "Related memory node.",
        score: node.meta.importance === "critical" ? 90 : node.meta.importance === "high" ? 78 : 58,
        reasons: ["readonly memory fixture", node.meta.status ?? "unknown"],
      })
    );
  }

  const recommendations = recommendationQueue.insights.filter((item) =>
    includesAny(
      `${item.title} ${item.detail} ${item.relatedFilePaths.join(" ")}`,
      searchTerms
    )
  );

  for (const item of recommendations.slice(0, 4)) {
    signals.push(
      signal({
        id: `recommendation:${item.id}`,
        kind: "recommendation",
        label: item.title,
        detail: item.detail,
        score: Math.round(item.score * 100),
        reasons: item.evidence.map((evidence) => evidence.label),
      })
    );
  }

  const topologyHints = topology.clusters.filter((cluster) =>
    includesAny(`${cluster.label} ${cluster.nextSafeAction} ${cluster.nodeIds.join(" ")} ${cluster.filePaths.join(" ")}`, searchTerms)
  );

  for (const cluster of topologyHints.slice(0, 4)) {
    signals.push(
      signal({
        id: `topology:${cluster.id}`,
        kind: "topology-hint",
        label: cluster.label,
        detail: cluster.nextSafeAction,
        score: Math.round(cluster.weight * 100),
        reasons: [...cluster.reasons],
      })
    );
  }

  const relatedBrainNodes = [...relatedMemoryNodes]
    .sort((a, b) => a.id.localeCompare(b.id))
    .slice(0, 8)
    .map((node) => ({
      id: node.id,
      label: dataString(node.data, "label") || node.id,
      kind: node.kind,
    }));

  const ranked = rankFileContextSignals(signals).slice(0, 14);

  return {
    filePath: file.path,
    summary: summarizeFileCognitiveContext({
      filePath: file.path,
      summary: "",
      signals: ranked,
      relatedConcepts: file.concepts,
      relatedBrainNodes,
      runtimeSignalCount: runtimeSignals.length,
      memoryClusterCount: relatedMemoryNodes.length,
      readOnly: true,
    }),
    signals: ranked,
    relatedConcepts: [...file.concepts].sort(),
    relatedBrainNodes,
    runtimeSignalCount: runtimeSignals.length,
    memoryClusterCount: relatedMemoryNodes.length,
    readOnly: true,
  };
}

export function summarizeFileCognitiveContext(
  context: Omit<CodexForgeFileCognitiveContext, "summary"> | CodexForgeFileCognitiveContext
): string {
  const strongest = context.signals[0];
  if (!strongest) {
    return `No cognitive context is attached to ${context.filePath}; inspect the file before planning.`;
  }

  return `${context.filePath} has ${context.signals.length} read-only cognitive signals; strongest is ${strongest.label}.`;
}
