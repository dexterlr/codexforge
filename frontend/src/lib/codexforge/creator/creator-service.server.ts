import "server-only";

import {
  PRIVATE_ALPHA_APPROVAL_BINDING_VERSION,
  PRIVATE_ALPHA_LOCAL_EXECUTION_APPROVAL_STATEMENT,
  PRIVATE_ALPHA_MAX_CREATOR_REQUEST_LENGTH,
  PRIVATE_ALPHA_RUN_OWNERSHIP_PROTOCOL_VERSION,
  containsPrivateAlphaSecretLikeContent,
  type PrivateAlphaRunRecord,
} from "@/lib/codexforge/private-alpha";
import {
  buildCreatorGenerationInstructionForResponseContract,
  buildLegacyCreatorRepairInstruction,
  buildCreatorRepairInstructionForResponseContract,
  buildCreatorRevisionInstructionForResponseContract,
  isValidCreatorProjectTitle,
  isSafeCreatorVisibleUnicode,
} from "./creator-contract.server";
import {
  hashCreatorCanonicalJson,
  hashCreatorSha256,
  makeCreatorHexId,
  serializeCreatorCanonicalJson,
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
  CREATOR_MAX_EXPLICIT_REVISIONS,
  CREATOR_MAX_IDEMPOTENCY_RECORDS,
  CREATOR_MAX_MATERIALIZATIONS,
  CREATOR_MAX_PROJECT_SLUG_LENGTH,
  CREATOR_MAX_PROJECT_TITLE_LENGTH,
  CREATOR_MAX_REVISION_BRIEF_LENGTH,
  CREATOR_MAX_RUN_BINDINGS,
  CREATOR_MODEL_ENVELOPE,
  CREATOR_ORDERED_PLAN_STEPS,
  buildCreatorDestinationBoundary,
} from "./creator-policy";
import {
  reprocessLegacyCreatorArtifactOutputWithServerOwnedTopology,
} from "./creator-document-topology.server";
import {
  assertCreatorTransition,
  CreatorTransitionError,
} from "./creator-state-machine";
import {
  CREATOR_CONTRACT_VERSION,
  CREATOR_PROJECT_STATES,
  CREATOR_RECORD_VERSION,
  CREATOR_TOPOLOGY_CANONICALIZER_VERSION,
  CREATOR_TOPOLOGY_REPAIR_OPERATIONS,
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
  type CreatorPrepareProjectPlanResult,
  type CreatorProjectActionInput,
  type CreatorProjectActionResult,
  type CreatorProjectSummary,
  type CreatorProjectState,
  type CreatorProjectStatus,
  type CreatorRequestRevisionActionInput,
  type CreatorRepairDocumentTopologyActionInput,
  type CreatorResponseContractVersion,
  type CreatorRevisionRequest,
  type CreatorRunOperationSlot,
  type CreatorRunPurpose,
  type CreatorTopologyRepair,
  type CreatorTopologyRepairEligibility,
} from "./creator-types";
import {
  buildCreatorValidationDigest,
  validateCreatorArtifactBundle,
  validateCreatorProviderOutput,
  validateCreatorServerOwnedProviderOutput,
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
  persistence: CreatorPersistence;
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
  const action = body.action;
  const revisionAction = action === "request-revision";
  const topologyRepairAction = action === "repair-document-topology";
  assertExactKeys(
    body,
    revisionAction
      ? ["action", "expectedRevision", "sourceArtifactRevision", "revisionBrief"]
      : topologyRepairAction
        ? [
            "action",
            "expectedRevision",
            "sourceRevision",
            "sourceRunId",
            "sourceOutputSha256",
          ]
      : ["action", "expectedRevision"]
  );
  if (
    action !== "approve-plan" &&
    action !== "approve-generation" &&
    action !== "execute-generation" &&
    action !== "request-revision" &&
    action !== "approve-revision-plan" &&
    action !== "approve-revision-generation" &&
    action !== "execute-revision-generation" &&
    action !== "stop-generation" &&
    action !== "cancel" &&
    action !== "request-repair" &&
    action !== "approve-repair" &&
    action !== "execute-repair" &&
    action !== "repair-document-topology" &&
    action !== "recover" &&
    action !== "start-preview" &&
    action !== "stop-preview" &&
    action !== "restore-prior-publication" &&
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
  if (action === "request-revision") {
    if (
      typeof body.sourceArtifactRevision !== "number" ||
      !Number.isSafeInteger(body.sourceArtifactRevision) ||
      body.sourceArtifactRevision < 1
    ) {
      throw new CreatorServiceError(
        422,
        "invalid_request",
        "sourceArtifactRevision must be a positive integer."
      );
    }
    const revisionBrief = normalizeBoundedText(
      body.revisionBrief,
      "revisionBrief",
      CREATOR_MAX_REVISION_BRIEF_LENGTH
    );
    if (!isSafeCreatorVisibleUnicode(revisionBrief)) {
      throw new CreatorServiceError(
        422,
        "invalid_request",
        "revisionBrief must use safe, meaningful Unicode text."
      );
    }
    if (containsPrivateAlphaSecretLikeContent(revisionBrief)) {
      throw new CreatorServiceError(
        422,
        "invalid_request",
        "Remove credentials, tokens, passwords, and secret-like values from revisionBrief."
      );
    }
    return {
      action,
      expectedRevision: body.expectedRevision,
      sourceArtifactRevision: body.sourceArtifactRevision,
      revisionBrief,
    };
  }
  if (action === "repair-document-topology") {
    if (
      typeof body.sourceRevision !== "number" ||
      !Number.isSafeInteger(body.sourceRevision) ||
      body.sourceRevision < 1 ||
      typeof body.sourceRunId !== "string" ||
      !/^[a-f0-9]{24}$/.test(body.sourceRunId) ||
      typeof body.sourceOutputSha256 !== "string" ||
      !/^[a-f0-9]{64}$/.test(body.sourceOutputSha256)
    ) {
      throw new CreatorServiceError(
        422,
        "invalid_request",
        "Document-topology repair requires one exact source revision, source run, and retained-output digest."
      );
    }
    return {
      action,
      expectedRevision: body.expectedRevision,
      sourceRevision: body.sourceRevision,
      sourceRunId: body.sourceRunId,
      sourceOutputSha256: body.sourceOutputSha256,
    };
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
  if (!instruction || instruction.length > PRIVATE_ALPHA_MAX_CREATOR_REQUEST_LENGTH) {
    throw new CreatorServiceError(
      422,
      "run_binding_failed",
      "Creator instruction envelope exceeds the established local-run request bound."
    );
  }
}

type ExactCreatorSourceSnapshot = Readonly<{
  json: string;
  digest: string;
  byteLength: number;
  publication: CreatorMaterializationPublication;
}>;

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
  purpose: CreatorRunPurpose,
  operationSlot: CreatorRunOperationSlot
): void {
    const expectedIdempotencyKeyHashes = new Set([
      buildCreatorRunIdempotencyKeyHash(
        projectId,
        purpose,
        operationSlot
      ),
      buildLegacyCreatorRunIdempotencyKeyHash(
        projectId,
        purpose,
        operationSlot
      ),
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
  assertExpectedRunIdentity(run, projectId, purpose, binding.operationSlot);
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
  purpose: CreatorRunPurpose,
  operationSlot: CreatorRunOperationSlot
): void {
  assertExpectedRunIdentity(run, projectId, purpose, operationSlot);
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
  assertExpectedRunIdentity(run, projectId, purpose, binding.operationSlot);
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
  assertExpectedRunIdentity(
    result.run,
    projectId,
    purpose,
    binding.operationSlot
  );
  assertBoundLifecycleRun(result.run, binding);
  const approval = result.run.approval;
  const execution = result.run.execution;
  const currentExecutionIdempotencyKeyHash =
    buildCreatorExecutionIdempotencyKeyHash(
      projectId,
      purpose,
      executionIntentIdempotencyKeyHash,
      binding.operationSlot
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
  prepareProjectPlan: (
    body: unknown,
    idempotencyKey: string | null | undefined
  ) => Promise<CreatorPrepareProjectPlanResult>;
  getProject: (projectId: string) => Promise<CreatorProjectState>;
  getProjectRevision: (
    projectId: string,
    stateRevision: number
  ) => Promise<CreatorProjectState>;
  getTopologyRepairEligibility: (
    projectId: string
  ) => Promise<CreatorTopologyRepairEligibility>;
  listProjects: (limit?: number) => Promise<readonly CreatorProjectState[]>;
  listProjectSummaries: (
    limit?: number
  ) => Promise<readonly CreatorProjectSummary[]>;
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

export function createCreatorService(options: CreatorServiceOptions): CreatorService {
  const persistence = options.persistence;
  const lifecycle = options.lifecycle ?? createCreatorGenerationLifecycleAdapter();
  const now = options.now ?? (() => new Date().toISOString());
  const makeId = options.makeId ?? makeCreatorHexId;

  async function readExactSourceSnapshot(
    project: CreatorProjectState,
    artifactRevision: number
  ): Promise<ExactCreatorSourceSnapshot> {
    const publication = await readCreatorMaterializationPublication({
      persistence,
      projectId: project.identity.projectId,
      artifactRevision,
    });
    const files = [] as Array<{
      path: string;
      mediaType: string;
      content: string;
    }>;
    for (const file of publication.manifest.files) {
      const exact = await readCreatorRevisionFile({
        persistence,
        projectId: project.identity.projectId,
        artifactRevision,
        filePath: file.path,
        expectedManifestDigest: publication.manifest.manifestDigest,
      });
      const content = exact.bytes.toString("utf8");
      if (!Buffer.from(content, "utf8").equals(exact.bytes)) {
        throw new CreatorServiceError(
          422,
          "materialization_blocked",
          "The exact published source cannot be represented safely in the local revision envelope."
        );
      }
      files.push({ path: file.path, mediaType: file.mediaType, content });
    }
    const json = serializeCreatorCanonicalJson({
      snapshotVersion: "codexforge.creator.source-snapshot.v1",
      contractVersion: CREATOR_CONTRACT_VERSION,
      projectTitle: project.identity.projectTitle,
      creatorKind: project.identity.creatorKind,
      entrypoint: "index.html",
      files,
    });
    return {
      json,
      digest: hashCreatorSha256(json),
      byteLength: Buffer.byteLength(json, "utf8"),
      publication,
    };
  }

  function assertExactSourceSnapshotBinding(input: {
    snapshot: ExactCreatorSourceSnapshot;
    digest: string;
    byteLength: number;
    manifestDigest: string;
    aggregateDigest: string;
    validationDigest: string;
  }): void {
    if (
      input.snapshot.digest !== input.digest ||
      input.snapshot.byteLength !== input.byteLength ||
      input.snapshot.publication.manifest.manifestDigest !== input.manifestDigest ||
      input.snapshot.publication.materialization.aggregateDigest !==
        input.aggregateDigest ||
      input.snapshot.publication.materialization.validationDigest !==
        input.validationDigest
    ) {
      throw new CreatorServiceError(
        409,
        "revision_conflict",
        "The exact published source no longer matches the reviewed revision plan."
      );
    }
  }

  function monotonicNow(...floors: readonly (string | null | undefined)[]): string {
    return floors.reduce<string>(
      (latest, floor) => (floor && floor > latest ? floor : latest),
      now()
    );
  }

  function strictlyAfter(
    ...floors: readonly (string | null | undefined)[]
  ): string {
    const floor = floors.reduce<string | null>(
      (latest, value) => (!value || (latest && latest >= value) ? latest : value),
      null
    );
    const candidate = now();
    if (!floor || candidate > floor) return candidate;
    return new Date(Date.parse(floor) + 1).toISOString();
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
      occurredAt?: string;
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
    const occurredAt = input.occurredAt ??
      monotonicNow(current.updatedAt, input.minimumOccurredAt);
    if (
      occurredAt < current.updatedAt ||
      (input.minimumOccurredAt !== undefined &&
        input.minimumOccurredAt !== null &&
        occurredAt < input.minimumOccurredAt)
    ) {
      throw new CreatorServiceError(
        500,
        "record_corrupt",
        "Creator audit time cannot move before the current durable state."
      );
    }
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

  function buildProjectSummary(
    project: CreatorProjectState
  ): CreatorProjectSummary {
    const latestMaterialization = project.materializations.at(-1) ?? null;
    const latestManifest =
      project.exportManifest?.artifactRevision ===
      latestMaterialization?.artifactRevision
        ? project.exportManifest
        : null;
    return {
      projectId: project.identity.projectId,
      projectTitle: project.identity.projectTitle,
      creatorKind: project.identity.creatorKind,
      status: project.status,
      stateRevision: project.stateRevision,
      latestArtifactRevision: latestMaterialization?.artifactRevision ?? null,
      latestManifestDigest: latestManifest?.manifestDigest ?? null,
      latestAggregateDigest: latestMaterialization?.aggregateDigest ?? null,
      latestValidationDigest: latestMaterialization?.validationDigest ?? null,
      sourceRunBindingsDigest: hashCreatorCanonicalJson(project.runBindings),
      sourceRunBindingCount: project.runBindings.length,
      explicitRevisionCount: project.revisionRequests.length,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
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
    eventType: CreatorAuditEvent["eventType"],
    keyHash: string,
    mutationDigest: string,
    sourceRunId: string | null
  ): boolean {
    return project.auditEvents.some(
      (event) =>
        event.eventType === eventType &&
        event.resultingState === project.status &&
        event.idempotencyKeyHash === keyHash &&
        event.mutationDigest === mutationDigest &&
        event.sourceRunId === sourceRunId
    );
  }

  function reserveForAction(
    project: CreatorProjectState,
    action: CreatorMutationKind,
    keyHash: string,
    mutationDigest: string
  ): void {
    switch (action) {
      case "approve-plan":
        assertMutationCapacity(
          project,
          hasPendingAuditIntent(
            project,
            "plan.approval_requested",
            keyHash,
            mutationDigest,
            null
          ) ? 2 : 3,
          1
        );
        return;
      case "approve-revision-plan":
        assertMutationCapacity(
          project,
          project.revisionRequests.at(-1)?.planApprovedAt === null ? 3 : 2,
          1
        );
        return;
      case "approve-generation":
      case "approve-revision-generation":
        {
          const sourceRunId = project.approvalPacket?.privateAlphaRunId ?? null;
          const approvalPending = hasPendingAuditIntent(
            project,
            "approval.requested",
            keyHash,
            mutationDigest,
            sourceRunId
          );
        assertMutationCapacity(
          project,
            approvalPending ? 19 : 22,
            approvalPending ? 8 : 9
        );
        }
        return;
      case "approve-repair":
        {
          const sourceRunId = project.approvalPacket?.privateAlphaRunId ?? null;
          const approvalPending = hasPendingAuditIntent(
            project,
            "approval.requested",
            keyHash,
            mutationDigest,
            sourceRunId
          );
        assertMutationCapacity(
          project,
            approvalPending ? 10 : 13,
            approvalPending ? 5 : 6
        );
        }
        return;
      case "stop-preview":
        assertMutationCapacity(project, 2, 2);
        return;
      case "export":
        assertMutationCapacity(project, 1, 1);
        return;
      case "execute-generation":
      case "execute-revision-generation":
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
      case "request-revision":
        assertMutationCapacity(project, 1, 1);
        return;
      case "stop-generation":
        assertMutationCapacity(project, 2, 1);
        return;
      case "execute-repair":
        assertMutationCapacity(
          project,
          project.status === "repair_approved" ? 11 : project.status === "repairing" ? 8 : 6,
          project.status === "repair_approved" ? 5 : 4
        );
        return;
      case "repair-document-topology":
        assertMutationCapacity(
          project,
          hasPendingAuditIntent(
            project,
            "topology.repair_requested",
            keyHash,
            mutationDigest,
            project.topologyRepair?.sourceRunId ?? null
          )
            ? 3
            : 6,
          1
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
      case "restore-prior-publication":
        assertMutationCapacity(project, 1, 1);
        return;
      case "cancel":
        if (project.status === "draft" || project.status === "repair_requested") {
          const cancellationPending = hasPendingAuditIntent(
            project,
            "cancellation.requested",
            keyHash,
            mutationDigest,
            null
          );
          assertMutationCapacity(
            project,
            cancellationPending ? 3 : 6,
            cancellationPending ? 1 : 2
          );
        } else if (
          project.status === "awaiting_generation_approval" ||
          project.status === "awaiting_revision_generation_approval" ||
          project.status === "awaiting_repair_approval"
        ) {
          const cancellationPending = hasPendingAuditIntent(
            project,
            "cancellation.requested",
            keyHash,
            mutationDigest,
            project.approvalPacket?.privateAlphaRunId ?? null
          );
          assertMutationCapacity(
            project,
            cancellationPending ? 2 : 5,
            cancellationPending ? 1 : 2
          );
        } else if (
          project.status === "approved" ||
          project.status === "revision_generation_approved" ||
          project.status === "repair_approved"
        ) {
          const cancellationPending = hasPendingAuditIntent(
            project,
            "cancellation.requested",
            keyHash,
            mutationDigest,
            project.approvalPacket?.privateAlphaRunId ?? null
          );
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
    mutationKind: CreatorMutationKind | "create" | "prepare-plan"
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
              "plan.approval_requested",
              "approval.requested",
              "execution.requested",
              "repair.requested",
              "topology.repair_requested",
              "revision.plan_approval_requested",
              "cancellation.requested",
            ].includes(event.eventType) &&
            ((event.eventType === "plan.approval_requested" &&
              project.status === "awaiting_plan_approval") ||
              (event.eventType === "revision.plan_approval_requested" &&
                project.status === "awaiting_revision_plan_approval") ||
              (event.eventType === "approval.requested" &&
              [
                "awaiting_generation_approval",
                "awaiting_repair_approval",
                "awaiting_revision_generation_approval",
              ].includes(project.status)) ||
              (event.eventType === "execution.requested" &&
                ["generating", "repairing", "revising", "validating", "stopping"].includes(project.status)) ||
              (event.eventType === "repair.requested" && project.status === "repair_requested") ||
              (event.eventType === "topology.repair_requested" &&
                project.status === "validating" &&
                project.topologyRepair?.status === "pending") ||
              (event.eventType === "cancellation.requested" &&
                [
                  "draft",
                  "awaiting_plan_approval",
                  "awaiting_generation_approval",
                  "approved",
                  "awaiting_revision_plan_approval",
                  "awaiting_revision_generation_approval",
                  "revision_generation_approved",
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
    if (pendingIntent.eventType === "plan.approval_requested") {
      return "approve-plan";
    }
    if (pendingIntent.eventType === "revision.plan_approval_requested") {
      return "approve-revision-plan";
    }
    if (pendingIntent.eventType === "approval.requested") {
      const purpose = project.runBindings.find(
        (binding) => binding.sourceRunId === pendingIntent.sourceRunId
      )?.purpose;
      return purpose === "repair"
        ? "approve-repair"
        : purpose === "revision"
          ? "approve-revision-generation"
          : "approve-generation";
    }
    if (pendingIntent.eventType === "execution.requested") {
      const purpose = project.runBindings.find(
        (binding) => binding.sourceRunId === pendingIntent.sourceRunId
      )?.purpose;
      return purpose === "repair"
        ? "execute-repair"
        : purpose === "revision"
          ? "execute-revision-generation"
          : "execute-generation";
    }
    if (pendingIntent.eventType === "topology.repair_requested") {
      return "repair-document-topology";
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
      [
        "plan.approval_requested",
        "approval.requested",
        "repair.requested",
        "revision.plan_approval_requested",
      ].includes(
        pendingIntent.eventType
      );
    const stopMaySupersedeExecutionIntent =
      action === "stop-generation" &&
      pendingIntent.eventType === "execution.requested" &&
      ["generating", "revising", "repairing"].includes(project.status);
    if (
      !cancellationMaySupersedePreExecutionIntent &&
      !stopMaySupersedeExecutionIntent &&
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
    operationSlot: CreatorRunOperationSlot;
    instruction: string;
    responseContractVersion: CreatorResponseContractVersion;
    sourceArtifactRevision: number | null;
    boundAt: string;
  }): CreatorGenerationRunBinding {
    assertExpectedRunIdentity(
      input.run,
      input.projectId,
      input.purpose,
      input.operationSlot
    );
    assertExactRunBinding(input.run);
    return {
      purpose: input.purpose,
      operationSlot: input.operationSlot,
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
      responseContractVersion: input.responseContractVersion,
      documentTopology: null,
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
    operationSlot: CreatorRunOperationSlot;
    instruction: string;
  }): Promise<PrivateAlphaRunRecord> {
    try {
      const run = await lifecycle.bindRun(input);
      assertBoundInitialRun(
        run,
        input.projectId,
        input.purpose,
        input.operationSlot
      );
      return run;
    } catch {
      // A transport or validation failure after run creation is non-conclusive until exact recovery.
    }
    try {
      const recovered = await lifecycle.recoverBoundRun(input);
      if (recovered) {
        assertBoundInitialRun(
          recovered,
          input.projectId,
          input.purpose,
          input.operationSlot
        );
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
        operationSlot: input.binding.operationSlot,
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
          operationSlot: input.binding.operationSlot,
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
      instruction = buildCreatorGenerationInstructionForResponseContract({
        responseContractVersion:
          project.initialProviderResponseContractVersion,
        projectTitle: project.identity.projectTitle,
        description: project.request.description,
      });
      sourceArtifactRevision = null;
    } else if (project.status === "repair_requested" && project.repair && project.validation) {
      purpose = "repair";
      sourceArtifactRevision = project.repair.sourceArtifactRevision;
      if (project.repair.instructionVersion === "legacy-v1") {
        instruction = buildLegacyCreatorRepairInstruction({
          projectTitle: project.identity.projectTitle,
          description: project.request.description,
          sourceArtifactRevision,
          issueDigest: project.validation.issueDigest,
          issues: project.validation.issues,
        });
      } else {
        const sourceSnapshot = sourceArtifactRevision === null
          ? null
          : await readExactSourceSnapshot(project, sourceArtifactRevision);
        const linkedRevision = project.repair.linkedRevisionRequestId === null
          ? null
          : project.revisionRequests.find(
              (request) => request.requestId === project.repair?.linkedRevisionRequestId
            ) ?? null;
        instruction = buildCreatorRepairInstructionForResponseContract({
          responseContractVersion: project.repair.responseContractVersion,
          projectTitle: project.identity.projectTitle,
          description: project.request.description,
          sourceArtifactRevision,
          sourceSnapshotJson: sourceSnapshot?.json ?? null,
          linkedRevisionBrief: linkedRevision?.revisionBrief ?? null,
          issueDigest: project.validation.issueDigest,
          issues: project.validation.issues,
        });
      }
      if (hashCreatorSha256(instruction) !== project.repair.repairContextDigest) {
        throw new CreatorServiceError(
          409,
          "revision_conflict",
          "The exact local repair instruction no longer matches the persisted repair request."
        );
      }
    } else {
      return null;
    }
    assertInstructionBounded(instruction);
    const run = await lifecycle.recoverBoundRun({
      projectId: project.identity.projectId,
      purpose,
      operationSlot: purpose === "generation" ? "generation-initial" : "repair-1",
      instruction,
    });
    if (!run) return null;
    const reconciledBoundAt = monotonicNow(project.updatedAt, run.createdAt);
    const initialBinding = {
      ...buildRunBinding({
        run,
        projectId: project.identity.projectId,
        purpose,
        operationSlot: purpose === "generation" ? "generation-initial" : "repair-1",
        instruction,
        responseContractVersion:
          purpose === "generation"
            ? project.initialProviderResponseContractVersion
            : project.repair?.responseContractVersion ?? "legacy-bundle-v1",
        sourceArtifactRevision,
        boundAt: reconciledBoundAt,
      }),
      sourceRunRevision: 1,
    };
    if (run.state === "awaiting_approval") {
      assertBoundInitialRun(
        run,
        project.identity.projectId,
        purpose,
        purpose === "generation" ? "generation-initial" : "repair-1"
      );
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

  async function approveInitialPlan(
    initial: CreatorProjectState,
    keyHash: string,
    mutationDigest: string
  ): Promise<CreatorProjectState> {
    let current = initial;
    if (
      current.status !== "awaiting_plan_approval" ||
      !current.plan ||
      current.approvalPacket !== null ||
      current.runBindings.length !== 0
    ) {
      throw new CreatorServiceError(
        409,
        "invalid_transition",
        "The visible creator plan is not awaiting approval."
      );
    }
    const approvedPlan = current.plan;
    if (!hasPendingAuditIntent(
      current,
      "plan.approval_requested",
      keyHash,
      mutationDigest,
      null
    )) {
      const requested = nextProject(current, {
        events: [
          {
            eventType: "plan.approval_requested",
            actor: "local-operator",
            summary:
              "The visible creator plan was explicitly approved for exact local run binding; generation remains separately gated.",
          },
        ],
        idempotencyKeyHash: keyHash,
        mutationDigest,
      });
      current = await persistNext(current, requested);
    }
    const instruction = buildCreatorGenerationInstructionForResponseContract({
      responseContractVersion: current.initialProviderResponseContractVersion,
      projectTitle: current.identity.projectTitle,
      description: current.request.description,
    });
    assertInstructionBounded(instruction);
    let run: PrivateAlphaRunRecord;
    try {
      run = await bindExactInitialRun({
        projectId: current.identity.projectId,
        purpose: "generation",
        operationSlot: "generation-initial",
        instruction,
      });
    } catch (error) {
      if (error instanceof CreatorRunBindingUnconfirmedError) {
        throw new CreatorServiceError(
          503,
          "run_binding_failed",
          "The exact generation run binding is not yet confirmed; retry only this same plan approval."
        );
      }
      throw error;
    }
    const boundAt = strictlyAfter(current.updatedAt, run.createdAt);
    const binding = buildRunBinding({
      run,
      projectId: current.identity.projectId,
      purpose: "generation",
      operationSlot: "generation-initial",
      instruction,
      responseContractVersion: current.initialProviderResponseContractVersion,
      sourceArtifactRevision: null,
      boundAt,
    });
    const awaiting = nextProject(current, {
      status: "awaiting_generation_approval",
      updates: {
        runBindings: [binding],
        approvalPacket: buildApprovalPacket(
          binding,
          approvedPlan.planDigest,
          current.identity.projectId,
          boundAt
        ),
      },
      events: [
        {
          eventType: "run.bound",
          actor: "system",
          summary:
            "One exact local generation run was bound after plan approval and now awaits generation approval.",
          sourceRunId: run.runId,
        },
        {
          eventType: "plan.approved",
          actor: "local-operator",
          summary:
            "The immutable creator plan approval was recorded against the exact bound run.",
          sourceRunId: run.runId,
        },
      ],
      idempotencyKeyHash: keyHash,
      mutationDigest,
      idempotency: {
        idempotencyKeyHash: keyHash,
        mutationKind: "approve-plan",
        mutationDigest,
      },
      minimumOccurredAt: boundAt,
    });
    return persistNext(current, awaiting);
  }

  async function requestExplicitRevision(
    current: CreatorProjectState,
    action: CreatorRequestRevisionActionInput,
    keyHash: string,
    mutationDigest: string
  ): Promise<CreatorProjectState> {
    const source = current.materializations.at(-1) ?? null;
    const manifest = current.exportManifest;
    if (
      current.status !== "ready" ||
      !source ||
      !manifest ||
      source.artifactRevision !== action.sourceArtifactRevision ||
      manifest.artifactRevision !== action.sourceArtifactRevision
    ) {
      throw new CreatorServiceError(
        409,
        "revision_conflict",
        "The revision source must be the exact latest published artifact."
      );
    }
    if (current.revisionRequests.length >= CREATOR_MAX_EXPLICIT_REVISIONS) {
      throw new CreatorServiceError(
        409,
        "repair_limit_reached",
        "Website/Browser App v0 permits at most two explicit revisions."
      );
    }
    const revisionNumber = (current.revisionRequests.length + 1) as 1 | 2;
    const targetArtifactRevision = action.sourceArtifactRevision + 1;
    if (
      targetArtifactRevision > CREATOR_MAX_MATERIALIZATIONS ||
      current.runBindings.length >= CREATOR_MAX_RUN_BINDINGS
    ) {
      throw new CreatorServiceError(
        409,
        "materialization_blocked",
        "The bounded creator materialization or run-binding capacity is exhausted."
      );
    }
    const sourceSnapshot = await readExactSourceSnapshot(
      current,
      action.sourceArtifactRevision
    );
    assertExactSourceSnapshotBinding({
      snapshot: sourceSnapshot,
      digest: sourceSnapshot.digest,
      byteLength: sourceSnapshot.byteLength,
      manifestDigest: manifest.manifestDigest,
      aggregateDigest: source.aggregateDigest,
      validationDigest: source.validationDigest,
    });
    const instruction = buildCreatorRevisionInstructionForResponseContract({
      responseContractVersion: "server-owned-page-v1",
      projectTitle: current.identity.projectTitle,
      originalDescription: current.request.description,
      sourceArtifactRevision: action.sourceArtifactRevision,
      sourceManifestDigest: manifest.manifestDigest,
      sourceAggregateDigest: source.aggregateDigest,
      sourceValidationDigest: source.validationDigest,
      sourceSnapshotJson: sourceSnapshot.json,
      revisionBrief: action.revisionBrief,
    });
    assertInstructionBounded(instruction);
    const requestedAt = strictlyAfter(current.updatedAt);
    const requestId = makeId(12);
    const revisionBriefDigest = hashCreatorSha256(action.revisionBrief);
    const destinationBoundary = buildCreatorDestinationBoundary(
      current.identity.projectId,
      targetArtifactRevision
    );
    const immutablePlanBase = {
      instructionVersion: "source-snapshot-v1" as const,
      responseContractVersion: "server-owned-page-v1" as const,
      requestId,
      revisionNumber,
      sourceArtifactRevision: action.sourceArtifactRevision,
      targetArtifactRevision,
      sourceManifestDigest: manifest.manifestDigest,
      sourceAggregateDigest: source.aggregateDigest,
      sourceValidationDigest: source.validationDigest,
      sourceSnapshotDigest: sourceSnapshot.digest,
      sourceSnapshotBytes: sourceSnapshot.byteLength,
      instructionDigest: hashCreatorSha256(instruction),
      revisionBrief: action.revisionBrief,
      revisionBriefDigest,
      destinationBoundary,
      contractVersion: CREATOR_CONTRACT_VERSION,
      entrypoint: "index.html" as const,
      modelEnvelope: CREATOR_MODEL_ENVELOPE,
      filePolicy: CREATOR_FILE_POLICY,
      orderedSteps: CREATOR_ORDERED_PLAN_STEPS,
      capabilityStatement: CREATOR_CAPABILITY_STATEMENT,
      limitationStatement: CREATOR_LIMITATION_STATEMENT,
      requestedAt,
    };
    const revisionRequest: CreatorRevisionRequest = {
      instructionVersion: "source-snapshot-v1",
      responseContractVersion: "server-owned-page-v1",
      requestId,
      revisionNumber,
      sourceArtifactRevision: action.sourceArtifactRevision,
      targetArtifactRevision,
      sourceManifestDigest: manifest.manifestDigest,
      sourceAggregateDigest: source.aggregateDigest,
      sourceValidationDigest: source.validationDigest,
      sourceSnapshotDigest: sourceSnapshot.digest,
      sourceSnapshotBytes: sourceSnapshot.byteLength,
      instructionDigest: hashCreatorSha256(instruction),
      revisionBrief: action.revisionBrief,
      revisionBriefDigest,
      destinationBoundary,
      planDigest: hashCreatorCanonicalJson(immutablePlanBase),
      requestedAt,
      planApprovedAt: null,
      runBoundAt: null,
      generationApprovedAt: null,
      executionRequestedAt: null,
      rejectedAt: null,
      completionPurpose: null,
      completionSourceRunId: null,
      completedAt: null,
    };
    const requested = nextProject(current, {
      status: "awaiting_revision_plan_approval",
      updates: {
        approvalPacket: null,
        revisionRequests: [...current.revisionRequests, revisionRequest],
      },
      events: [
        {
          eventType: "revision.requested",
          actor: "local-operator",
          summary: `Explicit revision ${revisionNumber} received one immutable complete-replacement plan; no provider run was created.`,
          artifactRevision: action.sourceArtifactRevision,
        },
      ],
      idempotencyKeyHash: keyHash,
      mutationDigest,
      idempotency: {
        idempotencyKeyHash: keyHash,
        mutationKind: "request-revision",
        mutationDigest,
      },
      minimumOccurredAt: requestedAt,
    });
    return persistNext(current, requested);
  }

  async function approveExplicitRevisionPlan(
    initial: CreatorProjectState,
    keyHash: string,
    mutationDigest: string
  ): Promise<CreatorProjectState> {
    let current = initial;
    let request = current.revisionRequests.at(-1) ?? null;
    if (
      current.status !== "awaiting_revision_plan_approval" ||
      !request ||
      request.runBoundAt !== null ||
      current.approvalPacket !== null
    ) {
      throw new CreatorServiceError(
        409,
        "invalid_transition",
        "No immutable explicit-revision plan is awaiting approval."
      );
    }
    if (request.planApprovedAt === null) {
      const planApprovedAt = strictlyAfter(current.updatedAt, request.requestedAt);
      const intent = nextProject(current, {
        updates: {
          revisionRequests: current.revisionRequests.map((candidate) =>
            candidate.requestId === request?.requestId
              ? { ...candidate, planApprovedAt }
              : candidate
          ),
        },
        events: [
          {
            eventType: "revision.plan_approval_requested",
            actor: "local-operator",
            summary:
              "The immutable complete-replacement revision plan was explicitly approved for exact local run binding.",
            artifactRevision: request.sourceArtifactRevision,
          },
        ],
        idempotencyKeyHash: keyHash,
        mutationDigest,
        minimumOccurredAt: planApprovedAt,
      });
      current = await persistNext(current, intent);
      request = current.revisionRequests.at(-1) ?? null;
    }
    if (!request?.planApprovedAt) {
      throw new CreatorServiceError(
        500,
        "record_corrupt",
        "The revision plan approval milestone is missing."
      );
    }
    const sourceSnapshot = await readExactSourceSnapshot(
      current,
      request.sourceArtifactRevision
    );
    assertExactSourceSnapshotBinding({
      snapshot: sourceSnapshot,
      digest: request.sourceSnapshotDigest,
      byteLength: request.sourceSnapshotBytes,
      manifestDigest: request.sourceManifestDigest,
      aggregateDigest: request.sourceAggregateDigest,
      validationDigest: request.sourceValidationDigest,
    });
    const instruction = buildCreatorRevisionInstructionForResponseContract({
      responseContractVersion: request.responseContractVersion,
      projectTitle: current.identity.projectTitle,
      originalDescription: current.request.description,
      sourceArtifactRevision: request.sourceArtifactRevision,
      sourceManifestDigest: request.sourceManifestDigest,
      sourceAggregateDigest: request.sourceAggregateDigest,
      sourceValidationDigest: request.sourceValidationDigest,
      sourceSnapshotJson: sourceSnapshot.json,
      revisionBrief: request.revisionBrief,
    });
    assertInstructionBounded(instruction);
    if (hashCreatorSha256(instruction) !== request.instructionDigest) {
      throw new CreatorServiceError(
        409,
        "revision_conflict",
        "The exact local revision instruction no longer matches the approved plan."
      );
    }
    const operationSlot = `revision-${request.revisionNumber}` as CreatorRunOperationSlot;
    let run: PrivateAlphaRunRecord;
    try {
      run = await bindExactInitialRun({
        projectId: current.identity.projectId,
        purpose: "revision",
        operationSlot,
        instruction,
      });
    } catch (error) {
      if (error instanceof CreatorRunBindingUnconfirmedError) {
        throw new CreatorServiceError(
          503,
          "run_binding_failed",
          "The exact revision run binding is not yet confirmed; retry only this same revision-plan approval."
        );
      }
      throw error;
    }
    const boundAt = strictlyAfter(
      current.updatedAt,
      request.planApprovedAt,
      run.createdAt
    );
    const binding = buildRunBinding({
      run,
      projectId: current.identity.projectId,
      purpose: "revision",
      operationSlot,
      instruction,
      responseContractVersion: request.responseContractVersion,
      sourceArtifactRevision: request.sourceArtifactRevision,
      boundAt,
    });
    const awaiting = nextProject(current, {
      status: "awaiting_revision_generation_approval",
      updates: {
        runBindings: [...current.runBindings, binding],
        approvalPacket: buildApprovalPacket(
          binding,
          request.planDigest,
          current.identity.projectId,
          boundAt
        ),
        revisionRequests: current.revisionRequests.map((candidate) =>
          candidate.requestId === request?.requestId
            ? { ...candidate, runBoundAt: boundAt }
            : candidate
        ),
      },
      events: [
        {
          eventType: "run.bound",
          actor: "system",
          summary: `Exact explicit-revision run slot ${operationSlot} was bound and awaits separate generation approval.`,
          sourceRunId: run.runId,
          artifactRevision: request.sourceArtifactRevision,
        },
        {
          eventType: "revision.plan_approved",
          actor: "local-operator",
          summary:
            "The immutable revision plan was recorded against its exact distinct local run.",
          sourceRunId: run.runId,
          artifactRevision: request.sourceArtifactRevision,
        },
      ],
      idempotencyKeyHash: keyHash,
      mutationDigest,
      idempotency: {
        idempotencyKeyHash: keyHash,
        mutationKind: "approve-revision-plan",
        mutationDigest,
      },
      minimumOccurredAt: boundAt,
    });
    return persistNext(current, awaiting);
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
    const expectedStatus =
      purpose === "generation"
        ? "awaiting_generation_approval"
        : purpose === "revision"
          ? "awaiting_revision_generation_approval"
          : "awaiting_repair_approval";
    const resultingStatus =
      purpose === "generation"
        ? "approved"
        : purpose === "revision"
          ? "revision_generation_approved"
          : "repair_approved";
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
      (purpose === "revision"
        ? current.revisionRequests.at(-1)?.planDigest
        : current.plan?.planDigest) !== approvalPacket.planDigest
    ) {
      throw new CreatorServiceError(
        409,
        "approval_failed",
        "Creator approval packet no longer matches its exact plan and run binding."
      );
    }
    assertExactApprovalDestination(current, purpose, binding);
    if (!hasPendingAuditIntent(
      current,
      "approval.requested",
      keyHash,
      mutationDigest,
      binding.sourceRunId
    )) {
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
        operationSlot: binding.operationSlot,
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
          operationSlot: binding.operationSlot,
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
    const revisionGenerationApprovedAt =
      purpose === "revision"
        ? strictlyAfter(current.updatedAt, approvedAt)
        : approvedAt;
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
        revisionRequests:
          purpose === "revision"
            ? current.revisionRequests.map((request) =>
                request.runBoundAt === binding.boundAt
                  ? {
                      ...request,
                      generationApprovedAt: revisionGenerationApprovedAt,
                    }
                  : request
              )
            : current.revisionRequests,
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
      minimumOccurredAt: revisionGenerationApprovedAt,
    });
    return persistNext(current, next);
  }

  async function executeBoundLifecycle(
    project: CreatorProjectState,
    purpose: CreatorRunPurpose,
    binding: CreatorGenerationRunBinding,
    keyHash: string
  ): Promise<CreatorLifecycleRunResult> {
    try {
      return await lifecycle.executeRun({
        projectId: project.identity.projectId,
        purpose,
        operationSlot: binding.operationSlot,
        runId: binding.sourceRunId,
        ownershipBindingId: binding.ownershipBindingId,
        expectedRunRevision: binding.sourceRunRevision,
        expectedApprovalScopeHash: binding.approvalScopeHash,
        expectedRequestEnvelopeDigest: binding.requestEnvelopeDigest,
        executionIntentIdempotencyKeyHash: keyHash,
        admitProviderStart: async () => {
          const durable = await persistence.readProject(
            project.identity.projectId
          );
          const durableBinding = durable.runBindings.find(
            (candidate) => candidate.sourceRunId === binding.sourceRunId
          );
          const expectedRunningStatus =
            purpose === "generation"
              ? "generating"
              : purpose === "revision"
                ? "revising"
                : "repairing";
          return (
            durable.status === expectedRunningStatus &&
            durableBinding?.operationSlot === binding.operationSlot &&
            durableBinding.executionIdempotencyKeyHash ===
              binding.executionIdempotencyKeyHash &&
            durableBinding.executionRequestedAt !== null
          );
        },
      });
    } catch {
      let recovered: CreatorLifecycleRunResult | null = null;
      try {
        recovered = recoverTerminalLifecycleResult(
          await lifecycle.getRun({
            projectId: project.identity.projectId,
            purpose,
            operationSlot: binding.operationSlot,
            runId: binding.sourceRunId,
            ownershipBindingId: binding.ownershipBindingId,
          })
        );
      } catch {
        // The one exact source run could not be read back; leave this exact
        // persisted execution intent recoverable without issuing a second try.
      }
      if (!recovered) {
        throw new CreatorServiceError(
          503,
          "execution_blocked",
          "The exact local execution outcome is not yet durably confirmed; retry this same explicit action."
        );
      }
      return recovered;
    }
  }

  async function finalizeStoppedExecution(
    current: CreatorProjectState,
    purpose: CreatorRunPurpose,
    binding: CreatorGenerationRunBinding,
    keyHash: string,
    mutationDigest: string,
    mutationKind: CreatorMutationKind,
    providerResult: CreatorLifecycleRunResult
  ): Promise<CreatorProjectState> {
    if (current.status !== "stopping") {
      throw new CreatorServiceError(
        409,
        "invalid_transition",
        "Creator Stop finalization requires the durable stopping phase."
      );
    }
    assertBoundLifecycleResult(
      providerResult,
      binding,
      current.identity.projectId,
      purpose,
      keyHash,
      binding.executionIdempotencyKeyHash
    );
    const stoppedAt = strictlyAfter(
      current.updatedAt,
      providerResult.run.updatedAt
    );
    const discardedProviderOutput =
      providerResult.run.state === "succeeded" &&
      providerResult.responseStatus === 200 &&
      Boolean(providerResult.outputText);
    const stopped = nextProject(current, {
      status: "stopped",
      updates: {
        runBindings: replaceRunBinding(
          current,
          binding.sourceRunId,
          (candidate) => ({
            ...candidate,
            sourceRunRevision: providerResult.run.revision,
          })
        ),
      },
      events: [
        ...(discardedProviderOutput
          ? [
              {
                eventType: "output.discarded" as const,
                actor: "system" as const,
                summary:
                  "Provider output arrived after Stop won and was discarded without validation or materialization.",
                sourceRunId: binding.sourceRunId,
              },
            ]
          : []),
        {
          eventType: "generation.stopped",
          actor: "system",
          summary: discardedProviderOutput
            ? "Creator generation stopped; late output was not accepted."
            : "Creator generation stopped; no provider output was accepted or materialized.",
          sourceRunId: binding.sourceRunId,
        },
      ],
      idempotencyKeyHash: keyHash,
      mutationDigest,
      idempotency: {
        idempotencyKeyHash: keyHash,
        mutationKind,
        mutationDigest,
      },
      minimumOccurredAt: stoppedAt,
    });
    return persistNext(current, stopped);
  }

  async function executePurpose(
    initial: CreatorProjectState,
    purpose: CreatorRunPurpose,
    keyHash: string,
    mutationDigest: string,
    mutationKind: string,
    execution?: Readonly<{
      deferProviderExecution?: boolean;
      providerResult?: CreatorLifecycleRunResult;
    }>
  ): Promise<CreatorProjectState> {
    let current = initial;
    const approvedStatus =
      purpose === "generation"
        ? "approved"
        : purpose === "revision"
          ? "revision_generation_approved"
          : "repair_approved";
    const runningStatus =
      purpose === "generation"
        ? "generating"
        : purpose === "revision"
          ? "revising"
          : "repairing";
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
      const executionBinding = binding;
      const executionRequestedAt =
        purpose === "revision"
          ? strictlyAfter(current.updatedAt)
          : monotonicNow(current.updatedAt);
      const running = nextProject(current, {
        status: runningStatus,
        updates: {
          runBindings: replaceRunBinding(current, executionBinding.sourceRunId, (candidate) => ({
            ...candidate,
            executionRequestedAt,
            executionIdempotencyKeyHash:
              buildCreatorExecutionIdempotencyKeyHash(
                current.identity.projectId,
                purpose,
                keyHash,
                executionBinding.operationSlot
              ),
            executionAttempted: true,
          })),
          revisionRequests:
            purpose === "revision"
              ? current.revisionRequests.map((request) =>
                  request.runBoundAt === executionBinding.boundAt
                    ? { ...request, executionRequestedAt }
                    : request
                )
              : current.revisionRequests,
        },
        events: [
          {
            eventType: "execution.requested",
            actor: "local-operator",
            summary: `One explicit ${purpose} execution attempt was requested.`,
            sourceRunId: executionBinding.sourceRunId,
          },
        ],
        idempotencyKeyHash: keyHash,
        mutationDigest,
        minimumOccurredAt: executionRequestedAt,
      });
      current = await persistNext(current, running);
      binding = [...current.runBindings]
        .reverse()
        .find((candidate) => candidate.sourceRunId === executionBinding.sourceRunId);
      if (!binding) {
        throw new CreatorServiceError(500, "record_corrupt", "Creator execution intent lost its exact run binding.");
      }
      if (execution?.deferProviderExecution) return current;
    }
    if (current.status === runningStatus) {
      if (execution?.deferProviderExecution) return current;
      const result =
        execution?.providerResult ??
        (await executeBoundLifecycle(current, purpose, binding, keyHash));
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
      const outputReceivedAt =
        purpose === "revision"
          ? strictlyAfter(current.updatedAt)
          : monotonicNow(current.updatedAt);
      const output = binding.responseContractVersion === "server-owned-page-v1"
        ? validateCreatorServerOwnedProviderOutput({
            rawOutput: result.outputText,
            expectedProjectTitle: current.identity.projectTitle,
            completedAt: outputReceivedAt,
          })
        : validateCreatorProviderOutput({
            rawOutput: result.outputText,
            expectedProjectTitle: current.identity.projectTitle,
            completedAt: outputReceivedAt,
          });
      const documentTopology =
        "topology" in output ? output.topology : null;
      const documentWasConstructed = documentTopology !== null;
      const completedRunBindings = replaceRunBinding(
        current,
        binding.sourceRunId,
        (candidate) => ({
          ...candidate,
          sourceRunRevision: result.run.revision,
          outputReceivedAt,
          documentTopology,
        })
      );
      const proposalBinding = {
        purpose,
        sourceRunId: binding.sourceRunId,
      } as const;
      if (!output.validation.valid || !output.bundle) {
        const contractRejected = !output.parse.ok;
        const rejectedStatus = purpose === "repair" ? "failed" : "rejected_output";
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
            revisionRequests:
              purpose === "revision"
                ? current.revisionRequests.map((request) =>
                    request.runBoundAt === binding.boundAt
                      ? { ...request, rejectedAt: outputReceivedAt }
                      : request
                  )
                : current.revisionRequests,
          },
          events: [
            {
              eventType: "output.received",
              actor: "system",
              summary: "Bounded provider output was received for deterministic contract validation.",
              sourceRunId: binding.sourceRunId,
            },
            ...(documentWasConstructed
              ? [
                  {
                    eventType: "topology.document_constructed" as const,
                    actor: "system" as const,
                    summary:
                      `CodexForge constructed the canonical document shell around validated untrusted page fragments (${documentTopology?.transformationDigest.slice(0, 12)}).`,
                    sourceRunId: binding.sourceRunId,
                  },
                ]
              : []),
            {
              eventType: "validation.completed",
              actor: "system",
              summary: "Deterministic validation completed with blocking findings.",
              sourceRunId: binding.sourceRunId,
            },
            {
              eventType:
                purpose === "repair" ? "repair.result_rejected" : "output.rejected",
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
          ...(documentWasConstructed
            ? [
                {
                  eventType: "topology.document_constructed" as const,
                  actor: "system" as const,
                  summary:
                    `CodexForge constructed the canonical document shell around validated untrusted page fragments (${documentTopology?.transformationDigest.slice(0, 12)}).`,
                  sourceRunId: binding.sourceRunId,
                },
              ]
            : []),
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
        const rejectedStatus = purpose === "repair" ? "failed" : "rejected_output";
        const eventType = purpose === "repair" ? "repair.result_rejected" : "output.rejected";
        const rejected = nextProject(current, {
          status: rejectedStatus,
          updates: {
            failureCode: "output_contract_invalid",
            failureMessage: "The returned output did not match the strict artifact contract.",
            revisionRequests:
              purpose === "revision"
                ? current.revisionRequests.map((request) =>
                    request.runBoundAt === binding.boundAt && request.rejectedAt === null
                      ? { ...request, rejectedAt: current.validation?.completedAt ?? current.updatedAt }
                      : request
                  )
                : current.revisionRequests,
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
      const rejectedStatus = purpose === "repair" ? "failed" : "rejected_output";
      const rejected = nextProject(current, {
        status: rejectedStatus,
        updates: {
          failureCode: "output_validation_failed",
          failureMessage: "The artifact proposal has blocking deterministic validation findings.",
          revisionRequests:
            purpose === "revision"
              ? current.revisionRequests.map((request) =>
                  request.runBoundAt === binding.boundAt && request.rejectedAt === null
                    ? { ...request, rejectedAt: current.validation?.completedAt ?? current.updatedAt }
                    : request
                )
              : current.revisionRequests,
        },
        events: [
          {
            eventType: purpose === "repair" ? "repair.result_rejected" : "output.rejected",
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
    const publicationBinding =
      [...current.runBindings]
        .reverse()
        .find((candidate) => candidate.sourceRunId === binding.sourceRunId) ??
      binding;
    const topologyTransformationDigest =
      publicationBinding.documentTopology?.transformationDigest;
    if (
      (publicationBinding.responseContractVersion === "server-owned-page-v1") !==
      (topologyTransformationDigest !== undefined)
    ) {
      throw new CreatorServiceError(
        500,
        "record_corrupt",
        "The validated publication is missing its exact server-owned document transformation provenance."
      );
    }
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
        candidate.manifest.topologyTransformationDigest !==
          topologyTransformationDigest ||
        acceptedValidation.manifestDigest !== hashCreatorCanonicalJson({
          entrypoint: candidate.manifest.entrypoint,
          files: candidate.manifest.files,
        }) ||
        candidate.materialization.artifactRevision !== artifactRevision ||
        candidate.materialization.destinationLabel !== expectedDestinationLabel ||
        candidate.materialization.entrypoint !== "index.html" ||
        candidate.materialization.validationDigest !== candidate.manifest.validationDigest ||
        candidate.materialization.topologyTransformationDigest !==
          topologyTransformationDigest ||
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
            runBinding: publicationBinding,
            ...(topologyTransformationDigest === undefined
              ? {}
              : { topologyTransformationDigest }),
            auditReferenceIds: expectedAuditReferenceIds,
            materializedAt:
              purpose === "revision"
                ? strictlyAfter(current.updatedAt)
                : monotonicNow(current.updatedAt),
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
        revisionRequests:
          purpose === "revision"
            ? current.revisionRequests.map((request) =>
                request.runBoundAt === binding.boundAt
                  ? {
                      ...request,
                      completionPurpose: "revision" as const,
                      completionSourceRunId: binding.sourceRunId,
                      completedAt:
                        publication.materialization.materializedAt,
                    }
                  : request
              )
            : purpose === "repair" && current.repair?.linkedRevisionRequestId
              ? current.revisionRequests.map((request) =>
                  request.requestId === current.repair?.linkedRevisionRequestId
                    ? {
                        ...request,
                        completionPurpose: "repair" as const,
                        completionSourceRunId: binding.sourceRunId,
                        completedAt:
                          publication.materialization.materializedAt,
                      }
                    : request
                )
              : current.revisionRequests,
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

  async function readExactRetainedTopologySource(
    project: CreatorProjectState,
    sourceRunId: string,
    sourceOutputSha256: string | null
  ): Promise<Readonly<{
    binding: CreatorGenerationRunBinding;
    run: PrivateAlphaRunRecord;
    outputText: string;
    outputSha256: string;
  }>> {
      const binding = project.runBindings.find(
        (candidate) => candidate.sourceRunId === sourceRunId
      );
      if (
        !binding ||
        binding.purpose !== "generation" ||
        binding.responseContractVersion !== "legacy-bundle-v1" ||
        binding.executionAttempted !== true ||
        binding.executionRequestedAt === null ||
        binding.executionIdempotencyKeyHash === null ||
        binding.outputReceivedAt === null
      ) {
        throw new CreatorServiceError(
          409,
          "topology_repair_failed",
          "The retained rejected output is not bound to one exact legacy generation run."
        );
      }
      let run: PrivateAlphaRunRecord;
      try {
        run = await lifecycle.getRun({
          projectId: project.identity.projectId,
          purpose: binding.purpose,
          operationSlot: binding.operationSlot,
          runId: binding.sourceRunId,
          ownershipBindingId: binding.ownershipBindingId,
        });
        assertExpectedRunIdentity(
          run,
          project.identity.projectId,
          binding.purpose,
          binding.operationSlot
        );
        assertBoundLifecycleRun(run, binding);
      } catch {
        throw new CreatorServiceError(
          503,
          "topology_repair_failed",
          "The exact retained local run could not be verified without another provider request."
        );
      }
      const execution = run.execution;
      if (
        run.runId !== sourceRunId ||
        run.revision !== binding.sourceRunRevision ||
        run.state !== "succeeded" ||
        run.cancellation !== null ||
        run.approval === null ||
        execution === null ||
        execution.status !== "succeeded" ||
        execution.responseStatus !== 200 ||
        execution.resultingRevision !== run.revision ||
        execution.outputText === null ||
        execution.outputSha256 === null ||
        (sourceOutputSha256 !== null &&
          execution.outputSha256 !== sourceOutputSha256) ||
        hashCreatorSha256(execution.outputText) !== execution.outputSha256 ||
        execution.idempotencyKeyHash !== binding.executionIdempotencyKeyHash ||
        execution.approvalScopeHash !== binding.approvalScopeHash ||
        execution.errorCode !== null ||
        execution.safeErrorMessage !== null
      ) {
        throw new CreatorServiceError(
          409,
          "topology_repair_failed",
          "The retained response no longer matches its exact successful local execution evidence."
        );
      }
      return {
        binding,
        run,
        outputText: execution.outputText,
        outputSha256: execution.outputSha256,
      };
  }

  async function repairDocumentTopology(
    currentInput: CreatorProjectState,
    action: CreatorRepairDocumentTopologyActionInput,
    keyHash: string,
    mutationDigest: string
  ): Promise<CreatorProjectState> {
    let current = currentInput;
    const mutationKind = "repair-document-topology" as const;

    if (current.status === "rejected_output") {
      const issueCodes = current.validation?.issues.map((issue) => issue.code).sort() ?? [];
      if (
        current.stateRevision !== action.sourceRevision ||
        action.expectedRevision !== action.sourceRevision ||
        current.failureCode !== "output_validation_failed" ||
        current.validation === null ||
        current.validation.valid ||
        hashCreatorCanonicalJson(issueCodes) !==
          hashCreatorCanonicalJson([
            "html.document_topology",
            "preview.not_ready",
          ]) ||
        current.artifactProposal !== null ||
        current.artifactProposalBinding?.purpose !== "generation" ||
        current.artifactProposalBinding.sourceRunId !== action.sourceRunId ||
        current.materializations.length !== 0 ||
        current.exportManifest !== null ||
        current.preview.status !== "inactive" ||
        current.topologyRepair !== null
      ) {
        throw new CreatorServiceError(
          409,
          "topology_repair_failed",
          "Only the exact narrowly eligible rejected legacy topology result can be repaired deterministically."
        );
      }
      const source = await readExactRetainedTopologySource(
        current,
        action.sourceRunId,
        action.sourceOutputSha256
      );
      assertExactApprovalDestination(
        current,
        source.binding.purpose,
        source.binding,
        1
      );
      const transformed =
        reprocessLegacyCreatorArtifactOutputWithServerOwnedTopology({
          rawOutput: source.outputText,
          expectedProjectTitle: current.identity.projectTitle,
        });
      if (!transformed.ok || transformed.topology.inputHtmlSha256 === null) {
        throw new CreatorServiceError(
          422,
          "topology_repair_failed",
          "The retained response could not be transformed through the bounded structural topology boundary without ambiguity."
        );
      }
      const constructedAt = strictlyAfter(current.updatedAt, source.run.updatedAt);
      const accepted = validateCreatorArtifactBundle({
        bundle: transformed.bundle,
        expectedProjectTitle: current.identity.projectTitle,
        completedAt: constructedAt,
      });
      if (!accepted.bundle || !accepted.validation.valid) {
        throw new CreatorServiceError(
          422,
          "topology_repair_failed",
          "The deterministically constructed document did not pass every existing validation stage."
        );
      }
      const validationDigest = buildCreatorValidationDigest(
        accepted.validation
      );
      const topologyRepair: CreatorTopologyRepair = {
        status: "pending",
        sourceStateRevision: action.sourceRevision,
        sourceRunId: source.run.runId,
        sourceRunRevision: source.run.revision,
        sourceOutputSha256: action.sourceOutputSha256,
        sourceValidationIssueDigest: current.validation.issueDigest,
        providerRequests: 0,
        repairKind: "server-owned-document-topology",
        originalValidationState: "rejected_output",
        automaticRepair: false,
        operatorAuthorized: true,
        sourceResponseContractVersion: "legacy-bundle-v1",
        responseContractVersion: "server-owned-page-v1",
        canonicalizerVersion: CREATOR_TOPOLOGY_CANONICALIZER_VERSION,
        orderedOperations: CREATOR_TOPOLOGY_REPAIR_OPERATIONS,
        inputHtmlSha256: transformed.topology.inputHtmlSha256,
        outputHtmlSha256: transformed.topology.outputHtmlSha256,
        inputBundleDigest: transformed.topology.inputDigest,
        outputBundleDigest: transformed.topology.outputBundleDigest,
        validationDigest,
        transformationDigest: transformed.topology.transformationDigest,
        targetArtifactRevision: 1,
        requestedAt: constructedAt,
        constructedAt,
        completedAt: null,
      };
      const validating = nextProject(current, {
        status: "validating",
        updates: {
          artifactProposal: accepted.bundle,
          artifactProposalBinding: {
            purpose: "generation",
            sourceRunId: source.run.runId,
          },
          validation: accepted.validation,
          topologyRepair,
          failureCode: null,
          failureMessage: null,
        },
        events: [
          {
            eventType: "topology.repair_requested",
            actor: "local-operator",
            summary:
              "The operator authorized one provider-free deterministic reconstruction of the exact retained rejected response.",
            sourceRunId: source.run.runId,
          },
          {
            eventType: "topology.document_constructed",
            actor: "system",
            summary:
              "CodexForge structurally extracted the unambiguous retained content and constructed the canonical document shell.",
            sourceRunId: source.run.runId,
          },
          {
            eventType: "validation.completed",
            actor: "system",
            summary:
              "All ten deterministic validation stages passed after server-owned document construction.",
            sourceRunId: source.run.runId,
          },
        ],
        idempotencyKeyHash: keyHash,
        mutationDigest,
        occurredAt: constructedAt,
      });
      current = await persistNext(current, validating);
    }

    const pending = current.topologyRepair;
    if (
      current.status !== "validating" ||
      pending?.status !== "pending" ||
      pending.sourceStateRevision !== action.sourceRevision ||
      pending.sourceRunId !== action.sourceRunId ||
      pending.sourceOutputSha256 !== action.sourceOutputSha256 ||
      current.artifactProposal === null ||
      current.artifactProposalBinding?.purpose !== "generation" ||
      current.artifactProposalBinding.sourceRunId !== pending.sourceRunId ||
      current.validation === null ||
      !current.validation.valid ||
      buildCreatorValidationDigest(current.validation) !==
        pending.validationDigest
    ) {
      throw new CreatorServiceError(
        409,
        "topology_repair_failed",
        "The pending deterministic topology repair no longer matches its exact retained source and validation evidence."
      );
    }
    const source = await readExactRetainedTopologySource(
      current,
      pending.sourceRunId,
      pending.sourceOutputSha256
    );
    const transformed =
      reprocessLegacyCreatorArtifactOutputWithServerOwnedTopology({
        rawOutput: source.outputText,
        expectedProjectTitle: current.identity.projectTitle,
      });
    const accepted = transformed.ok
      ? validateCreatorArtifactBundle({
          bundle: transformed.bundle,
          expectedProjectTitle: current.identity.projectTitle,
          completedAt: pending.constructedAt,
        })
      : null;
    if (
      !transformed.ok ||
      transformed.topology.inputHtmlSha256 === null ||
      !accepted?.bundle ||
      !accepted.validation.valid ||
      hashCreatorCanonicalJson(accepted.bundle) !==
        hashCreatorCanonicalJson(current.artifactProposal) ||
      hashCreatorCanonicalJson(accepted.validation) !==
        hashCreatorCanonicalJson(current.validation) ||
      transformed.topology.inputHtmlSha256 !== pending.inputHtmlSha256 ||
      transformed.topology.outputHtmlSha256 !== pending.outputHtmlSha256 ||
      transformed.topology.inputDigest !== pending.inputBundleDigest ||
      transformed.topology.outputBundleDigest !== pending.outputBundleDigest ||
      transformed.topology.transformationDigest !== pending.transformationDigest
    ) {
      throw new CreatorServiceError(
        409,
        "topology_repair_failed",
        "The pending deterministic topology repair could not be reproduced exactly from immutable source evidence."
      );
    }

    const completedAt = new Date(
      Date.parse(pending.constructedAt) + 1
    ).toISOString();
    const completedRepair: CreatorTopologyRepair = {
      ...pending,
      status: "completed",
      completedAt,
    };
    const topologyRepairDigest = hashCreatorCanonicalJson(completedRepair);
    const artifactRevision = pending.targetArtifactRevision;
    const expectedDestinationLabel = buildCreatorDestinationBoundary(
      current.identity.projectId,
      artifactRevision
    );
    const materializedEventId = hashCreatorSha256(
      `creator-audit:materialized:${current.identity.projectId}:${artifactRevision}:${source.binding.sourceRunId}:topology`
    ).slice(0, 24);
    const manifestEventId = hashCreatorSha256(
      `creator-audit:manifest:${current.identity.projectId}:${artifactRevision}:${source.binding.sourceRunId}:topology`
    ).slice(0, 24);
    const completedEventId = hashCreatorSha256(
      `creator-audit:topology-completed:${current.identity.projectId}:${artifactRevision}:${source.binding.sourceRunId}`
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
      completedEventId,
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
        candidate.manifest.sourceRunId !== source.binding.sourceRunId ||
        candidate.manifest.sourceRequestDigest !== current.request.requestDigest ||
        candidate.manifest.providerKey !== source.binding.providerKey ||
        candidate.manifest.modelKey !== source.binding.modelKey ||
        candidate.manifest.runtimeModel !== source.binding.runtimeModel ||
        candidate.manifest.dataBoundary !== source.binding.dataBoundary ||
        candidate.manifest.validationDigest !== pending.validationDigest ||
        candidate.manifest.topologyRepairDigest !== topologyRepairDigest ||
        candidate.materialization.artifactRevision !== artifactRevision ||
        candidate.materialization.destinationLabel !== expectedDestinationLabel ||
        candidate.materialization.entrypoint !== "index.html" ||
        candidate.materialization.validationDigest !== pending.validationDigest ||
        candidate.materialization.topologyRepairDigest !== topologyRepairDigest ||
        candidate.manifest.createdAt !== completedAt ||
        candidate.materialization.materializedAt !== completedAt ||
        hashCreatorCanonicalJson(candidate.manifest.auditReferenceIds) !==
          hashCreatorCanonicalJson(expectedAuditReferenceIds)
      ) {
        throw new CreatorMaterializationError(
          "export_digest_mismatch",
          "The deterministic topology publication does not match its exact retained-source provenance."
        );
      }
      return candidate;
    };
    const readExpectedPublication = async () =>
      assertExpectedPublication(
        await readCreatorMaterializationPublication({
          persistence,
          projectId: current.identity.projectId,
          artifactRevision,
        })
      );
    let publication: CreatorMaterializationPublication;
    try {
      try {
        publication = await readExpectedPublication();
      } catch (error) {
        if (
          !(error instanceof CreatorMaterializationError) ||
          error.code !== "not_found"
        ) {
          throw error;
        }
        try {
          publication = assertExpectedPublication(
            await materializeCreatorArtifact({
              persistence,
              projectId: current.identity.projectId,
              projectTitle: current.identity.projectTitle,
              sourceRequestDigest: current.request.requestDigest,
              artifactRevision,
              bundle: accepted.bundle,
              validation: accepted.validation,
              runBinding: source.binding,
              auditReferenceIds: expectedAuditReferenceIds,
              topologyRepairDigest,
              materializedAt: completedAt,
            })
          );
        } catch (publicationError) {
          try {
            publication = await readExpectedPublication();
          } catch {
            throw publicationError;
          }
        }
      }
    } catch {
      throw new CreatorServiceError(
        503,
        "materialization_failed",
        "The deterministic topology repair remains recoverable because atomic publication could not yet be confirmed."
      );
    }
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
        topologyRepair: completedRepair,
        failureCode: null,
        failureMessage: null,
      },
      events: [
        {
          eventId: materializedEventId,
          eventType: "revision.materialized",
          actor: "system",
          summary:
            "Artifact revision 1 was atomically published from the provider-free deterministic topology repair.",
          sourceRunId: source.binding.sourceRunId,
          artifactRevision,
        },
        {
          eventId: manifestEventId,
          eventType: "export.manifest_created",
          actor: "system",
          summary: `Deterministic export manifest ${publication.manifest.manifestDigest.slice(0, 12)} was created.`,
          sourceRunId: source.binding.sourceRunId,
          artifactRevision,
        },
        {
          eventId: completedEventId,
          eventType: "topology.repair_completed",
          actor: "system",
          summary:
            "The operator-authorized server-owned document topology repair completed with zero provider requests.",
          sourceRunId: source.binding.sourceRunId,
          artifactRevision,
        },
      ],
      idempotencyKeyHash: keyHash,
      mutationDigest,
      idempotency: {
        idempotencyKeyHash: keyHash,
        mutationKind,
        mutationDigest,
      },
      occurredAt: completedAt,
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
      const sourceSnapshot = sourceArtifactRevision === null
        ? null
        : await readExactSourceSnapshot(current, sourceArtifactRevision);
      const linkedRevision =
        current.artifactProposalBinding?.purpose === "revision" &&
        current.revisionRequests.at(-1)?.targetArtifactRevision ===
          (sourceArtifactRevision ?? 0) + 1
          ? current.revisionRequests.at(-1) ?? null
          : null;
      const preliminaryInstruction = buildCreatorRepairInstructionForResponseContract({
        responseContractVersion: "server-owned-page-v1",
        projectTitle: current.identity.projectTitle,
        description: current.request.description,
        sourceArtifactRevision,
        sourceSnapshotJson: sourceSnapshot?.json ?? null,
        linkedRevisionBrief: linkedRevision?.revisionBrief ?? null,
        issueDigest: current.validation.issueDigest,
        issues: current.validation.issues,
      });
      assertInstructionBounded(preliminaryInstruction);
      const requestedAt = monotonicNow(current.updatedAt);
      const repairRequested = nextProject(current, {
        status: "repair_requested",
        updates: {
          repair: {
            instructionVersion: "source-snapshot-v2",
            responseContractVersion: "server-owned-page-v1",
            attempt: 1,
            requestedAt,
            sourceArtifactRevision,
            targetArtifactRevision: (sourceArtifactRevision ?? 0) + 1,
            sourceManifestDigest:
              sourceSnapshot?.publication.manifest.manifestDigest ?? null,
            sourceAggregateDigest:
              sourceSnapshot?.publication.materialization.aggregateDigest ?? null,
            sourceValidationDigest:
              sourceSnapshot?.publication.materialization.validationDigest ?? null,
            sourceSnapshotDigest: sourceSnapshot?.digest ?? null,
            sourceSnapshotBytes: sourceSnapshot?.byteLength ?? null,
            linkedRevisionRequestId: linkedRevision?.requestId ?? null,
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
    if (current.repair.instructionVersion !== "source-snapshot-v2") {
      throw new CreatorServiceError(
        409,
        "run_binding_failed",
        "This historical repair request cannot create a new source-less run; cancel it or preserve the existing publication."
      );
    }
    const sourceArtifactRevision = current.repair.sourceArtifactRevision;
    const sourceSnapshot = sourceArtifactRevision === null
      ? null
      : await readExactSourceSnapshot(current, sourceArtifactRevision);
    if (sourceSnapshot !== null) {
      if (
        current.repair.sourceManifestDigest === null ||
        current.repair.sourceAggregateDigest === null ||
        current.repair.sourceValidationDigest === null ||
        current.repair.sourceSnapshotDigest === null ||
        current.repair.sourceSnapshotBytes === null
      ) {
        throw new CreatorServiceError(
          500,
          "record_corrupt",
          "Creator repair source evidence is incomplete."
        );
      }
      assertExactSourceSnapshotBinding({
        snapshot: sourceSnapshot,
        digest: current.repair.sourceSnapshotDigest,
        byteLength: current.repair.sourceSnapshotBytes,
        manifestDigest: current.repair.sourceManifestDigest,
        aggregateDigest: current.repair.sourceAggregateDigest,
        validationDigest: current.repair.sourceValidationDigest,
      });
    }
    const linkedRevision = current.repair.linkedRevisionRequestId === null
      ? null
      : current.revisionRequests.find(
          (request) => request.requestId === current.repair?.linkedRevisionRequestId
        ) ?? null;
    if (
      (current.repair.linkedRevisionRequestId === null) !==
      (linkedRevision === null)
    ) {
      throw new CreatorServiceError(
        500,
        "record_corrupt",
        "Creator repair is not bound to its exact rejected revision request."
      );
    }
    const instruction = buildCreatorRepairInstructionForResponseContract({
      responseContractVersion: current.repair.responseContractVersion,
      projectTitle: current.identity.projectTitle,
      description: current.request.description,
      sourceArtifactRevision,
      sourceSnapshotJson: sourceSnapshot?.json ?? null,
      linkedRevisionBrief: linkedRevision?.revisionBrief ?? null,
      issueDigest: current.validation.issueDigest,
      issues: current.validation.issues,
    });
    assertInstructionBounded(instruction);
    if (hashCreatorSha256(instruction) !== current.repair.repairContextDigest) {
      throw new CreatorServiceError(
        409,
        "revision_conflict",
        "The exact local repair instruction no longer matches the reviewed request."
      );
    }

    let run: PrivateAlphaRunRecord;
    try {
      run = await bindExactInitialRun({
        projectId: current.identity.projectId,
        purpose: "repair",
        operationSlot: "repair-1",
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
      operationSlot: "repair-1",
      instruction,
      responseContractVersion: current.repair.responseContractVersion,
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
    if (
      [
        "generating",
        "revising",
        "repairing",
        "validating",
        "stopping",
        "stopped",
        "exported",
        "canceled",
      ].includes(current.status)
    ) {
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
        "awaiting_revision_generation_approval",
        "revision_generation_approved",
        "awaiting_repair_approval",
        "repair_approved",
      ].includes(current.status) && current.approvalPacket !== null);
    if (
      requiresSourceRunCancellation &&
      !hasPendingAuditIntent(
        current,
        "cancellation.requested",
        keyHash,
        mutationDigest,
        requiresLatentSourceRunCancellation
          ? null
          : current.approvalPacket?.privateAlphaRunId ?? null
      )
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
    let canceledRevisionRequests = current.revisionRequests;
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
      [
        "awaiting_generation_approval",
        "approved",
        "awaiting_revision_generation_approval",
        "revision_generation_approved",
        "awaiting_repair_approval",
        "repair_approved",
      ].includes(current.status) &&
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
      if (
        cancellationBinding.purpose === "revision" &&
        cancellationResult.approvalRecordedAt !== null
      ) {
        const revisionGenerationApprovedAt = strictlyAfter(
          current.updatedAt,
          cancellationResult.approvalRecordedAt
        );
        canceledRevisionRequests = current.revisionRequests.map((request) =>
          request.runBoundAt === cancellationBinding.boundAt
            ? {
                ...request,
                generationApprovedAt:
                  request.generationApprovedAt ??
                  revisionGenerationApprovedAt,
              }
            : request
        );
      }
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
      canceledApprovalPacket?.approvedAt,
      canceledRevisionRequests.at(-1)?.generationApprovedAt
    );
    const next = nextProject(current, {
      status: "canceled",
      updates: {
        approvalPacket: canceledApprovalPacket,
        runBindings: canceledRunBindings,
        revisionRequests: canceledRevisionRequests,
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
    current: CreatorProjectState,
    execution?: Readonly<{
      deferProviderExecution?: boolean;
      providerResult?: CreatorLifecycleRunResult;
    }>
  ): Promise<CreatorProjectState> {
    const intent = findPendingMutationIntent(current);
    if (
      !intent ||
      intent.idempotencyKeyHash === null ||
      intent.mutationDigest === null
    ) {
      return current;
    }
    if (intent.eventType === "plan.approval_requested") {
      return approveInitialPlan(
        current,
        intent.idempotencyKeyHash,
        intent.mutationDigest
      );
    }
    if (intent.eventType === "revision.plan_approval_requested") {
      return approveExplicitRevisionPlan(
        current,
        intent.idempotencyKeyHash,
        intent.mutationDigest
      );
    }
    if (intent.eventType === "approval.requested") {
      const purpose: CreatorRunPurpose =
        current.status === "awaiting_repair_approval"
          ? "repair"
          : current.status === "awaiting_revision_generation_approval"
            ? "revision"
            : "generation";
      return approvePurpose(
        current,
        purpose,
        intent.idempotencyKeyHash,
        intent.mutationDigest,
        purpose === "repair"
          ? "approve-repair"
          : purpose === "revision"
            ? "approve-revision-generation"
            : "approve-generation"
      );
    }
    if (intent.eventType === "execution.requested") {
      const purpose: CreatorRunPurpose =
        current.runBindings.find(
          (binding) => binding.sourceRunId === intent.sourceRunId
        )?.purpose ?? "generation";
      return executePurpose(
        current,
        purpose,
        intent.idempotencyKeyHash,
        intent.mutationDigest,
        purpose === "repair"
          ? "execute-repair"
          : purpose === "revision"
            ? "execute-revision-generation"
            : "execute-generation",
        execution
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
    if (intent.eventType === "topology.repair_requested") {
      return repairDocumentTopology(
        current,
        {
          action: "repair-document-topology",
          expectedRevision: current.topologyRepair?.sourceStateRevision ?? 0,
          sourceRevision: current.topologyRepair?.sourceStateRevision ?? 0,
          sourceRunId: current.topologyRepair?.sourceRunId ?? "",
          sourceOutputSha256:
            current.topologyRepair?.sourceOutputSha256 ?? "",
        },
        intent.idempotencyKeyHash,
        intent.mutationDigest
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
    mutationDigest: string,
    execution?: Readonly<{
      deferProviderExecution?: boolean;
      providerResult?: CreatorLifecycleRunResult;
    }>
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

    const pendingBeforeReconciliation = findPendingMutationIntent(current);
    if (
      pendingBeforeReconciliation &&
      !(
        execution?.deferProviderExecution &&
        pendingBeforeReconciliation.eventType === "execution.requested" &&
        current.status === "stopping"
      )
    ) {
      current = await reconcilePendingMutation(current, execution);
    }
    if (
      execution?.deferProviderExecution &&
      findPendingMutationIntent(current)?.eventType === "execution.requested"
    ) {
      return current;
    }

    const recoveryEventIndex = current.auditEvents.findIndex(
      (event) => event.eventId === recoveryIntent?.eventId
    );
    const originalIntent = [...current.auditEvents.slice(0, recoveryEventIndex)]
      .reverse()
      .find(
        (event) =>
          [
            "plan.approval_requested",
            "approval.requested",
            "execution.requested",
            "repair.requested",
            "topology.repair_requested",
            "revision.plan_approval_requested",
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

  async function actOnExecution(
    projectId: string,
    action: CreatorProjectActionInput & {
      action:
        | "execute-generation"
        | "execute-repair"
        | "execute-revision-generation";
    },
    keyHash: string,
    mutationDigest: string
  ): Promise<CreatorProjectActionResult> {
    const purpose: CreatorRunPurpose =
      action.action === "execute-generation"
        ? "generation"
        : action.action === "execute-repair"
          ? "repair"
          : "revision";
    const runningStatus: CreatorProjectStatus =
      purpose === "generation"
        ? "generating"
        : purpose === "repair"
          ? "repairing"
          : "revising";
    const prepared = await persistence.withProjectLock(projectId, async () => {
      let current = await persistence.readProject(projectId);
      assertIdempotencyMutationConsistency(current, keyHash, mutationDigest);
      const replay = findReplay(
        current,
        keyHash,
        mutationDigest,
        action.action
      );
      if (replay) {
        return {
          completed: {
            replayed: true,
            project: await persistence.readProjectRevision(
              projectId,
              replay.resultingStateRevision
            ),
          },
          project: current,
          binding: null,
        };
      }
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
        purpose === "generation"
          ? ["generating", "validating"]
          : purpose === "repair"
            ? ["repairing", "validating"]
            : ["revising", "validating"]
      );
      reserveForAction(current, action.action, keyHash, mutationDigest);
      current = await executePurpose(
        current,
        purpose,
        keyHash,
        mutationDigest,
        action.action,
        { deferProviderExecution: true }
      );
      const completedRecord = findReplay(
        current,
        keyHash,
        mutationDigest,
        action.action
      );
      if (completedRecord) {
        return {
          completed: { replayed: false, project: current },
          project: current,
          binding: null,
        };
      }
      if (current.status !== runningStatus) {
        throw new CreatorServiceError(
          503,
          "execution_blocked",
          "The exact execution intent did not reach its durable running phase."
        );
      }
      const binding = [...current.runBindings]
        .reverse()
        .find((candidate) => candidate.purpose === purpose);
      if (!binding || binding.executionIdempotencyKeyHash === null) {
        throw new CreatorServiceError(
          500,
          "record_corrupt",
          "The durable creator execution intent is missing its exact run binding."
        );
      }
      return { completed: null, project: current, binding };
    });
    if (prepared.completed) return prepared.completed;
    if (!prepared.binding) {
      throw new CreatorServiceError(
        500,
        "record_corrupt",
        "Creator execution preparation lost its exact binding."
      );
    }

    // This is intentionally outside the creator project lock. The Private Alpha
    // run lock still serializes exact execution, while Stop can durably win the
    // project-state race before the provider-start admission callback executes.
    const providerResult = await executeBoundLifecycle(
      prepared.project,
      purpose,
      prepared.binding,
      keyHash
    );

    return persistence.withProjectLock(projectId, async () => {
      let current = await persistence.readProject(projectId);
      assertIdempotencyMutationConsistency(current, keyHash, mutationDigest);
      const replay = findReplay(
        current,
        keyHash,
        mutationDigest,
        action.action
      );
      if (replay) {
        return {
          replayed: true,
          project: await persistence.readProjectRevision(
            projectId,
            replay.resultingStateRevision
          ),
        };
      }
      const durableBinding = current.runBindings.find(
        (candidate) => candidate.sourceRunId === prepared.binding?.sourceRunId
      );
      if (
        !durableBinding ||
        durableBinding.operationSlot !== prepared.binding.operationSlot ||
        durableBinding.executionIdempotencyKeyHash !==
          prepared.binding.executionIdempotencyKeyHash
      ) {
        throw new CreatorServiceError(
          409,
          "provider_binding_mismatch",
          "The durable creator execution binding changed before result reconciliation."
        );
      }
      if (current.status === "stopping") {
        current = await finalizeStoppedExecution(
          current,
          purpose,
          durableBinding,
          keyHash,
          mutationDigest,
          action.action,
          providerResult
        );
      } else {
        current = await executePurpose(
          current,
          purpose,
          keyHash,
          mutationDigest,
          action.action,
          { providerResult }
        );
      }
      return { replayed: false, project: current };
    });
  }

  async function actOnRecovery(
    projectId: string,
    action: CreatorProjectActionInput & { action: "recover" },
    keyHash: string,
    mutationDigest: string
  ): Promise<CreatorProjectActionResult> {
    const prepared = await persistence.withProjectLock(projectId, async () => {
      let current = await persistence.readProject(projectId);
      assertIdempotencyMutationConsistency(current, keyHash, mutationDigest);
      const replay = findReplay(
        current,
        keyHash,
        mutationDigest,
        "recover"
      );
      if (replay) {
        return {
          completed: {
            replayed: true,
            project: await persistence.readProjectRevision(
              projectId,
              replay.resultingStateRevision
            ),
          },
          project: current,
          binding: null,
          purpose: null,
          originalKeyHash: null,
          originalMutationDigest: null,
          originalMutationKind: null,
        };
      }
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
        [...CREATOR_PROJECT_STATES]
      );
      reserveForAction(current, action.action, keyHash, mutationDigest);
      current = await recoverProject(current, keyHash, mutationDigest, {
        deferProviderExecution: true,
      });
      const completedRecord = findReplay(
        current,
        keyHash,
        mutationDigest,
        "recover"
      );
      if (completedRecord) {
        return {
          completed: { replayed: false, project: current },
          project: current,
          binding: null,
          purpose: null,
          originalKeyHash: null,
          originalMutationDigest: null,
          originalMutationKind: null,
        };
      }
      const pending = findPendingMutationIntent(current);
      if (
        !pending ||
        pending.eventType !== "execution.requested" ||
        pending.idempotencyKeyHash === null ||
        pending.mutationDigest === null
      ) {
        throw new CreatorServiceError(
          503,
          "execution_blocked",
          "Creator recovery did not reach an exact durable completion or execution intent."
        );
      }
      const binding = current.runBindings.find(
        (candidate) => candidate.sourceRunId === pending.sourceRunId
      );
      if (!binding?.executionIdempotencyKeyHash) {
        throw new CreatorServiceError(
          500,
          "record_corrupt",
          "Creator recovery is missing its exact durable execution binding."
        );
      }
      return {
        completed: null,
        project: current,
        binding,
        purpose: binding.purpose,
        originalKeyHash: pending.idempotencyKeyHash,
        originalMutationDigest: pending.mutationDigest,
        originalMutationKind: actionForPendingIntent(current, pending),
      };
    });
    if (prepared.completed) return prepared.completed;
    if (
      !prepared.binding ||
      !prepared.purpose ||
      !prepared.originalKeyHash ||
      !prepared.originalMutationDigest ||
      !prepared.originalMutationKind
    ) {
      throw new CreatorServiceError(
        500,
        "record_corrupt",
        "Creator recovery preparation lost its exact execution identity."
      );
    }
    const providerResult = await executeBoundLifecycle(
      prepared.project,
      prepared.purpose,
      prepared.binding,
      prepared.originalKeyHash
    );
    return persistence.withProjectLock(projectId, async () => {
      let current = await persistence.readProject(projectId);
      const replay = findReplay(
        current,
        keyHash,
        mutationDigest,
        "recover"
      );
      if (replay) {
        return {
          replayed: true,
          project: await persistence.readProjectRevision(
            projectId,
            replay.resultingStateRevision
          ),
        };
      }
      const durableBinding = current.runBindings.find(
        (candidate) => candidate.sourceRunId === prepared.binding?.sourceRunId
      );
      if (
        !durableBinding ||
        durableBinding.operationSlot !== prepared.binding.operationSlot ||
        durableBinding.executionIdempotencyKeyHash !==
          prepared.binding.executionIdempotencyKeyHash
      ) {
        throw new CreatorServiceError(
          409,
          "provider_binding_mismatch",
          "Creator recovery execution binding changed before exact reconciliation."
        );
      }
      if (current.status === "stopping") {
        current = await finalizeStoppedExecution(
          current,
          prepared.purpose,
          durableBinding,
          prepared.originalKeyHash,
          prepared.originalMutationDigest,
          prepared.originalMutationKind,
          providerResult
        );
        current = await recoverProject(current, keyHash, mutationDigest);
      } else {
        current = await recoverProject(current, keyHash, mutationDigest, {
          providerResult,
        });
      }
      return { replayed: false, project: current };
    });
  }

  return {
    async prepareProjectPlan(body, idempotencyKey) {
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
              throw new CreatorServiceError(
                409,
                "idempotency_conflict",
                "Idempotency-Key conflicts with a different creator request."
              );
            }
            assertIdempotencyMutationConsistency(
              current,
              keyHash,
              requestDigest
            );
            const replay = findReplay(
              current,
              keyHash,
              requestDigest,
              "prepare-plan"
            );
            if (replay) {
              return {
                replayed: true,
                project: await persistence.readProjectRevision(
                  projectId,
                  replay.resultingStateRevision
                ),
              };
            }
            if (current.status !== "draft") {
              throw new CreatorServiceError(
                409,
                "idempotency_conflict",
                "This creator identity is already bound to a different lifecycle entrypoint."
              );
            }
            assertDraftCreateContinuationAvailable(current);
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
              initialProviderResponseContractVersion: "server-owned-page-v1",
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
              revisionRequests: [],
              topologyRepair: null,
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
                    summary:
                      "A bounded static Website/Browser App v0 request was created.",
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

          const preparedAt = monotonicNow(current.updatedAt);
          const planBase = {
            planId: current.plan?.planId ?? makeId(12),
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
            preparedAt: current.plan?.preparedAt ?? preparedAt,
          };
          const plan = current.plan ?? {
            ...planBase,
            planDigest: hashCreatorCanonicalJson(planBase),
          };
          const awaitingPlanApproval = nextProject(current, {
            status: "awaiting_plan_approval",
            updates: { plan },
            events: [
              {
                eventType: "plan.prepared",
                actor: "system",
                summary:
                  "The exact bounded creator plan and destination were prepared for review without creating a provider run.",
              },
            ],
            idempotencyKeyHash: keyHash,
            mutationDigest: requestDigest,
            idempotency: {
              idempotencyKeyHash: keyHash,
              mutationKind: "prepare-plan",
              mutationDigest: requestDigest,
            },
            minimumOccurredAt: plan.preparedAt,
          });
          current = await persistNext(current, awaitingPlanApproval);
          return { replayed: false, project: current };
        });
      } catch (error) {
        throw mapServiceError(error);
      }
    },
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
              initialProviderResponseContractVersion: "server-owned-page-v1",
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
              revisionRequests: [],
              topologyRepair: null,
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

          const instruction = buildCreatorGenerationInstructionForResponseContract({
            responseContractVersion:
              current.initialProviderResponseContractVersion,
            projectTitle: current.identity.projectTitle,
            description: current.request.description,
          });
          assertInstructionBounded(instruction);
          let run: PrivateAlphaRunRecord;
          try {
            run = await bindExactInitialRun({
              projectId,
              purpose: "generation",
              operationSlot: "generation-initial",
              instruction,
            });
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
            operationSlot: "generation-initial",
            instruction,
            responseContractVersion: current.initialProviderResponseContractVersion,
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
    async getProjectRevision(projectId, stateRevision) {
      try {
        return await persistence.readProjectRevision(projectId, stateRevision);
      } catch (error) {
        throw mapServiceError(error);
      }
    },
    async getTopologyRepairEligibility(projectId) {
      try {
        return await persistence.withProjectLock(projectId, async () => {
          const project = await persistence.readProject(projectId);
          const issueCodes =
            project.validation?.issues.map((issue) => issue.code).sort() ?? [];
          if (
            project.status !== "rejected_output" ||
            project.failureCode !== "output_validation_failed" ||
            project.validation === null ||
            project.validation.valid ||
            hashCreatorCanonicalJson(issueCodes) !==
              hashCreatorCanonicalJson([
                "html.document_topology",
                "preview.not_ready",
              ]) ||
            project.artifactProposal !== null ||
            project.artifactProposalBinding?.purpose !== "generation" ||
            project.materializations.length !== 0 ||
            project.exportManifest !== null ||
            project.preview.status !== "inactive" ||
            project.topologyRepair !== null
          ) {
            return { eligible: false } as const;
          }
          const source = await readExactRetainedTopologySource(
            project,
            project.artifactProposalBinding.sourceRunId,
            null
          );
          const transformed =
            reprocessLegacyCreatorArtifactOutputWithServerOwnedTopology({
              rawOutput: source.outputText,
              expectedProjectTitle: project.identity.projectTitle,
            });
          if (!transformed.ok) return { eligible: false } as const;
          const validated = validateCreatorArtifactBundle({
            bundle: transformed.bundle,
            expectedProjectTitle: project.identity.projectTitle,
            completedAt: project.updatedAt,
          });
          if (!validated.bundle || !validated.validation.valid) {
            return { eligible: false } as const;
          }
          return {
            eligible: true,
            sourceRevision: project.stateRevision,
            sourceRunId: source.run.runId,
            sourceOutputSha256: source.outputSha256,
            sourceValidationIssueDigest: project.validation.issueDigest,
            providerRequests: 0,
            repairKind: "server-owned-document-topology",
            originalValidationState: "rejected_output",
            automaticRepair: false,
            operatorAuthorized: true,
          } as const;
        });
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
    async listProjectSummaries(limit) {
      try {
        return (await persistence.listProjects(limit)).map(buildProjectSummary);
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
        if (
          action.action === "execute-generation" ||
          action.action === "execute-repair" ||
          action.action === "execute-revision-generation"
        ) {
          return await actOnExecution(
            projectId,
            action as CreatorProjectActionInput & {
              action:
                | "execute-generation"
                | "execute-repair"
                | "execute-revision-generation";
            },
            keyHash,
            mutationDigest
          );
        }
        if (action.action === "recover") {
          return await actOnRecovery(
            projectId,
            action as CreatorProjectActionInput & { action: "recover" },
            keyHash,
            mutationDigest
          );
        }
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
            action.action === "approve-plan"
              ? ["awaiting_plan_approval"]
              : action.action === "approve-generation"
              ? ["awaiting_generation_approval"]
              : action.action === "approve-revision-plan"
                ? ["awaiting_revision_plan_approval"]
                : action.action === "approve-revision-generation"
                  ? ["awaiting_revision_generation_approval"]
              : action.action === "approve-repair"
                ? ["awaiting_repair_approval"]
                : action.action === "execute-generation"
              ? ["generating", "validating"]
              : action.action === "execute-repair"
                ? ["repairing", "validating"]
                : action.action === "request-repair"
                  ? ["repair_requested"]
                  : action.action === "repair-document-topology"
                    ? ["validating"]
                  : action.action === "recover"
                    ? [...CREATOR_PROJECT_STATES]
                  : action.action === "cancel"
                      ? [
                          "draft",
                          "awaiting_plan_approval",
                          "awaiting_generation_approval",
                          "approved",
                          "awaiting_revision_plan_approval",
                          "awaiting_revision_generation_approval",
                          "revision_generation_approved",
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
            case "approve-plan":
              current = await approveInitialPlan(
                current,
                keyHash,
                mutationDigest
              );
              break;
            case "approve-generation":
              current = await approvePurpose(current, "generation", keyHash, mutationDigest, action.action);
              break;
            case "request-revision":
              current = await requestExplicitRevision(
                current,
                action,
                keyHash,
                mutationDigest
              );
              break;
            case "approve-revision-plan":
              current = await approveExplicitRevisionPlan(
                current,
                keyHash,
                mutationDigest
              );
              break;
            case "approve-revision-generation":
              current = await approvePurpose(
                current,
                "revision",
                keyHash,
                mutationDigest,
                action.action
              );
              break;
            case "request-repair":
              current = await requestRepair(current, keyHash, mutationDigest, action.action);
              break;
            case "repair-document-topology":
              current = await repairDocumentTopology(
                current,
                action,
                keyHash,
                mutationDigest
              );
              break;
            case "approve-repair":
              current = await approvePurpose(current, "repair", keyHash, mutationDigest, action.action);
              break;
            case "stop-generation": {
              if (
                current.status !== "generating" &&
                current.status !== "revising" &&
                current.status !== "repairing"
              ) {
                throw new CreatorServiceError(
                  409,
                  "invalid_transition",
                  "Stop is available only while creator generation is in flight."
                );
              }
              const activeBinding = current.runBindings.find(
                (candidate) =>
                  candidate.sourceRunId ===
                  current.approvalPacket?.privateAlphaRunId
              );
              if (!activeBinding?.executionRequestedAt) {
                throw new CreatorServiceError(
                  500,
                  "record_corrupt",
                  "The in-flight creator generation is missing its execution intent."
                );
              }
              const stopping = nextProject(current, {
                status: "stopping",
                events: [
                  {
                    eventType: "generation.stop_requested",
                    actor: "local-operator",
                    summary:
                      "Stop won the creator project-state race; provider admission or late output reconciliation will now fail closed.",
                    sourceRunId: activeBinding.sourceRunId,
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
              current = await persistNext(current, stopping);
              break;
            }
            case "start-preview": {
              if (
                current.status !== "ready" ||
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
            case "restore-prior-publication": {
              if (
                !["rejected_output", "failed", "stopped"].includes(current.status) ||
                current.exportManifest === null ||
                current.materializations.length < 1
              ) {
                throw new CreatorServiceError(
                  409,
                  "invalid_transition",
                  "No preserved prior valid website revision is available to restore."
                );
              }
              const artifactRevision = current.exportManifest.artifactRevision;
              const latestMaterialization = current.materializations.at(-1) ?? null;
              const attemptedBinding = [...current.runBindings]
                .reverse()
                .find(
                  (binding) =>
                    (binding.purpose === "revision" || binding.purpose === "repair") &&
                    binding.sourceArtifactRevision === artifactRevision
                );
              if (
                latestMaterialization?.artifactRevision !== artifactRevision ||
                !attemptedBinding
              ) {
                throw new CreatorServiceError(
                  409,
                  "invalid_transition",
                  "Only a failed, rejected, or stopped later revision attempt can restore a preserved publication."
                );
              }
              const publication = await readCreatorMaterializationPublication({
                persistence,
                projectId,
                artifactRevision,
              });
              assertProjectPublicationBinding(current, publication, artifactRevision);
              const restored = nextProject(current, {
                status: "ready",
                updates: {
                  failureCode: null,
                  failureMessage: null,
                },
                events: [
                  {
                    eventType: "prior_publication.restored",
                    actor: "local-operator",
                    summary:
                      `The preserved validated artifact revision ${artifactRevision} was explicitly restored after the later attempt did not publish.`,
                    sourceRunId: publication.manifest.sourceRunId,
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
              });
              current = await persistNext(current, restored);
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
