import "server-only";

import { Buffer } from "node:buffer";
import { hashCreatorCanonicalJson, hashCreatorSha256, makeCreatorHexId, serializeCreatorCanonicalJson } from "./creator-crypto";
import {
  CreatorFilesystemError,
  CreatorOwnedFilesystem,
} from "./creator-filesystem.server";
import { validateCreatorArtifactPaths } from "./creator-path-policy";
import {
  assertCreatorJsonHasUniqueObjectKeys,
  buildCreatorGenerationInstruction,
  buildCreatorRepairInstruction,
  isValidCreatorProjectTitle,
  isSafeCreatorVisibleUnicode,
} from "./creator-contract.server";
import { buildCreatorValidationDigest } from "./creator-validation.server";
import { canTransitionCreatorProject } from "./creator-state-machine";
import {
  CREATOR_MAX_AUDIT_EVENTS,
  CREATOR_MAX_AUDIT_SUMMARY_LENGTH,
  CREATOR_MAX_IDEMPOTENCY_RECORDS,
  CREATOR_MAX_PROJECT_RECORDS,
  CREATOR_MAX_PROJECT_SLUG_LENGTH,
  CREATOR_PRODUCTION_DATA_ROOT_LABEL,
  CREATOR_FILE_POLICY,
  CREATOR_CAPABILITY_STATEMENT,
  CREATOR_LIMITATION_STATEMENT,
  CREATOR_ORDERED_PLAN_STEPS,
  buildCreatorDestinationBoundary,
  buildCreatorTestDataRootLabel,
} from "./creator-policy";
import {
  CREATOR_AUDIT_EVENT_TYPES,
  CREATOR_CONTRACT_VERSION,
  CREATOR_FAILURE_CODES,
  CREATOR_KINDS,
  CREATOR_MANIFEST_VERSION,
  CREATOR_MUTATION_KINDS,
  CREATOR_PROJECT_STATES,
  CREATOR_RECORD_VERSION,
  type CreatorAuditEventType,
  type CreatorFailureCode,
  type CreatorProjectState,
} from "./creator-types";

type StoredCreatorStateEnvelope = Readonly<{
  checksum: string;
  project: CreatorProjectState;
}>;

type CreatorLockOwner = Readonly<{
  nonce: string;
  processSessionNonce: string;
  processId: number;
  createdAt: string;
}>;

const PROCESS_SESSION_NONCE = makeCreatorHexId(16);
const recoverableLocalLockNonces = new Map<string, string>();
const inventoryAdmissionTails = new Map<string, Promise<void>>();
const CREATOR_TRANSITION_EVENT_SEQUENCES: Readonly<
  Record<string, readonly (readonly CreatorAuditEventType[])[]>
> = Object.freeze({
  "draft>draft": [["plan.prepared"], ["cancellation.requested"], ["recovery.requested"], ["recovery.completed"]],
  "draft>awaiting_generation_approval": [["run.bound"]],
  "draft>failed": [["failure.recorded"]],
  "draft>canceled": [
    ["creator.canceled"],
    ["run.bound", "creator.canceled"],
    ["run.bound", "approval.recorded", "creator.canceled"],
  ],
  "awaiting_generation_approval>awaiting_generation_approval": [
    ["approval.requested"],
    ["cancellation.requested"],
    ["recovery.requested"],
    ["recovery.completed"],
  ],
  "awaiting_generation_approval>approved": [["approval.recorded"]],
  "awaiting_generation_approval>failed": [["failure.recorded"]],
  "awaiting_generation_approval>canceled": [
    ["creator.canceled"],
    ["approval.recorded", "creator.canceled"],
  ],
  "approved>generating": [["execution.requested"]],
  "approved>approved": [["cancellation.requested"], ["recovery.requested"], ["recovery.completed"]],
  "approved>failed": [["failure.recorded"]],
  "approved>canceled": [["creator.canceled"]],
  "generating>validating": [["output.received", "validation.completed"]],
  "generating>generating": [["recovery.requested"], ["recovery.completed"]],
  "generating>rejected_output": [["output.received", "validation.completed", "output.rejected"]],
  "generating>failed": [["failure.recorded"]],
  "validating>rejected_output": [["output.rejected"]],
  "validating>validating": [["recovery.requested"], ["recovery.completed"]],
  "validating>ready": [
    ["revision.materialized", "export.manifest_created"],
    ["repair.result_accepted", "revision.materialized", "export.manifest_created"],
  ],
  "validating>failed": [
    ["failure.recorded"],
    ["repair.result_rejected", "failure.recorded"],
  ],
  "rejected_output>repair_requested": [["repair.requested"]],
  "rejected_output>rejected_output": [["recovery.requested"], ["recovery.completed"]],
  "rejected_output>canceled": [["creator.canceled"]],
  "ready>preview_available": [["preview.started"]],
  "ready>ready": [["recovery.requested"], ["recovery.completed"]],
  "ready>repair_requested": [["repair.requested"]],
  "ready>exported": [["export.requested"]],
  "ready>canceled": [["creator.canceled"]],
  "preview_available>ready": [["preview.stopped"]],
  "preview_available>preview_available": [["recovery.requested"], ["recovery.completed"]],
  "preview_available>canceled": [["preview.stopped", "creator.canceled"]],
  "repair_requested>awaiting_repair_approval": [["repair.run_bound"]],
  "repair_requested>repair_requested": [["cancellation.requested"], ["recovery.requested"], ["recovery.completed"]],
  "repair_requested>failed": [["failure.recorded"]],
  "repair_requested>canceled": [
    ["creator.canceled"],
    ["repair.run_bound", "creator.canceled"],
    ["repair.run_bound", "approval.recorded", "creator.canceled"],
  ],
  "awaiting_repair_approval>awaiting_repair_approval": [
    ["approval.requested"],
    ["cancellation.requested"],
    ["recovery.requested"],
    ["recovery.completed"],
  ],
  "awaiting_repair_approval>repair_approved": [["approval.recorded"]],
  "awaiting_repair_approval>failed": [
    ["failure.recorded"],
    ["repair.result_rejected", "failure.recorded"],
  ],
  "awaiting_repair_approval>canceled": [
    ["creator.canceled"],
    ["approval.recorded", "creator.canceled"],
  ],
  "repair_approved>repairing": [["execution.requested"]],
  "repair_approved>repair_approved": [["cancellation.requested"], ["recovery.requested"], ["recovery.completed"]],
  "repair_approved>failed": [["repair.result_rejected", "failure.recorded"]],
  "repair_approved>canceled": [["creator.canceled"]],
  "repairing>validating": [["output.received", "validation.completed"]],
  "repairing>repairing": [["recovery.requested"], ["recovery.completed"]],
  "repairing>failed": [
    ["repair.result_rejected", "failure.recorded"],
    ["output.received", "validation.completed", "repair.result_rejected", "failure.recorded"],
  ],
  "failed>failed": [["recovery.requested"], ["recovery.completed"]],
  "failed>canceled": [["creator.canceled"]],
  "failed>exported": [["export.requested"]],
  "canceled>canceled": [["recovery.requested"], ["recovery.completed"]],
  "exported>exported": [["recovery.requested"], ["recovery.completed"]],
});
const CREATOR_SOURCE_RUN_AUDIT_EVENTS = new Set([
  "run.bound",
  "approval.requested",
  "approval.recorded",
  "execution.requested",
  "output.received",
  "output.rejected",
  "validation.completed",
  "revision.materialized",
  "repair.run_bound",
  "repair.result_accepted",
  "repair.result_rejected",
  "export.manifest_created",
  "export.requested",
]);
const CREATOR_ARTIFACT_AUDIT_EVENTS = new Set([
  "revision.materialized",
  "repair.result_accepted",
  "export.manifest_created",
  "preview.started",
  "preview.stopped",
  "export.requested",
]);
const CREATOR_AUDIT_EVENT_ACTORS: Readonly<
  Record<CreatorAuditEventType, "local-operator" | "system">
> = Object.freeze({
  "request.created": "local-operator",
  "plan.prepared": "system",
  "run.bound": "system",
  "approval.requested": "local-operator",
  "approval.recorded": "local-operator",
  "cancellation.requested": "local-operator",
  "recovery.requested": "local-operator",
  "recovery.completed": "system",
  "execution.requested": "local-operator",
  "output.received": "system",
  "output.rejected": "system",
  "validation.completed": "system",
  "revision.materialized": "system",
  "preview.started": "local-operator",
  "preview.stopped": "local-operator",
  "repair.requested": "local-operator",
  "repair.run_bound": "system",
  "repair.result_accepted": "system",
  "repair.result_rejected": "system",
  "export.manifest_created": "system",
  "export.requested": "local-operator",
  "creator.canceled": "local-operator",
  "failure.recorded": "system",
});

export class CreatorPersistenceError extends Error {
  constructor(
    readonly status: 404 | 409 | 422 | 500 | 503,
    readonly code: CreatorFailureCode,
    message: string
  ) {
    super(message);
    this.name = "CreatorPersistenceError";
  }
}

function mapFilesystemError(error: unknown): CreatorPersistenceError {
  if (error instanceof CreatorPersistenceError) return error;
  if (error instanceof CreatorFilesystemError) {
    if (error.code === "not_found") return new CreatorPersistenceError(404, "not_found", "Creator project was not found.");
    if (error.code === "already_exists") return new CreatorPersistenceError(409, "revision_conflict", "Creator revision already exists.");
    if (error.code === "unsafe_creator_root") {
      return new CreatorPersistenceError(
        503,
        "unsafe_creator_root",
        "Secure creator storage is unavailable. Rebuild the bundled Windows filesystem helper and use an NTFS volume with transaction support."
      );
    }
    return new CreatorPersistenceError(422, "unsafe_artifact_path", "Creator storage rejected an unsafe path.");
  }
  return new CreatorPersistenceError(500, "internal_failure", "Creator persistence failed safely.");
}

function assertProjectId(projectId: string): void {
  if (!/^[a-f0-9]{24}$/.test(projectId)) {
    throw new CreatorPersistenceError(404, "not_found", "Creator project was not found.");
  }
}

function stateFileName(revision: number): string {
  if (!Number.isSafeInteger(revision) || revision < 1 || revision > 999_999) {
    throw new CreatorPersistenceError(422, "record_corrupt", "Creator state revision is invalid.");
  }
  return `${String(revision).padStart(6, "0")}.json`;
}

function isProcessAlive(owner: CreatorLockOwner): boolean {
  const processId = owner.processId;
  if (!Number.isSafeInteger(processId) || processId < 1) return false;
  if (processId === process.pid) return true;
  try {
    process.kill(processId, 0);
    return true;
  } catch (error) {
    return errorCode(error) !== "ESRCH";
  }
}

function errorCode(error: unknown): string | null {
  return typeof error === "object" && error !== null && "code" in error
    ? String((error as { code?: unknown }).code ?? "")
    : null;
}

function decodeLockOwner(source: Buffer): CreatorLockOwner | null {
  try {
    const serialized = source.toString("utf8");
    assertCreatorJsonHasUniqueObjectKeys(serialized);
    const parsed: unknown = JSON.parse(serialized);
    if (
      !isRecord(parsed) ||
      !hasExactKeys(parsed, ["nonce", "processSessionNonce", "processId", "createdAt"])
    ) {
      return null;
    }
    const value = parsed as Partial<CreatorLockOwner>;
    if (
      typeof value.nonce !== "string" ||
      !/^[a-f0-9]{32}$/.test(value.nonce) ||
      typeof value.processSessionNonce !== "string" ||
      !/^[a-f0-9]{32}$/.test(value.processSessionNonce) ||
      !Number.isSafeInteger(value.processId) ||
      Number(value.processId) < 1 ||
      !isIsoTimestamp(value.createdAt)
    ) {
      return null;
    }
    return value as CreatorLockOwner;
  } catch {
    return null;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasExactKeys(
  value: Record<string, unknown>,
  keys: readonly string[]
): boolean {
  const actual = Object.keys(value).sort();
  const expected = [...keys].sort();
  return actual.length === expected.length && actual.every((key, index) => key === expected[index]);
}

function hasOnlyKeys(
  value: Record<string, unknown>,
  allowed: readonly string[]
): boolean {
  return Object.keys(value).every((key) => allowed.includes(key));
}

function isIsoTimestamp(value: unknown): value is string {
  return (
    typeof value === "string" &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value) &&
    !Number.isNaN(Date.parse(value)) &&
    new Date(value).toISOString() === value
  );
}

function isBoundedString(value: unknown, maximum: number, allowEmpty = false): value is string {
  return typeof value === "string" && value.length <= maximum && (allowEmpty || value.length > 0);
}

function isHex(value: unknown, length: number): value is string {
  return typeof value === "string" && new RegExp(`^[a-f0-9]{${length}}$`).test(value);
}

function isRevision(value: unknown, allowZero = false): value is number {
  return Number.isSafeInteger(value) && Number(value) >= (allowZero ? 0 : 1) && Number(value) <= 999_999;
}

function isPrivateAlphaRunId(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{24}$/.test(value);
}

function isExactModelEnvelope(value: unknown): boolean {
  return isRecord(value) &&
    hasExactKeys(value, [
      "providerKey", "modelKey", "runtimeModel", "dataBoundary", "maximumOutputTokens",
      "fallback", "retry", "substitution", "paidExecution",
    ]) &&
    value.providerKey === "ollama-local" &&
    value.modelKey === "ollama-local::gpt-oss:20b" &&
    value.runtimeModel === "gpt-oss:20b" &&
    value.dataBoundary === "local-machine" &&
    value.maximumOutputTokens === 4096 &&
    value.fallback === "disabled" &&
    value.retry === "disabled" &&
    value.substitution === "disabled" &&
    value.paidExecution === "disabled";
}

function validatePersistedState(project: unknown, expectedProjectId: string): CreatorProjectState {
  if (!isRecord(project)) {
    throw new CreatorPersistenceError(500, "record_corrupt", "Creator record is malformed.");
  }
  if (!hasExactKeys(project, [
    "recordVersion", "stateRevision", "status", "createdAt", "updatedAt", "identity",
    "request", "plan", "approvalPacket", "runBindings", "artifactProposal",
    "artifactProposalBinding", "validation", "materializations", "preview", "repair",
    "exportManifest", "failureCode", "failureMessage", "auditEvents", "idempotencyRecords",
  ])) {
    throw new CreatorPersistenceError(500, "record_corrupt", "Creator record fields are not exact.");
  }
  const value = project as unknown as CreatorProjectState;
  if (
    value.recordVersion !== CREATOR_RECORD_VERSION ||
    !isRevision(value.stateRevision) ||
    !CREATOR_PROJECT_STATES.includes(value.status as never) ||
    !isIsoTimestamp(value.createdAt) ||
    !isIsoTimestamp(value.updatedAt) ||
    !isRecord(value.identity) ||
    !hasExactKeys(value.identity, ["projectId", "projectSlug", "projectTitle", "creatorKind"]) ||
    value.identity.projectId !== expectedProjectId ||
    !isBoundedString(value.identity.projectSlug, CREATOR_MAX_PROJECT_SLUG_LENGTH) ||
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.identity.projectSlug) ||
    !isBoundedString(value.identity.projectTitle, 80) ||
    !isValidCreatorProjectTitle(value.identity.projectTitle) ||
    !CREATOR_KINDS.includes(value.identity.creatorKind as never) ||
    !isRecord(value.request) ||
    !hasExactKeys(value.request, ["requestId", "creatorKind", "projectTitle", "description", "requestDigest", "createdAt"]) ||
    !isHex(value.request.requestId, 24) ||
    value.request.creatorKind !== value.identity.creatorKind ||
    value.request.projectTitle !== value.identity.projectTitle ||
    !isBoundedString(value.request.description, 2_000) ||
    !isSafeCreatorVisibleUnicode(value.request.description) ||
    !isHex(value.request.requestDigest, 64) ||
    !isIsoTimestamp(value.request.createdAt) ||
    !Array.isArray(value.auditEvents) ||
    value.auditEvents.length > CREATOR_MAX_AUDIT_EVENTS ||
    !Array.isArray(value.idempotencyRecords) ||
    value.idempotencyRecords.length > CREATOR_MAX_IDEMPOTENCY_RECORDS ||
    !Array.isArray(value.runBindings) ||
    value.runBindings.length > 2 ||
    !Array.isArray(value.materializations) ||
    value.materializations.length > 2
  ) {
    throw new CreatorPersistenceError(500, "record_corrupt", "Creator record failed bounded validation.");
  }
  if (
    value.request.requestDigest !== hashCreatorCanonicalJson({
      creatorKind: value.request.creatorKind,
      projectTitle: value.request.projectTitle,
      description: value.request.description,
    })
  ) {
    throw new CreatorPersistenceError(500, "record_corrupt", "Creator request provenance digest is inconsistent.");
  }

  if (value.plan !== null) {
    if (
      !isRecord(value.plan) ||
      !hasExactKeys(value.plan, [
        "planId", "planVersion", "project", "requestDigest", "contractVersion", "entrypoint",
        "destinationBoundary", "modelEnvelope", "filePolicy", "orderedSteps", "capabilityStatement",
        "limitationStatement", "preparedAt", "planDigest",
      ]) ||
      !isHex(value.plan.planId, 24) ||
      value.plan.planVersion !== 1 ||
      !isRecord(value.plan.project) ||
      !hasExactKeys(value.plan.project, ["projectId", "projectSlug", "projectTitle", "creatorKind"]) ||
      value.plan.project.projectId !== value.identity.projectId ||
      value.plan.project.projectSlug !== value.identity.projectSlug ||
      value.plan.project.projectTitle !== value.identity.projectTitle ||
      value.plan.project.creatorKind !== value.identity.creatorKind ||
      value.plan.requestDigest !== value.request.requestDigest ||
      value.plan.contractVersion !== CREATOR_CONTRACT_VERSION ||
      value.plan.entrypoint !== "index.html" ||
      value.plan.destinationBoundary !== buildCreatorDestinationBoundary(value.identity.projectId, 1) ||
      !isExactModelEnvelope(value.plan.modelEnvelope) ||
      !isRecord(value.plan.filePolicy) ||
      hashCreatorCanonicalJson(value.plan.filePolicy) !== hashCreatorCanonicalJson(CREATOR_FILE_POLICY) ||
      !Array.isArray(value.plan.orderedSteps) ||
      hashCreatorCanonicalJson(value.plan.orderedSteps) !== hashCreatorCanonicalJson(CREATOR_ORDERED_PLAN_STEPS) ||
      value.plan.capabilityStatement !== CREATOR_CAPABILITY_STATEMENT ||
      value.plan.limitationStatement !== CREATOR_LIMITATION_STATEMENT ||
      !isIsoTimestamp(value.plan.preparedAt) ||
      !isHex(value.plan.planDigest, 64)
    ) {
      throw new CreatorPersistenceError(500, "record_corrupt", "Creator plan record is malformed.");
    }
    const { planDigest, ...planWithoutDigest } = value.plan;
    if (hashCreatorCanonicalJson(planWithoutDigest) !== planDigest) {
      throw new CreatorPersistenceError(500, "record_corrupt", "Creator plan provenance digest is inconsistent.");
    }
  } else if (!["draft", "canceled"].includes(value.status)) {
    throw new CreatorPersistenceError(500, "record_corrupt", "Creator plan is missing outside draft state.");
  }

  if (value.approvalPacket !== null) {
    if (
      !isRecord(value.approvalPacket) ||
      !hasExactKeys(value.approvalPacket, [
        "purpose", "privateAlphaRunId", "privateAlphaRunRevision", "approvalScopeHash",
        "planDigest", "sourceArtifactRevision", "targetArtifactRevision", "destinationBoundary",
        "status", "modelEnvelope", "preparedAt", "approvedAt",
      ]) ||
      !["generation", "repair"].includes(value.approvalPacket.purpose) ||
      !isPrivateAlphaRunId(value.approvalPacket.privateAlphaRunId) ||
      !isRevision(value.approvalPacket.privateAlphaRunRevision) ||
      !isHex(value.approvalPacket.approvalScopeHash, 64) ||
      value.approvalPacket.planDigest !== value.plan?.planDigest ||
      (value.approvalPacket.sourceArtifactRevision !== null && !isRevision(value.approvalPacket.sourceArtifactRevision)) ||
      !isRevision(value.approvalPacket.targetArtifactRevision) ||
      !isBoundedString(value.approvalPacket.destinationBoundary, 180) ||
      !["awaiting", "approved", "canceled"].includes(value.approvalPacket.status) ||
      !isExactModelEnvelope(value.approvalPacket.modelEnvelope) ||
      !isIsoTimestamp(value.approvalPacket.preparedAt) ||
      (value.approvalPacket.approvedAt !== null && !isIsoTimestamp(value.approvalPacket.approvedAt))
    ) {
      throw new CreatorPersistenceError(500, "record_corrupt", "Creator approval record is malformed.");
    }
    const expectedTargetArtifactRevision = (value.approvalPacket.sourceArtifactRevision ?? 0) + 1;
    if (
      (value.approvalPacket.purpose === "generation" && value.approvalPacket.sourceArtifactRevision !== null) ||
      value.approvalPacket.targetArtifactRevision !== expectedTargetArtifactRevision ||
      expectedTargetArtifactRevision > 2 ||
      value.approvalPacket.destinationBoundary !== buildCreatorDestinationBoundary(value.identity.projectId, expectedTargetArtifactRevision)
    ) {
      throw new CreatorPersistenceError(500, "record_corrupt", "Creator approval destination is inconsistent with its exact source and target revisions.");
    }
  }

  const boundRunIds = new Set<string>();
  const boundPurposes = new Set<string>();
  for (const binding of value.runBindings) {
    if (
      !isRecord(binding) ||
      !hasExactKeys(binding, [
        "purpose", "sourceRunId", "ownershipBindingId", "sourceRunRevision", "approvalScopeHash", "providerKey",
        "modelKey", "runtimeModel", "dataBoundary", "maximumOutputTokens",
        "requestEnvelopeDigest", "sourceArtifactRevision", "boundAt", "approvalRecordedAt",
        "executionRequestedAt", "executionIdempotencyKeyHash", "outputReceivedAt", "executionAttempted",
      ]) ||
      typeof binding.purpose !== "string" ||
      !["generation", "repair"].includes(binding.purpose) ||
      !isPrivateAlphaRunId(binding.sourceRunId) ||
      !isHex(binding.ownershipBindingId, 32) ||
      !isRevision(binding.sourceRunRevision) ||
      !isHex(binding.approvalScopeHash, 64) ||
      binding.providerKey !== "ollama-local" ||
      binding.modelKey !== "ollama-local::gpt-oss:20b" ||
      binding.runtimeModel !== "gpt-oss:20b" ||
      binding.dataBoundary !== "local-machine" ||
      binding.maximumOutputTokens !== 4096 ||
      !isHex(binding.requestEnvelopeDigest, 64) ||
      (binding.sourceArtifactRevision !== null && !isRevision(binding.sourceArtifactRevision)) ||
      !isIsoTimestamp(binding.boundAt) ||
      (binding.approvalRecordedAt !== null && !isIsoTimestamp(binding.approvalRecordedAt)) ||
      (binding.executionRequestedAt !== null && !isIsoTimestamp(binding.executionRequestedAt)) ||
      (binding.executionIdempotencyKeyHash !== null &&
        !isHex(binding.executionIdempotencyKeyHash, 64)) ||
      (binding.outputReceivedAt !== null && !isIsoTimestamp(binding.outputReceivedAt)) ||
      typeof binding.executionAttempted !== "boolean" ||
      binding.executionAttempted !== (binding.executionRequestedAt !== null) ||
      binding.executionAttempted !==
        (binding.executionIdempotencyKeyHash !== null) ||
      (binding.outputReceivedAt !== null && !binding.executionAttempted) ||
      (binding.executionRequestedAt !== null &&
        binding.approvalRecordedAt === null) ||
      (binding.outputReceivedAt !== null &&
        (binding.executionRequestedAt === null ||
          binding.outputReceivedAt < binding.executionRequestedAt))
    ) {
      throw new CreatorPersistenceError(500, "record_corrupt", "Creator run binding failed exact model validation.");
    }
    if (boundRunIds.has(binding.sourceRunId) || boundPurposes.has(binding.purpose)) {
      throw new CreatorPersistenceError(500, "record_corrupt", "Creator run provenance contains duplicate bindings.");
    }
    boundRunIds.add(binding.sourceRunId);
    boundPurposes.add(binding.purpose);
  }
  const generationBinding = value.runBindings.find((binding) => binding.purpose === "generation") ?? null;
  const repairBinding = value.runBindings.find((binding) => binding.purpose === "repair") ?? null;
  const expectedGenerationRequestEnvelopeDigest = hashCreatorSha256(
    buildCreatorGenerationInstruction({
      projectTitle: value.identity.projectTitle,
      description: value.request.description,
    })
  );
  if (
    generationBinding !== null &&
    (generationBinding.sourceArtifactRevision !== null ||
      generationBinding.requestEnvelopeDigest !== expectedGenerationRequestEnvelopeDigest)
  ) {
    throw new CreatorPersistenceError(500, "record_corrupt", "Creator generation provenance is not bound to its exact request envelope.");
  }
  if (value.approvalPacket !== null) {
    const approvalPacket = value.approvalPacket;
    const packetBinding = value.runBindings.find(
      (binding) =>
        binding.sourceRunId === approvalPacket.privateAlphaRunId &&
        binding.purpose === approvalPacket.purpose
    );
    if (
      !packetBinding ||
      packetBinding.sourceRunRevision < approvalPacket.privateAlphaRunRevision ||
      packetBinding.approvalScopeHash !== approvalPacket.approvalScopeHash ||
      packetBinding.sourceArtifactRevision !== approvalPacket.sourceArtifactRevision ||
      packetBinding.boundAt !== approvalPacket.preparedAt ||
      packetBinding.approvalRecordedAt !== approvalPacket.approvedAt ||
      (approvalPacket.status === "awaiting" && approvalPacket.approvedAt !== null) ||
      (approvalPacket.status === "approved" && approvalPacket.approvedAt === null)
    ) {
      throw new CreatorPersistenceError(500, "record_corrupt", "Creator approval packet is not bound to its exact lifecycle run.");
    }
  }

  const auditIds = new Set<string>();
  const auditMutationDigests = new Map<string, string>();
  for (const event of value.auditEvents) {
    if (
      !isRecord(event) ||
      !hasExactKeys(event, [
        "eventId", "eventType", "occurredAt", "actor", "previousState", "resultingState",
        "stateRevision", "sourceRunId", "artifactRevision", "idempotencyKeyHash",
        "mutationDigest", "summary",
      ]) ||
      !isHex(event.eventId, 24) ||
      auditIds.has(event.eventId) ||
      !CREATOR_AUDIT_EVENT_TYPES.includes(event.eventType as never) ||
      !isIsoTimestamp(event.occurredAt) ||
      typeof event.actor !== "string" ||
      !["local-operator", "system"].includes(event.actor) ||
      (event.previousState !== null && !CREATOR_PROJECT_STATES.includes(event.previousState as never)) ||
      !CREATOR_PROJECT_STATES.includes(event.resultingState as never) ||
      !isRevision(event.stateRevision) ||
      event.stateRevision > value.stateRevision ||
      (event.sourceRunId !== null && !isPrivateAlphaRunId(event.sourceRunId)) ||
      (event.artifactRevision !== null && !isRevision(event.artifactRevision)) ||
      (event.idempotencyKeyHash !== null && !isHex(event.idempotencyKeyHash, 64)) ||
      (event.mutationDigest !== null && !isHex(event.mutationDigest, 64)) ||
      !isBoundedString(event.summary, CREATOR_MAX_AUDIT_SUMMARY_LENGTH)
    ) {
      throw new CreatorPersistenceError(500, "record_corrupt", "Creator audit record is malformed.");
    }
    if ((event.idempotencyKeyHash === null) !== (event.mutationDigest === null)) {
      throw new CreatorPersistenceError(500, "record_corrupt", "Creator audit idempotency binding is incomplete.");
    }
    if (
      (CREATOR_SOURCE_RUN_AUDIT_EVENTS.has(String(event.eventType)) &&
        (event.sourceRunId === null || !boundRunIds.has(event.sourceRunId))) ||
      (CREATOR_ARTIFACT_AUDIT_EVENTS.has(String(event.eventType)) &&
        (event.artifactRevision === null ||
          !value.materializations.some(
            (materialization) =>
              materialization.artifactRevision === event.artifactRevision
          )))
    ) {
      throw new CreatorPersistenceError(500, "record_corrupt", "Creator audit event is not bound to its exact run and artifact evidence.");
    }
    if (event.idempotencyKeyHash !== null && event.mutationDigest !== null) {
      const priorDigest = auditMutationDigests.get(event.idempotencyKeyHash);
      if (priorDigest !== undefined && priorDigest !== event.mutationDigest) {
        throw new CreatorPersistenceError(500, "record_corrupt", "Creator idempotency key is bound to multiple audit mutations.");
      }
      auditMutationDigests.set(event.idempotencyKeyHash, event.mutationDigest);
    }
    auditIds.add(event.eventId);
  }

  const idempotencyHashes = new Set<string>();
  for (const record of value.idempotencyRecords) {
    if (
      !isRecord(record) ||
      !hasExactKeys(record, ["idempotencyKeyHash", "mutationKind", "mutationDigest", "resultingStateRevision", "recordedAt"]) ||
      !isHex(record.idempotencyKeyHash, 64) ||
      idempotencyHashes.has(record.idempotencyKeyHash) ||
      (record.mutationKind !== "create" && !CREATOR_MUTATION_KINDS.includes(record.mutationKind as never)) ||
      !isHex(record.mutationDigest, 64) ||
      !isRevision(record.resultingStateRevision) ||
      record.resultingStateRevision > value.stateRevision ||
      !isIsoTimestamp(record.recordedAt)
    ) {
      throw new CreatorPersistenceError(500, "record_corrupt", "Creator idempotency record is malformed.");
    }
    const matchingAuditEvent = value.auditEvents.find(
      (event) =>
        event.idempotencyKeyHash === record.idempotencyKeyHash &&
        event.mutationDigest === record.mutationDigest &&
        event.stateRevision === record.resultingStateRevision &&
        event.occurredAt === record.recordedAt
    );
    if (
      auditMutationDigests.get(record.idempotencyKeyHash) !== record.mutationDigest ||
      !matchingAuditEvent
    ) {
      throw new CreatorPersistenceError(500, "record_corrupt", "Creator idempotency evidence is inconsistent with its audit mutation.");
    }
    idempotencyHashes.add(record.idempotencyKeyHash);
  }

  if (
    !isRecord(value.preview) ||
    !hasExactKeys(value.preview, ["status", "previewId", "artifactRevision", "startedAt", "stoppedAt"]) ||
    !["inactive", "active", "stopped"].includes(value.preview.status) ||
    (value.preview.previewId !== null && !isHex(value.preview.previewId, 32)) ||
    (value.preview.artifactRevision !== null && !isRevision(value.preview.artifactRevision)) ||
    (value.preview.startedAt !== null && !isIsoTimestamp(value.preview.startedAt)) ||
    (value.preview.stoppedAt !== null && !isIsoTimestamp(value.preview.stoppedAt)) ||
    (value.preview.status === "active" &&
      (value.preview.previewId === null || value.preview.artifactRevision === null || value.preview.startedAt === null))
  ) {
    throw new CreatorPersistenceError(500, "record_corrupt", "Creator preview record is malformed.");
  }
  const latestMaterializationRevision = value.materializations.at(-1)?.artifactRevision ?? null;
  const inactivePreviewShape =
    value.preview.status === "inactive" &&
    value.preview.previewId === null &&
    value.preview.startedAt === null &&
    value.preview.stoppedAt === null &&
    value.preview.artifactRevision === latestMaterializationRevision;
  const activePreviewShape =
    value.preview.status === "active" &&
    value.preview.previewId !== null &&
    value.preview.artifactRevision !== null &&
    value.preview.artifactRevision === latestMaterializationRevision &&
    value.preview.startedAt !== null &&
    value.preview.stoppedAt === null;
  const stoppedPreviewShape =
    value.preview.status === "stopped" &&
    value.preview.previewId !== null &&
    value.preview.artifactRevision !== null &&
    value.preview.artifactRevision === latestMaterializationRevision &&
    value.preview.startedAt !== null &&
    value.preview.stoppedAt !== null &&
    value.preview.stoppedAt >= value.preview.startedAt;
  if (
    (!inactivePreviewShape && !activePreviewShape && !stoppedPreviewShape) ||
    (value.status === "preview_available") !== activePreviewShape
  ) {
    throw new CreatorPersistenceError(500, "record_corrupt", "Creator preview state is inconsistent with its exact project and artifact revision.");
  }

  for (let index = 0; index < value.materializations.length; index += 1) {
    const materialization = value.materializations[index];
    if (
      !isRecord(materialization) ||
      !hasExactKeys(materialization, [
        "artifactRevision", "destinationLabel", "entrypoint", "files", "aggregateBytes",
        "aggregateDigest", "validationDigest", "materializedAt",
      ]) ||
      materialization.artifactRevision !== index + 1 ||
      materialization.destinationLabel !== `.codexforge/creator/projects/${expectedProjectId}/revisions/${String(index + 1).padStart(6, "0")}/files` ||
      materialization.entrypoint !== "index.html" ||
      !Array.isArray(materialization.files) ||
      materialization.files.length < 1 ||
      materialization.files.length > 12 ||
      typeof materialization.aggregateBytes !== "number" ||
      !Number.isSafeInteger(materialization.aggregateBytes) ||
      materialization.aggregateBytes < 1 ||
      materialization.aggregateBytes > 49_152 ||
      !isHex(materialization.aggregateDigest, 64) ||
      !isHex(materialization.validationDigest, 64) ||
      !isIsoTimestamp(materialization.materializedAt)
    ) {
      throw new CreatorPersistenceError(500, "record_corrupt", "Creator materialization record is malformed.");
    }
    for (const file of materialization.files) {
      if (
        !isRecord(file) ||
        !hasExactKeys(file, ["path", "mediaType", "byteLength", "sha256"]) ||
        !isBoundedString(file.path, 120) ||
        !isBoundedString(file.mediaType, 64) ||
        typeof file.byteLength !== "number" ||
        !Number.isSafeInteger(file.byteLength) ||
        file.byteLength < 0 ||
        file.byteLength > 24_576 ||
        !isHex(file.sha256, 64)
      ) {
        throw new CreatorPersistenceError(500, "record_corrupt", "Creator materialized file record is malformed.");
      }
    }
    const materializedBytes = materialization.files.reduce(
      (sum, file) => sum + file.byteLength,
      0
    );
    const materializedPathValidation = validateCreatorArtifactPaths(
      materialization.files.map((file) => ({
        path: file.path,
        mediaType: file.mediaType,
        content: "",
      }))
    );
    if (
      materializedBytes !== materialization.aggregateBytes ||
      hashCreatorCanonicalJson(materialization.files) !== materialization.aggregateDigest ||
      materializedPathValidation.issues.length > 0
    ) {
      throw new CreatorPersistenceError(500, "record_corrupt", "Creator materialization inventory is inconsistent.");
    }
  }

  if (value.artifactProposal !== null) {
    if (
      !isRecord(value.artifactProposal) ||
      !hasOnlyKeys(value.artifactProposal, ["contractVersion", "projectTitle", "creatorKind", "entrypoint", "files", "explanation"]) ||
      value.artifactProposal.contractVersion !== CREATOR_CONTRACT_VERSION ||
      value.artifactProposal.projectTitle !== value.identity.projectTitle ||
      value.artifactProposal.creatorKind !== value.identity.creatorKind ||
      value.artifactProposal.entrypoint !== "index.html" ||
      !Array.isArray(value.artifactProposal.files) ||
      value.artifactProposal.files.length < 1 ||
      value.artifactProposal.files.length > 12 ||
      (value.artifactProposal.explanation !== undefined && !isBoundedString(value.artifactProposal.explanation, 512, true))
    ) {
      throw new CreatorPersistenceError(500, "record_corrupt", "Creator artifact proposal record is malformed.");
    }
    let aggregateProposalBytes = 0;
    for (const file of value.artifactProposal.files) {
      if (
        !isRecord(file) ||
        !hasExactKeys(file, ["path", "mediaType", "content"]) ||
        !isBoundedString(file.path, CREATOR_FILE_POLICY.maximumRelativePathLength) ||
        !isBoundedString(file.mediaType, 64) ||
        typeof file.content !== "string" ||
        Buffer.byteLength(file.content, "utf8") > CREATOR_FILE_POLICY.maximumIndividualFileBytes
      ) {
        throw new CreatorPersistenceError(500, "record_corrupt", "Creator artifact file proposal is malformed.");
      }
      aggregateProposalBytes += Buffer.byteLength(file.content, "utf8");
    }
    if (aggregateProposalBytes > CREATOR_FILE_POLICY.maximumAggregateBytes) {
      throw new CreatorPersistenceError(500, "record_corrupt", "Creator artifact proposal exceeds its aggregate bound.");
    }
  }

  if (value.artifactProposalBinding !== null && (
    !isRecord(value.artifactProposalBinding) ||
    !hasExactKeys(value.artifactProposalBinding, ["purpose", "sourceRunId"]) ||
    !["generation", "repair"].includes(String(value.artifactProposalBinding.purpose)) ||
    !isPrivateAlphaRunId(value.artifactProposalBinding.sourceRunId)
  )) {
    throw new CreatorPersistenceError(500, "record_corrupt", "Creator artifact proposal binding is malformed.");
  }
  if (value.artifactProposalBinding !== null) {
    const artifactProposalBinding = value.artifactProposalBinding;
    const proposalRunBinding = value.runBindings.find(
      (binding) =>
        binding.sourceRunId === artifactProposalBinding.sourceRunId &&
        binding.purpose === artifactProposalBinding.purpose
    );
    if (
      !proposalRunBinding ||
      proposalRunBinding.outputReceivedAt === null ||
      value.validation === null
    ) {
      throw new CreatorPersistenceError(500, "record_corrupt", "Creator artifact proposal is not bound to an exact received lifecycle result.");
    }
  } else if (value.artifactProposal !== null || value.validation !== null) {
    throw new CreatorPersistenceError(500, "record_corrupt", "Creator artifact evidence is missing its lifecycle binding.");
  }

  if (value.repair !== null && (
    !isRecord(value.repair) ||
    !hasExactKeys(value.repair, [
      "attempt", "requestedAt", "sourceArtifactRevision", "validationIssueDigest",
      "issueCodes", "repairContextDigest",
    ]) ||
    value.repair.attempt !== 1 ||
    !isIsoTimestamp(value.repair.requestedAt) ||
    (value.repair.sourceArtifactRevision !== null && !isRevision(value.repair.sourceArtifactRevision)) ||
    !isHex(value.repair.validationIssueDigest, 64) ||
    !Array.isArray(value.repair.issueCodes) ||
    value.repair.issueCodes.length < 1 ||
    value.repair.issueCodes.length > 64 ||
    !value.repair.issueCodes.every((code) => isBoundedString(code, 80)) ||
    !isHex(value.repair.repairContextDigest, 64)
  )) {
    throw new CreatorPersistenceError(500, "record_corrupt", "Creator repair record is malformed.");
  }
  if (
    (value.repair === null && repairBinding !== null) ||
    (repairBinding !== null && value.repair !== null &&
      (repairBinding.sourceArtifactRevision !== value.repair.sourceArtifactRevision ||
        repairBinding.requestEnvelopeDigest !== value.repair.repairContextDigest)) ||
    (repairBinding !== null && value.approvalPacket?.purpose !== "repair") ||
    (value.approvalPacket?.purpose === "repair" && (
      value.repair === null ||
      value.approvalPacket.sourceArtifactRevision !== value.repair.sourceArtifactRevision
    ))
  ) {
    throw new CreatorPersistenceError(500, "record_corrupt", "Creator repair provenance is not bound to its exact source artifact revision.");
  }
  if (value.repair !== null) {
    const sourceArtifactRevision = value.repair.sourceArtifactRevision;
    const targetArtifactRevision = (sourceArtifactRevision ?? 0) + 1;
    const sourceExists = sourceArtifactRevision === null || value.materializations.some(
      (materialization) => materialization.artifactRevision === sourceArtifactRevision
    );
    const targetPublished = value.materializations.some(
      (materialization) => materialization.artifactRevision === targetArtifactRevision
    );
    const targetMaterializedEvents = repairBinding === null
      ? []
      : value.auditEvents.filter(
          (event) =>
            event.eventType === "revision.materialized" &&
            event.artifactRevision === targetArtifactRevision &&
            event.sourceRunId === repairBinding.sourceRunId
        );
    if (
      !sourceExists ||
      targetArtifactRevision > 2 ||
      value.materializations.length > targetArtifactRevision ||
      (sourceArtifactRevision === null && value.materializations.length > 1) ||
      (targetPublished && (repairBinding === null || targetMaterializedEvents.length !== 1))
    ) {
      throw new CreatorPersistenceError(500, "record_corrupt", "Creator repair publication is inconsistent with its approved source and target revisions.");
    }
    const repairRequestedEvents = value.auditEvents.filter(
      (event) => event.eventType === "repair.requested"
    );
    if (
      repairRequestedEvents.length !== 1 ||
      repairRequestedEvents[0].artifactRevision !== sourceArtifactRevision ||
      repairRequestedEvents[0].occurredAt < value.repair.requestedAt
    ) {
      throw new CreatorPersistenceError(500, "record_corrupt", "Creator repair request is missing its exact audit timestamp and artifact binding.");
    }
  }

  if (value.validation !== null) {
    if (
      !isRecord(value.validation) ||
      !hasExactKeys(value.validation, [
        "validationVersion", "valid", "completedAt", "stagesCompleted", "issues",
        "issueDigest", "bundleDigest", "manifestDigest",
      ]) ||
      value.validation.validationVersion !== 1 ||
      typeof value.validation.valid !== "boolean" ||
      !isIsoTimestamp(value.validation.completedAt) ||
      !Array.isArray(value.validation.stagesCompleted) ||
      value.validation.stagesCompleted.length > 10 ||
      !value.validation.stagesCompleted.every((stage) => Number.isSafeInteger(stage) && stage >= 1 && stage <= 10) ||
      !Array.isArray(value.validation.issues) ||
      value.validation.issues.length > 64 ||
      !isHex(value.validation.issueDigest, 64) ||
      (value.validation.bundleDigest !== null && !isHex(value.validation.bundleDigest, 64)) ||
      (value.validation.manifestDigest !== null && !isHex(value.validation.manifestDigest, 64))
    ) {
      throw new CreatorPersistenceError(500, "record_corrupt", "Creator validation record is malformed.");
    }
    for (const issue of value.validation.issues) {
      if (
        !isRecord(issue) ||
        !hasExactKeys(issue, [
          "code", "stage", "severity", "filePath", "message", "suggestedRepairContext",
          "blocksMaterialization",
        ]) ||
        !isBoundedString(issue.code, 80) ||
        !Number.isSafeInteger(issue.stage) ||
        Number(issue.stage) < 1 ||
        Number(issue.stage) > 10 ||
        !["error", "warning"].includes(String(issue.severity)) ||
        (issue.filePath !== null && !isBoundedString(issue.filePath, CREATOR_FILE_POLICY.maximumRelativePathLength)) ||
        !isBoundedString(issue.message, 512) ||
        !isBoundedString(issue.suggestedRepairContext, 512) ||
        typeof issue.blocksMaterialization !== "boolean" ||
        (issue.severity === "error") !== issue.blocksMaterialization
      ) {
        throw new CreatorPersistenceError(500, "record_corrupt", "Creator validation issue record is malformed.");
      }
    }
    const expectedIssueDigest = hashCreatorCanonicalJson(value.validation.issues);
    const expectedValid = !value.validation.issues.some(
      (issue) => issue.severity === "error" && issue.blocksMaterialization
    );
    const fullValidationStages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const hasFullValidationStages =
      hashCreatorCanonicalJson(value.validation.stagesCompleted) ===
      hashCreatorCanonicalJson(fullValidationStages);
    const hasContractOnlyStage =
      value.validation.stagesCompleted.length === 1 &&
      value.validation.stagesCompleted[0] === 1;
    const validationRunBinding = value.artifactProposalBinding === null
      ? null
      : value.runBindings.find(
          (binding) =>
            binding.sourceRunId === value.artifactProposalBinding?.sourceRunId &&
            binding.purpose === value.artifactProposalBinding?.purpose
        ) ?? null;
    if (
      value.validation.issueDigest !== expectedIssueDigest ||
      value.validation.valid !== expectedValid ||
      value.validation.valid !== (value.artifactProposal !== null) ||
      (value.validation.valid && !hasFullValidationStages) ||
      (!value.validation.valid && !hasContractOnlyStage && !hasFullValidationStages) ||
      value.validation.issues.some(
        (issue) => !value.validation?.stagesCompleted.includes(issue.stage)
      ) ||
      validationRunBinding === null ||
      validationRunBinding.outputReceivedAt !== value.validation.completedAt ||
      value.validation.stagesCompleted.some((stage, index, stages) =>
        index > 0 && stage <= stages[index - 1]
      )
    ) {
      throw new CreatorPersistenceError(500, "record_corrupt", "Creator validation provenance is inconsistent.");
    }
    if (value.artifactProposal === null) {
      if (value.validation.bundleDigest !== null || value.validation.manifestDigest !== null || value.validation.valid) {
        throw new CreatorPersistenceError(500, "record_corrupt", "Creator validation references a missing artifact proposal.");
      }
    } else {
      const expectedBundleDigest = hashCreatorCanonicalJson({
        contractVersion: value.artifactProposal.contractVersion,
        projectTitle: value.artifactProposal.projectTitle,
        creatorKind: value.artifactProposal.creatorKind,
        entrypoint: value.artifactProposal.entrypoint,
        files: value.artifactProposal.files,
        explanation: value.artifactProposal.explanation ?? null,
      });
      const validationFiles = value.artifactProposal.files.map((file) => ({
        path: file.path,
        mediaType: file.mediaType,
        byteLength: Buffer.byteLength(file.content, "utf8"),
        sha256: hashCreatorSha256(Buffer.from(file.content, "utf8")),
      }));
      const expectedManifestDigest = hashCreatorCanonicalJson({
        entrypoint: value.artifactProposal.entrypoint,
        files: validationFiles,
      });
      if (
        value.validation.bundleDigest !== expectedBundleDigest ||
        value.validation.manifestDigest !== expectedManifestDigest
      ) {
        throw new CreatorPersistenceError(500, "record_corrupt", "Creator artifact validation digests are inconsistent.");
      }
    }
  }

  if (
    value.repair !== null &&
    value.artifactProposalBinding?.purpose !== "repair"
  ) {
    const validation = value.validation;
    if (!validation) {
      throw new CreatorPersistenceError(500, "record_corrupt", "Creator repair context is missing its source validation result.");
    }
    const expectedIssueCodes = validation.issues.map((issue) => issue.code).slice(0, 64);
    const expectedRepairInstruction = buildCreatorRepairInstruction({
      projectTitle: value.identity.projectTitle,
      description: value.request.description,
      sourceArtifactRevision: value.repair.sourceArtifactRevision,
      issueDigest: validation.issueDigest,
      issues: validation.issues,
    });
    if (
      value.repair.validationIssueDigest !== validation.issueDigest ||
      hashCreatorCanonicalJson(value.repair.issueCodes) !==
        hashCreatorCanonicalJson(expectedIssueCodes) ||
      value.repair.repairContextDigest !== hashCreatorSha256(expectedRepairInstruction)
    ) {
      throw new CreatorPersistenceError(500, "record_corrupt", "Creator repair context does not match the exact bounded validation findings.");
    }
  }

  if (
    value.failureCode !== null &&
    !CREATOR_FAILURE_CODES.includes(value.failureCode as never)
  ) {
    throw new CreatorPersistenceError(500, "record_corrupt", "Creator failure code is malformed.");
  }
  if (value.failureMessage !== null && !isBoundedString(value.failureMessage, 512)) {
    throw new CreatorPersistenceError(500, "record_corrupt", "Creator failure message is malformed.");
  }
  if ((value.failureCode === null) !== (value.failureMessage === null)) {
    throw new CreatorPersistenceError(500, "record_corrupt", "Creator failure evidence is incomplete.");
  }
  if (
    (["failed", "rejected_output"].includes(value.status) && value.failureCode === null) ||
    (["ready", "preview_available"].includes(value.status) && value.failureCode !== null) ||
    (value.status === "failed" && value.approvalPacket?.status === "awaiting")
  ) {
    throw new CreatorPersistenceError(500, "record_corrupt", "Creator failure evidence is inconsistent with its project phase.");
  }
  if (value.exportManifest !== null) {
    const exportManifest = value.exportManifest;
    if (
      !isRecord(value.exportManifest) ||
      !hasExactKeys(value.exportManifest, [
        "manifestVersion", "creatorProjectId", "projectTitle", "creatorKind", "artifactRevision",
        "entrypoint", "files", "aggregateBytes", "aggregateDigest", "validationDigest",
        "sourceRequestDigest", "sourceRunId", "providerKey", "modelKey", "runtimeModel",
        "dataBoundary", "createdAt", "auditReferenceIds", "manifestDigest",
      ]) ||
      value.exportManifest.manifestVersion !== CREATOR_MANIFEST_VERSION ||
      value.exportManifest.creatorProjectId !== value.identity.projectId ||
      value.exportManifest.projectTitle !== value.identity.projectTitle ||
      value.exportManifest.creatorKind !== value.identity.creatorKind ||
      !isRevision(value.exportManifest.artifactRevision) ||
      value.exportManifest.entrypoint !== "index.html" ||
      !Array.isArray(value.exportManifest.files) ||
      value.exportManifest.files.length < 1 ||
      value.exportManifest.files.length > CREATOR_FILE_POLICY.maximumFileCount ||
      !Number.isSafeInteger(value.exportManifest.aggregateBytes) ||
      value.exportManifest.aggregateBytes < 1 ||
      value.exportManifest.aggregateBytes > CREATOR_FILE_POLICY.maximumAggregateBytes ||
      !isHex(value.exportManifest.aggregateDigest, 64) ||
      !isHex(value.exportManifest.validationDigest, 64) ||
      value.exportManifest.sourceRequestDigest !== value.request.requestDigest ||
      !isPrivateAlphaRunId(value.exportManifest.sourceRunId) ||
      value.exportManifest.providerKey !== "ollama-local" ||
      value.exportManifest.modelKey !== "ollama-local::gpt-oss:20b" ||
      value.exportManifest.runtimeModel !== "gpt-oss:20b" ||
      value.exportManifest.dataBoundary !== "local-machine" ||
      !isIsoTimestamp(value.exportManifest.createdAt) ||
      !Array.isArray(value.exportManifest.auditReferenceIds) ||
      value.exportManifest.auditReferenceIds.length > CREATOR_MAX_AUDIT_EVENTS ||
      !value.exportManifest.auditReferenceIds.every((eventId) => isHex(eventId, 24)) ||
      new Set(value.exportManifest.auditReferenceIds).size !== value.exportManifest.auditReferenceIds.length ||
      !isHex(value.exportManifest.manifestDigest, 64)
    ) {
      throw new CreatorPersistenceError(500, "record_corrupt", "Creator export manifest record is malformed.");
    }
    for (const file of value.exportManifest.files) {
      if (
        !isRecord(file) ||
        !hasExactKeys(file, ["path", "mediaType", "byteLength", "sha256"]) ||
        !isBoundedString(file.path, CREATOR_FILE_POLICY.maximumRelativePathLength) ||
        !isBoundedString(file.mediaType, 64) ||
        !Number.isSafeInteger(file.byteLength) ||
        Number(file.byteLength) < 0 ||
        Number(file.byteLength) > CREATOR_FILE_POLICY.maximumIndividualFileBytes ||
        !isHex(file.sha256, 64)
      ) {
        throw new CreatorPersistenceError(500, "record_corrupt", "Creator export inventory file is malformed.");
      }
    }
    const exportPathValidation = validateCreatorArtifactPaths(
      value.exportManifest.files.map((file) => ({
        path: file.path,
        mediaType: file.mediaType,
        content: "",
      }))
    );
    const matchingMaterialization = value.materializations.find(
      (candidate) => candidate.artifactRevision === exportManifest.artifactRevision
    );
    const matchingRunBinding = value.runBindings.find(
      (binding) => binding.sourceRunId === exportManifest.sourceRunId
    );
    const materializedEvents = value.auditEvents.filter(
      (event) =>
        event.eventType === "revision.materialized" &&
        event.artifactRevision === exportManifest.artifactRevision &&
        event.sourceRunId === exportManifest.sourceRunId
    );
    const manifestEvents = value.auditEvents.filter(
      (event) =>
        event.eventType === "export.manifest_created" &&
        event.artifactRevision === exportManifest.artifactRevision &&
        event.sourceRunId === exportManifest.sourceRunId
    );
    const materializedEvent = materializedEvents[0];
    const manifestEvent = manifestEvents[0];
    const expectedAuditReferenceIds = materializedEvent && manifestEvent
      ? [
          ...value.auditEvents
            .filter(
              (event) =>
                event.stateRevision < materializedEvent.stateRevision &&
                event.eventType !== "recovery.requested" &&
                event.eventType !== "recovery.completed"
            )
            .map((event) => event.eventId),
          materializedEvent.eventId,
          manifestEvent.eventId,
        ]
      : [];
    const manifestMatchesCurrentValidation =
      value.artifactProposalBinding?.sourceRunId !== value.exportManifest.sourceRunId ||
      (value.validation !== null &&
        value.validation.valid &&
        buildCreatorValidationDigest(value.validation) === value.exportManifest.validationDigest &&
        value.validation.manifestDigest === hashCreatorCanonicalJson({
          entrypoint: value.exportManifest.entrypoint,
          files: value.exportManifest.files,
        }));
    const { manifestDigest, ...manifestWithoutDigest } = value.exportManifest;
    if (
      !matchingMaterialization ||
      !matchingRunBinding ||
      matchingRunBinding.approvalRecordedAt === null ||
      matchingRunBinding.executionRequestedAt === null ||
      matchingRunBinding.outputReceivedAt === null ||
      !matchingRunBinding.executionAttempted ||
      materializedEvents.length !== 1 ||
      manifestEvents.length !== 1 ||
      exportPathValidation.issues.length > 0 ||
      hashCreatorCanonicalJson(value.exportManifest.files) !== hashCreatorCanonicalJson(matchingMaterialization.files) ||
      value.exportManifest.aggregateBytes !== matchingMaterialization.aggregateBytes ||
      value.exportManifest.aggregateDigest !== matchingMaterialization.aggregateDigest ||
      value.exportManifest.validationDigest !== matchingMaterialization.validationDigest ||
      value.exportManifest.createdAt !== matchingMaterialization.materializedAt ||
      !manifestMatchesCurrentValidation ||
      hashCreatorCanonicalJson(value.exportManifest.auditReferenceIds) !==
        hashCreatorCanonicalJson(expectedAuditReferenceIds) ||
      hashCreatorCanonicalJson(manifestWithoutDigest) !== manifestDigest
    ) {
      throw new CreatorPersistenceError(500, "record_corrupt", "Creator export provenance is inconsistent.");
    }
  } else if (value.materializations.length > 0) {
    throw new CreatorPersistenceError(500, "record_corrupt", "Creator materialization is missing its export manifest binding.");
  }
  if (
    ["ready", "preview_available", "exported"].includes(value.status) &&
    (value.materializations.length < 1 || value.exportManifest === null)
  ) {
    throw new CreatorPersistenceError(500, "record_corrupt", "Creator ready/exported state is missing its exact immutable publication.");
  }
  const packetMatches = (purpose: "generation" | "repair", status: "awaiting" | "approved") =>
    value.approvalPacket?.purpose === purpose && value.approvalPacket.status === status;
  const latestProposalPurpose = value.artifactProposalBinding?.purpose ?? null;
  const phaseApprovalMismatch =
    (value.status === "draft" &&
      (value.approvalPacket !== null || value.runBindings.length !== 0)) ||
    (value.status === "awaiting_generation_approval" &&
      !packetMatches("generation", "awaiting")) ||
    (["approved", "generating"].includes(value.status) &&
      !packetMatches("generation", "approved")) ||
    (value.status === "awaiting_repair_approval" &&
      !packetMatches("repair", "awaiting")) ||
    (["repair_approved", "repairing"].includes(value.status) &&
      !packetMatches("repair", "approved")) ||
    (["validating", "rejected_output", "ready", "preview_available", "repair_requested"].includes(value.status) &&
      (latestProposalPurpose === null ||
        !packetMatches(latestProposalPurpose, "approved")));
  const repairPhaseMissingRequest =
    [
      "repair_requested",
      "awaiting_repair_approval",
      "repair_approved",
      "repairing",
    ].includes(value.status) && value.repair === null;
  if (phaseApprovalMismatch || repairPhaseMissingRequest) {
    throw new CreatorPersistenceError(500, "record_corrupt", "Creator project phase is inconsistent with its exact approval packet.");
  }
  return project as CreatorProjectState;
}

function encodeStateEnvelope(project: CreatorProjectState): Buffer {
  const validated = validatePersistedState(project, project.identity.projectId);
  const checksum = hashCreatorCanonicalJson(validated);
  const envelope: StoredCreatorStateEnvelope = { checksum, project: validated };
  return Buffer.from(`${serializeCreatorCanonicalJson(envelope)}\n`, "utf8");
}

function assertCreatorRevisionContinuity(
  current: CreatorProjectState,
  next: CreatorProjectState
): void {
  const exact = (left: unknown, right: unknown) =>
    hashCreatorCanonicalJson(left) === hashCreatorCanonicalJson(right);
  const exactPrefix = (prior: readonly unknown[], candidate: readonly unknown[]) =>
    prior.length <= candidate.length &&
    prior.every((value, index) => exact(value, candidate[index]));
  if (
    (current.status !== next.status &&
      !canTransitionCreatorProject(current.status, next.status)) ||
    current.recordVersion !== next.recordVersion ||
    current.createdAt !== next.createdAt ||
    next.updatedAt < current.updatedAt ||
    !exact(current.identity, next.identity) ||
    !exact(current.request, next.request) ||
    (current.plan !== null && !exact(current.plan, next.plan)) ||
    (current.repair !== null && !exact(current.repair, next.repair)) ||
    !exactPrefix(current.auditEvents, next.auditEvents) ||
    !exactPrefix(current.idempotencyRecords, next.idempotencyRecords) ||
    !exactPrefix(current.materializations, next.materializations) ||
    next.auditEvents.length <= current.auditEvents.length
  ) {
    throw new CreatorPersistenceError(500, "record_corrupt", "Creator revision rewrites immutable or append-only history.");
  }
  const appendedEvents = next.auditEvents.slice(current.auditEvents.length);
  if (
    appendedEvents.some(
      (event) =>
        event.stateRevision !== next.stateRevision ||
        event.previousState !== current.status ||
        event.resultingState !== next.status ||
        event.occurredAt !== next.updatedAt
    ) ||
    next.idempotencyRecords
      .slice(current.idempotencyRecords.length)
      .some(
        (record) =>
          record.resultingStateRevision !== next.stateRevision ||
          record.recordedAt !== next.updatedAt
      )
  ) {
    throw new CreatorPersistenceError(500, "record_corrupt", "Creator revision evidence does not bind the exact state transition.");
  }
  const transitionKey = `${current.status}>${next.status}`;
  const permittedEventSequences = CREATOR_TRANSITION_EVENT_SEQUENCES[transitionKey] ?? [];
  const appendedEventTypes = appendedEvents.map((event) => event.eventType);
  if (
    permittedEventSequences.length < 1 ||
    !permittedEventSequences.some((sequence) => exact(sequence, appendedEventTypes))
  ) {
    throw new CreatorPersistenceError(500, "record_corrupt", "Creator transition does not have its exact audit event sequence.");
  }
  const capturesProviderOutput =
    ["generating", "repairing"].includes(current.status) &&
    appendedEventTypes.includes("output.received");
  if (
    !capturesProviderOutput &&
    (!exact(current.artifactProposal, next.artifactProposal) ||
      !exact(current.artifactProposalBinding, next.artifactProposalBinding) ||
      !exact(current.validation, next.validation))
  ) {
    throw new CreatorPersistenceError(500, "record_corrupt", "Creator proposal and validation evidence changed outside one exact provider-output capture transition.");
  }
  const planAdded = current.plan === null && next.plan !== null;
  const preparesPlan = appendedEventTypes.includes("plan.prepared");
  if (
    preparesPlan !== planAdded ||
    (planAdded &&
      (next.plan?.preparedAt < current.updatedAt ||
        next.plan.preparedAt > next.updatedAt))
  ) {
    throw new CreatorPersistenceError(500, "record_corrupt", "Creator plan preparation is not bound to its one exact draft revision.");
  }
  const materializationDelta = next.materializations.length - current.materializations.length;
  const publishesRevision = transitionKey === "validating>ready";
  if (
    materializationDelta !== (publishesRevision ? 1 : 0) ||
    (next.repair === null && next.materializations.length > 1)
  ) {
    throw new CreatorPersistenceError(500, "record_corrupt", "Creator materialization history changed outside one exact publication transition.");
  }
  if (publishesRevision) {
    const published = next.materializations.at(-1);
    const materializedEvent = appendedEvents.find(
      (event) => event.eventType === "revision.materialized"
    );
    const manifestEvent = appendedEvents.find(
      (event) => event.eventType === "export.manifest_created"
    );
    if (
      !published ||
      !materializedEvent ||
      !manifestEvent ||
      materializedEvent.artifactRevision !== published.artifactRevision ||
      manifestEvent.artifactRevision !== published.artifactRevision ||
      materializedEvent.sourceRunId !== manifestEvent.sourceRunId ||
      next.exportManifest?.artifactRevision !== published.artifactRevision ||
      next.exportManifest.sourceRunId !== materializedEvent.sourceRunId
    ) {
      throw new CreatorPersistenceError(500, "record_corrupt", "Creator publication events do not bind the one appended artifact revision.");
    }
  }
  const idempotencyDelta =
    next.idempotencyRecords.length - current.idempotencyRecords.length;
  const completesRecovery =
    appendedEventTypes.length === 1 &&
    appendedEventTypes[0] === "recovery.completed";
  const idempotentCompletionTransitions = new Set([
    "draft>awaiting_generation_approval",
    "awaiting_generation_approval>approved",
    "generating>rejected_output",
    "generating>failed",
    "validating>rejected_output",
    "validating>ready",
    "validating>failed",
    "ready>preview_available",
    "preview_available>ready",
    "repair_requested>awaiting_repair_approval",
    "repair_requested>failed",
    "awaiting_repair_approval>repair_approved",
    "repairing>failed",
    "ready>exported",
    "failed>exported",
    "draft>canceled",
    "awaiting_generation_approval>canceled",
    "approved>canceled",
    "rejected_output>canceled",
    "ready>canceled",
    "preview_available>canceled",
    "repair_requested>canceled",
    "awaiting_repair_approval>canceled",
    "repair_approved>canceled",
    "failed>canceled",
  ]);
  const expectedIdempotencyDelta =
    idempotentCompletionTransitions.has(transitionKey) || completesRecovery
      ? 1
      : 0;
  if (idempotencyDelta !== expectedIdempotencyDelta) {
    throw new CreatorPersistenceError(500, "record_corrupt", "Creator revision appended an invalid number of idempotency records.");
  }
  if (idempotencyDelta === 1) {
    const record = next.idempotencyRecords.at(-1);
    const expectedMutationKinds: Readonly<Record<string, readonly string[]>> = {
      "draft>awaiting_generation_approval": ["create"],
      "awaiting_generation_approval>approved": ["approve-generation"],
      "generating>rejected_output": ["execute-generation"],
      "generating>failed": ["execute-generation"],
      "validating>rejected_output": ["execute-generation"],
      "validating>ready": [
        next.artifactProposalBinding?.purpose === "repair"
          ? "execute-repair"
          : "execute-generation",
      ],
      "validating>failed": [
        next.artifactProposalBinding?.purpose === "repair"
          ? "execute-repair"
          : "execute-generation",
      ],
      "ready>preview_available": ["start-preview"],
      "preview_available>ready": ["stop-preview"],
      "rejected_output>repair_requested": [],
      "ready>repair_requested": [],
      "repair_requested>awaiting_repair_approval": ["request-repair"],
      "repair_requested>failed": ["request-repair"],
      "awaiting_repair_approval>repair_approved": ["approve-repair"],
      "repairing>failed": ["execute-repair"],
      "ready>exported": ["export"],
      "failed>exported": ["export"],
      "draft>canceled": ["cancel"],
      "awaiting_generation_approval>canceled": ["cancel"],
      "approved>canceled": ["cancel"],
      "rejected_output>canceled": ["cancel"],
      "ready>canceled": ["cancel"],
      "preview_available>canceled": ["cancel"],
      "repair_requested>canceled": ["cancel"],
      "awaiting_repair_approval>canceled": ["cancel"],
      "repair_approved>canceled": ["cancel"],
      "failed>canceled": ["cancel"],
    };
    const allowedMutationKinds = completesRecovery
      ? ["recover"]
      : expectedMutationKinds[transitionKey] ?? [];
    if (!record || !allowedMutationKinds.includes(record.mutationKind)) {
      throw new CreatorPersistenceError(500, "record_corrupt", "Creator idempotency record does not match the exact completed mutation.");
    }
  }
  const runBindingDelta = next.runBindings.length - current.runBindings.length;
  const bindsRun =
    transitionKey === "draft>awaiting_generation_approval" ||
    transitionKey === "repair_requested>awaiting_repair_approval";
  const bindsRunDuringCancellation =
    runBindingDelta === 1 &&
    (transitionKey === "draft>canceled" || transitionKey === "repair_requested>canceled");
  if (runBindingDelta !== (bindsRun || bindsRunDuringCancellation ? 1 : 0)) {
    throw new CreatorPersistenceError(500, "record_corrupt", "Creator revision removed a bound source run.");
  }
  if (bindsRun) {
    const binding = next.runBindings.at(-1);
    const packet = next.approvalPacket;
    const runEvent = appendedEvents[0];
    const expectedPurpose = transitionKey.startsWith("draft>") ? "generation" : "repair";
    if (
      !binding ||
      !packet ||
      binding.purpose !== expectedPurpose ||
      binding.sourceRunRevision !== 1 ||
      binding.boundAt < current.updatedAt ||
      binding.boundAt > next.updatedAt ||
      binding.approvalRecordedAt !== null ||
      binding.executionRequestedAt !== null ||
      binding.executionIdempotencyKeyHash !== null ||
      binding.outputReceivedAt !== null ||
      binding.executionAttempted ||
      runEvent.sourceRunId !== binding.sourceRunId ||
      packet.privateAlphaRunId !== binding.sourceRunId ||
      packet.privateAlphaRunRevision !== binding.sourceRunRevision ||
      packet.preparedAt !== binding.boundAt ||
      packet.status !== "awaiting" ||
      packet.approvedAt !== null ||
      (expectedPurpose === "repair" &&
        (next.repair === null ||
          binding.sourceArtifactRevision !== next.repair.sourceArtifactRevision ||
          runEvent.artifactRevision !== next.repair.sourceArtifactRevision))
    ) {
      throw new CreatorPersistenceError(500, "record_corrupt", "Creator run binding was not appended with its exact initial lifecycle evidence.");
    }
  }
  if (bindsRunDuringCancellation) {
    const binding = next.runBindings.at(-1);
    const packet = next.approvalPacket;
    const runEvent = appendedEvents[0];
    const expectedPurpose = transitionKey.startsWith("draft>") ? "generation" : "repair";
    const expectedRunEvent = expectedPurpose === "generation" ? "run.bound" : "repair.run_bound";
    const hasReconciledApproval = binding?.approvalRecordedAt != null;
    if (
      !binding ||
      !packet ||
      binding.purpose !== expectedPurpose ||
      binding.sourceRunRevision !== (hasReconciledApproval ? 3 : 2) ||
      binding.boundAt < current.createdAt ||
      binding.boundAt > next.updatedAt ||
      binding.executionRequestedAt !== null ||
      binding.executionIdempotencyKeyHash !== null ||
      binding.outputReceivedAt !== null ||
      binding.executionAttempted ||
      runEvent.eventType !== expectedRunEvent ||
      runEvent.sourceRunId !== binding.sourceRunId ||
      packet.privateAlphaRunId !== binding.sourceRunId ||
      packet.privateAlphaRunRevision !== binding.sourceRunRevision ||
      packet.preparedAt !== binding.boundAt ||
      packet.status !== "canceled" ||
      packet.approvedAt !== binding.approvalRecordedAt ||
      (expectedPurpose === "repair" &&
        (next.repair === null ||
          binding.sourceArtifactRevision !== next.repair.sourceArtifactRevision ||
          runEvent.artifactRevision !== next.repair.sourceArtifactRevision)) ||
      (expectedPurpose === "generation" &&
        (binding.sourceArtifactRevision !== null || runEvent.artifactRevision !== null))
    ) {
      throw new CreatorPersistenceError(500, "record_corrupt", "Creator cancellation did not reconcile one exact latent source-run binding.");
    }
  }
  const approvalTransition =
    transitionKey === "awaiting_generation_approval>approved" ||
    transitionKey === "awaiting_repair_approval>repair_approved";
  const activeRunCancellation =
    next.status === "canceled" &&
    [
      "awaiting_generation_approval",
      "approved",
      "awaiting_repair_approval",
      "repair_approved",
    ].includes(current.status);
  const approvalPacketWithoutMilestones = (packet: CreatorProjectState["approvalPacket"]) =>
    packet === null
      ? null
      : {
          purpose: packet.purpose,
          privateAlphaRunId: packet.privateAlphaRunId,
          approvalScopeHash: packet.approvalScopeHash,
          planDigest: packet.planDigest,
          sourceArtifactRevision: packet.sourceArtifactRevision,
          targetArtifactRevision: packet.targetArtifactRevision,
          destinationBoundary: packet.destinationBoundary,
          modelEnvelope: packet.modelEnvelope,
          preparedAt: packet.preparedAt,
        };
  if (
    !bindsRun &&
    !bindsRunDuringCancellation &&
    !approvalTransition &&
    !activeRunCancellation &&
    !exact(current.approvalPacket, next.approvalPacket)
  ) {
    throw new CreatorPersistenceError(500, "record_corrupt", "Creator approval packet changed outside its exact bind, approval, or pre-execution cancellation transition.");
  }
  if (
    (approvalTransition || activeRunCancellation) &&
    (!current.approvalPacket ||
      !next.approvalPacket ||
      !exact(
        approvalPacketWithoutMilestones(current.approvalPacket),
        approvalPacketWithoutMilestones(next.approvalPacket)
      ) ||
      (approvalTransition && next.approvalPacket.status !== "approved") ||
      (activeRunCancellation && next.approvalPacket.status !== "canceled"))
  ) {
    throw new CreatorPersistenceError(500, "record_corrupt", "Creator approval packet milestone does not match the exact active lifecycle transition.");
  }
  const failureEvidenceMayChange =
    next.status === "failed" ||
    next.status === "rejected_output" ||
    transitionKey === "validating>ready";
  if (
    (!failureEvidenceMayChange &&
      (current.failureCode !== next.failureCode ||
        current.failureMessage !== next.failureMessage)) ||
    (transitionKey === "validating>ready" &&
      (next.failureCode !== null || next.failureMessage !== null))
  ) {
    throw new CreatorPersistenceError(500, "record_corrupt", "Creator failure evidence changed outside its exact rejection, failure, or successful recovery transition.");
  }
  if (
    transitionKey === "rejected_output>repair_requested" ||
    transitionKey === "ready>repair_requested"
  ) {
    const repair = next.repair;
    const validation = current.validation;
    const repairEvent = appendedEvents[0];
    if (!repair || !validation) {
      throw new CreatorPersistenceError(500, "record_corrupt", "Creator repair request is missing its exact validation evidence.");
    }
    const expectedIssueCodes = validation.issues.map((issue) => issue.code).slice(0, 64);
    const expectedRepairInstruction = buildCreatorRepairInstruction({
      projectTitle: current.identity.projectTitle,
      description: current.request.description,
      sourceArtifactRevision: repair.sourceArtifactRevision,
      issueDigest: validation.issueDigest,
      issues: validation.issues,
    });
    if (
      repair.requestedAt < current.updatedAt ||
      repair.requestedAt > next.updatedAt ||
      repair.validationIssueDigest !== validation.issueDigest ||
      !exact(repair.issueCodes, expectedIssueCodes) ||
      repair.repairContextDigest !== hashCreatorSha256(expectedRepairInstruction) ||
      repair.sourceArtifactRevision !==
        (current.materializations.at(-1)?.artifactRevision ?? null) ||
      repairEvent.artifactRevision !== repair.sourceArtifactRevision
    ) {
      throw new CreatorPersistenceError(500, "record_corrupt", "Creator repair request does not match its exact bounded validation context.");
    }
  }
  const activeMutationSourceRunId = (() => {
    if (bindsRunDuringCancellation) {
      return next.approvalPacket?.privateAlphaRunId ?? null;
    }
    if ([
      "awaiting_generation_approval",
      "approved",
      "generating",
      "awaiting_repair_approval",
      "repair_approved",
      "repairing",
    ].includes(current.status)) {
      return current.approvalPacket?.privateAlphaRunId ?? null;
    }
    if (current.status === "validating") {
      return current.artifactProposalBinding?.sourceRunId ?? null;
    }
    return null;
  })();
  const expectedPublishedRevision = publishesRevision
    ? next.materializations.at(-1)?.artifactRevision ?? null
    : null;
  const hasCompletedIntent = (
    project: CreatorProjectState,
    event: CreatorProjectState["auditEvents"][number]
  ) =>
    event.idempotencyKeyHash !== null &&
    event.mutationDigest !== null &&
    project.idempotencyRecords.some(
      (record) =>
        record.idempotencyKeyHash === event.idempotencyKeyHash &&
        record.mutationDigest === event.mutationDigest
    );
  const originalIntentTypes = new Set<CreatorAuditEventType>([
    "approval.requested",
    "execution.requested",
    "repair.requested",
    "cancellation.requested",
  ]);
  const originalIntentAppliesToCurrentState = (
    event: CreatorProjectState["auditEvents"][number]
  ): boolean => {
    if (event.eventType === "approval.requested") {
      return ["awaiting_generation_approval", "awaiting_repair_approval"].includes(current.status);
    }
    if (event.eventType === "execution.requested") {
      return ["generating", "repairing", "validating"].includes(current.status);
    }
    if (event.eventType === "repair.requested") return current.status === "repair_requested";
    if (event.eventType === "cancellation.requested") {
      return [
        "draft",
        "awaiting_generation_approval",
        "approved",
        "repair_requested",
        "awaiting_repair_approval",
        "repair_approved",
      ].includes(current.status);
    }
    return false;
  };
  const pendingOriginalIntent = [...current.auditEvents]
    .reverse()
    .find(
      (event) =>
        originalIntentTypes.has(event.eventType) &&
        originalIntentAppliesToCurrentState(event) &&
        !hasCompletedIntent(current, event)
    ) ?? null;
  const pendingRecoveryIntent = [...current.auditEvents]
    .reverse()
    .find(
      (event) =>
        event.eventType === "recovery.requested" &&
        !hasCompletedIntent(current, event)
    ) ?? null;
  const expectedCancellationIntentSourceRunId =
    current.status === "draft" ||
    (current.status === "repair_requested" && current.approvalPacket?.purpose !== "repair")
      ? null
      : current.approvalPacket?.privateAlphaRunId ?? null;
  const recoveryIntentIndex = pendingRecoveryIntent
    ? current.auditEvents.findIndex(
        (event) => event.eventId === pendingRecoveryIntent.eventId
      )
    : -1;
  const recoveredOriginalIntent = pendingRecoveryIntent
    ? [...current.auditEvents.slice(0, recoveryIntentIndex)]
        .reverse()
        .find(
          (event) =>
            originalIntentTypes.has(event.eventType) &&
            event.sourceRunId === pendingRecoveryIntent.sourceRunId
        ) ?? null
    : null;
  for (const event of appendedEvents) {
    const sourceBinding = event.sourceRunId === null
      ? null
      : next.runBindings.find((binding) => binding.sourceRunId === event.sourceRunId) ?? null;
    const exactActor = event.actor === CREATOR_AUDIT_EVENT_ACTORS[event.eventType];
    const noSource = event.sourceRunId === null;
    const noArtifact = event.artifactRevision === null;
    const eventIsSemanticallyBound =
      exactActor && (
      (event.eventType === "plan.prepared" && noSource && noArtifact && next.plan !== null) ||
      (event.eventType === "run.bound" &&
        noArtifact &&
        sourceBinding?.purpose === "generation" &&
        event.sourceRunId === next.runBindings.at(-1)?.sourceRunId) ||
      (event.eventType === "repair.run_bound" &&
        sourceBinding?.purpose === "repair" &&
        event.sourceRunId === next.runBindings.at(-1)?.sourceRunId &&
        event.artifactRevision === sourceBinding.sourceArtifactRevision) ||
      (event.eventType === "approval.requested" &&
        noArtifact &&
        sourceBinding !== null &&
        event.sourceRunId === activeMutationSourceRunId &&
        sourceBinding.approvalRecordedAt === null &&
        next.approvalPacket?.privateAlphaRunId === event.sourceRunId &&
        next.approvalPacket.status === "awaiting") ||
      (event.eventType === "cancellation.requested" &&
        next.status === current.status &&
        [
          "draft",
          "awaiting_generation_approval",
          "approved",
          "repair_requested",
          "awaiting_repair_approval",
          "repair_approved",
        ].includes(current.status) &&
        event.sourceRunId === expectedCancellationIntentSourceRunId &&
        event.artifactRevision ===
          (current.materializations.at(-1)?.artifactRevision ?? null)) ||
      (event.eventType === "recovery.requested" &&
        noArtifact &&
        pendingOriginalIntent !== null &&
        event.sourceRunId === pendingOriginalIntent.sourceRunId &&
        event.idempotencyKeyHash !== pendingOriginalIntent.idempotencyKeyHash) ||
      (event.eventType === "recovery.completed" &&
        noArtifact &&
        pendingRecoveryIntent !== null &&
        recoveredOriginalIntent !== null &&
        event.sourceRunId === pendingRecoveryIntent.sourceRunId &&
        event.idempotencyKeyHash === pendingRecoveryIntent.idempotencyKeyHash &&
        event.mutationDigest === pendingRecoveryIntent.mutationDigest &&
        hasCompletedIntent(next, pendingRecoveryIntent) &&
        hasCompletedIntent(next, recoveredOriginalIntent)) ||
      (event.eventType === "approval.recorded" &&
        noArtifact &&
        sourceBinding !== null &&
        event.sourceRunId === activeMutationSourceRunId &&
        sourceBinding.approvalRecordedAt !== null &&
        next.approvalPacket?.privateAlphaRunId === event.sourceRunId &&
        (next.approvalPacket.status === "approved" ||
          (next.status === "canceled" && next.approvalPacket.status === "canceled"))) ||
      (event.eventType === "execution.requested" &&
        noArtifact &&
        sourceBinding !== null &&
        event.sourceRunId === activeMutationSourceRunId &&
        sourceBinding.executionRequestedAt !== null &&
        sourceBinding.executionIdempotencyKeyHash !== null &&
        sourceBinding.executionAttempted) ||
      (event.eventType === "output.received" &&
        noArtifact &&
        sourceBinding !== null &&
        event.sourceRunId === activeMutationSourceRunId &&
        sourceBinding.outputReceivedAt !== null &&
        next.artifactProposalBinding?.sourceRunId === event.sourceRunId &&
        next.validation !== null) ||
      (event.eventType === "validation.completed" &&
        noArtifact &&
        event.sourceRunId === activeMutationSourceRunId &&
        sourceBinding?.outputReceivedAt === next.validation?.completedAt &&
        next.artifactProposalBinding?.sourceRunId === event.sourceRunId) ||
      (event.eventType === "output.rejected" &&
        noArtifact &&
        event.sourceRunId === activeMutationSourceRunId &&
        sourceBinding?.purpose === "generation" &&
        next.validation?.valid === false &&
        next.failureCode !== null) ||
      (event.eventType === "repair.requested" &&
        noSource &&
        next.repair !== null &&
        event.artifactRevision === next.repair.sourceArtifactRevision) ||
      (event.eventType === "repair.result_rejected" &&
        noArtifact &&
        event.sourceRunId === activeMutationSourceRunId &&
        sourceBinding?.purpose === "repair" &&
        next.failureCode !== null) ||
      (event.eventType === "repair.result_accepted" &&
        sourceBinding?.purpose === "repair" &&
        event.sourceRunId === activeMutationSourceRunId &&
        event.artifactRevision === expectedPublishedRevision &&
        event.artifactRevision === (sourceBinding.sourceArtifactRevision ?? 0) + 1 &&
        next.validation?.valid === true) ||
      (event.eventType === "revision.materialized" &&
        sourceBinding !== null &&
        event.sourceRunId === activeMutationSourceRunId &&
        event.artifactRevision === expectedPublishedRevision) ||
      (event.eventType === "export.manifest_created" &&
        next.exportManifest?.artifactRevision === event.artifactRevision &&
        next.exportManifest.sourceRunId === event.sourceRunId) ||
      (event.eventType === "preview.started" &&
        noSource &&
        next.preview.status === "active" &&
        next.preview.artifactRevision === event.artifactRevision) ||
      (event.eventType === "preview.stopped" &&
        noSource &&
        next.preview.status === "stopped" &&
        next.preview.artifactRevision === event.artifactRevision) ||
      (event.eventType === "export.requested" &&
        next.status === "exported" &&
        next.exportManifest?.artifactRevision === event.artifactRevision &&
        next.exportManifest.sourceRunId === event.sourceRunId) ||
      (event.eventType === "creator.canceled" &&
        next.status === "canceled" &&
        event.sourceRunId === (next.approvalPacket?.privateAlphaRunId ?? null) &&
        event.artifactRevision === (next.materializations.at(-1)?.artifactRevision ?? null)) ||
      (event.eventType === "failure.recorded" &&
        noArtifact &&
        event.sourceRunId === activeMutationSourceRunId &&
        (noSource || sourceBinding !== null) &&
        next.failureCode !== null &&
        next.failureMessage !== null)
      );
    if (!eventIsSemanticallyBound) {
      throw new CreatorPersistenceError(500, "record_corrupt", "Creator audit event does not match the state evidence it claims.");
    }
  }
  for (let index = 0; index < current.runBindings.length; index += 1) {
    const prior = current.runBindings[index];
    const candidate = next.runBindings[index];
    const immutablePrior = {
      purpose: prior.purpose,
      sourceRunId: prior.sourceRunId,
      ownershipBindingId: prior.ownershipBindingId,
      approvalScopeHash: prior.approvalScopeHash,
      providerKey: prior.providerKey,
      modelKey: prior.modelKey,
      runtimeModel: prior.runtimeModel,
      dataBoundary: prior.dataBoundary,
      maximumOutputTokens: prior.maximumOutputTokens,
      requestEnvelopeDigest: prior.requestEnvelopeDigest,
      sourceArtifactRevision: prior.sourceArtifactRevision,
      boundAt: prior.boundAt,
    };
    const immutableCandidate = {
      purpose: candidate?.purpose,
      sourceRunId: candidate?.sourceRunId,
      ownershipBindingId: candidate?.ownershipBindingId,
      approvalScopeHash: candidate?.approvalScopeHash,
      providerKey: candidate?.providerKey,
      modelKey: candidate?.modelKey,
      runtimeModel: candidate?.runtimeModel,
      dataBoundary: candidate?.dataBoundary,
      maximumOutputTokens: candidate?.maximumOutputTokens,
      requestEnvelopeDigest: candidate?.requestEnvelopeDigest,
      sourceArtifactRevision: candidate?.sourceArtifactRevision,
      boundAt: candidate?.boundAt,
    };
    const lifecycleMilestoneLowerBound =
      pendingRecoveryIntent !== null &&
      recoveredOriginalIntent !== null &&
      recoveredOriginalIntent.sourceRunId === prior.sourceRunId
        ? recoveredOriginalIntent.occurredAt
        : current.updatedAt;
    if (
      !candidate ||
      !exact(immutablePrior, immutableCandidate) ||
      candidate.sourceRunRevision < prior.sourceRunRevision ||
      candidate.sourceRunRevision > prior.sourceRunRevision + 2 ||
      (prior.approvalRecordedAt !== null && candidate.approvalRecordedAt !== prior.approvalRecordedAt) ||
      (prior.executionRequestedAt !== null && candidate.executionRequestedAt !== prior.executionRequestedAt) ||
      (prior.executionIdempotencyKeyHash !== null &&
        candidate.executionIdempotencyKeyHash !== prior.executionIdempotencyKeyHash) ||
      (prior.outputReceivedAt !== null && candidate.outputReceivedAt !== prior.outputReceivedAt) ||
      (prior.executionAttempted && !candidate.executionAttempted)
    ) {
      throw new CreatorPersistenceError(500, "record_corrupt", "Creator revision rewrites bound source-run provenance.");
    }
    if (
      (prior.approvalRecordedAt === null && candidate.approvalRecordedAt !== null &&
        (candidate.sourceRunRevision !==
            prior.sourceRunRevision + (next.status === "canceled" ? 2 : 1) ||
          (!["approved", "repair_approved"].includes(next.status) &&
            !(next.status === "canceled" &&
              ["awaiting_generation_approval", "awaiting_repair_approval"].includes(current.status))))) ||
      (prior.executionRequestedAt === null && candidate.executionRequestedAt !== null &&
        (candidate.sourceRunRevision !== prior.sourceRunRevision ||
          candidate.executionIdempotencyKeyHash === null ||
          candidate.executionRequestedAt < lifecycleMilestoneLowerBound ||
          candidate.executionRequestedAt > next.updatedAt ||
          !["generating", "repairing"].includes(next.status))) ||
      (prior.outputReceivedAt === null && candidate.outputReceivedAt !== null &&
        (candidate.sourceRunRevision !== prior.sourceRunRevision + 2 ||
          candidate.outputReceivedAt < lifecycleMilestoneLowerBound ||
          candidate.outputReceivedAt > next.updatedAt ||
          !["validating", "rejected_output", "failed"].includes(next.status)))
    ) {
      throw new CreatorPersistenceError(500, "record_corrupt", "Creator source-run milestone does not match its exact lifecycle revision and phase.");
    }
    const addedApproval =
      prior.approvalRecordedAt === null && candidate.approvalRecordedAt !== null;
    const addedOutput =
      prior.outputReceivedAt === null && candidate.outputReceivedAt !== null;
    const sourceRevisionDelta =
      candidate.sourceRunRevision - prior.sourceRunRevision;
    const ownsCurrentPacket =
      current.approvalPacket?.privateAlphaRunId === prior.sourceRunId;
    const cancelsBoundRun =
      next.status === "canceled" &&
      ownsCurrentPacket &&
      [
        "awaiting_generation_approval",
        "approved",
        "awaiting_repair_approval",
        "repair_approved",
      ].includes(current.status);
    const reconcilesApprovalBeforeCancel =
      cancelsBoundRun &&
      prior.approvalRecordedAt === null &&
      candidate.approvalRecordedAt !== null;
    const recordsTerminalRunFailure =
      next.status === "failed" &&
      ["generating", "repairing"].includes(current.status) &&
      sourceRevisionDelta >= 1 &&
      sourceRevisionDelta <= 2 &&
      appendedEvents.some(
        (event) =>
          event.eventType === "failure.recorded" &&
          event.sourceRunId === prior.sourceRunId
      );
    if (
      !addedApproval &&
      !addedOutput &&
      !recordsTerminalRunFailure &&
      !cancelsBoundRun &&
      sourceRevisionDelta !== 0
    ) {
      throw new CreatorPersistenceError(500, "record_corrupt", "Creator source-run revision advanced without one exact lifecycle result.");
    }
    if (
      next.status === "canceled" &&
      sourceRevisionDelta !==
        (cancelsBoundRun ? (reconcilesApprovalBeforeCancel ? 2 : 1) : 0)
    ) {
      throw new CreatorPersistenceError(500, "record_corrupt", "Creator cancellation did not record the exact source-run revision advance.");
    }
  }
  if (
    (transitionKey === "awaiting_generation_approval>approved" ||
      transitionKey === "awaiting_repair_approval>repair_approved") &&
    (next.approvalPacket === null ||
      next.approvalPacket.privateAlphaRunRevision !==
        next.runBindings.find(
          (binding) => binding.sourceRunId === next.approvalPacket?.privateAlphaRunId
        )?.sourceRunRevision)
  ) {
    throw new CreatorPersistenceError(500, "record_corrupt", "Creator approval packet revision does not match the approved lifecycle revision.");
  }
  if (
    next.status === "canceled" &&
    (bindsRunDuringCancellation ||
      [
        "awaiting_generation_approval",
        "approved",
        "awaiting_repair_approval",
        "repair_approved",
      ].includes(current.status)) &&
    (next.approvalPacket?.status !== "canceled" ||
      next.approvalPacket.privateAlphaRunRevision !==
        next.runBindings.find(
          (binding) => binding.sourceRunId === next.approvalPacket?.privateAlphaRunId
        )?.sourceRunRevision)
  ) {
    throw new CreatorPersistenceError(500, "record_corrupt", "Creator cancellation packet does not match the exact canceled lifecycle revision.");
  }
}

function assertCreatorInitialRevision(project: CreatorProjectState): void {
  const event = project.auditEvents[0];
  if (
    project.stateRevision !== 1 ||
    project.status !== "draft" ||
    project.plan !== null ||
    project.approvalPacket !== null ||
    project.runBindings.length !== 0 ||
    project.materializations.length !== 0 ||
    project.auditEvents.length !== 1 ||
    project.idempotencyRecords.length !== 0 ||
    project.request.createdAt !== project.createdAt ||
    !event ||
    event.eventType !== "request.created" ||
    event.actor !== "local-operator" ||
    event.previousState !== null ||
    event.resultingState !== "draft" ||
    event.stateRevision !== 1 ||
    event.occurredAt !== project.createdAt ||
    event.sourceRunId !== null ||
    event.artifactRevision !== null ||
    event.idempotencyKeyHash === null ||
    event.mutationDigest !== project.request.requestDigest
  ) {
    throw new CreatorPersistenceError(500, "record_corrupt", "Initial creator revision is missing its exact creation evidence.");
  }
}

function decodeStateEnvelope(source: Buffer, projectId: string): CreatorProjectState {
  let parsed: unknown;
  try {
    const serialized = source.toString("utf8");
    assertCreatorJsonHasUniqueObjectKeys(serialized);
    parsed = JSON.parse(serialized) as unknown;
  } catch {
    throw new CreatorPersistenceError(500, "record_corrupt", "Creator record JSON is malformed.");
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new CreatorPersistenceError(500, "record_corrupt", "Creator state envelope is malformed.");
  }
  const envelope = parsed as Partial<StoredCreatorStateEnvelope>;
  if (
    typeof envelope.checksum !== "string" ||
    !/^[a-f0-9]{64}$/.test(envelope.checksum) ||
    hashCreatorCanonicalJson(envelope.project) !== envelope.checksum
  ) {
    throw new CreatorPersistenceError(500, "record_corrupt", "Creator record checksum mismatch.");
  }
  return validatePersistedState(envelope.project, projectId);
}

export type CreatorPersistence = Readonly<{
  dataRootLabel: string;
  filesystem: CreatorOwnedFilesystem;
  initialize: () => Promise<void>;
  withProjectLock: <T>(projectId: string, operation: () => Promise<T>) => Promise<T>;
  readProject: (projectId: string) => Promise<CreatorProjectState>;
  readProjectRevision: (projectId: string, revision: number) => Promise<CreatorProjectState>;
  readProjectIfPresent: (projectId: string) => Promise<CreatorProjectState | null>;
  listProjects: (limit?: number) => Promise<readonly CreatorProjectState[]>;
  writeInitialProject: (project: CreatorProjectState) => Promise<void>;
  writeNextProject: (project: CreatorProjectState, expectedPreviousRevision: number) => Promise<void>;
  cleanupTestRoot: () => Promise<void>;
}>;

function createPersistence(dataRootLabel: string): CreatorPersistence {
  const filesystem = new CreatorOwnedFilesystem(dataRootLabel);

  const initialize = async () => {
    await filesystem.ensureRoot();
    await filesystem.ensureDirectory(["projects"]);
    await filesystem.ensureDirectory(["locks"]);
    await filesystem.ensureDirectory(["staging"]);
  };

  const readLockOwner = async (
    lockSegments: readonly string[]
  ): Promise<Readonly<{ owner: CreatorLockOwner; exactBytes: Buffer }> | null> => {
    try {
      const exactBytes = await filesystem.readBuffer(lockSegments);
      const owner = decodeLockOwner(exactBytes);
      return owner ? { owner, exactBytes } : null;
    } catch {
      return null;
    }
  };

  const acquireProjectLock = async (
    projectId: string
  ): Promise<Readonly<{
    lockSegments: readonly string[];
    owner: CreatorLockOwner;
    exactBytes: Buffer;
  }>> => {
    const nonce = makeCreatorHexId(16);
    const lockSegments = ["locks", `${projectId}.lock.json`] as const;
    const owner: CreatorLockOwner = {
      nonce,
      processSessionNonce: PROCESS_SESSION_NONCE,
      processId: process.pid,
      createdAt: new Date().toISOString(),
    };
    const exactBytes = Buffer.from(
      `${serializeCreatorCanonicalJson(owner)}\n`,
      "utf8"
    );
    await filesystem.writeAtomicExclusive(lockSegments, exactBytes);
    return { lockSegments, owner, exactBytes };
  };

  const withLocalInventoryAdmission = async <T>(
    operation: () => Promise<T>
  ): Promise<T> => {
    const prior = inventoryAdmissionTails.get(dataRootLabel) ?? Promise.resolve();
    let release!: () => void;
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });
    const tail = prior.then(() => gate, () => gate);
    inventoryAdmissionTails.set(dataRootLabel, tail);
    await prior.catch(() => undefined);
    try {
      return await operation();
    } finally {
      release();
      if (inventoryAdmissionTails.get(dataRootLabel) === tail) {
        inventoryAdmissionTails.delete(dataRootLabel);
      }
    }
  };

  const withNamedLock = async <T>(
    lockName: string,
    operation: () => Promise<T>
  ): Promise<T> => {
    await initialize();
    const localLockKey = `${dataRootLabel}:${lockName}`;
    let lock: Awaited<ReturnType<typeof acquireProjectLock>>;
    try {
      lock = await acquireProjectLock(lockName);
    } catch (error) {
      if (!(error instanceof CreatorFilesystemError) || error.code !== "already_exists") {
        throw mapFilesystemError(error);
      }
      const canonicalSegments = ["locks", `${lockName}.lock.json`] as const;
      const existingLock = await readLockOwner(canonicalSegments);
      const locallyRecoverable =
        existingLock !== null &&
        recoverableLocalLockNonces.get(localLockKey) === existingLock.owner.nonce;
      if (
        !existingLock ||
        (!locallyRecoverable && isProcessAlive(existingLock.owner))
      ) {
        throw new CreatorPersistenceError(409, "mutation_busy", "Another creator mutation is already in progress.");
      }
      try {
        await filesystem.compareDeleteExact(
          canonicalSegments,
          existingLock.exactBytes
        );
        recoverableLocalLockNonces.delete(localLockKey);
        lock = await acquireProjectLock(lockName);
      } catch {
        throw new CreatorPersistenceError(409, "mutation_busy", "Another creator mutation acquired the project lock.");
      }
    }
    try {
      return await operation();
    } finally {
      try {
        await filesystem.compareDeleteExact(lock.lockSegments, lock.exactBytes);
      } catch {
        recoverableLocalLockNonces.set(localLockKey, lock.owner.nonce);
        throw new CreatorPersistenceError(503, "mutation_busy", "Creator project lock could not be released safely.");
      }
      recoverableLocalLockNonces.delete(localLockKey);
    }
  };

  const readProject = async (projectId: string): Promise<CreatorProjectState> => {
    assertProjectId(projectId);
    try {
      if (!(await filesystem.rootExists())) {
        throw new CreatorPersistenceError(404, "not_found", "Creator project was not found.");
      }
      const revisionNames = (await filesystem.listDirectory([
        "projects",
        projectId,
        "state-revisions",
      ])).filter((name) => /^\d{6}\.json$/.test(name));
      if (revisionNames.length < 1) {
        throw new CreatorPersistenceError(404, "not_found", "Creator project was not found.");
      }
      if (revisionNames.length > CREATOR_MAX_AUDIT_EVENTS) {
        throw new CreatorPersistenceError(500, "record_corrupt", "Creator revision history exceeds its bounded audit ceiling.");
      }
      let prior: CreatorProjectState | null = null;
      for (let index = 0; index < revisionNames.length; index += 1) {
        const expectedName = stateFileName(index + 1);
        if (revisionNames[index] !== expectedName) {
          throw new CreatorPersistenceError(500, "record_corrupt", "Creator revision history is not contiguous.");
        }
        const candidate = decodeStateEnvelope(
          await filesystem.readBuffer(["projects", projectId, "state-revisions", expectedName]),
          projectId
        );
        if (candidate.stateRevision !== index + 1) {
          throw new CreatorPersistenceError(500, "record_corrupt", "Creator revision filename does not match its record.");
        }
        if (prior) assertCreatorRevisionContinuity(prior, candidate);
        else assertCreatorInitialRevision(candidate);
        prior = candidate;
      }
      return prior as CreatorProjectState;
    } catch (error) {
      throw mapFilesystemError(error);
    }
  };

  return {
    dataRootLabel,
    filesystem,
    initialize,
    async withProjectLock<T>(projectId: string, operation: () => Promise<T>): Promise<T> {
      assertProjectId(projectId);
      return withNamedLock(projectId, operation);
    },
    readProject,
    async readProjectRevision(projectId: string, revision: number): Promise<CreatorProjectState> {
      assertProjectId(projectId);
      try {
        const name = stateFileName(revision);
        await readProject(projectId);
        const project = decodeStateEnvelope(
          await filesystem.readBuffer(["projects", projectId, "state-revisions", name]),
          projectId
        );
        if (project.stateRevision !== revision) {
          throw new CreatorPersistenceError(500, "record_corrupt", "Creator revision filename does not match its record.");
        }
        return project;
      } catch (error) {
        throw mapFilesystemError(error);
      }
    },
    async readProjectIfPresent(projectId: string): Promise<CreatorProjectState | null> {
      try {
        return await readProject(projectId);
      } catch (error) {
        if (error instanceof CreatorPersistenceError && error.status === 404) return null;
        throw error;
      }
    },
    async listProjects(limit = 20): Promise<readonly CreatorProjectState[]> {
      if (!(await filesystem.rootExists())) return [];
      const boundedLimit = Number.isSafeInteger(limit) ? Math.max(1, Math.min(50, limit)) : 20;
      let entries: readonly string[];
      try {
        entries = await filesystem.listDirectory(["projects"]);
      } catch (error) {
        if (error instanceof CreatorFilesystemError && error.code === "not_found") return [];
        throw mapFilesystemError(error);
      }
      const projectIds = entries.filter((entry) => /^[a-f0-9]{24}$/.test(entry));
      if (projectIds.length > CREATOR_MAX_PROJECT_RECORDS) {
        throw new CreatorPersistenceError(
          409,
          "project_capacity_reached",
          `Creator project inventory exceeds the bounded ${CREATOR_MAX_PROJECT_RECORDS}-record scan ceiling.`
        );
      }
      const projects: CreatorProjectState[] = [];
      for (const projectId of projectIds) {
        try {
          projects.push(await readProject(projectId));
        } catch (error) {
          if (error instanceof CreatorPersistenceError && error.status === 404) continue;
          throw error;
        }
      }
      return projects
        .sort(
          (left, right) =>
            right.updatedAt.localeCompare(left.updatedAt) ||
            left.identity.projectId.localeCompare(right.identity.projectId)
        )
        .slice(0, boundedLimit);
    },
    async writeInitialProject(project: CreatorProjectState): Promise<void> {
      assertProjectId(project.identity.projectId);
      if (project.stateRevision !== 1) {
        throw new CreatorPersistenceError(422, "revision_conflict", "Initial creator revision must be 1.");
      }
      assertCreatorInitialRevision(project);
      await withLocalInventoryAdmission(() =>
        withNamedLock("inventory", async () => {
          try {
            const existingProjectIds = (await filesystem.listDirectory(["projects"]))
              .filter((entry) => /^[a-f0-9]{24}$/.test(entry));
            const targetAlreadyPresent = existingProjectIds.includes(
              project.identity.projectId
            );
            if (targetAlreadyPresent) {
              const targetEntries = await filesystem.listDirectory([
                "projects",
                project.identity.projectId,
              ]);
              if (
                targetEntries.some((entry) => entry !== "state-revisions") ||
                (targetEntries.includes("state-revisions") &&
                  (await filesystem.listDirectory([
                    "projects",
                    project.identity.projectId,
                    "state-revisions",
                  ])).length !== 0)
              ) {
                throw new CreatorPersistenceError(
                  409,
                  "revision_conflict",
                  "Creator project identity already contains persisted state or contradictory residue."
                );
              }
            }
            const otherProjectCount = existingProjectIds.filter(
              (projectId) => projectId !== project.identity.projectId
            ).length;
            if (otherProjectCount >= CREATOR_MAX_PROJECT_RECORDS) {
              throw new CreatorPersistenceError(
                409,
                "project_capacity_reached",
                `Creator project inventory is limited to ${CREATOR_MAX_PROJECT_RECORDS} records.`
              );
            }
            await filesystem.ensureDirectory(["projects", project.identity.projectId]);
            await filesystem.ensureDirectory(["projects", project.identity.projectId, "state-revisions"]);
            await filesystem.writeAtomicExclusive(
              ["projects", project.identity.projectId, "state-revisions", stateFileName(1)],
              encodeStateEnvelope(project)
            );
          } catch (error) {
            try {
              const projectSegments = ["projects", project.identity.projectId] as const;
              const projectEntries = await filesystem.listDirectory(projectSegments);
              const residueIsOwnedAndEmpty =
                projectEntries.every((entry) => entry === "state-revisions") &&
                (!projectEntries.includes("state-revisions") ||
                  (await filesystem.listDirectory([
                    ...projectSegments,
                    "state-revisions",
                  ])).length === 0);
              if (residueIsOwnedAndEmpty) {
                await filesystem.removeOwnedTree(["projects", project.identity.projectId]);
              }
            } catch {
              // The original publication error remains authoritative; listProjects skips only exact empty 404 residue.
            }
            throw mapFilesystemError(error);
          }
        })
      );
    },
    async writeNextProject(project: CreatorProjectState, expectedPreviousRevision: number): Promise<void> {
      assertProjectId(project.identity.projectId);
      const current = await readProject(project.identity.projectId);
      if (
        current.stateRevision !== expectedPreviousRevision ||
        project.stateRevision !== expectedPreviousRevision + 1
      ) {
        throw new CreatorPersistenceError(409, "revision_conflict", "Creator revision precondition failed.");
      }
      assertCreatorRevisionContinuity(current, project);
      try {
        await filesystem.writeAtomicExclusive(
          [
            "projects",
            project.identity.projectId,
            "state-revisions",
            stateFileName(project.stateRevision),
          ],
          encodeStateEnvelope(project)
        );
      } catch (error) {
        throw mapFilesystemError(error);
      }
    },
    async cleanupTestRoot(): Promise<void> {
      await filesystem.removeTestRoot();
      for (const key of recoverableLocalLockNonces.keys()) {
        if (key.startsWith(`${dataRootLabel}:`)) recoverableLocalLockNonces.delete(key);
      }
      inventoryAdmissionTails.delete(dataRootLabel);
    },
  };
}

export function createCreatorPersistence(): CreatorPersistence {
  return createPersistence(CREATOR_PRODUCTION_DATA_ROOT_LABEL);
}

export function createCreatorPersistenceForTesting(testSuffix: string): CreatorPersistence {
  return createPersistence(buildCreatorTestDataRootLabel(testSuffix));
}
