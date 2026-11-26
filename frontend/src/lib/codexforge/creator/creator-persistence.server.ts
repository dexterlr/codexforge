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
  buildCreatorGenerationInstructionForResponseContract,
  buildLegacyCreatorRepairInstruction,
  isValidCreatorProjectTitle,
  isSafeCreatorVisibleUnicode,
} from "./creator-contract.server";
import { buildCreatorValidationDigest } from "./creator-validation.server";
import { canTransitionCreatorProject } from "./creator-state-machine";
import {
  CREATOR_MAX_AUDIT_EVENTS,
  CREATOR_MAX_AUDIT_SUMMARY_LENGTH,
  CREATOR_MAX_IDEMPOTENCY_RECORDS,
  CREATOR_MAX_EXPLICIT_REVISIONS,
  CREATOR_MAX_MATERIALIZATIONS,
  CREATOR_MAX_PROJECT_RECORDS,
  CREATOR_MAX_REVISION_BRIEF_LENGTH,
  CREATOR_MAX_RUN_BINDINGS,
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
  CREATOR_RESPONSE_CONTRACT_VERSIONS,
  CREATOR_SERVER_OWNED_PAGE_TOPOLOGY_OPERATIONS,
  CREATOR_TOPOLOGY_CANONICALIZER_VERSION,
  CREATOR_TOPOLOGY_REPAIR_OPERATIONS,
  type CreatorAuditEventType,
  type CreatorDocumentTopologyProvenance,
  type CreatorFailureCode,
  type CreatorProjectState,
  type CreatorRunOperationSlot,
  type CreatorTopologyRepair,
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
  "draft>awaiting_plan_approval": [["plan.prepared"]],
  "draft>awaiting_generation_approval": [["run.bound"]],
  "draft>failed": [["failure.recorded"]],
  "draft>canceled": [
    ["creator.canceled"],
    ["run.bound", "creator.canceled"],
    ["run.bound", "approval.recorded", "creator.canceled"],
  ],
  "awaiting_plan_approval>awaiting_plan_approval": [
    ["plan.approval_requested"],
    ["recovery.requested"],
    ["recovery.completed"],
  ],
  "awaiting_plan_approval>awaiting_generation_approval": [
    ["run.bound", "plan.approved"],
  ],
  "awaiting_plan_approval>canceled": [["creator.canceled"]],
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
  "generating>validating": [
    ["output.received", "validation.completed"],
    ["output.received", "topology.document_constructed", "validation.completed"],
  ],
  "generating>generating": [["recovery.requested"], ["recovery.completed"]],
  "generating>rejected_output": [
    ["output.received", "validation.completed", "output.rejected"],
    [
      "output.received",
      "topology.document_constructed",
      "validation.completed",
      "output.rejected",
    ],
  ],
  "generating>failed": [["failure.recorded"]],
  "generating>stopping": [["generation.stop_requested"]],
  "validating>rejected_output": [["output.rejected"]],
  "validating>validating": [["recovery.requested"], ["recovery.completed"]],
  "validating>ready": [
    ["revision.materialized", "export.manifest_created"],
    ["repair.result_accepted", "revision.materialized", "export.manifest_created"],
    ["revision.materialized", "export.manifest_created", "topology.repair_completed"],
  ],
  "validating>failed": [
    ["failure.recorded"],
    ["repair.result_rejected", "failure.recorded"],
    ["topology.repair_rejected", "failure.recorded"],
  ],
  "rejected_output>validating": [[
    "topology.repair_requested",
    "topology.document_constructed",
    "validation.completed",
  ]],
  "rejected_output>repair_requested": [["repair.requested"]],
  "rejected_output>rejected_output": [
    ["recovery.requested"],
    ["recovery.completed"],
    ["topology.repair_requested", "topology.repair_rejected"],
    [
      "topology.repair_requested",
      "topology.document_constructed",
      "validation.completed",
      "topology.repair_rejected",
    ],
  ],
  "rejected_output>ready": [["prior_publication.restored"]],
  "rejected_output>canceled": [["creator.canceled"]],
  "ready>preview_available": [["preview.started"]],
  "ready>ready": [["recovery.requested"], ["recovery.completed"]],
  "ready>repair_requested": [["repair.requested"]],
  "ready>awaiting_revision_plan_approval": [["revision.requested"]],
  "ready>exported": [["export.requested"]],
  "ready>canceled": [["creator.canceled"]],
  "preview_available>ready": [["preview.stopped"]],
  "preview_available>preview_available": [["recovery.requested"], ["recovery.completed"]],
  "preview_available>canceled": [["preview.stopped", "creator.canceled"]],
  "awaiting_revision_plan_approval>awaiting_revision_plan_approval": [
    ["revision.plan_approval_requested"],
    ["recovery.requested"],
    ["recovery.completed"],
  ],
  "awaiting_revision_plan_approval>awaiting_revision_generation_approval": [
    ["run.bound", "revision.plan_approved"],
  ],
  "awaiting_revision_plan_approval>canceled": [["creator.canceled"]],
  "awaiting_revision_generation_approval>awaiting_revision_generation_approval": [
    ["approval.requested"],
    ["cancellation.requested"],
    ["recovery.requested"],
    ["recovery.completed"],
  ],
  "awaiting_revision_generation_approval>revision_generation_approved": [["approval.recorded"]],
  "awaiting_revision_generation_approval>canceled": [
    ["creator.canceled"],
    ["approval.recorded", "creator.canceled"],
  ],
  "revision_generation_approved>revision_generation_approved": [
    ["cancellation.requested"],
    ["recovery.requested"],
    ["recovery.completed"],
  ],
  "revision_generation_approved>revising": [["execution.requested"]],
  "revision_generation_approved>canceled": [["creator.canceled"]],
  "revising>revising": [["recovery.requested"], ["recovery.completed"]],
  "revising>validating": [
    ["output.received", "validation.completed"],
    ["output.received", "topology.document_constructed", "validation.completed"],
  ],
  "revising>rejected_output": [
    ["output.received", "validation.completed", "output.rejected"],
    [
      "output.received",
      "topology.document_constructed",
      "validation.completed",
      "output.rejected",
    ],
  ],
  "revising>failed": [["failure.recorded"]],
  "revising>stopping": [["generation.stop_requested"]],
  "stopping>stopped": [
    ["generation.stopped"],
    ["output.discarded", "generation.stopped"],
  ],
  "stopping>stopping": [["recovery.requested"], ["recovery.completed"]],
  "stopped>stopped": [["recovery.requested"], ["recovery.completed"]],
  "stopped>ready": [["prior_publication.restored"]],
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
  "repairing>validating": [
    ["output.received", "validation.completed"],
    ["output.received", "topology.document_constructed", "validation.completed"],
  ],
  "repairing>repairing": [["recovery.requested"], ["recovery.completed"]],
  "repairing>failed": [
    ["repair.result_rejected", "failure.recorded"],
    ["output.received", "validation.completed", "repair.result_rejected", "failure.recorded"],
    [
      "output.received",
      "topology.document_constructed",
      "validation.completed",
      "repair.result_rejected",
      "failure.recorded",
    ],
  ],
  "repairing>stopping": [["generation.stop_requested"]],
  "failed>failed": [["recovery.requested"], ["recovery.completed"]],
  "failed>ready": [["prior_publication.restored"]],
  "failed>canceled": [["creator.canceled"]],
  "failed>exported": [["export.requested"]],
  "canceled>canceled": [["recovery.requested"], ["recovery.completed"]],
  "exported>exported": [["recovery.requested"], ["recovery.completed"]],
});
const CREATOR_SOURCE_RUN_AUDIT_EVENTS = new Set([
  "run.bound",
  "plan.approved",
  "approval.requested",
  "approval.recorded",
  "execution.requested",
  "output.received",
  "output.rejected",
  "validation.completed",
  "revision.materialized",
  "generation.stop_requested",
  "generation.stopped",
  "output.discarded",
  "repair.run_bound",
  "repair.result_accepted",
  "repair.result_rejected",
  "topology.repair_requested",
  "topology.document_constructed",
  "topology.repair_completed",
  "topology.repair_rejected",
  "prior_publication.restored",
  "export.manifest_created",
  "export.requested",
]);
const CREATOR_ARTIFACT_AUDIT_EVENTS = new Set([
  "revision.materialized",
  "repair.result_accepted",
  "topology.repair_completed",
  "export.manifest_created",
  "prior_publication.restored",
  "preview.started",
  "preview.stopped",
  "export.requested",
]);
const CREATOR_AUDIT_EVENT_ACTORS: Readonly<
  Record<CreatorAuditEventType, "local-operator" | "system">
> = Object.freeze({
  "request.created": "local-operator",
  "plan.prepared": "system",
  "plan.approval_requested": "local-operator",
  "plan.approved": "local-operator",
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
  "revision.requested": "local-operator",
  "revision.plan_approval_requested": "local-operator",
  "revision.plan_approved": "local-operator",
  "generation.stop_requested": "local-operator",
  "generation.stopped": "system",
  "output.discarded": "system",
  "preview.started": "local-operator",
  "preview.stopped": "local-operator",
  "repair.requested": "local-operator",
  "repair.run_bound": "system",
  "repair.result_accepted": "system",
  "repair.result_rejected": "system",
  "topology.repair_requested": "local-operator",
  "topology.document_constructed": "system",
  "topology.repair_completed": "system",
  "topology.repair_rejected": "system",
  "prior_publication.restored": "local-operator",
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

function buildCreatorTopologyTransformationDigest(
  repair: CreatorTopologyRepair
): string {
  return hashCreatorCanonicalJson({
    canonicalizerVersion: repair.canonicalizerVersion,
    sourceResponseContractVersion: repair.sourceResponseContractVersion,
    responseContractVersion: repair.responseContractVersion,
    orderedOperations: repair.orderedOperations,
    inputDigest: repair.inputBundleDigest,
    inputHtmlSha256: repair.inputHtmlSha256,
    outputHtmlSha256: repair.outputHtmlSha256,
    outputBundleDigest: repair.outputBundleDigest,
  });
}

function buildCreatorDocumentTopologyTransformationDigest(
  topology: CreatorDocumentTopologyProvenance
): string {
  return hashCreatorCanonicalJson({
    canonicalizerVersion: topology.canonicalizerVersion,
    sourceResponseContractVersion: topology.sourceResponseContractVersion,
    responseContractVersion: topology.responseContractVersion,
    orderedOperations: topology.orderedOperations,
    inputDigest: topology.inputDigest,
    inputHtmlSha256: topology.inputHtmlSha256,
    outputHtmlSha256: topology.outputHtmlSha256,
    outputBundleDigest: topology.outputBundleDigest,
  });
}

function isExactCreatorDocumentTopologyProvenance(
  value: unknown
): value is CreatorDocumentTopologyProvenance {
  if (
    !isRecord(value) ||
    !hasExactKeys(value, [
      "canonicalizerVersion",
      "sourceResponseContractVersion",
      "responseContractVersion",
      "orderedOperations",
      "inputDigest",
      "inputHtmlSha256",
      "outputHtmlSha256",
      "outputBundleDigest",
      "transformationDigest",
    ])
  ) {
    return false;
  }
  const topology = value as unknown as CreatorDocumentTopologyProvenance;
  return (
    topology.canonicalizerVersion === CREATOR_TOPOLOGY_CANONICALIZER_VERSION &&
    topology.sourceResponseContractVersion === "server-owned-page-v1" &&
    topology.responseContractVersion === "server-owned-page-v1" &&
    Array.isArray(topology.orderedOperations) &&
    hashCreatorCanonicalJson(topology.orderedOperations) ===
      hashCreatorCanonicalJson(
        CREATOR_SERVER_OWNED_PAGE_TOPOLOGY_OPERATIONS
      ) &&
    isHex(topology.inputDigest, 64) &&
    topology.inputHtmlSha256 === null &&
    isHex(topology.outputHtmlSha256, 64) &&
    isHex(topology.outputBundleDigest, 64) &&
    isHex(topology.transformationDigest, 64) &&
    topology.transformationDigest ===
      buildCreatorDocumentTopologyTransformationDigest(topology)
  );
}

function isExactModelEnvelope(value: unknown): boolean {
  return isRecord(value) &&
    hasExactKeys(value, [
      "providerKey", "providerLabel", "providerLocality", "modelKey", "runtimeModel",
      "dataBoundary", "maximumOutputTokens", "fallback", "retry", "substitution",
      "paidExecution", "estimatedProviderTokenChargeUsd", "localResourceCost",
    ]) &&
    value.providerKey === "ollama-local" &&
    value.providerLabel === "Local Ollama" &&
    value.providerLocality === "local-machine" &&
    value.modelKey === "ollama-local::gpt-oss:20b" &&
    value.runtimeModel === "gpt-oss:20b" &&
    value.dataBoundary === "local-machine" &&
    value.maximumOutputTokens === 4096 &&
    value.fallback === "disabled" &&
    value.retry === "disabled" &&
    value.substitution === "disabled" &&
    value.paidExecution === "disabled" &&
    value.estimatedProviderTokenChargeUsd === 0 &&
    value.localResourceCost === "unmetered";
}

function upgradeLegacyModelEnvelope(value: unknown): unknown {
  if (
    !isRecord(value) ||
    !hasExactKeys(value, [
      "providerKey", "modelKey", "runtimeModel", "dataBoundary",
      "maximumOutputTokens", "fallback", "retry", "substitution",
      "paidExecution",
    ]) ||
    value.providerKey !== "ollama-local" ||
    value.modelKey !== "ollama-local::gpt-oss:20b" ||
    value.runtimeModel !== "gpt-oss:20b" ||
    value.dataBoundary !== "local-machine" ||
    value.maximumOutputTokens !== 4096 ||
    value.fallback !== "disabled" ||
    value.retry !== "disabled" ||
    value.substitution !== "disabled" ||
    value.paidExecution !== "disabled"
  ) {
    return value;
  }
  return {
    providerKey: "ollama-local",
    providerLabel: "Local Ollama",
    providerLocality: "local-machine",
    modelKey: "ollama-local::gpt-oss:20b",
    runtimeModel: "gpt-oss:20b",
    dataBoundary: "local-machine",
    maximumOutputTokens: 4096,
    fallback: "disabled",
    retry: "disabled",
    substitution: "disabled",
    paidExecution: "disabled",
    estimatedProviderTokenChargeUsd: 0,
    localResourceCost: "unmetered",
  };
}

function upgradeLegacyPersistedState(project: unknown): unknown {
  if (!isRecord(project) || project.recordVersion !== CREATOR_RECORD_VERSION) {
    return project;
  }
  let changed = false;
  let plan = project.plan;
  if (isRecord(plan)) {
    const upgradedEnvelope = upgradeLegacyModelEnvelope(plan.modelEnvelope);
    if (upgradedEnvelope !== plan.modelEnvelope) {
      const { planDigest, ...legacyPlanWithoutDigest } = plan;
      if (
        typeof planDigest !== "string" ||
        hashCreatorCanonicalJson(legacyPlanWithoutDigest) !== planDigest
      ) {
        return project;
      }
      const upgradedPlanWithoutDigest = {
        ...legacyPlanWithoutDigest,
        modelEnvelope: upgradedEnvelope,
      };
      plan = {
        ...upgradedPlanWithoutDigest,
        planDigest: hashCreatorCanonicalJson(upgradedPlanWithoutDigest),
      };
      changed = true;
    }
  }
  let approvalPacket = project.approvalPacket;
  if (isRecord(approvalPacket)) {
    const upgradedEnvelope = upgradeLegacyModelEnvelope(
      approvalPacket.modelEnvelope
    );
    if (upgradedEnvelope !== approvalPacket.modelEnvelope || plan !== project.plan) {
      approvalPacket = {
        ...approvalPacket,
        modelEnvelope: upgradedEnvelope,
        planDigest: isRecord(plan) ? plan.planDigest : approvalPacket.planDigest,
      };
      changed = true;
    }
  }
  let runBindings = project.runBindings;
  if (
    Array.isArray(runBindings) &&
    runBindings.every(
      (binding) =>
        isRecord(binding) &&
        binding.operationSlot === undefined &&
        (binding.purpose === "generation" || binding.purpose === "repair")
    )
  ) {
    runBindings = runBindings.map((binding) => ({
      ...binding,
      operationSlot:
        binding.purpose === "generation" ? "generation-initial" : "repair-1",
    }));
    changed = true;
  }
  if (
    Array.isArray(runBindings) &&
    runBindings.every(
      (binding) => isRecord(binding) && binding.documentTopology === undefined
    )
  ) {
    runBindings = runBindings.map((binding) => ({
      ...binding,
      documentTopology: null,
    }));
    changed = true;
  }
  if (
    Array.isArray(runBindings) &&
    runBindings.every(
      (binding) =>
        isRecord(binding) && binding.responseContractVersion === undefined
    )
  ) {
    runBindings = runBindings.map((binding) => ({
      ...binding,
      responseContractVersion: "legacy-bundle-v1",
    }));
    changed = true;
  }
  let revisionRequests = project.revisionRequests;
  if (revisionRequests === undefined) {
    revisionRequests = [];
    changed = true;
  }
  if (
    Array.isArray(revisionRequests) &&
    revisionRequests.every(
      (request) =>
        isRecord(request) && request.responseContractVersion === undefined
    )
  ) {
    revisionRequests = revisionRequests.map((request) => ({
      ...request,
      responseContractVersion: "legacy-bundle-v1",
    }));
    changed = true;
  }
  let repair = project.repair;
  if (isRecord(repair) && repair.instructionVersion === undefined) {
    const sourceArtifactRevision =
      typeof repair.sourceArtifactRevision === "number"
        ? repair.sourceArtifactRevision
        : null;
    repair = {
      ...repair,
      instructionVersion: "legacy-v1",
      targetArtifactRevision: (sourceArtifactRevision ?? 0) + 1,
      sourceManifestDigest: null,
      sourceAggregateDigest: null,
      sourceValidationDigest: null,
      sourceSnapshotDigest: null,
      sourceSnapshotBytes: null,
      linkedRevisionRequestId: null,
    };
    changed = true;
  }
  if (isRecord(repair) && repair.responseContractVersion === undefined) {
    repair = {
      ...repair,
      responseContractVersion: "legacy-bundle-v1",
    };
    changed = true;
  }
  const initialProviderResponseContractVersion =
    project.initialProviderResponseContractVersion === undefined
      ? "legacy-bundle-v1"
      : project.initialProviderResponseContractVersion;
  if (project.initialProviderResponseContractVersion === undefined) {
    changed = true;
  }
  const topologyRepair =
    project.topologyRepair === undefined ? null : project.topologyRepair;
  if (project.topologyRepair === undefined) {
    changed = true;
  }
  return changed
    ? {
        ...project,
        plan,
        approvalPacket,
        runBindings,
        revisionRequests,
        repair,
        initialProviderResponseContractVersion,
        topologyRepair,
      }
    : project;
}

function validatePersistedState(project: unknown, expectedProjectId: string): CreatorProjectState {
  if (!isRecord(project)) {
    throw new CreatorPersistenceError(500, "record_corrupt", "Creator record is malformed.");
  }
  if (!hasExactKeys(project, [
    "recordVersion", "stateRevision", "status", "createdAt", "updatedAt", "identity",
    "request", "initialProviderResponseContractVersion", "plan", "approvalPacket", "runBindings", "artifactProposal",
    "artifactProposalBinding", "validation", "materializations", "preview", "repair",
    "revisionRequests", "topologyRepair", "exportManifest", "failureCode", "failureMessage", "auditEvents",
    "idempotencyRecords",
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
    !CREATOR_RESPONSE_CONTRACT_VERSIONS.includes(
      value.initialProviderResponseContractVersion as never
    ) ||
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
    value.runBindings.length > CREATOR_MAX_RUN_BINDINGS ||
    !Array.isArray(value.materializations) ||
    value.materializations.length > CREATOR_MAX_MATERIALIZATIONS ||
    !Array.isArray(value.revisionRequests) ||
    value.revisionRequests.length > CREATOR_MAX_EXPLICIT_REVISIONS
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
    const approvalPlanDigest =
      value.approvalPacket.purpose === "revision"
        ? value.revisionRequests.find(
            (request) =>
              request.sourceArtifactRevision ===
                value.approvalPacket?.sourceArtifactRevision &&
              value.runBindings.some(
                (binding) =>
                  binding.sourceRunId ===
                    value.approvalPacket?.privateAlphaRunId &&
                  binding.purpose === "revision" &&
                  binding.operationSlot ===
                    `revision-${request.revisionNumber}`
              )
          )?.planDigest
        : value.plan?.planDigest;
    if (
      !isRecord(value.approvalPacket) ||
      !hasExactKeys(value.approvalPacket, [
        "purpose", "privateAlphaRunId", "privateAlphaRunRevision", "approvalScopeHash",
        "planDigest", "sourceArtifactRevision", "targetArtifactRevision", "destinationBoundary",
        "status", "modelEnvelope", "preparedAt", "approvedAt",
      ]) ||
      !["generation", "repair", "revision"].includes(value.approvalPacket.purpose) ||
      !isPrivateAlphaRunId(value.approvalPacket.privateAlphaRunId) ||
      !isRevision(value.approvalPacket.privateAlphaRunRevision) ||
      !isHex(value.approvalPacket.approvalScopeHash, 64) ||
      value.approvalPacket.planDigest !== approvalPlanDigest ||
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
      expectedTargetArtifactRevision > CREATOR_MAX_MATERIALIZATIONS ||
      value.approvalPacket.destinationBoundary !== buildCreatorDestinationBoundary(value.identity.projectId, expectedTargetArtifactRevision)
    ) {
      throw new CreatorPersistenceError(500, "record_corrupt", "Creator approval destination is inconsistent with its exact source and target revisions.");
    }
  }

  const boundRunIds = new Set<string>();
  const boundOperationSlots = new Set<string>();
  for (const binding of value.runBindings) {
    const operationSlot = String(binding.operationSlot);
    if (
      !isRecord(binding) ||
      !hasExactKeys(binding, [
        "purpose", "operationSlot", "sourceRunId", "ownershipBindingId", "sourceRunRevision", "approvalScopeHash", "providerKey",
        "modelKey", "runtimeModel", "dataBoundary", "maximumOutputTokens",
        "responseContractVersion", "documentTopology", "requestEnvelopeDigest", "sourceArtifactRevision", "boundAt", "approvalRecordedAt",
        "executionRequestedAt", "executionIdempotencyKeyHash", "outputReceivedAt", "executionAttempted",
      ]) ||
      typeof binding.purpose !== "string" ||
      !["generation", "repair", "revision"].includes(binding.purpose) ||
      !["generation-initial", "repair-1", "revision-1", "revision-2"].includes(operationSlot) ||
      (binding.purpose === "generation") !==
        (binding.operationSlot === "generation-initial") ||
      (binding.purpose === "repair") !== (binding.operationSlot === "repair-1") ||
      (binding.purpose === "revision") !==
        (binding.operationSlot === "revision-1" ||
          binding.operationSlot === "revision-2") ||
      !isPrivateAlphaRunId(binding.sourceRunId) ||
      !isHex(binding.ownershipBindingId, 32) ||
      !isRevision(binding.sourceRunRevision) ||
      !isHex(binding.approvalScopeHash, 64) ||
      binding.providerKey !== "ollama-local" ||
      binding.modelKey !== "ollama-local::gpt-oss:20b" ||
      binding.runtimeModel !== "gpt-oss:20b" ||
      binding.dataBoundary !== "local-machine" ||
      binding.maximumOutputTokens !== 4096 ||
      !CREATOR_RESPONSE_CONTRACT_VERSIONS.includes(
        binding.responseContractVersion as never
      ) ||
      (binding.documentTopology !== null &&
        !isExactCreatorDocumentTopologyProvenance(
          binding.documentTopology
        )) ||
      (binding.documentTopology !== null &&
        (binding.responseContractVersion !== "server-owned-page-v1" ||
          binding.outputReceivedAt === null)) ||
      (binding.responseContractVersion === "legacy-bundle-v1" &&
        binding.documentTopology !== null) ||
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
    if (
      boundRunIds.has(binding.sourceRunId) ||
      boundOperationSlots.has(operationSlot)
    ) {
      throw new CreatorPersistenceError(500, "record_corrupt", "Creator run provenance contains duplicate bindings.");
    }
    boundRunIds.add(binding.sourceRunId);
    boundOperationSlots.add(operationSlot);
  }
  const generationBinding = value.runBindings.find((binding) => binding.purpose === "generation") ?? null;
  const repairBinding = value.runBindings.find((binding) => binding.purpose === "repair") ?? null;
  const expectedGenerationRequestEnvelopeDigest = hashCreatorSha256(
    buildCreatorGenerationInstructionForResponseContract({
      responseContractVersion:
        value.initialProviderResponseContractVersion,
      projectTitle: value.identity.projectTitle,
      description: value.request.description,
    })
  );
  if (
    generationBinding !== null &&
    (generationBinding.sourceArtifactRevision !== null ||
      generationBinding.responseContractVersion !==
        value.initialProviderResponseContractVersion ||
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
          ))) ||
      ((event.eventType === "revision.requested" ||
        event.eventType === "revision.plan_approval_requested") &&
        (event.sourceRunId !== null ||
          event.artifactRevision === null ||
          !value.revisionRequests.some(
            (request) =>
              request.sourceArtifactRevision === event.artifactRevision
          ))) ||
      (event.eventType === "revision.plan_approved" &&
        (event.sourceRunId === null ||
          !boundRunIds.has(event.sourceRunId) ||
          event.artifactRevision === null ||
          !value.revisionRequests.some(
            (request) =>
              request.sourceArtifactRevision === event.artifactRevision
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
  for (const binding of value.runBindings) {
    const constructedEvents = value.auditEvents.filter(
      (event) =>
        event.eventType === "topology.document_constructed" &&
        event.sourceRunId === binding.sourceRunId
    );
    const isHistoricalTopologyRepairSource =
      value.topologyRepair !== null &&
      value.topologyRepair.sourceRunId === binding.sourceRunId;
    const expectedConstructedEventCount =
      binding.documentTopology !== null || isHistoricalTopologyRepairSource
        ? 1
        : 0;
    if (
      constructedEvents.length !== expectedConstructedEventCount ||
      (binding.documentTopology !== null &&
        (binding.outputReceivedAt === null ||
          (constructedEvents[0]?.occurredAt ?? "") <
            binding.outputReceivedAt ||
          !constructedEvents[0]?.summary.includes(
            binding.documentTopology.transformationDigest.slice(0, 12)
          ))) ||
      (isHistoricalTopologyRepairSource &&
        constructedEvents[0]?.occurredAt !==
          value.topologyRepair?.constructedAt)
    ) {
      throw new CreatorPersistenceError(
        500,
        "record_corrupt",
        "Creator document topology provenance is not bound to one exact construction audit event."
      );
    }
  }

  const idempotencyHashes = new Set<string>();
  for (const record of value.idempotencyRecords) {
    if (
      !isRecord(record) ||
      !hasExactKeys(record, ["idempotencyKeyHash", "mutationKind", "mutationDigest", "resultingStateRevision", "recordedAt"]) ||
      !isHex(record.idempotencyKeyHash, 64) ||
      idempotencyHashes.has(record.idempotencyKeyHash) ||
      (record.mutationKind !== "create" &&
        record.mutationKind !== "prepare-plan" &&
        !CREATOR_MUTATION_KINDS.includes(record.mutationKind as never)) ||
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
      !hasOnlyKeys(materialization, [
        "artifactRevision", "destinationLabel", "entrypoint", "files", "aggregateBytes",
        "aggregateDigest", "validationDigest", "topologyRepairDigest",
        "topologyTransformationDigest", "materializedAt",
      ]) ||
      ![
        "artifactRevision", "destinationLabel", "entrypoint", "files",
        "aggregateBytes", "aggregateDigest", "validationDigest", "materializedAt",
      ].every((key) => Object.hasOwn(materialization, key)) ||
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
      (materialization.topologyRepairDigest !== undefined &&
        !isHex(materialization.topologyRepairDigest, 64)) ||
      (materialization.topologyTransformationDigest !== undefined &&
        !isHex(materialization.topologyTransformationDigest, 64)) ||
      (materialization.topologyRepairDigest !== undefined &&
        materialization.topologyTransformationDigest !== undefined) ||
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
  for (const materialization of value.materializations) {
    const materializedEvents = value.auditEvents.filter(
      (event) =>
        event.eventType === "revision.materialized" &&
        event.artifactRevision === materialization.artifactRevision
    );
    const materializedEvent = materializedEvents[0] ?? null;
    const publicationBinding =
      materializedEvent === null
        ? null
        : value.runBindings.find(
            (binding) =>
              binding.sourceRunId === materializedEvent.sourceRunId
          ) ?? null;
    const expectedTopologyTransformationDigest =
      publicationBinding?.documentTopology?.transformationDigest;
    if (
      materializedEvents.length !== 1 ||
      publicationBinding === null ||
      materialization.topologyTransformationDigest !==
        expectedTopologyTransformationDigest
    ) {
      throw new CreatorPersistenceError(
        500,
        "record_corrupt",
        "Creator materialization is not bound to its exact document topology transformation."
      );
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
      !["generation", "repair", "revision"].includes(String(value.artifactProposalBinding.purpose)) ||
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
      "instructionVersion", "responseContractVersion", "attempt", "requestedAt", "sourceArtifactRevision",
      "targetArtifactRevision", "sourceManifestDigest", "sourceAggregateDigest",
      "sourceValidationDigest", "sourceSnapshotDigest", "sourceSnapshotBytes",
      "linkedRevisionRequestId", "validationIssueDigest", "issueCodes",
      "repairContextDigest",
    ]) ||
    !["legacy-v1", "source-snapshot-v2"].includes(value.repair.instructionVersion) ||
    !CREATOR_RESPONSE_CONTRACT_VERSIONS.includes(
      value.repair.responseContractVersion as never
    ) ||
    value.repair.attempt !== 1 ||
    !isIsoTimestamp(value.repair.requestedAt) ||
    (value.repair.sourceArtifactRevision !== null && !isRevision(value.repair.sourceArtifactRevision)) ||
    value.repair.targetArtifactRevision !==
      (value.repair.sourceArtifactRevision ?? 0) + 1 ||
    value.repair.targetArtifactRevision > CREATOR_MAX_MATERIALIZATIONS ||
    (value.repair.sourceManifestDigest !== null &&
      !isHex(value.repair.sourceManifestDigest, 64)) ||
    (value.repair.sourceAggregateDigest !== null &&
      !isHex(value.repair.sourceAggregateDigest, 64)) ||
    (value.repair.sourceValidationDigest !== null &&
      !isHex(value.repair.sourceValidationDigest, 64)) ||
    (value.repair.sourceSnapshotDigest !== null &&
      !isHex(value.repair.sourceSnapshotDigest, 64)) ||
    (value.repair.sourceSnapshotBytes !== null &&
      (!Number.isSafeInteger(value.repair.sourceSnapshotBytes) ||
        value.repair.sourceSnapshotBytes < 1 ||
        value.repair.sourceSnapshotBytes > CREATOR_FILE_POLICY.maximumAggregateBytes * 4)) ||
    (value.repair.linkedRevisionRequestId !== null &&
      !isHex(value.repair.linkedRevisionRequestId, 24)) ||
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
    value.repair !== null &&
    ((value.repair.instructionVersion === "legacy-v1" &&
      (value.repair.sourceManifestDigest !== null ||
        value.repair.sourceAggregateDigest !== null ||
        value.repair.sourceValidationDigest !== null ||
        value.repair.sourceSnapshotDigest !== null ||
        value.repair.sourceSnapshotBytes !== null ||
        value.repair.linkedRevisionRequestId !== null)) ||
      (value.repair.instructionVersion === "source-snapshot-v2" &&
        ((value.repair.sourceArtifactRevision !== null &&
          (value.repair.sourceManifestDigest === null ||
            value.repair.sourceAggregateDigest === null ||
            value.repair.sourceValidationDigest === null ||
            value.repair.sourceSnapshotDigest === null ||
            value.repair.sourceSnapshotBytes === null)) ||
          (value.repair.sourceArtifactRevision === null &&
            (value.repair.sourceManifestDigest !== null ||
              value.repair.sourceAggregateDigest !== null ||
              value.repair.sourceValidationDigest !== null ||
              value.repair.sourceSnapshotDigest !== null ||
              value.repair.sourceSnapshotBytes !== null ||
              value.repair.linkedRevisionRequestId !== null)))))
  ) {
    throw new CreatorPersistenceError(500, "record_corrupt", "Creator repair source snapshot evidence is inconsistent.");
  }
  if (value.repair?.instructionVersion === "source-snapshot-v2" && value.repair.sourceArtifactRevision !== null) {
    const repairSource = value.materializations.find(
      (candidate) => candidate.artifactRevision === value.repair?.sourceArtifactRevision
    );
    const repairSourceMaterializedEvents = value.auditEvents.filter(
      (event) =>
        event.eventType === "revision.materialized" &&
        event.artifactRevision === value.repair?.sourceArtifactRevision
    );
    const repairSourceMaterializedEvent = repairSourceMaterializedEvents[0] ?? null;
    const repairSourceManifestEvents = repairSourceMaterializedEvent === null
      ? []
      : value.auditEvents.filter(
          (event) =>
            event.eventType === "export.manifest_created" &&
            event.artifactRevision === value.repair?.sourceArtifactRevision &&
            event.sourceRunId === repairSourceMaterializedEvent.sourceRunId
        );
    const repairSourceManifestEvent = repairSourceManifestEvents[0] ?? null;
    const repairSourceTopologyCompletedEvent =
      value.topologyRepair?.status === "completed" &&
      value.topologyRepair.targetArtifactRevision ===
        value.repair.sourceArtifactRevision
        ? value.auditEvents.find(
            (event) =>
              event.eventType === "topology.repair_completed" &&
              event.artifactRevision === value.repair?.sourceArtifactRevision &&
              event.sourceRunId === repairSourceMaterializedEvent?.sourceRunId
          ) ?? null
        : null;
    const repairSourceBinding = repairSourceMaterializedEvent === null
      ? null
      : value.runBindings.find(
          (binding) => binding.sourceRunId === repairSourceMaterializedEvent.sourceRunId
        ) ?? null;
    const repairSourceAuditReferenceIds =
      repairSourceMaterializedEvent !== null && repairSourceManifestEvent !== null
        ? [
            ...value.auditEvents
              .filter(
                (event) =>
                  event.stateRevision < repairSourceMaterializedEvent.stateRevision &&
                  event.eventType !== "recovery.requested" &&
                  event.eventType !== "recovery.completed"
              )
              .map((event) => event.eventId),
            repairSourceMaterializedEvent.eventId,
            repairSourceManifestEvent.eventId,
            ...(repairSourceTopologyCompletedEvent === null
              ? []
              : [repairSourceTopologyCompletedEvent.eventId]),
          ]
        : [];
    const expectedRepairSourceManifestDigest =
      repairSource !== undefined &&
      repairSourceMaterializedEvent !== null &&
      repairSourceManifestEvent !== null &&
      repairSourceBinding !== null
        ? hashCreatorCanonicalJson({
            manifestVersion: CREATOR_MANIFEST_VERSION,
            creatorProjectId: value.identity.projectId,
            projectTitle: value.identity.projectTitle,
            creatorKind: value.identity.creatorKind,
            artifactRevision: repairSource.artifactRevision,
            entrypoint: repairSource.entrypoint,
            files: repairSource.files,
            aggregateBytes: repairSource.aggregateBytes,
            aggregateDigest: repairSource.aggregateDigest,
            validationDigest: repairSource.validationDigest,
            ...(repairSource.topologyRepairDigest === undefined
              ? {}
              : {
                  topologyRepairDigest:
                    repairSource.topologyRepairDigest,
                }),
            ...(repairSource.topologyTransformationDigest === undefined
              ? {}
              : {
                  topologyTransformationDigest:
                    repairSource.topologyTransformationDigest,
                }),
            sourceRequestDigest: value.request.requestDigest,
            sourceRunId: repairSourceBinding.sourceRunId,
            providerKey: repairSourceBinding.providerKey,
            modelKey: repairSourceBinding.modelKey,
            runtimeModel: repairSourceBinding.runtimeModel,
            dataBoundary: repairSourceBinding.dataBoundary,
            createdAt: repairSource.materializedAt,
            auditReferenceIds: repairSourceAuditReferenceIds,
          })
        : null;
    const linkedRevision = value.repair.linkedRevisionRequestId === null
      ? null
      : value.revisionRequests.find(
          (request) => request.requestId === value.repair?.linkedRevisionRequestId
        ) ?? null;
    const latestRevisionAtRepair = value.revisionRequests
      .filter((request) => request.requestedAt <= value.repair!.requestedAt)
      .at(-1) ?? null;
    const linkedRevisionBinding = linkedRevision === null
      ? null
      : value.runBindings.find(
          (binding) =>
            binding.purpose === "revision" &&
            binding.operationSlot === `revision-${linkedRevision.revisionNumber}`
        ) ?? null;
    if (
      !repairSource ||
      repairSourceMaterializedEvents.length !== 1 ||
      repairSourceManifestEvents.length !== 1 ||
      expectedRepairSourceManifestDigest !== value.repair.sourceManifestDigest ||
      repairSource.aggregateDigest !== value.repair.sourceAggregateDigest ||
      repairSource.validationDigest !== value.repair.sourceValidationDigest ||
      (value.repair.linkedRevisionRequestId !== null &&
        (linkedRevision === null ||
          latestRevisionAtRepair?.requestId !== linkedRevision.requestId ||
          linkedRevision.sourceArtifactRevision !== value.repair.sourceArtifactRevision ||
          linkedRevision.targetArtifactRevision !== value.repair.targetArtifactRevision ||
          linkedRevision.rejectedAt === null ||
          linkedRevision.rejectedAt > value.repair.requestedAt ||
          linkedRevisionBinding === null ||
          !value.auditEvents.some(
            (event) =>
              event.eventType === "output.rejected" &&
              event.sourceRunId === linkedRevisionBinding.sourceRunId &&
              event.occurredAt >= linkedRevision.rejectedAt
          ) ||
          (linkedRevision.completedAt !== null &&
            (linkedRevision.completionPurpose !== "repair" ||
              linkedRevision.completionSourceRunId !== repairBinding?.sourceRunId))))
    ) {
      throw new CreatorPersistenceError(500, "record_corrupt", "Creator repair source snapshot is not bound to its immutable publication.");
    }
  }
  if (
    (value.repair === null && repairBinding !== null) ||
    (repairBinding !== null && value.repair !== null &&
      (repairBinding.sourceArtifactRevision !== value.repair.sourceArtifactRevision ||
        repairBinding.responseContractVersion !==
          value.repair.responseContractVersion ||
        repairBinding.requestEnvelopeDigest !== value.repair.repairContextDigest)) ||
    (value.approvalPacket?.purpose === "repair" && (
      value.repair === null ||
      value.approvalPacket.sourceArtifactRevision !== value.repair.sourceArtifactRevision
    ))
  ) {
    throw new CreatorPersistenceError(500, "record_corrupt", "Creator repair provenance is not bound to its exact source artifact revision.");
  }

  let priorRevisionRequestedAt: string | null = null;
  for (let index = 0; index < value.revisionRequests.length; index += 1) {
    const request = value.revisionRequests[index];
    const requestRecord: unknown = request;
    if (!isRecord(requestRecord)) {
      throw new CreatorPersistenceError(
        500,
        "record_corrupt",
        "Creator explicit revision request is malformed or rewrites its immutable plan."
      );
    }
    const expectedRevisionNumber = index + 1;
    const sourceMaterialization = value.materializations.find(
      (candidate) => candidate.artifactRevision === request.sourceArtifactRevision
    );
    const expectedOperationSlot = `revision-${expectedRevisionNumber}` as CreatorRunOperationSlot;
    const boundRevisionRun = value.runBindings.find(
      (binding) => binding.operationSlot === expectedOperationSlot
    );
    const expectedRevisionInstructionDigest = request.instructionDigest;
    const targetMaterialization = value.materializations.find(
      (candidate) => candidate.artifactRevision === request.targetArtifactRevision
    );
    const immutablePlanBase = {
      instructionVersion: request.instructionVersion,
      ...(request.responseContractVersion === "server-owned-page-v1"
        ? { responseContractVersion: request.responseContractVersion }
        : {}),
      requestId: request.requestId,
      revisionNumber: request.revisionNumber,
      sourceArtifactRevision: request.sourceArtifactRevision,
      targetArtifactRevision: request.targetArtifactRevision,
      sourceManifestDigest: request.sourceManifestDigest,
      sourceAggregateDigest: request.sourceAggregateDigest,
      sourceValidationDigest: request.sourceValidationDigest,
      sourceSnapshotDigest: request.sourceSnapshotDigest,
      sourceSnapshotBytes: request.sourceSnapshotBytes,
      instructionDigest: request.instructionDigest,
      revisionBrief: request.revisionBrief,
      revisionBriefDigest: request.revisionBriefDigest,
      destinationBoundary: request.destinationBoundary,
      contractVersion: CREATOR_CONTRACT_VERSION,
      entrypoint: "index.html" as const,
      modelEnvelope: value.plan?.modelEnvelope,
      filePolicy: CREATOR_FILE_POLICY,
      orderedSteps: CREATOR_ORDERED_PLAN_STEPS,
      capabilityStatement: CREATOR_CAPABILITY_STATEMENT,
      limitationStatement: CREATOR_LIMITATION_STATEMENT,
      requestedAt: request.requestedAt,
    };
    const milestones = [
      request.planApprovedAt,
      request.runBoundAt,
      request.generationApprovedAt,
      request.executionRequestedAt,
      request.completedAt,
    ];
    const presentMilestones = milestones.filter(
      (timestamp): timestamp is string => timestamp !== null
    );
    if (
      !hasExactKeys(requestRecord, [
        "instructionVersion", "responseContractVersion", "requestId", "revisionNumber", "sourceArtifactRevision", "targetArtifactRevision",
        "sourceManifestDigest", "sourceAggregateDigest", "sourceValidationDigest",
        "sourceSnapshotDigest", "sourceSnapshotBytes", "instructionDigest",
        "revisionBrief", "revisionBriefDigest", "destinationBoundary", "planDigest",
        "requestedAt", "planApprovedAt", "runBoundAt", "generationApprovedAt",
        "executionRequestedAt", "rejectedAt", "completionPurpose",
        "completionSourceRunId", "completedAt",
      ]) ||
      request.instructionVersion !== "source-snapshot-v1" ||
      !CREATOR_RESPONSE_CONTRACT_VERSIONS.includes(
        request.responseContractVersion as never
      ) ||
      !isHex(request.requestId, 24) ||
      request.revisionNumber !== expectedRevisionNumber ||
      !isRevision(request.sourceArtifactRevision) ||
      request.targetArtifactRevision !== request.sourceArtifactRevision + 1 ||
      request.targetArtifactRevision > CREATOR_MAX_MATERIALIZATIONS ||
      !isHex(request.sourceManifestDigest, 64) ||
      !isHex(request.sourceAggregateDigest, 64) ||
      !isHex(request.sourceValidationDigest, 64) ||
      !isHex(request.sourceSnapshotDigest, 64) ||
      !Number.isSafeInteger(request.sourceSnapshotBytes) ||
      request.sourceSnapshotBytes < 1 ||
      request.sourceSnapshotBytes > CREATOR_FILE_POLICY.maximumAggregateBytes * 4 ||
      !isHex(request.instructionDigest, 64) ||
      !isBoundedString(request.revisionBrief, CREATOR_MAX_REVISION_BRIEF_LENGTH) ||
      !isSafeCreatorVisibleUnicode(request.revisionBrief) ||
      request.revisionBriefDigest !== hashCreatorSha256(request.revisionBrief) ||
      request.destinationBoundary !==
        buildCreatorDestinationBoundary(value.identity.projectId, request.targetArtifactRevision) ||
      request.planDigest !== hashCreatorCanonicalJson(immutablePlanBase) ||
      !isIsoTimestamp(request.requestedAt) ||
      (priorRevisionRequestedAt !== null && request.requestedAt <= priorRevisionRequestedAt) ||
      !milestones.every((timestamp) => timestamp === null || isIsoTimestamp(timestamp)) ||
      (request.rejectedAt !== null && !isIsoTimestamp(request.rejectedAt)) ||
      (request.completionPurpose !== null &&
        request.completionPurpose !== "revision" &&
        request.completionPurpose !== "repair") ||
      (request.completionSourceRunId !== null &&
        !isPrivateAlphaRunId(request.completionSourceRunId)) ||
      (request.completedAt === null) !==
        (request.completionPurpose === null) ||
      (request.completedAt === null) !==
        (request.completionSourceRunId === null) ||
      (request.rejectedAt !== null &&
        (request.executionRequestedAt === null ||
          request.rejectedAt < request.executionRequestedAt ||
          !value.auditEvents.some(
            (event) =>
              event.eventType === "output.rejected" &&
              event.occurredAt >= request.rejectedAt &&
              event.sourceRunId === boundRevisionRun?.sourceRunId
          ))) ||
      presentMilestones.some(
        (timestamp, milestoneIndex) =>
          timestamp <= (presentMilestones[milestoneIndex - 1] ?? request.requestedAt)
      ) ||
      presentMilestones.some((timestamp) => timestamp > value.updatedAt) ||
      milestones.some(
        (timestamp, milestoneIndex) =>
          timestamp === null && milestones.slice(milestoneIndex + 1).some(Boolean)
      ) ||
      !sourceMaterialization ||
      (value.exportManifest !== null &&
        request.sourceArtifactRevision === value.exportManifest.artifactRevision &&
        request.sourceManifestDigest !== value.exportManifest.manifestDigest) ||
      request.sourceAggregateDigest !== sourceMaterialization.aggregateDigest ||
      request.sourceValidationDigest !== sourceMaterialization.validationDigest ||
      (request.runBoundAt === null) !== (boundRevisionRun === undefined) ||
      (boundRevisionRun !== undefined &&
        (boundRevisionRun.purpose !== "revision" ||
          boundRevisionRun.responseContractVersion !==
            request.responseContractVersion ||
          boundRevisionRun.sourceArtifactRevision !== request.sourceArtifactRevision ||
          boundRevisionRun.boundAt !== request.runBoundAt ||
          boundRevisionRun.requestEnvelopeDigest !==
            expectedRevisionInstructionDigest ||
          (boundRevisionRun.approvalRecordedAt === null) !==
            (request.generationApprovedAt === null) ||
          (boundRevisionRun.approvalRecordedAt !== null &&
            request.generationApprovedAt !== null &&
            request.generationApprovedAt <
              boundRevisionRun.approvalRecordedAt) ||
          boundRevisionRun.executionRequestedAt !==
            request.executionRequestedAt)) ||
      (request.completedAt !== null &&
        (!targetMaterialization ||
          request.completedAt !== targetMaterialization.materializedAt ||
          !value.auditEvents.some(
            (event) =>
              isRecord(event) &&
              event.eventType === "revision.materialized" &&
              event.artifactRevision === request.targetArtifactRevision &&
              event.sourceRunId === request.completionSourceRunId
          ) ||
          (request.completionPurpose === "revision" &&
            (request.rejectedAt !== null ||
              request.completionSourceRunId !== boundRevisionRun?.sourceRunId)) ||
          (request.completionPurpose === "repair" &&
            (request.rejectedAt === null ||
              value.repair === null ||
              value.repair.linkedRevisionRequestId !== request.requestId ||
              value.repair.targetArtifactRevision !== request.targetArtifactRevision ||
              request.completionSourceRunId !== repairBinding?.sourceRunId ||
              !value.auditEvents.some(
                (event) =>
                  event.eventType === "repair.result_accepted" &&
                  event.artifactRevision === request.targetArtifactRevision &&
                  event.sourceRunId === request.completionSourceRunId
              )))))
    ) {
      throw new CreatorPersistenceError(
        500,
        "record_corrupt",
        "Creator explicit revision request is malformed or rewrites its immutable plan."
      );
    }
    priorRevisionRequestedAt = request.requestedAt;
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
      targetArtifactRevision > CREATOR_MAX_MATERIALIZATIONS ||
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
      (validationRunBinding.outputReceivedAt !== value.validation.completedAt &&
        !(
          value.topologyRepair !== null &&
          validationRunBinding.sourceRunId ===
            value.topologyRepair.sourceRunId &&
          value.validation.completedAt ===
            value.topologyRepair.constructedAt
        )) ||
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

  if (value.artifactProposalBinding !== null) {
    const proposalRunBinding = value.runBindings.find(
      (binding) =>
        binding.sourceRunId === value.artifactProposalBinding?.sourceRunId &&
        binding.purpose === value.artifactProposalBinding?.purpose
    );
    const documentTopology = proposalRunBinding?.documentTopology ?? null;
    if (documentTopology !== null && value.artifactProposal !== null) {
      const indexHtml = value.artifactProposal.files.find(
        (file) => file.path === "index.html"
      );
      const proposalBundleDigest = hashCreatorCanonicalJson({
        contractVersion: value.artifactProposal.contractVersion,
        projectTitle: value.artifactProposal.projectTitle,
        creatorKind: value.artifactProposal.creatorKind,
        entrypoint: value.artifactProposal.entrypoint,
        files: value.artifactProposal.files,
        explanation: value.artifactProposal.explanation ?? null,
      });
      if (
        indexHtml === undefined ||
        hashCreatorSha256(indexHtml.content) !==
          documentTopology.outputHtmlSha256 ||
        proposalBundleDigest !== documentTopology.outputBundleDigest
      ) {
        throw new CreatorPersistenceError(
          500,
          "record_corrupt",
          "Creator proposal does not match its exact server-owned document topology output."
        );
      }
    }
  }

  if (value.topologyRepair !== null) {
    const repair = value.topologyRepair;
    const repairRecord: unknown = repair;
    const sourceBinding = value.runBindings.find(
      (binding) => binding.sourceRunId === repair.sourceRunId
    );
    const targetMaterialization = value.materializations.find(
      (materialization) =>
        materialization.artifactRevision === repair.targetArtifactRevision
    );
    const indexHtml = value.artifactProposal?.files.find(
      (file) => file.path === "index.html"
    );
    const expectedTopologyRepairDigest = hashCreatorCanonicalJson(repair);
    const hasExactOperations =
      hashCreatorCanonicalJson(repair.orderedOperations) ===
      hashCreatorCanonicalJson(CREATOR_TOPOLOGY_REPAIR_OPERATIONS);
    if (
      !isRecord(repairRecord) ||
      !hasExactKeys(repairRecord, [
        "status", "sourceStateRevision", "sourceRunId", "sourceRunRevision",
        "sourceOutputSha256", "sourceValidationIssueDigest", "providerRequests",
        "repairKind", "originalValidationState", "automaticRepair",
        "operatorAuthorized", "sourceResponseContractVersion",
        "responseContractVersion", "canonicalizerVersion", "orderedOperations",
        "inputHtmlSha256", "outputHtmlSha256", "inputBundleDigest",
        "outputBundleDigest", "validationDigest", "transformationDigest",
        "targetArtifactRevision", "requestedAt", "constructedAt", "completedAt",
      ]) ||
      !["pending", "completed"].includes(repair.status) ||
      !isRevision(repair.sourceStateRevision) ||
      repair.sourceStateRevision >= value.stateRevision ||
      !isPrivateAlphaRunId(repair.sourceRunId) ||
      !isRevision(repair.sourceRunRevision) ||
      !isHex(repair.sourceOutputSha256, 64) ||
      !isHex(repair.sourceValidationIssueDigest, 64) ||
      repair.providerRequests !== 0 ||
      repair.repairKind !== "server-owned-document-topology" ||
      repair.originalValidationState !== "rejected_output" ||
      repair.automaticRepair !== false ||
      repair.operatorAuthorized !== true ||
      repair.sourceResponseContractVersion !== "legacy-bundle-v1" ||
      repair.responseContractVersion !== "server-owned-page-v1" ||
      repair.canonicalizerVersion !== CREATOR_TOPOLOGY_CANONICALIZER_VERSION ||
      !Array.isArray(repair.orderedOperations) ||
      !hasExactOperations ||
      !isHex(repair.inputHtmlSha256, 64) ||
      !isHex(repair.outputHtmlSha256, 64) ||
      !isHex(repair.inputBundleDigest, 64) ||
      !isHex(repair.outputBundleDigest, 64) ||
      !isHex(repair.validationDigest, 64) ||
      !isHex(repair.transformationDigest, 64) ||
      repair.transformationDigest !==
        buildCreatorTopologyTransformationDigest(repair) ||
      !isRevision(repair.targetArtifactRevision) ||
      !isIsoTimestamp(repair.requestedAt) ||
      !isIsoTimestamp(repair.constructedAt) ||
      repair.requestedAt > repair.constructedAt ||
      repair.constructedAt > value.updatedAt ||
      (repair.status === "pending"
        ? repair.completedAt !== null ||
          !["validating", "failed", "rejected_output"].includes(value.status) ||
          targetMaterialization !== undefined
        : !isIsoTimestamp(repair.completedAt) ||
          repair.completedAt !==
            new Date(Date.parse(repair.constructedAt) + 1).toISOString() ||
          repair.completedAt > value.updatedAt ||
          targetMaterialization === undefined ||
          targetMaterialization.materializedAt !== repair.completedAt ||
          targetMaterialization.topologyRepairDigest !==
            expectedTopologyRepairDigest) ||
      sourceBinding === undefined ||
      sourceBinding.purpose !== "generation" ||
      sourceBinding.responseContractVersion !==
        repair.sourceResponseContractVersion ||
      sourceBinding.sourceRunRevision !== repair.sourceRunRevision ||
      sourceBinding.outputReceivedAt === null ||
      value.initialProviderResponseContractVersion !==
        repair.sourceResponseContractVersion ||
      value.artifactProposalBinding?.purpose !== "generation" ||
      value.artifactProposalBinding.sourceRunId !== repair.sourceRunId ||
      value.artifactProposal === null ||
      value.validation === null ||
      !value.validation.valid ||
      value.validation.completedAt !== repair.constructedAt ||
      value.validation.bundleDigest !== repair.outputBundleDigest ||
      buildCreatorValidationDigest(value.validation) !== repair.validationDigest ||
      indexHtml === undefined ||
      hashCreatorSha256(indexHtml.content) !== repair.outputHtmlSha256
    ) {
      throw new CreatorPersistenceError(
        500,
        "record_corrupt",
        "Creator topology repair provenance is malformed or not bound to its exact source and deterministic output."
      );
    }
  }
  const completedTopologyRepairDigest =
    value.topologyRepair?.status === "completed"
      ? hashCreatorCanonicalJson(value.topologyRepair)
      : undefined;
  if (
    value.materializations.some(
      (materialization) =>
        materialization.topologyRepairDigest !==
        (value.topologyRepair?.status === "completed" &&
        materialization.artifactRevision ===
          value.topologyRepair.targetArtifactRevision
          ? completedTopologyRepairDigest
          : undefined)
    )
  ) {
    throw new CreatorPersistenceError(
      500,
      "record_corrupt",
      "Creator materialization topology provenance is inconsistent."
    );
  }

  if (
    value.repair !== null &&
    repairBinding === null
  ) {
    const validation = value.validation;
    if (!validation) {
      throw new CreatorPersistenceError(500, "record_corrupt", "Creator repair context is missing its source validation result.");
    }
    const expectedIssueCodes = validation.issues.map((issue) => issue.code).slice(0, 64);
    const expectedLegacyRepairInstruction = value.repair.instructionVersion === "legacy-v1"
      ? buildLegacyCreatorRepairInstruction({
          projectTitle: value.identity.projectTitle,
          description: value.request.description,
          sourceArtifactRevision: value.repair.sourceArtifactRevision,
          issueDigest: validation.issueDigest,
          issues: validation.issues,
        })
      : null;
    if (
      value.repair.validationIssueDigest !== validation.issueDigest ||
      hashCreatorCanonicalJson(value.repair.issueCodes) !==
        hashCreatorCanonicalJson(expectedIssueCodes) ||
      (expectedLegacyRepairInstruction !== null &&
        value.repair.repairContextDigest !==
          hashCreatorSha256(expectedLegacyRepairInstruction))
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
      !hasOnlyKeys(value.exportManifest, [
        "manifestVersion", "creatorProjectId", "projectTitle", "creatorKind", "artifactRevision",
        "entrypoint", "files", "aggregateBytes", "aggregateDigest", "validationDigest",
        "topologyRepairDigest", "topologyTransformationDigest",
        "sourceRequestDigest", "sourceRunId", "providerKey", "modelKey", "runtimeModel",
        "dataBoundary", "createdAt", "auditReferenceIds", "manifestDigest",
      ]) ||
      ![
        "manifestVersion", "creatorProjectId", "projectTitle", "creatorKind",
        "artifactRevision", "entrypoint", "files", "aggregateBytes",
        "aggregateDigest", "validationDigest", "sourceRequestDigest", "sourceRunId",
        "providerKey", "modelKey", "runtimeModel", "dataBoundary", "createdAt",
        "auditReferenceIds", "manifestDigest",
      ].every((key) => Object.hasOwn(value.exportManifest!, key)) ||
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
      (value.exportManifest.topologyRepairDigest !== undefined &&
        !isHex(value.exportManifest.topologyRepairDigest, 64)) ||
      (value.exportManifest.topologyTransformationDigest !== undefined &&
        !isHex(value.exportManifest.topologyTransformationDigest, 64)) ||
      (value.exportManifest.topologyRepairDigest !== undefined &&
        value.exportManifest.topologyTransformationDigest !== undefined) ||
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
    const topologyRepairCompletedEvent =
      value.topologyRepair?.status === "completed" &&
      value.topologyRepair.targetArtifactRevision ===
        exportManifest.artifactRevision
        ? value.auditEvents.find(
            (event) =>
              event.eventType === "topology.repair_completed" &&
              event.artifactRevision === exportManifest.artifactRevision &&
              event.sourceRunId === exportManifest.sourceRunId
          ) ?? null
        : null;
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
          ...(topologyRepairCompletedEvent === null
            ? []
            : [topologyRepairCompletedEvent.eventId]),
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
      value.exportManifest.topologyRepairDigest !==
        matchingMaterialization.topologyRepairDigest ||
      value.exportManifest.topologyTransformationDigest !==
        matchingMaterialization.topologyTransformationDigest ||
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
  const packetMatches = (
    purpose: "generation" | "repair" | "revision",
    status: "awaiting" | "approved"
  ) =>
    value.approvalPacket?.purpose === purpose && value.approvalPacket.status === status;
  const latestProposalPurpose = value.artifactProposalBinding?.purpose ?? null;
  const latestRevisionRequest = value.revisionRequests.at(-1) ?? null;
  const restoredPriorPublication =
    ["ready", "preview_available", "repair_requested"].includes(value.status) &&
    value.exportManifest !== null &&
    value.materializations.at(-1)?.artifactRevision ===
      value.exportManifest.artifactRevision &&
    value.auditEvents.some(
      (event) =>
        event.eventType === "prior_publication.restored" &&
        event.artifactRevision === value.exportManifest?.artifactRevision &&
        event.sourceRunId === value.exportManifest?.sourceRunId
    );
  const planOnlyPhaseMismatch =
    (value.status === "awaiting_plan_approval" &&
      (value.plan === null ||
        value.approvalPacket !== null ||
        value.runBindings.length !== 0)) ||
    (value.status === "awaiting_revision_plan_approval" &&
      (latestRevisionRequest === null ||
        latestRevisionRequest.runBoundAt !== null ||
        value.approvalPacket !== null));
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
    (value.status === "awaiting_revision_generation_approval" &&
      !packetMatches("revision", "awaiting")) ||
    (["revision_generation_approved", "revising"].includes(value.status) &&
      !packetMatches("revision", "approved")) ||
    (value.status === "stopping" &&
      !["generation", "repair", "revision"].includes(value.approvalPacket?.purpose ?? "")) ||
    (value.status === "stopped" &&
      (!latestRevisionRequest && value.runBindings.length === 0)) ||
    (["validating", "rejected_output", "ready", "preview_available", "repair_requested"].includes(value.status) &&
      !restoredPriorPublication &&
      (latestProposalPurpose === null ||
        !packetMatches(latestProposalPurpose, "approved")));
  const repairPhaseMissingRequest =
    [
      "repair_requested",
      "awaiting_repair_approval",
      "repair_approved",
      "repairing",
    ].includes(value.status) && value.repair === null;
  if (planOnlyPhaseMismatch || phaseApprovalMismatch || repairPhaseMissingRequest) {
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
    current.initialProviderResponseContractVersion !==
      next.initialProviderResponseContractVersion ||
    next.updatedAt < current.updatedAt ||
    !exact(current.identity, next.identity) ||
    !exact(current.request, next.request) ||
    (current.plan !== null && !exact(current.plan, next.plan)) ||
    (current.repair !== null && !exact(current.repair, next.repair)) ||
    !exactPrefix(current.auditEvents, next.auditEvents) ||
    !exactPrefix(current.idempotencyRecords, next.idempotencyRecords) ||
    !exactPrefix(current.materializations, next.materializations) ||
    current.revisionRequests.length > next.revisionRequests.length ||
    next.revisionRequests.length > current.revisionRequests.length + 1 ||
    next.auditEvents.length <= current.auditEvents.length
  ) {
    throw new CreatorPersistenceError(500, "record_corrupt", "Creator revision rewrites immutable or append-only history.");
  }
  const immutableRevisionRequest = (
    request: CreatorProjectState["revisionRequests"][number]
  ) => ({
      instructionVersion: request.instructionVersion,
      responseContractVersion: request.responseContractVersion,
      requestId: request.requestId,
    revisionNumber: request.revisionNumber,
    sourceArtifactRevision: request.sourceArtifactRevision,
    targetArtifactRevision: request.targetArtifactRevision,
    sourceManifestDigest: request.sourceManifestDigest,
    sourceAggregateDigest: request.sourceAggregateDigest,
    sourceValidationDigest: request.sourceValidationDigest,
    sourceSnapshotDigest: request.sourceSnapshotDigest,
    sourceSnapshotBytes: request.sourceSnapshotBytes,
    instructionDigest: request.instructionDigest,
    revisionBrief: request.revisionBrief,
    revisionBriefDigest: request.revisionBriefDigest,
    destinationBoundary: request.destinationBoundary,
    planDigest: request.planDigest,
    requestedAt: request.requestedAt,
  });
  const revisionMilestones = (
    request: CreatorProjectState["revisionRequests"][number]
  ) => [
    request.planApprovedAt,
    request.runBoundAt,
    request.generationApprovedAt,
    request.executionRequestedAt,
    request.completedAt,
  ] as const;
  const milestoneAdvances: number[][] = [];
  for (let index = 0; index < current.revisionRequests.length; index += 1) {
    const prior = current.revisionRequests[index];
    const candidate = next.revisionRequests[index];
    const priorMilestones = revisionMilestones(prior);
    const candidateMilestones = revisionMilestones(candidate);
    milestoneAdvances[index] = candidateMilestones.flatMap(
      (timestamp, milestoneIndex) =>
        priorMilestones[milestoneIndex] === null && timestamp !== null
          ? [milestoneIndex]
          : []
    );
    if (
      !candidate ||
      !exact(immutableRevisionRequest(prior), immutableRevisionRequest(candidate)) ||
      priorMilestones.some(
        (timestamp, milestoneIndex) =>
          timestamp !== null && candidateMilestones[milestoneIndex] !== timestamp
      ) ||
      (prior.rejectedAt !== null && candidate.rejectedAt !== prior.rejectedAt) ||
      (prior.rejectedAt === null && candidate.rejectedAt !== null &&
        !(next.status === "rejected_output" &&
          next.artifactProposalBinding?.purpose === "revision")) ||
      (prior.completionPurpose !== null &&
        candidate.completionPurpose !== prior.completionPurpose) ||
      (prior.completionSourceRunId !== null &&
        candidate.completionSourceRunId !== prior.completionSourceRunId) ||
      ((candidate.completedAt === null) !==
        (candidate.completionPurpose === null)) ||
      ((candidate.completedAt === null) !==
        (candidate.completionSourceRunId === null))
    ) {
      throw new CreatorPersistenceError(
        500,
        "record_corrupt",
        "Creator revision rewrites immutable explicit-revision provenance."
      );
    }
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
  const immutableTopologyRepair = (
    repair: NonNullable<CreatorProjectState["topologyRepair"]>
  ) => ({
    sourceStateRevision: repair.sourceStateRevision,
    sourceRunId: repair.sourceRunId,
    sourceRunRevision: repair.sourceRunRevision,
    sourceOutputSha256: repair.sourceOutputSha256,
    sourceValidationIssueDigest: repair.sourceValidationIssueDigest,
    providerRequests: repair.providerRequests,
    repairKind: repair.repairKind,
    originalValidationState: repair.originalValidationState,
    automaticRepair: repair.automaticRepair,
    operatorAuthorized: repair.operatorAuthorized,
    sourceResponseContractVersion: repair.sourceResponseContractVersion,
    responseContractVersion: repair.responseContractVersion,
    canonicalizerVersion: repair.canonicalizerVersion,
    orderedOperations: repair.orderedOperations,
    inputHtmlSha256: repair.inputHtmlSha256,
    outputHtmlSha256: repair.outputHtmlSha256,
    inputBundleDigest: repair.inputBundleDigest,
    outputBundleDigest: repair.outputBundleDigest,
    validationDigest: repair.validationDigest,
    transformationDigest: repair.transformationDigest,
    targetArtifactRevision: repair.targetArtifactRevision,
    requestedAt: repair.requestedAt,
    constructedAt: repair.constructedAt,
  });
  const startsTopologyRepair =
    current.topologyRepair === null &&
    next.topologyRepair?.status === "pending" &&
    current.status === "rejected_output" &&
    appendedEventTypes.includes("topology.repair_requested") &&
    appendedEventTypes.includes("topology.document_constructed");
  const completesTopologyRepair =
    current.topologyRepair?.status === "pending" &&
    next.topologyRepair?.status === "completed" &&
    transitionKey === "validating>ready";
  if (
    (startsTopologyRepair &&
      (next.topologyRepair.sourceStateRevision !== current.stateRevision ||
        next.topologyRepair.sourceValidationIssueDigest !==
          current.validation?.issueDigest ||
        current.validation?.valid !== false ||
        next.topologyRepair.sourceRunId !==
          current.artifactProposalBinding?.sourceRunId ||
        next.topologyRepair.targetArtifactRevision !==
          current.materializations.length + 1 ||
        next.topologyRepair.requestedAt !== next.updatedAt ||
        next.topologyRepair.constructedAt !== next.updatedAt)) ||
    (completesTopologyRepair &&
      (!exact(
        immutableTopologyRepair(current.topologyRepair),
        immutableTopologyRepair(next.topologyRepair)
      ) ||
        next.topologyRepair.completedAt !== next.updatedAt)) ||
    (!startsTopologyRepair &&
      !completesTopologyRepair &&
      !exact(current.topologyRepair, next.topologyRepair)) ||
    (current.topologyRepair?.status === "completed" &&
      !exact(current.topologyRepair, next.topologyRepair))
  ) {
    throw new CreatorPersistenceError(
      500,
      "record_corrupt",
      "Creator topology repair rewrites immutable provenance or advances outside its exact deterministic lifecycle."
    );
  }
  const latestExistingRevisionIndex = current.revisionRequests.length - 1;
  const expectedRevisionMilestoneAdvance = (() => {
    if (
      transitionKey ===
        "awaiting_revision_plan_approval>awaiting_revision_plan_approval" &&
      appendedEventTypes[0] === "revision.plan_approval_requested"
    ) return 0;
    if (
      transitionKey ===
      "awaiting_revision_plan_approval>awaiting_revision_generation_approval"
    ) return 1;
    if (
      transitionKey ===
        "awaiting_revision_generation_approval>revision_generation_approved"
    ) return 2;
    if (
      transitionKey === "awaiting_revision_generation_approval>canceled" &&
      appendedEventTypes.includes("approval.recorded")
    ) return 2;
    if (transitionKey === "revision_generation_approved>revising") return 3;
    if (
      transitionKey === "validating>ready" &&
      current.artifactProposalBinding?.purpose === "revision"
    ) return 4;
    if (
      transitionKey === "validating>ready" &&
      current.artifactProposalBinding?.purpose === "repair" &&
      current.repair?.linkedRevisionRequestId ===
        current.revisionRequests.at(-1)?.requestId &&
      next.revisionRequests.at(-1)?.completionPurpose === "repair" &&
      next.revisionRequests.at(-1)?.completionSourceRunId ===
        current.approvalPacket?.privateAlphaRunId
    ) return 4;
    return null;
  })();
  if (
    milestoneAdvances.some((advances, index) =>
      expectedRevisionMilestoneAdvance === null
        ? advances.length !== 0
        : index === latestExistingRevisionIndex
          ? advances.length !== 1 ||
            advances[0] !== expectedRevisionMilestoneAdvance
          : advances.length !== 0
    )
  ) {
    throw new CreatorPersistenceError(
      500,
      "record_corrupt",
      "Creator explicit-revision milestones did not advance one exact ordered lifecycle gate."
    );
  }
  if (transitionKey === "ready>awaiting_revision_plan_approval") {
    const request = next.revisionRequests.at(-1);
    const source = current.materializations.at(-1);
    const manifest = current.exportManifest;
    if (
      !request ||
      !source ||
      !manifest ||
      request.revisionNumber !== current.revisionRequests.length + 1 ||
      request.sourceArtifactRevision !== source.artifactRevision ||
      request.sourceArtifactRevision !== manifest.artifactRevision ||
      request.targetArtifactRevision !== source.artifactRevision + 1 ||
      request.sourceManifestDigest !== manifest.manifestDigest ||
      request.sourceAggregateDigest !== source.aggregateDigest ||
      request.sourceValidationDigest !== source.validationDigest ||
      request.requestedAt <= current.updatedAt ||
      request.requestedAt > next.updatedAt
    ) {
      throw new CreatorPersistenceError(
        500,
        "record_corrupt",
        "Creator explicit revision was not appended from the exact latest immutable publication."
      );
    }
  }
  const capturesProviderOutput =
    ["generating", "repairing", "revising"].includes(current.status) &&
    appendedEventTypes.includes("output.received");
  const capturesTopologyRepairOutput = startsTopologyRepair;
  if (
    !capturesProviderOutput &&
    !capturesTopologyRepairOutput &&
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
    (next.repair === null &&
      next.revisionRequests.length === 0 &&
      next.materializations.length > 1)
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
    "draft>awaiting_plan_approval",
    "awaiting_plan_approval>awaiting_generation_approval",
    "awaiting_generation_approval>approved",
    "generating>rejected_output",
    "generating>failed",
    "validating>rejected_output",
    "validating>ready",
    "validating>failed",
    "ready>awaiting_revision_plan_approval",
    "awaiting_revision_plan_approval>awaiting_revision_generation_approval",
    "awaiting_revision_generation_approval>revision_generation_approved",
    "generating>stopping",
    "revising>stopping",
    "repairing>stopping",
    "revising>rejected_output",
    "revising>failed",
    "stopping>stopped",
    "ready>preview_available",
    "preview_available>ready",
    "repair_requested>awaiting_repair_approval",
    "repair_requested>failed",
    "awaiting_repair_approval>repair_approved",
    "repairing>failed",
    "ready>exported",
    "failed>exported",
    "rejected_output>ready",
    "failed>ready",
    "stopped>ready",
    "draft>canceled",
    "awaiting_generation_approval>canceled",
    "approved>canceled",
    "awaiting_plan_approval>canceled",
    "awaiting_revision_plan_approval>canceled",
    "awaiting_revision_generation_approval>canceled",
    "revision_generation_approved>canceled",
    "rejected_output>canceled",
    "ready>canceled",
    "preview_available>canceled",
    "repair_requested>canceled",
    "awaiting_repair_approval>canceled",
    "repair_approved>canceled",
    "failed>canceled",
  ]);
  const expectedIdempotencyDelta =
    idempotentCompletionTransitions.has(transitionKey) ||
    completesRecovery ||
    appendedEventTypes.includes("topology.repair_rejected")
      ? 1
      : 0;
  if (idempotencyDelta !== expectedIdempotencyDelta) {
    throw new CreatorPersistenceError(500, "record_corrupt", "Creator revision appended an invalid number of idempotency records.");
  }
  if (idempotencyDelta === 1) {
    const record = next.idempotencyRecords.at(-1);
    const expectedMutationKinds: Readonly<Record<string, readonly string[]>> = {
      "draft>awaiting_generation_approval": ["create"],
      "draft>awaiting_plan_approval": ["prepare-plan"],
      "awaiting_plan_approval>awaiting_generation_approval": ["approve-plan"],
      "awaiting_generation_approval>approved": ["approve-generation"],
      "generating>rejected_output": ["execute-generation"],
      "generating>failed": ["execute-generation"],
      "validating>rejected_output": ["execute-generation"],
      "validating>ready": [
        next.topologyRepair?.status === "completed"
          ? "repair-document-topology"
          : next.artifactProposalBinding?.purpose === "repair"
          ? "execute-repair"
          : next.artifactProposalBinding?.purpose === "revision"
            ? "execute-revision-generation"
          : "execute-generation",
      ],
      "validating>failed": [
        next.topologyRepair !== null
          ? "repair-document-topology"
          : next.artifactProposalBinding?.purpose === "repair"
          ? "execute-repair"
          : next.artifactProposalBinding?.purpose === "revision"
            ? "execute-revision-generation"
          : "execute-generation",
      ],
      "ready>awaiting_revision_plan_approval": ["request-revision"],
      "awaiting_revision_plan_approval>awaiting_revision_generation_approval": ["approve-revision-plan"],
      "awaiting_revision_generation_approval>revision_generation_approved": ["approve-revision-generation"],
      "revising>rejected_output": ["execute-revision-generation"],
      "revising>failed": ["execute-revision-generation"],
      "generating>stopping": ["stop-generation"],
      "revising>stopping": ["stop-generation"],
      "repairing>stopping": ["stop-generation"],
      "stopping>stopped": [
        next.approvalPacket?.purpose === "revision"
          ? "execute-revision-generation"
          : next.approvalPacket?.purpose === "repair"
            ? "execute-repair"
            : "execute-generation",
      ],
      "ready>preview_available": ["start-preview"],
      "preview_available>ready": ["stop-preview"],
      "rejected_output>repair_requested": [],
      "rejected_output>rejected_output": ["repair-document-topology"],
      "ready>repair_requested": [],
      "repair_requested>awaiting_repair_approval": ["request-repair"],
      "repair_requested>failed": ["request-repair"],
      "awaiting_repair_approval>repair_approved": ["approve-repair"],
      "repairing>failed": ["execute-repair"],
      "ready>exported": ["export"],
      "failed>exported": ["export"],
      "rejected_output>ready": ["restore-prior-publication"],
      "failed>ready": ["restore-prior-publication"],
      "stopped>ready": ["restore-prior-publication"],
      "draft>canceled": ["cancel"],
      "awaiting_generation_approval>canceled": ["cancel"],
      "approved>canceled": ["cancel"],
      "awaiting_plan_approval>canceled": ["cancel"],
      "awaiting_revision_plan_approval>canceled": ["cancel"],
      "awaiting_revision_generation_approval>canceled": ["cancel"],
      "revision_generation_approved>canceled": ["cancel"],
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
    transitionKey === "repair_requested>awaiting_repair_approval" ||
    transitionKey === "awaiting_plan_approval>awaiting_generation_approval" ||
    transitionKey ===
      "awaiting_revision_plan_approval>awaiting_revision_generation_approval";
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
    const expectedPurpose =
      transitionKey.startsWith("draft>") ||
      transitionKey.startsWith("awaiting_plan_approval>")
        ? "generation"
        : transitionKey.startsWith("awaiting_revision_plan_approval>")
          ? "revision"
          : "repair";
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
          runEvent.artifactRevision !== next.repair.sourceArtifactRevision)) ||
      (expectedPurpose === "revision" &&
        (next.revisionRequests.at(-1)?.runBoundAt !== binding.boundAt ||
          binding.sourceArtifactRevision !==
            next.revisionRequests.at(-1)?.sourceArtifactRevision ||
          runEvent.artifactRevision !== binding.sourceArtifactRevision))
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
    transitionKey === "awaiting_repair_approval>repair_approved" ||
    transitionKey ===
      "awaiting_revision_generation_approval>revision_generation_approved";
  const startsExplicitRevision =
    transitionKey === "ready>awaiting_revision_plan_approval";
  const activeRunCancellation =
    next.status === "canceled" &&
    [
      "awaiting_generation_approval",
      "approved",
      "awaiting_revision_generation_approval",
      "revision_generation_approved",
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
    !startsExplicitRevision &&
    !exact(current.approvalPacket, next.approvalPacket)
  ) {
    throw new CreatorPersistenceError(500, "record_corrupt", "Creator approval packet changed outside its exact bind, approval, or pre-execution cancellation transition.");
  }
  if (startsExplicitRevision && next.approvalPacket !== null) {
    throw new CreatorPersistenceError(
      500,
      "record_corrupt",
      "Creator explicit revision did not clear the prior approval packet before its plan-only gate."
    );
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
    transitionKey === "rejected_output>validating" ||
    transitionKey === "validating>ready" ||
    appendedEventTypes[0] === "prior_publication.restored";
  if (
    (!failureEvidenceMayChange &&
      (current.failureCode !== next.failureCode ||
        current.failureMessage !== next.failureMessage)) ||
    ((transitionKey === "rejected_output>validating" ||
      transitionKey === "validating>ready" ||
      appendedEventTypes[0] === "prior_publication.restored") &&
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
    const latestRevision = current.revisionRequests.at(-1) ?? null;
    const expectedLinkedRevision =
      current.artifactProposalBinding?.purpose === "revision" &&
      latestRevision?.targetArtifactRevision === repair.targetArtifactRevision
        ? latestRevision
        : null;
    const expectedLinkedRevisionBinding = expectedLinkedRevision === null
      ? null
      : current.runBindings.find(
          (binding) =>
            binding.purpose === "revision" &&
            binding.operationSlot === `revision-${expectedLinkedRevision.revisionNumber}`
        ) ?? null;
    if (
      repair.instructionVersion !== "source-snapshot-v2" ||
      repair.requestedAt < current.updatedAt ||
      repair.requestedAt > next.updatedAt ||
      repair.validationIssueDigest !== validation.issueDigest ||
      !exact(repair.issueCodes, expectedIssueCodes) ||
      repair.sourceArtifactRevision !==
        (current.materializations.at(-1)?.artifactRevision ?? null) ||
      repair.targetArtifactRevision !== (repair.sourceArtifactRevision ?? 0) + 1 ||
      (repair.sourceArtifactRevision !== null &&
        (repair.sourceManifestDigest !== current.exportManifest?.manifestDigest ||
          repair.sourceAggregateDigest !== current.materializations.at(-1)?.aggregateDigest ||
          repair.sourceValidationDigest !== current.materializations.at(-1)?.validationDigest ||
          repair.sourceSnapshotDigest === null ||
          repair.sourceSnapshotBytes === null)) ||
      (expectedLinkedRevision === null
        ? repair.linkedRevisionRequestId !== null
        : repair.linkedRevisionRequestId !== expectedLinkedRevision.requestId) ||
      (expectedLinkedRevision !== null &&
        (expectedLinkedRevision.rejectedAt === null ||
          expectedLinkedRevision.completedAt !== null ||
          expectedLinkedRevisionBinding === null ||
          current.artifactProposalBinding?.sourceRunId !==
            expectedLinkedRevisionBinding.sourceRunId)) ||
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
      "awaiting_revision_generation_approval",
      "revision_generation_approved",
      "revising",
      "stopping",
      "awaiting_repair_approval",
      "repair_approved",
      "repairing",
    ].includes(current.status)) {
      return current.approvalPacket?.privateAlphaRunId ?? null;
    }
    if (current.status === "validating") {
      return current.artifactProposalBinding?.sourceRunId ?? null;
    }
    if (
      current.status === "rejected_output" &&
      appendedEventTypes.includes("topology.repair_requested")
    ) {
      return (
        next.topologyRepair?.sourceRunId ??
        current.artifactProposalBinding?.sourceRunId ??
        null
      );
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
    "plan.approval_requested",
    "approval.requested",
    "execution.requested",
    "repair.requested",
    "topology.repair_requested",
    "revision.plan_approval_requested",
    "cancellation.requested",
  ]);
  const originalIntentAppliesToCurrentState = (
    event: CreatorProjectState["auditEvents"][number]
  ): boolean => {
    if (event.eventType === "plan.approval_requested") {
      return current.status === "awaiting_plan_approval";
    }
    if (event.eventType === "revision.plan_approval_requested") {
      return current.status === "awaiting_revision_plan_approval";
    }
    if (event.eventType === "approval.requested") {
      return [
        "awaiting_generation_approval",
        "awaiting_repair_approval",
        "awaiting_revision_generation_approval",
      ].includes(current.status);
    }
    if (event.eventType === "execution.requested") {
      return [
        "generating",
        "repairing",
        "revising",
        "validating",
        "stopping",
      ].includes(current.status);
    }
    if (event.eventType === "repair.requested") return current.status === "repair_requested";
    if (event.eventType === "topology.repair_requested") {
      return (
        current.status === "validating" &&
        current.topologyRepair?.status === "pending"
      );
    }
    if (event.eventType === "cancellation.requested") {
      return [
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
      (event.eventType === "plan.approval_requested" &&
        noSource &&
        noArtifact &&
        current.status === "awaiting_plan_approval" &&
        next.plan !== null) ||
      (event.eventType === "plan.approved" &&
        noArtifact &&
        sourceBinding?.purpose === "generation" &&
        next.status === "awaiting_generation_approval" &&
        next.approvalPacket?.privateAlphaRunId === event.sourceRunId) ||
      (event.eventType === "revision.requested" &&
        noSource &&
        event.artifactRevision ===
          next.revisionRequests.at(-1)?.sourceArtifactRevision &&
        (next.revisionRequests.at(-1)?.requestedAt ?? event.occurredAt) <=
          event.occurredAt) ||
      (event.eventType === "revision.plan_approval_requested" &&
        noSource &&
        event.artifactRevision ===
          next.revisionRequests.at(-1)?.sourceArtifactRevision &&
        next.revisionRequests.at(-1)?.planApprovedAt !== null &&
        (next.revisionRequests.at(-1)?.planApprovedAt ?? event.occurredAt) <=
          event.occurredAt) ||
      (event.eventType === "revision.plan_approved" &&
        sourceBinding?.purpose === "revision" &&
        event.sourceRunId === next.runBindings.at(-1)?.sourceRunId &&
        event.artifactRevision === sourceBinding.sourceArtifactRevision &&
        next.revisionRequests.at(-1)?.runBoundAt === sourceBinding.boundAt) ||
      (event.eventType === "run.bound" &&
        ((sourceBinding?.purpose === "generation" && noArtifact) ||
          (sourceBinding?.purpose === "revision" &&
            event.artifactRevision === sourceBinding.sourceArtifactRevision)) &&
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
          "awaiting_plan_approval",
          "awaiting_generation_approval",
          "approved",
          "awaiting_revision_plan_approval",
          "awaiting_revision_generation_approval",
          "revision_generation_approved",
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
        (sourceBinding?.outputReceivedAt === next.validation?.completedAt ||
          (next.topologyRepair !== null &&
            event.sourceRunId === next.topologyRepair.sourceRunId &&
            next.topologyRepair.constructedAt ===
              next.validation?.completedAt)) &&
        next.artifactProposalBinding?.sourceRunId === event.sourceRunId) ||
      (event.eventType === "topology.repair_requested" &&
        noArtifact &&
        current.status === "rejected_output" &&
        sourceBinding?.purpose === "generation" &&
        event.sourceRunId === activeMutationSourceRunId &&
        (next.topologyRepair === null ||
          (next.topologyRepair.sourceStateRevision === current.stateRevision &&
            next.topologyRepair.requestedAt === event.occurredAt))) ||
      (event.eventType === "topology.document_constructed" &&
        noArtifact &&
        ((sourceBinding?.purpose === "generation" &&
          next.topologyRepair?.status === "pending" &&
          next.topologyRepair.sourceRunId === event.sourceRunId &&
          next.topologyRepair.constructedAt === event.occurredAt &&
          next.validation?.valid === true) ||
          (sourceBinding?.responseContractVersion ===
            "server-owned-page-v1" &&
            sourceBinding.documentTopology !== null &&
            ["generating", "repairing", "revising"].includes(
              current.status
            ) &&
            next.artifactProposalBinding?.sourceRunId ===
              event.sourceRunId &&
            next.validation !== null))) ||
      (event.eventType === "topology.repair_completed" &&
        sourceBinding?.purpose === "generation" &&
        next.topologyRepair?.status === "completed" &&
        next.topologyRepair.sourceRunId === event.sourceRunId &&
        next.topologyRepair.targetArtifactRevision === event.artifactRevision &&
        next.topologyRepair.completedAt === event.occurredAt &&
        expectedPublishedRevision === event.artifactRevision) ||
      (event.eventType === "topology.repair_rejected" &&
        noArtifact &&
        sourceBinding?.purpose === "generation" &&
        event.sourceRunId === activeMutationSourceRunId &&
        next.failureCode === "topology_repair_failed") ||
      (event.eventType === "output.rejected" &&
        noArtifact &&
        event.sourceRunId === activeMutationSourceRunId &&
        (sourceBinding?.purpose === "generation" ||
          sourceBinding?.purpose === "revision") &&
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
      (event.eventType === "generation.stop_requested" &&
        noArtifact &&
        next.status === "stopping" &&
        sourceBinding !== null &&
        (sourceBinding.purpose === "generation" ||
          sourceBinding.purpose === "repair" ||
          sourceBinding.purpose === "revision") &&
        sourceBinding.executionRequestedAt !== null) ||
      (event.eventType === "output.discarded" &&
        noArtifact &&
        next.status === "stopped" &&
        sourceBinding !== null &&
        (sourceBinding.purpose === "generation" ||
          sourceBinding.purpose === "repair" ||
          sourceBinding.purpose === "revision")) ||
      (event.eventType === "generation.stopped" &&
        noArtifact &&
        next.status === "stopped" &&
        sourceBinding !== null &&
        (sourceBinding.purpose === "generation" ||
          sourceBinding.purpose === "repair" ||
          sourceBinding.purpose === "revision")) ||
      (event.eventType === "preview.started" &&
        noSource &&
        next.preview.status === "active" &&
        next.preview.artifactRevision === event.artifactRevision) ||
      (event.eventType === "preview.stopped" &&
        noSource &&
        next.preview.status === "stopped" &&
        next.preview.artifactRevision === event.artifactRevision) ||
      (event.eventType === "prior_publication.restored" &&
        ["rejected_output", "failed", "stopped"].includes(current.status) &&
        next.status === "ready" &&
        current.exportManifest !== null &&
        next.exportManifest?.manifestDigest ===
          current.exportManifest.manifestDigest &&
        event.artifactRevision === current.exportManifest.artifactRevision &&
        event.sourceRunId === current.exportManifest.sourceRunId &&
        current.materializations.at(-1)?.artifactRevision ===
          event.artifactRevision &&
        current.runBindings.some(
          (binding) =>
            (binding.purpose === "revision" || binding.purpose === "repair") &&
            binding.sourceArtifactRevision === event.artifactRevision &&
            binding.sourceRunId !== event.sourceRunId &&
            binding.executionAttempted
        )) ||
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
      operationSlot: prior.operationSlot,
      sourceRunId: prior.sourceRunId,
      ownershipBindingId: prior.ownershipBindingId,
      approvalScopeHash: prior.approvalScopeHash,
      providerKey: prior.providerKey,
      modelKey: prior.modelKey,
      runtimeModel: prior.runtimeModel,
      dataBoundary: prior.dataBoundary,
      maximumOutputTokens: prior.maximumOutputTokens,
      responseContractVersion: prior.responseContractVersion,
      requestEnvelopeDigest: prior.requestEnvelopeDigest,
      sourceArtifactRevision: prior.sourceArtifactRevision,
      boundAt: prior.boundAt,
    };
    const immutableCandidate = {
      purpose: candidate?.purpose,
      operationSlot: candidate?.operationSlot,
      sourceRunId: candidate?.sourceRunId,
      ownershipBindingId: candidate?.ownershipBindingId,
      approvalScopeHash: candidate?.approvalScopeHash,
      providerKey: candidate?.providerKey,
      modelKey: candidate?.modelKey,
      runtimeModel: candidate?.runtimeModel,
      dataBoundary: candidate?.dataBoundary,
      maximumOutputTokens: candidate?.maximumOutputTokens,
      responseContractVersion: candidate?.responseContractVersion,
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
    const capturesDocumentTopology =
      prior.documentTopology === null &&
      candidate?.documentTopology !== null;
    const expectsDocumentTopologyCapture =
      prior.responseContractVersion === "server-owned-page-v1" &&
      ["generating", "repairing", "revising"].includes(current.status) &&
      appendedEvents.some(
        (event) =>
          event.eventType === "output.received" &&
          event.sourceRunId === prior.sourceRunId
      ) &&
      appendedEvents.some(
        (event) =>
          event.eventType === "topology.document_constructed" &&
          event.sourceRunId === prior.sourceRunId
      );
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
      (prior.documentTopology !== null &&
        !exact(prior.documentTopology, candidate.documentTopology)) ||
      capturesDocumentTopology !== expectsDocumentTopologyCapture ||
      (prior.executionAttempted && !candidate.executionAttempted)
    ) {
      throw new CreatorPersistenceError(500, "record_corrupt", "Creator revision rewrites bound source-run provenance.");
    }
    if (
      (prior.approvalRecordedAt === null && candidate.approvalRecordedAt !== null &&
        (candidate.sourceRunRevision !==
            prior.sourceRunRevision + (next.status === "canceled" ? 2 : 1) ||
          (!["approved", "repair_approved", "revision_generation_approved"].includes(next.status) &&
            !(next.status === "canceled" &&
              [
                "awaiting_generation_approval",
                "awaiting_repair_approval",
                "awaiting_revision_generation_approval",
              ].includes(current.status))))) ||
      (prior.executionRequestedAt === null && candidate.executionRequestedAt !== null &&
        (candidate.sourceRunRevision !== prior.sourceRunRevision ||
          candidate.executionIdempotencyKeyHash === null ||
          candidate.executionRequestedAt < lifecycleMilestoneLowerBound ||
          candidate.executionRequestedAt > next.updatedAt ||
          !["generating", "repairing", "revising"].includes(next.status))) ||
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
        "awaiting_revision_generation_approval",
        "revision_generation_approved",
        "awaiting_repair_approval",
        "repair_approved",
      ].includes(current.status);
    const reconcilesApprovalBeforeCancel =
      cancelsBoundRun &&
      prior.approvalRecordedAt === null &&
      candidate.approvalRecordedAt !== null;
    const recordsTerminalRunFailure =
      next.status === "failed" &&
      ["generating", "repairing", "revising"].includes(current.status) &&
      sourceRevisionDelta >= 1 &&
      sourceRevisionDelta <= 2 &&
      appendedEvents.some(
        (event) =>
          event.eventType === "failure.recorded" &&
          event.sourceRunId === prior.sourceRunId
      );
    const recordsStoppedRun =
      next.status === "stopped" &&
      current.status === "stopping" &&
      sourceRevisionDelta >= 1 &&
      sourceRevisionDelta <= 2 &&
      appendedEvents.some(
        (event) =>
          event.eventType === "generation.stopped" &&
          event.sourceRunId === prior.sourceRunId
      );
    if (
      !addedApproval &&
      !addedOutput &&
      !recordsTerminalRunFailure &&
      !recordsStoppedRun &&
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
      transitionKey === "awaiting_repair_approval>repair_approved" ||
      transitionKey ===
        "awaiting_revision_generation_approval>revision_generation_approved") &&
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
        "awaiting_revision_generation_approval",
        "revision_generation_approved",
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
    project.revisionRequests.length !== 0 ||
    project.topologyRepair !== null ||
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
  return validatePersistedState(
    upgradeLegacyPersistedState(envelope.project),
    projectId
  );
}

export type CreatorPersistence = Readonly<{
  schemaVersion: 3;
  dataRootLabel: string;
  filesystem: CreatorOwnedFilesystem;
  initialize: () => Promise<void>;
  withInventoryLock: <T>(operation: () => Promise<T>) => Promise<T>;
  withProjectLock: <T>(projectId: string, operation: () => Promise<T>) => Promise<T>;
  readProject: (projectId: string) => Promise<CreatorProjectState>;
  readProjectRevision: (projectId: string, revision: number) => Promise<CreatorProjectState>;
  readProjectIfPresent: (projectId: string) => Promise<CreatorProjectState | null>;
  listProjects: (limit?: number) => Promise<readonly CreatorProjectState[]>;
  writeInitialProject: (project: CreatorProjectState) => Promise<void>;
  writeNextProject: (project: CreatorProjectState, expectedPreviousRevision: number) => Promise<void>;
  cleanupTestRoot: () => Promise<void>;
}>;

export async function projectCreatorCatalogue<T>(
  source: Pick<CreatorPersistence, "filesystem" | "readProject">,
  project: (state: CreatorProjectState) => readonly T[]
): Promise<T[]> {
  if (!(await source.filesystem.rootExists())) return [];
  let entries: readonly string[];
  try {
    entries = await source.filesystem.listDirectory(["projects"]);
  } catch (error) {
    if (error instanceof CreatorFilesystemError && error.code === "not_found") return [];
    throw mapFilesystemError(error);
  }
  const projectIds = entries.filter((entry) => /^[a-f0-9]{24}$/.test(entry));
  if (projectIds.length > CREATOR_MAX_PROJECT_RECORDS) {
    throw new CreatorPersistenceError(
      409, "project_capacity_reached",
      `Creator project inventory exceeds the bounded ${CREATOR_MAX_PROJECT_RECORDS}-record scan ceiling.`
    );
  }
  const projected: T[] = [];
  for (const projectId of projectIds) {
    let state: CreatorProjectState;
    try {
      state = await source.readProject(projectId);
    } catch (error) {
      if (error instanceof CreatorPersistenceError && error.status === 404) continue;
      throw error;
    }
    projected.push(...project(state));
  }
  return projected;
}

function createPersistence(
  dataRootLabel: string,
  suppliedFilesystem?: CreatorOwnedFilesystem
): CreatorPersistence {
  const filesystem = suppliedFilesystem ?? new CreatorOwnedFilesystem(dataRootLabel);
  if (filesystem.dataRootLabel !== dataRootLabel) {
    throw new CreatorPersistenceError(
      500,
      "unsafe_creator_root",
      "Creator persistence filesystem identity does not match its exact data root."
    );
  }

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
    schemaVersion: 3,
    dataRootLabel,
    filesystem,
    initialize,
    async withInventoryLock<T>(operation: () => Promise<T>): Promise<T> {
      return withLocalInventoryAdmission(() =>
        withNamedLock("inventory", operation)
      );
    },
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
      const boundedLimit = Number.isSafeInteger(limit)
        ? Math.max(1, Math.min(CREATOR_MAX_PROJECT_RECORDS, limit))
        : 20;
      const projects = await projectCreatorCatalogue({ filesystem, readProject }, (state) => [state]);
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

export function createCreatorPersistenceFromFilesystem(
  filesystem: CreatorOwnedFilesystem
): CreatorPersistence {
  return createPersistence(filesystem.dataRootLabel, filesystem);
}
