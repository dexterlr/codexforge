import "server-only";
import { createHash } from "node:crypto";
import { closeSync, constants, fstatSync, lstatSync, openSync, readFileSync, readSync, realpathSync, statfsSync, readdirSync } from "node:fs";
import path from "node:path";
import { readStudioRenderConfiguration, type StudioRenderToolIdentity } from "./editorial-v2-render-config.server";
import { validateBlenderEditPolicy, type BlenderEditPolicy } from "./blender-edit-contract";

export class BlenderBoundaryError extends Error {
  constructor(readonly code: string, message: string) { super(message); this.name = "BlenderBoundaryError"; }
}
export interface ApprovedBlenderSource {
  sourceId: string; label: string; path: string; sha256: string; byteLength: number; version: number; lineage: string;
  editPolicy?: BlenderEditPolicy;
}
const HASH = /^[a-f0-9]{64}$/u;
function reject(): never { throw new BlenderBoundaryError("BLENDER_CONFIGURATION_INVALID", "The approved local Blender configuration is missing or has changed. No execution is permitted."); }
function exact(value: unknown, fields: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value) || Object.keys(value).sort().join() !== fields.split(",").sort().join()) return reject();
  return value as Record<string, unknown>;
}
/** Only server-owned configuration can nominate a file. API callers pass a catalogue ID. */
export function canonicalBlenderFile(filename: string, maximum: number): { path: string; byteLength: number; sha256: string } {
  if (!/^[a-zA-Z]:[\\/]/u.test(filename) || filename.includes("\0")) return reject();
  const resolved = path.resolve(filename), before = lstatSync(resolved);
  if (!before.isFile() || before.isSymbolicLink() || before.size < 1 || before.size > maximum || realpathSync.native(resolved).toLowerCase() !== resolved.toLowerCase()) return reject();
  const sha256 = createHash("sha256").update(readFileSync(resolved)).digest("hex"), after = lstatSync(resolved);
  if (!after.isFile() || after.isSymbolicLink() || [before.dev,before.ino,before.size,before.mtimeMs,before.ctimeMs].join() !== [after.dev,after.ino,after.size,after.mtimeMs,after.ctimeMs].join() || realpathSync.native(resolved).toLowerCase() !== resolved.toLowerCase()) return reject();
  return { path: resolved, byteLength: after.size, sha256 };
}
export function verifyApprovedBlenderSource(source: ApprovedBlenderSource) {
  const identity = canonicalBlenderFile(source.path, 128 * 1024 * 1024);
  if (identity.sha256 !== source.sha256 || identity.byteLength !== source.byteLength) throw new BlenderBoundaryError("BLENDER_SOURCE_CHANGED", "The approved native source bytes changed. Prepare a new source version through local configuration; the saved plan cannot run.");
  return identity;
}
/** The parsed catalogue is the same bounded byte buffer checked against the launcher's accepted pin. */
export function readPinnedBlenderCatalogue(filename: string | undefined, expectedSha256: string | undefined): Record<string, unknown> {
  if (!filename || !/^c:[\\/]/iu.test(filename) || !expectedSha256 || expectedSha256.length !== 64 || !HASH.test(expectedSha256)) return reject();
  const resolved = path.resolve(filename), before = lstatSync(resolved), maximum = 32768;
  if (!before.isFile() || before.isSymbolicLink() || before.size < 1 || before.size > maximum || realpathSync.native(resolved).toLowerCase() !== resolved.toLowerCase()) return reject();
  const identity = (stat: NonNullable<ReturnType<typeof lstatSync>>) => [stat.dev, stat.ino, stat.size, stat.mtimeMs, stat.ctimeMs].join();
  const fd = openSync(resolved, constants.O_RDONLY), buffer = Buffer.alloc(maximum + 1); let offset = 0;
  try {
    if (identity(fstatSync(fd)) !== identity(before)) return reject();
    while (offset < buffer.length) { const count = readSync(fd, buffer, offset, buffer.length - offset, null); if (!count) break; offset += count; }
    if (offset > maximum || offset !== before.size || identity(fstatSync(fd)) !== identity(before)) return reject();
  } finally { closeSync(fd); }
  const after = lstatSync(resolved), bytes = buffer.subarray(0, offset);
  if (after.isSymbolicLink() || identity(after) !== identity(before) || realpathSync.native(resolved).toLowerCase() !== resolved.toLowerCase() || createHash("sha256").update(bytes).digest("hex") !== expectedSha256) return reject();
  return exact(JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes)), "schemaVersion,sources");
}
export function readBlenderConfiguration() {
  if (process.env.CODEXFORGE_STUDIO_BLENDER_ENABLED !== "1") throw new BlenderBoundaryError("BLENDER_DISABLED", "Native Blender preview is not enabled on this local runtime.");
  const renderer = readStudioRenderConfiguration(process.env, { forceHash: true });
  const filename = process.env.CODEXFORGE_STUDIO_BLENDER_PATH, expected = process.env.CODEXFORGE_STUDIO_BLENDER_SHA256;
  if (!filename || !expected || !HASH.test(expected) || path.basename(filename).toLowerCase() !== "blender.exe") return reject();
  const executable = canonicalBlenderFile(filename, 512 * 1024 * 1024);
  if (executable.sha256 !== expected) return reject();
  const catalog = readPinnedBlenderCatalogue(process.env.CODEXFORGE_STUDIO_BLENDER_SOURCE_CATALOG_JSON, process.env.CODEXFORGE_STUDIO_BLENDER_SOURCE_CATALOG_SHA256);
  if (catalog.schemaVersion !== 1 || !Array.isArray(catalog.sources) || catalog.sources.length > 8) return reject();
  const seen = new Set<string>();
  const sources = catalog.sources.map((item): ApprovedBlenderSource => {
    const v = exact(item, "sourceId,label,path,sha256,byteLength,version,lineage" + (Object.hasOwn(item ?? {}, "editPolicy") ? ",editPolicy" : ""));
    if (typeof v.sourceId !== "string" || !/^[a-z0-9][a-z0-9-]{0,79}$/u.test(v.sourceId) || seen.has(v.sourceId) || typeof v.label !== "string" || !v.label.trim() || v.label.length > 160 || typeof v.path !== "string" || path.extname(v.path).toLowerCase() !== ".blend" || typeof v.sha256 !== "string" || !HASH.test(v.sha256) || !Number.isSafeInteger(v.byteLength) || Number(v.byteLength) < 1 || Number(v.byteLength) > 128*1024*1024 || !Number.isSafeInteger(v.version) || Number(v.version) < 1 || typeof v.lineage !== "string" || v.lineage.length > 512 || /[\u0000-\u001f\u007f]/u.test(v.label + v.path + v.lineage)) return reject();
    if (v.editPolicy !== undefined && validateBlenderEditPolicy(v.editPolicy).sourceSha256 !== v.sha256) return reject();
    seen.add(v.sourceId); return v as unknown as ApprovedBlenderSource;
  });
  return { enabled: true as const, workRoot: renderer.workRoot, blender: { path: executable.path, sha256: expected } satisfies StudioRenderToolIdentity, ffmpeg: renderer.ffmpeg, ffprobe: renderer.ffprobe, sources };
}
/** Cooperative retention/free-space bound, not an OS memory or filesystem sandbox. */
export function checkBlenderWorkCapacity(workRoot: string): number {
  const resolved = path.resolve(workRoot);
  if (!/^c:\\/iu.test(resolved) || realpathSync.native(resolved).toLowerCase() !== resolved.toLowerCase()) return reject();
  let total = 0, entries = 0;
  const visit = (directory: string) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      if (++entries > 50_000 || entry.isSymbolicLink()) return reject();
      const full = path.join(directory, entry.name);
      if (entry.isDirectory()) visit(full); else if (entry.isFile()) total += lstatSync(full).size; else return reject();
      if (total > 8*1024**3) throw new BlenderBoundaryError("BLENDER_STORAGE_BOUND", "The local preview staging retention limit is reached. No job started and no old files were deleted.");
    }
  };
  visit(resolved);
  const space = statfsSync(resolved);
  if (space.bavail * space.bsize < 4*1024**3) throw new BlenderBoundaryError("BLENDER_SPACE_LOW", "At least 4 GiB of free local staging space is required before a Blender preview.");
  return total;
}
