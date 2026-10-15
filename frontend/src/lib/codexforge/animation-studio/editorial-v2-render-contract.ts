import type { Asset, AssetRef, StudioId } from "./domain";
import type { CompositionV2 } from "./editorial-v2-contract";
import { editorialCompareTime, editorialTimeToFrames, validateEditorialRational, type EditorialRational } from "./editorial-time";
import type { StudioRenderConfiguration } from "./editorial-v2-render-config.server";
import { cloneStudioJson } from "./validation";
import { hashJarvisChatCanonicalJson as digest } from "@/lib/codexforge/jarvis-chat/jarvis-chat-crypto";
import { localMediaTechnicalMetadata, STUDIO_FOOTAGE_MAX_BYTES } from "./footage-contract";
import { buildStudioAudioMix, StudioAudioMixError, validateStudioAudioMix, type StudioAudioMixV1, type StudioAudioPcmReport } from "./editorial-v2-audio-mix";

export const STUDIO_RENDER_PRESET_ID = "TRAILER_720P25_H264_AAC_V1" as const;
export const STUDIO_RENDER_PRESET = Object.freeze({
  presetId: STUDIO_RENDER_PRESET_ID,
  width: 1280,
  height: 720,
  frameRate: Object.freeze({ numerator: 25, denominator: 1 }),
  duration: Object.freeze({ numerator: 30, denominator: 1 }),
  videoCodec: "libx264" as const,
  audioCodec: "aac" as const,
  pixelFormat: "yuv420p" as const,
  sampleRate: 48_000,
  channels: 2,
  expectedFrames: 750,
});
/** Code-owned pixel interpretation, processing and signalling identity for new SDR exports. */
export const STUDIO_RENDER_COLOUR_POLICY = Object.freeze({
  policyId: "SDR_BT709_LIMITED_RGB_COMPOSITE_V1",
  input: Object.freeze({ colorPrimaries: "bt709", colorTransfer: "bt709", colorSpace: "bt709", colorRange: "tv", pixelFormat: "yuv420p", bitDepth: 8 } as const),
  composite: Object.freeze({ encoding: "BT709_NONLINEAR_RGB", colorRange: "pc", pixelFormat: "rgba", bitDepth: 8, alpha: "STRAIGHT", chromaResampling: "POINT" } as const),
  output: Object.freeze({ colorPrimaries: "bt709", colorTransfer: "bt709", colorSpace: "bt709", colorRange: "tv", pixelFormat: "yuv420p", bitDepth: 8, chromaLocation: "left" } as const),
} as const);
export const STUDIO_RENDER_EXPORT_POLICY = Object.freeze({
  minimumDuration: Object.freeze({ numerator: 1, denominator: 25 }),
  maximumDuration: Object.freeze({ numerator: 300, denominator: 1 }),
  maximumFrames: 7_500,
  maximumAudioSamples: 14_400_000,
});
type StudioRenderOutputPolicyContract = Readonly<{ outputBytes: 1_073_741_824; chunkBytes: 524_288; maximumChunks: 2_048 }>;
export const STUDIO_RENDER_OUTPUT_POLICY = Object.freeze({
  outputBytes: 1_073_741_824,
  chunkBytes: 524_288,
  maximumChunks: 2_048,
} as const satisfies StudioRenderOutputPolicyContract);
if (STUDIO_RENDER_OUTPUT_POLICY.outputBytes % STUDIO_RENDER_OUTPUT_POLICY.chunkBytes !== 0 || STUDIO_RENDER_OUTPUT_POLICY.outputBytes / STUDIO_RENDER_OUTPUT_POLICY.chunkBytes !== STUDIO_RENDER_OUTPUT_POLICY.maximumChunks) throw new Error("Invalid Studio render output policy.");
export const STUDIO_RENDER_LIMITS = Object.freeze({ jobs: 64, outputs: 64, receipts: 128, outputBytes: STUDIO_RENDER_OUTPUT_POLICY.outputBytes, diagnosticsBytes: 64 * 1024 });

export type StudioRenderJobState = "QUEUED" | "RUNNING" | "COMPLETED" | "FAILED" | "CANCELLED" | "INTERRUPTED";
export type StudioRenderPhase = "QUEUED" | "MATERIALIZING" | "PROBING_INPUTS" | "RENDERING" | "VALIDATING" | "PUBLISHING" | "DONE";
export interface StudioRenderBlocker { code: string; layerId: string | null; property: string | null; message: string }
export interface StudioRenderSource {
  assetId: StudioId<"asset">; version: number; assetType: "VIDEO" | "AUDIO"; contentHash: string; byteLength: number;
  contentType: "video/mp4" | "audio/wav"; assetManifestDigest: string;
}
export interface StudioRenderSourceDescriptor { asset: Asset; byteLength: number; contentType: "video/mp4" | "audio/wav" }
export interface StudioEditorialRenderSpecV1 {
  format: "studio-editorial-render-spec-v1";
  projectId: StudioId<"project">;
  compositionId: string;
  editorialHeadDigest: string;
  editorialRevision: number;
  compositionRevision: number;
  compositionDigest: string;
  composition: CompositionV2;
  sources: StudioRenderSource[];
  preset: typeof STUDIO_RENDER_PRESET;
  sampling: { video: "FRAME_N_AT_N_OVER_25_HALF_OPEN_V1"; audio: "SAMPLE_N_AT_N_OVER_48000_HALF_OPEN_V1" };
  sourceVideoAudio: "MUTED";
  renderer: { adapterId: "codexforge-local-ffmpeg-v1"; version: string; ffmpegPath: string; ffmpegSha256: string; ffprobePath: string; ffprobeSha256: string; fontRef: "ARIAL_REGULAR"; fontPath: string; fontSha256: string };
  providerRequests: 0;
  generationRequests: 0;
}
export interface StudioRenderPresetV2 {
  presetId: typeof STUDIO_RENDER_PRESET_ID;
  width: 1280;
  height: 720;
  frameRate: { numerator: 25; denominator: 1 };
  duration: EditorialRational;
  videoCodec: "libx264";
  audioCodec: "aac";
  pixelFormat: "yuv420p";
  sampleRate: 48_000;
  channels: 2;
  expectedFrames: number;
  expectedAudioSamples: number;
}
export interface StudioEditorialRenderSpecV2 extends Omit<StudioEditorialRenderSpecV1, "format" | "preset"> {
  format: "studio-editorial-render-spec-v2";
  preset: StudioRenderPresetV2;
}
export interface StudioEditorialRenderSpecV3 extends Omit<StudioEditorialRenderSpecV2, "format"> {
  format: "studio-editorial-render-spec-v3";
  audioMix: StudioAudioMixV1;
}
export interface StudioEditorialRenderSpecV4 extends Omit<StudioEditorialRenderSpecV3, "format"> {
  format: "studio-editorial-render-spec-v4";
  colourPolicy: typeof STUDIO_RENDER_COLOUR_POLICY;
}
export type StudioEditorialRenderSpec = StudioEditorialRenderSpecV1 | StudioEditorialRenderSpecV2 | StudioEditorialRenderSpecV3 | StudioEditorialRenderSpecV4;
export function hasStudioAudioMix(spec: StudioEditorialRenderSpec): spec is StudioEditorialRenderSpecV3 | StudioEditorialRenderSpecV4 {
  return spec.format === "studio-editorial-render-spec-v3" || spec.format === "studio-editorial-render-spec-v4";
}
export interface StudioRenderTiming {
  duration: EditorialRational | null;
  frameRate: { numerator: 25; denominator: 1 };
  expectedFrames: number | null;
  sampleRate: 48_000;
  expectedAudioSamples: number | null;
  qualifiedMinimumDuration: { numerator: 1; denominator: 25 };
  qualifiedMaximumDuration: { numerator: 300; denominator: 1 };
}
export interface StudioRenderReadiness { state: "READY" | "BLOCKED"; blockers: StudioRenderBlocker[]; timing: StudioRenderTiming }
export interface StudioRenderSpecResult { readiness: StudioRenderReadiness; spec: StudioEditorialRenderSpecV4 | null; specDigest: string | null }
export interface StudioRenderProgress { phase: StudioRenderPhase; completed: number; total: number; percent: number }
export interface StudioRenderProcessIdentity { processId: number; identity: string; recordedAt: string }
export interface StudioRenderOutputRef {
  assetId: StudioId<"asset">; version: number; jobId: StudioId<"job">; headDigest: string; contentHash: string; byteLength: number; storageManifestDigest: string; createdAt: string;
  video: { codec: "h264"; width: 1280; height: 720; frameRate: "25/1"; decodedFrames: number };
  audio: { codec: "aac"; sampleRate: 48_000; channels: 2 };
  probeDigest: string;
  audioMixValidation?: StudioAudioPcmReport;
}
export interface StudioRenderJob {
  format: "studio-editorial-render-job-v1"; jobId: StudioId<"job">; projectId: StudioId<"project">; compositionId: string;
  state: StudioRenderJobState; specDigest: string; sourceHeadDigest: string; sourceRevision: number; compositionRevision: number; targetAssetId: StudioId<"asset">; targetVersion: number;
  progress: StudioRenderProgress; createdAt: string; startedAt: string | null; finishedAt: string | null; process: StudioRenderProcessIdentity | null;
  error: { code: string; message: string } | null; output: StudioRenderOutputRef | null;
}

const HASH = /^[a-f0-9]{64}$/u;
const ID = /^(?:asset|project|job)_[a-z0-9]+(?:_[a-z0-9]+)*$/u;
const COMPOSITION = /^composition_[a-z0-9]+(?:_[a-z0-9]+)*$/u;
const COLOR = /^#[0-9a-fA-F]{6}$/u;
const plain = (value: unknown): value is Record<string, unknown> => !!value && typeof value === "object" && !Array.isArray(value) && Object.getPrototypeOf(value) === Object.prototype;
const same = (a: EditorialRational, b: EditorialRational) => editorialCompareTime(a, b) === 0;
const key = (ref: AssetRef) => `${ref.assetId}@${ref.version}`;
function block(blockers: StudioRenderBlocker[], code: string, layerId: unknown, property: string | null, message: string): void {
  blockers.push({ code, layerId: typeof layerId === "string" ? layerId : null, property, message });
}
function rational(value: unknown): EditorialRational | null { try { return validateEditorialRational(value); } catch { return null; } }
function exactUnits(value: unknown, unitsPerSecond: number): number | null {
  try { return editorialTimeToFrames(value, { numerator: unitsPerSecond, denominator: 1 }, "EXACT"); } catch { return null; }
}

function timing(duration: EditorialRational | null, expectedFrames: number | null, expectedAudioSamples: number | null): StudioRenderTiming {
  return {
    duration,
    frameRate: { numerator: 25, denominator: 1 },
    expectedFrames,
    sampleRate: 48_000,
    expectedAudioSamples,
    qualifiedMinimumDuration: { numerator: 1, denominator: 25 },
    qualifiedMaximumDuration: { numerator: 300, denominator: 1 },
  };
}

/** Reads immutable timing without rewriting legacy v1 specs. Throws for an inconsistent or unqualified spec. */
export function studioEditorialRenderSpecTiming(spec: StudioEditorialRenderSpec): { duration: EditorialRational; expectedFrames: number; expectedAudioSamples: number } {
  if (spec.format === "studio-editorial-render-spec-v1") {
    if (!same(spec.preset.duration, STUDIO_RENDER_PRESET.duration) || spec.preset.expectedFrames !== 750) throw new Error("Invalid legacy render timing.");
    return { duration: STUDIO_RENDER_PRESET.duration, expectedFrames: 750, expectedAudioSamples: 1_440_000 };
  }
  if (spec.format !== "studio-editorial-render-spec-v2" && spec.format !== "studio-editorial-render-spec-v3" && spec.format !== "studio-editorial-render-spec-v4") throw new Error("Unsupported render specification.");
  const duration = rational(spec.preset.duration), compositionDuration = rational(spec.composition.duration);
  const expectedFrames = duration ? exactUnits(duration, 25) : null, expectedAudioSamples = duration ? exactUnits(duration, 48_000) : null;
  if (!duration || duration.numerator === 0 || !compositionDuration || !same(duration, compositionDuration) || spec.projectId !== spec.composition.projectId || spec.compositionId !== spec.composition.compositionId || spec.compositionRevision !== spec.composition.revision || spec.compositionDigest !== digest(spec.composition) || spec.preset.presetId !== STUDIO_RENDER_PRESET_ID || spec.preset.width !== 1280 || spec.preset.height !== 720 || spec.preset.frameRate.numerator !== 25 || spec.preset.frameRate.denominator !== 1 || spec.preset.videoCodec !== "libx264" || spec.preset.audioCodec !== "aac" || spec.preset.pixelFormat !== "yuv420p" || spec.preset.sampleRate !== 48_000 || spec.preset.channels !== 2 || expectedFrames === null || expectedFrames < 1 || expectedFrames > STUDIO_RENDER_EXPORT_POLICY.maximumFrames || expectedAudioSamples === null || expectedAudioSamples < 1 || expectedAudioSamples > STUDIO_RENDER_EXPORT_POLICY.maximumAudioSamples || spec.preset.expectedFrames !== expectedFrames || spec.preset.expectedAudioSamples !== expectedAudioSamples) throw new Error("Invalid duration-aware render timing.");
  if (hasStudioAudioMix(spec)) validateStudioAudioMix(spec);
  if (spec.format === "studio-editorial-render-spec-v4" && digest(spec.colourPolicy) !== digest(STUDIO_RENDER_COLOUR_POLICY)) throw new Error("Invalid SDR render colour policy.");
  return { duration, expectedFrames, expectedAudioSamples };
}

/** Pure fixed-preset readiness and immutable-spec construction. No path or filtergraph comes from a client. */
export function buildStudioEditorialRenderSpec(input: {
  projectId: StudioId<"project">; editorialHeadDigest: string; editorialRevision: number; composition: CompositionV2;
  configuration: StudioRenderConfiguration; resolveSource: (ref: AssetRef) => StudioRenderSourceDescriptor | null;
}): StudioRenderSpecResult {
  const blockers: StudioRenderBlocker[] = [], composition = cloneStudioJson(input.composition) as unknown as CompositionV2;
  if (!ID.test(input.projectId) || !HASH.test(input.editorialHeadDigest) || !Number.isSafeInteger(input.editorialRevision) || input.editorialRevision < 1 || composition.projectId !== input.projectId || !COMPOSITION.test(composition.compositionId)) {
    block(blockers, "INVALID_RENDER_BINDING", null, null, "The selected project, composition or saved head binding is invalid.");
  }
  const duration = rational(composition.duration);
  if (composition.width !== STUDIO_RENDER_PRESET.width || composition.height !== STUDIO_RENDER_PRESET.height) block(blockers, "UNSUPPORTED_COMPOSITION_DIMENSIONS", null, "composition.width,height", "The first export preset requires a saved 1280 × 720 composition.");
  let expectedFrames: number | null = null, expectedAudioSamples: number | null = null;
  if (!duration || duration.numerator === 0) block(blockers, "INVALID_COMPOSITION_DURATION", null, "composition.duration", "Export requires a positive saved composition duration.");
  else {
    expectedFrames = exactUnits(duration, STUDIO_RENDER_PRESET.frameRate.numerator);
    expectedAudioSamples = exactUnits(duration, STUDIO_RENDER_PRESET.sampleRate);
    if (expectedFrames === null || expectedAudioSamples === null) block(blockers, "COMPOSITION_DURATION_FRAME_ALIGNMENT_REQUIRED", null, "composition.duration", "The saved composition duration must align exactly to the 25 fps export frame grid; no rounding is performed.");
    if (editorialCompareTime(duration, STUDIO_RENDER_EXPORT_POLICY.maximumDuration) > 0) block(blockers, "DURATION_OUTSIDE_QUALIFIED_EXPORT_RANGE", null, "composition.duration", "The saved duration exceeds the qualified export range of up to 300 seconds. The composition remains unchanged and is not truncated.");
  }
  if (!Array.isArray(composition.layers) || composition.layers.length < 1 || composition.layers.length > 32) block(blockers, "UNSUPPORTED_LAYER_COUNT", null, "composition.layers", "The saved composition must contain between one and 32 layers.");
  const resolved = new Map<string, StudioRenderSource>();
  const hasSolo = Array.isArray(composition.layers) && composition.layers.some(layer => layer.enabled && layer.solo);
  for (const candidate of Array.isArray(composition.layers) ? composition.layers : []) {
    const layer = candidate as unknown as Record<string, unknown>, layerId = layer.layerId;
    const type = layer.type, source = layer.source, transform = layer.transform, keyframes = layer.keyframes;
    // The immutable spec retains every saved layer, while source admission and the
    // filter plan follow the same enabled/solo visibility rule as the editor.
    // New mix specs bind every audio occurrence, including muted/disabled ones.
    // Visual visibility and legacy execution semantics remain unchanged.
    if ((layer.enabled !== true || (hasSolo && layer.solo !== true)) && type !== "AUDIO") continue;
    if (!plain(source)) { block(blockers, "UNSUPPORTED_LAYER_SOURCE", layerId, "source", "This layer has no supported saved source."); continue; }
    if (layer.playbackRate !== 1) block(blockers, "UNSUPPORTED_PLAYBACK_RATE", layerId, "playbackRate", "Export supports only forward unit-rate playback.");
    if (layer.reverse !== false) block(blockers, "UNSUPPORTED_REVERSE", layerId, "reverse", "Reverse playback is not supported by this export preset.");
    if (!Array.isArray(keyframes) || keyframes.length !== 0) block(blockers, "UNSUPPORTED_KEYFRAMES", layerId, "keyframes", "Keyframed layers are not supported by this export preset.");
    const timingRate = type === "AUDIO" ? STUDIO_RENDER_PRESET.sampleRate : STUDIO_RENDER_PRESET.frameRate.numerator;
    if ([layer.start, layer.duration, layer.sourceOffset].some(value => exactUnits(value, timingRate) === null)) block(blockers, type === "AUDIO" ? "AUDIO_SAMPLE_ALIGNMENT_REQUIRED" : "VIDEO_FRAME_ALIGNMENT_REQUIRED", layerId, "start,duration,sourceOffset", type === "AUDIO" ? "Audio timing must align exactly to the 48 kHz output sample clock." : "Visual timing must align exactly to the 25 fps output frame clock.");
    if (!plain(transform) || ![transform.x, transform.y, transform.scaleX, transform.scaleY, transform.rotationDeg, transform.anchorX, transform.anchorY].every(value => typeof value === "number" && Number.isFinite(value)) || Number(transform.scaleX) <= 0 || Number(transform.scaleY) <= 0) {
      block(blockers, "UNSUPPORTED_TRANSFORM", layerId, "transform", "The saved static transform is invalid.");
    } else {
      if (transform.rotationDeg !== 0) block(blockers, "UNSUPPORTED_ROTATION", layerId, "transform.rotationDeg", "Static rotation is not supported by this first export preset.");
      if (transform.anchorX !== 0.5 || transform.anchorY !== 0.5) block(blockers, "UNSUPPORTED_ANCHOR", layerId, "transform.anchorX,anchorY", "The first export preset requires the default centred anchor.");
    }
    if (typeof layer.opacity !== "number" || !Number.isFinite(layer.opacity) || layer.opacity < 0 || layer.opacity > 1) block(blockers, "UNSUPPORTED_OPACITY", layerId, "opacity", "Visual opacity must be between zero and one.");
    if (type === "VIDEO" || type === "AUDIO") {
      if (source.kind !== "ASSET" || !plain(source.asset) || typeof source.asset.assetId !== "string" || !ID.test(source.asset.assetId) || !Number.isSafeInteger(source.asset.version) || Number(source.asset.version) < 1 || (type === "AUDIO" && source.takeId !== null)) {
        block(blockers, "UNSUPPORTED_ASSET_SOURCE", layerId, "source", `${type} export requires one immutable direct asset version.`); continue;
      }
      const ref = { assetId: source.asset.assetId as StudioId<"asset">, version: Number(source.asset.version) }, expectedType = type as "VIDEO" | "AUDIO";
      let descriptor: StudioRenderSourceDescriptor | null = null;
      try { descriptor = input.resolveSource(ref); } catch { descriptor = null; }
      if (!descriptor || descriptor.asset.assetId !== ref.assetId || descriptor.asset.version !== ref.version || descriptor.asset.projectId !== input.projectId || descriptor.asset.assetType !== expectedType || descriptor.asset.contentHash !== descriptor.asset.provenance.contentHash || !HASH.test(descriptor.asset.contentHash) || !Number.isSafeInteger(descriptor.byteLength) || descriptor.byteLength < 1 || descriptor.byteLength > STUDIO_FOOTAGE_MAX_BYTES || descriptor.contentType !== (type === "VIDEO" ? "video/mp4" : "audio/wav")) {
        block(blockers, "SOURCE_UNAVAILABLE", layerId, "source.asset", "The immutable local source is unavailable or differs from its saved asset manifest."); continue;
      }
      if (type === "VIDEO") {
        try {
          const technical = localMediaTechnicalMetadata(descriptor.asset);
          if (technical.mediaType !== "VIDEO" || technical.byteLength !== descriptor.byteLength || technical.contentType !== descriptor.contentType || technical.colorPrimaries !== "bt709" || technical.colorTransfer !== "bt709" || technical.colorSpace !== "bt709" || technical.colorRange !== "tv" || technical.pixelFormat !== "yuv420p") throw new Error("Unqualified source colour.");
        } catch {
          block(blockers, "SOURCE_COLOUR_UNQUALIFIED", layerId, "source.asset", "This video has no valid qualified BT.709 limited-range 8-bit colour evidence. Unknown or unsupported source colour is not assumed; the saved source remains unchanged."); continue;
        }
      }
      const sourceKey = key(ref), existing = resolved.get(sourceKey);
      const value: StudioRenderSource = { ...ref, assetType: expectedType, contentHash: descriptor.asset.contentHash, byteLength: descriptor.byteLength, contentType: descriptor.contentType, assetManifestDigest: digest(descriptor.asset) };
      if (existing && digest(existing) !== digest(value)) block(blockers, "SOURCE_BINDING_CONFLICT", layerId, "source.asset", "One saved asset identity resolved to conflicting immutable source metadata.");
      else resolved.set(sourceKey, value);
      if (type === "AUDIO") {
        const audio = layer.audio;
        if (!plain(audio) || typeof audio.gainDb !== "number" || !Number.isFinite(audio.gainDb) || audio.gainDb < -60 || audio.gainDb > 12 || typeof audio.muted !== "boolean") block(blockers, "INVALID_AUDIO_SETTINGS", layerId, "audio", "Audio gain and mute must use the supported saved bounds.");
        else {
          const fadeIn = rational(audio.fadeIn), fadeOut = rational(audio.fadeOut), layerDuration = rational(layer.duration);
          if (!fadeIn || !fadeOut || !layerDuration || editorialCompareTime(fadeIn, layerDuration) > 0 || editorialCompareTime(fadeOut, layerDuration) > 0) block(blockers, "INVALID_AUDIO_FADES", layerId, "audio.fadeIn,fadeOut", "Each audio fade must be a nonnegative exact time no longer than the saved layer duration.");
        }
        if (plain(transform) && ["x", "y", "rotationDeg"].some(name => transform[name] !== 0) || plain(transform) && ["scaleX", "scaleY"].some(name => transform[name] !== 1) || layer.opacity !== 1) block(blockers, "UNSUPPORTED_AUDIO_VISUAL_PROPERTIES", layerId, "transform,opacity", "Audio layers cannot carry visual transform or opacity instructions in this preset.");
      }
    } else if (type === "TEXT") {
      const text = layer.text;
      if (source.kind !== "TEXT" || !plain(text) || typeof text.text !== "string" || !text.text.trim() || text.text.length > 256 || /[\u0000-\u001f\u007f]/u.test(text.text) || text.fontRef !== "ARIAL_REGULAR" || !Number.isSafeInteger(text.fontSizePx) || Number(text.fontSizePx) < 8 || Number(text.fontSizePx) > 256 || typeof text.color !== "string" || !COLOR.test(text.color)) block(blockers, "INVALID_TEXT_SETTINGS", layerId, "text", "Text export requires saved bounded single-line text, Arial Regular, an 8–256 px size and a six-digit hexadecimal colour.");
      if (plain(transform) && (transform.scaleX !== 1 || transform.scaleY !== 1)) block(blockers, "UNSUPPORTED_TEXT_SCALE", layerId, "transform.scaleX,scaleY", "The first text renderer uses the saved font size and requires unit text scale.");
      if (rational(layer.sourceOffset)?.numerator !== 0) block(blockers, "UNSUPPORTED_TEXT_SOURCE_OFFSET", layerId, "sourceOffset", "Static text has no source-time offset.");
    } else if (type === "IMAGE") block(blockers, "UNSUPPORTED_IMAGE_LAYER", layerId, "type", "Still-image export is outside this first renderer subset.");
    else if (type === "NESTED_COMPOSITION" || source.kind === "COMPOSITION") block(blockers, "UNSUPPORTED_NESTING", layerId, "source", "Nested compositions must be rendered by a later explicit contract.");
    else block(blockers, "UNSUPPORTED_LAYER_TYPE", layerId, "type", "This saved layer type is not supported by the first renderer subset.");
  }
  let audioMix: StudioAudioMixV1 | null = null;
  try { audioMix = buildStudioAudioMix(composition, [...resolved.values()]); }
  catch (error) {
    const code = error instanceof StudioAudioMixError ? error.code : "AUDIO_MIX_INVALID";
    block(blockers, code, error instanceof StudioAudioMixError ? error.layerId : null, "audio", code === "AUDIO_MIX_CAPACITY" ? "This renderer qualifies at most four saved AUDIO occurrences, including muted or disabled occurrences. The composition schema is unchanged." : code === "AUDIO_SAMPLE_ALIGNMENT_REQUIRED" ? "Audio timing and fades must align exactly to the 48 kHz sample clock; no frame rounding is performed." : "The saved audio occurrences must retain valid exact timing, levels and immutable source identities.");
  }
  blockers.sort((a, b) => `${a.layerId ?? ""}:${a.property ?? ""}:${a.code}`.localeCompare(`${b.layerId ?? ""}:${b.property ?? ""}:${b.code}`));
  const renderTiming = timing(duration, expectedFrames, expectedAudioSamples);
  if (blockers.length) return { readiness: { state: "BLOCKED", blockers, timing: renderTiming }, spec: null, specDigest: null };
  if (!duration || expectedFrames === null || expectedAudioSamples === null || !audioMix) throw new Error("Render readiness admitted invalid timing.");
  const preset: StudioRenderPresetV2 = {
    presetId: STUDIO_RENDER_PRESET_ID, width: 1280, height: 720, frameRate: { numerator: 25, denominator: 1 }, duration,
    videoCodec: "libx264", audioCodec: "aac", pixelFormat: "yuv420p", sampleRate: 48_000, channels: 2, expectedFrames, expectedAudioSamples,
  };
  const spec: StudioEditorialRenderSpecV4 = {
    format: "studio-editorial-render-spec-v4", colourPolicy: STUDIO_RENDER_COLOUR_POLICY, audioMix, projectId: input.projectId, compositionId: composition.compositionId,
    editorialHeadDigest: input.editorialHeadDigest, editorialRevision: input.editorialRevision, compositionRevision: composition.revision,
    compositionDigest: digest(composition), composition, sources: [...resolved.values()].sort((a, b) => key(a).localeCompare(key(b))), preset,
    sampling: { video: "FRAME_N_AT_N_OVER_25_HALF_OPEN_V1", audio: "SAMPLE_N_AT_N_OVER_48000_HALF_OPEN_V1" }, sourceVideoAudio: "MUTED",
    renderer: { adapterId: "codexforge-local-ffmpeg-v1", version: input.configuration.rendererVersion, ffmpegPath: input.configuration.ffmpeg.path, ffmpegSha256: input.configuration.ffmpeg.sha256, ffprobePath: input.configuration.ffprobe.path, ffprobeSha256: input.configuration.ffprobe.sha256, fontRef: input.configuration.font.ref, fontPath: input.configuration.font.path, fontSha256: input.configuration.font.sha256 },
    providerRequests: 0, generationRequests: 0,
  };
  return { readiness: { state: "READY", blockers: [], timing: renderTiming }, spec, specDigest: digest(spec) };
}
