import { getCodexForgeToolRegistry } from "../tools";
import { loadBrainGraph, saveBrainGraph } from "../brain";
import type { CodexForgeBrainGraph } from "../brain/graph";
import type {
  CodexForgeEngineBrainGraphSnapshot,
  CodexForgeEngineDependencies,
  CodexForgeEngineToolExecutionAdapter,
} from "./contracts";
import type {
  CodexForgeToolExecutionRequest,
  CodexForgeToolResult,
} from "../tools";
import { buildFailedToolJob } from "../tools/shared";

/* ================= CACHE ================= */

let cachedDependencies: CodexForgeEngineDependencies | null = null;

/* ================= UTILS ================= */

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function now(): number {
  return Date.now();
}

function normalizeToolName(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function getSafeRequestContext(
  request: CodexForgeToolExecutionRequest
): Record<string, unknown> {
  return isRecord(request.context) ? request.context : {};
}

function getSafeRequestInput(
  request: CodexForgeToolExecutionRequest
): Record<string, unknown> {
  return isRecord(request.input) ? request.input : {};
}

function buildErrorToolResult(args: {
  toolName: string;
  summary: string;
  message: string;
  content?: CodexForgeToolResult["content"];
  raw?: unknown;
  request?: CodexForgeToolExecutionRequest;
  code?: string;
  metadata?: CodexForgeToolResult["metadata"];
}): CodexForgeToolResult {
  const startedAt = now();
  const completedAt = now();

  const metadata = {
    sourceToolName: args.toolName,
    requestId:
      typeof args.request?.context?.requestId === "string"
        ? args.request.context.requestId
        : undefined,
    ...(args.metadata ?? {}),
  };

  return {
    ok: false,
    toolName: args.toolName,
    summary: args.summary,
    ...(args.content ? { content: args.content } : {}),
    error: {
      code: args.code ?? "TOOL_NOT_EXECUTABLE",
      message: args.message,
      retryable: false,
    },
    startedAt,
    completedAt,
    durationMs: Math.max(0, completedAt - startedAt),
    ...(args.raw !== undefined ? { raw: args.raw } : {}),
    metadata,
    job: buildFailedToolJob({
      id:
        typeof args.request?.context?.requestId === "string" &&
        args.request.context.requestId.trim().length > 0
          ? args.request.context.requestId.trim()
          : `${args.toolName || "tool"}-client-stub`,
      startedAt,
      message: args.message,
      stage: "client-tool-execution-blocked",
      metadata,
    }),
  };
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

/* ================= TOOL EXECUTION ADAPTER ================= */

/**
 * Current client/local engine execution policy:
 * - registry is authoritative for what tools exist
 * - client dependency surface stays safe and non-executing
 * - tools remain discoverable for planning and recommendation
 * - actual execution is delegated to the server dependency layer
 */
function buildToolExecutionDependency(): CodexForgeEngineToolExecutionAdapter {
  const registry = getCodexForgeToolRegistry();

  const executableToolNames = new Set<string>();
  const toolMap = new Map(
    registry.tools.map((tool) => [tool.name, tool] as const)
  );

  return {
    canExecute: (toolName: string) => {
      const normalized = normalizeToolName(toolName);
      return normalized.length > 0 && executableToolNames.has(normalized);
    },

    getExecutableToolNames: () => Array.from(executableToolNames.values()),

    execute: async (request) => {
      const toolName = normalizeToolName(request.toolName);

      if (!toolName) {
        return buildErrorToolResult({
          toolName: "unknown",
          summary: "Tool execution failed.",
          message: "Tool name is required.",
          request,
          code: "MISSING_TOOL_NAME",
          raw: {
            context: getSafeRequestContext(request),
            input: getSafeRequestInput(request),
          },
        });
      }

      const tool = toolMap.get(toolName);

      if (!tool) {
        return buildErrorToolResult({
          toolName,
          summary: `Unknown tool: ${toolName}`,
          message: `Unknown tool: ${toolName}`,
          request,
          code: "TOOL_NOT_FOUND",
          raw: {
            context: getSafeRequestContext(request),
            input: getSafeRequestInput(request),
          },
        });
      }

      if (!executableToolNames.has(toolName)) {
        return buildErrorToolResult({
          toolName,
          summary: `${toolName} is registered but not executable yet.`,
          message: `${toolName} is registered but not yet executable through the client engine adapter.`,
          request,
          code: "TOOL_NOT_EXECUTABLE",
          content: {
            type: "json",
            json: {
              toolName,
              availability: tool.availability,
              description: tool.description,
              domain: tool.domain,
              tags: tool.tags,
              context: getSafeRequestContext(request),
              input: getSafeRequestInput(request),
            },
          },
          raw: {
            toolName,
            availability: tool.availability,
            context: getSafeRequestContext(request),
            input: getSafeRequestInput(request),
          },
          metadata: {
            sourceToolName: toolName,
            layer: "client",
            executionMode: "planning-only",
          },
        });
      }

      return buildErrorToolResult({
        toolName,
        summary: `${toolName} has no concrete runner attached.`,
        message: `${toolName} execution wiring exists in policy but no concrete runner is attached yet.`,
        request,
        code: "TOOL_NOT_EXECUTABLE",
        content: {
          type: "json",
          json: {
            toolName,
            availability: tool.availability,
            description: tool.description,
            domain: tool.domain,
            tags: tool.tags,
            context: getSafeRequestContext(request),
            input: getSafeRequestInput(request),
          },
        },
        raw: {
          toolName,
          availability: tool.availability,
          context: getSafeRequestContext(request),
          input: getSafeRequestInput(request),
        },
        metadata: {
          sourceToolName: toolName,
          layer: "client",
          executionMode: "planning-only",
        },
      });
    },
  };
}

/* ================= BUILD ================= */

function buildCodexForgeEngineDependencies(): CodexForgeEngineDependencies {
  return {
    tools: getCodexForgeToolRegistry(),
    brainGraph: buildBrainGraphDependency(),
    toolExecution: buildToolExecutionDependency(),
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
 * - clean composition root for future adapters
 * - stable place to attach execution, providers, memory, indexes, and richer workflows
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