import type {
  CodexForgeBrainRuntimeEvent,
  CodexForgeBrainRuntimeEventType,
} from "@/lib/codexforge/brain/runtime/runtime-types";
import type {
  CodexForgeAgentRuntimeHandoff,
  CodexForgeAgentRuntimeMessage,
  CodexForgeAgentRuntimeReview,
  CodexForgeAgentRuntimeRisk,
  CodexForgeAgentRuntimeRole,
} from "./agent-types";

export const CODEXFORGE_AGENT_RUNTIME_EVENT_TYPES = [
  "message.created",
  "task.updated",
  "concept.synthesized",
  "failure.detected",
  "recovery.detected",
] as const satisfies readonly CodexForgeBrainRuntimeEventType[];

function stableHash(input: string): string {
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16);
}

export function createAgentRuntimeMessage(input: {
  readonly role: CodexForgeAgentRuntimeRole;
  readonly type: CodexForgeAgentRuntimeMessage["type"];
  readonly content: string;
  readonly createdAt: number;
  readonly taskId?: string;
  readonly correlationId?: string;
  readonly eventType?: CodexForgeBrainRuntimeEventType;
  readonly confidence?: number;
  readonly risk?: CodexForgeAgentRuntimeRisk;
  readonly reasons?: readonly string[];
  readonly metadata?: Record<string, unknown>;
}): CodexForgeAgentRuntimeMessage {
  const seed = `${input.role}:${input.type}:${input.taskId ?? "none"}:${input.content}:${input.createdAt}`;
  return {
    id: `agent-message:${stableHash(seed)}`,
    role: input.role,
    type: input.type,
    createdAt: input.createdAt,
    taskId: input.taskId,
    correlationId: input.correlationId,
    content: input.content,
    eventType: input.eventType ?? "message.created",
    confidence: input.confidence ?? 0.72,
    risk: input.risk ?? "low",
    reasons: [...(input.reasons ?? [])].sort(),
    metadata: input.metadata,
  };
}

export function createAgentRuntimeHandoff(input: {
  readonly from: CodexForgeAgentRuntimeRole;
  readonly to: CodexForgeAgentRuntimeRole;
  readonly taskId: string;
  readonly reason: string;
  readonly risk: CodexForgeAgentRuntimeRisk;
}): CodexForgeAgentRuntimeHandoff {
  return {
    id: `agent-handoff:${stableHash(`${input.from}:${input.to}:${input.taskId}:${input.reason}`)}`,
    from: input.from,
    to: input.to,
    taskId: input.taskId,
    reason: input.reason,
    eventType: "task.updated",
    permission: input.risk === "high" || input.risk === "critical" ? "approval-required" : "read-only",
    risk: input.risk,
  };
}

export function createAgentRuntimeReviewEvent(
  review: CodexForgeAgentRuntimeReview,
  createdAt: number
): CodexForgeAgentRuntimeMessage {
  return createAgentRuntimeMessage({
    role: review.reviewer,
    type: "review",
    content: review.summary,
    createdAt,
    eventType: review.status === "blocked" ? "failure.detected" : "task.updated",
    confidence: review.confidence,
    risk: review.risk,
    reasons: review.reasons,
    metadata: {
      reviewId: review.id,
      status: review.status,
      recommendations: review.recommendations,
    },
  });
}

export function mapAgentRuntimeMessageToBrainEvent(
  message: CodexForgeAgentRuntimeMessage
): CodexForgeBrainRuntimeEvent {
  const base = {
    id: `event:${message.id}`,
    ts: message.createdAt,
    actor: "runtime" as const,
    source: {
      type: "agent-runtime",
      id: message.role,
      label: "CodexForge Agent Runtime",
    },
    correlationId: message.correlationId,
    metadata: {
      agentRole: message.role,
      agentMessageType: message.type,
      risk: message.risk,
      confidence: message.confidence,
      reasons: message.reasons,
      appendOnly: true,
      eventDriven: true,
    },
  };

  if (message.eventType === "failure.detected") {
    return {
      ...base,
      type: "failure.detected",
      payload: {
        failureId: message.id,
        taskId: message.taskId,
        message: message.content,
        severity: message.risk === "critical" ? "critical" : "high",
        recoverable: true,
      },
    };
  }

  if (message.eventType === "recovery.detected") {
    return {
      ...base,
      type: "recovery.detected",
      payload: {
        recoveryId: message.id,
        taskId: message.taskId,
        message: message.content,
        strategy: "approval-safe agent handoff",
      },
    };
  }

  if (message.eventType === "concept.synthesized") {
    return {
      ...base,
      type: "concept.synthesized",
      payload: {
        conceptId: message.id,
        label: message.content,
        summary: message.reasons.join("; "),
        confidence: message.confidence,
      },
    };
  }

  if (message.eventType === "task.updated") {
    return {
      ...base,
      type: "task.updated",
      payload: {
        taskId: message.taskId ?? message.id,
        status: message.risk === "critical" ? "blocked" : "active",
        summary: message.content,
        nextAction: message.reasons[0],
      },
    };
  }

  return {
    ...base,
    type: "message.created",
    payload: {
      messageId: message.id,
      role: "assistant",
      text: message.content,
      source: "system",
    },
  };
}
