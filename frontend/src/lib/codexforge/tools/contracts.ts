export type CodexForgeToolAvailability = "unavailable" | "stub" | "ready";

export type CodexForgeToolDomain =
  | "core"
  | "repo"
  | "web"
  | "research"
  | "debug"
  | "automation"
  | "game-server"
  | "movie"
  | "video"
  | "comfyui"
  | "unreal"
  | "meeting"
  | "desktop"
  | "system"
  | "media";

export type CodexForgeToolCapability =
  | "read"
  | "write"
  | "search"
  | "execute"
  | "inspect"
  | "diff"
  | "snapshot"
  | "browser"
  | "speech"
  | "vision"
  | "video"
  | "audio"
  | "image"
  | "workflow"
  | "desktop-control"
  | "app-launch"
  | "memory";

export type CodexForgeToolSafetyLevel =
  | "safe"
  | "guarded"
  | "elevated"
  | "external";

export type CodexForgeToolParameterType =
  | "string"
  | "number"
  | "boolean"
  | "enum"
  | "string[]"
  | "number[]"
  | "object";

export type CodexForgeToolParameter = {
  name: string;
  type: CodexForgeToolParameterType;
  description: string;
  required: boolean;
  defaultValue?: unknown;
  enumValues?: string[];
};

export type CodexForgeToolExample = {
  title: string;
  input: Record<string, unknown>;
};

export type CodexForgeToolMetadata = {
  provider?: string;
  version?: string;
  docsUrl?: string;
  requiresApp?: string;
  requiresRuntime?: string;
  supportedPlatforms?: string[];
  tags?: string[];
};

export type CodexForgeToolExecutionContext = {
  requestId?: string;
  projectName?: string;
  workspaceRoot?: string;
  repoPath?: string;
  cwd?: string;
  userIntent?: string;
  allowExternal?: boolean;
  allowWrites?: boolean;
  allowDesktopControl?: boolean;
  timeoutMs?: number;
  signal?: AbortSignal;
  metadata?: Record<string, unknown>;
};

export type CodexForgeToolResultContent =
  | {
      type: "text";
      text: string;
    }
  | {
      type: "json";
      json: Record<string, unknown>;
    }
  | {
      type: "list";
      items: string[];
    }
  | {
      type: "table";
      columns: string[];
      rows: Array<Array<string | number | boolean | null>>;
    };

export type CodexForgeToolWarning = {
  code: string;
  message: string;
};

export type CodexForgeToolError = {
  code: string;
  message: string;
  retryable?: boolean;
  details?: Record<string, unknown>;
};

export type CodexForgeToolResult = {
  ok: boolean;
  toolName: string;
  summary: string;
  content?: CodexForgeToolResultContent;
  warnings?: CodexForgeToolWarning[];
  error?: CodexForgeToolError;
  startedAt: number;
  completedAt: number;
  durationMs: number;
  raw?: unknown;
};

export type CodexForgeToolHandler = (
  input: Record<string, unknown>,
  context: CodexForgeToolExecutionContext
) => Promise<CodexForgeToolResult> | CodexForgeToolResult;

export type CodexForgeToolDefinition = {
  name: string;
  label: string;
  description: string;
  availability: CodexForgeToolAvailability;
  domain: CodexForgeToolDomain;
  safety: CodexForgeToolSafetyLevel;
  capabilities: CodexForgeToolCapability[];
  tags: string[];
  parameters: CodexForgeToolParameter[];
  examples?: CodexForgeToolExample[];
  metadata?: CodexForgeToolMetadata;
  handler?: CodexForgeToolHandler;
};

export type CodexForgeToolRegistry = {
  version: string;
  tools: CodexForgeToolDefinition[];
  toolMap: Record<string, CodexForgeToolDefinition>;
};

export type CodexForgeToolExecutionRequest = {
  toolName: string;
  input: Record<string, unknown>;
  context?: CodexForgeToolExecutionContext;
};

export type CodexForgeToolExecutionResponse = CodexForgeToolResult;

export function createCodexForgeToolResult(args: {
  toolName: string;
  summary: string;
  content?: CodexForgeToolResultContent;
  warnings?: CodexForgeToolWarning[];
  raw?: unknown;
  startedAt?: number;
  completedAt?: number;
}): CodexForgeToolResult {
  const startedAt = args.startedAt ?? Date.now();
  const completedAt = args.completedAt ?? Date.now();

  return {
    ok: true,
    toolName: args.toolName,
    summary: args.summary,
    content: args.content,
    warnings: args.warnings,
    raw: args.raw,
    startedAt,
    completedAt,
    durationMs: Math.max(0, completedAt - startedAt),
  };
}

export function createCodexForgeToolErrorResult(args: {
  toolName: string;
  summary: string;
  code: string;
  message: string;
  retryable?: boolean;
  details?: Record<string, unknown>;
  warnings?: CodexForgeToolWarning[];
  raw?: unknown;
  startedAt?: number;
  completedAt?: number;
}): CodexForgeToolResult {
  const startedAt = args.startedAt ?? Date.now();
  const completedAt = args.completedAt ?? Date.now();

  return {
    ok: false,
    toolName: args.toolName,
    summary: args.summary,
    warnings: args.warnings,
    raw: args.raw,
    error: {
      code: args.code,
      message: args.message,
      retryable: args.retryable,
      details: args.details,
    },
    startedAt,
    completedAt,
    durationMs: Math.max(0, completedAt - startedAt),
  };
}

export function createCodexForgeToolRegistry(
  tools: CodexForgeToolDefinition[],
  version = "codexforge-tools-v1"
): CodexForgeToolRegistry {
  const toolMap: Record<string, CodexForgeToolDefinition> = {};

  for (const tool of tools) {
    toolMap[tool.name] = tool;
  }

  return {
    version,
    tools,
    toolMap,
  };
}