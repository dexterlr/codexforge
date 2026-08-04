import "server-only";

import { AsyncLocalStorage } from "node:async_hooks";
import { isUtf8 } from "node:buffer";
import {
  link,
  lstat,
  mkdir,
  open,
  opendir,
  readFile,
  readdir,
  realpath,
  rename,
  unlink,
} from "node:fs/promises";
import type { FileHandle } from "node:fs/promises";
import type { Dirent } from "node:fs";
import path from "node:path";
import { createHash, randomBytes, randomUUID } from "node:crypto";
import { getExactWindowsProcessIdentity } from "@/lib/codexforge/creator/creator-native-filesystem.server";
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
import { createPrivateAlphaProviderAdapterForModelKey } from "./private-alpha-provider-runtime.server";
import { readPrivateAlphaKillSwitchState } from "./private-alpha-kill-switch.server";
import {
  PrivateAlphaNativeFilesystemError,
  assertPrivateAlphaNativeSegments,
  privateAlphaNativeRootExists,
  withPrivateAlphaExistingNativeRoot,
  withPrivateAlphaExistingNativeRootLease,
  withPrivateAlphaNativeRoot,
  withPrivateAlphaNativeRootLease,
} from "./private-alpha-native-filesystem.server";
import {
  PRIVATE_ALPHA_INITIAL_RUN_STATE,
  assertPrivateAlphaTransition,
} from "./private-alpha-state-machine";
import {
  PRIVATE_ALPHA_APPROVAL_BINDING_VERSION,
  PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY,
  PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
  PRIVATE_ALPHA_IDEMPOTENCY_PROTOCOL_VERSION,
  PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
  PRIVATE_ALPHA_RECORD_VERSION,
  PRIVATE_ALPHA_RUN_OWNERSHIP_PROTOCOL_VERSION,
  type PrivateAlphaApprovalInput,
  type PrivateAlphaApprovalRecord,
  type PrivateAlphaApprovalScope,
  type PrivateAlphaBoundApprovalRecord,
  type PrivateAlphaBoundDataBoundary,
  type PrivateAlphaCloudDataTransferAcknowledgement,
  type PrivateAlphaCloudDataTransferRequirement,
  type PrivateAlphaCloudExecutionAcknowledgement,
  type PrivateAlphaAuditActor,
  type PrivateAlphaAuditEvent,
  type PrivateAlphaAuditEventType,
  type PrivateAlphaCancellationInput,
  type PrivateAlphaCancellationRecord,
  type PrivateAlphaCreateRunResult,
  type PrivateAlphaCreatorRunOwnership,
  type PrivateAlphaExecuteInput,
  type PrivateAlphaExecuteRunResult,
  type PrivateAlphaExecutionRecord,
  type PrivateAlphaExecutionStatus,
  type PrivateAlphaGroq120bExecutionRecord,
  type PrivateAlphaGroq20bExecutionRecord,
  type PrivateAlphaLocalExecutionRecord,
  type PrivateAlphaProviderErrorCode,
  type PrivateAlphaPersistedExecutionErrorCode,
  type PrivateAlphaRuntimeModelKey,
  type PrivateAlphaRunRecord,
  type PrivateAlphaRunOwnership,
  type PrivateAlphaRunRequest,
  type PrivateAlphaRunState,
  type PrivateAlphaRunSummary,
  type PrivateAlphaStatus,
} from "./private-alpha-types";
import {
  PRIVATE_ALPHA_DATA_ROOT_LABEL,
  PRIVATE_ALPHA_GROQ_MAX_OUTPUT_TOKENS,
  PRIVATE_ALPHA_LEGACY_RUNTIME_PROFILE,
  PRIVATE_ALPHA_MAX_ACKNOWLEDGEMENT_LENGTH,
  PRIVATE_ALPHA_MAX_CANCELLATION_REASON_LENGTH,
  PRIVATE_ALPHA_MAX_DONE_REASON_LENGTH,
  PRIVATE_ALPHA_MAX_MODEL_PREFERENCE_LENGTH,
  PRIVATE_ALPHA_MAX_OUTPUT_TEXT_LENGTH,
  PRIVATE_ALPHA_MAX_REQUEST_LENGTH,
  PRIVATE_ALPHA_MAX_SAFE_ERROR_MESSAGE_LENGTH,
  PRIVATE_ALPHA_PRODUCTION_EXECUTION_MODE,
  PRIVATE_ALPHA_PRODUCTION_MODEL,
  PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID,
  PRIVATE_ALPHA_PRODUCTION_PROVIDER_LABEL,
  PRIVATE_ALPHA_RUN_ID_LENGTH,
  PRIVATE_ALPHA_TEST_DATA_ROOT_PREFIX,
  buildPrivateAlphaRedactedPreview,
  buildPrivateAlphaApprovalScope,
  buildPrivateAlphaRunRequest,
  buildPrivateAlphaRunSummary,
  isPrivateAlphaCloudApprovalOnlyConfiguration,
  isPrivateAlphaCloudExecutionConfiguration,
  isPrivateAlphaLegacyRunConfiguration,
  isPrivateAlphaLocalExecutionConfiguration,
  resolvePrivateAlphaBoundConfiguration,
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
  providerAdapterResolver?: (
    modelKey: PrivateAlphaRuntimeModelKey
  ) => PrivateAlphaProviderAdapter;
}>;

type PrivateAlphaResolvedPaths = Readonly<{
  dataRootLabel: string;
  dataRootAbsolutePath: string;
  runsDirectoryAbsolutePath: string;
  idempotencyDirectoryAbsolutePath: string;
  locksDirectoryAbsolutePath: string;
  killSwitchFileAbsolutePath: string;
  identityState: PrivateAlphaFilesystemIdentityState;
}>;

type PrivateAlphaDirectoryIdentity = Readonly<{
  absolutePath: string;
  realPath: string;
  device: number;
  inode: number;
}>;

type PrivateAlphaFilesystemIdentityState = {
  projectRoot: PrivateAlphaDirectoryIdentity | null;
  dataRoot: PrivateAlphaDirectoryIdentity | null;
  parents: Map<string, PrivateAlphaDirectoryIdentity>;
};

type PrivateAlphaRunLockOwner = Readonly<{
  nonce: string;
  processSessionNonce: string;
  processId: number;
  processIdentity: string;
  createdAt: string;
}>;

type PrivateAlphaRunLockFenceContext = Readonly<{
  paths: PrivateAlphaResolvedPaths;
  runId: string;
  owner: PrivateAlphaRunLockOwner;
}>;

type PrivateAlphaHistoricalIdempotencyRecord = Readonly<{
  version: typeof PRIVATE_ALPHA_RECORD_VERSION;
  idempotencyKeyHash: string;
  canonicalRequestHash: string;
  runId: string;
  createdAt: string;
}>;

type PrivateAlphaProtocolIdempotencyRecord = Readonly<{
  version: typeof PRIVATE_ALPHA_RECORD_VERSION;
  protocolVersion: typeof PRIVATE_ALPHA_IDEMPOTENCY_PROTOCOL_VERSION;
  publicationPhase: "reserved" | "published";
  idempotencyKeyHash: string;
  requestDigest: string;
  runId: string;
  ownership: PrivateAlphaRunOwnership;
  reservedAt: string;
  publishedAt: string | null;
}>;

type PrivateAlphaIdempotencyRecord =
  | PrivateAlphaHistoricalIdempotencyRecord
  | PrivateAlphaProtocolIdempotencyRecord;

export type PrivateAlphaIdempotencyLookupResult = Readonly<{
  idempotencyKeyHash: string;
  requestDigest: string;
  reservedRunId: string;
  publicationPhase: "reserved" | "published";
  ownership: PrivateAlphaRunOwnership;
  run: PrivateAlphaRunRecord | null;
  historical: boolean;
}>;

export type PrivateAlphaCreatorRecoveryInput = Readonly<{
  body: unknown;
  idempotencyKey: string;
  namespace: "current" | "legacy";
  projectId: string;
  purpose: "generation" | "repair";
}>;

type PrivateAlphaStoredApprovalBinding = Readonly<{
  bindingVersion: typeof PRIVATE_ALPHA_APPROVAL_BINDING_VERSION;
  modelKey: PrivateAlphaRuntimeModelKey;
  dataBoundary: PrivateAlphaBoundDataBoundary;
  cloudDataTransferRequirement: PrivateAlphaCloudDataTransferRequirement;
}>;

type PrivateAlphaFailureResponse = Readonly<{
  errorCode: PrivateAlphaPersistedExecutionErrorCode;
  safeErrorMessage: string;
  responseStatus: 200 | 409 | 503 | 504;
}>;

type PrivateAlphaLocalPersistedExecutionErrorCode =
  | "execution_interrupted"
  | "kill_switch_blocked"
  | "ollama_unavailable"
  | "ollama_model_missing"
  | "ollama_timeout"
  | "ollama_http_error"
  | "ollama_malformed_response"
  | "ollama_empty_response"
  | "ollama_output_too_large";

type PrivateAlphaGroqPersistedExecutionErrorCode =
  | "execution_interrupted"
  | "kill_switch_blocked"
  | "groq_credential_missing"
  | "groq_authentication_failed"
  | "groq_rate_limited"
  | "groq_quota_exhausted"
  | "groq_unavailable"
  | "groq_model_unavailable"
  | "groq_timeout"
  | "groq_http_error"
  | "groq_malformed_response"
  | "groq_empty_response"
  | "groq_output_too_large";

type PrivateAlphaExecutionTargetCommon = Readonly<{
  provider: "ollama-local" | "groq-cloud";
  model: "gpt-oss:20b" | "openai/gpt-oss-20b" | "openai/gpt-oss-120b";
  dataBoundary: "local-machine" | "cloud-provider";
}>;

type PrivateAlphaLocalExecutionTarget = PrivateAlphaExecutionTargetCommon &
  Readonly<{
    kind: "local";
    provider: "ollama-local";
    model: "gpt-oss:20b";
    dataBoundary: "local-machine";
  }>;

type PrivateAlphaGroq20bExecutionTarget = PrivateAlphaExecutionTargetCommon &
  Readonly<{
    kind: "groq-20b";
    provider: "groq-cloud";
    model: "openai/gpt-oss-20b";
    modelKey: typeof PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY;
    bindingVersion: typeof PRIVATE_ALPHA_APPROVAL_BINDING_VERSION;
    dataBoundary: "cloud-provider";
    cloudExecutionAcknowledgement: PrivateAlphaCloudExecutionAcknowledgement;
  }>;

type PrivateAlphaGroq120bExecutionTarget = PrivateAlphaExecutionTargetCommon &
  Readonly<{
    kind: "groq-120b";
    provider: "groq-cloud";
    model: "openai/gpt-oss-120b";
    modelKey: typeof PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY;
    bindingVersion: typeof PRIVATE_ALPHA_APPROVAL_BINDING_VERSION;
    dataBoundary: "cloud-provider";
    cloudExecutionAcknowledgement: PrivateAlphaCloudExecutionAcknowledgement;
  }>;

type PrivateAlphaExecutionTarget =
  | PrivateAlphaLocalExecutionTarget
  | PrivateAlphaGroq20bExecutionTarget
  | PrivateAlphaGroq120bExecutionTarget;

const PRIVATE_ALPHA_GROQ_FREE_TIER_EXECUTION_CONFIRMATION_LITERAL =
  "operator-confirmed-current-free-tier" as const;

export type PrivateAlphaStore = Readonly<{
  getStatus: () => Promise<PrivateAlphaStatus>;
  createRun: (
    body: unknown,
    idempotencyKey: string | null | undefined
  ) => Promise<PrivateAlphaCreateRunResult>;
  createCreatorRun: (
    body: unknown,
    idempotencyKey: string | null | undefined,
    ownership: PrivateAlphaCreatorRunOwnership
  ) => Promise<PrivateAlphaCreateRunResult>;
  bindCreatorRun: (
    body: unknown,
    idempotencyKey: string | null | undefined,
    ownership: PrivateAlphaCreatorRunOwnership,
    createIfMissing: boolean
  ) => Promise<PrivateAlphaCreateRunResult | null>;
  lookupRunByIdempotencyKeyHash: (
    idempotencyKeyHash: string
  ) => Promise<PrivateAlphaIdempotencyLookupResult | null>;
  recoverCreatorRunByIdempotencyKey: (
    input: PrivateAlphaCreatorRecoveryInput
  ) => Promise<PrivateAlphaIdempotencyLookupResult | null>;
  listRuns: (limit: string | null | undefined) => Promise<readonly PrivateAlphaRunSummary[]>;
  getRun: (runId: string) => Promise<PrivateAlphaRunRecord>;
  getCreatorRun: (
    runId: string,
    ownership: PrivateAlphaCreatorRunOwnership
  ) => Promise<PrivateAlphaRunRecord>;
  reconcileCreatorRunAfterInterruption: (
    runId: string,
    ownership: PrivateAlphaCreatorRunOwnership
  ) => Promise<PrivateAlphaRunRecord>;
  approveRun: (
    runId: string,
    body: unknown
  ) => Promise<PrivateAlphaRunRecord>;
  approveCreatorRun: (
    runId: string,
    body: unknown,
    ownership: PrivateAlphaCreatorRunOwnership
  ) => Promise<PrivateAlphaRunRecord>;
  cancelRun: (
    runId: string,
    body: unknown
  ) => Promise<PrivateAlphaRunRecord>;
  cancelCreatorRun: (
    runId: string,
    body: unknown,
    ownership: PrivateAlphaCreatorRunOwnership
  ) => Promise<PrivateAlphaRunRecord>;
  executeRun: (
    runId: string,
    body: unknown,
    idempotencyKey: string | null | undefined
  ) => Promise<PrivateAlphaExecuteRunResult>;
  executeCreatorRun: (
    runId: string,
    body: unknown,
    idempotencyKey: string | null | undefined,
    ownership: PrivateAlphaCreatorRunOwnership
  ) => Promise<PrivateAlphaExecuteRunResult>;
}>;

type PrivateAlphaStoreInternal = Omit<
  PrivateAlphaStore,
  "createRun" | "approveRun" | "cancelRun" | "executeRun"
> &
  Readonly<{
    createRun: (
      body: unknown,
      idempotencyKey: string | null | undefined,
      expectedOwnership?: PrivateAlphaCreatorRunOwnership
    ) => Promise<PrivateAlphaCreateRunResult>;
    approveRun: (
      runId: string,
      body: unknown,
      expectedOwnership?: PrivateAlphaCreatorRunOwnership
    ) => Promise<PrivateAlphaRunRecord>;
    cancelRun: (
      runId: string,
      body: unknown,
      expectedOwnership?: PrivateAlphaCreatorRunOwnership
    ) => Promise<PrivateAlphaRunRecord>;
    executeRun: (
      runId: string,
      body: unknown,
      idempotencyKey: string | null | undefined,
      expectedOwnership?: PrivateAlphaCreatorRunOwnership
    ) => Promise<PrivateAlphaExecuteRunResult>;
  }>;

const RUN_WRITE_QUEUES = new Map<string, Promise<void>>();
const IDEMPOTENCY_WRITE_QUEUES = new Map<string, Promise<void>>();
const PRIVATE_ALPHA_PROCESS_SESSION_NONCE = randomBytes(16).toString("hex");
const PRIVATE_ALPHA_RUN_LOCK_MAX_BYTES = 2_048;
const PRIVATE_ALPHA_IDEMPOTENCY_RECORD_MAX_BYTES = 8_192;
const PRIVATE_ALPHA_RUN_RECORD_MAX_BYTES = 1_048_576;
const PRIVATE_ALPHA_MAX_STORED_RUN_FILES = 4_096;
const PRIVATE_ALPHA_MAX_DIRECTORY_ENTRIES = 4_096;

async function readBoundedDirectoryEntries(
  directoryAbsolutePath: string,
  boundedMessage: string
): Promise<readonly Dirent[]> {
  const directory = await opendir(directoryAbsolutePath);
  const entries: Dirent[] = [];
  try {
    while (true) {
      const entry = await directory.read();
      if (entry === null) break;
      if (entries.length >= PRIVATE_ALPHA_MAX_DIRECTORY_ENTRIES) {
        throw new PrivateAlphaStoreError(500, boundedMessage);
      }
      entries.push(entry);
    }
  } finally {
    await directory.close();
  }
  return entries;
}
const PRIVATE_ALPHA_MAX_AUDIT_EVENTS = 16;
const PRIVATE_ALPHA_MAX_AUDIT_SUMMARY_LENGTH = 512;
const RECOVERABLE_RUN_LOCK_NONCES = new Map<string, string>();
const RUN_LOCK_FENCE_CONTEXT = new AsyncLocalStorage<PrivateAlphaRunLockFenceContext>();
const CREATOR_BINDING_LOCK_CONTEXT = new AsyncLocalStorage<string>();
const PRIVATE_ALPHA_VERIFIED_PERSISTED_BYTES = new WeakMap<object, Buffer>();

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

function nextPersistedIsoTimestamp(previousTimestamp: string): string {
  const previousMilliseconds = Date.parse(previousTimestamp);
  return new Date(
    Math.max(Date.now(), Number.isFinite(previousMilliseconds) ? previousMilliseconds : 0)
  ).toISOString();
}

function makeRunId(): string {
  return randomBytes(PRIVATE_ALPHA_RUN_ID_LENGTH / 2).toString("hex");
}

function buildIdempotencyMutationLockRunId(
  idempotencyKeyHash: string
): string {
  return hashSha256(`private-alpha:idempotency-mutation:${idempotencyKeyHash}`).slice(
    0,
    PRIVATE_ALPHA_RUN_ID_LENGTH
  );
}

function buildCreatorBindingMutationLockRunId(
  projectId: string,
  purpose: "generation" | "repair"
): string {
  return hashSha256(
    `private-alpha:creator-binding-mutation:v1:${projectId}:${purpose}`
  ).slice(0, PRIVATE_ALPHA_RUN_ID_LENGTH);
}

function hashSha256(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

export function buildPrivateAlphaCreatorIdempotencyKeyHash(
  idempotencyKey: string,
  projectId: string,
  purpose: "generation" | "repair"
): string {
  return hashSha256(
    `codexforge.private-alpha.creator-idempotency.v1\u0000${projectId}\u0000${purpose}\u0000${idempotencyKey}`
  );
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

function readErrorCode(error: unknown): string | null {
  return typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as { code?: unknown }).code === "string"
    ? (error as { code: string }).code
    : null;
}

function parseLinuxProcessStartTicks(statLine: string): string {
  const commandEnd = statLine.lastIndexOf(")");
  if (commandEnd < 0) {
    throw new PrivateAlphaStoreError(
      500,
      "Private-alpha process identity could not be verified."
    );
  }
  const fieldsAfterCommand = statLine.slice(commandEnd + 1).trim().split(/\s+/u);
  // /proc/<pid>/stat fields after the command begin at field 3; starttime is field 22.
  const state = fieldsAfterCommand[0];
  const startTicks = fieldsAfterCommand[19];
  if (!state || state === "Z" || !startTicks || !/^\d+$/u.test(startTicks)) {
    throw new PrivateAlphaStoreError(
      500,
      "Private-alpha process identity could not be verified."
    );
  }
  return startTicks;
}

async function readExactProcessIdentity(processId: number): Promise<string | null> {
  if (process.platform === "win32") {
    try {
      return getExactWindowsProcessIdentity(processId);
    } catch (error) {
      if (readErrorCode(error) === "not_found") return null;
      throw new PrivateAlphaStoreError(
        500,
        "Private-alpha process identity could not be verified."
      );
    }
  }

  if (process.platform === "linux") {
    let normalizedBootId: string;
    try {
      normalizedBootId = (
        await readFile("/proc/sys/kernel/random/boot_id", "utf8")
      ).trim().toLowerCase();
      if (!/^[a-f0-9-]{36}$/u.test(normalizedBootId)) {
        throw new PrivateAlphaStoreError(
          500,
          "Private-alpha process identity could not be verified."
        );
      }
    } catch (error) {
      if (error instanceof PrivateAlphaStoreError) throw error;
      throw new PrivateAlphaStoreError(
        500,
        "Private-alpha process identity could not be verified."
      );
    }
    try {
      const statLine = await readFile(`/proc/${processId}/stat`, "utf8");
      return `linux-boot-start:${normalizedBootId}:${parseLinuxProcessStartTicks(statLine)}`;
    } catch (error) {
      if (readErrorCode(error) === "ENOENT" && processId !== process.pid) return null;
      if (error instanceof PrivateAlphaStoreError) throw error;
      throw new PrivateAlphaStoreError(
        500,
        "Private-alpha process identity could not be verified."
      );
    }
  }

  if (processId === process.pid) {
    return `process-session:${PRIVATE_ALPHA_PROCESS_SESSION_NONCE}`;
  }
  throw new PrivateAlphaStoreError(
    409,
    "The existing private-alpha mutation owner cannot be verified safely on this platform."
  );
}

function isCanonicalRunLockProcessId(processId: number): boolean {
  if (!Number.isSafeInteger(processId) || processId <= 0) return false;
  if (process.platform === "win32") return processId <= 0xffff_ffff;
  if (process.platform === "linux") return processId <= 4_194_304;
  return processId === process.pid;
}

function isCanonicalPositiveUint64Decimal(value: string): boolean {
  if (!/^[1-9]\d{0,19}$/u.test(value)) return false;
  const maximum = "18446744073709551615";
  return value.length < maximum.length || (value.length === maximum.length && value <= maximum);
}

function isCanonicalRunLockProcessIdentity(value: string): boolean {
  if (process.platform === "win32") {
    const match = /^windows-filetime:(\d+)$/u.exec(value);
    return match !== null && isCanonicalPositiveUint64Decimal(match[1]);
  }
  if (process.platform === "linux") {
    const match =
      /^linux-boot-start:[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}:(\d+)$/u.exec(
        value
      );
    return match !== null && isCanonicalPositiveUint64Decimal(match[1]);
  }
  return /^process-session:[a-f0-9]{32}$/u.test(value);
}

function assertSecurePrivateAlphaMutationPlatform(): void {
  if (process.platform !== "win32") {
    throw new PrivateAlphaStoreError(
      503,
      "Secure private-alpha mutation is unavailable on this platform because the audited handle-relative filesystem boundary is Windows-only."
    );
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasExactKeys(
  value: Record<string, unknown>,
  expectedKeys: readonly string[]
): boolean {
  const actualKeys = Object.keys(value).sort();
  const sortedExpectedKeys = [...expectedKeys].sort();
  return (
    actualKeys.length === sortedExpectedKeys.length &&
    actualKeys.every((key, index) => key === sortedExpectedKeys[index])
  );
}

function isIsoTimestamp(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const milliseconds = Date.parse(value);
  return (
    Number.isFinite(milliseconds) &&
    new Date(milliseconds).toISOString() === value
  );
}

function isHexHash(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/.test(value);
}

function isUuid(value: unknown): value is string {
  return (
    typeof value === "string" &&
    /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/.test(
      value
    )
  );
}

function isBoundedSingleLineText(value: unknown, maximumLength: number): value is string {
  return (
    typeof value === "string" &&
    value.length > 0 &&
    value.length <= maximumLength &&
    value.trim() === value &&
    !/[\u0000-\u001f\u007f]/.test(value)
  );
}

function validateStoredRunOwnership(
  value: unknown
): PrivateAlphaRunOwnership | undefined {
  if (value === undefined) {
    return null;
  }

  if (value === null) return undefined;

  if (!isRecord(value)) {
    return undefined;
  }

  if (
    value.kind === "general" &&
    value.protocolVersion === PRIVATE_ALPHA_RUN_OWNERSHIP_PROTOCOL_VERSION &&
    hasExactKeys(value, ["kind", "protocolVersion"])
  ) {
    return {
      kind: "general",
      protocolVersion: PRIVATE_ALPHA_RUN_OWNERSHIP_PROTOCOL_VERSION,
    };
  }

  if (
    value.kind === "creator" &&
    value.protocolVersion === PRIVATE_ALPHA_RUN_OWNERSHIP_PROTOCOL_VERSION &&
    typeof value.projectId === "string" &&
    /^[a-f0-9]{24}$/.test(value.projectId) &&
    (value.purpose === "generation" || value.purpose === "repair") &&
    typeof value.bindingId === "string" &&
    /^[a-f0-9]{32}$/.test(value.bindingId) &&
    hasExactKeys(value, [
      "bindingId",
      "kind",
      "projectId",
      "protocolVersion",
      "purpose",
    ])
  ) {
    return {
      kind: "creator",
      protocolVersion: PRIVATE_ALPHA_RUN_OWNERSHIP_PROTOCOL_VERSION,
      projectId: value.projectId,
      purpose: value.purpose,
      bindingId: value.bindingId,
    };
  }

  return undefined;
}

function sameRunOwnership(
  left: PrivateAlphaRunOwnership,
  right: PrivateAlphaRunOwnership
): boolean {
  if (left === null || right === null) {
    return left === right;
  }
  if (left.kind !== right.kind || left.protocolVersion !== right.protocolVersion) {
    return false;
  }
  if (left.kind === "general" || right.kind === "general") {
    return left.kind === right.kind;
  }
  return (
    left.projectId === right.projectId &&
    left.purpose === right.purpose &&
    left.bindingId === right.bindingId
  );
}

function validateCreatorOwnershipInput(
  value: PrivateAlphaCreatorRunOwnership
): PrivateAlphaCreatorRunOwnership {
  const validated = validateStoredRunOwnership(value);
  if (!validated || validated.kind !== "creator") {
    throw new PrivateAlphaStoreError(409, "Creator run ownership binding is invalid.");
  }
  return validated;
}

function assertRunControl(
  run: PrivateAlphaRunRecord,
  expectedOwnership: PrivateAlphaCreatorRunOwnership | undefined
): void {
  if (expectedOwnership === undefined) {
    if (run.ownership?.kind === "creator") {
      throw new PrivateAlphaStoreError(
        409,
        "Creator-owned runs must be controlled through the exact creator lifecycle."
      );
    }
    return;
  }

  const validated = validateCreatorOwnershipInput(expectedOwnership);
  if (!sameRunOwnership(run.ownership, validated)) {
    throw new PrivateAlphaStoreError(409, "Creator run ownership binding does not match.");
  }
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
): value is PrivateAlphaPersistedExecutionErrorCode {
  return (
    value === "execution_interrupted" ||
    value === "kill_switch_blocked" ||
    value === "ollama_unavailable" ||
    value === "ollama_model_missing" ||
    value === "ollama_timeout" ||
    value === "ollama_http_error" ||
    value === "ollama_malformed_response" ||
    value === "ollama_empty_response" ||
    value === "ollama_output_too_large" ||
    value === "groq_credential_missing" ||
    value === "groq_authentication_failed" ||
    value === "groq_rate_limited" ||
    value === "groq_quota_exhausted" ||
    value === "groq_unavailable" ||
    value === "groq_model_unavailable" ||
    value === "groq_timeout" ||
    value === "groq_http_error" ||
    value === "groq_malformed_response" ||
    value === "groq_empty_response" ||
    value === "groq_output_too_large"
  );
}

function isLocalPersistedExecutionErrorCode(
  value: unknown
): value is PrivateAlphaLocalPersistedExecutionErrorCode {
  return (
    value === "execution_interrupted" ||
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

function isGroqPersistedExecutionErrorCode(
  value: unknown
): value is PrivateAlphaGroqPersistedExecutionErrorCode {
  return (
    value === "execution_interrupted" ||
    value === "kill_switch_blocked" ||
    value === "groq_credential_missing" ||
    value === "groq_authentication_failed" ||
    value === "groq_rate_limited" ||
    value === "groq_quota_exhausted" ||
    value === "groq_unavailable" ||
    value === "groq_model_unavailable" ||
    value === "groq_timeout" ||
    value === "groq_http_error" ||
    value === "groq_malformed_response" ||
    value === "groq_empty_response" ||
    value === "groq_output_too_large"
  );
}

function isLocalProviderExecutionErrorCode(
  value: unknown
): value is Exclude<
  PrivateAlphaLocalPersistedExecutionErrorCode,
  "execution_interrupted" | "kill_switch_blocked"
> {
  return (
    value === "ollama_unavailable" ||
    value === "ollama_model_missing" ||
    value === "ollama_timeout" ||
    value === "ollama_http_error" ||
    value === "ollama_malformed_response" ||
    value === "ollama_empty_response" ||
    value === "ollama_output_too_large"
  );
}

function isGroqProviderExecutionErrorCode(
  value: unknown
): value is Exclude<
  PrivateAlphaGroqPersistedExecutionErrorCode,
  "execution_interrupted" | "kill_switch_blocked"
> {
  return (
    value === "groq_credential_missing" ||
    value === "groq_authentication_failed" ||
    value === "groq_rate_limited" ||
    value === "groq_quota_exhausted" ||
    value === "groq_unavailable" ||
    value === "groq_model_unavailable" ||
    value === "groq_timeout" ||
    value === "groq_http_error" ||
    value === "groq_malformed_response" ||
    value === "groq_empty_response" ||
    value === "groq_output_too_large"
  );
}

function isLocalProviderAvailabilityErrorCode(
  value: unknown
): value is Exclude<
  PrivateAlphaLocalPersistedExecutionErrorCode,
  "execution_interrupted" | "kill_switch_blocked" | "ollama_empty_response"
> {
  return isLocalProviderExecutionErrorCode(value) && value !== "ollama_empty_response";
}

function isGroqProviderAvailabilityErrorCode(
  value: unknown
): value is Exclude<
  PrivateAlphaGroqPersistedExecutionErrorCode,
  "execution_interrupted" | "kill_switch_blocked" | "groq_empty_response"
> {
  return isGroqProviderExecutionErrorCode(value) && value !== "groq_empty_response";
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

function isBoundApprovalRecord(
  approval: PrivateAlphaApprovalRecord | null
): approval is PrivateAlphaBoundApprovalRecord {
  return approval !== null && "bindingVersion" in approval;
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

function readStoredApprovalBinding(
  record: Record<string, unknown>
): PrivateAlphaStoredApprovalBinding | null | undefined {
  const hasBindingVersion = Object.prototype.hasOwnProperty.call(
    record,
    "bindingVersion"
  );
  const hasModelKey = Object.prototype.hasOwnProperty.call(record, "modelKey");
  const hasDataBoundary = Object.prototype.hasOwnProperty.call(
    record,
    "dataBoundary"
  );
  const hasCloudRequirement = Object.prototype.hasOwnProperty.call(
    record,
    "cloudDataTransferRequirement"
  );

  if (
    !hasBindingVersion &&
    !hasModelKey &&
    !hasDataBoundary &&
    !hasCloudRequirement
  ) {
    return null;
  }

  if (
    !hasBindingVersion ||
    !hasModelKey ||
    !hasDataBoundary ||
    !hasCloudRequirement
  ) {
    return undefined;
  }

  if (record.bindingVersion !== PRIVATE_ALPHA_APPROVAL_BINDING_VERSION) {
    return undefined;
  }

  if (
    record.modelKey !== PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY &&
    record.modelKey !== PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY &&
    record.modelKey !== PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY
  ) {
    return undefined;
  }

  if (
    record.dataBoundary !== "local-machine" &&
    record.dataBoundary !== "cloud-provider"
  ) {
    return undefined;
  }

  if (
    record.cloudDataTransferRequirement !== "not-required" &&
    record.cloudDataTransferRequirement !==
      "explicit-operator-acknowledgement-required"
  ) {
    return undefined;
  }

  return {
    bindingVersion: PRIVATE_ALPHA_APPROVAL_BINDING_VERSION,
    modelKey: record.modelKey,
    dataBoundary: record.dataBoundary,
    cloudDataTransferRequirement: record.cloudDataTransferRequirement,
  };
}

function expectedCloudDataTransferAcknowledgement(
  request: Extract<PrivateAlphaRunRequest, { bindingVersion: 1 }>
): PrivateAlphaCloudDataTransferAcknowledgement {
  return isPrivateAlphaCloudApprovalOnlyConfiguration(request)
    ? "granted-for-approved-scope"
    : "not-required";
}

function buildLocalExecutionTarget(): PrivateAlphaLocalExecutionTarget {
  return {
    kind: "local",
    provider: PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID,
    model: PRIVATE_ALPHA_PRODUCTION_MODEL,
    dataBoundary: "local-machine",
  };
}

function buildGroq20bExecutionTarget(): PrivateAlphaGroq20bExecutionTarget {
  return {
    kind: "groq-20b",
    provider: "groq-cloud",
    model: "openai/gpt-oss-20b",
    modelKey: PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
    bindingVersion: PRIVATE_ALPHA_APPROVAL_BINDING_VERSION,
    dataBoundary: "cloud-provider",
    cloudExecutionAcknowledgement: "granted-for-approved-scope-execution",
  };
}

function buildGroq120bExecutionTarget(): PrivateAlphaGroq120bExecutionTarget {
  return {
    kind: "groq-120b",
    provider: "groq-cloud",
    model: "openai/gpt-oss-120b",
    modelKey: PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY,
    bindingVersion: PRIVATE_ALPHA_APPROVAL_BINDING_VERSION,
    dataBoundary: "cloud-provider",
    cloudExecutionAcknowledgement: "granted-for-approved-scope-execution",
  };
}

function resolveExecutionTargetFromRequestAndApprovalScope(
  request: PrivateAlphaRunRequest,
  approvalScope: PrivateAlphaApprovalScope
): PrivateAlphaExecutionTarget | null {
  if (
    isPrivateAlphaLocalExecutionConfiguration(request) &&
    isPrivateAlphaLocalExecutionConfiguration(approvalScope)
  ) {
    if (
      request.providerPreference !== PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID ||
      approvalScope.providerPreference !== PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID ||
      request.modelPreferenceLabel !== PRIVATE_ALPHA_PRODUCTION_MODEL ||
      approvalScope.modelPreferenceLabel !== PRIVATE_ALPHA_PRODUCTION_MODEL ||
      request.executionMode !== PRIVATE_ALPHA_PRODUCTION_EXECUTION_MODE ||
      approvalScope.executionMode !== PRIVATE_ALPHA_PRODUCTION_EXECUTION_MODE
    ) {
      return null;
    }

    if ("bindingVersion" in request !== "bindingVersion" in approvalScope) {
      return null;
    }

    if (
      "bindingVersion" in request &&
      "bindingVersion" in approvalScope &&
      (request.bindingVersion !== PRIVATE_ALPHA_APPROVAL_BINDING_VERSION ||
        approvalScope.bindingVersion !== PRIVATE_ALPHA_APPROVAL_BINDING_VERSION ||
        request.modelKey !== PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY ||
        approvalScope.modelKey !== PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY ||
        request.dataBoundary !== "local-machine" ||
        approvalScope.dataBoundary !== "local-machine" ||
        request.cloudDataTransferRequirement !== "not-required" ||
        approvalScope.cloudDataTransferRequirement !== "not-required")
    ) {
      return null;
    }

    return buildLocalExecutionTarget();
  }

  if (
    !isPrivateAlphaCloudExecutionConfiguration(request) ||
    !isPrivateAlphaCloudExecutionConfiguration(approvalScope) ||
    !("bindingVersion" in request) ||
    !("bindingVersion" in approvalScope) ||
    request.bindingVersion !== PRIVATE_ALPHA_APPROVAL_BINDING_VERSION ||
    approvalScope.bindingVersion !== PRIVATE_ALPHA_APPROVAL_BINDING_VERSION ||
    request.modelKey !== approvalScope.modelKey
  ) {
    return null;
  }

  switch (request.modelKey) {
    case PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY:
      return buildGroq20bExecutionTarget();
    case PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY:
      return buildGroq120bExecutionTarget();
    default:
      return null;
  }
}

function isCloudExecutionTarget(
  target: PrivateAlphaExecutionTarget
): target is PrivateAlphaGroq20bExecutionTarget | PrivateAlphaGroq120bExecutionTarget {
  return target.kind === "groq-20b" || target.kind === "groq-120b";
}

function resolveExecutionTargetModelKey(
  target: PrivateAlphaExecutionTarget
): PrivateAlphaRuntimeModelKey {
  return target.kind === "local"
    ? PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY
    : target.modelKey;
}

function validateStoredRunRequest(value: unknown): PrivateAlphaRunRequest | null {
  if (!isRecord(value)) {
    return null;
  }

  if (
    typeof value.normalizedRequestText !== "string" ||
    !value.normalizedRequestText ||
    value.normalizedRequestText.length > PRIVATE_ALPHA_MAX_REQUEST_LENGTH ||
    typeof value.redactedPreview !== "string" ||
    value.redactedPreview !==
      buildPrivateAlphaRedactedPreview(value.normalizedRequestText) ||
    (value.capability !== "text" && value.capability !== "code") ||
    typeof value.maximumOutputTokens !== "number" ||
    !Number.isInteger(value.maximumOutputTokens) ||
    value.maximumOutputTokens < 1 ||
    value.maximumOutputTokens > 4_096 ||
    value.retentionMode !== "local-private-alpha" ||
    (value.modelPreferenceLabel !== null &&
      (typeof value.modelPreferenceLabel !== "string" ||
        value.modelPreferenceLabel.length >
          PRIVATE_ALPHA_MAX_MODEL_PREFERENCE_LENGTH))
  ) {
    return null;
  }

  const binding = readStoredApprovalBinding(value);
  if (binding === undefined) {
    return null;
  }

  const requestKeys = [
    "capability",
    "executionMode",
    "maximumOutputTokens",
    "modelPreferenceLabel",
    "normalizedRequestText",
    "providerPreference",
    "redactedPreview",
    "retentionMode",
  ];
  if (
    !hasExactKeys(
      value,
      binding === null
        ? requestKeys
        : [
            ...requestKeys,
            "bindingVersion",
            "cloudDataTransferRequirement",
            "dataBoundary",
            "modelKey",
          ]
    )
  ) {
    return null;
  }

  const providerPreference =
    value.providerPreference === "auto"
      ? "auto"
      : value.providerPreference === "ollama-local"
        ? "ollama-local"
        : value.providerPreference === "groq-cloud"
          ? "groq-cloud"
        : null;
  const executionMode =
    value.executionMode === "locked-until-provider-slice"
      ? "locked-until-provider-slice"
      : value.executionMode === "manual-approved-local-provider"
        ? "manual-approved-local-provider"
        : value.executionMode === "manual-approved-cloud-provider-locked"
          ? "manual-approved-cloud-provider-locked"
        : null;

  if (providerPreference === null || executionMode === null) {
    return null;
  }

  if (binding === null) {
    if (
      providerPreference === "auto" &&
      executionMode === "locked-until-provider-slice"
    ) {
      const candidate: PrivateAlphaRunRequest = {
        normalizedRequestText: value.normalizedRequestText,
        redactedPreview: value.redactedPreview,
        capability: value.capability,
        providerPreference: "auto",
        modelPreferenceLabel: value.modelPreferenceLabel,
        maximumOutputTokens: value.maximumOutputTokens,
        retentionMode: "local-private-alpha",
        executionMode: "locked-until-provider-slice",
      };

      return isPrivateAlphaLegacyRunConfiguration(candidate) ? candidate : null;
    }

    if (
      providerPreference === PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID &&
      executionMode === PRIVATE_ALPHA_PRODUCTION_EXECUTION_MODE &&
      value.modelPreferenceLabel === PRIVATE_ALPHA_PRODUCTION_MODEL
    ) {
      const candidate: PrivateAlphaRunRequest = {
        normalizedRequestText: value.normalizedRequestText,
        redactedPreview: value.redactedPreview,
        capability: value.capability,
        providerPreference: PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID,
        modelPreferenceLabel: PRIVATE_ALPHA_PRODUCTION_MODEL,
        maximumOutputTokens: value.maximumOutputTokens,
        retentionMode: "local-private-alpha",
        executionMode: PRIVATE_ALPHA_PRODUCTION_EXECUTION_MODE,
      };

      return isPrivateAlphaLocalExecutionConfiguration(candidate)
        ? candidate
        : null;
    }

    return null;
  }

  switch (binding.modelKey) {
    case PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY:
      if (
        providerPreference !== PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID ||
        value.modelPreferenceLabel !== PRIVATE_ALPHA_PRODUCTION_MODEL ||
        executionMode !== PRIVATE_ALPHA_PRODUCTION_EXECUTION_MODE ||
        binding.dataBoundary !== "local-machine" ||
        binding.cloudDataTransferRequirement !==
          "not-required"
      ) {
        return null;
      }

      return {
        normalizedRequestText: value.normalizedRequestText,
        redactedPreview: value.redactedPreview,
        capability: value.capability,
        providerPreference: PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID,
        modelPreferenceLabel: PRIVATE_ALPHA_PRODUCTION_MODEL,
        maximumOutputTokens: value.maximumOutputTokens,
        retentionMode: "local-private-alpha",
        executionMode: PRIVATE_ALPHA_PRODUCTION_EXECUTION_MODE,
        bindingVersion: PRIVATE_ALPHA_APPROVAL_BINDING_VERSION,
        modelKey: PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
        dataBoundary: "local-machine",
        cloudDataTransferRequirement: "not-required",
      };
    case PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY:
      if (
        value.capability !== "text" ||
        providerPreference !== "groq-cloud" ||
        value.modelPreferenceLabel !== "openai/gpt-oss-20b" ||
        executionMode !== "manual-approved-cloud-provider-locked" ||
        binding.dataBoundary !== "cloud-provider" ||
        binding.cloudDataTransferRequirement !==
          "explicit-operator-acknowledgement-required"
      ) {
        return null;
      }

      return {
        normalizedRequestText: value.normalizedRequestText,
        redactedPreview: value.redactedPreview,
        capability: "text",
        providerPreference: "groq-cloud",
        modelPreferenceLabel: "openai/gpt-oss-20b",
        maximumOutputTokens: value.maximumOutputTokens,
        retentionMode: "local-private-alpha",
        executionMode: "manual-approved-cloud-provider-locked",
        bindingVersion: PRIVATE_ALPHA_APPROVAL_BINDING_VERSION,
        modelKey: PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
        dataBoundary: "cloud-provider",
        cloudDataTransferRequirement:
          "explicit-operator-acknowledgement-required",
      };
    case PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY:
      if (
        value.capability !== "text" ||
        providerPreference !== "groq-cloud" ||
        value.modelPreferenceLabel !== "openai/gpt-oss-120b" ||
        executionMode !== "manual-approved-cloud-provider-locked" ||
        binding.dataBoundary !== "cloud-provider" ||
        binding.cloudDataTransferRequirement !==
          "explicit-operator-acknowledgement-required"
      ) {
        return null;
      }

      return {
        normalizedRequestText: value.normalizedRequestText,
        redactedPreview: value.redactedPreview,
        capability: "text",
        providerPreference: "groq-cloud",
        modelPreferenceLabel: "openai/gpt-oss-120b",
        maximumOutputTokens: value.maximumOutputTokens,
        retentionMode: "local-private-alpha",
        executionMode: "manual-approved-cloud-provider-locked",
        bindingVersion: PRIVATE_ALPHA_APPROVAL_BINDING_VERSION,
        modelKey: PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY,
        dataBoundary: "cloud-provider",
        cloudDataTransferRequirement:
          "explicit-operator-acknowledgement-required",
      };
  }
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
      (typeof value.modelPreferenceLabel !== "string" ||
        value.modelPreferenceLabel.length >
          PRIVATE_ALPHA_MAX_MODEL_PREFERENCE_LENGTH))
  ) {
    return null;
  }

  const binding = readStoredApprovalBinding(value);
  if (binding === undefined) {
    return null;
  }

  const scopeKeys = [
    "capability",
    "executionMode",
    "maximumOutputTokens",
    "modelPreferenceLabel",
    "normalizedRequestHash",
    "providerPreference",
    "retentionMode",
    "runId",
  ];
  if (
    !hasExactKeys(
      value,
      binding === null
        ? scopeKeys
        : [
            ...scopeKeys,
            "bindingVersion",
            "cloudDataTransferRequirement",
            "dataBoundary",
            "modelKey",
          ]
    )
  ) {
    return null;
  }

  const providerPreference =
    value.providerPreference === "auto"
      ? "auto"
      : value.providerPreference === "ollama-local"
        ? "ollama-local"
        : value.providerPreference === "groq-cloud"
          ? "groq-cloud"
        : null;
  const executionMode =
    value.executionMode === "locked-until-provider-slice"
      ? "locked-until-provider-slice"
      : value.executionMode === "manual-approved-local-provider"
        ? "manual-approved-local-provider"
        : value.executionMode === "manual-approved-cloud-provider-locked"
          ? "manual-approved-cloud-provider-locked"
        : null;

  if (providerPreference === null || executionMode === null) {
    return null;
  }

  if (binding === null) {
    if (
      providerPreference === "auto" &&
      executionMode === "locked-until-provider-slice"
    ) {
      const candidate: PrivateAlphaApprovalScope = {
        runId: value.runId,
        capability: value.capability,
        normalizedRequestHash: value.normalizedRequestHash,
        providerPreference: "auto",
        modelPreferenceLabel: value.modelPreferenceLabel,
        maximumOutputTokens: value.maximumOutputTokens,
        retentionMode: "local-private-alpha",
        executionMode: "locked-until-provider-slice",
      };

      return isPrivateAlphaLegacyRunConfiguration(candidate) ? candidate : null;
    }

    if (
      providerPreference === PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID &&
      executionMode === PRIVATE_ALPHA_PRODUCTION_EXECUTION_MODE &&
      value.modelPreferenceLabel === PRIVATE_ALPHA_PRODUCTION_MODEL
    ) {
      const candidate: PrivateAlphaApprovalScope = {
        runId: value.runId,
        capability: value.capability,
        normalizedRequestHash: value.normalizedRequestHash,
        providerPreference: PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID,
        modelPreferenceLabel: PRIVATE_ALPHA_PRODUCTION_MODEL,
        maximumOutputTokens: value.maximumOutputTokens,
        retentionMode: "local-private-alpha",
        executionMode: PRIVATE_ALPHA_PRODUCTION_EXECUTION_MODE,
      };

      return isPrivateAlphaLocalExecutionConfiguration(candidate)
        ? candidate
        : null;
    }

    return null;
  }

  switch (binding.modelKey) {
    case PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY:
      if (
        providerPreference !== PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID ||
        value.modelPreferenceLabel !== PRIVATE_ALPHA_PRODUCTION_MODEL ||
        executionMode !== PRIVATE_ALPHA_PRODUCTION_EXECUTION_MODE ||
        binding.dataBoundary !== "local-machine" ||
        binding.cloudDataTransferRequirement !==
          "not-required"
      ) {
        return null;
      }

      return {
        runId: value.runId,
        capability: value.capability,
        normalizedRequestHash: value.normalizedRequestHash,
        providerPreference: PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID,
        modelPreferenceLabel: PRIVATE_ALPHA_PRODUCTION_MODEL,
        maximumOutputTokens: value.maximumOutputTokens,
        retentionMode: "local-private-alpha",
        executionMode: PRIVATE_ALPHA_PRODUCTION_EXECUTION_MODE,
        bindingVersion: PRIVATE_ALPHA_APPROVAL_BINDING_VERSION,
        modelKey: PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY,
        dataBoundary: "local-machine",
        cloudDataTransferRequirement: "not-required",
      };
    case PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY:
      if (
        value.capability !== "text" ||
        providerPreference !== "groq-cloud" ||
        value.modelPreferenceLabel !== "openai/gpt-oss-20b" ||
        executionMode !== "manual-approved-cloud-provider-locked" ||
        binding.dataBoundary !== "cloud-provider" ||
        binding.cloudDataTransferRequirement !==
          "explicit-operator-acknowledgement-required"
      ) {
        return null;
      }

      return {
        runId: value.runId,
        capability: "text",
        normalizedRequestHash: value.normalizedRequestHash,
        providerPreference: "groq-cloud",
        modelPreferenceLabel: "openai/gpt-oss-20b",
        maximumOutputTokens: value.maximumOutputTokens,
        retentionMode: "local-private-alpha",
        executionMode: "manual-approved-cloud-provider-locked",
        bindingVersion: PRIVATE_ALPHA_APPROVAL_BINDING_VERSION,
        modelKey: PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
        dataBoundary: "cloud-provider",
        cloudDataTransferRequirement:
          "explicit-operator-acknowledgement-required",
      };
    case PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY:
      if (
        value.capability !== "text" ||
        providerPreference !== "groq-cloud" ||
        value.modelPreferenceLabel !== "openai/gpt-oss-120b" ||
        executionMode !== "manual-approved-cloud-provider-locked" ||
        binding.dataBoundary !== "cloud-provider" ||
        binding.cloudDataTransferRequirement !==
          "explicit-operator-acknowledgement-required"
      ) {
        return null;
      }

      return {
        runId: value.runId,
        capability: "text",
        normalizedRequestHash: value.normalizedRequestHash,
        providerPreference: "groq-cloud",
        modelPreferenceLabel: "openai/gpt-oss-120b",
        maximumOutputTokens: value.maximumOutputTokens,
        retentionMode: "local-private-alpha",
        executionMode: "manual-approved-cloud-provider-locked",
        bindingVersion: PRIVATE_ALPHA_APPROVAL_BINDING_VERSION,
        modelKey: PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY,
        dataBoundary: "cloud-provider",
        cloudDataTransferRequirement:
          "explicit-operator-acknowledgement-required",
      };
  }
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
    !isUuid(value.approvalId) ||
    !isIsoTimestamp(value.approvedAt) ||
    value.actor !== "local-operator" ||
    !isHexHash(value.approvalScopeHash) ||
    acknowledgement === undefined ||
    (typeof acknowledgement === "string" &&
      !isBoundedSingleLineText(
        acknowledgement,
        PRIVATE_ALPHA_MAX_ACKNOWLEDGEMENT_LENGTH
      )) ||
    !isSafePositiveInteger(value.previousRevision) ||
    !isSafePositiveInteger(value.resultingRevision) ||
    value.executionAvailabilityStatement !==
      resolvePrivateAlphaApprovalStatement(request.executionMode)
  ) {
    return null;
  }

  if (!("bindingVersion" in request)) {
    if (
      !hasExactKeys(value, [
        "acknowledgement",
        "actor",
        "approvalId",
        "approvalScopeHash",
        "approvedAt",
        "executionAvailabilityStatement",
        "previousRevision",
        "resultingRevision",
      ]) ||
      Object.prototype.hasOwnProperty.call(value, "bindingVersion") ||
      Object.prototype.hasOwnProperty.call(
        value,
        "cloudDataTransferAcknowledgement"
      )
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

  if (
    !hasExactKeys(value, [
      "acknowledgement",
      "actor",
      "approvalId",
      "approvalScopeHash",
      "approvedAt",
      "bindingVersion",
      "cloudDataTransferAcknowledgement",
      "executionAvailabilityStatement",
      "previousRevision",
      "resultingRevision",
    ]) ||
    value.bindingVersion !== PRIVATE_ALPHA_APPROVAL_BINDING_VERSION ||
    (value.cloudDataTransferAcknowledgement !== "not-required" &&
      value.cloudDataTransferAcknowledgement !==
        "granted-for-approved-scope")
  ) {
    return null;
  }

  if (
    value.cloudDataTransferAcknowledgement !==
    expectedCloudDataTransferAcknowledgement(request)
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
    bindingVersion: PRIVATE_ALPHA_APPROVAL_BINDING_VERSION,
    cloudDataTransferAcknowledgement:
      value.cloudDataTransferAcknowledgement,
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
    !isUuid(value.cancellationId) ||
    !isIsoTimestamp(value.canceledAt) ||
    value.actor !== "local-operator" ||
    !isBoundedSingleLineText(
      value.reason,
      PRIVATE_ALPHA_MAX_CANCELLATION_REASON_LENGTH
    ) ||
    !isSafePositiveInteger(value.previousRevision) ||
    !isSafePositiveInteger(value.resultingRevision) ||
    !hasExactKeys(value, [
      "actor",
      "canceledAt",
      "cancellationId",
      "previousRevision",
      "reason",
      "resultingRevision",
    ])
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
  request: PrivateAlphaRunRequest,
  approvalScope: PrivateAlphaApprovalScope,
  approval: PrivateAlphaApprovalRecord | null,
  approvalScopeHash: string
): PrivateAlphaExecutionRecord | null {
  if (value === null) {
    return null;
  }

  if (!isRecord(value)) {
    return null;
  }

  const target = resolveExecutionTargetFromRequestAndApprovalScope(
    request,
    approvalScope
  );
  if (target === null) {
    return null;
  }

  if (
    isCloudExecutionTarget(target) &&
    (!isBoundApprovalRecord(approval) ||
      approval.bindingVersion !== PRIVATE_ALPHA_APPROVAL_BINDING_VERSION ||
      approval.approvalScopeHash !== approvalScopeHash ||
      approval.cloudDataTransferAcknowledgement !==
        "granted-for-approved-scope")
  ) {
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

  const runningRevision =
    value.runningRevision === null
      ? null
      : isSafePositiveInteger(value.runningRevision)
        ? value.runningRevision
        : undefined;

  const hasBindingVersion = Object.prototype.hasOwnProperty.call(
    value,
    "bindingVersion"
  );
  const hasModelKey = Object.prototype.hasOwnProperty.call(value, "modelKey");
  const hasDataBoundary = Object.prototype.hasOwnProperty.call(
    value,
    "dataBoundary"
  );
  const hasCloudExecutionAcknowledgement = Object.prototype.hasOwnProperty.call(
    value,
    "cloudExecutionAcknowledgement"
  );
  const hasGroqFreeTierExecutionConfirmation =
    Object.prototype.hasOwnProperty.call(
      value,
      "groqFreeTierExecutionConfirmation"
    );
  const groqFreeTierExecutionConfirmation =
    value.groqFreeTierExecutionConfirmation === undefined
      ? undefined
      : value.groqFreeTierExecutionConfirmation ===
          PRIVATE_ALPHA_GROQ_FREE_TIER_EXECUTION_CONFIRMATION_LITERAL
        ? PRIVATE_ALPHA_GROQ_FREE_TIER_EXECUTION_CONFIRMATION_LITERAL
        : null;
  const normalizedGroqFreeTierExecutionConfirmation =
    groqFreeTierExecutionConfirmation ===
    PRIVATE_ALPHA_GROQ_FREE_TIER_EXECUTION_CONFIRMATION_LITERAL
      ? PRIVATE_ALPHA_GROQ_FREE_TIER_EXECUTION_CONFIRMATION_LITERAL
      : undefined;
  const hasResponseStatus = Object.prototype.hasOwnProperty.call(
    value,
    "responseStatus"
  );

  const executionKeys = [
    "approvalScopeHash",
    "completedAt",
    "doneReason",
    "errorCode",
    "evalCount",
    "executionId",
    "idempotencyKeyHash",
    "loadDurationNanoseconds",
    "model",
    "outputSha256",
    "outputText",
    "previousRevision",
    "promptEvalCount",
    "provider",
    "resultingRevision",
    ...(hasResponseStatus ? ["responseStatus"] : []),
    "runningRevision",
    "safeErrorMessage",
    "startedAt",
    "status",
    "totalDurationNanoseconds",
  ];
  const targetSpecificExecutionKeys =
    target.kind === "local"
      ? executionKeys
      : [
          ...executionKeys,
          "bindingVersion",
          "cloudExecutionAcknowledgement",
          "dataBoundary",
          ...(hasGroqFreeTierExecutionConfirmation
            ? ["groqFreeTierExecutionConfirmation"]
            : []),
          "modelKey",
        ];

  if (
    !hasExactKeys(value, targetSpecificExecutionKeys) ||
    !isUuid(value.executionId) ||
    !isExecutionStatus(value.status) ||
    !isHexHash(value.idempotencyKeyHash) ||
    value.provider !== target.provider ||
    value.model !== target.model ||
    value.approvalScopeHash !== approvalScopeHash ||
    !isIsoTimestamp(value.startedAt) ||
    completedAt === undefined ||
    (completedAt !== null && !isIsoTimestamp(completedAt)) ||
    (completedAt !== null &&
      Date.parse(completedAt) < Date.parse(value.startedAt)) ||
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
    safeErrorMessage === undefined
  ) {
    return null;
  }

  if (target.kind === "local") {
    if (
      hasBindingVersion ||
      hasModelKey ||
      hasDataBoundary ||
      hasCloudExecutionAcknowledgement ||
      hasGroqFreeTierExecutionConfirmation
    ) {
      return null;
    }
  } else if (
    !hasBindingVersion ||
    !hasModelKey ||
    !hasDataBoundary ||
    !hasCloudExecutionAcknowledgement ||
    value.bindingVersion !== PRIVATE_ALPHA_APPROVAL_BINDING_VERSION ||
    value.modelKey !== target.modelKey ||
    value.dataBoundary !== target.dataBoundary ||
    value.cloudExecutionAcknowledgement !== target.cloudExecutionAcknowledgement ||
    groqFreeTierExecutionConfirmation === null
  ) {
    return null;
  }

  const errorCode =
    value.errorCode === null
      ? null
      : target.kind === "local"
        ? isLocalPersistedExecutionErrorCode(value.errorCode)
          ? value.errorCode
          : undefined
        : isGroqPersistedExecutionErrorCode(value.errorCode)
          ? value.errorCode
          : undefined;

  if (errorCode === undefined) {
    return null;
  }

  const responseStatus = hasResponseStatus
    ? value.responseStatus === null ||
      value.responseStatus === 200 ||
      value.responseStatus === 409 ||
      value.responseStatus === 500 ||
      value.responseStatus === 503 ||
      value.responseStatus === 504
      ? value.responseStatus
      : undefined
    : value.status === "executing"
      ? null
      : value.status === "succeeded"
        ? 200
        : value.status === "blocked" && errorCode !== null
          ? errorCode === "ollama_output_too_large" ||
            errorCode === "groq_output_too_large"
            ? 409
            : resolveAvailabilityBlockedResponseStatus(errorCode)
          : value.status === "failed" && errorCode !== null
            ? resolvePersistedFailedExecutionResponseStatus(
                errorCode,
                safeErrorMessage ?? "Private-alpha execution failed."
              )
            : 500;

  if (responseStatus === undefined) return null;

  if (
    runningRevision === null
      ? value.status !== "blocked" ||
        value.resultingRevision !== value.previousRevision + 1
      : runningRevision !== value.previousRevision + 1 ||
        (value.status === "executing"
          ? value.resultingRevision !== runningRevision
          : value.resultingRevision !== runningRevision + 1)
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
      doneReason !== null ||
      value.totalDurationNanoseconds !== null ||
      value.loadDurationNanoseconds !== null ||
      value.promptEvalCount !== null ||
      value.evalCount !== null ||
      runningRevision === null ||
      responseStatus !== null ||
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
      responseStatus !== 200 ||
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
      doneReason !== null ||
      value.totalDurationNanoseconds !== null ||
      value.loadDurationNanoseconds !== null ||
      value.promptEvalCount !== null ||
      value.evalCount !== null ||
      responseStatus === null ||
      runningRevision === null ||
      responseStatus !==
        resolvePersistedFailedExecutionResponseStatus(errorCode, safeErrorMessage)
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
      !safeErrorMessage ||
      doneReason !== null ||
      value.totalDurationNanoseconds !== null ||
      value.loadDurationNanoseconds !== null ||
      value.promptEvalCount !== null ||
      value.evalCount !== null ||
      responseStatus === null ||
      responseStatus === 200 ||
      responseStatus !==
        (errorCode === "ollama_output_too_large" ||
        errorCode === "groq_output_too_large"
          ? 409
          : resolveAvailabilityBlockedResponseStatus(errorCode)) ||
      (runningRevision !== null &&
        (errorCode !== "kill_switch_blocked" || responseStatus !== 409))
    ) {
      return null;
    }
  }

  const commonFields = {
    executionId: value.executionId,
    status: value.status,
    idempotencyKeyHash: value.idempotencyKeyHash,
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
    safeErrorMessage,
    responseStatus,
  } as const;

  if (target.kind === "local") {
    if (errorCode !== null && !isLocalPersistedExecutionErrorCode(errorCode)) {
      return null;
    }

    const record: PrivateAlphaLocalExecutionRecord = {
      ...commonFields,
      provider: PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID,
      model: PRIVATE_ALPHA_PRODUCTION_MODEL,
      errorCode,
    };

    return record;
  }

  if (target.kind === "groq-20b") {
    if (errorCode !== null && !isGroqPersistedExecutionErrorCode(errorCode)) {
      return null;
    }

    const record: PrivateAlphaGroq20bExecutionRecord = {
      ...commonFields,
      provider: "groq-cloud",
      model: "openai/gpt-oss-20b",
      bindingVersion: PRIVATE_ALPHA_APPROVAL_BINDING_VERSION,
      modelKey: PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
      dataBoundary: "cloud-provider",
      cloudExecutionAcknowledgement:
        "granted-for-approved-scope-execution",
      ...(normalizedGroqFreeTierExecutionConfirmation === undefined
        ? {}
        : {
            groqFreeTierExecutionConfirmation:
              normalizedGroqFreeTierExecutionConfirmation,
          }),
      errorCode,
    };

    return record;
  }

  if (errorCode !== null && !isGroqPersistedExecutionErrorCode(errorCode)) {
    return null;
  }

  const record: PrivateAlphaGroq120bExecutionRecord = {
    ...commonFields,
    provider: "groq-cloud",
    model: "openai/gpt-oss-120b",
    bindingVersion: PRIVATE_ALPHA_APPROVAL_BINDING_VERSION,
    modelKey: PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY,
    dataBoundary: "cloud-provider",
    cloudExecutionAcknowledgement:
      "granted-for-approved-scope-execution",
    ...(normalizedGroqFreeTierExecutionConfirmation === undefined
      ? {}
      : {
          groqFreeTierExecutionConfirmation:
            normalizedGroqFreeTierExecutionConfirmation,
        }),
    errorCode,
  };

  return record;
}

function validateStoredAuditEvents(
  value: unknown,
  runId: string,
  createdAt: string,
  updatedAt: string,
  runState: PrivateAlphaRunState,
  runRevision: number
): readonly PrivateAlphaAuditEvent[] | null {
  if (
    !Array.isArray(value) ||
    value.length < 2 ||
    value.length > PRIVATE_ALPHA_MAX_AUDIT_EVENTS
  ) {
    return null;
  }

  const events: PrivateAlphaAuditEvent[] = [];
  const eventIds = new Set<string>();
  for (const event of value) {
    if (!isRecord(event)) {
      return null;
    }

    const previousState =
      event.previousState === null || isRunState(event.previousState)
        ? event.previousState
        : undefined;

    if (
      !hasExactKeys(event, [
        "actor",
        "eventId",
        "eventType",
        "occurredAt",
        "previousState",
        "resultingState",
        "revision",
        "runId",
        "summary",
      ]) ||
      !isUuid(event.eventId) ||
      eventIds.has(event.eventId) ||
      !isAuditEventType(event.eventType) ||
      !isIsoTimestamp(event.occurredAt) ||
      !isAuditActor(event.actor) ||
      event.runId !== runId ||
      previousState === undefined ||
      !isRunState(event.resultingState) ||
      !isSafePositiveInteger(event.revision) ||
      !isBoundedSingleLineText(
        event.summary,
        PRIVATE_ALPHA_MAX_AUDIT_SUMMARY_LENGTH
      )
    ) {
      return null;
    }

    eventIds.add(event.eventId);
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

  const created = events[0];
  const approvalRequested = events[1];
  if (
    !created ||
    created.eventType !== "run.created" ||
    created.actor !== "local-operator" ||
    created.previousState !== null ||
    created.resultingState !== PRIVATE_ALPHA_INITIAL_RUN_STATE ||
    created.revision !== 1 ||
    created.occurredAt !== createdAt ||
    !approvalRequested ||
    approvalRequested.eventType !== "approval.requested" ||
    approvalRequested.actor !== "local-operator" ||
    approvalRequested.previousState !== PRIVATE_ALPHA_INITIAL_RUN_STATE ||
    approvalRequested.resultingState !== PRIVATE_ALPHA_INITIAL_RUN_STATE ||
    approvalRequested.revision !== 1 ||
    approvalRequested.occurredAt !== createdAt
  ) {
    return null;
  }

  let prior = approvalRequested;
  for (let index = 2; index < events.length; index += 1) {
    const event = events[index];
    if (
      !event ||
      event.previousState !== prior.resultingState ||
      event.revision !== prior.revision + 1 ||
      Date.parse(event.occurredAt) < Date.parse(prior.occurredAt)
    ) {
      return null;
    }

    const validTransition =
      (event.eventType === "approval.granted" &&
        event.actor === "local-operator" &&
        event.previousState === "awaiting_approval" &&
        event.resultingState === "approved") ||
      (event.eventType === "run.canceled" &&
        event.actor === "local-operator" &&
        (event.previousState === "awaiting_approval" ||
          event.previousState === "approved") &&
        event.resultingState === "canceled") ||
      (event.eventType === "execution.started" &&
        event.actor === "system" &&
        event.previousState === "approved" &&
        event.resultingState === "executing") ||
      (event.eventType === "execution.succeeded" &&
        event.actor === "system" &&
        event.previousState === "executing" &&
        event.resultingState === "succeeded") ||
      (event.eventType === "execution.failed" &&
        event.actor === "system" &&
        event.previousState === "executing" &&
        event.resultingState === "failed") ||
      (event.eventType === "execution.blocked" &&
        event.actor === "system" &&
        (event.previousState === "approved" ||
          event.previousState === "executing") &&
        event.resultingState === "blocked") ||
      (event.eventType === "run.blocked" &&
        event.actor === "system" &&
        (event.previousState === "awaiting_approval" ||
          event.previousState === "approved") &&
        event.resultingState === "blocked");
    if (!validTransition) return null;
    prior = event;
  }

  if (
    prior.resultingState !== runState ||
    prior.revision !== runRevision ||
    prior.occurredAt !== updatedAt
  ) {
    return null;
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
  const ownership = validateStoredRunOwnership(value.ownership);

  if (
    !hasExactKeys(value, [
      "approval",
      "approvalScope",
      "approvalScopeHash",
      "auditEvents",
      "cancellation",
      "createdAt",
      "execution",
      "idempotencyKeyHash",
      ...(Object.prototype.hasOwnProperty.call(value, "ownership")
        ? ["ownership"]
        : []),
      "request",
      "revision",
      "runId",
      "state",
      "updatedAt",
      "version",
    ]) ||
    value.version !== PRIVATE_ALPHA_RECORD_VERSION ||
    value.runId !== expectedRunId ||
    !isIsoTimestamp(value.createdAt) ||
    !isIsoTimestamp(value.updatedAt) ||
    Date.parse(value.updatedAt) < Date.parse(value.createdAt) ||
    !isRunState(value.state) ||
    !isSafePositiveInteger(value.revision) ||
    !isHexHash(value.idempotencyKeyHash) ||
    ownership === undefined ||
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
    runRequest,
    approvalScope,
    approval,
    value.approvalScopeHash
  );
  const auditEvents = validateStoredAuditEvents(
    value.auditEvents,
    expectedRunId,
    value.createdAt,
    value.updatedAt,
    value.state,
    value.revision
  );

  if (
    !auditEvents ||
    approvalScope.runId !== expectedRunId ||
    approvalScope.capability !== runRequest.capability ||
    approvalScope.providerPreference !== runRequest.providerPreference ||
    approvalScope.modelPreferenceLabel !== runRequest.modelPreferenceLabel ||
    approvalScope.maximumOutputTokens !== runRequest.maximumOutputTokens ||
    approvalScope.retentionMode !== runRequest.retentionMode ||
    approvalScope.executionMode !== runRequest.executionMode ||
    (value.execution !== null &&
      value.execution !== undefined &&
      execution === null)
  ) {
    return null;
  }

  if ("bindingVersion" in runRequest !== "bindingVersion" in approvalScope) {
    return null;
  }

  if (
    "bindingVersion" in runRequest &&
    "bindingVersion" in approvalScope &&
    (runRequest.bindingVersion !== approvalScope.bindingVersion ||
      runRequest.modelKey !== approvalScope.modelKey ||
      runRequest.dataBoundary !== approvalScope.dataBoundary ||
      runRequest.cloudDataTransferRequirement !==
        approvalScope.cloudDataTransferRequirement)
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

  const approvalAudit = auditEvents.find(
    (event) => event.eventType === "approval.granted"
  );
  if (
    approval === null
      ? approvalAudit !== undefined
      : approval.previousRevision !== 1 ||
        approval.resultingRevision !== 2 ||
        approvalAudit?.revision !== approval.resultingRevision ||
        approvalAudit.occurredAt !== approval.approvedAt
  ) {
    return null;
  }

  const cancellationAudit = auditEvents.find(
    (event) => event.eventType === "run.canceled"
  );
  const expectedCancellationPreviousRevision = approval?.resultingRevision ?? 1;
  if (
    cancellation === null
      ? cancellationAudit !== undefined
      : cancellation.previousRevision !== expectedCancellationPreviousRevision ||
        cancellation.resultingRevision !==
          expectedCancellationPreviousRevision + 1 ||
        cancellationAudit?.revision !== cancellation.resultingRevision ||
        cancellationAudit.occurredAt !== cancellation.canceledAt ||
        value.revision !== cancellation.resultingRevision
  ) {
    return null;
  }

  const executionStartedAudit = auditEvents.find(
    (event) => event.eventType === "execution.started"
  );
  const executionTerminalAudit = auditEvents.find(
    (event) =>
      event.eventType === "execution.succeeded" ||
      event.eventType === "execution.failed" ||
      event.eventType === "execution.blocked"
  );
  if (execution) {
    if (
      !approval ||
      execution.previousRevision !== approval.resultingRevision ||
      value.revision !== execution.resultingRevision ||
      (execution.runningRevision === null
        ? executionStartedAudit !== undefined ||
          execution.status !== "blocked" ||
          executionTerminalAudit?.revision !== execution.resultingRevision ||
          executionTerminalAudit.occurredAt !== execution.completedAt
        : executionStartedAudit?.revision !== execution.runningRevision ||
          executionStartedAudit.occurredAt !== execution.startedAt ||
          (execution.status === "executing"
            ? executionTerminalAudit !== undefined
            : executionTerminalAudit?.revision !== execution.resultingRevision ||
              executionTerminalAudit.occurredAt !== execution.completedAt)) ||
      (execution.errorCode === "execution_interrupted" &&
        (execution.status !== "failed" ||
          execution.runningRevision === null))
    ) {
      return null;
    }
  } else if (executionStartedAudit || executionTerminalAudit) {
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
    ownership,
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
    typeof value.runId !== "string" ||
    !/^[a-f0-9]{24}$/.test(value.runId)
  ) {
    return null;
  }

  const hasProtocolField =
    Object.prototype.hasOwnProperty.call(value, "protocolVersion") ||
    Object.prototype.hasOwnProperty.call(value, "publicationPhase") ||
    Object.prototype.hasOwnProperty.call(value, "requestDigest") ||
    Object.prototype.hasOwnProperty.call(value, "ownership") ||
    Object.prototype.hasOwnProperty.call(value, "reservedAt") ||
    Object.prototype.hasOwnProperty.call(value, "publishedAt");

  if (!hasProtocolField) {
    if (
      !hasExactKeys(value, [
        "canonicalRequestHash",
        "createdAt",
        "idempotencyKeyHash",
        "runId",
        "version",
      ]) ||
      !isHexHash(value.canonicalRequestHash) ||
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

  const ownership = validateStoredRunOwnership(value.ownership);
  if (
    !hasExactKeys(value, [
      "idempotencyKeyHash",
      "ownership",
      "protocolVersion",
      "publicationPhase",
      "publishedAt",
      "requestDigest",
      "reservedAt",
      "runId",
      "version",
    ]) ||
    value.protocolVersion !== PRIVATE_ALPHA_IDEMPOTENCY_PROTOCOL_VERSION ||
    (value.publicationPhase !== "reserved" && value.publicationPhase !== "published") ||
    !isHexHash(value.requestDigest) ||
    ownership === undefined ||
    !isIsoTimestamp(value.reservedAt) ||
    (value.publishedAt !== null && !isIsoTimestamp(value.publishedAt)) ||
    (value.publicationPhase === "reserved" && value.publishedAt !== null) ||
    (value.publicationPhase === "published" && value.publishedAt === null)
  ) {
    return null;
  }

  return {
    version: PRIVATE_ALPHA_RECORD_VERSION,
    protocolVersion: PRIVATE_ALPHA_IDEMPOTENCY_PROTOCOL_VERSION,
    publicationPhase: value.publicationPhase,
    idempotencyKeyHash: value.idempotencyKeyHash,
    requestDigest: value.requestDigest,
    runId: value.runId,
    ownership,
    reservedAt: value.reservedAt,
    publishedAt: value.publishedAt,
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
  const locksDirectoryAbsolutePath = joinCodexForgeSafeRelativePath(
    dataRootAbsolutePath,
    "locks"
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
    locksDirectoryAbsolutePath,
    killSwitchFileAbsolutePath,
    identityState: {
      projectRoot: null,
      dataRoot: null,
      parents: new Map<string, PrivateAlphaDirectoryIdentity>(),
    },
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

function buildRunLockFileAbsolutePath(
  paths: PrivateAlphaResolvedPaths,
  runId: string
): string {
  return joinCodexForgeSafeRelativePath(
    paths.locksDirectoryAbsolutePath,
    `${runId}.lock.json`
  );
}

function privateAlphaNativeSegmentsForAbsolutePath(
  paths: PrivateAlphaResolvedPaths,
  absolutePath: string
): readonly string[] {
  const relative = path.relative(paths.dataRootAbsolutePath, absolutePath);
  if (
    !relative ||
    path.isAbsolute(relative) ||
    relative === ".." ||
    relative.startsWith(`..${path.sep}`)
  ) {
    throw new PrivateAlphaStoreError(
      500,
      "Private-alpha native path escaped its fixed data root."
    );
  }
  return assertPrivateAlphaNativeSegments(relative.split(path.sep));
}

function isPrivateAlphaNativeError(
  error: unknown,
  ...codes: readonly PrivateAlphaNativeFilesystemError["code"][]
): error is PrivateAlphaNativeFilesystemError {
  return (
    error instanceof PrivateAlphaNativeFilesystemError &&
    codes.includes(error.code)
  );
}

function throwPrivateAlphaNativeStorageError(error: unknown): never {
  if (isPrivateAlphaNativeError(error, "not_found")) {
    throw new PrivateAlphaStoreError(404, "Run not found.");
  }
  if (isPrivateAlphaNativeError(error, "compare_mismatch", "fence_mismatch", "conflict")) {
    throw new PrivateAlphaStoreError(
      409,
      "Private-alpha persistence changed before atomic publication."
    );
  }
  if (isPrivateAlphaNativeError(error, "unavailable")) {
    throw new PrivateAlphaStoreError(
      503,
      "Secure private-alpha Windows filesystem support is unavailable. Rebuild or restore the audited native component before retrying."
    );
  }
  throw new PrivateAlphaStoreError(
    500,
    "Secure private-alpha filesystem mutation failed closed."
  );
}

async function withPrivateAlphaNativeStorageLease<T>(
  paths: PrivateAlphaResolvedPaths,
  work: () => Promise<T>
): Promise<T> {
  try {
    return await withPrivateAlphaNativeRootLease(paths.dataRootLabel, work);
  } catch (error) {
    if (error instanceof PrivateAlphaStoreError) throw error;
    throwPrivateAlphaNativeStorageError(error);
  }
}

async function ensureSafeDirectory(directoryAbsolutePath: string): Promise<void> {
  const relative = path.relative(CODEXFORGE_PROJECT_ROOT, directoryAbsolutePath);
  if (
    relative === "" ||
    path.isAbsolute(relative) ||
    relative === ".." ||
    relative.startsWith(`..${path.sep}`)
  ) {
    throw new PrivateAlphaStoreError(500, "Private-alpha storage path is unsafe.");
  }

  const rootStat = await lstat(CODEXFORGE_PROJECT_ROOT);
  if (rootStat.isSymbolicLink() || !rootStat.isDirectory()) {
    throw new PrivateAlphaStoreError(500, "Private-alpha storage root is unsafe.");
  }
  const rootRealPath = await realpath(CODEXFORGE_PROJECT_ROOT);
  let current = CODEXFORGE_PROJECT_ROOT;
  for (const segment of relative.split(path.sep)) {
    if (!segment || segment === "." || segment === "..") {
      throw new PrivateAlphaStoreError(500, "Private-alpha storage path is unsafe.");
    }
    current = path.join(current, segment);
    let stat = await lstat(current).catch((error: unknown) => {
      if (isMissingError(error)) return null;
      throw error;
    });
    if (!stat) {
      await mkdir(current).catch((error: unknown) => {
        if (!isAlreadyExistsError(error)) throw error;
      });
      stat = await lstat(current);
    }
    if (stat.isSymbolicLink() || !stat.isDirectory()) {
      throw new PrivateAlphaStoreError(500, "Private-alpha storage path is unsafe.");
    }
    const resolved = await realpath(current);
    const resolvedRelative = path.relative(rootRealPath, resolved);
    if (
      path.isAbsolute(resolvedRelative) ||
      resolvedRelative === ".." ||
      resolvedRelative.startsWith(`..${path.sep}`)
    ) {
      throw new PrivateAlphaStoreError(500, "Private-alpha storage path escaped its root.");
    }
  }
}

function sameDirectoryIdentity(
  left: PrivateAlphaDirectoryIdentity,
  right: PrivateAlphaDirectoryIdentity
): boolean {
  return (
    left.absolutePath === right.absolutePath &&
    left.realPath === right.realPath &&
    left.device === right.device &&
    left.inode === right.inode
  );
}

async function readDirectoryIdentity(
  absolutePath: string
): Promise<PrivateAlphaDirectoryIdentity> {
  const stat = await lstat(absolutePath);
  const realPath = await realpath(absolutePath);
  if (stat.isSymbolicLink() || !stat.isDirectory()) {
    throw new PrivateAlphaStoreError(
      500,
      "Private-alpha directory trust anchor is unsafe."
    );
  }
  return {
    absolutePath,
    realPath,
    device: stat.dev,
    inode: stat.ino,
  };
}

function assertIdentityUnchanged(
  expected: PrivateAlphaDirectoryIdentity,
  actual: PrivateAlphaDirectoryIdentity,
  message: string
): void {
  if (!sameDirectoryIdentity(expected, actual)) {
    throw new PrivateAlphaStoreError(500, message);
  }
}

async function assertAndPinPrivateAlphaTrustAnchors(
  paths: PrivateAlphaResolvedPaths
): Promise<void> {
  const projectIdentity = await readDirectoryIdentity(CODEXFORGE_PROJECT_ROOT);
  if (paths.identityState.projectRoot) {
    assertIdentityUnchanged(
      paths.identityState.projectRoot,
      projectIdentity,
      "Private-alpha project root identity changed during this process."
    );
  } else {
    paths.identityState.projectRoot = projectIdentity;
  }

  const dataRootIdentity = await readDirectoryIdentity(
    paths.dataRootAbsolutePath
  );
  const relative = path.relative(
    projectIdentity.realPath,
    dataRootIdentity.realPath
  );
  if (
    path.isAbsolute(relative) ||
    relative === ".." ||
    relative.startsWith(`..${path.sep}`)
  ) {
    throw new PrivateAlphaStoreError(
      500,
      "Private-alpha data root escaped its pinned project root."
    );
  }
  if (paths.identityState.dataRoot) {
    assertIdentityUnchanged(
      paths.identityState.dataRoot,
      dataRootIdentity,
      "Private-alpha data root identity changed during this process."
    );
  } else {
    paths.identityState.dataRoot = dataRootIdentity;
  }
}

async function capturePinnedParentIdentity(
  paths: PrivateAlphaResolvedPaths,
  fileAbsolutePath: string
): Promise<PrivateAlphaDirectoryIdentity> {
  await assertAndPinPrivateAlphaTrustAnchors(paths);
  const parentAbsolutePath = path.dirname(fileAbsolutePath);
  await assertAndPinPrivateAlphaTrustAnchors(paths);
  const identity = await readDirectoryIdentity(parentAbsolutePath);
  const dataRootIdentity = paths.identityState.dataRoot;
  if (!dataRootIdentity) {
    throw new PrivateAlphaStoreError(
      500,
      "Private-alpha data root identity is unavailable."
    );
  }
  const relative = path.relative(dataRootIdentity.realPath, identity.realPath);
  if (
    path.isAbsolute(relative) ||
    relative === ".." ||
    relative.startsWith(`..${path.sep}`)
  ) {
    throw new PrivateAlphaStoreError(
      500,
      "Private-alpha operation parent escaped its pinned data root."
    );
  }

  const pinned = paths.identityState.parents.get(parentAbsolutePath);
  if (pinned) {
    assertIdentityUnchanged(
      pinned,
      identity,
      "Private-alpha operation parent identity changed during this process."
    );
  } else {
    paths.identityState.parents.set(parentAbsolutePath, identity);
  }
  return identity;
}

async function revalidatePinnedParentIdentity(
  paths: PrivateAlphaResolvedPaths,
  identity: PrivateAlphaDirectoryIdentity
): Promise<void> {
  await assertAndPinPrivateAlphaTrustAnchors(paths);
  assertIdentityUnchanged(
    identity,
    await readDirectoryIdentity(identity.absolutePath),
    "Private-alpha operation parent identity changed at the filesystem boundary."
  );
}

async function ensureStoreDirectories(paths: PrivateAlphaResolvedPaths): Promise<void> {
  assertSecurePrivateAlphaMutationPlatform();
  if (process.platform === "win32") {
    try {
      withPrivateAlphaNativeRoot(paths.dataRootLabel, (root) => {
        root.ensureDirectory(["runs"]);
        root.ensureDirectory(["idempotency"]);
        root.ensureDirectory(["locks"]);
      });
      return;
    } catch (error) {
      throwPrivateAlphaNativeStorageError(error);
    }
  }
  await ensureSafeDirectory(paths.dataRootAbsolutePath);
  await assertAndPinPrivateAlphaTrustAnchors(paths);
  await ensureSafeDirectory(paths.runsDirectoryAbsolutePath);
  await ensureSafeDirectory(paths.idempotencyDirectoryAbsolutePath);
  await ensureSafeDirectory(paths.locksDirectoryAbsolutePath);
  await capturePinnedParentIdentity(
    paths,
    path.join(paths.runsDirectoryAbsolutePath, ".identity-boundary")
  );
  await capturePinnedParentIdentity(
    paths,
    path.join(paths.idempotencyDirectoryAbsolutePath, ".identity-boundary")
  );
  await capturePinnedParentIdentity(
    paths,
    path.join(paths.locksDirectoryAbsolutePath, ".identity-boundary")
  );
  await assertAndPinPrivateAlphaTrustAnchors(paths);
}

async function inspectExistingDirectoryForRead(
  paths: PrivateAlphaResolvedPaths,
  directoryAbsolutePath: string,
  nativeSegments: readonly string[]
): Promise<boolean> {
  if (process.platform === "win32") {
    try {
      const kind = withPrivateAlphaExistingNativeRoot(
        paths.dataRootLabel,
        (root) => nativeSegments.length === 0 ? "directory" : root.stat(nativeSegments)
      );
      if (kind === null) return false;
      if (kind !== "directory") {
        throw new PrivateAlphaStoreError(
          500,
          "Private-alpha read boundary contains an unsafe directory node."
        );
      }
      return true;
    } catch (error) {
      if (isPrivateAlphaNativeError(error, "not_found")) return false;
      if (error instanceof PrivateAlphaStoreError) throw error;
      throwPrivateAlphaNativeStorageError(error);
    }
  }

  const projectIdentity = await readDirectoryIdentity(CODEXFORGE_PROJECT_ROOT);
  const relative = path.relative(CODEXFORGE_PROJECT_ROOT, directoryAbsolutePath);
  if (
    !relative ||
    path.isAbsolute(relative) ||
    relative === ".." ||
    relative.startsWith(`..${path.sep}`)
  ) {
    throw new PrivateAlphaStoreError(500, "Private-alpha read boundary escaped its root.");
  }

  let current = CODEXFORGE_PROJECT_ROOT;
  for (const segment of relative.split(path.sep)) {
    if (!segment || segment === "." || segment === "..") {
      throw new PrivateAlphaStoreError(500, "Private-alpha read boundary is unsafe.");
    }
    current = path.join(current, segment);
    const stat = await lstat(current).catch((error: unknown) => {
      if (isMissingError(error)) return null;
      throw error;
    });
    if (!stat) return false;
    if (stat.isSymbolicLink() || !stat.isDirectory()) {
      throw new PrivateAlphaStoreError(
        500,
        "Private-alpha read boundary contains an unsafe directory node."
      );
    }
    const resolved = await realpath(current);
    if (!isAbsolutePathInsideBase(resolved, projectIdentity.realPath, true)) {
      throw new PrivateAlphaStoreError(
        500,
        "Private-alpha read boundary escaped its pinned project root."
      );
    }
  }

  await assertAndPinPrivateAlphaTrustAnchors(paths);
  const identity = await readDirectoryIdentity(directoryAbsolutePath);
  const dataRootIdentity = paths.identityState.dataRoot;
  if (
    !dataRootIdentity ||
    !isAbsolutePathInsideBase(identity.realPath, dataRootIdentity.realPath, true)
  ) {
    throw new PrivateAlphaStoreError(
      500,
      "Private-alpha read directory escaped its pinned data root."
    );
  }
  paths.identityState.parents.set(directoryAbsolutePath, identity);
  return true;
}

async function inspectRunDirectoryForRead(
  paths: PrivateAlphaResolvedPaths
): Promise<boolean> {
  return inspectExistingDirectoryForRead(
    paths,
    paths.runsDirectoryAbsolutePath,
    ["runs"]
  );
}

async function inspectDataRootForRead(
  paths: PrivateAlphaResolvedPaths
): Promise<boolean> {
  return inspectExistingDirectoryForRead(paths, paths.dataRootAbsolutePath, []);
}

async function assertSafeExistingFile(
  paths: PrivateAlphaResolvedPaths,
  fileAbsolutePath: string
): Promise<void> {
  if (process.platform === "win32") {
    try {
      const kind = withPrivateAlphaNativeRoot(paths.dataRootLabel, (root) =>
        root.stat(privateAlphaNativeSegmentsForAbsolutePath(paths, fileAbsolutePath))
      );
      if (kind !== "file") {
        throw new PrivateAlphaStoreError(500, "Persisted private-alpha file is unsafe.");
      }
      return;
    } catch (error) {
      if (isPrivateAlphaNativeError(error, "not_found")) return;
      if (error instanceof PrivateAlphaStoreError) throw error;
      throwPrivateAlphaNativeStorageError(error);
    }
  }
  await assertCurrentRunLockFenceForMutation(paths, fileAbsolutePath);
  const parentIdentity = await capturePinnedParentIdentity(paths, fileAbsolutePath);
  await revalidatePinnedParentIdentity(paths, parentIdentity);
  const stat = await lstat(fileAbsolutePath).catch((error: unknown) => {
    if (isMissingError(error)) {
      return null;
    }

    throw error;
  });

  if (!stat) {
    await revalidatePinnedParentIdentity(paths, parentIdentity);
    return;
  }

  if (stat.isSymbolicLink() || !stat.isFile()) {
    throw new PrivateAlphaStoreError(500, "Persisted private-alpha file is unsafe.");
  }

  const rootRealPath = await realpath(CODEXFORGE_PROJECT_ROOT);
  const resolved = await realpath(fileAbsolutePath);
  const resolvedRelative = path.relative(rootRealPath, resolved);
  if (
    path.isAbsolute(resolvedRelative) ||
    resolvedRelative === ".." ||
    resolvedRelative.startsWith(`..${path.sep}`)
  ) {
    throw new PrivateAlphaStoreError(500, "Persisted private-alpha file escaped its root.");
  }
  await revalidatePinnedParentIdentity(paths, parentIdentity);
}

async function readVerifiedBoundedFile(
  paths: PrivateAlphaResolvedPaths,
  fileAbsolutePath: string,
  maximumBytes: number,
  expectedIdentity?: Readonly<{ dev: number; ino: number; size: number }>
): Promise<string | null> {
  if (process.platform === "win32") {
    try {
      const bytes = withPrivateAlphaNativeRoot(paths.dataRootLabel, (root) =>
        root.readFile(
          privateAlphaNativeSegmentsForAbsolutePath(paths, fileAbsolutePath),
          maximumBytes
        )
      );
      if (expectedIdentity && bytes.length !== expectedIdentity.size) {
        throw new PrivateAlphaStoreError(
          500,
          "Persisted private-alpha file failed its expected byte boundary."
        );
      }
      if (!isUtf8(bytes)) {
        throw new PrivateAlphaStoreError(
          500,
          "Persisted private-alpha file is not valid UTF-8."
        );
      }
      return bytes.toString("utf8");
    } catch (error) {
      if (isPrivateAlphaNativeError(error, "not_found")) return null;
      if (error instanceof PrivateAlphaStoreError) throw error;
      throwPrivateAlphaNativeStorageError(error);
    }
  }
  const parentIdentity = await capturePinnedParentIdentity(paths, fileAbsolutePath);
  await revalidatePinnedParentIdentity(paths, parentIdentity);
  let handle: FileHandle | null = null;
  try {
    try {
      handle = await open(fileAbsolutePath, "r");
    } catch (error) {
      if (isMissingError(error)) return null;
      throw error;
    }
    const before = await handle.stat();
    await revalidatePinnedParentIdentity(paths, parentIdentity);
    const pathBefore = await lstat(fileAbsolutePath).catch((error: unknown) => {
      if (isMissingError(error)) return null;
      throw error;
    });
    const resolvedBefore = pathBefore ? await realpath(fileAbsolutePath) : null;
    const dataRootIdentity = paths.identityState.dataRoot;
    if (
      !pathBefore ||
      !before.isFile() ||
      !pathBefore.isFile() ||
      pathBefore.isSymbolicLink() ||
      before.dev !== pathBefore.dev ||
      before.ino !== pathBefore.ino ||
      before.size <= 0 ||
      before.size > maximumBytes ||
      (expectedIdentity !== undefined &&
        (before.dev !== expectedIdentity.dev ||
          before.ino !== expectedIdentity.ino ||
          before.size !== expectedIdentity.size)) ||
      !dataRootIdentity ||
      resolvedBefore === null ||
      !isAbsolutePathInsideBase(resolvedBefore, dataRootIdentity.realPath, false)
    ) {
      throw new PrivateAlphaStoreError(
        500,
        "Persisted private-alpha file failed its verified-handle boundary."
      );
    }
    const buffer = Buffer.alloc(maximumBytes + 1);
    let bytesReadTotal = 0;
    while (bytesReadTotal < buffer.length) {
      const { bytesRead } = await handle.read(
        buffer,
        bytesReadTotal,
        buffer.length - bytesReadTotal,
        bytesReadTotal
      );
      if (bytesRead === 0) break;
      bytesReadTotal += bytesRead;
    }
    const after = await handle.stat();
    await revalidatePinnedParentIdentity(paths, parentIdentity);
    const pathAfter = await lstat(fileAbsolutePath).catch((error: unknown) => {
      if (isMissingError(error)) return null;
      throw error;
    });
    const resolvedAfter = pathAfter ? await realpath(fileAbsolutePath) : null;
    if (
      !pathAfter ||
      !after.isFile() ||
      !pathAfter.isFile() ||
      pathAfter.isSymbolicLink() ||
      after.dev !== before.dev ||
      after.ino !== before.ino ||
      after.size !== before.size ||
      pathAfter.dev !== before.dev ||
      pathAfter.ino !== before.ino ||
      resolvedAfter !== resolvedBefore ||
      after.size > maximumBytes ||
      bytesReadTotal !== after.size ||
      bytesReadTotal > maximumBytes
    ) {
      throw new PrivateAlphaStoreError(
        500,
        "Persisted private-alpha file changed during its verified-handle read."
      );
    }
    const verifiedBytes = buffer.subarray(0, bytesReadTotal);
    if (!isUtf8(verifiedBytes)) {
      throw new PrivateAlphaStoreError(
        500,
        "Persisted private-alpha file is not valid UTF-8."
      );
    }
    return verifiedBytes.toString("utf8");
  } finally {
    await handle?.close().catch(() => undefined);
  }
}

async function readRunRecordFromFile(
  paths: PrivateAlphaResolvedPaths,
  runAbsolutePath: string,
  runId: string
): Promise<PrivateAlphaRunRecord> {
  const raw = await readVerifiedBoundedFile(
    paths,
    runAbsolutePath,
    PRIVATE_ALPHA_RUN_RECORD_MAX_BYTES
  );
  if (raw === null) throw new PrivateAlphaStoreError(404, "Run not found.");

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

  PRIVATE_ALPHA_VERIFIED_PERSISTED_BYTES.set(
    validated,
    Buffer.from(raw, "utf8")
  );
  return validated;
}

async function readIdempotencyRecordFromFile(
  paths: PrivateAlphaResolvedPaths,
  idempotencyAbsolutePath: string,
  idempotencyKeyHash: string
): Promise<PrivateAlphaIdempotencyRecord | null> {
  const raw = await readVerifiedBoundedFile(
    paths,
    idempotencyAbsolutePath,
    PRIVATE_ALPHA_IDEMPOTENCY_RECORD_MAX_BYTES
  );
  if (raw === null) return null;

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

  PRIVATE_ALPHA_VERIFIED_PERSISTED_BYTES.set(
    validated,
    Buffer.from(raw, "utf8")
  );
  return validated;
}

function idempotencyRequestDigest(record: PrivateAlphaIdempotencyRecord): string {
  return "requestDigest" in record
    ? record.requestDigest
    : record.canonicalRequestHash;
}

async function readRunRecordIfPresent(
  paths: PrivateAlphaResolvedPaths,
  runId: string
): Promise<PrivateAlphaRunRecord | null> {
  try {
    return await readRunRecordFromFile(
      paths,
      buildRunFileAbsolutePath(paths, runId),
      runId
    );
  } catch (error) {
    if (error instanceof PrivateAlphaStoreError && error.status === 404) return null;
    throw error;
  }
}

function assertRunMatchesIdempotencyRecord(
  run: PrivateAlphaRunRecord,
  record: PrivateAlphaIdempotencyRecord
): void {
  if (
    run.runId !== record.runId ||
    run.idempotencyKeyHash !== record.idempotencyKeyHash ||
    buildPrivateAlphaCanonicalRequestHash(run.request) !==
      idempotencyRequestDigest(record)
  ) {
    throw new PrivateAlphaStoreError(
      500,
      "Persisted private-alpha run contradicts its idempotency reservation."
    );
  }

  if (
    "protocolVersion" in record &&
    (!sameRunOwnership(run.ownership, record.ownership) ||
      run.createdAt !== record.reservedAt ||
      (record.publicationPhase === "published" &&
        record.publishedAt !== run.createdAt))
  ) {
    throw new PrivateAlphaStoreError(
      500,
      "Persisted private-alpha run contradicts its publication reservation."
    );
  }
}

function buildPublishedIdempotencyRecord(
  record: PrivateAlphaProtocolIdempotencyRecord,
  run: PrivateAlphaRunRecord
): PrivateAlphaProtocolIdempotencyRecord {
  return {
    ...record,
    publicationPhase: "published",
    publishedAt: run.createdAt,
  };
}

async function finalizeIdempotencyPublication(
  paths: PrivateAlphaResolvedPaths,
  idempotencyAbsolutePath: string,
  initialRecord: PrivateAlphaProtocolIdempotencyRecord,
  run: PrivateAlphaRunRecord
): Promise<PrivateAlphaProtocolIdempotencyRecord> {
  let expectedRecord = initialRecord;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    assertRunMatchesIdempotencyRecord(run, expectedRecord);
    if (expectedRecord.publicationPhase === "published") return expectedRecord;
    const desiredRecord = buildPublishedIdempotencyRecord(expectedRecord, run);
    try {
      await writeJsonFileAtomically(
        paths,
        idempotencyAbsolutePath,
        desiredRecord,
        expectedRecord
      );
    } catch (error) {
      if (!(error instanceof PrivateAlphaStoreError) || error.status !== 409) {
        throw error;
      }
    }

    const verifiedRecord = await readIdempotencyRecordFromFile(
      paths,
      idempotencyAbsolutePath,
      expectedRecord.idempotencyKeyHash
    );
    if (!verifiedRecord || !("protocolVersion" in verifiedRecord)) {
      throw new PrivateAlphaStoreError(
        500,
        "Private-alpha publication finalization could not be reconciled."
      );
    }
    assertRunMatchesIdempotencyRecord(run, verifiedRecord);
    if (verifiedRecord.publicationPhase === "published") return verifiedRecord;
    expectedRecord = verifiedRecord;
  }

  throw new PrivateAlphaStoreError(
    409,
    "Private-alpha publication finalization remained concurrently owned."
  );
}

async function readRunForExactControl(
  paths: PrivateAlphaResolvedPaths,
  runId: string,
  expectedOwnership: PrivateAlphaCreatorRunOwnership | undefined,
  requirePublished = true
): Promise<PrivateAlphaRunRecord> {
  const run = await readRunRecordFromFile(
    paths,
    buildRunFileAbsolutePath(paths, runId),
    runId
  );
  const record = await readIdempotencyRecordFromFile(
    paths,
    buildIdempotencyFileAbsolutePath(paths, run.idempotencyKeyHash),
    run.idempotencyKeyHash
  );
  if (!record) {
    throw new PrivateAlphaStoreError(
      500,
      "Persisted private-alpha run is missing its idempotency ownership record."
    );
  }
  assertRunMatchesIdempotencyRecord(run, record);
  if (
    requirePublished &&
    "protocolVersion" in record &&
    record.publicationPhase !== "published"
  ) {
    throw new PrivateAlphaStoreError(
      500,
      "Private-alpha run publication is not finalized for mutation."
    );
  }
  if (!("protocolVersion" in record) && run.ownership !== null) {
    throw new PrivateAlphaStoreError(
      500,
      "Historical private-alpha idempotency state contradicts protocol ownership."
    );
  }
  assertRunControl(run, expectedOwnership);
  return run;
}

async function findRunsByIdempotencyKeyHash(
  paths: PrivateAlphaResolvedPaths,
  idempotencyKeyHash: string
): Promise<readonly PrivateAlphaRunRecord[]> {
  if (process.platform === "win32") {
    let names: readonly string[];
    try {
      names = withPrivateAlphaNativeRoot(paths.dataRootLabel, (root) =>
        root.listDirectory(["runs"])
      );
    } catch (error) {
      throwPrivateAlphaNativeStorageError(error);
    }
    const runNames = names.filter((name) => name.endsWith(".json"));
    if (runNames.length > PRIVATE_ALPHA_MAX_STORED_RUN_FILES) {
      throw new PrivateAlphaStoreError(
        500,
        "Private-alpha run inventory exceeds its bounded recovery envelope."
      );
    }
    const matches: PrivateAlphaRunRecord[] = [];
    for (const name of runNames) {
      const candidateRunId = name.slice(0, -".json".length);
      const validation = validatePrivateAlphaRunId(candidateRunId);
      if (!validation.ok) {
        throw new PrivateAlphaStoreError(
          500,
          "Private-alpha run storage contains a malformed recovery entry."
        );
      }
      try {
        const kind = withPrivateAlphaNativeRoot(paths.dataRootLabel, (root) =>
          root.stat(["runs", name])
        );
        if (kind !== "file") {
          throw new PrivateAlphaStoreError(
            500,
            "Private-alpha run storage contains an unsafe recovery entry."
          );
        }
      } catch (error) {
        if (error instanceof PrivateAlphaStoreError) throw error;
        throwPrivateAlphaNativeStorageError(error);
      }
      const candidate = await readRunRecordFromFile(
        paths,
        buildRunFileAbsolutePath(paths, validation.value),
        validation.value
      );
      if (candidate.idempotencyKeyHash === idempotencyKeyHash) matches.push(candidate);
    }
    return matches;
  }
  const directoryIdentity = await capturePinnedParentIdentity(
    paths,
    path.join(paths.runsDirectoryAbsolutePath, ".idempotency-recovery-boundary")
  );
  await revalidatePinnedParentIdentity(paths, directoryIdentity);
  const entries = await readBoundedDirectoryEntries(
    paths.runsDirectoryAbsolutePath,
    "Private-alpha run inventory exceeds its bounded recovery envelope."
  );
  await revalidatePinnedParentIdentity(paths, directoryIdentity);
  const runEntries = entries.filter((entry) => entry.name.endsWith(".json"));
  if (runEntries.length > PRIVATE_ALPHA_MAX_STORED_RUN_FILES) {
    throw new PrivateAlphaStoreError(
      500,
      "Private-alpha run inventory exceeds its bounded recovery envelope."
    );
  }
  const matches: PrivateAlphaRunRecord[] = [];
  for (const entry of runEntries) {
    if (entry.isSymbolicLink() || !entry.isFile()) {
      throw new PrivateAlphaStoreError(
        500,
        "Private-alpha run storage contains an unsafe recovery entry."
      );
    }
    const candidateRunId = entry.name.slice(0, -".json".length);
    const validation = validatePrivateAlphaRunId(candidateRunId);
    if (!validation.ok) {
      throw new PrivateAlphaStoreError(
        500,
        "Private-alpha run storage contains a malformed recovery entry."
      );
    }
    const candidate = await readRunRecordFromFile(
      paths,
      buildRunFileAbsolutePath(paths, validation.value),
      validation.value
    );
    if (candidate.idempotencyKeyHash === idempotencyKeyHash) matches.push(candidate);
  }
  await revalidatePinnedParentIdentity(paths, directoryIdentity);
  return matches;
}

function serializePrivateAlphaPersistedJson(value: unknown): Buffer {
  const persistedValue =
    isRecord(value) &&
    value.ownership === null &&
    typeof value.runId === "string" &&
    Array.isArray(value.auditEvents)
      ? Object.fromEntries(
          Object.entries(value).filter(([key]) => key !== "ownership")
        )
      : value;
  return Buffer.from(`${JSON.stringify(persistedValue, null, 2)}\n`, "utf8");
}

function exactPrivateAlphaPersistedBytes(value: unknown): Buffer {
  if (typeof value === "object" && value !== null) {
    const verified = PRIVATE_ALPHA_VERIFIED_PERSISTED_BYTES.get(value);
    if (verified) return Buffer.from(verified);
  }
  return serializePrivateAlphaPersistedJson(value);
}

function resolveNativeRunMutationFence(
  paths: PrivateAlphaResolvedPaths,
  fileAbsolutePath: string
): Readonly<{ segments: readonly string[]; bytes: Buffer }> | null {
  const context = RUN_LOCK_FENCE_CONTEXT.getStore();
  if (!context) return null;
  if (context.paths.dataRootAbsolutePath !== paths.dataRootAbsolutePath) {
    throw new PrivateAlphaStoreError(
      500,
      "Private-alpha mutation fence crossed a persistence boundary."
    );
  }
  if (fileAbsolutePath !== buildRunFileAbsolutePath(paths, context.runId)) {
    return null;
  }
  return {
    segments: privateAlphaNativeSegmentsForAbsolutePath(
      paths,
      buildRunLockFileAbsolutePath(paths, context.runId)
    ),
    bytes: exactPrivateAlphaPersistedBytes(context.owner),
  };
}

async function writeJsonFileAtomically(
  paths: PrivateAlphaResolvedPaths,
  fileAbsolutePath: string,
  value: unknown,
  expectedValue?: unknown
): Promise<void> {
  const contentBuffer = serializePrivateAlphaPersistedJson(value);
  const content = contentBuffer.toString("utf8");
  const contentBytes = contentBuffer.length;
  if (contentBytes <= 0 || contentBytes > PRIVATE_ALPHA_RUN_RECORD_MAX_BYTES) {
    throw new PrivateAlphaStoreError(
      500,
      "Private-alpha atomic write exceeds its bounded storage envelope."
    );
  }
  if (process.platform === "win32") {
    if (expectedValue === undefined) {
      throw new PrivateAlphaStoreError(
        500,
        "Private-alpha atomic replacement is missing its exact prior record."
      );
    }
    const mutationFence = resolveNativeRunMutationFence(paths, fileAbsolutePath);
    try {
      withPrivateAlphaNativeRoot(paths.dataRootLabel, (root) => {
        root.writeAtomicReplace(
          privateAlphaNativeSegmentsForAbsolutePath(paths, fileAbsolutePath),
          `.${path.basename(fileAbsolutePath)}.${randomBytes(12).toString("hex")}.tmp`,
          contentBuffer,
          exactPrivateAlphaPersistedBytes(expectedValue),
          mutationFence?.segments ?? null,
          mutationFence?.bytes ?? null
        );
      });
      if (typeof value === "object" && value !== null) {
        PRIVATE_ALPHA_VERIFIED_PERSISTED_BYTES.set(value, Buffer.from(contentBuffer));
      }
      return;
    } catch (error) {
      throwPrivateAlphaNativeStorageError(error);
    }
  }
  const parentIdentity = await capturePinnedParentIdentity(paths, fileAbsolutePath);
  await assertSafeExistingFile(paths, fileAbsolutePath);

  const tempAbsolutePath = path.join(
    path.dirname(fileAbsolutePath),
    `.${path.basename(fileAbsolutePath)}.${randomBytes(6).toString("hex")}.tmp`
  );
  await revalidatePinnedParentIdentity(paths, parentIdentity);
  const handle = await open(tempAbsolutePath, "wx", 0o600);
  let stagedIdentity: Readonly<{ dev: number; ino: number; size: number }>;
  try {
    await handle.writeFile(content, { encoding: "utf8" });
    await handle.sync();
    const stagedStat = await handle.stat();
    stagedIdentity = {
      dev: stagedStat.dev,
      ino: stagedStat.ino,
      size: stagedStat.size,
    };
  } finally {
    await handle.close().catch(() => undefined);
  }

  try {
    await assertCurrentRunLockFenceForMutation(paths, fileAbsolutePath);
    await revalidatePinnedParentIdentity(paths, parentIdentity);
    await rename(tempAbsolutePath, fileAbsolutePath);
    await assertCurrentRunLockFenceForMutation(paths, fileAbsolutePath);
    await revalidatePinnedParentIdentity(paths, parentIdentity);
    const published = await readVerifiedBoundedFile(
      paths,
      fileAbsolutePath,
      contentBytes,
      stagedIdentity
    );
    await revalidatePinnedParentIdentity(paths, parentIdentity);
    if (published === null || published !== content) {
      throw new PrivateAlphaStoreError(
        500,
        "Private-alpha atomic write verification failed."
      );
    }
  } catch (error) {
    await revalidatePinnedParentIdentity(paths, parentIdentity);
    await unlink(tempAbsolutePath).catch(() => undefined);
    throw error;
  }
}

async function publishJsonFileAtomicallyExclusive(
  paths: PrivateAlphaResolvedPaths,
  fileAbsolutePath: string,
  value: unknown
): Promise<boolean> {
  const contentBuffer = serializePrivateAlphaPersistedJson(value);
  const content = contentBuffer.toString("utf8");
  const contentBytes = contentBuffer.length;
  if (contentBytes <= 0 || contentBytes > PRIVATE_ALPHA_RUN_RECORD_MAX_BYTES) {
    throw new PrivateAlphaStoreError(
      500,
      "Private-alpha atomic publication exceeds its bounded storage envelope."
    );
  }
  if (process.platform === "win32") {
    const mutationFence = resolveNativeRunMutationFence(paths, fileAbsolutePath);
    try {
      withPrivateAlphaNativeRoot(paths.dataRootLabel, (root) => {
        root.writeAtomicExclusive(
          privateAlphaNativeSegmentsForAbsolutePath(paths, fileAbsolutePath),
          `.${path.basename(fileAbsolutePath)}.${randomBytes(12).toString("hex")}.tmp`,
          contentBuffer,
          mutationFence?.segments ?? null,
          mutationFence?.bytes ?? null
        );
      });
      if (typeof value === "object" && value !== null) {
        PRIVATE_ALPHA_VERIFIED_PERSISTED_BYTES.set(value, Buffer.from(contentBuffer));
      }
      return true;
    } catch (error) {
      if (isPrivateAlphaNativeError(error, "already_exists", "conflict")) return false;
      throwPrivateAlphaNativeStorageError(error);
    }
  }
  const parentIdentity = await capturePinnedParentIdentity(paths, fileAbsolutePath);
  const existing = await lstat(fileAbsolutePath).catch((error: unknown) => {
    if (isMissingError(error)) return null;
    throw error;
  });
  if (existing) {
    await assertSafeExistingFile(paths, fileAbsolutePath);
    return false;
  }

  const tempAbsolutePath = path.join(
    path.dirname(fileAbsolutePath),
    `.${path.basename(fileAbsolutePath)}.${randomBytes(12).toString("hex")}.tmp`
  );
  let handle;
  let stagedIdentity: Readonly<{ dev: number; ino: number; size: number }> | null = null;
  try {
    await revalidatePinnedParentIdentity(paths, parentIdentity);
    handle = await open(tempAbsolutePath, "wx", 0o600);
    await handle.writeFile(content, { encoding: "utf8" });
    await handle.sync();
    const stagedStat = await handle.stat();
    stagedIdentity = {
      dev: stagedStat.dev,
      ino: stagedStat.ino,
      size: stagedStat.size,
    };
    await handle.close();
    handle = undefined;

    try {
      await revalidatePinnedParentIdentity(paths, parentIdentity);
      await link(tempAbsolutePath, fileAbsolutePath);
    } catch (error) {
      if (isAlreadyExistsError(error)) return false;
      throw error;
    }
    await revalidatePinnedParentIdentity(paths, parentIdentity);
    if (!stagedIdentity) {
      throw new PrivateAlphaStoreError(
        500,
        "Private-alpha atomic publication staging identity is missing."
      );
    }
    const published = await readVerifiedBoundedFile(
      paths,
      fileAbsolutePath,
      contentBytes,
      stagedIdentity
    );
    await revalidatePinnedParentIdentity(paths, parentIdentity);
    if (published === null || published !== content) {
      throw new PrivateAlphaStoreError(500, "Private-alpha atomic publication verification failed.");
    }
    return true;
  } finally {
    await handle?.close().catch(() => undefined);
    await revalidatePinnedParentIdentity(paths, parentIdentity);
    const temporaryStat = await lstat(tempAbsolutePath).catch((error: unknown) => {
      if (isMissingError(error)) return null;
      throw error;
    });
    if (temporaryStat?.isFile() && !temporaryStat.isSymbolicLink()) {
      await revalidatePinnedParentIdentity(paths, parentIdentity);
      await unlink(tempAbsolutePath).catch(() => undefined);
    }
  }
}

function sameRunLockOwner(
  left: PrivateAlphaRunLockOwner,
  right: PrivateAlphaRunLockOwner
): boolean {
  return (
    left.nonce === right.nonce &&
    left.processSessionNonce === right.processSessionNonce &&
    left.processId === right.processId &&
    left.processIdentity === right.processIdentity &&
    left.createdAt === right.createdAt
  );
}

function decodeRunLockOwner(value: unknown): PrivateAlphaRunLockOwner {
  if (
    !isRecord(value) ||
    !hasExactKeys(value, [
      "createdAt",
      "nonce",
      "processId",
      "processIdentity",
      "processSessionNonce",
    ]) ||
    typeof value.nonce !== "string" ||
    !/^[a-f0-9]{32}$/.test(value.nonce) ||
    typeof value.processSessionNonce !== "string" ||
    !/^[a-f0-9]{32}$/.test(value.processSessionNonce) ||
    typeof value.processId !== "number" ||
    !isCanonicalRunLockProcessId(value.processId) ||
    typeof value.processIdentity !== "string" ||
    !isCanonicalRunLockProcessIdentity(value.processIdentity) ||
    typeof value.createdAt !== "string" ||
    !isIsoTimestamp(value.createdAt) ||
    new Date(value.createdAt).toISOString() !== value.createdAt
  ) {
    throw new PrivateAlphaStoreError(
      500,
      "Persisted private-alpha mutation lock is malformed."
    );
  }

  return {
    nonce: value.nonce,
    processSessionNonce: value.processSessionNonce,
    processId: value.processId,
    processIdentity: value.processIdentity,
    createdAt: value.createdAt,
  };
}

async function readRunLockOwner(
  paths: PrivateAlphaResolvedPaths,
  lockAbsolutePath: string
): Promise<PrivateAlphaRunLockOwner | null> {
  const raw = await readVerifiedBoundedFile(
    paths,
    lockAbsolutePath,
    PRIVATE_ALPHA_RUN_LOCK_MAX_BYTES
  );
  if (raw === null) return null;
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new PrivateAlphaStoreError(
      500,
      "Persisted private-alpha mutation lock is malformed."
    );
  }
  const owner = decodeRunLockOwner(parsed);
  PRIVATE_ALPHA_VERIFIED_PERSISTED_BYTES.set(owner, Buffer.from(raw, "utf8"));
  return owner;
}

async function assertRunLockFence(
  paths: PrivateAlphaResolvedPaths,
  runId: string,
  expectedOwner: PrivateAlphaRunLockOwner
): Promise<void> {
  const currentOwner = await readRunLockOwner(
    paths,
    buildRunLockFileAbsolutePath(paths, runId)
  );
  if (!currentOwner || !sameRunLockOwner(currentOwner, expectedOwner)) {
    throw new PrivateAlphaStoreError(
      409,
      "Private-alpha mutation ownership changed before publication."
    );
  }
}

async function assertCurrentRunLockFenceForMutation(
  paths: PrivateAlphaResolvedPaths,
  fileAbsolutePath: string
): Promise<void> {
  const context = RUN_LOCK_FENCE_CONTEXT.getStore();
  if (!context) return;
  if (context.paths.dataRootAbsolutePath !== paths.dataRootAbsolutePath) {
    throw new PrivateAlphaStoreError(
      500,
      "Private-alpha mutation fence crossed a persistence boundary."
    );
  }
  if (fileAbsolutePath !== buildRunFileAbsolutePath(paths, context.runId)) return;
  await assertRunLockFence(paths, context.runId, context.owner);
}

function runLockRecoveryKey(
  paths: PrivateAlphaResolvedPaths,
  runId: string
): string {
  return `${paths.dataRootLabel}:${runId}`;
}

async function acquireCrossProcessRunLock(
  paths: PrivateAlphaResolvedPaths,
  runId: string
): Promise<PrivateAlphaRunLockOwner> {
  const lockAbsolutePath = buildRunLockFileAbsolutePath(paths, runId);
  const parentIdentity = process.platform === "win32"
    ? null
    : await capturePinnedParentIdentity(paths, lockAbsolutePath);
  const recoveryKey = runLockRecoveryKey(paths, runId);
  const processIdentity = await readExactProcessIdentity(process.pid);
  if (!processIdentity) {
    throw new PrivateAlphaStoreError(
      500,
      "The current private-alpha mutation owner is not live."
    );
  }
  const owner: PrivateAlphaRunLockOwner = {
    nonce: randomBytes(16).toString("hex"),
    processSessionNonce: PRIVATE_ALPHA_PROCESS_SESSION_NONCE,
    processId: process.pid,
    processIdentity,
    createdAt: nowIso(),
  };

  for (let attempt = 0; attempt < 2; attempt += 1) {
    if (
      await publishJsonFileAtomicallyExclusive(paths, lockAbsolutePath, owner)
    ) {
      RECOVERABLE_RUN_LOCK_NONCES.delete(recoveryKey);
      return owner;
    }

    const existingOwner = await readRunLockOwner(paths, lockAbsolutePath);
    if (!existingOwner) continue;
    if (attempt > 0) {
      throw new PrivateAlphaStoreError(
        409,
        "This private-alpha run is already being mutated."
      );
    }

    const locallyRecoverable =
      RECOVERABLE_RUN_LOCK_NONCES.get(recoveryKey) === existingOwner.nonce &&
      existingOwner.processSessionNonce === PRIVATE_ALPHA_PROCESS_SESSION_NONCE &&
      existingOwner.processId === process.pid &&
      existingOwner.processIdentity === processIdentity;
    const observedIdentity = await readExactProcessIdentity(existingOwner.processId);
    const liveOwner =
      observedIdentity !== null && observedIdentity === existingOwner.processIdentity;
    if (!locallyRecoverable && liveOwner) {
      throw new PrivateAlphaStoreError(
        409,
        "This private-alpha run is already being mutated."
      );
    }

    if (process.platform === "win32") {
      try {
        withPrivateAlphaNativeRoot(paths.dataRootLabel, (root) => {
          root.compareDeleteExact(
            privateAlphaNativeSegmentsForAbsolutePath(paths, lockAbsolutePath),
            exactPrivateAlphaPersistedBytes(existingOwner)
          );
        });
        RECOVERABLE_RUN_LOCK_NONCES.delete(recoveryKey);
        continue;
      } catch (error) {
        if (isPrivateAlphaNativeError(error, "not_found")) continue;
        if (
          isPrivateAlphaNativeError(
            error,
            "compare_mismatch",
            "fence_mismatch",
            "conflict"
          )
        ) {
          throw new PrivateAlphaStoreError(
            409,
            "This private-alpha run is already being mutated."
          );
        }
        throwPrivateAlphaNativeStorageError(error);
      }
    }

    if (!parentIdentity) {
      throw new PrivateAlphaStoreError(
        500,
        "Private-alpha mutation lock parent identity is unavailable."
      );
    }

    const displacedAbsolutePath = path.join(
      paths.locksDirectoryAbsolutePath,
      `${runId}.stale-${PRIVATE_ALPHA_PROCESS_SESSION_NONCE}-${randomBytes(8).toString("hex")}.json`
    );
    try {
      await revalidatePinnedParentIdentity(paths, parentIdentity);
      await rename(lockAbsolutePath, displacedAbsolutePath);
    } catch (error) {
      if (isMissingError(error)) continue;
      throw error;
    }
    const displacedOwner = await readRunLockOwner(paths, displacedAbsolutePath);
    if (!displacedOwner || !sameRunLockOwner(displacedOwner, existingOwner)) {
      throw new PrivateAlphaStoreError(
        500,
        "Private-alpha stale mutation lock ownership could not be verified."
      );
    }
    await revalidatePinnedParentIdentity(paths, parentIdentity);
    await unlink(displacedAbsolutePath);
    RECOVERABLE_RUN_LOCK_NONCES.delete(recoveryKey);
  }

  throw new PrivateAlphaStoreError(
    409,
    "This private-alpha run is already being mutated."
  );
}

async function releaseCrossProcessRunLock(
  paths: PrivateAlphaResolvedPaths,
  runId: string,
  owner: PrivateAlphaRunLockOwner
): Promise<void> {
  const lockAbsolutePath = buildRunLockFileAbsolutePath(paths, runId);
  const recoveryKey = runLockRecoveryKey(paths, runId);
  if (process.platform === "win32") {
    try {
      withPrivateAlphaNativeRoot(paths.dataRootLabel, (root) => {
        root.compareDeleteExact(
          privateAlphaNativeSegmentsForAbsolutePath(paths, lockAbsolutePath),
          exactPrivateAlphaPersistedBytes(owner)
        );
      });
      RECOVERABLE_RUN_LOCK_NONCES.delete(recoveryKey);
      return;
    } catch (error) {
      RECOVERABLE_RUN_LOCK_NONCES.set(recoveryKey, owner.nonce);
      if (
        isPrivateAlphaNativeError(
          error,
          "not_found",
          "compare_mismatch",
          "fence_mismatch",
          "conflict"
        )
      ) {
        throw new PrivateAlphaStoreError(
          500,
          "Private-alpha mutation lock ownership changed unexpectedly."
        );
      }
      throwPrivateAlphaNativeStorageError(error);
    }
  }
  const parentIdentity = await capturePinnedParentIdentity(
    paths,
    lockAbsolutePath
  );
  const releasedAbsolutePath = path.join(
    paths.locksDirectoryAbsolutePath,
    `${runId}.released-${owner.nonce}.json`
  );
  let canonicalMoved = false;
  try {
    const currentOwner = await readRunLockOwner(paths, lockAbsolutePath);
    if (!currentOwner || !sameRunLockOwner(currentOwner, owner)) {
      throw new PrivateAlphaStoreError(
        500,
        "Private-alpha mutation lock ownership changed unexpectedly."
      );
    }
    await revalidatePinnedParentIdentity(paths, parentIdentity);
    await rename(lockAbsolutePath, releasedAbsolutePath);
    canonicalMoved = true;
    const releasedOwner = await readRunLockOwner(paths, releasedAbsolutePath);
    if (!releasedOwner || !sameRunLockOwner(releasedOwner, owner)) {
      throw new PrivateAlphaStoreError(
        500,
        "Private-alpha released mutation lock ownership could not be verified."
      );
    }
    await revalidatePinnedParentIdentity(paths, parentIdentity);
    await unlink(releasedAbsolutePath);
    RECOVERABLE_RUN_LOCK_NONCES.delete(recoveryKey);
  } catch (error) {
    if (!canonicalMoved) {
      RECOVERABLE_RUN_LOCK_NONCES.set(recoveryKey, owner.nonce);
    } else {
      RECOVERABLE_RUN_LOCK_NONCES.delete(recoveryKey);
    }
    throw error;
  }
}

async function withCrossProcessRunLock<T>(
  paths: PrivateAlphaResolvedPaths,
  runId: string,
  work: () => Promise<T>
): Promise<T> {
  const owner = await acquireCrossProcessRunLock(paths, runId);
  try {
    return await RUN_LOCK_FENCE_CONTEXT.run(
      { paths, runId, owner },
      async (): Promise<T> => {
        await assertRunLockFence(paths, runId, owner);
        const result = await work();
        await assertRunLockFence(paths, runId, owner);
        return result;
      }
    );
  } finally {
    await releaseCrossProcessRunLock(paths, runId, owner);
  }
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

  const queued = previous.then(() => current);
  queueMap.set(key, queued);

  await previous;

  try {
    return await work();
  } finally {
    release?.();
    if (queueMap.get(key) === queued) {
      queueMap.delete(key);
    }
  }
}

async function withRunMutationLock<T>(
  paths: PrivateAlphaResolvedPaths,
  runId: string,
  work: () => Promise<T>
): Promise<T> {
  assertSecurePrivateAlphaMutationPlatform();
  return withQueue(RUN_WRITE_QUEUES, runLockRecoveryKey(paths, runId), () =>
    withPrivateAlphaNativeStorageLease(paths, () =>
      withCrossProcessRunLock(paths, runId, work)
    )
  );
}

async function withCreatorBindingMutationLock<T>(
  paths: PrivateAlphaResolvedPaths,
  projectId: string,
  purpose: "generation" | "repair",
  work: () => Promise<T>
): Promise<T> {
  const bindingKey = `${paths.dataRootLabel}:${projectId}:${purpose}`;
  const activeBindingKey = CREATOR_BINDING_LOCK_CONTEXT.getStore();
  if (activeBindingKey !== undefined) {
    if (activeBindingKey !== bindingKey) {
      throw new PrivateAlphaStoreError(
        500,
        "Creator binding mutation crossed an active project or purpose boundary."
      );
    }
    return work();
  }
  return withRunMutationLock(
    paths,
    buildCreatorBindingMutationLockRunId(projectId, purpose),
    () => CREATOR_BINDING_LOCK_CONTEXT.run(bindingKey, work)
  );
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
  const approvalRequestedSummary = isPrivateAlphaLocalExecutionConfiguration(
    run.request
  )
    ? "Manual approval scope recorded locally. Execution requires a separate operator action."
    : isPrivateAlphaCloudApprovalOnlyConfiguration(run.request)
      ? "Manual approval scope recorded locally. No prompt was sent to Groq, the exact model remains fixed, and only a later explicit execute action can send the approved request."
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
  errorCode: PrivateAlphaPersistedExecutionErrorCode,
  safeErrorMessage: string
): PrivateAlphaFailureResponse {
  if (errorCode === "kill_switch_blocked") {
    return {
      errorCode,
      safeErrorMessage,
      responseStatus: 409,
    };
  }

  if (errorCode === "ollama_timeout" || errorCode === "groq_timeout") {
    return {
      errorCode,
      safeErrorMessage,
      responseStatus: 504,
    };
  }

  if (
    errorCode === "execution_interrupted" ||
    errorCode === "ollama_unavailable" ||
    errorCode === "ollama_model_missing" ||
    errorCode === "ollama_empty_response" ||
    errorCode === "groq_credential_missing" ||
    errorCode === "groq_authentication_failed" ||
    errorCode === "groq_rate_limited" ||
    errorCode === "groq_quota_exhausted" ||
    errorCode === "groq_unavailable" ||
    errorCode === "groq_model_unavailable" ||
    errorCode === "groq_empty_response"
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

function resolvePersistedFailedExecutionResponseStatus(
  errorCode:
    | PrivateAlphaLocalPersistedExecutionErrorCode
    | PrivateAlphaGroqPersistedExecutionErrorCode,
  safeErrorMessage: string
): 200 | 500 | 503 | 504 {
  if (errorCode === "ollama_http_error") {
    return safeErrorMessage === "Local Ollama execution failed unexpectedly."
      ? 500
      : 200;
  }
  if (errorCode === "groq_http_error") {
    return safeErrorMessage === "Groq Cloud execution failed unexpectedly."
      ? 500
      : 200;
  }
  const inferred = buildExecutionFailureResponse(
    errorCode,
    safeErrorMessage
  ).responseStatus;
  return inferred === 409 ? 500 : inferred;
}

function resolveAvailabilityBlockedResponseStatus(
  errorCode:
    | PrivateAlphaLocalPersistedExecutionErrorCode
    | PrivateAlphaGroqPersistedExecutionErrorCode
): 409 | 503 | 504 {
  if (errorCode === "kill_switch_blocked") {
    return 409;
  }

  if (errorCode === "ollama_timeout" || errorCode === "groq_timeout") {
    return 504;
  }

  return 503;
}

function resolveBlockedExecutionSafeMessage(
  target: PrivateAlphaExecutionTarget,
  availability: Readonly<{
    providerAvailable: boolean;
    modelAvailable: boolean;
    errorCode: unknown;
    safeErrorMessage: string | null;
  }>
): string {
  const errorCodeIsProviderOwned =
    availability.errorCode === null ||
    (target.kind === "local"
      ? isLocalProviderAvailabilityErrorCode(availability.errorCode)
      : isGroqProviderAvailabilityErrorCode(availability.errorCode));
  if (errorCodeIsProviderOwned && availability.safeErrorMessage) {
    return availability.safeErrorMessage;
  }

  if (target.kind === "local") {
    return availability.providerAvailable
      ? "The required local Ollama model is not installed."
      : "Local Ollama is unavailable on the fixed loopback endpoint.";
  }

  return availability.providerAvailable
    ? "The exact approved Groq model is unavailable for execution."
    : "Groq Cloud is unavailable for the approved execution scope.";
}

function resolveBlockedExecutionErrorCode(
  target: PrivateAlphaExecutionTarget,
  availability: Readonly<{
    providerAvailable: boolean;
    modelAvailable: boolean;
    errorCode: PrivateAlphaProviderErrorCode | null;
  }>
): PrivateAlphaLocalPersistedExecutionErrorCode | PrivateAlphaGroqPersistedExecutionErrorCode {
  if (target.kind === "local") {
    if (
      availability.errorCode !== null &&
      isLocalProviderAvailabilityErrorCode(availability.errorCode)
    ) {
      return availability.errorCode;
    }

    return availability.providerAvailable
      ? "ollama_model_missing"
      : "ollama_unavailable";
  }

  if (
    availability.errorCode !== null &&
    isGroqProviderAvailabilityErrorCode(availability.errorCode)
  ) {
    return availability.errorCode;
  }

  return availability.providerAvailable
    ? "groq_model_unavailable"
    : "groq_unavailable";
}

function resolveUnexpectedExecutionFailure(
  target: PrivateAlphaExecutionTarget
): Readonly<{
  errorCode:
    | Exclude<PrivateAlphaLocalPersistedExecutionErrorCode, "kill_switch_blocked">
    | Exclude<PrivateAlphaGroqPersistedExecutionErrorCode, "kill_switch_blocked">;
  safeErrorMessage: string;
}> {
  return target.kind === "local"
    ? {
        errorCode: "ollama_http_error",
        safeErrorMessage: "Local Ollama execution failed unexpectedly.",
      }
    : {
        errorCode: "groq_http_error",
        safeErrorMessage: "Groq Cloud execution failed unexpectedly.",
      };
}

function buildExecutionStartedSummary(target: PrivateAlphaExecutionTarget): string {
  return target.kind === "local"
    ? "Local Ollama execution started."
    : `Groq Cloud execution started for ${target.model}.`;
}

function buildExecutionBlockedSummary(
  target: PrivateAlphaExecutionTarget,
  reason: "kill-switch" | "availability"
): string {
  if (target.kind === "local") {
    return reason === "kill-switch"
      ? "Local Ollama execution blocked by the kill switch."
      : "Local Ollama execution blocked before provider generation.";
  }

  return reason === "kill-switch"
    ? `Groq Cloud execution blocked by the kill switch for ${target.model}.`
    : `Groq Cloud execution blocked before provider generation for ${target.model}.`;
}

function buildExecutionSucceededSummary(target: PrivateAlphaExecutionTarget): string {
  return target.kind === "local"
    ? "Local Ollama execution succeeded and output was persisted."
    : `Groq Cloud execution succeeded for ${target.model} and output was persisted locally.`;
}

function buildExecutionFailedSummary(
  target: PrivateAlphaExecutionTarget,
  errorCode: PrivateAlphaPersistedExecutionErrorCode
): string {
  return target.kind === "local"
    ? `Local Ollama execution failed with ${errorCode}.`
    : `Groq Cloud execution failed for ${target.model} with ${errorCode}.`;
}

function verifyResolvedProviderAdapterIdentity(
  target: PrivateAlphaExecutionTarget,
  adapter: PrivateAlphaProviderAdapter,
  maximumOutputTokens: number
): void {
  if (
    adapter.identity.providerId !== target.provider ||
    adapter.identity.modelId !== target.model ||
    adapter.identity.dataBoundary !== target.dataBoundary ||
    adapter.identity.approvedMaximumOutputTokens < maximumOutputTokens ||
    (isCloudExecutionTarget(target) &&
      adapter.identity.modelKey !== target.modelKey)
  ) {
    throw new PrivateAlphaStoreError(
      409,
      "Resolved provider adapter does not match the approved execution scope."
    );
  }
}

function buildExecutingExecutionRecord(input: {
  run: PrivateAlphaRunRecord;
  idempotencyKeyHash: string;
  startedAt: string;
  target: PrivateAlphaExecutionTarget;
}): PrivateAlphaExecutionRecord {
  const runningRevision = input.run.revision + 1;
  const commonFields = {
    executionId: randomUUID(),
    status: "executing",
    idempotencyKeyHash: input.idempotencyKeyHash,
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
    safeErrorMessage: null,
    responseStatus: null,
  } as const;

  if (input.target.kind === "local") {
    const record: PrivateAlphaLocalExecutionRecord = {
      ...commonFields,
      provider: PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID,
      model: PRIVATE_ALPHA_PRODUCTION_MODEL,
      errorCode: null,
    };

    return record;
  }

  if (input.target.kind === "groq-20b") {
    const record: PrivateAlphaGroq20bExecutionRecord = {
      ...commonFields,
      provider: "groq-cloud",
      model: "openai/gpt-oss-20b",
      bindingVersion: PRIVATE_ALPHA_APPROVAL_BINDING_VERSION,
      modelKey: PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
      dataBoundary: "cloud-provider",
      cloudExecutionAcknowledgement:
        "granted-for-approved-scope-execution",
      groqFreeTierExecutionConfirmation:
        PRIVATE_ALPHA_GROQ_FREE_TIER_EXECUTION_CONFIRMATION_LITERAL,
      errorCode: null,
    };

    return record;
  }

  const record: PrivateAlphaGroq120bExecutionRecord = {
    ...commonFields,
    provider: "groq-cloud",
    model: "openai/gpt-oss-120b",
    bindingVersion: PRIVATE_ALPHA_APPROVAL_BINDING_VERSION,
    modelKey: PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY,
    dataBoundary: "cloud-provider",
    cloudExecutionAcknowledgement:
      "granted-for-approved-scope-execution",
    groqFreeTierExecutionConfirmation:
      PRIVATE_ALPHA_GROQ_FREE_TIER_EXECUTION_CONFIRMATION_LITERAL,
    errorCode: null,
  };

  return record;
}

function buildBlockedExecutionRecord(
  input: Readonly<{
    run: PrivateAlphaRunRecord;
    target: PrivateAlphaExecutionTarget;
    idempotencyKeyHash: string;
    blockedAt: string;
    previousRevision: number;
    runningRevision: number | null;
    resultingRevision: number;
    errorCode:
      | PrivateAlphaLocalPersistedExecutionErrorCode
      | PrivateAlphaGroqPersistedExecutionErrorCode;
    safeErrorMessage: string;
    responseStatus: 409 | 503 | 504;
  }>
): PrivateAlphaExecutionRecord {
  const commonFields = {
    executionId: input.run.execution?.executionId ?? randomUUID(),
    status: "blocked" as const,
    idempotencyKeyHash: input.idempotencyKeyHash,
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
    safeErrorMessage: input.safeErrorMessage,
    responseStatus: input.responseStatus,
  } as const;

  if (input.target.kind === "local") {
    if (!isLocalPersistedExecutionErrorCode(input.errorCode)) {
      throw new PrivateAlphaStoreError(500, "Execution record error code was invalid.");
    }

    const record: PrivateAlphaLocalExecutionRecord = {
      ...commonFields,
      provider: PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID,
      model: PRIVATE_ALPHA_PRODUCTION_MODEL,
      errorCode: input.errorCode,
    };

    return record;
  }

  if (input.target.kind === "groq-20b") {
    if (!isGroqPersistedExecutionErrorCode(input.errorCode)) {
      throw new PrivateAlphaStoreError(500, "Execution record error code was invalid.");
    }

    const record: PrivateAlphaGroq20bExecutionRecord = {
      ...commonFields,
      provider: "groq-cloud",
      model: "openai/gpt-oss-20b",
      bindingVersion: PRIVATE_ALPHA_APPROVAL_BINDING_VERSION,
      modelKey: PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
      dataBoundary: "cloud-provider",
      cloudExecutionAcknowledgement:
        "granted-for-approved-scope-execution",
      groqFreeTierExecutionConfirmation:
        PRIVATE_ALPHA_GROQ_FREE_TIER_EXECUTION_CONFIRMATION_LITERAL,
      errorCode: input.errorCode,
    };

    return record;
  }

  if (!isGroqPersistedExecutionErrorCode(input.errorCode)) {
    throw new PrivateAlphaStoreError(500, "Execution record error code was invalid.");
  }

  const record: PrivateAlphaGroq120bExecutionRecord = {
    ...commonFields,
    provider: "groq-cloud",
    model: "openai/gpt-oss-120b",
    bindingVersion: PRIVATE_ALPHA_APPROVAL_BINDING_VERSION,
    modelKey: PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY,
    dataBoundary: "cloud-provider",
    cloudExecutionAcknowledgement:
      "granted-for-approved-scope-execution",
    groqFreeTierExecutionConfirmation:
      PRIVATE_ALPHA_GROQ_FREE_TIER_EXECUTION_CONFIRMATION_LITERAL,
    errorCode: input.errorCode,
  };

  return record;
}

function buildFailedExecutionRecord(
  input: Readonly<{
    run: PrivateAlphaRunRecord;
    target: PrivateAlphaExecutionTarget;
    failedAt: string;
    resultingRevision: number;
    errorCode:
      | Exclude<PrivateAlphaLocalPersistedExecutionErrorCode, "kill_switch_blocked">
      | Exclude<PrivateAlphaGroqPersistedExecutionErrorCode, "kill_switch_blocked">;
    safeErrorMessage: string;
    responseStatus: 200 | 409 | 500 | 503 | 504;
  }>
): PrivateAlphaExecutionRecord {
  if (!input.run.execution || input.run.execution.runningRevision === null) {
    throw new PrivateAlphaStoreError(500, "Execution record was missing.");
  }

  const failedFields = {
    executionId: input.run.execution.executionId,
    idempotencyKeyHash: input.run.execution.idempotencyKeyHash,
    approvalScopeHash: input.run.execution.approvalScopeHash,
    startedAt: input.run.execution.startedAt,
    completedAt: input.failedAt,
    previousRevision: input.run.execution.previousRevision,
    runningRevision: input.run.execution.runningRevision,
    resultingRevision: input.resultingRevision,
    outputText: null,
    outputSha256: null,
    doneReason: null,
    totalDurationNanoseconds: null,
    loadDurationNanoseconds: null,
    promptEvalCount: null,
    evalCount: null,
    safeErrorMessage: input.safeErrorMessage,
    responseStatus: input.responseStatus,
  } as const;

  if (input.target.kind === "local") {
    if (input.run.execution.provider !== PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID) {
      throw new PrivateAlphaStoreError(500, "Execution record target was invalid.");
    }

    if (!isLocalPersistedExecutionErrorCode(input.errorCode)) {
      throw new PrivateAlphaStoreError(500, "Execution record error code was invalid.");
    }

    const record: PrivateAlphaLocalExecutionRecord = {
      ...failedFields,
      status: "failed",
      provider: PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID,
      model: PRIVATE_ALPHA_PRODUCTION_MODEL,
      errorCode: input.errorCode,
    };

    return record;
  }

  if (
    input.run.execution.provider !== "groq-cloud" ||
    input.run.execution.model !== input.target.model
  ) {
    throw new PrivateAlphaStoreError(500, "Execution record target was invalid.");
  }

  if (input.target.kind === "groq-20b") {
    if (!isGroqPersistedExecutionErrorCode(input.errorCode)) {
      throw new PrivateAlphaStoreError(500, "Execution record error code was invalid.");
    }

    const record: PrivateAlphaGroq20bExecutionRecord = {
      ...failedFields,
      status: "failed",
      provider: "groq-cloud",
      model: "openai/gpt-oss-20b",
      bindingVersion: PRIVATE_ALPHA_APPROVAL_BINDING_VERSION,
      modelKey: PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
      dataBoundary: "cloud-provider",
      cloudExecutionAcknowledgement:
        "granted-for-approved-scope-execution",
      groqFreeTierExecutionConfirmation:
        PRIVATE_ALPHA_GROQ_FREE_TIER_EXECUTION_CONFIRMATION_LITERAL,
      errorCode: input.errorCode,
    };

    return record;
  }

  if (!isGroqPersistedExecutionErrorCode(input.errorCode)) {
    throw new PrivateAlphaStoreError(500, "Execution record error code was invalid.");
  }

  const record: PrivateAlphaGroq120bExecutionRecord = {
    ...failedFields,
    status: "failed",
    provider: "groq-cloud",
    model: "openai/gpt-oss-120b",
    bindingVersion: PRIVATE_ALPHA_APPROVAL_BINDING_VERSION,
    modelKey: PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY,
    dataBoundary: "cloud-provider",
    cloudExecutionAcknowledgement:
      "granted-for-approved-scope-execution",
    groqFreeTierExecutionConfirmation:
      PRIVATE_ALPHA_GROQ_FREE_TIER_EXECUTION_CONFIRMATION_LITERAL,
    errorCode: input.errorCode,
  };

  return record;
}

async function persistInterruptedExecutionFailureWhileLocked(
  paths: PrivateAlphaResolvedPaths,
  runAbsolutePath: string,
  current: PrivateAlphaRunRecord
): Promise<PrivateAlphaRunRecord> {
  if (
    current.state !== "executing" ||
    !current.execution ||
    current.execution.status !== "executing" ||
    current.execution.responseStatus !== null
  ) {
    throw new PrivateAlphaStoreError(
      500,
      "Interrupted private-alpha execution is missing its exact in-progress evidence."
    );
  }
  const transition = assertPrivateAlphaTransition(current.state, "fail");
  if (!transition.ok) {
    throw new PrivateAlphaStoreError(409, transition.message);
  }
  const target = resolveExecutionTargetFromRequestAndApprovalScope(
    current.request,
    current.approvalScope
  );
  if (!target) {
    throw new PrivateAlphaStoreError(
      500,
      "Interrupted private-alpha execution target could not be reconciled."
    );
  }
  const failedAt = nextPersistedIsoTimestamp(current.updatedAt);
  const resultingRevision = current.revision + 1;
  const creatorOwned = current.ownership?.kind === "creator";
  const safeErrorMessage = creatorOwned
    ? "The creator-owned provider request ended without a durable terminal result after its execution owner exited."
    : "The provider request ended without a durable terminal result after its execution owner exited.";
  const failedRun: PrivateAlphaRunRecord = {
    ...current,
    updatedAt: failedAt,
    state: "failed",
    revision: resultingRevision,
    execution: buildFailedExecutionRecord({
      run: current,
      target,
      failedAt,
      resultingRevision,
      errorCode: "execution_interrupted",
      safeErrorMessage,
      responseStatus: 503,
    }),
    auditEvents: [
      ...current.auditEvents,
      buildAuditEvent({
        eventType: "execution.failed",
        actor: "system",
        runId: current.runId,
        previousState: "executing",
        resultingState: "failed",
        revision: resultingRevision,
        summary: creatorOwned
          ? "Creator-owned execution was marked failed after exact lock ownership proved its execution owner had exited."
          : "Execution was marked failed after exact lock ownership proved its execution owner had exited.",
        occurredAt: failedAt,
      }),
    ],
  };
  await writeJsonFileAtomically(paths, runAbsolutePath, failedRun, current);
  const verified = await readRunRecordFromFile(
    paths,
    runAbsolutePath,
    current.runId
  );
  if (
    verified.state !== "failed" ||
    verified.revision !== resultingRevision ||
    verified.execution?.errorCode !== "execution_interrupted" ||
    verified.execution.responseStatus !== 503
  ) {
    throw new PrivateAlphaStoreError(
      500,
      "Interrupted private-alpha execution reconciliation could not be verified."
    );
  }
  return verified;
}

function buildSucceededExecutionRecord(input: {
  run: PrivateAlphaRunRecord;
  target: PrivateAlphaExecutionTarget;
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

  const completedFields = {
    executionId: input.run.execution.executionId,
    idempotencyKeyHash: input.run.execution.idempotencyKeyHash,
    approvalScopeHash: input.run.execution.approvalScopeHash,
    startedAt: input.run.execution.startedAt,
    completedAt: input.completedAt,
    previousRevision: input.run.execution.previousRevision,
    runningRevision: input.run.execution.runningRevision,
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
    responseStatus: 200,
  } as const;

  if (input.target.kind === "local") {
    if (input.run.execution.provider !== PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID) {
      throw new PrivateAlphaStoreError(500, "Execution record target was invalid.");
    }

    const record: PrivateAlphaLocalExecutionRecord = {
      ...completedFields,
      status: "succeeded",
      provider: PRIVATE_ALPHA_PRODUCTION_PROVIDER_ID,
      model: PRIVATE_ALPHA_PRODUCTION_MODEL,
    };

    return record;
  }

  if (
    input.run.execution.provider !== "groq-cloud" ||
    input.run.execution.model !== input.target.model
  ) {
    throw new PrivateAlphaStoreError(500, "Execution record target was invalid.");
  }

  if (input.target.kind === "groq-20b") {
    const record: PrivateAlphaGroq20bExecutionRecord = {
      ...completedFields,
      status: "succeeded",
      provider: "groq-cloud",
      model: "openai/gpt-oss-20b",
      bindingVersion: PRIVATE_ALPHA_APPROVAL_BINDING_VERSION,
      modelKey: PRIVATE_ALPHA_GROQ_20B_RUNTIME_MODEL_KEY,
      dataBoundary: "cloud-provider",
      cloudExecutionAcknowledgement:
        "granted-for-approved-scope-execution",
      groqFreeTierExecutionConfirmation:
        PRIVATE_ALPHA_GROQ_FREE_TIER_EXECUTION_CONFIRMATION_LITERAL,
    };

    return record;
  }

  const record: PrivateAlphaGroq120bExecutionRecord = {
    ...completedFields,
    status: "succeeded",
    provider: "groq-cloud",
    model: "openai/gpt-oss-120b",
    bindingVersion: PRIVATE_ALPHA_APPROVAL_BINDING_VERSION,
    modelKey: PRIVATE_ALPHA_GROQ_120B_RUNTIME_MODEL_KEY,
    dataBoundary: "cloud-provider",
    cloudExecutionAcknowledgement:
      "granted-for-approved-scope-execution",
    groqFreeTierExecutionConfirmation:
      PRIVATE_ALPHA_GROQ_FREE_TIER_EXECUTION_CONFIRMATION_LITERAL,
  };

  return record;
}

async function readSafeKillSwitchState(
  paths: PrivateAlphaResolvedPaths
): Promise<Awaited<ReturnType<typeof readPrivateAlphaKillSwitchState>>> {
  let dataRootPresent: boolean;
  try {
    dataRootPresent = await inspectDataRootForRead(paths);
  } catch {
    return { killSwitchEngaged: true, killSwitchSources: ["file"] };
  }
  const state = await readPrivateAlphaKillSwitchState({
    dataRootLabel: paths.dataRootLabel,
  });
  if (dataRootPresent) {
    try {
      if (!(await inspectDataRootForRead(paths))) {
        return { killSwitchEngaged: true, killSwitchSources: ["file"] };
      }
    } catch {
      return { killSwitchEngaged: true, killSwitchSources: ["file"] };
    }
  }
  return state;
}

function securePrivateAlphaMutationIsAvailable(
  paths: PrivateAlphaResolvedPaths
): boolean {
  if (process.platform !== "win32") return false;
  try {
    privateAlphaNativeRootExists(paths.dataRootLabel);
    return true;
  } catch {
    return false;
  }
}

function resolveExecutableTargetOrThrow(
  run: PrivateAlphaRunRecord
): PrivateAlphaExecutionTarget {
  const target = resolveExecutionTargetFromRequestAndApprovalScope(
    run.request,
    run.approvalScope
  );

  if (target === null) {
    const isLegacyRun =
      isPrivateAlphaLegacyRunConfiguration(run.request) &&
      isPrivateAlphaLegacyRunConfiguration(run.approvalScope);

    throw new PrivateAlphaStoreError(
      409,
      isLegacyRun
        ? "Legacy private-alpha runs remain readable but are not executable in this slice."
        : "Run approval scope is not executable in this slice."
    );
  }

  return target;
}

function validateExecutionAcknowledgementOrThrow(
  run: PrivateAlphaRunRecord,
  target: PrivateAlphaExecutionTarget,
  executeInput: PrivateAlphaExecuteInput
): void {
  if (target.kind === "local") {
    if (executeInput.cloudExecutionAcknowledgement !== undefined) {
      throw new PrivateAlphaStoreError(
        409,
        "Cloud execution acknowledgement is not allowed for local execution."
      );
    }

    if (executeInput.groqFreeTierExecutionConfirmation !== undefined) {
      throw new PrivateAlphaStoreError(
        409,
        "Groq Free-tier execution confirmation is not allowed for local execution."
      );
    }

    return;
  }

  if (executeInput.cloudExecutionAcknowledgement !== true) {
    throw new PrivateAlphaStoreError(
      409,
      "Cloud execution acknowledgement is required for this exact approved scope."
    );
  }

  if (executeInput.groqFreeTierExecutionConfirmation !== true) {
    throw new PrivateAlphaStoreError(
      409,
      "Groq Free-tier execution confirmation is required for this exact approved scope."
    );
  }

  if (
    !isBoundApprovalRecord(run.approval) ||
    run.approval.bindingVersion !== PRIVATE_ALPHA_APPROVAL_BINDING_VERSION
  ) {
    throw new PrivateAlphaStoreError(
      409,
      "Cloud transfer consent is not recorded for this exact approved scope."
    );
  }

  if (
    run.approval.cloudDataTransferAcknowledgement !==
      "granted-for-approved-scope" ||
    run.approval.approvalScopeHash !== run.approvalScopeHash
  ) {
    throw new PrivateAlphaStoreError(
      409,
      "Cloud transfer consent is not recorded for this exact approved scope."
    );
  }

  if (
    !("bindingVersion" in run.request) ||
    !("bindingVersion" in run.approvalScope) ||
    run.request.bindingVersion !== PRIVATE_ALPHA_APPROVAL_BINDING_VERSION ||
    run.approvalScope.bindingVersion !== PRIVATE_ALPHA_APPROVAL_BINDING_VERSION ||
    run.request.modelKey !== run.approvalScope.modelKey ||
    run.request.modelKey !== target.modelKey
  ) {
    throw new PrivateAlphaStoreError(
      409,
      "Run approval scope is not executable in this slice."
    );
  }
}

function isHistoricalGroqExecutionOverEnvelope(
  target: PrivateAlphaExecutionTarget,
  maximumOutputTokens: number
): boolean {
  return (
    isCloudExecutionTarget(target) &&
    maximumOutputTokens > PRIVATE_ALPHA_GROQ_MAX_OUTPUT_TOKENS
  );
}

function resolveProviderAdapterForExecutionTarget(
  target: PrivateAlphaExecutionTarget,
  options: PrivateAlphaStoreOptions,
  getLocalStatusAdapter: () => PrivateAlphaProviderAdapter
): PrivateAlphaProviderAdapter {
  const modelKey = resolveExecutionTargetModelKey(target);

  if (options.providerAdapterResolver) {
    return options.providerAdapterResolver(modelKey);
  }

  if (target.kind === "local") {
    if (options.providerAdapter) {
      return options.providerAdapter;
    }

    return getLocalStatusAdapter();
  }

  return createPrivateAlphaProviderAdapterForModelKey(modelKey);
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
  let cachedLocalProviderAdapter: PrivateAlphaProviderAdapter | null =
    options.providerAdapter ?? null;
  const getLocalStatusAdapter = (): PrivateAlphaProviderAdapter => {
    if (cachedLocalProviderAdapter) {
      return cachedLocalProviderAdapter;
    }

    if (options.providerAdapterResolver) {
      cachedLocalProviderAdapter = options.providerAdapterResolver(
        PRIVATE_ALPHA_OLLAMA_RUNTIME_MODEL_KEY
      );
      return cachedLocalProviderAdapter;
    }

    cachedLocalProviderAdapter = createPrivateAlphaOllamaProviderAdapter();
    return cachedLocalProviderAdapter;
  };

  const storeInternal: PrivateAlphaStoreInternal = {
    async getStatus(): Promise<PrivateAlphaStatus> {
      const secureMutationAvailable = securePrivateAlphaMutationIsAvailable(paths);
      const killSwitchState = await readSafeKillSwitchState(paths);

      if (runtimeProfile === PRIVATE_ALPHA_LEGACY_RUNTIME_PROFILE) {
        return {
          mode: "private-alpha-foundation",
          persistence: "local-file-backed",
          approvalRecording: secureMutationAvailable ? "enabled" : "unavailable",
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

      const availability = secureMutationAvailable && !killSwitchState.killSwitchEngaged
        ? await getLocalStatusAdapter().getAvailability()
        : {
            providerAvailable: false,
            modelAvailable: false,
          };

      return {
        mode: "private-alpha-local-ollama",
        persistence: "local-file-backed",
        approvalRecording: secureMutationAvailable ? "enabled" : "unavailable",
        providerExecution: "local-ollama",
        providerLabel: PRIVATE_ALPHA_PRODUCTION_PROVIDER_LABEL,
        configuredModel: PRIVATE_ALPHA_PRODUCTION_MODEL,
        providerAvailable: availability.providerAvailable,
        modelAvailable: availability.modelAvailable,
        executionAllowed:
          secureMutationAvailable &&
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
      idempotencyKey: string | null | undefined,
      expectedOwnership?: PrivateAlphaCreatorRunOwnership
    ): Promise<PrivateAlphaCreateRunResult> {
      assertSecurePrivateAlphaMutationPlatform();
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
      const ownership: PrivateAlphaRunOwnership = expectedOwnership
        ? validateCreatorOwnershipInput(expectedOwnership)
        : {
            kind: "general",
            protocolVersion: PRIVATE_ALPHA_RUN_OWNERSHIP_PROTOCOL_VERSION,
          };
      const idempotencyKeyHash =
        ownership.kind === "creator"
          ? buildPrivateAlphaCreatorIdempotencyKeyHash(
              idempotencyValidation.value,
              ownership.projectId,
              ownership.purpose
            )
          : hashSha256(idempotencyValidation.value);

      return withQueue(
        IDEMPOTENCY_WRITE_QUEUES,
        idempotencyKeyHash,
        async (): Promise<PrivateAlphaCreateRunResult> => {
          return withPrivateAlphaNativeStorageLease(paths, async () => {
            await ensureStoreDirectories(paths);

          return withRunMutationLock(
            paths,
            buildIdempotencyMutationLockRunId(idempotencyKeyHash),
            async () => {

          const idempotencyAbsolutePath = buildIdempotencyFileAbsolutePath(
            paths,
            idempotencyKeyHash
          );
          let idempotencyRecord = await readIdempotencyRecordFromFile(
            paths,
            idempotencyAbsolutePath,
            idempotencyKeyHash
          );

          if (!idempotencyRecord) {
            const orphanMatches = await findRunsByIdempotencyKeyHash(
              paths,
              idempotencyKeyHash
            );
            if (orphanMatches.length > 1) {
              throw new PrivateAlphaStoreError(
                500,
                "Multiple private-alpha runs contradict one missing idempotency reservation."
              );
            }
            const orphan = orphanMatches[0] ?? null;
            const historicalGeneralOrphan =
              orphan !== null && orphan.ownership === null && ownership.kind === "general";
            if (
              orphan &&
              buildPrivateAlphaCanonicalRequestHash(orphan.request) !==
                canonicalRequestHash
            ) {
              throw new PrivateAlphaStoreError(
                409,
                "Idempotency-Key conflicts with a different private-alpha request."
              );
            }
            if (
              orphan &&
              !historicalGeneralOrphan &&
              !sameRunOwnership(orphan.ownership, ownership)
            ) {
              throw new PrivateAlphaStoreError(
                409,
                "Idempotency-Key conflicts with a different private-alpha run owner."
              );
            }
            const reservedAt = orphan?.createdAt ?? nowIso();
            const reservation: PrivateAlphaIdempotencyRecord = historicalGeneralOrphan
              ? {
                  version: PRIVATE_ALPHA_RECORD_VERSION,
                  idempotencyKeyHash,
                  canonicalRequestHash,
                  runId: orphan.runId,
                  createdAt: orphan.createdAt,
                }
              : orphan
                ? {
                  version: PRIVATE_ALPHA_RECORD_VERSION,
                  protocolVersion: PRIVATE_ALPHA_IDEMPOTENCY_PROTOCOL_VERSION,
                  publicationPhase: "published",
                  idempotencyKeyHash,
                  requestDigest: canonicalRequestHash,
                  runId: orphan.runId,
                  ownership,
                  reservedAt,
                  publishedAt: orphan.createdAt,
                  }
                : {
                  version: PRIVATE_ALPHA_RECORD_VERSION,
                  protocolVersion: PRIVATE_ALPHA_IDEMPOTENCY_PROTOCOL_VERSION,
                  publicationPhase: "reserved",
                  idempotencyKeyHash,
                  requestDigest: canonicalRequestHash,
                  runId: makeRunId(),
                  ownership,
                  reservedAt,
                  publishedAt: null,
                  };
            const reservationPublished = await publishJsonFileAtomicallyExclusive(
              paths,
              idempotencyAbsolutePath,
              reservation
            );
            idempotencyRecord = reservationPublished
              ? reservation
              : await readIdempotencyRecordFromFile(
                  paths,
                  idempotencyAbsolutePath,
                  idempotencyKeyHash
                );
            if (!idempotencyRecord) {
              throw new PrivateAlphaStoreError(
                500,
                "Private-alpha idempotency reservation could not be reconciled."
              );
            }
          }

          if (idempotencyRequestDigest(idempotencyRecord) !== canonicalRequestHash) {
            throw new PrivateAlphaStoreError(
              409,
              "Idempotency-Key conflicts with a different private-alpha request."
            );
          }

          if (
            "protocolVersion" in idempotencyRecord &&
            !sameRunOwnership(idempotencyRecord.ownership, ownership)
          ) {
            throw new PrivateAlphaStoreError(
              409,
              "Idempotency-Key conflicts with a different private-alpha run owner."
            );
          }

          if (!("protocolVersion" in idempotencyRecord)) {
            const existingRun = await readRunRecordFromFile(
              paths,
              buildRunFileAbsolutePath(paths, idempotencyRecord.runId),
              idempotencyRecord.runId
            );
            assertRunMatchesIdempotencyRecord(existingRun, idempotencyRecord);
            assertRunControl(existingRun, expectedOwnership);
            return {
              created: false,
              run: existingRun,
            };
          }

          const lockedReservationRunId = idempotencyRecord.runId;
          const lockedReservationTimestamp = idempotencyRecord.reservedAt;
          return withRunMutationLock(paths, lockedReservationRunId, async () => {
            const lockedRecord = await readIdempotencyRecordFromFile(
              paths,
              idempotencyAbsolutePath,
              idempotencyKeyHash
            );
            if (!lockedRecord || !("protocolVersion" in lockedRecord)) {
              throw new PrivateAlphaStoreError(
                500,
                "Private-alpha publication reservation changed while acquiring its exact lock."
              );
            }
            if (
              lockedRecord.runId !== lockedReservationRunId ||
              lockedRecord.reservedAt !== lockedReservationTimestamp
            ) {
              throw new PrivateAlphaStoreError(
                500,
                "Private-alpha publication reservation changed while acquiring its exact lock."
              );
            }
            if (lockedRecord.requestDigest !== canonicalRequestHash) {
              throw new PrivateAlphaStoreError(
                409,
                "Idempotency-Key conflicts with a different private-alpha request."
              );
            }
            if (!sameRunOwnership(lockedRecord.ownership, ownership)) {
              throw new PrivateAlphaStoreError(
                409,
                "Idempotency-Key conflicts with a different private-alpha run owner."
              );
            }
            idempotencyRecord = lockedRecord;

            let run = await readRunRecordIfPresent(paths, idempotencyRecord.runId);
            let runPublished = false;
            if (!run) {
            if (idempotencyRecord.publicationPhase === "published") {
              throw new PrivateAlphaStoreError(
                500,
                "Published private-alpha idempotency reservation is missing its run."
              );
            }
            const approvalScope = buildPrivateAlphaApprovalScope({
              runId: idempotencyRecord.runId,
              request,
              normalizedRequestHash,
            });
            const provisionalRun: PrivateAlphaRunRecord = {
              version: PRIVATE_ALPHA_RECORD_VERSION,
              runId: idempotencyRecord.runId,
              createdAt: idempotencyRecord.reservedAt,
              updatedAt: idempotencyRecord.reservedAt,
              state: PRIVATE_ALPHA_INITIAL_RUN_STATE,
              revision: 1,
              idempotencyKeyHash,
              ownership: idempotencyRecord.ownership,
              request,
              approvalScope,
              approvalScopeHash: buildPrivateAlphaApprovalScopeHash(approvalScope),
              approval: null,
              cancellation: null,
              execution: null,
              auditEvents: [],
            };
            const candidateRun: PrivateAlphaRunRecord = {
              ...provisionalRun,
              auditEvents: buildCreatedRunAuditEvents(
                provisionalRun,
                idempotencyRecord.reservedAt,
                1
              ),
            };
            runPublished = await publishJsonFileAtomicallyExclusive(
              paths,
              buildRunFileAbsolutePath(paths, idempotencyRecord.runId),
              candidateRun
            );
            run = runPublished
              ? candidateRun
              : await readRunRecordIfPresent(paths, idempotencyRecord.runId);
            if (!run) {
              throw new PrivateAlphaStoreError(
                409,
                "Private-alpha idempotency publication is concurrently owned."
              );
            }
            }

            assertRunMatchesIdempotencyRecord(run, idempotencyRecord);
            if (idempotencyRecord.publicationPhase === "reserved") {
            const verifiedRecord = await finalizeIdempotencyPublication(
              paths,
              idempotencyAbsolutePath,
              idempotencyRecord,
              run
            );
            if (
              verifiedRecord.publicationPhase !== "published"
            ) {
              throw new PrivateAlphaStoreError(
                500,
                "Private-alpha publication finalization could not be verified."
              );
            }
            assertRunMatchesIdempotencyRecord(run, verifiedRecord);
            }
            return {
              created: runPublished,
              run,
            };
          });
          });
          });
        }
      );
    },

    async bindCreatorRun(
      body,
      idempotencyKey,
      expectedOwnership,
      createIfMissing
    ) {
      assertSecurePrivateAlphaMutationPlatform();
      if (typeof createIfMissing !== "boolean") {
        throw new PrivateAlphaStoreError(
          400,
          "Creator binding recovery mode is invalid."
        );
      }
      const keyValidation = validatePrivateAlphaIdempotencyKey(idempotencyKey);
      if (!keyValidation.ok) {
        throw new PrivateAlphaStoreError(
          keyValidation.status,
          keyValidation.error
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
      const ownership = validateCreatorOwnershipInput(expectedOwnership);
      const request = buildPrivateAlphaRunRequest(
        createValidation.value,
        runtimeProfile
      );
      const canonicalRequestHash = buildPrivateAlphaCanonicalRequestHash(request);
      const currentHash = buildPrivateAlphaCreatorIdempotencyKeyHash(
        keyValidation.value,
        ownership.projectId,
        ownership.purpose
      );
      const legacyHash = hashSha256(keyValidation.value);
      const matchesCreatorDomain = (
        candidate: PrivateAlphaRunOwnership
      ): candidate is PrivateAlphaCreatorRunOwnership =>
        candidate?.kind === "creator" &&
        candidate.protocolVersion === PRIVATE_ALPHA_RUN_OWNERSHIP_PROTOCOL_VERSION &&
        candidate.projectId === ownership.projectId &&
        candidate.purpose === ownership.purpose &&
        /^[a-f0-9]{32}$/u.test(candidate.bindingId);

      return withPrivateAlphaNativeStorageLease(paths, async () => {
        await ensureStoreDirectories(paths);
        return withCreatorBindingMutationLock(
          paths,
          ownership.projectId,
          ownership.purpose,
          async () => {
            const inspectNamespace = async (
              namespace: "current" | "legacy",
              idempotencyKeyHash: string
            ): Promise<boolean> => {
              const record = await readIdempotencyRecordFromFile(
                paths,
                buildIdempotencyFileAbsolutePath(paths, idempotencyKeyHash),
                idempotencyKeyHash
              );
              const matches = await findRunsByIdempotencyKeyHash(
                paths,
                idempotencyKeyHash
              );
              if (matches.length > 1) {
                throw new PrivateAlphaStoreError(
                  500,
                  "Multiple runs contradict one creator binding namespace."
                );
              }
              const orphan = matches[0] ?? null;
              const recordIsCreator =
                record !== null &&
                "protocolVersion" in record &&
                record.ownership?.kind === "creator";

              if (record && !recordIsCreator) {
                if (orphan?.ownership?.kind === "creator") {
                  throw new PrivateAlphaStoreError(
                    500,
                    "Creator and general idempotency evidence is ambiguous."
                  );
                }
                if (namespace === "current") {
                  throw new PrivateAlphaStoreError(
                    409,
                    "Current creator idempotency evidence is owned by a non-creator lifecycle."
                  );
                }
                return false;
              }

              if (recordIsCreator) {
                const recordOwnership = record.ownership;
                if (
                  !matchesCreatorDomain(recordOwnership) ||
                  record.requestDigest !== canonicalRequestHash
                ) {
                  throw new PrivateAlphaStoreError(
                    409,
                    "Creator binding conflicts with its exact persisted identity."
                  );
                }
                if (orphan && orphan.runId !== record.runId) {
                  throw new PrivateAlphaStoreError(
                    500,
                    "Creator mapping and orphan evidence is ambiguous."
                  );
                }
                const mappedRun = await readRunRecordIfPresent(paths, record.runId);
                if (!mappedRun) {
                  if (record.publicationPhase === "published") {
                    throw new PrivateAlphaStoreError(
                      500,
                      "Published creator reservation is missing its exact run."
                    );
                  }
                  return true;
                }
                assertRunMatchesIdempotencyRecord(mappedRun, record);
                if (
                  !sameRunOwnership(mappedRun.ownership, recordOwnership) ||
                  buildPrivateAlphaCanonicalRequestHash(mappedRun.request) !==
                    canonicalRequestHash
                ) {
                  throw new PrivateAlphaStoreError(
                    409,
                    "Creator run conflicts with its exact persisted binding."
                  );
                }
                return true;
              }

              if (!orphan) return false;
              if (orphan.ownership?.kind !== "creator") {
                if (namespace === "current") {
                  throw new PrivateAlphaStoreError(
                    409,
                    "Current creator orphan is owned by a non-creator lifecycle."
                  );
                }
                return false;
              }
              if (
                !matchesCreatorDomain(orphan.ownership) ||
                buildPrivateAlphaCanonicalRequestHash(orphan.request) !==
                  canonicalRequestHash
              ) {
                throw new PrivateAlphaStoreError(
                  409,
                  "Creator orphan conflicts with its exact persisted binding."
                );
              }
              return true;
            };

            const currentExists = await inspectNamespace("current", currentHash);
            const legacyExists = await inspectNamespace("legacy", legacyHash);
            if (currentExists && legacyExists) {
              throw new PrivateAlphaStoreError(
                500,
                "Current and historical creator binding evidence is ambiguous."
              );
            }
            const namespace = currentExists
              ? "current"
              : legacyExists
                ? "legacy"
                : null;
            if (namespace) {
              const recovered = await storeInternal.recoverCreatorRunByIdempotencyKey({
                body,
                idempotencyKey: keyValidation.value,
                namespace,
                projectId: ownership.projectId,
                purpose: ownership.purpose,
              });
              if (
                !recovered?.run ||
                !matchesCreatorDomain(recovered.run.ownership)
              ) {
                throw new PrivateAlphaStoreError(
                  500,
                  "Creator binding recovery did not return its exact owned run."
                );
              }
              return { created: false, run: recovered.run };
            }
            if (!createIfMissing) return null;
            return storeInternal.createRun(
              body,
              keyValidation.value,
              ownership
            );
          }
        );
      });
    },

    async createCreatorRun(body, idempotencyKey, ownership) {
      const result = await storeInternal.bindCreatorRun(
        body,
        idempotencyKey,
        ownership,
        true
      );
      if (!result) {
        throw new PrivateAlphaStoreError(
          500,
          "Creator binding publication did not return an exact run."
        );
      }
      return result;
    },

    async lookupRunByIdempotencyKeyHash(
      idempotencyKeyHash: string
    ): Promise<PrivateAlphaIdempotencyLookupResult | null> {
      assertSecurePrivateAlphaMutationPlatform();
      if (!isHexHash(idempotencyKeyHash)) {
        throw new PrivateAlphaStoreError(
          400,
          "idempotencyKeyHash must be a 64-character lowercase hex identifier."
        );
      }
      return withQueue(IDEMPOTENCY_WRITE_QUEUES, idempotencyKeyHash, () =>
        withPrivateAlphaNativeStorageLease(paths, async () => {
          await ensureStoreDirectories(paths);
        const idempotencyAbsolutePath = buildIdempotencyFileAbsolutePath(
          paths,
          idempotencyKeyHash
        );
        const record = await readIdempotencyRecordFromFile(
          paths,
          idempotencyAbsolutePath,
          idempotencyKeyHash
        );
        if (!record) return null;

        const run = await readRunRecordIfPresent(paths, record.runId);
        if (!run) {
          if (!("protocolVersion" in record) || record.publicationPhase === "published") {
            throw new PrivateAlphaStoreError(
              500,
              "Published private-alpha idempotency record is missing its exact run."
            );
          }
          return {
            idempotencyKeyHash,
            requestDigest: record.requestDigest,
            reservedRunId: record.runId,
            publicationPhase: "reserved",
            ownership: record.ownership,
            run: null,
            historical: false,
          };
        }

        assertRunMatchesIdempotencyRecord(run, record);
        if ("protocolVersion" in record && record.publicationPhase === "reserved") {
          await finalizeIdempotencyPublication(
            paths,
            idempotencyAbsolutePath,
            record,
            run
          );
        }
          return {
            idempotencyKeyHash,
            requestDigest: idempotencyRequestDigest(record),
            reservedRunId: record.runId,
            publicationPhase: "published",
            ownership: "protocolVersion" in record ? record.ownership : run.ownership,
            run,
            historical: !("protocolVersion" in record),
          };
        })
      );
    },

    async recoverCreatorRunByIdempotencyKey(
      input: PrivateAlphaCreatorRecoveryInput
    ): Promise<PrivateAlphaIdempotencyLookupResult | null> {
      assertSecurePrivateAlphaMutationPlatform();
      const keyValidation = validatePrivateAlphaIdempotencyKey(
        input.idempotencyKey
      );
      if (!keyValidation.ok) {
        throw new PrivateAlphaStoreError(
          keyValidation.status,
          keyValidation.error
        );
      }
      if (
        !/^[a-f0-9]{24}$/u.test(input.projectId) ||
        (input.purpose !== "generation" && input.purpose !== "repair") ||
        (input.namespace !== "current" && input.namespace !== "legacy")
      ) {
        throw new PrivateAlphaStoreError(
          400,
          "Legacy creator recovery binding is invalid."
        );
      }
      const createValidation = validatePrivateAlphaCreateRunInput(
        input.body,
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
      const idempotencyKeyHash =
        input.namespace === "current"
          ? buildPrivateAlphaCreatorIdempotencyKeyHash(
              keyValidation.value,
              input.projectId,
              input.purpose
            )
          : hashSha256(keyValidation.value);

      return withPrivateAlphaNativeStorageLease(paths, async () => {
        await ensureStoreDirectories(paths);
        return withCreatorBindingMutationLock(
          paths,
          input.projectId,
          input.purpose,
          () => withQueue(IDEMPOTENCY_WRITE_QUEUES, idempotencyKeyHash, () =>
        withPrivateAlphaNativeStorageLease(paths, async () => {
          await ensureStoreDirectories(paths);
          return withRunMutationLock(
            paths,
            buildIdempotencyMutationLockRunId(idempotencyKeyHash),
            async () => {
              const idempotencyAbsolutePath = buildIdempotencyFileAbsolutePath(
                paths,
                idempotencyKeyHash
              );
              let record = await readIdempotencyRecordFromFile(
                paths,
                idempotencyAbsolutePath,
                idempotencyKeyHash
              );
              const exactHashRuns = await findRunsByIdempotencyKeyHash(
                paths,
                idempotencyKeyHash
              );
              if (exactHashRuns.length > 1) {
                throw new PrivateAlphaStoreError(
                  500,
                  "Multiple runs contradict one legacy idempotency identity."
                );
              }
              const exactHashRun = exactHashRuns[0] ?? null;

              if (
                record &&
                (!("protocolVersion" in record) ||
                  record.ownership?.kind !== "creator")
              ) {
                if (input.namespace === "current") {
                  throw new PrivateAlphaStoreError(
                    409,
                    "Current creator recovery conflicts with non-creator idempotency evidence."
                  );
                }
                if (exactHashRun?.ownership?.kind === "creator") {
                  throw new PrivateAlphaStoreError(
                    500,
                    "Legacy creator and general idempotency evidence is ambiguous."
                  );
                }
                return null;
              }

              if (!record) {
                const orphan = exactHashRun;
                if (!orphan) return null;
                if (orphan.ownership?.kind !== "creator") {
                  if (input.namespace === "current") {
                    throw new PrivateAlphaStoreError(
                      409,
                      "Current creator recovery conflicts with a non-creator orphan."
                    );
                  }
                  return null;
                }
                if (
                  orphan.ownership.protocolVersion !==
                    PRIVATE_ALPHA_RUN_OWNERSHIP_PROTOCOL_VERSION ||
                  orphan.ownership.projectId !== input.projectId ||
                  orphan.ownership.purpose !== input.purpose ||
                  buildPrivateAlphaCanonicalRequestHash(orphan.request) !==
                    canonicalRequestHash
                ) {
                  throw new PrivateAlphaStoreError(
                    409,
                    "Legacy creator recovery conflicts with the exact persisted binding."
                  );
                }
                const reconstructed: PrivateAlphaProtocolIdempotencyRecord = {
                  version: PRIVATE_ALPHA_RECORD_VERSION,
                  protocolVersion: PRIVATE_ALPHA_IDEMPOTENCY_PROTOCOL_VERSION,
                  publicationPhase: "published",
                  idempotencyKeyHash,
                  requestDigest: canonicalRequestHash,
                  runId: orphan.runId,
                  ownership: orphan.ownership,
                  reservedAt: orphan.createdAt,
                  publishedAt: orphan.createdAt,
                };
                const published = await publishJsonFileAtomicallyExclusive(
                  paths,
                  idempotencyAbsolutePath,
                  reconstructed
                );
                record = published
                  ? reconstructed
                  : await readIdempotencyRecordFromFile(
                      paths,
                      idempotencyAbsolutePath,
                      idempotencyKeyHash
                    );
                if (!record) {
                  throw new PrivateAlphaStoreError(
                    500,
                    "Legacy creator idempotency reconstruction could not be reconciled."
                  );
                }
              }

              if (!("protocolVersion" in record)) {
                throw new PrivateAlphaStoreError(
                  409,
                  "Legacy creator recovery conflicts with the exact persisted binding."
                );
              }
              const recordOwnership = record.ownership;
              if (
                !recordOwnership ||
                recordOwnership.kind !== "creator"
              ) {
                throw new PrivateAlphaStoreError(
                  409,
                  "Legacy creator recovery conflicts with the exact persisted binding."
                );
              }
              if (
                recordOwnership.projectId !== input.projectId ||
                recordOwnership.purpose !== input.purpose ||
                record.requestDigest !== canonicalRequestHash
              ) {
                throw new PrivateAlphaStoreError(
                  409,
                  "Legacy creator recovery conflicts with the exact persisted binding."
                );
              }
              if (exactHashRun && exactHashRun.runId !== record.runId) {
                throw new PrivateAlphaStoreError(
                  500,
                  "Legacy creator mapping and orphan evidence is ambiguous."
                );
              }

              const initialRecord = record;
              return withRunMutationLock(paths, initialRecord.runId, async () => {
                const lockedRecord = await readIdempotencyRecordFromFile(
                  paths,
                  idempotencyAbsolutePath,
                  idempotencyKeyHash
                );
                if (
                  !lockedRecord ||
                  !("protocolVersion" in lockedRecord) ||
                  lockedRecord.runId !== initialRecord.runId ||
                  lockedRecord.reservedAt !== initialRecord.reservedAt ||
                  lockedRecord.requestDigest !== initialRecord.requestDigest ||
                  !sameRunOwnership(
                    lockedRecord.ownership,
                    initialRecord.ownership
                  )
                ) {
                  throw new PrivateAlphaStoreError(
                    500,
                    "Legacy creator reservation changed before exact recovery."
                  );
                }

                let run = await readRunRecordIfPresent(paths, lockedRecord.runId);
                if (!run) {
                  if (lockedRecord.publicationPhase === "published") {
                    throw new PrivateAlphaStoreError(
                      500,
                      "Published legacy creator reservation is missing its exact run."
                    );
                  }
                  const approvalScope = buildPrivateAlphaApprovalScope({
                    runId: lockedRecord.runId,
                    request,
                    normalizedRequestHash,
                  });
                  const provisionalRun: PrivateAlphaRunRecord = {
                    version: PRIVATE_ALPHA_RECORD_VERSION,
                    runId: lockedRecord.runId,
                    createdAt: lockedRecord.reservedAt,
                    updatedAt: lockedRecord.reservedAt,
                    state: PRIVATE_ALPHA_INITIAL_RUN_STATE,
                    revision: 1,
                    idempotencyKeyHash,
                    ownership: lockedRecord.ownership,
                    request,
                    approvalScope,
                    approvalScopeHash:
                      buildPrivateAlphaApprovalScopeHash(approvalScope),
                    approval: null,
                    cancellation: null,
                    execution: null,
                    auditEvents: [],
                  };
                  const candidateRun: PrivateAlphaRunRecord = {
                    ...provisionalRun,
                    auditEvents: buildCreatedRunAuditEvents(
                      provisionalRun,
                      lockedRecord.reservedAt,
                      1
                    ),
                  };
                  const runPublished = await publishJsonFileAtomicallyExclusive(
                    paths,
                    buildRunFileAbsolutePath(paths, lockedRecord.runId),
                    candidateRun
                  );
                  run = runPublished
                    ? candidateRun
                    : await readRunRecordIfPresent(paths, lockedRecord.runId);
                  if (!run) {
                    throw new PrivateAlphaStoreError(
                      409,
                      "Legacy creator run publication is concurrently owned."
                    );
                  }
                }

                assertRunMatchesIdempotencyRecord(run, lockedRecord);
                if (
                  run.ownership?.kind !== "creator" ||
                  !sameRunOwnership(run.ownership, lockedRecord.ownership) ||
                  buildPrivateAlphaCanonicalRequestHash(run.request) !==
                    canonicalRequestHash
                ) {
                  throw new PrivateAlphaStoreError(
                    409,
                    "Legacy creator run conflicts with its exact recovery request."
                  );
                }
                const publishedRecord =
                  lockedRecord.publicationPhase === "reserved"
                    ? await finalizeIdempotencyPublication(
                        paths,
                        idempotencyAbsolutePath,
                        lockedRecord,
                        run
                      )
                    : lockedRecord;
                if (
                  publishedRecord.publicationPhase !== "published" ||
                  publishedRecord.publishedAt !== run.createdAt
                ) {
                  throw new PrivateAlphaStoreError(
                    500,
                    "Legacy creator recovery publication could not be verified."
                  );
                }
                assertRunMatchesIdempotencyRecord(run, publishedRecord);
                return {
                  idempotencyKeyHash,
                  requestDigest: publishedRecord.requestDigest,
                  reservedRunId: publishedRecord.runId,
                  publicationPhase: "published",
                  ownership: publishedRecord.ownership,
                  run,
                  historical: false,
                };
              });
            }
          );
        })
          )
        );
      });
    },

    async listRuns(limit: string | null | undefined): Promise<readonly PrivateAlphaRunSummary[]> {
      const limitValidation = validatePrivateAlphaListLimit(limit);
      if (!limitValidation.ok) {
        throw new PrivateAlphaStoreError(limitValidation.status, limitValidation.error);
      }

      const readResult = await withPrivateAlphaExistingNativeRootLease(
        paths.dataRootLabel,
        async (): Promise<readonly PrivateAlphaRunSummary[]> => {
          if (!(await inspectRunDirectoryForRead(paths))) return [];

          if (process.platform === "win32") {
        let names: readonly string[];
        try {
          names = withPrivateAlphaNativeRoot(paths.dataRootLabel, (root) =>
            root.listDirectory(["runs"])
          );
        } catch (error) {
          throwPrivateAlphaNativeStorageError(error);
        }
        const runNames = names.filter((name) => name.endsWith(".json"));
        if (runNames.length > PRIVATE_ALPHA_MAX_STORED_RUN_FILES) {
          throw new PrivateAlphaStoreError(
            500,
            "Private-alpha run inventory exceeds its bounded storage envelope."
          );
        }
        const runs: PrivateAlphaRunRecord[] = [];
        for (const name of runNames) {
          const runId = name.slice(0, -".json".length);
          const runIdValidation = validatePrivateAlphaRunId(runId);
          if (!runIdValidation.ok) {
            throw new PrivateAlphaStoreError(500, "Persisted run record is malformed.");
          }
          try {
            const kind = withPrivateAlphaNativeRoot(paths.dataRootLabel, (root) =>
              root.stat(["runs", name])
            );
            if (kind !== "file") {
              throw new PrivateAlphaStoreError(
                500,
                "Private-alpha run storage contains an unsafe entry."
              );
            }
          } catch (error) {
            if (error instanceof PrivateAlphaStoreError) throw error;
            throwPrivateAlphaNativeStorageError(error);
          }
          runs.push(
            await readRunRecordFromFile(
              paths,
              buildRunFileAbsolutePath(paths, runIdValidation.value),
              runIdValidation.value
            )
          );
        }
            return runs
          .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
          .slice(0, limitValidation.value)
          .map(buildPrivateAlphaRunSummary);
          }

          const runsDirectoryIdentity = await capturePinnedParentIdentity(
        paths,
        path.join(paths.runsDirectoryAbsolutePath, ".list-boundary")
      );
      await revalidatePinnedParentIdentity(paths, runsDirectoryIdentity);
      const entries = await readBoundedDirectoryEntries(
        paths.runsDirectoryAbsolutePath,
        "Private-alpha run inventory exceeds its bounded storage envelope."
      );
      await revalidatePinnedParentIdentity(paths, runsDirectoryIdentity);

      const runEntries = entries.filter((entry) => entry.name.endsWith(".json"));
      if (runEntries.length > PRIVATE_ALPHA_MAX_STORED_RUN_FILES) {
        throw new PrivateAlphaStoreError(
          500,
          "Private-alpha run inventory exceeds its bounded storage envelope."
        );
      }

      const runs: PrivateAlphaRunRecord[] = [];
      for (const entry of runEntries) {
        if (entry.isSymbolicLink() || !entry.isFile()) {
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
            paths,
            buildRunFileAbsolutePath(paths, runIdValidation.value),
            runIdValidation.value
          )
        );
      }

          return runs
        .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
        .slice(0, limitValidation.value)
        .map(buildPrivateAlphaRunSummary);
        }
      );
      return readResult ?? [];
    },

    async getRun(runId: string): Promise<PrivateAlphaRunRecord> {
      const runIdValidation = validatePrivateAlphaRunId(runId);
      if (!runIdValidation.ok) {
        throw new PrivateAlphaStoreError(runIdValidation.status, runIdValidation.error);
      }

      const readResult = await withPrivateAlphaExistingNativeRootLease(
        paths.dataRootLabel,
        async () => {
          if (!(await inspectRunDirectoryForRead(paths))) {
            throw new PrivateAlphaStoreError(404, "Run not found.");
          }
          return readRunRecordFromFile(
            paths,
            buildRunFileAbsolutePath(paths, runIdValidation.value),
            runIdValidation.value
          );
        }
      );
      if (readResult === null) throw new PrivateAlphaStoreError(404, "Run not found.");
      return readResult;
    },

    async getCreatorRun(runId, ownership) {
      const runIdValidation = validatePrivateAlphaRunId(runId);
      if (!runIdValidation.ok) {
        throw new PrivateAlphaStoreError(runIdValidation.status, runIdValidation.error);
      }
      const validatedOwnership = validateCreatorOwnershipInput(ownership);
      const readResult = await withPrivateAlphaExistingNativeRootLease(
        paths.dataRootLabel,
        async () => {
          if (!(await inspectRunDirectoryForRead(paths))) {
            throw new PrivateAlphaStoreError(404, "Run not found.");
          }
          return readRunForExactControl(
            paths,
            runIdValidation.value,
            validatedOwnership,
            false
          );
        }
      );
      if (readResult === null) throw new PrivateAlphaStoreError(404, "Run not found.");
      return readResult;
    },

    async reconcileCreatorRunAfterInterruption(runId, ownership) {
      assertSecurePrivateAlphaMutationPlatform();
      const runIdValidation = validatePrivateAlphaRunId(runId);
      if (!runIdValidation.ok) {
        throw new PrivateAlphaStoreError(runIdValidation.status, runIdValidation.error);
      }
      const validatedOwnership = validateCreatorOwnershipInput(ownership);
      await ensureStoreDirectories(paths);
      await readRunForExactControl(
        paths,
        runIdValidation.value,
        validatedOwnership
      );
      return withRunMutationLock(paths, runIdValidation.value, async () => {
        const runAbsolutePath = buildRunFileAbsolutePath(paths, runIdValidation.value);
        const current = await readRunForExactControl(
          paths,
          runIdValidation.value,
          validatedOwnership
        );
        if (current.state !== "executing") return current;
        // Acquiring the exact run lock proves that no live execution owner retains
        // the lifecycle. Wall-clock age is neither necessary nor safe under rollback.
        return persistInterruptedExecutionFailureWhileLocked(
          paths,
          runAbsolutePath,
          current
        );
      });
    },

    async approveRun(
      runId: string,
      body: unknown,
      expectedOwnership?: PrivateAlphaCreatorRunOwnership
    ): Promise<PrivateAlphaRunRecord> {
      assertSecurePrivateAlphaMutationPlatform();
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
      await readRunForExactControl(
        paths,
        runIdValidation.value,
        expectedOwnership
      );

      return withRunMutationLock(paths, runIdValidation.value, async () => {
        const runAbsolutePath = buildRunFileAbsolutePath(paths, runIdValidation.value);
        const existingRun = await readRunForExactControl(
          paths,
          runIdValidation.value,
          expectedOwnership
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

        const isBoundRequest = "bindingVersion" in existingRun.request;
        const isCloudApprovalOnlyRun = isPrivateAlphaCloudApprovalOnlyConfiguration(
          existingRun.request
        );

        if (isCloudApprovalOnlyRun) {
          if (approvalInput.cloudDataTransferAcknowledgement !== true) {
            throw new PrivateAlphaStoreError(
              409,
              "Cloud data transfer acknowledgement is required for this exact approval scope."
            );
          }
        } else if (approvalInput.cloudDataTransferAcknowledgement !== undefined) {
          throw new PrivateAlphaStoreError(
            409,
            "Cloud data transfer acknowledgement is not allowed for local approvals."
          );
        }

        const approvedAt = nextPersistedIsoTimestamp(existingRun.updatedAt);
        const previousRevision = existingRun.revision;
        const resultingRevision = previousRevision + 1;
        const approvalRecord: PrivateAlphaApprovalRecord = isBoundRequest
          ? {
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
              bindingVersion: PRIVATE_ALPHA_APPROVAL_BINDING_VERSION,
              cloudDataTransferAcknowledgement: isCloudApprovalOnlyRun
                ? "granted-for-approved-scope"
                : "not-required",
            }
          : {
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

        const summary = isCloudApprovalOnlyRun
          ? `Manual approval recorded for exact Groq Cloud model scope ${existingRun.request.modelPreferenceLabel}. No prompt was sent to Groq, the exact model remains fixed, and a separate execute action is required.`
          : isPrivateAlphaLocalExecutionConfiguration(existingRun.request)
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

        await writeJsonFileAtomically(paths, runAbsolutePath, nextRun, existingRun);
        return nextRun;
      });
    },

    async approveCreatorRun(runId, body, ownership) {
      return storeInternal.approveRun(runId, body, ownership);
    },

    async cancelRun(
      runId: string,
      body: unknown,
      expectedOwnership?: PrivateAlphaCreatorRunOwnership
    ): Promise<PrivateAlphaRunRecord> {
      assertSecurePrivateAlphaMutationPlatform();
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
      await readRunForExactControl(
        paths,
        runIdValidation.value,
        expectedOwnership
      );

      return withRunMutationLock(paths, runIdValidation.value, async () => {
        const runAbsolutePath = buildRunFileAbsolutePath(paths, runIdValidation.value);
        const existingRun = await readRunForExactControl(
          paths,
          runIdValidation.value,
          expectedOwnership
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

        const canceledAt = nextPersistedIsoTimestamp(existingRun.updatedAt);
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

        await writeJsonFileAtomically(paths, runAbsolutePath, nextRun, existingRun);
        return nextRun;
      });
    },

    async cancelCreatorRun(runId, body, ownership) {
      return storeInternal.cancelRun(runId, body, ownership);
    },

    async executeRun(
      runId: string,
      body: unknown,
      idempotencyKey: string | null | undefined,
      expectedOwnership?: PrivateAlphaCreatorRunOwnership
    ): Promise<PrivateAlphaExecuteRunResult> {
      assertSecurePrivateAlphaMutationPlatform();
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
      await readRunForExactControl(
        paths,
        runIdValidation.value,
        expectedOwnership
      );

      return withRunMutationLock(paths, runIdValidation.value, async () => {
        const runAbsolutePath = buildRunFileAbsolutePath(paths, runIdValidation.value);
        const executeInput: PrivateAlphaExecuteInput = executeValidation.value;
        const validatedOwnership = expectedOwnership
          ? validateCreatorOwnershipInput(expectedOwnership)
          : null;
        const idempotencyKeyHash = validatedOwnership
          ? buildPrivateAlphaCreatorIdempotencyKeyHash(
              idempotencyValidation.value,
              validatedOwnership.projectId,
              validatedOwnership.purpose
            )
          : hashSha256(idempotencyValidation.value);
        const legacyCreatorIdempotencyKeyHash = validatedOwnership
          ? hashSha256(idempotencyValidation.value)
          : null;
        let existingRun = await readRunForExactControl(
          paths,
          runIdValidation.value,
          expectedOwnership
        );

        if (existingRun.execution) {
          if (
            (existingRun.execution.idempotencyKeyHash === idempotencyKeyHash ||
              (legacyCreatorIdempotencyKeyHash !== null &&
                existingRun.execution.idempotencyKeyHash ===
                  legacyCreatorIdempotencyKeyHash)) &&
            existingRun.execution.approvalScopeHash === executeInput.approvalScopeHash
          ) {
            if (
              executeInput.expectedRevision !==
              existingRun.execution.previousRevision
            ) {
              throw new PrivateAlphaStoreError(
                409,
                "Execution replay revision does not match the original attempt."
              );
            }
            if (
              existingRun.execution.responseStatus === null &&
              existingRun.state === "executing"
            ) {
              // Matching the exact attempt binding while holding the exact run
              // lock proves both recovery ownership and prior-owner exit. The
              // original attempt is consumed as failure; generation is not retried.
              existingRun = await persistInterruptedExecutionFailureWhileLocked(
                paths,
                runAbsolutePath,
                existingRun
              );
            }
            const terminalExecution = existingRun.execution;
            if (!terminalExecution || terminalExecution.responseStatus === null) {
              throw new PrivateAlphaStoreError(500, "Execution reconciliation failed closed.");
            }
            return {
              replayed: true,
              run: existingRun,
              responseStatus: terminalExecution.responseStatus,
              errorCode: terminalExecution.errorCode,
              safeErrorMessage: terminalExecution.safeErrorMessage,
            };
          }

          throw new PrivateAlphaStoreError(
            409,
            "This run has already started its one allowed execution attempt."
          );
        }

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

        const target = resolveExecutableTargetOrThrow(existingRun);
        validateExecutionAcknowledgementOrThrow(existingRun, target, executeInput);

        const killSwitchBeforeResolver = await readSafeKillSwitchState(paths);
        if (killSwitchBeforeResolver.killSwitchEngaged) {
          const blockedAt = nextPersistedIsoTimestamp(existingRun.updatedAt);
          const resultingRevision = existingRun.revision + 1;
          const blockedRun: PrivateAlphaRunRecord = {
            ...existingRun,
            updatedAt: blockedAt,
            state: "blocked",
            revision: resultingRevision,
            execution: buildBlockedExecutionRecord({
              run: existingRun,
              target,
              idempotencyKeyHash,
              blockedAt,
              previousRevision: existingRun.revision,
              runningRevision: null,
              resultingRevision,
              errorCode: "kill_switch_blocked",
              safeErrorMessage:
                "Execution was blocked by the private-alpha kill switch.",
              responseStatus: 409,
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
                summary: buildExecutionBlockedSummary(target, "kill-switch"),
                occurredAt: blockedAt,
              }),
            ],
          };

          await writeJsonFileAtomically(paths, runAbsolutePath, blockedRun, existingRun);
          return {
            replayed: false,
            run: blockedRun,
            responseStatus: 409,
            errorCode: "kill_switch_blocked",
            safeErrorMessage:
              "Execution was blocked by the private-alpha kill switch.",
          };
        }

        if (
          isHistoricalGroqExecutionOverEnvelope(
            target,
            existingRun.request.maximumOutputTokens
          )
        ) {
          const blockedAt = nextPersistedIsoTimestamp(existingRun.updatedAt);
          const resultingRevision = existingRun.revision + 1;
          const blockedRun: PrivateAlphaRunRecord = {
            ...existingRun,
            updatedAt: blockedAt,
            state: "blocked",
            revision: resultingRevision,
            execution: buildBlockedExecutionRecord({
              run: existingRun,
              target,
              idempotencyKeyHash,
              blockedAt,
              previousRevision: existingRun.revision,
              runningRevision: null,
              resultingRevision,
              errorCode: "groq_output_too_large",
              safeErrorMessage:
                `The approved Groq output limit exceeds the admitted ${PRIVATE_ALPHA_GROQ_MAX_OUTPUT_TOKENS}-token execution envelope.`,
              responseStatus: 409,
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
                summary: buildExecutionBlockedSummary(target, "availability"),
                occurredAt: blockedAt,
              }),
            ],
          };

          await writeJsonFileAtomically(paths, runAbsolutePath, blockedRun, existingRun);
          return {
            replayed: false,
            run: blockedRun,
            responseStatus: 409,
            errorCode: "groq_output_too_large",
            safeErrorMessage:
              `The approved Groq output limit exceeds the admitted ${PRIVATE_ALPHA_GROQ_MAX_OUTPUT_TOKENS}-token execution envelope.`,
          };
        }

        const resolvedProviderAdapter = resolveProviderAdapterForExecutionTarget(
          target,
          options,
          getLocalStatusAdapter
        );
        verifyResolvedProviderAdapterIdentity(
          target,
          resolvedProviderAdapter,
          existingRun.request.maximumOutputTokens
        );

        let availability: Awaited<
          ReturnType<PrivateAlphaProviderAdapter["getAvailability"]>
        >;
        try {
          availability = await resolvedProviderAdapter.getAvailability();
        } catch (error) {
          const fallbackAvailability = {
            providerAvailable: false,
            modelAvailable: false,
            errorCode:
              error instanceof PrivateAlphaProviderError ? error.code : null,
            safeErrorMessage:
              error instanceof PrivateAlphaProviderError ? error.safeMessage : null,
          } as const;
          const blockedAt = nextPersistedIsoTimestamp(existingRun.updatedAt);
          const resultingRevision = existingRun.revision + 1;
          const safeErrorMessage = resolveBlockedExecutionSafeMessage(
            target,
            fallbackAvailability
          );

          if (target.kind === "local") {
            const errorCode = resolveBlockedExecutionErrorCode(
              target,
              fallbackAvailability
            );
            const blockedRun: PrivateAlphaRunRecord = {
              ...existingRun,
              updatedAt: blockedAt,
              state: "blocked",
              revision: resultingRevision,
              execution: buildBlockedExecutionRecord({
                run: existingRun,
                target,
                idempotencyKeyHash,
                blockedAt,
                previousRevision: existingRun.revision,
                runningRevision: null,
                resultingRevision,
                errorCode,
                safeErrorMessage,
                responseStatus: resolveAvailabilityBlockedResponseStatus(errorCode),
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
                  summary: buildExecutionBlockedSummary(target, "availability"),
                  occurredAt: blockedAt,
                }),
              ],
            };

            await writeJsonFileAtomically(paths, runAbsolutePath, blockedRun, existingRun);
            return {
              replayed: false,
              run: blockedRun,
              responseStatus: resolveAvailabilityBlockedResponseStatus(errorCode),
              errorCode,
              safeErrorMessage,
            };
          }

          const errorCode = resolveBlockedExecutionErrorCode(
            target,
            fallbackAvailability
          );
          const blockedRun: PrivateAlphaRunRecord = {
            ...existingRun,
            updatedAt: blockedAt,
            state: "blocked",
            revision: resultingRevision,
            execution: buildBlockedExecutionRecord({
              run: existingRun,
              target,
              idempotencyKeyHash,
              blockedAt,
              previousRevision: existingRun.revision,
              runningRevision: null,
              resultingRevision,
              errorCode,
              safeErrorMessage,
              responseStatus: resolveAvailabilityBlockedResponseStatus(errorCode),
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
                summary: buildExecutionBlockedSummary(target, "availability"),
                occurredAt: blockedAt,
              }),
            ],
          };

          await writeJsonFileAtomically(paths, runAbsolutePath, blockedRun, existingRun);
          return {
            replayed: false,
            run: blockedRun,
            responseStatus: resolveAvailabilityBlockedResponseStatus(errorCode),
            errorCode,
            safeErrorMessage,
          };
        }

        if (
          availability.errorCode !== null ||
          !availability.providerAvailable ||
          !availability.modelAvailable
        ) {
          const blockedAt = nextPersistedIsoTimestamp(existingRun.updatedAt);
          const resultingRevision = existingRun.revision + 1;
          const safeErrorMessage =
            resolveBlockedExecutionSafeMessage(target, availability);

          if (target.kind === "local") {
            const errorCode = resolveBlockedExecutionErrorCode(
              target,
              availability
            );
            const blockedRun: PrivateAlphaRunRecord = {
              ...existingRun,
              updatedAt: blockedAt,
              state: "blocked",
              revision: resultingRevision,
              execution: buildBlockedExecutionRecord({
                run: existingRun,
                target,
                idempotencyKeyHash,
                blockedAt,
                previousRevision: existingRun.revision,
                runningRevision: null,
                resultingRevision,
                errorCode,
                safeErrorMessage,
                responseStatus: resolveAvailabilityBlockedResponseStatus(errorCode),
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
                  summary: buildExecutionBlockedSummary(target, "availability"),
                  occurredAt: blockedAt,
                }),
              ],
            };

            await writeJsonFileAtomically(paths, runAbsolutePath, blockedRun, existingRun);
            return {
              replayed: false,
              run: blockedRun,
              responseStatus: resolveAvailabilityBlockedResponseStatus(errorCode),
              errorCode,
              safeErrorMessage,
            };
          }

          const errorCode = resolveBlockedExecutionErrorCode(target, availability);
          const blockedRun: PrivateAlphaRunRecord = {
            ...existingRun,
            updatedAt: blockedAt,
            state: "blocked",
            revision: resultingRevision,
            execution: buildBlockedExecutionRecord({
              run: existingRun,
              target,
              idempotencyKeyHash,
              blockedAt,
              previousRevision: existingRun.revision,
              runningRevision: null,
              resultingRevision,
              errorCode,
              safeErrorMessage,
              responseStatus: resolveAvailabilityBlockedResponseStatus(errorCode),
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
                summary: buildExecutionBlockedSummary(target, "availability"),
                occurredAt: blockedAt,
              }),
            ],
          };

          await writeJsonFileAtomically(paths, runAbsolutePath, blockedRun, existingRun);
          return {
            replayed: false,
            run: blockedRun,
            responseStatus: resolveAvailabilityBlockedResponseStatus(errorCode),
            errorCode,
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

        const startedAt = nextPersistedIsoTimestamp(existingRun.updatedAt);
        const executingRecord = buildExecutingExecutionRecord({
          run: existingRun,
          idempotencyKeyHash,
          startedAt,
          target,
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
                summary: buildExecutionStartedSummary(target),
                occurredAt: startedAt,
              }),
            ],
          };

        await writeJsonFileAtomically(paths, runAbsolutePath, executingRun, existingRun);

        const killSwitchBeforeGeneration = await readSafeKillSwitchState(paths);
        if (killSwitchBeforeGeneration.killSwitchEngaged) {
          const blockedAt = nextPersistedIsoTimestamp(executingRun.updatedAt);
          const resultingRevision = executingRun.revision + 1;
          const blockedRun: PrivateAlphaRunRecord = {
            ...executingRun,
            updatedAt: blockedAt,
            state: "blocked",
            revision: resultingRevision,
            execution: buildBlockedExecutionRecord({
              run: executingRun,
              target,
              idempotencyKeyHash,
              blockedAt,
              previousRevision: executingRun.execution?.previousRevision ?? existingRun.revision,
              runningRevision: executingRun.execution?.runningRevision ?? executingRun.revision,
              resultingRevision,
              errorCode: "kill_switch_blocked",
              safeErrorMessage:
                "Execution was blocked by the private-alpha kill switch.",
              responseStatus: 409,
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
                summary: buildExecutionBlockedSummary(target, "kill-switch"),
                occurredAt: blockedAt,
              }),
            ],
          };

          await writeJsonFileAtomically(paths, runAbsolutePath, blockedRun, executingRun);
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
          const activeFence = RUN_LOCK_FENCE_CONTEXT.getStore();
          if (!activeFence || activeFence.runId !== existingRun.runId) {
            throw new PrivateAlphaStoreError(
              500,
              "Private-alpha execution is missing its mutation fence."
            );
          }
          await assertRunLockFence(paths, existingRun.runId, activeFence.owner);
          const generated = await resolvedProviderAdapter.generateApprovedText({
            approvedRequestText: existingRun.request.normalizedRequestText,
            model: target.model,
            maximumOutputTokens: existingRun.request.maximumOutputTokens,
          });
          await assertRunLockFence(paths, existingRun.runId, activeFence.owner);
          const completedAt = nextPersistedIsoTimestamp(executingRun.updatedAt);
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
              target,
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
                summary: buildExecutionSucceededSummary(target),
                occurredAt: completedAt,
              }),
            ],
          };

          await writeJsonFileAtomically(paths, runAbsolutePath, succeededRun, executingRun);
          return {
            replayed: false,
            run: succeededRun,
            responseStatus: 200,
            errorCode: null,
            safeErrorMessage: null,
          };
        } catch (error) {
          const isKnownLocalProviderError =
            error instanceof PrivateAlphaProviderError &&
            isLocalProviderExecutionErrorCode(error.code);
          const isKnownGroqProviderError =
            error instanceof PrivateAlphaProviderError &&
            isGroqProviderExecutionErrorCode(error.code);

          const failedAt = nextPersistedIsoTimestamp(executingRun.updatedAt);
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
            auditEvents: [
              ...executingRun.auditEvents,
            ],
          };

          if (target.kind === "local") {
            const errorCode: Exclude<
              PrivateAlphaLocalPersistedExecutionErrorCode,
              "kill_switch_blocked"
            > =
              isKnownLocalProviderError
                ? error.code
                : "ollama_http_error";
            const safeErrorMessage =
              isKnownLocalProviderError
                ? error.safeMessage
                : "Local Ollama execution failed unexpectedly.";
            const failureResponse = isKnownLocalProviderError
              ? {
                  errorCode,
                  safeErrorMessage,
                  responseStatus: resolvePersistedFailedExecutionResponseStatus(
                    errorCode,
                    safeErrorMessage
                  ),
                }
              : {
                  errorCode,
                  safeErrorMessage,
                  responseStatus: 500 as const,
                };
            const nextFailedRun: PrivateAlphaRunRecord = {
              ...failedRun,
              execution: buildFailedExecutionRecord({
                run: executingRun,
                target,
                failedAt,
                resultingRevision,
                errorCode,
                safeErrorMessage,
                responseStatus: failureResponse.responseStatus,
              }),
              auditEvents: [
                ...failedRun.auditEvents,
                buildAuditEvent({
                  eventType: "execution.failed",
                  actor: "system",
                  runId: executingRun.runId,
                  previousState: executingRun.state,
                  resultingState: "failed",
                  revision: resultingRevision,
                  summary: buildExecutionFailedSummary(target, errorCode),
                  occurredAt: failedAt,
                }),
              ],
            };

            await writeJsonFileAtomically(paths, runAbsolutePath, nextFailedRun, executingRun);

            return {
              replayed: false,
              run: nextFailedRun,
              responseStatus: failureResponse.responseStatus,
              errorCode: failureResponse.errorCode,
              safeErrorMessage: failureResponse.safeErrorMessage,
            };
          }

          const errorCode: Exclude<
            PrivateAlphaGroqPersistedExecutionErrorCode,
            "kill_switch_blocked"
          > =
            isKnownGroqProviderError
              ? error.code
              : "groq_http_error";
          const safeErrorMessage =
            isKnownGroqProviderError
              ? error.safeMessage
              : "Groq Cloud execution failed unexpectedly.";
          const failureResponse = isKnownGroqProviderError
            ? {
                errorCode,
                safeErrorMessage,
                responseStatus: resolvePersistedFailedExecutionResponseStatus(
                  errorCode,
                  safeErrorMessage
                ),
              }
            : {
                errorCode,
                safeErrorMessage,
                responseStatus: 500 as const,
              };
          const nextFailedRun: PrivateAlphaRunRecord = {
            ...failedRun,
            execution: buildFailedExecutionRecord({
              run: executingRun,
              target,
              failedAt,
              resultingRevision,
              errorCode,
              safeErrorMessage,
              responseStatus: failureResponse.responseStatus,
            }),
            auditEvents: [
              ...failedRun.auditEvents,
              buildAuditEvent({
                eventType: "execution.failed",
                actor: "system",
                runId: executingRun.runId,
                previousState: executingRun.state,
                resultingState: "failed",
                revision: resultingRevision,
                summary: buildExecutionFailedSummary(target, errorCode),
                occurredAt: failedAt,
              }),
            ],
          };

          await writeJsonFileAtomically(paths, runAbsolutePath, nextFailedRun, executingRun);

          return {
            replayed: false,
            run: nextFailedRun,
            responseStatus: failureResponse.responseStatus,
            errorCode: failureResponse.errorCode,
            safeErrorMessage: failureResponse.safeErrorMessage,
          };
        }
      });
    },

    async executeCreatorRun(runId, body, idempotencyKey, ownership) {
      return storeInternal.executeRun(runId, body, idempotencyKey, ownership);
    },
  };
  const store: PrivateAlphaStore = {
    getStatus: storeInternal.getStatus,
    createRun: (body, idempotencyKey) =>
      storeInternal.createRun(body, idempotencyKey),
    createCreatorRun: storeInternal.createCreatorRun,
    bindCreatorRun: storeInternal.bindCreatorRun,
    lookupRunByIdempotencyKeyHash: storeInternal.lookupRunByIdempotencyKeyHash,
    recoverCreatorRunByIdempotencyKey:
      storeInternal.recoverCreatorRunByIdempotencyKey,
    listRuns: storeInternal.listRuns,
    getRun: storeInternal.getRun,
    getCreatorRun: storeInternal.getCreatorRun,
    reconcileCreatorRunAfterInterruption:
      storeInternal.reconcileCreatorRunAfterInterruption,
    approveRun: (runId, body) => storeInternal.approveRun(runId, body),
    approveCreatorRun: storeInternal.approveCreatorRun,
    cancelRun: (runId, body) => storeInternal.cancelRun(runId, body),
    cancelCreatorRun: storeInternal.cancelCreatorRun,
    executeRun: (runId, body, idempotencyKey) =>
      storeInternal.executeRun(runId, body, idempotencyKey),
    executeCreatorRun: storeInternal.executeCreatorRun,
  };
  return store;
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
