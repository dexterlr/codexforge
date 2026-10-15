import { CompositionValidationError, STUDIO_COMPOSITION_LIMITS, validateShotComposition } from "./composition-contract";
import type { ShotComposition, StudioLayer } from "./composition-contract";
import { cloneStudioJson } from "./validation";
import { editorialAddTime, editorialCompareTime, editorialSubtractTime, editorialTimeFromUs, editorialTimeToUs, validateEditorialRational } from "./editorial-time";
import type { EditorialRational } from "./editorial-time";

export interface StudioAudioPropertiesV2 {
  gainDb: number;
  fadeIn: EditorialRational;
  fadeOut: EditorialRational;
  muted: boolean;
}
type LayerV2FromV1<T extends StudioLayer> = T extends StudioLayer
  ? Omit<T, "schemaVersion" | "startUs" | "durationUs" | "sourceOffsetUs" | "audio"> & {
      schemaVersion: 2;
      /** Exact nonnegative rational seconds, independent of display units or a particular frame rate. */
      start: EditorialRational;
      duration: EditorialRational;
      sourceOffset: EditorialRational;
    } & (T extends { type: "AUDIO" } ? { audio: StudioAudioPropertiesV2 } : unknown)
  : never;
/** V2 changes canonical time representation while retaining media and instruction identities. */
export type LayerV2 = LayerV2FromV1<StudioLayer>;
export interface CompositionV2 extends Omit<ShotComposition, "schemaVersion" | "durationUs" | "layers"> {
  schemaVersion: 2;
  duration: EditorialRational;
  layers: LayerV2[];
}
export type LayerTrimEdge = "IN" | "OUT";
export interface LayerSplitV2Timing {
  left: Pick<LayerV2, "start" | "duration" | "sourceOffset">;
  right: Pick<LayerV2, "start" | "duration" | "sourceOffset">;
}
export type AudioLayerV2Timing = Pick<LayerV2, "start" | "duration" | "sourceOffset">;

/** Explicit AUDIO-only timing edit. Canonical fractions remain authoritative;
 * this qualified command admits only exact 48 kHz sample boundaries. */
export function setAudioLayerV2Timing(layer: LayerV2, value: AudioLayerV2Timing): AudioLayerV2Timing {
  if (layer.type !== "AUDIO" || layer.source.kind !== "ASSET" || layer.source.takeId !== null || layer.playbackRate !== 1 || layer.reverse || layer.keyframes.length) return invalid("Exact audio timing requires a direct-asset audio layer with forward unit-rate playback and no keyframes.");
  exact(value, "start,duration,sourceOffset");
  const result = { start: validateEditorialRational(value.start), duration: positiveTime(value.duration), sourceOffset: validateEditorialRational(value.sourceOffset) };
  for (const time of [result.start, result.duration, result.sourceOffset, layer.audio.fadeIn, layer.audio.fadeOut]) {
    const canonical = validateEditorialRational(time), samples = BigInt(canonical.numerator) * BigInt(48_000);
    if (samples % BigInt(canonical.denominator) !== BigInt(0) || samples / BigInt(canonical.denominator) > BigInt(Number.MAX_SAFE_INTEGER)) return invalid("Audio timing and fades must align exactly to the 48 kHz sample clock.");
  }
  if (editorialCompareTime(layer.audio.fadeIn, result.duration) > 0 || editorialCompareTime(layer.audio.fadeOut, result.duration) > 0) return invalid("Each saved fade must fit the proposed audio duration. Change the fade explicitly before shortening this occurrence.");
  editorialAddTime(result.start, result.duration); editorialAddTime(result.sourceOffset, result.duration);
  return result;
}

const COMPOSITION_FIELDS = "schemaVersion,compositionId,projectId,kind,shotId,name,duration,width,height,layers,revision,approvalState,provenance";
const LAYER_FIELDS = "schemaVersion,layerId,compositionId,name,type,source,enabled,locked,solo,start,duration,sourceOffset,playbackRate,reverse,transform,opacity,keyframes,createdAt,updatedAt,version,approvalState,provenance";
const invalid = (message: string): never => { throw new CompositionValidationError("INVALID_COMPOSITION", message); };
function exact(value: unknown, fields: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value) || Object.getPrototypeOf(value) !== Object.prototype || Object.keys(value).sort().join(",") !== fields.split(",").sort().join(",")) return invalid("Unsupported or missing v2 composition fields.");
  return value as Record<string, unknown>;
}
function positiveTime(value: unknown): EditorialRational {
  const time = validateEditorialRational(value);
  if (time.numerator === 0) return invalid("Composition and layer durations must be positive exact times.");
  return time;
}
/** Pure strict inward trim. It derives saved timing only; identity, metadata and
 * publication revisions remain the repository's responsibility. */
export function trimLayerV2Time(
  layer: Pick<LayerV2, "type" | "start" | "duration" | "sourceOffset">,
  edge: LayerTrimEdge,
  trimPoint: unknown,
): Pick<LayerV2, "start" | "duration" | "sourceOffset"> {
  if (!layer || typeof layer !== "object" || !["VIDEO", "IMAGE", "NESTED_COMPOSITION", "TEXT", "AUDIO"].includes(layer.type) || (edge !== "IN" && edge !== "OUT")) return invalid("Use a supported layer and trim edge.");
  const start = validateEditorialRational(layer.start), duration = positiveTime(layer.duration), sourceOffset = validateEditorialRational(layer.sourceOffset), point = validateEditorialRational(trimPoint);
  if ((layer.type === "IMAGE" || layer.type === "TEXT") && sourceOffset.numerator !== 0) return invalid("Still-image and text layers have no source-time offset.");
  const end = editorialAddTime(start, duration);
  if (editorialCompareTime(point, start) <= 0 || editorialCompareTime(point, end) >= 0) return invalid("The exact trim point must be strictly inside the saved layer interval.");
  const delta = editorialSubtractTime(point, start);
  return edge === "IN"
    ? { start: point, duration: editorialSubtractTime(end, point), sourceOffset: layer.type === "IMAGE" || layer.type === "TEXT" ? sourceOffset : editorialAddTime(sourceOffset, delta) }
    : { start, duration: delta, sourceOffset };
}
/** Pure exact composition-time split. It derives timing only: layer identities,
 * metadata, ordering, revisions and publication remain repository concerns. */
export function splitLayerV2Time(
  layer: Pick<LayerV2, "type" | "source" | "start" | "duration" | "sourceOffset" | "playbackRate" | "reverse" | "keyframes">,
  splitPoint: unknown,
): LayerSplitV2Timing {
  if (!layer || typeof layer !== "object") return invalid("Use a supported saved layer for an exact split.");
  if (layer.type !== "VIDEO" || layer.source?.kind !== "ASSET" || layer.playbackRate !== 1 || layer.reverse !== false || !Array.isArray(layer.keyframes) || layer.keyframes.length !== 0) {
    throw new CompositionValidationError("UNSUPPORTED_LAYER_SPLIT", "Exact splitting currently supports only direct-asset video layers with forward unit-rate playback and no keyframes.");
  }
  const start = validateEditorialRational(layer.start), duration = positiveTime(layer.duration), sourceOffset = validateEditorialRational(layer.sourceOffset), point = validateEditorialRational(splitPoint);
  const end = editorialAddTime(start, duration);
  if (editorialCompareTime(point, start) <= 0 || editorialCompareTime(point, end) >= 0) return invalid("The exact split point must be strictly inside the saved layer interval.");
  const leftDuration = editorialSubtractTime(point, start);
  return {
    left: { start, duration: leftDuration, sourceOffset },
    right: { start: point, duration: editorialSubtractTime(end, point), sourceOffset: editorialAddTime(sourceOffset, leftDuration) },
  };
}
function without(value: Record<string, unknown>, ...fields: string[]): Record<string, unknown> {
  return Object.fromEntries(Object.entries(value).filter(([name]) => !fields.includes(name)));
}
function layerFromV1(value: StudioLayer): LayerV2 {
  const { startUs, durationUs, sourceOffsetUs, ...metadata } = value;
  const timing = { schemaVersion: 2 as const, start: editorialTimeFromUs(startUs), duration: editorialTimeFromUs(durationUs), sourceOffset: editorialTimeFromUs(sourceOffsetUs) };
  if (value.type === "AUDIO") {
    const { audio: _audio, ...audioMetadata } = metadata as typeof metadata & { audio: unknown };
    void _audio;
    return { ...audioMetadata, ...timing, audio: { gainDb: value.audio.gainDb, fadeIn: editorialTimeFromUs(value.audio.fadeInUs), fadeOut: editorialTimeFromUs(value.audio.fadeOutUs), muted: value.audio.muted } } as LayerV2;
  }
  return { ...metadata, ...timing } as LayerV2;
}

/** Entity validation only. The repository must additionally bind immutable Assets/Takes,
 * project/shot membership, nested source duration, and the complete acyclic <=8-level graph.
 * No context-free entity validator can establish those cross-record relationships.
 */
export function validateCompositionV2(value: unknown): CompositionV2 {
  // Preserve the existing descriptor-safe JSON depth/node/string/array bounds before inspecting fields.
  const raw = exact(cloneStudioJson(value), COMPOSITION_FIELDS);
  if (raw.schemaVersion !== 2) return invalid("Expected composition schema version 2.");
  const duration = positiveTime(raw.duration);
  if (!Array.isArray(raw.layers) || raw.layers.length > STUDIO_COMPOSITION_LIMITS.layersPerComposition) return invalid("Composition layer count exceeds the existing resource bound.");
  const times: { start: EditorialRational; duration: EditorialRational; sourceOffset: EditorialRational; audio?: StudioAudioPropertiesV2 }[] = [];
  const surrogateLayers = raw.layers.map(item => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return invalid("Every v2 composition layer must be an ordinary object.");
    const candidate = item as Record<string, unknown>;
    const layer = exact(item, LAYER_FIELDS + (candidate.type === "TEXT" ? ",text" : candidate.type === "AUDIO" ? ",audio" : ""));
    if (layer.schemaVersion !== 2) return invalid("Every v2 composition layer must use schema version 2.");
    const timing = { start: validateEditorialRational(layer.start), duration: positiveTime(layer.duration), sourceOffset: validateEditorialRational(layer.sourceOffset) };
    if (editorialCompareTime(editorialAddTime(timing.start, timing.duration), duration) > 0) return invalid("Layer interval exceeds its composition duration.");
    // The referenced media/precomp duration is checked by the repository. Its exact used end
    // must still be representable; there is no legacy one-hour or five-minute time cap here.
    editorialAddTime(timing.sourceOffset, timing.duration);
    if ((layer.type === "IMAGE" || layer.type === "TEXT") && timing.sourceOffset.numerator !== 0) return invalid("Still-image and text layers have no source-time offset.");
    let audio: StudioAudioPropertiesV2 | undefined;
    if (layer.type === "AUDIO") {
      const value = exact(layer.audio, "gainDb,fadeIn,fadeOut,muted");
      const fadeIn = validateEditorialRational(value.fadeIn), fadeOut = validateEditorialRational(value.fadeOut);
      if (editorialCompareTime(fadeIn, timing.duration) > 0 || editorialCompareTime(fadeOut, timing.duration) > 0) return invalid("Each audio fade must be no longer than the saved layer duration.");
      audio = { gainDb: value.gainDb as number, fadeIn, fadeOut, muted: value.muted as boolean };
    }
    times.push({ ...timing, ...(audio ? { audio } : {}) });
    const nonTime = without(layer, "start", "duration", "sourceOffset");
    return {
      ...nonTime,
      ...(audio ? { audio: { gainDb: audio.gainDb, fadeInUs: 0, fadeOutUs: 0, muted: audio.muted } } : {}),
      schemaVersion: 1,
      startUs: 0,
      durationUs: 1,
      sourceOffsetUs: 0,
    };
  });
  // Constant structural surrogates exercise ALL existing non-time validators. They are never
  // persisted, returned as source time, or obtained by rounding/flooring the actual v2 values.
  // Exact field checks above prevent legacy timing fields from being hidden by substitution.
  const nonTime = validateShotComposition({ ...without(raw, "duration", "layers"), schemaVersion: 1, durationUs: 1, layers: surrogateLayers });
  const { durationUs: _durationUs, layers, ...metadata } = nonTime;
  void _durationUs;
  const result: CompositionV2 = { ...metadata, schemaVersion: 2, duration, layers: layers.map((layer, index) => {
    const { startUs: _startUs, durationUs: _layerDurationUs, sourceOffsetUs: _sourceOffsetUs, ...layerMetadata } = layer;
    void _startUs; void _layerDurationUs; void _sourceOffsetUs;
    if (layerMetadata.type === "AUDIO") {
      const { audio: _audio, ...metadataWithoutAudio } = layerMetadata;
      void _audio;
      return { ...metadataWithoutAudio, schemaVersion: 2, ...times[index], audio: times[index].audio! } as LayerV2;
    }
    const { audio: _audio, ...metadataWithoutAudio } = layerMetadata as typeof layerMetadata & { audio?: unknown };
    void _audio;
    return { ...metadataWithoutAudio, schemaVersion: 2, start: times[index].start, duration: times[index].duration, sourceOffset: times[index].sourceOffset } as LayerV2;
  }) };
  if (result.layers.some(layer => layer.source.kind === "COMPOSITION" && layer.source.compositionId === result.compositionId)) return invalid("A composition cannot contain itself.");
  return result;
}

/** Explicit, pure migration adapter. Does not write a record, change approval or copy any media. */
export function migrateCompositionV1ToV2(value: unknown): CompositionV2 {
  const validated = validateShotComposition(value);
  const { durationUs, layers, ...metadata } = validated;
  return validateCompositionV2({ ...metadata, schemaVersion: 2, duration: editorialTimeFromUs(durationUs), layers: layers.map(layerFromV1) });
}

/** Compatibility downgrade is exact or fails. Never use presentation rounding for persistence. */
export function compositionV2ToV1Exact(value: unknown): ShotComposition {
  const validated = validateCompositionV2(value), { duration, layers, ...metadata } = validated;
  return validateShotComposition({
    ...metadata, schemaVersion: 1, durationUs: editorialTimeToUs(duration, "EXACT"),
    layers: layers.map(layer => {
      const { start, duration: layerDuration, sourceOffset, ...layerMetadata } = layer;
      if (layer.type === "AUDIO") {
        const audio = layer.audio;
        const { audio: _audio, ...metadataWithoutAudio } = layerMetadata as typeof layerMetadata & { audio: unknown };
        void _audio;
        return { ...metadataWithoutAudio, schemaVersion: 1, audio: { gainDb: audio.gainDb, fadeInUs: editorialTimeToUs(audio.fadeIn, "EXACT"), fadeOutUs: editorialTimeToUs(audio.fadeOut, "EXACT"), muted: audio.muted }, startUs: editorialTimeToUs(start, "EXACT"), durationUs: editorialTimeToUs(layerDuration, "EXACT"), sourceOffsetUs: editorialTimeToUs(sourceOffset, "EXACT") };
      }
      return { ...layerMetadata, schemaVersion: 1, startUs: editorialTimeToUs(start, "EXACT"), durationUs: editorialTimeToUs(layerDuration, "EXACT"), sourceOffsetUs: editorialTimeToUs(sourceOffset, "EXACT") };
    }),
  });
}
