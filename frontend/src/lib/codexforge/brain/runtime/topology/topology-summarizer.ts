import type {
  CodexForgeKnowledgeClusterNode,
  CodexForgeKnowledgeTopology,
  CodexForgeSemanticHeatmap,
  CodexForgeSemanticHeatmapCell,
  CodexForgeTopologySummary,
} from "./topology-types";

function topLabels<T extends { label: string }>(items: readonly T[], limit: number): string[] {
  return items.slice(0, limit).map((item) => item.label);
}

export function selectTopologyHotspots(
  input: CodexForgeSemanticHeatmap | CodexForgeKnowledgeTopology,
  limit = 8
): Array<CodexForgeSemanticHeatmapCell | CodexForgeKnowledgeClusterNode> {
  const items =
    "layers" in input
      ? input.layers.flatMap((layer) => layer.cells)
      : input.clusters;
  return items
    .slice()
    .sort((a, b) => {
      const left = "intensity" in a ? a.intensity : a.weight;
      const right = "intensity" in b ? b.intensity : b.weight;
      if (right !== left) return right - left;
      if (b.risk !== a.risk) return b.risk - a.risk;
      return a.id.localeCompare(b.id);
    })
    .slice(0, limit);
}

export function recommendTopologyNextAction(
  input: CodexForgeSemanticHeatmap | CodexForgeKnowledgeTopology
): string {
  const hotspots = selectTopologyHotspots(input, 1);
  const top = hotspots[0];
  if (!top) return "Keep collecting runtime signals before acting.";
  if (top.risk >= 0.72) return "Inspect risk evidence and run narrow validation before execution.";
  if (top.kind === "contradiction") return "Surface both memory candidates before using either as context.";
  if (top.kind === "architecture" || top.kind === "file") return "Inspect affected files and callers before editing.";
  return "Use the top hotspot as read-only context for the next routing decision.";
}

export function summarizeSemanticHeatmap(
  heatmap: CodexForgeSemanticHeatmap
): CodexForgeTopologySummary {
  const cells = heatmap.layers.flatMap((layer) => layer.cells);
  const byKind = (kind: string) =>
    cells
      .filter((cell) => cell.kind === kind)
      .sort((a, b) => b.intensity - a.intensity || a.id.localeCompare(b.id));
  const memory = byKind("memory");
  const risks = cells.filter((cell) => cell.risk >= 0.55).sort((a, b) => b.risk - a.risk || a.id.localeCompare(b.id));
  const concepts = byKind("concept");
  const stale = byKind("contradiction");
  const execution = cells.filter((cell) => cell.kind === "execution" || cell.kind === "task" || cell.kind === "recovery").sort((a, b) => b.intensity - a.intensity || a.id.localeCompare(b.id));
  const agents = byKind("agent");
  const architecture = cells.filter((cell) => cell.kind === "architecture" || cell.kind === "file").sort((a, b) => b.intensity - a.intensity || a.id.localeCompare(b.id));
  const hotspots = selectTopologyHotspots(heatmap, 8);

  return {
    status: cells.length > 0 ? "ready" : "empty",
    text:
      cells.length > 0
        ? `Semantic heatmap mapped ${cells.length} cells across ${heatmap.layers.length} layers. Top hotspot: ${hotspots[0]?.label ?? "none"}.`
        : "Semantic heatmap is empty; fixture-backed topology can be shown until runtime signals arrive.",
    hotspotCount: hotspots.length,
    densestMemoryRegions: topLabels(memory, 3),
    highestRiskHotspots: topLabels(risks, 3),
    strongestConceptClusters: topLabels(concepts, 3),
    staleOrContradictoryAreas: topLabels(stale, 3),
    executionHotspots: topLabels(execution, 3),
    agentActivityHotspots: topLabels(agents, 3),
    architectureHotspots: topLabels(architecture, 3),
    nextSafeAction: recommendTopologyNextAction(heatmap),
  };
}

export function summarizeKnowledgeTopology(
  topology: CodexForgeKnowledgeTopology
): CodexForgeTopologySummary {
  const clusters = topology.clusters.slice();
  const by = (predicate: (cluster: CodexForgeKnowledgeClusterNode) => boolean) =>
    clusters.filter(predicate).sort((a, b) => b.weight - a.weight || a.id.localeCompare(b.id));
  const risks = clusters.filter((cluster) => cluster.risk >= 0.55).sort((a, b) => b.risk - a.risk || a.id.localeCompare(b.id));
  const hotspots = selectTopologyHotspots(topology, 8);

  return {
    status: clusters.length > 0 ? "ready" : "empty",
    text:
      clusters.length > 0
        ? `Knowledge topology mapped ${clusters.length} clusters with ${topology.edges.length} weighted relations. Top cluster: ${hotspots[0]?.label ?? "none"}.`
        : "Knowledge topology is empty; fixture-backed clusters can be shown until runtime signals arrive.",
    hotspotCount: hotspots.length,
    densestMemoryRegions: topLabels(by((cluster) => cluster.kind === "memory" || cluster.memoryDensity > 0.45), 3),
    highestRiskHotspots: topLabels(risks, 3),
    strongestConceptClusters: topLabels(by((cluster) => cluster.kind === "concept" || cluster.conceptStrength > 0.45), 3),
    staleOrContradictoryAreas: topLabels(by((cluster) => cluster.kind === "contradiction" || cluster.status === "risk-hotspot"), 3),
    executionHotspots: topLabels(by((cluster) => cluster.kind === "execution" || cluster.kind === "task" || cluster.kind === "recovery"), 3),
    agentActivityHotspots: topLabels(by((cluster) => cluster.kind === "agent"), 3),
    architectureHotspots: topLabels(by((cluster) => cluster.kind === "architecture" || cluster.kind === "file"), 3),
    nextSafeAction: recommendTopologyNextAction(topology),
  };
}
