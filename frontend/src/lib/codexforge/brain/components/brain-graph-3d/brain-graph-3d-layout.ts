import type {
  CodexForgeBrainEdge,
  CodexForgeBrainGraph,
  CodexForgeBrainNode,
} from "@/lib/codexforge/brain/graph";
import type {
  BrainGraph3DCluster,
  BrainGraph3DLayout,
  BrainGraph3DLayoutEdge,
  BrainGraph3DLayoutNode,
  BrainGraph3DSignalDensity,
  BrainGraph3DSignalPoint,
  BrainGraph3DVector,
} from "./brain-graph-3d-types";

const TAU = Math.PI * 2;
const MAX_LAYOUT_NODES = 180;
const MAX_LAYOUT_EDGES = 420;
const MAX_SIGNAL_POINTS_RICH = 220;
const MAX_SIGNAL_POINTS_LEAN = 90;

const KIND_COLORS: Record<string, string> = {
  workspace: "#38bdf8",
  project: "#60a5fa",
  repo: "#22c55e",
  conversation: "#a78bfa",
  message: "#f472b6",
  task: "#f59e0b",
  plan: "#eab308",
  step: "#fb7185",
  memory: "#2dd4bf",
  decision: "#f97316",
  research: "#818cf8",
  artifact: "#c084fc",
  run: "#34d399",
  diff: "#f43f5e",
  snapshot: "#93c5fd",
  tag: "#bef264",
  person: "#fda4af",
  note: "#fde68a",
  workflow: "#14b8a6",
  generation: "#d946ef",
  video: "#fb923c",
  audio: "#67e8f9",
  image: "#4ade80",
  model: "#c4b5fd",
  tool: "#facc15",
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function roundVector(vector: BrainGraph3DVector): BrainGraph3DVector {
  return {
    x: Number(vector.x.toFixed(3)),
    y: Number(vector.y.toFixed(3)),
    z: Number(vector.z.toFixed(3)),
  };
}

function normalizeHash(hash: number, salt = 0): number {
  return (((hash >>> salt) & 0xffff) / 0xffff) * 2 - 1;
}

function formatKindLabel(kind: string): string {
  return kind
    .split("-")
    .join(" ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getImportanceRank(node: CodexForgeBrainNode): number {
  switch (node.meta.importance) {
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

function getNodeColor(kind: string): string {
  const fixed = KIND_COLORS[kind];
  if (fixed) return fixed;

  const hue = createStableBrainGraph3DHash(kind) % 360;
  return `hsl(${hue} 84% 62%)`;
}

function buildNeighborCounts(edges: CodexForgeBrainEdge[]): Record<string, number> {
  const counts: Record<string, number> = {};

  for (const edge of edges) {
    counts[edge.from] = (counts[edge.from] ?? 0) + 1;
    counts[edge.to] = (counts[edge.to] ?? 0) + 1;
  }

  return counts;
}

function buildSelectedNeighborIds(edges: CodexForgeBrainEdge[], selectedNodeId: string | null): Set<string> {
  const ids = new Set<string>();
  if (!selectedNodeId) return ids;

  for (const edge of edges) {
    if (edge.from === selectedNodeId) ids.add(edge.to);
    if (edge.to === selectedNodeId) ids.add(edge.from);
  }

  return ids;
}

function compareNodes(
  a: CodexForgeBrainNode,
  b: CodexForgeBrainNode,
  selectedNodeId: string | null,
  selectedNeighborIds: Set<string>,
  neighborCounts: Record<string, number>
): number {
  if (a.id === selectedNodeId) return -1;
  if (b.id === selectedNodeId) return 1;

  const relatedDiff = Number(selectedNeighborIds.has(b.id)) - Number(selectedNeighborIds.has(a.id));
  if (relatedDiff !== 0) return relatedDiff;

  const pinnedDiff = Number(b.meta.pinned === true) - Number(a.meta.pinned === true);
  if (pinnedDiff !== 0) return pinnedDiff;

  const importanceDiff = getImportanceRank(b) - getImportanceRank(a);
  if (importanceDiff !== 0) return importanceDiff;

  const neighborDiff = (neighborCounts[b.id] ?? 0) - (neighborCounts[a.id] ?? 0);
  if (neighborDiff !== 0) return neighborDiff;

  const kindDiff = a.kind.localeCompare(b.kind);
  if (kindDiff !== 0) return kindDiff;

  return a.id.localeCompare(b.id);
}

function buildClusterCenters(kinds: string[], selectedKind: string | null): Record<string, BrainGraph3DVector> {
  const sortedKinds = [...kinds].sort((a, b) => {
    if (a === selectedKind) return -1;
    if (b === selectedKind) return 1;
    return a.localeCompare(b);
  });
  const centers: Record<string, BrainGraph3DVector> = {};

  sortedKinds.forEach((kind, index) => {
    if (index === 0 && kind === selectedKind) {
      centers[kind] = { x: 0, y: 0, z: 0 };
      return;
    }

    const hash = createStableBrainGraph3DHash(`cluster:${kind}`);
    const ring = index < 7 ? 1 : 1.45;
    const angle = -Math.PI / 2 + (index / Math.max(1, sortedKinds.length)) * TAU + normalizeHash(hash, 4) * 0.12;
    const lift = normalizeHash(hash, 10) * 52;

    centers[kind] = roundVector({
      x: Math.cos(angle) * 170 * ring,
      y: lift,
      z: Math.sin(angle) * 118 * ring,
    });
  });

  return centers;
}

export function createStableBrainGraph3DHash(value: string): number {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619) >>> 0;
  }

  return hash >>> 0;
}

export function projectBrainGraphNode3D(args: {
  node: CodexForgeBrainNode;
  localIndex: number;
  localCount: number;
  clusterCenter: BrainGraph3DVector;
  selectedNodeId: string | null;
  selectedNeighborIds: Set<string>;
  neighborCount: number;
}): BrainGraph3DLayoutNode {
  const { node, localIndex, localCount, clusterCenter, selectedNodeId, selectedNeighborIds, neighborCount } = args;
  const selected = node.id === selectedNodeId;
  const related = selectedNeighborIds.has(node.id);
  const importanceRank = getImportanceRank(node);
  const hash = createStableBrainGraph3DHash(`${node.kind}:${node.id}:${importanceRank}`);
  const layer = Math.floor(localIndex / 16);
  const angle = (localIndex / Math.max(1, Math.min(16, localCount))) * TAU + normalizeHash(hash, 2) * 0.34;
  const radius = selected ? 0 : (related ? 50 : 38) + layer * 31 + Math.min(68, localCount * 3.1);
  const height = selected ? 0 : normalizeHash(hash, 8) * (64 + importanceRank * 5);
  const depth = selected ? 0 : normalizeHash(hash, 13) * 84 + (related ? 28 : 0);

  return {
    id: node.id,
    node,
    position: roundVector({
      x: selected ? 0 : clusterCenter.x + Math.cos(angle) * radius,
      y: selected ? 0 : clusterCenter.y + height,
      z: selected ? 0 : clusterCenter.z + Math.sin(angle) * radius * 0.82 + depth,
    }),
    radius: selected
      ? 9.6
      : clamp(3.8 + importanceRank * 0.7 + Math.min(3.8, neighborCount * 0.36) + (node.meta.pinned ? 1.2 : 0), 4.2, 8.8),
    color: getNodeColor(node.kind),
    clusterKey: node.kind,
    neighborCount,
    selected,
    related,
    dimmed: Boolean(selectedNodeId && !selected && !related && !node.meta.pinned && importanceRank < 4),
    importanceRank,
    labelVisible: selected || related || node.meta.pinned === true || importanceRank >= 4 || neighborCount >= 4,
  };
}

export function buildBrainGraph3DEdge(
  edge: CodexForgeBrainEdge,
  nodeLookup: Record<string, BrainGraph3DLayoutNode>,
  selectedNodeId: string | null,
  selectedNeighborIds: Set<string>
): BrainGraph3DLayoutEdge | null {
  const from = nodeLookup[edge.from];
  const to = nodeLookup[edge.to];
  if (!from || !to) return null;

  const selected = Boolean(selectedNodeId && (edge.from === selectedNodeId || edge.to === selectedNodeId));
  const related = !selected && (selectedNeighborIds.has(edge.from) || selectedNeighborIds.has(edge.to));
  const weight = typeof edge.weight === "number" && Number.isFinite(edge.weight) ? edge.weight : 1;

  return {
    id: edge.id,
    edge,
    from,
    to,
    color: selected ? "#e0f2fe" : related ? "#2dd4bf" : "#64748b",
    opacity: selected ? 0.98 : related ? 0.68 : 0.18,
    width: selected ? 3.4 : related ? 1.85 : clamp(0.68 + weight * 0.12, 0.68, 1.28),
    selected,
    related,
  };
}

export function buildBrainGraph3DSignalField(
  layoutNodes: BrainGraph3DLayoutNode[],
  density: BrainGraph3DSignalDensity
): BrainGraph3DSignalPoint[] {
  const cap = density === "rich" ? MAX_SIGNAL_POINTS_RICH : MAX_SIGNAL_POINTS_LEAN;
  const count = clamp(layoutNodes.length * (density === "rich" ? 5 : 2) + 42, 36, cap);
  const points: BrainGraph3DSignalPoint[] = [];
  const basis = layoutNodes.length > 0 ? layoutNodes : [];

  for (let index = 0; index < count; index += 1) {
    const sourceNode = basis[index % Math.max(1, basis.length)];
    const seedValue = sourceNode ? `${sourceNode.id}:signal:${index}` : `empty-signal:${index}`;
    const hash = createStableBrainGraph3DHash(seedValue);
    const angle = (index / count) * TAU + normalizeHash(hash, 5) * 0.4;
    const radius = 132 + ((hash >>> 7) % 170);

    points.push({
      id: `signal-${index}-${hash.toString(16)}`,
      position: roundVector({
        x: Math.cos(angle) * radius + normalizeHash(hash, 12) * 44,
        y: normalizeHash(hash, 1) * 118,
        z: Math.sin(angle) * radius + normalizeHash(hash, 9) * 54,
      }),
      color: sourceNode?.color ?? "#38bdf8",
      size: 0.55 + ((hash >>> 18) % 100) / 120,
      opacity: density === "rich" ? 0.34 : 0.24,
    });
  }

  return points;
}

export function buildBrainGraph3DLayout(
  graph: CodexForgeBrainGraph,
  selectedNodeId: string | null,
  density: BrainGraph3DSignalDensity = "lean"
): BrainGraph3DLayout {
  const neighborCounts = buildNeighborCounts(graph.edges);
  const selectedNeighborIds = buildSelectedNeighborIds(graph.edges, selectedNodeId);
  const selectedNode = selectedNodeId ? graph.nodes.find((node) => node.id === selectedNodeId) ?? null : graph.nodes[0] ?? null;
  const effectiveSelectedNodeId = selectedNode?.id ?? selectedNodeId;
  const visibleNodes = [...graph.nodes]
    .sort((a, b) => compareNodes(a, b, effectiveSelectedNodeId, selectedNeighborIds, neighborCounts))
    .slice(0, MAX_LAYOUT_NODES);
  const kinds = Array.from(new Set(visibleNodes.map((node) => node.kind)));
  const clusterCenters = buildClusterCenters(kinds, selectedNode?.kind ?? null);
  const nodesByKind = new Map<string, CodexForgeBrainNode[]>();

  for (const node of visibleNodes) {
    const group = nodesByKind.get(node.kind) ?? [];
    group.push(node);
    nodesByKind.set(node.kind, group);
  }

  const layoutNodes: BrainGraph3DLayoutNode[] = [];

  for (const [kind, nodes] of nodesByKind.entries()) {
    const sortedNodes = [...nodes].sort((a, b) => compareNodes(a, b, effectiveSelectedNodeId, selectedNeighborIds, neighborCounts));
    sortedNodes.forEach((node, localIndex) => {
      layoutNodes.push(
        projectBrainGraphNode3D({
          node,
          localIndex,
          localCount: sortedNodes.length,
          clusterCenter: clusterCenters[kind] ?? { x: 0, y: 0, z: 0 },
          selectedNodeId: effectiveSelectedNodeId,
          selectedNeighborIds,
          neighborCount: neighborCounts[node.id] ?? 0,
        })
      );
    });
  }

  const nodeLookup = Object.fromEntries(layoutNodes.map((node) => [node.id, node]));
  const edgeCandidates = graph.edges
    .map((edge) => buildBrainGraph3DEdge(edge, nodeLookup, effectiveSelectedNodeId, selectedNeighborIds))
    .filter((edge): edge is BrainGraph3DLayoutEdge => edge !== null)
    .sort((a, b) => Number(b.selected) - Number(a.selected) || Number(b.related) - Number(a.related) || a.id.localeCompare(b.id))
    .slice(0, MAX_LAYOUT_EDGES);
  const clusters: BrainGraph3DCluster[] = Array.from(nodesByKind.entries())
    .map(([kind, nodes]) => ({
      key: kind,
      label: formatKindLabel(kind),
      color: getNodeColor(kind),
      center: clusterCenters[kind] ?? { x: 0, y: 0, z: 0 },
      radius: clamp(46 + Math.sqrt(nodes.length) * 15, 58, 132),
      count: nodes.length,
      selected: kind === selectedNode?.kind,
    }))
    .sort((a, b) => Number(b.selected) - Number(a.selected) || b.count - a.count || a.key.localeCompare(b.key));
  const boundsRadius = clamp(
    layoutNodes.reduce((max, node) => {
      const distance = Math.sqrt(node.position.x ** 2 + node.position.y ** 2 + node.position.z ** 2);
      return Math.max(max, distance + node.radius);
    }, 180),
    180,
    520
  );
  const layoutHash = [
    graph.version,
    graph.nodes.length,
    graph.edges.length,
    ...graph.nodes.map((node) => `${node.id}:${node.kind}:${node.meta.importance ?? ""}`).sort(),
    ...graph.edges.map((edge) => `${edge.id}:${edge.from}:${edge.to}:${edge.kind}`).sort(),
  ]
    .map((part) => createStableBrainGraph3DHash(String(part)).toString(16))
    .join("-");

  return {
    nodes: layoutNodes,
    edges: edgeCandidates,
    clusters,
    signalField: buildBrainGraph3DSignalField(layoutNodes, density),
    selectedNode: effectiveSelectedNodeId ? layoutNodes.find((node) => node.id === effectiveSelectedNodeId) ?? null : null,
    selectedNeighborIds,
    boundsRadius,
    layoutHash,
  };
}
