import {
  JARVIS_CREATOR_HANDOFF_PROTOCOL_VERSION,
  JARVIS_CREATOR_HANDOFF_REVIEW_ACKNOWLEDGEMENT,
  JARVIS_CREATOR_HANDOFF_RESUME_ACKNOWLEDGEMENT,
  type JarvisCreatorHandoffPrepareInput,
  type JarvisCreatorHandoffPrepareResult,
  type JarvisCreatorHandoffProjectProjection,
  type JarvisCreatorHandoffRecord,
  type JarvisCreatorHandoffResumeReview,
  type JarvisCreatorHandoffRevisionTarget,
  type JarvisCreatorHandoffSummary,
} from "./jarvis-creator-handoff-types";

const API_PREFIX = "/api/codexforge/jarvis-chat/conversations/";
const RETAINED_KEY_LIMIT = 8;
const MAXIMUM_RESPONSE_BYTES = 524_288;
const HEX_24 = /^[a-f0-9]{24}$/u;
const SHA_256 = /^[a-f0-9]{64}$/u;
const SAFE_ERROR_CODE = /^[a-z][a-z0-9_]{0,63}$/u;
const SAFE_IDEMPOTENCY_KEY = /^[A-Za-z0-9][A-Za-z0-9._:-]{15,127}$/u;
const retainedKeys = new Map<string, string>();
const retainedHandoffIds = new Map<string, string>();

export class JarvisCreatorHandoffApiError extends Error {
  constructor(readonly status: number, readonly code: string, message: string) {
    super(message);
    this.name = "JarvisCreatorHandoffApiError";
  }
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function exactKeys(value: Record<string, unknown>, keys: readonly string[]): boolean {
  const actual = Object.keys(value).sort();
  const expected = [...keys].sort();
  return actual.length === expected.length && actual.every((key, index) => key === expected[index]);
}

function hex(value: unknown, pattern = SHA_256): string | null {
  return typeof value === "string" && pattern.test(value) ? value : null;
}

function timestamp(value: unknown): string | null {
  return typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/u.test(value) &&
    !Number.isNaN(Date.parse(value))
    ? value
    : null;
}

function positive(value: unknown, maximum?: number): number | null {
  return Number.isSafeInteger(value) &&
    (value as number) > 0 &&
    (maximum === undefined || (value as number) <= maximum)
    ? value as number
    : null;
}

function boundedText(value: unknown, maximum: number, oneLine = false): string | null {
  const forbiddenControls = oneLine
    ? /[\p{Cc}\p{Cf}\p{Cs}]/u
    : /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f\p{Cf}\p{Cs}]/u;
  if (
    typeof value !== "string" || value.length < 1 || value.length > maximum ||
    value.trim() !== value || forbiddenControls.test(value) ||
    (oneLine && value.includes("\n"))
  ) return null;
  return value;
}

function readRevisionTarget(value: unknown): JarvisCreatorHandoffRevisionTarget | null | undefined {
  if (value === null) return null;
  const item = asRecord(value);
  const keys = [
    "projectId", "sourceProjectStatus", "sourceProjectStateRevision", "sourceArtifactRevision",
    "sourceManifestDigest", "sourceAggregateDigest", "sourceValidationDigest",
    "sourceRunBindingsDigest", "sourceRunBindingCount",
    "sourceExplicitRevisionCount",
  ] as const;
  if (!item || !exactKeys(item, keys)) return undefined;
  const projectId = hex(item.projectId, HEX_24);
  const sourceProjectStateRevision = positive(item.sourceProjectStateRevision);
  const sourceArtifactRevision = positive(item.sourceArtifactRevision, 4);
  const sourceManifestDigest = hex(item.sourceManifestDigest);
  const sourceAggregateDigest = hex(item.sourceAggregateDigest);
  const sourceValidationDigest = hex(item.sourceValidationDigest);
  const sourceRunBindingsDigest = hex(item.sourceRunBindingsDigest);
  const sourceRunBindingCount = positive(item.sourceRunBindingCount, 3);
  const sourceExplicitRevisionCount = Number.isSafeInteger(item.sourceExplicitRevisionCount) &&
    (item.sourceExplicitRevisionCount as number) >= 0 && (item.sourceExplicitRevisionCount as number) <= 1
    ? item.sourceExplicitRevisionCount as number
    : null;
  if (
    !projectId || item.sourceProjectStatus !== "ready" || !sourceProjectStateRevision ||
    !sourceArtifactRevision || !sourceManifestDigest || !sourceAggregateDigest ||
    !sourceValidationDigest || !sourceRunBindingsDigest || !sourceRunBindingCount || sourceExplicitRevisionCount === null
  ) return undefined;
  return {
    projectId,
    sourceProjectStatus: "ready",
    sourceProjectStateRevision,
    sourceArtifactRevision,
    sourceManifestDigest,
    sourceAggregateDigest,
    sourceValidationDigest,
    sourceRunBindingsDigest,
    sourceRunBindingCount,
    sourceExplicitRevisionCount,
  };
}

function readReviewedRequest(value: unknown) {
  const item = asRecord(value);
  if (
    !item ||
    !exactKeys(item, ["creatorKind", "projectTitle", "description", "sourceTextEdited", "handoffRequestDigest"]) ||
    item.creatorKind !== "website-browser-app" ||
    !boundedText(item.projectTitle, 80, true) ||
    !boundedText(item.description, 2_000) ||
    typeof item.sourceTextEdited !== "boolean" ||
    !hex(item.handoffRequestDigest)
  ) return null;
  return item as {
    creatorKind: "website-browser-app";
    projectTitle: string;
    description: string;
    sourceTextEdited: boolean;
    handoffRequestDigest: string;
  };
}

function readRecord(value: unknown): JarvisCreatorHandoffRecord | null {
  const item = asRecord(value);
  const keys = [
    "recordVersion", "protocolVersion", "stateRevision", "handoffId", "operation", "status",
    "source", "reviewedRequest", "revisionTarget", "acknowledgement", "idempotencyKeyHash",
    "mutationDigest", "semanticDigest", "creatorIdempotencyKeyHash", "projectId",
    "resultingProjectStatus", "resultingProjectStateRevision", "resultingCreatorRequestDigest",
    "resultingCreatorPlanDigest", "resultingCreatorStateDigest", "resultingCreatorRunBindingCount",
    "resultingCreatorMutationKind", "resultingCreatorMutationDigest", "resultingCreatorAuditBindingDigest",
    "resultingCreatorIdempotencyBindingDigest", "resultingRevisionNumber", "resultingRevisionBriefDigest",
    "failureStatus", "failureCode", "failureMessage", "createdAt", "updatedAt",
    "previousRecordDigest", "recordDigest",
  ] as const;
  if (!item || !exactKeys(item, keys)) return null;
  const source = asRecord(item.source);
  const reviewed = readReviewedRequest(item.reviewedRequest);
  const revisionTarget = readRevisionTarget(item.revisionTarget);
  const handoffId = hex(item.handoffId, HEX_24);
  const projectId = hex(item.projectId, HEX_24);
  if (
    item.recordVersion !== 1 || item.protocolVersion !== JARVIS_CREATOR_HANDOFF_PROTOCOL_VERSION ||
    !handoffId || !projectId || (item.operation !== "create" && item.operation !== "revise") ||
    (item.status !== "preparing" && item.status !== "prepared" && item.status !== "failed") ||
    item.acknowledgement !== true ||
    !source || !exactKeys(source, ["conversationId", "conversationRevision", "conversationRecordDigest", "turnId", "messageId", "messageDigest"]) ||
    !hex(source.conversationId, HEX_24) || !positive(source.conversationRevision) ||
    !hex(source.conversationRecordDigest) || !hex(source.turnId, HEX_24) ||
    !hex(source.messageId, HEX_24) || !hex(source.messageDigest) || !reviewed ||
    revisionTarget === undefined || (item.operation === "create" ? revisionTarget !== null : revisionTarget === null) ||
    !hex(item.idempotencyKeyHash) || !hex(item.mutationDigest) || !hex(item.semanticDigest) ||
    !hex(item.creatorIdempotencyKeyHash) || !timestamp(item.createdAt) || !timestamp(item.updatedAt) ||
    String(item.updatedAt) < String(item.createdAt) || !hex(item.recordDigest)
  ) return null;
  const resultsNull =
    item.resultingProjectStatus === null && item.resultingProjectStateRevision === null &&
    item.resultingCreatorRequestDigest === null && item.resultingCreatorPlanDigest === null &&
    item.resultingCreatorStateDigest === null && item.resultingCreatorRunBindingCount === null &&
    item.resultingCreatorMutationKind === null && item.resultingCreatorMutationDigest === null &&
    item.resultingCreatorAuditBindingDigest === null && item.resultingCreatorIdempotencyBindingDigest === null &&
    item.resultingRevisionNumber === null && item.resultingRevisionBriefDigest === null;
  if (item.status === "preparing") {
    if (
      item.stateRevision !== 1 || !resultsNull || item.failureStatus !== null || item.failureCode !== null ||
      item.failureMessage !== null || item.previousRecordDigest !== null
    ) return null;
  } else if (item.status === "failed") {
    if (
      item.stateRevision !== 2 || !resultsNull || !positive(item.failureStatus, 499) ||
      (item.failureStatus as number) < 400 || typeof item.failureCode !== "string" ||
      !SAFE_ERROR_CODE.test(item.failureCode) || !boundedText(item.failureMessage, 240, true) ||
      !hex(item.previousRecordDigest)
    ) return null;
  } else if (
    item.stateRevision !== 2 || item.failureStatus !== null || item.failureCode !== null || item.failureMessage !== null ||
    (item.resultingProjectStatus !== "awaiting_plan_approval" && item.resultingProjectStatus !== "awaiting_revision_plan_approval") ||
    !positive(item.resultingProjectStateRevision) || !hex(item.resultingCreatorRequestDigest) ||
    !hex(item.resultingCreatorPlanDigest) || !hex(item.resultingCreatorStateDigest) ||
    !Number.isSafeInteger(item.resultingCreatorRunBindingCount) || (item.resultingCreatorRunBindingCount as number) < 0 ||
    (item.resultingCreatorRunBindingCount as number) > 4 ||
    (item.resultingCreatorMutationKind !== "prepare-plan" && item.resultingCreatorMutationKind !== "request-revision") ||
    !hex(item.resultingCreatorMutationDigest) || !hex(item.resultingCreatorAuditBindingDigest) ||
    !hex(item.resultingCreatorIdempotencyBindingDigest) || !hex(item.previousRecordDigest) ||
    (item.operation === "create" && (
      item.resultingProjectStatus !== "awaiting_plan_approval" || item.resultingCreatorRunBindingCount !== 0 ||
      item.resultingCreatorMutationKind !== "prepare-plan" || item.resultingRevisionNumber !== null ||
      item.resultingRevisionBriefDigest !== null
    )) ||
    (item.operation === "revise" && (
      item.resultingProjectStatus !== "awaiting_revision_plan_approval" ||
      item.resultingCreatorRunBindingCount !== revisionTarget?.sourceRunBindingCount ||
      item.resultingCreatorMutationKind !== "request-revision" || !positive(item.resultingRevisionNumber, 2) ||
      !hex(item.resultingRevisionBriefDigest)
    ))
  ) return null;
  return item as unknown as JarvisCreatorHandoffRecord;
}

function readProject(value: unknown): JarvisCreatorHandoffProjectProjection | null {
  const item = asRecord(value);
  const keys = [
    "projectId", "projectTitle", "creatorKind", "status", "stateRevision", "requestDigest",
    "planDigest", "runBindingCount", "creatorMutationKind", "creatorMutationDigest",
    "creatorAuditBindingDigest", "creatorIdempotencyBindingDigest", "sourceArtifactRevision",
    "revisionNumber", "revisionBriefDigest",
  ] as const;
  if (
    !item || !exactKeys(item, keys) || !hex(item.projectId, HEX_24) ||
    !boundedText(item.projectTitle, 80, true) || item.creatorKind !== "website-browser-app" ||
    (item.status !== "awaiting_plan_approval" && item.status !== "awaiting_revision_plan_approval") ||
    !positive(item.stateRevision) || !hex(item.requestDigest) || !hex(item.planDigest) ||
    !Number.isSafeInteger(item.runBindingCount) || (item.runBindingCount as number) < 0 ||
    (item.runBindingCount as number) > 4 ||
    (item.creatorMutationKind !== "prepare-plan" && item.creatorMutationKind !== "request-revision") ||
    !hex(item.creatorMutationDigest) || !hex(item.creatorAuditBindingDigest) ||
    !hex(item.creatorIdempotencyBindingDigest) ||
    (item.sourceArtifactRevision !== null && !positive(item.sourceArtifactRevision, 4)) ||
    (item.revisionNumber !== null && !positive(item.revisionNumber, 2)) ||
    (item.revisionBriefDigest !== null && !hex(item.revisionBriefDigest)) ||
    (item.status === "awaiting_plan_approval" && (
      item.runBindingCount !== 0 || item.creatorMutationKind !== "prepare-plan" ||
      item.sourceArtifactRevision !== null || item.revisionNumber !== null || item.revisionBriefDigest !== null
    )) ||
    (item.status === "awaiting_revision_plan_approval" && (
      item.creatorMutationKind !== "request-revision" || !positive(item.sourceArtifactRevision, 4) ||
      !positive(item.revisionNumber, 2) || !hex(item.revisionBriefDigest)
    ))
  ) return null;
  return item as unknown as JarvisCreatorHandoffProjectProjection;
}

function readResult(payload: unknown, input?: JarvisCreatorHandoffPrepareInput): JarvisCreatorHandoffPrepareResult {
  const outer = asRecord(payload);
  const result = outer && exactKeys(outer, ["ok", "result"]) && outer.ok === true
    ? asRecord(outer.result)
    : null;
  const handoff = result ? readRecord(result.handoff) : null;
  const project = result ? readProject(result.project) : null;
  if (
    !result || !exactKeys(result, ["replayed", "handoff", "project"]) ||
    typeof result.replayed !== "boolean" || !handoff || handoff.status !== "prepared" || !project
  ) {
    throw new JarvisCreatorHandoffApiError(
      502,
      "malformed_server_response",
      "Jarvis creator handoff response was malformed."
    );
  }
  if (
    handoff.projectId !== project.projectId ||
    handoff.reviewedRequest.projectTitle !== project.projectTitle ||
    handoff.resultingProjectStatus !== project.status ||
    handoff.resultingProjectStateRevision !== project.stateRevision ||
    handoff.resultingCreatorRequestDigest !== project.requestDigest ||
    handoff.resultingCreatorPlanDigest !== project.planDigest ||
    handoff.resultingCreatorRunBindingCount !== project.runBindingCount ||
    handoff.resultingCreatorMutationKind !== project.creatorMutationKind ||
    handoff.resultingCreatorMutationDigest !== project.creatorMutationDigest ||
    handoff.resultingCreatorAuditBindingDigest !== project.creatorAuditBindingDigest ||
    handoff.resultingCreatorIdempotencyBindingDigest !== project.creatorIdempotencyBindingDigest ||
    handoff.resultingRevisionNumber !== project.revisionNumber ||
    handoff.resultingRevisionBriefDigest !== project.revisionBriefDigest ||
    (input && (
      handoff.operation !== input.operation || handoff.source.conversationId !== input.conversationId ||
      handoff.source.conversationRevision !== input.expectedConversationRevision ||
      handoff.source.turnId !== input.sourceTurnId || handoff.source.messageId !== input.sourceMessageId ||
      handoff.source.messageDigest !== input.sourceMessageDigest ||
      handoff.reviewedRequest.creatorKind !== input.creatorKind ||
      handoff.reviewedRequest.projectTitle !== input.projectTitle ||
      handoff.reviewedRequest.description !== input.description ||
      (input.operation === "create"
        ? handoff.revisionTarget !== null
        : !handoff.revisionTarget ||
          handoff.revisionTarget.projectId !== input.sourceProjectId ||
          handoff.revisionTarget.sourceProjectStatus !== input.sourceProjectStatus ||
          handoff.revisionTarget.sourceProjectStateRevision !== input.sourceProjectStateRevision ||
          handoff.revisionTarget.sourceArtifactRevision !== input.sourceArtifactRevision ||
          handoff.revisionTarget.sourceManifestDigest !== input.sourceManifestDigest ||
          handoff.revisionTarget.sourceAggregateDigest !== input.sourceAggregateDigest ||
          handoff.revisionTarget.sourceValidationDigest !== input.sourceValidationDigest ||
          handoff.revisionTarget.sourceRunBindingsDigest !== input.sourceRunBindingsDigest ||
          handoff.revisionTarget.sourceRunBindingCount !== input.sourceRunBindingCount ||
          handoff.revisionTarget.sourceExplicitRevisionCount !== input.sourceExplicitRevisionCount)
    ))
  ) {
    throw new JarvisCreatorHandoffApiError(
      502,
      "malformed_server_response",
      "Creator handoff result evidence was inconsistent."
    );
  }
  return { replayed: result.replayed, handoff, project };
}

function readSummary(value: unknown): JarvisCreatorHandoffSummary | null {
  const item = asRecord(value);
  const keys = [
    "handoffId", "operation", "status", "conversationId", "conversationRevision", "sourceTurnId",
    "sourceMessageId", "sourceMessageDigest", "projectId", "projectTitle", "handoffRequestDigest",
    "revisionTarget", "resultingProjectStatus", "resultingProjectStateRevision",
    "resultingCreatorRequestDigest", "resultingCreatorPlanDigest", "resultingCreatorStateDigest",
    "resultingCreatorRunBindingCount",
    "resultingCreatorMutationKind", "resultingCreatorMutationDigest", "resultingCreatorAuditBindingDigest",
    "resultingCreatorIdempotencyBindingDigest", "resultingRevisionNumber", "resultingRevisionBriefDigest",
    "failureStatus", "failureCode", "failureMessage", "idempotencyKeyHash", "semanticDigest", "recordDigest", "createdAt", "updatedAt",
  ] as const;
  const revisionTarget = item ? readRevisionTarget(item.revisionTarget) : undefined;
  if (
    !item || !exactKeys(item, keys) || !hex(item.handoffId, HEX_24) ||
    (item.operation !== "create" && item.operation !== "revise") ||
    (item.status !== "preparing" && item.status !== "prepared" && item.status !== "failed") ||
    !hex(item.conversationId, HEX_24) || !positive(item.conversationRevision) ||
    !hex(item.sourceTurnId, HEX_24) || !hex(item.sourceMessageId, HEX_24) || !hex(item.sourceMessageDigest) ||
    !hex(item.projectId, HEX_24) || !boundedText(item.projectTitle, 80, true) || !hex(item.handoffRequestDigest) ||
    revisionTarget === undefined || (item.operation === "create" ? revisionTarget !== null : revisionTarget === null) ||
    !hex(item.idempotencyKeyHash) || !hex(item.semanticDigest) || !hex(item.recordDigest) || !timestamp(item.createdAt) || !timestamp(item.updatedAt) ||
    String(item.updatedAt) < String(item.createdAt)
  ) return null;
  const resultsNull =
    item.resultingProjectStatus === null && item.resultingProjectStateRevision === null &&
    item.resultingCreatorRequestDigest === null && item.resultingCreatorPlanDigest === null &&
    item.resultingCreatorStateDigest === null && item.resultingCreatorRunBindingCount === null &&
    item.resultingCreatorMutationKind === null &&
    item.resultingCreatorMutationDigest === null && item.resultingCreatorAuditBindingDigest === null &&
    item.resultingCreatorIdempotencyBindingDigest === null && item.resultingRevisionNumber === null &&
    item.resultingRevisionBriefDigest === null;
  if (item.status === "preparing") {
    if (!resultsNull || item.failureStatus !== null || item.failureCode !== null || item.failureMessage !== null) return null;
  } else if (item.status === "failed") {
    if (
      !resultsNull || !positive(item.failureStatus, 499) || (item.failureStatus as number) < 400 ||
      typeof item.failureCode !== "string" || !SAFE_ERROR_CODE.test(item.failureCode) ||
      !boundedText(item.failureMessage, 240, true)
    ) return null;
  } else if (
    item.failureStatus !== null || item.failureCode !== null || item.failureMessage !== null ||
    (item.resultingProjectStatus !== "awaiting_plan_approval" && item.resultingProjectStatus !== "awaiting_revision_plan_approval") ||
    !positive(item.resultingProjectStateRevision) || !hex(item.resultingCreatorRequestDigest) ||
    !hex(item.resultingCreatorPlanDigest) || !hex(item.resultingCreatorStateDigest) ||
    !Number.isSafeInteger(item.resultingCreatorRunBindingCount) ||
    (item.resultingCreatorRunBindingCount as number) < 0 ||
    (item.resultingCreatorRunBindingCount as number) > 4 ||
    (item.resultingCreatorMutationKind !== "prepare-plan" && item.resultingCreatorMutationKind !== "request-revision") ||
    !hex(item.resultingCreatorMutationDigest) || !hex(item.resultingCreatorAuditBindingDigest) ||
    !hex(item.resultingCreatorIdempotencyBindingDigest) ||
    (item.operation === "create" && (
      item.resultingProjectStatus !== "awaiting_plan_approval" || item.resultingCreatorMutationKind !== "prepare-plan" ||
      item.resultingCreatorRunBindingCount !== 0 ||
      item.resultingRevisionNumber !== null || item.resultingRevisionBriefDigest !== null
    )) ||
    (item.operation === "revise" && (
      item.resultingProjectStatus !== "awaiting_revision_plan_approval" || item.resultingCreatorMutationKind !== "request-revision" ||
      item.resultingCreatorRunBindingCount !== revisionTarget?.sourceRunBindingCount ||
      !positive(item.resultingRevisionNumber, 2) || !hex(item.resultingRevisionBriefDigest)
    ))
  ) return null;
  return item as unknown as JarvisCreatorHandoffSummary;
}

function collectionTarget(conversationId: string): string {
  if (!HEX_24.test(conversationId)) throw new Error("Jarvis conversation ID is invalid.");
  return `${API_PREFIX}${conversationId}/creator-handoffs`;
}

function itemTarget(conversationId: string, handoffId: string): string {
  if (!HEX_24.test(handoffId)) throw new Error("Jarvis creator handoff ID is invalid.");
  return `${collectionTarget(conversationId)}/${handoffId}`;
}

function makeKey(): string {
  const id = globalThis.crypto?.randomUUID?.();
  if (!id) throw new Error("Browser random UUID support is required.");
  return `jarvis-creator-ui-${id}`;
}

function retainKey(
  operationSignature: string,
  provided?: string,
  options: Readonly<{ allowRecoveryReserve?: boolean }> = {}
): string {
  if (provided !== undefined && !SAFE_IDEMPOTENCY_KEY.test(provided)) {
    throw new Error("Creator handoff Idempotency-Key is invalid.");
  }
  const retained = retainedKeys.get(operationSignature);
  if (retained && provided && retained !== provided) {
    throw new JarvisCreatorHandoffApiError(
      409,
      "uncertain_handoff_conflict",
      "This exact creator handoff already has an uncertain Idempotency-Key. Resume it without substituting another key."
    );
  }
  if (retained) return retained;
  const limit = RETAINED_KEY_LIMIT + (options.allowRecoveryReserve ? 1 : 0);
  if (retainedKeys.size >= limit) {
    throw new JarvisCreatorHandoffApiError(
      409,
      "uncertain_handoff_limit",
      "Resolve one uncertain creator handoff before preparing another."
    );
  }
  const key = provided ?? makeKey();
  retainedKeys.set(operationSignature, key);
  return key;
}

function signature(value: unknown): string {
  return JSON.stringify(value);
}

async function canonicalizeForDigest(value: unknown): Promise<string> {
  if (value === null) return "null";
  if (typeof value === "string" || typeof value === "boolean" || typeof value === "number") {
    if (typeof value === "number" && !Number.isFinite(value)) {
      throw new Error("Creator handoff request contains a non-finite number.");
    }
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${(await Promise.all(value.map(canonicalizeForDigest))).join(",")}]`;
  }
  const record = asRecord(value);
  if (!record) throw new Error("Creator handoff request contains an unsupported value.");
  const entries = await Promise.all(
    Object.keys(record).sort().map(async (key) =>
      `${JSON.stringify(key)}:${await canonicalizeForDigest(record[key])}`
    )
  );
  return `{${entries.join(",")}}`;
}

async function sha256Hex(source: string): Promise<string> {
  if (!globalThis.crypto?.subtle) throw new Error("Browser SHA-256 support is required.");
  const digest = new Uint8Array(
    await globalThis.crypto.subtle.digest("SHA-256", new TextEncoder().encode(source))
  );
  return [...digest].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function expectedHandoffId(input: JarvisCreatorHandoffPrepareInput): Promise<string> {
  const revisionSelector = input.operation === "revise"
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
    : null;
  const semanticMaterial = {
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
    revisionSelector,
    acknowledgement: true,
  };
  const semanticDigest = await sha256Hex(
    `codexforge.jarvis-creator-handoff.v1:semantic-request\u0000${await canonicalizeForDigest(semanticMaterial)}`
  );
  return (await sha256Hex(
    `codexforge.jarvis-creator-handoff.v1:handoff-id\u0000${semanticDigest}`
  )).slice(0, 24);
}

async function externalKeyHash(key: string): Promise<string> {
  if (!globalThis.crypto?.subtle) throw new Error("Browser SHA-256 support is required.");
  const source = new TextEncoder().encode(
    `codexforge.jarvis-creator-handoff.v1:external-idempotency-key\u0000${key}`
  );
  const digest = new Uint8Array(await globalThis.crypto.subtle.digest("SHA-256", source));
  return [...digest].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function retireRetainedHandoffAliases(handoffId: string): void {
  for (const [operationSignature, key] of [...retainedKeys]) {
    if (
      retainedHandoffIds.get(operationSignature) === handoffId &&
      retainedKeys.get(operationSignature) === key
    ) {
      retainedKeys.delete(operationSignature);
      retainedHandoffIds.delete(operationSignature);
    }
  }
}

async function retireRecoveredPrepareKey(record: JarvisCreatorHandoffRecord): Promise<void> {
  retireRetainedHandoffAliases(record.handoffId);
  for (const [operationSignature, key] of [...retainedKeys]) {
    if (
      await externalKeyHash(key) === record.idempotencyKeyHash &&
      retainedKeys.get(operationSignature) === key
    ) {
      retainedKeys.delete(operationSignature);
      retainedHandoffIds.delete(operationSignature);
    }
  }
  retireRetainedHandoffAliases(record.handoffId);
}

async function retireConfirmedTerminalPrepareKey(
  conversationId: string,
  handoffId: string
): Promise<void> {
  const summary = await getJarvisCreatorHandoffSummary(conversationId, handoffId);
  if (summary.status === "preparing") return;
  retireRetainedHandoffAliases(summary.handoffId);
  for (const [operationSignature, key] of [...retainedKeys]) {
    if (
      await externalKeyHash(key) === summary.idempotencyKeyHash &&
      retainedKeys.get(operationSignature) === key
    ) {
      retainedKeys.delete(operationSignature);
      retainedHandoffIds.delete(operationSignature);
    }
  }
  retireRetainedHandoffAliases(summary.handoffId);
}

async function payload(response: Response): Promise<unknown> {
  const contentType = response.headers.get("Content-Type")?.split(";", 1)[0]?.trim().toLowerCase();
  if (contentType !== "application/json") return null;
  const declared = response.headers.get("Content-Length");
  if (declared !== null && (!/^\d+$/u.test(declared) || Number(declared) > MAXIMUM_RESPONSE_BYTES)) return null;
  if (!response.body) return null;
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  while (true) {
    const part = await reader.read();
    if (part.done) break;
    total += part.value.byteLength;
    if (total > MAXIMUM_RESPONSE_BYTES) {
      await reader.cancel().catch(() => undefined);
      return null;
    }
    chunks.push(part.value);
  }
  const merged = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try {
    const source = new TextDecoder("utf-8", { fatal: true }).decode(merged);
    return source.trim() ? JSON.parse(source) as unknown : null;
  } catch {
    return null;
  }
}

function errorFromResponse(response: Response, body: unknown): JarvisCreatorHandoffApiError {
  const outer = asRecord(body);
  const error = outer && exactKeys(outer, ["ok", "error"]) && outer.ok === false
    ? asRecord(outer.error)
    : null;
  if (
    !error || !exactKeys(error, ["code", "message"]) || typeof error.code !== "string" ||
    !SAFE_ERROR_CODE.test(error.code) || !boundedText(error.message, 240, true)
  ) {
    return new JarvisCreatorHandoffApiError(
      response.status,
      "malformed_server_response",
      "Jarvis creator handoff error response was malformed."
    );
  }
  return new JarvisCreatorHandoffApiError(response.status, error.code, error.message as string);
}

function isAmbiguous(error: JarvisCreatorHandoffApiError): boolean {
  return error.status === 0 || error.status >= 500 || [
    "creator_result_ambiguous", "handoff_storage_unavailable", "handoff_conflict",
    "mutation_busy", "malformed_server_response",
  ].includes(error.code);
}

async function fetchJson(target: string, init: RequestInit): Promise<Readonly<{ response: Response; body: unknown }>> {
  const response = await fetch(target, {
    ...init,
    cache: "no-store",
    credentials: "same-origin",
    redirect: "error",
  });
  return { response, body: await payload(response) };
}

export async function prepareJarvisCreatorHandoff(
  input: JarvisCreatorHandoffPrepareInput,
  idempotencyKey?: string
): Promise<JarvisCreatorHandoffPrepareResult> {
  const operationSignature = signature(input);
  const handoffId = await expectedHandoffId(input);
  const key = retainKey(operationSignature, idempotencyKey);
  retainedHandoffIds.set(operationSignature, handoffId);
  try {
    const { response, body } = await fetchJson(collectionTarget(input.conversationId), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": key,
        "If-Match": `"${input.expectedConversationRevision}"`,
      },
      body: JSON.stringify((({ conversationId: _conversationId, ...requestBody }) => requestBody)(input)),
    });
    if (!response.ok) {
      const apiError = errorFromResponse(response, body);
      if (!isAmbiguous(apiError)) {
        retainedKeys.delete(operationSignature);
        retainedHandoffIds.delete(operationSignature);
      }
      throw apiError;
    }
    if (response.status !== 200 && response.status !== 201) {
      throw new JarvisCreatorHandoffApiError(502, "malformed_server_response", "Creator handoff returned an unexpected success status.");
    }
    const result = readResult(body, input);
    if ((response.status === 200) !== result.replayed) {
      throw new JarvisCreatorHandoffApiError(502, "malformed_server_response", "Creator handoff replay status was inconsistent.");
    }
    retainedKeys.delete(operationSignature);
    retainedHandoffIds.delete(operationSignature);
    return result;
  } catch (error) {
    if (error instanceof JarvisCreatorHandoffApiError) throw error;
    throw new JarvisCreatorHandoffApiError(
      0,
      "transport_failure",
      "Creator handoff response was not confirmed. Review and explicitly resume the exact handoff safely."
    );
  }
}

export async function listJarvisCreatorHandoffs(
  conversationId: string
): Promise<readonly JarvisCreatorHandoffSummary[]> {
  const { response, body } = await fetchJson(`${collectionTarget(conversationId)}?limit=64`, {});
  if (!response.ok) throw errorFromResponse(response, body);
  if (response.status !== 200) throw new JarvisCreatorHandoffApiError(502, "malformed_server_response", "Creator handoff history returned an unexpected status.");
  const item = asRecord(body);
  if (
    !item || !exactKeys(item, ["ok", "handoffs"]) || item.ok !== true ||
    !Array.isArray(item.handoffs) || item.handoffs.length > 64
  ) {
    throw new JarvisCreatorHandoffApiError(502, "malformed_server_response", "Creator handoff history response was malformed.");
  }
  const handoffs = item.handoffs.map(readSummary);
  if (
    handoffs.some((entry) => entry === null || entry.conversationId !== conversationId) ||
    new Set(handoffs.map((entry) => entry?.handoffId)).size !== handoffs.length ||
    handoffs.some((entry, index) => {
      const prior = index > 0 ? handoffs[index - 1] : null;
      return !!entry && !!prior &&
        (entry.updatedAt > prior.updatedAt ||
          (entry.updatedAt === prior.updatedAt && entry.handoffId < prior.handoffId));
    })
  ) {
    throw new JarvisCreatorHandoffApiError(502, "malformed_server_response", "Creator handoff history contained inconsistent evidence.");
  }
  return handoffs as readonly JarvisCreatorHandoffSummary[];
}

export async function getJarvisCreatorHandoffSummary(
  conversationId: string,
  handoffId: string
): Promise<JarvisCreatorHandoffSummary> {
  const { response, body } = await fetchJson(itemTarget(conversationId, handoffId), {});
  if (!response.ok) throw errorFromResponse(response, body);
  const item = asRecord(body);
  const handoff = item && exactKeys(item, ["ok", "handoff"]) && item.ok === true
    ? readSummary(item.handoff)
    : null;
  if (response.status !== 200 || !handoff || handoff.conversationId !== conversationId || handoff.handoffId !== handoffId) {
    throw new JarvisCreatorHandoffApiError(502, "malformed_server_response", "Creator handoff lookup response was malformed.");
  }
  return handoff;
}

export async function reviewJarvisCreatorHandoff(input: Readonly<{
  conversationId: string;
  handoffId: string;
  expectedHandoffRecordDigest: string;
}>): Promise<JarvisCreatorHandoffResumeReview> {
  if (!SHA_256.test(input.expectedHandoffRecordDigest)) throw new Error("Creator handoff record digest is invalid.");
  const { response, body } = await fetchJson(itemTarget(input.conversationId, input.handoffId), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "If-Match": `"${input.expectedHandoffRecordDigest}"`,
    },
    body: JSON.stringify({
      action: "review",
      expectedHandoffRecordDigest: input.expectedHandoffRecordDigest,
      acknowledgement: JARVIS_CREATOR_HANDOFF_REVIEW_ACKNOWLEDGEMENT,
    }),
  });
  if (!response.ok) throw errorFromResponse(response, body);
  const outer = asRecord(body);
  const review = outer && exactKeys(outer, ["ok", "review"]) && outer.ok === true
    ? asRecord(outer.review)
    : null;
  const reviewedRequest = review ? readReviewedRequest(review.reviewedRequest) : null;
  const target = review?.revisionTarget === null ? null : asRecord(review?.revisionTarget);
  if (
    response.status !== 200 || !review ||
    !exactKeys(review, ["handoffId", "operation", "status", "recordDigest", "projectId", "reviewedRequest", "revisionTarget", "resumable", "createdAt", "updatedAt"]) ||
    review.handoffId !== input.handoffId || review.recordDigest !== input.expectedHandoffRecordDigest ||
    !hex(review.projectId, HEX_24) || (review.operation !== "create" && review.operation !== "revise") ||
    (review.status !== "preparing" && review.status !== "prepared" && review.status !== "failed") ||
    typeof review.resumable !== "boolean" || review.resumable !== (review.status === "preparing") ||
    !reviewedRequest || !timestamp(review.createdAt) || !timestamp(review.updatedAt) ||
    (review.operation === "create" ? target !== null : !target ||
      !exactKeys(target, ["projectId", "sourceArtifactRevision"]) ||
      !hex(target.projectId, HEX_24) || !positive(target.sourceArtifactRevision, 4))
  ) {
    throw new JarvisCreatorHandoffApiError(502, "malformed_server_response", "Creator handoff reviewed-request response was malformed.");
  }
  return review as unknown as JarvisCreatorHandoffResumeReview;
}

export async function resumeJarvisCreatorHandoff(input: Readonly<{
  conversationId: string;
  handoffId: string;
  expectedHandoffRecordDigest: string;
  reviewedRequestDigest: string;
}>, idempotencyKey?: string): Promise<JarvisCreatorHandoffPrepareResult> {
  if (!SHA_256.test(input.expectedHandoffRecordDigest) || !SHA_256.test(input.reviewedRequestDigest)) {
    throw new Error("Creator handoff resume evidence is invalid.");
  }
  const operationSignature = signature(input);
  const key = retainKey(operationSignature, idempotencyKey, {
    allowRecoveryReserve: true,
  });
  try {
    const { response, body } = await fetchJson(itemTarget(input.conversationId, input.handoffId), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": key,
        "If-Match": `"${input.expectedHandoffRecordDigest}"`,
      },
      body: JSON.stringify({
        action: "resume",
        expectedHandoffRecordDigest: input.expectedHandoffRecordDigest,
        reviewedRequestDigest: input.reviewedRequestDigest,
        acknowledgement: JARVIS_CREATOR_HANDOFF_RESUME_ACKNOWLEDGEMENT,
      }),
    });
    if (!response.ok) {
      const apiError = errorFromResponse(response, body);
      if (!isAmbiguous(apiError)) {
        retainedKeys.delete(operationSignature);
        try {
          await retireConfirmedTerminalPrepareKey(input.conversationId, input.handoffId);
        } catch {
          // The terminal handoff could not be independently confirmed; retain its prepare key.
        }
      }
      throw apiError;
    }
    if (response.status !== 200 && response.status !== 201) {
      throw new JarvisCreatorHandoffApiError(502, "malformed_server_response", "Creator handoff resume returned an unexpected status.");
    }
    const result = readResult(body);
    if ((response.status === 200) !== result.replayed) {
      throw new JarvisCreatorHandoffApiError(502, "malformed_server_response", "Creator handoff resume replay status was inconsistent.");
    }
    if (
      result.handoff.handoffId !== input.handoffId ||
      result.handoff.source.conversationId !== input.conversationId ||
      result.handoff.reviewedRequest.handoffRequestDigest !== input.reviewedRequestDigest
    ) {
      throw new JarvisCreatorHandoffApiError(502, "malformed_server_response", "Creator handoff resume result was not correlated to the reviewed request.");
    }
    await retireRecoveredPrepareKey(result.handoff);
    retainedKeys.delete(operationSignature);
    return result;
  } catch (error) {
    if (error instanceof JarvisCreatorHandoffApiError) throw error;
    throw new JarvisCreatorHandoffApiError(0, "transport_failure", "Creator handoff resume response was not confirmed. Retry the exact reviewed resume safely.");
  }
}
