import type { CodexForgeBrainNode } from "@/lib/codexforge/brain/graph/types";
import type {
  CodexForgeSemanticHeatmap,
  CodexForgeSemanticHeatmapCell,
  CodexForgeSemanticHeatmapLayer,
  CodexForgeTopologyBuildInput,
  CodexForgeTopologySignal,
  CodexForgeTopologySignalKind,
} from "./topology-types";
import { groupTopologySignals } from "./knowledge-topology";
import { summarizeSemanticHeatmap } from "./topology-summarizer";

const LAYER_DEFINITIONS: Array<{
  id: CodexForgeSemanticHeatmapLayer["id"];
  label: string;
  description: string;
  kinds: CodexForgeTopologySignalKind[];
}> = [
  {
    id: "memory-density",
    label: "Memory density",
    description: "Ranked memory, promoted facts, stale notes, and cluster concentration.",
    kinds: ["memory"],
  },
  {
    id: "risk-intensity",
    label: "Risk intensity",
    description: "Failures, blockers, risky files, schema drift, and high-severity regions.",
    kinds: ["risk"],
  },
  {
    id: "concept-strength",
    label: "Concept strength",
    description: "Synthesized concepts, decisions, tags, and shared semantic terms.",
    kinds: ["concept"],
  },
  {
    id: "execution-activity",
    label: "Execution activity",
    description: "Runs, diffs, replay frames, and task execution events.",
    kinds: ["execution", "task", "recovery"],
  },
  {
    id: "agent-activity",
    label: "Agent activity",
    description: "Agent handoffs, reviews, and orchestration hotspots.",
    kinds: ["agent"],
  },
  {
    id: "prediction-relevance",
    label: "Prediction relevance",
    description: "Predictive context signals and next-action relevance.",
    kinds: ["prediction"],
  },
  {
    id: "architecture-hotspots",
    label: "Architecture hotspots",
    description: "Files, repos, paths, subsystems, and architectural retrieval signals.",
    kinds: ["architecture", "file"],
  },
  {
    id: "contradiction-pressure",
    label: "Contradiction pressure",
    description: "Contradictory, stale, or low-confidence memory regions.",
    kinds: ["contradiction"],
  },
];

export function normalizeHeatmapIntensity(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

export function scoreSemanticHeatmapCell(args: {
  score?: number;
  risk?: number;
  confidence?: number;
  density?: number;
  signalCount?: number;
}): number {
  const signalBoost = normalizeHeatmapIntensity((args.signalCount ?? 0) / 6);
  return normalizeHeatmapIntensity(
    normalizeHeatmapIntensity(args.score ?? 0) * 0.36 +
      normalizeHeatmapIntensity(args.risk ?? 0) * 0.24 +
      normalizeHeatmapIntensity(args.confidence ?? 0) * 0.2 +
      normalizeHeatmapIntensity(args.density ?? 0) * 0.12 +
      signalBoost * 0.08
  );
}

function labelForNode(node: CodexForgeBrainNode): string {
  const data = node.data as Record<string, unknown>;
  return String(data.label ?? data.summary ?? data.goal ?? data.content ?? data.text ?? node.id);
}

function buildCell(signal: CodexForgeTopologySignal): CodexForgeSemanticHeatmapCell {
  const density = normalizeHeatmapIntensity(
    (signal.nodeIds.length + signal.eventIds.length + signal.filePaths.length) / 8
  );
  return {
    id: `cell:${signal.id}`,
    label: signal.label,
    kind: signal.kind,
    intensity: scoreSemanticHeatmapCell({
      score: signal.score,
      risk: signal.risk,
      confidence: signal.confidence,
      density,
      signalCount: signal.reasons.length,
    }),
    risk: normalizeHeatmapIntensity(signal.risk),
    confidence: normalizeHeatmapIntensity(signal.confidence),
    density,
    reasons: signal.reasons.slice().sort(),
    supportingSignals: signal.keywords.slice(0, 6),
    refs: {
      nodeIds: signal.nodeIds.slice().sort(),
      eventIds: signal.eventIds.slice().sort(),
      filePaths: signal.filePaths.slice().sort(),
      clusterIds: [signal.id],
    },
  };
}

export function buildSemanticHeatmapLayer(
  id: CodexForgeSemanticHeatmapLayer["id"],
  signals: readonly CodexForgeTopologySignal[]
): CodexForgeSemanticHeatmapLayer {
  const definition = LAYER_DEFINITIONS.find((item) => item.id === id) ?? LAYER_DEFINITIONS[0];
  const cells = signals
    .filter((signal) => definition.kinds.includes(signal.kind))
    .map(buildCell)
    .sort((a, b) => {
      if (b.intensity !== a.intensity) return b.intensity - a.intensity;
      return a.id.localeCompare(b.id);
    })
    .slice(0, 12);

  return {
    id: definition.id,
    label: definition.label,
    description: definition.description,
    cells,
  };
}

export function buildSemanticHeatmap(
  input: CodexForgeTopologyBuildInput
): CodexForgeSemanticHeatmap {
  const groupedSignals = groupTopologySignals(input);
  const graphSignals = input.graph.nodes.map((node) => ({
    id: `graph:${node.id}`,
    label: labelForNode(node),
    kind: node.kind === "diff" ? "file" : node.kind === "run" ? "execution" : node.kind === "task" || node.kind === "plan" ? "task" : node.kind === "memory" || node.kind === "decision" || node.kind === "note" ? "memory" : "concept",
    score: node.meta.importance === "critical" ? 1 : node.meta.importance === "high" ? 0.78 : node.meta.importance === "medium" ? 0.54 : 0.3,
    risk: node.meta.status === "error" || node.meta.status === "blocked" ? 0.8 : node.meta.archived ? 0.42 : 0.18,
    confidence: node.meta.pinned ? 0.86 : 0.62,
    timestamp: node.meta.updatedAt ?? node.meta.createdAt ?? 0,
    tags: Array.isArray((node.data as Record<string, unknown>).tags) ? ((node.data as Record<string, unknown>).tags as string[]) : [],
    keywords: [node.kind],
    sourceRefs: (node.meta.sourceRefs ?? []).map((ref) => `${ref.type}:${ref.id}`),
    reasons: [`node-kind:${node.kind}`, `status:${node.meta.status ?? "idle"}`],
    nodeIds: [node.id],
    eventIds: [],
    filePaths: typeof (node.data as Record<string, unknown>).filePath === "string" ? [String((node.data as Record<string, unknown>).filePath)] : [],
  } satisfies CodexForgeTopologySignal));
  const signals = [...groupedSignals, ...graphSignals];
  const layers = LAYER_DEFINITIONS.map((definition) =>
    buildSemanticHeatmapLayer(definition.id, signals)
  );

  return {
    generatedAt: input.now ?? input.graph.meta.updatedAt ?? 0,
    layers,
    summary: summarizeSemanticHeatmap({ generatedAt: input.now ?? 0, layers, summary: emptySummary() }),
  };
}

function emptySummary() {
  return {
    status: "empty" as const,
    text: "",
    hotspotCount: 0,
    densestMemoryRegions: [],
    highestRiskHotspots: [],
    strongestConceptClusters: [],
    staleOrContradictoryAreas: [],
    executionHotspots: [],
    agentActivityHotspots: [],
    architectureHotspots: [],
    nextSafeAction: "Inspect the strongest read-only hotspot before routing context.",
  };
}
