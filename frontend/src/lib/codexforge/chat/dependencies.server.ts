import "server-only";

import { loadBrainGraph, saveBrainGraph } from "../brain";
import type { CodexForgeBrainGraph } from "../brain/graph";
import { getCodexForgeToolRegistry } from "../tools";
import type {
  CodexForgeToolExecutionRequest,
  CodexForgeToolExecutionResponse,
} from "../tools";
import {
  executeCodexForgeTool,
  getCodexForgeExecutableToolNames,
} from "../tools/server";
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

export type CodexForgeServerEngineDependencies =
  CodexForgeEngineDependencies & {
    toolExecution: CodexForgeServerToolExecutionDependency;
  };

/* ================= CACHE ================= */

let cachedDependencies: CodexForgeServerEngineDependencies | null = null;

/* ================= HELPERS ================= */

function normalizeToolName(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

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
    load: (): CodexForgeEngineBrainGraphSnapshot => {
      const graph = loadBrainGraph();
      return toBrainGraphSnapshot(graph);
    },

    save: (graph: CodexForgeBrainGraph): CodexForgeEngineBrainGraphSnapshot => {
      const savedGraph = saveBrainGraph(graph);
      return toBrainGraphSnapshot(savedGraph);
    },
  };
}

/* ================= TOOL EXECUTION ================= */

function buildToolExecutionDependency(): CodexForgeServerToolExecutionDependency {
  const executableToolNames = getCodexForgeExecutableToolNames()
    .map(normalizeToolName)
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  const executableToolNameSet = new Set<string>(executableToolNames);

  return {
    execute: async (
      request: CodexForgeToolExecutionRequest
    ): Promise<CodexForgeToolExecutionResponse> => {
      return executeCodexForgeTool(request);
    },

    canExecute: (toolName: string): boolean => {
      const normalized = normalizeToolName(toolName);
      return normalized.length > 0 && executableToolNameSet.has(normalized);
    },

    getExecutableToolNames: (): string[] => {
      return [...executableToolNames];
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