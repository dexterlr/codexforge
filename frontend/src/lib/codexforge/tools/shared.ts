import type {
  CodexForgeToolDefinition,
  CodexForgeToolExecutionContext,
  CodexForgeToolResult,
} from "./contracts";
import {
  createCodexForgeToolErrorResult,
  createCodexForgeToolResult,
} from "./contracts";

export const CODEXFORGE_TOOL_REGISTRY_VERSION = "codexforge-tools-v1";

export function now(): number {
  return Date.now();
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function asOptionalString(value: unknown): string | undefined {
  const normalized = asString(value);
  return normalized.length > 0 ? normalized : undefined;
}

export function asBoolean(value: unknown, fallback = false): boolean {
  return typeof value === "boolean" ? value : fallback;
}

export function asNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

export function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function dedupeStrings(values: string[]): string[] {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

export function clampText(text: string, max = 240): string {
  return text.length <= max ? text : `${text.slice(0, max - 1)}…`;
}

export function normalizeWindowsPath(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";

  return trimmed
    .replaceAll("/", "\\")
    .replace(/\\+/g, "\\")
    .replace(/\\$/, "");
}

export function buildStartedAt(): number {
  return Date.now();
}

export function finishToolSuccess(args: {
  toolName: string;
  summary: string;
  startedAt: number;
  content?: CodexForgeToolResult["content"];
  warnings?: CodexForgeToolResult["warnings"];
  raw?: unknown;
}): CodexForgeToolResult {
  return createCodexForgeToolResult({
    toolName: args.toolName,
    summary: args.summary,
    content: args.content,
    warnings: args.warnings,
    raw: args.raw,
    startedAt: args.startedAt,
    completedAt: Date.now(),
  });
}

export function finishToolError(args: {
  toolName: string;
  summary: string;
  code: string;
  message: string;
  startedAt: number;
  retryable?: boolean;
  details?: Record<string, unknown>;
  warnings?: CodexForgeToolResult["warnings"];
  raw?: unknown;
}): CodexForgeToolResult {
  return createCodexForgeToolErrorResult({
    toolName: args.toolName,
    summary: args.summary,
    code: args.code,
    message: args.message,
    retryable: args.retryable,
    details: args.details,
    warnings: args.warnings,
    raw: args.raw,
    startedAt: args.startedAt,
    completedAt: Date.now(),
  });
}

export function createStubTool(args: {
  name: string;
  label: string;
  description: string;
  domain: CodexForgeToolDefinition["domain"];
  safety: CodexForgeToolDefinition["safety"];
  capabilities: CodexForgeToolDefinition["capabilities"];
  tags: string[];
  parameters?: CodexForgeToolDefinition["parameters"];
  examples?: CodexForgeToolDefinition["examples"];
  metadata?: CodexForgeToolDefinition["metadata"];
}): CodexForgeToolDefinition {
  return {
    name: args.name,
    label: args.label,
    description: args.description,
    availability: "stub",
    domain: args.domain,
    safety: args.safety,
    capabilities: args.capabilities,
    tags: args.tags,
    parameters: args.parameters ?? [],
    examples: args.examples,
    metadata: args.metadata,
    handler: (input: Record<string, unknown>, context: CodexForgeToolExecutionContext) => {
      const startedAt = buildStartedAt();

      return finishToolError({
        toolName: args.name,
        summary: `${args.label} is not implemented yet.`,
        code: "TOOL_NOT_IMPLEMENTED",
        message: `${args.label} exists in the registry but does not have a live implementation yet.`,
        startedAt,
        retryable: false,
        details: {
          input,
          context: {
            requestId: context.requestId,
            projectName: context.projectName,
            repoPath: context.repoPath,
          },
        },
      });
    },
  };
}