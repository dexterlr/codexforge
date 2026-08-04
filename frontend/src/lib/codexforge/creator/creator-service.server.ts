import "server-only";

import {
  PRIVATE_ALPHA_APPROVAL_BINDING_VERSION,
  PRIVATE_ALPHA_LOCAL_EXECUTION_APPROVAL_STATEMENT,
  PRIVATE_ALPHA_MAX_REQUEST_LENGTH,
  PRIVATE_ALPHA_RUN_OWNERSHIP_PROTOCOL_VERSION,
  containsPrivateAlphaSecretLikeContent,
  type PrivateAlphaRunRecord,
} from "@/lib/codexforge/private-alpha";
import {
  buildCreatorGenerationInstruction,
  buildCreatorRepairInstruction,
  isValidCreatorProjectTitle,
  isSafeCreatorVisibleUnicode,
} from "./creator-contract.server";
import {
  hashCreatorCanonicalJson,
  hashCreatorSha256,
  makeCreatorHexId,
} from "./creator-crypto";
import {
  buildCreatorExecutionIdempotencyKeyHash,
  buildCreatorInstructionDigest,
  buildCreatorRunIdempotencyKeyHash,
  buildLegacyCreatorRunIdempotencyKeyHash,
  createCreatorGenerationLifecycleAdapter,
  type CreatorGenerationLifecycleAdapter,
  type CreatorLifecycleRunResult,
} from "./creator-private-alpha-adapter.server";
import {
  CreatorMaterializationError,
  materializeCreatorArtifact,
  readCreatorMaterializationPublication,
  readCreatorRevisionFile,
  type CreatorMaterializationPublication,
} from "./creator-materialization.server";
import {
  CreatorPersistenceError,
  createCreatorPersistence,
  type CreatorPersistence,
} from "./creator-persistence.server";
import {
  CREATOR_CAPABILITY_STATEMENT,
  CREATOR_FILE_POLICY,
  CREATOR_IDEMPOTENCY_KEY_PATTERN,
  CREATOR_LIMITATION_STATEMENT,
  CREATOR_MAX_AUDIT_EVENTS,
  CREATOR_MAX_AUDIT_SUMMARY_LENGTH,
  CREATOR_MAX_DESCRIPTION_LENGTH,
  CREATOR_MAX_IDEMPOTENCY_RECORDS,
  CREATOR_MAX_PROJECT_SLUG_LENGTH,
  CREATOR_MAX_PROJECT_TITLE_LENGTH,
  CREATOR_MODEL_ENVELOPE,
  CREATOR_ORDERED_PLAN_STEPS,
  buildCreatorDestinationBoundary,
} from "./creator-policy";
import {
  assertCreatorTransition,
  CreatorTransitionError,
} from "./creator-state-machine";
import {
  CREATOR_CONTRACT_VERSION,
  CREATOR_PROJECT_STATES,
  CREATOR_RECORD_VERSION,
  type CreatorApprovalPacket,
  type CreatorAuditEvent,
  type CreatorAuditEventType,
  type CreatorCreateProjectInput,
  type CreatorCreateProjectResult,
  type CreatorExportManifest,
  type CreatorFailureCode,
  type CreatorGenerationRunBinding,
  type CreatorIdempotencyRecord,
  type CreatorMutationKind,
  type CreatorProjectActionInput,
  type CreatorProjectActionResult,
  type CreatorProjectState,
  type CreatorProjectStatus,
  type CreatorRunPurpose,
} from "./creator-types";
import {
  buildCreatorValidationDigest,
  validateCreatorProviderOutput,
} from "./creator-validation.server";

type CreatorServiceStatus = 400 | 403 | 404 | 409 | 413 | 415 | 422 | 500 | 503 | 504;

export class CreatorServiceError extends Error {
  constructor(
    readonly status: CreatorServiceStatus,
    readonly code: CreatorFailureCode,
    message: string
  ) {
    super(message);
    this.name = "CreatorServiceError";
  }
}

class CreatorRunBindingUnconfirmedError extends Error {
  constructor() {
    super("Creator run binding remains unconfirmed after one bounded recovery read.");
    this.name = "CreatorRunBindingUnconfirmedError";
  }
}

class CreatorLifecyclePrecededIntentError extends Error {
  constructor() {
    super("Private Alpha execution preceded the durable creator execution intent.");
    this.name = "CreatorLifecyclePrecededIntentError";
  }
}

type CreatorEventSpec = Readonly<{
  eventType: CreatorAuditEventType;
  actor: "local-operator" | "system";
  summary: string;
  sourceRunId?: string | null;
  artifactRevision?: number | null;
  eventId?: string;
}>;

type CreatorServiceOptions = Readonly<{
  persistence?: CreatorPersistence;
  lifecycle?: CreatorGenerationLifecycleAdapter;
  now?: () => string;
  makeId?: (byteLength: number) => string;
}>;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function assertExactKeys(
  value: Record<string, unknown>,
  allowed: readonly string[]
): void {
  const unknown = Object.keys(value).filter((key) => !allowed.includes(key));
  if (unknown.length > 0) {
    throw new CreatorServiceError(
      400,
      "invalid_request",
      `Unknown creator fields are forbidden: ${unknown.slice(0, 8).join(", ")}.`
    );
  }
}

function normalizeBoundedText(value: unknown, field: string, maximum: number): string {
  if (typeof value !== "string") {
    throw new CreatorServiceError(400, "invalid_request", `${field} must be a string.`);
  }
  const normalized = value.replace(/\r\n?/g, "\n").trim();
  if (
    !normalized ||
    normalized.length > maximum ||
    /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(normalized)
  ) {
    throw new CreatorServiceError(
      422,
      "invalid_request",
      `${field} must contain 1-${maximum} safe characters.`
    );
  }
  return normalized;
}

export function validateCreatorCreateProjectInput(body: unknown): CreatorCreateProjectInput {
  if (!isRecord(body)) {
    throw new CreatorServiceError(400, "invalid_request", "Creator request must be a JSON object.");
  }
  assertExactKeys(body, ["creatorKind", "projectTitle", "description"]);
  if (body.creatorKind !== "website-browser-app") {
    throw new CreatorServiceError(
      422,
      "invalid_request",
      "creatorKind must be exactly website-browser-app."
    );
  }
  const projectTitle = normalizeBoundedText(
    body.projectTitle,
    "projectTitle",
    CREATOR_MAX_PROJECT_TITLE_LENGTH
  );
  if (projectTitle.includes("\n")) {
    throw new CreatorServiceError(422, "invalid_request", "projectTitle must be one line.");
  }
  if (!isValidCreatorProjectTitle(projectTitle)) {
    throw new CreatorServiceError(422, "invalid_request", "projectTitle must use safe, unambiguous Unicode text.");
  }
  if (containsPrivateAlphaSecretLikeContent(projectTitle)) {
    throw new CreatorServiceError(
      422,
      "invalid_request",
      "Remove credentials, tokens, passwords, and secret-like values from projectTitle."
    );
  }
  const description = normalizeBoundedText(
    body.description,
    "description",
    CREATOR_MAX_DESCRIPTION_LENGTH
  );
  if (!isSafeCreatorVisibleUnicode(description)) {
    throw new CreatorServiceError(422, "invalid_request", "description must use safe, meaningful Unicode text.");
  }
  if (containsPrivateAlphaSecretLikeContent(description)) {
    throw new CreatorServiceError(
      422,
      "invalid_request",
      "Remove credentials, tokens, passwords, and secret-like values before creating a plan."
    );
  }
  return { creatorKind: "website-browser-app", projectTitle, description };
}

export function validateCreatorProjectActionInput(body: unknown): CreatorProjectActionInput {
  if (!isRecord(body)) {
    throw new CreatorServiceError(400, "invalid_request", "Creator action must be a JSON object.");
  }
  assertExactKeys(body, ["action", "expectedRevision"]);
  const action = body.action;
  if (
    action !== "approve-generation" &&
    action !== "execute-generation" &&
    action !== "cancel" &&
    action !== "request-repair" &&
    action !== "approve-repair" &&
    action !== "execute-repair" &&
    action !== "recover" &&
    action !== "start-preview" &&
    action !== "stop-preview" &&
    action !== "export"
  ) {
    throw new CreatorServiceError(422, "invalid_request", "Creator action is not supported.");
  }
  if (
    typeof body.expectedRevision !== "number" ||
    !Number.isSafeInteger(body.expectedRevision) ||
    body.expectedRevision < 1
  ) {
    throw new CreatorServiceError(422, "invalid_request", "expectedRevision must be a positive integer.");
  }
  return { action, expectedRevision: body.expectedRevision };
}

export function validateCreatorIdempotencyKey(value: string | null | undefined): string {
  const normalized = value?.trim() ?? "";
  if (!CREATOR_IDEMPOTENCY_KEY_PATTERN.test(normalized)) {
    throw new CreatorServiceError(
      400,
      "invalid_request",
      "Idempotency-Key must contain 16-160 allowlisted ASCII characters."
    );
  }
  return normalized;
}

function slugifyProjectTitle(value: string): string {
  const normalized = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, CREATOR_MAX_PROJECT_SLUG_LENGTH)
    .replace(/-+$/g, "");
  return normalized || "static-site";
}

function assertInstructionBounded(instruction: string): void {
  if (!instruction || instruction.length > PRIVATE_ALPHA_MAX_REQUEST_LENGTH) {
    throw new CreatorServiceError(
      422,
      "run_binding_failed",
      "Creator instruction envelope exceeds the established local-run request bound."
    );
  }
}

function mapServiceError(error: unknown): CreatorServiceError {
  if (error instanceof CreatorServiceError) return error;
  if (error instanceof CreatorPersistenceError) {
    return new CreatorServiceError(error.status, error.code, error.message);
  }
  if (error instanceof CreatorMaterializationError) {
    const status = error.code === "not_found" ? 404 : error.code === "materialization_blocked" ? 422 : 500;
    return new CreatorServiceError(status, error.code, error.message);
  }
  if (error instanceof CreatorTransitionError) {
    return new CreatorServiceError(409, "invalid_transition", error.message);
  }
  return new CreatorServiceError(500, "internal_failure", "Creator operation failed safely.");
}

function assertProjectPublicationBinding(
  project: CreatorProjectState,
  publication: CreatorMaterializationPublication,
  artifactRevision: number
): void {
  const stateMaterialization = project.materializations.find(
    (candidate) => candidate.artifactRevision === artifactRevision
  );
  if (
    !project.exportManifest ||
    project.exportManifest.artifactRevision !== artifactRevision ||
    publication.manifest.manifestDigest !== project.exportManifest.manifestDigest ||
    hashCreatorCanonicalJson(publication.manifest) !== hashCreatorCanonicalJson(project.exportManifest) ||
    !stateMaterialization ||
    hashCreatorCanonicalJson(publication.materialization) !== hashCreatorCanonicalJson(stateMaterialization)
  ) {
    throw new CreatorServiceError(
      500,
      "export_digest_mismatch",
      "Creator publication no longer matches immutable project state."
    );
  }
}

function assertExactRunBinding(run: PrivateAlphaRunRecord): void {
  const request = run.request;
  const scope = run.approvalScope;
  if (
    request.capability !== "code" ||
    request.providerPreference !== "ollama-local" ||
    !("modelKey" in request) ||
    request.modelKey !== "ollama-local::gpt-oss:20b" ||
    !("dataBoundary" in request) ||
    request.dataBoundary !== "local-machine" ||
    request.modelPreferenceLabel !== "gpt-oss:20b" ||
    request.maximumOutputTokens !== 4096 ||
    request.retentionMode !== "local-private-alpha" ||
    request.executionMode !== "manual-approved-local-provider" ||
    !("bindingVersion" in request) ||
    request.bindingVersion !== PRIVATE_ALPHA_APPROVAL_BINDING_VERSION ||
    !("cloudDataTransferRequirement" in request) ||
    request.cloudDataTransferRequirement !== "not-required" ||
    scope.runId !== run.runId ||
    scope.capability !== "code" ||
    scope.providerPreference !== "ollama-local" ||
    !("modelKey" in scope) ||
    scope.modelKey !== "ollama-local::gpt-oss:20b" ||
    !("dataBoundary" in scope) ||
    scope.dataBoundary !== "local-machine" ||
    scope.modelPreferenceLabel !== "gpt-oss:20b" ||
    scope.maximumOutputTokens !== 4096 ||
    scope.retentionMode !== "local-private-alpha" ||
    scope.executionMode !== "manual-approved-local-provider" ||
    !("bindingVersion" in scope) ||
    scope.bindingVersion !== PRIVATE_ALPHA_APPROVAL_BINDING_VERSION ||
    !("cloudDataTransferRequirement" in scope) ||
    scope.cloudDataTransferRequirement !== "not-required" ||
    scope.normalizedRequestHash !== hashCreatorSha256(request.normalizedRequestText) ||
    scope.retentionMode !== request.retentionMode ||
    (run.execution !== null &&
      (run.execution.provider !== "ollama-local" ||
        run.execution.model !== "gpt-oss:20b" ||
        run.execution.approvalScopeHash !== run.approvalScopeHash))
  ) {
    throw new CreatorServiceError(
      503,
      "provider_binding_mismatch",
      "Creator run binding did not match the approved local model envelope."
    );
  }
}

function assertExpectedRunIdentity(
  run: PrivateAlphaRunRecord,
  projectId: string,
  purpose: CreatorRunPurpose
): void {
  const expectedIdempotencyKeyHashes = new Set([
    buildCreatorRunIdempotencyKeyHash(projectId, purpose),
    buildLegacyCreatorRunIdempotencyKeyHash(projectId, purpose),
  ]);
  if (
    run.ownership?.kind !== "creator" ||
    run.ownership.protocolVersion !==
      PRIVATE_ALPHA_RUN_OWNERSHIP_PROTOCOL_VERSION ||
    run.ownership.projectId !== projectId ||
    run.ownership.purpose !== purpose ||
    !/^[a-f0-9]{32}$/.test(run.ownership.bindingId) ||
    !expectedIdempotencyKeyHashes.has(run.idempotencyKeyHash)
  ) {
    throw new CreatorServiceError(
      503,
      "provider_binding_mismatch",
      "Creator lifecycle result did not match the exact project and purpose binding identity."
    );
  }
}

function assertBoundLifecycleRun(
  run: PrivateAlphaRunRecord,
  binding: CreatorGenerationRunBinding
): void {
  assertExactRunBinding(run);
  if (
    run.runId !== binding.sourceRunId ||
    run.ownership?.kind !== "creator" ||
    run.ownership.bindingId !== binding.ownershipBindingId ||
    run.revision < binding.sourceRunRevision ||
    run.approvalScopeHash !== binding.approvalScopeHash ||
    hashCreatorSha256(run.request.normalizedRequestText) !== binding.requestEnvelopeDigest ||
    binding.providerKey !== "ollama-local" ||
    binding.modelKey !== "ollama-local::gpt-oss:20b" ||
    binding.runtimeModel !== "gpt-oss:20b" ||
    binding.dataBoundary !== "local-machine" ||
    binding.maximumOutputTokens !== 4096
  ) {
    throw new CreatorServiceError(
      503,
      "provider_binding_mismatch",
      "Creator lifecycle result no longer matches its exact run, scope, request, and provider binding."
    );
  }
}

function assertBoundApprovalRun(
  run: PrivateAlphaRunRecord,
  binding: CreatorGenerationRunBinding,
  projectId: string,
  purpose: CreatorRunPurpose
): void {
  assertExpectedRunIdentity(run, projectId, purpose);
  assertBoundLifecycleRun(run, binding);
  const approval = run.approval;
  if (
    run.state !== "approved" ||
    approval === null ||
    run.cancellation !== null ||
    run.execution !== null ||
    run.revision !== binding.sourceRunRevision + 1 ||
    run.updatedAt !== approval.approvedAt ||
    approval.approvalScopeHash !== binding.approvalScopeHash ||
    approval.previousRevision !== binding.sourceRunRevision ||
    approval.resultingRevision !== run.revision ||
    approval.actor !== "local-operator" ||
    approval.acknowledgement !== true ||
    approval.executionAvailabilityStatement !==
      PRIVATE_ALPHA_LOCAL_EXECUTION_APPROVAL_STATEMENT ||
    !("bindingVersion" in approval) ||
    approval.bindingVersion !== PRIVATE_ALPHA_APPROVAL_BINDING_VERSION ||
    approval.cloudDataTransferAcknowledgement !== "not-required"
  ) {
    throw new CreatorServiceError(
      503,
      "provider_binding_mismatch",
      "Creator approval result does not match the exact bound source-run revision and scope."
    );
  }
}

function assertBoundInitialRun(
  run: PrivateAlphaRunRecord,
  projectId: string,
  purpose: CreatorRunPurpose
): void {
  assertExpectedRunIdentity(run, projectId, purpose);
  assertExactRunBinding(run);
  if (
    run.state !== "awaiting_approval" ||
    run.revision !== 1 ||
    run.approval !== null ||
    run.cancellation !== null ||
    run.execution !== null ||
    run.createdAt !== run.updatedAt
  ) {
    throw new CreatorServiceError(
      503,
      "provider_binding_mismatch",
      "Creator run binding did not return one exact initial awaiting-approval run."
    );
  }
}

function assertBoundCancellationRun(
  run: PrivateAlphaRunRecord,
  binding: CreatorGenerationRunBinding,
  projectId: string,
  purpose: CreatorRunPurpose
): Readonly<{ approvalRecordedAt: string | null; reconciledApproval: boolean }> {
  assertExpectedRunIdentity(run, projectId, purpose);
  assertBoundLifecycleRun(run, binding);
  const cancellation = run.cancellation;
  const reconciledApproval = binding.approvalRecordedAt === null && run.approval !== null;
  const expectedApprovalPreviousRevision = reconciledApproval
    ? binding.sourceRunRevision
    : binding.sourceRunRevision - 1;
  const expectedApprovalResultingRevision = reconciledApproval
    ? binding.sourceRunRevision + 1
    : binding.sourceRunRevision;
  const approvalMatches = run.approval === null
    ? binding.approvalRecordedAt === null
    : run.approval.approvalScopeHash === binding.approvalScopeHash &&
      run.approval.previousRevision === expectedApprovalPreviousRevision &&
      run.approval.resultingRevision === expectedApprovalResultingRevision &&
      (reconciledApproval || run.approval.approvedAt === binding.approvalRecordedAt) &&
      run.approval.actor === "local-operator" &&
      run.approval.acknowledgement === true &&
      run.approval.executionAvailabilityStatement ===
        PRIVATE_ALPHA_LOCAL_EXECUTION_APPROVAL_STATEMENT &&
      "bindingVersion" in run.approval &&
      run.approval.bindingVersion === PRIVATE_ALPHA_APPROVAL_BINDING_VERSION &&
      run.approval.cloudDataTransferAcknowledgement === "not-required";
  const expectedCancellationPreviousRevision =
    binding.sourceRunRevision + (reconciledApproval ? 1 : 0);
  if (
    run.state !== "canceled" ||
    cancellation === null ||
    run.execution !== null ||
    run.revision !== expectedCancellationPreviousRevision + 1 ||
    cancellation.previousRevision !== expectedCancellationPreviousRevision ||
    cancellation.resultingRevision !== run.revision ||
    cancellation.actor !== "local-operator" ||
    cancellation.reason !== "Creator canceled by the local operator before execution." ||
    cancellation.canceledAt !== run.updatedAt ||
    !approvalMatches
  ) {
    throw new CreatorServiceError(
      503,
      "provider_binding_mismatch",
      "Creator cancellation result does not match the exact bound source-run revision and approval state."
    );
  }
  return {
    approvalRecordedAt: run.approval?.approvedAt ?? null,
    reconciledApproval,
  };
}

function assertBoundLifecycleResult(
  result: CreatorLifecycleRunResult,
  binding: CreatorGenerationRunBinding,
  projectId: string,
  purpose: CreatorRunPurpose,
  executionIntentIdempotencyKeyHash: string,
  expectedPersistedExecutionIdempotencyKeyHash: string | null
): void {
  assertExpectedRunIdentity(result.run, projectId, purpose);
  assertBoundLifecycleRun(result.run, binding);
  const approval = result.run.approval;
  const execution = result.run.execution;
  const currentExecutionIdempotencyKeyHash =
    buildCreatorExecutionIdempotencyKeyHash(
      projectId,
      purpose,
      executionIntentIdempotencyKeyHash
    );
  if (
    expectedPersistedExecutionIdempotencyKeyHash === null ||
    expectedPersistedExecutionIdempotencyKeyHash !== currentExecutionIdempotencyKeyHash
  ) {
    throw new CreatorServiceError(
      503,
      "provider_binding_mismatch",
      "Creator execution intent does not match its persisted source-run binding."
    );
  }
  if (
    result.run.cancellation !== null ||
    approval === null ||
    approval.approvalScopeHash !== binding.approvalScopeHash ||
    approval.previousRevision !== binding.sourceRunRevision - 1 ||
    approval.resultingRevision !== binding.sourceRunRevision ||
    approval.approvedAt !== binding.approvalRecordedAt ||
    approval.actor !== "local-operator" ||
    approval.acknowledgement !== true ||
    approval.executionAvailabilityStatement !==
      PRIVATE_ALPHA_LOCAL_EXECUTION_APPROVAL_STATEMENT ||
    !("bindingVersion" in approval) ||
    approval.bindingVersion !== PRIVATE_ALPHA_APPROVAL_BINDING_VERSION ||
    approval.cloudDataTransferAcknowledgement !== "not-required" ||
    result.outputText !== (execution?.outputText ?? null) ||
    !execution ||
    execution.idempotencyKeyHash !== expectedPersistedExecutionIdempotencyKeyHash ||
    execution.approvalScopeHash !== binding.approvalScopeHash ||
    execution.previousRevision !== binding.sourceRunRevision ||
    execution.resultingRevision !== result.run.revision ||
    (execution.outputText !== null &&
      execution.outputSha256 !== hashCreatorSha256(execution.outputText)) ||
    (execution.outputText === null && execution.outputSha256 !== null) ||
    execution.responseStatus === null ||
    result.responseStatus !== execution.responseStatus
  ) {
    throw new CreatorServiceError(
      503,
      "provider_binding_mismatch",
      "Creator lifecycle result does not match the exact source-run execution record."
    );
  }
  if (
    !binding.executionAttempted ||
    binding.executionRequestedAt === null
  ) {
    throw new CreatorLifecyclePrecededIntentError();
  }
  if (result.run.state === "succeeded") {
    if (
      result.responseStatus !== 200 ||
      execution.status !== "succeeded" ||
      execution.runningRevision !== binding.sourceRunRevision + 1 ||
      execution.resultingRevision !== binding.sourceRunRevision + 2 ||
      execution.outputText === null ||
      execution.errorCode !== null ||
      execution.safeErrorMessage !== null ||
      result.errorCode !== null ||
      result.safeErrorMessage !== null
    ) {
      throw new CreatorServiceError(503, "provider_binding_mismatch", "Successful creator execution provenance is inconsistent.");
    }
    return;
  }
  if (
    result.outputText !== null ||
    execution.outputText !== null ||
    execution.outputSha256 !== null ||
    execution.status !== result.run.state ||
    result.errorCode !== execution.errorCode ||
    result.safeErrorMessage !== execution.safeErrorMessage
  ) {
    throw new CreatorServiceError(503, "provider_binding_mismatch", "Non-successful creator execution provenance is inconsistent.");
  }
  const blockedBeforeProvider =
    result.run.state === "blocked" &&
    execution.runningRevision === null &&
    execution.resultingRevision === binding.sourceRunRevision + 1;
  const terminalAfterStart =
    (result.run.state === "blocked" || result.run.state === "failed") &&
    execution.runningRevision === binding.sourceRunRevision + 1 &&
    execution.resultingRevision === binding.sourceRunRevision + 2;
  if (!blockedBeforeProvider && !terminalAfterStart) {
    throw new CreatorServiceError(503, "provider_binding_mismatch", "Terminal creator execution revisions are inconsistent.");
  }
}

function recoverTerminalLifecycleResult(
  run: PrivateAlphaRunRecord
): CreatorLifecycleRunResult | null {
  if (!run.execution || !["succeeded", "failed", "blocked"].includes(run.state)) {
    return null;
  }
  if (run.execution.responseStatus === null) {
    throw new CreatorServiceError(
      503,
      "provider_binding_mismatch",
      "The terminal source run is missing its exact persisted response status."
    );
  }
  return {
    run,
    outputText: run.execution.outputText,
    replayed: true,
    responseStatus: run.execution.responseStatus,
    errorCode: run.execution.errorCode,
    safeErrorMessage: run.execution.safeErrorMessage,
  };
}

export type CreatorService = Readonly<{
  createProject: (
    body: unknown,
    idempotencyKey: string | null | undefined
  ) => Promise<CreatorCreateProjectResult>;
  getProject: (projectId: string) => Promise<CreatorProjectState>;
  listProjects: (limit?: number) => Promise<readonly CreatorProjectState[]>;
  actOnProject: (
    projectId: string,
    body: unknown,
    idempotencyKey: string | null | undefined
  ) => Promise<CreatorProjectActionResult>;
  readActivePreviewFile: (input: {
    projectId: string;
    previewId: string;
    artifactRevision: number;
    filePath: string;
  }) => Promise<Readonly<{ bytes: Buffer; mediaType: string; sha256: string }>>;
  readExportManifest: (
    projectId: string,
    artifactRevision: number
  ) => Promise<CreatorExportManifest>;
  readExportFile: (input: {
    projectId: string;
    artifactRevision: number;
    filePath: string;
  }) => Promise<Readonly<{ bytes: Buffer; mediaType: string; sha256: string }>>;
}>;

export function createCreatorService(options: CreatorServiceOptions = {}): CreatorService {
  const persistence = options.persistence ?? createCreatorPersistence();
  const lifecycle = options.lifecycle ?? createCreatorGenerationLifecycleAdapter();
  const now = options.now ?? (() => new Date().toISOString());
  const makeId = options.makeId ?? makeCreatorHexId;

  function monotonicNow(...floors: readonly (string | null | undefined)[]): string {
    return floors.reduce<string>(
      (latest, floor) => (floor && floor > latest ? floor : latest),
      now()
    );
  }

  function createEvent(input: {
    spec: CreatorEventSpec;
    previousState: CreatorProjectStatus | null;
    resultingState: CreatorProjectStatus;
    stateRevision: number;
    occurredAt: string;
    idempotencyKeyHash: string | null;
    mutationDigest: string | null;
  }): CreatorAuditEvent {
    return {
      eventId: input.spec.eventId ?? makeId(12),
      eventType: input.spec.eventType,
      occurredAt: input.occurredAt,
      actor: input.spec.actor,
      previousState: input.previousState,
      resultingState: input.resultingState,
      stateRevision: input.stateRevision,
      sourceRunId: input.spec.sourceRunId ?? null,
      artifactRevision: input.spec.artifactRevision ?? null,
      idempotencyKeyHash: input.idempotencyKeyHash,
      mutationDigest: input.mutationDigest,
      summary: input.spec.summary.slice(0, CREATOR_MAX_AUDIT_SUMMARY_LENGTH),
    };
  }

  function nextProject(
    current: CreatorProjectState,
    input: {
      status?: CreatorProjectStatus;
      updates?: Partial<CreatorProjectState>;
      events: readonly CreatorEventSpec[];
      idempotency?: Omit<CreatorIdempotencyRecord, "resultingStateRevision" | "recordedAt">;
      idempotencyKeyHash?: string | null;
      mutationDigest?: string | null;
      minimumOccurredAt?: string | null;
    }
  ): CreatorProjectState {
    const status = input.status ?? current.status;
    if (status !== current.status) assertCreatorTransition(current.status, status);
    if (current.auditEvents.length + input.events.length > CREATOR_MAX_AUDIT_EVENTS) {
      throw new CreatorServiceError(
        409,
        "audit_capacity_reached",
        "Creator audit capacity is exhausted; no further mutation was performed."
      );
    }
    if (input.idempotency && current.idempotencyRecords.length >= CREATOR_MAX_IDEMPOTENCY_RECORDS) {
      throw new CreatorServiceError(
        409,
        "idempotency_conflict",
        "Creator idempotency capacity is exhausted; no further mutation was performed."
      );
    }
    const occurredAt = monotonicNow(current.updatedAt, input.minimumOccurredAt);
    const stateRevision = current.stateRevision + 1;
    const events = input.events.map((spec) =>
      createEvent({
        spec,
        previousState: current.status,
        resultingState: status,
        stateRevision,
        occurredAt,
        idempotencyKeyHash: input.idempotencyKeyHash ?? null,
        mutationDigest: input.mutationDigest ?? null,
      })
    );
    const idempotencyRecords = input.idempotency
      ? [
          ...current.idempotencyRecords,
          {
            ...input.idempotency,
            resultingStateRevision: stateRevision,
            recordedAt: occurredAt,
          },
        ]
      : current.idempotencyRecords;
    return {
      ...current,
      ...input.updates,
      status,
      stateRevision,
      updatedAt: occurredAt,
      auditEvents: [...current.auditEvents, ...events],
      idempotencyRecords,
    };
  }

  function assertMutationCapacity(
    project: CreatorProjectState,
    auditEventsRequired: number,
    idempotencyRecordsRequired = 1
  ): void {
    if (project.auditEvents.length + auditEventsRequired > CREATOR_MAX_AUDIT_EVENTS) {
      throw new CreatorServiceError(
        409,
        "audit_capacity_reached",
        "Creator audit capacity cannot safely contain this complete mutation."
      );
    }
    if (
      project.idempotencyRecords.length + idempotencyRecordsRequired >
      CREATOR_MAX_IDEMPOTENCY_RECORDS
    ) {
      throw new CreatorServiceError(
        409,
        "idempotency_conflict",
        "Creator idempotency capacity cannot safely contain this complete mutation."
      );
    }
  }

  function hasPendingAuditIntent(
    project: CreatorProjectState,
    eventType: CreatorAuditEvent["eventType"]
  ): boolean {
    return project.auditEvents.some(
      (event) =>
        event.eventType === eventType &&
        event.resultingState === project.status
    );
  }

  function reserveForAction(
    project: CreatorProjectState,
    action: CreatorMutationKind,
    keyHash: string,
    mutationDigest: string
  ): void {
    switch (action) {
      case "approve-generation":
        assertMutationCapacity(
          project,
          hasPendingAuditIntent(project, "approval.requested") ? 19 : 22,
          hasPendingAuditIntent(project, "approval.requested") ? 8 : 9
        );
        return;
      case "approve-repair":
        assertMutationCapacity(
          project,
          hasPendingAuditIntent(project, "approval.requested") ? 10 : 13,
          hasPendingAuditIntent(project, "approval.requested") ? 5 : 6
        );
        return;
      case "stop-preview":
        assertMutationCapacity(project, 2, 2);
        return;
      case "export":
        assertMutationCapacity(project, 1, 1);
        return;
      case "execute-generation":
        if (project.status === "approved") {
          assertMutationCapacity(project, 20, 8);
        } else if (project.status === "generating") {
          assertMutationCapacity(project, 17, 7);
        } else if (project.validation?.issues.length) {
          assertMutationCapacity(project, 15, 7);
        } else {
          assertMutationCapacity(project, 5, 4);
        }
        return;
      case "execute-repair":
        assertMutationCapacity(
          project,
          project.status === "repair_approved" ? 11 : project.status === "repairing" ? 8 : 6,
          project.status === "repair_approved" ? 5 : 4
        );
        return;
      case "request-repair":
        assertMutationCapacity(
          project,
          project.status === "repair_requested" ? 12 : 15,
          project.status === "repair_requested" ? 6 : 7
        );
        return;
      case "start-preview":
        assertMutationCapacity(project, 3, 3);
        return;
      case "cancel":
        if (project.status === "draft" || project.status === "repair_requested") {
          const cancellationPending = hasPendingAuditIntent(project, "cancellation.requested");
          assertMutationCapacity(
            project,
            cancellationPending ? 3 : 6,
            cancellationPending ? 1 : 2
          );
        } else if (
          project.status === "awaiting_generation_approval" ||
          project.status === "awaiting_repair_approval"
        ) {
          const cancellationPending = hasPendingAuditIntent(project, "cancellation.requested");
          assertMutationCapacity(
            project,
            cancellationPending ? 2 : 5,
            cancellationPending ? 1 : 2
          );
        } else if (project.status === "approved" || project.status === "repair_approved") {
          const cancellationPending = hasPendingAuditIntent(project, "cancellation.requested");
          assertMutationCapacity(
            project,
            cancellationPending ? 1 : 4,
            cancellationPending ? 1 : 2
          );
        } else {
          assertMutationCapacity(project, project.status === "preview_available" ? 2 : 1, 1);
        }
        return;
      case "recover":
        assertMutationCapacity(project, 2, 1);
        return;
    }
  }

  async function persistNext(
    current: CreatorProjectState,
    next: CreatorProjectState
  ): Promise<CreatorProjectState> {
    let firstFailure: unknown;
    try {
      await persistence.writeNextProject(next, current.stateRevision);
      return next;
    } catch (error) {
      firstFailure = error;
    }
    let durable: CreatorProjectState;
    try {
      durable = await persistence.readProject(current.identity.projectId);
    } catch {
      throw firstFailure;
    }
    if (hashCreatorCanonicalJson(durable) === hashCreatorCanonicalJson(next)) return durable;
    if (hashCreatorCanonicalJson(durable) !== hashCreatorCanonicalJson(current)) throw firstFailure;
    try {
      await persistence.writeNextProject(next, current.stateRevision);
      return next;
    } catch (recoveryFailure) {
      try {
        durable = await persistence.readProject(current.identity.projectId);
        if (hashCreatorCanonicalJson(durable) === hashCreatorCanonicalJson(next)) return durable;
      } catch {
        // The one bounded state-publication reconciliation remains unconfirmed.
      }
      throw recoveryFailure;
    }
  }

  function isExactTerminalPublication(
    project: CreatorProjectState,
    terminal: CreatorProjectState
  ): boolean {
    return hashCreatorCanonicalJson(project) === hashCreatorCanonicalJson(terminal);
  }

  async function persistTerminalRejection(
    current: CreatorProjectState,
    terminal: CreatorProjectState
  ): Promise<CreatorProjectState> {
    let firstFailure: unknown;
    try {
      await persistence.writeNextProject(terminal, current.stateRevision);
      return terminal;
    } catch (error) {
      firstFailure = error;
    }

    let durable: CreatorProjectState;
    try {
      durable = await persistence.readProject(current.identity.projectId);
    } catch {
      throw firstFailure;
    }
    if (isExactTerminalPublication(durable, terminal)) {
      return durable;
    }
    if (hashCreatorCanonicalJson(durable) !== hashCreatorCanonicalJson(current)) {
      throw firstFailure;
    }

    try {
      await persistence.writeNextProject(terminal, current.stateRevision);
      return terminal;
    } catch (recoveryFailure) {
      try {
        durable = await persistence.readProject(current.identity.projectId);
        if (isExactTerminalPublication(durable, terminal)) {
          return durable;
        }
      } catch {
        // The bounded terminal publication remains unconfirmed and fails closed.
      }
      throw recoveryFailure;
    }
  }

  function findReplay(
    project: CreatorProjectState,
    keyHash: string,
    mutationDigest: string,
    mutationKind: CreatorMutationKind | "create"
  ): CreatorIdempotencyRecord | null {
    const record = project.idempotencyRecords.find(
      (candidate) => candidate.idempotencyKeyHash === keyHash
    );
    if (!record) return null;
    if (
      record.mutationDigest !== mutationDigest ||
      record.mutationKind !== mutationKind
    ) {
      throw new CreatorServiceError(
        409,
        "idempotency_conflict",
        "Idempotency-Key conflicts with a different creator mutation."
      );
    }
    return record;
  }

  function assertIdempotencyMutationConsistency(
    project: CreatorProjectState,
    keyHash: string,
    mutationDigest: string
  ): void {
    if (
      project.auditEvents.some(
        (event) =>
          event.idempotencyKeyHash === keyHash &&
          event.mutationDigest !== mutationDigest
      )
    ) {
      throw new CreatorServiceError(
        409,
        "idempotency_conflict",
        "Idempotency-Key was already bound to a different creator mutation."
      );
    }
  }

  function hasInProgressMutation(
    project: CreatorProjectState,
    keyHash: string,
    mutationDigest: string
  ): boolean {
    return project.auditEvents.some(
      (event) =>
        event.idempotencyKeyHash === keyHash && event.mutationDigest === mutationDigest
    );
  }

  function findPendingMutationIntent(
    project: CreatorProjectState
  ): CreatorAuditEvent | null {
    return (
      [...project.auditEvents]
        .reverse()
        .find(
          (event) =>
            [
              "approval.requested",
              "execution.requested",
              "repair.requested",
              "cancellation.requested",
            ].includes(event.eventType) &&
            ((event.eventType === "approval.requested" &&
              ["awaiting_generation_approval", "awaiting_repair_approval"].includes(project.status)) ||
              (event.eventType === "execution.requested" &&
                ["generating", "repairing", "validating"].includes(project.status)) ||
              (event.eventType === "repair.requested" && project.status === "repair_requested") ||
              (event.eventType === "cancellation.requested" &&
                [
                  "draft",
                  "awaiting_generation_approval",
                  "approved",
                  "repair_requested",
                  "awaiting_repair_approval",
                  "repair_approved",
                ].includes(project.status))) &&
            event.idempotencyKeyHash !== null &&
            event.mutationDigest !== null &&
            !project.idempotencyRecords.some(
              (record) =>
                record.idempotencyKeyHash === event.idempotencyKeyHash &&
                record.mutationDigest === event.mutationDigest
            )
        ) ?? null
    );
  }

  function findPendingRecoveryIntent(
    project: CreatorProjectState
  ): CreatorAuditEvent | null {
    return (
      [...project.auditEvents]
        .reverse()
        .find(
          (event) =>
            event.eventType === "recovery.requested" &&
            event.idempotencyKeyHash !== null &&
            event.mutationDigest !== null &&
            !project.idempotencyRecords.some(
              (record) =>
                record.idempotencyKeyHash === event.idempotencyKeyHash &&
                record.mutationDigest === event.mutationDigest
            )
        ) ?? null
    );
  }

  function actionForPendingIntent(
    project: CreatorProjectState,
    pendingIntent: CreatorAuditEvent
  ): CreatorMutationKind {
    if (pendingIntent.eventType === "approval.requested") {
      return project.runBindings.find(
        (binding) => binding.sourceRunId === pendingIntent.sourceRunId
      )?.purpose === "repair"
        ? "approve-repair"
        : "approve-generation";
    }
    if (pendingIntent.eventType === "execution.requested") {
      return project.runBindings.find(
        (binding) => binding.sourceRunId === pendingIntent.sourceRunId
      )?.purpose === "repair"
        ? "execute-repair"
        : "execute-generation";
    }
    return pendingIntent.eventType === "repair.requested"
      ? "request-repair"
      : "cancel";
  }

  function assertInProgressMutationOwnership(
    project: CreatorProjectState,
    action: CreatorMutationKind,
    keyHash: string,
    mutationDigest: string
  ): void {
    const pendingRecovery = findPendingRecoveryIntent(project);
    const pendingIntent = findPendingMutationIntent(project);
    if (pendingRecovery) {
      if (
        action !== "recover" ||
        pendingRecovery.idempotencyKeyHash !== keyHash ||
        pendingRecovery.mutationDigest !== mutationDigest
      ) {
        throw new CreatorServiceError(
          409,
          "idempotency_conflict",
          "An explicit creator recovery is already owned by a different idempotency key or request."
        );
      }
      return;
    }
    if (!pendingIntent) {
      if (action === "recover") {
        throw new CreatorServiceError(
          409,
          "invalid_transition",
          "No interrupted creator mutation is available for explicit recovery."
        );
      }
      return;
    }

    const expectedAction = actionForPendingIntent(project, pendingIntent);
    const cancellationMaySupersedePreExecutionIntent =
      action === "cancel" &&
      ["approval.requested", "repair.requested"].includes(
        pendingIntent.eventType
      );
    if (
      !cancellationMaySupersedePreExecutionIntent &&
      action !== "recover" &&
      (action !== expectedAction ||
        pendingIntent.idempotencyKeyHash !== keyHash ||
        pendingIntent.mutationDigest !== mutationDigest)
    ) {
      throw new CreatorServiceError(
        409,
        "idempotency_conflict",
        "An in-progress creator mutation is already owned by a different idempotency key or request."
      );
    }
  }

  function assertDraftCreateContinuationAvailable(project: CreatorProjectState): void {
    if (project.status !== "draft") return;
    const pendingRecovery = findPendingRecoveryIntent(project);
    const pendingIntent = findPendingMutationIntent(project);
    if (pendingRecovery || pendingIntent?.eventType === "cancellation.requested") {
      throw new CreatorServiceError(
        409,
        "idempotency_conflict",
        pendingRecovery
          ? "An explicit creator recovery already owns this draft lifecycle."
          : "An explicit creator cancellation already owns this draft lifecycle."
      );
    }
  }

  function assertRevisionOrRecovery(
    project: CreatorProjectState,
    expectedRevision: number,
    keyHash: string,
    mutationDigest: string,
    recoverableStates: readonly CreatorProjectStatus[] = []
  ): void {
    if (project.stateRevision === expectedRevision) return;
    if (
      recoverableStates.includes(project.status) &&
      hasInProgressMutation(project, keyHash, mutationDigest)
    ) {
      return;
    }
    throw new CreatorServiceError(
      409,
      "revision_conflict",
      "Creator revision precondition failed; reload the exact current project state."
    );
  }

  function buildRunBinding(input: {
    run: PrivateAlphaRunRecord;
    projectId: string;
    purpose: CreatorRunPurpose;
    instruction: string;
    sourceArtifactRevision: number | null;
    boundAt: string;
  }): CreatorGenerationRunBinding {
    assertExpectedRunIdentity(input.run, input.projectId, input.purpose);
    assertExactRunBinding(input.run);
    return {
      purpose: input.purpose,
      sourceRunId: input.run.runId,
      ownershipBindingId:
        input.run.ownership?.kind === "creator"
          ? input.run.ownership.bindingId
          : "",
      sourceRunRevision: input.run.revision,
      approvalScopeHash: input.run.approvalScopeHash,
      providerKey: "ollama-local",
      modelKey: "ollama-local::gpt-oss:20b",
      runtimeModel: "gpt-oss:20b",
      dataBoundary: "local-machine",
      maximumOutputTokens: 4096,
      requestEnvelopeDigest: buildCreatorInstructionDigest(input.instruction),
      sourceArtifactRevision: input.sourceArtifactRevision,
      boundAt: input.boundAt,
      approvalRecordedAt: null,
      executionRequestedAt: null,
      executionIdempotencyKeyHash: null,
      outputReceivedAt: null,
      executionAttempted: false,
    };
  }

  async function bindExactInitialRun(input: {
    projectId: string;
    purpose: CreatorRunPurpose;
    instruction: string;
  }): Promise<PrivateAlphaRunRecord> {
    try {
      const run = await lifecycle.bindRun(input);
      assertBoundInitialRun(run, input.projectId, input.purpose);
      return run;
    } catch {
      // A transport or validation failure after run creation is non-conclusive until exact recovery.
    }
    try {
      const recovered = await lifecycle.recoverBoundRun(input);
      if (recovered) {
        assertBoundInitialRun(recovered, input.projectId, input.purpose);
        return recovered;
      }
    } catch {
      throw new CreatorRunBindingUnconfirmedError();
    }
    throw new CreatorRunBindingUnconfirmedError();
  }

  async function cancelExactBoundRun(input: {
    runId: string;
    binding: CreatorGenerationRunBinding;
    projectId: string;
    purpose: CreatorRunPurpose;
  }): Promise<Readonly<{
    run: PrivateAlphaRunRecord;
    approvalRecordedAt: string | null;
    reconciledApproval: boolean;
  }>> {
    let run: PrivateAlphaRunRecord;
    try {
      run = await lifecycle.cancelRun({
        projectId: input.projectId,
        purpose: input.purpose,
        runId: input.runId,
        ownershipBindingId: input.binding.ownershipBindingId,
        reason: "Creator canceled by the local operator before execution.",
      });
      const cancellation = assertBoundCancellationRun(
        run,
        input.binding,
        input.projectId,
        input.purpose
      );
      return { run, ...cancellation };
    } catch {
      try {
        run = await lifecycle.getRun({
          projectId: input.projectId,
          purpose: input.purpose,
          runId: input.runId,
          ownershipBindingId: input.binding.ownershipBindingId,
        });
        const cancellation = assertBoundCancellationRun(
          run,
          input.binding,
          input.projectId,
          input.purpose
        );
        return { run, ...cancellation };
      } catch {
        throw new CreatorServiceError(
          503,
          "cancellation_failed",
          "The exact pre-execution cancellation outcome could not yet be confirmed; retry only this same cancellation."
        );
      }
    }
  }

  async function recoverLatentRunForCancellation(
    project: CreatorProjectState
  ): Promise<Readonly<{
    binding: CreatorGenerationRunBinding;
    packet: CreatorApprovalPacket;
    events: readonly CreatorEventSpec[];
  }> | null> {
    let purpose: CreatorRunPurpose;
    let instruction: string;
    let sourceArtifactRevision: number | null;
    if (project.status === "draft" && project.plan) {
      purpose = "generation";
      instruction = buildCreatorGenerationInstruction({
        projectTitle: project.identity.projectTitle,
        description: project.request.description,
      });
      sourceArtifactRevision = null;
    } else if (project.status === "repair_requested" && project.repair && project.validation) {
      purpose = "repair";
      sourceArtifactRevision = project.repair.sourceArtifactRevision;
      instruction = buildCreatorRepairInstruction({
        projectTitle: project.identity.projectTitle,
        description: project.request.description,
        sourceArtifactRevision,
        issueDigest: project.validation.issueDigest,
        issues: project.validation.issues,
      });
    } else {
      return null;
    }
    assertInstructionBounded(instruction);
    const run = await lifecycle.recoverBoundRun({
      projectId: project.identity.projectId,
      purpose,
      instruction,
    });
    if (!run) return null;
    const reconciledBoundAt = monotonicNow(project.updatedAt, run.createdAt);
    const initialBinding = {
      ...buildRunBinding({
        run,
        projectId: project.identity.projectId,
        purpose,
        instruction,
        sourceArtifactRevision,
        boundAt: reconciledBoundAt,
      }),
      sourceRunRevision: 1,
    };
    if (run.state === "awaiting_approval") {
      assertBoundInitialRun(run, project.identity.projectId, purpose);
    } else if (run.state === "approved") {
      assertBoundApprovalRun(
        run,
        initialBinding,
        project.identity.projectId,
        purpose
      );
    } else if (run.state !== "canceled") {
      throw new CreatorServiceError(
        409,
        "invalid_transition",
        "Cancellation cannot claim to stop a creator source run that already reached execution."
      );
    }
    const cancellation = await cancelExactBoundRun({
      runId: run.runId,
      binding: initialBinding,
      projectId: project.identity.projectId,
      purpose,
    });
    const canceledRun = cancellation.run;
    const binding: CreatorGenerationRunBinding = {
      ...initialBinding,
      sourceRunRevision: canceledRun.revision,
      approvalRecordedAt: cancellation.approvalRecordedAt,
    };
    const packet: CreatorApprovalPacket = {
      ...buildApprovalPacket(
        initialBinding,
        project.plan?.planDigest ?? "",
        project.identity.projectId,
        reconciledBoundAt
      ),
      privateAlphaRunRevision: canceledRun.revision,
      status: "canceled",
      approvedAt: cancellation.approvalRecordedAt,
    };
    const events: CreatorEventSpec[] = [
      {
        eventType: purpose === "generation" ? "run.bound" : "repair.run_bound",
        actor: "system",
        summary: purpose === "generation"
          ? "The exact previously created local generation run was reconciled before cancellation."
          : "The exact previously created local repair run was reconciled before cancellation.",
        sourceRunId: run.runId,
        artifactRevision: sourceArtifactRevision,
      },
    ];
    if (cancellation.reconciledApproval) {
      events.push({
        eventType: "approval.recorded",
        actor: "local-operator",
        summary: "A previously completed manual approval was reconciled before exact pre-execution cancellation.",
        sourceRunId: run.runId,
      });
    }
    return { binding, packet, events };
  }

  function buildApprovalPacket(
    binding: CreatorGenerationRunBinding,
    planDigest: string,
    projectId: string,
    preparedAt: string
  ): CreatorApprovalPacket {
    const targetArtifactRevision = (binding.sourceArtifactRevision ?? 0) + 1;
    return {
      purpose: binding.purpose,
      privateAlphaRunId: binding.sourceRunId,
      privateAlphaRunRevision: binding.sourceRunRevision,
      approvalScopeHash: binding.approvalScopeHash,
      planDigest,
      sourceArtifactRevision: binding.sourceArtifactRevision,
      targetArtifactRevision,
      destinationBoundary: buildCreatorDestinationBoundary(projectId, targetArtifactRevision),
      status: "awaiting",
      modelEnvelope: CREATOR_MODEL_ENVELOPE,
      preparedAt,
      approvedAt: null,
    };
  }

  function assertExactApprovalDestination(
    project: CreatorProjectState,
    purpose: CreatorRunPurpose,
    binding: CreatorGenerationRunBinding,
    expectedTargetArtifactRevision = (project.materializations.at(-1)?.artifactRevision ?? 0) + 1
  ): void {
    const packet = project.approvalPacket;
    const bindingTargetArtifactRevision = (binding.sourceArtifactRevision ?? 0) + 1;
    if (
      !packet ||
      packet.purpose !== purpose ||
      packet.privateAlphaRunId !== binding.sourceRunId ||
      packet.sourceArtifactRevision !== binding.sourceArtifactRevision ||
      bindingTargetArtifactRevision !== expectedTargetArtifactRevision ||
      packet.targetArtifactRevision !== expectedTargetArtifactRevision ||
      packet.destinationBoundary !== buildCreatorDestinationBoundary(project.identity.projectId, expectedTargetArtifactRevision)
    ) {
      throw new CreatorServiceError(500, "record_corrupt", "Creator approval destination no longer matches its exact run and artifact revision.");
    }
  }

  function replaceRunBinding(
    project: CreatorProjectState,
    sourceRunId: string,
    update: (binding: CreatorGenerationRunBinding) => CreatorGenerationRunBinding
  ): readonly CreatorGenerationRunBinding[] {
    let found = false;
    const next = project.runBindings.map((binding) => {
      if (binding.sourceRunId !== sourceRunId) return binding;
      found = true;
      return update(binding);
    });
    if (!found) {
      throw new CreatorServiceError(500, "record_corrupt", "Creator source run binding is missing.");
    }
    return next;
  }

  async function failProject(
    current: CreatorProjectState,
    input: {
      code: CreatorFailureCode;
      message: string;
      keyHash: string;
      mutationDigest: string;
      mutationKind: string;
      purpose?: CreatorRunPurpose;
      sourceRunId?: string | null;
      updates?: Partial<CreatorProjectState>;
    }
  ): Promise<CreatorProjectState> {
    const events: CreatorEventSpec[] = [];
    if (input.purpose === "repair" && input.sourceRunId) {
      events.push({
        eventType: "repair.result_rejected",
        actor: "system",
        summary: "The single repair attempt did not produce a publishable replacement bundle.",
        sourceRunId: input.sourceRunId ?? null,
      });
    }
    events.push({
      eventType: "failure.recorded",
      actor: "system",
      summary: input.message,
      sourceRunId: input.sourceRunId ?? null,
    });
    const failed = nextProject(current, {
      status: "failed",
      updates: {
        ...input.updates,
        failureCode: input.code,
        failureMessage: input.message.slice(0, 240),
      },
      events,
      idempotencyKeyHash: input.keyHash,
      mutationDigest: input.mutationDigest,
      idempotency: {
        idempotencyKeyHash: input.keyHash,
        mutationKind: input.mutationKind,
        mutationDigest: input.mutationDigest,
      },
    });
    return persistNext(current, failed);
  }

  async function approvePurpose(
    current: CreatorProjectState,
    purpose: CreatorRunPurpose,
    keyHash: string,
    mutationDigest: string,
    mutationKind: string
  ): Promise<CreatorProjectState> {
    const expectedStatus = purpose === "generation" ? "awaiting_generation_approval" : "awaiting_repair_approval";
    const resultingStatus = purpose === "generation" ? "approved" : "repair_approved";
    const approvalPacket = current.approvalPacket;
    if (current.status !== expectedStatus || approvalPacket?.purpose !== purpose) {
      throw new CreatorServiceError(409, "invalid_transition", `Creator ${purpose} approval is not currently available.`);
    }
    const binding = [...current.runBindings]
      .reverse()
      .find((candidate) => candidate.purpose === purpose);
    if (
      !binding ||
      binding.sourceRunId !== approvalPacket.privateAlphaRunId ||
      binding.sourceRunRevision !== approvalPacket.privateAlphaRunRevision ||
      binding.approvalScopeHash !== approvalPacket.approvalScopeHash ||
      current.plan?.planDigest !== approvalPacket.planDigest
    ) {
      throw new CreatorServiceError(
        409,
        "approval_failed",
        "Creator approval packet no longer matches its exact plan and run binding."
      );
    }
    assertExactApprovalDestination(current, purpose, binding);
    if (!hasPendingAuditIntent(current, "approval.requested")) {
      const intent = nextProject(current, {
        events: [
          {
            eventType: "approval.requested",
            actor: "local-operator",
            summary: `Manual ${purpose} approval was explicitly requested; execution remains unavailable.`,
            sourceRunId: binding.sourceRunId,
          },
        ],
        idempotencyKeyHash: keyHash,
        mutationDigest,
      });
      current = await persistNext(current, intent);
    }
    let run: PrivateAlphaRunRecord;
    try {
      const candidate = await lifecycle.approveRun({
        projectId: current.identity.projectId,
        purpose,
        runId: binding.sourceRunId,
        ownershipBindingId: binding.ownershipBindingId,
        expectedRunRevision: binding.sourceRunRevision,
        expectedApprovalScopeHash: binding.approvalScopeHash,
        expectedRequestEnvelopeDigest: binding.requestEnvelopeDigest,
      });
      assertBoundApprovalRun(
        candidate,
        binding,
        current.identity.projectId,
        purpose
      );
      run = candidate;
    } catch {
      try {
        const recovered = await lifecycle.getRun({
          projectId: current.identity.projectId,
          purpose,
          runId: binding.sourceRunId,
          ownershipBindingId: binding.ownershipBindingId,
        });
        assertBoundApprovalRun(
          recovered,
          binding,
          current.identity.projectId,
          purpose
        );
        run = recovered;
      } catch {
        throw new CreatorServiceError(
          503,
          "approval_failed",
          "The exact manual approval outcome could not yet be confirmed; the same approval or a separate cancellation remains available."
        );
      }
    }
    const approvedAt = run.approval?.approvedAt;
    if (!approvedAt) {
      throw new CreatorServiceError(
        503,
        "provider_binding_mismatch",
        "Creator approval result is missing its exact approval timestamp."
      );
    }
    const next = nextProject(current, {
      status: resultingStatus,
      updates: {
        approvalPacket: {
          ...approvalPacket,
          privateAlphaRunRevision: run.revision,
          status: "approved",
          approvedAt,
        },
        runBindings: replaceRunBinding(
          current,
          run.runId,
          (binding) => ({
            ...binding,
            sourceRunRevision: run.revision,
            approvalRecordedAt: approvedAt,
          })
        ),
      },
      events: [
        {
          eventType: "approval.recorded",
          actor: "local-operator",
          summary: `Manual ${purpose} approval was recorded; execution remains a separate action.`,
          sourceRunId: run.runId,
        },
      ],
      idempotencyKeyHash: keyHash,
      mutationDigest,
      idempotency: {
        idempotencyKeyHash: keyHash,
        mutationKind,
        mutationDigest,
      },
      minimumOccurredAt: approvedAt,
    });
    return persistNext(current, next);
  }

  async function executePurpose(
    initial: CreatorProjectState,
    purpose: CreatorRunPurpose,
    keyHash: string,
    mutationDigest: string,
    mutationKind: string
  ): Promise<CreatorProjectState> {
    let current = initial;
    const approvedStatus = purpose === "generation" ? "approved" : "repair_approved";
    const runningStatus = purpose === "generation" ? "generating" : "repairing";
    if (
      current.status !== approvedStatus &&
      current.status !== runningStatus &&
      current.status !== "validating"
    ) {
      throw new CreatorServiceError(409, "invalid_transition", `Creator ${purpose} execution is not currently available.`);
    }
    let binding = [...current.runBindings].reverse().find((candidate) => candidate.purpose === purpose);
    if (!binding) {
      throw new CreatorServiceError(500, "record_corrupt", "Creator execution run binding is missing.");
    }
    if (
      current.status === "validating" &&
      (current.artifactProposalBinding?.purpose !== purpose ||
        current.artifactProposalBinding.sourceRunId !== binding.sourceRunId)
    ) {
      throw new CreatorServiceError(
        409,
        "provider_binding_mismatch",
        "Validation recovery does not match this exact creator run purpose."
      );
    }
    assertExactApprovalDestination(current, purpose, binding);

    if (current.status === approvedStatus) {
      const executionRequestedAt = monotonicNow(current.updatedAt);
      const running = nextProject(current, {
        status: runningStatus,
        updates: {
          runBindings: replaceRunBinding(current, binding.sourceRunId, (candidate) => ({
            ...candidate,
            executionRequestedAt,
            executionIdempotencyKeyHash:
              buildCreatorExecutionIdempotencyKeyHash(
                current.identity.projectId,
                purpose,
                keyHash
              ),
            executionAttempted: true,
          })),
        },
        events: [
          {
            eventType: "execution.requested",
            actor: "local-operator",
            summary: `One explicit ${purpose} execution attempt was requested.`,
            sourceRunId: binding.sourceRunId,
          },
        ],
        idempotencyKeyHash: keyHash,
        mutationDigest,
        minimumOccurredAt: executionRequestedAt,
      });
      current = await persistNext(current, running);
      binding = [...current.runBindings]
        .reverse()
        .find((candidate) => candidate.sourceRunId === binding?.sourceRunId);
      if (!binding) {
        throw new CreatorServiceError(500, "record_corrupt", "Creator execution intent lost its exact run binding.");
      }
    }
    if (current.status === runningStatus) {
      let result: CreatorLifecycleRunResult;
      try {
        result = await lifecycle.executeRun({
          projectId: current.identity.projectId,
          purpose,
          runId: binding.sourceRunId,
          ownershipBindingId: binding.ownershipBindingId,
          expectedRunRevision: binding.sourceRunRevision,
          expectedApprovalScopeHash: binding.approvalScopeHash,
          expectedRequestEnvelopeDigest: binding.requestEnvelopeDigest,
          executionIntentIdempotencyKeyHash: keyHash,
        });
      } catch {
        let recovered: CreatorLifecycleRunResult | null = null;
        try {
          recovered = recoverTerminalLifecycleResult(
            await lifecycle.getRun({
              projectId: current.identity.projectId,
              purpose,
              runId: binding.sourceRunId,
              ownershipBindingId: binding.ownershipBindingId,
            })
          );
        } catch {
          // The one exact source run could not be read back; leave the explicit
          // action recoverable without issuing another provider attempt here.
        }
        if (!recovered) {
          throw new CreatorServiceError(
            503,
            "execution_blocked",
            "The exact local execution outcome is not yet durably confirmed; retry this same explicit action."
          );
        }
        result = recovered;
      }
      try {
        assertBoundLifecycleResult(
          result,
          binding,
          current.identity.projectId,
          purpose,
          keyHash,
          binding.executionIdempotencyKeyHash
        );
      } catch (error) {
        if (error instanceof CreatorLifecyclePrecededIntentError) {
          const reconciledRunBindings = replaceRunBinding(
            current,
            binding.sourceRunId,
            (candidate) => ({
              ...candidate,
              sourceRunRevision: result.run.revision,
            })
          );
          return failProject(current, {
            code: "provider_binding_mismatch",
            message: "The exact source run was executed outside this creator execution intent; no output was accepted or materialized.",
            keyHash,
            mutationDigest,
            mutationKind,
            purpose,
            sourceRunId: binding.sourceRunId,
            updates: { runBindings: reconciledRunBindings },
          });
        }
        if (
          error instanceof CreatorServiceError &&
          error.code === "provider_binding_mismatch"
        ) {
          return failProject(current, {
            code: "provider_binding_mismatch",
            message: "Private Alpha returned a lifecycle result outside the exact approved creator binding.",
            keyHash,
            mutationDigest,
            mutationKind,
            purpose,
            sourceRunId: binding.sourceRunId,
          });
        }
        throw error;
      }
      const returnedRunBindings = replaceRunBinding(
        current,
        binding.sourceRunId,
        (candidate) => ({
          ...candidate,
          sourceRunRevision: result.run.revision,
        })
      );
      if (
        result.responseStatus !== 200 ||
        result.run.state !== "succeeded" ||
        !result.outputText
      ) {
        return failProject(current, {
          code: result.errorCode === "kill_switch_blocked" ? "kill_switch_blocked" : "execution_failed",
          message:
            result.errorCode === "kill_switch_blocked"
              ? "The existing Private Alpha kill switch blocked creator execution."
              : "The exact local generation attempt failed; no retry or fallback was performed.",
          keyHash,
          mutationDigest,
          mutationKind,
          purpose,
          sourceRunId: binding.sourceRunId,
          updates: { runBindings: returnedRunBindings },
        });
      }
      const outputReceivedAt = monotonicNow(current.updatedAt);
      const output = validateCreatorProviderOutput({
        rawOutput: result.outputText,
        expectedProjectTitle: current.identity.projectTitle,
        completedAt: outputReceivedAt,
      });
      const completedRunBindings = replaceRunBinding(
        current,
        binding.sourceRunId,
        (candidate) => ({
          ...candidate,
          sourceRunRevision: result.run.revision,
          outputReceivedAt,
        })
      );
      const proposalBinding = {
        purpose,
        sourceRunId: binding.sourceRunId,
      } as const;
      if (!output.validation.valid || !output.bundle) {
        const contractRejected = !output.parse.ok;
        const rejectedStatus = purpose === "generation" ? "rejected_output" : "failed";
        const failureCode = contractRejected
          ? "output_contract_invalid"
          : "output_validation_failed";
        const failureMessage = contractRejected
          ? "The returned output did not match the strict artifact contract."
          : "The returned artifact has blocking deterministic validation findings.";
        const terminal = nextProject(current, {
          status: rejectedStatus,
          updates: {
            artifactProposal: null,
            artifactProposalBinding: proposalBinding,
            validation: output.validation,
            runBindings: completedRunBindings,
            failureCode,
            failureMessage,
          },
          events: [
            {
              eventType: "output.received",
              actor: "system",
              summary: "Bounded provider output was received for deterministic contract validation.",
              sourceRunId: binding.sourceRunId,
            },
            {
              eventType: "validation.completed",
              actor: "system",
              summary: "Deterministic validation completed with blocking findings.",
              sourceRunId: binding.sourceRunId,
            },
            {
              eventType:
                purpose === "generation" ? "output.rejected" : "repair.result_rejected",
              actor: "system",
              summary: contractRejected
                ? "The returned output was rejected before materialization."
                : "Blocking validation findings prevented materialization.",
              sourceRunId: binding.sourceRunId,
            },
            ...(purpose === "repair"
              ? [
                  {
                    eventType: "failure.recorded" as const,
                    actor: "system" as const,
                    summary:
                      "The single repair attempt failed validation and no further repair is available.",
                    sourceRunId: binding.sourceRunId,
                  },
                ]
              : []),
          ],
          idempotencyKeyHash: keyHash,
          mutationDigest,
          idempotency: {
            idempotencyKeyHash: keyHash,
            mutationKind,
            mutationDigest,
          },
          minimumOccurredAt: outputReceivedAt,
        });
        return persistTerminalRejection(current, terminal);
      }
      const validating = nextProject(current, {
        status: "validating",
        updates: {
          artifactProposal: output.bundle,
          artifactProposalBinding: proposalBinding,
          validation: output.validation,
          runBindings: completedRunBindings,
        },
        events: [
          {
            eventType: "output.received",
            actor: "system",
            summary: "Bounded provider output was received for deterministic contract validation.",
            sourceRunId: binding.sourceRunId,
          },
          {
            eventType: "validation.completed",
            actor: "system",
            summary: output.validation.valid
              ? "All ten deterministic validation stages completed without a blocking issue."
              : "Deterministic validation completed with blocking findings.",
            sourceRunId: binding.sourceRunId,
          },
        ],
        idempotencyKeyHash: keyHash,
        mutationDigest,
        minimumOccurredAt: outputReceivedAt,
      });
      current = await persistNext(current, validating);
    }

    if (!current.validation || !current.artifactProposal) {
      if (current.validation && !current.validation.valid) {
        const rejectedStatus = purpose === "generation" ? "rejected_output" : "failed";
        const eventType = purpose === "generation" ? "output.rejected" : "repair.result_rejected";
        const rejected = nextProject(current, {
          status: rejectedStatus,
          updates: {
            failureCode: "output_contract_invalid",
            failureMessage: "The returned output did not match the strict artifact contract.",
          },
          events: [
            {
              eventType,
              actor: "system",
              summary: "The returned output was rejected before materialization.",
              sourceRunId: binding.sourceRunId,
            },
            ...(purpose === "repair"
              ? [
                  {
                    eventType: "failure.recorded" as const,
                    actor: "system" as const,
                    summary: "The single repair attempt was rejected and cannot be retried automatically.",
                    sourceRunId: binding.sourceRunId,
                  },
                ]
              : []),
          ],
          idempotencyKeyHash: keyHash,
          mutationDigest,
          idempotency: {
            idempotencyKeyHash: keyHash,
            mutationKind,
            mutationDigest,
          },
        });
        return persistTerminalRejection(current, rejected);
      }
      return failProject(current, {
        code: "record_corrupt",
        message: "Creator validation recovery data is incomplete.",
        keyHash,
        mutationDigest,
        mutationKind,
        purpose,
        sourceRunId: binding.sourceRunId,
      });
    }

    if (!current.validation.valid) {
      const rejectedStatus = purpose === "generation" ? "rejected_output" : "failed";
      const rejected = nextProject(current, {
        status: rejectedStatus,
        updates: {
          failureCode: "output_validation_failed",
          failureMessage: "The artifact proposal has blocking deterministic validation findings.",
        },
        events: [
          {
            eventType: purpose === "generation" ? "output.rejected" : "repair.result_rejected",
            actor: "system",
            summary: "Blocking validation findings prevented materialization.",
            sourceRunId: binding.sourceRunId,
          },
          ...(purpose === "repair"
            ? [
                {
                  eventType: "failure.recorded" as const,
                  actor: "system" as const,
                  summary: "The single repair attempt failed validation and no further repair is available.",
                  sourceRunId: binding.sourceRunId,
                },
              ]
            : []),
        ],
        idempotencyKeyHash: keyHash,
        mutationDigest,
        idempotency: {
          idempotencyKeyHash: keyHash,
          mutationKind,
          mutationDigest,
        },
      });
      return persistTerminalRejection(current, rejected);
    }
    const acceptedValidation = current.validation;
    const acceptedProposal = current.artifactProposal;

    const killSwitch = await lifecycle.readKillSwitch();
    if (killSwitch.killSwitchEngaged) {
      throw new CreatorServiceError(
        503,
        "kill_switch_blocked",
        "The existing Private Alpha kill switch blocked materialization; the validated result remains recoverable."
      );
    }

    const artifactRevision = (current.materializations.at(-1)?.artifactRevision ?? 0) + 1;
    const expectedDestinationLabel = buildCreatorDestinationBoundary(current.identity.projectId, artifactRevision);
    try {
      assertExactApprovalDestination(current, purpose, binding, artifactRevision);
    } catch (error) {
      return failProject(current, {
        code: "record_corrupt",
        message: "The approved creator destination no longer matches the exact materialization revision.",
        keyHash,
        mutationDigest,
        mutationKind,
        purpose,
        sourceRunId: binding.sourceRunId,
      });
    }
    const materializedEventId = hashCreatorSha256(
      `creator-audit:materialized:${current.identity.projectId}:${artifactRevision}:${binding.sourceRunId}`
    ).slice(0, 24);
    const manifestEventId = hashCreatorSha256(
      `creator-audit:manifest:${current.identity.projectId}:${artifactRevision}:${binding.sourceRunId}`
    ).slice(0, 24);
    const expectedAuditReferenceIds = [
      ...current.auditEvents
        .filter(
          (event) =>
            event.eventType !== "recovery.requested" &&
            event.eventType !== "recovery.completed"
        )
        .map((event) => event.eventId),
      materializedEventId,
      manifestEventId,
    ];
    const assertExpectedPublication = (
      candidate: CreatorMaterializationPublication
    ): CreatorMaterializationPublication => {
      if (
        candidate.manifest.creatorProjectId !== current.identity.projectId ||
        candidate.manifest.projectTitle !== current.identity.projectTitle ||
        candidate.manifest.creatorKind !== current.identity.creatorKind ||
        candidate.manifest.artifactRevision !== artifactRevision ||
        candidate.manifest.entrypoint !== "index.html" ||
        candidate.manifest.sourceRunId !== binding.sourceRunId ||
        candidate.manifest.sourceRequestDigest !== current.request.requestDigest ||
        candidate.manifest.providerKey !== binding.providerKey ||
        candidate.manifest.modelKey !== binding.modelKey ||
        candidate.manifest.runtimeModel !== binding.runtimeModel ||
        candidate.manifest.dataBoundary !== binding.dataBoundary ||
        candidate.manifest.validationDigest !==
          buildCreatorValidationDigest(acceptedValidation) ||
        acceptedValidation.manifestDigest !== hashCreatorCanonicalJson({
          entrypoint: candidate.manifest.entrypoint,
          files: candidate.manifest.files,
        }) ||
        candidate.materialization.artifactRevision !== artifactRevision ||
        candidate.materialization.destinationLabel !== expectedDestinationLabel ||
        candidate.materialization.entrypoint !== "index.html" ||
        candidate.materialization.validationDigest !== candidate.manifest.validationDigest ||
        candidate.manifest.createdAt !== candidate.materialization.materializedAt ||
        hashCreatorCanonicalJson(candidate.manifest.auditReferenceIds) !==
          hashCreatorCanonicalJson(expectedAuditReferenceIds)
      ) {
        throw new CreatorMaterializationError(
          "export_digest_mismatch",
          "Published creator revision does not match this exact recovery binding."
        );
      }
      return candidate;
    };
    const readExpectedPublication = async () => assertExpectedPublication(
      await readCreatorMaterializationPublication({
        persistence,
        projectId: current.identity.projectId,
        artifactRevision,
      })
    );
    let publication;
    try {
      try {
        publication = await readExpectedPublication();
      } catch (error) {
        if (!(error instanceof CreatorMaterializationError) || error.code !== "not_found") {
          throw error;
        }
        try {
          publication = assertExpectedPublication(await materializeCreatorArtifact({
            persistence,
            projectId: current.identity.projectId,
            projectTitle: current.identity.projectTitle,
            sourceRequestDigest: current.request.requestDigest,
            artifactRevision,
            bundle: acceptedProposal,
            validation: acceptedValidation,
            runBinding:
              [...current.runBindings].reverse().find((candidate) => candidate.sourceRunId === binding.sourceRunId) ?? binding,
            auditReferenceIds: expectedAuditReferenceIds,
            materializedAt: monotonicNow(current.updatedAt),
          }));
        } catch (publicationError) {
          try {
            publication = await readExpectedPublication();
          } catch {
            throw publicationError;
          }
        }
      }
    } catch (error) {
      return failProject(current, {
        code: "materialization_failed",
        message: "Atomic materialization failed; every prior valid revision was preserved.",
        keyHash,
        mutationDigest,
        mutationKind,
        purpose,
        sourceRunId: binding.sourceRunId,
      });
    }

    const finalEvents: CreatorEventSpec[] = [];
    if (purpose === "repair") {
      finalEvents.push({
        eventType: "repair.result_accepted",
        actor: "system",
        summary: "The single repair attempt produced a valid complete replacement bundle.",
        sourceRunId: binding.sourceRunId,
        artifactRevision,
      });
    }
    finalEvents.push(
      {
        eventId: materializedEventId,
        eventType: "revision.materialized",
        actor: "system",
        summary: `Artifact revision ${artifactRevision} was atomically published inside the creator workspace.`,
        sourceRunId: binding.sourceRunId,
        artifactRevision,
      },
      {
        eventId: manifestEventId,
        eventType: "export.manifest_created",
        actor: "system",
        summary: `Deterministic export manifest ${publication.manifest.manifestDigest.slice(0, 12)} was created.`,
        sourceRunId: binding.sourceRunId,
        artifactRevision,
      }
    );
    const ready = nextProject(current, {
      status: "ready",
      updates: {
        materializations: [...current.materializations, publication.materialization],
        exportManifest: publication.manifest,
        preview: {
          status: "inactive",
          previewId: null,
          artifactRevision,
          startedAt: null,
          stoppedAt: null,
        },
        failureCode: null,
        failureMessage: null,
      },
      events: finalEvents,
      idempotencyKeyHash: keyHash,
      mutationDigest,
      idempotency: {
        idempotencyKeyHash: keyHash,
        mutationKind,
        mutationDigest,
      },
      minimumOccurredAt: publication.materialization.materializedAt,
    });
    return persistNext(current, ready);
  }

  async function requestRepair(
    currentInput: CreatorProjectState,
    keyHash: string,
    mutationDigest: string,
    mutationKind: string
  ): Promise<CreatorProjectState> {
    let current = currentInput;
    if (current.status !== "repair_requested") {
      if (current.repair) {
        throw new CreatorServiceError(409, "repair_limit_reached", "Website/Browser App v0 permits exactly one repair attempt.");
      }
      if (
        (current.status !== "rejected_output" && current.status !== "ready") ||
        !current.validation ||
        current.validation.issues.length < 1
      ) {
        throw new CreatorServiceError(409, "repair_unavailable", "Repair requires exact validation findings on the current proposal.");
      }
      const sourceArtifactRevision = current.materializations.at(-1)?.artifactRevision ?? null;
      const preliminaryInstruction = buildCreatorRepairInstruction({
        projectTitle: current.identity.projectTitle,
        description: current.request.description,
        sourceArtifactRevision,
        issueDigest: current.validation.issueDigest,
        issues: current.validation.issues,
      });
      assertInstructionBounded(preliminaryInstruction);
      const requestedAt = monotonicNow(current.updatedAt);
      const repairRequested = nextProject(current, {
        status: "repair_requested",
        updates: {
          repair: {
            attempt: 1,
            requestedAt,
            sourceArtifactRevision,
            validationIssueDigest: current.validation.issueDigest,
            issueCodes: current.validation.issues.map((issue) => issue.code).slice(0, 64),
            repairContextDigest: hashCreatorSha256(preliminaryInstruction),
          },
        },
        events: [
          {
            eventType: "repair.requested",
            actor: "local-operator",
            summary: "The one permitted repair was requested; it is not approved or executed.",
            artifactRevision: sourceArtifactRevision,
          },
        ],
        idempotencyKeyHash: keyHash,
        mutationDigest,
        minimumOccurredAt: requestedAt,
      });
      current = await persistNext(current, repairRequested);
    }
    if (!current.repair || !current.validation) {
      throw new CreatorServiceError(500, "record_corrupt", "Creator repair recovery data is incomplete.");
    }
    const sourceArtifactRevision = current.repair.sourceArtifactRevision;
    const instruction = buildCreatorRepairInstruction({
      projectTitle: current.identity.projectTitle,
      description: current.request.description,
      sourceArtifactRevision,
      issueDigest: current.validation.issueDigest,
      issues: current.validation.issues,
    });
    assertInstructionBounded(instruction);

    let run: PrivateAlphaRunRecord;
    try {
      run = await bindExactInitialRun({
        projectId: current.identity.projectId,
        purpose: "repair",
        instruction,
      });
    } catch (error) {
      if (error instanceof CreatorRunBindingUnconfirmedError) {
        throw new CreatorServiceError(
          503,
          "run_binding_failed",
          "The separate repair run binding could not yet be confirmed; the explicit repair request remains recoverable."
        );
      }
      return failProject(current, {
        code: "run_binding_failed",
        message: "The separate repair run could not be bound; no execution occurred.",
        keyHash,
        mutationDigest,
        mutationKind,
        purpose: "repair",
      });
    }
    const boundAt = monotonicNow(current.updatedAt, run.createdAt);
    const binding = buildRunBinding({
      run,
      projectId: current.identity.projectId,
      purpose: "repair",
      instruction,
      sourceArtifactRevision,
      boundAt,
    });
    const awaiting = nextProject(current, {
      status: "awaiting_repair_approval",
      updates: {
        runBindings: [...current.runBindings, binding],
        approvalPacket: buildApprovalPacket(binding, current.plan?.planDigest ?? "", current.identity.projectId, boundAt),
      },
      events: [
        {
          eventType: "repair.run_bound",
          actor: "system",
          summary: "A separate exact local repair run now awaits its own manual approval.",
          sourceRunId: run.runId,
          artifactRevision: sourceArtifactRevision,
        },
      ],
      idempotencyKeyHash: keyHash,
      mutationDigest,
      idempotency: {
        idempotencyKeyHash: keyHash,
        mutationKind,
        mutationDigest,
      },
      minimumOccurredAt: boundAt,
    });
    return persistNext(current, awaiting);
  }

  async function cancelProject(
    initial: CreatorProjectState,
    keyHash: string,
    mutationDigest: string,
    mutationKind: CreatorMutationKind
  ): Promise<CreatorProjectState> {
    let current = initial;
    if (["generating", "repairing", "validating", "exported", "canceled"].includes(current.status)) {
      throw new CreatorServiceError(
        409,
        "invalid_transition",
        "Cancellation cannot claim to stop an in-flight or terminal provider operation."
      );
    }
    const requiresLatentSourceRunCancellation =
      (current.status === "draft" && current.approvalPacket === null) ||
      (current.status === "repair_requested" &&
        current.approvalPacket?.purpose !== "repair");
    const requiresSourceRunCancellation =
      requiresLatentSourceRunCancellation ||
      ([
        "awaiting_generation_approval",
        "approved",
        "awaiting_repair_approval",
        "repair_approved",
      ].includes(current.status) && current.approvalPacket !== null);
    if (
      requiresSourceRunCancellation &&
      !hasPendingAuditIntent(current, "cancellation.requested")
    ) {
      const cancellationIntent = nextProject(current, {
        events: [
          {
            eventType: "cancellation.requested",
            actor: "local-operator",
            summary: "Exact pre-execution creator cancellation was requested and is being reconciled.",
            sourceRunId: requiresLatentSourceRunCancellation
              ? null
              : current.approvalPacket?.privateAlphaRunId ?? null,
            artifactRevision: current.materializations.at(-1)?.artifactRevision ?? null,
          },
        ],
        idempotencyKeyHash: keyHash,
        mutationDigest,
      });
      current = await persistNext(current, cancellationIntent);
    }
    const events: CreatorEventSpec[] = [];
    let canceledRunBindings = current.runBindings;
    let canceledApprovalPacket = current.approvalPacket;
    if (
      requiresLatentSourceRunCancellation
    ) {
      const latent = await recoverLatentRunForCancellation(current);
      if (latent) {
        canceledRunBindings = [...current.runBindings, latent.binding];
        canceledApprovalPacket = latent.packet;
        events.push(...latent.events);
      }
    }
    if (
      ["awaiting_generation_approval", "approved", "awaiting_repair_approval", "repair_approved"].includes(current.status) &&
      current.approvalPacket
    ) {
      const cancellationBinding = current.runBindings.find(
        (candidate) =>
          candidate.sourceRunId === current.approvalPacket?.privateAlphaRunId &&
          candidate.purpose === current.approvalPacket.purpose
      );
      if (!cancellationBinding) {
        throw new CreatorServiceError(
          500,
          "record_corrupt",
          "Creator cancellation run binding is missing."
        );
      }
      const cancellationResult = await cancelExactBoundRun({
        runId: current.approvalPacket.privateAlphaRunId,
        binding: cancellationBinding,
        projectId: current.identity.projectId,
        purpose: cancellationBinding.purpose,
      });
      const canceledRun = cancellationResult.run;
      canceledRunBindings = replaceRunBinding(
        current,
        cancellationBinding.sourceRunId,
        (candidate) => ({
          ...candidate,
          sourceRunRevision: canceledRun.revision,
          approvalRecordedAt: cancellationResult.approvalRecordedAt,
        })
      );
      canceledApprovalPacket = {
        ...current.approvalPacket,
        privateAlphaRunRevision: canceledRun.revision,
        status: "canceled",
        approvedAt: cancellationResult.approvalRecordedAt,
      };
      if (cancellationResult.reconciledApproval) {
        events.push({
          eventType: "approval.recorded",
          actor: "local-operator",
          summary: "A previously completed manual approval was reconciled before exact pre-execution cancellation.",
          sourceRunId: canceledRun.runId,
        });
      }
    }
    if (current.preview.status === "active") {
      events.push({
        eventType: "preview.stopped",
        actor: "local-operator",
        summary: "The active preview was stopped as part of creator cancellation.",
        artifactRevision: current.preview.artifactRevision,
      });
    }
    events.push({
      eventType: "creator.canceled",
      actor: "local-operator",
      summary: "Creator work was canceled without claiming provider termination.",
      sourceRunId: canceledApprovalPacket?.privateAlphaRunId ?? null,
      artifactRevision: current.materializations.at(-1)?.artifactRevision ?? null,
    });
    const cancellationOccurredAt = monotonicNow(
      current.updatedAt,
      canceledRunBindings.at(-1)?.boundAt,
      canceledRunBindings.at(-1)?.approvalRecordedAt,
      canceledApprovalPacket?.approvedAt
    );
    const next = nextProject(current, {
      status: "canceled",
      updates: {
        approvalPacket: canceledApprovalPacket,
        runBindings: canceledRunBindings,
        preview:
          current.preview.status === "active"
            ? { ...current.preview, status: "stopped", stoppedAt: cancellationOccurredAt }
            : current.preview,
      },
      events,
      idempotencyKeyHash: keyHash,
      mutationDigest,
      idempotency: {
        idempotencyKeyHash: keyHash,
        mutationKind,
        mutationDigest,
      },
      minimumOccurredAt: cancellationOccurredAt,
    });
    return persistNext(current, next);
  }

  async function reconcilePendingMutation(
    current: CreatorProjectState
  ): Promise<CreatorProjectState> {
    const intent = findPendingMutationIntent(current);
    if (
      !intent ||
      intent.idempotencyKeyHash === null ||
      intent.mutationDigest === null
    ) {
      return current;
    }
    if (intent.eventType === "approval.requested") {
      const purpose: CreatorRunPurpose =
        current.status === "awaiting_repair_approval" ? "repair" : "generation";
      return approvePurpose(
        current,
        purpose,
        intent.idempotencyKeyHash,
        intent.mutationDigest,
        purpose === "repair" ? "approve-repair" : "approve-generation"
      );
    }
    if (intent.eventType === "execution.requested") {
      const repairRunId = current.runBindings.find(
        (binding) => binding.purpose === "repair"
      )?.sourceRunId;
      const purpose: CreatorRunPurpose =
        intent.sourceRunId === repairRunId ? "repair" : "generation";
      return executePurpose(
        current,
        purpose,
        intent.idempotencyKeyHash,
        intent.mutationDigest,
        purpose === "repair" ? "execute-repair" : "execute-generation"
      );
    }
    if (intent.eventType === "repair.requested") {
      return requestRepair(
        current,
        intent.idempotencyKeyHash,
        intent.mutationDigest,
        "request-repair"
      );
    }
    return cancelProject(
      current,
      intent.idempotencyKeyHash,
      intent.mutationDigest,
      "cancel"
    );
  }

  async function recoverProject(
    initial: CreatorProjectState,
    keyHash: string,
    mutationDigest: string
  ): Promise<CreatorProjectState> {
    let current = initial;
    let recoveryIntent = findPendingRecoveryIntent(current);
    if (!recoveryIntent) {
      const originalIntent = findPendingMutationIntent(current);
      if (!originalIntent) {
        throw new CreatorServiceError(
          409,
          "invalid_transition",
          "No interrupted creator mutation is available for explicit recovery."
        );
      }
      const requested = nextProject(current, {
        events: [
          {
            eventType: "recovery.requested",
            actor: "local-operator",
            summary:
              "Explicit recovery was requested for one exact persisted creator mutation.",
            sourceRunId: originalIntent.sourceRunId,
          },
        ],
        idempotencyKeyHash: keyHash,
        mutationDigest,
      });
      current = await persistNext(current, requested);
      recoveryIntent = findPendingRecoveryIntent(current);
    }
    if (
      !recoveryIntent ||
      recoveryIntent.idempotencyKeyHash !== keyHash ||
      recoveryIntent.mutationDigest !== mutationDigest
    ) {
      throw new CreatorServiceError(
        409,
        "idempotency_conflict",
        "Creator recovery ownership could not be confirmed."
      );
    }

    if (findPendingMutationIntent(current)) {
      current = await reconcilePendingMutation(current);
    }

    const recoveryEventIndex = current.auditEvents.findIndex(
      (event) => event.eventId === recoveryIntent?.eventId
    );
    const originalIntent = [...current.auditEvents.slice(0, recoveryEventIndex)]
      .reverse()
      .find(
        (event) =>
          [
            "approval.requested",
            "execution.requested",
            "repair.requested",
            "cancellation.requested",
          ].includes(event.eventType) &&
          event.sourceRunId === recoveryIntent?.sourceRunId
      );
    if (
      !originalIntent ||
      originalIntent.idempotencyKeyHash === null ||
      originalIntent.mutationDigest === null ||
      !current.idempotencyRecords.some(
        (record) =>
          record.idempotencyKeyHash === originalIntent.idempotencyKeyHash &&
          record.mutationDigest === originalIntent.mutationDigest
      )
    ) {
      throw new CreatorServiceError(
        503,
        "execution_blocked",
        "The original creator mutation has not reached a durable recoverable result."
      );
    }
    const completed = nextProject(current, {
      events: [
        {
          eventType: "recovery.completed",
          actor: "system",
          summary:
            "The explicit recovery completed from the exact persisted mutation without creating another attempt.",
          sourceRunId: recoveryIntent.sourceRunId,
        },
      ],
      idempotencyKeyHash: keyHash,
      mutationDigest,
      idempotency: {
        idempotencyKeyHash: keyHash,
        mutationKind: "recover",
        mutationDigest,
      },
    });
    return persistNext(current, completed);
  }

  return {
    async createProject(body, idempotencyKey) {
      const input = validateCreatorCreateProjectInput(body);
      const key = validateCreatorIdempotencyKey(idempotencyKey);
      const keyHash = hashCreatorSha256(key);
      const projectId = hashCreatorSha256(`creator-project:${key}`).slice(0, 24);
      const requestDigest = hashCreatorCanonicalJson(input);
      try {
        return await persistence.withProjectLock(projectId, async () => {
          let current = await persistence.readProjectIfPresent(projectId);
          if (current) {
            if (current.request.requestDigest !== requestDigest) {
              throw new CreatorServiceError(409, "idempotency_conflict", "Idempotency-Key conflicts with a different creator request.");
            }
            assertIdempotencyMutationConsistency(current, keyHash, requestDigest);
            assertDraftCreateContinuationAvailable(current);
            if (current.status !== "draft") {
              const record = findReplay(current, keyHash, requestDigest, "create");
              return {
                created: false,
                project: record
                  ? await persistence.readProjectRevision(
                      projectId,
                      record.resultingStateRevision
                    )
                  : current,
              };
            }
          } else {
            const createdAt = monotonicNow();
            const initial: CreatorProjectState = {
              recordVersion: CREATOR_RECORD_VERSION,
              stateRevision: 1,
              status: "draft",
              createdAt,
              updatedAt: createdAt,
              identity: {
                projectId,
                projectSlug: slugifyProjectTitle(input.projectTitle),
                projectTitle: input.projectTitle,
                creatorKind: "website-browser-app",
              },
              request: {
                requestId: makeId(12),
                creatorKind: "website-browser-app",
                projectTitle: input.projectTitle,
                description: input.description,
                requestDigest,
                createdAt,
              },
              plan: null,
              approvalPacket: null,
              runBindings: [],
              artifactProposal: null,
              artifactProposalBinding: null,
              validation: null,
              materializations: [],
              preview: {
                status: "inactive",
                previewId: null,
                artifactRevision: null,
                startedAt: null,
                stoppedAt: null,
              },
              repair: null,
              exportManifest: null,
              failureCode: null,
              failureMessage: null,
              auditEvents: [],
              idempotencyRecords: [],
            };
            const requestCreated: CreatorProjectState = {
              ...initial,
              auditEvents: [
                createEvent({
                  spec: {
                    eventType: "request.created",
                    actor: "local-operator",
                    summary: "A bounded static Website/Browser App v0 request was created.",
                  },
                  previousState: null,
                  resultingState: "draft",
                  stateRevision: 1,
                  occurredAt: createdAt,
                  idempotencyKeyHash: keyHash,
                  mutationDigest: requestDigest,
                }),
              ],
            };
            await persistence.writeInitialProject(requestCreated);
            current = requestCreated;
          }

          if (!current.plan) {
            const preparedAt = monotonicNow(current.updatedAt);
            const planBase = {
              planId: makeId(12),
              planVersion: 1 as const,
              project: current.identity,
              requestDigest,
              contractVersion: CREATOR_CONTRACT_VERSION,
              entrypoint: "index.html" as const,
              destinationBoundary: buildCreatorDestinationBoundary(projectId, 1),
              modelEnvelope: CREATOR_MODEL_ENVELOPE,
              filePolicy: CREATOR_FILE_POLICY,
              orderedSteps: CREATOR_ORDERED_PLAN_STEPS,
              capabilityStatement: CREATOR_CAPABILITY_STATEMENT,
              limitationStatement: CREATOR_LIMITATION_STATEMENT,
              preparedAt,
            };
            const plan = { ...planBase, planDigest: hashCreatorCanonicalJson(planBase) };
            const planned = nextProject(current, {
              updates: { plan },
              events: [
                {
                  eventType: "plan.prepared",
                  actor: "system",
                  summary: "The exact bounded creator plan and destination were prepared for review.",
                },
              ],
              idempotencyKeyHash: keyHash,
              mutationDigest: requestDigest,
              minimumOccurredAt: preparedAt,
            });
            current = await persistNext(current, planned);
          }

          const instruction = buildCreatorGenerationInstruction({
            projectTitle: current.identity.projectTitle,
            description: current.request.description,
          });
          assertInstructionBounded(instruction);
          let run: PrivateAlphaRunRecord;
          try {
            run = await bindExactInitialRun({ projectId, purpose: "generation", instruction });
          } catch (error) {
            if (error instanceof CreatorRunBindingUnconfirmedError) {
              throw new CreatorServiceError(
                503,
                "run_binding_failed",
                "The exact local run binding could not yet be confirmed; the prepared plan remains recoverable."
              );
            }
            const failed = nextProject(current, {
              status: "failed",
              updates: {
                failureCode: "run_binding_failed",
                failureMessage: "The exact local run could not be bound; no approval or execution occurred.",
              },
              events: [
                {
                  eventType: "failure.recorded",
                  actor: "system",
                  summary: "Creator run binding failed safely before approval.",
                },
              ],
              idempotencyKeyHash: keyHash,
              mutationDigest: requestDigest,
            });
            current = await persistNext(current, failed);
            return { created: true, project: current };
          }
          const boundAt = monotonicNow(current.updatedAt, run.createdAt);
          const binding = buildRunBinding({
            run,
            projectId: current.identity.projectId,
            purpose: "generation",
            instruction,
            sourceArtifactRevision: null,
            boundAt,
          });
          const awaiting = nextProject(current, {
            status: "awaiting_generation_approval",
            updates: {
              runBindings: [binding],
              approvalPacket: buildApprovalPacket(binding, current.plan?.planDigest ?? "", current.identity.projectId, boundAt),
            },
            events: [
              {
                eventType: "run.bound",
                actor: "system",
                summary: "One exact local generation run was bound and now awaits manual approval.",
                sourceRunId: run.runId,
              },
            ],
            idempotencyKeyHash: keyHash,
            mutationDigest: requestDigest,
            idempotency: {
              idempotencyKeyHash: keyHash,
              mutationKind: "create",
              mutationDigest: requestDigest,
            },
            minimumOccurredAt: boundAt,
          });
          current = await persistNext(current, awaiting);
          return { created: true, project: current };
        });
      } catch (error) {
        throw mapServiceError(error);
      }
    },
    async getProject(projectId) {
      try {
        return await persistence.readProject(projectId);
      } catch (error) {
        throw mapServiceError(error);
      }
    },
    async listProjects(limit) {
      try {
        return await persistence.listProjects(limit);
      } catch (error) {
        throw mapServiceError(error);
      }
    },
    async actOnProject(projectId, body, idempotencyKey) {
      const action = validateCreatorProjectActionInput(body);
      const key = validateCreatorIdempotencyKey(idempotencyKey);
      const keyHash = hashCreatorSha256(key);
      const mutationDigest = hashCreatorCanonicalJson({ projectId, ...action });
      try {
        return await persistence.withProjectLock(projectId, async () => {
          let current = await persistence.readProject(projectId);
          assertIdempotencyMutationConsistency(current, keyHash, mutationDigest);
          const replay = findReplay(current, keyHash, mutationDigest, action.action);
          if (replay) {
            return {
              replayed: true,
              project: await persistence.readProjectRevision(
                projectId,
                replay.resultingStateRevision
              ),
            };
          }
          const recoverableStates: CreatorProjectStatus[] =
            action.action === "approve-generation"
              ? ["awaiting_generation_approval"]
              : action.action === "approve-repair"
                ? ["awaiting_repair_approval"]
                : action.action === "execute-generation"
              ? ["generating", "validating"]
              : action.action === "execute-repair"
                ? ["repairing", "validating"]
                : action.action === "request-repair"
                  ? ["repair_requested"]
                  : action.action === "recover"
                    ? [...CREATOR_PROJECT_STATES]
                  : action.action === "cancel"
                    ? [
                        "draft",
                        "awaiting_generation_approval",
                        "approved",
                        "repair_requested",
                        "awaiting_repair_approval",
                        "repair_approved",
                      ]
                  : [];
          assertInProgressMutationOwnership(
            current,
            action.action,
            keyHash,
            mutationDigest
          );
          assertRevisionOrRecovery(
            current,
            action.expectedRevision,
            keyHash,
            mutationDigest,
            recoverableStates
          );
          reserveForAction(current, action.action, keyHash, mutationDigest);

          switch (action.action) {
            case "approve-generation":
              current = await approvePurpose(current, "generation", keyHash, mutationDigest, action.action);
              break;
            case "execute-generation":
              current = await executePurpose(current, "generation", keyHash, mutationDigest, action.action);
              break;
            case "request-repair":
              current = await requestRepair(current, keyHash, mutationDigest, action.action);
              break;
            case "approve-repair":
              current = await approvePurpose(current, "repair", keyHash, mutationDigest, action.action);
              break;
            case "execute-repair":
              current = await executePurpose(current, "repair", keyHash, mutationDigest, action.action);
              break;
            case "recover":
              current = await recoverProject(current, keyHash, mutationDigest);
              break;
            case "start-preview": {
              if (
                current.status !== "ready" ||
                !current.validation?.valid ||
                !current.exportManifest ||
                current.materializations.length < 1
              ) {
                throw new CreatorServiceError(409, "preview_blocked", "Preview requires a validated materialized revision.");
              }
              const killSwitch = await lifecycle.readKillSwitch();
              if (killSwitch.killSwitchEngaged) {
                throw new CreatorServiceError(503, "kill_switch_blocked", "The existing Private Alpha kill switch blocked preview activation.");
              }
              const artifactRevision = current.materializations.at(-1)?.artifactRevision ?? null;
              if (artifactRevision === null) {
                throw new CreatorServiceError(409, "preview_blocked", "Preview requires one exact materialized revision.");
              }
              const publication = await readCreatorMaterializationPublication({
                persistence,
                projectId,
                artifactRevision,
              });
              assertProjectPublicationBinding(current, publication, artifactRevision);
              const startedAt = monotonicNow(current.updatedAt);
              const next = nextProject(current, {
                status: "preview_available",
                updates: {
                  preview: {
                    status: "active",
                    previewId: makeId(16),
                    artifactRevision,
                    startedAt,
                    stoppedAt: null,
                  },
                },
                events: [
                  {
                    eventType: "preview.started",
                    actor: "local-operator",
                    summary: `Loopback-only sandbox preview started for artifact revision ${artifactRevision}.`,
                    artifactRevision,
                  },
                ],
                idempotencyKeyHash: keyHash,
                mutationDigest,
                idempotency: {
                  idempotencyKeyHash: keyHash,
                  mutationKind: action.action,
                  mutationDigest,
                },
                minimumOccurredAt: startedAt,
              });
              current = await persistNext(current, next);
              break;
            }
            case "stop-preview": {
              if (current.status !== "preview_available" || current.preview.status !== "active") {
                throw new CreatorServiceError(409, "preview_not_active", "No active creator preview is available to stop.");
              }
              const artifactRevision = current.preview.artifactRevision;
              const stoppedAt = monotonicNow(current.updatedAt);
              const next = nextProject(current, {
                status: "ready",
                updates: {
                  preview: {
                    ...current.preview,
                    status: "stopped",
                    stoppedAt,
                  },
                },
                events: [
                  {
                    eventType: "preview.stopped",
                    actor: "local-operator",
                    summary: "The sandbox preview was stopped immediately.",
                    artifactRevision,
                  },
                ],
                idempotencyKeyHash: keyHash,
                mutationDigest,
                idempotency: {
                  idempotencyKeyHash: keyHash,
                  mutationKind: action.action,
                  mutationDigest,
                },
                minimumOccurredAt: stoppedAt,
              });
              current = await persistNext(current, next);
              break;
            }
            case "export": {
              const recoveringPriorRevision =
                current.status === "failed" &&
                current.materializations.length > 0 &&
                current.exportManifest !== null;
              if ((current.status !== "ready" && !recoveringPriorRevision) || !current.exportManifest) {
                throw new CreatorServiceError(409, "export_unavailable", "Stop preview and use a ready revision before export.");
              }
              const publication = await readCreatorMaterializationPublication({
                persistence,
                projectId,
                artifactRevision: current.exportManifest.artifactRevision,
              });
              const persistedManifest = publication.manifest;
              assertProjectPublicationBinding(
                current,
                publication,
                current.exportManifest.artifactRevision
              );
              const next = nextProject(current, {
                status: "exported",
                events: [
                  {
                    eventType: "export.requested",
                    actor: "local-operator",
                    summary: recoveringPriorRevision
                      ? "The preserved prior valid revision is ready to copy after a failed repair or activation."
                      : "The deterministic manifest and individual static files are ready to copy or download.",
                    sourceRunId: persistedManifest.sourceRunId,
                    artifactRevision: persistedManifest.artifactRevision,
                  },
                ],
                idempotencyKeyHash: keyHash,
                mutationDigest,
                idempotency: {
                  idempotencyKeyHash: keyHash,
                  mutationKind: action.action,
                  mutationDigest,
                },
              });
              current = await persistNext(current, next);
              break;
            }
            case "cancel": {
              current = await cancelProject(
                current,
                keyHash,
                mutationDigest,
                action.action
              );
              break;
            }
          }
          return { replayed: false, project: current };
        });
      } catch (error) {
        throw mapServiceError(error);
      }
    },
    async readActivePreviewFile(input) {
      try {
        const before = await persistence.readProject(input.projectId);
        if (
          before.status !== "preview_available" ||
          before.preview.status !== "active" ||
          before.preview.previewId !== input.previewId ||
          before.preview.artifactRevision !== input.artifactRevision
        ) {
          throw new CreatorServiceError(404, "preview_not_active", "Creator preview is not active for this exact revision.");
        }
        const killSwitch = await lifecycle.readKillSwitch();
        if (killSwitch.killSwitchEngaged) {
          throw new CreatorServiceError(503, "kill_switch_blocked", "The existing Private Alpha kill switch disabled preview access.");
        }
        const publication = await readCreatorMaterializationPublication({
          persistence,
          projectId: input.projectId,
          artifactRevision: input.artifactRevision,
        });
        assertProjectPublicationBinding(before, publication, input.artifactRevision);
        const result = await readCreatorRevisionFile({
          persistence,
          projectId: input.projectId,
          artifactRevision: input.artifactRevision,
          filePath: input.filePath,
          expectedManifestDigest: before.exportManifest?.manifestDigest,
        });
        const after = await persistence.readProject(input.projectId);
        if (
          after.stateRevision !== before.stateRevision ||
          after.preview.status !== "active" ||
          after.preview.previewId !== input.previewId
        ) {
          throw new CreatorServiceError(404, "preview_not_active", "Creator preview stopped during the bounded read.");
        }
        return result;
      } catch (error) {
        throw mapServiceError(error);
      }
    },
    async readExportManifest(projectId, artifactRevision) {
      try {
        const project = await persistence.readProject(projectId);
        if (
          project.status !== "exported" ||
          project.exportManifest?.artifactRevision !== artifactRevision
        ) {
          throw new CreatorServiceError(404, "export_unavailable", "Creator export is unavailable for this revision.");
        }
        const publication = await readCreatorMaterializationPublication({
          persistence,
          projectId,
          artifactRevision,
        });
        assertProjectPublicationBinding(project, publication, artifactRevision);
        return publication.manifest;
      } catch (error) {
        throw mapServiceError(error);
      }
    },
    async readExportFile(input) {
      try {
        const project = await persistence.readProject(input.projectId);
        if (
          project.status !== "exported" ||
          project.exportManifest?.artifactRevision !== input.artifactRevision
        ) {
          throw new CreatorServiceError(404, "export_unavailable", "Creator export file is unavailable for this revision.");
        }
        const publication = await readCreatorMaterializationPublication({
          persistence,
          projectId: input.projectId,
          artifactRevision: input.artifactRevision,
        });
        assertProjectPublicationBinding(project, publication, input.artifactRevision);
        return await readCreatorRevisionFile({
          persistence,
          ...input,
          expectedManifestDigest: project.exportManifest.manifestDigest,
        });
      } catch (error) {
        throw mapServiceError(error);
      }
    },
  };
}
