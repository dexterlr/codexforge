import "server-only";

import type {
  CodexForgeToolDefinition,
  CodexForgeToolExecutionContext,
  CodexForgeToolExecutionRequest,
  CodexForgeToolExecutionResponse,
  CodexForgeToolRegistry,
  CodexForgeToolResult,
} from "./contracts";
import {
  createCodexForgeToolErrorResult,
  createCodexForgeToolRegistry,
} from "./contracts";
import {
  CODEXFORGE_TOOL_REGISTRY_VERSION,
  clampText,
} from "./shared";
import {
  getCodexForgeToolByName as getClientToolByName,
  getCodexForgeToolRegistry as getClientToolRegistry,
} from "./index";
import { applyDiffTool } from "./apply-diff";
import { generateDiffTool } from "./generate-diff";
import { listFilesTool } from "./list-files";
import { readFileTool } from "./read-file";
import { runCommandTool } from "./run-command";
import { runTestsTool } from "./run-tests";
import { searchProjectTool } from "./search-project";
import { snapshotProjectTool } from "./snapshot-project";

/* ================= TYPES ================= */

export type CodexForgeServerToolName =
  | "read-file"
  | "list-files"
  | "search-project"
  | "run-command"
  | "generate-diff"
  | "apply-diff"
  | "snapshot-project"
  | "run-tests";

type ExecutableToolMap = Record<CodexForgeServerToolName, CodexForgeToolDefinition>;

/* ================= EXECUTABLE TOOL MAP ================= */

const EXECUTABLE_TOOLS: ExecutableToolMap = {
  "read-file": readFileTool,
  "list-files": listFilesTool,
  "search-project": searchProjectTool,
  "run-command": runCommandTool,
  "generate-diff": generateDiffTool,
  "apply-diff": applyDiffTool,
  "snapshot-project": snapshotProjectTool,
  "run-tests": runTestsTool,
};

const EXECUTABLE_TOOL_NAMES = Object.keys(
  EXECUTABLE_TOOLS
) as CodexForgeServerToolName[];

/* ================= HELPERS ================= */

function assertExecutableToolShape(tool: CodexForgeToolDefinition): void {
  if (!tool.handler) {
    throw new Error(`Executable tool '${tool.name}' is missing a handler.`);
  }

  if (tool.availability !== "ready") {
    throw new Error(
      `Executable tool '${tool.name}' must be marked as ready, got '${tool.availability}'.`
    );
  }
}

function buildServerToolDefinition(
  clientDefinition: CodexForgeToolDefinition,
  executableDefinition: CodexForgeToolDefinition
): CodexForgeToolDefinition {
  assertExecutableToolShape(executableDefinition);

  return {
    ...clientDefinition,
    availability: "ready",
    handler: executableDefinition.handler,
    metadata: {
      ...(clientDefinition.metadata ?? {}),
      ...(executableDefinition.metadata ?? {}),
      tags: Array.from(
        new Set([
          ...(clientDefinition.metadata?.tags ?? []),
          ...(executableDefinition.metadata?.tags ?? []),
        ])
      ),
    },
  };
}

function buildServerRegistryTools(): CodexForgeToolDefinition[] {
  const clientRegistry = getClientToolRegistry();
  const executableNameSet = new Set<string>(EXECUTABLE_TOOL_NAMES);

  return clientRegistry.tools.map((tool) => {
    if (!executableNameSet.has(tool.name)) {
      return tool;
    }

    const executableTool = EXECUTABLE_TOOLS[tool.name as CodexForgeServerToolName];
    return buildServerToolDefinition(tool, executableTool);
  });
}

function buildToolMap(
  tools: CodexForgeToolDefinition[]
): Record<string, CodexForgeToolDefinition> {
  const toolMap: Record<string, CodexForgeToolDefinition> = {};

  for (const tool of tools) {
    toolMap[tool.name] = tool;
  }

  return toolMap;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function normalizeExecutionRequest(
  request: CodexForgeToolExecutionRequest
): CodexForgeToolExecutionRequest {
  return {
    toolName: String(request.toolName ?? "").trim(),
    input: isRecord(request.input) ? request.input : {},
    context: request.context ?? {},
  };
}

function createMissingToolResult(
  toolName: string,
  startedAt: number
): CodexForgeToolResult {
  return createCodexForgeToolErrorResult({
    toolName,
    summary: `Tool '${toolName}' was not found.`,
    code: "TOOL_NOT_FOUND",
    message: `No CodexForge tool named '${toolName}' is registered on the server.`,
    retryable: false,
    startedAt,
    completedAt: Date.now(),
  });
}

function createUnavailableToolResult(
  tool: CodexForgeToolDefinition,
  startedAt: number
): CodexForgeToolResult {
  return createCodexForgeToolErrorResult({
    toolName: tool.name,
    summary: `${tool.label} is not executable on the server.`,
    code: "TOOL_NOT_EXECUTABLE",
    message:
      tool.availability === "ready"
        ? `${tool.label} is marked ready but no handler is bound on the server.`
        : `${tool.label} is currently '${tool.availability}' and cannot be executed.`,
    retryable: false,
    startedAt,
    completedAt: Date.now(),
  });
}

function createCrashedToolResult(
  toolName: string,
  error: unknown,
  startedAt: number
): CodexForgeToolResult {
  return createCodexForgeToolErrorResult({
    toolName,
    summary: `Tool '${toolName}' crashed during execution.`,
    code: "TOOL_EXECUTION_CRASHED",
    message:
      error instanceof Error && error.message.trim().length > 0
        ? clampText(error.message, 400)
        : "An unexpected tool execution error occurred.",
    retryable: false,
    startedAt,
    completedAt: Date.now(),
  });
}

/* ================= REGISTRY ================= */

const SERVER_TOOL_REGISTRY_TOOLS = buildServerRegistryTools();

const SERVER_TOOL_REGISTRY: CodexForgeToolRegistry = createCodexForgeToolRegistry(
  SERVER_TOOL_REGISTRY_TOOLS,
  CODEXFORGE_TOOL_REGISTRY_VERSION
);

const SERVER_TOOL_MAP = buildToolMap(SERVER_TOOL_REGISTRY.tools);

/* ================= EXPORTS ================= */

export function getCodexForgeServerToolRegistry(): CodexForgeToolRegistry {
  return {
    version: SERVER_TOOL_REGISTRY.version,
    tools: [...SERVER_TOOL_REGISTRY.tools],
    toolMap: { ...SERVER_TOOL_REGISTRY.toolMap },
  };
}

export function getCodexForgeServerToolByName(
  name: string
): CodexForgeToolDefinition | undefined {
  const normalized = name.trim();
  return normalized ? SERVER_TOOL_MAP[normalized] : undefined;
}

export function getCodexForgeExecutableToolNames(): CodexForgeServerToolName[] {
  return [...EXECUTABLE_TOOL_NAMES];
}

export function isCodexForgeExecutableToolName(
  name: string
): name is CodexForgeServerToolName {
  return EXECUTABLE_TOOL_NAMES.includes(name as CodexForgeServerToolName);
}

export async function executeCodexForgeTool(
  request: CodexForgeToolExecutionRequest
): Promise<CodexForgeToolExecutionResponse> {
  const startedAt = Date.now();
  const normalized = normalizeExecutionRequest(request);
  const toolName = normalized.toolName;

  if (!toolName) {
    return createCodexForgeToolErrorResult({
      toolName: "unknown",
      summary: "Missing tool name.",
      code: "MISSING_TOOL_NAME",
      message: "Tool execution requires a toolName.",
      retryable: false,
      startedAt,
      completedAt: Date.now(),
    });
  }

  const tool = getCodexForgeServerToolByName(toolName);
  if (!tool) {
    return createMissingToolResult(toolName, startedAt);
  }

  if (!tool.handler) {
    return createUnavailableToolResult(tool, startedAt);
  }

  try {
    return await tool.handler(normalized.input, normalized.context ?? {});
  } catch (error) {
    return createCrashedToolResult(tool.name, error, startedAt);
  }
}

export function getCodexForgeServerReadyTools(): CodexForgeToolDefinition[] {
  return SERVER_TOOL_REGISTRY.tools.filter((tool) => tool.availability === "ready");
}

export function getCodexForgeServerStubTools(): CodexForgeToolDefinition[] {
  return SERVER_TOOL_REGISTRY.tools.filter((tool) => tool.availability === "stub");
}

export function getCodexForgeClientToolDescriptor(
  name: string
): CodexForgeToolDefinition | undefined {
  const normalized = name.trim();
  if (!normalized) return undefined;
  return getClientToolByName(normalized as never);
}