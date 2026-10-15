import "server-only";

import { createHash, randomBytes } from "node:crypto";
import {
  closeSync, constants, fstatSync, fsyncSync, lstatSync, openSync, readSync,
  realpathSync, statfsSync, unlinkSync, writeSync, type Stats,
} from "node:fs";
import path from "node:path";
import { loadCreatorNativeFilesystem, type CreatorNativeRoot } from "@/lib/codexforge/creator/creator-native-filesystem.server";
import { hashJarvisChatCanonicalJson as digest, serializeJarvisChatCanonicalJson as canonical } from "@/lib/codexforge/jarvis-chat/jarvis-chat-crypto";
import {
  FootageValidationError, STUDIO_FOOTAGE_MAX_BYTES, footageImportMediaType, validateFootageImport,
  type FootageImportInput, type StudioLocalMediaKind,
} from "./footage-contract";
import {
  qualifyStudioMediaImportFile, StudioMediaImportError,
  type StagedStudioMediaImport,
} from "./footage-import.server";
import { readStudioRenderConfiguration, type StudioRenderConfiguration } from "./editorial-v2-render-config.server";
import {
  assertStudioFootageUploadRequest, OperatorHttpError, studioOperatorFailureResponse,
} from "./operator-http.server";
import { parseStudioJson, StudioStoreError, type StudioRepository } from "./store.server";
import { assertStudioCompatibilityImportAllowed } from "./readonly-compatibility-binding.server";

export const STUDIO_FOOTAGE_UPLOAD_ENDPOINT = "/api/codexforge/animation-studio/footage/upload";
export const STUDIO_FOOTAGE_UPLOAD_MAX_BYTES = STUDIO_FOOTAGE_MAX_BYTES;
export const STUDIO_FOOTAGE_UPLOAD_CHUNK_BYTES = 8 * 1024 * 1024;
export const STUDIO_FOOTAGE_UPLOAD_STORAGE_RESERVE_BYTES = 4 * 1024 * 1024 * 1024;

const SESSION_ROOT = "footage-upload-sessions-v1";
const SESSION_LIMIT = 128;
const STATE_MAX_BYTES = 65_536;
const JSON_BODY_MAX_BYTES = 16_384;
const METADATA_MAX_BYTES = 8_192;
const BODY_DEADLINE_MS = 60_000;
const EMPTY_BODY_DEADLINE_MS = 5_000;
const EMPTY_BODY_MAX_CHUNKS = 16;
const HASH = /^[a-f0-9]{64}$/u;
const SESSION_ID = /^upload_[a-f0-9]{48}$/u;
const INSTANCE_ID = randomBytes(16).toString("hex");
const ACTIVE_CLAIM = ["active.json"] as const;
const HEADERS = { "Cache-Control": "no-store", "Content-Security-Policy": "default-src 'none'; sandbox", "X-Content-Type-Options": "nosniff" };
const ACTIVE_STATES = new Set<UploadStatus>(["UPLOADING", "VERIFYING", "PROBING", "PUBLISHING"]);
const TERMINAL_STATES = new Set<UploadStatus>(["COMPLETE", "CANCELLED", "FAILED"]);
const FINALIZING = new Set<string>();
const CHUNK_WRITES = new Set<string>();

type UploadStatus = "UPLOADING" | "VERIFYING" | "PROBING" | "PUBLISHING" | "COMPLETE" | "INTERRUPTED" | "CANCELLED" | "FAILED";
type UploadChunk = Readonly<{ offset: number; bytes: number; sha256: string }>;
type UploadCompletion = Readonly<{ projectId: string; result: unknown }>;
type UploadState = Readonly<{
  format: "studio-footage-upload-session-v1";
  sessionId: string;
  keyHash: string;
  requestDigest: string;
  metadata: string;
  input: FootageImportInput;
  mediaType: StudioLocalMediaKind;
  expectedBytes: number;
  receivedBytes: number;
  chunks: readonly UploadChunk[];
  status: UploadStatus;
  ownerInstance: string;
  createdAt: string;
  updatedAt: string;
  contentHash: string | null;
  completion: UploadCompletion | null;
  errorCode: string | null;
}>;
type Claim = Readonly<{
  format: "studio-footage-upload-claim-v1";
  sessionId: string;
  keyHash: string;
  ownerInstance: string;
  createdAt: string;
}>;
type Stored<T> = Readonly<{ value: T; bytes: Buffer }>;
type RepositoryWithCapacity = StudioRepository & {
  assertFootageImportCapacity(input: unknown, expectedBytes: number): void;
};

export type StudioFootageUploadHandlerOptions = Readonly<{
  enabled: boolean;
  openRepository: () => StudioRepository;
  listenerAddresses?: () => readonly string[] | null;
  now?: () => string;
  configuration?: (forceHash: boolean) => StudioRenderConfiguration;
  qualifyImport?: (input: Readonly<{ sourcePath: string; mediaType: StudioLocalMediaKind; expectedBytes: number; expectedHash: string }>) => Promise<StagedStudioMediaImport>;
}>;

const reply = (body: unknown, status = 200): Response => Response.json(body, { status, headers: HEADERS });
const http = (status: number, code: string, message: string): never => { throw new OperatorHttpError(status, code, message); };
const sha = (bytes: Uint8Array | string): string => createHash("sha256").update(bytes).digest("hex");
const plain = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null && Object.getPrototypeOf(value) === Object.prototype;
const errorCode = (error: unknown): unknown => (error as { code?: unknown } | null)?.code;
const exactKeys = (value: Record<string, unknown>, keys: readonly string[]): boolean => Object.keys(value).sort().join() === [...keys].sort().join();

function failure(error: unknown): Response {
  if (error instanceof StudioMediaImportError) return reply({ ok: false, error: { code: error.code, message: error.message } }, error.status);
  if (error instanceof FootageValidationError) return reply({ ok: false, error: { code: error.code, message: error.message } }, error.code === "FOOTAGE_PROJECT_LIMIT" ? 409 : 400);
  if (error instanceof StudioStoreError && error.code === "ACTIVE_SHOT_JOB") return reply({ ok: false, error: { code: error.code, message: "Finish or reconcile the active shot job before importing footage." } }, 409);
  if (error instanceof StudioStoreError && error.code === "IMPORT_METADATA_CONFLICT") return reply({ ok: false, error: { code: error.code, message: error.message } }, 409);
  return studioOperatorFailureResponse(error);
}
function configuration(options: StudioFootageUploadHandlerOptions, forceHash = false): StudioRenderConfiguration {
  return options.configuration?.(forceHash) ?? readStudioRenderConfiguration(process.env, { forceHash });
}
function root(configurationValue: StudioRenderConfiguration): CreatorNativeRoot {
  const workRoot = realpathSync.native(configurationValue.workRoot);
  const parent = path.dirname(workRoot), leaf = path.basename(workRoot);
  if (!leaf || path.parse(workRoot).root.toLowerCase() !== "c:\\" || parent === workRoot) return http(503, "upload_storage_unavailable", "The local upload-session root is invalid.");
  // The native filesystem requires an exact chain of at least two segments. Pinning
  // the existing work-root leaf below its canonical parent keeps all session state
  // inside the renderer's already-qualified C: workspace.
  return new (loadCreatorNativeFilesystem().Root)(parent, [leaf, SESSION_ROOT], "persistent");
}
function stateBytes(state: UploadState): Buffer {
  const bytes = Buffer.from(canonical(state), "utf8");
  if (bytes.length < 2 || bytes.length > STATE_MAX_BYTES) return http(503, "upload_state_unavailable", "The bounded local upload-session record could not be stored safely.");
  return bytes;
}
function parseState(bytes: Buffer): UploadState {
  let value: unknown;
  try { value = parseStudioJson(new TextDecoder("utf-8", { fatal: true }).decode(bytes)); }
  catch { return http(503, "upload_state_unavailable", "The local upload-session record failed integrity validation."); }
  const keys = ["format", "sessionId", "keyHash", "requestDigest", "metadata", "input", "mediaType", "expectedBytes", "receivedBytes", "chunks", "status", "ownerInstance", "createdAt", "updatedAt", "contentHash", "completion", "errorCode"];
  if (!plain(value) || !exactKeys(value, keys) || value.format !== "studio-footage-upload-session-v1" || typeof value.sessionId !== "string" || !SESSION_ID.test(value.sessionId) || typeof value.keyHash !== "string" || !HASH.test(value.keyHash) || typeof value.requestDigest !== "string" || !HASH.test(value.requestDigest) || typeof value.metadata !== "string" || value.metadata.length < 2 || value.metadata.length > METADATA_MAX_BYTES || !["VIDEO", "AUDIO"].includes(String(value.mediaType)) || !Number.isSafeInteger(value.expectedBytes) || Number(value.expectedBytes) < 1 || Number(value.expectedBytes) > STUDIO_FOOTAGE_UPLOAD_MAX_BYTES || !Number.isSafeInteger(value.receivedBytes) || Number(value.receivedBytes) < 0 || Number(value.receivedBytes) > Number(value.expectedBytes) || !Array.isArray(value.chunks) || value.chunks.length > Math.ceil(STUDIO_FOOTAGE_UPLOAD_MAX_BYTES / STUDIO_FOOTAGE_UPLOAD_CHUNK_BYTES) || ![...ACTIVE_STATES, ...TERMINAL_STATES, "INTERRUPTED"].includes(value.status as UploadStatus) || typeof value.ownerInstance !== "string" || !/^[a-f0-9]{32}$/u.test(value.ownerInstance) || typeof value.createdAt !== "string" || typeof value.updatedAt !== "string" || !Number.isFinite(Date.parse(value.createdAt)) || !Number.isFinite(Date.parse(value.updatedAt)) || value.contentHash !== null && (typeof value.contentHash !== "string" || !HASH.test(value.contentHash)) || value.errorCode !== null && (typeof value.errorCode !== "string" || !/^[A-Z0-9_]{1,80}$/u.test(value.errorCode))) {
    return http(503, "upload_state_unavailable", "The local upload-session record failed integrity validation.");
  }
  let input: FootageImportInput;
  try { input = validateFootageImport(value.input); }
  catch { return http(503, "upload_state_unavailable", "The local upload-session metadata failed integrity validation."); }
  if (footageImportMediaType(input) !== value.mediaType) return http(503, "upload_state_unavailable", "The local upload-session media type failed integrity validation.");
  const expectedBytes = Number(value.expectedBytes), receivedBytes = Number(value.receivedBytes);
  let total = 0;
  const chunks: UploadChunk[] = [];
  for (const item of value.chunks) {
    if (!plain(item) || !exactKeys(item, ["offset", "bytes", "sha256"]) || !Number.isSafeInteger(item.offset) || item.offset !== total || !Number.isSafeInteger(item.bytes) || Number(item.bytes) < 1 || Number(item.bytes) > STUDIO_FOOTAGE_UPLOAD_CHUNK_BYTES || typeof item.sha256 !== "string" || !HASH.test(item.sha256)) return http(503, "upload_state_unavailable", "The local upload-session acknowledgement list failed integrity validation.");
    total += Number(item.bytes); chunks.push({ offset: Number(item.offset), bytes: Number(item.bytes), sha256: item.sha256 });
  }
  if (total !== receivedBytes || total > expectedBytes || value.status === "COMPLETE" && (!plain(value.completion) || typeof value.completion.projectId !== "string") || value.status !== "COMPLETE" && value.completion !== null) return http(503, "upload_state_unavailable", "The local upload-session totals failed integrity validation.");
  return {
    format: "studio-footage-upload-session-v1",
    sessionId: value.sessionId as string,
    keyHash: value.keyHash as string,
    requestDigest: value.requestDigest as string,
    metadata: value.metadata as string,
    input,
    mediaType: value.mediaType as StudioLocalMediaKind,
    expectedBytes,
    receivedBytes,
    chunks,
    status: value.status as UploadStatus,
    ownerInstance: value.ownerInstance as string,
    createdAt: value.createdAt as string,
    updatedAt: value.updatedAt as string,
    contentHash: value.contentHash as string | null,
    completion: value.completion as UploadCompletion | null,
    errorCode: value.errorCode as string | null,
  };
}
function readState(store: CreatorNativeRoot, sessionId: string): Stored<UploadState> {
  if (!SESSION_ID.test(sessionId)) return http(400, "invalid_upload_session", "Use the exact opaque upload-session identity returned by the local server.");
  let bytes: Buffer;
  try { bytes = store.readFile([sessionId, "state.json"], STATE_MAX_BYTES); }
  catch (error) { if (errorCode(error) === "not_found") return http(404, "upload_session_not_found", "The local upload session was not found."); throw error; }
  const value = parseState(bytes);
  if (value.sessionId !== sessionId) return http(503, "upload_state_unavailable", "The local upload-session identity failed integrity validation.");
  return { value, bytes };
}
function replaceState(store: CreatorNativeRoot, prior: Stored<UploadState>, next: UploadState): Stored<UploadState> {
  const bytes = stateBytes(next);
  store.writeAtomicReplace([next.sessionId, "state.json"], `state-${randomBytes(12).toString("hex")}.tmp`, bytes, prior.bytes, null, null);
  return { value: next, bytes };
}
function parseClaim(bytes: Buffer): Claim {
  let value: unknown;
  try { value = parseStudioJson(new TextDecoder("utf-8", { fatal: true }).decode(bytes)); } catch { return http(503, "upload_claim_unavailable", "The local upload claim failed integrity validation."); }
  if (!plain(value) || !exactKeys(value, ["format", "sessionId", "keyHash", "ownerInstance", "createdAt"]) || value.format !== "studio-footage-upload-claim-v1" || typeof value.sessionId !== "string" || !SESSION_ID.test(value.sessionId) || typeof value.keyHash !== "string" || !HASH.test(value.keyHash) || typeof value.ownerInstance !== "string" || !/^[a-f0-9]{32}$/u.test(value.ownerInstance) || typeof value.createdAt !== "string" || !Number.isFinite(Date.parse(value.createdAt))) return http(503, "upload_claim_unavailable", "The local upload claim failed integrity validation.");
  return value as Claim;
}
function readClaim(store: CreatorNativeRoot): Stored<Claim> | null {
  let bytes: Buffer;
  try { bytes = store.readFile(ACTIVE_CLAIM, 4096); }
  catch (error) { if (errorCode(error) === "not_found") return null; throw error; }
  return { value: parseClaim(bytes), bytes };
}
function publishClaim(store: CreatorNativeRoot, claim: Claim): Stored<Claim> {
  const bytes = Buffer.from(canonical(claim), "utf8");
  if (bytes.length > 4096) return http(503, "upload_claim_unavailable", "The local upload claim exceeded its fixed bound.");
  store.writeAtomicExclusive(ACTIVE_CLAIM, `claim-${randomBytes(12).toString("hex")}.tmp`, bytes);
  return { value: claim, bytes };
}
function releaseClaim(store: CreatorNativeRoot, sessionId: string): void {
  const claim = readClaim(store);
  if (!claim || claim.value.sessionId !== sessionId) return;
  store.compareDeleteExact(ACTIVE_CLAIM, claim.bytes);
}
function availableBytes(directory: string): number {
  const value = statfsSync(directory), available = value.bavail * value.bsize;
  if (!Number.isSafeInteger(available) || available < 0) return http(503, "upload_storage_unavailable", "Available local upload storage could not be measured safely.");
  return available;
}
function assertStorage(configurationValue: StudioRenderConfiguration, expectedBytes: number): void {
  const required = expectedBytes * 2 + STUDIO_FOOTAGE_UPLOAD_STORAGE_RESERVE_BYTES;
  if (!Number.isSafeInteger(required) || availableBytes(configurationValue.workRoot) < required) return http(507, "insufficient_upload_storage", "The local C: upload workspace cannot preserve the source, publication copy and fixed 4 GiB reserve.");
}
function sessionDirectory(configurationValue: StudioRenderConfiguration, sessionId: string): string {
  const work = realpathSync.native(configurationValue.workRoot), candidate = path.resolve(work, SESSION_ROOT, sessionId), relative = path.relative(work, candidate);
  if (!SESSION_ID.test(sessionId) || !relative || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative) || path.parse(candidate).root.toLowerCase() !== "c:\\") return http(503, "upload_storage_unavailable", "The local upload-session path is invalid.");
  const stat = lstatSync(candidate), real = realpathSync.native(candidate);
  if (!stat.isDirectory() || stat.isSymbolicLink() || real.toLowerCase() !== candidate.toLowerCase()) return http(503, "upload_storage_unavailable", "The local upload-session directory changed unexpectedly.");
  return real;
}
function sourcePath(configurationValue: StudioRenderConfiguration, state: Pick<UploadState, "sessionId" | "mediaType">): string {
  return path.join(sessionDirectory(configurationValue, state.sessionId), state.mediaType === "VIDEO" ? "source.mp4" : "source.wav");
}
function sourceStat(file: string, expectedMaximum: number): Stats {
  const stat = lstatSync(file), real = realpathSync.native(file);
  if (!stat.isFile() || stat.isSymbolicLink() || !Number.isSafeInteger(stat.size) || stat.size < 0 || stat.size > expectedMaximum || real.toLowerCase() !== path.resolve(file).toLowerCase()) return http(503, "upload_storage_unavailable", "The local upload staging file changed unexpectedly.");
  return stat;
}
function createSource(configurationValue: StudioRenderConfiguration, state: UploadState): void {
  const file = sourcePath(configurationValue, state), noFollow = process.platform !== "win32" && typeof constants.O_NOFOLLOW === "number" ? constants.O_NOFOLLOW : 0;
  let handle: number | null = null;
  try { handle = openSync(file, constants.O_WRONLY | constants.O_CREAT | constants.O_EXCL | noFollow, 0o600); fsyncSync(handle); }
  finally { if (handle !== null) closeSync(handle); }
  if (sourceStat(file, state.expectedBytes).size !== 0) return http(503, "upload_storage_unavailable", "The local upload staging file was not created empty.");
}
function readSource(file: string, offset: number, length: number, expectedMaximum: number): Buffer {
  const before = sourceStat(file, expectedMaximum), noFollow = process.platform !== "win32" && typeof constants.O_NOFOLLOW === "number" ? constants.O_NOFOLLOW : 0, result = Buffer.allocUnsafe(length);
  if (offset < 0 || length < 1 || offset + length > before.size) return http(409, "upload_offset_conflict", "The requested upload bytes are outside the durably acknowledged source.");
  const handle = openSync(file, constants.O_RDONLY | noFollow);
  try {
    const opened = fstatSync(handle);
    if (!opened.isFile() || opened.dev !== before.dev || opened.ino !== before.ino || opened.size !== before.size) return http(503, "upload_storage_unavailable", "The local upload staging handle changed unexpectedly.");
    let total = 0;
    while (total < length) { const count = readSync(handle, result, total, length - total, offset + total); if (count < 1) return http(503, "upload_storage_unavailable", "The local upload staging file returned incomplete bytes."); total += count; }
  } finally { closeSync(handle); }
  const after = sourceStat(file, expectedMaximum);
  if (after.dev !== before.dev || after.ino !== before.ino || after.size !== before.size) return http(503, "upload_storage_unavailable", "The local upload staging file changed during verification.");
  return result;
}
function appendSource(file: string, offset: number, bytes: Buffer, expectedMaximum: number): void {
  const before = sourceStat(file, expectedMaximum);
  if (before.size !== offset || offset + bytes.length > expectedMaximum) return http(409, "upload_offset_conflict", "Upload chunks must begin at the exact next acknowledged byte.");
  const noFollow = process.platform !== "win32" && typeof constants.O_NOFOLLOW === "number" ? constants.O_NOFOLLOW : 0, handle = openSync(file, constants.O_WRONLY | noFollow);
  try {
    const opened = fstatSync(handle);
    if (!opened.isFile() || opened.dev !== before.dev || opened.ino !== before.ino || opened.size !== before.size) return http(503, "upload_storage_unavailable", "The local upload staging handle changed unexpectedly.");
    let written = 0;
    while (written < bytes.length) { const count = writeSync(handle, bytes, written, bytes.length - written, offset + written); if (count < 1) return http(503, "upload_storage_unavailable", "The upload chunk could not be written completely."); written += count; }
    fsyncSync(handle);
  } finally { closeSync(handle); }
  const after = sourceStat(file, expectedMaximum);
  if (after.dev !== before.dev || after.ino !== before.ino || after.size !== offset + bytes.length) return http(503, "upload_storage_unavailable", "The upload chunk was not durably staged at its exact offset.");
}
function hashSource(file: string, expectedBytes: number): string {
  if (sourceStat(file, expectedBytes).size !== expectedBytes) return http(409, "upload_incomplete", "Finalization requires every expected source byte.");
  const hash = createHash("sha256"), block = Buffer.allocUnsafe(1024 * 1024), noFollow = process.platform !== "win32" && typeof constants.O_NOFOLLOW === "number" ? constants.O_NOFOLLOW : 0, handle = openSync(file, constants.O_RDONLY | noFollow);
  let total = 0;
  try {
    const opened = fstatSync(handle);
    if (!opened.isFile() || opened.size !== expectedBytes) return http(503, "upload_storage_unavailable", "The finalized staging handle changed unexpectedly.");
    while (total < expectedBytes) { const count = readSync(handle, block, 0, Math.min(block.length, expectedBytes - total), total); if (count < 1) return http(503, "upload_storage_unavailable", "The finalized staging file returned incomplete bytes."); hash.update(block.subarray(0, count)); total += count; }
  } finally { closeSync(handle); }
  if (total !== expectedBytes || sourceStat(file, expectedBytes).size !== expectedBytes) return http(503, "upload_storage_unavailable", "The finalized staging file changed during hashing.");
  return hash.digest("hex");
}
function cleanupSource(store: CreatorNativeRoot, configurationValue: StudioRenderConfiguration, state: UploadState): void {
  const file = sourcePath(configurationValue, state);
  try {
    const stat = sourceStat(file, state.expectedBytes);
    if (stat.size > state.expectedBytes) return http(503, "upload_cleanup_failed", "The owned upload staging file could not be identified for cleanup.");
    unlinkSync(file);
  } catch (error) { if (errorCode(error) !== "ENOENT" && errorCode(error) !== "not_found") throw error; }
  try { store.removeTree([state.sessionId, "temp"]); } catch (error) { if (errorCode(error) !== "not_found") throw error; }
}
async function boundedBody(request: Request, maximum: number, contentType: string): Promise<Buffer> {
  if (request.headers.get("Content-Type")?.toLowerCase() !== contentType || request.headers.has("Content-Encoding")) return http(415, "content_type_required", `This upload operation requires ${contentType} without content encoding.`);
  const declaredText = request.headers.get("Content-Length");
  if (declaredText !== null && (!/^(?:0|[1-9]\d*)$/u.test(declaredText) || Number(declaredText) > maximum)) return http(413, "upload_body_too_large", `This upload request is limited to ${maximum} bytes.`);
  if (!request.body || request.signal.aborted) return http(400, "upload_body_required", "A complete non-cancelled request body is required.");
  const reader = request.body.getReader(), chunks: Buffer[] = [];
  let total = 0, timer: ReturnType<typeof setTimeout> | undefined, abortReject: ((reason: unknown) => void) | undefined;
  const aborted = new Promise<never>((_, reject) => { abortReject = reject; });
  const abort = () => { abortReject?.(new OperatorHttpError(408, "upload_interrupted", "The upload request was interrupted before its bytes were acknowledged.")); void reader.cancel().catch(() => undefined); };
  const deadline = new Promise<never>((_, reject) => { timer = setTimeout(() => { reject(new OperatorHttpError(408, "upload_timeout", "The bounded upload request did not finish within 60 seconds.")); void reader.cancel().catch(() => undefined); }, BODY_DEADLINE_MS); });
  request.signal.addEventListener("abort", abort, { once: true });
  try {
    if (request.signal.aborted) abort();
    while (true) {
      const part = await Promise.race([reader.read(), aborted, deadline]);
      if (part.done) break;
      if (!(part.value instanceof Uint8Array)) return http(400, "upload_body_invalid", "The upload body was not a binary byte stream.");
      total += part.value.byteLength;
      if (total > maximum) { void reader.cancel().catch(() => undefined); return http(413, "upload_body_too_large", `This upload request is limited to ${maximum} bytes.`); }
      if (part.value.byteLength) chunks.push(Buffer.from(part.value));
    }
  } finally {
    if (timer) clearTimeout(timer);
    request.signal.removeEventListener("abort", abort);
    try { reader.releaseLock(); } catch { /* request owns cancellation */ }
  }
  if (request.signal.aborted || total < 1 || declaredText !== null && Number(declaredText) !== total) return http(400, "upload_body_incomplete", "Received bytes do not match the declared complete request body.");
  return Buffer.concat(chunks, total);
}
async function jsonBody(request: Request): Promise<Record<string, unknown>> {
  const bytes = await boundedBody(request, JSON_BODY_MAX_BYTES, request.headers.get("Content-Type")?.toLowerCase() === "application/json; charset=utf-8" ? "application/json; charset=utf-8" : "application/json");
  let parsed: unknown;
  try { parsed = parseStudioJson(new TextDecoder("utf-8", { fatal: true }).decode(bytes)); } catch { return http(400, "invalid_upload_request", "The upload-session request must be unambiguous UTF-8 JSON without a BOM."); }
  if (!plain(parsed)) return http(400, "invalid_upload_request", "The upload-session request must be one JSON object.");
  return parsed;
}
function decodeMetadata(encoded: unknown): { encoded: string; input: FootageImportInput } {
  if (typeof encoded !== "string" || encoded.length < 2 || encoded.length > METADATA_MAX_BYTES || /[^\x21-\x7e]/u.test(encoded)) return http(400, "invalid_upload_metadata", "Bounded canonical encoded import metadata is required.");
  let decoded: string;
  try { decoded = decodeURIComponent(encoded); if (encodeURIComponent(decoded) !== encoded) return http(400, "invalid_upload_metadata", "Import metadata encoding is not canonical."); }
  catch { return http(400, "invalid_upload_metadata", "Import metadata encoding is invalid."); }
  let input: FootageImportInput;
  try { input = validateFootageImport(parseStudioJson(decoded)); }
  catch (error) { if (error instanceof FootageValidationError) throw error; return http(400, "invalid_upload_metadata", "Import metadata is invalid or ambiguous."); }
  return { encoded, input };
}
function requestKey(request: Request): string {
  const key = request.headers.get("Idempotency-Key");
  if (!key || !/^[A-Za-z0-9_-]{8,128}$/u.test(key)) return http(400, "invalid_idempotency_key", "Use one stable 8–128 character request key for this exact upload session.");
  return key;
}
async function noBody(request: Request): Promise<void> {
  const contentLength = request.headers.get("Content-Length");
  if (contentLength !== null && contentLength !== "0" || request.headers.has("Transfer-Encoding") || request.headers.has("Content-Encoding") || request.headers.has("Content-Type")) return http(400, "unexpected_upload_body", "This upload-session operation accepts no request body.");
  const interrupted = () => new OperatorHttpError(408, "upload_body_interrupted", "The empty upload-session request could not be verified completely. Inspect the saved session before another action.");
  if (request.signal.aborted || request.bodyUsed || request.body?.locked) throw interrupted();
  if (request.body === null) return;
  // Next adapts even a bodyless Node PATCH/DELETE to a stream. Neither that
  // stream's existence nor Content-Length: 0 proves its actual byte content.
  const reader = request.body.getReader();
  let rejectInterrupted: ((reason: unknown) => void) | undefined;
  let complete = false, emptyChunks = 0;
  const stopped = new Promise<never>((_, reject) => { rejectInterrupted = reject; });
  const stop = () => { rejectInterrupted?.(interrupted()); void reader.cancel().catch(() => undefined); };
  const timer = setTimeout(stop, EMPTY_BODY_DEADLINE_MS);
  request.signal.addEventListener("abort", stop, { once: true });
  try {
    if (request.signal.aborted) stop();
    while (true) {
      const part = await Promise.race([reader.read(), stopped]);
      if (request.signal.aborted) throw interrupted();
      if (part.done) { complete = true; return; }
      if (!(part.value instanceof Uint8Array) || part.value.byteLength !== 0 || ++emptyChunks > EMPTY_BODY_MAX_CHUNKS) return http(400, "unexpected_upload_body", "This upload-session operation accepts no request body.");
    }
  } catch (error) {
    if (error instanceof OperatorHttpError) throw error;
    throw interrupted();
  } finally {
    if (timer) clearTimeout(timer);
    request.signal.removeEventListener("abort", stop);
    if (!complete) void reader.cancel().catch(() => undefined);
    try { reader.releaseLock(); } catch { /* cancellation owns an outstanding read */ }
  }
}
function query(url: URL, names: readonly string[]): Record<string, string> {
  if ([...url.searchParams.keys()].sort().join() !== [...names].sort().join() || names.some(name => url.searchParams.getAll(name).length !== 1)) return http(400, "invalid_upload_query", "Use only the exact upload-session query fields for this operation.");
  return Object.fromEntries(names.map(name => [name, url.searchParams.get(name)!]));
}
function view(state: UploadState): Record<string, unknown> {
  return {
    sessionId: state.sessionId, status: state.status, projectId: state.input.projectId, mediaType: state.mediaType, originalName: state.input.originalName,
    expectedBytes: state.expectedBytes, receivedBytes: state.receivedBytes, acknowledgedChunks: state.chunks.length,
    chunkBytes: STUDIO_FOOTAGE_UPLOAD_CHUNK_BYTES, maximumSourceBytes: STUDIO_FOOTAGE_UPLOAD_MAX_BYTES,
    canUpload: state.status === "UPLOADING", canFinalize: ["UPLOADING", "INTERRUPTED"].includes(state.status) && state.receivedBytes === state.expectedBytes,
    canCancel: !["COMPLETE", "CANCELLED"].includes(state.status), errorCode: state.errorCode, completion: state.completion,
  };
}
function findByKey(store: CreatorNativeRoot, keyHash: string): Stored<UploadState> | null {
  const names = store.listDirectory([]).filter(name => SESSION_ID.test(name)).sort();
  if (names.length > SESSION_LIMIT) return http(503, "upload_session_capacity", "The bounded local upload-session ledger requires operator cleanup.");
  for (const name of names) { const current = readState(store, name); if (current.value.keyHash === keyHash) return current; }
  return null;
}
function pruneOldestTerminalSession(store: CreatorNativeRoot, configurationValue: StudioRenderConfiguration): void {
  const names = store.listDirectory([]).filter(name => SESSION_ID.test(name)).sort();
  if (names.length < SESSION_LIMIT) return;
  if (names.length > SESSION_LIMIT) return http(503, "upload_session_capacity", "The bounded local upload-session ledger requires operator cleanup.");
  const claim = readClaim(store);
  const terminal = names
    .map(name => readState(store, name))
    .filter(item => TERMINAL_STATES.has(item.value.status) && item.value.sessionId !== claim?.value.sessionId)
    .sort((left, right) => left.value.updatedAt.localeCompare(right.value.updatedAt) || left.value.sessionId.localeCompare(right.value.sessionId))[0];
  if (!terminal) return http(503, "upload_session_capacity", "The bounded local upload-session ledger is full of non-terminal sessions that require explicit recovery or cancellation.");
  cleanupSource(store, configurationValue, terminal.value);
  store.removeTree([terminal.value.sessionId]);
}
function createSession(store: CreatorNativeRoot, configurationValue: StudioRenderConfiguration, state: UploadState): Stored<UploadState> {
  store.createDirectoryExclusive([state.sessionId]);
  const bytes = stateBytes(state);
  try {
    store.writeAtomicExclusive([state.sessionId, "state.json"], `state-${randomBytes(12).toString("hex")}.tmp`, bytes);
    createSource(configurationValue, state);
    publishClaim(store, { format: "studio-footage-upload-claim-v1", sessionId: state.sessionId, keyHash: state.keyHash, ownerInstance: INSTANCE_ID, createdAt: state.createdAt });
    return { value: state, bytes };
  } catch (error) {
    try { store.removeTree([state.sessionId]); } catch { /* preserve first failure */ }
    throw error;
  }
}
function replayOrConflict(existing: Stored<UploadState>, requestDigest: string): Response {
  if (existing.value.requestDigest !== requestDigest) return http(409, "idempotency_conflict", "This request key is already bound to different upload-session inputs.");
  return reply({ ok: true, result: view(existing.value), replayed: true });
}
function assertActiveClaim(store: CreatorNativeRoot, state: UploadState): void {
  const claim = readClaim(store);
  if (!claim || claim.value.sessionId !== state.sessionId || claim.value.keyHash !== state.keyHash) return http(409, "upload_claim_conflict", "This upload session does not own the single durable local import slot.");
}
function markInterrupted(store: CreatorNativeRoot, current: Stored<UploadState>, now: string): Stored<UploadState> {
  if (!ACTIVE_STATES.has(current.value.status) || FINALIZING.has(current.value.sessionId)) return current;
  return replaceState(store, current, { ...current.value, status: "INTERRUPTED", ownerInstance: INSTANCE_ID, updatedAt: now, errorCode: "UPLOAD_INTERRUPTED" });
}
function updateAfterChunk(store: CreatorNativeRoot, current: Stored<UploadState>, chunk: Buffer, now: string): Stored<UploadState> {
  const nextChunk = { offset: current.value.receivedBytes, bytes: chunk.length, sha256: sha(chunk) };
  return replaceState(store, current, { ...current.value, receivedBytes: current.value.receivedBytes + chunk.length, chunks: [...current.value.chunks, nextChunk], ownerInstance: INSTANCE_ID, updatedAt: now, errorCode: null });
}
function cleanupTerminal(store: CreatorNativeRoot, configurationValue: StudioRenderConfiguration, state: UploadState): void {
  cleanupSource(store, configurationValue, state); releaseClaim(store, state.sessionId);
}
function clearProbeTemporary(store: CreatorNativeRoot, sessionId: string): void {
  try { store.removeTree([sessionId, "temp"]); } catch (error) { if (errorCode(error) !== "not_found") throw error; }
}

export function createStudioFootageUploadHandler(options: StudioFootageUploadHandlerOptions): (request: Request) => Promise<Response> {
  const clock = options.now ?? (() => new Date().toISOString());
  const qualifyImport = options.qualifyImport ?? qualifyStudioMediaImportFile;
  return async request => {
    let store: CreatorNativeRoot | null = null;
    try {
      if (!options.enabled) throw new OperatorHttpError(503, "studio_disabled", "Enable the isolated local Studio before creating a footage upload session.");
      if (!["GET", "POST", "PUT", "PATCH", "DELETE"].includes(request.method)) throw new OperatorHttpError(405, "method_not_allowed", "Upload sessions support create, append, inspect, finalize and cancel only.");
      const url = assertStudioFootageUploadRequest(request, options.listenerAddresses?.());
      if (url.pathname !== STUDIO_FOOTAGE_UPLOAD_ENDPOINT) return http(400, "invalid_upload_request", "Unexpected upload-session endpoint.");
      assertStudioCompatibilityImportAllowed();
      const config = configuration(options, false); store = root(config);

      if (request.method === "POST") {
        if (url.search) return http(400, "invalid_upload_query", "Upload-session creation accepts no query fields.");
        const key = requestKey(request), keyHash = sha(key), body = await jsonBody(request);
        if (!exactKeys(body, ["metadata", "expectedBytes"]) || !Number.isSafeInteger(body.expectedBytes) || Number(body.expectedBytes) < 1 || Number(body.expectedBytes) > STUDIO_FOOTAGE_UPLOAD_MAX_BYTES) return http(413, "source_size_out_of_range", "Choose a non-empty source no larger than the configured 2 GiB import ceiling.");
        const decoded = decodeMetadata(body.metadata), expectedBytes = Number(body.expectedBytes), requestDigest = digest({ metadata: decoded.encoded, expectedBytes });
        const existing = findByKey(store, keyHash);
        if (existing) {
          if (existing.value.requestDigest !== requestDigest) return replayOrConflict(existing, requestDigest);
          const existingClaim = readClaim(store);
          const canRecoverClaim = ACTIVE_STATES.has(existing.value.status) || existing.value.status === "INTERRUPTED" && existing.value.receivedBytes === existing.value.expectedBytes;
          if (canRecoverClaim) {
            if (!existingClaim) publishClaim(store, { format: "studio-footage-upload-claim-v1", sessionId: existing.value.sessionId, keyHash, ownerInstance: INSTANCE_ID, createdAt: existing.value.createdAt });
            else if (existingClaim.value.sessionId !== existing.value.sessionId) return reply({ ok: false, error: { code: "import_busy", message: "Another local upload session owns the bounded import slot." }, result: view(readState(store, existingClaim.value.sessionId).value) }, 409);
          } else if (existingClaim?.value.sessionId === existing.value.sessionId && TERMINAL_STATES.has(existing.value.status)) cleanupTerminal(store, config, existing.value);
          return replayOrConflict(existing, requestDigest);
        }
        pruneOldestTerminalSession(store, config);
        const claim = readClaim(store);
        if (claim) {
          const active = readState(store, claim.value.sessionId);
          if (TERMINAL_STATES.has(active.value.status)) { cleanupTerminal(store, config, active.value); }
          else return reply({ ok: false, error: { code: "import_busy", message: "Another local upload session owns the bounded import slot. Inspect or cancel that exact session before creating another." }, result: view(active.value) }, 409);
        }
        let repository: StudioRepository | null = null;
        try { repository = options.openRepository(); (repository as RepositoryWithCapacity).assertFootageImportCapacity(decoded.input, expectedBytes); }
        finally { repository?.close(); }
        assertStorage(config, expectedBytes);
        if (store.listDirectory([]).filter(name => SESSION_ID.test(name)).length >= SESSION_LIMIT) return http(503, "upload_session_capacity", "The bounded local upload-session ledger requires operator cleanup.");
        const now = clock(), sessionId = `upload_${randomBytes(24).toString("hex")}`;
        const state: UploadState = { format: "studio-footage-upload-session-v1", sessionId, keyHash, requestDigest, metadata: decoded.encoded, input: decoded.input, mediaType: footageImportMediaType(decoded.input), expectedBytes, receivedBytes: 0, chunks: [], status: "UPLOADING", ownerInstance: INSTANCE_ID, createdAt: now, updatedAt: now, contentHash: null, completion: null, errorCode: null };
        let created: Stored<UploadState>;
        try { created = createSession(store, config, state); }
        catch (error) {
          if (errorCode(error) !== "already_exists") throw error;
          const active = readClaim(store);
          if (!active) throw error;
          return reply({ ok: false, error: { code: "import_busy", message: "Another local upload session acquired the bounded import slot." }, result: view(readState(store, active.value.sessionId).value) }, 409);
        }
        return reply({ ok: true, result: view(created.value), replayed: false }, 201);
      }

      if (request.method === "GET") {
        await noBody(request); const values = query(url, ["sessionId"]), observed = readState(store, values.sessionId), current = CHUNK_WRITES.has(values.sessionId) ? observed : markInterrupted(store, observed, clock());
        return reply({ ok: true, result: view(current.value) });
      }

      if (request.method === "PUT") {
        const values = query(url, ["sessionId", "offset"]);
        if (!/^(?:0|[1-9]\d*)$/u.test(values.offset) || !Number.isSafeInteger(Number(values.offset))) return http(400, "invalid_upload_offset", "Use the exact nonnegative acknowledged byte offset.");
        const current = readState(store, values.sessionId), offset = Number(values.offset);
        if (current.value.status !== "UPLOADING") return reply({ ok: false, error: { code: "upload_not_writable", message: "This upload session is not accepting more bytes. Inspect it and use its explicit recovery action." }, result: view(current.value) }, 409);
        if (CHUNK_WRITES.has(current.value.sessionId) || FINALIZING.has(current.value.sessionId)) return reply({ ok: false, error: { code: "upload_busy", message: "This upload session already has an active bounded mutation." }, result: view(current.value) }, 409);
        assertActiveClaim(store, current.value);
        CHUNK_WRITES.add(current.value.sessionId);
        try {
          const chunk = await boundedBody(request, STUDIO_FOOTAGE_UPLOAD_CHUNK_BYTES, "application/octet-stream"), file = sourcePath(config, current.value), chunkHash = sha(chunk);
          if (offset < current.value.receivedBytes) {
            const prior = current.value.chunks.find(item => item.offset === offset);
            if (!prior || prior.bytes !== chunk.length || prior.sha256 !== chunkHash || !readSource(file, offset, chunk.length, current.value.expectedBytes).equals(chunk)) return http(409, "upload_chunk_conflict", "Replacement bytes conflict with the exact chunk already acknowledged at this offset.");
            return reply({ ok: true, result: view(current.value), duplicate: true });
          }
          if (offset !== current.value.receivedBytes || offset + chunk.length > current.value.expectedBytes) return http(409, "upload_offset_conflict", "Upload chunks must begin at the exact next acknowledged byte and stay within the expected source length.");
          const observedSize = sourceStat(file, current.value.expectedBytes).size;
          if (observedSize === offset) appendSource(file, offset, chunk, current.value.expectedBytes);
          else if (observedSize === offset + chunk.length) {
            if (!readSource(file, offset, chunk.length, current.value.expectedBytes).equals(chunk)) return http(409, "upload_chunk_conflict", "Unacknowledged durable bytes conflict with this exact retry.");
          } else return http(409, "upload_interrupted", "The staged byte length differs from its durable acknowledgement. Inspect and cancel this session before restarting.");
          try {
            const updated = updateAfterChunk(store, current, chunk, clock());
            return reply({ ok: true, result: view(updated.value), duplicate: false });
          } catch (error) {
            if (errorCode(error) !== "compare_mismatch") throw error;
            const latest = readState(store, current.value.sessionId), prior = latest.value.chunks.find(item => item.offset === offset);
            if (prior?.bytes === chunk.length && prior.sha256 === chunkHash && readSource(file, offset, chunk.length, latest.value.expectedBytes).equals(chunk)) return reply({ ok: true, result: view(latest.value), duplicate: true });
            throw error;
          }
        } finally { CHUNK_WRITES.delete(current.value.sessionId); }
      }

      if (request.method === "DELETE") {
        await noBody(request); const values = query(url, ["sessionId"]), current = readState(store, values.sessionId);
        if (FINALIZING.has(current.value.sessionId) || CHUNK_WRITES.has(current.value.sessionId)) return reply({ ok: false, error: { code: "upload_busy", message: "A bounded upload mutation is active; wait for its exact result before cancelling." }, result: view(current.value) }, 409);
        if (current.value.status === "COMPLETE") return reply({ ok: false, error: { code: "upload_complete", message: "The completed immutable import cannot be cancelled through its upload session." }, result: view(current.value) }, 409);
        let cancelled = current;
        if (current.value.status !== "CANCELLED") cancelled = replaceState(store, current, { ...current.value, status: "CANCELLED", ownerInstance: INSTANCE_ID, updatedAt: clock(), errorCode: "UPLOAD_CANCELLED" });
        cleanupTerminal(store, config, cancelled.value);
        return reply({ ok: true, result: view(cancelled.value) });
      }

      await noBody(request); const values = query(url, ["sessionId"]), key = requestKey(request), first = readState(store, values.sessionId);
      if (sha(key) !== first.value.keyHash) return http(409, "idempotency_conflict", "The finalization key differs from the key that created this upload session.");
      if (first.value.status === "COMPLETE") {
        let repository: StudioRepository | null = null;
        try {
          cleanupTerminal(store, config, first.value);
          repository = options.openRepository();
          return reply({ ok: true, result: { ...view(first.value), snapshot: repository.loadManifest(first.value.input.projectId) }, replayed: true });
        }
        finally { repository?.close(); }
      }
      if (!["UPLOADING", "INTERRUPTED"].includes(first.value.status) || first.value.receivedBytes !== first.value.expectedBytes) return reply({ ok: false, error: { code: "upload_incomplete", message: "Finalization requires every expected byte and an upload or explicitly interrupted state." }, result: view(first.value) }, 409);
      if (FINALIZING.has(first.value.sessionId) || CHUNK_WRITES.has(first.value.sessionId)) return reply({ ok: false, error: { code: "upload_busy", message: "This exact upload session already has an active bounded mutation." }, result: view(first.value) }, 409);
      assertActiveClaim(store, first.value);
      assertStorage(config, first.value.expectedBytes); FINALIZING.add(first.value.sessionId);
      let current = replaceState(store, first, { ...first.value, status: "VERIFYING", ownerInstance: INSTANCE_ID, updatedAt: clock(), errorCode: null });
      let staged: StagedStudioMediaImport | null = null, repository: StudioRepository | null = null;
      try {
        const file = sourcePath(config, current.value), contentHash = hashSource(file, current.value.expectedBytes);
        current = replaceState(store, current, { ...current.value, status: "PROBING", contentHash, updatedAt: clock() });
        clearProbeTemporary(store, current.value.sessionId);
        staged = await qualifyImport({ sourcePath: file, mediaType: current.value.mediaType, expectedBytes: current.value.expectedBytes, expectedHash: contentHash });
        if (request.signal.aborted) throw new StudioMediaImportError("MEDIA_UPLOAD_CANCELLED", 408, "Finalization was interrupted before immutable publication. Inspect this upload session before any retry.");
        current = replaceState(store, current, { ...current.value, status: "PUBLISHING", updatedAt: clock() });
        repository = options.openRepository();
        const result = repository.importFootageFile(current.value.input, staged, key, "local-studio-footage-upload-session");
        const snapshot = repository.loadManifest(current.value.input.projectId), completedState: UploadState = { ...current.value, status: "COMPLETE", updatedAt: clock(), completion: { projectId: current.value.input.projectId, result }, errorCode: null };
        current = replaceState(store, current, completedState);
        staged.close(); staged = null; repository.close(); repository = null;
        cleanupTerminal(store, config, current.value);
        return reply({ ok: true, result: { ...view(current.value), snapshot }, replayed: false });
      } catch (error) {
        // Immutable publication may have succeeded immediately before completion
        // state or cleanup failed. A durable COMPLETE record must never be
        // downgraded; its exact-key replay retries only bounded cleanup/readback.
        if (current.value.status === "COMPLETE") throw error;
        const terminal = error instanceof StudioMediaImportError && error.status < 500 && error.code !== "MEDIA_UPLOAD_CANCELLED";
        let recoveryFailure: unknown = null;
        try {
          const latest = readState(store, current.value.sessionId);
          current = replaceState(store, latest, { ...latest.value, status: terminal ? "FAILED" : "INTERRUPTED", ownerInstance: INSTANCE_ID, updatedAt: clock(), errorCode: terminal ? "MEDIA_REJECTED" : "FINALIZATION_INTERRUPTED" });
          if (terminal) cleanupTerminal(store, config, current.value);
        } catch (recoveryError) { recoveryFailure = recoveryError; }
        if (recoveryFailure) throw recoveryFailure;
        throw error;
      } finally {
        try { staged?.close(); } finally { repository?.close(); FINALIZING.delete(first.value.sessionId); }
      }
    } catch (error) { return failure(error); }
    finally { store?.close(); }
  };
}
