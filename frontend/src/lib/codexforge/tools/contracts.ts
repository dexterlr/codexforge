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

export type CodexForgeToolArtifactKind =
  | "image"
  | "video"
  | "audio"
  | "document"
  | "json"
  | "workflow"
  | "archive"
  | "text"
  | "other";

export type CodexForgeToolArtifact = {
  id: string;
  kind: CodexForgeToolArtifactKind;
  label: string;
  path?: string;
  url?: string;
  mimeType?: string;
  sizeBytes?: number;
  metadata?: Record<string, unknown>;
};

export type CodexForgeToolJobStatus =
  | "queued"
  | "running"
  | "completed"
  | "failed"
  | "cancelled";

export type CodexForgeToolJob = {
  id: string;
  status: CodexForgeToolJobStatus;
  progress?: number;
  stage?: string;
  message?: string;
  startedAt?: number;
  updatedAt?: number;
  completedAt?: number;
  metadata?: Record<string, unknown>;
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

  /**
   * Optional job metadata for tools that are:
   * - long-running
   * - staged
   * - queue-backed
   * - partially complete
   *
   * Existing synchronous tools can ignore this.
   */
  job?: CodexForgeToolJob;

  /**
   * Optional structured artifacts produced by a tool.
   *
   * Existing tools can continue to return only `content`.
   * Media, workflow, export, and document-oriented tools can attach
   * file-like outputs here without overloading `content`.
   */
  artifacts?: CodexForgeToolArtifact[];

  /**
   * Optional workflow linkage / orchestration metadata.
   *
   * Useful later for:
   * - parent/child tool calls
   * - run lineage
   * - multi-step creative pipelines
   * - cross-tool traceability
   */
  metadata?: {
    runId?: string;
    parentRunId?: string;
    traceId?: string;
    stepId?: string;
    sourceToolName?: string;
    [key: string]: unknown;
  };
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

function clampProgress(value: number | undefined): number | undefined {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return undefined;
  }

  if (value <= 0) return 0;
  if (value >= 1) return 1;
  return value;
}

function normalizeArtifacts(
  artifacts: CodexForgeToolArtifact[] | undefined
): CodexForgeToolArtifact[] | undefined {
  if (!Array.isArray(artifacts) || artifacts.length === 0) {
    return undefined;
  }

  return artifacts.map((artifact) => ({
    id: String(artifact.id ?? "").trim(),
    kind: artifact.kind,
    label: String(artifact.label ?? "").trim(),
    ...(typeof artifact.path === "string" && artifact.path.trim().length > 0
      ? { path: artifact.path.trim() }
      : {}),
    ...(typeof artifact.url === "string" && artifact.url.trim().length > 0
      ? { url: artifact.url.trim() }
      : {}),
    ...(typeof artifact.mimeType === "string" &&
    artifact.mimeType.trim().length > 0
      ? { mimeType: artifact.mimeType.trim() }
      : {}),
    ...(typeof artifact.sizeBytes === "number" &&
    Number.isFinite(artifact.sizeBytes) &&
    artifact.sizeBytes >= 0
      ? { sizeBytes: artifact.sizeBytes }
      : {}),
    ...(artifact.metadata ? { metadata: artifact.metadata } : {}),
  }));
}

function normalizeJob(job: CodexForgeToolJob | undefined): CodexForgeToolJob | undefined {
  if (!job) {
    return undefined;
  }

  return {
    id: String(job.id ?? "").trim(),
    status: job.status,
    ...(clampProgress(job.progress) !== undefined
      ? { progress: clampProgress(job.progress) }
      : {}),
    ...(typeof job.stage === "string" && job.stage.trim().length > 0
      ? { stage: job.stage.trim() }
      : {}),
    ...(typeof job.message === "string" && job.message.trim().length > 0
      ? { message: job.message.trim() }
      : {}),
    ...(typeof job.startedAt === "number" && Number.isFinite(job.startedAt)
      ? { startedAt: job.startedAt }
      : {}),
    ...(typeof job.updatedAt === "number" && Number.isFinite(job.updatedAt)
      ? { updatedAt: job.updatedAt }
      : {}),
    ...(typeof job.completedAt === "number" && Number.isFinite(job.completedAt)
      ? { completedAt: job.completedAt }
      : {}),
    ...(job.metadata ? { metadata: job.metadata } : {}),
  };
}

export function createCodexForgeToolResult(args: {
  toolName: string;
  summary: string;
  content?: CodexForgeToolResultContent;
  warnings?: CodexForgeToolWarning[];
  raw?: unknown;
  startedAt?: number;
  completedAt?: number;
  job?: CodexForgeToolJob;
  artifacts?: CodexForgeToolArtifact[];
  metadata?: CodexForgeToolResult["metadata"];
}): CodexForgeToolResult {
  const startedAt = args.startedAt ?? Date.now();
  const completedAt = args.completedAt ?? Date.now();
  const job = normalizeJob(args.job);
  const artifacts = normalizeArtifacts(args.artifacts);

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
    ...(job ? { job } : {}),
    ...(artifacts ? { artifacts } : {}),
    ...(args.metadata ? { metadata: args.metadata } : {}),
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
  job?: CodexForgeToolJob;
  artifacts?: CodexForgeToolArtifact[];
  metadata?: CodexForgeToolResult["metadata"];
}): CodexForgeToolResult {
  const startedAt = args.startedAt ?? Date.now();
  const completedAt = args.completedAt ?? Date.now();
  const job = normalizeJob(args.job);
  const artifacts = normalizeArtifacts(args.artifacts);

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
    ...(job ? { job } : {}),
    ...(artifacts ? { artifacts } : {}),
    ...(args.metadata ? { metadata: args.metadata } : {}),
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