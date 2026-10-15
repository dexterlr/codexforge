import "server-only";

import { createHash } from "node:crypto";
import { realpathSync } from "node:fs";
import path from "node:path";
import { CODEXFORGE_PROJECT_ROOT } from "@/lib/codexforge/server-safe-paths";
import { loadCreatorNativeFilesystem, type CreatorNativeRoot } from "@/lib/codexforge/creator/creator-native-filesystem.server";
import { assertCreatorJsonHasUniqueObjectKeys } from "@/lib/codexforge/creator/creator-contract.server";
import { serializeJarvisChatCanonicalJson as canonical } from "@/lib/codexforge/jarvis-chat/jarvis-chat-crypto";
import { isLocalFootageAsset, localFootageByteLength, localFootageStorageBinding } from "./footage-contract";
import { validateAssetManifest } from "./validation";
import { assertStudioId, resolveAssetPath } from "./workspace";

const PIN = "CODEXFORGE_STUDIO_COMPATIBILITY_BINDING_SHA256";
const CONFIG_ROOT = [".codexforge", "studio-compatibility"] as const;
const CONFIG_FILE = ["readonly-library.json"] as const;
const HASH = /^[a-f0-9]{64}$/u;
export type StudioFootageWorkspaceScope = Readonly<{ workspace: "development" | "test"; namespace?: string }>;
type AssetGrant = Readonly<{ projectId: string; assetId: string; version: number; sourcePath: string; contentHash: string; byteLength: number }>;

export class StudioCompatibilityBindingError extends Error {
  constructor(readonly code: "FOOTAGE_COMPATIBILITY_CONFIGURATION" | "FOOTAGE_COMPATIBILITY_READ_ONLY") {
    super(code === "FOOTAGE_COMPATIBILITY_READ_ONLY" ? "Source imports are unavailable in the read-only compatibility workspace." : "The explicit read-only source-library binding is unavailable or invalid.");
    this.name = "StudioCompatibilityBindingError";
  }
}
const invalid = (): never => { throw new StudioCompatibilityBindingError("FOOTAGE_COMPATIBILITY_CONFIGURATION"); };
const sha = (bytes: Buffer): string => createHash("sha256").update(bytes).digest("hex");
function exact(value: unknown, keys: readonly string[]): asserts value is Record<string, unknown> {
  if (!value || typeof value !== "object" || Object.getPrototypeOf(value) !== Object.prototype ||
      Reflect.ownKeys(value).some(key => typeof key !== "string" || !Object.getOwnPropertyDescriptor(value, key)?.enumerable || !("value" in Object.getOwnPropertyDescriptor(value, key)!)) ||
      Object.keys(value).sort().join() !== [...keys].sort().join()) invalid();
}
function scope(value: unknown): StudioFootageWorkspaceScope {
  if (!value || typeof value !== "object") return invalid();
  exact(value, Object.hasOwn(value, "namespace") ? ["workspace", "namespace"] : ["workspace"]);
  const v = value;
  if (v.workspace === "development") { exact(v, ["workspace"]); return { workspace: "development" }; }
  exact(v, ["workspace", "namespace"]);
  if (v.workspace !== "test" || typeof v.namespace !== "string" || !/^[a-z0-9][a-z0-9-]{7,63}$/u.test(v.namespace)) return invalid();
  return { workspace: "test", namespace: v.namespace };
}
function root(value: unknown): string {
  if (typeof value !== "string" || !/^C:\//u.test(value) || value.length > 1024 || value.includes("\0") || value.includes("\\")) return invalid();
  const resolved = realpathSync.native(value).replaceAll("\\", "/");
  if (resolved !== value || path.parse(value).root === value) return invalid();
  return resolved;
}
function segments(value: StudioFootageWorkspaceScope): string[] {
  return value.workspace === "development" ? [".codexforge", "studio-development"] : [".codexforge", "studio-tests", value.namespace!];
}
function parse(bytes: Buffer): unknown {
  const text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  let depth = 0, quoted = false, escaped = false;
  for (const char of text) {
    if (quoted) { if (escaped) escaped = false; else if (char === "\\") escaped = true; else if (char === '"') quoted = false; }
    else if (char === '"') quoted = true;
    else if (char === "{" || char === "[") { if (++depth > 32) return invalid(); }
    else if (char === "}" || char === "]") depth--;
  }
  if (depth !== 0 || quoted || text.charCodeAt(0) === 0xfeff) return invalid();
  assertCreatorJsonHasUniqueObjectKeys(text);
  return JSON.parse(text) as unknown;
}
function contains(parent: string, child: string): boolean {
  const relative = path.relative(parent, child);
  return relative === "" || (!relative.startsWith(".." + path.sep) && relative !== ".." && !path.isAbsolute(relative));
}

/** Only a server-owned hash pin selects this fixed file. No HTTP input or copied
 * project record grants authority. Both source handles use native existing mode;
 * this is not a process-wide operating-system sandbox. */
export function readStudioCompatibilityBinding(workspaceScope: StudioFootageWorkspaceScope, environment: NodeJS.ProcessEnv = process.env) {
  const pin = environment[PIN];
  if (pin === undefined) return null;
  try {
    if (!HASH.test(pin)) return invalid();
    const requestedScope = scope(workspaceScope), requestingRoot = root(realpathSync.native(CODEXFORGE_PROJECT_ROOT).replaceAll("\\", "/"));
    if (requestedScope.workspace !== "test") return invalid();
    const native = loadCreatorNativeFilesystem();
    function configurationBytes(): Buffer {
      const handle = new native.Root(requestingRoot, CONFIG_ROOT, "existing");
      try { const bytes = handle.readFile(CONFIG_FILE, 65_536); if (sha(bytes) !== pin) return invalid(); return bytes; }
      finally { handle.close(); }
    }
    const bytes = configurationBytes(), value = parse(bytes);
    exact(value, ["format", "mode", "requester", "owner", "libraryId", "allowedAssets"]);
    if (value.format !== "studio-readonly-compatibility-binding-v1" || value.mode !== "read-only" || !Buffer.from(canonical(value) + "\n").equals(bytes)) return invalid();
    exact(value.requester, ["projectRoot", "scope"]);
    exact(value.owner, ["projectRoot", "scope", "projectId", "recordSha256"]);
    const owner = value.owner, requester = value.requester;
    const ownerRoot = root(owner.projectRoot), ownerScope = scope(owner.scope);
    if (root(requester.projectRoot) !== requestingRoot || canonical(scope(requester.scope)) !== canonical(requestedScope) || contains(ownerRoot, requestingRoot) || contains(requestingRoot, ownerRoot)) return invalid();
    assertStudioId(owner.projectId, "project");
    if (typeof owner.recordSha256 !== "string" || !HASH.test(owner.recordSha256)) return invalid();
    const libraryId = createHash("sha256").update(canonical({ format: "studio-footage-library-identity-v1", projectRoot: ownerRoot, scope: ownerScope })).digest("hex");
    if (value.libraryId !== libraryId || !Array.isArray(value.allowedAssets) || value.allowedAssets.length < 1 || value.allowedAssets.length > 256) return invalid();
    const marker = Buffer.from(canonical({ format: "studio-footage-library-v1", storageLocation: "codexforge-media-d-v1", libraryId }));
    const grants = new Map<string, AssetGrant>();
    for (const candidate of value.allowedAssets) {
      exact(candidate, ["projectId", "assetId", "version", "sourcePath", "contentHash", "byteLength"]);
      assertStudioId(candidate.assetId, "asset");
      if (candidate.projectId !== owner.projectId || !Number.isSafeInteger(candidate.version) || Number(candidate.version) < 1 || typeof candidate.sourcePath !== "string" || typeof candidate.contentHash !== "string" || !HASH.test(candidate.contentHash) || !Number.isSafeInteger(candidate.byteLength) || Number(candidate.byteLength) < 1 || Number(candidate.byteLength) > 2_147_483_648 || grants.has(candidate.sourcePath)) return invalid();
      grants.set(candidate.sourcePath, Object.freeze({ ...candidate }) as AssetGrant);
    }
    function verifyOwner(): void {
      // Recheck the authoritative owner, not a user-editable compatibility record.
      const handle = new native.Root(ownerRoot, segments(ownerScope), "existing");
      try {
        if (!handle.readFile(["studio", "media-library.json"], 4096).equals(marker)) return invalid();
        const record = handle.readFile(["studio", "projects", String(owner.projectId), "manifests", "project.json"], 1_048_576);
        if (sha(record) !== owner.recordSha256) return invalid();
        const snapshot = parse(record) as { project?: { projectId?: unknown }; assets?: unknown };
        if (!snapshot || snapshot.project?.projectId !== owner.projectId || !Array.isArray(snapshot.assets) || snapshot.assets.length > 1000) return invalid();
        for (const grant of grants.values()) {
          const matches = snapshot.assets.filter((a: { assetId?: unknown; version?: unknown } | null) => a && a.assetId === grant.assetId && a.version === grant.version);
          if (matches.length !== 1) return invalid();
          const asset = validateAssetManifest(matches[0]), binding = localFootageStorageBinding(asset);
          if (!isLocalFootageAsset(asset) || asset.projectId !== grant.projectId || asset.sourcePath !== grant.sourcePath || asset.contentHash !== grant.contentHash || localFootageByteLength(asset) !== grant.byteLength || binding?.storageLocation !== "codexforge-media-d-v1" || binding.libraryId !== libraryId || resolveAssetPath(asset.projectId, asset, asset.assetType, asset.contentHash) !== grant.sourcePath) return invalid();
        }
      } finally { handle.close(); }
      const library = new native.Root("D:/CodexForge", [".codexforge", "media-libraries", libraryId], "existing");
      try { if (!library.readFile(["media-library.json"], 4096).equals(marker)) return invalid(); }
      finally { library.close(); }
    }
    verifyOwner();
    return Object.freeze({
      digest: pin, libraryId,
      assertRead(assetPath: string, contentHash: string, byteLength: number): void {
        const grant = grants.get(assetPath);
        if (!grant || grant.contentHash !== contentHash || grant.byteLength !== byteLength) return invalid();
        configurationBytes(); verifyOwner();
      },
    });
  } catch { return invalid(); }
}

/** Deny before import reservations, replay, staging, finalization or publication. */
export function assertStudioCompatibilityImportAllowed(environment: NodeJS.ProcessEnv = process.env): void {
  if (environment[PIN] !== undefined) throw new StudioCompatibilityBindingError("FOOTAGE_COMPATIBILITY_READ_ONLY");
}

/** The renderer and uploader share this server-owned staging configuration. */
export function assertStudioCompatibilityWorkRoot(workRoot: string, environment: NodeJS.ProcessEnv = process.env): void {
  if (environment[PIN] === undefined) return;
  compatibilityWorkContext(workRoot, environment);
}
function compatibilityWorkContext(workRoot: string, environment: NodeJS.ProcessEnv): { requesting: string; work: string } {
  try {
    const binding = readStudioCompatibilityBinding({ workspace: "test", namespace: environment.CODEXFORGE_STUDIO_OPERATOR_TEST_NAMESPACE }, environment);
    const requesting = realpathSync.native(CODEXFORGE_PROJECT_ROOT), work = realpathSync.native(workRoot);
    if (!binding || work === requesting || !contains(requesting, work) || path.parse(work).root.toLowerCase() !== "c:\\") return invalid();
    return { requesting, work };
  } catch { return invalid(); }
}

function pinExistingPath(target: string, lifecycle: "existing" | "removable" = "existing"): CreatorNativeRoot {
  const volume = path.parse(target).root, parts = path.relative(volume, target).split(path.sep);
  if (volume.toLowerCase() !== "c:\\" || parts.length < 2 || parts.length > 65 || parts.some(part => !part || part === ".." || part === ".")) return invalid();
  // Native Root retains its base plus every supplied segment. Starting at the
  // first C: directory also pins the requesting workspace's outer ancestors.
  return new (loadCreatorNativeFilesystem().Root)(path.join(volume, parts[0]), parts.slice(1), lifecycle);
}

const WORK_GUARDS = Symbol.for("codexforge.studio.compatibility-work-guards.v1");
/** Keep the complete requesting-root/staging chain pinned for this server's
 * lifetime. Path-based FFmpeg staging cannot then be redirected by a directory
 * rename/reparse swap after configuration validation. Never evict an active
 * guard: a server changing more than eight bound work contexts fails closed. */
export function pinStudioCompatibilityWorkRoot(workRoot: string, environment: NodeJS.ProcessEnv = process.env): void {
  if (environment[PIN] === undefined) return;
  try {
    const { requesting, work } = compatibilityWorkContext(workRoot, environment);
    const host = process as unknown as Record<symbol, unknown>;
    if (host[WORK_GUARDS] === undefined) Object.defineProperty(host, WORK_GUARDS, { value: new Map<string, CreatorNativeRoot>(), configurable: false, enumerable: false, writable: false });
    const guards = host[WORK_GUARDS];
    if (!(guards instanceof Map)) return invalid();
    const key = canonical({ requesting, work, pin: environment[PIN] });
    if (guards.has(key)) return;
    if (guards.size >= 8) return invalid();
    const guard = pinExistingPath(work);
    // Existing mode rejects reparse/hardlink targets and holds no-DELETE-share
    // handles on every component. No lockfile or source-library write occurs.
    guards.set(key, guard);
  } catch { return invalid(); }
}

/** Hold through materialization and all asynchronous render/probe phases.
 * Default personal rendering keeps its existing staging behaviour. */
export function pinStudioCompatibilityJobDirectory(workRoot: string, jobDirectory: string, environment: NodeJS.ProcessEnv = process.env): CreatorNativeRoot | null {
  if (environment[PIN] === undefined) return null;
  try {
    const { work } = compatibilityWorkContext(workRoot, environment);
    const target = path.resolve(jobDirectory);
    if (path.dirname(target) !== work || realpathSync.native(target) !== target) return invalid();
    // This C:-only job owns writable staging. Removable mode retains the exact
    // directory handle for safe removeRoot() cleanup, without a close/path gap.
    return pinExistingPath(target, "removable");
  } catch { return invalid(); }
}
