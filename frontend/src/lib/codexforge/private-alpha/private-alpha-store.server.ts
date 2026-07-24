import "server-only";

import {
  lstat,
  mkdir,
  readFile,
  readdir,
  rename,
  unlink,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import { createHash, randomBytes, randomUUID } from "node:crypto";
import {
  CODEXFORGE_PROJECT_ROOT,
  isAbsolutePathInsideBase,
  joinCodexForgeSafeRelativePath,
  toPortableRelativePath,
} from "@/lib/codexforge/server-safe-paths";
import {
  PrivateAlphaProviderError,
  type PrivateAlphaProviderAdapter,
} from "./private-alpha-provider.server";
import { createPrivateAlphaOllamaProviderAdapter } from "./private-alpha-ollama-adapter.server";
import { readPrivateAlphaKillSwitchState } from "./private-alpha-kill-switch.server";
import {
  PRIVATE_ALPHA_INITIAL_RUN_STATE,
  assertPrivateAlphaTransition,
} from "./private-alpha-state-machine";
import {
  PRIVATE_ALPHA_RECORD_VERSION,
  type PrivateAlphaApprovalInput,
  type PrivateAlphaApprovalRecord,
  type PrivateAlphaApprovalScope,
  type PrivateAlphaAuditActor,
  type PrivateAlphaAuditEvent,
  type PrivateAlphaAuditEventType,
  type PrivateAlphaCancellationInput,
  type PrivateAlphaCancellationRecord,
  type PrivateAlphaCreateRunResult,
  type PrivateAlphaExecuteInput,
  type PrivateAlphaExecuteRunResult,
  type PrivateAlphaExecutionErrorCode,
  type PrivateAlphaExecutionRecord,
  type PrivateAlphaExecutionStatus,
  type PrivateAlphaRunRecord,
  type PrivateAlphaRunRequest,
  type PrivateAlphaRunState,
  type PrivateAlphaRunSummary,
  type PrivateAlphaStatus,
} from "./private-alpha-types";
import {
  PRIVATE_ALPHA_DATA_ROOT_LABEL,
  PRIVATE_ALPHA_LEGACY_RUNTIME_PROFILE,
  PRIVATE_ALPHA_MAX_DONE_REASON_LENGTH,
  PRIVATE_ALPHA_MAX_OUTPUT_TEXT_LENGTH,
  PRIVATE_ALPHA_MAX_SAFE_ERROR_MESSAGE_LENGTH,
  PRIVATE_ALPHA_PRODUCTION_EXECUTION_MODE,
  PRIVATE_ALPHA_PRODUCTION_MODEL,
  PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID,
  PRIVATE_ALPHA_PRODUCTION_PROVIDER_LABEL,
  PRIVATE_ALPHA_RUN_ID_LENGTH,
  PRIVATE_ALPHA_TEST_DATA_ROOT_PREFIX,
  buildPrivateAlphaApprovalScope,
  buildPrivateAlphaRunRequest,
  buildPrivateAlphaRunSummary,
  isPrivateAlphaLegacyRunConfiguration,
  isPrivateAlphaLocalExecutionConfiguration,
  resolvePrivateAlphaApprovalStatement,
  sanitizePrivateAlphaTestingSuffix,
  serializePrivateAlphaApprovalScope,
  serializePrivateAlphaRunRequest,
  type PrivateAlphaRuntimeProfile,
  validatePrivateAlphaApprovalInput,
  validatePrivateAlphaCancellationInput,
  validatePrivateAlphaCreateRunInput,
  validatePrivateAlphaExecuteInput,
  validatePrivateAlphaIdempotencyKey,
  validatePrivateAlphaListLimit,
  validatePrivateAlphaRunId,
} from "./private-alpha-validation";

type PrivateAlphaErrorStatus = 400 | 404 | 409 | 422 | 500 | 503 | 504;

type PrivateAlphaStoreOptions = Readonly<{
  dataRootLabel?: string;
  runtimeProfile?: PrivateAlphaRuntimeProfile;
  providerAdapter?: PrivateAlphaProviderAdapter;
}>;

type PrivateAlphaResolvedPaths = Readonly<{
  dataRootLabel: string;
  dataRootAbsolutePath: string;
  runsDirectoryAbsolutePath: string;
  idempotencyDirectoryAbsolutePath: string;
  killSwitchFileAbsolutePath: string;
}>;

type PrivateAlphaIdempotencyRecord = Readonly<{
  version: typeof PRIVATE_ALPHA_RECORD_VERSION;
  idempotencyKeyHash: string;
  canonicalRequestHash: string;
  runId: string;
  createdAt: string;
}>;

type PrivateAlphaFailureResponse = Readonly<{
  errorCode: PrivateAlphaExecutionErrorCode;
  safeErrorMessage: string;
  responseStatus: 200 | 409 | 503 | 504;
}>;

export type PrivateAlphaStore = Readonly<{
  getStatus: () => Promise<PrivateAlphaStatus>;
  createRun: (
    body: unknown,
    idempotencyKey: string | null | undefined
  ) => Promise<PrivateAlphaCreateRunResult>;
  listRuns: (limit: string | null | undefined) => Promise<readonly PrivateAlphaRunSummary[]>;
  getRun: (runId: string) => Promise<PrivateAlphaRunRecord>;
  approveRun: (runId: string, body: unknown) => Promise<PrivateAlphaRunRecord>;
  cancelRun: (runId: string, body: unknown) => Promise<PrivateAlphaRunRecord>;
  executeRun: (
    runId: string,
    body: unknown,
    idempotencyKey: string | null | undefined
  ) => Promise<PrivateAlphaExecuteRunResult>;
}>;

const RUN_WRITE_QUEUES = new Map<string, Promise<void>>();
const IDEMPOTENCY_WRITE_QUEUES = new Map<string, Promise<void>>();

export class PrivateAlphaStoreError extends Error {
  readonly status: PrivateAlphaErrorStatus;

  constructor(status: PrivateAlphaErrorStatus, message: string) {
    super(message);
    this.name = "PrivateAlphaStoreError";
    this.status = status;
  }
}

function nowIso(): string {
  return new Date().toISOString();
}

function makeRunId(): string {
  return randomBytes(PRIVATE_ALPHA_RUN_ID_LENGTH / 2).toString("hex");
}

function hashSha256(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function isMissingError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "ENOENT"
  );
}

function isAlreadyExistsError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "EEXIST"
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isIsoTimestamp(value: unknown): value is string {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

function isHexHash(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}

function isSafePositiveInteger(value: unknown): value is number {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= 1 &&
    Number.isSafeInteger(value)
  );
}

function isSafeNonNegativeInteger(value: unknown): value is number {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= 0 &&
    Number.isSafeInteger(value)
  );
}

function isRunState(value: unknown): value is PrivateAlphaRunState {
  return (
    value === "awaiting_approval" ||
    value === "approved" ||
    value === "executing" ||
    value === "succeeded" ||
    value === "failed" ||
    value === "canceled" ||
    value === "blocked"
  );
}

function isExecutionStatus(value: unknown): value is PrivateAlphaExecutionStatus {
  return (
    value === "executing" ||
    value === "succeeded" ||
    value === "failed" ||
    value === "blocked"
  );
}

function isExecutionErrorCode(
  value: unknown
): value is PrivateAlphaExecutionErrorCode {
  return (
    value === "kill_switch_blocked" ||
    value === "ollama_unavailable" ||
    value === "ollama_model_missing" ||
    value === "ollama_timeout" ||
    value === "ollama_http_error" ||
    value === "ollama_malformed_response" ||
    value === "ollama_empty_response" ||
    value === "ollama_output_too_large"
  );
}

function isAuditEventType(value: unknown): value is PrivateAlphaAuditEventType {
  return (
    value === "run.created" ||
    value === "approval.requested" ||
    value === "approval.granted" ||
    value === "execution.started" ||
    value === "execution.succeeded" ||
    value === "execution.failed" ||
    value === "execution.blocked" ||
    value === "run.canceled" ||
    value === "run.blocked"
  );
}

function isAuditActor(value: unknown): value is PrivateAlphaAuditActor {
  return value === "local-operator" || value === "system";
}

function readNullableString(
  record: Record<string, unknown>,
  key: string,
  maximumLength?: number
): string | null | undefined {
  const value = record[key];
  if (value === undefined) {
    return undefined;
  }

  if (value === null) {
    return null;
  }

  if (typeof value !== "string") {
    return undefined;
  }

  if (maximumLength !== undefined && value.length > maximumLength) {
    return undefined;
  }

  return value;
}

function validateStoredRunRequest(value: unknown): PrivateAlphaRunRequest | null {
  if (!isRecord(value)) {
    return null;
  }

  if (
    typeof value.normalizedRequestText !== "string" ||
    !value.normalizedRequestText ||
    typeof value.redactedPreview !== "string" ||
    (value.capability !== "text" && value.capability !== "code") ||
    typeof value.maximumOutputTokens !== "number" ||
    !Number.isInteger(value.maximumOutputTokens) ||
    value.maximumOutputTokens < 1 ||
    value.maximumOutputTokens > 4_096 ||
    value.retentionMode !== "local-private-alpha" ||
    (value.modelPreferenceLabel !== null &&
      typeof value.modelPreferenceLabel !== "string")
  ) {
    return null;
  }

  const providerPreference =
    value.providerPreference === "auto"
      ? "auto"
      : value.providerPreference === "ollama-local"
        ? "ollama-local"
        : null;
  const executionMode =
    value.executionMode === "locked-until-provider-slice"
      ? "locked-until-provider-slice"
      : value.executionMode === "manual-approved-local-provider"
        ? "manual-approved-local-provider"
        : null;

  if (providerPreference === null || executionMode === null) {
    return null;
  }

  const candidate: PrivateAlphaRunRequest = {
    normalizedRequestText: value.normalizedRequestText,
    redactedPreview: value.redactedPreview,
    capability: value.capability,
    providerPreference,
    modelPreferenceLabel: value.modelPreferenceLabel,
    maximumOutputTokens: value.maximumOutputTokens,
    retentionMode: "local-private-alpha",
    executionMode,
  };

  if (
    !isPrivateAlphaLegacyRunConfiguration(candidate) &&
    !isPrivateAlphaLocalExecutionConfiguration(candidate)
  ) {
    return null;
  }

  return candidate;
}

function validateStoredApprovalScope(
  value: unknown
): PrivateAlphaApprovalScope | null {
  if (!isRecord(value)) {
    return null;
  }

  if (
    typeof value.runId !== "string" ||
    (value.capability !== "text" && value.capability !== "code") ||
    !isHexHash(value.normalizedRequestHash) ||
    typeof value.maximumOutputTokens !== "number" ||
    !Number.isInteger(value.maximumOutputTokens) ||
    value.maximumOutputTokens < 1 ||
    value.maximumOutputTokens > 4_096 ||
    value.retentionMode !== "local-private-alpha" ||
    (value.modelPreferenceLabel !== null &&
      typeof value.modelPreferenceLabel !== "string")
  ) {
    return null;
  }

  const providerPreference =
    value.providerPreference === "auto"
      ? "auto"
      : value.providerPreference === "ollama-local"
        ? "ollama-local"
        : null;
  const executionMode =
    value.executionMode === "locked-until-provider-slice"
      ? "locked-until-provider-slice"
      : value.executionMode === "manual-approved-local-provider"
        ? "manual-approved-local-provider"
        : null;

  if (providerPreference === null || executionMode === null) {
    return null;
  }

  const candidate: PrivateAlphaApprovalScope = {
    runId: value.runId,
    capability: value.capability,
    normalizedRequestHash: value.normalizedRequestHash,
    providerPreference,
    modelPreferenceLabel: value.modelPreferenceLabel,
    maximumOutputTokens: value.maximumOutputTokens,
    retentionMode: "local-private-alpha",
    executionMode,
  };

  if (
    !isPrivateAlphaLegacyRunConfiguration(candidate) &&
    !isPrivateAlphaLocalExecutionConfiguration(candidate)
  ) {
    return null;
  }

  return candidate;
}

function validateStoredApprovalRecord(
  value: unknown,
  request: PrivateAlphaRunRequest
): PrivateAlphaApprovalRecord | null {
  if (value === null) {
    return null;
  }

  if (!isRecord(value)) {
    return null;
  }

  const acknowledgement =
    value.acknowledgement === true
      ? true
      : typeof value.acknowledgement === "string"
        ? value.acknowledgement
        : undefined;

  if (
    typeof value.approvalId !== "string" ||
    !value.approvalId ||
    !isIsoTimestamp(value.approvedAt) ||
    value.actor !== "local-operator" ||
    !isHexHash(value.approvalScopeHash) ||
    acknowledgement === undefined ||
    !isSafePositiveInteger(value.previousRevision) ||
    !isSafePositiveInteger(value.resultingRevision) ||
    value.executionAvailabilityStatement !==
      resolvePrivateAlphaApprovalStatement(request.executionMode)
  ) {
    return null;
  }

  return {
    approvalId: value.approvalId,
    approvedAt: value.approvedAt,
    actor: "local-operator",
    approvalScopeHash: value.approvalScopeHash,
    acknowledgement,
    previousRevision: value.previousRevision,
    resultingRevision: value.resultingRevision,
    executionAvailabilityStatement: value.executionAvailabilityStatement,
  };
}

function validateStoredCancellationRecord(
  value: unknown
): PrivateAlphaCancellationRecord | null {
  if (value === null) {
    return null;
  }

  if (!isRecord(value)) {
    return null;
  }

  if (
    typeof value.cancellationId !== "string" ||
    !value.cancellationId ||
    !isIsoTimestamp(value.canceledAt) ||
    value.actor !== "local-operator" ||
    typeof value.reason !== "string" ||
    !value.reason ||
    !isSafePositiveInteger(value.previousRevision) ||
    !isSafePositiveInteger(value.resultingRevision)
  ) {
    return null;
  }

  return {
    cancellationId: value.cancellationId,
    canceledAt: value.canceledAt,
    actor: "local-operator",
    reason: value.reason,
    previousRevision: value.previousRevision,
    resultingRevision: value.resultingRevision,
  };
}

function validateStoredExecutionRecord(
  value: unknown,
  approvalScopeHash: string
): PrivateAlphaExecutionRecord | null {
  if (value === null) {
    return null;
  }

  if (!isRecord(value)) {
    return null;
  }

  const completedAt = readNullableString(value, "completedAt");
  const outputText = readNullableString(
    value,
    "outputText",
    PRIVATE_ALPHA_MAX_OUTPUT_TEXT_LENGTH
  );
  const outputSha256 = readNullableString(value, "outputSha256");
  const doneReason = readNullableString(
    value,
    "doneReason",
    PRIVATE_ALPHA_MAX_DONE_REASON_LENGTH
  );
  const safeErrorMessage = readNullableString(
    value,
    "safeErrorMessage",
    PRIVATE_ALPHA_MAX_SAFE_ERROR_MESSAGE_LENGTH
  );
  const errorCode =
    value.errorCode === null
      ? null
      : isExecutionErrorCode(value.errorCode)
        ? value.errorCode
        : undefined;

  const runningRevision =
    value.runningRevision === null
      ? null
      : isSafePositiveInteger(value.runningRevision)
        ? value.runningRevision
        : undefined;

  if (
    typeof value.executionId !== "string" ||
    !value.executionId ||
    !isExecutionStatus(value.status) ||
    !isHexHash(value.idempotencyKeyHash) ||
    value.provider !== PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID ||
    value.model !== PRIVATE_ALPHA_PRODUCTION_MODEL ||
    value.approvalScopeHash !== approvalScopeHash ||
    !isIsoTimestamp(value.startedAt) ||
    completedAt === undefined ||
    !isSafePositiveInteger(value.previousRevision) ||
    runningRevision === undefined ||
    !isSafePositiveInteger(value.resultingRevision) ||
    outputText === undefined ||
    outputSha256 === undefined ||
    doneReason === undefined ||
    (value.totalDurationNanoseconds !== null &&
      !isSafeNonNegativeInteger(value.totalDurationNanoseconds)) ||
    (value.loadDurationNanoseconds !== null &&
      !isSafeNonNegativeInteger(value.loadDurationNanoseconds)) ||
    (value.promptEvalCount !== null &&
      !isSafeNonNegativeInteger(value.promptEvalCount)) ||
    (value.evalCount !== null && !isSafeNonNegativeInteger(value.evalCount)) ||
    errorCode === undefined ||
    safeErrorMessage === undefined
  ) {
    return null;
  }

  if (outputText !== null) {
    if (!outputSha256 || hashSha256(outputText) !== outputSha256) {
      return null;
    }
  } else if (outputSha256 !== null) {
    return null;
  }

  if (value.status === "executing") {
    if (
      completedAt !== null ||
      outputText !== null ||
      outputSha256 !== null ||
      errorCode !== null ||
      safeErrorMessage !== null ||
      runningRevision === null ||
      value.resultingRevision !== runningRevision
    ) {
      return null;
    }
  }

  if (value.status === "succeeded") {
    if (
      !completedAt ||
      outputText === null ||
      outputSha256 === null ||
      errorCode !== null ||
      safeErrorMessage !== null ||
      runningRevision === null
    ) {
      return null;
    }
  }

  if (value.status === "failed") {
    if (
      !completedAt ||
      outputText !== null ||
      outputSha256 !== null ||
      errorCode === null ||
      errorCode === "kill_switch_blocked" ||
      !safeErrorMessage ||
      runningRevision === null
    ) {
      return null;
    }
  }

  if (value.status === "blocked") {
    if (
      !completedAt ||
      outputText !== null ||
      outputSha256 !== null ||
      errorCode === null ||
      !safeErrorMessage
    ) {
      return null;
    }
  }

  return {
    executionId: value.executionId,
    status: value.status,
    idempotencyKeyHash: value.idempotencyKeyHash,
    provider: PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID,
    model: PRIVATE_ALPHA_PRODUCTION_MODEL,
    approvalScopeHash,
    startedAt: value.startedAt,
    completedAt,
    previousRevision: value.previousRevision,
    runningRevision,
    resultingRevision: value.resultingRevision,
    outputText,
    outputSha256,
    doneReason,
    totalDurationNanoseconds: value.totalDurationNanoseconds,
    loadDurationNanoseconds: value.loadDurationNanoseconds,
    promptEvalCount: value.promptEvalCount,
    evalCount: value.evalCount,
    errorCode,
    safeErrorMessage,
  };
}

function validateStoredAuditEvents(
  value: unknown,
  runId: string
): readonly PrivateAlphaAuditEvent[] | null {
  if (!Array.isArray(value)) {
    return null;
  }

  const events: PrivateAlphaAuditEvent[] = [];
  for (const event of value) {
    if (!isRecord(event)) {
      return null;
    }

    const previousState =
      event.previousState === null || isRunState(event.previousState)
        ? event.previousState
        : undefined;

    if (
      typeof event.eventId !== "string" ||
      !event.eventId ||
      !isAuditEventType(event.eventType) ||
      !isIsoTimestamp(event.occurredAt) ||
      !isAuditActor(event.actor) ||
      event.runId !== runId ||
      previousState === undefined ||
      !isRunState(event.resultingState) ||
      !isSafePositiveInteger(event.revision) ||
      typeof event.summary !== "string" ||
      !event.summary
    ) {
      return null;
    }

    events.push({
      eventId: event.eventId,
      eventType: event.eventType,
      occurredAt: event.occurredAt,
      actor: event.actor,
      runId: event.runId,
      previousState,
      resultingState: event.resultingState,
      revision: event.revision,
      summary: event.summary,
    });
  }

  return events;
}

function validateStoredRunRecord(
  value: unknown,
  expectedRunId: string
): PrivateAlphaRunRecord | null {
  if (!isRecord(value)) {
    return null;
  }

  const runRequest = validateStoredRunRequest(value.request);
  const approvalScope = validateStoredApprovalScope(value.approvalScope);

  if (
    value.version !== PRIVATE_ALPHA_RECORD_VERSION ||
    value.runId !== expectedRunId ||
    !isIsoTimestamp(value.createdAt) ||
    !isIsoTimestamp(value.updatedAt) ||
    !isRunState(value.state) ||
    !isSafePositiveInteger(value.revision) ||
    !isHexHash(value.idempotencyKeyHash) ||
    !runRequest ||
    !approvalScope ||
    !isHexHash(value.approvalScopeHash)
  ) {
    return null;
  }

  const approval = validateStoredApprovalRecord(value.approval, runRequest);
  const cancellation = validateStoredCancellationRecord(value.cancellation);
  const execution = validateStoredExecutionRecord(
    value.execution ?? null,
    value.approvalScopeHash
  );
  const auditEvents = validateStoredAuditEvents(value.auditEvents, expectedRunId);

  if (
    !auditEvents ||
    approvalScope.runId !== expectedRunId ||
    approvalScope.capability !== runRequest.capability ||
    approvalScope.providerPreference !== runRequest.providerPreference ||
    approvalScope.modelPreferenceLabel !== runRequest.modelPreferenceLabel ||
    approvalScope.maximumOutputTokens !== runRequest.maximumOutputTokens ||
    approvalScope.retentionMode !== runRequest.retentionMode ||
    approvalScope.executionMode !== runRequest.executionMode
  ) {
    return null;
  }

  if (approvalScope.normalizedRequestHash !== buildPrivateAlphaNormalizedRequestHash(runRequest)) {
    return null;
  }

  if (value.approvalScopeHash !== buildPrivateAlphaApprovalScopeHash(approvalScope)) {
    return null;
  }

  if (approval && approval.approvalScopeHash !== value.approvalScopeHash) {
    return null;
  }

  if (execution && execution.approvalScopeHash !== value.approvalScopeHash) {
    return null;
  }

  if (value.state === "awaiting_approval") {
    if (approval || cancellation || execution) {
      return null;
    }
  }

  if (value.state === "approved") {
    if (!approval || cancellation || execution) {
      return null;
    }
  }

  if (value.state === "executing") {
    if (!approval || cancellation || !execution || execution.status !== "executing") {
      return null;
    }
  }

  if (value.state === "succeeded") {
    if (!approval || cancellation || !execution || execution.status !== "succeeded") {
      return null;
    }
  }

  if (value.state === "failed") {
    if (!approval || cancellation || !execution || execution.status !== "failed") {
      return null;
    }
  }

  if (value.state === "canceled") {
    if (!cancellation || execution) {
      return null;
    }
  }

  if (value.state === "blocked" && execution && execution.status !== "blocked") {
    return null;
  }

  return {
    version: PRIVATE_ALPHA_RECORD_VERSION,
    runId: value.runId,
    createdAt: value.createdAt,
    updatedAt: value.updatedAt,
    state: value.state,
    revision: value.revision,
    idempotencyKeyHash: value.idempotencyKeyHash,
    request: runRequest,
    approvalScope,
    approvalScopeHash: value.approvalScopeHash,
    approval,
    cancellation,
    execution,
    auditEvents,
  };
}

function validateStoredIdempotencyRecord(
  value: unknown,
  expectedKeyHash: string
): PrivateAlphaIdempotencyRecord | null {
  if (!isRecord(value)) {
    return null;
  }

  if (
    value.version !== PRIVATE_ALPHA_RECORD_VERSION ||
    value.idempotencyKeyHash !== expectedKeyHash ||
    !isHexHash(value.canonicalRequestHash) ||
    typeof value.runId !== "string" ||
    !/^[a-f0-9]{24}$/.test(value.runId) ||
    !isIsoTimestamp(value.createdAt)
  ) {
    return null;
  }

  return {
    version: PRIVATE_ALPHA_RECORD_VERSION,
    idempotencyKeyHash: value.idempotencyKeyHash,
    canonicalRequestHash: value.canonicalRequestHash,
    runId: value.runId,
    createdAt: value.createdAt,
  };
}

function resolveDataRootLabel(dataRootLabel: string): string {
  const absolutePath = joinCodexForgeSafeRelativePath(
    CODEXFORGE_PROJECT_ROOT,
    dataRootLabel
  );

  if (!isAbsolutePathInsideBase(absolutePath, CODEXFORGE_PROJECT_ROOT, false)) {
    throw new PrivateAlphaStoreError(
      500,
      "Private-alpha data root escaped the repository boundary."
    );
  }

  const relativePath = toPortableRelativePath(
    path.relative(CODEXFORGE_PROJECT_ROOT, absolutePath)
  );
  if (!relativePath || relativePath.startsWith("..")) {
    throw new PrivateAlphaStoreError(
      500,
      "Private-alpha data root resolved outside the repository."
    );
  }

  return relativePath;
}

function resolvePaths(options: PrivateAlphaStoreOptions): PrivateAlphaResolvedPaths {
  const dataRootLabel = resolveDataRootLabel(
    options.dataRootLabel ?? PRIVATE_ALPHA_DATA_ROOT_LABEL
  );
  const dataRootAbsolutePath = joinCodexForgeSafeRelativePath(
    CODEXFORGE_PROJECT_ROOT,
    dataRootLabel
  );
  const runsDirectoryAbsolutePath = joinCodexForgeSafeRelativePath(
    dataRootAbsolutePath,
    "runs"
  );
  const idempotencyDirectoryAbsolutePath = joinCodexForgeSafeRelativePath(
    dataRootAbsolutePath,
    "idempotency"
  );
  const killSwitchFileAbsolutePath = joinCodexForgeSafeRelativePath(
    dataRootAbsolutePath,
    "KILL_SWITCH"
  );

  return {
    dataRootLabel,
    dataRootAbsolutePath,
    runsDirectoryAbsolutePath,
    idempotencyDirectoryAbsolutePath,
    killSwitchFileAbsolutePath,
  };
}

function buildRunFileAbsolutePath(
  paths: PrivateAlphaResolvedPaths,
  runId: string
): string {
  return joinCodexForgeSafeRelativePath(
    paths.runsDirectoryAbsolutePath,
    `${runId}.json`
  );
}

function buildIdempotencyFileAbsolutePath(
  paths: PrivateAlphaResolvedPaths,
  idempotencyKeyHash: string
): string {
  return joinCodexForgeSafeRelativePath(
    paths.idempotencyDirectoryAbsolutePath,
    `${idempotencyKeyHash}.json`
  );
}

async function ensureSafeDirectory(directoryAbsolutePath: string): Promise<void> {
  const stat = await lstat(directoryAbsolutePath).catch((error: unknown) => {
    if (isMissingError(error)) {
      return null;
    }

    throw error;
  });

  if (!stat) {
    await mkdir(directoryAbsolutePath, { recursive: true });
  } else if (stat.isSymbolicLink() || !stat.isDirectory()) {
    throw new PrivateAlphaStoreError(500, "Private-alpha storage path is unsafe.");
  }

  const verifiedStat = await lstat(directoryAbsolutePath);
  if (verifiedStat.isSymbolicLink() || !verifiedStat.isDirectory()) {
    throw new PrivateAlphaStoreError(500, "Private-alpha storage path is unsafe.");
  }
}

async function ensureStoreDirectories(paths: PrivateAlphaResolvedPaths): Promise<void> {
  await ensureSafeDirectory(paths.dataRootAbsolutePath);
  await ensureSafeDirectory(paths.runsDirectoryAbsolutePath);
  await ensureSafeDirectory(paths.idempotencyDirectoryAbsolutePath);
}

async function assertSafeExistingFile(fileAbsolutePath: string): Promise<void> {
  const stat = await lstat(fileAbsolutePath).catch((error: unknown) => {
    if (isMissingError(error)) {
      return null;
    }

    throw error;
  });

  if (!stat) {
    return;
  }

  if (stat.isSymbolicLink() || !stat.isFile()) {
    throw new PrivateAlphaStoreError(500, "Persisted private-alpha file is unsafe.");
  }
}

async function readRunRecordFromFile(
  runAbsolutePath: string,
  runId: string
): Promise<PrivateAlphaRunRecord> {
  await assertSafeExistingFile(runAbsolutePath);

  const raw = await readFile(runAbsolutePath, "utf8").catch((error: unknown) => {
    if (isMissingError(error)) {
      throw new PrivateAlphaStoreError(404, "Run not found.");
    }

    throw error;
  });

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new PrivateAlphaStoreError(500, "Persisted run record is malformed.");
  }

  const validated = validateStoredRunRecord(parsed, runId);
  if (!validated) {
    throw new PrivateAlphaStoreError(500, "Persisted run record is malformed.");
  }

  return validated;
}

async function readIdempotencyRecordFromFile(
  idempotencyAbsolutePath: string,
  idempotencyKeyHash: string
): Promise<PrivateAlphaIdempotencyRecord | null> {
  await assertSafeExistingFile(idempotencyAbsolutePath);

  const raw = await readFile(idempotencyAbsolutePath, "utf8").catch((error: unknown) => {
    if (isMissingError(error)) {
      return null;
    }

    throw error;
  });

  if (raw === null) {
    return null;
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new PrivateAlphaStoreError(500, "Persisted idempotency record is malformed.");
  }

  const validated = validateStoredIdempotencyRecord(parsed, idempotencyKeyHash);
  if (!validated) {
    throw new PrivateAlphaStoreError(500, "Persisted idempotency record is malformed.");
  }

  return validated;
}

async function writeJsonFileAtomically(
  fileAbsolutePath: string,
  value: unknown
): Promise<void> {
  await ensureSafeDirectory(path.dirname(fileAbsolutePath));
  await assertSafeExistingFile(fileAbsolutePath);

  const tempAbsolutePath = path.join(
    path.dirname(fileAbsolutePath),
    `.${path.basename(fileAbsolutePath)}.${randomBytes(6).toString("hex")}.tmp`
  );
  const content = `${JSON.stringify(value, null, 2)}\n`;

  await writeFile(tempAbsolutePath, content, { encoding: "utf8", flag: "wx" });

  try {
    await rename(tempAbsolutePath, fileAbsolutePath);
  } catch (error) {
    await unlink(tempAbsolutePath).catch(() => undefined);
    throw error;
  }
}

async function writeExclusiveJsonFile(
  fileAbsolutePath: string,
  value: unknown
): Promise<void> {
  await ensureSafeDirectory(path.dirname(fileAbsolutePath));
  const content = `${JSON.stringify(value, null, 2)}\n`;
  await writeFile(fileAbsolutePath, content, { encoding: "utf8", flag: "wx" });
}

async function withQueue<T>(
  queueMap: Map<string, Promise<void>>,
  key: string,
  work: () => Promise<T>
): Promise<T> {
  const previous = queueMap.get(key) ?? Promise.resolve();

  let release: (() => void) | undefined;
  const current = new Promise<void>((resolve) => {
    release = resolve;
  });

  queueMap.set(key, previous.then(() => current));

  await previous;

  try {
    return await work();
  } finally {
    release?.();
    if (queueMap.get(key) === current) {
      queueMap.delete(key);
    }
  }
}

function buildAuditEvent(input: {
  eventType: PrivateAlphaAuditEventType;
  actor: PrivateAlphaAuditActor;
  runId: string;
  previousState: PrivateAlphaRunState | null;
  resultingState: PrivateAlphaRunState;
  revision: number;
  summary: string;
  occurredAt?: string;
}): PrivateAlphaAuditEvent {
  return {
    eventId: randomUUID(),
    eventType: input.eventType,
    occurredAt: input.occurredAt ?? nowIso(),
    actor: input.actor,
    runId: input.runId,
    previousState: input.previousState,
    resultingState: input.resultingState,
    revision: input.revision,
    summary: input.summary,
  };
}

function buildCreatedRunAuditEvents(
  run: PrivateAlphaRunRecord,
  createdAt: string,
  revision: number
): readonly PrivateAlphaAuditEvent[] {
  const approvalRequestedSummary = isPrivateAlphaLocalExecutionConfiguration(run.request)
    ? "Manual approval scope recorded locally. Execution requires a separate operator action."
    : "Manual approval scope recorded locally. Provider execution remains locked.";

  return [
    buildAuditEvent({
      eventType: "run.created",
      actor: "local-operator",
      runId: run.runId,
      previousState: null,
      resultingState: PRIVATE_ALPHA_INITIAL_RUN_STATE,
      revision,
      summary: "Private-alpha run persisted locally.",
      occurredAt: createdAt,
    }),
    buildAuditEvent({
      eventType: "approval.requested",
      actor: "local-operator",
      runId: run.runId,
      previousState: PRIVATE_ALPHA_INITIAL_RUN_STATE,
      resultingState: PRIVATE_ALPHA_INITIAL_RUN_STATE,
      revision,
      summary: approvalRequestedSummary,
      occurredAt: createdAt,
    }),
  ];
}

function buildExecutionFailureResponse(
  errorCode: PrivateAlphaExecutionErrorCode,
  safeErrorMessage: string
): PrivateAlphaFailureResponse {
  if (errorCode === "kill_switch_blocked") {
    return {
      errorCode,
      safeErrorMessage,
      responseStatus: 409,
    };
  }

  if (errorCode === "ollama_timeout") {
    return {
      errorCode,
      safeErrorMessage,
      responseStatus: 504,
    };
  }

  if (
    errorCode === "ollama_unavailable" ||
    errorCode === "ollama_model_missing" ||
    errorCode === "ollama_empty_response"
  ) {
    return {
      errorCode,
      safeErrorMessage,
      responseStatus: 503,
    };
  }

  return {
    errorCode,
    safeErrorMessage,
    responseStatus: 200,
  };
}

function buildExecutingExecutionRecord(input: {
  run: PrivateAlphaRunRecord;
  idempotencyKeyHash: string;
  startedAt: string;
}): PrivateAlphaExecutionRecord {
  const runningRevision = input.run.revision + 1;

  return {
    executionId: randomUUID(),
    status: "executing",
    idempotencyKeyHash: input.idempotencyKeyHash,
    provider: PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID,
    model: PRIVATE_ALPHA_PRODUCTION_MODEL,
    approvalScopeHash: input.run.approvalScopeHash,
    startedAt: input.startedAt,
    completedAt: null,
    previousRevision: input.run.revision,
    runningRevision,
    resultingRevision: runningRevision,
    outputText: null,
    outputSha256: null,
    doneReason: null,
    totalDurationNanoseconds: null,
    loadDurationNanoseconds: null,
    promptEvalCount: null,
    evalCount: null,
    errorCode: null,
    safeErrorMessage: null,
  };
}

function buildBlockedExecutionRecord(input: {
  run: PrivateAlphaRunRecord;
  idempotencyKeyHash: string;
  blockedAt: string;
  previousRevision: number;
  runningRevision: number | null;
  resultingRevision: number;
  errorCode: "kill_switch_blocked" | "ollama_unavailable" | "ollama_model_missing";
  safeErrorMessage: string;
}): PrivateAlphaExecutionRecord {
  return {
    executionId: input.run.execution?.executionId ?? randomUUID(),
    status: "blocked",
    idempotencyKeyHash: input.idempotencyKeyHash,
    provider: PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID,
    model: PRIVATE_ALPHA_PRODUCTION_MODEL,
    approvalScopeHash: input.run.approvalScopeHash,
    startedAt: input.run.execution?.startedAt ?? input.blockedAt,
    completedAt: input.blockedAt,
    previousRevision: input.previousRevision,
    runningRevision: input.runningRevision,
    resultingRevision: input.resultingRevision,
    outputText: null,
    outputSha256: null,
    doneReason: null,
    totalDurationNanoseconds: null,
    loadDurationNanoseconds: null,
    promptEvalCount: null,
    evalCount: null,
    errorCode: input.errorCode,
    safeErrorMessage: input.safeErrorMessage,
  };
}

function buildFailedExecutionRecord(input: {
  run: PrivateAlphaRunRecord;
  failedAt: string;
  resultingRevision: number;
  errorCode:
    | "ollama_unavailable"
    | "ollama_model_missing"
    | "ollama_timeout"
    | "ollama_http_error"
    | "ollama_malformed_response"
    | "ollama_empty_response"
    | "ollama_output_too_large";
  safeErrorMessage: string;
}): PrivateAlphaExecutionRecord {
  if (!input.run.execution || input.run.execution.runningRevision === null) {
    throw new PrivateAlphaStoreError(500, "Execution record was missing.");
  }

  return {
    ...input.run.execution,
    status: "failed",
    completedAt: input.failedAt,
    resultingRevision: input.resultingRevision,
    outputText: null,
    outputSha256: null,
    doneReason: null,
    totalDurationNanoseconds: null,
    loadDurationNanoseconds: null,
    promptEvalCount: null,
    evalCount: null,
    errorCode: input.errorCode,
    safeErrorMessage: input.safeErrorMessage,
  };
}

function buildSucceededExecutionRecord(input: {
  run: PrivateAlphaRunRecord;
  completedAt: string;
  resultingRevision: number;
  outputText: string;
  doneReason: string | null;
  totalDurationNanoseconds: number | null;
  loadDurationNanoseconds: number | null;
  promptEvalCount: number | null;
  evalCount: number | null;
}): PrivateAlphaExecutionRecord {
  if (!input.run.execution || input.run.execution.runningRevision === null) {
    throw new PrivateAlphaStoreError(500, "Execution record was missing.");
  }

  return {
    ...input.run.execution,
    status: "succeeded",
    completedAt: input.completedAt,
    resultingRevision: input.resultingRevision,
    outputText: input.outputText,
    outputSha256: hashSha256(input.outputText),
    doneReason: input.doneReason,
    totalDurationNanoseconds: input.totalDurationNanoseconds,
    loadDurationNanoseconds: input.loadDurationNanoseconds,
    promptEvalCount: input.promptEvalCount,
    evalCount: input.evalCount,
    errorCode: null,
    safeErrorMessage: null,
  };
}

async function readSafeKillSwitchState(
  paths: PrivateAlphaResolvedPaths
): Promise<Awaited<ReturnType<typeof readPrivateAlphaKillSwitchState>>> {
  return readPrivateAlphaKillSwitchState({
    dataRootLabel: paths.dataRootLabel,
  });
}

function ensureExecutableLocalRun(run: PrivateAlphaRunRecord): void {
  if (!isPrivateAlphaLocalExecutionConfiguration(run.request)) {
    throw new PrivateAlphaStoreError(
      409,
      "Legacy private-alpha runs are not executable in this slice."
    );
  }

  if (!isPrivateAlphaLocalExecutionConfiguration(run.approvalScope)) {
    throw new PrivateAlphaStoreError(
      409,
      "Run approval scope is not executable in this slice."
    );
  }

  if (run.request.providerPreference !== PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID) {
    throw new PrivateAlphaStoreError(409, "Run provider is not executable.");
  }

  if (run.request.modelPreferenceLabel !== PRIVATE_ALPHA_PRODUCTION_MODEL) {
    throw new PrivateAlphaStoreError(409, "Run model is not executable.");
  }

  if (run.request.executionMode !== PRIVATE_ALPHA_PRODUCTION_EXECUTION_MODE) {
    throw new PrivateAlphaStoreError(409, "Run execution mode is not executable.");
  }
}

export function buildPrivateAlphaTestingDataRootLabel(testSuffix: string): string {
  return `${PRIVATE_ALPHA_TEST_DATA_ROOT_PREFIX}/${sanitizePrivateAlphaTestingSuffix(testSuffix)}`;
}

export function buildPrivateAlphaNormalizedRequestHash(
  request: PrivateAlphaRunRequest
): string {
  return hashSha256(request.normalizedRequestText);
}

export function buildPrivateAlphaCanonicalRequestHash(
  request: PrivateAlphaRunRequest
): string {
  return hashSha256(serializePrivateAlphaRunRequest(request));
}

export function buildPrivateAlphaApprovalScopeHash(
  scope: PrivateAlphaApprovalScope
): string {
  return hashSha256(serializePrivateAlphaApprovalScope(scope));
}

export function createPrivateAlphaStore(
  options: PrivateAlphaStoreOptions = {}
): PrivateAlphaStore {
  const paths = resolvePaths(options);
  const runtimeProfile =
    options.runtimeProfile ?? PRIVATE_ALPHA_LEGACY_RUNTIME_PROFILE;
  const providerAdapter =
    options.providerAdapter ?? createPrivateAlphaOllamaProviderAdapter();

  return {
    async getStatus(): Promise<PrivateAlphaStatus> {
      const killSwitchState = await readSafeKillSwitchState(paths);

      if (runtimeProfile === PRIVATE_ALPHA_LEGACY_RUNTIME_PROFILE) {
        return {
          mode: "private-alpha-foundation",
          persistence: "local-file-backed",
          approvalRecording: "enabled",
          providerExecution: "unavailable",
          providerLabel: PRIVATE_ALPHA_PRODUCTION_PROVIDER_LABEL,
          configuredModel: PRIVATE_ALPHA_PRODUCTION_MODEL,
          providerAvailable: false,
          modelAvailable: false,
          executionAllowed: false,
          killSwitchEngaged: killSwitchState.killSwitchEngaged,
          killSwitchSources: killSwitchState.killSwitchSources,
          dataRootLabel: paths.dataRootLabel,
        };
      }

      const availability = await providerAdapter.getAvailability();

      return {
        mode: "private-alpha-local-ollama",
        persistence: "local-file-backed",
        approvalRecording: "enabled",
        providerExecution: "local-ollama",
        providerLabel: PRIVATE_ALPHA_PRODUCTION_PROVIDER_LABEL,
        configuredModel: PRIVATE_ALPHA_PRODUCTION_MODEL,
        providerAvailable: availability.providerAvailable,
        modelAvailable: availability.modelAvailable,
        executionAllowed:
          !killSwitchState.killSwitchEngaged &&
          availability.providerAvailable &&
          availability.modelAvailable,
        killSwitchEngaged: killSwitchState.killSwitchEngaged,
        killSwitchSources: killSwitchState.killSwitchSources,
        dataRootLabel: paths.dataRootLabel,
      };
    },

    async createRun(
      body: unknown,
      idempotencyKey: string | null | undefined
    ): Promise<PrivateAlphaCreateRunResult> {
      const idempotencyValidation = validatePrivateAlphaIdempotencyKey(idempotencyKey);
      if (!idempotencyValidation.ok) {
        throw new PrivateAlphaStoreError(
          idempotencyValidation.status,
          idempotencyValidation.error
        );
      }

      const createValidation = validatePrivateAlphaCreateRunInput(
        body,
        runtimeProfile
      );
      if (!createValidation.ok) {
        throw new PrivateAlphaStoreError(
          createValidation.status,
          createValidation.error
        );
      }

      const request = buildPrivateAlphaRunRequest(
        createValidation.value,
        runtimeProfile
      );
      const normalizedRequestHash = buildPrivateAlphaNormalizedRequestHash(request);
      const canonicalRequestHash = buildPrivateAlphaCanonicalRequestHash(request);
      const idempotencyKeyHash = hashSha256(idempotencyValidation.value);

      return withQueue(
        IDEMPOTENCY_WRITE_QUEUES,
        idempotencyKeyHash,
        async (): Promise<PrivateAlphaCreateRunResult> => {
          await ensureStoreDirectories(paths);

          const idempotencyAbsolutePath = buildIdempotencyFileAbsolutePath(
            paths,
            idempotencyKeyHash
          );
          const existingIdempotencyRecord = await readIdempotencyRecordFromFile(
            idempotencyAbsolutePath,
            idempotencyKeyHash
          );

          if (existingIdempotencyRecord) {
            if (existingIdempotencyRecord.canonicalRequestHash !== canonicalRequestHash) {
              throw new PrivateAlphaStoreError(
                409,
                "Idempotency-Key conflicts with a different private-alpha request."
              );
            }

            const existingRun = await readRunRecordFromFile(
              buildRunFileAbsolutePath(paths, existingIdempotencyRecord.runId),
              existingIdempotencyRecord.runId
            );

            return {
              created: false,
              run: existingRun,
            };
          }

          const runId = makeRunId();
          const createdAt = nowIso();
          const approvalScope = buildPrivateAlphaApprovalScope({
            runId,
            request,
            normalizedRequestHash,
          });
          const provisionalRun: PrivateAlphaRunRecord = {
            version: PRIVATE_ALPHA_RECORD_VERSION,
            runId,
            createdAt,
            updatedAt: createdAt,
            state: PRIVATE_ALPHA_INITIAL_RUN_STATE,
            revision: 1,
            idempotencyKeyHash,
            request,
            approvalScope,
            approvalScopeHash: buildPrivateAlphaApprovalScopeHash(approvalScope),
            approval: null,
            cancellation: null,
            execution: null,
            auditEvents: [],
          };
          const run: PrivateAlphaRunRecord = {
            ...provisionalRun,
            auditEvents: buildCreatedRunAuditEvents(provisionalRun, createdAt, 1),
          };

          await withQueue(RUN_WRITE_QUEUES, runId, async () => {
            await writeJsonFileAtomically(buildRunFileAbsolutePath(paths, runId), run);
          });

          const idempotencyRecord: PrivateAlphaIdempotencyRecord = {
            version: PRIVATE_ALPHA_RECORD_VERSION,
            idempotencyKeyHash,
            canonicalRequestHash,
            runId,
            createdAt,
          };

          try {
            await writeExclusiveJsonFile(idempotencyAbsolutePath, idempotencyRecord);
          } catch (error) {
            if (!isAlreadyExistsError(error)) {
              throw error;
            }

            const racedRecord = await readIdempotencyRecordFromFile(
              idempotencyAbsolutePath,
              idempotencyKeyHash
            );
            if (!racedRecord) {
              throw new PrivateAlphaStoreError(
                500,
                "Persisted idempotency record is malformed."
              );
            }

            if (racedRecord.canonicalRequestHash !== canonicalRequestHash) {
              throw new PrivateAlphaStoreError(
                409,
                "Idempotency-Key conflicts with a different private-alpha request."
              );
            }

            const existingRun = await readRunRecordFromFile(
              buildRunFileAbsolutePath(paths, racedRecord.runId),
              racedRecord.runId
            );

            return {
              created: false,
              run: existingRun,
            };
          }

          return {
            created: true,
            run,
          };
        }
      );
    },

    async listRuns(limit: string | null | undefined): Promise<readonly PrivateAlphaRunSummary[]> {
      const limitValidation = validatePrivateAlphaListLimit(limit);
      if (!limitValidation.ok) {
        throw new PrivateAlphaStoreError(limitValidation.status, limitValidation.error);
      }

      await ensureStoreDirectories(paths);

      const entries = await readdir(paths.runsDirectoryAbsolutePath, {
        withFileTypes: true,
      });

      const runs: PrivateAlphaRunRecord[] = [];
      for (const entry of entries) {
        if (!entry.name.endsWith(".json")) {
          continue;
        }

        if (entry.isSymbolicLink()) {
          throw new PrivateAlphaStoreError(
            500,
            "Private-alpha run storage contains an unsafe entry."
          );
        }

        const runId = entry.name.slice(0, -".json".length);
        const runIdValidation = validatePrivateAlphaRunId(runId);
        if (!runIdValidation.ok) {
          throw new PrivateAlphaStoreError(500, "Persisted run record is malformed.");
        }

        runs.push(
          await readRunRecordFromFile(
            buildRunFileAbsolutePath(paths, runIdValidation.value),
            runIdValidation.value
          )
        );
      }

      return runs
        .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
        .slice(0, limitValidation.value)
        .map(buildPrivateAlphaRunSummary);
    },

    async getRun(runId: string): Promise<PrivateAlphaRunRecord> {
      const runIdValidation = validatePrivateAlphaRunId(runId);
      if (!runIdValidation.ok) {
        throw new PrivateAlphaStoreError(runIdValidation.status, runIdValidation.error);
      }

      await ensureStoreDirectories(paths);
      return readRunRecordFromFile(
        buildRunFileAbsolutePath(paths, runIdValidation.value),
        runIdValidation.value
      );
    },

    async approveRun(runId: string, body: unknown): Promise<PrivateAlphaRunRecord> {
      const runIdValidation = validatePrivateAlphaRunId(runId);
      if (!runIdValidation.ok) {
        throw new PrivateAlphaStoreError(runIdValidation.status, runIdValidation.error);
      }

      const approvalValidation = validatePrivateAlphaApprovalInput(body);
      if (!approvalValidation.ok) {
        throw new PrivateAlphaStoreError(
          approvalValidation.status,
          approvalValidation.error
        );
      }

      await ensureStoreDirectories(paths);

      return withQueue(RUN_WRITE_QUEUES, runIdValidation.value, async () => {
        const runAbsolutePath = buildRunFileAbsolutePath(paths, runIdValidation.value);
        const existingRun = await readRunRecordFromFile(
          runAbsolutePath,
          runIdValidation.value
        );
        const approvalInput: PrivateAlphaApprovalInput = approvalValidation.value;

        if (existingRun.state !== "awaiting_approval") {
          throw new PrivateAlphaStoreError(
            409,
            "Run is not eligible for manual approval."
          );
        }

        if (existingRun.revision !== approvalInput.expectedRevision) {
          throw new PrivateAlphaStoreError(409, "Run revision is stale.");
        }

        if (existingRun.approvalScopeHash !== approvalInput.approvalScopeHash) {
          throw new PrivateAlphaStoreError(409, "Approval scope hash does not match.");
        }

        const transition = assertPrivateAlphaTransition(existingRun.state, "approve");
        if (!transition.ok) {
          throw new PrivateAlphaStoreError(409, transition.message);
        }

        const approvedAt = nowIso();
        const previousRevision = existingRun.revision;
        const resultingRevision = previousRevision + 1;
        const approvalRecord: PrivateAlphaApprovalRecord = {
          approvalId: randomUUID(),
          approvedAt,
          actor: "local-operator",
          approvalScopeHash: approvalInput.approvalScopeHash,
          acknowledgement: approvalInput.acknowledgement,
          previousRevision,
          resultingRevision,
          executionAvailabilityStatement: resolvePrivateAlphaApprovalStatement(
            existingRun.request.executionMode
          ),
        };

        const summary = isPrivateAlphaLocalExecutionConfiguration(existingRun.request)
          ? "Manual approval recorded for the exact local execution scope."
          : "Manual approval recorded locally. Provider execution remains unavailable.";

        const nextRun: PrivateAlphaRunRecord = {
          ...existingRun,
          updatedAt: approvedAt,
          state: transition.nextState,
          revision: resultingRevision,
          approval: approvalRecord,
          auditEvents: [
            ...existingRun.auditEvents,
            buildAuditEvent({
              eventType: "approval.granted",
              actor: "local-operator",
              runId: existingRun.runId,
              previousState: existingRun.state,
              resultingState: transition.nextState,
              revision: resultingRevision,
              summary,
              occurredAt: approvedAt,
            }),
          ],
        };

        await writeJsonFileAtomically(runAbsolutePath, nextRun);
        return nextRun;
      });
    },

    async cancelRun(runId: string, body: unknown): Promise<PrivateAlphaRunRecord> {
      const runIdValidation = validatePrivateAlphaRunId(runId);
      if (!runIdValidation.ok) {
        throw new PrivateAlphaStoreError(runIdValidation.status, runIdValidation.error);
      }

      const cancellationValidation = validatePrivateAlphaCancellationInput(body);
      if (!cancellationValidation.ok) {
        throw new PrivateAlphaStoreError(
          cancellationValidation.status,
          cancellationValidation.error
        );
      }

      await ensureStoreDirectories(paths);

      return withQueue(RUN_WRITE_QUEUES, runIdValidation.value, async () => {
        const runAbsolutePath = buildRunFileAbsolutePath(paths, runIdValidation.value);
        const existingRun = await readRunRecordFromFile(
          runAbsolutePath,
          runIdValidation.value
        );
        const cancellationInput: PrivateAlphaCancellationInput =
          cancellationValidation.value;

        if (
          existingRun.state !== "awaiting_approval" &&
          existingRun.state !== "approved"
        ) {
          throw new PrivateAlphaStoreError(409, "Run is not eligible for cancellation.");
        }

        if (existingRun.revision !== cancellationInput.expectedRevision) {
          throw new PrivateAlphaStoreError(409, "Run revision is stale.");
        }

        const transition = assertPrivateAlphaTransition(existingRun.state, "cancel");
        if (!transition.ok) {
          throw new PrivateAlphaStoreError(409, transition.message);
        }

        const canceledAt = nowIso();
        const previousRevision = existingRun.revision;
        const resultingRevision = previousRevision + 1;
        const cancellationRecord: PrivateAlphaCancellationRecord = {
          cancellationId: randomUUID(),
          canceledAt,
          actor: "local-operator",
          reason: cancellationInput.reason,
          previousRevision,
          resultingRevision,
        };

        const nextRun: PrivateAlphaRunRecord = {
          ...existingRun,
          updatedAt: canceledAt,
          state: transition.nextState,
          revision: resultingRevision,
          cancellation: cancellationRecord,
          auditEvents: [
            ...existingRun.auditEvents,
            buildAuditEvent({
              eventType: "run.canceled",
              actor: "local-operator",
              runId: existingRun.runId,
              previousState: existingRun.state,
              resultingState: transition.nextState,
              revision: resultingRevision,
              summary: "Private-alpha run canceled locally.",
              occurredAt: canceledAt,
            }),
          ],
        };

        await writeJsonFileAtomically(runAbsolutePath, nextRun);
        return nextRun;
      });
    },

    async executeRun(
      runId: string,
      body: unknown,
      idempotencyKey: string | null | undefined
    ): Promise<PrivateAlphaExecuteRunResult> {
      const runIdValidation = validatePrivateAlphaRunId(runId);
      if (!runIdValidation.ok) {
        throw new PrivateAlphaStoreError(runIdValidation.status, runIdValidation.error);
      }

      const idempotencyValidation = validatePrivateAlphaIdempotencyKey(idempotencyKey);
      if (!idempotencyValidation.ok) {
        throw new PrivateAlphaStoreError(
          idempotencyValidation.status,
          idempotencyValidation.error
        );
      }

      const executeValidation = validatePrivateAlphaExecuteInput(body);
      if (!executeValidation.ok) {
        throw new PrivateAlphaStoreError(
          executeValidation.status,
          executeValidation.error
        );
      }

      await ensureStoreDirectories(paths);

      return withQueue(RUN_WRITE_QUEUES, runIdValidation.value, async () => {
        const runAbsolutePath = buildRunFileAbsolutePath(paths, runIdValidation.value);
        const executeInput: PrivateAlphaExecuteInput = executeValidation.value;
        const idempotencyKeyHash = hashSha256(idempotencyValidation.value);
        const existingRun = await readRunRecordFromFile(
          runAbsolutePath,
          runIdValidation.value
        );

        if (existingRun.execution) {
          if (
            existingRun.execution.idempotencyKeyHash === idempotencyKeyHash &&
            existingRun.execution.approvalScopeHash === executeInput.approvalScopeHash
          ) {
            return {
              replayed: true,
              run: existingRun,
              responseStatus: 200,
              errorCode: existingRun.execution.errorCode,
              safeErrorMessage: existingRun.execution.safeErrorMessage,
            };
          }

          throw new PrivateAlphaStoreError(
            409,
            "This run has already started its one allowed execution attempt."
          );
        }

        ensureExecutableLocalRun(existingRun);

        if (existingRun.state !== "approved") {
          throw new PrivateAlphaStoreError(409, "Run is not eligible for execution.");
        }

        if (!existingRun.approval) {
          throw new PrivateAlphaStoreError(409, "Run approval is missing.");
        }

        if (existingRun.revision !== executeInput.expectedRevision) {
          throw new PrivateAlphaStoreError(409, "Run revision is stale.");
        }

        if (existingRun.approvalScopeHash !== executeInput.approvalScopeHash) {
          throw new PrivateAlphaStoreError(409, "Approval scope hash does not match.");
        }

        if (existingRun.approval.approvalScopeHash !== executeInput.approvalScopeHash) {
          throw new PrivateAlphaStoreError(409, "Approval record scope hash does not match.");
        }

        const killSwitchBeforeProbe = await readSafeKillSwitchState(paths);
        if (killSwitchBeforeProbe.killSwitchEngaged) {
          const blockedAt = nowIso();
          const resultingRevision = existingRun.revision + 1;
          const blockedRun: PrivateAlphaRunRecord = {
            ...existingRun,
            updatedAt: blockedAt,
            state: "blocked",
            revision: resultingRevision,
            execution: buildBlockedExecutionRecord({
              run: existingRun,
              idempotencyKeyHash,
              blockedAt,
              previousRevision: existingRun.revision,
              runningRevision: null,
              resultingRevision,
              errorCode: "kill_switch_blocked",
              safeErrorMessage:
                "Execution was blocked by the private-alpha kill switch.",
            }),
            auditEvents: [
              ...existingRun.auditEvents,
              buildAuditEvent({
                eventType: "execution.blocked",
                actor: "system",
                runId: existingRun.runId,
                previousState: existingRun.state,
                resultingState: "blocked",
                revision: resultingRevision,
                summary: "Local Ollama execution blocked by the kill switch.",
                occurredAt: blockedAt,
              }),
            ],
          };

          await writeJsonFileAtomically(runAbsolutePath, blockedRun);
          return {
            replayed: false,
            run: blockedRun,
            responseStatus: 409,
            errorCode: "kill_switch_blocked",
            safeErrorMessage:
              "Execution was blocked by the private-alpha kill switch.",
          };
        }

        const availability = await providerAdapter.getAvailability();
        if (!availability.providerAvailable || !availability.modelAvailable) {
          const blockedAt = nowIso();
          const resultingRevision = existingRun.revision + 1;
          const errorCode = availability.errorCode ?? "ollama_unavailable";
          const safeErrorMessage =
            availability.safeErrorMessage ??
            (availability.providerAvailable
              ? "The required local Ollama model is not installed."
              : "Local Ollama is unavailable on the fixed loopback endpoint.");
          const blockedRun: PrivateAlphaRunRecord = {
            ...existingRun,
            updatedAt: blockedAt,
            state: "blocked",
            revision: resultingRevision,
            execution: buildBlockedExecutionRecord({
              run: existingRun,
              idempotencyKeyHash,
              blockedAt,
              previousRevision: existingRun.revision,
              runningRevision: null,
              resultingRevision,
              errorCode:
                errorCode === "ollama_model_missing"
                  ? "ollama_model_missing"
                  : "ollama_unavailable",
              safeErrorMessage,
            }),
            auditEvents: [
              ...existingRun.auditEvents,
              buildAuditEvent({
                eventType: "execution.blocked",
                actor: "system",
                runId: existingRun.runId,
                previousState: existingRun.state,
                resultingState: "blocked",
                revision: resultingRevision,
                summary: "Local Ollama execution blocked before provider generation.",
                occurredAt: blockedAt,
              }),
            ],
          };

          await writeJsonFileAtomically(runAbsolutePath, blockedRun);
          return {
            replayed: false,
            run: blockedRun,
            responseStatus:
              errorCode === "ollama_timeout" ? 504 : 503,
            errorCode:
              errorCode === "ollama_model_missing"
                ? "ollama_model_missing"
                : "ollama_unavailable",
            safeErrorMessage,
          };
        }

        const transitionToExecuting = assertPrivateAlphaTransition(
          existingRun.state,
          "execute"
        );
        if (!transitionToExecuting.ok) {
          throw new PrivateAlphaStoreError(409, transitionToExecuting.message);
        }

        const startedAt = nowIso();
        const executingRecord = buildExecutingExecutionRecord({
          run: existingRun,
          idempotencyKeyHash,
          startedAt,
        });
        const executingRun: PrivateAlphaRunRecord = {
          ...existingRun,
          updatedAt: startedAt,
          state: "executing",
          revision: executingRecord.runningRevision ?? existingRun.revision,
          execution: executingRecord,
          auditEvents: [
            ...existingRun.auditEvents,
            buildAuditEvent({
              eventType: "execution.started",
              actor: "system",
              runId: existingRun.runId,
              previousState: existingRun.state,
              resultingState: "executing",
              revision: executingRecord.runningRevision ?? existingRun.revision,
              summary: "Local Ollama execution started.",
              occurredAt: startedAt,
            }),
          ],
        };

        await writeJsonFileAtomically(runAbsolutePath, executingRun);

        const killSwitchBeforeChat = await readSafeKillSwitchState(paths);
        if (killSwitchBeforeChat.killSwitchEngaged) {
          const blockedAt = nowIso();
          const resultingRevision = executingRun.revision + 1;
          const blockedRun: PrivateAlphaRunRecord = {
            ...executingRun,
            updatedAt: blockedAt,
            state: "blocked",
            revision: resultingRevision,
            execution: buildBlockedExecutionRecord({
              run: executingRun,
              idempotencyKeyHash,
              blockedAt,
              previousRevision: executingRun.execution?.previousRevision ?? existingRun.revision,
              runningRevision: executingRun.execution?.runningRevision ?? executingRun.revision,
              resultingRevision,
              errorCode: "kill_switch_blocked",
              safeErrorMessage:
                "Execution was blocked by the private-alpha kill switch.",
            }),
            auditEvents: [
              ...executingRun.auditEvents,
              buildAuditEvent({
                eventType: "execution.blocked",
                actor: "system",
                runId: executingRun.runId,
                previousState: executingRun.state,
                resultingState: "blocked",
                revision: resultingRevision,
                summary: "Local Ollama execution blocked by the kill switch.",
                occurredAt: blockedAt,
              }),
            ],
          };

          await writeJsonFileAtomically(runAbsolutePath, blockedRun);
          return {
            replayed: false,
            run: blockedRun,
            responseStatus: 409,
            errorCode: "kill_switch_blocked",
            safeErrorMessage:
              "Execution was blocked by the private-alpha kill switch.",
          };
        }

        try {
          const generated = await providerAdapter.generateApprovedText({
            approvedRequestText: existingRun.request.normalizedRequestText,
            model: PRIVATE_ALPHA_PRODUCTION_MODEL,
            maximumOutputTokens: existingRun.request.maximumOutputTokens,
          });
          const completedAt = nowIso();
          const resultingRevision = executingRun.revision + 1;
          const transitionToSucceeded = assertPrivateAlphaTransition(
            executingRun.state,
            "succeed"
          );
          if (!transitionToSucceeded.ok) {
            throw new PrivateAlphaStoreError(409, transitionToSucceeded.message);
          }

          const succeededRun: PrivateAlphaRunRecord = {
            ...executingRun,
            updatedAt: completedAt,
            state: "succeeded",
            revision: resultingRevision,
            execution: buildSucceededExecutionRecord({
              run: executingRun,
              completedAt,
              resultingRevision,
              outputText: generated.outputText,
              doneReason: generated.doneReason,
              totalDurationNanoseconds: generated.totalDurationNanoseconds,
              loadDurationNanoseconds: generated.loadDurationNanoseconds,
              promptEvalCount: generated.promptEvalCount,
              evalCount: generated.evalCount,
            }),
            auditEvents: [
              ...executingRun.auditEvents,
              buildAuditEvent({
                eventType: "execution.succeeded",
                actor: "system",
                runId: executingRun.runId,
                previousState: executingRun.state,
                resultingState: "succeeded",
                revision: resultingRevision,
                summary: "Local Ollama execution succeeded and output was persisted.",
                occurredAt: completedAt,
              }),
            ],
          };

          await writeJsonFileAtomically(runAbsolutePath, succeededRun);
          return {
            replayed: false,
            run: succeededRun,
            responseStatus: 200,
            errorCode: null,
            safeErrorMessage: null,
          };
        } catch (error) {
          const isKnownProviderError = error instanceof PrivateAlphaProviderError;
          const providerErrorCode =
            error instanceof PrivateAlphaProviderError
              ? error.code
              : "ollama_http_error";
          const safeProviderMessage =
            error instanceof PrivateAlphaProviderError
              ? error.safeMessage
              : "Local Ollama execution failed unexpectedly.";

          const failedAt = nowIso();
          const transitionToFailed = assertPrivateAlphaTransition(
            executingRun.state,
            "fail"
          );
          if (!transitionToFailed.ok) {
            throw new PrivateAlphaStoreError(409, transitionToFailed.message);
          }

          const resultingRevision = executingRun.revision + 1;
          const failedRun: PrivateAlphaRunRecord = {
            ...executingRun,
            updatedAt: failedAt,
            state: "failed",
            revision: resultingRevision,
            execution: buildFailedExecutionRecord({
              run: executingRun,
              failedAt,
              resultingRevision,
              errorCode: providerErrorCode,
              safeErrorMessage: safeProviderMessage,
            }),
            auditEvents: [
              ...executingRun.auditEvents,
              buildAuditEvent({
                eventType: "execution.failed",
                actor: "system",
                runId: executingRun.runId,
                previousState: executingRun.state,
                resultingState: "failed",
                revision: resultingRevision,
                summary: `Local Ollama execution failed with ${providerErrorCode}.`,
                occurredAt: failedAt,
              }),
            ],
          };

          await writeJsonFileAtomically(runAbsolutePath, failedRun);

          const failureResponse = isKnownProviderError
            ? buildExecutionFailureResponse(
                failedRun.execution?.errorCode ?? "ollama_http_error",
                failedRun.execution?.safeErrorMessage ??
                  "Local Ollama execution failed unexpectedly."
              )
            : {
                errorCode: failedRun.execution?.errorCode ?? "ollama_http_error",
                safeErrorMessage:
                  failedRun.execution?.safeErrorMessage ??
                  "Local Ollama execution failed unexpectedly.",
                responseStatus: 500 as const,
              };

          return {
            replayed: false,
            run: failedRun,
            responseStatus: failureResponse.responseStatus,
            errorCode: failureResponse.errorCode,
            safeErrorMessage: failureResponse.safeErrorMessage,
          };
        }
      });
    },
  };
}

export function createPrivateAlphaStoreForTesting(
  testSuffix: string,
  options: Omit<PrivateAlphaStoreOptions, "dataRootLabel"> = {}
): PrivateAlphaStore {
  return createPrivateAlphaStore({
    ...options,
    dataRootLabel: buildPrivateAlphaTestingDataRootLabel(testSuffix),
  });
}
