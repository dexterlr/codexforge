/* ============================================================
   CodexForge Brain Graph – Public API Surface
   This is the ONLY entry point for graph operations.
   ============================================================ */

/* ================= TYPES ================= */

export type {
  CodexForgeBrainGraph,
  CodexForgeBrainNode,
  CodexForgeBrainEdge,
  CodexForgeBrainNodeId,
  CodexForgeBrainEdgeId,
  CodexForgeBrainNodeInput,
  CodexForgeBrainEdgeInput,
  CodexForgeBrainNodeLookup,
  CodexForgeBrainAdjacency,
  CodexForgeBrainBaseMeta,
} from "./types";

/* ================= CORE GRAPH ================= */

export {
  createEmptyGraph,
  loadBrainGraph,
  saveBrainGraph,
} from "./storage";

/* ================= INDEXING ================= */

export {
  buildNodeLookup,
  buildAdjacency,
} from "./storage";

/* ================= NODE OPS ================= */

export {
  addNode,
  updateNode,
  removeNode,
  upsertNode,
} from "./storage";

/* ================= EDGE OPS ================= */

export {
  addEdge,
  updateEdge,
  removeEdge,
  upsertEdge,
  connectNodes,
} from "./storage";

/* ================= GRAPH OPS ================= */

export {
  dedupeGraph,
} from "./storage";

/* ================= QUERY HELPERS ================= */

export {
  findNodesByKind,
  findNodeById,
  findEdgeById,
  findConnectedNodes,
  findEdgesForNode,
} from "./storage";