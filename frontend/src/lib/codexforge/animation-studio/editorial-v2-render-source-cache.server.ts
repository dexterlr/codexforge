import "server-only";

import type { Asset } from "./domain";
import type { StudioRenderSourceDescriptor } from "./editorial-v2-render-contract";
import { hashJarvisChatCanonicalJson as digest, hashJarvisChatSha256 as sha } from "@/lib/codexforge/jarvis-chat/jarvis-chat-crypto";
import { STUDIO_FOOTAGE_LEGACY_BUFFER_MAX_BYTES } from "./footage-contract";

const HASH = /^[a-f0-9]{64}$/u;
const CAPACITY = 256;
const CACHE_KEY = Symbol.for("codexforge.studio.render-source-descriptor-cache.v1");
type CacheEntry = { descriptor: StudioRenderSourceDescriptor; lastUsed: number };
type CacheHost = Record<symbol, unknown>;

export class StudioRenderSourceCacheError extends Error {
  constructor(readonly code: "RENDER_SOURCE_CACHE_INVALID" | "RENDER_SOURCE_UNAVAILABLE") { super(code); this.name = "StudioRenderSourceCacheError"; }
}
const fail = (code: StudioRenderSourceCacheError["code"]): never => { throw new StudioRenderSourceCacheError(code); };
function cache(): Map<string, CacheEntry> {
  const host = process as unknown as CacheHost, existing = host[CACHE_KEY];
  if (existing instanceof Map) return existing as Map<string, CacheEntry>;
  const created = new Map<string, CacheEntry>(); Object.defineProperty(process, CACHE_KEY, { value: created, configurable: true, enumerable: false, writable: false }); return created;
}
function manifest(asset: Asset): string {
  if (!asset || !["VIDEO", "AUDIO"].includes(asset.assetType) || !HASH.test(asset.contentHash) || asset.provenance?.contentHash !== asset.contentHash || typeof asset.sourcePath !== "string" || !asset.sourcePath) return fail("RENDER_SOURCE_CACHE_INVALID");
  return digest(asset);
}

/** Metadata-only cache. Callers create both identity digests exclusively from
 * server-selected repository-root/storage bindings; no request value belongs in
 * either digest. The execution path intentionally does not use this function. */
export function readCachedStudioRenderSourceDescriptor(input: {
  repositoryRootIdentityDigest: string;
  snapshotRecordDigest: string;
  storageBindingDigest: string;
  asset: Asset;
  readExactBytes: () => Buffer;
}): StudioRenderSourceDescriptor {
  if (![input.repositoryRootIdentityDigest, input.snapshotRecordDigest, input.storageBindingDigest].every(value => typeof value === "string" && HASH.test(value)) || typeof input.readExactBytes !== "function") return fail("RENDER_SOURCE_CACHE_INVALID");
  const assetManifestDigest = manifest(input.asset), key = digest({ format: "studio-render-source-descriptor-cache-key-v1", repositoryRootIdentityDigest: input.repositoryRootIdentityDigest, snapshotRecordDigest: input.snapshotRecordDigest, storageBindingDigest: input.storageBindingDigest, assetManifestDigest, contentHash: input.asset.contentHash });
  const values = cache(), hit = values.get(key);
  if (hit) { values.delete(key); values.set(key, { descriptor: hit.descriptor, lastUsed: Date.now() }); return structuredClone(hit.descriptor); }
  let bytes: Buffer;
  try { bytes = input.readExactBytes(); } catch { return fail("RENDER_SOURCE_UNAVAILABLE"); }
  if (!Buffer.isBuffer(bytes) || bytes.length < 12 || bytes.length > STUDIO_FOOTAGE_LEGACY_BUFFER_MAX_BYTES || sha(bytes) !== input.asset.contentHash) return fail("RENDER_SOURCE_UNAVAILABLE");
  const contentType = input.asset.assetType === "VIDEO"
    ? (bytes.toString("ascii", 4, 8) === "ftyp" ? "video/mp4" as const : null)
    : (bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WAVE" ? "audio/wav" as const : null);
  if (!contentType) return fail("RENDER_SOURCE_UNAVAILABLE");
  const descriptor: StudioRenderSourceDescriptor = { asset: structuredClone(input.asset), byteLength: bytes.length, contentType };
  values.set(key, { descriptor, lastUsed: Date.now() });
  while (values.size > CAPACITY) values.delete(values.keys().next().value as string);
  return structuredClone(descriptor);
}

export const STUDIO_RENDER_SOURCE_DESCRIPTOR_CACHE_CAPACITY = CAPACITY;
