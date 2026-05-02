import {
  CODEXFORGE_BRAIN_GRAPH_VERSION,
  type CodexForgeBrainAdjacency,
  type CodexForgeBrainBaseMeta,
  type CodexForgeBrainEdge,
  type CodexForgeBrainEdgeId,
  type CodexForgeBrainEdgeInput,
  type CodexForgeBrainGraph,
  type CodexForgeBrainNode,
  type CodexForgeBrainNodeId,
  type CodexForgeBrainNodeInput,
  type CodexForgeBrainNodeLookup,
} from "./types";

/* ================= STORAGE KEYS ================= */

const STORAGE_KEY = `codexforge_brain_graph_v${CODEXFORGE_BRAIN_GRAPH_VERSION}`;
const LEGACY_STORAGE_KEYS = [
  "codexforge_brain_graph_v1",
] as const;

/* ================= UTILS ================= */

function now(): number {
  return Date.now();
}

function safeParse<T>(raw: string | null, fallback: T): T {
  try {
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeWrite(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota and serialization errors
  }
}

function safeRemove(key: string) {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore storage errors
  }
}

function makeId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function cloneNode(node: CodexForgeBrainNode): CodexForgeBrainNode {
  return {
    ...node,
    data: { ...node.data },
    meta: {
      ...node.meta,
      ...(Array.isArray(node.meta.sourceRefs)
        ? { sourceRefs: [...node.meta.sourceRefs] }
        : {}),
    },
    ...(node.graph
      ? {
          graph: {
            ...node.graph,
            ...(node.graph.coordinates
              ? {
                  coordinates: { ...node.graph.coordinates },
                }
              : {}),
          },
        }
      : {}),
  };
}

function cloneEdge(edge: CodexForgeBrainEdge): CodexForgeBrainEdge {
  return {
    ...edge,
    meta: {
      ...edge.meta,
      ...(Array.isArray(edge.meta.sourceRefs)
        ? { sourceRefs: [...edge.meta.sourceRefs] }
        : {}),
    },
  };
}

function cloneGraph(graph: CodexForgeBrainGraph): CodexForgeBrainGraph {
  return {
    ...graph,
    nodes: graph.nodes.map(cloneNode),
    edges: graph.edges.map(cloneEdge),
    meta: {
      ...graph.meta,
    },
  };
}

function normalizeSourceRefs(value: unknown): CodexForgeBrainBaseMeta["sourceRefs"] {
  if (!Array.isArray(value)) return undefined;

  const refs = value
    .filter(isRecord)
    .map((item) => {
      const type = isNonEmptyString(item.type) ? item.type.trim() : "";
      const id = isNonEmptyString(item.id) ? item.id.trim() : "";

      if (!type || !id) return null;
      return { type, id };
    })
    .filter(Boolean) as NonNullable<CodexForgeBrainBaseMeta["sourceRefs"]>;

  return refs.length ? refs : undefined;
}

function normalizeMeta(
  meta?: Partial<CodexForgeBrainBaseMeta>,
  existing?: CodexForgeBrainBaseMeta
): CodexForgeBrainBaseMeta {
  const createdAt = existing?.createdAt ?? meta?.createdAt ?? now();

  return {
    createdAt,
    updatedAt: now(),
    status: meta?.status ?? existing?.status ?? "idle",
    importance: meta?.importance ?? existing?.importance ?? "low",
    ...(typeof (meta?.pinned ?? existing?.pinned) === "boolean"
      ? { pinned: meta?.pinned ?? existing?.pinned }
      : {}),
    ...(typeof (meta?.archived ?? existing?.archived) === "boolean"
      ? { archived: meta?.archived ?? existing?.archived }
      : {}),
    ...(normalizeSourceRefs(meta?.sourceRefs ?? existing?.sourceRefs)
      ? { sourceRefs: normalizeSourceRefs(meta?.sourceRefs ?? existing?.sourceRefs) }
      : {}),
    ...(isFiniteNumber(meta?.version ?? existing?.version)
      ? { version: meta?.version ?? existing?.version }
      : {}),
  };
}

function normalizeDataRecord(raw: unknown): Record<string, unknown> | null {
  if (!isRecord(raw)) return null;

  const next: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(raw)) {
    if (value === undefined) continue;
    next[key] = value;
  }

  return next;
}

function normalizeNode(raw: unknown): CodexForgeBrainNode | null {
  if (!isRecord(raw)) return null;
  if (!isNonEmptyString(raw.id)) return null;
  if (!isNonEmptyString(raw.kind)) return null;

  const data = normalizeDataRecord(raw.data);
  if (!data) return null;

  const label =
    isNonEmptyString(data.label)
      ? data.label.trim()
      : `${String(raw.kind).trim()} ${String(raw.id).trim()}`;

  const node: CodexForgeBrainNode = {
    ...(raw as Omit<CodexForgeBrainNode, "id" | "kind" | "data" | "meta">),
    id: raw.id.trim(),
    kind: raw.kind.trim() as CodexForgeBrainNode["kind"],
    data: {
      ...data,
      label,
    } as CodexForgeBrainNode["data"],
    meta: normalizeMeta(isRecord(raw.meta) ? (raw.meta as Partial<CodexForgeBrainBaseMeta>) : {}),
  };

  if (isRecord(raw.graph)) {
    node.graph = {
      ...(typeof raw.graph.collapsed === "boolean"
        ? { collapsed: raw.graph.collapsed }
        : {}),
      ...(typeof raw.graph.hidden === "boolean"
        ? { hidden: raw.graph.hidden }
        : {}),
      ...(isRecord(raw.graph.coordinates) &&
      isFiniteNumber(raw.graph.coordinates.x) &&
      isFiniteNumber(raw.graph.coordinates.y)
        ? {
            coordinates: {
              x: raw.graph.coordinates.x,
              y: raw.graph.coordinates.y,
            },
          }
        : {}),
    };
  }

  return node;
}

function normalizeEdge(raw: unknown): CodexForgeBrainEdge | null {
  if (!isRecord(raw)) return null;
  if (!isNonEmptyString(raw.id)) return null;
  if (!isNonEmptyString(raw.kind)) return null;
  if (!isNonEmptyString(raw.from)) return null;
  if (!isNonEmptyString(raw.to)) return null;

  const edge: CodexForgeBrainEdge = {
    ...(raw as Omit<CodexForgeBrainEdge, "id" | "kind" | "from" | "to" | "meta">),
    id: raw.id.trim(),
    kind: raw.kind.trim() as CodexForgeBrainEdge["kind"],
    from: raw.from.trim(),
    to: raw.to.trim(),
    meta: normalizeMeta(isRecord(raw.meta) ? (raw.meta as Partial<CodexForgeBrainBaseMeta>) : {}),
  };

  if (isNonEmptyString(raw.label)) {
    edge.label = raw.label.trim();
  }

  if (isFiniteNumber(raw.weight)) {
    edge.weight = raw.weight;
  }

  return edge;
}

function normalizeGraphMeta(raw: unknown): CodexForgeBrainGraph["meta"] {
  const t = now();

  if (!isRecord(raw)) {
    return {
      createdAt: t,
      updatedAt: t,
    };
  }

  return {
    createdAt: isFiniteNumber(raw.createdAt) ? raw.createdAt : t,
    updatedAt: isFiniteNumber(raw.updatedAt) ? raw.updatedAt : t,
    ...(isNonEmptyString(raw.workspaceId)
      ? { workspaceId: raw.workspaceId.trim() }
      : {}),
    ...(isNonEmptyString(raw.projectId)
      ? { projectId: raw.projectId.trim() }
      : {}),
    ...(isNonEmptyString(raw.repoPath)
      ? { repoPath: raw.repoPath.trim() }
      : {}),
  };
}

function normalizeGraph(raw: unknown): CodexForgeBrainGraph {
  const empty = createEmptyGraph();

  if (!isRecord(raw)) {
    return empty;
  }

  const rawNodes = Array.isArray(raw.nodes) ? raw.nodes : [];
  const rawEdges = Array.isArray(raw.edges) ? raw.edges : [];

  const nodeMap = new Map<CodexForgeBrainNodeId, CodexForgeBrainNode>();
  for (const candidate of rawNodes) {
    const node = normalizeNode(candidate);
    if (!node) continue;
    nodeMap.set(node.id, node);
  }

  const edgeMap = new Map<string, CodexForgeBrainEdge>();
  for (const candidate of rawEdges) {
    const edge = normalizeEdge(candidate);
    if (!edge) continue;
    if (!nodeMap.has(edge.from) || !nodeMap.has(edge.to)) continue;
    edgeMap.set(edge.id, edge);
  }

  return {
    version: CODEXFORGE_BRAIN_GRAPH_VERSION,
    nodes: [...nodeMap.values()],
    edges: [...edgeMap.values()],
    meta: normalizeGraphMeta(raw.meta),
  };
}

function edgeIdentityKey(
  edge: Pick<CodexForgeBrainEdge, "from" | "to" | "kind" | "label">
): string {
  return `${edge.from}::${edge.to}::${edge.kind}::${edge.label ?? ""}`;
}

function hasNode(graph: CodexForgeBrainGraph, id: CodexForgeBrainNodeId): boolean {
  return graph.nodes.some((node) => node.id === id);
}

function readStoredGraphRaw(): unknown {
  if (typeof window === "undefined") {
    return null;
  }

  const currentRaw = localStorage.getItem(STORAGE_KEY);
  if (currentRaw) {
    return safeParse<unknown>(currentRaw, null);
  }

  for (const legacyKey of LEGACY_STORAGE_KEYS) {
    const legacyRaw = localStorage.getItem(legacyKey);
    if (legacyRaw) {
      return safeParse<unknown>(legacyRaw, null);
    }
  }

  return null;
}

/* ================= GRAPH INIT ================= */

export function createEmptyGraph(): CodexForgeBrainGraph {
  const t = now();

  return {
    version: CODEXFORGE_BRAIN_GRAPH_VERSION,
    nodes: [],
    edges: [],
    meta: {
      createdAt: t,
      updatedAt: t,
    },
  };
}

/* ================= LOAD / SAVE ================= */

export function loadBrainGraph(): CodexForgeBrainGraph {
  if (typeof window === "undefined") {
    return createEmptyGraph();
  }

  const parsed = readStoredGraphRaw();
  const normalized = normalizeGraph(parsed);

  if (parsed !== null) {
    safeWrite(STORAGE_KEY, normalized);

    for (const legacyKey of LEGACY_STORAGE_KEYS) {
      if (legacyKey !== STORAGE_KEY) {
        safeRemove(legacyKey);
      }
    }
  }

  return normalized;
}

export function saveBrainGraph(
  graph: CodexForgeBrainGraph
): CodexForgeBrainGraph {
  const normalized = normalizeGraph(graph);
  const next: CodexForgeBrainGraph = {
    ...normalized,
    version: CODEXFORGE_BRAIN_GRAPH_VERSION,
    meta: {
      ...normalized.meta,
      updatedAt: now(),
    },
  };

  if (typeof window !== "undefined") {
    safeWrite(STORAGE_KEY, next);

    for (const legacyKey of LEGACY_STORAGE_KEYS) {
      if (legacyKey !== STORAGE_KEY) {
        safeRemove(legacyKey);
      }
    }
  }

  return next;
}

/* ================= INDEXES ================= */

export function buildNodeLookup(
  nodes: CodexForgeBrainNode[]
): CodexForgeBrainNodeLookup {
  const map: CodexForgeBrainNodeLookup = {};

  for (const node of nodes) {
    map[node.id] = node;
  }

  return map;
}

export function buildAdjacency(
  edges: CodexForgeBrainEdge[]
): CodexForgeBrainAdjacency {
  const map: CodexForgeBrainAdjacency = {};

  for (const edge of edges) {
    if (!map[edge.from]) map[edge.from] = [];
    if (!map[edge.to]) map[edge.to] = [];

    map[edge.from].push(edge);
    map[edge.to].push(edge);
  }

  return map;
}

/* ================= NODE OPS ================= */

export function addNode(
  graph: CodexForgeBrainGraph,
  input: CodexForgeBrainNodeInput
): CodexForgeBrainNode {
  const baseData = normalizeDataRecord(input.data) ?? {};
  const label =
    isNonEmptyString(baseData.label)
      ? baseData.label.trim()
      : `${String(input.kind)} ${input.id ?? ""}`.trim();

  const node: CodexForgeBrainNode = {
    ...input,
    id: input.id ?? makeId("node"),
    data: {
      ...baseData,
      label,
    } as CodexForgeBrainNode["data"],
    meta: normalizeMeta(input.meta),
    ...(input.graph
      ? {
          graph: {
            ...input.graph,
            ...(input.graph.coordinates
              ? {
                  coordinates: { ...input.graph.coordinates },
                }
              : {}),
          },
        }
      : {}),
  } as CodexForgeBrainNode;

  graph.nodes.push(node);
  graph.meta.updatedAt = now();

  return node;
}

export function updateNode(
  graph: CodexForgeBrainGraph,
  id: CodexForgeBrainNodeId,
  patch: Partial<Omit<CodexForgeBrainNode, "id" | "meta">> & {
    meta?: Partial<CodexForgeBrainBaseMeta>;
  }
): CodexForgeBrainNode | null {
  const node = graph.nodes.find((candidate) => candidate.id === id);
  if (!node) return null;

  if (patch.kind !== undefined) {
    node.kind = patch.kind as typeof node.kind;
  }

  if (patch.data !== undefined) {
    const nextData = normalizeDataRecord(patch.data) ?? {};
    node.data = {
      ...nextData,
      label:
        isNonEmptyString(nextData.label)
          ? nextData.label.trim()
          : node.data.label,
    } as typeof node.data;
  }

  if (patch.graph !== undefined) {
    node.graph = patch.graph
      ? {
          ...patch.graph,
          ...(patch.graph.coordinates
            ? { coordinates: { ...patch.graph.coordinates } }
            : {}),
        }
      : undefined;
  }

  node.meta = normalizeMeta(patch.meta, node.meta);
  graph.meta.updatedAt = now();

  return node;
}

export function removeNode(
  graph: CodexForgeBrainGraph,
  id: CodexForgeBrainNodeId
): boolean {
  const beforeNodeCount = graph.nodes.length;
  graph.nodes = graph.nodes.filter((node) => node.id !== id);
  graph.edges = graph.edges.filter((edge) => edge.from !== id && edge.to !== id);

  const changed = graph.nodes.length !== beforeNodeCount;
  if (changed) {
    graph.meta.updatedAt = now();
  }

  return changed;
}

/* ================= EDGE OPS ================= */

export function addEdge(
  graph: CodexForgeBrainGraph,
  input: CodexForgeBrainEdgeInput
): CodexForgeBrainEdge {
  if (!hasNode(graph, input.from) || !hasNode(graph, input.to)) {
    throw new Error(
      `Cannot add edge: missing node reference (${input.from} -> ${input.to}).`
    );
  }

  const edge: CodexForgeBrainEdge = {
    ...input,
    id: input.id ?? makeId("edge"),
    ...(typeof input.label === "string" && input.label.trim().length > 0
      ? { label: input.label.trim() }
      : {}),
    meta: normalizeMeta(input.meta),
  };

  graph.edges.push(edge);
  graph.meta.updatedAt = now();

  return edge;
}

export function updateEdge(
  graph: CodexForgeBrainGraph,
  id: CodexForgeBrainEdgeId,
  patch: Partial<Omit<CodexForgeBrainEdge, "id" | "meta">> & {
    meta?: Partial<CodexForgeBrainBaseMeta>;
  }
): CodexForgeBrainEdge | null {
  const edge = graph.edges.find((candidate) => candidate.id === id);
  if (!edge) return null;

  if (patch.kind !== undefined) edge.kind = patch.kind;
  if (patch.from !== undefined) edge.from = patch.from;
  if (patch.to !== undefined) edge.to = patch.to;
  if (patch.label !== undefined) edge.label = patch.label;
  if (patch.weight !== undefined) edge.weight = patch.weight;

  if (!hasNode(graph, edge.from) || !hasNode(graph, edge.to)) {
    throw new Error(
      `Cannot update edge: missing node reference (${edge.from} -> ${edge.to}).`
    );
  }

  edge.meta = normalizeMeta(patch.meta, edge.meta);
  graph.meta.updatedAt = now();

  return edge;
}

export function removeEdge(
  graph: CodexForgeBrainGraph,
  id: CodexForgeBrainEdgeId
): boolean {
  const beforeCount = graph.edges.length;
  graph.edges = graph.edges.filter((edge) => edge.id !== id);

  const changed = graph.edges.length !== beforeCount;
  if (changed) {
    graph.meta.updatedAt = now();
  }

  return changed;
}

/* ================= HIGH LEVEL HELPERS ================= */

export function upsertNode(
  graph: CodexForgeBrainGraph,
  match: (node: CodexForgeBrainNode) => boolean,
  create: () => CodexForgeBrainNodeInput,
  update?: (
    existing: CodexForgeBrainNode
  ) => Partial<Omit<CodexForgeBrainNode, "id" | "meta">> & {
    meta?: Partial<CodexForgeBrainBaseMeta>;
  }
): CodexForgeBrainNode {
  const existing = graph.nodes.find(match);

  if (existing) {
    if (update) {
      const updated = updateNode(graph, existing.id, update(existing));
      return updated ?? existing;
    }
    return existing;
  }

  return addNode(graph, create());
}

export function upsertEdge(
  graph: CodexForgeBrainGraph,
  match: (edge: CodexForgeBrainEdge) => boolean,
  create: () => CodexForgeBrainEdgeInput,
  update?: (
    existing: CodexForgeBrainEdge
  ) => Partial<Omit<CodexForgeBrainEdge, "id" | "meta">> & {
    meta?: Partial<CodexForgeBrainBaseMeta>;
  }
): CodexForgeBrainEdge {
  const existing = graph.edges.find(match);

  if (existing) {
    if (update) {
      const updated = updateEdge(graph, existing.id, update(existing));
      return updated ?? existing;
    }
    return existing;
  }

  return addEdge(graph, create());
}

export function connectNodes(
  graph: CodexForgeBrainGraph,
  from: string,
  to: string,
  kind: CodexForgeBrainEdge["kind"],
  label?: string
): CodexForgeBrainEdge | null {
  if (!hasNode(graph, from) || !hasNode(graph, to)) {
    return null;
  }

  return upsertEdge(
    graph,
    (edge) =>
      edge.from === from &&
      edge.to === to &&
      edge.kind === kind &&
      (edge.label ?? "") === (label ?? ""),
    () => ({
      from,
      to,
      kind,
      ...(label ? { label } : {}),
      meta: {},
    }),
    () => ({
      meta: {},
    })
  );
}

export function dedupeGraph(graph: CodexForgeBrainGraph): CodexForgeBrainGraph {
  const next = cloneGraph(graph);

  const nodeMap = new Map<CodexForgeBrainNodeId, CodexForgeBrainNode>();
  for (const node of next.nodes) {
    nodeMap.set(node.id, node);
  }

  const edgeMap = new Map<string, CodexForgeBrainEdge>();
  for (const edge of next.edges) {
    if (!nodeMap.has(edge.from) || !nodeMap.has(edge.to)) continue;
    edgeMap.set(edgeIdentityKey(edge), edge);
  }

  next.nodes = [...nodeMap.values()];
  next.edges = [...edgeMap.values()];
  next.meta.updatedAt = now();

  return next;
}

/* ================= QUERY HELPERS ================= */

export function findNodesByKind(
  graph: CodexForgeBrainGraph,
  kind: CodexForgeBrainNode["kind"]
): CodexForgeBrainNode[] {
  return graph.nodes.filter((node) => node.kind === kind);
}

export function findNodeById(
  graph: CodexForgeBrainGraph,
  nodeId: CodexForgeBrainNodeId
): CodexForgeBrainNode | null {
  return graph.nodes.find((node) => node.id === nodeId) ?? null;
}

export function findEdgeById(
  graph: CodexForgeBrainGraph,
  edgeId: CodexForgeBrainEdgeId
): CodexForgeBrainEdge | null {
  return graph.edges.find((edge) => edge.id === edgeId) ?? null;
}

export function findConnectedNodes(
  graph: CodexForgeBrainGraph,
  nodeId: string
): CodexForgeBrainNode[] {
  const adjacency = buildAdjacency(graph.edges);
  const edges = adjacency[nodeId] ?? [];
  const lookup = buildNodeLookup(graph.nodes);

  const results: CodexForgeBrainNode[] = [];
  const seen = new Set<string>();

  for (const edge of edges) {
    const otherId = edge.from === nodeId ? edge.to : edge.from;
    const node = lookup[otherId];
    if (!node || seen.has(node.id)) continue;

    seen.add(node.id);
    results.push(node);
  }

  return results;
}

export function findEdgesForNode(
  graph: CodexForgeBrainGraph,
  nodeId: string
): CodexForgeBrainEdge[] {
  const adjacency = buildAdjacency(graph.edges);
  return [...(adjacency[nodeId] ?? [])];
}