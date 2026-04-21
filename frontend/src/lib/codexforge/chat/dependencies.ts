import { getCodexForgeToolRegistry } from "../tools";
import { loadBrainGraph, saveBrainGraph } from "../brain";
import type { CodexForgeBrainGraph } from "../brain/graph";
import type {
  CodexForgeEngineBrainGraphSnapshot,
  CodexForgeEngineDependencies,
} from "./contracts";

/* ================= CACHE ================= */

let cachedDependencies: CodexForgeEngineDependencies | null = null;

/* ================= BRAIN GRAPH ADAPTER ================= */

function toBrainGraphSnapshot(
  graph: CodexForgeBrainGraph
): CodexForgeEngineBrainGraphSnapshot {
  return {
    graph,
    nodeCount: graph.nodes.length,
    edgeCount: graph.edges.length,
  };
}

function buildBrainGraphDependency(): CodexForgeEngineDependencies["brainGraph"] {
  return {
    load: () => {
      const graph = loadBrainGraph();
      return toBrainGraphSnapshot(graph);
    },

    save: (graph: CodexForgeBrainGraph) => {
      const saved = saveBrainGraph(graph);
      return toBrainGraphSnapshot(saved);
    },
  };
}

/* ================= BUILD ================= */

function buildCodexForgeEngineDependencies(): CodexForgeEngineDependencies {
  return {
    tools: getCodexForgeToolRegistry(),
    brainGraph: buildBrainGraphDependency(),
  };
}

/* ================= PUBLIC ================= */

/**
 * Returns a stable dependency object for the local engine.
 *
 * Design goals:
 * - singleton-style reuse across calls
 * - lazy initialization
 * - client-safe dependency surface
 * - future-safe place to extend with brain graph, memory, providers, indexes, and adapters
 */
export function getCodexForgeEngineDependencies(): CodexForgeEngineDependencies {
  if (cachedDependencies !== null) {
    return cachedDependencies;
  }

  cachedDependencies = buildCodexForgeEngineDependencies();
  return cachedDependencies;
}

/**
 * Resets the cached dependency object.
 *
 * Useful for:
 * - tests
 * - hot reload edge cases
 * - future dynamic dependency refresh flows
 */
export function resetCodexForgeEngineDependencies(): void {
  cachedDependencies = null;
}