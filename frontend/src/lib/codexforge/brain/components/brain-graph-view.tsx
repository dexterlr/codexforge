"use client";

import dynamic from "next/dynamic";
import { useMemo, useState, type CSSProperties } from "react";
import type {
  CodexForgeBrainEdge,
  CodexForgeBrainGraph,
  CodexForgeBrainNode,
} from "@/lib/codexforge/brain/graph";
import type { BrainGraph3DViewProps } from "./brain-graph-3d";
import { buildStableReactKey } from "./brain-react-key";

const BrainGraph3DView = dynamic<BrainGraph3DViewProps>(
  () => import("./brain-graph-3d").then((mod) => mod.BrainGraph3DView),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          minHeight: 620,
          display: "grid",
          placeItems: "center",
          border: "1px solid rgba(125,211,252,0.20)",
          background: "rgba(2,6,23,0.72)",
          borderRadius: 22,
          color: "#e0f2fe",
        }}
      >
        Loading 3D graph
      </div>
    ),
  }
);

type BrainGraphViewProps = {
  graph: CodexForgeBrainGraph;
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
  variant?: "embedded" | "hero";
};

type LayoutNode = {
  node: CodexForgeBrainNode;
  x: number;
  y: number;
  radius: number;
  neighborCount: number;
  color: string;
  clusterKey: string;
  clusterIndex: number;
  importanceRank: number;
  labelVisible: boolean;
  labelPriority: number;
};

type LayoutCluster = {
  key: string;
  kind: string;
  x: number;
  y: number;
  radius: number;
  color: string;
  count: number;
  priority: number;
  selected: boolean;
};

type GraphLayout = {
  layoutNodes: LayoutNode[];
  clusters: LayoutCluster[];
  neighborCounts: Record<string, number>;
  selectedNeighborIds: Set<string>;
};

type VisibleKind = {
  kind: string;
  count: number;
  color: string;
};

type TopologySignalPoint = {
  id: string;
  x: number;
  y: number;
  radius: number;
  color: string;
  opacity: number;
  depth: "near" | "far";
  delay: number;
};

type TopologySignalRay = {
  id: string;
  path: string;
  color: string;
  opacity: number;
  strokeWidth: number;
  dashArray: string;
  delay: number;
};

type VisualTopologyField = {
  points: TopologySignalPoint[];
  rays: TopologySignalRay[];
};

type BrainGraphViewMode = "3d" | "flat";
type BrainGraphRenderMode = "real3d" | "svg2d";

type BrainGraphCamera = {
  yaw: number;
  pitch: number;
  zoom: number;
  panX: number;
  panY: number;
  mode: BrainGraphViewMode;
};

type ProjectedLayoutNode = LayoutNode & {
  baseX: number;
  baseY: number;
  baseZ: number;
  depth: number;
  scale: number;
  opacity: number;
  zSort: number;
};

type ProjectedLayoutCluster = LayoutCluster & {
  baseX: number;
  baseY: number;
  baseZ: number;
  depth: number;
  scale: number;
  opacity: number;
  zSort: number;
};

type MiniMapPoint = {
  id: string;
  x: number;
  y: number;
  selected: boolean;
  related: boolean;
  color: string;
};

const WIDTH = 1280;
const HEIGHT = 720;
const CENTER_X = WIDTH / 2;
const CENTER_Y = HEIGHT / 2;
const OUTER_RADIUS = 324;
const INNER_RADIUS = 112;
const MAX_VISIBLE_NODES = 96;
const MAX_VISIBLE_EDGES = 220;
const MAX_VISIBLE_LABELS = 28;
const TAU = Math.PI * 2;
const DEFAULT_CAMERA: BrainGraphCamera = {
  yaw: -18,
  pitch: 12,
  zoom: 1,
  panX: 0,
  panY: 0,
  mode: "3d",
};
const CAMERA_STEP = 7;
const TILT_STEP = 5;
const ZOOM_STEP = 0.12;
const PERSPECTIVE_DEPTH = 720;

const CLUSTER_ANCHORS = [
  { x: CENTER_X, y: CENTER_Y, radius: 176 },
  { x: CENTER_X + 314, y: CENTER_Y - 164, radius: 136 },
  { x: CENTER_X - 316, y: CENTER_Y - 168, radius: 136 },
  { x: CENTER_X + 338, y: CENTER_Y + 154, radius: 132 },
  { x: CENTER_X - 330, y: CENTER_Y + 162, radius: 132 },
  { x: CENTER_X, y: CENTER_Y - 258, radius: 112 },
  { x: CENTER_X, y: CENTER_Y + 258, radius: 112 },
  { x: CENTER_X + 494, y: CENTER_Y - 10, radius: 96 },
  { x: CENTER_X - 494, y: CENTER_Y + 8, radius: 96 },
] as const;

const NODE_KIND_COLORS: Record<string, string> = {
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

const safeWrapStyle: CSSProperties = {
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const pillTextStyle: CSSProperties = {
  ...safeWrapStyle,
  whiteSpace: "normal",
};

const labelStyle: CSSProperties = {
  margin: 0,
  fontSize: 11,
  fontWeight: 900,
  letterSpacing: 0,
  textTransform: "uppercase",
  color: "rgba(186,230,253,0.72)",
  ...safeWrapStyle,
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function stableHash(value: string): number {
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619) >>> 0;
  }

  return hash >>> 0;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function toSvgNumber(value: number): number {
  return Number(value.toFixed(2));
}

function sanitizeSvgIdPart(value: string): string {
  return value.replace(/[^a-zA-Z0-9_-]/g, "-");
}

function formatKindLabel(kind: string): string {
  return kind
    .split("-")
    .join(" ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function truncateText(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, Math.max(0, maxLength - 3))}...`;
}

function getNodeLabel(node: CodexForgeBrainNode): string {
  if (isRecord(node.data)) {
    const label = asString((node.data as Record<string, unknown>).label);
    if (label) return label;
  }

  return `${node.kind} ${node.id}`;
}

function getNodeSummary(node: CodexForgeBrainNode): string {
  if (!isRecord(node.data)) return "";

  for (const key of ["summary", "whyItMatters", "goal", "content", "text", "description", "nextAction"]) {
    const value = asString((node.data as Record<string, unknown>)[key]);
    if (value) return value.length > 150 ? `${value.slice(0, 147)}...` : value;
  }

  return "";
}

function getNodeImportanceRank(node: CodexForgeBrainNode): number {
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

function getNodeKindColor(kind: string): string {
  const fixedColor = NODE_KIND_COLORS[kind];
  if (fixedColor) return fixedColor;

  const hue = stableHash(kind) % 360;
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

function compareNodesForGraph(
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

  const importanceDiff = getNodeImportanceRank(b) - getNodeImportanceRank(a);
  if (importanceDiff !== 0) return importanceDiff;

  const neighborDiff = (neighborCounts[b.id] ?? 0) - (neighborCounts[a.id] ?? 0);
  if (neighborDiff !== 0) return neighborDiff;

  const updatedDiff = (b.meta.updatedAt ?? 0) - (a.meta.updatedAt ?? 0);
  if (updatedDiff !== 0) return updatedDiff;

  const kindDiff = a.kind.localeCompare(b.kind);
  if (kindDiff !== 0) return kindDiff;

  return a.id.localeCompare(b.id);
}

function buildVisibleNodes(
  graph: CodexForgeBrainGraph,
  selectedNodeId: string | null,
  selectedNeighborIds: Set<string>,
  neighborCounts: Record<string, number>
): CodexForgeBrainNode[] {
  return [...graph.nodes]
    .sort((a, b) => compareNodesForGraph(a, b, selectedNodeId, selectedNeighborIds, neighborCounts))
    .slice(0, MAX_VISIBLE_NODES);
}

function getClusterPriority(
  nodes: CodexForgeBrainNode[],
  neighborCounts: Record<string, number>,
  selectedNodeId: string | null
): number {
  return nodes.reduce((total, node) => {
    const selectedBoost = node.id === selectedNodeId ? 500 : 0;
    const pinnedBoost = node.meta.pinned ? 42 : 0;
    return total + selectedBoost + pinnedBoost + getNodeImportanceRank(node) * 16 + (neighborCounts[node.id] ?? 0) * 3;
  }, nodes.length * 18);
}

function getClusterAnchor(index: number, key: string, total: number): { x: number; y: number; radius: number } {
  const fixed = CLUSTER_ANCHORS[index];
  if (fixed) return fixed;

  const overflowIndex = index - CLUSTER_ANCHORS.length;
  const overflowTotal = Math.max(1, total - CLUSTER_ANCHORS.length);
  const seedOffset = ((stableHash(key) % 17) - 8) / 100;
  const angle = -Math.PI / 2 + (overflowIndex / overflowTotal) * TAU + seedOffset;

  return {
    x: CENTER_X + Math.cos(angle) * 448,
    y: CENTER_Y + Math.sin(angle) * 266,
    radius: 90,
  };
}

function buildClusters(
  visibleNodes: CodexForgeBrainNode[],
  selectedNodeId: string | null,
  neighborCounts: Record<string, number>
): LayoutCluster[] {
  const buckets = new Map<string, CodexForgeBrainNode[]>();

  for (const node of visibleNodes) {
    const entries = buckets.get(node.kind) ?? [];
    entries.push(node);
    buckets.set(node.kind, entries);
  }

  const orderedBuckets = Array.from(buckets.entries()).sort(([kindA, nodesA], [kindB, nodesB]) => {
    const aSelected = nodesA.some((node) => node.id === selectedNodeId);
    const bSelected = nodesB.some((node) => node.id === selectedNodeId);
    const selectedDiff = Number(bSelected) - Number(aSelected);
    if (selectedDiff !== 0) return selectedDiff;

    const priorityDiff =
      getClusterPriority(nodesB, neighborCounts, selectedNodeId) -
      getClusterPriority(nodesA, neighborCounts, selectedNodeId);
    if (priorityDiff !== 0) return priorityDiff;

    const countDiff = nodesB.length - nodesA.length;
    if (countDiff !== 0) return countDiff;

    return kindA.localeCompare(kindB);
  });

  return orderedBuckets.map(([kind, nodes], index) => {
    const anchor = getClusterAnchor(index, kind, orderedBuckets.length);
    const selected = nodes.some((node) => node.id === selectedNodeId);

    return {
      key: kind,
      kind,
      x: anchor.x,
      y: anchor.y,
      radius: Math.min(anchor.radius + Math.sqrt(nodes.length) * 7, selected ? 168 : 136),
      color: getNodeKindColor(kind),
      count: nodes.length,
      priority: getClusterPriority(nodes, neighborCounts, selectedNodeId),
      selected,
    };
  });
}

function sortClusterNodes(
  nodes: CodexForgeBrainNode[],
  selectedNodeId: string | null,
  neighborCounts: Record<string, number>
): CodexForgeBrainNode[] {
  return [...nodes].sort((a, b) => {
    if (a.id === selectedNodeId) return -1;
    if (b.id === selectedNodeId) return 1;

    const pinnedDiff = Number(b.meta.pinned === true) - Number(a.meta.pinned === true);
    if (pinnedDiff !== 0) return pinnedDiff;

    const importanceDiff = getNodeImportanceRank(b) - getNodeImportanceRank(a);
    if (importanceDiff !== 0) return importanceDiff;

    const neighborDiff = (neighborCounts[b.id] ?? 0) - (neighborCounts[a.id] ?? 0);
    if (neighborDiff !== 0) return neighborDiff;

    return a.id.localeCompare(b.id);
  });
}

function getRingPlacement(index: number): { ring: number; slot: number; capacity: number } {
  let remaining = index;
  let ring = 0;
  let capacity = 7;

  while (remaining >= capacity) {
    remaining -= capacity;
    ring += 1;
    capacity += 5;
  }

  return {
    ring,
    slot: remaining,
    capacity,
  };
}

function getNodeRadius(node: CodexForgeBrainNode, neighborCount: number, selected: boolean): number {
  const importanceRank = getNodeImportanceRank(node);

  if (selected) {
    return 24 + Math.min(5, importanceRank);
  }

  return clamp(
    7.4 + Math.min(9.5, neighborCount * 0.88) + importanceRank * 1.35 + (node.meta.pinned ? 2.4 : 0),
    8,
    22
  );
}

function placeNodes(
  visibleNodes: CodexForgeBrainNode[],
  clusters: LayoutCluster[],
  selectedNodeId: string | null,
  neighborCounts: Record<string, number>
): LayoutNode[] {
  const nodesByKind = new Map<string, CodexForgeBrainNode[]>();
  const layoutNodes: LayoutNode[] = [];

  for (const node of visibleNodes) {
    const entries = nodesByKind.get(node.kind) ?? [];
    entries.push(node);
    nodesByKind.set(node.kind, entries);
  }

  clusters.forEach((cluster, clusterIndex) => {
    const clusterNodes = sortClusterNodes(nodesByKind.get(cluster.kind) ?? [], selectedNodeId, neighborCounts);
    let localIndex = 0;

    clusterNodes.forEach((node) => {
      const selected = node.id === selectedNodeId;
      const neighborCount = neighborCounts[node.id] ?? 0;
      const importanceRank = getNodeImportanceRank(node);
      const radius = getNodeRadius(node, neighborCount, selected);
      const color = getNodeKindColor(node.kind);

      if (selected) {
        layoutNodes.push({
          node,
          x: CENTER_X,
          y: CENTER_Y,
          radius,
          neighborCount,
          color,
          clusterKey: cluster.key,
          clusterIndex,
          importanceRank,
          labelVisible: true,
          labelPriority: 10000,
        });
        return;
      }

      const placement = getRingPlacement(localIndex);
      const phase = ((stableHash(cluster.kind) % 360) / 360) * TAU;
      const orbitBase = cluster.selected ? 76 : 36;
      const orbit = clamp(orbitBase + placement.ring * 30 + Math.min(16, cluster.count * 1.4), 34, cluster.radius - radius - 10);
      const slotAngle = (placement.slot / placement.capacity) * TAU;
      const alternatingOffset = placement.ring % 2 === 0 ? 0.14 : -0.22;
      const angle = phase + slotAngle + alternatingOffset;
      const drift = ((stableHash(`${node.id}:${cluster.key}`) % 19) - 9) * 0.9;
      const x = clamp(cluster.x + Math.cos(angle) * (orbit + drift), radius + 24, WIDTH - radius - 24);
      const y = clamp(cluster.y + Math.sin(angle) * (orbit - drift * 0.42), radius + 24, HEIGHT - radius - 24);
      const labelPriority =
        (node.meta.pinned ? 800 : 0) +
        importanceRank * 112 +
        neighborCount * 18 +
        (cluster.selected ? 40 : 0);

      layoutNodes.push({
        node,
        x,
        y,
        radius,
        neighborCount,
        color,
        clusterKey: cluster.key,
        clusterIndex,
        importanceRank,
        labelVisible: false,
        labelPriority,
      });

      localIndex += 1;
    });
  });

  const labelIds = new Set(
    layoutNodes
      .filter((entry) => {
        return (
          entry.node.id === selectedNodeId ||
          entry.node.meta.pinned === true ||
          entry.importanceRank >= 4 ||
          entry.neighborCount >= 3
        );
      })
      .sort((a, b) => b.labelPriority - a.labelPriority || a.node.id.localeCompare(b.node.id))
      .slice(0, MAX_VISIBLE_LABELS)
      .map((entry) => entry.node.id)
  );

  return layoutNodes.map((entry) => ({
    ...entry,
    labelVisible: labelIds.has(entry.node.id),
  }));
}

function buildLayout(graph: CodexForgeBrainGraph, selectedNodeId: string | null): GraphLayout {
  const neighborCounts = buildNeighborCounts(graph.edges);
  const selectedNeighborIds = buildSelectedNeighborIds(graph.edges, selectedNodeId);
  const visibleNodes = buildVisibleNodes(graph, selectedNodeId, selectedNeighborIds, neighborCounts);
  const clusters = buildClusters(visibleNodes, selectedNodeId, neighborCounts);
  const layoutNodes = placeNodes(visibleNodes, clusters, selectedNodeId, neighborCounts);

  return {
    layoutNodes,
    clusters,
    neighborCounts,
    selectedNeighborIds,
  };
}

function isSelectedEdge(edge: CodexForgeBrainEdge, selectedNodeId: string | null): boolean {
  return Boolean(selectedNodeId && (edge.from === selectedNodeId || edge.to === selectedNodeId));
}

function isRelatedEdge(edge: CodexForgeBrainEdge, selectedNeighborIds: Set<string>): boolean {
  return selectedNeighborIds.has(edge.from) || selectedNeighborIds.has(edge.to);
}

function getEdgeWeight(edge: CodexForgeBrainEdge): number {
  return typeof edge.weight === "number" && Number.isFinite(edge.weight) ? edge.weight : 1;
}

function buildVisibleEdges(
  graph: CodexForgeBrainGraph,
  layoutNodes: LayoutNode[],
  selectedNodeId: string | null,
  selectedNeighborIds: Set<string>
): CodexForgeBrainEdge[] {
  const visibleNodeIds = new Set(layoutNodes.map((entry) => entry.node.id));

  return graph.edges
    .filter((edge) => visibleNodeIds.has(edge.from) && visibleNodeIds.has(edge.to))
    .sort((a, b) => {
      const selectedDiff = Number(isSelectedEdge(b, selectedNodeId)) - Number(isSelectedEdge(a, selectedNodeId));
      if (selectedDiff !== 0) return selectedDiff;

      const relatedDiff = Number(isRelatedEdge(b, selectedNeighborIds)) - Number(isRelatedEdge(a, selectedNeighborIds));
      if (relatedDiff !== 0) return relatedDiff;

      const weightDiff = getEdgeWeight(b) - getEdgeWeight(a);
      if (weightDiff !== 0) return weightDiff;

      const updatedDiff = (b.meta.updatedAt ?? 0) - (a.meta.updatedAt ?? 0);
      if (updatedDiff !== 0) return updatedDiff;

      return a.id.localeCompare(b.id);
    })
    .slice(0, MAX_VISIBLE_EDGES);
}

function getLayoutLookup(layoutNodes: LayoutNode[]): Record<string, LayoutNode> {
  const lookup: Record<string, LayoutNode> = {};

  for (const item of layoutNodes) {
    lookup[item.node.id] = item;
  }

  return lookup;
}

function getSelectedNode(graph: CodexForgeBrainGraph, selectedNodeId: string | null): CodexForgeBrainNode | null {
  if (!selectedNodeId) return graph.nodes[0] ?? null;
  return graph.nodes.find((node) => node.id === selectedNodeId) ?? graph.nodes[0] ?? null;
}

function buildEdgePath(edge: CodexForgeBrainEdge, from: LayoutNode, to: LayoutNode, index: number): string {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const distance = Math.max(1, Math.sqrt(dx * dx + dy * dy));
  const normalX = -dy / distance;
  const normalY = dx / distance;
  const seed = stableHash(`${edge.id}:${edge.kind}:${index}`);
  const direction = seed % 2 === 0 ? 1 : -1;
  const curveStrength = Math.min(78, Math.max(20, distance * 0.16));
  const curveVariance = 0.72 + (seed % 29) / 100;
  const bend = direction * curveStrength * curveVariance;
  const centerPull = (from.clusterIndex === to.clusterIndex ? -0.08 : 0.08) * distance;
  const controlX = (from.x + to.x) / 2 + normalX * bend + (CENTER_X - (from.x + to.x) / 2) * 0.035;
  const controlY = (from.y + to.y) / 2 + normalY * bend + (CENTER_Y - (from.y + to.y) / 2) * 0.035 + centerPull;

  return [
    "M",
    toSvgNumber(from.x),
    toSvgNumber(from.y),
    "Q",
    toSvgNumber(controlX),
    toSvgNumber(controlY),
    toSvgNumber(to.x),
    toSvgNumber(to.y),
  ].join(" ");
}

function buildSignalCurvePath(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  seed: number
): string {
  const dx = toX - fromX;
  const dy = toY - fromY;
  const distance = Math.max(1, Math.sqrt(dx * dx + dy * dy));
  const normalX = -dy / distance;
  const normalY = dx / distance;
  const direction = seed % 2 === 0 ? 1 : -1;
  const bend = direction * clamp(distance * (0.12 + (seed % 17) / 150), 22, 92);
  const pull = ((seed >>> 8) % 100) / 100;
  const controlX = (fromX + toX) / 2 + normalX * bend + (CENTER_X - (fromX + toX) / 2) * (0.04 + pull * 0.05);
  const controlY = (fromY + toY) / 2 + normalY * bend + (CENTER_Y - (fromY + toY) / 2) * (0.03 + pull * 0.04);

  return [
    "M",
    toSvgNumber(fromX),
    toSvgNumber(fromY),
    "Q",
    toSvgNumber(controlX),
    toSvgNumber(controlY),
    toSvgNumber(toX),
    toSvgNumber(toY),
  ].join(" ");
}

function buildVisualTopologyField(
  graph: CodexForgeBrainGraph,
  layoutNodes: LayoutNode[],
  clusters: LayoutCluster[],
  selectedNodeId: string | null
): VisualTopologyField {
  const nodeSeeds = graph.nodes.map((node) => `${node.id}:${node.kind}`);
  const edgeSeeds = graph.edges.map((edge) => `${edge.id}:${edge.kind}:${edge.from}:${edge.to}`);
  const seeds =
    nodeSeeds.length > 0
      ? [...nodeSeeds, ...edgeSeeds]
      : [`empty:${graph.version}:${graph.meta.createdAt}:${graph.meta.workspaceId ?? ""}:${graph.meta.projectId ?? ""}`];
  const sparseBoost = graph.nodes.length < 12 ? 72 : 0;
  const pointCount = Math.round(clamp(76 + graph.nodes.length * 9 + graph.edges.length * 6 + sparseBoost, 92, 238));
  const rayCount = Math.round(clamp(30 + graph.nodes.length * 4 + graph.edges.length * 5 + sparseBoost / 2, 34, 132));
  const selectedAnchor = selectedNodeId ? layoutNodes.find((entry) => entry.node.id === selectedNodeId) : undefined;
  const points: TopologySignalPoint[] = [];

  for (let index = 0; index < pointCount; index += 1) {
    const seedText = seeds[index % seeds.length];
    const hash = stableHash(`${seedText}:signal-point:${index}`);
    const anchor = layoutNodes.length > 0 ? layoutNodes[hash % layoutNodes.length] : undefined;
    const cluster = clusters.length > 0 ? clusters[(hash >>> 5) % clusters.length] : undefined;
    const depth: TopologySignalPoint["depth"] = index % 3 === 0 ? "far" : "near";
    const clusterPull = depth === "far" ? 0.72 : 0.36;
    const baseX =
      anchor && cluster
        ? anchor.x * (1 - clusterPull) + cluster.x * clusterPull
        : anchor?.x ?? cluster?.x ?? CENTER_X;
    const baseY =
      anchor && cluster
        ? anchor.y * (1 - clusterPull) + cluster.y * clusterPull
        : anchor?.y ?? cluster?.y ?? CENTER_Y;
    const angle = ((hash % 10000) / 10000) * TAU;
    const orbitalBand =
      (depth === "far" ? 82 : 32) +
      ((hash >>> 10) % 8) * (depth === "far" ? 28 : 18) +
      ((hash >>> 19) % 100) / 100 * 24;
    const sparseSpread = graph.nodes.length < 12 ? 58 + ((hash >>> 14) % 58) : 0;
    const x = clamp(baseX + Math.cos(angle) * (orbitalBand + sparseSpread), 14, WIDTH - 14);
    const y = clamp(baseY + Math.sin(angle) * (orbitalBand * 0.68 + sparseSpread * 0.54), 14, HEIGHT - 14);
    const color = anchor?.color ?? cluster?.color ?? getNodeKindColor(seedText.split(":")[1] ?? "memory");

    points.push({
      id: `signal-point-${index}-${hash}`,
      x,
      y,
      radius: depth === "far" ? 0.65 + ((hash >>> 22) % 14) / 10 : 1.1 + ((hash >>> 22) % 30) / 10,
      color,
      opacity: depth === "far" ? 0.055 + ((hash >>> 16) % 20) / 100 : 0.12 + ((hash >>> 16) % 34) / 100,
      depth,
      delay: ((hash >>> 24) % 28) / 10,
    });
  }

  const rays: TopologySignalRay[] = [];

  for (let index = 0; index < rayCount; index += 1) {
    const seedText = seeds[(index * 3 + 1) % seeds.length];
    const hash = stableHash(`${seedText}:signal-ray:${index}`);
    const from = points[index % points.length];
    const to = selectedAnchor && index % 5 === 0
      ? {
          x: selectedAnchor.x,
          y: selectedAnchor.y,
          color: selectedAnchor.color,
        }
      : points[(index * 7 + 5) % points.length];
    const color = index % 5 === 0 && selectedAnchor ? selectedAnchor.color : from.color;

    rays.push({
      id: `signal-ray-${index}-${hash}`,
      path: buildSignalCurvePath(from.x, from.y, to.x, to.y, hash),
      color,
      opacity: 0.05 + ((hash >>> 12) % 23) / 100,
      strokeWidth: 0.32 + ((hash >>> 20) % 16) / 10,
      dashArray: index % 4 === 0 ? "1 18" : index % 4 === 1 ? "3 24" : index % 4 === 2 ? "1 10" : "6 30",
      delay: ((hash >>> 25) % 36) / 10,
    });
  }

  return {
    points,
    rays,
  };
}

function buildVisibleKinds(clusters: LayoutCluster[]): VisibleKind[] {
  return clusters
    .map((cluster) => ({
      kind: cluster.kind,
      count: cluster.count,
      color: cluster.color,
    }))
    .sort((a, b) => b.count - a.count || a.kind.localeCompare(b.kind))
    .slice(0, 10);
}

function formatDensity(nodeCount: number, edgeCount: number): string {
  if (nodeCount < 2) return "0%";

  const maxEdges = (nodeCount * (nodeCount - 1)) / 2;
  const density = (edgeCount / maxEdges) * 100;
  return `${density >= 10 ? density.toFixed(0) : density.toFixed(1)}%`;
}

function getLabelBox(entry: LayoutNode, label: string): { x: number; y: number; width: number; height: number; textX: number; textY: number } {
  const width = clamp(label.length * 6.55 + 20, 64, 220);
  const height = 24;
  const preferredY = entry.y + entry.radius + 16;
  const y = preferredY + height > HEIGHT - 8 ? entry.y - entry.radius - height - 14 : preferredY;
  const x = clamp(entry.x - width / 2, 10, WIDTH - width - 10);

  return {
    x,
    y,
    width,
    height,
    textX: x + width / 2,
    textY: y + 17,
  };
}

function toRadians(degrees: number): number {
  return (degrees / 180) * Math.PI;
}

function getDeterministicNodeDepth(entry: LayoutNode, selectedNodeId: string | null): number {
  const hash = stableHash(`${entry.node.id}:${entry.node.kind}:projection-depth`);
  const ringDepth = ((hash % 101) - 50) * 2.25;
  const clusterDepth = (entry.clusterIndex - 3) * 14;
  const importanceDepth = (entry.importanceRank - 3) * 16;
  const focusDepth = entry.node.id === selectedNodeId ? 220 : 0;
  const pinnedDepth = entry.node.meta.pinned ? 28 : 0;

  return clamp(ringDepth + clusterDepth + importanceDepth + focusDepth + pinnedDepth, -210, 260);
}

function getDeterministicClusterDepth(cluster: LayoutCluster, index: number): number {
  const hash = stableHash(`${cluster.key}:cluster-projection-depth`);
  const depth = ((hash % 91) - 45) * 1.8 + (cluster.selected ? 120 : 0) - index * 4;

  return clamp(depth, -180, 170);
}

function projectPoint3d(
  x: number,
  y: number,
  z: number,
  camera: BrainGraphCamera
): { x: number; y: number; depth: number; scale: number; opacity: number } {
  if (camera.mode === "flat") {
    return {
      x: toSvgNumber(CENTER_X + (x - CENTER_X) * camera.zoom + camera.panX),
      y: toSvgNumber(CENTER_Y + (y - CENTER_Y) * camera.zoom + camera.panY),
      depth: z,
      scale: camera.zoom,
      opacity: 1,
    };
  }

  const yaw = toRadians(camera.yaw);
  const pitch = toRadians(camera.pitch);
  const localX = x - CENTER_X;
  const localY = y - CENTER_Y;
  const yawX = localX * Math.cos(yaw) - z * Math.sin(yaw);
  const yawZ = localX * Math.sin(yaw) + z * Math.cos(yaw);
  const pitchY = localY * Math.cos(pitch) - yawZ * Math.sin(pitch);
  const pitchZ = localY * Math.sin(pitch) + yawZ * Math.cos(pitch);
  const perspective = PERSPECTIVE_DEPTH / Math.max(220, PERSPECTIVE_DEPTH - pitchZ);
  const scale = clamp(perspective * camera.zoom, 0.46, 1.72);
  const opacity = clamp(0.34 + scale * 0.46 + (pitchZ + 220) / 1400, 0.26, 1);

  return {
    x: toSvgNumber(CENTER_X + yawX * scale + camera.panX),
    y: toSvgNumber(CENTER_Y + pitchY * scale + camera.panY),
    depth: pitchZ,
    scale,
    opacity,
  };
}

function buildProjectedNodes(
  layoutNodes: LayoutNode[],
  selectedNodeId: string | null,
  camera: BrainGraphCamera
): ProjectedLayoutNode[] {
  return layoutNodes
    .map((entry) => {
      const baseZ = getDeterministicNodeDepth(entry, selectedNodeId);
      const projection = projectPoint3d(entry.x, entry.y, baseZ, camera);
      const selected = entry.node.id === selectedNodeId;
      const scale = selected && camera.mode === "3d" ? Math.min(1.86, projection.scale * 1.12) : projection.scale;

      return {
        ...entry,
        baseX: entry.x,
        baseY: entry.y,
        baseZ,
        x: projection.x,
        y: projection.y,
        radius: toSvgNumber(entry.radius * scale),
        depth: projection.depth,
        scale,
        opacity: selected ? 1 : projection.opacity,
        zSort: projection.depth + (selected ? 10000 : 0),
      };
    })
    .sort((a, b) => a.zSort - b.zSort || a.node.id.localeCompare(b.node.id));
}

function buildProjectedClusters(clusters: LayoutCluster[], camera: BrainGraphCamera): ProjectedLayoutCluster[] {
  return clusters
    .map((cluster, index) => {
      const baseZ = getDeterministicClusterDepth(cluster, index);
      const projection = projectPoint3d(cluster.x, cluster.y, baseZ, camera);
      const scale = camera.mode === "3d" ? projection.scale : camera.zoom;

      return {
        ...cluster,
        baseX: cluster.x,
        baseY: cluster.y,
        baseZ,
        x: projection.x,
        y: projection.y,
        radius: toSvgNumber(cluster.radius * clamp(scale, 0.55, 1.42)),
        depth: projection.depth,
        scale,
        opacity: cluster.selected ? Math.max(0.72, projection.opacity) : clamp(projection.opacity * 0.72, 0.24, 0.72),
        zSort: projection.depth + (cluster.selected ? 240 : 0),
      };
    })
    .sort((a, b) => a.zSort - b.zSort || a.key.localeCompare(b.key));
}

function getProjectedLayoutLookup(projectedNodes: ProjectedLayoutNode[]): Record<string, ProjectedLayoutNode> {
  const lookup: Record<string, ProjectedLayoutNode> = {};

  for (const item of projectedNodes) {
    lookup[item.node.id] = item;
  }

  return lookup;
}

function buildMiniMapPoints(
  layoutNodes: LayoutNode[],
  selectedNodeId: string | null,
  selectedNeighborIds: Set<string>
): MiniMapPoint[] {
  return layoutNodes.map((entry) => ({
    id: entry.node.id,
    x: toSvgNumber(12 + (entry.x / WIDTH) * 116),
    y: toSvgNumber(12 + (entry.y / HEIGHT) * 76),
    selected: entry.node.id === selectedNodeId,
    related: selectedNeighborIds.has(entry.node.id),
    color: entry.color,
  }));
}

function getNeighborNodeIds(edges: CodexForgeBrainEdge[], selectedNodeId: string | null): string[] {
  if (!selectedNodeId) return [];

  return Array.from(
    new Set(
      edges
        .flatMap((edge) => {
          if (edge.from === selectedNodeId) return [edge.to];
          if (edge.to === selectedNodeId) return [edge.from];
          return [];
        })
        .filter(Boolean)
    )
  ).sort((a, b) => a.localeCompare(b));
}

function commandButtonStyle(active = false): CSSProperties {
  return {
    appearance: "none",
    border: active ? "1px solid rgba(224,242,254,0.58)" : "1px solid rgba(125,211,252,0.22)",
    background: active
      ? "linear-gradient(180deg, rgba(14,165,233,0.30), rgba(45,212,191,0.13))"
      : "linear-gradient(180deg, rgba(15,23,42,0.82), rgba(2,6,23,0.58))",
    color: "#e0f2fe",
    borderRadius: 10,
    padding: "7px 9px",
    fontSize: 11,
    fontWeight: 820,
    cursor: "pointer",
    minWidth: 0,
    maxWidth: "100%",
    overflowWrap: "anywhere",
    wordBreak: "break-word",
    boxShadow: active
      ? "0 0 22px rgba(14,165,233,0.22), inset 0 1px 0 rgba(255,255,255,0.08)"
      : "inset 0 1px 0 rgba(255,255,255,0.05)",
  };
}

function compactInputStyle(): CSSProperties {
  return {
    width: "min(100%, 220px)",
    border: "1px solid rgba(125,211,252,0.24)",
    background: "rgba(2,6,23,0.64)",
    color: "#e0f2fe",
    borderRadius: 10,
    padding: "7px 9px",
    outline: "none",
    fontSize: 11,
    minWidth: 0,
    maxWidth: "100%",
    overflowWrap: "anywhere",
    wordBreak: "break-word",
  };
}

function getClusterGradientId(prefix: string, clusterKey: string): string {
  return `${prefix}-cluster-${sanitizeSvgIdPart(clusterKey)}`;
}

function panelStyle(): CSSProperties {
  return {
    position: "relative",
    border: "1px solid rgba(125, 211, 252, 0.30)",
    background:
      "radial-gradient(circle at 48% -10%, rgba(14,165,233,0.40), transparent 34%), radial-gradient(circle at 7% 28%, rgba(45,212,191,0.19), transparent 27%), radial-gradient(circle at 98% 18%, rgba(244,114,182,0.14), transparent 25%), linear-gradient(135deg, rgba(2,6,23,0.99), rgba(8,13,30,0.92) 48%, rgba(2,6,23,0.98))",
    borderRadius: 28,
    padding: 18,
    boxShadow: "0 42px 140px rgba(2, 6, 23, 0.62), 0 0 92px rgba(14,165,233,0.13), inset 0 1px 0 rgba(255,255,255,0.08)",
    overflow: "hidden",
    minWidth: 0,
  };
}

function statStyle(): CSSProperties {
  return {
    border: "1px solid rgba(125,211,252,0.16)",
    background:
      "linear-gradient(180deg, rgba(125,211,252,0.105), rgba(255,255,255,0.032))",
    borderRadius: 12,
    padding: "9px 11px",
    minWidth: 0,
    maxWidth: "100%",
    overflowWrap: "anywhere",
    wordBreak: "break-word",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.055), 0 10px 28px rgba(2,6,23,0.18)",
  };
}

function hudStatStyle(): CSSProperties {
  return {
    borderTop: "1px solid rgba(255,255,255,0.075)",
    paddingTop: 8,
    minWidth: 0,
    maxWidth: "100%",
    overflowWrap: "anywhere",
    wordBreak: "break-word",
  };
}

function chipStyle(color?: string): CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    border: `1px solid ${color ?? "rgba(255,255,255,0.14)"}`,
    borderRadius: 999,
    padding: "4px 8px",
    background: "linear-gradient(180deg, rgba(255,255,255,0.062), rgba(255,255,255,0.022))",
    color: "#e0f2fe",
    fontSize: 10.5,
    fontWeight: 700,
    boxShadow: color ? `0 0 14px ${color}24, inset 0 1px 0 rgba(255,255,255,0.04)` : "inset 0 1px 0 rgba(255,255,255,0.04)",
    ...pillTextStyle,
  };
}

function inspectorCardStyle(): CSSProperties {
  return {
    border: "1px solid rgba(125,211,252,0.115)",
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.052), rgba(255,255,255,0.018))",
    borderRadius: 12,
    padding: 12,
    display: "grid",
    gap: 10,
    minWidth: 0,
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
  };
}

export function BrainGraphView({
  graph,
  selectedNodeId,
  onSelectNode,
  variant = "embedded",
}: BrainGraphViewProps) {
  const [camera, setCamera] = useState<BrainGraphCamera>(DEFAULT_CAMERA);
  const [renderMode, setRenderMode] = useState<BrainGraphRenderMode>("svg2d");
  const [searchQuery, setSearchQuery] = useState("");
  const [neighborCursor, setNeighborCursor] = useState(0);
  const selectedNode = useMemo(() => getSelectedNode(graph, selectedNodeId), [graph, selectedNodeId]);
  const effectiveSelectedNodeId = selectedNode?.id ?? selectedNodeId;
  const layout = useMemo(() => buildLayout(graph, effectiveSelectedNodeId), [graph, effectiveSelectedNodeId]);
  const { layoutNodes, clusters, selectedNeighborIds } = layout;
  const visibleEdges = useMemo(
    () => buildVisibleEdges(graph, layoutNodes, effectiveSelectedNodeId, selectedNeighborIds),
    [graph, layoutNodes, effectiveSelectedNodeId, selectedNeighborIds]
  );
  const layoutLookup = useMemo(() => getLayoutLookup(layoutNodes), [layoutNodes]);
  const selectedLayoutNode = selectedNode ? layoutLookup[selectedNode.id] : undefined;
  const selectedSummary = selectedNode ? getNodeSummary(selectedNode) : "";
  const visibleKinds = useMemo(() => buildVisibleKinds(clusters), [clusters]);
  const projectedNodes = useMemo(
    () => buildProjectedNodes(layoutNodes, effectiveSelectedNodeId, camera),
    [layoutNodes, effectiveSelectedNodeId, camera]
  );
  const projectedClusters = useMemo(() => buildProjectedClusters(clusters, camera), [clusters, camera]);
  const projectedLayoutLookup = useMemo(() => getProjectedLayoutLookup(projectedNodes), [projectedNodes]);
  const renderedEdges = useMemo(
    () =>
      visibleEdges
        .map((edge, index) => {
          const from = projectedLayoutLookup[edge.from];
          const to = projectedLayoutLookup[edge.to];
          return {
            edge,
            index,
            from,
            to,
            zSort: from && to ? (from.zSort + to.zSort) / 2 : 0,
          };
        })
        .sort((a, b) => a.zSort - b.zSort || a.edge.id.localeCompare(b.edge.id)),
    [visibleEdges, projectedLayoutLookup]
  );
  const miniMapPoints = useMemo(
    () => buildMiniMapPoints(layoutNodes, effectiveSelectedNodeId, selectedNeighborIds),
    [layoutNodes, effectiveSelectedNodeId, selectedNeighborIds]
  );
  const selectedNeighborNodeIds = useMemo(
    () => getNeighborNodeIds(graph.edges, effectiveSelectedNodeId),
    [graph.edges, effectiveSelectedNodeId]
  );
  const selectedPathLabel = useMemo(() => {
    if (!selectedNode) return "No focus";
    const clusterLabel = selectedLayoutNode?.clusterKey ? formatKindLabel(selectedLayoutNode.clusterKey) : formatKindLabel(selectedNode.kind);
    return `Brain / ${clusterLabel} / ${truncateText(getNodeLabel(selectedNode), 42)}`;
  }, [selectedNode, selectedLayoutNode]);
  const signalField = useMemo(
    () => buildVisualTopologyField(graph, layoutNodes, clusters, effectiveSelectedNodeId),
    [graph, layoutNodes, clusters, effectiveSelectedNodeId]
  );
  const graphDensity = formatDensity(graph.nodes.length, graph.edges.length);
  const selectedNeighborCount = selectedNode ? selectedNeighborIds.size : 0;
  const sparseGraph = graph.nodes.length < 12;
  const selectedCluster = selectedLayoutNode
    ? clusters.find((cluster) => cluster.key === selectedLayoutNode.clusterKey)
    : undefined;
  const svgIdPrefix = sanitizeSvgIdPart(`codexforge-brain-${variant}`);
  const nodeGlowId = `${svgIdPrefix}-node-glow`;
  const focusCoreId = `${svgIdPrefix}-focus-core`;
  const softGlowId = `${svgIdPrefix}-soft-glow`;
  const edgeGlowId = `${svgIdPrefix}-edge-glow`;
  const selectedNodeIndex = selectedNode
    ? Math.max(0, layoutNodes.findIndex((entry) => entry.node.id === selectedNode.id))
    : 0;
  const activeNeighborId =
    selectedNeighborNodeIds.length > 0
      ? selectedNeighborNodeIds[neighborCursor % selectedNeighborNodeIds.length]
      : null;
  const activeNeighborNode = activeNeighborId ? graph.nodes.find((node) => node.id === activeNeighborId) : null;
  const activeNeighborLabel = activeNeighborNode ? getNodeLabel(activeNeighborNode) : "No connected neighbor";

  function updateCamera(partial: Partial<BrainGraphCamera>): void {
    setCamera((current) => ({
      ...current,
      ...partial,
      yaw: partial.yaw === undefined ? current.yaw : clamp(partial.yaw, -72, 72),
      pitch: partial.pitch === undefined ? current.pitch : clamp(partial.pitch, -38, 38),
      zoom: partial.zoom === undefined ? current.zoom : clamp(partial.zoom, 0.68, 1.62),
      panX: partial.panX === undefined ? current.panX : clamp(partial.panX, -180, 180),
      panY: partial.panY === undefined ? current.panY : clamp(partial.panY, -120, 120),
    }));
  }

  function handleSelectRelativeNode(direction: number): void {
    if (layoutNodes.length === 0) return;
    const nextIndex = (selectedNodeIndex + direction + layoutNodes.length) % layoutNodes.length;
    onSelectNode(layoutNodes[nextIndex].node.id);
    setNeighborCursor(0);
  }

  function handleSelectNeighbor(direction: number): void {
    if (selectedNeighborNodeIds.length === 0) return;
    const nextCursor = (neighborCursor + direction + selectedNeighborNodeIds.length) % selectedNeighborNodeIds.length;
    setNeighborCursor(nextCursor);
    onSelectNode(selectedNeighborNodeIds[nextCursor]);
  }

  function handleFocusSearch(): void {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    const match = layoutNodes.find((entry) => {
      return (
        entry.node.id.toLowerCase().includes(query) ||
        entry.node.kind.toLowerCase().includes(query) ||
        getNodeLabel(entry.node).toLowerCase().includes(query)
      );
    });

    if (match) {
      onSelectNode(match.node.id);
      updateCamera({ panX: 0, panY: 0, zoom: Math.max(camera.zoom, 1.08) });
      setNeighborCursor(0);
    }
  }

  function handleJumpToCluster(clusterKey: string): void {
    const match = layoutNodes.find((entry) => entry.clusterKey === clusterKey);
    if (!match) return;
    onSelectNode(match.node.id);
    setNeighborCursor(0);
  }

  function handleFocusNeighbors(): void {
    if (activeNeighborId) onSelectNode(activeNeighborId);
  }

  return (
    <section
      className={`codexforge-brain-graph-panel codexforge-brain-graph-panel-${variant}`}
      style={panelStyle()}
      data-codexforge-brain-graph-view="true"
      data-codexforge-brain-graph-variant={variant}
      data-codexforge-brain-neural-canvas="true"
      data-codexforge-brain-graph-node-count={graph.nodes.length}
      data-codexforge-brain-graph-edge-count={graph.edges.length}
      data-codexforge-brain-responsive-grid
    >
      <style>
        {`
          .codexforge-brain-memory-grid {
            display: grid;
            grid-template-columns: minmax(0, 2.2fr) minmax(250px, 300px);
            gap: 14px;
            align-items: start;
          }

          .codexforge-brain-graph-stage {
            position: relative;
            min-width: 0;
            border: 1px solid rgba(125,211,252,0.22);
            background-image:
              radial-gradient(circle at 50% 48%, rgba(14,165,233,0.30), transparent 34%),
              radial-gradient(circle at 22% 30%, rgba(45,212,191,0.15), transparent 20%),
              radial-gradient(circle at 78% 25%, rgba(244,114,182,0.11), transparent 23%),
              linear-gradient(rgba(125,211,252,0.078) 1px, transparent 1px),
              linear-gradient(90deg, rgba(125,211,252,0.058) 1px, transparent 1px),
              linear-gradient(rgba(45,212,191,0.040) 1px, transparent 1px),
              linear-gradient(90deg, rgba(45,212,191,0.034) 1px, transparent 1px),
              repeating-linear-gradient(135deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 8px);
            background-size: 100% 100%, 100% 100%, 100% 100%, 46px 46px, 46px 46px, 11px 11px, 11px 11px, 10px 10px;
            border-radius: 22px;
            overflow: hidden;
            box-shadow: inset 0 0 170px rgba(14,165,233,0.16), inset 0 1px 0 rgba(255,255,255,0.07), 0 26px 95px rgba(2,6,23,0.34);
          }

          .codexforge-brain-graph-stage::before {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background:
              radial-gradient(circle at 50% 50%, transparent 0 34%, rgba(2,6,23,0.08) 56%, rgba(2,6,23,0.34) 100%),
              linear-gradient(120deg, transparent 0 34%, rgba(125,211,252,0.055) 48%, transparent 62%);
            mix-blend-mode: screen;
          }

          .codexforge-brain-graph-stage::after {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background:
              linear-gradient(90deg, rgba(125,211,252,0.11), transparent 18%, transparent 82%, rgba(45,212,191,0.08)),
              repeating-linear-gradient(180deg, transparent 0 9px, rgba(186,230,253,0.025) 10px, transparent 12px);
            opacity: 0.46;
          }

          .codexforge-brain-graph-navigation-hud {
            position: absolute;
            z-index: 4;
            top: 12px;
            left: 12px;
            right: 12px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
            min-width: 0;
            pointer-events: none;
          }

          .codexforge-brain-graph-navigation-hud > * {
            pointer-events: auto;
          }

          .codexforge-brain-graph-hud-panel {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            align-items: center;
            max-width: 100%;
            min-width: 0;
            padding: 8px;
            border: 1px solid rgba(125,211,252,0.20);
            border-radius: 14px;
            background: linear-gradient(135deg, rgba(2,6,23,0.82), rgba(15,23,42,0.58));
            box-shadow: 0 16px 48px rgba(2,6,23,0.30), inset 0 1px 0 rgba(255,255,255,0.06);
            backdrop-filter: blur(14px);
          }

          .codexforge-brain-graph-radar {
            position: absolute;
            z-index: 3;
            right: 14px;
            bottom: 14px;
            width: min(176px, calc(100% - 28px));
            border: 1px solid rgba(125,211,252,0.18);
            border-radius: 14px;
            padding: 8px;
            background: linear-gradient(145deg, rgba(2,6,23,0.72), rgba(15,23,42,0.48));
            box-shadow: 0 18px 60px rgba(2,6,23,0.28), inset 0 1px 0 rgba(255,255,255,0.05);
            backdrop-filter: blur(12px);
            color: rgba(224,242,254,0.86);
            min-width: 0;
          }

          .codexforge-brain-memory-svg {
            width: 100%;
            display: block;
          }

          .codexforge-brain-memory-svg text {
            font-family: var(--font-geist-sans), Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            letter-spacing: 0;
          }

          .codexforge-brain-graph-panel-hero .codexforge-brain-memory-svg {
            min-height: 720px;
          }

          .codexforge-brain-graph-panel-embedded .codexforge-brain-memory-svg {
            min-height: 540px;
          }

          .brain-orbit-ring {
            transform-origin: ${CENTER_X}px ${CENTER_Y}px;
            animation: brainOrbitDash 22s linear infinite;
          }

          .brain-orbit-ring-slow {
            transform-origin: ${CENTER_X}px ${CENTER_Y}px;
            animation: brainOrbitDash 34s linear infinite reverse;
          }

          .brain-selected-pulse {
            transform-origin: ${CENTER_X}px ${CENTER_Y}px;
            animation: brainPulse 3.8s ease-in-out infinite;
          }

          .brain-edge-flow {
            stroke-dasharray: 4 10;
            animation: brainEdgeFlow 3.8s linear infinite;
          }

          .brain-signal-ray {
            stroke-dashoffset: 0;
            animation: brainSignalFlow 9s linear infinite;
          }

          .brain-signal-point {
            animation: brainSignalPulse 5.8s ease-in-out infinite;
            transform-box: fill-box;
            transform-origin: center;
          }

          .brain-signal-point-far {
            filter: blur(0.25px);
          }

          .codexforge-brain-graph-node .brain-node-hover-ring,
          .codexforge-brain-graph-node .brain-node-focus-ring {
            opacity: 0;
            transition: opacity 160ms ease, stroke-width 160ms ease;
          }

          .codexforge-brain-graph-node:hover .brain-node-hover-ring,
          .codexforge-brain-graph-node:focus-visible .brain-node-focus-ring {
            opacity: 1;
          }

          .codexforge-brain-graph-node:hover .brain-node-core,
          .codexforge-brain-graph-node:focus-visible .brain-node-core {
            stroke-width: 2.4px;
          }

          .codexforge-brain-memory-inspector {
            border: 1px solid rgba(125,211,252,0.105);
            background:
              linear-gradient(180deg, rgba(15,23,42,0.52), rgba(2,6,23,0.30));
            border-radius: 18px;
            padding: 12px;
            color: #e0f2fe;
            min-width: 0;
            max-height: none;
            overflow: visible;
            position: sticky;
            top: 16px;
            box-shadow: inset 0 1px 0 rgba(255,255,255,0.035), 0 16px 48px rgba(2,6,23,0.20);
          }

          @keyframes brainPulse {
            0%, 100% { opacity: 0.52; transform: scale(0.985); }
            50% { opacity: 0.96; transform: scale(1.04); }
          }

          @keyframes brainOrbitDash {
            to { stroke-dashoffset: -96; }
          }

          @keyframes brainEdgeFlow {
            to { stroke-dashoffset: -60; }
          }

          @keyframes brainSignalFlow {
            to { stroke-dashoffset: -88; }
          }

          @keyframes brainSignalPulse {
            0%, 100% { transform: scale(0.92); }
            50% { transform: scale(1.35); }
          }

          @media (max-width: 1120px) {
            .codexforge-brain-memory-grid {
              grid-template-columns: minmax(0, 1fr);
            }

            .codexforge-brain-memory-inspector {
              position: static;
              max-height: none;
            }
          }

          @media (max-width: 680px) {
            .codexforge-brain-graph-panel {
              padding: 14px !important;
              border-radius: 22px !important;
            }

            .codexforge-brain-memory-svg {
              min-height: 390px;
            }

            .codexforge-brain-graph-navigation-hud {
              position: relative;
              top: auto;
              left: auto;
              right: auto;
              padding: 8px;
            }

            .codexforge-brain-graph-hud-panel {
              width: 100%;
            }

            .codexforge-brain-graph-radar {
              position: relative;
              right: auto;
              bottom: auto;
              width: calc(100% - 16px);
              margin: 0 8px 8px;
            }
          }
        `}
      </style>

      <div className="codexforge-brain-memory-grid">
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: 10,
              marginBottom: 12,
              color: "#e0f2fe",
              minWidth: 0,
            }}
          >
            <div style={{ minWidth: 0, maxWidth: 720 }}>
              <p
                style={{
                  margin: 0,
                  fontSize: 12,
                  fontWeight: 900,
                  letterSpacing: 0,
                  textTransform: "uppercase",
                  color: "#7dd3fc",
                  ...safeWrapStyle,
                }}
              >
                Neural memory net
              </p>
              <h2 style={{ margin: "5px 0 0", fontSize: variant === "hero" ? 28 : 23, lineHeight: 1.05, ...safeWrapStyle }}>
                Neural Topology Console
              </h2>
              <p
                style={{
                  margin: "7px 0 0",
                  color: "rgba(224,242,254,0.78)",
                  fontSize: 13,
                  lineHeight: 1.55,
                  ...safeWrapStyle,
                }}
              >
                CodexForge neural constellation keeps real nodes and edges dominant while deterministic signal layers reveal topology depth without changing storage, exports, or runtime counts.
              </p>
              {sparseGraph ? (
                <p
                  style={{
                    margin: "7px 0 0",
                    display: "inline-flex",
                    width: "fit-content",
                    border: "1px solid rgba(45,212,191,0.22)",
                    background: "rgba(45,212,191,0.08)",
                    borderRadius: 999,
                    padding: "6px 9px",
                    color: "rgba(204,251,241,0.86)",
                    fontSize: 12,
                    lineHeight: 1.35,
                    ...safeWrapStyle,
                  }}
                  data-codexforge-brain-sparse-graph-hint="true"
                  data-codexforge-brain-visual-topology-field="true"
                >
                  Sparse real graph: visual signal field shown for topology context.
                </p>
              ) : null}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 84px), 1fr))",
                gap: 7,
                alignItems: "stretch",
                minWidth: 0,
                width: "min(100%, 520px)",
                maxWidth: "100%",
              }}
              data-codexforge-brain-graph-stats="true"
              data-codexforge-brain-signal-panel="true"
            >
              <div
                style={{
                  ...statStyle(),
                  display: "flex",
                  gap: 6,
                  alignItems: "center",
                  justifyContent: "center",
                  gridColumn: "1 / -1",
                  flexWrap: "wrap",
                }}
                data-codexforge-brain-graph-3d-toggle="true"
              >
                <span style={{ ...labelStyle, width: "100%" }}>3D / 2D toggle</span>
                <button
                  type="button"
                  title="Open real WebGL 3D graph"
                  aria-label="3D / 2D toggle: open real 3D graph"
                  onClick={() => setRenderMode("real3d")}
                  style={commandButtonStyle(renderMode === "real3d")}
                >
                  3D
                </button>
                <button
                  type="button"
                  title="Open existing 2D graph"
                  aria-label="3D / 2D toggle: open existing 2D graph"
                  onClick={() => setRenderMode("svg2d")}
                  style={commandButtonStyle(renderMode === "svg2d")}
                >
                  2D
                </button>
              </div>
              <div style={statStyle()}>
                <div style={labelStyle}>Real nodes</div>
                <strong style={{ fontSize: 18, ...safeWrapStyle }}>{graph.nodes.length}</strong>
              </div>
              <div style={statStyle()}>
                <div style={labelStyle}>Real links</div>
                <strong style={{ fontSize: 18, ...safeWrapStyle }}>{graph.edges.length}</strong>
              </div>
              <div style={statStyle()}>
                <div style={labelStyle}>Clusters</div>
                <strong style={{ fontSize: 18, ...safeWrapStyle }}>{clusters.length}</strong>
              </div>
              <div style={statStyle()}>
                <div style={labelStyle}>Density</div>
                <strong style={{ fontSize: 18, ...safeWrapStyle }}>{graphDensity}</strong>
              </div>
            </div>
          </div>

          <div className="codexforge-brain-graph-stage">
            {renderMode === "real3d" ? (
              <BrainGraph3DView
                graph={graph}
                selectedNodeId={effectiveSelectedNodeId}
                onSelectNode={onSelectNode}
                onSwitchTo2D={() => setRenderMode("svg2d")}
                onPreviousNode={() => handleSelectRelativeNode(-1)}
                onNextNode={() => handleSelectRelativeNode(1)}
                onPreviousNeighbor={() => handleSelectNeighbor(-1)}
                onNextNeighbor={() => handleSelectNeighbor(1)}
                onFocusNeighbors={handleFocusNeighbors}
                selectedNeighborCount={selectedNeighborCount}
                activeNeighborLabel={activeNeighborLabel}
              />
            ) : (
              <>
            <div
              className="codexforge-brain-graph-navigation-hud"
              data-codexforge-brain-graph-navigation-hud="true"
              data-codexforge-brain-graph-3d-mode={camera.mode === "3d" ? "true" : "false"}
              data-codexforge-brain-graph-perspective-projection="true"
            >
              <div className="codexforge-brain-graph-hud-panel">
                <button
                  type="button"
                  title="Switch to 3D projection"
                  aria-label="Switch to 3D graph projection"
                  onClick={() => updateCamera({ mode: "3d" })}
                  style={commandButtonStyle(camera.mode === "3d")}
                >
                  3D
                </button>
                <button
                  type="button"
                  title="Switch to flat graph projection"
                  aria-label="Switch to flat graph projection"
                  onClick={() => updateCamera({ mode: "flat" })}
                  style={commandButtonStyle(camera.mode === "flat")}
                >
                  Flat
                </button>
                <button
                  type="button"
                  title="Reset view"
                  aria-label="Reset view"
                  onClick={() => setCamera(DEFAULT_CAMERA)}
                  style={commandButtonStyle()}
                >
                  Reset view
                </button>
                <button
                  type="button"
                  title="Zoom in"
                  aria-label="Zoom in"
                  onClick={() => updateCamera({ zoom: camera.zoom + ZOOM_STEP })}
                  style={commandButtonStyle()}
                >
                  Zoom in
                </button>
                <button
                  type="button"
                  title="Zoom out"
                  aria-label="Zoom out"
                  onClick={() => updateCamera({ zoom: camera.zoom - ZOOM_STEP })}
                  style={commandButtonStyle()}
                >
                  Zoom out
                </button>
                <button
                  type="button"
                  title="Rotate left"
                  aria-label="Rotate graph left"
                  onClick={() => updateCamera({ yaw: camera.yaw - CAMERA_STEP })}
                  style={commandButtonStyle()}
                >
                  Rotate left
                </button>
                <button
                  type="button"
                  title="Rotate right"
                  aria-label="Rotate graph right"
                  onClick={() => updateCamera({ yaw: camera.yaw + CAMERA_STEP })}
                  style={commandButtonStyle()}
                >
                  Rotate right
                </button>
                <button
                  type="button"
                  title="Tilt up"
                  aria-label="Tilt graph up"
                  onClick={() => updateCamera({ pitch: camera.pitch + TILT_STEP })}
                  style={commandButtonStyle()}
                >
                  Tilt up
                </button>
                <button
                  type="button"
                  title="Tilt down"
                  aria-label="Tilt graph down"
                  onClick={() => updateCamera({ pitch: camera.pitch - TILT_STEP })}
                  style={commandButtonStyle()}
                >
                  Tilt down
                </button>
              </div>

              <div className="codexforge-brain-graph-hud-panel">
                <button
                  type="button"
                  title="Previous node"
                  aria-label="Select previous visible node"
                  onClick={() => handleSelectRelativeNode(-1)}
                  style={commandButtonStyle()}
                >
                  Prev node
                </button>
                <button
                  type="button"
                  title="Next node"
                  aria-label="Select next visible node"
                  onClick={() => handleSelectRelativeNode(1)}
                  style={commandButtonStyle()}
                >
                  Next node
                </button>
                <button
                  type="button"
                  title="Focus selected"
                  aria-label="Focus selected node"
                  onClick={() => updateCamera({ zoom: 1.18, panX: 0, panY: 0 })}
                  disabled={!selectedNode}
                  style={{ ...commandButtonStyle(Boolean(selectedNode)), opacity: selectedNode ? 1 : 0.54 }}
                >
                  Focus selected
                </button>
                <button
                  type="button"
                  title="Fit graph"
                  aria-label="Fit graph to view"
                  onClick={() => updateCamera({ zoom: 0.92, panX: 0, panY: 0 })}
                  style={commandButtonStyle()}
                >
                  Fit graph
                </button>
                <button
                  type="button"
                  title="Previous neighbor"
                  aria-label="Select previous connected neighbor"
                  onClick={() => handleSelectNeighbor(-1)}
                  disabled={selectedNeighborNodeIds.length === 0}
                  style={{ ...commandButtonStyle(), opacity: selectedNeighborNodeIds.length > 0 ? 1 : 0.54 }}
                >
                  Prev neighbor
                </button>
                <button
                  type="button"
                  title="Next neighbor"
                  aria-label="Select next connected neighbor"
                  onClick={() => handleSelectNeighbor(1)}
                  disabled={selectedNeighborNodeIds.length === 0}
                  style={{ ...commandButtonStyle(), opacity: selectedNeighborNodeIds.length > 0 ? 1 : 0.54 }}
                >
                  Next neighbor
                </button>
              </div>

              <div className="codexforge-brain-graph-hud-panel">
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      handleFocusSearch();
                    }
                  }}
                  placeholder="Search focus node"
                  aria-label="Search and focus graph node"
                  style={compactInputStyle()}
                  data-codexforge-brain-graph-search="true"
                />
                <button
                  type="button"
                  title="Search and focus node"
                  aria-label="Search and focus node"
                  onClick={handleFocusSearch}
                  style={commandButtonStyle()}
                >
                  Focus
                </button>
                {visibleKinds.slice(0, 4).map((entry, index) => (
                  <button
                    key={buildStableReactKey("brain-cluster-jump", [entry.kind], index)}
                    type="button"
                    title={`Jump to ${formatKindLabel(entry.kind)} cluster`}
                    aria-label={`Jump to ${formatKindLabel(entry.kind)} cluster`}
                    onClick={() => handleJumpToCluster(entry.kind)}
                    style={commandButtonStyle(selectedCluster?.kind === entry.kind)}
                    data-codexforge-brain-graph-cluster-jump="true"
                  >
                    {formatKindLabel(entry.kind)}
                  </button>
                ))}
                <span style={{ fontSize: 10.5, color: "rgba(224,242,254,0.60)", ...safeWrapStyle }}>
                  Keyboard: Tab to controls, Enter/Space on nodes.
                </span>
              </div>
            </div>

            <svg
              viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
              role="img"
              aria-label="CodexForge brain graph"
              className="codexforge-brain-memory-svg"
              data-codexforge-brain-graph-svg="true"
            >
              <defs>
                <radialGradient id={nodeGlowId} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
                  <stop offset="45%" stopColor="#bae6fd" stopOpacity="0.82" />
                  <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.34" />
                </radialGradient>
                <radialGradient id={focusCoreId} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.52" />
                  <stop offset="48%" stopColor="#38bdf8" stopOpacity="0.16" />
                  <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
                </radialGradient>
                <filter id={softGlowId} x="-80%" y="-80%" width="260%" height="260%">
                  <feGaussianBlur stdDeviation="7" result="blur" />
                  <feColorMatrix
                    in="blur"
                    type="matrix"
                    values="0 0 0 0 0.28 0 0 0 0 0.82 0 0 0 0 1 0 0 0 0.72 0"
                    result="glow"
                  />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id={edgeGlowId} x="-35%" y="-35%" width="170%" height="170%">
                  <feGaussianBlur stdDeviation="3.2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                {clusters.map((cluster, index) => (
                  <radialGradient
                    key={buildStableReactKey("brain-cluster-gradient", [cluster.key], index)}
                    id={getClusterGradientId(svgIdPrefix, cluster.key)}
                    cx="50%"
                    cy="50%"
                    r="50%"
                  >
                    <stop offset="0%" stopColor={cluster.color} stopOpacity={cluster.selected ? "0.20" : "0.11"} />
                    <stop offset="48%" stopColor={cluster.color} stopOpacity={cluster.selected ? "0.095" : "0.045"} />
                    <stop offset="100%" stopColor={cluster.color} stopOpacity="0" />
                  </radialGradient>
                ))}
              </defs>

              <rect x="0" y="0" width={WIDTH} height={HEIGHT} fill="rgba(2,6,23,0.18)" />

              <g
                pointerEvents="none"
                data-codexforge-brain-visual-topology-field="true"
                data-codexforge-brain-signal-field="true"
              >
                {signalField.rays.map((ray, index) => (
                  <path
                    key={buildStableReactKey("brain-signal-ray", [ray.id], index)}
                    d={ray.path}
                    fill="none"
                    stroke={ray.color}
                    strokeWidth={ray.strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={ray.dashArray}
                    opacity={ray.opacity}
                    className="brain-signal-ray"
                    style={{ animationDelay: `${ray.delay}s` }}
                  />
                ))}
                {signalField.points.map((point, index) => (
                  <circle
                    key={buildStableReactKey("brain-signal-point", [point.id], index)}
                    cx={point.x}
                    cy={point.y}
                    r={point.radius}
                    fill={point.color}
                    opacity={point.opacity}
                    className={`brain-signal-point brain-signal-point-${point.depth}`}
                    style={{ animationDelay: `${point.delay}s` }}
                  />
                ))}
              </g>

              <circle
                className="brain-orbit-ring-slow"
                cx={CENTER_X}
                cy={CENTER_Y}
                r={OUTER_RADIUS + 88}
                fill="none"
                stroke="rgba(125,211,252,0.12)"
                strokeWidth="1"
                strokeDasharray="2 14"
                data-codexforge-brain-graph-orbit="outer"
              />
              <circle
                className="brain-orbit-ring"
                cx={CENTER_X}
                cy={CENTER_Y}
                r={OUTER_RADIUS + 28}
                fill="none"
                stroke="rgba(45,212,191,0.18)"
                strokeWidth="1.15"
                strokeDasharray="1 10"
                data-codexforge-brain-graph-orbit="middle"
              />
              <circle
                className="brain-selected-pulse"
                cx={CENTER_X}
                cy={CENTER_Y}
                r={INNER_RADIUS + 22}
                fill={`url(#${focusCoreId})`}
                stroke="rgba(125,211,252,0.16)"
                strokeWidth="1.2"
                data-codexforge-brain-graph-focus="true"
              />

              {projectedClusters.map((cluster, index) => (
                <g key={buildStableReactKey("brain-cluster", [cluster.key], index)} data-codexforge-brain-cluster-map="true">
                  <circle
                    cx={cluster.x}
                    cy={cluster.y}
                    r={cluster.selected ? cluster.radius * 1.32 : cluster.radius * 1.18}
                    fill={`url(#${getClusterGradientId(svgIdPrefix, cluster.key)})`}
                    opacity={cluster.selected ? Math.max(0.82, cluster.opacity) : cluster.opacity}
                  />
                  <circle
                    cx={cluster.x}
                    cy={cluster.y}
                    r={cluster.radius}
                    fill="none"
                    stroke={cluster.color}
                    strokeWidth={cluster.selected ? 1.45 : 0.82}
                    strokeOpacity={cluster.selected ? 0.44 : 0.18}
                    strokeDasharray={cluster.selected ? "8 12" : "1 13"}
                  />
                  <circle
                    cx={cluster.x}
                    cy={cluster.y}
                    r={Math.max(26, cluster.radius * 0.62)}
                    fill="none"
                    stroke={cluster.color}
                    strokeWidth={cluster.selected ? "1.05" : "0.72"}
                    strokeOpacity={cluster.selected ? 0.29 : 0.12}
                    strokeDasharray="2 16"
                  />
                  <circle
                    cx={cluster.x}
                    cy={cluster.y}
                    r={Math.max(18, cluster.radius * 0.28)}
                    fill="none"
                    stroke={cluster.color}
                    strokeWidth="0.65"
                    strokeOpacity={cluster.selected ? 0.36 : 0.13}
                  />
                </g>
              ))}

              {renderedEdges.map(({ edge, index, from, to }) => {

                if (!from || !to) return null;

                const selectedEdge = isSelectedEdge(edge, effectiveSelectedNodeId);
                const relatedEdge = !selectedEdge && isRelatedEdge(edge, selectedNeighborIds);
                const path = buildEdgePath(edge, from, to, index);
                const stroke = selectedEdge ? "rgba(224,242,254,0.96)" : relatedEdge ? "rgba(45,212,191,0.56)" : "rgba(148,163,184,0.16)";
                const depthOpacity = clamp((from.opacity + to.opacity) / 2, 0.18, 1);
                const opacity = selectedEdge ? 1 : relatedEdge ? 0.64 * depthOpacity : 0.22 * depthOpacity;
                const strokeWidth = selectedEdge ? 3.05 : relatedEdge ? 1.55 : clamp(0.62 * ((from.scale + to.scale) / 2), 0.42, 1.2);

                return (
                  <g key={buildStableReactKey("brain-edge", [edge.id], index)}>
                    {selectedEdge ? (
                      <path
                        d={path}
                        fill="none"
                        stroke="rgba(125,211,252,0.36)"
                        strokeWidth="9"
                        strokeLinecap="round"
                        opacity="0.42"
                        filter={`url(#${edgeGlowId})`}
                      />
                    ) : null}
                    {relatedEdge ? (
                      <path
                        d={path}
                        fill="none"
                        stroke="rgba(45,212,191,0.12)"
                        strokeWidth="4.5"
                        strokeLinecap="round"
                        opacity="0.42"
                      />
                    ) : null}
                    <path
                      d={path}
                      fill="none"
                      stroke={stroke}
                      strokeWidth={strokeWidth}
                      strokeLinecap="round"
                      opacity={opacity}
                      strokeDasharray={selectedEdge ? "7 12" : relatedEdge ? "2 12" : undefined}
                      className={selectedEdge ? "brain-edge-flow" : undefined}
                      data-codexforge-brain-graph-edge="true"
                    />
                  </g>
                );
              })}

              {projectedNodes.map((entry, index) => {
                const selected = entry.node.id === selectedNode?.id;
                const related = selectedNeighborIds.has(entry.node.id);
                const label = getNodeLabel(entry.node);
                const visibleLabel = truncateText(label, selected ? 34 : 24);
                const labelBox = getLabelBox(entry, visibleLabel);
                const dimmed = selectedNode ? !selected && !related && !entry.node.meta.pinned && entry.importanceRank < 4 : false;
                const coreOpacity = dimmed ? 0.38 * entry.opacity : selected ? 1 : related ? Math.max(0.84, entry.opacity) : Math.max(0.48, entry.opacity * 0.88);

                return (
                  <g
                    key={buildStableReactKey("brain-node", [entry.node.id], index)}
                    className="codexforge-brain-graph-node"
                    role="button"
                    tabIndex={0}
                    aria-label={`${formatKindLabel(entry.node.kind)} node: ${label}`}
                    onClick={() => onSelectNode(entry.node.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        onSelectNode(entry.node.id);
                      }
                    }}
                    style={{ cursor: "pointer", outline: "none" }}
                    data-codexforge-brain-graph-node="true"
                    data-codexforge-brain-graph-node-kind={entry.node.kind}
                    data-codexforge-brain-graph-node-selected={selected ? "true" : "false"}
                  >
                    <title>{`${label} | ${entry.node.kind} | ${entry.neighborCount} links`}</title>
                    <circle
                      className="brain-node-hover-ring"
                      cx={entry.x}
                      cy={entry.y}
                      r={entry.radius + 12}
                      fill="none"
                      stroke={entry.color}
                      strokeWidth="2"
                    />
                    <circle
                      className="brain-node-focus-ring"
                      cx={entry.x}
                      cy={entry.y}
                      r={entry.radius + 16}
                      fill="none"
                      stroke="#e0f2fe"
                      strokeWidth="2.4"
                    />
                    {selected ? (
                      <>
                        <circle
                          cx={entry.x}
                          cy={entry.y}
                          r={entry.radius + 82}
                          fill={entry.color}
                          opacity="0.125"
                          filter={`url(#${softGlowId})`}
                        />
                        <circle
                          cx={entry.x}
                          cy={entry.y}
                          r={entry.radius + 43}
                          fill={entry.color}
                          opacity="0.20"
                          filter={`url(#${softGlowId})`}
                        />
                        <circle
                          cx={entry.x}
                          cy={entry.y}
                          r={entry.radius + 32}
                          fill="none"
                          stroke={entry.color}
                          strokeWidth="1"
                          strokeOpacity="0.48"
                        />
                        <circle
                          cx={entry.x}
                          cy={entry.y}
                          r={entry.radius + 22}
                          fill="none"
                          stroke="rgba(224,242,254,0.92)"
                          strokeWidth="2.6"
                          strokeDasharray="4 10"
                        />
                      </>
                    ) : null}
                    <circle
                      cx={entry.x}
                      cy={entry.y}
                      r={entry.radius + 8}
                      fill={entry.color}
                      opacity={selected ? "0.24" : related ? "0.15" : "0.075"}
                    />
                    <circle
                      className="brain-node-core"
                      cx={entry.x}
                      cy={entry.y}
                      r={entry.radius}
                      fill={selected ? `url(#${nodeGlowId})` : entry.color}
                      opacity={coreOpacity}
                      stroke={selected ? "#e0f2fe" : related ? "rgba(224,242,254,0.66)" : "rgba(255,255,255,0.34)"}
                      strokeWidth={selected ? 2.7 : related ? 1.45 : 0.82}
                      filter={selected || entry.node.meta.pinned || entry.importanceRank >= 4 ? `url(#${softGlowId})` : undefined}
                    />
                    <circle
                      cx={entry.x - entry.radius * 0.18}
                      cy={entry.y - entry.radius * 0.20}
                      r={Math.max(2.8, entry.radius * 0.26)}
                      fill={selected ? "rgba(255,255,255,0.78)" : "rgba(255,255,255,0.42)"}
                      opacity={dimmed ? 0.2 : selected ? 0.74 : related ? 0.42 : 0.26}
                    />
                    {entry.node.meta.pinned ? (
                      <circle
                        cx={entry.x + entry.radius * 0.48}
                        cy={entry.y - entry.radius * 0.52}
                        r={Math.max(3.6, entry.radius * 0.24)}
                        fill="#facc15"
                        stroke="rgba(2,6,23,0.76)"
                        strokeWidth="1.4"
                      />
                    ) : null}
                    {entry.labelVisible ? (
                      <g opacity={dimmed ? 0.72 : 1}>
                        <rect
                          x={labelBox.x}
                          y={labelBox.y}
                          width={labelBox.width}
                          height={labelBox.height}
                          rx="7"
                          fill={selected ? "rgba(8,47,73,0.78)" : "rgba(2,6,23,0.62)"}
                          stroke={selected ? "rgba(224,242,254,0.46)" : "rgba(125,211,252,0.16)"}
                        />
                        <text
                          x={labelBox.textX}
                          y={labelBox.textY}
                          textAnchor="middle"
                          fill={selected ? "#e0f2fe" : "rgba(224,242,254,0.86)"}
                          fontSize={selected ? "12" : "11"}
                          fontWeight={selected ? "760" : "620"}
                        >
                          {visibleLabel}
                        </text>
                      </g>
                    ) : null}
                  </g>
                );
              })}
            </svg>

            <div
              className="codexforge-brain-graph-radar"
              data-codexforge-brain-graph-mini-map="true"
              data-codexforge-brain-graph-radar="true"
              data-codexforge-brain-graph-orientation-aid="true"
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", minWidth: 0 }}>
                <span style={{ ...labelStyle, fontSize: 9.5 }}>Orientation radar</span>
                <span
                  style={{
                    fontFamily: "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
                    fontSize: 10,
                    color: "rgba(224,242,254,0.62)",
                    ...safeWrapStyle,
                  }}
                >
                  yaw {camera.yaw} / pitch {camera.pitch} / zoom {camera.zoom.toFixed(2)}
                </span>
              </div>
              <svg viewBox="0 0 140 100" role="img" aria-label="Graph radar mini-map" style={{ width: "100%", display: "block", marginTop: 6 }}>
                <rect x="6" y="6" width="128" height="88" rx="8" fill="rgba(2,6,23,0.42)" stroke="rgba(125,211,252,0.22)" />
                <path
                  d={`M70 50 l${toSvgNumber(Math.sin(toRadians(camera.yaw)) * 22)} ${toSvgNumber(-Math.cos(toRadians(camera.yaw)) * 22)}`}
                  stroke="rgba(224,242,254,0.82)"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <circle cx="70" cy="50" r="4.5" fill="rgba(224,242,254,0.20)" stroke="rgba(224,242,254,0.44)" />
                {miniMapPoints.map((point, index) => (
                  <circle
                    key={buildStableReactKey("brain-radar-point", [point.id], index)}
                    cx={point.x}
                    cy={point.y}
                    r={point.selected ? 3.8 : point.related ? 2.4 : 1.45}
                    fill={point.selected ? "#e0f2fe" : point.color}
                    opacity={point.selected ? 1 : point.related ? 0.86 : 0.42}
                  />
                ))}
              </svg>
              <div style={{ marginTop: 4, fontSize: 10.5, color: "rgba(224,242,254,0.58)", lineHeight: 1.35, ...safeWrapStyle }}>
                Bright marker is selected. Larger colored markers are connected neighbors.
              </div>
            </div>
              </>
            )}
          </div>
        </div>

        <aside
          className="codexforge-brain-memory-inspector"
          data-codexforge-brain-graph-insight-panel="true"
          data-codexforge-brain-focus-node="true"
          data-codexforge-brain-overflow-guard
        >
          {selectedNode ? (
            <div style={{ display: "grid", gap: 12, minWidth: 0 }}>
              <div style={{ display: "grid", gap: 10, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "start", minWidth: 0 }}>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ ...labelStyle, fontSize: 10, color: "rgba(186,230,253,0.58)" }}>Focus HUD</p>
                    <h3 style={{ margin: "5px 0 0", fontSize: 18, lineHeight: 1.14, fontWeight: 720, ...safeWrapStyle }}>
                      {getNodeLabel(selectedNode)}
                    </h3>
                  </div>
                  <span style={chipStyle("rgba(125,211,252,0.18)")}>
                    <span style={pillTextStyle}>{selectedNeighborCount}</span>
                  </span>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, minWidth: 0 }}>
                    <span style={chipStyle(getNodeKindColor(selectedNode.kind))}>
                      <span
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: 999,
                          background: getNodeKindColor(selectedNode.kind),
                          boxShadow: `0 0 14px ${getNodeKindColor(selectedNode.kind)}`,
                          flex: "0 0 auto",
                        }}
                      />
                      <span style={pillTextStyle} data-codexforge-brain-graph-focus-kind="true">
                        {formatKindLabel(selectedNode.kind)}
                      </span>
                    </span>
                    <span style={chipStyle("rgba(125,211,252,0.26)")}>
                      <span style={pillTextStyle} data-codexforge-brain-graph-focus-status="true">
                        {selectedNode.meta.status ?? "idle"}
                      </span>
                    </span>
                    <span style={chipStyle("rgba(250,204,21,0.28)")}>
                      <span style={pillTextStyle} data-codexforge-brain-graph-focus-importance="true">
                        {selectedNode.meta.importance ?? "low"}
                      </span>
                    </span>
                    {selectedNode.meta.pinned ? (
                      <span style={chipStyle("rgba(250,204,21,0.42)")}>
                        <span style={pillTextStyle}>Pinned</span>
                      </span>
                    ) : null}
                </div>

                <p
                  style={{
                    margin: 0,
                    color: "rgba(224,242,254,0.68)",
                    fontSize: 12,
                    lineHeight: 1.52,
                    ...safeWrapStyle,
                  }}
                >
                  {selectedSummary || "No summary available yet."}
                </p>

                <code
                  style={{
                    display: "block",
                    fontFamily: "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
                    fontSize: 10.5,
                    color: "rgba(224,242,254,0.48)",
                    lineHeight: 1.45,
                    ...safeWrapStyle,
                  }}
                >
                  {selectedNode.id}
                </code>

                <div
                  style={{
                    display: "grid",
                    gap: 8,
                    minWidth: 0,
                    border: "1px solid rgba(125,211,252,0.10)",
                    background: "rgba(2,6,23,0.24)",
                    borderRadius: 12,
                    padding: 10,
                  }}
                  data-codexforge-brain-graph-focus-path="true"
                  data-codexforge-brain-graph-neighbor-navigation="true"
                >
                  <div style={{ ...labelStyle, fontSize: 10 }}>Focus path</div>
                  <div style={{ fontSize: 11.5, color: "rgba(224,242,254,0.72)", ...safeWrapStyle }}>
                    {selectedPathLabel}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center", minWidth: 0 }}>
                    <button
                      type="button"
                      title="Previous connected neighbor"
                      aria-label="Previous connected neighbor"
                      onClick={() => handleSelectNeighbor(-1)}
                      disabled={selectedNeighborNodeIds.length === 0}
                      style={{ ...commandButtonStyle(), opacity: selectedNeighborNodeIds.length > 0 ? 1 : 0.54 }}
                    >
                      Prev neighbor
                    </button>
                    <button
                      type="button"
                      title="Next connected neighbor"
                      aria-label="Next connected neighbor"
                      onClick={() => handleSelectNeighbor(1)}
                      disabled={selectedNeighborNodeIds.length === 0}
                      style={{ ...commandButtonStyle(), opacity: selectedNeighborNodeIds.length > 0 ? 1 : 0.54 }}
                    >
                      Next neighbor
                    </button>
                    <button
                      type="button"
                      title="Focus neighbors"
                      aria-label="Focus neighbors"
                      onClick={() => {
                        if (activeNeighborId) onSelectNode(activeNeighborId);
                      }}
                      disabled={!activeNeighborId}
                      style={{ ...commandButtonStyle(Boolean(activeNeighborId)), opacity: activeNeighborId ? 1 : 0.54 }}
                    >
                      Focus neighbors
                    </button>
                    <span style={{ fontSize: 11, color: "rgba(224,242,254,0.58)", ...safeWrapStyle }}>
                      {activeNeighborNode ? getNodeLabel(activeNeighborNode) : "No connected neighbor"}
                    </span>
                  </div>
                </div>
              </div>

              <div style={inspectorCardStyle()}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: 10,
                    minWidth: 0,
                  }}
                >
                  <div style={hudStatStyle()} data-codexforge-brain-graph-focus-neighbors="true">
                    <div style={{ ...labelStyle, fontSize: 10 }}>Neighbors</div>
                    <strong style={{ display: "block", marginTop: 4, fontSize: 15, fontWeight: 680, ...safeWrapStyle }}>
                      {selectedNeighborCount}
                    </strong>
                  </div>
                  <div style={hudStatStyle()}>
                    <div style={{ ...labelStyle, fontSize: 10 }}>Cluster</div>
                    <strong style={{ display: "block", marginTop: 4, fontSize: 15, fontWeight: 680, ...safeWrapStyle }}>
                      {selectedCluster ? formatKindLabel(selectedCluster.kind) : "Unmapped"}
                    </strong>
                  </div>
                  <div style={hudStatStyle()}>
                    <div style={{ ...labelStyle, fontSize: 10 }}>Visible nodes</div>
                    <strong style={{ display: "block", marginTop: 4, fontSize: 15, fontWeight: 680, ...safeWrapStyle }}>
                      {layoutNodes.length}
                    </strong>
                  </div>
                  <div style={hudStatStyle()}>
                    <div style={{ ...labelStyle, fontSize: 10 }}>Visible links</div>
                    <strong style={{ display: "block", marginTop: 4, fontSize: 15, fontWeight: 680, ...safeWrapStyle }}>
                      {visibleEdges.length}
                    </strong>
                  </div>
                  <div style={hudStatStyle()}>
                    <div style={{ ...labelStyle, fontSize: 10 }}>Density</div>
                    <strong style={{ display: "block", marginTop: 4, fontSize: 15, fontWeight: 680, ...safeWrapStyle }}>
                      {graphDensity}
                    </strong>
                  </div>
                </div>
              </div>

              <div
                style={inspectorCardStyle()}
                data-codexforge-brain-graph-legend="true"
                data-codexforge-brain-cluster-map="true"
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center", flexWrap: "wrap", minWidth: 0 }}>
                  <p style={{ ...labelStyle, fontSize: 10 }}>Memory legend</p>
                  <span style={chipStyle("rgba(45,212,191,0.24)")}>
                    <span style={pillTextStyle}>{visibleKinds.length} kinds</span>
                  </span>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, minWidth: 0 }}>
                  {visibleKinds.map((entry, index) => (
                    <span
                      key={buildStableReactKey("visible-node-kind", [entry.kind], index)}
                      style={chipStyle(entry.color)}
                    >
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: 999,
                          background: entry.color,
                          boxShadow: `0 0 16px ${entry.color}`,
                          flex: "0 0 auto",
                        }}
                      />
                      <span style={pillTextStyle}>{formatKindLabel(entry.kind)}</span>
                      <span style={{ opacity: 0.68, ...pillTextStyle }}>{entry.count}</span>
                    </span>
                  ))}
                </div>

                <p style={{ margin: 0, fontSize: 11, lineHeight: 1.45, color: "rgba(224,242,254,0.58)", ...safeWrapStyle }}>
                  Bright links mark focus. Teal links mark neighbors. Signal field is visual-only.
                </p>
              </div>

              <p
                style={{
                  margin: 0,
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                  paddingTop: 9,
                  fontSize: 11,
                  color: "rgba(224,242,254,0.50)",
                  lineHeight: 1.45,
                  ...safeWrapStyle,
                }}
                data-codexforge-brain-graph-next-action="true"
                data-codexforge-brain-action-queue="true"
              >
                Next: inspect actions below for pin, archive, export, or workspace prompt routing.
              </p>
            </div>
          ) : (
            <p style={{ color: "rgba(224,242,254,0.72)", ...safeWrapStyle }}>
              No graph nodes yet. Use the AI workspace to generate tasks, memory, research, and execution events.
            </p>
          )}
        </aside>
      </div>
    </section>
  );
}

export default BrainGraphView;
