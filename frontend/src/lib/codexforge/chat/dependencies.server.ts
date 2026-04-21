import "server-only";

import { getCodexForgeToolRegistry } from "../tools";
import type {
  CodexForgeToolExecutionRequest,
  CodexForgeToolExecutionResponse,
} from "../tools";
import {
  executeCodexForgeTool,
  getCodexForgeExecutableToolNames,
} from "../tools/server";
import { loadBrainGraph, saveBrainGraph } from "../brain";
import type { CodexForgeBrainGraph } from "../brain/graph";
import type {
  CodexForgeEngineBrainGraphSnapshot,
  CodexForgeEngineDependencies,
} from "./contracts";

/* ================= TYPES ================= */

export type CodexForgeServerToolExecutionDependency = {
  execute: (
    request: CodexForgeToolExecutionRequest
  ) => Promise<CodexForgeToolExecutionResponse>;
  canExecute: (toolName: string) => boolean;
  getExecutableToolNames: () => string[];
};

export type CodexForgeServerEngineDependencies = CodexForgeEngineDependencies & {
  toolExecution: CodexForgeServerToolExecutionDependency;
};

/* ================= CACHE ================= */

let cachedDependencies: CodexForgeServerEngineDependencies | null = null;

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

/* ================= TOOL EXECUTION ================= */

function buildToolExecutionDependency(): CodexForgeServerToolExecutionDependency {
  const executableNames = new Set<string>(getCodexForgeExecutableToolNames());

  return {
    execute: async (
      request: CodexForgeToolExecutionRequest
    ): Promise<CodexForgeToolExecutionResponse> => {
      return await executeCodexForgeTool(request);
    },

    canExecute: (toolName: string): boolean => {
      const normalized = toolName.trim();
      return normalized.length > 0 && executableNames.has(normalized);
    },

    getExecutableToolNames: (): string[] => {
      return [...executableNames];
    },
  };
}

/* ================= BUILD ================= */

function buildCodexForgeServerEngineDependencies(): CodexForgeServerEngineDependencies {
  return {
    tools: getCodexForgeToolRegistry(),
    brainGraph: buildBrainGraphDependency(),
    toolExecution: buildToolExecutionDependency(),
  };
}

/* ================= PUBLIC ================= */

export function getCodexForgeServerEngineDependencies(): CodexForgeServerEngineDependencies {
  if (cachedDependencies !== null) {
    return cachedDependencies;
  }

  cachedDependencies = buildCodexForgeServerEngineDependencies();
  return cachedDependencies;
}

export function resetCodexForgeServerEngineDependencies(): void {
  cachedDependencies = null;
}