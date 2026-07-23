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
import { readPrivateAlphaKillSwitchState } from "./private-alpha-kill-switch.server";
import {
  PRIVATE_ALPHA_INITIAL_RUN_STATE,
  assertPrivateAlphaTransition,
} from "./private-alpha-state-machine";
import type {
  PrivateAlphaApprovalInput,
  PrivateAlphaApprovalRecord,
  PrivateAlphaApprovalScope,
  PrivateAlphaAuditActor,
  PrivateAlphaAuditEvent,
  PrivateAlphaAuditEventType,
  PrivateAlphaCancellationInput,
  PrivateAlphaCancellationRecord,
  PrivateAlphaCreateRunResult,
  PrivateAlphaRunRecord,
  PrivateAlphaRunRequest,
  PrivateAlphaRunState,
  PrivateAlphaRunSummary,
  PrivateAlphaStatus,
} from "./private-alpha-types";
import {
  PRIVATE_ALPHA_APPROVAL_LOCK_STATEMENT,
  PRIVATE_ALPHA_DATA_ROOT_LABEL,
  PRIVATE_ALPHA_RUN_ID_LENGTH,
  PRIVATE_ALPHA_TEST_DATA_ROOT_PREFIX,
  buildPrivateAlphaApprovalScope,
  buildPrivateAlphaRunRequest,
  buildPrivateAlphaRunSummary,
  sanitizePrivateAlphaTestingSuffix,
  serializePrivateAlphaApprovalScope,
  serializePrivateAlphaRunRequest,
  validatePrivateAlphaApprovalInput,
  validatePrivateAlphaCancellationInput,
  validatePrivateAlphaCreateRunInput,
  validatePrivateAlphaIdempotencyKey,
  validatePrivateAlphaListLimit,
  validatePrivateAlphaRunId,
} from "./private-alpha-validation";
import { PRIVATE_ALPHA_RECORD_VERSION } from "./private-alpha-types";

type PrivateAlphaErrorStatus = 400 | 404 | 409 | 422 | 500;

type PrivateAlphaStoreOptions = Readonly<{
  dataRootLabel?: string;
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

function isRunState(value: unknown): value is PrivateAlphaRunState {
  return (
    value === "awaiting_approval" ||
    value === "approved" ||
    value === "canceled" ||
    value === "blocked"
  );
}

function isAuditEventType(value: unknown): value is PrivateAlphaAuditEventType {
  return (
    value === "run.created" ||
    value === "approval.requested" ||
    value === "approval.granted" ||
    value === "run.canceled" ||
    value === "run.blocked"
  );
}

function isAuditActor(value: unknown): value is PrivateAlphaAuditActor {
  return value === "local-operator" || value === "system";
}

function readNullableString(
  record: Record<string, unknown>,
  key: string
): string | null | undefined {
  const value = record[key];
  if (value === undefined) {
    return undefined;
  }

  if (value === null) {
    return null;
  }

  return typeof value === "string" ? value : undefined;
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
    value.providerPreference !== "auto" ||
    (value.modelPreferenceLabel !== null &&
      typeof value.modelPreferenceLabel !== "string") ||
    typeof value.maximumOutputTokens !== "number" ||
    !Number.isInteger(value.maximumOutputTokens) ||
    value.maximumOutputTokens < 1 ||
    value.maximumOutputTokens > 4_096 ||
    value.retentionMode !== "local-private-alpha" ||
    value.executionMode !== "locked-until-provider-slice"
  ) {
    return null;
  }

  return {
    normalizedRequestText: value.normalizedRequestText,
    redactedPreview: value.redactedPreview,
    capability: value.capability,
    providerPreference: "auto",
    modelPreferenceLabel: value.modelPreferenceLabel,
    maximumOutputTokens: value.maximumOutputTokens,
    retentionMode: "local-private-alpha",
    executionMode: "locked-until-provider-slice",
  };
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
    value.providerPreference !== "auto" ||
    (value.modelPreferenceLabel !== null &&
      typeof value.modelPreferenceLabel !== "string") ||
    typeof value.maximumOutputTokens !== "number" ||
    !Number.isInteger(value.maximumOutputTokens) ||
    value.maximumOutputTokens < 1 ||
    value.maximumOutputTokens > 4_096 ||
    value.retentionMode !== "local-private-alpha" ||
    value.executionMode !== "locked-until-provider-slice"
  ) {
    return null;
  }

  return {
    runId: value.runId,
    capability: value.capability,
    normalizedRequestHash: value.normalizedRequestHash,
    providerPreference: "auto",
    modelPreferenceLabel: value.modelPreferenceLabel,
    maximumOutputTokens: value.maximumOutputTokens,
    retentionMode: "local-private-alpha",
    executionMode: "locked-until-provider-slice",
  };
}

function validateStoredApprovalRecord(
  value: unknown
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
    typeof value.previousRevision !== "number" ||
    !Number.isInteger(value.previousRevision) ||
    value.previousRevision < 1 ||
    typeof value.resultingRevision !== "number" ||
    !Number.isInteger(value.resultingRevision) ||
    value.resultingRevision < 1 ||
    value.executionAvailabilityStatement !== PRIVATE_ALPHA_APPROVAL_LOCK_STATEMENT
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
    executionAvailabilityStatement: PRIVATE_ALPHA_APPROVAL_LOCK_STATEMENT,
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
    typeof value.previousRevision !== "number" ||
    !Number.isInteger(value.previousRevision) ||
    value.previousRevision < 1 ||
    typeof value.resultingRevision !== "number" ||
    !Number.isInteger(value.resultingRevision) ||
    value.resultingRevision < 1
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
      typeof event.revision !== "number" ||
      !Number.isInteger(event.revision) ||
      event.revision < 1 ||
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
  const approval = validateStoredApprovalRecord(value.approval);
  const cancellation = validateStoredCancellationRecord(value.cancellation);

  if (
    value.version !== PRIVATE_ALPHA_RECORD_VERSION ||
    value.runId !== expectedRunId ||
    !isIsoTimestamp(value.createdAt) ||
    !isIsoTimestamp(value.updatedAt) ||
    !isRunState(value.state) ||
    typeof value.revision !== "number" ||
    !Number.isInteger(value.revision) ||
    value.revision < 1 ||
    !isHexHash(value.idempotencyKeyHash) ||
    !runRequest ||
    !approvalScope ||
    !isHexHash(value.approvalScopeHash)
  ) {
    return null;
  }

  const auditEvents = validateStoredAuditEvents(value.auditEvents, expectedRunId);
  if (!auditEvents || approvalScope.runId !== expectedRunId) {
    return null;
  }

  if (
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

  if (value.state === "approved" && !approval) {
    return null;
  }

  if (value.state === "awaiting_approval" && (approval || cancellation)) {
    return null;
  }

  if (value.state === "canceled" && !cancellation) {
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
  runId: string,
  createdAt: string,
  revision: number
): readonly PrivateAlphaAuditEvent[] {
  return [
    buildAuditEvent({
      eventType: "run.created",
      actor: "local-operator",
      runId,
      previousState: null,
      resultingState: PRIVATE_ALPHA_INITIAL_RUN_STATE,
      revision,
      summary: "Private-alpha run persisted locally.",
      occurredAt: createdAt,
    }),
    buildAuditEvent({
      eventType: "approval.requested",
      actor: "local-operator",
      runId,
      previousState: PRIVATE_ALPHA_INITIAL_RUN_STATE,
      resultingState: PRIVATE_ALPHA_INITIAL_RUN_STATE,
      revision,
      summary: "Manual approval scope recorded locally. Provider execution remains locked.",
      occurredAt: createdAt,
    }),
  ];
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

  return {
    async getStatus(): Promise<PrivateAlphaStatus> {
      const killSwitchState = await readPrivateAlphaKillSwitchState({
        dataRootLabel: paths.dataRootLabel,
      });

      return {
        mode: "private-alpha-foundation",
        persistence: "local-file-backed",
        approvalRecording: "enabled",
        providerExecution: "unavailable",
        executionAllowed: false,
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

      const createValidation = validatePrivateAlphaCreateRunInput(body);
      if (!createValidation.ok) {
        throw new PrivateAlphaStoreError(
          createValidation.status,
          createValidation.error
        );
      }

      const request = buildPrivateAlphaRunRequest(createValidation.value);
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
          const run: PrivateAlphaRunRecord = {
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
            auditEvents: buildCreatedRunAuditEvents(runId, createdAt, 1),
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
          executionAvailabilityStatement: PRIVATE_ALPHA_APPROVAL_LOCK_STATEMENT,
        };

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
              summary:
                "Manual approval recorded locally. Provider execution remains unavailable.",
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
  };
}

export function createPrivateAlphaStoreForTesting(
  testSuffix: string
): PrivateAlphaStore {
  return createPrivateAlphaStore({
    dataRootLabel: buildPrivateAlphaTestingDataRootLabel(testSuffix),
  });
}
