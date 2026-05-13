export {
  buildSemanticHeatmap,
  buildSemanticHeatmapLayer,
  normalizeHeatmapIntensity,
  scoreSemanticHeatmapCell,
} from "./semantic-heatmap";

export {
  buildKnowledgeClusterEdges,
  buildKnowledgeClusterNode,
  buildKnowledgeTopology,
  groupTopologySignals,
} from "./knowledge-topology";

export {
  buildDeterministicTopologyLayout,
  normalizeTopologyWeight,
  positionTopologyCluster,
  sortTopologyClusters,
} from "./topology-layout";

export {
  recommendTopologyNextAction,
  selectTopologyHotspots,
  summarizeKnowledgeTopology,
  summarizeSemanticHeatmap,
} from "./topology-summarizer";

export {
  CODEXFORGE_SEMANTIC_TOPOLOGY_FIXTURE_TS,
  buildSemanticTopologyFixtureContext,
  buildSemanticTopologyFixtureEvents,
  buildSemanticTopologyFixtureGraph,
  buildSemanticTopologyFixtureMemory,
  buildSemanticTopologyFixtureTopology,
} from "./topology-fixtures";

export type {
  CodexForgeKnowledgeClusterEdge,
  CodexForgeKnowledgeClusterNode,
  CodexForgeKnowledgeTopology,
  CodexForgeSemanticHeatmap,
  CodexForgeSemanticHeatmapCell,
  CodexForgeSemanticHeatmapLayer,
  CodexForgeTopologyBuildInput,
  CodexForgeTopologyLayoutPoint,
  CodexForgeTopologySignalKind,
  CodexForgeTopologySummary,
} from "./topology-types";
