import {
  getCodexForgeToolAdapter,
  getCodexForgeToolAdapterNames,
  listCodexForgeToolAdapters,
  requireCodexForgeToolAdapter,
} from "@/lib/codexforge/tools/tool-adapter-registry";
export { evaluateCodexForgeToolPolicy, assertCodexForgeToolAllowed } from "@/lib/codexforge/tools/tool-policy-guard";
import "server-only";

import type {
  CodexForgeToolDefinition,
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
  createToolJob,
} from "./shared";
import {
  getCodexForgeToolByName as getClientToolByName,
  getCodexForgeToolRegistry as getClientToolRegistry,
} from "./index";
import { applyDiffTool } from "./apply-diff";
import { buildWebAppTool } from "./build-web-app";
import { generateDiffTool } from "./generate-diff";
import { listFilesTool } from "./list-files";
import { readFileTool } from "./read-file";
import { renderJobTool } from "./render-job";
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
  | "render-job"
  | "run-tests"
  | "build-web-app";

type ExecutableToolMap = Record<
  CodexForgeServerToolName,
  CodexForgeToolDefinition
>;

/* ================= EXECUTABLE TOOL MAP ================= */

const EXECUTABLE_TOOLS: ExecutableToolMap = {
  "read-file": readFileTool,
  "list-files": listFilesTool,
  "search-project": searchProjectTool,
  "run-command": runCommandTool,
  "generate-diff": generateDiffTool,
  "apply-diff": applyDiffTool,
  "snapshot-project": snapshotProjectTool,
  "render-job": renderJobTool,
  "run-tests": runTestsTool,
  "build-web-app": buildWebAppTool,
};

const EXECUTABLE_TOOL_NAMES = Object.keys(
  EXECUTABLE_TOOLS
) as CodexForgeServerToolName[];

/* ================= HELPERS ================= */

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function normalizeToolName(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function buildExecutionMetadata(
  toolName: string,
  request: CodexForgeToolExecutionRequest
): NonNullable<CodexForgeToolResult["metadata"]> {
  return {
    sourceToolName: toolName,
    requestId: request.context?.requestId,
    projectName: request.context?.projectName,
    repoPath: request.context?.repoPath,
    cwd: request.context?.cwd,
  };
}

function buildExecutionJobId(
  toolName: string,
  startedAt: number,
  request: CodexForgeToolExecutionRequest
): string {
  const requestId =
    typeof request.context?.requestId === "string"
      ? request.context.requestId.trim()
      : "";

  return requestId || `${toolName || "tool"}-${startedAt}`;
}

function buildFailedJob(args: {
  id: string;
  startedAt: number;
  message: string;
  stage: string;
  metadata?: Record<string, unknown>;
}) {
  const completedAt = Date.now();

  return createToolJob({
    id: args.id,
    status: "failed",
    progress: 1,
    stage: args.stage,
    message: args.message,
    startedAt: args.startedAt,
    updatedAt: completedAt,
    completedAt,
    metadata: args.metadata,
  });
}

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
  const registeredToolNames = new Set(
    clientRegistry.tools.map((tool) => tool.name)
  );

  const clientBackedTools = clientRegistry.tools.map((tool) => {
    if (!executableNameSet.has(tool.name)) {
      return tool;
    }

    const executableTool =
      EXECUTABLE_TOOLS[tool.name as CodexForgeServerToolName];

    return buildServerToolDefinition(tool, executableTool);
  });

  const executableOnlyTools = EXECUTABLE_TOOL_NAMES.filter(
    (toolName) => !registeredToolNames.has(toolName)
  ).map((toolName) => {
    const executableTool = EXECUTABLE_TOOLS[toolName];
    assertExecutableToolShape(executableTool);
    return executableTool;
  });

  return [...clientBackedTools, ...executableOnlyTools];
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

function normalizeExecutionRequest(
  request: CodexForgeToolExecutionRequest
): CodexForgeToolExecutionRequest {
  return {
    toolName: normalizeToolName(request.toolName),
    input: isRecord(request.input) ? request.input : {},
    context: request.context ?? {},
  };
}

function createMissingToolResult(
  toolName: string,
  startedAt: number,
  request: CodexForgeToolExecutionRequest
): CodexForgeToolResult {
  const message = `No CodexForge tool named '${toolName}' is registered on the server.`;
  const metadata = buildExecutionMetadata(toolName, request);

  return createCodexForgeToolErrorResult({
    toolName,
    summary: `Tool '${toolName}' was not found.`,
    code: "TOOL_NOT_FOUND",
    message,
    retryable: false,
    startedAt,
    completedAt: Date.now(),
    job: buildFailedJob({
      id: buildExecutionJobId(toolName, startedAt, request),
      startedAt,
      message,
      stage: "resolve-tool",
      metadata,
    }),
    metadata,
  });
}

function createUnavailableToolResult(
  tool: CodexForgeToolDefinition,
  startedAt: number,
  request: CodexForgeToolExecutionRequest
): CodexForgeToolResult {
  const message =
    tool.availability === "ready"
      ? `${tool.label} is marked ready but no handler is bound on the server.`
      : `${tool.label} is currently '${tool.availability}' and cannot be executed.`;

  const metadata = buildExecutionMetadata(tool.name, request);

  return createCodexForgeToolErrorResult({
    toolName: tool.name,
    summary: `${tool.label} is not executable on the server.`,
    code: "TOOL_NOT_EXECUTABLE",
    message,
    retryable: false,
    startedAt,
    completedAt: Date.now(),
    job: buildFailedJob({
      id: buildExecutionJobId(tool.name, startedAt, request),
      startedAt,
      message,
      stage: "validate-tool",
      metadata,
    }),
    metadata,
  });
}

function createCrashedToolResult(
  toolName: string,
  error: unknown,
  startedAt: number,
  request: CodexForgeToolExecutionRequest
): CodexForgeToolResult {
  const message =
    error instanceof Error && error.message.trim().length > 0
      ? clampText(error.message, 400)
      : "An unexpected tool execution error occurred.";

  const metadata = buildExecutionMetadata(toolName, request);

  return createCodexForgeToolErrorResult({
    toolName,
    summary: `Tool '${toolName}' crashed during execution.`,
    code: "TOOL_EXECUTION_CRASHED",
    message,
    retryable: false,
    startedAt,
    completedAt: Date.now(),
    raw:
      error instanceof Error
        ? {
            name: error.name,
            message: error.message,
            stack: error.stack,
          }
        : error,
    job: buildFailedJob({
      id: buildExecutionJobId(toolName, startedAt, request),
      startedAt,
      message,
      stage: "execute-tool",
      metadata,
    }),
    metadata,
  });
}

function withExecutionMetadata(
  result: CodexForgeToolExecutionResponse,
  request: CodexForgeToolExecutionRequest,
  startedAt: number
): CodexForgeToolExecutionResponse {
  const toolName = normalizeToolName(result.toolName || request.toolName);
  const metadata = {
    ...buildExecutionMetadata(toolName, request),
    ...(result.metadata ?? {}),
  };

  const job =
    result.job ??
    createToolJob({
      id: buildExecutionJobId(toolName, startedAt, request),
      status: result.ok ? "completed" : "failed",
      progress: 1,
      stage: result.ok ? "completed" : "failed",
      message: result.summary,
      startedAt: result.startedAt,
      updatedAt: result.completedAt,
      completedAt: result.completedAt,
      metadata,
    });

  return {
    ...result,
    metadata,
    job,
  };
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
  const normalized = normalizeToolName(name);
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
    const message = "Tool execution requires a toolName.";
    const metadata = buildExecutionMetadata("unknown", normalized);

    return createCodexForgeToolErrorResult({
      toolName: "unknown",
      summary: "Missing tool name.",
      code: "MISSING_TOOL_NAME",
      message,
      retryable: false,
      startedAt,
      completedAt: Date.now(),
      job: buildFailedJob({
        id: buildExecutionJobId("unknown", startedAt, normalized),
        startedAt,
        message,
        stage: "validate-request",
        metadata,
      }),
      metadata,
    });
  }

  const tool = getCodexForgeServerToolByName(toolName);

  if (!tool) {
    return createMissingToolResult(toolName, startedAt, normalized);
  }

  if (!tool.handler) {
    return createUnavailableToolResult(tool, startedAt, normalized);
  }

  try {
    const result = await tool.handler(normalized.input, normalized.context ?? {});
    return withExecutionMetadata(result, normalized, startedAt);
  } catch (error) {
    return createCrashedToolResult(tool.name, error, startedAt, normalized);
  }
}

export function getCodexForgeServerReadyTools(): CodexForgeToolDefinition[] {
  return SERVER_TOOL_REGISTRY.tools.filter(
    (tool) => tool.availability === "ready"
  );
}

export function getCodexForgeServerStubTools(): CodexForgeToolDefinition[] {
  return SERVER_TOOL_REGISTRY.tools.filter(
    (tool) => tool.availability === "stub"
  );
}

export function getCodexForgeClientToolDescriptor(
  name: string
): CodexForgeToolDefinition | undefined {
  const normalized = normalizeToolName(name);
  if (!normalized) return undefined;
  return getClientToolByName(normalized as never);
}
export {
  getCodexForgeToolAdapter,
  getCodexForgeToolAdapterNames,
  listCodexForgeToolAdapters,
  requireCodexForgeToolAdapter,
};
