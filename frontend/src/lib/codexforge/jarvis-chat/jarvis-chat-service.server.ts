import "server-only";

import { hashJarvisChatCanonicalJson, hashJarvisChatSha256, makeJarvisChatHexId } from "./jarvis-chat-crypto";
import { buildJarvisChatProviderEnvelope } from "./jarvis-chat-envelope.server";
import {
  buildJarvisChatConversationResponseDigest,
  createJarvisChatPersistence,
  sealJarvisChatConversation,
  type JarvisChatPersistence,
} from "./jarvis-chat-persistence.server";
import {
  buildJarvisChatIdempotencyKeyHash,
} from "./jarvis-chat-crypto";
import { containsPrivateAlphaSecretLikeContent } from "@/lib/codexforge/private-alpha";
import {
  JARVIS_CHAT_MAX_ASSISTANT_MESSAGE_BYTES,
  JARVIS_CHAT_MAX_ASSISTANT_MESSAGE_CHARACTERS,
  JARVIS_CHAT_MAX_AUDIT_EVENTS,
  JARVIS_CHAT_MAX_CONVERSATIONS,
  JARVIS_CHAT_MAX_IDEMPOTENCY_RECORDS,
  JARVIS_CHAT_MAX_TITLE_CHARACTERS,
  JARVIS_CHAT_MAX_TURNS,
  JarvisChatPolicyError,
  normalizeJarvisChatUserMessage,
  validateJarvisChatActionInput,
  validateJarvisChatCreateInput,
  validateJarvisChatIdempotencyKey,
} from "./jarvis-chat-policy";
import {
  createJarvisChatLifecycleAdapter,
  type JarvisChatLifecycleAdapter,
  type JarvisChatLifecycleExecutionResult,
} from "./jarvis-chat-private-alpha-adapter.server";
import {
  JARVIS_CHAT_RECORD_VERSION,
  type JarvisChatActionInput,
  type JarvisChatActionResult,
  type JarvisChatAuditEvent,
  type JarvisChatConversation,
  type JarvisChatConversationState,
  type JarvisChatConversationSummary,
  type JarvisChatDeletionResult,
  type JarvisChatDeletionTombstone,
  type JarvisChatIdempotencyRecord,
  type JarvisChatMessage,
  type JarvisChatMutationAction,
  type JarvisChatMutationResult,
  type JarvisChatPendingOperation,
  type JarvisChatRunBinding,
  type JarvisChatRuntimeStatus,
  type JarvisChatTurn,
  type JarvisChatTurnState,
} from "./jarvis-chat-types";

export type JarvisChatService = Readonly<{
  createConversation: (body: unknown, idempotencyKey: unknown) => Promise<JarvisChatMutationResult>;
  listConversations: (limit?: number) => Promise<readonly JarvisChatConversationSummary[]>;
  getConversation: (conversationId: string) => Promise<JarvisChatConversation>;
  getRuntimeStatus: () => Promise<JarvisChatRuntimeStatus>;
  actOnConversation: (
    conversationId: string,
    body: unknown,
    idempotencyKey: unknown
  ) => Promise<JarvisChatActionResult>;
}>;

type ServiceOptions = Readonly<{
  persistence?: JarvisChatPersistence;
  lifecycle?: JarvisChatLifecycleAdapter;
  now?: () => number;
}>;

const ACTION_BY_INPUT: Readonly<Record<JarvisChatActionInput["action"], JarvisChatMutationAction>> = {
  "append-turn": "append_turn",
  "approve-turn": "approve_turn",
  "execute-turn": "execute_turn",
  "cancel-turn": "cancel_turn",
  "stop-turn": "stop_turn",
  "recover-turn": "recover_turn",
  "rename-conversation": "rename_conversation",
  "delete-conversation": "delete_conversation",
};

const APPENDABLE_STATES = new Set<JarvisChatConversationState>([
  "ready",
  "stopped",
  "rejected",
  "failed",
  "canceled",
]);

function nextTimestamp(previous: string | null, now: () => number): string {
  const prior = previous ? Date.parse(previous) : 0;
  return new Date(Math.max(now(), Number.isFinite(prior) ? prior + 1 : 0)).toISOString();
}

function titleFromMessage(message: string): string {
  const firstLine = message.split("\n", 1)[0]?.replace(/\s+/gu, " ").trim() ?? "";
  let title = "";
  for (const codePoint of firstLine || "New Jarvis chat") {
    if (title.length + codePoint.length > JARVIS_CHAT_MAX_TITLE_CHARACTERS) break;
    title += codePoint;
  }
  return title;
}

function message(role: "user" | "assistant", text: string, createdAt: string): JarvisChatMessage {
  return {
    messageId: makeJarvisChatHexId(12),
    role,
    text,
    textDigest: hashJarvisChatSha256(text),
    createdAt,
  };
}

function audit(
  conversation: Pick<JarvisChatConversation, "auditEvents" | "currentTurnId">,
  input: {
    eventType: JarvisChatAuditEvent["eventType"];
    actor: JarvisChatAuditEvent["actor"];
    resultingState: JarvisChatConversationState;
    timestamp: string;
    summary: string;
    sourceRunId?: string | null;
    turnId?: string;
  }
): JarvisChatAuditEvent {
  return {
    auditId: makeJarvisChatHexId(12),
    eventType: input.eventType,
    actor: input.actor,
    turnId: input.turnId ?? conversation.currentTurnId,
    previousState: conversation.auditEvents.at(-1)?.resultingState ?? null,
    resultingState: input.resultingState,
    timestamp: input.timestamp,
    summary: input.summary.slice(0, 240),
    sourceRunId: input.sourceRunId ?? null,
  };
}

function pendingOperation(
  action: JarvisChatPendingOperation["action"],
  keyHash: string,
  requestDigest: string,
  revision: number,
  startedAt: string,
  cancellationReason: string | null = null
): JarvisChatPendingOperation {
  return {
    operationId: makeJarvisChatHexId(16),
    action,
    keyHash,
    requestDigest,
    cancellationReason,
    startedRevision: revision,
    startedAt,
  };
}

function deletionAuditId(operationId: string): string {
  return hashJarvisChatSha256(
    `codexforge.jarvis-chat.deletion-audit.v1\u0000${operationId}`
  ).slice(0, 24);
}

function deletionResult(
  tombstone: JarvisChatDeletionTombstone,
  replayed: boolean
): JarvisChatDeletionResult {
  return {
    conversationId: tombstone.conversationId,
    deleted: true,
    replayed,
    responseStatus: 200,
    deletionAuditId: tombstone.deletionAuditId,
    deletionEvent: tombstone.deletionEvent,
    tombstoneDigest: tombstone.tombstoneDigest,
    deletedAt: tombstone.deletedAt,
  };
}

function assertEvidenceCapacity(
  conversation: Pick<JarvisChatConversation, "auditEvents" | "idempotencyRecords">,
  idempotencyRecords: number,
  auditEvents: number
): void {
  if (
    conversation.idempotencyRecords.length + idempotencyRecords > JARVIS_CHAT_MAX_IDEMPOTENCY_RECORDS ||
    conversation.auditEvents.length + auditEvents > JARVIS_CHAT_MAX_AUDIT_EVENTS
  ) {
    throw new JarvisChatPolicyError(
      409,
      "conversation_evidence_limit_reached",
      "This bounded conversation has no remaining durable evidence capacity for that action. Start a new chat."
    );
  }
}

function assertLifecycleEvidenceCapacity(
  conversation: Pick<JarvisChatConversation, "auditEvents" | "idempotencyRecords">,
  idempotencyRecords: number,
  auditEvents: number
): void {
  assertEvidenceCapacity(conversation, idempotencyRecords, auditEvents + 1);
}

function sealRevision(
  current: JarvisChatConversation,
  patch: Partial<Omit<JarvisChatConversation, "recordDigest" | "recordVersion" | "conversationId" | "createdAt" | "revision" | "previousRecordDigest">>,
  updatedAt: string
): JarvisChatConversation {
  return sealJarvisChatConversation({
    ...current,
    ...patch,
    recordVersion: JARVIS_CHAT_RECORD_VERSION,
    conversationId: current.conversationId,
    createdAt: current.createdAt,
    revision: current.revision + 1,
    updatedAt,
    previousRecordDigest: current.recordDigest,
  });
}

type CompletionEvidenceInput = Readonly<{
  action: JarvisChatMutationAction;
  keyHash: string;
  requestDigest: string;
  responseStatus: 200 | 201;
  createdAt: string;
  requestId?: string;
}>;

type RecoveryCompletion = Readonly<{
  keyHash: string;
  requestDigest: string;
  requestId: string;
}>;

function completionEvidence(
  provisional: JarvisChatConversation,
  input: CompletionEvidenceInput,
  additional: CompletionEvidenceInput | null = null
): JarvisChatConversation {
  const inputs = additional ? [input, additional] : [input];
  const placeholders: JarvisChatIdempotencyRecord[] = inputs.map((entry) => ({
    requestId: entry.requestId ?? makeJarvisChatHexId(16),
    action: entry.action,
    keyHash: entry.keyHash,
    requestDigest: entry.requestDigest,
    resultingRevision: provisional.revision,
    responseStatus: entry.responseStatus,
    responseClassification: "conversation",
    responseDigest: "0".repeat(64),
    createdAt: entry.createdAt,
  }));
  const withPlaceholder = sealJarvisChatConversation({
    ...provisional,
    idempotencyRecords: [...provisional.idempotencyRecords, ...placeholders],
  });
  const evidence = placeholders.map((placeholder) => ({
    ...placeholder,
    responseDigest: buildJarvisChatConversationResponseDigest(
      withPlaceholder,
      placeholder.responseStatus
    ),
  }));
  return sealJarvisChatConversation({
    ...provisional,
    idempotencyRecords: [...provisional.idempotencyRecords, ...evidence],
  });
}

function normalizedAssistantOutput(value: string | null): string | null {
  if (typeof value !== "string") return null;
  const normalized = value.replace(/\r\n?/gu, "\n").normalize("NFC").trim();
  if (
    normalized.length < 1 ||
    normalized.length > JARVIS_CHAT_MAX_ASSISTANT_MESSAGE_CHARACTERS ||
    Buffer.byteLength(normalized, "utf8") > JARVIS_CHAT_MAX_ASSISTANT_MESSAGE_BYTES ||
    /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f\p{Cf}\p{Cs}]/u.test(normalized) ||
    containsPrivateAlphaSecretLikeContent(normalized)
  ) return null;
  return normalized;
}

function requestDigest(value: unknown): string {
  return hashJarvisChatCanonicalJson(value);
}

function safeProviderFailure(error: unknown): Readonly<{
  state: "rejected" | "failed";
  code: string;
  message: string;
}> {
  const status = typeof error === "object" && error !== null && "status" in error
    ? (error as { status?: unknown }).status
    : null;
  return typeof status === "number" && [400, 409, 422].includes(status)
    ? {
        state: "rejected",
        code: "run_binding_rejected",
        message: "The exact local run request was rejected before provider execution. Review the request and start a new turn.",
      }
    : {
        state: "failed",
        code: "run_binding_failed",
        message: "The exact local run could not be bound safely. Use the explicit recovery action.",
      };
}

function exactRunBinding(run: Awaited<ReturnType<JarvisChatLifecycleAdapter["bindRun"]>>, turn: JarvisChatTurn): JarvisChatRunBinding {
  return {
    sourceRunId: run.runId,
    ownershipBindingId: turn.ownershipBindingId,
    runRevision: run.revision,
    approvalScopeHash: run.approvalScopeHash,
    requestEnvelopeDigest: turn.envelope.requestDigest,
    providerKey: "ollama-local",
    modelKey: "ollama-local::gpt-oss:20b",
    runtimeModel: "gpt-oss:20b",
    dataBoundary: "local-machine",
    maximumOutputTokens: 4096,
  };
}

export function createJarvisChatService(options: ServiceOptions = {}): JarvisChatService {
  const persistence = options.persistence ?? createJarvisChatPersistence();
  const lifecycle = options.lifecycle ?? createJarvisChatLifecycleAdapter();
  const now = options.now ?? Date.now;

  async function exactReplay(
    conversation: JarvisChatConversation,
    keyHash: string,
    action: JarvisChatMutationAction,
    digest: string
  ): Promise<JarvisChatMutationResult | null> {
    const evidence = conversation.idempotencyRecords.find((entry) => entry.keyHash === keyHash);
    if (!evidence) return null;
    if (evidence.action !== action || evidence.requestDigest !== digest) {
      throw new JarvisChatPolicyError(409, "idempotency_conflict", "Jarvis chat idempotency key was used for a different mutation.");
    }
    const revision = await persistence.getConversationRevision(
      conversation.conversationId,
      evidence.resultingRevision
    );
    if (
      evidence.responseDigest !==
        buildJarvisChatConversationResponseDigest(revision, evidence.responseStatus)
    ) {
      throw new JarvisChatPolicyError(503, "chat_persistence_invalid", "Jarvis chat replay evidence failed closed.");
    }
    return {
      conversation: revision,
      replayed: true,
      responseStatus: evidence.responseStatus,
    };
  }

  function assertOperation(
    conversation: JarvisChatConversation,
    action: JarvisChatPendingOperation["action"],
    keyHash: string,
    digest: string
  ): void {
    const operation = conversation.pendingOperation;
    if (!operation || operation.action !== action || operation.keyHash !== keyHash || operation.requestDigest !== digest) {
      throw new JarvisChatPolicyError(409, "operation_conflict", "Another exact Jarvis chat operation owns this conversation revision.");
    }
  }

  async function commitCompletion(
    current: JarvisChatConversation,
    patch: Parameters<typeof sealRevision>[1],
    completion: {
      action: JarvisChatMutationAction;
      keyHash: string;
      requestDigest: string;
      responseStatus: 200 | 201;
      updatedAt: string;
    },
    recovery: RecoveryCompletion | null = null
  ): Promise<Readonly<{ conversation: JarvisChatConversation; replayed: boolean }>> {
    let provisional = sealRevision(
      current,
      { ...patch, pendingOperation: null },
      completion.updatedAt
    );
    if (recovery) {
      const requested = audit(provisional, {
        eventType: "turn.recovery_requested",
        actor: "local-operator",
        resultingState: provisional.state,
        timestamp: completion.updatedAt,
        summary: "Explicit recovery requested for the exact interrupted local operation.",
        sourceRunId: provisional.turns.at(-1)?.runBinding?.sourceRunId ?? null,
      });
      provisional = sealJarvisChatConversation({
        ...provisional,
        auditEvents: [...provisional.auditEvents, requested],
      });
      const reconciled = audit(provisional, {
        eventType: "turn.reconciled",
        actor: "system",
        resultingState: provisional.state,
        timestamp: completion.updatedAt,
        summary: "The exact persisted run and conversation state were reconciled without a second provider attempt.",
        sourceRunId: provisional.turns.at(-1)?.runBinding?.sourceRunId ?? null,
      });
      provisional = sealJarvisChatConversation({
        ...provisional,
        auditEvents: [...provisional.auditEvents, reconciled],
      });
    }
    const next = completionEvidence(provisional, {
      ...completion,
      createdAt: completion.updatedAt,
      requestId: current.pendingOperation?.operationId,
    }, recovery ? {
      action: "recover_turn",
      keyHash: recovery.keyHash,
      requestDigest: recovery.requestDigest,
      responseStatus: 200,
      createdAt: completion.updatedAt,
      requestId: recovery.requestId,
    } : null);
    try {
      return {
        conversation: await persistence.commitConversation({ expected: current, next }),
        replayed: false,
      };
    } catch (error) {
      if (!(error instanceof JarvisChatPolicyError) || error.code !== "revision_conflict") throw error;
      const latest = await persistence.getConversation(current.conversationId);
      const replay = await exactReplay(
        latest,
        recovery?.keyHash ?? completion.keyHash,
        recovery ? "recover_turn" : completion.action,
        recovery?.requestDigest ?? completion.requestDigest
      );
      if (replay) return { conversation: replay.conversation, replayed: true };
      throw error;
    }
  }

  async function finishBinding(
    current: JarvisChatConversation,
    action: "create_conversation" | "append_turn",
    keyHash: string,
    digest: string,
    responseStatus: 200 | 201,
    recovery: RecoveryCompletion | null = null
  ): Promise<JarvisChatMutationResult> {
    assertOperation(current, action, keyHash, digest);
    assertLifecycleEvidenceCapacity(current, recovery ? 2 : 1, recovery ? 3 : 1);
    const turn = current.turns.at(-1)!;
    let run: Awaited<ReturnType<JarvisChatLifecycleAdapter["bindRun"]>>;
    try {
      run = await lifecycle.bindRun({
        conversationId: current.conversationId,
        turnId: turn.turnId,
        ownershipBindingId: turn.ownershipBindingId,
        instruction: turn.envelope.providerVisibleRequest,
      });
    } catch (error) {
      let recovered: Awaited<ReturnType<JarvisChatLifecycleAdapter["recoverBoundRun"]>>;
      try {
        recovered = await lifecycle.recoverBoundRun({
          conversationId: current.conversationId,
          turnId: turn.turnId,
          ownershipBindingId: turn.ownershipBindingId,
          instruction: turn.envelope.providerVisibleRequest,
        });
      } catch (recoveryError) {
        // The exact binding may already exist. Leave the durable binding intent
        // recoverable when the indexed read itself is unavailable or ambiguous.
        throw recoveryError;
      }
      if (recovered) {
        run = recovered;
      } else {
        const failure = safeProviderFailure(error);
        const latest = await persistence.getConversation(current.conversationId);
        const replay = await exactReplay(latest, keyHash, action, digest);
        if (replay) return replay;
        assertOperation(latest, action, keyHash, digest);
        const at = nextTimestamp(latest.updatedAt, now);
        const failedTurn: JarvisChatTurn = {
          ...latest.turns.at(-1)!,
          state: failure.state,
          failureCode: failure.code,
          safeFailureMessage: failure.message,
          updatedAt: at,
        };
        const event = audit(latest, {
          eventType: failure.state === "rejected" ? "turn.output_rejected" : "turn.failed",
          actor: "system",
          resultingState: failure.state,
          timestamp: at,
          summary: failure.message,
        });
        const completed = await commitCompletion(
          latest,
          {
            state: failure.state,
            turns: [...latest.turns.slice(0, -1), failedTurn],
            auditEvents: [...latest.auditEvents, event],
          },
          { action, keyHash, requestDigest: digest, responseStatus, updatedAt: at },
          recovery
        );
        return { conversation: completed.conversation, replayed: completed.replayed, responseStatus };
      }
    }
    const latest = await persistence.getConversation(current.conversationId);
    const replay = await exactReplay(latest, keyHash, action, digest);
    if (replay) return replay;
    assertOperation(latest, action, keyHash, digest);
    const latestTurn = latest.turns.at(-1)!;
    const at = nextTimestamp(latest.updatedAt, now);
    const binding = exactRunBinding(run, latestTurn);
    const boundTurn: JarvisChatTurn = {
      ...latestTurn,
      state: "awaiting_approval",
      runBinding: binding,
      updatedAt: at,
    };
    const event = audit(latest, {
      eventType: "turn.run_bound",
      actor: "system",
      resultingState: "awaiting_approval",
      timestamp: at,
      summary: "Exact local Ollama run bound; manual approval is required before execution.",
      sourceRunId: run.runId,
    });
    const completed = await commitCompletion(
      latest,
      {
        state: "awaiting_approval",
        turns: [...latest.turns.slice(0, -1), boundTurn],
        auditEvents: [...latest.auditEvents, event],
      },
      { action, keyHash, requestDigest: digest, responseStatus, updatedAt: at },
      recovery
    );
    return { conversation: completed.conversation, replayed: completed.replayed, responseStatus };
  }

  async function startPending(
    current: JarvisChatConversation,
    action: JarvisChatPendingOperation["action"],
    keyHash: string,
    digest: string,
    patch: Parameters<typeof sealRevision>[1],
    events: readonly JarvisChatAuditEvent[] = [],
    cancellationReason: string | null = null
  ): Promise<Readonly<{ conversation: JarvisChatConversation; replay: JarvisChatMutationResult | null }>> {
    if (current.pendingOperation) {
      assertOperation(current, action, keyHash, digest);
      return { conversation: current, replay: null };
    }
    const at = nextTimestamp(current.updatedAt, now);
    const next = sealRevision(
      current,
      {
        ...patch,
        auditEvents: events.length ? [...current.auditEvents, ...events] : current.auditEvents,
        pendingOperation: pendingOperation(
          action,
          keyHash,
          digest,
          current.revision + 1,
          at,
          cancellationReason
        ),
      },
      at
    );
    try {
      return {
        conversation: await persistence.commitConversation({ expected: current, next }),
        replay: null,
      };
    } catch (error) {
      if (!(error instanceof JarvisChatPolicyError) || error.code !== "revision_conflict") throw error;
      const latest = await persistence.getConversation(current.conversationId);
      const replay = await exactReplay(latest, keyHash, action, digest);
      if (replay) return { conversation: latest, replay };
      assertOperation(latest, action, keyHash, digest);
      return { conversation: latest, replay: null };
    }
  }

  async function commitIntent(
    current: JarvisChatConversation,
    next: JarvisChatConversation,
    action: JarvisChatPendingOperation["action"],
    keyHash: string,
    digest: string
  ): Promise<Readonly<{ conversation: JarvisChatConversation; replay: JarvisChatMutationResult | null }>> {
    try {
      return {
        conversation: await persistence.commitConversation({ expected: current, next }),
        replay: null,
      };
    } catch (error) {
      if (!(error instanceof JarvisChatPolicyError) || error.code !== "revision_conflict") throw error;
      const latest = await persistence.getConversation(current.conversationId);
      const replay = await exactReplay(latest, keyHash, action, digest);
      if (replay) return { conversation: latest, replay };
      assertOperation(latest, action, keyHash, digest);
      return { conversation: latest, replay: null };
    }
  }

  async function commitDirectCompletion(
    current: JarvisChatConversation,
    next: JarvisChatConversation,
    action: JarvisChatMutationAction,
    keyHash: string,
    digest: string
  ): Promise<JarvisChatMutationResult> {
    try {
      const conversation = await persistence.commitConversation({ expected: current, next });
      return { conversation, replayed: false, responseStatus: 200 };
    } catch (error) {
      if (!(error instanceof JarvisChatPolicyError) || error.code !== "revision_conflict") throw error;
      const latest = await persistence.getConversation(current.conversationId);
      const replay = await exactReplay(latest, keyHash, action, digest);
      if (replay) return replay;
      throw error;
    }
  }

  async function finishApproval(
    current: JarvisChatConversation,
    keyHash: string,
    digest: string,
    recovery: RecoveryCompletion | null = null
  ): Promise<JarvisChatMutationResult> {
    assertOperation(current, "approve_turn", keyHash, digest);
    assertLifecycleEvidenceCapacity(current, recovery ? 2 : 1, recovery ? 3 : 1);
    const turn = current.turns.at(-1)!;
    const binding = turn.runBinding;
    if (!binding) throw new JarvisChatPolicyError(409, "run_not_bound", "Jarvis chat turn has no exact run binding.");
    const run = await lifecycle.approveRun({
      conversationId: current.conversationId,
      turnId: turn.turnId,
      ownershipBindingId: turn.ownershipBindingId,
      runId: binding.sourceRunId,
      expectedRunRevision: binding.runRevision,
      approvalScopeHash: binding.approvalScopeHash,
      requestEnvelopeDigest: binding.requestEnvelopeDigest,
    });
    const latest = await persistence.getConversation(current.conversationId);
    const replay = await exactReplay(latest, keyHash, "approve_turn", digest);
    if (replay) return replay;
    assertOperation(latest, "approve_turn", keyHash, digest);
    const at = nextTimestamp(latest.updatedAt, now);
    const approvedTurn: JarvisChatTurn = {
      ...latest.turns.at(-1)!,
      state: "approved",
      runBinding: { ...latest.turns.at(-1)!.runBinding!, runRevision: run.revision },
      updatedAt: at,
    };
    const event = audit(latest, {
      eventType: "turn.approved",
      actor: "local-operator",
      resultingState: "approved",
      timestamp: at,
      summary: "Manual approval recorded for the exact displayed local run. Execution remains separate.",
      sourceRunId: run.runId,
    });
    const completed = await commitCompletion(
      latest,
      {
        state: "approved",
        turns: [...latest.turns.slice(0, -1), approvedTurn],
        auditEvents: [...latest.auditEvents, event],
      },
      { action: "approve_turn", keyHash, requestDigest: digest, responseStatus: 200, updatedAt: at },
      recovery
    );
    return { conversation: completed.conversation, replayed: completed.replayed, responseStatus: 200 };
  }

  async function finalizeExecution(
    conversationId: string,
    keyHash: string,
    digest: string,
    result: JarvisChatLifecycleExecutionResult,
    recovery: RecoveryCompletion | null = null
  ): Promise<JarvisChatMutationResult> {
    const latest = await persistence.getConversation(conversationId);
    const replay = await exactReplay(latest, keyHash, "execute_turn", digest);
    if (replay) return replay;
    assertOperation(latest, "execute_turn", keyHash, digest);
    const currentTurn = latest.turns.at(-1)!;
    const at = nextTimestamp(latest.updatedAt, now);
    let nextState: JarvisChatConversationState;
    let turnState: JarvisChatTurnState;
    let assistantMessage: JarvisChatMessage | null = null;
    let failureCode: string | null = null;
    let safeFailureMessage: string | null = null;
    let eventType: JarvisChatAuditEvent["eventType"];
    let summary: string;
    if (latest.state === "stopping") {
      nextState = "stopped";
      turnState = "stopped";
      eventType = "turn.stopped";
      summary = "The response was stopped locally; a provider request already in progress could not be terminated.";
    } else if (result.run.state === "succeeded") {
      const output = normalizedAssistantOutput(result.outputText);
      if (output) {
        nextState = "ready";
        turnState = "succeeded";
        assistantMessage = message("assistant", output, at);
        eventType = "turn.output_received";
        summary = "One bounded assistant response was received from the exact approved local run.";
      } else {
        nextState = "rejected";
        turnState = "rejected";
        failureCode = "assistant_output_rejected";
        safeFailureMessage = "The local response was empty or exceeded the safe chat text envelope.";
        eventType = "turn.output_rejected";
        summary = safeFailureMessage;
      }
    } else {
      nextState = "failed";
      turnState = "failed";
      failureCode = result.errorCode && /^[a-z][a-z0-9_]{0,63}$/u.test(result.errorCode)
        ? result.errorCode
        : "local_execution_failed";
      safeFailureMessage = (result.safeErrorMessage || "The approved local response attempt failed safely.").slice(0, 240);
      eventType = "turn.failed";
      summary = safeFailureMessage;
    }
    const nextTurn: JarvisChatTurn = {
      ...currentTurn,
      state: turnState,
      assistantMessage,
      runBinding: currentTurn.runBinding
        ? { ...currentTurn.runBinding, runRevision: result.run.revision }
        : null,
      failureCode,
      safeFailureMessage,
      updatedAt: at,
    };
    const event = audit(latest, {
      eventType,
      actor: "system",
      resultingState: nextState,
      timestamp: at,
      summary,
      sourceRunId: result.run.runId,
    });
    const completed = await commitCompletion(
      latest,
      {
        state: nextState,
        turns: [...latest.turns.slice(0, -1), nextTurn],
        auditEvents: [...latest.auditEvents, event],
      },
      { action: "execute_turn", keyHash, requestDigest: digest, responseStatus: 200, updatedAt: at },
      recovery
    );
    return { conversation: completed.conversation, replayed: completed.replayed, responseStatus: 200 };
  }

  async function finishExecution(
    current: JarvisChatConversation,
    keyHash: string,
    digest: string,
    recovery: RecoveryCompletion | null = null
  ): Promise<JarvisChatMutationResult> {
    assertLifecycleEvidenceCapacity(current, recovery ? 2 : 1, recovery ? 3 : 1);
    assertOperation(current, "execute_turn", keyHash, digest);
    const turn = current.turns.at(-1)!;
    const binding = turn.runBinding;
    if (!binding) throw new JarvisChatPolicyError(409, "run_not_bound", "Jarvis chat turn has no exact approved run.");
    let result: JarvisChatLifecycleExecutionResult;
    try {
      result = await lifecycle.executeRun({
        conversationId: current.conversationId,
        turnId: turn.turnId,
        ownershipBindingId: turn.ownershipBindingId,
        runId: binding.sourceRunId,
        expectedRunRevision: binding.runRevision,
        approvalScopeHash: binding.approvalScopeHash,
        requestEnvelopeDigest: binding.requestEnvelopeDigest,
        admitProviderStart: async () => {
          const latest = await persistence.getConversation(current.conversationId);
          const latestTurn = latest.turns.at(-1);
          const latestBinding = latestTurn?.runBinding;
          return (
            latest.state === "executing" &&
            latest.currentTurnId === turn.turnId &&
            latest.pendingOperation?.action === "execute_turn" &&
            latest.pendingOperation.keyHash === keyHash &&
            latest.pendingOperation.requestDigest === digest &&
            latestTurn?.turnId === turn.turnId &&
            latestTurn.ownershipBindingId === turn.ownershipBindingId &&
            latestBinding?.sourceRunId === binding.sourceRunId &&
            latestBinding.runRevision === binding.runRevision &&
            latestBinding.approvalScopeHash === binding.approvalScopeHash &&
            latestBinding.requestEnvelopeDigest === binding.requestEnvelopeDigest
          );
        },
      });
    } catch (error) {
      const latest = await persistence.getConversation(current.conversationId);
      const replay = await exactReplay(latest, keyHash, "execute_turn", digest);
      if (replay) return replay;
      throw error;
    }
    return finalizeExecution(current.conversationId, keyHash, digest, result, recovery);
  }

  async function finishCancel(
    current: JarvisChatConversation,
    keyHash: string,
    digest: string,
    reason: string,
    recovery: RecoveryCompletion | null = null
  ): Promise<JarvisChatMutationResult> {
    assertOperation(current, "cancel_turn", keyHash, digest);
    assertLifecycleEvidenceCapacity(current, recovery ? 2 : 1, recovery ? 3 : 1);
    const turn = current.turns.at(-1)!;
    const binding = turn.runBinding;
    if (!binding) throw new JarvisChatPolicyError(409, "run_not_bound", "Jarvis chat turn has no cancellable run.");
    const run = await lifecycle.cancelRun({
      conversationId: current.conversationId,
      turnId: turn.turnId,
      ownershipBindingId: turn.ownershipBindingId,
      runId: binding.sourceRunId,
      reason,
    });
    const latest = await persistence.getConversation(current.conversationId);
    const replay = await exactReplay(latest, keyHash, "cancel_turn", digest);
    if (replay) return replay;
    assertOperation(latest, "cancel_turn", keyHash, digest);
    const at = nextTimestamp(latest.updatedAt, now);
    const canceledTurn: JarvisChatTurn = {
      ...latest.turns.at(-1)!,
      state: "canceled",
      runBinding: { ...latest.turns.at(-1)!.runBinding!, runRevision: run.revision },
      updatedAt: at,
    };
    const event = audit(latest, {
      eventType: "turn.canceled",
      actor: "local-operator",
      resultingState: "canceled",
      timestamp: at,
      summary: "The unexecuted local run was canceled explicitly.",
      sourceRunId: run.runId,
    });
    const completed = await commitCompletion(
      latest,
      {
        state: "canceled",
        turns: [...latest.turns.slice(0, -1), canceledTurn],
        auditEvents: [...latest.auditEvents, event],
      },
      { action: "cancel_turn", keyHash, requestDigest: digest, responseStatus: 200, updatedAt: at },
      recovery
    );
    return { conversation: completed.conversation, replayed: completed.replayed, responseStatus: 200 };
  }

  async function finishStoppedBeforeExecution(
    current: JarvisChatConversation,
    keyHash: string,
    digest: string,
    recovery: RecoveryCompletion
  ): Promise<JarvisChatMutationResult> {
    assertOperation(current, "execute_turn", keyHash, digest);
    if (current.state !== "stopping") {
      throw new JarvisChatPolicyError(409, "stop_not_available", "The exact execution intent is not in its stopped recovery state.");
    }
    assertLifecycleEvidenceCapacity(current, 2, 3);
    const turn = current.turns.at(-1)!;
    const binding = turn.runBinding;
    if (!binding) throw new JarvisChatPolicyError(409, "run_not_bound", "Jarvis chat turn has no exact run binding.");
    const canceled = await lifecycle.cancelRun({
      conversationId: current.conversationId,
      turnId: turn.turnId,
      ownershipBindingId: turn.ownershipBindingId,
      runId: binding.sourceRunId,
      reason: "Stopped before local provider execution began.",
    });
    const latest = await persistence.getConversation(current.conversationId);
    const replay = await exactReplay(latest, recovery.keyHash, "recover_turn", recovery.requestDigest);
    if (replay) return replay;
    assertOperation(latest, "execute_turn", keyHash, digest);
    const at = nextTimestamp(latest.updatedAt, now);
    const stoppedTurn: JarvisChatTurn = {
      ...latest.turns.at(-1)!,
      state: "stopped",
      runBinding: {
        ...latest.turns.at(-1)!.runBinding!,
        runRevision: canceled.revision,
      },
      updatedAt: at,
    };
    const event = audit(latest, {
      eventType: "turn.stopped",
      actor: "system",
      resultingState: "stopped",
      timestamp: at,
      summary: "Stop prevented the exact approved run from starting a provider request.",
      sourceRunId: canceled.runId,
    });
    const completed = await commitCompletion(
      latest,
      {
        state: "stopped",
        turns: [...latest.turns.slice(0, -1), stoppedTurn],
        auditEvents: [...latest.auditEvents, event],
      },
      { action: "execute_turn", keyHash, requestDigest: digest, responseStatus: 200, updatedAt: at },
      recovery
    );
    return { conversation: completed.conversation, replayed: completed.replayed, responseStatus: 200 };
  }

  async function recordRecovery(
    conversation: JarvisChatConversation,
    keyHash: string,
    digest: string,
    requestId: string
  ): Promise<JarvisChatMutationResult> {
    const replay = await exactReplay(conversation, keyHash, "recover_turn", digest);
    if (replay) return replay;
    if (conversation.pendingOperation) {
      throw new JarvisChatPolicyError(409, "operation_in_progress", "The original Jarvis chat operation still requires reconciliation.");
    }
    assertLifecycleEvidenceCapacity(conversation, 1, 2);
    const at = nextTimestamp(conversation.updatedAt, now);
    const requested = audit(conversation, {
      eventType: "turn.recovery_requested",
      actor: "local-operator",
      resultingState: conversation.state,
      timestamp: at,
      summary: "Explicit recovery requested for the exact interrupted local operation.",
      sourceRunId: conversation.turns.at(-1)?.runBinding?.sourceRunId ?? null,
    });
    const withRequested = sealJarvisChatConversation({
      ...conversation,
      auditEvents: [...conversation.auditEvents, requested],
    });
    const event = audit(withRequested, {
      eventType: "turn.reconciled",
      actor: "system",
      resultingState: conversation.state,
      timestamp: at,
      summary: "The exact persisted run and conversation state were reconciled without a new provider attempt.",
      sourceRunId: conversation.turns.at(-1)?.runBinding?.sourceRunId ?? null,
    });
    const provisional = sealRevision(
      conversation,
      { auditEvents: [...conversation.auditEvents, requested, event] },
      at
    );
    const completed = completionEvidence(provisional, {
      action: "recover_turn",
      keyHash,
      requestDigest: digest,
      responseStatus: 200,
      createdAt: at,
      requestId,
    });
    try {
      const persisted = await persistence.commitConversation({ expected: conversation, next: completed });
      return { conversation: persisted, replayed: false, responseStatus: 200 };
    } catch (error) {
      if (!(error instanceof JarvisChatPolicyError) || error.code !== "revision_conflict") throw error;
      const latest = await persistence.getConversation(conversation.conversationId);
      const replay = await exactReplay(latest, keyHash, "recover_turn", digest);
      if (replay) return replay;
      throw error;
    }
  }

  async function asRecoveryResult(
    result: JarvisChatMutationResult,
    recovery: RecoveryCompletion
  ): Promise<JarvisChatMutationResult> {
    const evidence = result.conversation.idempotencyRecords.find(
      (entry) => entry.keyHash === recovery.keyHash
    );
    if (evidence) {
      if (evidence.action !== "recover_turn" || evidence.requestDigest !== recovery.requestDigest) {
        throw new JarvisChatPolicyError(409, "idempotency_conflict", "Jarvis chat recovery key conflicts with its exact prior request.");
      }
      return {
        conversation: result.conversation,
        replayed: result.replayed,
        responseStatus: 200,
      };
    }
    return recordRecovery(
      await persistence.getConversation(result.conversation.conversationId),
      recovery.keyHash,
      recovery.requestDigest,
      recovery.requestId
    );
  }

  return {
    async createConversation(body, rawIdempotencyKey) {
      const input = validateJarvisChatCreateInput(body);
      if (containsPrivateAlphaSecretLikeContent(input.message)) {
        throw new JarvisChatPolicyError(
          422,
          "secret_like_content_rejected",
          "Jarvis chat does not persist text that appears to contain credentials or secrets."
        );
      }
      const key = validateJarvisChatIdempotencyKey(rawIdempotencyKey);
      const digest = requestDigest(input);
      const keyHash = buildJarvisChatIdempotencyKeyHash(key, null);
      const createdAt = nextTimestamp(null, now);
      const conversationId = makeJarvisChatHexId(12);
      const turnId = makeJarvisChatHexId(12);
      const userMessage = message("user", input.message, createdAt);
      const turn: JarvisChatTurn = {
        turnId,
        ordinal: 1,
        state: "binding",
        userMessage,
        assistantMessage: null,
        contextMode: "none",
        ownershipBindingId: makeJarvisChatHexId(16),
        envelope: buildJarvisChatProviderEnvelope({
          priorTurns: [],
          currentUserMessage: input.message,
          contextMode: "none",
        }),
        runBinding: null,
        failureCode: null,
        safeFailureMessage: null,
        requestedAt: createdAt,
        updatedAt: createdAt,
      };
      const firstAudit: JarvisChatAuditEvent = {
        auditId: makeJarvisChatHexId(12),
        eventType: "conversation.created",
        actor: "local-operator",
        turnId,
        previousState: null,
        resultingState: "binding",
        timestamp: createdAt,
        summary: "Local Jarvis conversation created with no hidden prior context.",
        sourceRunId: null,
      };
      const secondAudit = audit(
        { auditEvents: [firstAudit], currentTurnId: turnId },
        {
          eventType: "turn.requested",
          actor: "local-operator",
          resultingState: "binding",
          timestamp: createdAt,
          summary: "One bounded text turn queued for exact local run binding.",
          turnId,
        }
      );
      const conversation = sealJarvisChatConversation({
        recordVersion: JARVIS_CHAT_RECORD_VERSION,
        conversationId,
        title: titleFromMessage(input.message),
        state: "binding",
        revision: 1,
        createdAt,
        updatedAt: createdAt,
        currentTurnId: turnId,
        turns: [turn],
        auditEvents: [firstAudit, secondAudit],
        idempotencyRecords: [],
        pendingOperation: pendingOperation("create_conversation", keyHash, digest, 1, createdAt),
        previousRecordDigest: null,
      });
      assertLifecycleEvidenceCapacity(conversation, 2, 3);
      const initial = await persistence.createConversation({
        conversation,
        createKeyHash: keyHash,
        requestDigest: digest,
      });
      const replay = await exactReplay(initial.conversation, keyHash, "create_conversation", digest);
      if (replay) return replay;
      return finishBinding(initial.conversation, "create_conversation", keyHash, digest, 201);
    },

    listConversations(limit = JARVIS_CHAT_MAX_CONVERSATIONS) {
      return persistence.listConversations(limit);
    },

    getConversation(conversationId) {
      return persistence.getConversation(conversationId);
    },

    async getRuntimeStatus() {
      const killSwitch = await lifecycle.readKillSwitch();
      return {
        providerKey: "ollama-local",
        modelKey: "ollama-local::gpt-oss:20b",
        runtimeModel: "gpt-oss:20b",
        dataBoundary: "local-machine",
        maximumOutputTokens: 4096,
        costClass: "local-no-provider-token-charge",
        approvalMode: "manual-approval-then-separate-execution",
        streaming: "unavailable",
        memory: "current-conversation-or-none",
        killSwitchEngaged: killSwitch.killSwitchEngaged,
        executionPermittedByPolicy: !killSwitch.killSwitchEngaged,
        providerAvailability: "not-checked",
      };
    },

    async actOnConversation(conversationId, body, rawIdempotencyKey) {
      if (!/^[a-f0-9]{24}$/u.test(conversationId)) {
        throw new JarvisChatPolicyError(404, "conversation_not_found", "Jarvis chat conversation was not found.");
      }
      const input = validateJarvisChatActionInput(body);
      if (
        input.action === "append-turn" &&
        containsPrivateAlphaSecretLikeContent(input.message)
      ) {
        throw new JarvisChatPolicyError(
          422,
          "secret_like_content_rejected",
          "Jarvis chat does not persist text that appears to contain credentials or secrets."
        );
      }
      if (
        (input.action === "cancel-turn" && containsPrivateAlphaSecretLikeContent(input.reason)) ||
        (input.action === "rename-conversation" && containsPrivateAlphaSecretLikeContent(input.title))
      ) {
        throw new JarvisChatPolicyError(
          422,
          "secret_like_content_rejected",
          "Jarvis chat does not persist text that appears to contain credentials or secrets."
        );
      }
      const key = validateJarvisChatIdempotencyKey(rawIdempotencyKey);
      const action = ACTION_BY_INPUT[input.action];
      const digest = requestDigest(input);
      const keyHash = buildJarvisChatIdempotencyKeyHash(key, conversationId);
      const recoveryRequest: RecoveryCompletion | null = input.action === "recover-turn"
        ? { keyHash, requestDigest: digest, requestId: makeJarvisChatHexId(16) }
        : null;
      const deletionResume = input.action === "delete-conversation"
        ? { kind: "deletion" as const, keyHash, requestDigest: digest }
        : input.action === "recover-turn"
          ? {
              kind: "recovery" as const,
              ...recoveryRequest!,
              expectedRevision: input.expectedRevision,
            }
          : null;
      const readDeletionReplay = async (): Promise<JarvisChatDeletionResult | null> => {
        if (!deletionResume) return null;
        const deletionLookup = await persistence.getDeletionTombstone(conversationId, deletionResume);
        if (deletionLookup) {
          const deleted = deletionLookup.tombstone;
          if (input.action === "recover-turn" && input.expectedRevision !== deleted.finalRevision) {
            throw new JarvisChatPolicyError(409, "revision_conflict", "Deleted conversation recovery requires the exact final revision.");
          }
          if (input.action === "delete-conversation") {
            if (deleted.deletionKeyHash !== keyHash || deleted.deletionRequestDigest !== digest) {
              throw new JarvisChatPolicyError(409, "idempotency_conflict", "Conversation deletion conflicts with its exact prior request.");
            }
          } else if (
            deleted.recoveryKeyHash !== keyHash ||
            deleted.recoveryRequestDigest !== digest
          ) {
            throw new JarvisChatPolicyError(409, "idempotency_conflict", "Conversation recovery conflicts with its exact prior request.");
          }
          return deletionResult(
            deleted,
            input.action === "delete-conversation" || !deletionLookup.recoveryClaimed
          );
        }
        return null;
      };
      if (deletionResume) {
        const deletionReplay = await readDeletionReplay();
        if (deletionReplay) return deletionReplay;
      }
      let current: JarvisChatConversation;
      try {
        current = await persistence.getConversation(conversationId);
      } catch (error) {
        if (
          deletionResume &&
          error instanceof JarvisChatPolicyError &&
          error.code === "conversation_not_found"
        ) {
          const deletionReplay = await readDeletionReplay();
          if (deletionReplay) return deletionReplay;
        }
        throw error;
      }
      const replay = await exactReplay(current, keyHash, action, digest);
      if (replay) return replay;
      if (
        input.action === "recover-turn" &&
        !current.pendingOperation &&
        current.revision === input.expectedRevision + 1
      ) {
        const interrupted = await persistence.getConversationRevision(
          conversationId,
          input.expectedRevision
        );
        const original = interrupted.pendingOperation;
        const completed = original
          ? current.idempotencyRecords.find(
              (entry) =>
                entry.keyHash === original.keyHash &&
                entry.action === original.action &&
                entry.requestDigest === original.requestDigest &&
                entry.resultingRevision === current.revision
            )
          : null;
        if (!original || !completed) {
          throw new JarvisChatPolicyError(409, "recovery_not_available", "No exact interrupted Jarvis chat operation was completed at the requested revision.");
        }
        const existingRecovery = current.idempotencyRecords.find(
          (entry) =>
            entry.action === "recover_turn" &&
            entry.resultingRevision === current.revision
        );
        if (existingRecovery) {
          throw new JarvisChatPolicyError(
            409,
            "idempotency_conflict",
            "The interrupted Jarvis chat operation is already owned by a different exact recovery request."
          );
        }
        return recordRecovery(current, keyHash, digest, recoveryRequest!.requestId);
      }
      if (current.pendingOperation && input.action !== "recover-turn") {
        if (
          current.pendingOperation.action !== action ||
          current.pendingOperation.keyHash !== keyHash ||
          current.pendingOperation.requestDigest !== digest
        ) {
          if (input.action !== "stop-turn") {
            throw new JarvisChatPolicyError(409, "operation_in_progress", "Another exact Jarvis chat operation is still in progress.");
          }
        }
      } else if (current.revision !== input.expectedRevision) {
        throw new JarvisChatPolicyError(409, "revision_conflict", "Jarvis chat mutation requires the exact current revision.");
      }

      switch (input.action) {
        case "append-turn": {
          if (current.pendingOperation) {
            return finishBinding(current, "append_turn", keyHash, digest, 200);
          }
          if (!APPENDABLE_STATES.has(current.state) || current.turns.length >= JARVIS_CHAT_MAX_TURNS) {
            throw new JarvisChatPolicyError(409, "turn_not_appendable", `Jarvis chat can append only after a terminal turn and stores at most ${JARVIS_CHAT_MAX_TURNS} turns.`);
          }
          assertLifecycleEvidenceCapacity(current, 2, 4);
          const at = nextTimestamp(current.updatedAt, now);
          const turnId = makeJarvisChatHexId(12);
          const nextTurn: JarvisChatTurn = {
            turnId,
            ordinal: current.turns.length + 1,
            state: "binding",
            userMessage: message("user", input.message, at),
            assistantMessage: null,
            contextMode: input.contextMode,
            ownershipBindingId: makeJarvisChatHexId(16),
            envelope: buildJarvisChatProviderEnvelope({
              priorTurns: current.turns,
              currentUserMessage: input.message,
              contextMode: input.contextMode,
            }),
            runBinding: null,
            failureCode: null,
            safeFailureMessage: null,
            requestedAt: at,
            updatedAt: at,
          };
          const event = audit(current, {
            eventType: "turn.requested",
            actor: "local-operator",
            resultingState: "binding",
            timestamp: at,
            summary: input.contextMode === "conversation"
              ? "New bounded turn queued with explicit same-conversation context selection."
              : "New bounded turn queued with conversation context explicitly disabled.",
            turnId,
          });
          const intent = sealRevision(
            current,
            {
              state: "binding",
              currentTurnId: turnId,
              turns: [...current.turns, nextTurn],
              auditEvents: [...current.auditEvents, event],
              pendingOperation: pendingOperation("append_turn", keyHash, digest, current.revision + 1, at),
            },
            at
          );
          const committed = await commitIntent(current, intent, "append_turn", keyHash, digest);
          if (committed.replay) return committed.replay;
          current = committed.conversation;
          return finishBinding(current, "append_turn", keyHash, digest, 200);
        }

        case "approve-turn": {
          if (current.pendingOperation) return finishApproval(current, keyHash, digest);
          if (current.state !== "awaiting_approval") {
            throw new JarvisChatPolicyError(409, "approval_not_available", "This Jarvis chat turn is not awaiting approval.");
          }
          const binding = current.turns.at(-1)!.runBinding!;
          if (input.approvalScopeHash !== binding.approvalScopeHash) {
            throw new JarvisChatPolicyError(409, "approval_scope_mismatch", "Approval does not match the exact displayed run scope.");
          }
          assertLifecycleEvidenceCapacity(current, 2, 3);
          const started = await startPending(current, "approve_turn", keyHash, digest, {});
          if (started.replay) return started.replay;
          current = started.conversation;
          return finishApproval(current, keyHash, digest);
        }

        case "execute-turn": {
          if (current.pendingOperation) return finishExecution(current, keyHash, digest);
          if (current.state !== "approved") {
            throw new JarvisChatPolicyError(409, "execution_not_available", "This Jarvis chat turn is not approved for execution.");
          }
          const binding = current.turns.at(-1)!.runBinding!;
          if (input.approvalScopeHash !== binding.approvalScopeHash) {
            throw new JarvisChatPolicyError(409, "approval_scope_mismatch", "Execution does not match the exact approved run scope.");
          }
          assertLifecycleEvidenceCapacity(current, 3, 5);
          const at = nextTimestamp(current.updatedAt, now);
          const executingTurn: JarvisChatTurn = {
            ...current.turns.at(-1)!,
            state: "executing",
            updatedAt: at,
          };
          const event = audit(current, {
            eventType: "turn.execution_requested",
            actor: "local-operator",
            resultingState: "executing",
            timestamp: at,
            summary: "One explicit execution attempt requested for the exact approved local run.",
            sourceRunId: binding.sourceRunId,
          });
          const intent = sealRevision(
            current,
            {
              state: "executing",
              turns: [...current.turns.slice(0, -1), executingTurn],
              auditEvents: [...current.auditEvents, event],
              pendingOperation: pendingOperation("execute_turn", keyHash, digest, current.revision + 1, at),
            },
            at
          );
          const committed = await commitIntent(current, intent, "execute_turn", keyHash, digest);
          if (committed.replay) return committed.replay;
          current = committed.conversation;
          return finishExecution(current, keyHash, digest);
        }

        case "stop-turn": {
          if (current.state !== "executing" || current.pendingOperation?.action !== "execute_turn") {
            throw new JarvisChatPolicyError(409, "stop_not_available", "Stop is available only while one response attempt is executing.");
          }
          if (current.pendingOperation.keyHash === keyHash) {
            throw new JarvisChatPolicyError(
              409,
              "idempotency_conflict",
              "The pending execution and Stop request must use different exact idempotency keys."
            );
          }
          if (current.revision !== input.expectedRevision) {
            throw new JarvisChatPolicyError(409, "revision_conflict", "Stop requires the exact current executing revision.");
          }
          assertLifecycleEvidenceCapacity(current, 1, 1);
          const at = nextTimestamp(current.updatedAt, now);
          const stoppingTurn: JarvisChatTurn = {
            ...current.turns.at(-1)!,
            state: "stopping",
            updatedAt: at,
          };
          const event = audit(current, {
            eventType: "turn.stop_requested",
            actor: "local-operator",
            resultingState: "stopping",
            timestamp: at,
            summary: "Stop requested locally. An in-flight provider request may continue, but its output will not be added.",
            sourceRunId: stoppingTurn.runBinding?.sourceRunId ?? null,
          });
          const provisional = sealRevision(
            current,
            {
              state: "stopping",
              turns: [...current.turns.slice(0, -1), stoppingTurn],
              auditEvents: [...current.auditEvents, event],
            },
            at
          );
          const completed = completionEvidence(provisional, {
            action: "stop_turn",
            keyHash,
            requestDigest: digest,
            responseStatus: 200,
            createdAt: at,
          });
          return commitDirectCompletion(current, completed, "stop_turn", keyHash, digest);
        }

        case "cancel-turn": {
          if (current.pendingOperation) return finishCancel(current, keyHash, digest, input.reason);
          if (current.state !== "awaiting_approval" && current.state !== "approved") {
            throw new JarvisChatPolicyError(409, "cancellation_not_available", "Cancel is available only before provider execution starts.");
          }
          assertLifecycleEvidenceCapacity(current, 2, 3);
          const started = await startPending(
            current,
            "cancel_turn",
            keyHash,
            digest,
            {},
            [],
            input.reason
          );
          if (started.replay) return started.replay;
          current = started.conversation;
          return finishCancel(current, keyHash, digest, input.reason);
        }

        case "recover-turn": {
          if (!current.pendingOperation) {
            throw new JarvisChatPolicyError(409, "recovery_not_available", "No interrupted Jarvis chat operation requires recovery.");
          }
          const original = current.pendingOperation;
          const recovery = recoveryRequest!;
          if (original.keyHash === recovery.keyHash) {
            throw new JarvisChatPolicyError(409, "idempotency_conflict", "Recovery requires a new idempotency key distinct from the interrupted action.");
          }
          if (original.action !== "delete_conversation") {
            assertLifecycleEvidenceCapacity(current, 2, 3);
          }
          let recovered: JarvisChatMutationResult;
          if (original.action === "create_conversation" || original.action === "append_turn") {
            recovered = await finishBinding(
              current,
              original.action,
              original.keyHash,
              original.requestDigest,
              original.action === "create_conversation" ? 201 : 200,
              recovery
            );
          } else if (original.action === "approve_turn") {
            recovered = await finishApproval(current, original.keyHash, original.requestDigest, recovery);
          } else if (original.action === "execute_turn") {
            const turn = current.turns.at(-1)!;
            const binding = turn.runBinding!;
            const run = await lifecycle.reconcileRun({
              conversationId: current.conversationId,
              turnId: turn.turnId,
              ownershipBindingId: turn.ownershipBindingId,
              runId: binding.sourceRunId,
            });
            if (current.state === "stopping" && (run.state === "approved" || run.state === "canceled")) {
              recovered = await finishStoppedBeforeExecution(current, original.keyHash, original.requestDigest, recovery);
            } else if (run.state === "approved") {
              recovered = await finishExecution(current, original.keyHash, original.requestDigest, recovery);
            } else {
              const result: JarvisChatLifecycleExecutionResult = {
                run,
                outputText: run.execution?.outputText ?? null,
                replayed: true,
                responseStatus: run.execution?.responseStatus ?? 500,
                errorCode: run.execution?.errorCode ?? null,
                safeErrorMessage: run.execution?.safeErrorMessage ?? null,
              };
              recovered = await finalizeExecution(
                current.conversationId,
                original.keyHash,
                original.requestDigest,
                result,
                recovery
              );
            }
          } else if (original.action === "cancel_turn") {
            recovered = await finishCancel(
              current,
              original.keyHash,
              original.requestDigest,
              original.cancellationReason!,
              recovery
            );
          } else if (original.action === "delete_conversation") {
            const deleted = await persistence.deleteConversation({
              expected: current,
              deletionKeyHash: original.keyHash,
              deletionRequestDigest: original.requestDigest,
              deletionRequestId: original.operationId,
              deletionAuditId: deletionAuditId(original.operationId),
              recovery,
              deletedAt: nextTimestamp(current.updatedAt, now),
            });
            return deletionResult(deleted, false);
          } else {
            throw new JarvisChatPolicyError(409, "recovery_not_available", "This local operation does not require provider recovery.");
          }
          return asRecoveryResult(recovered!, recovery);
        }

        case "rename-conversation": {
          if (current.pendingOperation || !APPENDABLE_STATES.has(current.state)) {
            throw new JarvisChatPolicyError(409, "rename_not_available", "Rename is available after the current turn reaches a terminal state.");
          }
          assertLifecycleEvidenceCapacity(current, 1, 1);
          const at = nextTimestamp(current.updatedAt, now);
          const event = audit(current, {
            eventType: "conversation.renamed",
            actor: "local-operator",
            resultingState: current.state,
            timestamp: at,
            summary: "Conversation title renamed locally.",
          });
          const provisional = sealRevision(
            current,
            { title: input.title, auditEvents: [...current.auditEvents, event] },
            at
          );
          const completed = completionEvidence(provisional, {
            action: "rename_conversation",
            keyHash,
            requestDigest: digest,
            responseStatus: 200,
            createdAt: at,
          });
          return commitDirectCompletion(current, completed, "rename_conversation", keyHash, digest);
        }

        case "delete-conversation": {
          if (current.pendingOperation?.action === "delete_conversation") {
            assertOperation(current, "delete_conversation", keyHash, digest);
            try {
              const deleted = await persistence.deleteConversation({
                expected: current,
                deletionKeyHash: keyHash,
                deletionRequestDigest: digest,
                deletionRequestId: current.pendingOperation.operationId,
                deletionAuditId: deletionAuditId(current.pendingOperation.operationId),
                recovery: null,
                deletedAt: nextTimestamp(current.updatedAt, now),
              });
              return deletionResult(deleted, true);
            } catch (error) {
              if (
                error instanceof JarvisChatPolicyError &&
                (error.code === "revision_conflict" || error.code === "conversation_not_found")
              ) {
                const completedDeletion = await persistence.getDeletionTombstone(
                  conversationId,
                  { kind: "deletion", keyHash, requestDigest: digest }
                );
                if (completedDeletion) {
                  return deletionResult(completedDeletion.tombstone, true);
                }
              }
              throw error;
            }
          }
          if (
            input.confirmationConversationId !== conversationId ||
            current.pendingOperation ||
            !APPENDABLE_STATES.has(current.state)
          ) {
            throw new JarvisChatPolicyError(409, "deletion_not_available", "Delete requires the exact conversation confirmation after a terminal turn.");
          }
          assertEvidenceCapacity(current, 0, 1);
          const at = nextTimestamp(current.updatedAt, now);
          const event = audit(current, {
            eventType: "conversation.deletion_requested",
            actor: "local-operator",
            resultingState: "deleting",
            timestamp: at,
            summary: "Explicit local conversation deletion requested and confirmed.",
          });
          const deleting = sealRevision(
            current,
            {
              state: "deleting",
              auditEvents: [...current.auditEvents, event],
              pendingOperation: pendingOperation("delete_conversation", keyHash, digest, current.revision + 1, at),
            },
            at
          );
          let deletionIntentPublishedByThisCall = false;
          try {
            current = await persistence.commitConversation({ expected: current, next: deleting });
            deletionIntentPublishedByThisCall = true;
          } catch (error) {
            if (
              !(error instanceof JarvisChatPolicyError) ||
              (error.code !== "revision_conflict" && error.code !== "conversation_not_found")
            ) throw error;
            const deletionLookup = await persistence.getDeletionTombstone(conversationId, {
              kind: "deletion",
              keyHash,
              requestDigest: digest,
            });
            if (deletionLookup) {
              return deletionResult(deletionLookup.tombstone, true);
            }
            if (error.code === "conversation_not_found") throw error;
            try {
              current = await persistence.getConversation(conversationId);
            } catch (readError) {
              if (
                readError instanceof JarvisChatPolicyError &&
                readError.code === "conversation_not_found"
              ) {
                const completedDeletion = await persistence.getDeletionTombstone(
                  conversationId,
                  {
                    kind: "deletion",
                    keyHash,
                    requestDigest: digest,
                  }
                );
                if (completedDeletion) {
                  return deletionResult(completedDeletion.tombstone, true);
                }
              }
              throw readError;
            }
            assertOperation(current, "delete_conversation", keyHash, digest);
          }
          try {
            const deleted = await persistence.deleteConversation({
              expected: current,
              deletionKeyHash: keyHash,
              deletionRequestDigest: digest,
              deletionRequestId: current.pendingOperation!.operationId,
              deletionAuditId: deletionAuditId(current.pendingOperation!.operationId),
              recovery: null,
              deletedAt: at,
            });
            return deletionResult(deleted, !deletionIntentPublishedByThisCall);
          } catch (error) {
            if (
              error instanceof JarvisChatPolicyError &&
              (error.code === "revision_conflict" || error.code === "conversation_not_found")
            ) {
              const completedDeletion = await persistence.getDeletionTombstone(
                conversationId,
                { kind: "deletion", keyHash, requestDigest: digest }
              );
              if (completedDeletion) {
                return deletionResult(
                  completedDeletion.tombstone,
                  !deletionIntentPublishedByThisCall
                );
              }
            }
            throw error;
          }
        }
      }
    },
  };
}
