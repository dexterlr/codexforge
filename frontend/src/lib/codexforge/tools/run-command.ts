import { spawn } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";
import type {
  CodexForgeToolDefinition,
  CodexForgeToolExecutionContext,
  CodexForgeToolResult,
  CodexForgeToolWarning,
} from "./contracts";
import {
  asBoolean,
  asNumber,
  asOptionalString,
  buildStartedAt,
  clampText,
  finishToolError,
  finishToolSuccess,
  normalizeWindowsPath,
} from "./shared";

/* ================= CONSTANTS ================= */

const TOOL_NAME = "run-command";

const DEFAULT_TIMEOUT_MS = 60_000;
const MAX_TIMEOUT_MS = 10 * 60_000;

const DEFAULT_MAX_OUTPUT_CHARS = 80_000;
const MAX_MAX_OUTPUT_CHARS = 400_000;

const DEFAULT_MAX_COMMAND_LENGTH = 4000;
const DEFAULT_MAX_ENV_VARS = 24;
const DEFAULT_MAX_ENV_KEY_LENGTH = 120;
const DEFAULT_MAX_ENV_VALUE_LENGTH = 4000;

const BLOCKED_DIRS = new Set([
  ".git",
  "node_modules",
  ".next",
  "dist",
  "build",
  "out",
  "coverage",
  ".turbo",
  ".vercel",
]);

/* ================= TYPES ================= */

type RunCommandInput = {
  command?: string;
  cwd?: string;
  dryRun?: boolean;
  timeoutMs?: number;
  maxOutputChars?: number;
  shell?: boolean;
  env?: Record<string, unknown>;
};

type ResolvedScope = {
  requestedPath?: string;
  basePath: string;
  absolutePath: string;
  relativePath: string;
};

type CommandExecutionData = {
  stdout: string;
  stderr: string;
  combinedOutput: string;
  truncated: boolean;
  timedOut: boolean;
  exitCode: number | null;
  signal: NodeJS.Signals | null;
  durationMs: number;
};

type NormalizedEnvResult = {
  env: NodeJS.ProcessEnv;
  injectedKeys: string[];
  warnings: CodexForgeToolWarning[];
};

/* ================= HELPERS ================= */

function cleanInputPath(value: string): string {
  return value.trim().replaceAll("/", path.sep);
}

function isAbsolutePath(value: string): boolean {
  return path.isAbsolute(value);
}

function pickBasePath(context: CodexForgeToolExecutionContext): string {
  const repoPath = asOptionalString(context.repoPath);
  const cwd = asOptionalString(context.cwd);
  const workspaceRoot = asOptionalString(context.workspaceRoot);

  return repoPath ?? cwd ?? workspaceRoot ?? process.cwd();
}

function ensureInsideBase(targetPath: string, basePath: string): boolean {
  const normalizedTarget = path.resolve(targetPath);
  const normalizedBase = path.resolve(basePath);

  if (normalizedTarget === normalizedBase) {
    return true;
  }

  const relative = path.relative(normalizedBase, normalizedTarget);
  return relative !== "" && !relative.startsWith("..") && !path.isAbsolute(relative);
}

function hasBlockedPathSegment(relativePath: string): string | null {
  const segments = normalizeWindowsPath(relativePath)
    .split("\\")
    .map((segment) => segment.trim())
    .filter(Boolean);

  for (const segment of segments) {
    if (BLOCKED_DIRS.has(segment)) {
      return segment;
    }
  }

  return null;
}

function resolveScope(
  requestedPath: string | undefined,
  context: CodexForgeToolExecutionContext
): ResolvedScope {
  const basePath = path.resolve(pickBasePath(context));
  const cleaned = requestedPath ? cleanInputPath(requestedPath) : "";

  const absolutePath = cleaned
    ? isAbsolutePath(cleaned)
      ? path.resolve(cleaned)
      : path.resolve(basePath, cleaned)
    : basePath;

  if (!ensureInsideBase(absolutePath, basePath)) {
    throw new Error("Requested command cwd is outside the allowed workspace scope.");
  }

  const relativePath = normalizeWindowsPath(path.relative(basePath, absolutePath));
  const blockedSegment = hasBlockedPathSegment(relativePath);

  if (blockedSegment) {
    throw new Error(`Command execution inside '${blockedSegment}' is blocked.`);
  }

  return {
    requestedPath,
    basePath,
    absolutePath,
    relativePath,
  };
}

function clampNumber(
  value: number | undefined,
  fallback: number,
  min: number,
  max: number
): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return fallback;
  }

  return Math.min(Math.max(value, min), max);
}

function normalizeInput(input: Record<string, unknown>): RunCommandInput {
  return {
    command: asOptionalString(input.command),
    cwd: asOptionalString(input.cwd),
    dryRun: asBoolean(input.dryRun, false),
    timeoutMs: asNumber(input.timeoutMs),
    maxOutputChars: asNumber(input.maxOutputChars),
    shell: asBoolean(input.shell, true),
    env:
      input.env && typeof input.env === "object" && !Array.isArray(input.env)
        ? (input.env as Record<string, unknown>)
        : undefined,
  };
}

function clampOutput(value: string, maxChars: number): { text: string; truncated: boolean } {
  if (value.length <= maxChars) {
    return {
      text: value,
      truncated: false,
    };
  }

  return {
    text: `${value.slice(0, Math.max(0, maxChars - 5))}\n...`,
    truncated: true,
  };
}

function appendChunk(current: string, chunk: string, maxChars: number): string {
  if (!chunk) return current;
  if (current.length >= maxChars) return current;

  const remaining = maxChars - current.length;
  if (chunk.length <= remaining) {
    return current + chunk;
  }

  return current + chunk.slice(0, remaining);
}

function normalizeEnvKey(key: string): string {
  return key.trim();
}

function isSafeEnvKey(key: string): boolean {
  return /^[A-Za-z_][A-Za-z0-9_]*$/.test(key);
}

function normalizeEnvValue(value: unknown): string | null {
  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }

  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }

  return null;
}

function normalizeEnv(
  rawEnv: Record<string, unknown> | undefined
): NormalizedEnvResult {
  const warnings: CodexForgeToolWarning[] = [];
  const env: NodeJS.ProcessEnv = { ...process.env };
  const injectedKeys: string[] = [];

  if (!rawEnv) {
    return { env, injectedKeys, warnings };
  }

  const entries = Object.entries(rawEnv).slice(0, DEFAULT_MAX_ENV_VARS);

  if (Object.keys(rawEnv).length > entries.length) {
    warnings.push({
      code: "ENV_VAR_LIMIT_APPLIED",
      message: `Environment variables were limited to ${DEFAULT_MAX_ENV_VARS} entries.`,
    });
  }

  for (const [rawKey, rawValue] of entries) {
    const key = normalizeEnvKey(rawKey);

    if (!key || key.length > DEFAULT_MAX_ENV_KEY_LENGTH || !isSafeEnvKey(key)) {
      warnings.push({
        code: "ENV_KEY_SKIPPED",
        message: `Skipped invalid environment variable key '${clampText(rawKey, 80)}'.`,
      });
      continue;
    }

    const normalizedValue = normalizeEnvValue(rawValue);
    if (normalizedValue === null) {
      warnings.push({
        code: "ENV_VALUE_SKIPPED",
        message: `Skipped unsupported value for environment variable '${key}'.`,
      });
      continue;
    }

    if (normalizedValue.length > DEFAULT_MAX_ENV_VALUE_LENGTH) {
      warnings.push({
        code: "ENV_VALUE_CLAMPED",
        message: `Environment variable '${key}' was truncated to ${DEFAULT_MAX_ENV_VALUE_LENGTH} characters.`,
      });
    }

    env[key] = normalizedValue.slice(0, DEFAULT_MAX_ENV_VALUE_LENGTH);
    injectedKeys.push(key);
  }

  return {
    env,
    injectedKeys,
    warnings,
  };
}

async function ensureWorkingDirectoryExists(absolutePath: string): Promise<void> {
  const stat = await fs.stat(absolutePath).catch(() => null);

  if (!stat) {
    throw new Error("The requested working directory does not exist.");
  }

  if (!stat.isDirectory()) {
    throw new Error("The requested working directory is not a directory.");
  }
}

async function executeCommand(args: {
  command: string;
  cwd: string;
  shell: boolean;
  timeoutMs: number;
  maxOutputChars: number;
  env: NodeJS.ProcessEnv;
}): Promise<CommandExecutionData> {
  return await new Promise<CommandExecutionData>((resolve, reject) => {
    const startedAt = Date.now();

    let stdout = "";
    let stderr = "";
    let timedOut = false;
    let settled = false;

    const child = spawn(args.command, {
      cwd: args.cwd,
      env: args.env,
      shell: args.shell,
      windowsHide: true,
    });

    const timeoutId = setTimeout(() => {
      timedOut = true;
      try {
        child.kill("SIGTERM");
      } catch {
        // ignore
      }

      setTimeout(() => {
        try {
          if (!child.killed) {
            child.kill("SIGKILL");
          }
        } catch {
          // ignore
        }
      }, 1500);
    }, args.timeoutMs);

    child.stdout?.setEncoding("utf8");
    child.stderr?.setEncoding("utf8");

    child.stdout?.on("data", (chunk: string) => {
      stdout = appendChunk(stdout, chunk, args.maxOutputChars);
    });

    child.stderr?.on("data", (chunk: string) => {
      stderr = appendChunk(stderr, chunk, args.maxOutputChars);
    });

    child.on("error", (error) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);
      reject(error);
    });

    child.on("close", (exitCode, signal) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);

      const combinedRaw =
        stdout && stderr ? `${stdout}\n${stderr}` : stdout || stderr || "";

      const combinedClamp = clampOutput(combinedRaw, args.maxOutputChars);
      const stdoutClamp = clampOutput(stdout, args.maxOutputChars);
      const stderrClamp = clampOutput(stderr, args.maxOutputChars);

      resolve({
        stdout: stdoutClamp.text,
        stderr: stderrClamp.text,
        combinedOutput: combinedClamp.text,
        truncated:
          combinedClamp.truncated || stdoutClamp.truncated || stderrClamp.truncated,
        timedOut,
        exitCode,
        signal,
        durationMs: Math.max(0, Date.now() - startedAt),
      });
    });
  });
}

function buildSummary(args: {
  command: string;
  relativePath: string;
  absolutePath: string;
  dryRun: boolean;
  result?: CommandExecutionData;
}): string {
  const displayPath = args.relativePath || normalizeWindowsPath(args.absolutePath);
  const commandLabel = clampText(args.command, 120);

  if (args.dryRun) {
    return `Validated command for ${displayPath} • dry run • ${commandLabel}`;
  }

  if (!args.result) {
    return `Ran command in ${displayPath} • ${commandLabel}`;
  }

  const parts = [`Ran command in ${displayPath}`];

  if (args.result.timedOut) {
    parts.push("timed out");
  } else if (typeof args.result.exitCode === "number") {
    parts.push(`exit ${args.result.exitCode}`);
  } else if (args.result.signal) {
    parts.push(`signal ${args.result.signal}`);
  }

  parts.push(`${args.result.durationMs} ms`);

  return parts.join(" • ");
}

/* ================= TOOL ================= */

export const runCommandTool: CodexForgeToolDefinition = {
  name: "run-command",
  label: "Run Command",
  description:
    "Run a guarded shell command inside the workspace with cwd validation, timeout handling, output clamping, optional env injection, and dry-run support.",
  availability: "ready",
  domain: "core",
  safety: "elevated",
  capabilities: ["execute"],
  tags: [
    "command",
    "execution",
    "shell",
    "cli",
    "terminal",
    "workspace-guarded",
    "server-only",
  ],
  parameters: [
    {
      name: "command",
      type: "string",
      description: "Command line to execute.",
      required: true,
    },
    {
      name: "cwd",
      type: "string",
      description: "Optional working directory inside the workspace.",
      required: false,
    },
    {
      name: "dryRun",
      type: "boolean",
      description: "Whether to validate the command without running it.",
      required: false,
      defaultValue: false,
    },
    {
      name: "timeoutMs",
      type: "number",
      description: "Maximum execution time in milliseconds.",
      required: false,
      defaultValue: DEFAULT_TIMEOUT_MS,
    },
    {
      name: "maxOutputChars",
      type: "number",
      description: "Maximum stdout/stderr content retained.",
      required: false,
      defaultValue: DEFAULT_MAX_OUTPUT_CHARS,
    },
    {
      name: "shell",
      type: "boolean",
      description: "Whether to run the command through the system shell.",
      required: false,
      defaultValue: true,
    },
    {
      name: "env",
      type: "object",
      description: "Optional environment variables to inject.",
      required: false,
    },
  ],
  examples: [
    {
      title: "Build the project",
      input: {
        command: "npm run build",
      },
    },
    {
      title: "Run tests in a subfolder",
      input: {
        command: "npm test",
        cwd: "frontend",
        timeoutMs: 120000,
      },
    },
    {
      title: "Validate only",
      input: {
        command: "npm run lint",
        dryRun: true,
      },
    },
  ],
  metadata: {
    provider: "local",
    version: "codexforge-run-command-v1",
    supportedPlatforms: ["windows", "linux", "darwin"],
    tags: ["process", "workspace-guarded", "timeout", "dry-run"],
    requiresRuntime: "server",
  },
  handler: async (
    rawInput: Record<string, unknown>,
    context: CodexForgeToolExecutionContext
  ): Promise<CodexForgeToolResult> => {
    const startedAt = buildStartedAt();

    try {
      const input = normalizeInput(rawInput);

      if (!input.command) {
        return finishToolError({
          toolName: TOOL_NAME,
          summary: "Missing command.",
          code: "MISSING_COMMAND",
          message: "The run-command tool requires a command.",
          startedAt,
          retryable: false,
        });
      }

      if (input.command.length > DEFAULT_MAX_COMMAND_LENGTH) {
        return finishToolError({
          toolName: TOOL_NAME,
          summary: "Command too long.",
          code: "COMMAND_TOO_LONG",
          message: `Command exceeds maximum allowed length of ${DEFAULT_MAX_COMMAND_LENGTH} characters.`,
          startedAt,
          retryable: false,
        });
      }

      const resolved = resolveScope(input.cwd, context);
      await ensureWorkingDirectoryExists(resolved.absolutePath);

      const timeoutMs = clampNumber(
        input.timeoutMs ?? context.timeoutMs,
        DEFAULT_TIMEOUT_MS,
        100,
        MAX_TIMEOUT_MS
      );
      const maxOutputChars = clampNumber(
        input.maxOutputChars,
        DEFAULT_MAX_OUTPUT_CHARS,
        1000,
        MAX_MAX_OUTPUT_CHARS
      );
      const dryRun = input.dryRun === true;
      const shell = input.shell !== false;

      const envResult = normalizeEnv(input.env);
      const warnings: CodexForgeToolWarning[] = [...envResult.warnings];

      if (dryRun) {
        warnings.push({
          code: "DRY_RUN_ONLY",
          message: "Command was validated but not executed because dryRun is enabled.",
        });

        return finishToolSuccess({
          toolName: TOOL_NAME,
          summary: buildSummary({
            command: input.command,
            relativePath: resolved.relativePath,
            absolutePath: resolved.absolutePath,
            dryRun: true,
          }),
          startedAt,
          warnings,
          content: {
            type: "json",
            json: {
              command: input.command,
              cwd: {
                requestedPath: resolved.requestedPath ?? "",
                relativePath:
                  resolved.relativePath || normalizeWindowsPath(resolved.absolutePath),
                absolutePath: resolved.absolutePath,
              },
              dryRun: true,
              shell,
              timeoutMs,
              maxOutputChars,
              injectedEnvKeys: envResult.injectedKeys,
            },
          },
          raw: {
            command: input.command,
            cwd: resolved.absolutePath,
            dryRun: true,
          },
        });
      }

      const result = await executeCommand({
        command: input.command,
        cwd: resolved.absolutePath,
        shell,
        timeoutMs,
        maxOutputChars,
        env: envResult.env,
      });

      if (result.truncated) {
        warnings.push({
          code: "OUTPUT_TRUNCATED",
          message: `Command output was limited to ${maxOutputChars} characters.`,
        });
      }

      if (result.timedOut) {
        warnings.push({
          code: "COMMAND_TIMED_OUT",
          message: `Command exceeded timeout of ${timeoutMs} ms and was terminated.`,
        });
      }

      const ok = !result.timedOut && result.exitCode === 0;

      if (!ok) {
        return finishToolError({
          toolName: TOOL_NAME,
          summary: buildSummary({
            command: input.command,
            relativePath: resolved.relativePath,
            absolutePath: resolved.absolutePath,
            dryRun: false,
            result,
          }),
          code: result.timedOut ? "COMMAND_TIMEOUT" : "COMMAND_FAILED",
          message: result.timedOut
            ? `Command timed out after ${timeoutMs} ms.`
            : `Command exited with code ${result.exitCode ?? "unknown"}.`,
          startedAt,
          retryable: !result.timedOut,
          warnings,
          details: {
            command: input.command,
            cwd: resolved.absolutePath,
            exitCode: result.exitCode,
            signal: result.signal,
            durationMs: result.durationMs,
            stdout: result.stdout,
            stderr: result.stderr,
            injectedEnvKeys: envResult.injectedKeys,
          },
          raw: {
            command: input.command,
            cwd: resolved.absolutePath,
            exitCode: result.exitCode,
            signal: result.signal,
          },
        });
      }

      return finishToolSuccess({
        toolName: TOOL_NAME,
        summary: buildSummary({
          command: input.command,
          relativePath: resolved.relativePath,
          absolutePath: resolved.absolutePath,
          dryRun: false,
          result,
        }),
        startedAt,
        warnings: warnings.length > 0 ? warnings : undefined,
        content: {
          type: "json",
          json: {
            command: input.command,
            cwd: {
              requestedPath: resolved.requestedPath ?? "",
              relativePath:
                resolved.relativePath || normalizeWindowsPath(resolved.absolutePath),
              absolutePath: resolved.absolutePath,
            },
            dryRun: false,
            shell,
            timeoutMs,
            maxOutputChars,
            exitCode: result.exitCode,
            signal: result.signal,
            durationMs: result.durationMs,
            timedOut: result.timedOut,
            truncated: result.truncated,
            stdout: result.stdout,
            stderr: result.stderr,
            combinedOutput: result.combinedOutput,
            injectedEnvKeys: envResult.injectedKeys,
          },
        },
        raw: {
          command: input.command,
          cwd: resolved.absolutePath,
          exitCode: result.exitCode,
          signal: result.signal,
          durationMs: result.durationMs,
        },
      });
    } catch (error) {
      return finishToolError({
        toolName: TOOL_NAME,
        summary: "Failed to run command.",
        code: "RUN_COMMAND_FAILED",
        message:
          error instanceof Error && error.message.trim().length > 0
            ? clampText(error.message, 400)
            : "An unexpected error occurred while running the command.",
        startedAt,
        retryable: false,
      });
    }
  },
};