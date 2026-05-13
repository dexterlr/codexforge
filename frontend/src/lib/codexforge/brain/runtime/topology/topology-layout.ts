import type {
  CodexForgeKnowledgeClusterNode,
  CodexForgeTopologyLayoutPoint,
} from "./topology-types";

export function normalizeTopologyWeight(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

export function sortTopologyClusters(
  clusters: readonly CodexForgeKnowledgeClusterNode[]
): CodexForgeKnowledgeClusterNode[] {
  return clusters.slice().sort((a, b) => {
    if (b.weight !== a.weight) return b.weight - a.weight;
    if (b.risk !== a.risk) return b.risk - a.risk;
    return a.id.localeCompare(b.id);
  });
}

export function positionTopologyCluster(
  cluster: CodexForgeKnowledgeClusterNode,
  index: number,
  total: number
): CodexForgeTopologyLayoutPoint {
  const lane = index % 4;
  const ring = Math.floor(index / 4);
  const angle = (index / Math.max(1, total)) * Math.PI * 2;
  const orbit = 84 + lane * 46 + ring * 24;
  const weight = normalizeTopologyWeight(cluster.weight);

  return {
    id: cluster.id,
    x: Number((240 + Math.cos(angle) * orbit).toFixed(2)),
    y: Number((170 + Math.sin(angle) * orbit).toFixed(2)),
    radius: Number((12 + weight * 20 + cluster.risk * 6).toFixed(2)),
    lane,
    weight,
    label: cluster.label,
  };
}

export function buildDeterministicTopologyLayout(
  clusters: readonly CodexForgeKnowledgeClusterNode[]
): CodexForgeTopologyLayoutPoint[] {
  const sorted = sortTopologyClusters(clusters);
  return sorted.map((cluster, index) =>
    positionTopologyCluster(cluster, index, sorted.length)
  );
}
