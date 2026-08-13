import {
  JARVIS_CHAT_AUDIT_EVENT_TYPES,
  JARVIS_CHAT_CONVERSATION_STATES,
  JARVIS_CHAT_ENVELOPE_VERSION,
  JARVIS_CHAT_MUTATION_ACTIONS,
  JARVIS_CHAT_TURN_STATES,
  type JarvisChatActionInput,
  type JarvisChatActionResult,
  type JarvisChatAuditEvent,
  type JarvisChatContextMessageReference,
  type JarvisChatConversation,
  type JarvisChatConversationState,
  type JarvisChatConversationSummary,
  type JarvisChatCreateConversationInput,
  type JarvisChatDeletionAuditEvent,
  type JarvisChatIdempotencyRecord,
  type JarvisChatMessage,
  type JarvisChatMutationAction,
  type JarvisChatMutationResult,
  type JarvisChatPendingOperation,
  type JarvisChatProviderEnvelope,
  type JarvisChatRunBinding,
  type JarvisChatRuntimeStatus,
  type JarvisChatTurn,
  type JarvisChatTurnState,
} from "./jarvis-chat-types";

const API_BASE = "/api/codexforge/jarvis-chat";
const ID24 = /^[a-f0-9]{24}$/u;
const ID32 = /^[a-f0-9]{32}$/u;
const DIGEST = /^[a-f0-9]{64}$/u;
const SAFE_CODE = /^[a-z][a-z0-9_]{0,63}$/u;
const ALLOWED_TARGET = new RegExp(
  `^${API_BASE.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&")}(?:/status|/conversations(?:/[a-f0-9]{24}(?:/actions)?)?)$`,
  "u"
);
const STATES = new Set<string>(JARVIS_CHAT_CONVERSATION_STATES);
const TURN_STATES = new Set<string>(JARVIS_CHAT_TURN_STATES);
const AUDIT_TYPES = new Set<string>(JARVIS_CHAT_AUDIT_EVENT_TYPES);
const ACTIONS = new Set<string>(JARVIS_CHAT_MUTATION_ACTIONS);
const RETAINED_MUTATION_KEY_LIMIT = 8;
type RetainedMutationKey = Readonly<{
  action: JarvisChatMutationAction;
  canonicalRequest: string;
  conversationId: string | null;
  idempotencyKey: string;
}>;
const retainedMutationKeys = new Map<string, RetainedMutationKey>();

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

export type JarvisChatRetainedMutationReconciliation = Readonly<{
  retiredSignatures: readonly string[];
  retiredCount: number;
}>;

export function buildJarvisChatMutationSignature(
  conversationId: string | null,
  input: JarvisChatCreateConversationInput | JarvisChatActionInput
): string {
  const body = JSON.stringify(input);
  return conversationId === null
    ? `POST\0${API_BASE}/conversations\0${body}`
    : `POST\0${API_BASE}/conversations/${conversationId}/actions\0${body}`;
}

export class JarvisChatApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string
  ) {
    super(message.slice(0, 240));
    this.name = "JarvisChatApiError";
  }
}

function record(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function exact(value: Record<string, unknown>, keys: readonly string[]): boolean {
  const actual = Object.keys(value).sort();
  const expected = [...keys].sort();
  return actual.length === expected.length && actual.every((key, index) => key === expected[index]);
}

function positive(value: unknown): value is number {
  return Number.isSafeInteger(value) && (value as number) > 0;
}

function nonnegative(value: unknown): value is number {
  return Number.isSafeInteger(value) && (value as number) >= 0;
}

function iso(value: unknown): value is string {
  return typeof value === "string" && Number.isFinite(Date.parse(value)) && new Date(Date.parse(value)).toISOString() === value;
}

function malformed(message: string): never {
  throw new JarvisChatApiError(502, "malformed_server_response", message);
}

function canonicalizeMutationRequest(value: unknown): string {
  if (value === null) return "null";
  if (typeof value === "string" || typeof value === "boolean") return JSON.stringify(value);
  if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new Error("Jarvis chat mutation request contains a non-finite number.");
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) return `[${value.map(canonicalizeMutationRequest).join(",")}]`;
  if (typeof value === "object") {
    const item = value as Record<string, unknown>;
    return `{${Object.keys(item).sort().map((key) => `${JSON.stringify(key)}:${canonicalizeMutationRequest(item[key])}`).join(",")}}`;
  }
  throw new Error("Jarvis chat mutation request contains an unsupported value.");
}

async function browserSha256(value: string): Promise<string> {
  const subtle = globalThis.crypto?.subtle;
  if (!subtle) {
    throw new JarvisChatApiError(
      502,
      "reconciliation_unavailable",
      "This browser cannot verify retained Jarvis chat mutation evidence."
    );
  }
  const digest = await subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (entry) => entry.toString(16).padStart(2, "0")).join("");
}

async function retainedKeyHash(entry: RetainedMutationKey): Promise<string> {
  return browserSha256(
    `codexforge.jarvis-chat.idempotency.v1\u0000${entry.conversationId ?? "create"}\u0000${entry.idempotencyKey}`
  );
}

function conversationId(value: unknown): string {
  if (typeof value !== "string" || !ID24.test(value)) malformed("Jarvis chat response contained an invalid conversation ID.");
  return value;
}

function approvedTarget(target: string): string {
  if (!ALLOWED_TARGET.test(target)) throw new Error("Jarvis chat API target is not allowlisted.");
  return target;
}

function readMessage(value: unknown, role: "user" | "assistant"): JarvisChatMessage {
  const item = record(value);
  if (
    !item ||
    !exact(item, ["messageId", "role", "text", "textDigest", "createdAt"]) ||
    typeof item.messageId !== "string" ||
    !ID24.test(item.messageId) ||
    item.role !== role ||
    typeof item.text !== "string" ||
    typeof item.textDigest !== "string" ||
    !DIGEST.test(item.textDigest) ||
    !iso(item.createdAt)
  ) malformed("Jarvis chat response contained a malformed message.");
  return {
    messageId: item.messageId,
    role,
    text: item.text,
    textDigest: item.textDigest,
    createdAt: item.createdAt,
  };
}

function readContextReference(value: unknown): JarvisChatContextMessageReference {
  const item = record(value);
  if (
    !item ||
    !exact(item, ["messageId", "role", "textDigest"]) ||
    typeof item.messageId !== "string" ||
    !ID24.test(item.messageId) ||
    (item.role !== "user" && item.role !== "assistant") ||
    typeof item.textDigest !== "string" ||
    !DIGEST.test(item.textDigest)
  ) malformed("Jarvis chat response contained a malformed context reference.");
  return { messageId: item.messageId, role: item.role, textDigest: item.textDigest };
}

function readEnvelope(value: unknown): JarvisChatProviderEnvelope {
  const item = record(value);
  if (
    !item ||
    !exact(item, ["envelopeVersion", "providerVisibleRequest", "requestDigest", "utf8Bytes", "contextMessages", "omittedEarlierMessageCount"]) ||
    item.envelopeVersion !== JARVIS_CHAT_ENVELOPE_VERSION ||
    typeof item.providerVisibleRequest !== "string" ||
    typeof item.requestDigest !== "string" ||
    !DIGEST.test(item.requestDigest) ||
    !nonnegative(item.utf8Bytes) ||
    new TextEncoder().encode(item.providerVisibleRequest).byteLength !== item.utf8Bytes ||
    !Array.isArray(item.contextMessages) ||
    !nonnegative(item.omittedEarlierMessageCount)
  ) malformed("Jarvis chat response contained a malformed provider envelope.");
  const contextMessages = item.contextMessages.map(readContextReference);
  const ids = new Set(contextMessages.map((entry) => entry.messageId));
  if (ids.size !== contextMessages.length) malformed("Jarvis chat response contained duplicate context references.");
  return {
    envelopeVersion: JARVIS_CHAT_ENVELOPE_VERSION,
    providerVisibleRequest: item.providerVisibleRequest,
    requestDigest: item.requestDigest,
    utf8Bytes: item.utf8Bytes,
    contextMessages,
    omittedEarlierMessageCount: item.omittedEarlierMessageCount,
  };
}

function readBinding(value: unknown, ownershipBindingId: string, envelopeDigest: string): JarvisChatRunBinding | null {
  if (value === null) return null;
  const item = record(value);
  if (
    !item ||
    !exact(item, ["sourceRunId", "ownershipBindingId", "runRevision", "approvalScopeHash", "requestEnvelopeDigest", "providerKey", "modelKey", "runtimeModel", "dataBoundary", "maximumOutputTokens"]) ||
    typeof item.sourceRunId !== "string" ||
    !ID24.test(item.sourceRunId) ||
    item.ownershipBindingId !== ownershipBindingId ||
    !positive(item.runRevision) ||
    typeof item.approvalScopeHash !== "string" ||
    !DIGEST.test(item.approvalScopeHash) ||
    item.requestEnvelopeDigest !== envelopeDigest ||
    item.providerKey !== "ollama-local" ||
    item.modelKey !== "ollama-local::gpt-oss:20b" ||
    item.runtimeModel !== "gpt-oss:20b" ||
    item.dataBoundary !== "local-machine" ||
    item.maximumOutputTokens !== 4096
  ) malformed("Jarvis chat response contained an invalid run binding.");
  return {
    sourceRunId: item.sourceRunId,
    ownershipBindingId,
    runRevision: item.runRevision,
    approvalScopeHash: item.approvalScopeHash,
    requestEnvelopeDigest: item.requestEnvelopeDigest,
    providerKey: "ollama-local",
    modelKey: "ollama-local::gpt-oss:20b",
    runtimeModel: "gpt-oss:20b",
    dataBoundary: "local-machine",
    maximumOutputTokens: 4096,
  };
}

function readTurn(value: unknown): JarvisChatTurn {
  const item = record(value);
  if (
    !item ||
    !exact(item, ["turnId", "ordinal", "state", "userMessage", "assistantMessage", "contextMode", "ownershipBindingId", "envelope", "runBinding", "failureCode", "safeFailureMessage", "requestedAt", "updatedAt"]) ||
    typeof item.turnId !== "string" ||
    !ID24.test(item.turnId) ||
    !positive(item.ordinal) ||
    typeof item.state !== "string" ||
    !TURN_STATES.has(item.state) ||
    (item.contextMode !== "none" && item.contextMode !== "conversation") ||
    typeof item.ownershipBindingId !== "string" ||
    !ID32.test(item.ownershipBindingId) ||
    !iso(item.requestedAt) ||
    !iso(item.updatedAt) ||
    Date.parse(item.updatedAt) < Date.parse(item.requestedAt)
  ) malformed("Jarvis chat response contained a malformed turn.");
  const userMessage = readMessage(item.userMessage, "user");
  const assistantMessage = item.assistantMessage === null ? null : readMessage(item.assistantMessage, "assistant");
  const envelope = readEnvelope(item.envelope);
  const runBinding = readBinding(item.runBinding, item.ownershipBindingId, envelope.requestDigest);
  const failure = item.state === "failed" || item.state === "rejected";
  if (
    userMessage.createdAt !== item.requestedAt ||
    (item.state === "succeeded") !== (assistantMessage !== null) ||
    (assistantMessage !== null && assistantMessage.createdAt !== item.updatedAt) ||
    (runBinding === null && !["binding", "failed", "rejected"].includes(item.state)) ||
    (runBinding !== null && item.state === "binding") ||
    failure !== (typeof item.failureCode === "string" && typeof item.safeFailureMessage === "string") ||
    (item.failureCode !== null && (typeof item.failureCode !== "string" || !SAFE_CODE.test(item.failureCode))) ||
    (item.safeFailureMessage !== null && typeof item.safeFailureMessage !== "string")
  ) malformed("Jarvis chat response contained an inconsistent turn.");
  return {
    turnId: item.turnId,
    ordinal: item.ordinal,
    state: item.state as JarvisChatTurnState,
    userMessage,
    assistantMessage,
    contextMode: item.contextMode,
    ownershipBindingId: item.ownershipBindingId,
    envelope,
    runBinding,
    failureCode: item.failureCode as string | null,
    safeFailureMessage: item.safeFailureMessage as string | null,
    requestedAt: item.requestedAt,
    updatedAt: item.updatedAt,
  };
}

function readAudit(value: unknown): JarvisChatAuditEvent {
  const item = record(value);
  if (
    !item ||
    !exact(item, ["auditId", "eventType", "actor", "turnId", "previousState", "resultingState", "timestamp", "summary", "sourceRunId"]) ||
    typeof item.auditId !== "string" ||
    !ID24.test(item.auditId) ||
    typeof item.eventType !== "string" ||
    !AUDIT_TYPES.has(item.eventType) ||
    (item.actor !== "local-operator" && item.actor !== "system") ||
    typeof item.turnId !== "string" ||
    !ID24.test(item.turnId) ||
    (item.previousState !== null && (typeof item.previousState !== "string" || !STATES.has(item.previousState))) ||
    typeof item.resultingState !== "string" ||
    !STATES.has(item.resultingState) ||
    !iso(item.timestamp) ||
    typeof item.summary !== "string" ||
    (item.sourceRunId !== null && (typeof item.sourceRunId !== "string" || !ID24.test(item.sourceRunId)))
  ) malformed("Jarvis chat response contained malformed audit evidence.");
  return item as unknown as JarvisChatAuditEvent;
}

function readIdempotency(value: unknown): JarvisChatIdempotencyRecord {
  const item = record(value);
  if (
    !item ||
    !exact(item, ["requestId", "action", "keyHash", "requestDigest", "resultingRevision", "responseStatus", "responseClassification", "responseDigest", "createdAt"]) ||
    typeof item.requestId !== "string" ||
    !ID32.test(item.requestId) ||
    typeof item.action !== "string" ||
    !ACTIONS.has(item.action) ||
    typeof item.keyHash !== "string" ||
    !DIGEST.test(item.keyHash) ||
    typeof item.requestDigest !== "string" ||
    !DIGEST.test(item.requestDigest) ||
    !positive(item.resultingRevision) ||
    (item.responseStatus !== 200 && item.responseStatus !== 201) ||
    item.responseClassification !== "conversation" ||
    typeof item.responseDigest !== "string" ||
    !DIGEST.test(item.responseDigest) ||
    !iso(item.createdAt)
  ) malformed("Jarvis chat response contained malformed replay evidence.");
  return item as unknown as JarvisChatIdempotencyRecord;
}

function readPending(value: unknown): JarvisChatPendingOperation | null {
  if (value === null) return null;
  const item = record(value);
  if (
    !item ||
    !exact(item, ["operationId", "action", "keyHash", "requestDigest", "cancellationReason", "startedRevision", "startedAt"]) ||
    typeof item.operationId !== "string" ||
    !ID32.test(item.operationId) ||
    typeof item.action !== "string" ||
    !ACTIONS.has(item.action) ||
    item.action === "stop_turn" ||
    typeof item.keyHash !== "string" ||
    !DIGEST.test(item.keyHash) ||
    typeof item.requestDigest !== "string" ||
    !DIGEST.test(item.requestDigest) ||
    (item.cancellationReason !== null && typeof item.cancellationReason !== "string") ||
    (item.action === "cancel_turn") !== (typeof item.cancellationReason === "string") ||
    !positive(item.startedRevision) ||
    !iso(item.startedAt)
  ) malformed("Jarvis chat response contained a malformed pending operation.");
  return item as unknown as JarvisChatPendingOperation;
}

const STATE_BY_TURN: Readonly<Record<JarvisChatTurnState, JarvisChatConversationState>> = {
  binding: "binding", awaiting_approval: "awaiting_approval", approved: "approved", executing: "executing",
  stopping: "stopping", succeeded: "ready", stopped: "stopped", rejected: "rejected", failed: "failed", canceled: "canceled",
};

function readConversation(value: unknown, expectedId?: string): JarvisChatConversation {
  const item = record(value);
  if (
    !item ||
    !exact(item, ["recordVersion", "conversationId", "title", "state", "revision", "createdAt", "updatedAt", "currentTurnId", "turns", "auditEvents", "idempotencyRecords", "pendingOperation", "previousRecordDigest", "recordDigest"]) ||
    item.recordVersion !== 1 ||
    typeof item.conversationId !== "string" ||
    !ID24.test(item.conversationId) ||
    (expectedId !== undefined && item.conversationId !== expectedId) ||
    typeof item.title !== "string" ||
    typeof item.state !== "string" ||
    !STATES.has(item.state) ||
    !positive(item.revision) ||
    !iso(item.createdAt) ||
    !iso(item.updatedAt) ||
    typeof item.currentTurnId !== "string" ||
    !ID24.test(item.currentTurnId) ||
    !Array.isArray(item.turns) ||
    item.turns.length < 1 ||
    !Array.isArray(item.auditEvents) ||
    !Array.isArray(item.idempotencyRecords) ||
    (item.previousRecordDigest !== null && (typeof item.previousRecordDigest !== "string" || !DIGEST.test(item.previousRecordDigest))) ||
    typeof item.recordDigest !== "string" ||
    !DIGEST.test(item.recordDigest)
  ) malformed("Jarvis chat response contained a malformed conversation.");
  const turns = item.turns.map(readTurn);
  const audits = item.auditEvents.map(readAudit);
  const idempotencyRecords = item.idempotencyRecords.map(readIdempotency);
  const pendingOperation = readPending(item.pendingOperation);
  const turnIds = new Set(turns.map((turn) => turn.turnId));
  const messageIds = new Set(turns.flatMap((turn) => [turn.userMessage.messageId, ...(turn.assistantMessage ? [turn.assistantMessage.messageId] : [])]));
  const auditIds = new Set(audits.map((entry) => entry.auditId));
  const keyHashes = new Set(idempotencyRecords.map((entry) => entry.keyHash));
  if (
    turnIds.size !== turns.length ||
    messageIds.size !== turns.reduce((count, turn) => count + 1 + (turn.assistantMessage ? 1 : 0), 0) ||
    auditIds.size !== audits.length ||
    keyHashes.size !== idempotencyRecords.length ||
    turns.some((turn, index) => turn.ordinal !== index + 1) ||
    turns.at(-1)?.turnId !== item.currentTurnId ||
    (item.state !== "deleting" && STATE_BY_TURN[turns.at(-1)!.state] !== item.state) ||
    audits.some((entry) => !turnIds.has(entry.turnId)) ||
    audits.at(-1)?.resultingState !== item.state ||
    idempotencyRecords.some((entry) => entry.resultingRevision > (item.revision as number)) ||
    (pendingOperation !== null && (pendingOperation.startedRevision > (item.revision as number) || keyHashes.has(pendingOperation.keyHash)))
  ) malformed("Jarvis chat response contained inconsistent conversation evidence.");
  return {
    recordVersion: 1,
    conversationId: item.conversationId,
    title: item.title,
    state: item.state as JarvisChatConversationState,
    revision: item.revision,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    currentTurnId: item.currentTurnId,
    turns,
    auditEvents: audits,
    idempotencyRecords,
    pendingOperation,
    previousRecordDigest: item.previousRecordDigest as string | null,
    recordDigest: item.recordDigest,
  };
}

function readSummary(value: unknown): JarvisChatConversationSummary {
  const item = record(value);
  if (
    !item ||
    !exact(item, ["conversationId", "title", "state", "revision", "turnCount", "createdAt", "updatedAt", "lastMessagePreview"]) ||
    typeof item.conversationId !== "string" || !ID24.test(item.conversationId) ||
    typeof item.title !== "string" || typeof item.state !== "string" || !STATES.has(item.state) ||
    !positive(item.revision) ||
    (item.state === "deleting"
      ? item.turnCount !== 0
      : !positive(item.turnCount) || (item.turnCount as number) > 8) ||
    !iso(item.createdAt) || !iso(item.updatedAt) ||
    typeof item.lastMessagePreview !== "string" || item.lastMessagePreview.length > 240 ||
    item.title.length < 1 || item.title.length > 80
  ) malformed("Jarvis chat response contained a malformed conversation summary.");
  return item as unknown as JarvisChatConversationSummary;
}

function success(payload: unknown): unknown {
  const item = record(payload);
  if (!item || !exact(item, ["ok", "result"]) || item.ok !== true) malformed("Jarvis chat response was malformed.");
  return item.result;
}

function readDeletionAuditEvent(value: unknown): JarvisChatDeletionAuditEvent {
  const item = record(value);
  if (
    !item ||
    !exact(item, ["eventType", "auditId", "actor", "previousState", "resultingState", "timestamp", "summary"]) ||
    item.eventType !== "conversation.deleted" ||
    typeof item.auditId !== "string" || !ID24.test(item.auditId) ||
    item.actor !== "system" ||
    item.previousState !== "deleting" ||
    item.resultingState !== "deleted" ||
    !iso(item.timestamp) ||
    typeof item.summary !== "string" || item.summary.length < 1 || item.summary.length > 240
  ) malformed("Jarvis chat deletion response contained malformed audit evidence.");
  return {
    eventType: "conversation.deleted",
    auditId: item.auditId,
    actor: "system",
    previousState: "deleting",
    resultingState: "deleted",
    timestamp: item.timestamp,
    summary: item.summary,
  };
}

function readMutation(payload: unknown, httpStatus: number, expectedId?: string): JarvisChatActionResult {
  const item = record(success(payload));
  if (!item || typeof item.replayed !== "boolean" || (item.responseStatus !== 200 && item.responseStatus !== 201) || item.responseStatus !== httpStatus) {
    malformed("Jarvis chat mutation response status was inconsistent.");
  }
  if (item.deleted === true) {
    if (
      !exact(item, ["conversationId", "deleted", "replayed", "responseStatus", "deletionAuditId", "deletionEvent", "tombstoneDigest", "deletedAt"]) ||
      item.responseStatus !== 200 ||
      typeof item.deletionAuditId !== "string" || !ID24.test(item.deletionAuditId) ||
      typeof item.tombstoneDigest !== "string" || !DIGEST.test(item.tombstoneDigest) ||
      !iso(item.deletedAt)
    ) malformed("Jarvis chat deletion response was malformed.");
    const id = conversationId(item.conversationId);
    if (expectedId !== undefined && id !== expectedId) malformed("Jarvis chat deletion response crossed conversation ownership.");
    const deletionEvent = readDeletionAuditEvent(item.deletionEvent);
    if (deletionEvent.auditId !== item.deletionAuditId || deletionEvent.timestamp !== item.deletedAt) {
      malformed("Jarvis chat deletion response audit linkage was inconsistent.");
    }
    return {
      conversationId: id,
      deleted: true,
      replayed: item.replayed,
      responseStatus: 200,
      deletionAuditId: item.deletionAuditId,
      deletionEvent,
      tombstoneDigest: item.tombstoneDigest,
      deletedAt: item.deletedAt,
    };
  }
  if (!exact(item, ["conversation", "replayed", "responseStatus"])) malformed("Jarvis chat mutation response was malformed.");
  return { conversation: readConversation(item.conversation, expectedId), replayed: item.replayed, responseStatus: item.responseStatus };
}

function readRuntimeStatus(payload: unknown): JarvisChatRuntimeStatus {
  const item = record(success(payload));
  if (
    !item ||
    !exact(item, ["providerKey", "modelKey", "runtimeModel", "dataBoundary", "maximumOutputTokens", "costClass", "approvalMode", "streaming", "memory", "killSwitchEngaged", "executionPermittedByPolicy", "providerAvailability"]) ||
    item.providerKey !== "ollama-local" || item.modelKey !== "ollama-local::gpt-oss:20b" || item.runtimeModel !== "gpt-oss:20b" ||
    item.dataBoundary !== "local-machine" || item.maximumOutputTokens !== 4096 || item.costClass !== "local-no-provider-token-charge" ||
    item.approvalMode !== "manual-approval-then-separate-execution" || item.streaming !== "unavailable" ||
    item.memory !== "current-conversation-or-none" || typeof item.killSwitchEngaged !== "boolean" ||
    typeof item.executionPermittedByPolicy !== "boolean" || item.executionPermittedByPolicy === item.killSwitchEngaged ||
    item.providerAvailability !== "not-checked"
  ) malformed("Jarvis chat runtime status was malformed.");
  return item as unknown as JarvisChatRuntimeStatus;
}

async function readPayload(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type")?.split(";", 1)[0]?.trim().toLowerCase();
  if (contentType !== "application/json") malformed("Jarvis chat response content type was not JSON.");
  const source = await response.text();
  if (!source.trim()) malformed("Jarvis chat response was empty.");
  try { return JSON.parse(source) as unknown; } catch { return malformed("Jarvis chat response was not valid JSON."); }
}

async function requestJarvisChat<T>(target: string, init: RequestInit, read: (payload: unknown, status: number) => T): Promise<T> {
  const response = await fetch(approvedTarget(target), {
    ...init,
    cache: "no-store",
    redirect: "error",
  });
  const payload = await readPayload(response);
  if (!response.ok) {
    const outer = record(payload);
    const error = outer && exact(outer, ["ok", "error"]) && outer.ok === false ? record(outer.error) : null;
    const code = error && exact(error, ["code", "message"]) && typeof error.code === "string" && SAFE_CODE.test(error.code)
      ? error.code : "request_failed";
    const message = error && typeof error.message === "string" && error.message.trim()
      ? error.message : `Jarvis chat request failed with status ${response.status}.`;
    throw new JarvisChatApiError(response.status, code, message);
  }
  return read(payload, response.status);
}

export function buildJarvisChatClientIdempotencyKey(): string {
  const id = globalThis.crypto?.randomUUID?.();
  if (!id) throw new Error("Browser random UUID support is required for Jarvis chat.");
  return `jarvis-chat-ui-${id}`;
}

async function requestRetainedMutation<T>(
  signature: string,
  suppliedKey: string | undefined,
  evidence: Readonly<{
    action: JarvisChatMutationAction;
    canonicalRequest: string;
    conversationId: string | null;
  }>,
  request: (idempotencyKey: string) => Promise<T>
): Promise<T> {
  const retained = suppliedKey === undefined ? retainedMutationKeys.get(signature) : undefined;
  let idempotencyKey = suppliedKey ?? retained?.idempotencyKey;
  if (!idempotencyKey) {
    if (retainedMutationKeys.size >= RETAINED_MUTATION_KEY_LIMIT) {
      throw new JarvisChatApiError(
        409,
        "uncertain_mutation_limit",
        "Resolve or refresh the existing uncertain Jarvis chat request before starting another."
      );
    }
    idempotencyKey = buildJarvisChatClientIdempotencyKey();
    retainedMutationKeys.set(signature, { ...evidence, idempotencyKey });
  }
  try {
    const result = await request(idempotencyKey);
    if (retainedMutationKeys.get(signature)?.idempotencyKey === idempotencyKey) {
      retainedMutationKeys.delete(signature);
    }
    return result;
  } catch (error) {
    const ambiguous =
      !(error instanceof JarvisChatApiError) ||
      error.status >= 500 ||
      [
        "malformed_server_response",
        "concurrent_create_conflict",
        "lifecycle_conflict",
      ].includes(error.code);
    if (!ambiguous) {
      if (retainedMutationKeys.get(signature)?.idempotencyKey === idempotencyKey) {
        retainedMutationKeys.delete(signature);
      }
    }
    throw error;
  }
}

export async function reconcileJarvisChatRetainedMutations(
  conversation: JarvisChatConversation
): Promise<JarvisChatRetainedMutationReconciliation> {
  const candidates = Array.from(retainedMutationKeys.entries()).filter(([, entry]) =>
    entry.conversationId === null || entry.conversationId === conversation.conversationId
  );
  const retiredSignatures: string[] = [];
  for (const [signature, entry] of candidates) {
    const [keyHash, requestDigest] = await Promise.all([
      retainedKeyHash(entry),
      browserSha256(entry.canonicalRequest),
    ]);
    const evidence = conversation.idempotencyRecords.find((record) =>
      record.action === entry.action &&
      record.keyHash === keyHash &&
      record.requestDigest === requestDigest
    );
    if (evidence && retainedMutationKeys.get(signature) === entry) {
      retainedMutationKeys.delete(signature);
      retiredSignatures.push(signature);
    }
  }
  return { retiredSignatures, retiredCount: retiredSignatures.length };
}

export function listJarvisChatConversations(): Promise<readonly JarvisChatConversationSummary[]> {
  return requestJarvisChat(`${API_BASE}/conversations`, {}, (payload, status) => {
    if (status !== 200) malformed("Jarvis chat list response status was invalid.");
    const result = success(payload);
    if (!Array.isArray(result)) malformed("Jarvis chat list response was malformed.");
    const summaries = result.map(readSummary);
    if (new Set(summaries.map((entry) => entry.conversationId)).size !== summaries.length) malformed("Jarvis chat list contained duplicate conversations.");
    return summaries;
  });
}

export function fetchJarvisChatRuntimeStatus(): Promise<JarvisChatRuntimeStatus> {
  return requestJarvisChat(`${API_BASE}/status`, {}, (payload, status) => {
    if (status !== 200) malformed("Jarvis chat status response status was invalid.");
    return readRuntimeStatus(payload);
  });
}

export function fetchJarvisChatConversation(id: string): Promise<JarvisChatConversation> {
  const safeId = conversationId(id);
  return requestJarvisChat(`${API_BASE}/conversations/${safeId}`, {}, (payload, status) => {
    if (status !== 200) malformed("Jarvis chat conversation response status was invalid.");
    return readConversation(success(payload), safeId);
  });
}

export function createJarvisChatConversation(input: JarvisChatCreateConversationInput, idempotencyKey?: string): Promise<JarvisChatMutationResult> {
  const body = JSON.stringify(input);
  return requestRetainedMutation(
    buildJarvisChatMutationSignature(null, input),
    idempotencyKey,
    { action: "create_conversation", canonicalRequest: canonicalizeMutationRequest(input), conversationId: null },
    (exactKey) =>
      requestJarvisChat(`${API_BASE}/conversations`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": exactKey },
        body,
      }, (payload, status) => {
        const result = readMutation(payload, status);
        if (!("conversation" in result)) malformed("Jarvis chat create returned a deletion result.");
        return result;
      })
  );
}

export function actOnJarvisChatConversation(
  id: string,
  input: JarvisChatActionInput,
  idempotencyKey?: string,
  signal?: AbortSignal
): Promise<JarvisChatActionResult> {
  const safeId = conversationId(id);
  const target = `${API_BASE}/conversations/${safeId}/actions`;
  const body = JSON.stringify(input);
  return requestRetainedMutation(
    buildJarvisChatMutationSignature(safeId, input),
    idempotencyKey,
    { action: ACTION_BY_INPUT[input.action], canonicalRequest: canonicalizeMutationRequest(input), conversationId: safeId },
    (exactKey) =>
      requestJarvisChat(target, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": exactKey, "If-Match": `"${input.expectedRevision}"` },
        body,
        signal,
      }, (payload, status) => readMutation(payload, status, safeId))
  );
}
