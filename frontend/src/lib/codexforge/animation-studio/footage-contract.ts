import type { Asset, StudioId } from "./domain";
import { assertStudioId } from "./workspace";

// Media has a separate bounded chunk representation. Manifest/native/control caps are unchanged.
// The legacy whole-buffer entry points remain deliberately smaller than streamed source admission.
export const STUDIO_FOOTAGE_LEGACY_BUFFER_MAX_BYTES = 16 * 1024 * 1024;
export const STUDIO_FOOTAGE_MAX_BYTES = 2 * 1024 * 1024 * 1024;
export const STUDIO_FOOTAGE_PROJECT_MAX_BYTES = 16 * 1024 * 1024 * 1024;
export const STUDIO_FOOTAGE_PROJECT_MAX_VERSIONS = 8;
export const STUDIO_FOOTAGE_ADAPTER = "studio-local-footage-v1";
/** Same qualified local chunk transport; a distinct server-render acquisition identity. */
export const STUDIO_BLENDER_DERIVED_ADAPTER = "studio-blender-derived-video-v1";
export const STUDIO_LOCAL_MEDIA_TECHNICAL_SCHEMA = "studio-qualified-local-media-v1";
export const STUDIO_FOOTAGE_ENDPOINT = "/api/codexforge/animation-studio/footage";
export const STUDIO_FOOTAGE_METADATA_HEADER = "X-CodexForge-Footage";
export const STUDIO_FOOTAGE_D_STORAGE = "codexforge-media-d-v1";
export interface FootageStorageBinding { storageLocation: typeof STUDIO_FOOTAGE_D_STORAGE; libraryId: string }
export type StudioLocalMediaKind = "VIDEO" | "AUDIO";
export type StudioLocalMediaDuration = Readonly<{ numerator: number; denominator: number }>;
export type StudioLocalMediaTechnicalMetadata = Readonly<
  | {
      schema: typeof STUDIO_LOCAL_MEDIA_TECHNICAL_SCHEMA; mediaType: "VIDEO"; contentType: "video/mp4"; container: "mp4";
      codec: "h264"; pixelFormat: "yuv420p"; width: number; height: number;
      frameRate: Readonly<{ numerator: 25; denominator: 1 }>; frameCadence: "CFR_25_EXACT";
      duration: StudioLocalMediaDuration; sourceUnits: number; sourceUnit: "FRAME"; timeBase: StudioLocalMediaDuration;
      colorPrimaries: "bt709"; colorTransfer: "bt709"; colorSpace: "bt709"; colorRange: "tv";
      dynamicRange: "SDR_BT709"; rotationDegrees: 0; streamCount: 1; probeDigest: string;
    }
  | {
      schema: typeof STUDIO_LOCAL_MEDIA_TECHNICAL_SCHEMA; mediaType: "AUDIO"; contentType: "audio/wav"; container: "wav";
      codec: "pcm_s16le"; sampleFormat: "s16"; sampleRate: 48_000; channels: 1 | 2; channelLayout: "mono" | "stereo";
      duration: StudioLocalMediaDuration; sourceUnits: number; sourceUnit: "SAMPLE";
      timeBase: Readonly<{ numerator: 1; denominator: 48_000 }>; streamCount: 1; probeDigest: string;
    }
>;
export type LocalMediaTechnicalMetadata = Readonly<
  StudioLocalMediaTechnicalMetadata & { assetType: StudioLocalMediaKind; byteLength: number; contentHash: string }
>;

export class FootageValidationError extends Error {
  constructor(readonly code: string, message: string) { super(message); this.name = "FootageValidationError"; }
}
const reject = (message = "Use the supported bounded footage fields."): never => { throw new FootageValidationError("INVALID_FOOTAGE", message); };
function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Object.getPrototypeOf(value) !== Object.prototype) return reject();
  if (Reflect.ownKeys(value).some(key => typeof key !== "string" || !Object.getOwnPropertyDescriptor(value, key)?.enumerable || !("value" in Object.getOwnPropertyDescriptor(value, key)!))) return reject();
  return value as Record<string, unknown>;
}
function exact(value: Record<string, unknown>, keys: string): void { if (Object.keys(value).sort().join() !== keys.split(",").sort().join()) reject(); }
function text(value: unknown, max: number): string {
  if (typeof value !== "string" || !value.trim() || value.length > max || /[\u0000-\u001f\u007f]/u.test(value)) return reject();
  return value;
}
function rightsNote(value: unknown): string {
  if (typeof value !== "string" || !value.trim() || value.length > 1024 || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(value)) return reject();
  return value;
}
function positive(value: unknown): number { if (!Number.isSafeInteger(value) || Number(value) < 1) return reject(); return value as number; }
function identity<K extends "project" | "shot">(value: unknown, kind: K): StudioId<K> { try { assertStudioId(value, kind); } catch { return reject(); } return value as StudioId<K>; }
function filename(value: unknown, mediaType: StudioLocalMediaKind): string {
  const name = text(value, 160);
  const expected = mediaType === "VIDEO" ? /\.mp4$/iu : /\.wav$/iu;
  if (/[\\/:]/u.test(name) || /[. ]$/u.test(name) || !expected.test(name)) return reject(`Select a named ${mediaType === "VIDEO" ? "MP4" : "WAV"} file; paths and other formats are not accepted.`);
  return name;
}
export interface FootageImportInput {
  projectId: StudioId<"project">; shotId: StudioId<"shot">; expectedProjectRevision: number; expectedShotRevision: number;
  requestedAt: string; originalName: string; sourceLabel: string; rights: Asset["rights"]; mediaType?: StudioLocalMediaKind;
}
export function validateFootageImport(value: unknown): FootageImportInput {
  const v = object(value), qualified = Object.hasOwn(v, "mediaType");
  exact(v, `projectId,shotId,expectedProjectRevision,expectedShotRevision,requestedAt,originalName,sourceLabel,rights${qualified ? ",mediaType" : ""}`);
  const mediaType = qualified && (v.mediaType === "VIDEO" || v.mediaType === "AUDIO") ? v.mediaType : qualified ? reject() : "VIDEO";
  const rights = object(v.rights); exact(rights, "status,license,evidence");
  if (!["UNKNOWN", "OWNED", "LICENSED", "PUBLIC_DOMAIN", "RESTRICTED"].includes(String(rights.status))) return reject();
  const cleanRights = { status: rights.status as Asset["rights"]["status"], license: rights.license === null ? null : rightsNote(rights.license), evidence: rights.evidence === null ? null : rightsNote(rights.evidence) };
  if (cleanRights.status === "LICENSED" && (!cleanRights.license || !cleanRights.evidence)) return reject("Licensed footage requires license and evidence notes.");
  const requestedAt = text(v.requestedAt, 24);
  if (!/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/u.test(requestedAt) || !Number.isFinite(Date.parse(requestedAt)) || new Date(requestedAt).toISOString() !== requestedAt) return reject();
  return { projectId: identity(v.projectId, "project"), shotId: identity(v.shotId, "shot"), expectedProjectRevision: positive(v.expectedProjectRevision), expectedShotRevision: positive(v.expectedShotRevision), requestedAt, originalName: filename(v.originalName, mediaType), sourceLabel: text(v.sourceLabel, 256), rights: cleanRights, ...(qualified ? { mediaType } : {}) };
}
export function footageImportMediaType(input: FootageImportInput): StudioLocalMediaKind { return input.mediaType ?? "VIDEO"; }
export function isBlenderDerivedMediaAsset(asset: Asset): boolean { return asset.provenance.adapterMetadata?.adapterId === STUDIO_BLENDER_DERIVED_ADAPTER; }
export function isLocalFootageAsset(asset: Asset): boolean { return asset.provenance.adapterMetadata?.adapterId === STUDIO_FOOTAGE_ADAPTER || isBlenderDerivedMediaAsset(asset); }
const HASH = /^[a-f0-9]{64}$/u;
function boundedInteger(value: unknown, minimum: number, maximum: number): number {
  if (!Number.isSafeInteger(value) || Number(value) < minimum || Number(value) > maximum) return reject();
  return Number(value);
}
function divisor(a: number, b: number): number { while (b !== 0) [a, b] = [b, a % b]; return a; }
function duration(value: unknown): StudioLocalMediaDuration {
  const v = object(value); exact(v, "numerator,denominator");
  const numerator = boundedInteger(v.numerator, 1, 14_400_000), denominator = boundedInteger(v.denominator, 1, 48_000);
  if (divisor(numerator, denominator) !== 1 || numerator > 300 * denominator) return reject("Imported media duration is outside the qualified exact range.");
  return { numerator, denominator };
}
function timeBase(value: unknown): StudioLocalMediaDuration {
  const v = object(value); exact(v, "numerator,denominator");
  const numerator = boundedInteger(v.numerator, 1, 1_000_000_000), denominator = boundedInteger(v.denominator, 1, 1_000_000_000);
  if (divisor(numerator, denominator) !== 1) return reject();
  return { numerator, denominator };
}
function validateTechnical(value: unknown, assetType: StudioLocalMediaKind, contentType: unknown): StudioLocalMediaTechnicalMetadata {
  const v = object(value), probeDigest = typeof v.probeDigest === "string" && HASH.test(v.probeDigest) ? v.probeDigest : reject();
  const exactDuration = duration(v.duration), sourceUnits = boundedInteger(v.sourceUnits, 1, assetType === "VIDEO" ? 7_500 : 14_400_000);
  if (v.schema !== STUDIO_LOCAL_MEDIA_TECHNICAL_SCHEMA || v.mediaType !== assetType || v.contentType !== contentType || v.streamCount !== 1) return reject("Imported media technical metadata differs from its asset manifest.");
  if (assetType === "VIDEO") {
    exact(v, "schema,mediaType,contentType,container,codec,pixelFormat,width,height,frameRate,frameCadence,duration,sourceUnits,sourceUnit,timeBase,colorPrimaries,colorTransfer,colorSpace,colorRange,dynamicRange,rotationDegrees,streamCount,probeDigest");
    const frameRate = object(v.frameRate); exact(frameRate, "numerator,denominator");
    const base = timeBase(v.timeBase), width = boundedInteger(v.width, 2, 8192), height = boundedInteger(v.height, 2, 8192);
    if (v.contentType !== "video/mp4" || v.container !== "mp4" || v.codec !== "h264" || v.pixelFormat !== "yuv420p" || width % 2 !== 0 || height % 2 !== 0 || width * height > 33_554_432 ||
        frameRate.numerator !== 25 || frameRate.denominator !== 1 || v.frameCadence !== "CFR_25_EXACT" || v.sourceUnit !== "FRAME" ||
        exactDuration.numerator * 25 !== sourceUnits * exactDuration.denominator || v.colorPrimaries !== "bt709" || v.colorTransfer !== "bt709" || v.colorSpace !== "bt709" ||
        v.colorRange !== "tv" || v.dynamicRange !== "SDR_BT709" || v.rotationDegrees !== 0) return reject("Video must retain the qualified H.264, yuv420p, 25 fps CFR, even-dimension SDR contract.");
    return { schema: STUDIO_LOCAL_MEDIA_TECHNICAL_SCHEMA, mediaType: "VIDEO", contentType: "video/mp4", container: "mp4", codec: "h264", pixelFormat: "yuv420p", width, height,
      frameRate: { numerator: 25, denominator: 1 }, frameCadence: "CFR_25_EXACT", duration: exactDuration, sourceUnits, sourceUnit: "FRAME", timeBase: base,
      colorPrimaries: "bt709", colorTransfer: "bt709", colorSpace: "bt709", colorRange: "tv", dynamicRange: "SDR_BT709", rotationDegrees: 0, streamCount: 1, probeDigest };
  }
  exact(v, "schema,mediaType,contentType,container,codec,sampleFormat,sampleRate,channels,channelLayout,duration,sourceUnits,sourceUnit,timeBase,streamCount,probeDigest");
  const base = object(v.timeBase); exact(base, "numerator,denominator");
  const channels = v.channels === 1 || v.channels === 2 ? v.channels : reject(), channelLayout = v.channelLayout === "mono" || v.channelLayout === "stereo" ? v.channelLayout : reject();
  if (v.contentType !== "audio/wav" || v.container !== "wav" || v.codec !== "pcm_s16le" || v.sampleFormat !== "s16" || v.sampleRate !== 48_000 ||
      channelLayout !== (channels === 1 ? "mono" : "stereo") || v.sourceUnit !== "SAMPLE" || base.numerator !== 1 || base.denominator !== 48_000 ||
      exactDuration.numerator * 48_000 !== sourceUnits * exactDuration.denominator) return reject("Audio must retain the qualified PCM s16le, 48 kHz mono/stereo contract.");
  return { schema: STUDIO_LOCAL_MEDIA_TECHNICAL_SCHEMA, mediaType: "AUDIO", contentType: "audio/wav", container: "wav", codec: "pcm_s16le", sampleFormat: "s16", sampleRate: 48_000,
    channels, channelLayout, duration: exactDuration, sourceUnits, sourceUnit: "SAMPLE", timeBase: { numerator: 1, denominator: 48_000 }, streamCount: 1, probeDigest };
}
export function isQualifiedLocalMediaAsset(asset: Asset): boolean {
  const settings = asset.provenance.adapterMetadata?.settings;
  return isLocalFootageAsset(asset) && !!settings && typeof settings === "object" && !Array.isArray(settings) && Object.hasOwn(settings, "technical");
}
/** Called only after the canonical asset shape has been validated; no generation provenance is fabricated. */
export function validateLocalFootageAsset(asset: Asset): void {
  if (isBlenderDerivedMediaAsset(asset)) return validateBlenderDerivedMediaAsset(asset);
  const p = asset.provenance, m = p.adapterMetadata;
  if (!m || !isLocalFootageAsset(asset) || (asset.assetType !== "VIDEO" && asset.assetType !== "AUDIO") || m.provider !== null || m.model !== null || m.providerJobId !== null || m.externalGenerationId !== null ||
      p.jobId !== null || p.promptId !== null || p.negativePrompt !== null || p.referenceAssets.length !== 0 || p.cost.minorUnits !== 0) return reject("Local footage cannot claim provider execution or generation provenance.");
  const settings = object(m.settings);
  const legacyKeys = "sourceLabel,originalName,byteLength,contentType,storage,originalAcquisitionCost,costBasis";
  const qualified = Object.hasOwn(settings, "technical"), baseKeys = `${legacyKeys}${qualified ? ",technical" : ""}`;
  // Old manifests retain their exact bytes. Only the new, fully bound D: shape is added.
  if (Object.hasOwn(settings, "storageLocation") || Object.hasOwn(settings, "libraryId")) {
    exact(settings, `${baseKeys},storageLocation,libraryId`);
    if (settings.storageLocation !== STUDIO_FOOTAGE_D_STORAGE || typeof settings.libraryId !== "string" || !/^[a-f0-9]{64}$/u.test(settings.libraryId)) return reject("Imported-footage library binding differs.");
  } else exact(settings, baseKeys);
  text(settings.sourceLabel, 256); filename(settings.originalName, asset.assetType);
  if (positive(settings.byteLength) > STUDIO_FOOTAGE_MAX_BYTES || settings.storage !== "studio-footage-chunks-v1" ||
      settings.originalAcquisitionCost !== "UNKNOWN" || settings.costBasis !== "LOCAL_IMPORT_NO_PROVIDER_REQUEST") return reject("Imported-footage provenance differs.");
  if (qualified) validateTechnical(settings.technical, asset.assetType, settings.contentType);
  else if (asset.assetType !== "VIDEO" || settings.contentType !== "video/mp4") return reject("Legacy imported footage must retain its exact MP4 manifest.");
}
export function validateBlenderDerivedMediaAsset(asset: Asset): void {
  const p = asset.provenance, m = p.adapterMetadata;
  if (!m || m.adapterId !== STUDIO_BLENDER_DERIVED_ADAPTER || asset.assetType !== "VIDEO" || m.provider !== null || m.model !== null || m.providerJobId !== null || m.externalGenerationId !== null || p.jobId === null || p.promptId !== null || p.negativePrompt !== null || p.cost.minorUnits !== 0 || p.parentAssets.length !== 1 || p.referenceAssets.length !== 1 || JSON.stringify(p.parentAssets) !== JSON.stringify(p.referenceAssets) || JSON.stringify(asset.dependencies) !== JSON.stringify(p.parentAssets)) return reject("Derived local media must retain its native-source and render-job provenance.");
  const settings = object(m.settings); exact(settings, "sourceLabel,originalName,byteLength,contentType,storage,acquisition,technical,specDigest,descriptorHash,blendSha256,dependenciesDigest,shotId");
  text(settings.sourceLabel, 256); filename(settings.originalName, "VIDEO"); positive(settings.byteLength);
  if (Number(settings.byteLength) > STUDIO_FOOTAGE_MAX_BYTES || settings.contentType !== "video/mp4" || settings.storage !== "studio-footage-chunks-v1" || settings.acquisition !== "SERVER_GENERATED_LOCAL_BLENDER_RENDER" || [settings.specDigest, settings.descriptorHash, settings.blendSha256, settings.dependenciesDigest].some(value => typeof value !== "string" || !HASH.test(value))) return reject("Derived local media settings differ.");
  identity(settings.shotId, "shot"); validateTechnical(settings.technical, "VIDEO", "video/mp4");
}
export function localFootageByteLength(asset: Asset): number { validateLocalFootageAsset(asset); return asset.provenance.adapterMetadata!.settings.byteLength as number; }
export function localMediaTechnicalMetadata(asset: Asset): LocalMediaTechnicalMetadata {
  validateLocalFootageAsset(asset);
  const settings = asset.provenance.adapterMetadata!.settings;
  if (!Object.hasOwn(settings, "technical")) return reject("This legacy MP4 has no qualified source-duration metadata.");
  const technical = validateTechnical(settings.technical, asset.assetType as StudioLocalMediaKind, settings.contentType);
  return Object.freeze({ assetType: technical.mediaType, byteLength: settings.byteLength as number, contentHash: asset.contentHash, ...technical });
}
export function localFootageStorageBinding(asset: Asset): FootageStorageBinding | null {
  validateLocalFootageAsset(asset);
  const settings = asset.provenance.adapterMetadata!.settings;
  return settings.storageLocation === STUDIO_FOOTAGE_D_STORAGE ? { storageLocation: STUDIO_FOOTAGE_D_STORAGE, libraryId: settings.libraryId as string } : null;
}
export function assertFootageCollection(assets: readonly Asset[]): void {
  const imported = assets.filter(isLocalFootageAsset);
  if (imported.length > STUDIO_FOOTAGE_PROJECT_MAX_VERSIONS || imported.reduce((sum, asset) => sum + localFootageByteLength(asset), 0) > STUDIO_FOOTAGE_PROJECT_MAX_BYTES) {
    throw new FootageValidationError("FOOTAGE_PROJECT_LIMIT", "This local project supports eight imported clip versions and 16 GiB total.");
  }
}
/** Framing recognition only: never a decoding, video-track, playback or quality PASS. */
export function inspectStudioMp4(bytes: Uint8Array): void {
  if (!(bytes instanceof Uint8Array) || bytes.byteLength < 32 || bytes.byteLength > STUDIO_FOOTAGE_LEGACY_BUFFER_MAX_BYTES) return reject("MP4 footage must be nonempty and at most 16 MiB.");
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const four = (offset: number) => String.fromCharCode(...bytes.subarray(offset, offset + 4));
  let offset = 0, count = 0, ftyp = 0, moov = 0, mdat = 0;
  while (offset < bytes.byteLength) {
    if (++count > 4096 || bytes.byteLength - offset < 8) return reject("Truncated or excessive MP4 framing.");
    let size = view.getUint32(offset); const type = four(offset + 4); let header = 8;
    if (!/^[A-Za-z0-9 ]{4}$/u.test(type)) return reject("Unsupported MP4 box type.");
    if (size === 1) { if (bytes.byteLength - offset < 16 || view.getUint32(offset + 8) !== 0) return reject("Invalid extended MP4 size."); size = view.getUint32(offset + 12); header = 16; }
    else if (size === 0) size = bytes.byteLength - offset;
    if (size < header || size > bytes.byteLength - offset) return reject("MP4 box exceeds its file.");
    if (type === "ftyp") {
      if (offset !== 0 || ++ftyp !== 1 || size < header + 8 || (size - header - 8) % 4 !== 0 || !["isom", "iso2", "iso4", "iso5", "iso6", "mp41", "mp42", "avc1", "M4V "].includes(four(offset + header))) return reject("Unsupported MP4 brand or file header.");
    }
    if (type === "moov") { if (++moov !== 1 || size <= header) return reject("Missing movie metadata."); }
    if (type === "mdat") { if (size <= header) return reject("Empty media data."); mdat++; }
    offset += size;
  }
  if (offset !== bytes.byteLength || ftyp !== 1 || moov !== 1 || mdat < 1) return reject("MP4 framing requires a file header, movie metadata and media data.");
}
