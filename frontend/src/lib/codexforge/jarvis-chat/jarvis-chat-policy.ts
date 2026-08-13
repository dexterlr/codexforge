import {
  JARVIS_CHAT_AUDIT_EVENT_TYPES,
  JARVIS_CHAT_CONVERSATION_STATES,
  JARVIS_CHAT_MUTATION_ACTIONS,
  JARVIS_CHAT_TURN_STATES,
  type JarvisChatActionInput,
  type JarvisChatContextMode,
  type JarvisChatCreateConversationInput,
} from "./jarvis-chat-types";

export const JARVIS_CHAT_MAX_CONVERSATIONS = 64;
export const JARVIS_CHAT_MAX_TURNS = 8;
export const JARVIS_CHAT_MAX_CONTEXT_MESSAGES = 12;
export const JARVIS_CHAT_MAX_CONTEXT_CHARACTERS = 4_800;
export const JARVIS_CHAT_MAX_USER_MESSAGE_CHARACTERS = 2_000;
export const JARVIS_CHAT_MAX_ASSISTANT_MESSAGE_CHARACTERS = 65_536;
export const JARVIS_CHAT_MAX_ASSISTANT_MESSAGE_BYTES = 65_536;
export const JARVIS_CHAT_MAX_PROVIDER_REQUEST_CHARACTERS = 7_800;
export const JARVIS_CHAT_MAX_PROVIDER_REQUEST_BYTES = 16_384;
export const JARVIS_CHAT_MAX_TITLE_CHARACTERS = 80;
export const JARVIS_CHAT_MAX_FAILURE_MESSAGE_CHARACTERS = 240;
export const JARVIS_CHAT_MAX_CANCELLATION_REASON_CHARACTERS = 240;
export const JARVIS_CHAT_MAX_AUDIT_EVENTS = 96;
export const JARVIS_CHAT_MAX_IDEMPOTENCY_RECORDS = 64;
export const JARVIS_CHAT_MAX_REVISIONS = 256;
export const JARVIS_CHAT_MAX_RECORD_BYTES = 1_048_576;
export const JARVIS_CHAT_MAX_HTTP_BODY_BYTES = 16_384;
export const JARVIS_CHAT_MIN_IDEMPOTENCY_KEY_CHARACTERS = 16;
export const JARVIS_CHAT_MAX_IDEMPOTENCY_KEY_CHARACTERS = 128;

const EXACT_OBJECT_KEY = /^[A-Za-z][A-Za-z0-9]*$/u;
const IDEMPOTENCY_KEY = /^[A-Za-z0-9][A-Za-z0-9._:-]*$/u;

export class JarvisChatPolicyError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string
  ) {
    super(message.slice(0, JARVIS_CHAT_MAX_FAILURE_MESSAGE_CHARACTERS));
    this.name = "JarvisChatPolicyError";
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasExactKeys(
  value: Record<string, unknown>,
  expected: readonly string[]
): boolean {
  const actual = Object.keys(value).sort();
  const canonicalExpected = [...expected].sort();
  return (
    actual.length === canonicalExpected.length &&
    actual.every(
      (key, index) =>
        EXACT_OBJECT_KEY.test(key) && key === canonicalExpected[index]
    )
  );
}

export function normalizeJarvisChatUserMessage(value: unknown): string {
  if (typeof value !== "string") {
    throw new JarvisChatPolicyError(
      400,
      "invalid_message",
      "Jarvis chat requires one textual user message."
    );
  }
  const normalized = value.replace(/\r\n?/gu, "\n").normalize("NFC").trim();
  if (
    normalized.length < 1 ||
    normalized.length > JARVIS_CHAT_MAX_USER_MESSAGE_CHARACTERS ||
    /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f\p{Cf}\p{Cs}]/u.test(normalized)
  ) {
    throw new JarvisChatPolicyError(
      400,
      "invalid_message",
      `Jarvis chat messages must contain 1-${JARVIS_CHAT_MAX_USER_MESSAGE_CHARACTERS} safe characters.`
    );
  }
  return normalized;
}

export function validateJarvisChatIdempotencyKey(value: unknown): string {
  if (
    typeof value !== "string" ||
    value.length < JARVIS_CHAT_MIN_IDEMPOTENCY_KEY_CHARACTERS ||
    value.length > JARVIS_CHAT_MAX_IDEMPOTENCY_KEY_CHARACTERS ||
    !IDEMPOTENCY_KEY.test(value)
  ) {
    throw new JarvisChatPolicyError(
      400,
      "idempotency_key_required",
      `Jarvis chat mutations require an Idempotency-Key containing ${JARVIS_CHAT_MIN_IDEMPOTENCY_KEY_CHARACTERS}-${JARVIS_CHAT_MAX_IDEMPOTENCY_KEY_CHARACTERS} safe characters.`
    );
  }
  return value;
}

export function validateJarvisChatExpectedRevision(value: unknown): number {
  if (!Number.isSafeInteger(value) || (value as number) < 1) {
    throw new JarvisChatPolicyError(
      409,
      "revision_conflict",
      "Jarvis chat mutation requires one exact positive conversation revision."
    );
  }
  return value as number;
}

export function validateJarvisChatCreateInput(
  value: unknown
): JarvisChatCreateConversationInput {
  if (!isRecord(value) || !hasExactKeys(value, ["message"])) {
    throw new JarvisChatPolicyError(
      400,
      "invalid_request",
      "Jarvis chat create request has an invalid shape."
    );
  }
  return { message: normalizeJarvisChatUserMessage(value.message) };
}

export function validateJarvisChatActionInput(
  value: unknown
): JarvisChatActionInput {
  if (!isRecord(value) || typeof value.action !== "string") {
    throw new JarvisChatPolicyError(
      400,
      "invalid_request",
      "Jarvis chat action request has an invalid shape."
    );
  }
  const expectedRevision = validateJarvisChatExpectedRevision(
    value.expectedRevision
  );
  switch (value.action) {
    case "append-turn":
      if (!hasExactKeys(value, ["action", "expectedRevision", "message", "contextMode"]) || !isJarvisChatContextMode(value.contextMode)) {
        break;
      }
      return {
        action: "append-turn",
        expectedRevision,
        message: normalizeJarvisChatUserMessage(value.message),
        contextMode: value.contextMode,
      };
    case "approve-turn":
    case "execute-turn":
      if (
        !hasExactKeys(value, [
          "action",
          "expectedRevision",
          "approvalScopeHash",
          "acknowledgement",
        ]) ||
        value.acknowledgement !== true ||
        typeof value.approvalScopeHash !== "string" ||
        !/^[a-f0-9]{64}$/u.test(value.approvalScopeHash)
      ) {
        break;
      }
      return {
        action: value.action,
        expectedRevision,
        approvalScopeHash: value.approvalScopeHash,
        acknowledgement: true,
      };
    case "cancel-turn":
      if (
        !hasExactKeys(value, [
          "action",
          "expectedRevision",
          "reason",
        ]) ||
        typeof value.reason !== "string"
      ) {
        break;
      }
      {
        const reason = value.reason
          .replace(/\r\n?/gu, "\n")
          .normalize("NFC")
          .trim();
        if (
          reason.length < 1 ||
          reason.length > JARVIS_CHAT_MAX_CANCELLATION_REASON_CHARACTERS ||
          /[\u0000-\u001f\u007f-\u009f\p{Cf}\p{Cs}]/u.test(reason)
        ) {
          break;
        }
        return {
          action: "cancel-turn",
          expectedRevision,
          reason,
        };
      }
    case "recover-turn":
      if (!hasExactKeys(value, ["action", "expectedRevision"])) break;
      return { action: "recover-turn", expectedRevision };
    case "stop-turn":
      if (!hasExactKeys(value, ["action", "expectedRevision"])) break;
      return { action: "stop-turn", expectedRevision };
    case "rename-conversation":
      if (!hasExactKeys(value, ["action", "expectedRevision", "title"]) || typeof value.title !== "string") break;
      {
        const title = value.title.normalize("NFC").trim();
        if (!title || title.length > JARVIS_CHAT_MAX_TITLE_CHARACTERS || /[\u0000-\u001f\u007f-\u009f\p{Cf}\p{Cs}]/u.test(title)) break;
        return { action: "rename-conversation", expectedRevision, title };
      }
    case "delete-conversation":
      if (
        !hasExactKeys(value, ["action", "expectedRevision", "confirmationConversationId"]) ||
        typeof value.confirmationConversationId !== "string" ||
        !/^[a-f0-9]{24}$/u.test(value.confirmationConversationId)
      ) break;
      return {
        action: "delete-conversation",
        expectedRevision,
        confirmationConversationId: value.confirmationConversationId,
      };
    default:
      break;
  }
  throw new JarvisChatPolicyError(
    400,
    "invalid_request",
    "Jarvis chat action request has an invalid or unsupported shape."
  );
}

export function isJarvisChatContextMode(value: unknown): value is JarvisChatContextMode {
  return value === "conversation" || value === "none";
}

export function sanitizeJarvisChatTestSuffix(value: string): string {
  const normalized = value.trim().toLowerCase();
  if (!/^[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?$/u.test(normalized)) {
    throw new JarvisChatPolicyError(400, "invalid_test_boundary", "Jarvis chat deterministic test suffix is invalid.");
  }
  return normalized;
}

export function isJarvisChatConversationState(
  value: unknown
): value is (typeof JARVIS_CHAT_CONVERSATION_STATES)[number] {
  return (
    typeof value === "string" &&
    JARVIS_CHAT_CONVERSATION_STATES.includes(
      value as (typeof JARVIS_CHAT_CONVERSATION_STATES)[number]
    )
  );
}

export function isJarvisChatTurnState(
  value: unknown
): value is (typeof JARVIS_CHAT_TURN_STATES)[number] {
  return (
    typeof value === "string" &&
    JARVIS_CHAT_TURN_STATES.includes(
      value as (typeof JARVIS_CHAT_TURN_STATES)[number]
    )
  );
}

export function isJarvisChatAuditEventType(
  value: unknown
): value is (typeof JARVIS_CHAT_AUDIT_EVENT_TYPES)[number] {
  return (
    typeof value === "string" &&
    JARVIS_CHAT_AUDIT_EVENT_TYPES.includes(
      value as (typeof JARVIS_CHAT_AUDIT_EVENT_TYPES)[number]
    )
  );
}

export function isJarvisChatMutationAction(
  value: unknown
): value is (typeof JARVIS_CHAT_MUTATION_ACTIONS)[number] {
  return (
    typeof value === "string" &&
    JARVIS_CHAT_MUTATION_ACTIONS.includes(
      value as (typeof JARVIS_CHAT_MUTATION_ACTIONS)[number]
    )
  );
}
