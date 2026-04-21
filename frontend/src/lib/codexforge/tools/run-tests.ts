import type {
  CodexForgeToolDefinition,
  CodexForgeToolExecutionContext,
  CodexForgeToolResult,
  CodexForgeToolWarning,
} from "./contracts";
import { runCommandTool } from "./run-command";
import {
  asBoolean,
  asNumber,
  asOptionalString,
  asStringArray,
  buildStartedAt,
  clampText,
  finishToolError,
  finishToolSuccess,
} from "./shared";

/* ================= CONSTANTS ================= */

const TOOL_NAME = "run-tests";

const DEFAULT_TIMEOUT_MS = 120_000;
const DEFAULT_MAX_OUTPUT_CHARS = 100_000;
const DEFAULT_MAX_COMMANDS = 8;

/* ================= TYPES ================= */

type RunTestsMode = "first-success" | "all" | "single";

type RunTestsInput = {
  cwd?: string;
  command?: string;
  commands?: string[];
  includeBuild?: boolean;
  includeLint?: boolean;
  stopOnFailure?: boolean;
  dryRun?: boolean;
  timeoutMs?: number;
  maxOutputChars?: number;
  mode?: RunTestsMode;
  env?: Record<string, unknown>;
};

type ValidationCommandKind = "test" | "build" | "lint" | "custom";

type ValidationCommand = {
  command: string;
  label: string;
  kind: ValidationCommandKind;
};

type ValidationRunResult = {
  command: string;
  label: string;
  kind: ValidationCommandKind;
  ok: boolean;
  summary: string;
  exitCode: number | null;
  signal: string | null;
  durationMs: number;
  timedOut: boolean;
  truncated: boolean;
  stdout: string;
  stderr: string;
  combinedOutput: string;
};

type ValidationAggregate = {
  ok: boolean;
  attempted: number;
  succeeded: number;
  failed: number;
  timedOut: number;
  totalDurationMs: number;
  primaryStatus: "passed" | "failed" | "timed-out" | "dry-run";
};

/* ================= HELPERS ================= */

function normalizeMode(value: string | undefined): RunTestsMode {
  switch ((value ?? "").trim().toLowerCase()) {
    case "all":
      return "all";
    case "single":
      return "single";
    case "first-success":
    default:
      return "first-success";
  }
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

function uniqueCommands(values: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const value of values) {
    const normalized = value.trim();
    if (!normalized) continue;

    const key = normalized.toLowerCase();
    if (seen.has(key)) continue;

    seen.add(key);
    result.push(normalized);
  }

  return result;
}

function classifyCommand(command: string): ValidationCommandKind {
  const query = command.toLowerCase();

  if (query.includes("lint")) return "lint";
  if (query.includes("build")) return "build";
  if (query.includes("test")) return "test";

  return "custom";
}

function buildCommandLabel(command: string, kind: ValidationCommandKind): string {
  switch (kind) {
    case "test":
      return `Test • ${command}`;
    case "build":
      return `Build • ${command}`;
    case "lint":
      return `Lint • ${command}`;
    case "custom":
    default:
      return `Command • ${command}`;
  }
}

function normalizeInput(input: Record<string, unknown>): RunTestsInput {
  return {
    cwd: asOptionalString(input.cwd),
    command: asOptionalString(input.command),
    commands: asStringArray(input.commands),
    includeBuild: asBoolean(input.includeBuild, true),
    includeLint: asBoolean(input.includeLint, false),
    stopOnFailure: asBoolean(input.stopOnFailure, true),
    dryRun: asBoolean(input.dryRun, false),
    timeoutMs: asNumber(input.timeoutMs),
    maxOutputChars: asNumber(input.maxOutputChars),
    mode: normalizeMode(asOptionalString(input.mode)),
    env:
      input.env && typeof input.env === "object" && !Array.isArray(input.env)
        ? (input.env as Record<string, unknown>)
        : undefined,
  };
}

function buildDefaultCommands(input: RunTestsInput): string[] {
  const commands: string[] = [
    "npm run test",
    "npm test",
    "pnpm test",
    "yarn test",
    "bun test",
  ];

  if (input.includeBuild !== false) {
    commands.push("npm run build", "pnpm build", "yarn build", "bun run build");
  }

  if (input.includeLint === true) {
    commands.push("npm run lint", "pnpm lint", "yarn lint", "bun run lint");
  }

  return uniqueCommands(commands);
}

function buildValidationPlan(input: RunTestsInput): ValidationCommand[] {
  const explicitCommands = uniqueCommands([
    ...(input.command ? [input.command] : []),
    ...(input.commands ?? []),
  ]);

  const sourceCommands =
    explicitCommands.length > 0 ? explicitCommands : buildDefaultCommands(input);

  return sourceCommands.slice(0, DEFAULT_MAX_COMMANDS).map((command) => {
    const kind = classifyCommand(command);

    return {
      command,
      kind,
      label: buildCommandLabel(command, kind),
    };
  });
}

function buildWarnings(args: {
  plan: ValidationCommand[];
  explicitCommandCount: number;
  input: RunTestsInput;
}): CodexForgeToolWarning[] {
  const warnings: CodexForgeToolWarning[] = [];

  if (args.plan.length === 0) {
    warnings.push({
      code: "NO_VALIDATION_COMMANDS",
      message: "No validation commands were available to run.",
    });
  }

  if (args.explicitCommandCount === 0) {
    warnings.push({
      code: "USING_FALLBACK_COMMANDS",
      message: "No explicit commands were provided, so default validation commands were used.",
    });
  }

  if (args.input.includeBuild === true) {
    warnings.push({
      code: "BUILD_INCLUDED",
      message: "Build validation is included in this run.",
    });
  }

  if (args.input.includeLint === true) {
    warnings.push({
      code: "LINT_INCLUDED",
      message: "Lint validation is included in this run.",
    });
  }

  return warnings;
}

function getRunCommandHandler() {
  if (!runCommandTool.handler) {
    throw new Error("run-command tool handler is not available.");
  }

  return runCommandTool.handler;
}

async function runValidationCommand(args: {
  planItem: ValidationCommand;
  input: RunTestsInput;
  context: CodexForgeToolExecutionContext;
  timeoutMs: number;
  maxOutputChars: number;
}): Promise<ValidationRunResult> {
  const runCommand = getRunCommandHandler();

  const toolResult = await runCommand(
    {
      command: args.planItem.command,
      cwd: args.input.cwd,
      dryRun: args.input.dryRun,
      timeoutMs: args.timeoutMs,
      maxOutputChars: args.maxOutputChars,
      shell: true,
      env: args.input.env,
    },
    args.context
  );

  const rawRecord =
    toolResult.raw && typeof toolResult.raw === "object" && !Array.isArray(toolResult.raw)
      ? (toolResult.raw as Record<string, unknown>)
      : {};

  const detailsRecord =
    toolResult.error?.details &&
    typeof toolResult.error.details === "object" &&
    !Array.isArray(toolResult.error.details)
      ? toolResult.error.details
      : {};

  const stdout =
    typeof rawRecord["stdout"] === "string"
      ? rawRecord["stdout"]
      : typeof detailsRecord["stdout"] === "string"
        ? detailsRecord["stdout"]
        : toolResult.content?.type === "json" &&
            typeof toolResult.content.json["stdout"] === "string"
          ? (toolResult.content.json["stdout"] as string)
          : "";

  const stderr =
    typeof rawRecord["stderr"] === "string"
      ? rawRecord["stderr"]
      : typeof detailsRecord["stderr"] === "string"
        ? detailsRecord["stderr"]
        : toolResult.content?.type === "json" &&
            typeof toolResult.content.json["stderr"] === "string"
          ? (toolResult.content.json["stderr"] as string)
          : "";

  const combinedOutput =
    typeof rawRecord["combinedOutput"] === "string"
      ? rawRecord["combinedOutput"]
      : toolResult.content?.type === "json" &&
          typeof toolResult.content.json["combinedOutput"] === "string"
        ? (toolResult.content.json["combinedOutput"] as string)
        : [stdout, stderr].filter(Boolean).join("\n");

  const exitCode =
    typeof rawRecord["exitCode"] === "number"
      ? rawRecord["exitCode"]
      : typeof detailsRecord["exitCode"] === "number"
        ? detailsRecord["exitCode"]
        : toolResult.content?.type === "json" &&
            typeof toolResult.content.json["exitCode"] === "number"
          ? (toolResult.content.json["exitCode"] as number)
          : toolResult.ok
            ? 0
            : null;

  const signal =
    typeof rawRecord["signal"] === "string"
      ? rawRecord["signal"]
      : typeof detailsRecord["signal"] === "string"
        ? detailsRecord["signal"]
        : toolResult.content?.type === "json" &&
            typeof toolResult.content.json["signal"] === "string"
          ? (toolResult.content.json["signal"] as string)
          : null;

  const timedOut =
    toolResult.warnings?.some((warning) => warning.code === "COMMAND_TIMED_OUT") === true ||
    toolResult.error?.code === "COMMAND_TIMEOUT";

  const truncated =
    toolResult.warnings?.some((warning) => warning.code === "OUTPUT_TRUNCATED") === true;

  return {
    command: args.planItem.command,
    label: args.planItem.label,
    kind: args.planItem.kind,
    ok: toolResult.ok,
    summary: toolResult.summary,
    exitCode,
    signal,
    durationMs: toolResult.durationMs,
    timedOut,
    truncated,
    stdout,
    stderr,
    combinedOutput,
  };
}

function buildAggregate(results: ValidationRunResult[], dryRun: boolean): ValidationAggregate {
  const attempted = results.length;
  const succeeded = results.filter((result) => result.ok).length;
  const failed = results.filter((result) => !result.ok).length;
  const timedOut = results.filter((result) => result.timedOut).length;
  const totalDurationMs = results.reduce(
    (sum, result) => sum + result.durationMs,
    0
  );

  let primaryStatus: ValidationAggregate["primaryStatus"] = "passed";

  if (dryRun) {
    primaryStatus = "dry-run";
  } else if (timedOut > 0) {
    primaryStatus = "timed-out";
  } else if (failed > 0) {
    primaryStatus = "failed";
  }

  return {
    ok: dryRun ? true : failed === 0,
    attempted,
    succeeded,
    failed,
    timedOut,
    totalDurationMs,
    primaryStatus,
  };
}

function buildSummary(aggregate: ValidationAggregate, results: ValidationRunResult[]): string {
  if (aggregate.primaryStatus === "dry-run") {
    return `Validated ${aggregate.attempted} command${aggregate.attempted === 1 ? "" : "s"} • dry run`;
  }

  if (aggregate.primaryStatus === "passed") {
    return `Validation passed • ${aggregate.succeeded}/${aggregate.attempted} command${aggregate.attempted === 1 ? "" : "s"} succeeded • ${aggregate.totalDurationMs} ms`;
  }

  if (aggregate.primaryStatus === "timed-out") {
    return `Validation timed out • ${aggregate.timedOut} command${aggregate.timedOut === 1 ? "" : "s"} exceeded timeout • ${aggregate.totalDurationMs} ms`;
  }

  const firstFailure = results.find((result) => !result.ok);
  return `Validation failed • ${aggregate.failed} command${aggregate.failed === 1 ? "" : "s"} failed${firstFailure ? ` • ${clampText(firstFailure.command, 100)}` : ""}`;
}

/* ================= TOOL ================= */

export const runTestsTool: CodexForgeToolDefinition = {
  name: "run-tests",
  label: "Run Tests",
  description:
    "Run structured validation commands such as tests, builds, and linting through the guarded command runner with aggregated results for CodexForge workflows.",
  availability: "ready",
  domain: "repo",
  safety: "guarded",
  capabilities: ["execute", "inspect"],
  tags: [
    "test",
    "validation",
    "build",
    "lint",
    "verification",
    "workspace-guarded",
    "server-only",
  ],
  parameters: [
    {
      name: "command",
      type: "string",
      description: "Optional single validation command to run.",
      required: false,
    },
    {
      name: "commands",
      type: "string[]",
      description: "Optional ordered list of validation commands to run.",
      required: false,
    },
    {
      name: "cwd",
      type: "string",
      description: "Optional working directory for validation commands.",
      required: false,
    },
    {
      name: "includeBuild",
      type: "boolean",
      description: "Whether build commands should be included in default validation.",
      required: false,
      defaultValue: true,
    },
    {
      name: "includeLint",
      type: "boolean",
      description: "Whether lint commands should be included in default validation.",
      required: false,
      defaultValue: false,
    },
    {
      name: "stopOnFailure",
      type: "boolean",
      description: "Whether to stop after the first failed command.",
      required: false,
      defaultValue: true,
    },
    {
      name: "dryRun",
      type: "boolean",
      description: "Whether to validate the execution plan without running commands.",
      required: false,
      defaultValue: false,
    },
    {
      name: "timeoutMs",
      type: "number",
      description: "Timeout per command in milliseconds.",
      required: false,
      defaultValue: DEFAULT_TIMEOUT_MS,
    },
    {
      name: "maxOutputChars",
      type: "number",
      description: "Maximum output retained per command.",
      required: false,
      defaultValue: DEFAULT_MAX_OUTPUT_CHARS,
    },
    {
      name: "mode",
      type: "enum",
      description: "Validation execution mode.",
      required: false,
      enumValues: ["first-success", "all", "single"],
      defaultValue: "first-success",
    },
    {
      name: "env",
      type: "object",
      description: "Optional environment variables passed to the command runner.",
      required: false,
    },
  ],
  examples: [
    {
      title: "Run default validation",
      input: {},
    },
    {
      title: "Run a single build command",
      input: {
        command: "npm run build",
        mode: "single",
      },
    },
    {
      title: "Run tests and lint",
      input: {
        commands: ["npm test", "npm run lint"],
        mode: "all",
        stopOnFailure: false,
      },
    },
  ],
  metadata: {
    provider: "local",
    version: "codexforge-run-tests-v1",
    supportedPlatforms: ["windows", "linux", "darwin"],
    tags: ["validation", "structured-results", "command-wrapper", "server-only"],
    requiresRuntime: "server",
  },
  handler: async (
    rawInput: Record<string, unknown>,
    context: CodexForgeToolExecutionContext
  ): Promise<CodexForgeToolResult> => {
    const startedAt = buildStartedAt();

    try {
      const input = normalizeInput(rawInput);
      const mode = input.mode ?? "first-success";
      const timeoutMs = clampNumber(input.timeoutMs, DEFAULT_TIMEOUT_MS, 100, 10 * 60_000);
      const maxOutputChars = clampNumber(
        input.maxOutputChars,
        DEFAULT_MAX_OUTPUT_CHARS,
        1000,
        400_000
      );

      const explicitCommandCount = [
        ...(input.command ? [input.command] : []),
        ...(input.commands ?? []),
      ].filter(Boolean).length;

      let plan = buildValidationPlan(input);

      if (mode === "single" && plan.length > 1) {
        plan = plan.slice(0, 1);
      }

      if (plan.length === 0) {
        return finishToolError({
          toolName: TOOL_NAME,
          summary: "No validation commands available.",
          code: "NO_COMMANDS",
          message: "No validation commands were available to run.",
          startedAt,
          retryable: false,
        });
      }

      const warnings = buildWarnings({
        plan,
        explicitCommandCount,
        input,
      });

      const results: ValidationRunResult[] = [];

      for (const planItem of plan) {
        const result = await runValidationCommand({
          planItem,
          input,
          context,
          timeoutMs,
          maxOutputChars,
        });

        results.push(result);

        if (input.dryRun === true) {
          if (mode === "single") {
            break;
          }
          continue;
        }

        if (mode === "first-success" && result.ok) {
          break;
        }

        if (input.stopOnFailure !== false && !result.ok) {
          break;
        }
      }

      const aggregate = buildAggregate(results, input.dryRun === true);
      const summary = buildSummary(aggregate, results);

      const json = {
        mode,
        dryRun: input.dryRun === true,
        stopOnFailure: input.stopOnFailure !== false,
        timeoutMs,
        maxOutputChars,
        aggregate: {
          ok: aggregate.ok,
          attempted: aggregate.attempted,
          succeeded: aggregate.succeeded,
          failed: aggregate.failed,
          timedOut: aggregate.timedOut,
          totalDurationMs: aggregate.totalDurationMs,
          primaryStatus: aggregate.primaryStatus,
        },
        plannedCommands: plan.map((item) => ({
          command: item.command,
          label: item.label,
          kind: item.kind,
        })),
        results: results.map((result) => ({
          command: result.command,
          label: result.label,
          kind: result.kind,
          ok: result.ok,
          summary: result.summary,
          exitCode: result.exitCode,
          signal: result.signal,
          durationMs: result.durationMs,
          timedOut: result.timedOut,
          truncated: result.truncated,
          stdout: result.stdout,
          stderr: result.stderr,
          combinedOutput: result.combinedOutput,
        })),
      };

      if (!aggregate.ok && input.dryRun !== true) {
        return finishToolError({
          toolName: TOOL_NAME,
          summary,
          code:
            aggregate.primaryStatus === "timed-out"
              ? "VALIDATION_TIMEOUT"
              : "VALIDATION_FAILED",
          message:
            aggregate.primaryStatus === "timed-out"
              ? "One or more validation commands timed out."
              : "One or more validation commands failed.",
          startedAt,
          retryable: aggregate.primaryStatus !== "timed-out",
          warnings,
          details: json,
          raw: json,
        });
      }

      return finishToolSuccess({
        toolName: TOOL_NAME,
        summary,
        startedAt,
        warnings: warnings.length > 0 ? warnings : undefined,
        content: {
          type: "json",
          json,
        },
        raw: json,
      });
    } catch (error) {
      return finishToolError({
        toolName: TOOL_NAME,
        summary: "Failed to run tests.",
        code: "RUN_TESTS_FAILED",
        message:
          error instanceof Error && error.message.trim().length > 0
            ? clampText(error.message, 400)
            : "An unexpected error occurred while running validation.",
        startedAt,
        retryable: false,
      });
    }
  },
};