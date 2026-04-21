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

function buildExecutionTextPrefix(request: FallbackExecutionRequest | null) {
  if (!request || request.mode !== "execute-task-step") return "";

  const stepNumber =
    typeof request.stepIndex === "number" ? request.stepIndex + 1 : null;

  const lines: string[] = ["Execution fallback", ""];

  if (request.taskGoal) {
    lines.push(`Task goal: ${request.taskGoal}`);
  }

  if (stepNumber !== null) {
    lines.push(`Step: ${stepNumber}`);
  }

  if (request.stepText) {
    lines.push(`Step text: ${request.stepText}`);
  }

  lines.push("");
  return lines.join("\n");
}

function buildFallbackStatus(
  structured: CodexForgeStructuredReply,
  request: FallbackExecutionRequest | null
) {
  const base = [...(structured.status ?? [])];

  if (request?.mode === "execute-task-step") {
    return [
      ...base,
      "Execution handled by UI-side engine fallback.",
      "Backend route was unavailable or returned an error.",
      "Task step was processed locally for continuity.",
    ];
  }

  return [
    ...base,
    "Using UI-side engine fallback.",
    "Backend route was unavailable or returned an error.",
  ];
}

function buildFallbackSummary(
  structured: CodexForgeStructuredReply,
  request: FallbackExecutionRequest | null
) {
  if (request?.mode === "execute-task-step") {
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

function buildFallbackNextSteps(
  structured: CodexForgeStructuredReply,
  request: FallbackExecutionRequest | null
) {
  const base = [...(structured.nextSteps ?? [])];

  if (request?.mode === "execute-task-step") {
    return Array.from(
      new Set([
        ...base,
        "Review the execution result.",
        "Update the task if the step changed scope.",
        "Run the next step when ready.",
      ])
    );
  }

  return base;
}

function buildFallbackMode(request: FallbackExecutionRequest | null) {
  return request?.mode === "execute-task-step"
    ? "local-execution-fallback"
    : "local-fallback";
}

function resolveDomain(
  structured: CodexForgeStructuredReply
): CodexForgePlanDomain | undefined {
  return structured.domain ?? structured.plan?.domain;
}

function resolveTags(structured: CodexForgeStructuredReply): string[] | undefined {
  const tags = structured.tags ?? structured.plan?.tags;
  return tags && tags.length > 0 ? Array.from(new Set(tags)) : undefined;
}

function buildFallbackTitle(
  structured: CodexForgeStructuredReply,
  request: FallbackExecutionRequest | null
) {
  if (request?.mode === "execute-task-step") {
    return structured.title ?? "CodexForge execution fallback";
  }

  return structured.title ?? "CodexForge local fallback";
}

export async function buildClientFallbackFromEngine(
  messages: CodexForgeMessage[],
  context: CodexForgeChatContext
): Promise<{ text: string; structured: CodexForgeStructuredReply }> {
  const engineMessages = cloneMessages(messages);
  const executionRequest = asExecutionRequest(context);
  const engine = await runCodexForgeEngine(engineMessages, context);

  const domain = resolveDomain(engine.structured);
  const tags = resolveTags(engine.structured);

  const structured: CodexForgeStructuredReply = {
    ...engine.structured,
    mode: buildFallbackMode(executionRequest),
    title: buildFallbackTitle(engine.structured, executionRequest),
    summary: buildFallbackSummary(engine.structured, executionRequest),
    status: buildFallbackStatus(engine.structured, executionRequest),
    nextSteps: buildFallbackNextSteps(engine.structured, executionRequest),
    ...(domain ? { domain } : {}),
    ...(tags ? { tags } : {}),
    execution:
      executionRequest?.mode === "execute-task-step"
        ? {
            ...(typeof executionRequest.stepIndex === "number"
              ? { stepIndex: executionRequest.stepIndex }
              : {}),
            ...(executionRequest.stepText
              ? { stepText: executionRequest.stepText }
              : {}),
            resultSummary:
              "Step handled through UI-side fallback execution.",
            phase: "fallback",
          }
        : engine.structured.execution,
  };

  const executionPrefix = buildExecutionTextPrefix(executionRequest);
  const modeLine =
    executionRequest?.mode === "execute-task-step"
      ? "Mode: LOCAL EXECUTION FALLBACK (UI-side task-step execution)"
      : "Mode: LOCAL ENGINE FALLBACK (UI-side engine fallback)";

  const domainLine = domain ? `Domain: ${domain}` : "";
  const tagsLine = tags?.length ? `Tags: ${tags.join(", ")}` : "";

  return {
    text: [executionPrefix, engine.text, "", modeLine, domainLine, tagsLine]
      .filter(Boolean)
      .join("\n"),
    structured,
  };
}