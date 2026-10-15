import type { Asset, AssetRef, Job, JsonObject, StudioId } from "./domain";
import { cloneStudioJson } from "./validation";
import { assertStudioId } from "./workspace";
import type { BlenderMaterialVerification } from "./blender-edit-contract";

export const BLENDER_SOURCE_ADAPTER = "studio-blender-native-source-v1";
export const BLENDER_RENDER_ADAPTER = "studio-blender-derived-video-v1";
export const BLENDER_PROFILE = "BLENDER_PREVIEW_720P25_V1" as const;
export interface BlenderSourceDescriptor {
  format: "studio-blender-source-v1" | "studio-blender-source-revision-v1"; catalogueId: string; label: string;
  source: { originalPath: string; relativeName: string; byteLength: number; sha256: string };
  dependencies: { relativePath: string; byteLength: number; sha256: string }[];
  inspection: JsonObject;
  // This is a chunk index, not a directly reopenable .blend. The exact native
  // bytes are reconstructed and hash-verified for Blender; its saved job file is retained.
  revision?: { parent: AssetRef; jobId: StudioId<"job">; proposalDigest: string; originalSha256: string; nativeStorage: { format: "studio-footage-chunks-v1"; indexPath: string }; verification: BlenderMaterialVerification };
}
export interface BlenderRenderSettings {
  profile: typeof BLENDER_PROFILE; scene: string; camera: string; frameStart: number; frameEnd: number; width: 1280; height: 720; fps: 25;
  adapterVersion: string; blender: { path: string; sha256: string; version: string }; ffmpeg: { path: string; sha256: string }; ffprobe: { path: string; sha256: string };
  scriptHashes: { inspect: string; render: string }; colourTransform: string;
}
export interface BlenderRenderSpec {
  format: "studio-blender-render-spec-v1"; projectId: StudioId<"project">; shotId: StudioId<"shot">; source: AssetRef;
  descriptorHash: string; blendSha256: string; dependenciesDigest: string; settings: BlenderRenderSettings;
}
export interface BlenderProgress {
  phase: "STARTING" | "RENDERING" | "ENCODING" | "VALIDATING" | "PUBLISHING"; completedFrames: number; totalFrames: number;
  process: { pid: number; identity: string; executableSha256: string; startedAt: string } | null;
}
export interface BlenderExecution {
  format: "studio-blender-execution-v1"; spec: BlenderRenderSpec; specDigest: string; preparedRevision: number;
  phase: "PREPARED" | "RUNNING" | "COMPLETED" | "FAILED" | "CANCELLED" | "INTERRUPTED"; progress: BlenderProgress | null;
  latestProgress?: { at: string; keyHash: string; requestDigest: string; diagnosticRef: StudioId<"job"> };
}
export class BlenderSourceError extends Error { constructor(readonly code: string, message = "The exact native Blender source or render binding is unavailable.") { super(message); this.name = "BlenderSourceError"; } }
export const blenderFail = (code = "BLENDER_INVALID", message?: string): never => { throw new BlenderSourceError(code, message); };
export function blenderObject(value: unknown): Record<string, unknown> {
  const copy = cloneStudioJson(value); if (!copy || Array.isArray(copy) || typeof copy !== "object") return blenderFail(); return copy;
}
export function blenderExact(value: Record<string, unknown>, keys: string): void { if (Object.keys(value).sort().join() !== keys.split(",").sort().join()) blenderFail(); }
export function blenderHash(value: unknown): string { if (typeof value !== "string" || !/^[a-f0-9]{64}$/u.test(value)) return blenderFail(); return value; }
function label(value: unknown, maximum = 256): string { if (typeof value !== "string" || !value.trim() || value.length > maximum || /[\u0000-\u001f\u007f]/u.test(value)) return blenderFail(); return value; }
function integer(value: unknown, minimum: number, maximum: number): number { if (!Number.isSafeInteger(value) || Number(value) < minimum || Number(value) > maximum) return blenderFail(); return Number(value); }
function localPath(value: unknown, extension: string, cOnly = false): string {
  const clean = label(value, 1024); if (!(cOnly ? /^c:[\\/]/iu : /^[a-z]:[\\/]/iu).test(clean) || /[<>"|?*]/u.test(clean) || /[:]/u.test(clean.slice(2)) || clean.split(/[\\/]/u).slice(1).some(part => !part || part === "." || part === ".." || /[. ]$/u.test(part)) || !clean.toLowerCase().endsWith(extension)) return blenderFail(); return clean;
}
export function validateBlenderSourceDescriptor(input: unknown): BlenderSourceDescriptor {
  const value = blenderObject(input); blenderExact(value, "format,catalogueId,label,source,dependencies,inspection" + (value.format === "studio-blender-source-revision-v1" ? ",revision" : ""));
  if (!["studio-blender-source-v1", "studio-blender-source-revision-v1"].includes(String(value.format)) || typeof value.catalogueId !== "string" || !/^[a-z0-9][a-z0-9_-]{0,95}$/u.test(value.catalogueId)) blenderFail();
  label(value.label); const source = blenderObject(value.source); blenderExact(source, "originalPath,relativeName,byteLength,sha256");
  localPath(source.originalPath, ".blend"); if (typeof source.relativeName !== "string" || !/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,127}\.blend$/u.test(source.relativeName)) blenderFail();
  integer(source.byteLength, 1, 2 * 1024 * 1024 * 1024); blenderHash(source.sha256);
  if (value.format === "studio-blender-source-revision-v1") {
    const revision = blenderObject(value.revision); blenderExact(revision, "parent,jobId,proposalDigest,originalSha256,nativeStorage,verification");
    const parent = blenderObject(revision.parent); blenderExact(parent, "assetId,version"); assertStudioId(parent.assetId, "asset"); integer(parent.version, 1, 1_000_000); assertStudioId(revision.jobId, "job"); blenderHash(revision.proposalDigest); blenderHash(revision.originalSha256);
    const storage = blenderObject(revision.nativeStorage); blenderExact(storage, "format,indexPath");
    if (storage.format !== "studio-footage-chunks-v1" || typeof storage.indexPath !== "string" || !/^studio\/projects\/project_[a-z0-9_]+\/blender\/native-versions\/[a-f0-9]{64}\.blend\.json$/u.test(storage.indexPath) || !storage.indexPath.endsWith(`/${source.sha256}.blend.json`)) blenderFail("BLENDER_NATIVE_PATH_INVALID");
    integer(source.byteLength, 1, 128 * 1024 ** 2);
    const proof = blenderObject(revision.verification); if (proof.format !== "studio-blender-material-verification-v1" || proof.reopened !== true || proof.onlyIntendedChange !== true || proof.outputSha256 !== source.sha256 || proof.outputBytes !== source.byteLength) blenderFail("BLENDER_EDIT_VERIFICATION_FAILED");
  }
  // First adapter profile intentionally admits packed/self-contained scenes only.
  if (!Array.isArray(value.dependencies) || value.dependencies.length !== 0) blenderFail("BLENDER_DEPENDENCIES_UNSUPPORTED", "This initial adapter requires a self-contained native file; no dependency is silently skipped.");
  const inspection = blenderObject(value.inspection);
  if (inspection.supported !== true || !Array.isArray(inspection.unsupported) || inspection.unsupported.length || !Array.isArray(inspection.scenes) || !inspection.scenes.length || inspection.scenes.length > 16 || inspection.sourceSha256 !== source.sha256 || inspection.sourceBytes !== source.byteLength || !Array.isArray(inspection.dependencies) || inspection.dependencies.some(raw => !raw || typeof raw !== "object" || Array.isArray(raw) || raw.packed !== true)) blenderFail("BLENDER_INSPECTION_UNSUPPORTED");
  label(inspection.blenderVersion, 120);
  for (const raw of inspection.scenes as unknown[]) { const scene = blenderObject(raw); label(scene.name); if (!Array.isArray(scene.cameras) || scene.cameras.length > 32) return blenderFail(); scene.cameras.forEach((camera: unknown) => label(camera)); integer(scene.frameStart, 1, 1_000_000); integer(scene.frameEnd, Number(scene.frameStart), 1_000_000); }
  if (JSON.stringify(value).length > 48_000) blenderFail("BLENDER_DESCRIPTOR_CAPACITY");
  return value as unknown as BlenderSourceDescriptor;
}
export function validateBlenderRenderSettings(input: unknown, descriptor?: BlenderSourceDescriptor): BlenderRenderSettings {
  const value = blenderObject(input); blenderExact(value, "profile,scene,camera,frameStart,frameEnd,width,height,fps,adapterVersion,blender,ffmpeg,ffprobe,scriptHashes,colourTransform");
  if (value.profile !== BLENDER_PROFILE || value.width !== 1280 || value.height !== 720 || value.fps !== 25) blenderFail();
  label(value.scene); label(value.camera); label(value.adapterVersion, 120); label(value.colourTransform, 160);
  const start = integer(value.frameStart, 1, 1_000_000), end = integer(value.frameEnd, start, start + 74);
  for (const name of ["blender", "ffmpeg", "ffprobe"]) { const tool = blenderObject(value[name]); blenderExact(tool, name === "blender" ? "path,sha256,version" : "path,sha256"); localPath(tool.path, ".exe", true); blenderHash(tool.sha256); if (name === "blender") label(tool.version, 120); }
  const scripts = blenderObject(value.scriptHashes); blenderExact(scripts, "inspect,render"); blenderHash(scripts.inspect); blenderHash(scripts.render);
  if (descriptor) {
    const scenes = descriptor.inspection.scenes as JsonObject[], scene = scenes.find(item => item.name === value.scene);
    if (!scene || !Array.isArray(scene.cameras) || !scene.cameras.includes(String(value.camera)) || start < Number(scene.frameStart) || end > Number(scene.frameEnd) || scene.fps !== 25 || scene.fpsBase !== 1 || descriptor.inspection.blenderVersion !== (value.blender as JsonObject).version) blenderFail("BLENDER_SCENE_BINDING");
  }
  return value as unknown as BlenderRenderSettings;
}
export function isBlenderJob(job: Job): boolean { return !!job?.checkpoint && Object.hasOwn(job.checkpoint, "blenderExecution"); }
export function isBlenderSourceAsset(asset: Asset): boolean { return asset.assetType === "DOCUMENT" && asset.provenance.adapterMetadata?.adapterId === BLENDER_SOURCE_ADAPTER; }
/** Client-safe structure only; canonical identity is additionally checked at every server persistence boundary. */
export function validateBlenderSourceAssetShape(asset: Asset): void {
  const p = asset.provenance, m = p.adapterMetadata;
  if (!isBlenderSourceAsset(asset) || !m || m.provider !== null || m.model !== null || m.providerJobId !== null || m.externalGenerationId !== null || p.jobId !== null || p.promptId !== null || p.negativePrompt !== null || p.referenceAssets.length || p.cost.minorUnits !== 0 || asset.dependencies.length || (p.parentAssets.length !== asset.lineage.length || p.parentAssets.some((ref, index) => ref.assetId !== asset.lineage[index].assetId || ref.version !== asset.lineage[index].version)) || asset.approvalState !== "DRAFT" || p.approvalState !== "DRAFT" || asset.supersededBy !== null) return blenderFail("BLENDER_SOURCE_BINDING");
  const settings = blenderObject(m.settings); blenderExact(settings, "format,catalogueId,shotId,descriptorHash,blendSha256,dependenciesDigest");
  if (!["studio-blender-source-v1", "studio-blender-source-revision-v1"].includes(String(settings.format)) || typeof settings.catalogueId !== "string" || !/^[a-z0-9][a-z0-9_-]{0,95}$/u.test(settings.catalogueId) || settings.descriptorHash !== asset.contentHash) blenderFail("BLENDER_SOURCE_BINDING");
  assertStudioId(settings.shotId, "shot"); blenderHash(settings.blendSha256); blenderHash(settings.dependenciesDigest);
  if (!/^asset_blender_[a-f0-9]{24}$/u.test(asset.assetId)) blenderFail("BLENDER_SOURCE_BINDING");
  if (asset.version === 1 ? asset.lineage.length !== 0 : asset.lineage.length !== 1 || asset.lineage[0].assetId !== asset.assetId || asset.lineage[0].version !== asset.version - 1) blenderFail("BLENDER_SOURCE_BINDING");
}
export function validateBlenderProgress(input: unknown, totalFrames: number): BlenderProgress {
  const value = blenderObject(input); blenderExact(value, "phase,completedFrames,totalFrames,process");
  if (!["STARTING", "RENDERING", "ENCODING", "VALIDATING", "PUBLISHING"].includes(String(value.phase)) || value.totalFrames !== totalFrames) blenderFail(); integer(value.completedFrames, 0, totalFrames);
  if (value.process !== null) { const process = blenderObject(value.process); blenderExact(process, "pid,identity,executableSha256,startedAt"); integer(process.pid, 1, 2_147_483_647); label(process.identity, 256); blenderHash(process.executableSha256); const at = label(process.startedAt, 24); if (!/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/u.test(at) || !Number.isFinite(Date.parse(at)) || new Date(at).toISOString() !== at) blenderFail(); }
  return value as unknown as BlenderProgress;
}
export function blenderCheckpoint(value: BlenderExecution): JsonObject { return cloneStudioJson({ blenderExecution: value }) as JsonObject; }
