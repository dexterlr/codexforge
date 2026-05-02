import { runCodexForgeEngine } from "@/lib/codexforge/chat/engine";
import type {
  CodexForgeChatContext,
  CodexForgeMessage,
  CodexForgePlanDomain,
  CodexForgeStructuredReply,
} from "@/lib/codexforge/types";

type FallbackExecutionRequest = {
  taskId?: string;
  taskGoal?: string;
  stepIndex?: number;
  stepText?: string;
  mode?: string;
};

type FallbackBuildContext = {
  executionRequest: FallbackExecutionRequest | null;
  isExecutionFallback: boolean;
  domain?: CodexForgePlanDomain;
  tags?: string[];
};

/* ================= NORMALIZATION ================= */

function asExecutionRequest(
  context: CodexForgeChatContext
): FallbackExecutionRequest | null {
  const candidate = context as CodexForgeChatContext & {
    executionRequest?: unknown;
  };

  if (
    !candidate.executionRequest ||
    typeof candidate.executionRequest !== "object" ||
    Array.isArray(candidate.executionRequest)
  ) {
    return null;
  }

  const record = candidate.executionRequest as Record<string, unknown>;

  return {
    taskId:
      typeof record.taskId === "string" && record.taskId.trim()
        ? record.taskId.trim()
        : undefined,
    taskGoal:
      typeof record.taskGoal === "string" && record.taskGoal.trim()
        ? record.taskGoal.trim()
        : undefined,
    stepIndex:
      typeof record.stepIndex === "number" && Number.isFinite(record.stepIndex)
        ? record.stepIndex
        : undefined,
    stepText:
      typeof record.stepText === "string" && record.stepText.trim()
        ? record.stepText.trim()
        : undefined,
    mode:
      typeof record.mode === "string" && record.mode.trim()
        ? record.mode.trim()
        : undefined,
  };
}

function cloneMessages(messages: CodexForgeMessage[]): CodexForgeMessage[] {
  return messages.map((message) => ({
    id: message.id,
    role: message.role,
    text: message.text,
    ts: message.ts,
    structured: message.structured ?? null,
    source: message.source,
  }));
}

function dedupeStrings(values: string[]): string[] {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function normalizeTags(
  structured: CodexForgeStructuredReply
): string[] | undefined {
  const tags = structured.tags ?? structured.plan?.tags;
  if (!tags || tags.length === 0) {
    return undefined;
  }

  const normalized = dedupeStrings(tags);
  return normalized.length > 0 ? normalized : undefined;
}

function normalizeDomain(
  structured: CodexForgeStructuredReply
): CodexForgePlanDomain | undefined {
  return structured.domain ?? structured.plan?.domain;
}

function isExecutionFallbackRequest(
  request: FallbackExecutionRequest | null
): boolean {
  return request?.mode === "execute-task-step";
}

function buildFallbackContext(
  structured: CodexForgeStructuredReply,
  request: FallbackExecutionRequest | null
): FallbackBuildContext {
  return {
    executionRequest: request,
    isExecutionFallback: isExecutionFallbackRequest(request),
    domain: normalizeDomain(structured),
    tags: normalizeTags(structured),
  };
}

/* ================= TEXT BUILDERS ================= */

function buildExecutionTextPrefix(
  request: FallbackExecutionRequest | null
): string {
  if (!isExecutionFallbackRequest(request)) {
    return "";
  }

  const stepNumber =
    typeof request?.stepIndex === "number" ? request.stepIndex + 1 : null;

  const lines: string[] = ["Execution fallback", ""];

  if (request?.taskGoal) {
    lines.push(`Task goal: ${request.taskGoal}`);
  }

  if (stepNumber !== null) {
    lines.push(`Step: ${stepNumber}`);
  }

  if (request?.stepText) {
    lines.push(`Step text: ${request.stepText}`);
  }

  lines.push("");
  return lines.join("\n");
}

function buildModeLine(ctx: FallbackBuildContext): string {
  return ctx.isExecutionFallback
    ? "Mode: LOCAL EXECUTION FALLBACK (UI-side task-step execution)"
    : "Mode: LOCAL ENGINE FALLBACK (UI-side engine fallback)";
}

function buildDomainLine(domain?: CodexForgePlanDomain): string {
  return domain ? `Domain: ${domain}` : "";
}

function buildTagsLine(tags?: string[]): string {
  return tags && tags.length > 0 ? `Tags: ${tags.join(", ")}` : "";
}

/* ================= STRUCTURED BUILDERS ================= */

function buildFallbackMode(ctx: FallbackBuildContext) {
  return ctx.isExecutionFallback
    ? "local-execution-fallback"
    : "local-fallback";
}

function buildFallbackTitle(
  structured: CodexForgeStructuredReply,
  ctx: FallbackBuildContext
): string {
  if (ctx.isExecutionFallback) {
    return structured.title ?? "CodexForge execution fallback";
  }

  return structured.title ?? "CodexForge local fallback";
}

function buildFallbackSummary(
  structured: CodexForgeStructuredReply,
  ctx: FallbackBuildContext
): string {
  if (ctx.isExecutionFallback) {
    return (
      structured.summary ??
      "CodexForge executed the requested task step through the local fallback engine."
    );
  }

  return (
    structured.summary ??
    "CodexForge responded through the local fallback engine because the backend route was unavailable."
  );
}

function buildFallbackStatus(
  structured: CodexForgeStructuredReply,
  ctx: FallbackBuildContext
): string[] {
  const base = [...(structured.status ?? [])];

  if (ctx.isExecutionFallback) {
    return dedupeStrings([
      ...base,
      "Execution handled by UI-side engine fallback.",
      "Backend route was unavailable or returned an error.",
      "Task step was processed locally for continuity.",
    ]);
  }

  return dedupeStrings([
    ...base,
    "Using UI-side engine fallback.",
    "Backend route was unavailable or returned an error.",
  ]);
}

function buildFallbackNextSteps(
  structured: CodexForgeStructuredReply,
  ctx: FallbackBuildContext
): string[] | undefined {
  const base = [...(structured.nextSteps ?? [])];

  if (!ctx.isExecutionFallback) {
    return base.length > 0 ? dedupeStrings(base) : undefined;
  }

  const merged = dedupeStrings([
    ...base,
    "Review the execution result.",
    "Update the task if the step changed scope.",
    "Run the next step when ready.",
  ]);

  return merged.length > 0 ? merged : undefined;
}

function buildFallbackExecution(
  structured: CodexForgeStructuredReply,
  ctx: FallbackBuildContext
): CodexForgeStructuredReply["execution"] {
  if (!ctx.isExecutionFallback) {
    return structured.execution;
  }

  const request = ctx.executionRequest;

  return {
    ...(typeof request?.stepIndex === "number"
      ? { stepIndex: request.stepIndex }
      : {}),
    ...(request?.stepText ? { stepText: request.stepText } : {}),
    resultSummary: "Step handled through UI-side fallback execution.",
    phase: "fallback",
  };
}

function buildFallbackStructured(
  structured: CodexForgeStructuredReply,
  ctx: FallbackBuildContext
): CodexForgeStructuredReply {
  return {
    ...structured,
    mode: buildFallbackMode(ctx),
    title: buildFallbackTitle(structured, ctx),
    summary: buildFallbackSummary(structured, ctx),
    status: buildFallbackStatus(structured, ctx),
    nextSteps: buildFallbackNextSteps(structured, ctx),
    ...(ctx.domain ? { domain: ctx.domain } : {}),
    ...(ctx.tags ? { tags: ctx.tags } : {}),
    execution: buildFallbackExecution(structured, ctx),
  };
}

/* ================= PUBLIC ================= */

export async function buildClientFallbackFromEngine(
  messages: CodexForgeMessage[],
  context: CodexForgeChatContext
): Promise<{ text: string; structured: CodexForgeStructuredReply }> {
  const engineMessages = cloneMessages(messages);
  const executionRequest = asExecutionRequest(context);
  const engine = await runCodexForgeEngine(engineMessages, context);

  const ctx = buildFallbackContext(engine.structured, executionRequest);
  const structured = buildFallbackStructured(engine.structured, ctx);

  const executionPrefix = buildExecutionTextPrefix(executionRequest);
  const modeLine = buildModeLine(ctx);
  const domainLine = buildDomainLine(ctx.domain);
  const tagsLine = buildTagsLine(ctx.tags);

  return {
    text: [executionPrefix, engine.text, "", modeLine, domainLine, tagsLine]
      .filter(Boolean)
      .join("\n"),
    structured,
  };
}