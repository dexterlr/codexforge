import "server-only";

import { assertCreatorJsonHasUniqueObjectKeys } from "@/lib/codexforge/creator/creator-contract.server";
import {
  PrivateAlphaNativeFilesystemError,
  privateAlphaNativeRootExists,
  withPrivateAlphaNativeRoot,
  type CreatorNativeRoot,
} from "@/lib/codexforge/private-alpha/private-alpha-native-filesystem.server";
import { buildPrivateAlphaTestingDataRootLabel } from "@/lib/codexforge/private-alpha/private-alpha-store.server";
import { PRIVATE_ALPHA_DATA_ROOT_LABEL } from "@/lib/codexforge/private-alpha/private-alpha-validation";
import {
  hashJarvisChatCanonicalJson,
  hashJarvisChatSha256,
  serializeJarvisChatCanonicalJson,
} from "./jarvis-chat-crypto";
import { buildJarvisChatProviderEnvelope } from "./jarvis-chat-envelope.server";
import {
  isJarvisChatAuditEventType,
  isJarvisChatContextMode,
  isJarvisChatConversationState,
  isJarvisChatMutationAction,
  isJarvisChatTurnState,
  JARVIS_CHAT_MAX_ASSISTANT_MESSAGE_BYTES,
  JARVIS_CHAT_MAX_ASSISTANT_MESSAGE_CHARACTERS,
  JARVIS_CHAT_MAX_AUDIT_EVENTS,
  JARVIS_CHAT_MAX_CONVERSATIONS,
  JARVIS_CHAT_MAX_FAILURE_MESSAGE_CHARACTERS,
  JARVIS_CHAT_MAX_IDEMPOTENCY_RECORDS,
  JARVIS_CHAT_MAX_REVISIONS,
  JARVIS_CHAT_MAX_PROVIDER_REQUEST_BYTES,
  JARVIS_CHAT_MAX_PROVIDER_REQUEST_CHARACTERS,
  JARVIS_CHAT_MAX_RECORD_BYTES,
  JARVIS_CHAT_MAX_TITLE_CHARACTERS,
  JARVIS_CHAT_MAX_TURNS,
  JARVIS_CHAT_MAX_USER_MESSAGE_CHARACTERS,
  JarvisChatPolicyError,
} from "./jarvis-chat-policy";
import {
  JARVIS_CHAT_DATA_ROOT_SUBDIRECTORY,
  JARVIS_CHAT_ENVELOPE_VERSION,
  JARVIS_CHAT_RECORD_VERSION,
  type JarvisChatConversation,
  type JarvisChatConversationSummary,
  type JarvisChatDeletionTombstone,
  type JarvisChatIdempotencyRecord,
  type JarvisChatMessage,
  type JarvisChatPendingOperation,
  type JarvisChatTurn,
} from "./jarvis-chat-types";

const ROOT = [JARVIS_CHAT_DATA_ROOT_SUBDIRECTORY] as const;
const CONVERSATIONS = [...ROOT, "conversations"] as const;
const SLOTS = [...ROOT, "slots"] as const;
const MAX_SLOT_BYTES = 96_000;
const TERMINAL_TURN_STATES = new Set(["succeeded", "stopped", "rejected", "failed", "canceled"]);
const NATIVE_CONTENTION_ATTEMPTS = 4;
const TEST_CLEANUP_CONTENTION_ATTEMPTS = 16;
const TEST_CLEANUP_RETRY_DELAY_MS = 100;

type SlotState = "reserved" | "published" | "deleting" | "deleted";
type SlotRecord = Readonly<{
  version: 1;
  slot: number;
  state: SlotState;
  createKeyHash: string;
  createRequestDigest: string;
  conversationId: string;
  initialConversation: JarvisChatConversation | null;
  deletionKeyHash: string | null;
  deletionRequestDigest: string | null;
  deletionRequestId: string | null;
  deletionAuditId: string | null;
  recoveryKeyHash: string | null;
  recoveryRequestDigest: string | null;
  recoveryRequestId: string | null;
  deletedTitleDigest: string | null;
  finalRevision: number | null;
  finalRecordDigest: string | null;
  deletedAt: string | null;
  recordDigest: string;
}>;

type DeletionTombstoneLookup = Readonly<{
  tombstone: JarvisChatDeletionTombstone;
  recoveryClaimed: boolean;
}>;

export type JarvisChatPersistenceTestingHooks = Readonly<{
  afterDeletionSlotMarkedDeleting?: () => void;
  afterDeletionRecoveryClaimed?: () => void;
}>;

export type JarvisChatPersistence = Readonly<{
  createConversation: (input: {
    conversation: JarvisChatConversation;
    createKeyHash: string;
    requestDigest: string;
  }) => Promise<{ conversation: JarvisChatConversation; created: boolean }>;
  getConversation: (conversationId: string) => Promise<JarvisChatConversation>;
  getConversationRevision: (conversationId: string, revision: number) => Promise<JarvisChatConversation>;
  listConversations: (limit: number) => Promise<readonly JarvisChatConversationSummary[]>;
  commitConversation: (input: {
    expected: JarvisChatConversation;
    next: JarvisChatConversation;
  }) => Promise<JarvisChatConversation>;
  deleteConversation: (input: {
    expected: JarvisChatConversation;
    deletionKeyHash: string;
    deletionRequestDigest: string;
    deletionRequestId: string;
    deletionAuditId: string;
    recovery: Readonly<{
      keyHash: string;
      requestDigest: string;
      requestId: string;
    }> | null;
    deletedAt: string;
  }) => Promise<JarvisChatDeletionTombstone>;
  getDeletionTombstone: (
    conversationId: string,
    resume?:
      | Readonly<{ kind: "deletion"; keyHash: string; requestDigest: string }>
      | Readonly<{ kind: "recovery"; keyHash: string; requestDigest: string; requestId: string; expectedRevision: number }>
      | null
  ) => Promise<DeletionTombstoneLookup | null>;
  cleanupTestData: () => Promise<void>;
}>;

function object(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function hasKeys(value: Record<string, unknown>, expected: readonly string[]): boolean {
  const actual = Object.keys(value).sort();
  const keys = [...expected].sort();
  return actual.length === keys.length && actual.every((key, index) => key === keys[index]);
}

function hex(value: unknown, length: number): value is string {
  return typeof value === "string" && new RegExp(`^[a-f0-9]{${length}}$`, "u").test(value);
}

function iso(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/u.test(value)) return false;
  const milliseconds = Date.parse(value);
  return Number.isFinite(milliseconds) && new Date(milliseconds).toISOString() === value;
}

function boundedText(value: unknown, maximumCharacters: number, maximumBytes = Number.MAX_SAFE_INTEGER): value is string {
  return (
    typeof value === "string" &&
    value.length > 0 &&
    value.length <= maximumCharacters &&
    Buffer.byteLength(value, "utf8") <= maximumBytes &&
    !/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f\p{Cf}\p{Cs}]/u.test(value)
  );
}

function invalidPersistence(): never {
  throw new JarvisChatPolicyError(
    503,
    "chat_persistence_invalid",
    "Jarvis chat persistence is unavailable because its local evidence failed validation."
  );
}

function missingConversation(): never {
  throw new JarvisChatPolicyError(404, "conversation_not_found", "Jarvis chat conversation was not found.");
}

function canonicalEqual(left: unknown, right: unknown): boolean {
  return serializeJarvisChatCanonicalJson(left) === serializeJarvisChatCanonicalJson(right);
}

function recordWithoutDigest(value: JarvisChatConversation): Omit<JarvisChatConversation, "recordDigest"> {
  const { recordDigest: _digest, ...rest } = value;
  return rest;
}

export function sealJarvisChatConversation(
  value: Omit<JarvisChatConversation, "recordDigest">
): JarvisChatConversation {
  const { recordDigest: _ignored, ...exactValue } = value as JarvisChatConversation;
  return { ...exactValue, recordDigest: hashJarvisChatCanonicalJson(exactValue) };
}

export function buildJarvisChatConversationResponseDigest(
  conversation: JarvisChatConversation,
  responseStatus: 200 | 201
): string {
  const withoutRecordDigest = recordWithoutDigest(conversation);
  return hashJarvisChatCanonicalJson({
    conversation: {
      ...withoutRecordDigest,
      idempotencyRecords: withoutRecordDigest.idempotencyRecords.map(
        ({ responseDigest: _responseDigest, ...evidence }) => evidence
      ),
    },
    responseStatus,
  });
}

function assertMessage(value: unknown, expectedRole: "user" | "assistant"): JarvisChatMessage {
  const item = object(value);
  const maximumCharacters = expectedRole === "user"
    ? JARVIS_CHAT_MAX_USER_MESSAGE_CHARACTERS
    : JARVIS_CHAT_MAX_ASSISTANT_MESSAGE_CHARACTERS;
  const maximumBytes = expectedRole === "assistant"
    ? JARVIS_CHAT_MAX_ASSISTANT_MESSAGE_BYTES
    : Number.MAX_SAFE_INTEGER;
  if (
    !item ||
    !hasKeys(item, ["messageId", "role", "text", "textDigest", "createdAt"]) ||
    !hex(item.messageId, 24) ||
    item.role !== expectedRole ||
    !boundedText(item.text, maximumCharacters, maximumBytes) ||
    !hex(item.textDigest, 64) ||
    item.textDigest !== hashJarvisChatSha256(item.text as string) ||
    !iso(item.createdAt)
  ) invalidPersistence();
  return item as unknown as JarvisChatMessage;
}

function assertPendingOperation(value: unknown): JarvisChatPendingOperation | null {
  if (value === null) return null;
  const item = object(value);
  if (
    !item ||
    !hasKeys(item, ["operationId", "action", "keyHash", "requestDigest", "cancellationReason", "startedRevision", "startedAt"]) ||
    !hex(item.operationId, 32) ||
    !["create_conversation", "append_turn", "approve_turn", "execute_turn", "cancel_turn", "delete_conversation"].includes(item.action as string) ||
    !hex(item.keyHash, 64) ||
    !hex(item.requestDigest, 64) ||
    (item.cancellationReason !== null &&
      (item.action !== "cancel_turn" ||
        typeof item.cancellationReason !== "string" ||
        !boundedText(item.cancellationReason, 240))) ||
    (item.action === "cancel_turn" && item.cancellationReason === null) ||
    !Number.isSafeInteger(item.startedRevision) ||
    (item.startedRevision as number) < 1 ||
    !iso(item.startedAt)
  ) invalidPersistence();
  return item as unknown as JarvisChatPendingOperation;
}

function assertIdempotency(value: unknown): JarvisChatIdempotencyRecord {
  const item = object(value);
  if (
    !item ||
    !hasKeys(item, ["requestId", "action", "keyHash", "requestDigest", "resultingRevision", "responseStatus", "responseClassification", "responseDigest", "createdAt"]) ||
    !hex(item.requestId, 32) ||
    !isJarvisChatMutationAction(item.action) ||
    !hex(item.keyHash, 64) ||
    !hex(item.requestDigest, 64) ||
    !Number.isSafeInteger(item.resultingRevision) ||
    (item.resultingRevision as number) < 1 ||
    (item.responseStatus !== 200 && item.responseStatus !== 201) ||
    item.responseClassification !== "conversation" ||
    !hex(item.responseDigest, 64) ||
    !iso(item.createdAt)
  ) invalidPersistence();
  return item as unknown as JarvisChatIdempotencyRecord;
}

function assertTurnShape(value: unknown, ordinal: number): JarvisChatTurn {
  const item = object(value);
  if (
    !item ||
    !hasKeys(item, ["turnId", "ordinal", "state", "userMessage", "assistantMessage", "contextMode", "ownershipBindingId", "envelope", "runBinding", "failureCode", "safeFailureMessage", "requestedAt", "updatedAt"]) ||
    !hex(item.turnId, 24) ||
    item.ordinal !== ordinal ||
    !isJarvisChatTurnState(item.state) ||
    !isJarvisChatContextMode(item.contextMode) ||
    !hex(item.ownershipBindingId, 32) ||
    !iso(item.requestedAt) ||
    !iso(item.updatedAt) ||
    Date.parse(item.updatedAt as string) < Date.parse(item.requestedAt as string)
  ) invalidPersistence();
  const user = assertMessage(item.userMessage, "user");
  if (user.createdAt !== item.requestedAt) invalidPersistence();
  const assistant = item.assistantMessage === null ? null : assertMessage(item.assistantMessage, "assistant");
  const envelope = object(item.envelope);
  if (
    !envelope ||
    !hasKeys(envelope, ["envelopeVersion", "providerVisibleRequest", "requestDigest", "utf8Bytes", "contextMessages", "omittedEarlierMessageCount"]) ||
    envelope.envelopeVersion !== JARVIS_CHAT_ENVELOPE_VERSION ||
    !boundedText(envelope.providerVisibleRequest, JARVIS_CHAT_MAX_PROVIDER_REQUEST_CHARACTERS, JARVIS_CHAT_MAX_PROVIDER_REQUEST_BYTES) ||
    !hex(envelope.requestDigest, 64) ||
    envelope.requestDigest !== hashJarvisChatSha256(envelope.providerVisibleRequest as string) ||
    !Number.isSafeInteger(envelope.utf8Bytes) ||
    envelope.utf8Bytes !== Buffer.byteLength(envelope.providerVisibleRequest as string, "utf8") ||
    !Array.isArray(envelope.contextMessages) ||
    !Number.isSafeInteger(envelope.omittedEarlierMessageCount) ||
    (envelope.omittedEarlierMessageCount as number) < 0
  ) invalidPersistence();
  const binding = item.runBinding === null ? null : object(item.runBinding);
  if (
    binding &&
    (!hasKeys(binding, ["sourceRunId", "ownershipBindingId", "runRevision", "approvalScopeHash", "requestEnvelopeDigest", "providerKey", "modelKey", "runtimeModel", "dataBoundary", "maximumOutputTokens"]) ||
      !hex(binding.sourceRunId, 24) ||
      binding.ownershipBindingId !== item.ownershipBindingId ||
      !Number.isSafeInteger(binding.runRevision) ||
      (binding.runRevision as number) < 1 ||
      !hex(binding.approvalScopeHash, 64) ||
      binding.requestEnvelopeDigest !== envelope.requestDigest ||
      binding.providerKey !== "ollama-local" ||
      binding.modelKey !== "ollama-local::gpt-oss:20b" ||
      binding.runtimeModel !== "gpt-oss:20b" ||
      binding.dataBoundary !== "local-machine" ||
      binding.maximumOutputTokens !== 4096)
  ) invalidPersistence();
  if (binding === null && !["binding", "rejected", "failed"].includes(item.state as string)) invalidPersistence();
  if (binding !== null && item.state === "binding") invalidPersistence();
  if ((item.state === "succeeded") !== (assistant !== null)) invalidPersistence();
  if (assistant && assistant.createdAt !== item.updatedAt) invalidPersistence();
  const failureState = item.state === "failed" || item.state === "rejected";
  const hasFailureCode = typeof item.failureCode === "string";
  const hasFailureMessage = typeof item.safeFailureMessage === "string";
  if (
    failureState !== (hasFailureCode && hasFailureMessage) ||
    (!failureState && (item.failureCode !== null || item.safeFailureMessage !== null)) ||
    (item.failureCode !== null && (typeof item.failureCode !== "string" || !/^[a-z][a-z0-9_]{0,63}$/u.test(item.failureCode))) ||
    (item.safeFailureMessage !== null && !boundedText(item.safeFailureMessage, JARVIS_CHAT_MAX_FAILURE_MESSAGE_CHARACTERS))
  ) invalidPersistence();
  return item as unknown as JarvisChatTurn;
}

const STATE_BY_TURN_STATE = {
  binding: "binding",
  awaiting_approval: "awaiting_approval",
  approved: "approved",
  executing: "executing",
  stopping: "stopping",
  succeeded: "ready",
  stopped: "stopped",
  rejected: "rejected",
  failed: "failed",
  canceled: "canceled",
} as const;

export function assertJarvisChatConversation(value: unknown): JarvisChatConversation {
  const item = object(value);
  if (
    !item ||
    !hasKeys(item, ["recordVersion", "conversationId", "title", "state", "revision", "createdAt", "updatedAt", "currentTurnId", "turns", "auditEvents", "idempotencyRecords", "pendingOperation", "previousRecordDigest", "recordDigest"]) ||
    item.recordVersion !== JARVIS_CHAT_RECORD_VERSION ||
    !hex(item.conversationId, 24) ||
    !boundedText(item.title, JARVIS_CHAT_MAX_TITLE_CHARACTERS) ||
    !isJarvisChatConversationState(item.state) ||
    !Number.isSafeInteger(item.revision) ||
    (item.revision as number) < 1 ||
    (item.revision as number) > JARVIS_CHAT_MAX_REVISIONS ||
    !iso(item.createdAt) ||
    !iso(item.updatedAt) ||
    Date.parse(item.updatedAt as string) < Date.parse(item.createdAt as string) ||
    !hex(item.currentTurnId, 24) ||
    !Array.isArray(item.turns) ||
    item.turns.length < 1 ||
    item.turns.length > JARVIS_CHAT_MAX_TURNS ||
    !Array.isArray(item.auditEvents) ||
    item.auditEvents.length < 2 ||
    item.auditEvents.length > JARVIS_CHAT_MAX_AUDIT_EVENTS ||
    !Array.isArray(item.idempotencyRecords) ||
    item.idempotencyRecords.length > JARVIS_CHAT_MAX_IDEMPOTENCY_RECORDS ||
    (item.previousRecordDigest !== null && !hex(item.previousRecordDigest, 64)) ||
    !hex(item.recordDigest, 64)
  ) invalidPersistence();
  const pending = assertPendingOperation(item.pendingOperation);
  if (pending && pending.startedRevision > (item.revision as number)) invalidPersistence();

  const turns = (item.turns as unknown[]).map((turn, index) => assertTurnShape(turn, index + 1));
  if (turns.at(-1)?.turnId !== item.currentTurnId) invalidPersistence();
  const messageIds = new Set<string>();
  const turnIds = new Set<string>();
  turns.forEach((turn, index) => {
    if (turnIds.has(turn.turnId) || messageIds.has(turn.userMessage.messageId)) invalidPersistence();
    turnIds.add(turn.turnId);
    messageIds.add(turn.userMessage.messageId);
    if (turn.assistantMessage) {
      if (messageIds.has(turn.assistantMessage.messageId)) invalidPersistence();
      messageIds.add(turn.assistantMessage.messageId);
    }
    if (index < turns.length - 1 && !TERMINAL_TURN_STATES.has(turn.state)) invalidPersistence();
    const exactEnvelope = buildJarvisChatProviderEnvelope({
      priorTurns: turns.slice(0, index),
      currentUserMessage: turn.userMessage.text,
      contextMode: turn.contextMode,
    });
    if (!canonicalEqual(exactEnvelope, turn.envelope)) invalidPersistence();
  });
  const currentTurn = turns.at(-1)!;
  if (item.state !== "deleting" && STATE_BY_TURN_STATE[currentTurn.state] !== item.state) invalidPersistence();
  if ((item.state === "deleting") !== (pending?.action === "delete_conversation")) invalidPersistence();
  if (item.state === "deleting" && !TERMINAL_TURN_STATES.has(currentTurn.state)) invalidPersistence();
  if (
    (item.state === "binding" &&
      pending?.action !== "create_conversation" &&
      pending?.action !== "append_turn") ||
    ((item.state === "executing" || item.state === "stopping") &&
      pending?.action !== "execute_turn") ||
    (["ready", "stopped", "rejected", "failed", "canceled"] as const).includes(
      item.state as "ready" | "stopped" | "rejected" | "failed" | "canceled"
    ) && pending !== null
  ) invalidPersistence();
  if (
    Date.parse(currentTurn.updatedAt) > Date.parse(item.updatedAt as string) ||
    (pending &&
      (Date.parse(pending.startedAt) > Date.parse(item.updatedAt as string) ||
        !(
          ((pending.action === "create_conversation" || pending.action === "append_turn") && item.state === "binding") ||
          (pending.action === "approve_turn" && item.state === "awaiting_approval") ||
          (pending.action === "execute_turn" && (item.state === "executing" || item.state === "stopping")) ||
          (pending.action === "cancel_turn" && (item.state === "awaiting_approval" || item.state === "approved")) ||
          (pending.action === "delete_conversation" && item.state === "deleting")
        )))
  ) invalidPersistence();

  const auditIds = new Set<string>();
  let auditState: string | null = null;
  let auditTimestamp = item.createdAt as string;
  for (const value of item.auditEvents as unknown[]) {
    const audit = object(value);
    if (
      !audit ||
      !hasKeys(audit, ["auditId", "eventType", "actor", "turnId", "previousState", "resultingState", "timestamp", "summary", "sourceRunId"]) ||
      !hex(audit.auditId, 24) ||
      auditIds.has(audit.auditId) ||
      !isJarvisChatAuditEventType(audit.eventType) ||
      (audit.actor !== "local-operator" && audit.actor !== "system") ||
      !hex(audit.turnId, 24) ||
      !turnIds.has(audit.turnId) ||
      (audit.previousState !== null && !isJarvisChatConversationState(audit.previousState)) ||
      !isJarvisChatConversationState(audit.resultingState) ||
      audit.previousState !== auditState ||
      !iso(audit.timestamp) ||
      Date.parse(audit.timestamp as string) < Date.parse(auditTimestamp) ||
      Date.parse(audit.timestamp as string) > Date.parse(item.updatedAt as string) ||
      !boundedText(audit.summary, 240) ||
      (audit.sourceRunId !== null && !hex(audit.sourceRunId, 24))
    ) invalidPersistence();
    const auditTurn = turns.find((turn) => turn.turnId === audit.turnId)!;
    if (audit.sourceRunId !== null && auditTurn.runBinding?.sourceRunId !== audit.sourceRunId) invalidPersistence();
    auditIds.add(audit.auditId as string);
    auditState = audit.resultingState as string;
    auditTimestamp = audit.timestamp as string;
  }
  if (auditState !== item.state) invalidPersistence();

  const idempotencyKeys = new Set<string>();
  const requestIds = new Set<string>();
  for (const value of item.idempotencyRecords as unknown[]) {
    const evidence = assertIdempotency(value);
    if (
      idempotencyKeys.has(evidence.keyHash) ||
      requestIds.has(evidence.requestId) ||
      evidence.resultingRevision > (item.revision as number) ||
      (evidence.action === "create_conversation") !== (evidence.responseStatus === 201) ||
      Date.parse(evidence.createdAt) > Date.parse(item.updatedAt as string)
    ) invalidPersistence();
    idempotencyKeys.add(evidence.keyHash);
    requestIds.add(evidence.requestId);
  }
  if (pending && idempotencyKeys.has(pending.keyHash)) invalidPersistence();

  const conversation = item as unknown as JarvisChatConversation;
  if (conversation.recordDigest !== hashJarvisChatCanonicalJson(recordWithoutDigest(conversation))) invalidPersistence();
  return conversation;
}

function encodeConversation(value: JarvisChatConversation): Buffer {
  const conversation = assertJarvisChatConversation(value);
  const bytes = Buffer.from(serializeJarvisChatCanonicalJson(conversation), "utf8");
  if (bytes.byteLength > JARVIS_CHAT_MAX_RECORD_BYTES) {
    throw new JarvisChatPolicyError(413, "chat_record_too_large", "Jarvis chat reached its bounded local conversation size.");
  }
  return bytes;
}

function decodeConversation(bytes: Buffer): JarvisChatConversation {
  if (bytes.byteLength < 2 || bytes.byteLength > JARVIS_CHAT_MAX_RECORD_BYTES) invalidPersistence();
  let source: string;
  let parsed: unknown;
  try {
    source = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    assertCreatorJsonHasUniqueObjectKeys(source);
    parsed = JSON.parse(source) as unknown;
  } catch {
    return invalidPersistence();
  }
  const conversation = assertJarvisChatConversation(parsed);
  if (source !== serializeJarvisChatCanonicalJson(conversation)) invalidPersistence();
  return conversation;
}

function slotWithoutDigest(value: SlotRecord): Omit<SlotRecord, "recordDigest"> {
  const { recordDigest: _digest, ...rest } = value;
  return rest;
}

function sealSlot(value: Omit<SlotRecord, "recordDigest">): SlotRecord {
  return { ...value, recordDigest: hashJarvisChatCanonicalJson(value) };
}

function encodeSlot(value: SlotRecord): Buffer {
  const bytes = Buffer.from(serializeJarvisChatCanonicalJson(value), "utf8");
  if (bytes.byteLength > MAX_SLOT_BYTES) invalidPersistence();
  return bytes;
}

function decodeSlot(bytes: Buffer, expectedSlot: number): SlotRecord {
  if (bytes.byteLength < 2 || bytes.byteLength > MAX_SLOT_BYTES) invalidPersistence();
  let source: string;
  let item: Record<string, unknown> | null;
  try {
    source = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    assertCreatorJsonHasUniqueObjectKeys(source);
    item = object(JSON.parse(source) as unknown);
  } catch {
    return invalidPersistence();
  }
  if (
    !item ||
    !hasKeys(item, ["version", "slot", "state", "createKeyHash", "createRequestDigest", "conversationId", "initialConversation", "deletionKeyHash", "deletionRequestDigest", "deletionRequestId", "deletionAuditId", "recoveryKeyHash", "recoveryRequestDigest", "recoveryRequestId", "deletedTitleDigest", "finalRevision", "finalRecordDigest", "deletedAt", "recordDigest"]) ||
    item.version !== 1 ||
    item.slot !== expectedSlot ||
    !["reserved", "published", "deleting", "deleted"].includes(item.state as string) ||
    !hex(item.createKeyHash, 64) ||
    !hex(item.createRequestDigest, 64) ||
    !hex(item.conversationId, 24) ||
    !hex(item.recordDigest, 64)
  ) invalidPersistence();
  const state = item.state as SlotState;
  if (state === "reserved" || state === "published") {
    const initial = assertJarvisChatConversation(item.initialConversation);
    if (initial.conversationId !== item.conversationId || initial.revision !== 1) invalidPersistence();
    if (
      item.deletionKeyHash !== null ||
      item.deletionRequestDigest !== null ||
      item.deletionRequestId !== null ||
      item.deletionAuditId !== null ||
      item.recoveryKeyHash !== null ||
      item.recoveryRequestDigest !== null ||
      item.recoveryRequestId !== null ||
      item.deletedTitleDigest !== null ||
      item.finalRevision !== null ||
      item.finalRecordDigest !== null ||
      item.deletedAt !== null
    ) invalidPersistence();
  } else if (
    item.initialConversation !== null ||
    !hex(item.deletionKeyHash, 64) ||
    !hex(item.deletionRequestDigest, 64) ||
    !hex(item.deletionRequestId, 32) ||
    !hex(item.deletionAuditId, 24) ||
    !(
      (item.recoveryKeyHash === null && item.recoveryRequestDigest === null && item.recoveryRequestId === null) ||
      (hex(item.recoveryKeyHash, 64) && hex(item.recoveryRequestDigest, 64) && hex(item.recoveryRequestId, 32))
    ) ||
    !hex(item.deletedTitleDigest, 64) ||
    !Number.isSafeInteger(item.finalRevision) ||
    (item.finalRevision as number) < 1 ||
    !hex(item.finalRecordDigest, 64) ||
    !iso(item.deletedAt)
  ) invalidPersistence();
  const slot = item as unknown as SlotRecord;
  if (slot.recordDigest !== hashJarvisChatCanonicalJson(slotWithoutDigest(slot))) invalidPersistence();
  if (source !== serializeJarvisChatCanonicalJson(slot)) invalidPersistence();
  return slot;
}

function slotName(index: number): string {
  return `${index.toString().padStart(2, "0")}.json`;
}

function revisionName(revision: number): string {
  if (!Number.isSafeInteger(revision) || revision < 1 || revision > 99_999_999) invalidPersistence();
  return `${revision.toString().padStart(8, "0")}.json`;
}

function conversationSegments(conversationId: string): readonly string[] {
  if (!hex(conversationId, 24)) missingConversation();
  return [...CONVERSATIONS, conversationId];
}

function isNative(error: unknown, code: string): boolean {
  return (
    error instanceof PrivateAlphaNativeFilesystemError ||
    (typeof error === "object" && error !== null && "code" in error)
  ) && (error as { code?: unknown }).code === code;
}

function isNativeContention(error: unknown): boolean {
  return (
    isNative(error, "compare_mismatch") ||
    isNative(error, "conflict") ||
    isNative(error, "busy")
  );
}

function writeExclusiveWithExactReadback(
  root: CreatorNativeRoot,
  segments: readonly string[],
  temporaryName: string,
  bytes: Buffer,
  maximumBytes: number,
  allowDifferentExisting: boolean
): "published" | "occupied" {
  for (let attempt = 0; attempt < NATIVE_CONTENTION_ATTEMPTS; attempt += 1) {
    try {
      root.writeAtomicExclusive(segments, temporaryName, bytes);
      return "published";
    } catch (error) {
      if (!isNative(error, "already_exists") && !isNativeContention(error)) throw error;
      const observed = readOptional(root, segments, maximumBytes);
      if (observed?.equals(bytes)) return "published";
      if (observed) {
        if (allowDifferentExisting) return "occupied";
        throw new JarvisChatPolicyError(
          409,
          "revision_conflict",
          "A concurrent Jarvis chat action owns the immutable target."
        );
      }
      if ((!isNative(error, "conflict") && !isNative(error, "busy")) || attempt + 1 === NATIVE_CONTENTION_ATTEMPTS) {
        throw new JarvisChatPolicyError(
          409,
          "concurrent_create_conflict",
          "Jarvis chat filesystem publication remained concurrently unavailable."
        );
      }
    }
  }
  throw new JarvisChatPolicyError(
    409,
    "concurrent_create_conflict",
    "Jarvis chat filesystem publication remained concurrently unavailable."
  );
}

function replaceWithExactReadback(
  root: CreatorNativeRoot,
  segments: readonly string[],
  temporaryName: string,
  nextBytes: Buffer,
  expectedBytes: Buffer,
  maximumBytes: number,
  conflictCode: "revision_conflict" | "idempotency_conflict",
  conflictMessage: string
): void {
  for (let attempt = 0; attempt < NATIVE_CONTENTION_ATTEMPTS; attempt += 1) {
    try {
      root.writeAtomicReplace(
        segments,
        temporaryName,
        nextBytes,
        expectedBytes,
        null,
        null
      );
      return;
    } catch (error) {
      if (!isNativeContention(error)) throw error;
      const observed = readOptional(root, segments, maximumBytes);
      if (observed?.equals(nextBytes)) return;
      if (isNative(error, "compare_mismatch") && observed && !observed.equals(expectedBytes)) {
        throw new JarvisChatPolicyError(409, conflictCode, conflictMessage);
      }
      if ((isNative(error, "conflict") || isNative(error, "busy")) && observed?.equals(expectedBytes)) continue;
      if (attempt + 1 < NATIVE_CONTENTION_ATTEMPTS) continue;
      throw new JarvisChatPolicyError(409, conflictCode, conflictMessage);
    }
  }
  throw new JarvisChatPolicyError(409, conflictCode, conflictMessage);
}

function publishInitialTreeWithExactReadback(
  root: CreatorNativeRoot,
  conversation: JarvisChatConversation
): void {
  const bytes = encodeConversation(conversation);
  const segments = conversationSegments(conversation.conversationId);
  for (let attempt = 0; attempt < NATIVE_CONTENTION_ATTEMPTS; attempt += 1) {
    try {
      root.publishTreeExclusive(segments, [
        [["head.json"], bytes],
        [["revisions", revisionName(1)], bytes],
      ]);
      return;
    } catch (error) {
      if (!isNative(error, "already_exists") && !isNativeContention(error)) throw error;
      const head = readOptional(root, [...segments, "head.json"], JARVIS_CHAT_MAX_RECORD_BYTES);
      const revision = readOptional(
        root,
        [...segments, "revisions", revisionName(1)],
        JARVIS_CHAT_MAX_RECORD_BYTES
      );
      if (head?.equals(bytes) && revision?.equals(bytes)) return;
      if (head && revision) {
        const published = decodeConversation(head);
        const publishedRevision = decodeConversation(revision);
        if (
          publishedRevision.recordDigest === conversation.recordDigest &&
          publishedRevision.revision === conversation.revision &&
          published.conversationId === conversation.conversationId &&
          published.revision >= conversation.revision
        ) return;
        if (attempt + 1 < NATIVE_CONTENTION_ATTEMPTS) continue;
      }
      if ((head === null) !== (revision === null)) {
        if (attempt + 1 < NATIVE_CONTENTION_ATTEMPTS) continue;
        throw new JarvisChatPolicyError(
          409,
          "concurrent_create_conflict",
          "Jarvis chat initial publication remained concurrently incomplete."
        );
      }
      if (
        !head &&
        !revision &&
        (isNative(error, "conflict") || isNative(error, "busy")) &&
        attempt + 1 < NATIVE_CONTENTION_ATTEMPTS
      ) {
        continue;
      }
      throw new JarvisChatPolicyError(
        409,
        "revision_conflict",
        "A concurrent Jarvis chat create owns the immutable conversation publication."
      );
    }
  }
}

function withNativeContentionRetry<T>(
  work: () => T,
  code: "concurrent_create_conflict" | "revision_conflict",
  message: string
): T {
  for (let attempt = 0; attempt < NATIVE_CONTENTION_ATTEMPTS; attempt += 1) {
    try {
      return work();
    } catch (error) {
      if (!isNativeContention(error)) throw error;
    }
  }
  throw new JarvisChatPolicyError(409, code, message);
}

function readOptional(root: CreatorNativeRoot, segments: readonly string[], maximumBytes: number): Buffer | null {
  try {
    return root.readFile(segments, maximumBytes);
  } catch (error) {
    if (isNative(error, "not_found")) return null;
    throw error;
  }
}

function rootHasChat(root: CreatorNativeRoot): boolean {
  try {
    return root.stat(ROOT) === "directory";
  } catch (error) {
    if (isNative(error, "not_found")) return false;
    throw error;
  }
}

function ensureMutableLayout(root: CreatorNativeRoot): void {
  for (const segments of [ROOT, CONVERSATIONS, SLOTS]) {
    let ensured = false;
    for (let attempt = 0; attempt < NATIVE_CONTENTION_ATTEMPTS; attempt += 1) {
      try {
        root.ensureDirectory(segments);
        ensured = true;
        break;
      } catch (error) {
        if (!isNativeContention(error)) throw error;
        try {
          if (root.stat(segments) === "directory") {
            ensured = true;
            break;
          }
        } catch (inspectionError) {
          if (!isNative(inspectionError, "not_found") && !isNativeContention(inspectionError)) {
            throw inspectionError;
          }
        }
      }
    }
    if (!ensured) {
      throw new JarvisChatPolicyError(
        409,
        "concurrent_create_conflict",
        "Jarvis chat storage layout remained concurrently unavailable."
      );
    }
  }
}

function readSlots(root: CreatorNativeRoot): readonly { bytes: Buffer; slot: SlotRecord }[] {
  if (!rootHasChat(root)) return [];
  const names = root.listDirectory(SLOTS).sort();
  if (names.length > JARVIS_CHAT_MAX_CONVERSATIONS || names.some((name) => !/^\d{2}\.json$/u.test(name))) invalidPersistence();
  const seenConversations = new Set<string>();
  const seenKeys = new Set<string>();
  return names.map((name) => {
    const index = Number(name.slice(0, 2));
    if (index < 0 || index >= JARVIS_CHAT_MAX_CONVERSATIONS) invalidPersistence();
    const bytes = root.readFile([...SLOTS, name], MAX_SLOT_BYTES);
    const slot = decodeSlot(bytes, index);
    if (seenConversations.has(slot.conversationId) || seenKeys.has(slot.createKeyHash)) invalidPersistence();
    seenConversations.add(slot.conversationId);
    seenKeys.add(slot.createKeyHash);
    return { bytes, slot };
  });
}

function readRevision(root: CreatorNativeRoot, conversationId: string, revision: number): { bytes: Buffer; conversation: JarvisChatConversation } | null {
  const bytes = readOptional(root, [...conversationSegments(conversationId), "revisions", revisionName(revision)], JARVIS_CHAT_MAX_RECORD_BYTES);
  if (!bytes) return null;
  const conversation = decodeConversation(bytes);
  if (conversation.conversationId !== conversationId || conversation.revision !== revision) invalidPersistence();
  return { bytes, conversation };
}

const ALLOWED_TURN_TRANSITIONS: Readonly<Record<string, readonly string[]>> = {
  binding: ["binding", "awaiting_approval", "rejected", "failed"],
  awaiting_approval: ["awaiting_approval", "approved", "canceled"],
  approved: ["approved", "executing", "canceled"],
  executing: ["executing", "stopping", "succeeded", "rejected", "failed"],
  stopping: ["stopping", "stopped"],
  succeeded: ["succeeded"],
  stopped: ["stopped"],
  rejected: ["rejected"],
  failed: ["failed"],
  canceled: ["canceled"],
};

function assertImmutableTurnCore(previous: JarvisChatTurn, next: JarvisChatTurn): void {
  if (TERMINAL_TURN_STATES.has(previous.state)) {
    if (!canonicalEqual(previous, next)) invalidPersistence();
    return;
  }
  if (
    previous.turnId !== next.turnId ||
    previous.ordinal !== next.ordinal ||
    !canonicalEqual(previous.userMessage, next.userMessage) ||
    previous.contextMode !== next.contextMode ||
    previous.ownershipBindingId !== next.ownershipBindingId ||
    !canonicalEqual(previous.envelope, next.envelope) ||
    previous.requestedAt !== next.requestedAt
  ) invalidPersistence();
  if (previous.runBinding) {
    if (!next.runBinding) invalidPersistence();
    const { runRevision: previousRevision, ...previousIdentity } = previous.runBinding;
    const { runRevision: nextRevision, ...nextIdentity } = next.runBinding;
    if (
      !canonicalEqual(previousIdentity, nextIdentity) ||
      nextRevision < previousRevision
    ) invalidPersistence();
  }
  if (previous.assistantMessage && !canonicalEqual(previous.assistantMessage, next.assistantMessage)) invalidPersistence();
  if (!ALLOWED_TURN_TRANSITIONS[previous.state]?.includes(next.state)) invalidPersistence();
  if (Date.parse(next.updatedAt) < Date.parse(previous.updatedAt)) invalidPersistence();
}

export function assertJarvisChatConversationContinuity(
  previous: JarvisChatConversation,
  next: JarvisChatConversation
): void {
  if (
    next.conversationId !== previous.conversationId ||
    next.createdAt !== previous.createdAt ||
    next.revision !== previous.revision + 1 ||
    next.previousRecordDigest !== previous.recordDigest ||
    Date.parse(next.updatedAt) <= Date.parse(previous.updatedAt) ||
    next.auditEvents.length < previous.auditEvents.length ||
    !canonicalEqual(next.auditEvents.slice(0, previous.auditEvents.length), previous.auditEvents) ||
    next.idempotencyRecords.length < previous.idempotencyRecords.length ||
    !canonicalEqual(next.idempotencyRecords.slice(0, previous.idempotencyRecords.length), previous.idempotencyRecords)
  ) invalidPersistence();
  const appended = next.turns.length === previous.turns.length + 1;
  if (appended) {
    if (!canonicalEqual(next.turns.slice(0, previous.turns.length), previous.turns)) invalidPersistence();
    const added = next.turns.at(-1)!;
    if (added.state !== "binding" || next.state !== "binding" || next.pendingOperation?.action !== "append_turn") invalidPersistence();
  } else {
    if (next.turns.length !== previous.turns.length) invalidPersistence();
    if (previous.turns.length > 1 && !canonicalEqual(next.turns.slice(0, -1), previous.turns.slice(0, -1))) invalidPersistence();
    assertImmutableTurnCore(previous.turns.at(-1)!, next.turns.at(-1)!);
  }
  const titleChanged = next.title !== previous.title;
  if (
    titleChanged &&
    (next.auditEvents.length <= previous.auditEvents.length ||
      next.auditEvents.at(-1)?.eventType !== "conversation.renamed")
  ) invalidPersistence();
  const priorPending = previous.pendingOperation;
  const nextPending = next.pendingOperation;
  if (priorPending && nextPending && !canonicalEqual(priorPending, nextPending)) invalidPersistence();
  if (priorPending && !nextPending) {
    const completion = next.idempotencyRecords.find((entry) => entry.keyHash === priorPending.keyHash);
    if (!completion || completion.action !== priorPending.action || completion.requestDigest !== priorPending.requestDigest || completion.resultingRevision !== next.revision) invalidPersistence();
  }
  if (!priorPending && nextPending && nextPending.startedRevision !== next.revision) invalidPersistence();
  if (
    next.idempotencyRecords.length > previous.idempotencyRecords.length + 2 ||
    next.auditEvents.length > previous.auditEvents.length + 3
  ) invalidPersistence();
}

function verifyIdempotencyRevisions(root: CreatorNativeRoot, conversation: JarvisChatConversation): void {
  for (const evidence of conversation.idempotencyRecords) {
    const revision = readRevision(root, conversation.conversationId, evidence.resultingRevision);
    if (!revision) invalidPersistence();
    if (
      evidence.responseDigest !== buildJarvisChatConversationResponseDigest(revision.conversation, evidence.responseStatus)
    ) invalidPersistence();
  }
}

function verifyCompleteRevisionChain(
  root: CreatorNativeRoot,
  conversationId: string,
  expectedHead: JarvisChatConversation
): void {
  let previous: JarvisChatConversation | null = null;
  for (let revision = 1; revision <= expectedHead.revision; revision += 1) {
    const exact = readRevision(root, conversationId, revision);
    if (!exact) invalidPersistence();
    if (revision === 1) {
      if (exact.conversation.previousRecordDigest !== null) invalidPersistence();
    } else {
      if (!previous) invalidPersistence();
      assertJarvisChatConversationContinuity(previous, exact.conversation);
    }
    previous = exact.conversation;
  }
  if (!previous || previous.recordDigest !== expectedHead.recordDigest) invalidPersistence();
}

function readRevisionInventory(
  root: CreatorNativeRoot,
  conversationId: string
): readonly number[] {
  const directory = [...conversationSegments(conversationId), "revisions"];
  const names = root.listDirectory(directory);
  if (names.length < 1 || names.length > JARVIS_CHAT_MAX_REVISIONS) invalidPersistence();
  const revisions = names.map((name) => {
    if (!/^\d{8}\.json$/u.test(name) || root.stat([...directory, name]) !== "file") invalidPersistence();
    const revision = Number(name.slice(0, 8));
    if (!Number.isSafeInteger(revision) || revision < 1 || revisionName(revision) !== name) invalidPersistence();
    return revision;
  }).sort((left, right) => left - right);
  if (new Set(revisions).size !== revisions.length) invalidPersistence();
  return revisions;
}

function readAndReconcileHead(root: CreatorNativeRoot, conversationId: string): { bytes: Buffer; conversation: JarvisChatConversation } {
  return readAndReconcileHeadAttempt(root, conversationId, 0);
}

function readAndReconcileHeadAttempt(
  root: CreatorNativeRoot,
  conversationId: string,
  attempt: number
): { bytes: Buffer; conversation: JarvisChatConversation } {
  const segments = conversationSegments(conversationId);
  let headBytes = readOptional(root, [...segments, "head.json"], JARVIS_CHAT_MAX_RECORD_BYTES);
  if (!headBytes) missingConversation();
  let head = decodeConversation(headBytes);
  if (head.conversationId !== conversationId) invalidPersistence();
  const inventoryBefore = readRevisionInventory(root, conversationId);
  if (
    inventoryBefore.some((revision, index) => revision !== index + 1)
  ) invalidPersistence();
  if (inventoryBefore.at(-1)! > head.revision + 1) invalidPersistence();
  const exactRevision = readRevision(root, conversationId, head.revision);
  if (!exactRevision || !exactRevision.bytes.equals(headBytes)) invalidPersistence();
  const next = readRevision(root, conversationId, head.revision + 1);
  if (next) {
    assertJarvisChatConversationContinuity(head, next.conversation);
    replaceWithExactReadback(
      root,
      [...segments, "head.json"],
      `.head-${next.conversation.revision}-${next.conversation.recordDigest.slice(0, 12)}.tmp`,
      next.bytes,
      headBytes,
      JARVIS_CHAT_MAX_RECORD_BYTES,
      "revision_conflict",
      "A concurrent Jarvis chat recovery published a different revision."
    );
    headBytes = next.bytes;
    head = next.conversation;
  }
  const inventoryAfter = readRevisionInventory(root, conversationId);
  if (
    inventoryAfter.length !== head.revision ||
    inventoryAfter.some((revision, index) => revision !== index + 1)
  ) {
    if (
      attempt + 1 < NATIVE_CONTENTION_ATTEMPTS &&
      inventoryAfter.some((revision, index) => revision !== index + 1) === false &&
      inventoryAfter.length === head.revision + 1
    ) {
      return readAndReconcileHeadAttempt(root, conversationId, attempt + 1);
    }
    invalidPersistence();
  }
  verifyCompleteRevisionChain(root, conversationId, head);
  verifyIdempotencyRevisions(root, head);
  return { bytes: headBytes, conversation: head };
}

function assertInitialConversation(
  conversation: JarvisChatConversation,
  createKeyHash: string,
  requestDigest: string
): void {
  const turn = conversation.turns[0];
  if (
    conversation.revision !== 1 ||
    conversation.previousRecordDigest !== null ||
    conversation.state !== "binding" ||
    conversation.turns.length !== 1 ||
    turn.state !== "binding" ||
    turn.runBinding !== null ||
    conversation.idempotencyRecords.length !== 0 ||
    conversation.pendingOperation?.action !== "create_conversation" ||
    conversation.pendingOperation.keyHash !== createKeyHash ||
    conversation.pendingOperation.requestDigest !== requestDigest ||
    conversation.pendingOperation.startedRevision !== 1 ||
    conversation.auditEvents[0]?.eventType !== "conversation.created" ||
    conversation.auditEvents[1]?.eventType !== "turn.requested"
  ) invalidPersistence();
}

function summary(conversation: JarvisChatConversation): JarvisChatConversationSummary {
  const turn = conversation.turns.at(-1)!;
  return {
    conversationId: conversation.conversationId,
    title: conversation.title,
    state: conversation.state,
    revision: conversation.revision,
    turnCount: conversation.turns.length,
    createdAt: conversation.createdAt,
    updatedAt: conversation.updatedAt,
    lastMessagePreview: Array.from(turn.assistantMessage?.text ?? turn.userMessage.text).slice(0, 120).join(""),
  };
}

function deletionRecoverySummary(slot: SlotRecord): JarvisChatConversationSummary {
  if (
    slot.state !== "deleting" ||
    slot.finalRevision === null ||
    slot.deletedAt === null
  ) invalidPersistence();
  return {
    conversationId: slot.conversationId,
    title: "Deletion recovery required",
    state: "deleting",
    revision: slot.finalRevision,
    turnCount: 0,
    createdAt: slot.deletedAt,
    updatedAt: slot.deletedAt,
    lastMessagePreview: "Confirmed deletion was interrupted. Recover the exact durable deletion intent.",
  };
}

function tombstone(slot: SlotRecord): JarvisChatDeletionTombstone {
  if (slot.state !== "deleted") invalidPersistence();
  const immutableDeletionProof = {
    version: 1 as const,
    conversationId: slot.conversationId,
    titleDigest: slot.deletedTitleDigest!,
    finalRevision: slot.finalRevision!,
    finalRecordDigest: slot.finalRecordDigest!,
    deletionKeyHash: slot.deletionKeyHash!,
    deletionRequestDigest: slot.deletionRequestDigest!,
    deletionRequestId: slot.deletionRequestId!,
    deletionAuditId: slot.deletionAuditId!,
    deletionEvent: {
      eventType: "conversation.deleted" as const,
      auditId: slot.deletionAuditId!,
      actor: "system" as const,
      previousState: "deleting" as const,
      resultingState: "deleted" as const,
      timestamp: slot.deletedAt!,
      summary: "Conversation history removed; any separately retained bounded Private Alpha run or audit provenance is unchanged.",
    },
    deletedAt: slot.deletedAt!,
  };
  const value = {
    ...immutableDeletionProof,
    recoveryKeyHash: slot.recoveryKeyHash,
    recoveryRequestDigest: slot.recoveryRequestDigest,
    recoveryRequestId: slot.recoveryRequestId,
  };
  return {
    ...value,
    tombstoneDigest: hashJarvisChatCanonicalJson(immutableDeletionProof),
  };
}

function buildPersistence(
  dataRootLabel: string,
  testing: boolean,
  testingHooks: JarvisChatPersistenceTestingHooks | null = null
): JarvisChatPersistence {
  return {
    async createConversation(input) {
      if (!hex(input.createKeyHash, 64) || !hex(input.requestDigest, 64)) invalidPersistence();
      const supplied = assertJarvisChatConversation(input.conversation);
      assertInitialConversation(supplied, input.createKeyHash, input.requestDigest);
      return withPrivateAlphaNativeRoot(dataRootLabel, (root) =>
        withNativeContentionRetry(() => {
          ensureMutableLayout(root);
          let reservedByThisCall = false;
          for (let attempt = 0; attempt <= JARVIS_CHAT_MAX_CONVERSATIONS; attempt += 1) {
          const slots = readSlots(root);
          const existing = slots.find(({ slot }) => slot.createKeyHash === input.createKeyHash);
          if (existing) {
            if (existing.slot.createRequestDigest !== input.requestDigest) {
              throw new JarvisChatPolicyError(409, "idempotency_conflict", "Jarvis chat idempotency key was already used for a different request.");
            }
            if (existing.slot.state === "deleting" || existing.slot.state === "deleted" || !existing.slot.initialConversation) {
              throw new JarvisChatPolicyError(410, "conversation_deleted", "The idempotent Jarvis chat conversation was explicitly deleted.");
            }
            const initial = existing.slot.initialConversation;
            const published = readOptional(root, [...conversationSegments(initial.conversationId), "head.json"], JARVIS_CHAT_MAX_RECORD_BYTES);
            if (!published) {
              if (existing.slot.state !== "reserved") {
                throw new JarvisChatPolicyError(503, "chat_persistence_invalid", "Published Jarvis chat history is unavailable and cannot be reconstructed from its initial reservation.");
              }
              publishInitialTreeWithExactReadback(root, initial);
            }
            const head = readAndReconcileHead(root, initial.conversationId).conversation;
            if (existing.slot.state === "reserved") {
              const desired = sealSlot({ ...slotWithoutDigest(existing.slot), state: "published" });
              replaceWithExactReadback(
                root,
                [...SLOTS, slotName(existing.slot.slot)],
                `.slot-${existing.slot.slot}-published.tmp`,
                encodeSlot(desired),
                existing.bytes,
                MAX_SLOT_BYTES,
                "idempotency_conflict",
                "A concurrent Jarvis chat create changed its reservation ownership."
              );
            }
            return { conversation: head, created: reservedByThisCall };
          }
          const occupied = new Set(slots.map(({ slot }) => slot.slot));
          const free = Array.from({ length: JARVIS_CHAT_MAX_CONVERSATIONS }, (_, index) => index).find((index) => !occupied.has(index));
          if (free === undefined) {
            throw new JarvisChatPolicyError(409, "conversation_limit_reached", `Jarvis chat stores at most ${JARVIS_CHAT_MAX_CONVERSATIONS} conversation identities.`);
          }
          const reservation = sealSlot({
            version: 1,
            slot: free,
            state: "reserved",
            createKeyHash: input.createKeyHash,
            createRequestDigest: input.requestDigest,
            conversationId: supplied.conversationId,
            initialConversation: supplied,
            deletionKeyHash: null,
            deletionRequestDigest: null,
            deletionRequestId: null,
            deletionAuditId: null,
            recoveryKeyHash: null,
            recoveryRequestDigest: null,
            recoveryRequestId: null,
            deletedTitleDigest: null,
            finalRevision: null,
            finalRecordDigest: null,
            deletedAt: null,
          });
          try {
            const publication = writeExclusiveWithExactReadback(
              root,
              [...SLOTS, slotName(free)],
              `.slot-${free}-${supplied.conversationId.slice(0, 8)}.tmp`,
              encodeSlot(reservation),
              MAX_SLOT_BYTES,
              true
            );
            if (publication === "occupied") continue;
            reservedByThisCall = true;
          } catch (error) {
            if (isNative(error, "already_exists")) continue;
            throw error;
          }
        }
          throw new JarvisChatPolicyError(409, "concurrent_create_conflict", "Jarvis chat create reservation remained concurrently owned.");
        }, "concurrent_create_conflict", "Jarvis chat create remained concurrently unavailable.")
      );
    },

    async getConversation(conversationId) {
      if (!privateAlphaNativeRootExists(dataRootLabel)) missingConversation();
      return withPrivateAlphaNativeRoot(dataRootLabel, (root) =>
        withNativeContentionRetry(() => {
          if (!rootHasChat(root)) missingConversation();
        const entry = readSlots(root).find((candidate) => candidate.slot.conversationId === conversationId);
        if (!entry || entry.slot.state === "deleting" || entry.slot.state === "deleted") missingConversation();
        if (entry.slot.state === "reserved") {
          if (!entry.slot.initialConversation) invalidPersistence();
          return entry.slot.initialConversation;
        }
          try {
            return readAndReconcileHead(root, conversationId).conversation;
          } catch (error) {
            if (
              (error instanceof JarvisChatPolicyError &&
                ["conversation_not_found", "chat_persistence_invalid"].includes(error.code)) ||
              isNative(error, "not_found")
            ) {
              const after = readSlots(root).find((candidate) => candidate.slot.conversationId === conversationId);
              if (
                after?.slot.state === "published" &&
                after.slot.recordDigest === entry.slot.recordDigest
              ) invalidPersistence();
              missingConversation();
            }
            throw error;
          }
        }, "revision_conflict", "Jarvis chat conversation remained concurrently unavailable.")
      );
    },

    async getConversationRevision(conversationId, revision) {
      if (!privateAlphaNativeRootExists(dataRootLabel)) missingConversation();
      return withPrivateAlphaNativeRoot(dataRootLabel, (root) =>
        withNativeContentionRetry(() => {
          if (!rootHasChat(root)) missingConversation();
        const entry = readSlots(root).find((candidate) => candidate.slot.conversationId === conversationId);
        if (!entry || entry.slot.state === "deleting" || entry.slot.state === "deleted") missingConversation();
        if (entry.slot.state === "reserved") {
          if (revision !== 1 || !entry.slot.initialConversation) missingConversation();
          return entry.slot.initialConversation;
        }
          let head: JarvisChatConversation;
          try {
            head = readAndReconcileHead(root, conversationId).conversation;
          } catch (error) {
            if (
              (error instanceof JarvisChatPolicyError &&
                ["conversation_not_found", "chat_persistence_invalid"].includes(error.code)) ||
              isNative(error, "not_found")
            ) {
              const after = readSlots(root).find((candidate) => candidate.slot.conversationId === conversationId);
              if (
                after?.slot.state === "published" &&
                after.slot.recordDigest === entry.slot.recordDigest
              ) invalidPersistence();
              missingConversation();
            }
            throw error;
          }
          if (revision > head.revision) missingConversation();
          const result = readRevision(root, conversationId, revision);
          if (!result) {
            const after = readSlots(root).find((candidate) => candidate.slot.conversationId === conversationId);
            if (
              after?.slot.state === "published" &&
              after.slot.recordDigest === entry.slot.recordDigest
            ) invalidPersistence();
            missingConversation();
          }
          return result.conversation;
        }, "revision_conflict", "Jarvis chat revision remained concurrently unavailable.")
      );
    },

    async listConversations(limit) {
      const bounded = Number.isSafeInteger(limit) && limit > 0 && limit <= JARVIS_CHAT_MAX_CONVERSATIONS ? limit : 20;
      if (!privateAlphaNativeRootExists(dataRootLabel)) return [];
      return withPrivateAlphaNativeRoot(dataRootLabel, (root) =>
        withNativeContentionRetry(() => {
        if (!rootHasChat(root)) return [];
        for (let attempt = 0; attempt < NATIVE_CONTENTION_ATTEMPTS; attempt += 1) {
          const before = readSlots(root);
          let result: readonly JarvisChatConversationSummary[] | null = null;
          let readError: unknown = null;
          try {
            result = before
              .filter(({ slot }) =>
                slot.state === "published" ||
                slot.state === "reserved" ||
                slot.state === "deleting"
              )
              .map(({ slot }) =>
                slot.state === "deleting"
                  ? deletionRecoverySummary(slot)
                  : summary(
                      slot.state === "reserved"
                        ? slot.initialConversation ?? invalidPersistence()
                        : readAndReconcileHead(root, slot.conversationId).conversation
                    )
              )
              .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
              .slice(0, bounded);
          } catch (error) {
            if (
              !(
                error instanceof JarvisChatPolicyError &&
                ["conversation_not_found", "revision_conflict", "chat_persistence_invalid"].includes(error.code)
              ) &&
              !isNative(error, "not_found") &&
              !isNativeContention(error)
            ) throw error;
            readError = error;
          }
          const after = readSlots(root);
          const catalogueStable = canonicalEqual(
            before.map(({ slot }) => slot.recordDigest),
            after.map(({ slot }) => slot.recordDigest)
          );
          if (
            result &&
            catalogueStable
          ) return result;
          if (
            catalogueStable &&
            ((readError instanceof JarvisChatPolicyError &&
              ["conversation_not_found", "chat_persistence_invalid"].includes(readError.code)) ||
              isNative(readError, "not_found"))
          ) invalidPersistence();
        }
        throw new JarvisChatPolicyError(
          409,
          "revision_conflict",
          "Jarvis chat history changed repeatedly while the bounded list was read."
        );
        }, "revision_conflict", "Jarvis chat history remained concurrently unavailable while it was listed.")
      );
    },

    async commitConversation(input) {
      const expected = assertJarvisChatConversation(input.expected);
      const next = assertJarvisChatConversation(input.next);
      assertJarvisChatConversationContinuity(expected, next);
      return withPrivateAlphaNativeRoot(dataRootLabel, (root) =>
        withNativeContentionRetry(() => {
          if (!rootHasChat(root)) missingConversation();
        let slotEntry = readSlots(root).find((candidate) => candidate.slot.conversationId === expected.conversationId);
        if (!slotEntry || slotEntry.slot.state === "deleting" || slotEntry.slot.state === "deleted") missingConversation();
        if (slotEntry.slot.state === "reserved") {
          const initial = slotEntry.slot.initialConversation;
          if (!initial || initial.recordDigest !== expected.recordDigest) {
            throw new JarvisChatPolicyError(409, "revision_conflict", "The reserved Jarvis chat conversation changed before recovery.");
          }
          publishInitialTreeWithExactReadback(root, initial);
          const publishedSlot = sealSlot({ ...slotWithoutDigest(slotEntry.slot), state: "published" });
          replaceWithExactReadback(
            root,
            [...SLOTS, slotName(slotEntry.slot.slot)],
            `.slot-${slotEntry.slot.slot}-published.tmp`,
            encodeSlot(publishedSlot),
            slotEntry.bytes,
            MAX_SLOT_BYTES,
            "revision_conflict",
            "A concurrent Jarvis chat action changed the reservation before publication."
          );
          slotEntry = readSlots(root).find((candidate) => candidate.slot.conversationId === expected.conversationId);
          if (!slotEntry || slotEntry.slot.state !== "published") invalidPersistence();
        }
        const head = readAndReconcileHead(root, expected.conversationId);
        if (head.conversation.recordDigest !== expected.recordDigest) {
          throw new JarvisChatPolicyError(409, "revision_conflict", "Jarvis chat conversation changed before this action completed.");
        }
        const bytes = encodeConversation(next);
        const revisionSegments = [...conversationSegments(next.conversationId), "revisions", revisionName(next.revision)];
        const revisionPublication = writeExclusiveWithExactReadback(
          root,
          revisionSegments,
          `.revision-${next.revision}-${next.recordDigest.slice(0, 12)}.tmp`,
          bytes,
          JARVIS_CHAT_MAX_RECORD_BYTES,
          true
        );
        if (revisionPublication === "occupied") {
          throw new JarvisChatPolicyError(409, "revision_conflict", "A concurrent Jarvis chat action owns the next immutable revision.");
        }
        replaceWithExactReadback(
          root,
          [...conversationSegments(next.conversationId), "head.json"],
          `.head-${next.revision}-${next.recordDigest.slice(0, 12)}.tmp`,
          bytes,
          head.bytes,
          JARVIS_CHAT_MAX_RECORD_BYTES,
          "revision_conflict",
          "A concurrent Jarvis chat action changed the conversation."
        );
        verifyIdempotencyRevisions(root, next);
          return next;
        }, "revision_conflict", "Jarvis chat conversation remained concurrently unavailable.")
      );
    },

    async deleteConversation(input) {
      const expected = assertJarvisChatConversation(input.expected);
      if (expected.state !== "deleting" || expected.pendingOperation?.action !== "delete_conversation") invalidPersistence();
      if (
        !hex(input.deletionKeyHash, 64) ||
        !hex(input.deletionRequestDigest, 64) ||
        !hex(input.deletionRequestId, 32) ||
        !hex(input.deletionAuditId, 24) ||
        (input.recovery !== null &&
          (!hex(input.recovery.keyHash, 64) ||
            !hex(input.recovery.requestDigest, 64) ||
            !hex(input.recovery.requestId, 32))) ||
        !iso(input.deletedAt)
      ) invalidPersistence();
      return withPrivateAlphaNativeRoot(dataRootLabel, (root) =>
        withNativeContentionRetry(() => {
        if (!rootHasChat(root)) missingConversation();
        const found = readSlots(root).find(({ slot }) => slot.conversationId === expected.conversationId);
        if (!found) missingConversation();
        let current = found.slot;
        let currentBytes = found.bytes;
        if (current.state === "published") {
          const deleting = sealSlot({
            ...slotWithoutDigest(current),
            state: "deleting",
            initialConversation: null,
            deletionKeyHash: input.deletionKeyHash,
            deletionRequestDigest: input.deletionRequestDigest,
            deletionRequestId: input.deletionRequestId,
            deletionAuditId: input.deletionAuditId,
            recoveryKeyHash: input.recovery?.keyHash ?? null,
            recoveryRequestDigest: input.recovery?.requestDigest ?? null,
            recoveryRequestId: input.recovery?.requestId ?? null,
            deletedTitleDigest: hashJarvisChatSha256(expected.title),
            finalRevision: expected.revision,
            finalRecordDigest: expected.recordDigest,
            deletedAt: input.deletedAt,
          });
          const deletingBytes = encodeSlot(deleting);
          root.writeAtomicReplace([...SLOTS, slotName(current.slot)], `.slot-${current.slot}-deleting.tmp`, deletingBytes, currentBytes, null, null);
          current = deleting;
          currentBytes = deletingBytes;
          if (testing) testingHooks?.afterDeletionSlotMarkedDeleting?.();
        }
        if (
          (current.state !== "deleting" && current.state !== "deleted") ||
          current.deletionKeyHash !== input.deletionKeyHash ||
          current.deletionRequestDigest !== input.deletionRequestDigest ||
          current.deletionRequestId !== input.deletionRequestId ||
          current.deletionAuditId !== input.deletionAuditId
        ) {
          throw new JarvisChatPolicyError(409, "idempotency_conflict", "Conversation deletion conflicts with its exact prior request.");
        }
        if (input.recovery) {
          const exactRecovery =
            current.recoveryKeyHash === input.recovery.keyHash &&
            current.recoveryRequestDigest === input.recovery.requestDigest;
          if (current.recoveryKeyHash === null) {
            const claimed = sealSlot({
              ...slotWithoutDigest(current),
              recoveryKeyHash: input.recovery.keyHash,
              recoveryRequestDigest: input.recovery.requestDigest,
              recoveryRequestId: input.recovery.requestId,
            });
            const claimedBytes = encodeSlot(claimed);
            root.writeAtomicReplace(
              [...SLOTS, slotName(current.slot)],
              `.slot-${current.slot}-recovery.tmp`,
              claimedBytes,
              currentBytes,
              null,
              null
            );
            current = claimed;
            currentBytes = claimedBytes;
          } else if (!exactRecovery) {
            throw new JarvisChatPolicyError(409, "idempotency_conflict", "Conversation recovery conflicts with its exact prior request.");
          }
        } else if (current.recoveryKeyHash !== null) {
          throw new JarvisChatPolicyError(409, "idempotency_conflict", "Conversation deletion is already owned by an exact recovery request.");
        }
        if (current.state === "deleting") {
          try {
            root.removeTree(conversationSegments(expected.conversationId));
          } catch (error) {
            if (!isNative(error, "not_found")) throw error;
          }
          const completedAt = new Date(
            Math.max(Date.now(), Date.parse(current.deletedAt!) + 1)
          ).toISOString();
          const deleted = sealSlot({
            ...slotWithoutDigest(current),
            state: "deleted",
            deletedAt: completedAt,
          });
          root.writeAtomicReplace([...SLOTS, slotName(current.slot)], `.slot-${current.slot}-deleted.tmp`, encodeSlot(deleted), currentBytes, null, null);
          current = deleted;
        }
        return tombstone(current);
        }, "revision_conflict", "Conversation deletion remained concurrently unavailable.")
      );
    },

    async getDeletionTombstone(conversationId, resume = null) {
      if (!hex(conversationId, 24) || !privateAlphaNativeRootExists(dataRootLabel)) return null;
      if (
        resume !== null &&
        (!hex(resume.keyHash, 64) ||
          !hex(resume.requestDigest, 64) ||
          (resume.kind === "recovery" &&
            (!hex(resume.requestId, 32) || !Number.isSafeInteger(resume.expectedRevision) || resume.expectedRevision < 1)))
      ) invalidPersistence();
      let recoveryClaimedByThisCall = false;
      return withPrivateAlphaNativeRoot(dataRootLabel, (root) =>
        withNativeContentionRetry(() => {
        if (!rootHasChat(root)) return null;
        let entry = readSlots(root).find((candidate) => candidate.slot.conversationId === conversationId);
        if (!entry) return null;
        if (entry.slot.state === "deleted" && resume?.kind === "recovery") {
          if (entry.slot.finalRevision !== resume.expectedRevision) {
            throw new JarvisChatPolicyError(409, "revision_conflict", "Deleted conversation recovery requires the exact final revision.");
          }
          if (entry.slot.deletionKeyHash === resume.keyHash) {
            throw new JarvisChatPolicyError(409, "idempotency_conflict", "Recovery requires a new idempotency key distinct from deletion.");
          }
          if (entry.slot.recoveryKeyHash === null) {
            const claimed = sealSlot({
              ...slotWithoutDigest(entry.slot),
              recoveryKeyHash: resume.keyHash,
              recoveryRequestDigest: resume.requestDigest,
              recoveryRequestId: resume.requestId,
            });
            try {
              root.writeAtomicReplace(
                [...SLOTS, slotName(entry.slot.slot)],
                `.slot-${entry.slot.slot}-recovery.tmp`,
                encodeSlot(claimed),
                entry.bytes,
                null,
                null
              );
              recoveryClaimedByThisCall = true;
              if (testing) testingHooks?.afterDeletionRecoveryClaimed?.();
            } catch (error) {
              if (!isNative(error, "compare_mismatch")) throw error;
            }
            entry = readSlots(root).find((candidate) => candidate.slot.conversationId === conversationId);
            if (!entry) invalidPersistence();
          }
          if (
            entry.slot.recoveryKeyHash !== resume.keyHash ||
            entry.slot.recoveryRequestDigest !== resume.requestDigest
          ) {
            throw new JarvisChatPolicyError(409, "idempotency_conflict", "Conversation recovery conflicts with its exact prior request.");
          }
        }
        if (entry.slot.state === "deleting") {
          if (!resume) return null;
          if (resume.kind === "recovery" && entry.slot.finalRevision !== resume.expectedRevision) {
            throw new JarvisChatPolicyError(409, "revision_conflict", "Deleted conversation recovery requires the exact final revision.");
          }
          if (resume.kind === "recovery" && entry.slot.deletionKeyHash === resume.keyHash) {
            throw new JarvisChatPolicyError(409, "idempotency_conflict", "Recovery requires a new idempotency key distinct from deletion.");
          }
          if (
            resume.kind === "deletion" &&
            (entry.slot.deletionKeyHash !== resume.keyHash ||
              entry.slot.deletionRequestDigest !== resume.requestDigest)
          ) {
            throw new JarvisChatPolicyError(409, "idempotency_conflict", "Conversation deletion conflicts with its exact prior request.");
          }
          if (resume.kind === "recovery") {
            if (entry.slot.recoveryKeyHash === null) {
              const claimed = sealSlot({
                ...slotWithoutDigest(entry.slot),
                recoveryKeyHash: resume.keyHash,
                recoveryRequestDigest: resume.requestDigest,
                recoveryRequestId: resume.requestId,
              });
              const claimedBytes = encodeSlot(claimed);
              try {
                root.writeAtomicReplace(
                  [...SLOTS, slotName(entry.slot.slot)],
                  `.slot-${entry.slot.slot}-recovery.tmp`,
                  claimedBytes,
                  entry.bytes,
                  null,
                  null
                );
                recoveryClaimedByThisCall = true;
                if (testing) testingHooks?.afterDeletionRecoveryClaimed?.();
              } catch (error) {
                if (!isNative(error, "compare_mismatch")) throw error;
              }
              entry = readSlots(root).find((candidate) => candidate.slot.conversationId === conversationId);
              if (!entry) invalidPersistence();
            }
            if (
              entry.slot.recoveryKeyHash !== resume.keyHash ||
              entry.slot.recoveryRequestDigest !== resume.requestDigest
            ) {
              throw new JarvisChatPolicyError(409, "idempotency_conflict", "Conversation recovery conflicts with its exact prior request.");
            }
          }
          try {
            root.removeTree(conversationSegments(conversationId));
          } catch (error) {
            if (!isNative(error, "not_found")) throw error;
          }
          const current = readSlots(root).find((candidate) => candidate.slot.conversationId === conversationId);
          if (!current) invalidPersistence();
          if (current.slot.state === "deleted") {
            return { tombstone: tombstone(current.slot), recoveryClaimed: recoveryClaimedByThisCall };
          }
          if (current.slot.state !== "deleting") invalidPersistence();
          const completedAt = new Date(
            Math.max(Date.now(), Date.parse(current.slot.deletedAt!) + 1)
          ).toISOString();
          const deleted = sealSlot({
            ...slotWithoutDigest(current.slot),
            state: "deleted",
            deletedAt: completedAt,
          });
          try {
            root.writeAtomicReplace(
              [...SLOTS, slotName(current.slot.slot)],
              `.slot-${current.slot.slot}-deleted.tmp`,
              encodeSlot(deleted),
              current.bytes,
              null,
              null
            );
          } catch (error) {
            if (!isNative(error, "compare_mismatch")) throw error;
          }
          const finalSlot = readSlots(root).find((candidate) => candidate.slot.conversationId === conversationId)?.slot;
          return finalSlot?.state === "deleted"
            ? { tombstone: tombstone(finalSlot), recoveryClaimed: recoveryClaimedByThisCall }
            : null;
        }
        return entry.slot.state === "deleted"
          ? { tombstone: tombstone(entry.slot), recoveryClaimed: recoveryClaimedByThisCall }
          : null;
        }, "revision_conflict", "Conversation deletion recovery remained concurrently unavailable.")
      );
    },

    async cleanupTestData() {
      if (!testing) {
        throw new JarvisChatPolicyError(403, "cleanup_forbidden", "Production Jarvis chat persistence cannot be cleaned through a test lifecycle.");
      }
      if (!privateAlphaNativeRootExists(dataRootLabel)) return;
      for (let attempt = 0; attempt < TEST_CLEANUP_CONTENTION_ATTEMPTS; attempt += 1) {
        try {
          const complete = withPrivateAlphaNativeRoot(dataRootLabel, (root) => {
            if (!rootHasChat(root)) return true;
            root.removeTree(ROOT);
            return !rootHasChat(root);
          });
          if (complete) return;
        } catch (error) {
          if (!isNativeContention(error)) throw error;
        }
        if (attempt + 1 < TEST_CLEANUP_CONTENTION_ATTEMPTS) {
          await new Promise<void>((resolve) => setTimeout(resolve, TEST_CLEANUP_RETRY_DELAY_MS));
        }
      }
      throw new JarvisChatPolicyError(
        409,
        "revision_conflict",
        "Jarvis chat deterministic cleanup remained concurrently unavailable."
      );
    },
  };
}

export function createJarvisChatPersistence(): JarvisChatPersistence {
  return buildPersistence(PRIVATE_ALPHA_DATA_ROOT_LABEL, false);
}

export function createJarvisChatPersistenceForTesting(
  testSuffix: string,
  testingHooks: JarvisChatPersistenceTestingHooks | null = null
): JarvisChatPersistence {
  return buildPersistence(buildPrivateAlphaTestingDataRootLabel(testSuffix), true, testingHooks);
}
