import "server-only";

import {
  CREATOR_IDEMPOTENCY_KEY_PATTERN,
  CREATOR_MAX_DESCRIPTION_LENGTH,
  CREATOR_MAX_PROJECT_TITLE_LENGTH,
  CREATOR_PROJECT_ID_PATTERN,
} from "@/lib/codexforge/creator/creator-policy";
import { validateCreatorCreateProjectInput } from "@/lib/codexforge/creator/creator-service.server";
import {
  JARVIS_CHAT_MAX_IDEMPOTENCY_KEY_CHARACTERS,
  JARVIS_CHAT_MIN_IDEMPOTENCY_KEY_CHARACTERS,
  validateJarvisChatExpectedRevision,
} from "@/lib/codexforge/jarvis-chat/jarvis-chat-policy";
import {
  JARVIS_CREATOR_HANDOFF_PROTOCOL_VERSION,
  JARVIS_CREATOR_HANDOFF_REVIEW_ACKNOWLEDGEMENT,
  JARVIS_CREATOR_HANDOFF_RESUME_ACKNOWLEDGEMENT,
  type JarvisCreatorHandoffMutationBody,
  type JarvisCreatorHandoffPrepareInput,
  type JarvisCreatorHandoffRecoveryAction,
} from "./jarvis-creator-handoff-types";

export const JARVIS_CREATOR_HANDOFF_MAX_RECORDS = 768;
export const JARVIS_CREATOR_HANDOFF_MAX_IDEMPOTENCY_CLAIMS = 6_144;
export const JARVIS_CREATOR_HANDOFF_MAX_LIST_LIMIT = 64;
export const JARVIS_CREATOR_HANDOFF_MAX_RECORD_BYTES = 32_768;
export const JARVIS_CREATOR_HANDOFF_MAX_HTTP_BODY_BYTES = 16_384;
export const JARVIS_CREATOR_HANDOFF_MAX_FAILURE_MESSAGE_CHARACTERS = 240;

const HEX_24 = /^[a-f0-9]{24}$/u;
const SHA_256 = /^[a-f0-9]{64}$/u;
const SAFE_IDEMPOTENCY_KEY = /^[A-Za-z0-9][A-Za-z0-9._:-]*$/u;

export class JarvisCreatorHandoffError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string
  ) {
    super(message.slice(0, JARVIS_CREATOR_HANDOFF_MAX_FAILURE_MESSAGE_CHARACTERS));
    this.name = "JarvisCreatorHandoffError";
  }
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function hasExactKeys(value: Record<string, unknown>, expected: readonly string[]): boolean {
  const actual = Object.keys(value).sort();
  const wanted = [...expected].sort();
  return actual.length === wanted.length && actual.every((key, index) => key === wanted[index]);
}

function exactHex(value: unknown, pattern: RegExp, field: string): string {
  if (typeof value !== "string" || !pattern.test(value)) {
    throw new JarvisCreatorHandoffError(400, "invalid_request", `${field} is invalid.`);
  }
  return value;
}

function exactPositiveInteger(value: unknown, field: string, maximum?: number): number {
  if (
    !Number.isSafeInteger(value) ||
    (value as number) < 1 ||
    (maximum !== undefined && (value as number) > maximum)
  ) {
    throw new JarvisCreatorHandoffError(
      400,
      "invalid_request",
      `${field} must be one exact positive bounded integer.`
    );
  }
  return value as number;
}

function exactNonnegativeInteger(value: unknown, field: string, maximum: number): number {
  if (!Number.isSafeInteger(value) || (value as number) < 0 || (value as number) > maximum) {
    throw new JarvisCreatorHandoffError(
      400,
      "invalid_request",
      `${field} must be one exact nonnegative bounded integer.`
    );
  }
  return value as number;
}

export function validateJarvisCreatorHandoffConversationId(value: unknown): string {
  return exactHex(value, HEX_24, "conversationId");
}

export function validateJarvisCreatorHandoffId(value: unknown): string {
  return exactHex(value, HEX_24, "handoffId");
}

export function validateJarvisCreatorHandoffIdempotencyKey(value: unknown): string {
  if (
    typeof value !== "string" ||
    value.length < JARVIS_CHAT_MIN_IDEMPOTENCY_KEY_CHARACTERS ||
    value.length > JARVIS_CHAT_MAX_IDEMPOTENCY_KEY_CHARACTERS ||
    !SAFE_IDEMPOTENCY_KEY.test(value)
  ) {
    throw new JarvisCreatorHandoffError(
      400,
      "idempotency_key_required",
      "Jarvis creator handoffs require one bounded Idempotency-Key."
    );
  }
  return value;
}

export function validateJarvisCreatorHandoffInput(
  conversationId: unknown,
  body: unknown
): JarvisCreatorHandoffPrepareInput {
  const record = asRecord(body);
  const exactConversationId = validateJarvisCreatorHandoffConversationId(conversationId);
  if (!record || (record.operation !== "create" && record.operation !== "revise")) {
    throw new JarvisCreatorHandoffError(400, "invalid_request", "Jarvis creator handoff body is invalid.");
  }
  const common = [
    "operation",
    "expectedConversationRevision",
    "sourceTurnId",
    "sourceMessageId",
    "sourceMessageDigest",
    "creatorKind",
    "projectTitle",
    "description",
    "acknowledgement",
  ] as const;
  const expected = record.operation === "create"
    ? common
    : [
        ...common,
        "sourceProjectId",
        "sourceProjectStatus",
        "sourceProjectStateRevision",
        "sourceArtifactRevision",
        "sourceManifestDigest",
        "sourceAggregateDigest",
        "sourceValidationDigest",
        "sourceRunBindingsDigest",
        "sourceRunBindingCount",
        "sourceExplicitRevisionCount",
      ];
  if (!hasExactKeys(record, expected) || record.acknowledgement !== true) {
    throw new JarvisCreatorHandoffError(
      400,
      "invalid_request",
      "Jarvis creator handoff requires one exact reviewed request and acknowledgement."
    );
  }
  const creatorInput = validateCreatorCreateProjectInput({
    creatorKind: record.creatorKind,
    projectTitle: record.projectTitle,
    description: record.description,
  });
  const base = {
    conversationId: exactConversationId,
    operation: record.operation,
    expectedConversationRevision: validateJarvisChatExpectedRevision(
      record.expectedConversationRevision
    ),
    sourceTurnId: exactHex(record.sourceTurnId, HEX_24, "sourceTurnId"),
    sourceMessageId: exactHex(record.sourceMessageId, HEX_24, "sourceMessageId"),
    sourceMessageDigest: exactHex(record.sourceMessageDigest, SHA_256, "sourceMessageDigest"),
    creatorKind: creatorInput.creatorKind,
    projectTitle: creatorInput.projectTitle,
    description: creatorInput.description,
    acknowledgement: true as const,
  };
  if (record.operation === "create") {
    return { ...base, operation: "create" };
  }
  if (record.sourceProjectStatus !== "ready") {
    throw new JarvisCreatorHandoffError(
      400,
      "invalid_request",
      "sourceProjectStatus must be exactly ready."
    );
  }
  return {
    ...base,
    operation: "revise",
    sourceProjectId: exactHex(record.sourceProjectId, CREATOR_PROJECT_ID_PATTERN, "sourceProjectId"),
    sourceProjectStatus: "ready",
    sourceProjectStateRevision: exactPositiveInteger(record.sourceProjectStateRevision, "sourceProjectStateRevision"),
    sourceArtifactRevision: exactPositiveInteger(record.sourceArtifactRevision, "sourceArtifactRevision", 4),
    sourceManifestDigest: exactHex(record.sourceManifestDigest, SHA_256, "sourceManifestDigest"),
    sourceAggregateDigest: exactHex(record.sourceAggregateDigest, SHA_256, "sourceAggregateDigest"),
    sourceValidationDigest: exactHex(record.sourceValidationDigest, SHA_256, "sourceValidationDigest"),
    sourceRunBindingsDigest: exactHex(record.sourceRunBindingsDigest, SHA_256, "sourceRunBindingsDigest"),
    sourceRunBindingCount: exactPositiveInteger(record.sourceRunBindingCount, "sourceRunBindingCount", 3),
    sourceExplicitRevisionCount: exactNonnegativeInteger(record.sourceExplicitRevisionCount, "sourceExplicitRevisionCount", 1),
  };
}

export function handoffMutationBody(input: JarvisCreatorHandoffPrepareInput): JarvisCreatorHandoffMutationBody {
  const { conversationId: _conversationId, ...body } = input;
  return body;
}

export function jarvisCreatorHandoffSemanticMaterial(input: JarvisCreatorHandoffPrepareInput) {
  return {
    protocolVersion: JARVIS_CREATOR_HANDOFF_PROTOCOL_VERSION,
    operation: input.operation,
    source: {
      conversationId: input.conversationId,
      turnId: input.sourceTurnId,
      messageId: input.sourceMessageId,
      messageDigest: input.sourceMessageDigest,
    },
    reviewedRequest: {
      creatorKind: input.creatorKind,
      projectTitle: input.projectTitle,
      description: input.description,
    },
    revisionSelector: input.operation === "revise"
      ? {
          projectId: input.sourceProjectId,
          sourceProjectStatus: input.sourceProjectStatus,
          sourceProjectStateRevision: input.sourceProjectStateRevision,
          sourceArtifactRevision: input.sourceArtifactRevision,
          sourceManifestDigest: input.sourceManifestDigest,
          sourceAggregateDigest: input.sourceAggregateDigest,
          sourceValidationDigest: input.sourceValidationDigest,
          sourceRunBindingsDigest: input.sourceRunBindingsDigest,
          sourceRunBindingCount: input.sourceRunBindingCount,
          sourceExplicitRevisionCount: input.sourceExplicitRevisionCount,
        }
      : null,
    acknowledgement: true,
  };
}

export function validateJarvisCreatorHandoffRecoveryAction(
  body: unknown
): JarvisCreatorHandoffRecoveryAction {
  const record = asRecord(body);
  if (!record || (record.action !== "review" && record.action !== "resume")) {
    throw new JarvisCreatorHandoffError(400, "invalid_request", "Creator handoff recovery action is invalid.");
  }
  if (record.action === "review") {
    if (
      !hasExactKeys(record, ["action", "expectedHandoffRecordDigest", "acknowledgement"]) ||
      record.acknowledgement !== JARVIS_CREATOR_HANDOFF_REVIEW_ACKNOWLEDGEMENT
    ) {
      throw new JarvisCreatorHandoffError(400, "invalid_request", "Exact reviewed-request acknowledgement is required.");
    }
    return {
      action: "review",
      expectedHandoffRecordDigest: exactHex(record.expectedHandoffRecordDigest, SHA_256, "expectedHandoffRecordDigest"),
      acknowledgement: JARVIS_CREATOR_HANDOFF_REVIEW_ACKNOWLEDGEMENT,
    };
  }
  if (
    !hasExactKeys(record, ["action", "expectedHandoffRecordDigest", "reviewedRequestDigest", "acknowledgement"]) ||
    record.acknowledgement !== JARVIS_CREATOR_HANDOFF_RESUME_ACKNOWLEDGEMENT
  ) {
    throw new JarvisCreatorHandoffError(400, "invalid_request", "Exact creator handoff resume acknowledgement is required.");
  }
  return {
    action: "resume",
    expectedHandoffRecordDigest: exactHex(record.expectedHandoffRecordDigest, SHA_256, "expectedHandoffRecordDigest"),
    reviewedRequestDigest: exactHex(record.reviewedRequestDigest, SHA_256, "reviewedRequestDigest"),
    acknowledgement: JARVIS_CREATOR_HANDOFF_RESUME_ACKNOWLEDGEMENT,
  };
}

export function assertJarvisCreatorHandoffInternalKey(value: string): string {
  if (!CREATOR_IDEMPOTENCY_KEY_PATTERN.test(value)) {
    throw new JarvisCreatorHandoffError(500, "handoff_corrupt", "Creator handoff internal key is invalid.");
  }
  return value;
}

export function assertJarvisCreatorHandoffBoundsForTesting(): void {
  if (CREATOR_MAX_PROJECT_TITLE_LENGTH !== 80 || CREATOR_MAX_DESCRIPTION_LENGTH !== 2_000) {
    throw new Error("Jarvis and Creator reviewed field bounds diverged.");
  }
}
