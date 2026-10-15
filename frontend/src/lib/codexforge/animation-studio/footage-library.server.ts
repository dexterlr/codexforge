import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { realpathSync, statfsSync } from "node:fs";
import { CODEXFORGE_PROJECT_ROOT } from "@/lib/codexforge/server-safe-paths";
import { loadCreatorNativeFilesystem, type CreatorNativeRoot } from "@/lib/codexforge/creator/creator-native-filesystem.server";
import { serializeJarvisChatCanonicalJson as canonical } from "@/lib/codexforge/jarvis-chat/jarvis-chat-crypto";
import { STUDIO_FOOTAGE_LEGACY_BUFFER_MAX_BYTES, STUDIO_FOOTAGE_MAX_BYTES, type FootageStorageBinding } from "./footage-contract";
import { openStudioFootageSource, readStudioFootage, writeStudioFootageSource, type StudioFootageByteSource, type StudioFootageReader } from "./footage-storage.server";
import { readStudioCompatibilityBinding } from "./readonly-compatibility-binding.server";

const DRIVE_ROOT = "D:/CodexForge";
const LIBRARY_PARENT = [".codexforge", "media-libraries"] as const;
const WORKSPACE_MARKER = ["studio", "media-library.json"] as const;
const DRIVE_MARKER = ["media-library.json"] as const;
const MARKER_LIMIT = 4096;
export const STUDIO_FOOTAGE_PUBLICATION_RESERVE_BYTES = 4 * 1024 * 1024 * 1024;
type Scope = Readonly<{ workspace: "development" | "test"; namespace?: string }>;
type Destination = "workspace" | "d-drive";
type Options = Readonly<{
  workspaceRoot: CreatorNativeRoot;
  workspaceScope: Scope;
  importDestination: Destination;
  /** Deterministic test seam; production callers use the native filesystem capacity probe. */
  availableBytes?: (destination: Destination) => number;
}>;
export type StudioFootagePublicationFence = Readonly<{ path: readonly string[]; expected: Buffer }>;

/** Storage faults are deliberately not definitive input/conflict errors: an import may be unresolved. */
export class StudioFootageLibraryError extends Error {
  constructor(readonly code: "FOOTAGE_LIBRARY_UNAVAILABLE" | "FOOTAGE_LIBRARY_CONFIGURATION") {
    super(code === "FOOTAGE_LIBRARY_CONFIGURATION" ? "Footage storage configuration is invalid." : "The bound footage library is unavailable or failed integrity verification.");
    this.name = "StudioFootageLibraryError";
  }
}
const unavailable = (): never => { throw new StudioFootageLibraryError("FOOTAGE_LIBRARY_UNAVAILABLE"); };
const configuration = (): never => { throw new StudioFootageLibraryError("FOOTAGE_LIBRARY_CONFIGURATION"); };
const errorCode = (error: unknown): unknown => (error as { code?: unknown } | null)?.code;
function plain(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && Object.getPrototypeOf(value) === Object.prototype && Reflect.ownKeys(value).every(key => {
    const descriptor = Object.getOwnPropertyDescriptor(value, key)!;
    return typeof key === "string" && descriptor.enumerable && "value" in descriptor;
  });
}
function scopeValue(value: unknown): Scope {
  if (!plain(value) || Object.keys(value).some(key => key !== "workspace" && key !== "namespace")) return configuration();
  if (value.workspace === "development" && value.namespace === undefined) return { workspace: "development" };
  if (value.workspace === "test" && typeof value.namespace === "string" && /^[a-z0-9][a-z0-9-]{7,63}$/u.test(value.namespace)) return { workspace: "test", namespace: value.namespace };
  return configuration();
}
function readMarker(root: CreatorNativeRoot, segments: readonly string[], expected: Buffer, optional = false): boolean {
  let value: Buffer;
  try { value = root.readFile(segments, MARKER_LIMIT); }
  catch (error) { if (optional && errorCode(error) === "not_found") return false; throw error; }
  // Exact canonical bytes reject duplicate keys, BOM, unknown fields and alternate encodings without parsing.
  if (!Buffer.isBuffer(value) || !value.equals(expected)) return unavailable();
  return true;
}
function publishMarker(root: CreatorNativeRoot, segments: readonly string[], expected: Buffer): void {
  try { root.writeAtomicExclusive(segments, `media-library-${randomBytes(12).toString("hex")}.tmp`, expected); }
  catch (error) { if (errorCode(error) !== "already_exists") throw error; }
  readMarker(root, segments, expected);
}
function byteSource(value: Buffer | StudioFootageByteSource): StudioFootageByteSource {
  if (Buffer.isBuffer(value)) {
    if (value.length < 1 || value.length > STUDIO_FOOTAGE_LEGACY_BUFFER_MAX_BYTES) return unavailable();
    const contentHash = createHash("sha256").update(value).digest("hex");
    return { byteLength: value.length, contentHash, read: (offset, length) => value.subarray(offset, offset + length) };
  }
  if (!value || typeof value !== "object" || !Number.isSafeInteger(value.byteLength) || typeof value.contentHash !== "string" || typeof value.read !== "function") return unavailable();
  return value;
}
function validateWrite(assetPath: string, source: StudioFootageByteSource): void {
  // Validate before provisioning; the chunk helper independently checks the same bounded canonical location.
  if (!Number.isSafeInteger(source.byteLength) || source.byteLength < 1 || source.byteLength > STUDIO_FOOTAGE_MAX_BYTES || !/^[a-f0-9]{64}$/u.test(source.contentHash)) return unavailable();
  const match = typeof assetPath === "string" && /^studio\/projects\/(project_[a-z0-9]+(?:_[a-z0-9]+)*)\/(?:renders|assets\/audio)\/(asset_[a-z0-9]+(?:_[a-z0-9]+)*)\/v([1-9]\d*)\/([a-f0-9]{64})\.bin$/u.exec(assetPath);
  if (!match || match[4] !== source.contentHash || match[1].length > 128 || match[2].length > 128 || !Number.isSafeInteger(Number(match[3]))) return unavailable();
}

/** C owns manifests; D owns only explicitly bound immutable media. No drive probing occurs at construction/destination. */
export function createStudioFootageLibrary(options: Options) {
  if (!plain(options) || Object.keys(options).some(key => key !== "availableBytes" && key !== "importDestination" && key !== "workspaceRoot" && key !== "workspaceScope") ||
      !Object.hasOwn(options, "importDestination") || !Object.hasOwn(options, "workspaceRoot") || !Object.hasOwn(options, "workspaceScope") || !options.workspaceRoot ||
      (options.importDestination !== "workspace" && options.importDestination !== "d-drive") || (options.availableBytes !== undefined && typeof options.availableBytes !== "function")) return configuration();
  const scope = scopeValue(options.workspaceScope), workspaceRoot = options.workspaceRoot, importDestination = options.importDestination;
  let projectRoot: string;
  try { projectRoot = realpathSync.native(CODEXFORGE_PROJECT_ROOT).replaceAll("\\", "/"); }
  catch { return configuration(); }
  const compatibility = readStudioCompatibilityBinding(scope);
  if (compatibility && importDestination !== "workspace") return configuration();
  const libraryId = compatibility?.libraryId ?? createHash("sha256").update(canonical({ format: "studio-footage-library-identity-v1", projectRoot, scope })).digest("hex");
  const expectedBinding: FootageStorageBinding = { storageLocation: "codexforge-media-d-v1", libraryId };
  const marker = Buffer.from(canonical({ format: "studio-footage-library-v1", ...expectedBinding }), "utf8");
  const rootSegments = [...LIBRARY_PARENT, libraryId];
  let closed = false;
  const openReaders = new Set<StudioFootageReader>();
  const assertOpen = () => { if (closed) unavailable(); };
  function assertBinding(binding: FootageStorageBinding): void {
    if (!plain(binding) || Object.keys(binding).sort().join() !== "libraryId,storageLocation" || binding.storageLocation !== expectedBinding.storageLocation || binding.libraryId !== libraryId) unavailable();
  }
  function guarded<T>(operation: () => T): T {
    try { return operation(); }
    catch { return unavailable(); }
  }
  function openExisting(): CreatorNativeRoot {
    return new (loadCreatorNativeFilesystem().Root)(DRIVE_ROOT, rootSegments, "existing");
  }
  function availableBytes(destination: Destination): number {
    if (options.availableBytes) return options.availableBytes(destination);
    const stats = statfsSync(destination === "workspace" ? CODEXFORGE_PROJECT_ROOT : DRIVE_ROOT);
    return stats.bavail * stats.bsize;
  }
  function preflightSpace(destination: Destination, byteLength: number): void {
    let available: number;
    try { available = availableBytes(destination); }
    catch { return unavailable(); }
    if (!Number.isSafeInteger(available) || available < byteLength + STUDIO_FOOTAGE_PUBLICATION_RESERVE_BYTES) return unavailable();
  }
  function trackReader(reader: StudioFootageReader, release?: () => void): StudioFootageReader {
    let readerClosed = false;
    const tracked: StudioFootageReader = Object.freeze({
      byteLength: reader.byteLength,
      contentHash: reader.contentHash,
      read(offset: number, length: number): Buffer { return reader.read(offset, length); },
      verify(): void { reader.verify(); },
      close(): void {
        if (readerClosed) return;
        readerClosed = true; openReaders.delete(tracked);
        try { reader.close(); } finally { release?.(); }
      },
    });
    openReaders.add(tracked);
    return tracked;
  }
  function openBoundReader(assetPath: string, hash: string, bytes: number, binding: FootageStorageBinding | null): StudioFootageReader {
    if (binding === null) return trackReader(openStudioFootageSource(workspaceRoot, assetPath, hash, bytes));
    return guarded(() => {
      assertBinding(binding);
      compatibility?.assertRead(assetPath, hash, bytes);
      readMarker(workspaceRoot, WORKSPACE_MARKER, marker);
      const guard = openExisting();
      try {
        readMarker(guard, DRIVE_MARKER, marker);
        return trackReader(openStudioFootageSource(guard, assetPath, hash, bytes), () => guard.close());
      } catch (error) { guard.close(); throw error; }
    });
  }
  function withReader<T>(operation: (root: CreatorNativeRoot) => T): T {
    readMarker(workspaceRoot, WORKSPACE_MARKER, marker);
    const guard = openExisting();
    try { readMarker(guard, DRIVE_MARKER, marker); return operation(guard); }
    finally { guard.close(); }
  }
  function withWriter(operation: (root: CreatorNativeRoot) => void): void {
    if (compatibility) return unavailable();
    const workspaceBound = readMarker(workspaceRoot, WORKSPACE_MARKER, marker, true);
    let guard: CreatorNativeRoot | null = null, writer: CreatorNativeRoot | null = null;
    try {
      try { guard = openExisting(); }
      catch (error) {
        if (workspaceBound || errorCode(error) !== "not_found") throw error;
        // The fixed app base must already exist. Publish the fresh leaf AND its marker
        // transactionally: createDirectoryExclusive alone would release the child identity.
        const parent = new (loadCreatorNativeFilesystem().Root)(DRIVE_ROOT, LIBRARY_PARENT, "persistent");
        try {
          try { parent.publishTreeExclusive([libraryId], [[DRIVE_MARKER, marker]]); }
          catch (failure) { if (errorCode(failure) !== "already_exists") throw failure; }
          // A competing or pre-existing markerless leaf is never adopted, even if empty.
          guard = openExisting();
        } finally { parent.close(); }
      }
      if (guard) {
        readMarker(guard, DRIVE_MARKER, marker);
        // Existing lifecycle is read-only. Its retained no-DELETE-share chain pins the directories
        // while the mutable handle opens, preventing recreation of missing bound storage.
        writer = new (loadCreatorNativeFilesystem().Root)(DRIVE_ROOT, rootSegments, "persistent");
      }
      if (!writer) return unavailable();
      readMarker(writer, DRIVE_MARKER, marker);
      // D marker -> C binding -> parts. Exact interrupted C publication can be retried safely.
      if (!workspaceBound) publishMarker(workspaceRoot, WORKSPACE_MARKER, marker);
      else readMarker(workspaceRoot, WORKSPACE_MARKER, marker);
      const target = writer;
      const fenced = new Proxy(target, {
        get(root, property) {
          if (property === "writeAtomicExclusive") return (segments: readonly string[], temporaryName: string, data: Buffer) => root.writeAtomicExclusive(segments, temporaryName, data, DRIVE_MARKER, marker);
          const value = Reflect.get(root, property);
          return typeof value === "function" ? value.bind(root) : value;
        },
      });
      operation(fenced);
    } finally {
      try { writer?.close(); } finally { guard?.close(); }
    }
  }
  return Object.freeze({
    destination(): FootageStorageBinding | null {
      assertOpen(); if (compatibility) return unavailable();
      return importDestination === "workspace" ? null : { ...expectedBinding };
    },
    write(assetPath: string, bytes: Buffer | StudioFootageByteSource, binding: FootageStorageBinding | null): StudioFootagePublicationFence | null {
      assertOpen();
      if (compatibility) return unavailable();
      const source = byteSource(bytes); validateWrite(assetPath, source);
      if (binding === null) { preflightSpace("workspace", source.byteLength); writeStudioFootageSource(workspaceRoot, assetPath, source); return null; }
      return guarded(() => {
        assertBinding(binding);
        preflightSpace("d-drive", source.byteLength);
        withWriter(root => writeStudioFootageSource(root, assetPath, source));
        return { path: [...WORKSPACE_MARKER], expected: Buffer.from(marker) };
      });
    },
    open(assetPath: string, hash: string, bytes: number, binding: FootageStorageBinding | null): StudioFootageReader {
      assertOpen(); return openBoundReader(assetPath, hash, bytes, binding);
    },
    verify(assetPath: string, hash: string, bytes: number, binding: FootageStorageBinding | null): void {
      assertOpen();
      const reader = openBoundReader(assetPath, hash, bytes, binding);
      try { reader.verify(); } finally { reader.close(); }
    },
    read(assetPath: string, hash: string, bytes: number, binding: FootageStorageBinding | null): Buffer {
      assertOpen();
      if (binding === null) return readStudioFootage(workspaceRoot, assetPath, hash, bytes);
      return guarded(() => { assertBinding(binding); compatibility?.assertRead(assetPath, hash, bytes); return withReader(root => readStudioFootage(root, assetPath, hash, bytes)); });
    },
    close(): void {
      if (closed) return;
      closed = true;
      for (const reader of [...openReaders]) {
        try { reader.close(); } catch { /* Continue closing every owned reader. */ }
      }
    },
  });
}

export type StudioFootageLibrary = ReturnType<typeof createStudioFootageLibrary>;
