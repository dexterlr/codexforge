import "server-only";

import { hashCreatorSha256 } from "@/lib/codexforge/creator/creator-crypto";
import { assertCreatorJsonHasUniqueObjectKeys } from "@/lib/codexforge/creator/creator-contract.server";
import { CreatorFilesystemError } from "@/lib/codexforge/creator/creator-filesystem.server";
import {
  CreatorPersistenceError,
  type CreatorPersistence,
} from "@/lib/codexforge/creator/creator-persistence.server";
import {
  CREATOR_PRODUCTION_DATA_ROOT_LABEL,
  buildCreatorTestDataRootLabel,
} from "@/lib/codexforge/creator/creator-policy";
import { validateCreatorCreateProjectInput } from "@/lib/codexforge/creator/creator-service.server";
import {
  buildJarvisCreatorHandoffCreatorKey,
  buildJarvisCreatorHandoffFinalizationLockId,
  buildJarvisCreatorHandoffId,
  buildJarvisCreatorHandoffMutationDigest,
  buildJarvisCreatorHandoffSemanticDigest,
  hashJarvisCreatorHandoffCanonicalJson,
  serializeJarvisCreatorHandoffCanonicalJson,
} from "./jarvis-creator-handoff-crypto";
import {
  JARVIS_CREATOR_HANDOFF_MAX_IDEMPOTENCY_CLAIMS,
  JARVIS_CREATOR_HANDOFF_MAX_LIST_LIMIT,
  JARVIS_CREATOR_HANDOFF_MAX_RECORD_BYTES,
  JARVIS_CREATOR_HANDOFF_MAX_RECORDS,
  JarvisCreatorHandoffError,
  handoffMutationBody,
  jarvisCreatorHandoffSemanticMaterial,
} from "./jarvis-creator-handoff-policy";
import {
  JARVIS_CREATOR_HANDOFF_PROTOCOL_VERSION,
  JARVIS_CREATOR_HANDOFF_RECORD_VERSION,
  type JarvisCreatorHandoffFailedRecord,
  type JarvisCreatorHandoffPrepareInput,
  type JarvisCreatorHandoffPreparedRecord,
  type JarvisCreatorHandoffPreparingRecord,
  type JarvisCreatorHandoffRecord,
  type JarvisCreatorHandoffSummary,
  type JarvisCreatorHandoffTerminalRecord,
} from "./jarvis-creator-handoff-types";

const HANDOFF_ID = /^[a-f0-9]{24}$/u;
const SHA_256 = /^[a-f0-9]{64}$/u;
const SAFE_CODE = /^[a-z][a-z0-9_]{0,63}$/u;
const REVISION_FILE = /^00000([12])\.json$/u;
const CLAIM_FILE = /^([a-f0-9]{64})\.json$/u;

export type HandoffIdempotencyClaim = Readonly<{
  recordVersion: 1;
  idempotencyKeyHash: string;
  mutationDigest: string;
  semanticDigest: string;
  handoffId: string;
  initialRecordDigest: string;
  createdAt: string;
  claimDigest: string;
}>;

type HandoffIdempotencyClaimInput = Omit<
  HandoffIdempotencyClaim,
  "recordVersion" | "claimDigest"
>;

type InitialClaimInput = Omit<
  HandoffIdempotencyClaimInput,
  "initialRecordDigest" | "createdAt"
>;

export type JarvisCreatorHandoffClaimedRecord = Readonly<{
  claim: HandoffIdempotencyClaim;
  record: JarvisCreatorHandoffRecord;
}>;

export type JarvisCreatorHandoffPersistence = Readonly<{
  dataRootLabel: string;
  admitInitial: (
    record: JarvisCreatorHandoffPreparingRecord,
    claim: InitialClaimInput
  ) => Promise<Readonly<{
    created: boolean;
    record: JarvisCreatorHandoffPreparingRecord;
    claimCreated: boolean;
    claim: HandoffIdempotencyClaim;
  }>>;
  claimIdempotency: (
    input: HandoffIdempotencyClaimInput
  ) => Promise<Readonly<{
    created: boolean;
    claim: HandoffIdempotencyClaim;
    record: JarvisCreatorHandoffRecord;
  }>>;
  readByIdempotencyKeyHash: (
    keyHash: string
  ) => Promise<JarvisCreatorHandoffClaimedRecord | null>;
  readHandoff: (handoffId: string) => Promise<JarvisCreatorHandoffRecord | null>;
  withFinalizationLock: <T>(
    handoffId: string,
    operation: () => Promise<T>
  ) => Promise<T>;
  writeFinal: (
    initial: JarvisCreatorHandoffPreparingRecord,
    record: JarvisCreatorHandoffTerminalRecord
  ) => Promise<Readonly<{ created: boolean; record: JarvisCreatorHandoffTerminalRecord }>>;
  getSummary: (
    conversationId: string,
    handoffId: string
  ) => Promise<JarvisCreatorHandoffSummary>;
  listConversation: (
    conversationId: string,
    limit?: number
  ) => Promise<readonly JarvisCreatorHandoffSummary[]>;
  cleanupTestRoot: () => Promise<void>;
}>;

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function exactKeys(value: Record<string, unknown>, expected: readonly string[]): boolean {
  const actual = Object.keys(value).sort();
  const wanted = [...expected].sort();
  return actual.length === wanted.length && actual.every((key, index) => key === wanted[index]);
}

function safeTimestamp(value: unknown): value is string {
  return typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/u.test(value) &&
    !Number.isNaN(Date.parse(value));
}

type UnsealedHandoffRecord =
  | Omit<JarvisCreatorHandoffPreparingRecord, "recordDigest">
  | Omit<JarvisCreatorHandoffPreparedRecord, "recordDigest">
  | Omit<JarvisCreatorHandoffFailedRecord, "recordDigest">;

function recordBody(record: JarvisCreatorHandoffRecord): UnsealedHandoffRecord {
  const { recordDigest: _recordDigest, ...body } = record;
  return body;
}

export function sealJarvisCreatorHandoffRecord(
  body: UnsealedHandoffRecord
): JarvisCreatorHandoffRecord {
  return {
    ...body,
    recordDigest: hashJarvisCreatorHandoffCanonicalJson(body),
  } as JarvisCreatorHandoffRecord;
}

function corrupt(message: string): JarvisCreatorHandoffError {
  return new JarvisCreatorHandoffError(503, "handoff_corrupt", message);
}

function mapStorageError(error: unknown): JarvisCreatorHandoffError {
  if (error instanceof JarvisCreatorHandoffError) return error;
  if (error instanceof CreatorFilesystemError) {
    if (error.code === "not_found") {
      return new JarvisCreatorHandoffError(404, "handoff_not_found", "Creator handoff was not found.");
    }
    if (error.code === "already_exists") {
      return new JarvisCreatorHandoffError(409, "handoff_conflict", "Creator handoff publication conflicted.");
    }
    return new JarvisCreatorHandoffError(503, error.code, "Creator handoff storage failed safely.");
  }
  if (error instanceof CreatorPersistenceError) {
    return new JarvisCreatorHandoffError(
      error.status === 409 ? 409 : 503,
      error.code,
      error.status === 409
        ? "Another bounded creator inventory mutation is in progress."
        : "Creator handoff inventory storage failed safely."
    );
  }
  return new JarvisCreatorHandoffError(
    503,
    "handoff_storage_unavailable",
    "Creator handoff storage failed safely."
  );
}

function encode(value: unknown): Buffer {
  const bytes = Buffer.from(`${serializeJarvisCreatorHandoffCanonicalJson(value)}\n`, "utf8");
  if (bytes.byteLength > JARVIS_CREATOR_HANDOFF_MAX_RECORD_BYTES) {
    throw corrupt("Creator handoff evidence exceeds its bounded record size.");
  }
  return bytes;
}

function decodeClaim(bytes: Buffer, expectedKeyHash?: string): HandoffIdempotencyClaim {
  if (bytes.byteLength < 2 || bytes.byteLength > JARVIS_CREATOR_HANDOFF_MAX_RECORD_BYTES) {
    throw corrupt("Creator handoff idempotency evidence has an invalid size.");
  }
  let value: unknown;
  try {
    const serialized = bytes.toString("utf8");
    assertCreatorJsonHasUniqueObjectKeys(serialized);
    value = JSON.parse(serialized) as unknown;
  } catch {
    throw corrupt("Creator handoff idempotency evidence is invalid JSON.");
  }
  const item = asRecord(value);
  const keys = [
    "recordVersion",
    "idempotencyKeyHash",
    "mutationDigest",
    "semanticDigest",
    "handoffId",
    "initialRecordDigest",
    "createdAt",
    "claimDigest",
  ] as const;
  if (
    !item ||
    !exactKeys(item, keys) ||
    item.recordVersion !== 1 ||
    typeof item.idempotencyKeyHash !== "string" || !SHA_256.test(item.idempotencyKeyHash) ||
    (expectedKeyHash !== undefined && item.idempotencyKeyHash !== expectedKeyHash) ||
    typeof item.mutationDigest !== "string" || !SHA_256.test(item.mutationDigest) ||
    typeof item.semanticDigest !== "string" || !SHA_256.test(item.semanticDigest) ||
    typeof item.handoffId !== "string" || !HANDOFF_ID.test(item.handoffId) ||
    typeof item.initialRecordDigest !== "string" || !SHA_256.test(item.initialRecordDigest) ||
    !safeTimestamp(item.createdAt) ||
    typeof item.claimDigest !== "string" || !SHA_256.test(item.claimDigest)
  ) {
    throw corrupt("Creator handoff idempotency evidence failed strict validation.");
  }
  const { claimDigest: _claimDigest, ...body } = item;
  if (hashJarvisCreatorHandoffCanonicalJson(body) !== item.claimDigest) {
    throw corrupt("Creator handoff idempotency evidence digest is invalid.");
  }
  return item as HandoffIdempotencyClaim;
}

function inputFromRecord(record: JarvisCreatorHandoffRecord): JarvisCreatorHandoffPrepareInput {
  const common = {
    conversationId: record.source.conversationId,
    expectedConversationRevision: record.source.conversationRevision,
    sourceTurnId: record.source.turnId,
    sourceMessageId: record.source.messageId,
    sourceMessageDigest: record.source.messageDigest,
    creatorKind: record.reviewedRequest.creatorKind,
    projectTitle: record.reviewedRequest.projectTitle,
    description: record.reviewedRequest.description,
    acknowledgement: true as const,
  };
  if (record.operation === "create") return { ...common, operation: "create" };
  const target = record.revisionTarget;
  if (!target) throw corrupt("Creator handoff revision target is missing.");
  return {
    ...common,
    operation: "revise",
    sourceProjectId: target.projectId,
    sourceProjectStatus: target.sourceProjectStatus,
    sourceProjectStateRevision: target.sourceProjectStateRevision,
    sourceArtifactRevision: target.sourceArtifactRevision,
    sourceManifestDigest: target.sourceManifestDigest,
    sourceAggregateDigest: target.sourceAggregateDigest,
    sourceValidationDigest: target.sourceValidationDigest,
    sourceRunBindingsDigest: target.sourceRunBindingsDigest,
    sourceRunBindingCount: target.sourceRunBindingCount,
    sourceExplicitRevisionCount: target.sourceExplicitRevisionCount,
  };
}

function expectedMutationDigest(record: JarvisCreatorHandoffRecord, keyHash: string): string {
  const input = inputFromRecord(record);
  return buildJarvisCreatorHandoffMutationDigest({
    conversationId: input.conversationId,
    body: handoffMutationBody(input),
    idempotencyKeyHash: keyHash,
  });
}

function assertClaimBinding(
  claim: HandoffIdempotencyClaim,
  record: JarvisCreatorHandoffRecord
): void {
  const initialDigest = record.status === "preparing"
    ? record.recordDigest
    : record.previousRecordDigest;
  if (
    claim.handoffId !== record.handoffId ||
    claim.semanticDigest !== record.semanticDigest ||
    claim.initialRecordDigest !== initialDigest ||
    claim.createdAt !== record.createdAt ||
    claim.mutationDigest !== expectedMutationDigest(record, claim.idempotencyKeyHash)
  ) {
    throw corrupt("Creator handoff idempotency evidence lost its exact mutation and initial-record binding.");
  }
}

function decodeRecord(bytes: Buffer): JarvisCreatorHandoffRecord {
  if (bytes.byteLength < 2 || bytes.byteLength > JARVIS_CREATOR_HANDOFF_MAX_RECORD_BYTES) {
    throw corrupt("Creator handoff record has an invalid size.");
  }
  let value: unknown;
  try {
    const serialized = bytes.toString("utf8");
    assertCreatorJsonHasUniqueObjectKeys(serialized);
    value = JSON.parse(serialized) as unknown;
  } catch {
    throw corrupt("Creator handoff record is invalid JSON.");
  }
  const item = asRecord(value);
  const keys = [
    "recordVersion", "protocolVersion", "stateRevision", "handoffId", "operation", "status",
    "source", "reviewedRequest", "revisionTarget", "acknowledgement",
    "idempotencyKeyHash", "mutationDigest", "semanticDigest", "creatorIdempotencyKeyHash",
    "projectId", "resultingProjectStatus", "resultingProjectStateRevision",
    "resultingCreatorRequestDigest", "resultingCreatorPlanDigest", "resultingCreatorStateDigest",
    "resultingCreatorRunBindingCount", "resultingCreatorMutationKind", "resultingCreatorMutationDigest",
    "resultingCreatorAuditBindingDigest", "resultingCreatorIdempotencyBindingDigest",
    "resultingRevisionNumber", "resultingRevisionBriefDigest", "failureStatus", "failureCode",
    "failureMessage", "createdAt", "updatedAt", "previousRecordDigest", "recordDigest",
  ] as const;
  if (!item || !exactKeys(item, keys)) throw corrupt("Creator handoff record shape is invalid.");
  const source = asRecord(item.source);
  const reviewed = asRecord(item.reviewedRequest);
  const target = item.revisionTarget === null ? null : asRecord(item.revisionTarget);
  if (
    item.recordVersion !== JARVIS_CREATOR_HANDOFF_RECORD_VERSION ||
    item.protocolVersion !== JARVIS_CREATOR_HANDOFF_PROTOCOL_VERSION ||
    (item.stateRevision !== 1 && item.stateRevision !== 2) ||
    typeof item.handoffId !== "string" || !HANDOFF_ID.test(item.handoffId) ||
    (item.operation !== "create" && item.operation !== "revise") ||
    (item.status !== "preparing" && item.status !== "prepared" && item.status !== "failed") ||
    item.acknowledgement !== true ||
    typeof item.idempotencyKeyHash !== "string" || !SHA_256.test(item.idempotencyKeyHash) ||
    typeof item.mutationDigest !== "string" || !SHA_256.test(item.mutationDigest) ||
    typeof item.semanticDigest !== "string" || !SHA_256.test(item.semanticDigest) ||
    typeof item.creatorIdempotencyKeyHash !== "string" || !SHA_256.test(item.creatorIdempotencyKeyHash) ||
    typeof item.projectId !== "string" || !HANDOFF_ID.test(item.projectId) ||
    (item.resultingProjectStatus !== null && item.resultingProjectStatus !== "awaiting_plan_approval" && item.resultingProjectStatus !== "awaiting_revision_plan_approval") ||
    (item.resultingProjectStateRevision !== null && (!Number.isSafeInteger(item.resultingProjectStateRevision) || (item.resultingProjectStateRevision as number) < 1)) ||
    (item.resultingCreatorRequestDigest !== null && (typeof item.resultingCreatorRequestDigest !== "string" || !SHA_256.test(item.resultingCreatorRequestDigest))) ||
    (item.resultingCreatorPlanDigest !== null && (typeof item.resultingCreatorPlanDigest !== "string" || !SHA_256.test(item.resultingCreatorPlanDigest))) ||
    (item.resultingCreatorStateDigest !== null && (typeof item.resultingCreatorStateDigest !== "string" || !SHA_256.test(item.resultingCreatorStateDigest))) ||
    (item.resultingCreatorRunBindingCount !== null && (!Number.isSafeInteger(item.resultingCreatorRunBindingCount) || (item.resultingCreatorRunBindingCount as number) < 0 || (item.resultingCreatorRunBindingCount as number) > 4)) ||
    (item.resultingCreatorMutationKind !== null && item.resultingCreatorMutationKind !== "prepare-plan" && item.resultingCreatorMutationKind !== "request-revision") ||
    (item.resultingCreatorMutationDigest !== null && (typeof item.resultingCreatorMutationDigest !== "string" || !SHA_256.test(item.resultingCreatorMutationDigest))) ||
    (item.resultingCreatorAuditBindingDigest !== null && (typeof item.resultingCreatorAuditBindingDigest !== "string" || !SHA_256.test(item.resultingCreatorAuditBindingDigest))) ||
    (item.resultingCreatorIdempotencyBindingDigest !== null && (typeof item.resultingCreatorIdempotencyBindingDigest !== "string" || !SHA_256.test(item.resultingCreatorIdempotencyBindingDigest))) ||
    (item.resultingRevisionNumber !== null && (!Number.isSafeInteger(item.resultingRevisionNumber) || (item.resultingRevisionNumber as number) < 1 || (item.resultingRevisionNumber as number) > 2)) ||
    (item.resultingRevisionBriefDigest !== null && (typeof item.resultingRevisionBriefDigest !== "string" || !SHA_256.test(item.resultingRevisionBriefDigest))) ||
    !safeTimestamp(item.createdAt) || !safeTimestamp(item.updatedAt) || item.updatedAt < item.createdAt ||
    (item.previousRecordDigest !== null && (typeof item.previousRecordDigest !== "string" || !SHA_256.test(item.previousRecordDigest))) ||
    typeof item.recordDigest !== "string" || !SHA_256.test(item.recordDigest)
  ) throw corrupt("Creator handoff record scalar fields are invalid.");
  if (
    !source ||
    !exactKeys(source, ["conversationId", "conversationRevision", "conversationRecordDigest", "turnId", "messageId", "messageDigest"]) ||
    typeof source.conversationId !== "string" || !HANDOFF_ID.test(source.conversationId) ||
    !Number.isSafeInteger(source.conversationRevision) || (source.conversationRevision as number) < 1 ||
    typeof source.conversationRecordDigest !== "string" || !SHA_256.test(source.conversationRecordDigest) ||
    typeof source.turnId !== "string" || !HANDOFF_ID.test(source.turnId) ||
    typeof source.messageId !== "string" || !HANDOFF_ID.test(source.messageId) ||
    typeof source.messageDigest !== "string" || !SHA_256.test(source.messageDigest)
  ) throw corrupt("Creator handoff source evidence is invalid.");
  if (
    !reviewed ||
    !exactKeys(reviewed, ["creatorKind", "projectTitle", "description", "sourceTextEdited", "handoffRequestDigest"]) ||
    reviewed.creatorKind !== "website-browser-app" ||
    typeof reviewed.projectTitle !== "string" ||
    typeof reviewed.description !== "string" ||
    typeof reviewed.sourceTextEdited !== "boolean" ||
    typeof reviewed.handoffRequestDigest !== "string" || !SHA_256.test(reviewed.handoffRequestDigest)
  ) throw corrupt("Creator handoff reviewed request is invalid.");
  try {
    validateCreatorCreateProjectInput({
      creatorKind: reviewed.creatorKind,
      projectTitle: reviewed.projectTitle,
      description: reviewed.description,
    });
  } catch {
    throw corrupt("Creator handoff reviewed request violates creator policy.");
  }
  if (
    hashJarvisCreatorHandoffCanonicalJson({
      creatorKind: reviewed.creatorKind,
      projectTitle: reviewed.projectTitle,
      description: reviewed.description,
    }) !== reviewed.handoffRequestDigest
  ) throw corrupt("Creator handoff reviewed request digest is invalid.");
  if (item.operation === "create" ? target !== null : target === null) {
    throw corrupt("Creator handoff revision target does not match its operation.");
  }
  if (target && (
    !exactKeys(target, [
      "projectId", "sourceProjectStatus", "sourceProjectStateRevision", "sourceArtifactRevision",
      "sourceManifestDigest", "sourceAggregateDigest", "sourceValidationDigest",
      "sourceRunBindingsDigest", "sourceRunBindingCount",
      "sourceExplicitRevisionCount",
    ]) ||
    typeof target.projectId !== "string" || !HANDOFF_ID.test(target.projectId) ||
    target.sourceProjectStatus !== "ready" ||
    !Number.isSafeInteger(target.sourceProjectStateRevision) || (target.sourceProjectStateRevision as number) < 1 ||
    !Number.isSafeInteger(target.sourceArtifactRevision) || (target.sourceArtifactRevision as number) < 1 || (target.sourceArtifactRevision as number) > 4 ||
    typeof target.sourceManifestDigest !== "string" || !SHA_256.test(target.sourceManifestDigest) ||
    typeof target.sourceAggregateDigest !== "string" || !SHA_256.test(target.sourceAggregateDigest) ||
    typeof target.sourceValidationDigest !== "string" || !SHA_256.test(target.sourceValidationDigest) ||
    typeof target.sourceRunBindingsDigest !== "string" || !SHA_256.test(target.sourceRunBindingsDigest) ||
    !Number.isSafeInteger(target.sourceRunBindingCount) || (target.sourceRunBindingCount as number) < 1 || (target.sourceRunBindingCount as number) > 3
    || !Number.isSafeInteger(target.sourceExplicitRevisionCount) || (target.sourceExplicitRevisionCount as number) < 0 || (target.sourceExplicitRevisionCount as number) > 1
  )) throw corrupt("Creator handoff revision source evidence is invalid.");

  const emptyResults =
    item.resultingProjectStatus === null &&
    item.resultingProjectStateRevision === null &&
    item.resultingCreatorRequestDigest === null &&
    item.resultingCreatorPlanDigest === null &&
    item.resultingCreatorStateDigest === null &&
    item.resultingCreatorRunBindingCount === null &&
    item.resultingCreatorMutationKind === null &&
    item.resultingCreatorMutationDigest === null &&
    item.resultingCreatorAuditBindingDigest === null &&
    item.resultingCreatorIdempotencyBindingDigest === null &&
    item.resultingRevisionNumber === null &&
    item.resultingRevisionBriefDigest === null;
  const emptyFailure = item.failureStatus === null && item.failureCode === null && item.failureMessage === null;
  const validFailure =
    Number.isSafeInteger(item.failureStatus) &&
    (item.failureStatus as number) >= 400 &&
    (item.failureStatus as number) <= 499 &&
    typeof item.failureCode === "string" && SAFE_CODE.test(item.failureCode) &&
    typeof item.failureMessage === "string" &&
    item.failureMessage.length >= 1 && item.failureMessage.length <= 240 &&
    item.failureMessage.trim() === item.failureMessage &&
    !/[\p{Cc}\p{Cf}\p{Cs}]/u.test(item.failureMessage);
  if (
    (item.status === "preparing" && (
      item.stateRevision !== 1 || !emptyResults || !emptyFailure || item.previousRecordDigest !== null
    )) ||
    (item.status === "failed" && (
      item.stateRevision !== 2 || !emptyResults || !validFailure || item.previousRecordDigest === null
    )) ||
    (item.status === "prepared" && (
      item.stateRevision !== 2 || !emptyFailure || item.previousRecordDigest === null ||
      item.resultingProjectStateRevision === null || item.resultingCreatorRequestDigest === null ||
      item.resultingCreatorPlanDigest === null || item.resultingCreatorStateDigest === null ||
      item.resultingCreatorRunBindingCount === null || item.resultingCreatorMutationDigest === null ||
      item.resultingCreatorAuditBindingDigest === null || item.resultingCreatorIdempotencyBindingDigest === null ||
      (item.operation === "create" && (
        item.resultingProjectStatus !== "awaiting_plan_approval" ||
        item.resultingCreatorRunBindingCount !== 0 || item.resultingCreatorMutationKind !== "prepare-plan" ||
        item.resultingRevisionNumber !== null || item.resultingRevisionBriefDigest !== null
      )) ||
      (item.operation === "revise" && (
        item.resultingProjectStatus !== "awaiting_revision_plan_approval" ||
        item.resultingCreatorRunBindingCount !== target?.sourceRunBindingCount ||
        item.resultingCreatorMutationKind !== "request-revision" ||
        item.resultingRevisionNumber === null || item.resultingRevisionBriefDigest === null
      ))
    )) ||
    hashJarvisCreatorHandoffCanonicalJson(recordBody(item as JarvisCreatorHandoffRecord)) !== item.recordDigest
  ) throw corrupt("Creator handoff state or record digest is invalid.");

  const record = item as JarvisCreatorHandoffRecord;
  const reconstructedInput = inputFromRecord(record);
  const derivedSemanticDigest = buildJarvisCreatorHandoffSemanticDigest(
    jarvisCreatorHandoffSemanticMaterial(reconstructedInput)
  );
  const creatorKey = buildJarvisCreatorHandoffCreatorKey(derivedSemanticDigest);
  if (
    item.semanticDigest !== derivedSemanticDigest ||
    item.mutationDigest !== expectedMutationDigest(record, item.idempotencyKeyHash as string) ||
    item.handoffId !== buildJarvisCreatorHandoffId(derivedSemanticDigest) ||
    item.creatorIdempotencyKeyHash !== hashCreatorSha256(creatorKey) ||
    item.projectId !== (target?.projectId ?? hashCreatorSha256(`creator-project:${creatorKey}`).slice(0, 24))
  ) throw corrupt("Creator handoff deterministic identities are inconsistent.");
  return record;
}

function assertHandoffContinuity(
  initial: JarvisCreatorHandoffRecord,
  final: JarvisCreatorHandoffRecord
): void {
  const immutable = [
    "recordVersion", "protocolVersion", "handoffId", "operation", "source", "reviewedRequest",
    "revisionTarget", "acknowledgement", "idempotencyKeyHash", "mutationDigest", "semanticDigest",
    "creatorIdempotencyKeyHash", "projectId", "createdAt",
  ] as const;
  if (
    initial.status !== "preparing" || initial.stateRevision !== 1 ||
    (final.status !== "prepared" && final.status !== "failed") || final.stateRevision !== 2 ||
    final.previousRecordDigest !== initial.recordDigest || final.updatedAt < initial.updatedAt ||
    immutable.some((key) =>
      serializeJarvisCreatorHandoffCanonicalJson(initial[key]) !==
      serializeJarvisCreatorHandoffCanonicalJson(final[key])
    )
  ) throw corrupt("Creator handoff append-only continuity is invalid.");
}

function summary(record: JarvisCreatorHandoffRecord): JarvisCreatorHandoffSummary {
  return {
    handoffId: record.handoffId,
    operation: record.operation,
    status: record.status,
    conversationId: record.source.conversationId,
    conversationRevision: record.source.conversationRevision,
    sourceTurnId: record.source.turnId,
    sourceMessageId: record.source.messageId,
    sourceMessageDigest: record.source.messageDigest,
    projectId: record.projectId,
    projectTitle: record.reviewedRequest.projectTitle,
    handoffRequestDigest: record.reviewedRequest.handoffRequestDigest,
    revisionTarget: record.revisionTarget,
    resultingProjectStatus: record.resultingProjectStatus,
    resultingProjectStateRevision: record.resultingProjectStateRevision,
    resultingCreatorRequestDigest: record.resultingCreatorRequestDigest,
    resultingCreatorPlanDigest: record.resultingCreatorPlanDigest,
    resultingCreatorStateDigest: record.resultingCreatorStateDigest,
    resultingCreatorRunBindingCount: record.resultingCreatorRunBindingCount,
    resultingCreatorMutationKind: record.resultingCreatorMutationKind,
    resultingCreatorMutationDigest: record.resultingCreatorMutationDigest,
    resultingCreatorAuditBindingDigest: record.resultingCreatorAuditBindingDigest,
    resultingCreatorIdempotencyBindingDigest: record.resultingCreatorIdempotencyBindingDigest,
    resultingRevisionNumber: record.resultingRevisionNumber,
    resultingRevisionBriefDigest: record.resultingRevisionBriefDigest,
    failureStatus: record.failureStatus,
    failureCode: record.failureCode,
    failureMessage: record.failureMessage,
    idempotencyKeyHash: record.idempotencyKeyHash,
    semanticDigest: record.semanticDigest,
    recordDigest: record.recordDigest,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  };
}

function createPersistence(
  dataRootLabel: string,
  creatorPersistence: CreatorPersistence
): JarvisCreatorHandoffPersistence {
  if (creatorPersistence.dataRootLabel !== dataRootLabel) {
    throw new Error("Creator handoff and Creator inventory roots diverged.");
  }
  const filesystem = creatorPersistence.filesystem;

  async function rootExists(): Promise<boolean> {
    try {
      return await filesystem.rootExists();
    } catch (error) {
      throw mapStorageError(error);
    }
  }

  async function directoryExists(segments: readonly string[]): Promise<boolean> {
    if (!(await rootExists())) return false;
    let parent: string[] = [];
    for (const segment of segments) {
      let entries: readonly string[];
      try {
        entries = await filesystem.listDirectory(parent);
      } catch (error) {
        if (error instanceof CreatorFilesystemError && error.code === "not_found") return false;
        throw mapStorageError(error);
      }
      if (!entries.includes(segment)) return false;
      parent = [...parent, segment];
    }
    return true;
  }

  async function readClaim(keyHash: string): Promise<HandoffIdempotencyClaim | null> {
    if (!SHA_256.test(keyHash)) throw corrupt("Creator handoff idempotency lookup is invalid.");
    if (!(await directoryExists(["handoffs", "idempotency"]))) return null;
    try {
      return decodeClaim(
        await filesystem.readBuffer(["handoffs", "idempotency", `${keyHash}.json`]),
        keyHash
      );
    } catch (error) {
      if (error instanceof CreatorFilesystemError && error.code === "not_found") return null;
      throw mapStorageError(error);
    }
  }

  async function readHandoff(handoffId: string): Promise<JarvisCreatorHandoffRecord | null> {
    if (!HANDOFF_ID.test(handoffId)) throw corrupt("Creator handoff identity is invalid.");
    const directory = ["handoffs", "records", handoffId] as const;
    if (!(await directoryExists(directory))) return null;
    let names: readonly string[];
    try {
      names = await filesystem.listDirectory(directory);
    } catch (error) {
      if (error instanceof CreatorFilesystemError && error.code === "not_found") return null;
      throw mapStorageError(error);
    }
    if (names.length === 0) return null;
    if (names.length > 2 || names.some((name) => !REVISION_FILE.test(name))) {
      throw corrupt("Creator handoff revision inventory is invalid.");
    }
    const expected = names.length === 1 ? ["000001.json"] : ["000001.json", "000002.json"];
    if (names.some((name, index) => name !== expected[index])) {
      throw corrupt("Creator handoff revision chain is not contiguous.");
    }
    try {
      const initial = decodeRecord(await filesystem.readBuffer([...directory, "000001.json"]));
      if (initial.handoffId !== handoffId || initial.status !== "preparing") {
        throw corrupt("Creator handoff initial revision is invalid.");
      }
      if (names.length === 1) return initial;
      const final = decodeRecord(await filesystem.readBuffer([...directory, "000002.json"]));
      assertHandoffContinuity(initial, final);
      return final;
    } catch (error) {
      throw mapStorageError(error);
    }
  }

  async function listDirectoryOrEmpty(segments: readonly string[]): Promise<readonly string[]> {
    if (!(await directoryExists(segments))) return [];
    try {
      return await filesystem.listDirectory(segments);
    } catch (error) {
      if (error instanceof CreatorFilesystemError && error.code === "not_found") return [];
      throw mapStorageError(error);
    }
  }

  async function recordInventory(recoverEmptyDirectories = false): Promise<readonly string[]> {
    const names = await listDirectoryOrEmpty(["handoffs", "records"]);
    if (names.some((name) => !HANDOFF_ID.test(name))) {
      throw corrupt("Creator handoff record inventory exceeds its exact bounded catalogue.");
    }
    const retained: string[] = [];
    for (const name of names) {
      const revisions = await listDirectoryOrEmpty(["handoffs", "records", name]);
      if (revisions.length === 0) {
        if (recoverEmptyDirectories) {
          try {
            await filesystem.removeOwnedTree(["handoffs", "records", name]);
          } catch (error) {
            if (!(error instanceof CreatorFilesystemError) || error.code !== "not_found") {
              throw mapStorageError(error);
            }
          }
        }
        continue;
      }
      if (revisions.length > 2 || revisions.some((entry) => !REVISION_FILE.test(entry))) {
        throw corrupt("Creator handoff record inventory contains invalid revision evidence.");
      }
      retained.push(name);
    }
    if (retained.length > JARVIS_CREATOR_HANDOFF_MAX_RECORDS) {
      throw corrupt("Creator handoff record inventory exceeds its exact bounded catalogue.");
    }
    return retained;
  }

  async function claimInventory(): Promise<readonly string[]> {
    const names = await listDirectoryOrEmpty(["handoffs", "idempotency"]);
    if (
      names.length > JARVIS_CREATOR_HANDOFF_MAX_IDEMPOTENCY_CLAIMS ||
      names.some((name) => !CLAIM_FILE.test(name))
    ) {
      throw corrupt("Creator handoff idempotency inventory exceeds its exact bounded catalogue.");
    }
    return names;
  }

  async function publishExact<T extends JarvisCreatorHandoffRecord>(
    segments: readonly string[],
    expected: T
  ): Promise<Readonly<{ created: boolean; record: T }>> {
    const bytes = encode(expected);
    try {
      await filesystem.writeAtomicExclusive(segments, bytes);
      return { created: true, record: expected };
    } catch (error) {
      if (!(error instanceof CreatorFilesystemError) || error.code !== "already_exists") {
        throw mapStorageError(error);
      }
      try {
        const actualBytes = await filesystem.readBuffer(segments);
        const actual = decodeRecord(actualBytes);
        if (!actualBytes.equals(bytes)) {
          throw new JarvisCreatorHandoffError(
            409,
            "handoff_conflict",
            "Concurrent creator handoff evidence differs from the exact request."
          );
        }
        return { created: false, record: actual as T };
      } catch (readError) {
        throw mapStorageError(readError);
      }
    }
  }

  async function publishInitial(
    record: JarvisCreatorHandoffPreparingRecord
  ): Promise<Readonly<{ created: boolean; record: JarvisCreatorHandoffPreparingRecord }>> {
    if (record.status !== "preparing" || record.previousRecordDigest !== null) {
      throw corrupt("Creator handoff initial record is invalid.");
    }
    decodeRecord(encode(record));
    try {
      return await publishExact(
        ["handoffs", "records", record.handoffId, "000001.json"],
        record
      );
    } catch (error) {
      if (!(error instanceof JarvisCreatorHandoffError) || error.code !== "handoff_conflict") throw error;
      const winner = await readHandoff(record.handoffId);
      const initialWinner = winner && winner.status !== "preparing"
        ? decodeRecord(await filesystem.readBuffer(["handoffs", "records", record.handoffId, "000001.json"]))
        : winner;
      if (
        !initialWinner || initialWinner.status !== "preparing" ||
        initialWinner.semanticDigest !== record.semanticDigest ||
        initialWinner.operation !== record.operation || initialWinner.projectId !== record.projectId ||
        serializeJarvisCreatorHandoffCanonicalJson(initialWinner.source) !== serializeJarvisCreatorHandoffCanonicalJson(record.source) ||
        serializeJarvisCreatorHandoffCanonicalJson(initialWinner.reviewedRequest) !== serializeJarvisCreatorHandoffCanonicalJson(record.reviewedRequest) ||
        serializeJarvisCreatorHandoffCanonicalJson(initialWinner.revisionTarget) !== serializeJarvisCreatorHandoffCanonicalJson(record.revisionTarget)
      ) throw error;
      return { created: false, record: initialWinner };
    }
  }

  async function claimIdempotencyUnlocked(
    input: HandoffIdempotencyClaimInput,
    inventory?: readonly string[]
  ): Promise<Readonly<{
    created: boolean;
    claim: HandoffIdempotencyClaim;
    record: JarvisCreatorHandoffRecord;
  }>> {
    const record = await readHandoff(input.handoffId);
    if (!record) throw corrupt("Creator handoff idempotency claim has no semantic record.");
    const body = { recordVersion: 1 as const, ...input };
    const claim: HandoffIdempotencyClaim = {
      ...body,
      claimDigest: hashJarvisCreatorHandoffCanonicalJson(body),
    };
    assertClaimBinding(claim, record);
    const existing = await readClaim(input.idempotencyKeyHash);
    if (existing) {
      assertClaimBinding(existing, record);
      if (
        existing.mutationDigest !== input.mutationDigest ||
        existing.semanticDigest !== input.semanticDigest ||
        existing.handoffId !== input.handoffId ||
        existing.initialRecordDigest !== input.initialRecordDigest ||
        existing.createdAt !== input.createdAt
      ) {
        throw new JarvisCreatorHandoffError(
          409,
          "idempotency_conflict",
          "Idempotency-Key belongs to a different Jarvis creator handoff."
        );
      }
      return { created: false, claim: existing, record };
    }
    const claims = inventory ?? await claimInventory();
    if (claims.length >= JARVIS_CREATOR_HANDOFF_MAX_IDEMPOTENCY_CLAIMS) {
      throw new JarvisCreatorHandoffError(
        409,
        "handoff_capacity_reached",
        "Creator handoff idempotency capacity is exhausted; no mutation was performed."
      );
    }
    const bytes = encode(claim);
    try {
      await filesystem.writeAtomicExclusive(
        ["handoffs", "idempotency", `${input.idempotencyKeyHash}.json`],
        bytes
      );
      return { created: true, claim, record };
    } catch (error) {
      if (!(error instanceof CreatorFilesystemError) || error.code !== "already_exists") {
        throw mapStorageError(error);
      }
      const winner = await readClaim(input.idempotencyKeyHash);
      if (!winner) throw corrupt("Concurrent creator handoff claim disappeared.");
      assertClaimBinding(winner, record);
      if (winner.claimDigest !== claim.claimDigest) {
        throw new JarvisCreatorHandoffError(
          409,
          "idempotency_conflict",
          "Idempotency-Key belongs to a different Jarvis creator handoff."
        );
      }
      return { created: false, claim: winner, record };
    }
  }

  return {
    dataRootLabel,
    async admitInitial(record, claimInput) {
      try {
        return await creatorPersistence.withInventoryLock(async () => {
          await filesystem.ensureDirectory(["handoffs"]);
          await filesystem.ensureDirectory(["handoffs", "records"]);
          await filesystem.ensureDirectory(["handoffs", "idempotency"]);
          const records = await recordInventory(true);
          const claims = await claimInventory();
          const existingClaim = await readClaim(claimInput.idempotencyKeyHash);
          if (!records.includes(record.handoffId) && records.length >= JARVIS_CREATOR_HANDOFF_MAX_RECORDS) {
            throw new JarvisCreatorHandoffError(
              409,
              "handoff_capacity_reached",
              "Creator handoff record capacity is exhausted; no mutation was performed."
            );
          }
          if (!existingClaim && claims.length >= JARVIS_CREATOR_HANDOFF_MAX_IDEMPOTENCY_CLAIMS) {
            throw new JarvisCreatorHandoffError(
              409,
              "handoff_capacity_reached",
              "Creator handoff idempotency capacity is exhausted; no mutation was performed."
            );
          }
          await filesystem.ensureDirectory(["handoffs", "records", record.handoffId]);
          const initial = await publishInitial(record);
          const claimed = await claimIdempotencyUnlocked(
            {
              ...claimInput,
              initialRecordDigest: initial.record.recordDigest,
              createdAt: initial.record.createdAt,
            },
            claims
          );
          return {
            created: initial.created,
            record: initial.record,
            claimCreated: claimed.created,
            claim: claimed.claim,
          };
        });
      } catch (error) {
        throw mapStorageError(error);
      }
    },
    async claimIdempotency(input) {
      try {
        return await creatorPersistence.withInventoryLock(async () => {
          await filesystem.ensureDirectory(["handoffs"]);
          await filesystem.ensureDirectory(["handoffs", "records"]);
          await filesystem.ensureDirectory(["handoffs", "idempotency"]);
          return claimIdempotencyUnlocked(input);
        });
      } catch (error) {
        throw mapStorageError(error);
      }
    },
    async readByIdempotencyKeyHash(keyHash) {
      const first = await readClaim(keyHash);
      if (!first) return null;
      const record = await readHandoff(first.handoffId);
      if (!record) throw corrupt("Creator handoff idempotency evidence lost its semantic record.");
      const second = await readClaim(keyHash);
      if (!second || second.claimDigest !== first.claimDigest) {
        throw corrupt("Creator handoff idempotency evidence changed during its read boundary.");
      }
      assertClaimBinding(second, record);
      return { claim: second, record };
    },
    readHandoff,
    async withFinalizationLock<T>(
      handoffId: string,
      operation: () => Promise<T>
    ): Promise<T> {
      if (!HANDOFF_ID.test(handoffId)) {
        throw corrupt("Creator handoff finalization identity is invalid.");
      }
      try {
        return await creatorPersistence.withProjectLock(
          buildJarvisCreatorHandoffFinalizationLockId(handoffId),
          operation
        );
      } catch (error) {
        throw mapStorageError(error);
      }
    },
    async writeFinal(initial, record) {
      assertHandoffContinuity(initial, record);
      decodeRecord(encode(record));
      try {
        return await publishExact(
          ["handoffs", "records", record.handoffId, "000002.json"],
          record
        );
      } catch (error) {
        if (!(error instanceof JarvisCreatorHandoffError) || error.code !== "handoff_conflict") throw error;
        const winner = await readHandoff(record.handoffId);
        if (
          !winner || winner.status === "preparing" || winner.previousRecordDigest !== initial.recordDigest ||
          winner.semanticDigest !== record.semanticDigest || winner.projectId !== record.projectId ||
          (winner.status === "prepared" && record.status === "prepared" && (
            winner.resultingProjectStatus !== record.resultingProjectStatus ||
            winner.resultingProjectStateRevision !== record.resultingProjectStateRevision ||
            winner.resultingCreatorRequestDigest !== record.resultingCreatorRequestDigest ||
            winner.resultingCreatorPlanDigest !== record.resultingCreatorPlanDigest ||
            winner.resultingCreatorStateDigest !== record.resultingCreatorStateDigest ||
            winner.resultingCreatorRunBindingCount !== record.resultingCreatorRunBindingCount ||
            winner.resultingCreatorMutationKind !== record.resultingCreatorMutationKind ||
            winner.resultingCreatorMutationDigest !== record.resultingCreatorMutationDigest ||
            winner.resultingCreatorAuditBindingDigest !== record.resultingCreatorAuditBindingDigest ||
            winner.resultingCreatorIdempotencyBindingDigest !== record.resultingCreatorIdempotencyBindingDigest ||
            winner.resultingRevisionNumber !== record.resultingRevisionNumber ||
            winner.resultingRevisionBriefDigest !== record.resultingRevisionBriefDigest
          )) ||
          (winner.status === "failed" && record.status === "failed" && (
            winner.failureStatus !== record.failureStatus || winner.failureCode !== record.failureCode ||
            winner.failureMessage !== record.failureMessage
          )) ||
          winner.status !== record.status
        ) throw error;
        return { created: false, record: winner };
      }
    },
    async getSummary(conversationId, handoffId) {
      if (!HANDOFF_ID.test(conversationId) || !HANDOFF_ID.test(handoffId)) {
        throw new JarvisCreatorHandoffError(400, "invalid_request", "Creator handoff lookup is invalid.");
      }
      const record = await readHandoff(handoffId);
      if (!record || record.source.conversationId !== conversationId) {
        throw new JarvisCreatorHandoffError(404, "handoff_not_found", "Creator handoff was not found.");
      }
      return summary(record);
    },
    async listConversation(conversationId, limit = 32) {
      if (
        !HANDOFF_ID.test(conversationId) || !Number.isSafeInteger(limit) || limit < 1 ||
        limit > JARVIS_CREATOR_HANDOFF_MAX_LIST_LIMIT
      ) {
        throw new JarvisCreatorHandoffError(400, "invalid_request", "Creator handoff list request is invalid.");
      }
      if (!(await rootExists())) return [];
      let names: readonly string[];
      try {
        names = await filesystem.listDirectory(["handoffs", "records"]);
      } catch (error) {
        if (error instanceof CreatorFilesystemError && error.code === "not_found") return [];
        throw mapStorageError(error);
      }
      if (names.length > JARVIS_CREATOR_HANDOFF_MAX_RECORDS || names.some((name) => !HANDOFF_ID.test(name))) {
        throw corrupt("Creator handoff catalogue is invalid.");
      }
      const records: JarvisCreatorHandoffRecord[] = [];
      for (const name of names) {
        const record = await readHandoff(name);
        if (record?.source.conversationId === conversationId) records.push(record);
      }
      return records
        .sort((left, right) =>
          right.updatedAt.localeCompare(left.updatedAt) || left.handoffId.localeCompare(right.handoffId)
        )
        .slice(0, limit)
        .map(summary);
    },
    async cleanupTestRoot() {
      if (!dataRootLabel.startsWith(".codexforge/creator-tests/")) {
        throw new JarvisCreatorHandoffError(
          403,
          "cleanup_forbidden",
          "Creator handoff cleanup is restricted to exact test roots."
        );
      }
      if (!(await rootExists())) return;
      try {
        await creatorPersistence.withInventoryLock(async () => {
          try {
            await filesystem.removeOwnedTree(["handoffs"]);
          } catch (error) {
            if (error instanceof CreatorFilesystemError && error.code === "not_found") return;
            throw error;
          }
        });
      } catch (error) {
        throw mapStorageError(error);
      }
    },
  };
}

export function createJarvisCreatorHandoffPersistence(
  creatorPersistence: CreatorPersistence
): JarvisCreatorHandoffPersistence {
  return createPersistence(
    CREATOR_PRODUCTION_DATA_ROOT_LABEL,
    creatorPersistence
  );
}

export function createJarvisCreatorHandoffPersistenceForTesting(
  testSuffix: string,
  creatorPersistence: CreatorPersistence
): JarvisCreatorHandoffPersistence {
  const label = buildCreatorTestDataRootLabel(testSuffix);
  return createPersistence(label, creatorPersistence);
}
