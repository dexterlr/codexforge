import "server-only";

import { createHash, randomBytes } from "node:crypto";
import { closeSync, constants, fstatSync, lstatSync, openSync, readSync, realpathSync } from "node:fs";
import path from "node:path";
import type { CreatorNativeRoot } from "@/lib/codexforge/creator/creator-native-filesystem.server";
import { assertCreatorJsonHasUniqueObjectKeys } from "@/lib/codexforge/creator/creator-contract.server";
import { serializeJarvisChatCanonicalJson as canonical } from "@/lib/codexforge/jarvis-chat/jarvis-chat-crypto";
import type { StudioId } from "./domain";
import { STUDIO_RENDER_LIMITS, STUDIO_RENDER_OUTPUT_POLICY, type StudioRenderOutputRef } from "./editorial-v2-render-contract";
import { assertStudioId, resolveStudioPath } from "./workspace";

const FORMAT = "studio-render-output-chunks-v1" as const;
const CHUNK_BYTES = STUDIO_RENDER_OUTPUT_POLICY.chunkBytes;
const MAX_CHUNKS = STUDIO_RENDER_OUTPUT_POLICY.maximumChunks;
const MAX_INDEX_BYTES = 220_783;
const HASH = /^[a-f0-9]{64}$/u;
type OutputChunk = { ordinal: number; bytes: number; sha256: string };
type OutputIndex = {
  format: typeof FORMAT;
  projectId: StudioId<"project">;
  assetId: StudioId<"asset">;
  version: number;
  jobId: StudioId<"job">;
  headDigest: string;
  contentHash: string;
  byteLength: number;
  chunkBytes: typeof CHUNK_BYTES;
  chunks: OutputChunk[];
};

function maximumEncodedIndexBytes(): number {
  const id = (prefix: string): string => `${prefix}${"a".repeat(128 - prefix.length)}`;
  const hash = "f".repeat(64);
  const index: OutputIndex = {
    format: FORMAT,
    projectId: id("project_") as StudioId<"project">,
    assetId: id("asset_") as StudioId<"asset">,
    version: Number.MAX_SAFE_INTEGER,
    jobId: id("job_") as StudioId<"job">,
    headDigest: hash,
    contentHash: hash,
    byteLength: STUDIO_RENDER_OUTPUT_POLICY.outputBytes,
    chunkBytes: CHUNK_BYTES,
    chunks: Array.from({ length: MAX_CHUNKS }, (_, ordinal) => ({ ordinal, bytes: CHUNK_BYTES, sha256: hash })),
  };
  return Buffer.byteLength(canonical(index), "utf8");
}
if (STUDIO_RENDER_LIMITS.outputBytes !== STUDIO_RENDER_OUTPUT_POLICY.outputBytes || STUDIO_RENDER_OUTPUT_POLICY.outputBytes % CHUNK_BYTES !== 0 || STUDIO_RENDER_OUTPUT_POLICY.outputBytes / CHUNK_BYTES !== MAX_CHUNKS || maximumEncodedIndexBytes() !== MAX_INDEX_BYTES) throw new Error("Invalid Studio render output storage policy.");
export const STUDIO_RENDER_OUTPUT_STORAGE_POLICY = Object.freeze({ outputBytes: STUDIO_RENDER_OUTPUT_POLICY.outputBytes, chunkBytes: CHUNK_BYTES, maximumChunks: MAX_CHUNKS, maximumIndexBytes: MAX_INDEX_BYTES } as const);

export class StudioRenderOutputStorageError extends Error {
  constructor(readonly code: "RENDER_OUTPUT_INVALID" | "RENDER_OUTPUT_CORRUPT" | "RENDER_OUTPUT_UNAVAILABLE") {
    super(code);
    this.name = "StudioRenderOutputStorageError";
  }
}

const fail = (code: StudioRenderOutputStorageError["code"]): never => { throw new StudioRenderOutputStorageError(code); };
const sha = (bytes: Buffer): string => createHash("sha256").update(bytes).digest("hex");
const exact = (value: unknown, keys: readonly string[]): value is Record<string, unknown> => !!value && typeof value === "object" && !Array.isArray(value) && Object.keys(value).sort().join() === [...keys].sort().join();
const safeVersion = (value: unknown): value is number => Number.isSafeInteger(value) && Number(value) >= 1;

function outputDirectory(projectId: StudioId<"project">, assetId: StudioId<"asset">, version: number): string[] {
  try { assertStudioId(projectId, "project"); assertStudioId(assetId, "asset"); } catch { return fail("RENDER_OUTPUT_INVALID"); }
  if (!safeVersion(version)) return fail("RENDER_OUTPUT_INVALID");
  return [...resolveStudioPath(projectId, "masters").split("/"), assetId, `v${version}`];
}
function indexPath(projectId: StudioId<"project">, assetId: StudioId<"asset">, version: number, contentHash: string): string[] {
  if (!HASH.test(contentHash)) return fail("RENDER_OUTPUT_INVALID");
  return [...outputDirectory(projectId, assetId, version), `${contentHash}.mp4.json`];
}
function chunkPath(directory: readonly string[], chunk: OutputChunk): string[] {
  return [...directory, `chunk-${String(chunk.ordinal).padStart(4, "0")}-${chunk.sha256}.bin`];
}
function publishExact(root: CreatorNativeRoot, segments: readonly string[], bytes: Buffer, maximumBytes: number): void {
  try { root.writeAtomicExclusive(segments, `render-output-${randomBytes(12).toString("hex")}.tmp`, bytes); }
  catch (error) {
    if ((error as { code?: unknown })?.code !== "already_exists") throw error;
    let prior: Buffer;
    try { prior = root.readFile(segments, maximumBytes); } catch { return fail("RENDER_OUTPUT_CORRUPT"); }
    if (!prior.equals(bytes)) return fail("RENDER_OUTPUT_CORRUPT");
  }
}
function parseIndex(bytes: Buffer, expected: StudioRenderOutputRef): OutputIndex {
  if (!Buffer.isBuffer(bytes) || bytes.length < 1 || bytes.length > MAX_INDEX_BYTES || (bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf)) return fail("RENDER_OUTPUT_CORRUPT");
  let value: unknown;
  try {
    const text = new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(bytes);
    assertCreatorJsonHasUniqueObjectKeys(text);
    value = JSON.parse(text) as unknown;
    if (canonical(value) !== text) return fail("RENDER_OUTPUT_CORRUPT");
  } catch (error) { if (error instanceof StudioRenderOutputStorageError) throw error; return fail("RENDER_OUTPUT_CORRUPT"); }
  if (!exact(value, ["format", "projectId", "assetId", "version", "jobId", "headDigest", "contentHash", "byteLength", "chunkBytes", "chunks"]) || value.format !== FORMAT || value.assetId !== expected.assetId || value.version !== expected.version || value.jobId !== expected.jobId || value.headDigest !== expected.headDigest || value.contentHash !== expected.contentHash || value.byteLength !== expected.byteLength || value.chunkBytes !== CHUNK_BYTES || !Array.isArray(value.chunks) || value.chunks.length < 1 || value.chunks.length > MAX_CHUNKS || value.chunks.length !== Math.ceil(expected.byteLength / CHUNK_BYTES)) return fail("RENDER_OUTPUT_CORRUPT");
  if (!HASH.test(value.headDigest)) return fail("RENDER_OUTPUT_CORRUPT");
  try { assertStudioId(value.projectId, "project"); assertStudioId(value.assetId, "asset"); assertStudioId(value.jobId, "job"); } catch { return fail("RENDER_OUTPUT_CORRUPT"); }
  let total = 0;
  const chunks: OutputChunk[] = [];
  for (let ordinal = 0; ordinal < value.chunks.length; ordinal++) {
    const item = value.chunks[ordinal], required = Math.min(CHUNK_BYTES, expected.byteLength - ordinal * CHUNK_BYTES);
    if (!exact(item, ["ordinal", "bytes", "sha256"]) || item.ordinal !== ordinal || item.bytes !== required || typeof item.sha256 !== "string" || !HASH.test(item.sha256)) return fail("RENDER_OUTPUT_CORRUPT");
    chunks.push({ ordinal, bytes: required, sha256: item.sha256 }); total += required;
  }
  if (total !== expected.byteLength || expected.byteLength < 1 || expected.byteLength > STUDIO_RENDER_LIMITS.outputBytes) return fail("RENDER_OUTPUT_CORRUPT");
  return { format: FORMAT, projectId: value.projectId as StudioId<"project">, assetId: expected.assetId, version: expected.version, jobId: expected.jobId, headDigest: expected.headDigest, contentHash: expected.contentHash, byteLength: expected.byteLength, chunkBytes: CHUNK_BYTES, chunks };
}

export interface StudioRenderOutputReader {
  readonly contentType: "video/mp4";
  readonly byteLength: number;
  readonly contentHash: string;
  /** Returns at most one verified storage chunk, beginning at exact byte offset. */
  read(offset: number, maximumBytes?: number): Buffer;
}

export function publishStudioRenderOutput(root: CreatorNativeRoot, input: {
  projectId: StudioId<"project">;
  stagedPath: string;
  output: Omit<StudioRenderOutputRef, "contentHash" | "byteLength" | "storageManifestDigest">;
  workRoot: string;
}): StudioRenderOutputRef {
  if (!path.isAbsolute(input.stagedPath) || !path.isAbsolute(input.workRoot) || !input.stagedPath.toLowerCase().startsWith(path.resolve(input.workRoot).toLowerCase() + path.sep)) return fail("RENDER_OUTPUT_INVALID");
  try { assertStudioId(input.output.jobId, "job"); } catch { return fail("RENDER_OUTPUT_INVALID"); }
  if (!HASH.test(input.output.headDigest)) return fail("RENDER_OUTPUT_INVALID");
  let stagedReal: string, workReal: string, stat: ReturnType<typeof lstatSync>;
  try { workReal = realpathSync.native(path.resolve(input.workRoot)); stagedReal = realpathSync.native(path.resolve(input.stagedPath)); stat = lstatSync(stagedReal); }
  catch { return fail("RENDER_OUTPUT_UNAVAILABLE"); }
  if (!stagedReal.toLowerCase().startsWith(workReal.toLowerCase() + path.sep) || !stat.isFile() || stat.isSymbolicLink() || stat.size < 1 || stat.size > STUDIO_RENDER_LIMITS.outputBytes || !Number.isSafeInteger(stat.size)) return fail("RENDER_OUTPUT_INVALID");
  const directory = outputDirectory(input.projectId, input.output.assetId, input.output.version), chunks: OutputChunk[] = [], full = createHash("sha256");
  try { root.ensureDirectory(directory); } catch { return fail("RENDER_OUTPUT_UNAVAILABLE"); }
  let descriptor = -1;
  try {
    descriptor = openSync(stagedReal, constants.O_RDONLY);
    const opened = fstatSync(descriptor);
    if (!opened.isFile() || opened.size !== stat.size || opened.dev !== stat.dev || opened.ino !== stat.ino) return fail("RENDER_OUTPUT_UNAVAILABLE");
    for (let offset = 0, ordinal = 0; offset < opened.size; ordinal++) {
      const length = Math.min(CHUNK_BYTES, opened.size - offset), bytes = Buffer.allocUnsafe(length);
      let read = 0;
      while (read < length) { const count = readSync(descriptor, bytes, read, length - read, offset + read); if (count < 1) return fail("RENDER_OUTPUT_UNAVAILABLE"); read += count; }
      full.update(bytes);
      const chunk = { ordinal, bytes: length, sha256: sha(bytes) }; chunks.push(chunk);
      publishExact(root, chunkPath(directory, chunk), bytes, CHUNK_BYTES);
      offset += length;
    }
    const after = fstatSync(descriptor);
    if (after.size !== opened.size || after.mtimeMs !== opened.mtimeMs || after.dev !== opened.dev || after.ino !== opened.ino) return fail("RENDER_OUTPUT_UNAVAILABLE");
  } catch (error) { if (error instanceof StudioRenderOutputStorageError) throw error; return fail("RENDER_OUTPUT_UNAVAILABLE"); }
  finally { if (descriptor >= 0) try { closeSync(descriptor); } catch { /* Publication already fails closed before ledger completion. */ } }
  const contentHash = full.digest("hex"), byteLength = stat.size;
  const index: OutputIndex = { format: FORMAT, projectId: input.projectId, assetId: input.output.assetId, version: input.output.version, jobId: input.output.jobId, headDigest: input.output.headDigest, contentHash, byteLength, chunkBytes: CHUNK_BYTES, chunks };
  const bytes = Buffer.from(canonical(index), "utf8");
  if (bytes.length > MAX_INDEX_BYTES) return fail("RENDER_OUTPUT_INVALID");
  const output: StudioRenderOutputRef = { ...input.output, contentHash, byteLength, storageManifestDigest: sha(bytes) };
  publishExact(root, indexPath(input.projectId, output.assetId, output.version, output.contentHash), bytes, MAX_INDEX_BYTES);
  return output;
}

export function openStudioRenderOutput(root: CreatorNativeRoot, projectId: StudioId<"project">, expected: StudioRenderOutputRef): StudioRenderOutputReader {
  let index: OutputIndex;
  try {
    const bytes = root.readFile(indexPath(projectId, expected.assetId, expected.version, expected.contentHash), MAX_INDEX_BYTES);
    if (!HASH.test(expected.storageManifestDigest) || sha(bytes) !== expected.storageManifestDigest) return fail("RENDER_OUTPUT_CORRUPT");
    index = parseIndex(bytes, expected);
  }
  catch (error) { if (error instanceof StudioRenderOutputStorageError) throw error; return fail("RENDER_OUTPUT_UNAVAILABLE"); }
  if (index.projectId !== projectId) return fail("RENDER_OUTPUT_CORRUPT");
  const directory = outputDirectory(projectId, expected.assetId, expected.version);
  return Object.freeze({
    contentType: "video/mp4" as const,
    byteLength: expected.byteLength,
    contentHash: expected.contentHash,
    read(offset: number, maximumBytes = CHUNK_BYTES): Buffer {
      if (!Number.isSafeInteger(offset) || offset < 0 || offset >= index.byteLength || !Number.isSafeInteger(maximumBytes) || maximumBytes < 1 || maximumBytes > CHUNK_BYTES) return fail("RENDER_OUTPUT_INVALID");
      const ordinal = Math.floor(offset / CHUNK_BYTES), chunk = index.chunks[ordinal], inside = offset - ordinal * CHUNK_BYTES;
      let bytes: Buffer;
      try { bytes = root.readFile(chunkPath(directory, chunk), chunk.bytes); } catch { return fail("RENDER_OUTPUT_UNAVAILABLE"); }
      if (bytes.length !== chunk.bytes || sha(bytes) !== chunk.sha256) return fail("RENDER_OUTPUT_CORRUPT");
      return Buffer.from(bytes.subarray(inside, Math.min(chunk.bytes, inside + maximumBytes)));
    },
  });
}

export const STUDIO_RENDER_OUTPUT_CHUNK_BYTES = CHUNK_BYTES;
