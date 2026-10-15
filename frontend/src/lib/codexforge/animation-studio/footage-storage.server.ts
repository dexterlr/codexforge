import "server-only";
import { createHash, randomBytes } from "node:crypto";
import type { CreatorNativeRoot } from "@/lib/codexforge/creator/creator-native-filesystem.server";
import { assertCreatorJsonHasUniqueObjectKeys } from "@/lib/codexforge/creator/creator-contract.server";
import { serializeJarvisChatCanonicalJson as canonical } from "@/lib/codexforge/jarvis-chat/jarvis-chat-crypto";
import { STUDIO_FOOTAGE_LEGACY_BUFFER_MAX_BYTES, STUDIO_FOOTAGE_MAX_BYTES } from "./footage-contract";

export const STUDIO_FOOTAGE_CHUNK_BYTES = 524_288;
export const STUDIO_FOOTAGE_MAX_CHUNKS = 4096;
export const STUDIO_FOOTAGE_INDEX_MAX_BYTES = 524_288;
const CHUNK_BYTES = STUDIO_FOOTAGE_CHUNK_BYTES;
const MAX_CHUNKS = STUDIO_FOOTAGE_MAX_CHUNKS;
const MAX_INDEX_BYTES = STUDIO_FOOTAGE_INDEX_MAX_BYTES;
const FORMAT = "studio-footage-chunks-v1";
const HASH = /^[a-f0-9]{64}$/u;
type FootageChunk = { bytes: number; sha256: string };
type FootageIndex = { format: typeof FORMAT; contentHash: string; byteLength: number; chunkBytes: typeof CHUNK_BYTES; chunks: FootageChunk[] };
export interface StudioFootageByteSource {
  readonly byteLength: number;
  readonly contentHash: string;
  read(offset: number, length: number): Buffer;
}
export interface StudioFootageReader {
  readonly byteLength: number;
  readonly contentHash: string;
  read(offset: number, length: number): Buffer;
  verify(): void;
  close(): void;
}

export class StudioFootageStorageError extends Error {
  constructor(readonly code: "INVALID_FOOTAGE_PATH" | "INVALID_FOOTAGE_BYTES" | "CORRUPT_FOOTAGE", message: string) {
    super(message); this.name = "StudioFootageStorageError";
  }
}
const corrupt = (): never => { throw new StudioFootageStorageError("CORRUPT_FOOTAGE", "Stored footage failed bounded integrity verification."); };
const sha = (bytes: Buffer): string => createHash("sha256").update(bytes).digest("hex");
const validLength = (value: unknown): value is number => typeof value === "number" && Number.isSafeInteger(value) && value >= 1 && value <= STUDIO_FOOTAGE_MAX_BYTES && value <= CHUNK_BYTES * MAX_CHUNKS;

/** Only canonical VIDEO/AUDIO assets or managed native-version indexes are
 * accepted. Native versions reuse this qualified byte store; an index is not a .blend. */
function assetSegments(assetPath: string, expectedHash: string): string[] {
  const native = typeof assetPath === "string" && /^studio\/projects\/(project_[a-z0-9]+(?:_[a-z0-9]+)*)\/blender\/native-versions\/([a-f0-9]{64})\.blend\.json$/u.exec(assetPath);
  if (native && typeof expectedHash === "string" && HASH.test(expectedHash) && native[1].length <= 128 && native[2] === expectedHash) return assetPath.split("/");
  const match = typeof assetPath === "string" && /^studio\/projects\/(project_[a-z0-9]+(?:_[a-z0-9]+)*)\/(?:renders|assets\/audio)\/(asset_[a-z0-9]+(?:_[a-z0-9]+)*)\/v([1-9]\d*)\/([a-f0-9]{64})\.bin$/u.exec(assetPath);
  if (!match || typeof expectedHash !== "string" || !HASH.test(expectedHash) || match[4] !== expectedHash || match[1].length > 128 || match[2].length > 128 || !Number.isSafeInteger(Number(match[3]))) {
    throw new StudioFootageStorageError("INVALID_FOOTAGE_PATH", "Imported media requires an exact canonical video or audio asset path and content hash.");
  }
  return assetPath.split("/");
}
function partSegments(indexSegments: readonly string[], hash: string, index: number): string[] {
  return [...indexSegments.slice(0, -1), `${hash}.part-${String(index).padStart(4, "0")}.bin`];
}
function exactKeys(value: unknown, keys: readonly string[]): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value) && Object.keys(value).sort().join() === [...keys].sort().join();
}
function parseIndex(bytes: Buffer, expectedHash: string, expectedBytes: number): FootageIndex {
  if (!Buffer.isBuffer(bytes) || bytes.length < 1 || bytes.length > MAX_INDEX_BYTES || (bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf)) return corrupt();
  let value: unknown;
  try {
    const text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
    // Bound nesting before invoking the existing recursive duplicate-key scanner.
    let depth = 0, quoted = false, escaped = false;
    for (const char of text) {
      if (quoted) { if (escaped) escaped = false; else if (char === "\\") escaped = true; else if (char === '"') quoted = false; }
      else if (char === '"') quoted = true;
      else if (char === "{" || char === "[") { if (++depth > 3) return corrupt(); }
      else if (char === "}" || char === "]") { if (--depth < 0) return corrupt(); }
    }
    if (depth !== 0 || quoted) return corrupt();
    assertCreatorJsonHasUniqueObjectKeys(text);
    value = JSON.parse(text) as unknown;
  } catch { return corrupt(); }
  if (!exactKeys(value, ["format", "contentHash", "byteLength", "chunkBytes", "chunks"]) || value.format !== FORMAT || value.contentHash !== expectedHash || value.byteLength !== expectedBytes || !validLength(value.byteLength) || value.chunkBytes !== CHUNK_BYTES || !Array.isArray(value.chunks) || value.chunks.length !== Math.ceil(expectedBytes / CHUNK_BYTES) || value.chunks.length < 1 || value.chunks.length > MAX_CHUNKS) return corrupt();
  let total = 0;
  const chunks: FootageChunk[] = [];
  for (let index = 0; index < value.chunks.length; index++) {
    const chunk: unknown = value.chunks[index];
    const requiredBytes = Math.min(CHUNK_BYTES, expectedBytes - index * CHUNK_BYTES);
    if (!exactKeys(chunk, ["bytes", "sha256"]) || !Number.isSafeInteger(chunk.bytes) || chunk.bytes !== requiredBytes || typeof chunk.sha256 !== "string" || !HASH.test(chunk.sha256)) return corrupt();
    total += requiredBytes;
    chunks.push({ bytes: requiredBytes, sha256: chunk.sha256 });
  }
  if (total !== expectedBytes) return corrupt();
  return { format: FORMAT, contentHash: expectedHash, byteLength: expectedBytes, chunkBytes: CHUNK_BYTES, chunks };
}
function publishExact(root: CreatorNativeRoot, segments: readonly string[], bytes: Buffer, maximumBytes: number): void {
  try { root.writeAtomicExclusive(segments, `footage-${randomBytes(12).toString("hex")}.tmp`, bytes); }
  catch (error) {
    if ((error as { code?: string } | null)?.code !== "already_exists") throw error;
    const prior = root.readFile(segments, maximumBytes);
    if (!Buffer.isBuffer(prior) || !prior.equals(bytes)) return corrupt();
  }
}

/** Each native publication remains below 1 MiB. The staged file is read once in bounded chunks;
 * the complete hash is verified before index-last publication makes those parts reachable. */
export function writeStudioFootageSource(root: CreatorNativeRoot, assetPath: string, source: StudioFootageByteSource): void {
  if (!source || !validLength(source.byteLength) || typeof source.contentHash !== "string" || !HASH.test(source.contentHash) || typeof source.read !== "function") {
    throw new StudioFootageStorageError("INVALID_FOOTAGE_BYTES", "Imported media must expose a bounded, hash-bound staged byte source.");
  }
  const contentHash = source.contentHash, segments = assetSegments(assetPath, contentHash), complete = createHash("sha256");
  const chunks: FootageChunk[] = [];
  for (let offset = 0; offset < source.byteLength; offset += CHUNK_BYTES) {
    const required = Math.min(CHUNK_BYTES, source.byteLength - offset), part = source.read(offset, required);
    if (!Buffer.isBuffer(part) || part.length !== required) throw new StudioFootageStorageError("INVALID_FOOTAGE_BYTES", "The staged media source changed or returned an incomplete chunk.");
    complete.update(part);
    chunks.push({ bytes: part.length, sha256: sha(part) });
    publishExact(root, partSegments(segments, contentHash, chunks.length - 1), part, CHUNK_BYTES);
  }
  if (complete.digest("hex") !== contentHash) throw new StudioFootageStorageError("INVALID_FOOTAGE_BYTES", "The staged media source changed after upload verification.");
  const index: FootageIndex = { format: FORMAT, contentHash, byteLength: source.byteLength, chunkBytes: CHUNK_BYTES, chunks };
  const indexBytes = Buffer.from(canonical(index), "utf8");
  if (indexBytes.length > MAX_INDEX_BYTES) return corrupt();
  // A failure leaves only immutable unreferenced parts; never delete or overwrite them.
  publishExact(root, segments, indexBytes, MAX_INDEX_BYTES);
}

/** Legacy in-memory imports retain their public storage API and exact on-disk format. */
export function writeStudioFootage(root: CreatorNativeRoot, assetPath: string, bytes: Buffer): void {
  if (!Buffer.isBuffer(bytes) || !validLength(bytes.length) || bytes.length > STUDIO_FOOTAGE_LEGACY_BUFFER_MAX_BYTES) throw new StudioFootageStorageError("INVALID_FOOTAGE_BYTES", "Legacy whole-buffer footage must be nonempty and at most 16 MiB.");
  const contentHash = sha(bytes);
  writeStudioFootageSource(root, assetPath, { byteLength: bytes.length, contentHash, read: (offset, length) => bytes.subarray(offset, offset + length) });
}

/** Parse the immutable index once. Reads are capped at one chunk and verify every touched part. */
export function openStudioFootageSource(root: CreatorNativeRoot, assetPath: string, expectedHash: string, expectedBytes: number): StudioFootageReader {
  if (!validLength(expectedBytes)) return corrupt();
  const segments = assetSegments(assetPath, expectedHash);
  const index = parseIndex(root.readFile(segments, MAX_INDEX_BYTES), expectedHash, expectedBytes);
  let closed = false;
  const assertOpen = (): void => {
    if (closed) throw new StudioFootageStorageError("INVALID_FOOTAGE_BYTES", "The bounded footage reader is closed.");
  };
  const readPart = (ordinal: number): Buffer => {
    const chunk = index.chunks[ordinal];
    const part = root.readFile(partSegments(segments, expectedHash, ordinal), chunk.bytes);
    if (!Buffer.isBuffer(part) || part.length !== chunk.bytes || sha(part) !== chunk.sha256) return corrupt();
    return part;
  };
  return Object.freeze({
    byteLength: index.byteLength,
    contentHash: index.contentHash,
    read(offset: number, length: number): Buffer {
      assertOpen();
      if (!Number.isSafeInteger(offset) || offset < 0 || !Number.isSafeInteger(length) || length < 0 || length > CHUNK_BYTES || offset > index.byteLength || length > index.byteLength - offset) {
        throw new StudioFootageStorageError("INVALID_FOOTAGE_BYTES", "Footage range reads must remain within one bounded 512 KiB request.");
      }
      if (length === 0) return Buffer.alloc(0);
      const result = Buffer.allocUnsafe(length);
      let written = 0, position = offset;
      while (written < length) {
        const ordinal = Math.floor(position / CHUNK_BYTES), chunkOffset = position - ordinal * CHUNK_BYTES;
        const part = readPart(ordinal), count = Math.min(length - written, part.length - chunkOffset);
        if (count < 1) return corrupt();
        part.copy(result, written, chunkOffset, chunkOffset + count);
        written += count; position += count;
      }
      return result;
    },
    verify(): void {
      assertOpen();
      const complete = createHash("sha256");
      let total = 0;
      for (let ordinal = 0; ordinal < index.chunks.length; ordinal++) {
        const part = readPart(ordinal);
        complete.update(part); total += part.length;
      }
      if (total !== index.byteLength || complete.digest("hex") !== index.contentHash) return corrupt();
    },
    close(): void { closed = true; },
  });
}

/** Legacy whole-buffer reads remain available, but cannot assemble streamed large media in memory. */
export function readStudioFootage(root: CreatorNativeRoot, assetPath: string, expectedHash: string, expectedBytes: number): Buffer {
  if (!validLength(expectedBytes) || expectedBytes > STUDIO_FOOTAGE_LEGACY_BUFFER_MAX_BYTES) return corrupt();
  const reader = openStudioFootageSource(root, assetPath, expectedHash, expectedBytes);
  try {
    const result = Buffer.allocUnsafe(expectedBytes);
    const complete = createHash("sha256");
    let offset = 0;
    while (offset < expectedBytes) {
      const part = reader.read(offset, Math.min(CHUNK_BYTES, expectedBytes - offset));
      part.copy(result, offset); complete.update(part); offset += part.length;
    }
    if (offset !== expectedBytes || complete.digest("hex") !== expectedHash) return corrupt();
    return result;
  } finally { reader.close(); }
}
